import http from 'node:http'
import "dotenv/config"
import { serveStatic } from './utils/serveStatic.js'
import { handleGet } from './handlers/routeHandlers.js'
import { handlePost } from './handlers/routeHandlers.js'
import { handleNews } from './handlers/routeHandlers.js'
import { createTable } from './schema.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

    if (req.url === '/api') {

        if (req.method === 'GET') {
            return await handleGet(res)
        }

        else if (req.method === 'POST') {
            handlePost(req, res)
        }

    } else if (req.url === "/api/news") {

      return await handleNews(req, res)

    } else if (!req.url.startsWith('/api')) {

        return await serveStatic(req, res, __dirname)

    }
})

async function startServer() {
    await createTable()
    server.listen(PORT,() => console.log(`Connected on port ${PORT}`))
    
}
startServer()