/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/tools/cv-maker',
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
