---
title: 'UI for Archive - SSE with HTMX'
description: 'The UI to show status of long running process using SSE'
tags: ["hx-ext", "sse-connect", "sse-swap", "sse-close"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `5fbafb86cd752e50f907287eeb73d5a6854ff95d`

We are now in the **HSb** at [https://hypermedia.systems/a-dynamic-archive-ui/](https://hypermedia.systems/a-dynamic-archive-ui/)

This particular section was very challenging.  See what you think.

The design is that the menu navigates to `src/pages/archive.astro`.  This page has the `hx-sse` element.  Note that `hx-sse` is a HTMX Extension [https://htmx.org/extensions/#core-extensions](https://htmx.org/extensions/#core-extensions)

The `hx-sse` can only replace the element it is defined on.  But we want to show a `progress` bar.  So the trick was to use
the `hx-sse` to start the `sse` connection.  Then, when `messages` are sent, a JS bit of code processes the messages and updates the
`progress` bar.  It will also control the UI display depending on the message. 


### Review
#### src/components/ArchiveHTMX.astro
New menu item component
```html
---

---
<a href="/archive">Archive</a>
```
#### src/components/Header.astro
Bring in the menu item
```html
 <li>
    <ArchiveHTMX />
</li>
```

#### package.json
Need to include the NPM module that will create the zip
```json
    "archiver": "^7.0.1",
```

#### src/layouts/Layout.astro
Seems that the `sse` won't work if `htmx` is not defined.  I found that loading the scripts like this works
```html
    <script is:inline src="../htmx-2.0.4.min.js" defer></script>
    <script is:inline src="../sse-2.2.2.js" defer></script>
```

#### src/pages/archive.astro
Let's look at the HTML part first
The `span` has the `hx-ext` - this is the HTMX Extension.  It connects to the `hx/archive-contents`. The `sse-swap` is to filter the `message` name but in 
our case, there is no name.  Therefore the value of `message` takes all the events.  There is also a `sse-close` event supported.  

Note that the `span` is hidden.

The two `h3` elements will be displayed (hidden initially) as the process continues

At the bottom is the PicoCss `progress`.  The attribute `value` will be updated as shown below
```html
<Layout>
  <!-- This starts the SSE but displays nothing -->
  <span
    hidden
    hx-ext="sse"
    sse-connect="/hx/archive-contacts"
    sse-swap="message"
    sse-close="closing"></span>

  <h3 id="creating">The contact zip is being created</h3>
  <h3 hidden id="complete">The zip file is available here</h3>

  <div class="container">
    <div class="vertical-center"></div>
    <progress id="progressBar" value="0" max="100"></progress>
  </div>

  <p>
    <a href="/contacts">Back</a>
  </p>
</Layout>
```
This is the JS script that will intercept the SSE Events.  As event `htmx:sseMessage` comes in, the `progressBar` attribute `value` is updated.
When the event `htmx:sseClose` is received, the `h3` elements are handled.

```js
<script>
  //This receives each sse message that has the value for the progress bar
  document.body.addEventListener("htmx:sseMessage", function (e) {
    const elem = document.getElementById("progressBar");
    elem.setAttribute("value", e.detail.data);
  });

  //Show appropriate messages
  document.body.addEventListener("htmx:sseClose", function (e) {
    document.getElementById("progressBar").hidden = true;
    document.getElementById("creating").hidden = true;
    document.getElementById("complete").hidden = false;
  });
</script>
```

#### src/pages/hx/archive-contacts.js
This is the end point that the `hx-sse` has defined in it's `sse-connect`
Let's break down this file into manageable parts

This first part interacts w/ the JS Class that is handling the NPM Module `archiver`.  The reason
it was written as a Class is that `state` is needed.  We'll see that later.
So this part is writing out a json file for each contact.
Then it gets the `countOfContacts` so that we can calculate the percentage for the Progress Bar later
```js
   //The class that prepares the zip
    const contactArchiver = new ContactArchiver()
    await contactArchiver.writeContactsToTempDirectory()
    const countOfContacts = contactArchiver.getCountOfContacts()
    contactArchiver.prepareZip()
```

In this section, the SSE connection is made with `ReadableStream`.  It starts to loop through the
contacts and calculates the %.  It's the `pct` that's sent back to the `sse` component in `archiver.astro`
It also calls the `contactArchiver` to add the `contact` to the zip.
Note that a "setTimeout` is used to slow down the process - so that we can see the `progress`.

When all the contacts have been processed, the `closeing` event is sent.

```js
    // Create a streaming response
    const customReadable = new ReadableStream({
      async start(controller) {
        for (let cnt = 0; cnt < countOfContacts; cnt++) {

          const pct = `${(cnt / countOfContacts) * 100}`

            //this controls the progress bar
            controller.enqueue(encoder.encode(`data: ${pct}\n\n`))

            //This adds the contact to the zip
            contactArchiver.zipContact(cnt)

            //This is to slow it down so you can see it  :)
            await new Promise((r) => setTimeout(r, 100))
        }
        contactArchiver.finalize()
        controller.enqueue(encoder.encode(`event: closing\ndata: time to stop\n\n`))
        await new Promise((r) => setTimeout(r, 2000))
        controller.close()
      },
    })
```

At the bottom of this, the stream is defined
```js
    return new Response(customReadable, {
      // Set the headers for Server-Sent Events (SSE)
      headers: {
        Connection: 'keep-alive',
        'Content-Encoding': 'none',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Type': 'text/event-stream; charset=utf-8',
      },
    })
```
#### src/pages/hx/archiver.js
This JS Class wraps the NPM module `archiver`.

Here are some notes.

The constructor defines where the `output` will be.  The `getCountOfContacts` returns the number of contacts.
```js
export class ContactArchiver {
  constructor() {
    this.output = `${os.tmpdir()}/contacts`
    this.contacts = []
  }
  getCountOfContacts() {
    return this.contacts.length
  }
```

The `writeContactsToTempDiretory` creates a temp directory and writes out each `contact` by using
`JSON.stringify`
```js
async writeContactsToTempDirectory() {
    let contacts = await getContacts("", 100000, 0);

    // Directory to write files
    try {
      await mkdir(this.output);
    } catch (err) {
      // ignore since it is made multiple times
    }

    // Write each contact as separate file
    for (let cnt = 0; cnt < contacts.length; cnt++) {
      const fileName = `${this.output}/${contacts[cnt].id}.json`;
      this.contacts.push(fileName);
      fs.writeFileSync(fileName, `${JSON.stringify(contacts[cnt])}`);
    }
  }
```

This creates the zip and readies the pipe so that each `archive.file()` invocation sends the file to the zip file.

```js
  prepareZip() {
    // create a file to stream archive data to.
    const output = fs.createWriteStream(`${this.output}/example.zip`);
    this.archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    // pipe archive data to the file
    this.archive.pipe(output);
  }
```

The `archive-contact` code sends in the `index` of each `contact` it has so it can be added to the zip.

```js
  zipContact(index) {
    const fileName = this.contacts[index]
    try {
      this.archive.file(`${fileName}`, { name: `${path.basename(fileName)}` });
    } catch (e) {
      console.log(e.message)
    }
```

## Next
 <a href="/posts/post-24">Next</a> will be to download the zip file
  