/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:3000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
