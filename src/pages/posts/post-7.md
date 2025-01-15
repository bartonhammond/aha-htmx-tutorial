---
title: 'New, Edit and View Contact'
description: 'Continue on the Web 1.0 app'
tags: ["view", "tsconfig"]
layout: ../../layouts/Layout.astro
---
# Overview
The commit is `d665185eed52472911d09ae9bfc02c3a473e00d1`

With this commit we can do CRUD operations.

### Review
#### tsconfig.json
The most import part updated was this portion.  What this provides is that in our `Astro` code we can use these variables for our `imports`.

```js
	"paths": {
	    "@components/*": ["src/components/*"],
	    "@layouts/*": ["src/layouts/*"],
	    "@lib/*": ["src/lib/*"],
	    "@pages/*": ["src/pages/*"],
	    "@src/*": ["src/*"],
	    "@root/*": ["./*"]
	}
```

#### src/lib/pocketbase.js
A couple of functions have been added.  Again, this is basic functionality.

```js
export async function addContact({ first, last, phone, email }) {
    let newContact
    
    try {
	newContact = await pb.collection('contacts').create({
	    first,
	    last,
	    phone,
	    email,
	})
    } catch (e) {
	console.log(e.response)
    }
    return newContact
}

export async function getContact(id) {
  let contact
  try {
    const options = {}
    contact = await pb.collection('contacts').getOne(id, options)
  } catch (e) {
    console.log(e.response)
  }

  return contact
}
```

#### src/pages/contacts.astro
`contacts.astro` was updated to use the definitions of `tsconfig.json` 
```js
import Layout from '@layouts/Layout.astro'
import { getContacts } from '@lib/pocketbase'
```

#### src/pages/contacts/new.astro
This page is referenced from `src/pages/contacts.astro` at the bottom:

```html
 <p>
    <a href='/contacts/new'>Add Contact</a>
</p>
```
In the server code in `new.astro` (the code between the `---`), there is this.  If the form was a `post`, then the `formData` has the fields we need.  Using those fields we call **PB**.


```js
import Layout from '@layouts/Layout.astro'
import { addContact } from '@lib/pocketbase'

let contact = {}

if (Astro.request.method === 'POST') {
  const formData = await Astro.request.formData()
  const first = formData.get('first')?.toString() || ''
  const last = formData.get('last')?.toString() || ''
  const phone = formData.get('phone')?.toString() || ''
  const email = formData.get('email')?.toString() || ''

  contact = await addContact({
    first,
    last,
    phone,
    email,
  })

}
```

On the form, each of the fields are similar to this.  Notice the `value` references the `contact` object.  The errors are not addressed with this commit.  

```html

      <p>
        <label for='first'>First Name</label>
        <input
          name='first'
          id='first'
          type='text'
          placeholder='First Name'
          value={contact.first}
        />
        <span class='error'>{contact.errors?.first}</span>
      </p>
```

#### src/pages/contacts/[contact_id].astro
Note how this file is named - the `contact_id` is a parameter that will be passed in.  The `contacts.astro` has this line that passes in the `contact.id`:

```html
 <a href={`/contacts/${contact.id}/edit`}>Edit</a>
 ```

 The server code picks the param and call **PB**

```js
---
import Layout from '@layouts/Layout.astro'
import { getContact } from '@lib/pocketbase'

const { contact_id } = Astro.params
const contact = await getContact(contact_id)
---
```
## Next
<a href="/posts/post-8">Next</a> we'll look at Delete and Edit of the contacts
