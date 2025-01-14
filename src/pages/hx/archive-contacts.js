import {ContactArchiver} from "./archiver.js"

export async function GET() {
    const encoder = new TextEncoder()

    //The class that prepares the zip
    const contactArchiver = new ContactArchiver()
    await contactArchiver.writeContactsToTempDirectory()
    const countOfContacts = contactArchiver.getCountOfContacts()
    contactArchiver.prepareZip()
    

    // Create a streaming response
    const customReadable = new ReadableStream({
      async start(controller) {
        for (let cnt = 0; cnt < countOfContacts; cnt++) {

          const pct = `${(cnt / countOfContacts) * 100}`

            //this controls the progress bar
            controller.enqueue(encoder.encode(`data: ${pct}\n\n`))

            //This adds the contact to the zip
            contactArchiver.zipContact(cnt)

            //This is to slow it down so you can see it  :)
            await new Promise((r) => setTimeout(r, 100))
        }

        contactArchiver.finalize()

        controller.enqueue(encoder.encode(`event: closing\ndata: time to stop\n\n`))
        await new Promise((r) => setTimeout(r, 2000))
        
        controller.close()
      },
    })
    // Return the stream response and keep the connection alive
    return new Response(customReadable, {
      // Set the headers for Server-Sent Events (SSE)
      headers: {
        Connection: 'keep-alive',
        'Content-Encoding': 'none',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Type': 'text/event-stream; charset=utf-8',
      },
    })
  }