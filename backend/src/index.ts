import {
  createOrder,
  getUserInfo,
  receiveOrder,
  receiveReward,
  topOfUsers,
  webhookForOrder
} from "@actions/api"
import { Server } from "@colyseus/core"
import { RedisPresence } from "@colyseus/redis-presence"
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport"
import config from "@typings/config"
import { MyRoom } from "@typings/room"
import { RedisDriver } from "colyseus"
import { connect } from "mongoose"

const transport = new uWebSocketsTransport({
  idleTimeout: 60,
  sendPingsAutomatically: true
})

transport.app.get("/userinfo", getUserInfo)
transport.app.get("/topOfUsers/:by", topOfUsers)

transport.app.get("/createOrder", createOrder)
transport.app.post("/webhookForOrder", webhookForOrder)
transport.app.get("/receiveOrder/:id", receiveOrder)

transport.app.post("/receiveReward", receiveReward)

const gameServer = new Server({
  driver: new RedisDriver({
    host: config.REDIS_HOST,
    password: config.REDIS_PASS,
    port: config.REDIS_PORT
  }),
  presence: new RedisPresence({
    host: config.REDIS_HOST,
    password: config.REDIS_PASS,
    port: config.REDIS_PORT
  }),
  transport: transport
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
gameServer.define("game", MyRoom).sortBy({ clients: -1 })

gameServer
  .listen(config.PORT)
  .then(() =>
    console.log(`BACKEND successful started, listening on ${config.PORT}`)
  )
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

connect(config.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err))

process.on("unhandledRejection", (e) =>
  console.error("unhandledRejection...", e)
)
