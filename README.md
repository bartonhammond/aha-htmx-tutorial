# Astro - HTMX - Pocketbase - Alpine tutorial

### Install
`npm i`


### Running
* in one terminal `./scripts/start.sh` - this starts PB
* in another terminal `npm run dev` - this starts Astro

### Setup
* log into PB admin and Import `scripts/pb_schema.json` - this defines the Collections
* cd into `scripts`
* `node test.js` - to confirm you can connect to PB
* `node loadData.js` - to load Contacts

### HTMX
see [https://github.com/xstevenyung/astro-htmx](https://github.com/xstevenyung/astro-htmx)