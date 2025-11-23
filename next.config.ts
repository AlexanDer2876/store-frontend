/** @format */

import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/graphql", destination: "http://localhost:4000/graphql" },
    ];
  },
};

export default nextConfig;
