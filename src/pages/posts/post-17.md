---
title: 'Add partials for contact rows'
description: 'By using partials, htmx replaces element with html'
tags: ["hx-trigger", "hx-swap", , "hx-post"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `f0489c7a136f2fe9b4dd3cabe147a42cc5d4b8ed`

With this implementation the contact rows will be produced using a Astro `partial`.  This is a performance enhancement in that we will only be transfering the exact html we need rather, than the way
it is right now, rendering the entire page and snarfing what we need.

### Review
#### src/pages/contacts/partials/contact-rows.astro
This server implementation is straight forward - get the `q` from the `form` or from the request it self - which occurs when we start paging.  Note that we declare the `partial` value.
```js
---
export const partial = true
import { getContacts } from "@lib/pocketbase"

//Initial request
const formData = await Astro.request.formData()
let q = formData.get("q")?.toString()

//Once the pagination starts
if (!q) {
    q = new URL(Astro.request.url).searchParams.get("q") || 1;
}
let page = new URL(Astro.request.url).searchParams.get("page") || 1;
page = parseInt(page)
console.log(`contact-rows q:${q} page: ${page}`)
const limit = 10
const contacts = await getContacts({ q, limit, page })
---
```
The html for this component came from `contacts.astro`.  The part that is new is the following:
Notice that the `hx-post` is refers to the `partials` and passes in the `page` parameter.  And 
note that we don't have the `hx-select` now.
```html
{
   contacts.length == limit && (
      <tr>
        <td colspan='5' style='text-align: center'>
          <button
            hx-target='closest tr'
            hx-swap='outerHTML show:bottom'
            
            hx-post={`/contacts/partials/contact-rows/?q=${q}&page=${page + 1}`}>
            Load More
          </button>
        </td>
      </tr>
    )
```

## Next
 <a href="/posts/post-18">Next</a> we will Lazy load the count