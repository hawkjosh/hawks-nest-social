/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JSON_SERVER_URL: process.env.JSON_SERVER_URL,
  },
}

module.exports = nextConfig
