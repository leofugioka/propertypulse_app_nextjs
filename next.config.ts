import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  env: {
    NEXT_GOOGLE_PUBLIC_GEOCODING_API_KEY: process.env.NEXT_GOOGLE_PUBLIC_GEOCODING_API_KEY,
    NEXT_MAPBOX_PUBLIC_TOKEN: process.env.NEXT_MAPBOX_PUBLIC_TOKEN,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  },
};

export default nextConfig;
