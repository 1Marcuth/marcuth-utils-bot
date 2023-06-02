import express from "express"

function createServer(options = {
  port: process.env.PORT || 8000
}) {
  const app = express()
  const port = options.port
  let server: any

  app.head("/", (req, res) => {
    return res.send({ message: "Server ok!" })
  })

  function start() {
    return new Promise((resolve, reject) => {
      server = app.listen(port, () => {
        console.log(`> [server] Listenin on: http://localhost:${port}/`)
        return resolve(null)
      })
    })
  }

  function stop() {
    return new Promise((resolve, reject) => {
      console.log(`> [server] Stopped successfully!`)
      return resolve(null)
    })
  }

  return { start, stop }
}

export default createServer