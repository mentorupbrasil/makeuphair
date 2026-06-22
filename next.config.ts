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
  },
  outputFileTracingIncludes: {
    "/*": ["./dev.db"],
    "/api/**/*": ["./dev.db"],
    "/admin/**/*": ["./dev.db"],
    "/uploads/**/*": ["./public/uploads/**/*"],
  },
};

export default nextConfig;
