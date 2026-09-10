import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev badge sits in the corner the theme uses for its own arrow, and this
  // page is judged on looking exactly like production. Off in dev too.
  devIndicators: false,
};

export default nextConfig;
