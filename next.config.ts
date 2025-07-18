import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'images.unsplash.com', pathname: '**'},
      {protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '**'}
    ]
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"]
  }
};

export default nextConfig;
