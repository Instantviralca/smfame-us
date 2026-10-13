/** @type {import('next').NextConfig} */

// Old WordPress product URLs (/product/...) → matching service page.
const productRedirects = [
  ["instagram-followers", "/buy-instagram-followers/"],
  ["instagram-likes", "/buy-instagram-likes/"],
  ["instagram-views", "/buy-instagram-views/"],
  ["instagram-comments", "/buy-instagram-comments/"],
  ["facebook-followers", "/buy-facebook-followers/"],
  ["facebook-page-likes", "/buy-facebook-page-likes/"],
  ["facebook-post-likes", "/buy-facebook-post-likes/"],
  ["tiktok-followers", "/buy-tiktok-followers/"],
  ["tiktok-likes", "/buy-tiktok-likes/"],
  ["tiktok-views", "/buy-tiktok-views/"],
].map(([keyword, destination]) => ({
  source: `/product/:slug(.*${keyword}.*)`,
  destination,
  permanent: true,
}));

const nextConfig = {
  reactStrictMode: true,
  // Keep the same trailing-slash URLs the WordPress site used, so indexed URLs do not change.
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/articles", destination: "/guides/", permanent: true },
      { source: "/articles/:slug", destination: "/guides/:slug/", permanent: true },
      ...productRedirects,
      { source: "/product", destination: "/services/", permanent: true },
      { source: "/product/:slug*", destination: "/services/", permanent: true },
      { source: "/shop", destination: "/services/", permanent: true },
      { source: "/terms-conditions", destination: "/terms-of-service/", permanent: true },
      { source: "/my-account", destination: "/", permanent: true },
      { source: "/locations.kml", destination: "/", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/product-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/local-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/dmca", destination: "/dmca-policy/", permanent: true },
      { source: "/tools", destination: "/free-tools/", permanent: true },
    ];
  },
};

export default nextConfig;
