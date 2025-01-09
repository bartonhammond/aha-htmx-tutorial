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

export async function addContact({ first, last, phone, email }) {
    let newContact
    
    try {
	newContact = await pb.collection('contacts').create({
	    first,
	    last,
	    phone,
	    email,
	})
    } catch (e) {
	console.log(e.response)
    }
    return newContact
}

export async function getContact(id) {
  let contact
  try {
    const options = {}
    contact = await pb.collection('contacts').getOne(id, options)
  } catch (e) {
    console.log(e.response)
  }

  return contact
}

