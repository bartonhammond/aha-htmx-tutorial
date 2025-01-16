import PocketBase from "pocketbase";

const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

// you can also fetch all records at once via getFullList
try {
  const records = await pb.collection("contacts").getFullList();

  console.log(`result: ${JSON.stringify(records)}`);
} catch (e) {
  console.log(`e: ${e}`);
}
