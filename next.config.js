module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        // Deezer cover art. Any square size can be requested from a release's
        // md5_image, so covers scale with the layout — see lib/albums.js.
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
      },
    ],
  },
};
