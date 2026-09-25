import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/livros/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
