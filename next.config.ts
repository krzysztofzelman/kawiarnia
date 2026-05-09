import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://cczjvmtmajwxdzjqasnj.supabase.co https://vercel.live; frame-src https://vercel.live; worker-src 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
