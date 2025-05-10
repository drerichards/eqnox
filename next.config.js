/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'i.scdn.co',
      'mosaic.scdn.co',
      'platform-lookaside.fbsbx.com',
      'seeded-session-images.scdn.co',
      'image-cdn-fa.spotifycdn.com',
      'image-cdn-ak.spotifycdn.com',
    ],
  },
};

module.exports = nextConfig;
