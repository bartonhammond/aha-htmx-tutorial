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

### Deployment
####Fly.io
see Dockerfile and fly.toml
Note that this app requires 3 secrets that locally are in the `.env.development`.
To deploy to Fly.io you don't want those secrets in the Dockerfile
Instead use `fly secrets`
You have to make three of them like this

```
fly secrets set POCKETBASE_URL=where ever
fly secrets set POCKETBASE_SUPERUSER=some email
fly secrets set POCKETBASE_PASSWORD=some password
```

##### Dockerfile

Add 2 volumes : [https://fly.io/docs/launch/volume-storage/](https://fly.io/docs/launch/volume-storage/)
*  `fly volumes create downloads -r dfw`

Verify - notice the `downloads` in the `NAME` column.  
```
fly volumes list        
ID                  	STATE  	NAME     	SIZE	REGION	ZONE	ENCRYPTED	ATTACHED VM   	CREATED AT     
vol_vpzmddnqn7xg5824	created	downloads	1GB 	dfw   	edff	true     	d891443c242e18	40 minutes ago	
vol_v3yeq0qkqzk3gdm4	created	downloads	1GB 	dfw   	8f05	true     	1857057c63de08	8 minutes ago 
```


##### pockethost.io
I used the options of `admin sync` so that deployments would still work.  For access, I created a 2nd super user and setup the
`fly secrets` using that.