---
title: 'Lazy load the count'
description: 'Demonstration of lazy loading content that is heavy processing'
tags: ["hx-delete", "hx-confirm",  "hx-target", "hx-swap", "hx-push-url"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `8d09f9ead25fbabf0cff0e2f81794d4ba476d349`

There are two ways to delete a contact - one from the row in the table of contacts.  The other
is from the `edit` page.  

### Review
#### src/pages/contacts/partials/contact-rows.astro
From the table, each row has a link to delete itself.  This is the
relevant piece.  Notice there is a `hx-confirm`.  The `hx-delete` goes to 
the `delete` which will determine if its from the `contacts` page or 
the `edit` page.

```html
 <a href="#" 
    hx-confirm="Are you sure?" 
    hx-target="closest tr" 
    hx-swap="outerHTML swap:1s"
    hx-delete={`/contacts/${contact.id}/delete`}
           >Delete</a>
```

#### src/styles/global.css
This is added so that the `hx-swap` displays properly

```css
tr.htmx-swapping td {
  opacity: 0;
  transition: opacity 1s ease-out;
}
```

#### src/pages/contacts/[contact_id]/delete.astro
This component is responsible for checking where the `delete` action initiated.
If the `edit` component (see below), the `button` has an id of `delete-btn`.  
IF that is detected, then we are on the `edit` page and need to redirect

This is the updated portion
```js
if (Astro.request.method === 'DELETE') {
  await deleteContact(contact_id)

  if (Astro.request.headers.get('HX-Trigger') === 'delete-btn') {
    return Astro.redirect(`/contacts`)
  }
}
```

#### src/pages/contacts/[contact_id]/edit.astro
The significant change here is to the `button` by adding the `id` - other wise it's the same

```html
<button
    id="delete-btn"
    hx-delete={`/contacts/${contact.id}/delete`}
    hx-target="body"
    hx-confirm="Are you sure you want to delete this contact?"
    hx-push-url="true"
>
```

## Next
 <a href="/posts/post-20">Next</a> we will do bulk delete