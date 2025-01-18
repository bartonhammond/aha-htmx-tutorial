// require modules
import fs from "fs"
import os from "os"
import { getContacts } from "../../lib/pocketbase.js"
import { mkdir } from "node:fs/promises"
/**
 * class to take contacts and write out json
 *  */
export class WriteOutContacts {
  constructor() {
    this.output =
      "production" === import.meta.env.MODE
        ? `/downloads/contacts`
        : `${os.tmpdir()}/contacts/`

    this.contacts = []
  }
  
  async writeContactsToTempDirectory() {
    let contacts = await getContacts("", 100000, 0)

    // Directory to write files
    try {

      await mkdir(this.output)
    } catch (err) {
      //ignore as it gets made every time
    }

    // Write each contact as separate file
    for (let cnt = 0; cnt < contacts.length; cnt++) {
      const fileName = `${this.output}/${contacts[cnt].id}.json`
      this.contacts.push(fileName)
      try {
        fs.writeFileSync(fileName, `${JSON.stringify(contacts[cnt])}`)
      } catch (e) {
        console.log(`writeFileSync err: ${JSON.stringify(e)}`)
      }
    }
    return this.contacts
  }
}
