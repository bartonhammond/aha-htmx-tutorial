---
title: 'Prepare deployment to fly.io and pockethost.io'
description: "Lots of changes everywhere"
tags: ["deploy", "fly", "pockethost"]
layout: ../../layouts/Layout.astro
---
# Overview
At this point, with `git`, checkout the `master` branch so that you're working with the final release.

We are now going to deploy this application.  The database will be hosted on [https://pockethost.io/](https://pockethost.io/)

The application will be hosted on [https://fly.io](https://fly.io)

There were a lot of changes that were required and there were numerous manual steps 
to get this application running in the wild with these businesses.

What will be done is the following

*  Setup account on **Pockethost** and configure **PB**
*  Setup account on **Fly** 
*  Create / update `Dockerfile` and `fly.toml`
*  Create disk space on **Fly**
*  Define `environment variables` 

## Next
 <a href="/posts/post-26">Next</a> using pockethost