import PocketBase from "pocketbase";
import pb from "./superuser.js"

async function addContacts() {
  let firstNames = [
    "Buddy",
    "Marilyn",
    "Charles",
    "Emily",
    "Neufy",
    "Felina",
    "Karen",
    "Erma",
    "Randy",
    "Lisa",
    "Joe",
  ];
  let lastNames = [
    "Hammond",
    "Perez",
    "Tank",
    "Smith",
    "Jones",
    "Jackson",
    "Irv",
    "Besome",
    "Hart",
    "Love",
  ];

  for (let first = 0; first < firstNames.length; first++) {
    for (let last = 0; last < lastNames.length; last++) {
      let _first = firstNames[first];
      let _last = lastNames[last];

      const data = {
        first: _first,
        last: _last,
        email: `${_first}@${_last}.com`,
        phone: "888-123-3343",
      };

      try {
        await pb.collection("contacts").create(data);
        console.log(`added ${_first} ${_last}`);
      } catch (e) {
        console.log(`${e}`);
      }
    }
  }
}
addContacts();
