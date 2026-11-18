/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  experimental: {
    outputFileTracingIncludes: {
      "/api/geo-hint": ["./content/**/*"],
      "/api/cron/publish": ["./content/**/*"],
      "/blog/rss.xml": ["./content/**/*"],
    },
  },
};

export default nextConfig;
