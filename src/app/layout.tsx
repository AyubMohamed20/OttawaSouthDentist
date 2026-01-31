import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { siteMetadata, structuredData, JsonLd } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Font optimization: Use variable fonts with subset and display swap
// This reduces CLS (Cumulative Layout Shift) by showing fallback fonts immediately
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  // Preload the most common weights for faster initial paint
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
  // Only load weights we actually use (bold for headings)
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#722F37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.defaultTitle,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.defaultDescription,
  keywords: [
    ...siteMetadata.defaultKeywords,
    "cosmetic dentistry",
    "teeth cleaning",
    "dental checkup",
    "emergency dentist Ottawa",
    "multilingual dentist",
  ],
  authors: [{ name: siteMetadata.siteName }],
  creator: siteMetadata.siteName,
  publisher: siteMetadata.siteName,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    siteName: siteMetadata.siteName,
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    url: siteMetadata.siteUrl,
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Ottawa South Dental - Family Dental Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    images: ["/images/og/og-default.jpg"],
    creator: siteMetadata.twitterHandle,
    site: siteMetadata.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // SVG favicon - works in all modern browsers
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    // Safari pinned tab icon
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#722F37",
      },
    ],
    // Note: For broader compatibility, generate these files using:
    // - https://realfavicongenerator.net (upload icon.svg)
    // - Or run: npm install sharp && node scripts/generate-favicons.js
    // Then uncomment:
    // icon: [
    //   { url: "/favicon.ico", sizes: "any" },
    //   { url: "/icon.svg", type: "image/svg+xml" },
    //   { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    //   { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    // ],
    // apple: [
    //   { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    // ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  category: "health",
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to external origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for Google Maps (used on contact page) */}
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />

        {/* Global structured data for all pages */}
        <JsonLd data={structuredData.localBusiness()} />
        <JsonLd data={structuredData.organization()} />
        <JsonLd data={structuredData.webSite()} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#722F37] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#722F37]"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
