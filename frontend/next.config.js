const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unogame.site",
        pathname: "/images/**"
      }
    ]
  }
}

module.exports = nextConfig
