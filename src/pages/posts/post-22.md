---
title: 'Show delete bulk button if at least 1 checkbox is checked'
description: 'Let's show/hide the bulk delete button'
tags: ["x-data", "x-show, "x-on:clicked"]
layout: ../../layouts/Layout.astro
---
# Overview
This is commit `6aafeff3fe31c71bbedfbce3a0dca12152ec8bfb`

I really didn't like the button showing all the time.  So I did something about it ;)

### Review
#### astro.config.mjs
Seems that `alpine` needs to be integrated to work properly.  

So it's now imported
```js
import alpinejs from '@astrojs/alpinejs';
```
And integrated
```
  integrations: [alpinejs()],
```
####  package.json
Additional modules are included
```js
    "@astrojs/alpinejs": "^0.4.1",
    "@types/alpinejs": "^3.13.11",
    "alpinejs": "^3.14.8",
```

#### src/pages/contacts.astro
In the server code we initialize the count 

```js
const initialCount = 0 
```

Added this on the `form` tag
```js
<form  x-data={`{ count: ${initialCount} }`} >
```

Then on the button to delete, the `alpine` attribute `x-show` is used to control the hide/display
Notice how it refers to the `count` - that is variable contained by `x-data`

```
 <button
      x-show="count > 0"
      hx-delete="/contacts/"
```

#### src/pages/contacts/partials/contact-rows.astro
On the `delete` column there is now a `x-on:click` - Note how the `$event.target.checked` value is
considered - the count is adjusted appropriately.


```html
<td>
    <input 
        type="checkbox" 
        id="selected_contact_ids"
        name="selected_contact_ids"
        value={contact.id}
        x-on:click="($event.target.checked ? count++ : count--)"
    >
</td>
```

## Next
 <a href="/posts/post-23">Next</a> will be creating the UI for Archive - SSE with HTMX