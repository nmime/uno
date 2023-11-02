import { validate } from "@tma.js/init-data-node"
import config from "@typings/config"

export function validation(header: string): boolean {
  let passed = false

  try {
    validate(header, config.BOT_TOKEN)

    passed = true
  } catch (e) {
    /* empty */
  }

  try {
    validate(header, config.BOT_TOKEN_TEST)

    passed = true
  } catch (e) {
    /* empty */
  }

  return passed
}
