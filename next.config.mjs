/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: process.env.NEXT_PUBLIC_SHIV_API_URL 
          ? `${process.env.NEXT_PUBLIC_SHIV_API_URL}/:path*`
          : 'http://127.0.0.1:8000/:path*',
      },
    ];
  },
};

export default nextConfig;
