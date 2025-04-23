import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com"],
  },
  ignoreDuringBuilds: true,
};

export default nextConfig;
