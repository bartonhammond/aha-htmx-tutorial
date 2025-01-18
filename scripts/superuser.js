// src/superuser.js
// https://github.com/pocketbase/pocketbase/discussions/5313
import PocketBase from "pocketbase"
let POCKETBASE_URL  = process.env.POCKETBASE_URL
let POCKETBASE_SUPERUSER = process.env.POCKETBASE_SUPERUSER
let POCKETBASE_PASSWORD  = process.env.POCKETBASE_PASSWORD

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