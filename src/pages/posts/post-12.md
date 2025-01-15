---
title: 'Update edit.astro'
description: 'Use the hx-confirm to confirm deletion'
tags: ["hx-confirm"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `159f23d25540388155e0c87e303f7ac73478bfa6`

Here we are prompting the user to confirm the delete request

### Review
#### src/pages/contacts/[contact_id]/edit.astro
Note how the `edit.astro` file was updated - the `button` has a `hx-confirm`

```html
<button
	hx-delete={`/contacts/${contact.id}/delete`}
   	hx-target='body'
	hx-confirm="Are you sure you want to delete this contact?"
    	hx-push-url='true'>Delete Contact
    </button>
```

## Next
<a href="/posts/post-12">Next</a> we'll look at limiting the search results and adding a "more" button