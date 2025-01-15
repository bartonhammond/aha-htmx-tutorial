---
title: 'Web 1.0 Application'
description: 'Getting the basic site working'
tags: ["astro", "blogging", "learning in public"]
layout: ../../layouts/Layout.astro
---

# Overview
The **HSb** uses different technologies (Python, Flask, Jinja2) so we have to translate the requirements to what works for AHA.

With this first commit, we will have Astro installed and Pocketbase (**PB**).  We'll use **PB** to load some data. This will confirm that **PB** is installed and setup properly.

## What to do
*  First clone the project: [https://github.com/bartonhammond/aha-htmx-tutorial](https://github.com/bartonhammond/aha-htmx-tutorial)

*  Download **PB** and install into `/pb`  directory.  Follow the instructions here: [https://pocketbase.io/docs/](https://pocketbase.io/docs/)

*  Start **PB** by running this command in a terminal   `./scripts/start.sh`

*  Using your browser, go to link as provided in the terminal as shown here:

![https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/terminal-pocketbase.png](https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/terminal-pocketbase.png?raw=true)

Then enter the id/password for the super admin.  

Because the directory `pb/pb_migrations` exists, the migrations are run and the database will have the table `Contacts` defined now.  But, there is no data so we'll do that next.

## Adding some data
Go through the tutorials / blogs and use the GitHub site I provided to raise issues or questions.