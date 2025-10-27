import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['to-do-list-rho-ashen.vercel.app'],
    formats: ['image/webp', 'image/avif'], 
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
