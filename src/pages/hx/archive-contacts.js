import url from "url"
import  AdmZip from "adm-zip"
import { WriteOutContacts } from "./write-out-contacts.js"

function getDownloadFileName(params) {
  let urlParts = url.parse(params.url.toString())
  return urlParts.query.split("=")[1]
}
export async function GET(params, request) {
  console.log(`/archive-contacts params.url: ${JSON.stringify(params.url)}`)
  const encoder = new TextEncoder();
  let downloadFileName = getDownloadFileName(params)

  const writeOutContacts = new WriteOutContacts()
  const contacts = await writeOutContacts.writeContactsToTempDirectory()
  const countOfContacts = contacts.length
  
  const zip = new AdmZip()

 // Create a streaming response - SSE
  const customReadable = new ReadableStream({
    async start(controller) {
      for (let cnt = 0; cnt < countOfContacts; cnt++) {
        const pct = `${(cnt / countOfContacts) * 100}`;

        //this controls the progress bar
        controller.enqueue(encoder.encode(`data: ${pct}\n\n`));

        zip.addLocalFile(contacts[cnt]);

        //This is to slow it down so you can see it  :)
        await new Promise((r) => setTimeout(r, 100));
      } //for

      let distFilePath =
        "production" === import.meta.env.MODE
          ? `/app/dist/client/${downloadFileName}`
          : `public/${downloadFileName}`;

      try {
        zip.writeZip(distFilePath);
      } catch (e) {
        console.log(`zip.writeZip path: ${distFilePath} err: ${JSON.stringify(e)}`)
      }

      controller.enqueue(
        encoder.encode(`event: closing\ndata: time to stop\n\n`)
      );

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
