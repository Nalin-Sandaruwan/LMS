import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/admin",
  // @ts-ignore - Temporary workaround if types are outdated
  allowedDevOrigins: ["31.97.135.164"],
};

export default nextConfig;
