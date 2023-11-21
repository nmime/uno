import * as crypto from "crypto"

export function computeSignature(
  wpayStoreApiKey: string,
  httpMethod: string,
  uriPath: string,
  timestamp: string,
  body: string
): string {
  const base64Body = Buffer.from(body).toString("base64")

  const stringToSign = `${httpMethod}.${uriPath}.${timestamp}.${base64Body}`

  const hmac = crypto.createHmac("sha256", wpayStoreApiKey)
  hmac.update(stringToSign)
  const byteArraySignature = hmac.digest()

  return Buffer.from(byteArraySignature).toString("base64")
}
