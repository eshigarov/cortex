import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/cortex",
  images: { unoptimized: true },
};

export default nextConfig;
