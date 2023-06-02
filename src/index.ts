import createServer from "./server"
import createClient from "./client"

async function start() {
    const server = createServer()
    const client = createClient()

    await server.start()
    await client.start()
}

start()