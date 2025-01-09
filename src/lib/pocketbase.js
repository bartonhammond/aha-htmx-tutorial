import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// globally disable auto cancellation
pb.autoCancellation(false)

export async function getContacts({ q = null, limit, page }) {
    const options = {
	filter: '',
    }

    if (q) {
	options.filter = `first ~ "${q}" || last ~ "${q}" || email ~ "${q}" || phone ~ "${q}"`
    }

    let contacts = []
    
    try {
	let results = await pb.collection('contacts').getList(page, limit, options)
	contacts = results.items
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

export async function updateContact(id, data) {
  let updatedContact

  try {
    updatedContact = await pb.collection('contacts').update(id, data)
  } catch (e) {
    console.log(e.response)
  }

  return updatedContact
}

export async function deleteContact(id) {
    console.log(`deleteContact: id: ${id}`)
  try {
    await pb.collection('contacts').delete(id)
  } catch (e) {
      
      console.log(e)
  }
}
