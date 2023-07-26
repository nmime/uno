import config from "@typings/config"

import express from "express"
import cors from "cors"
import expressify from "uwebsockets-express"

import { Server } from "@colyseus/core"
import { monitor } from "@colyseus/monitor"
import { playground } from "@colyseus/playground"
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport"
import { RedisDriver } from "colyseus"

import { MyRoom } from "@typings/room"

const transport = new uWebSocketsTransport()
const gameServer = new Server({
  // devMode: config.NODE_ENV === "development",
  driver: new RedisDriver(config.REDIS_URI),
  transport: transport
})

gameServer.define("game", MyRoom)

const app = expressify(transport.app)
app.use(express.json())
app.use(cors())
app.use(cors({ origin: "https://unogame.site" }))

app.use("/playground", playground)
app.use("/colyseus", monitor())

gameServer.onShutdown(() => {
  console.error("CUSTOM SHUTDOWN ROUTINE: STARTED")

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.error("CUSTOM SHUTDOWN ROUTINE: FINISHED")
      resolve()
    }, 1000)
  })
})

process.on("unhandledRejection", (e) =>
  console.error("unhandledRejection...", e)
)

gameServer
  .listen(config.PORT)
  .then(() =>
    console.log(`BACKEND successful started, listening on ${config.PORT}`)
  )
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
