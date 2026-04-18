import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Netlify's @netlify/plugin-nextjs
  output: "standalone",
};

export default nextConfig;
