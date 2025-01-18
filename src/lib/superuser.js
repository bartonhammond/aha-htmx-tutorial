// src/superuser.js
// https://github.com/pocketbase/pocketbase/discussions/5313
import PocketBase from "pocketbase"
import { POCKETBASE_URL } from "astro:env/server";
import { POCKETBASE_SUPERUSER } from "astro:env/server";
import { POCKETBASE_PASSWORD } from "astro:env/server";

console.log(`pocketbase: user: ${POCKETBASE_SUPERUSER} pass: ${POCKETBASE_PASSWORD}`)

let pb = new PocketBase(POCKETBASE_URL);

try {
  const authData = await pb
    .collection("_superusers")
    .authWithPassword(POCKETBASE_SUPERUSER, POCKETBASE_PASSWORD);

  pb.autoCancellation(false);
  pb.authStore.save(pb.authStore.token)

} catch (e) {
  console.log(`authData: ${JSON.stringify(e)}`);
}

export default pb;
