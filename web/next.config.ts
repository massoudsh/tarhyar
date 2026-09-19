import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(process.cwd()),
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
