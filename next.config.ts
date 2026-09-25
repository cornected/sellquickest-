import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "*.run.app",
    "localhost:3000",
    "ais-dev-zhc3otxfkc4ei5ihjsjss4-546692586977.europe-west2.run.app",
  ],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
