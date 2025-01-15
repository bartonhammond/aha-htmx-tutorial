---
title: 'Using hx-boost'
description: 'First use of htmx!'
tags: ["htmx", "hx-boost"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `36ce02891ce596de8dca3bd4f4effd3768455a56`

Finally we are doing HTMX!  We are here in the **HSb** [https://hypermedia.systems/htmx-patterns/](https://hypermedia.systems/htmx-patterns/)

Note that we already had htmx installed in the `src/layouts/Layout.astro1`

### Review
####  src/layouts/Layout.astro

The change here is shown:
```
 <body hx-boost="true">
    <slot />
  </body>
</html>
```

## Next
<a href="/posts/post-10">Next</a> we'll look at using HTMX to delete 