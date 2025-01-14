import { ContactArchiver } from "./archiver.js";
import url from 'url'

export async function GET(params, request ) {
  console.log(`/archive-contacts params.url: ${JSON.stringify(params.url)}`)

  let urlParts = url.parse(params.url.toString())
  console.log(`urlParts: ${JSON.stringify(urlParts.query)}`)

  let downloadFileName = urlParts.query.split("=")[1]
  console.log(`downloadFileName: ${downloadFileName}`)

  //const downloadFileName = params("downloadFileName")
  //console.log(`downloadFilName = ${downloadFileName}`)

  const encoder = new TextEncoder();

  //The class that prepares the zip
  const contactArchiver = new ContactArchiver(`${downloadFileName}.zip`)
  await contactArchiver.writeContactsToTempDirectory();
  const countOfContacts = contactArchiver.getCountOfContacts();
  contactArchiver.prepareZip();

  // Create a streaming response
  const customReadable = new ReadableStream({
    async start(controller) {
      for (let cnt = 0; cnt < countOfContacts; cnt++) {
        const pct = `${(cnt / countOfContacts) * 100}`;

        //this controls the progress bar
        controller.enqueue(encoder.encode(`data: ${pct}\n\n`));

        //This adds the contact to the zip
        contactArchiver.zipContact(cnt);

        //This is to slow it down so you can see it  :)
        await new Promise((r) => setTimeout(r, 100));
      }

      contactArchiver.finalize()
      contactArchiver.moveZip()

      controller.enqueue(
        encoder.encode(`event: closing\ndata: time to stop\n\n`)
      );
      await new Promise((r) => setTimeout(r, 2000));

      controller.close();
      
    },
  });
  // Return the stream response and keep the connection alive
  return new Response(customReadable, {
    // Set the headers for Server-Sent Events (SSE)
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
