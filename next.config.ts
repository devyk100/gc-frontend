import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["*", "encrypted-tbn0.gstatic.com", "cdn11.bigcommerce.com", "letsenhance.io", "cdn.britannica.com", "lh3.googleusercontent.com", "imgcdn.oto.com", "upload.wikimedia.org", "avatars.githubusercontent.com"]
  }
  
};

export default nextConfig;
