// @ts-ignore
import localtunnel from "localtunnel"

void (async () => {
  const tunnel = await localtunnel({port: 3000, subdomain: "unotwafrontend"})

  console.log("tunnel launched with url", tunnel.url)

  tunnel.on("close", () => {
    console.log("tunnel closed")
  })
})()
