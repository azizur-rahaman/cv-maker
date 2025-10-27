/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/tools/cv-maker',
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  turbopack: {
    resolveAlias: {
      canvas: false,
    },
  },
};

module.exports = nextConfig;
