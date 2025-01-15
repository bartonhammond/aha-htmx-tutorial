---
title: 'Search and list contacts'
description: 'The Web 1.0 application is started now'
tags: ["search", "list"]
layout: ../../layouts/Layout.astro
---
# Overview 
We are now working on this: [https://hypermedia.systems/a-web-1-0-application/](https://hypermedia.systems/a-web-1-0-application) - creating the **Web 1.0 Application**

First, you should cancel the `npm run dev` command.

Then checkout the next commit: `ba798d1cbea209d98a8a400e094d65605484c9de`

Restart `npm run dev` and view [http://localhost:3000/contacts](http://localhost:3000/contacts)

With this commit we can display the contacts and use the search.

#### Review
##### Pocketbase.js
Two files are of interest in this commit. The first is `src/lib/pocketbase.js`.  The `lib` directory is standard Astro for this.

Note that `PocketBase` is created by passing in the url it's running at.

The main function here is `getContacts`.  The `options` object will have a `filter` if the search term `q` is provided.  The `filter` allows for finding `contacts` that match all the fields.

Then we have the `try/catch` of returning all the contacts.  Note that there is not robust error handling.  Instead, our focus is just getting basic functionality working.

```js
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// globally disable auto cancellation
pb.autoCancellation(false)

export async function getContacts({ q = null }) {
  const options = {
    filter: '',
  }

  if (q) {
    options.filter = `first ~ "${q}" || last ~ "${q}" || email ~ "${q}" || phone ~ "${q}"`
  }

    let contacts = []
    
  try {
    contacts = await pb.collection('contacts').getFullList(options)
    console.log(contacts)
  } catch (e) {
    console.log(e.response)
  }
  return contacts
}
```
##### src/pages/contacts.astro
The code between the `---` are run on the server.  If the user enters a search term, it will be in the `q` value. The `q` is passed to the `getContacts` function.

The `form` has the `input` of id `search` with the name `q`

In the `body`, there is a `contacts?.map` which loops through all the items in the `contacts` array returned from **PB**.  
```html
---
import Layout from '../layouts/Layout.astro'
import { getContacts } from '../lib/pocketbase'

const q = Astro.url.searchParams.get('q')

const contacts = await getContacts({ q })
---

<Layout>
  <form action='/contacts' method='get' class='tool-bar'>
    <label for='search'>Search Term</label>
    <input id='search' type='search' name='q' value={q} />
    <input type='submit' value='Search' />
  </form>
  <table>
    <thead>
      <tr>
        <th>First</th>
        <th>Last</th>
        <th>Phone</th>
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        contacts?.map(contact => (
          <tr>
            <td>{contact.first}</td>
            <td>{contact.last}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            <td>
              <a href={`/contacts/${contact.id}/edit`}>Edit</a>
              <a href={`/contacts/${contact.id}`}>View</a>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
  <p>
    <a href='/contacts/new'>Add Contact</a>
  </p>
</Layout>
```

## Next
Next we'll look at how the Edit, View and New `contacts` were done in Astro
<a href="/posts/post-7">Next</a>