---
title: 'Fix paging and add spinner'
description: 'How to search while uesr enters search terms'
tags: ["hx-trigger", "hx-target", "hx-select", "hx-get", "hx-indicator"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `87f9871d4d380622daeb399d6ea0e2fc8a50f034`

### Review
#### src/pages/contacts.astro
Here the `hx-trigger` was updated and a `hx-indicator` with the `img` placed directly adjacent.  It has 3 conditions that will `hx-trigger` it - The input changing after 1/2 second, key up that is Enter, and on page load

```html
 <input
      id='search'
      type='search'
      name='q'
      value={q}
      hx-get='/contacts'
      hx-trigger="input changed delay:500ms, keyup[key=='Enter'], load"
      hx-select='tbody tr'
      hx-target="#search-results"
      hx-indicator=".htmx-indicator">
     <img style="height: 20px" 
        id="spinner" 
        class="htmx-indicator" 
        src="/img/spinning-circles.svg"/>
    <input type='submit' value='Search' />
```
## Next
 <a href="/posts/post-17">Next</a> we will add partials for contact rows