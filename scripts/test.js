import PocketBase from "pocketbase";
import pb from "./superuser.js"

try {
  const records = await pb.collection("contacts").getFullList();

  console.log(`result: ${JSON.stringify(records)}`);
} catch (e) {
  console.log(`e: ${e}`);
}
