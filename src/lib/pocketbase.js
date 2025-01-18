import pb from "./superuser.js"
import validator from "validator";

export async function getContacts({ q = null, limit, page }) {
  console.log(`getContacts q: ${q} limit: ${limit} page: ${page}`)
  const options = {
    filter: "",
  };

  if (q) {
    options.filter = `first ~ "${q}" || last ~ "${q}" || email ~ "${q}" || phone ~ "${q}"`;
  }

  let contacts = [];

  try {
    let results = await pb.collection("contacts").getList(page, limit, options);
    contacts = results.items;
  } catch (e) {
    console.log(`getContacts error: ${JSON.stringify(e)}`);
  }
  return contacts;
}

export async function addContact({ first, last, phone, email }) {
  let newContact;
  let contact = {
    first,
    last,
    phone,
    email,
  };

  let errors = validateContact(contact);

  const noErrors = Object.values(errors).every((x) => x === null || x === "");

  if (noErrors) {
    try {
      newContact = await pb.collection("contacts").create(contact);
    } catch (e) {
      console.log(e.response);
    }
    return newContact;
  } else {
    throw { errors, contact };
  }
}

export async function getContact(id) {
  let contact;
  try {
    const options = {};
    contact = await pb.collection("contacts").getOne(id, options);
  } catch (e) {
    console.log(e.response);
  }

  return contact;
}

export async function updateContact(id, data) {
  let updatedContact;

  try {
    updatedContact = await pb.collection("contacts").update(id, data);
  } catch (e) {
    console.log(e.response);
  }

  return updatedContact;
}

export async function deleteContact(id) {
  console.log(`deleteContact: id: ${id}`);
  try {
    await pb.collection("contacts").delete(id);
  } catch (e) {
    console.log(e);
  }
}

export async function getCount() {
  let count = 0;
  try {
    let results = await pb.collection("contacts").getList(1, 1);
    count = results.totalItems;
  } catch (e) {
    console.log(e);
  }
  return count;
}

function validateContact(contact) {
  const errors = {
    first: "",
    last: "",
    email: "",
    phone: "",
  };

  if (validator.isEmpty(contact.first)) {
    errors.last = "First name required";
  }

  if (validator.isEmpty(contact.last)) {
    errors.last = "Last name required";
  }

  if (!validator.isEmail(contact.email)) {
    errors.email = "Invalid email";
  }

  if (!validator.isMobilePhone(contact.phone)) {
    errors.phone = "Invalid phone";
  }
  return errors;
}
