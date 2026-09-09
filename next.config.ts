import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        /* Page only — do not catch /portfolio/*.png assets */
        source: "/portfolio",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
