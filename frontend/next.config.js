/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'data.voz.vn' },
      { hostname: 'secure.gravatar.com' },
    ],
  },
};

module.exports = nextConfig;
