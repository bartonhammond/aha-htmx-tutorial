---
title: 'Install and Set up PB'
description: 'Setting up PB admin and loading data'
tags: ["pocketbase", "install", "npm"]
layout: ../../layouts/Layout.astro
---
# Overview 
Now we want to get **PB** setup.  We'll start it, create an Super Admin userid and password and then load some data.

## Steps
*  Open a terminal and navigate to the cloned repo and enter the command `npm install`.

*  Download **PB** and copy it into the `/pb`  directory.  Follow the instructions here: [https://pocketbase.io/docs/](https://pocketbase.io/docs/) 

*  Start **PB** by running this command in a terminal: `./scripts/start.sh`

*  Using your browser, go to link as provided in the terminal as shown here:

![https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/terminal-pocketbase.png](https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/terminal-pocketbase.png?raw=true)

Enter a id/password for the super admin.  Just remember what you enter. 

Because the directory `pb/pb_migrations` exists, the migrations are run and the database will have the table `Contacts` defined now.  But, there is no data so we'll do that next.

Leave **PB** running.  

## Adding some data
Open another terminal and navigate to the `scripts` directory.  From there run `node loadData.js`.  This will create `Contacts` data in **PB**

To confirm the load worked, run `node test.js`

We have data now in **PB**.  You can login to **PB** and view the data in `Contacts`

## Next
Next we'll start writing `Astro` code
<a href="/posts/post-5">Next</a>
