# AHA Example
## Astro - HTMX - Alpine- Pocketbase - PicoCSS - Fly

### Install
#### Pocketbase
* copy a `pocketbase` app to the `pb` directory
* run `./scripts/start.sh` to start `pocketbase`
* import the `pb/pb_schema.json` to create the `contacts` db
* create an admin, turn off the API rules on `contacts`
#### Astro
*  `npm i`

### Running
* in one terminal `./scripts/start.sh` - this starts PB
* in another terminal `npm run dev` - this starts Astro

### Loading data
* cd into `scripts`
* `node loadData.js development | production` - to load Contacts
* `node test.js development | production` - to confirm db


### Deployment 
Both Astro and Pocketbase are deployed to Fly.io
#### Astro
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

Next, you need to have disk space to write the `archive zip` file

Add 2 volumes : [https://fly.io/docs/launch/volume-storage/](https://fly.io/docs/launch/volume-storage/)
*  `fly volumes create downloads -r dfw`

Verify - notice the `downloads` in the `NAME` column.  
```
fly volumes list        
ID                  	STATE  	NAME     	SIZE	REGION	ZONE	ENCRYPTED	ATTACHED VM   	CREATED AT     
vol_vpzmddnqn7xg5824	created	downloads	1GB 	dfw   	edff	true     	d891443c242e18	40 minutes ago	
vol_v3yeq0qkqzk3gdm4	created	downloads	1GB 	dfw   	8f05	true     	1857057c63de08	8 minutes ago 
```

##### Pocketbase
See the complete instructions here: [https://github.com/pocketbase/pocketbase/discussions/537](https://github.com/pocketbase/pocketbase/discussions/537)
see the `Dockerfile` and `fly.yml` in the `pb` directory
Note that Pocketbase needs the volume storage as shown above
