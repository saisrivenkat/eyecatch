import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kota-content.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
