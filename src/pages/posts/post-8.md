---
title: 'Delete and Edit Contact'
description: 'Continue on the Web 1.0 app'
tags: ["delete", "edit"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `b38586f924b74020bd4e63c07c43e4b8449b23cf`

Now we have the ability to Delete and Edit a `contact`.

#### Review
##### src/lib/pocketbase.js
Simple functions to `updateContact` and `deleteContact`

```js
export async function updateContact(id, data) {
  let updatedContact

  try {
    updatedContact = await pb.collection('contacts').update(id, data)
  } catch (e) {
    console.log(e.response)
  }

  return updatedContact
}

export async function deleteContact(id) {
    console.log(`deleteContact: id: ${id}`)
  try {
    await pb.collection('contacts').delete(id)
  } catch (e) {
      
      console.log(e)
  }
}
```
##### src/pages/contacts/[contact_id]/edit.astro
Note that in `edit.astro` that the server code retreives the `contact` when it starts.  If there is a **POST** method, the `formData` is used to update.  

Note that the **HSb** suggested that the form for the `create` and the `edit` are duplicated.  To keep the code simple and straight forward this advice was followed.

```js
---
import Layout from '@layouts/Layout.astro'
import { getContact, updateContact } from '@lib/pocketbase'

const { contact_id } = Astro.params
let contact = await getContact(contact_id)

if (Astro.request.method === 'POST') {
  const formData = await Astro.request.formData()
  const first = formData.get('first')?.toString() || ''
  const last = formData.get('last')?.toString() || ''
  const phone = formData.get('phone')?.toString() || ''
  const email = formData.get('email')?.toString() || ''

  contact = await updateContact(contact_id, {
    first,
    last,
    phone,
    email,
  })
}
---
```
##### src/pages/contacts/[contact_id]/delete.astro
The `delete.astro` is invoked by the code in the `edit.astro` discussed above.  
```html
  <form action={`/contacts/${contact.id}/delete`} method='post'>
    <button>Delete Contact</button>
  </form>
```

Here is the `delete.astro`  When the delete is completed, ther is a `Astro.redirect`.

```js
---
import { deleteContact } from '@lib/pocketbase'

const { contact_id } = Astro.params

if (Astro.request.method === 'POST') {
  await deleteContact(contact_id)
}

return Astro.redirect(`/contacts`)
---
```

#### Next