import * as Colyseus from "colyseus.js"

export const client = new Colyseus.Client(process.env.NEXT_PUBLIC_WEB_SOCKETS)
