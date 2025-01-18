---
title: 'Securing Pocketbase API'
description: 'Lock down the access so that a defined superuser is required for authentication'
tags: ["pocketbase", "pockethost"]
layout: ../../layouts/Layout.astro
---
# Overview
Up to this point we've been working with Pocketbase in a unsecured manner - the API routes 
were opened up so that no authentication was required. 

Now we want to require authentication.

We're going to follow the example the author of **PB** provided: see [https://github.com/pocketbase/pocketbase/discussions/5313](https://github.com/pocketbase/pocketbase/discussions/5313) where the `superuser` is used.

But first review what we did prevously with this.  We want to undo that. So log into your **PB** and change the API rules to require the `superuser`.  There should be a button that states `Set Superuser only`.  Click it.

![https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/PB-API.jpg](https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/PB-API.jpg?raw=true)

#### Review
##### src/lib/superuser.js

```js
// src/superuser.js
// https://github.com/pocketbase/pocketbase/discussions/5313
import PocketBase from "pocketbase"
import { POCKETBASE_URL } from "astro:env/server";
import { POCKETBASE_SUPERUSER } from "astro:env/server";
import { POCKETBASE_PASSWORD } from "astro:env/server";

console.log(`pocketbase: user: ${POCKETBASE_SUPERUSER} pass: ${POCKETBASE_PASSWORD}`)

let pb = new PocketBase(POCKETBASE_URL);

try {
  const authData = await pb
    .collection("_superusers")
    .authWithPassword(POCKETBASE_SUPERUSER, POCKETBASE_PASSWORD);

  pb.autoCancellation(false);
  pb.authStore.save(pb.authStore.token)

} catch (e) {
  console.log(`authData: ${JSON.stringify(e)}`);
}

export default pb;
```