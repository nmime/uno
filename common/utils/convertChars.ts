export const convertChars = (str: string) => {
  const chars = { '"': "&quot;", "&": "&amp;", "<": "&lt;", ">": "&gt;" }

  return str.replace(/[<>&]/g, (s) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return chars[s]
  })
}
