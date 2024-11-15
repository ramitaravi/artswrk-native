/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
  },
  transpilePackages: ['firebase']
}

module.exports = nextConfig
