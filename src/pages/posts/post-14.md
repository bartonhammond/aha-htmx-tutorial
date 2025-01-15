---
title: 'Validation with error message display and global.css'
description: 'The forms need to display error messages'
tags: ["hx-target", "hx-swap", "hx-select", "hx-get"]
layout: ../../layouts/Layout.astro
---

# Overview
The commit is `bbd42b7f4ff2ee527369eff1e67cbec7acdb374f`

This commit adds in the ability to vaidate the data coming from the `new` and `edit` forms.  
Note that these `forms` are basically duplicated. Note also that we could update the `input` field 
to be `email` and let the browser confirm the email address.

### Review
#### tsconfig.json
Adding a `styles` definition
```json
	"paths": {
        ....
	    "@styles/*": ["src/styles/*"],
	}
```

#### src/layouts/Layout.astro
We have to include the `validator`
```html
  <script src="https://unpkg.com/validator@latest/validator.min.js"></script>
```
Also removed the `missing.min.css` and updated the `body` to use PicoCSS `container`
```html
<body hx-boost="true" class="container">
```

#### src/lib/pocketbase.js
Add the logic to validate the fields.
```js
function validateContact(contact) {
  const errors = {
    first: "",
    last: "",
    email: "",
    phone: "",
  };

  if (validator.isEmpty(contact.first)) {
    errors.last = "First name required";
  }

  if (validator.isEmpty(contact.last)) {
    errors.last = "Last name required";
  }

  if (!validator.isEmail(contact.email)) {
    errors.email = "Invalid email";
  }

  if (!validator.isMobilePhone(contact.phone)) {
    errors.phone = "Invalid phone";
  }
  return errors;
}
```
Later in `pocketbase.js`, if there is any error, we throw the exception.
```js
 let errors = validateContact(contact);

 const noErrors = Object.values(errors).every((x) => x === null || x === "");

  if (noErrors) {
    try {
      newContact = await pb.collection("contacts").create(contact);
    } catch (e) {
      console.log(e.response);
    }
    return newContact;
  } else {
    throw { errors, contact };
  }
  ```

#### src/pages/contacts/new.astro
The changes here are similar to `src/pages/contacts/[contact_id]/edit.astro` but only described here.

First, catch the exception for `pocketbase` and set `errors` object
```
 let errors = {}
  try {
      contact = await addContact({
          first,
     	  last,
	  phone,
  	  email,
      })

      flash = "Contact created!"
  
  } catch (e) {
     console.log(`New ${e}`)
     errors = e.errors
     contact = e.contact
  }
```

Then in the `html` portion, the errors are displayed if present

```html
 <label for='email'>Email</label>
 <input
    name='email'
    id='email'
    type='text'
    placeholder='Email'
    value={contact.email}
 />
{errors?.email && <span class='error'>{errors?.email}</span>}
```
### Steps
Try adding or editing a contact and providing an invalid email, for example


## Next
<a href="/posts/post-15">Next</a> we'll look at "active" search