import { MetadataRoute } from "next";

/**
 * Robots.txt configuration for Ottawa South Dental
 * Optimized for search engine crawling with proper access controls
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ottawasouthdental.com";

  return {
    rules: [
      // Default rules for all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
          "/*.json$",
          "/admin/",
          "/*?*", // Block URL parameters (reduces duplicate content)
        ],
      },
      // Google specific rules - more permissive
      {
        userAgent: "Googlebot",
        allow: ["/", "/services/", "/about/", "/patient-info/", "/contact"],
        disallow: ["/api/", "/_next/static/", "/private/"],
      },
      // Bing specific rules
      {
        userAgent: "Bingbot",
        allow: ["/", "/services/", "/about/", "/patient-info/", "/contact"],
        disallow: ["/api/", "/_next/static/", "/private/"],
      },
      // Image crawlers - allow access to images
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/LOGO.png"],
        disallow: ["/private/"],
      },
      // GPTBot - control AI crawler access
      {
        userAgent: "GPTBot",
        disallow: ["/"], // Block AI training on our content
      },
      // CCBot (Common Crawl) - block AI training
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      // Google-Extended - block Bard training
      {
        userAgent: "Google-Extended",
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
