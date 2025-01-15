---
title: 'bulk delete'
description: 'Delete multiple contacts'
tags: ["hx-delete", "hx-confirm", "hx-target", "hx-include"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `403d4cef3b9a71ea1938902de44815fe2c078938`

The contacts table will have a new column that allows for selection of one or more `contact`.

### Review
#### src/pages/contacts.astro
When multiple contacts are selected they come as query string params.  The following server code 
pulls the `contact.id` out so that it can be deleted.

```js
//Split the pairs to get key and id
  for (let pos = 0; pos < keys.length; pos++) {
    let values = keys[pos].split("=")
    let key = values[0]
    let id = values[1]
    
    switch (key) {
      case 'q':
        q = id  // so that search can work
        break
      case 'selected_contact_ids':
        await deleteContact(id)
        break
      default:
        console.log(`/contacts key: ${key} id: ${id} `)
    }
  }
```
#### src/pages/contacts/partials/contact-rows.astro
The new column on the table is defined as this.  Note the `hx-include` so that we can keep
the search criteria. 
```html
<button
    hx-delete="/contacts/"
    hx-confirm="Are you sure you want to delete these contacts?"
    hx-target="body"
    hx-include="#search"
>
    Delete Selected Contacts
</button>
```

## Next
 <a href="/posts/post-21">Next</a> we will add in dark mode selection


