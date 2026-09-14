import db from '../db.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'
import { sightingEvents } from '../events/sightingEvents.js'
import { stories } from "../data/stories.js";


export async function handleGet(res) { 
  const [rows] = await db.execute('SELECT * FROM sightings')
  const content = JSON.stringify(rows)
  sendResponse(res, 200, 'application/json', content)
}

export async function handlePost(req, res) {

try {
    const parsedBody = await parseJSONBody(req)
    const sanitizedBody = sanitizeInput(parsedBody)

    const { uuid, location, timeStamp, title, text } = sanitizedBody

    await db.execute(
      `INSERT INTO sightings (uuid, location, timeStamp, title, text)
       VALUES (?, ?, ?, ?, ?)`,
      [uuid, location, timeStamp, title, text]
    )

    sightingEvents.emit('sighting-added', sanitizedBody)
    sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))
  } catch (err) {
    sendResponse(res, 400, 'application/json', JSON.stringify({ error: err.message }))
  }

}

export async function handleNews(req, res) {
  res.statusCode = 200

  
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length)

    const data = {
      event: 'news-update',
      story: stories[randomIndex]
    }

    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }, 3000)

}


