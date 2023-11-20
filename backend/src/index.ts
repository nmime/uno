import {
  createOrder,
  getUserInfo,
  receiveOrder,
  receiveReward,
  topOfUsers,
  webhookForOrder
} from "@actions/api"
import { getGameById } from "@actions/api/getGameById"
import { Server } from "@colyseus/core"
import { RedisPresence } from "@colyseus/redis-presence"
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport"
import { addCORS } from "@helpers/addCORS"
import config from "@typings/config"
import { MyRoom } from "@typings/room"
import { matchMaker, RedisDriver } from "colyseus"
import { connect } from "mongoose"

import devHeaders from "./typings/devHeaders.json"

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

transport.app.get("/getGameById/:id", (res, req) =>
  addCORS(res, async () => getGameById(res, req))
)

const gameServer = new Server({
  devMode: config.NODE_ENV === "development",
  driver: new RedisDriver({
    host: config.REDIS_HOST,
    password: config.REDIS_PASS,
    port: config.REDIS_PORT
  }),
  greet: false,
  presence: new RedisPresence({
    host: config.REDIS_HOST,
    password: config.REDIS_PASS,
    port: config.REDIS_PORT
  }),
  transport: transport
})

matchMaker.controller.getCorsHeaders = function () {
  return config.NODE_ENV === "development" ? devHeaders : {}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
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
