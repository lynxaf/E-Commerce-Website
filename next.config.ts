import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ovlpxnzrigkdtonxgchc.supabase.co",
      },
    ],
  },
};

export default nextConfig;