import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// you can also fetch all records at once via getFullList
try {
const records = await pb.collection('contacts').getFullList();

    console.log(`result: ${JSON.stringify(records)}`)
} catch(e) {
    console.log(`e: ${e}`)
}
