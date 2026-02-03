/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization - critical for Core Web Vitals (LCP)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL for optimized images (60 days)
    minimumCacheTTL: 5184000,
    disableStaticImages: false,
  },

  // Experimental features for performance
  experimental: {
    // Tree-shake unused exports from packages
    optimizePackageImports: ["lucide-react", "clsx", "tailwind-merge"],
  },

  // Enable compression (gzip by default)
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Powered by header - remove for security (minor)
  poweredByHeader: false,

  // Strict mode for catching issues
  reactStrictMode: true,

  // Configure headers for better caching and security
  async headers() {
    return [
      {
        // Cache static images for 1 year
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache fonts for 1 year
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache optimized Next.js images
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache static JS/CSS chunks
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Security and performance headers for all pages
        source: "/:path*",
        headers: [
          // DNS prefetch for faster external resource loading
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // XSS protection (legacy but still useful)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Permissions policy - restrict sensitive APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        // Preload critical resources hint for HTML pages
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</images/home/hero-dentist-consultation.jpg>; rel=preload; as=image; fetchpriority=high, <https://fonts.googleapis.com>; rel=preconnect',
          },
        ],
      },
    ];
  },

  // Redirects for SEO consistency
  async redirects() {
    return [
      // Redirect trailing slashes for consistency
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
      // Common misspellings or old URLs
      {
        source: "/service",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/service/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/about/team",
        permanent: true,
      },
      {
        source: "/booking",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/appointment",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/new-patient",
        destination: "/patient-info/new-patients",
        permanent: true,
      },
      {
        source: "/insurance",
        destination: "/patient-info/payment-insurance",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
