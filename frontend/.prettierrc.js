/** @type {import("prettier").Options} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always"
}

module.exports = config
