---
title: 'Start creating Astro'
description: 'Getting the first page to display'
tags: ["astro", "contacts"]
layout: ../../layouts/Layout.astro
---
# Overview 
We now want to checkout the next commit which is `72124c7889adcff8f7ef2bd4da5ee7d92bd34fc2`

With this commit we'll start Astro and display a `Contacts` page

# Review
The following files were modified

#### Typescript support
 `src/env.d.ts` 

 #### Main entry point for Astro
 When Astro starts, it will display this path.  At this point, we just want to redirect to that `contacts` page.  

`src/pages/index.astro`
```js
---
return Astro.redirect('/contacts')
---
```
#### The main page we will work with
Most of this tutorial will be building out this page.  For now we just confirm that it loads

Note how it uses the Layout component.
 `src/pages/contacts.astro`
```js
---
import Layout from '../layouts/Layout.astro'
---
<Layout>Hello Contacts</Layout>
```
#### Let's see what we have!
From a terminal, run `npm run dev`.  Remember that **PB** should still be running.

You should use this link: (http://localhost:3000/)[http://localhost:3000/]. The port `3000` was established in `astro.config.mjs`

You should see `Hello Contacts` in the browser

## Next
Next we'll implement `search` of the contacts and display a list of `contacts` in Astro.
<a href="/posts/post-6">Next</a>