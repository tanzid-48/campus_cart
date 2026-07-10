import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongodb"],
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
       
      },
    ],
  },
};

export default nextConfig;
