// @ts-check
import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import alpinejs from "@astrojs/alpinejs";

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
		}
	},
    integrations: [alpinejs()],
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
