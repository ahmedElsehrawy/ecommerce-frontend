/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "i3.ytimg.com",
      "img.youtube.com",
      "image.tmdb.org",
      "image.tmdb.org/t/p/original",
      "contents.mediadecathlon.com",
      "www.thetimes.co.uk",
      "cdn.24.co.za",
      "guardian.ng",
      "imagesvc.meredithcorp.io",
    ],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
