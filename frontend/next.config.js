/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    redirects: [
      {
        source: '/news',
        destination: '/blog',
        permanent: 'true',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.wprdc.org',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
