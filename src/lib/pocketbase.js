import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// globally disable auto cancellation
pb.autoCancellation(false)

export async function getContacts({ q = null }) {
  const options = {
    filter: '',
  }

  if (q) {
    options.filter = `first ~ "${q}" || last ~ "${q}" || email ~ "${q}" || phone ~ "${q}"`
  }

    let contacts = []
    
  try {
    contacts = await pb.collection('contacts').getFullList(options)
    console.log(contacts)
  } catch (e) {
    console.log(e.response)
  }
  return contacts
}
