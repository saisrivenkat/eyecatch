import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kota-content.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "eyecatch.sgp1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "eyecatch.co.in",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default nextConfig;
