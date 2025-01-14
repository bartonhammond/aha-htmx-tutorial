// require modules
import fs from "fs";
import os from "os";
import archiver from "archiver";
import { getContacts } from "../../lib/pocketbase.js";
import { mkdir } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";
import path from "node:path";
import uniqueFilename from "unique-filename";

/**
 * ContactArchiver - saves all the Contacts from the db. Adds them to the zip
 */
export class ContactArchiver {
  constructor(downloadFileName) {
    this.output = `${os.tmpdir()}/contacts`;
    this.zipFile = `${os.tmpdir()}/contacts/example.zip`;
    this.downloadFileName = downloadFileName;
    this.contacts = [];
  }
  getCountOfContacts() {
    return this.contacts.length;
  }
  async writeContactsToTempDirectory() {
    let contacts = await getContacts("", 100000, 0);

    // Directory to write files
    try {
      await mkdir(this.output);
    } catch (err) {
      // ignore since it is made multiple times
    }

    // Write each contact as separate file
    for (let cnt = 0; cnt < contacts.length; cnt++) {
      const fileName = `${this.output}/${contacts[cnt].id}.json`;
      this.contacts.push(fileName);
      fs.writeFileSync(fileName, `${JSON.stringify(contacts[cnt])}`);
    }
  }
  prepareZip() {
    // create a file to stream archive data to.
    const output = fs.createWriteStream(`${this.zipFile}`);
    this.archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    // pipe archive data to the file
    this.archive.pipe(output);
  }

  zipContact(index) {
    const fileName = this.contacts[index];
    try {
      this.archive.file(`${fileName}`, { name: `${path.basename(fileName)}` });
    } catch (e) {
      console.log(e.message);
    }
  }

  finalize() {
    this.archive.finalize();
  }

  moveZip() {
    console.log(`cwd: ${process.cwd()}`)
    console.log(`ContactArchiver zipFile: ${this.zipFile} downloadFileName: ${this.downloadFileName}`)
    fs.rename(this.zipFile, this.downloadFileName, (err) => {
      if (err) throw err;
    });
  }
}
