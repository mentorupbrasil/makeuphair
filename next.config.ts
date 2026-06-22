import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/media/**",
      },
      {
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
