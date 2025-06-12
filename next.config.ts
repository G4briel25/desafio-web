import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    images: {
        domains: ['https://img.freepik.com/'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                pathname: '/fotos-gratis/**',
            },
        ],
    },

};

export default nextConfig;
