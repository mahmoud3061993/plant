import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/products/plant",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products/plant",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
