---
title: 'Delete contact'
description: 'Using the hx-delete action'
tags: ["htmx", "hx-delete", "hx-target", "hx-push-url"]
layout: ../../layouts/Layout.astro
---
# Overview
The commit is `4a4499061253b11d741727452c1af6988886b075`

### Review
#### src/pages/contacts/[contact_id]/edit.astro
The `edit.astro` had the `form` replaced with a `button`

```html
  <button
    hx-delete={`/contacts/${contact.id}/delete`}
    hx-target='body'
    hx-push-url='true'>Delete Contact
  </button>
```

#### src/pages/contacts/[contact_id]/delete.astro
The `delete.astro` was updated to process the `DELETE` request
```js
if (Astro.request.method === 'DELETE') {
  await deleteContact(contact_id)
}
```
### Next
<a href="/posts/post-11">Next</a> we will address a simple `Flash` message and add some CSS for better, and simple, styling
