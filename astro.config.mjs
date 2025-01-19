// @ts-check
import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import alpinejs from "@astrojs/alpinejs";

import starlight from "@astrojs/starlight";

export default defineConfig({
    output: "server",
    adapter: node({
	mode: "standalone",
    }),
    server: {
	port: 3000,
	host: "0.0.0.0",
	headers: {
	    "Cache-Control": "no-cache, no-store",
	    Pragma: "no-cache",
	    Expires: "0",
	},
    },
    integrations: [
	alpinejs(),
	starlight({
	    title: "DryStak",
	    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
	    sidebar: [
				{
		    label: 'Welcome',
		    autogenerate: { directory: 'welcome' },
		},

		{
		    label: 'Setup',
		    autogenerate: { directory: 'setup' },
		},
				{
		    label: 'Tutorial',
		    autogenerate: { directory: 'tutorial' },
		},

		{
		    label: 'Guides',
		    autogenerate: { directory: 'guides' },
		},
	    ],
	}),
    ],
    env: {
	schema: {
	    POCKETBASE_URL: envField.string({
		context: "server",
		access: "secret",
	    }),
	    POCKETBASE_SUPERUSER: envField.string({
		context: "server",
		access: "secret",
	    }),
	    POCKETBASE_PASSWORD: envField.string({
		context: "server",
		access: "secret",
	    }),
	},
    },
});
