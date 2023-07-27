import { Context } from "@typings/context"
import axios from "axios"
import config from "@typings/config"
import { promises as fs } from "fs"

export const uploadImage = async (ctx: Context): Promise<void> => {
  const photo = await ctx.getUserProfilePhotos()
  if (!photo.photos[0]) return

  const file = await ctx.api.getFile(photo.photos[0][0].file_id)
  const image = await axios.get(
    `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`,
    { responseType: "arraybuffer" }
  )

  await fs.writeFile(
    `/var/www/unogame.site/images/${ctx.from.id}.jpg`,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    image.data
  )
}
