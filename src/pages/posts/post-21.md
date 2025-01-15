---
title: 'Dark mode selection'
description: 'Toggle between dark and light using picocss and add a little alpineJS'
tags: ["x-data", "localStorage"]
layout: ../../layouts/Layout.astro
---
# Overview
This commit is `dda1502e0a37fff7e18a7c6086707f0a4d068483`

This change was not from the **HSb** but just something I wanted ;)

### Review


### Review
#### src/layouts/Layout.astro
First we include our new `Header` component
```js
import Header from "@components/Header.astro"
```

We include `alpine`
```html
 <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
```

Updated the `html` tag
```html
<html lang='en' data-theme="light" ">
```

And include the Alpine `x-data` attribute after the `<Header/>`
```html
  <div x-data="{ dark: false }"></div>
```

#### src/components/ThemeIcon.astro
This componet has some `svg` stuff and `css` for styling. The part that makes it work 
is in the `<script>` tag at the bottom

Node the `is:inline` and the `type="module"`

What this JS code is doing is toggling the attribute `data-theme` on the `html` element
in the `Layout` component.  It stores the value in localStorage
```js
<!-- The type=module is required for correct behavior -->
<script is:inline type="module">

  let theme = "light"
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      theme = localStorage.getItem("theme")
  }

  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  window.localStorage.setItem("theme", theme);

  const handleToggleClick = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    const newTheme = theme === "dark" ? "light" : "dark";
    document.querySelector("html")?.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);
  };

  document
    .getElementById("themeToggle")
    ?.addEventListener("click", handleToggleClick);
</script>
```

#### src/components/Header.astro
Add a Header component.

```html
---
import ThemeIcon from "@components/ThemeIcon.astro";
---
<header>
    <nav>
        <ul>
            <li><strong>Contacts</strong></li>
        </ul>
        <ul>
            <li>
                <ThemeIcon />
            </li>
        </ul>
    </nav>
    <hr />
</header>
```

####    
## Next
 <a href="/posts/post-22">Next</a> show delete bulk button if at least 1 checkbox is checked