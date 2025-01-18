---
title: 'Download zip file'
description: 'Make the newly created zip file available for download'
tags: ["hx-ext", "sse-connect", "sse-swap", "sse-close"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `e12683d67fc8aa132fa380dc45a3fc5db1f7e98a`

The trick with this commit was to get the name of the zip file availble.

So that we can have multiple downloads, the NPM module `unique-filename` was 
used.

### Review
#### package.json
The `url` helps to parse out the params later
```
   "unique-filename": "^4.0.0",
    "url": "^0.11.4"
```

#### src/pages/archive.astro
The server code generates a `downloadFileName` that is unique
```js
import uniqueFilename from "unique-filename";
//File to download
const downloadFileName = uniqueFilename("public", "downloads");
```

The `sse` extension sends the `downloadFileName` to the `sse-connect` end point
```html
<span
    hidden
    hx-ext="sse"
    sse-connect=`/hx/archive-contacts?downloadFileName=${downloadFileName}`
    sse-swap="message"
    sse-close="closing"></span>
```

The file is made available for download
```html
  <span hidden id="complete">
    <h3 >The zip file is available 
    <a href=`${downloadFileName}.zip` target="_blank">here</a>
    </h3>
  </span>
```

#### src/pages/hx/archive-contacts.js
This is the end point.  It receives the `downloadFileName`.  This is where
the `url` module is used.

```js
export async function GET(params, request ) {
  console.log(`/archive-contacts params.url: ${JSON.stringify(params.url)}`)

  let urlParts = url.parse(params.url.toString())
  console.log(`urlParts: ${JSON.stringify(urlParts.query)}`)

  let downloadFileName = urlParts.query.split("=")[1]
```

Later in the code, the `downloadFileName` is passed into the `ContactArchiver` constructor so that when
the zip file is written, it has a name to use.

```js
 const contactArchiver = new ContactArchiver(`${downloadFileName}.zip`)
  await contactArchiver.writeContactsToTempDirectory();
  const countOfContacts = contactArchiver.getCountOfContacts();
  contactArchiver.prepareZip();
```
#### src/pages/hx/archiver.js

The constructor accepts the `downloadFileName`
```js
constructor(downloadFileName) {
    this.output = `${os.tmpdir()}/contacts`;
    this.zipFile = `${os.tmpdir()}/contacts/example.zip`;
    this.downloadFileName = downloadFileName;
    this.contacts = [];
  }
```
Later in the `prepareZip` function, the zip file is written out to this temporary location
```js
  const output = fs.createWriteStream(`${this.zipFile}`);
```

Then a new function is called to put it to the final location.  Obvisously all this
would need to be addressed for a multi-user application. But for our learning purposes, it's 
ok.  

```js
 moveZip() {
    fs.rename(this.zipFile, this.downloadFileName, (err) => {
      if (err) throw err;
    });
  }
```
## Next
 <a href="/posts/post-25">Next</a> prepare deployment to fly.io and pockethost.io
 