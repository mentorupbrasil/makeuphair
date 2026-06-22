import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./dev.db"],
    "/api/**/*": ["./dev.db"],
    "/admin/**/*": ["./dev.db"],
  },
};

export default nextConfig;
