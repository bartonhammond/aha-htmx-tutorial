---
title: 'Environment variables'
description: 'Preparing Astro to run on Fly.io with Pockethost.io'
tags: ["fly.io", "variables", "security"]
layout: ../../layouts/Layout.astro
---
# Overview
We now need to figure out how to keep environment variables available to Astro so that we can
switch between running locally and running on **Fly.io** with **PB** running on **PocketHost**

### Review
#### astro.config.mjs

The way Astro gets the run time environment variables requires modification to this file.

The 3 variables are defined.
```js
...
export default defineConfig({
    ....
  integrations: [alpinejs()],
  env: {
    schema: {
      POCKETBASE_URL: envField.string({
        context: "server",
        access: "secret",
      }),
	  POCKETBASE_SUPERUSER: envField.string({
        context: "server",
        access: "secret",
      }),
	  POCKETBASE_PASSWORD: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
```

##### package.json
The `scripts` section has been updated to run `dev` with a mode of `production`.  This means
that the development server can point to the **PB** on `pockethost`.  


```
 "scripts": {
    "dev": "astro dev",
    "prod": "astro dev --mode production",
    "build": "astro build --mode production",
    "preview": "astro preview",
    "astro": "astro"
  },
```

#### src/lib/superuser.js
This new file was suggested by the author of **PB** for frameworks like Astro that run in `SSR` mode.
Since we don't have a user account, we need to use the `superuser` account.  The `environment variables` are defind with the `astro:env/server` syntax as shown

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

##### src/lib/pocketbase.js
This just imports the `superuser.js` and uses the exported `pb` variable.
```
import pb from "./superuser.js"
```