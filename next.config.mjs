/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/free-thriller/texas/houston",
        destination: "/free-thriller/wyoming/sheridan/",
        permanent: true,
      },
      {
        source: "/free-thriller/texas/houston/",
        destination: "/free-thriller/wyoming/sheridan/",
        permanent: true,
      },
    ];
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/geo-hint": ["./content/**/*"],
      "/api/cron/publish": ["./content/**/*"],
      "/blog/rss.xml": ["./content/**/*"],
    },
  },
};

export default nextConfig;
