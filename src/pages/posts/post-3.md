---
title: 'Initial code review'
description: 'Review the initial code'
tags: ["pocketbase"]
layout: ../../layouts/Layout.astro
---
# Overview 
Let's review the code that we're starting with.

Here's the directory layout.  Notice that we are on the `detached head`.

![https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/initial-directory.png](https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/initial-directory.png?raw=true)

## astro-config.mjs
This file was updated so that Astro can run in the `SSR` mode.  Look at the `output` value of `server`.

```json
// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: 3000,
    host: '0.0.0.0',
    headers: {
      'Cache-Control': 'no-cache, no-store',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
})

```
## package.json
Note that `astro` and `pocketbase` are installed.  This is the **PB** SDK, not the db itself.
```json
{
  "name": "hypermedia",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/node": "^9.0.0",
    "astro": "^5.1.3",
    "pocketbase": "^0.25.0"
  }
}
```

## tsconfig.json
This is the TypeScript configuration. I do not use TypeScript but this file will provide definitions that come in handy when writing the code later.

## src/layouts/Layout.astro
Two things about the Layout, it has the `slot` defined and `htmx` is installed.  

```html
<html lang='en'>
  <head>
    <meta charset='utf-8' />
    <meta http-equiv='Cache-Control' content='no-cache, no-store' />
    <meta http-equiv='Pragma' content='no-cache' />
    <meta http-equiv='Expires' content='0' />
    <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
    <meta name='viewport' content='width=device-width' />
    <meta name='generator' content='{Astro.generator}' />
    <script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" crossorigin="anonymous"></script>
    <title>app</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

## scripts/
We'll use these scripts in subsequent steps.

*  `loadData.js` will be used to populate the **PB** with Contacts
*  `start.sh` can be used to start **PB**
*  `test.js` is way to determine if we connect to **PB** and can retreive data

## Next
<a href="/posts/post-4">Next</a> we'll intall and setup **PB**
