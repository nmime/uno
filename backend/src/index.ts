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
import { addCORS } from "@helpers/addCORS"
import config from "@typings/config"
import { MyRoom } from "@typings/room"
import { RedisDriver } from "colyseus"
import { connect } from "mongoose"

const transport = new uWebSocketsTransport({
  idleTimeout: 60,
  sendPingsAutomatically: true
})

transport.app.options("/*", (res) =>
  // eslint-disable-next-line @typescript-eslint/require-await
  addCORS(res, async () => {
    res.end()
  })
)

transport.app.get("/userinfo", (res, req) =>
  addCORS(res, () => getUserInfo(res, req))
)
transport.app.get("/topOfUsers/:by", (res, req) =>
  addCORS(res, () => topOfUsers(res, req))
)

transport.app.get("/createOrder", (res, req) =>
  addCORS(res, () => createOrder(res, req))
)
transport.app.post("/webhookForOrder", (res, req) =>
  addCORS(res, () => webhookForOrder(res, req))
)
transport.app.get("/receiveOrder/:id", (res, req) =>
  addCORS(res, () => receiveOrder(res, req))
)

transport.app.post("/receiveReward", (res, req) =>
  addCORS(res, () => receiveReward(res, req))
)

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
