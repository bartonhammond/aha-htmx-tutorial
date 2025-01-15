---
title: 'active search'
description: 'How to search while uesr enters search terms'
tags: ["hx-trigger", "hx-target", "hx-select", "hx-get"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `b7029045436f6cdabbd99b8afd270c4a764ccf2c`

Only one update for this commit

### Review
#### src/pages/contacts.astro

The `search` input was updated:
```html
 <input
      id='search'
      type='search'
      name='q'
      value={q}
      hx-get='/contacts'
      hx-trigger='search, keyup delay:200ms changed'
      hx-target='tbody'
      hx-select='tbody tr'
    />
 ```

 ### Steps
 Try searching for phone numbers or names

 ## Next
 <a href="/posts/post-16">Next</a> we'll fix paging and add spinner