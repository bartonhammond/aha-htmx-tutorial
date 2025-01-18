---
title: 'Pockethost setup'
description: "Securing the db and validating "
tags: ["pockethost"]
layout: ../../layouts/Layout.astro
---
# Overview

In this step, we want to setup an account on [https://pockethost.io/](https://pockethost.io/)

There is a trial for 7 days.  Otherwise it's $5 / month.

### Steps
#### Pocketbase
First let's get the local version working properly.  We want the API rules to be enabled again.

So use this image to guide you to selecting the API rules and making them to require the `superuser`.

![https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/PB-API.jpg](https://github.com/bartonhammond/aha-htmx-tutorial/blob/master/public/img/PB-API.jpg?raw=true)

#### PocketHost.io
Create an account and create on instance.  
Note that the `admin sync` is on by default.  That means that the `password` to the `superuser` is 
the password that is for `pockethost.io` itself.

Use the Admin interface and log in with the credentials of `pockethost.io`

Go to the `settings` -> `sync` -> `import collections` and click `Load from JSON file`

Navigate to your project -> `pb/pb_schema.json` and select it

Select `Merge with the existing collections` and click `Review` and click `Confirm and import`

#### Environment variables
In the root of the project, there is a `.env-example`.  Copy it to
*  `.env.development`
*  `env.production`

In the `.env.development` you should update to use your local admin and password as here:

```js
POCKETBASE_URL=http://127.0.0.1:8090
POCKETBASE_SUPERUSER=bartonhammond@gmail.com
POCKETBASE_PASSWORD=password12
```

The `.env.production` should use your `pockethost.io` url, email and password.  If you prefer, create another `superuser` and use that email and password


#### Test scripts
There are two scripts that can be used to verify the db & environments are setup
*  `scripts/test.sh` - Displays data from the server
*  `scripts/loadData.sh` - Loads `contacts` into the db

Run the scripts 
*  `./scripts/test.sh development` or use `./scripts/test.sh production`
*  `.scripts/loadData.sh development` or use `./scripts/loadData.sh production`

Run these to confirm the `env variables` are set properly

## Next
 <a href="/posts/post-27">Next</a> prepare deployment to fly.io and pockethost.io
 

