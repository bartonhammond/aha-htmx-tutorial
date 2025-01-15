---
title: 'Load more button'
description: 'Limit the search and use a load more button'
tags: ["hx-target", "hx-swap", "hx-select", "hx-get"]
layout: ../../layouts/Layout.astro
---

# Overview
This commit is `be52c74b9fe8e594b8adce4f1783eff3563a9e5c`

Here we will update **PB** and implement a button 

### Review
#### src/lib/pocketbase.js
Note that additional parameters to the function - `limit` and `page`.  Those are passed to the `getList` function.

```js
export async function getContacts({ q = null, limit, page }) {
    const options = {
	filter: '',
    }

    if (q) {
	options.filter = `first ~ "${q}" || last ~ "${q}" || email ~ "${q}" || phone ~ "${q}"`
    }

    let contacts = []
    
    try {
	let results = await pb.collection('contacts').getList(page, limit, options)
	contacts = results.items
    } catch (e) {
	console.log(e.response)
    }
    return contacts
}
```
#### src/pages/contacts.astro
The server side code hard codes the `limit` and gets the `page` from the `params`.  Note that if `page` was not provided, it is initialized to `1`.
```
---
import Layout from '@layouts/Layout.astro'
import { getContacts } from '@lib/pocketbase'

const q = Astro.url.searchParams.get('q')
const page = +Astro.url.searchParams.get('page') || 1
const limit = 10

const contacts = await getContacts({ q, limit, page })

---

```
The button is implemented here.  Note that the `hx-get` increments the `page`.  Also note that the `hx-select` is selecting the rows using `tbody > tr`.  This will be addressed when `partials` are implemented.  So with this implementation, the entire page is being requested but then the `hx-select` snarfs off the stuff we're interested in.
```html
{
    contacts.length == 10 && (
        <tr>
        <td colspan='5' style='text-align: center'>
            <button
            hx-target='closest tr'
            hx-swap='outerHTML'
            hx-select='tbody > tr'
            hx-get={`/contacts?page=${page + 1}`}>
            Load More
            </button>
        </td>
        </tr>
    )
}
```
## Next
<a href="/posts/post-14">Next</a> we'll look at Validation with error message display and creating a global.css