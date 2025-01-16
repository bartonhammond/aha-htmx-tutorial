---
title: 'Lazy load the count'
description: 'Demonstration of lazy loading content that is heavy processing'
tags: ["hx-get", "hx-indicator",  "hx-trigger"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `718a9a4d5c2b1ef5731a3ba28320961815169f5e`

This is implemented for demonstration - with this app it's not needed but it's
an import htmx design pattern

### Review
#### src/lib/pocketbase.js
This is a simple function that returns the total count.  Note how the query result has a `totalItems` 
variable

```js
export async function getCount() {
  let count = 0
  try {
    let results = await pb.collection("contacts").getList(1, 1)
    count = results.totalItems
  } catch (e) {
    console.log(e)
  }
  return count
}
```

#### src/pages/contacts.astro
The following was added near the bottom.  Notice that the `hx-trigger` is `revealed`.  Also note
that the `hx-get` is using a `partial`

```html
<span 
    hx-get="/contacts/partials/count" 
    hx-indicator="#spinner"
    hx-trigger="revealed">
    <img id="spinner" 
        class="htmx-indicator"
        src="/img/spinning-circles.svg"/> 
</span>
```
#### src/pages/contacts/partials/count.astro
This is the entire partial.  
```
---
import { getCount } from "@lib/pocketbase"
const count = getCount()
---
{count} total Contacts
```
## Next
 <a href="/posts/post-19">Next</a> we will do inline delete