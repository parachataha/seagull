import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://z90iq4irr8.ufs.sh/**')],
  },
};

export default nextConfig;
