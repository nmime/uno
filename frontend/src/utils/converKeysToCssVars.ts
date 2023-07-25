export function convertKeysToCssVars(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const cssVariableObj: Record<string, unknown> = {}

  for (let key in obj) {
    let cssVariableKey = `--${key
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase()}`
    cssVariableObj[cssVariableKey] = obj[key]
  }

  return cssVariableObj
}
