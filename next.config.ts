import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Allow production builds even if ESLint errors exist
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* other config options here */
};

export default nextConfig;