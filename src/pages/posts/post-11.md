---
title: 'Add flash support and some simple CSS libs'
description: 'Need to make the site look a bit better - PicoCSS'
tags: ["flash", "picocss",  "hx-push-url"]
layout: ../../layouts/Layout.astro
---
# Overview
The commit is `6c156ee991593a8f6c6b0a465b18bd2704d8bc70`

This commit is not included in the **HSb**.  Some of these efforts will be 
changed or reversed later in the project.  But for now, it was sufficient.

### Review
#### src/layouts/Layout.astro

First, we pass in a param
```js
---
const { flash } = Astro.props
---
```
Next we add the CSS libs.  Note that later, the `missing.min.css` will be removed as not needed. 
```css
 <link
      rel="stylesheet"
      href="https://the.missing.style/v0.2.0/missing.min.css"
      />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
      />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
```
The `body` element was also updated.  Note that the `animate` values here are from the `animate` css library from above.
```html
 <body hx-boost="true" class="center">
    {flash && <p class="animate__animated animate__fadeOut animate__delay-3s flash" >{flash}</p>}
    <slot />
  </body>
  ```

There is also CSS markup in line that only applies to this Astro component
```html
<style>
      .flash {
	  display: block;
	  background-color: #2fdc2f !important;
	  color: white;
	  font-weight: bold;
	  padding: 12px;
	  border: 1px solid black;
	  border-radius: 8px;
	  margin: 16px;
	  width: 80%;
      }
 </style>
```
#### src/pages/contacts/[contact_id]/edit.astro
Here we define `flash` and set it when we have a **POST**. 

```js
---
import Layout from '@layouts/Layout.astro'
import { getContact, updateContact } from '@lib/pocketbase'

let flash = ""
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
  flash="Flash: Updated!"
}
---
```
The `flash` message is passed to the `Layout`
```html
<Layout flash={flash}>
```
#### src/pages/contacts/new.astro
The `new.astro` was updated similar to the `edit.astro` above - define `flash` and pass it to `<Layout>`

### Steps
Try creating a new contact and use the edit.  You should see the `flash` messages appear and then disappear.

## Next
<a href="/posts/post-12">Next</a> we'll look at how to confirm the delete of a `contact`