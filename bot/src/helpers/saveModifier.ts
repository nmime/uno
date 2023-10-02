import { Document, Model } from "mongoose"

export async function saveModifier<T extends Document>(
  object: T | null | undefined
): Promise<void> {
  try {
    if (object) {
      if (object instanceof Model) await object.save()
      else
        console.error("Object is not an instance of a Mongoose model", object)
    } else console.log("Object is null or undefined, operation ignored")
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (err.code === 11000)
      console.log("Attempted to save duplicate, operation ignored", object)
    else console.error("An error occurred: ", object, err)
  }
}
