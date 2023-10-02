/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true
  },
  reactStrictMode: false,
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
