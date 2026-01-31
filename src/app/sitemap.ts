import { MetadataRoute } from "next";

const BASE_URL = "https://ottawasouthdental.com";

/**
 * Comprehensive sitemap for Ottawa South Dental
 * Includes all pages with optimized priorities and change frequencies
 * for maximum search engine visibility
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core pages - highest priority for local SEO
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // About pages - establish trust and authority
  const aboutPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about/team`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Patient information pages - important for conversions
  const patientInfoPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/patient-info`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/patient-info/new-patients`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/patient-info/payment-insurance`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/patient-info/cdcp`,
      lastModified: currentDate,
      changeFrequency: "weekly", // CDCP info may update frequently
      priority: 0.8, // High priority - government program
    },
  ];

  // Service pages with individual priorities based on search volume
  const services = [
    { slug: "dental-implants", priority: 0.9 }, // High search volume
    { slug: "invisalign", priority: 0.9 }, // High search volume
    { slug: "teeth-whitening", priority: 0.85 },
    { slug: "cosmetic-dentistry", priority: 0.85 },
    { slug: "root-canal", priority: 0.85 },
    { slug: "dental-hygiene", priority: 0.8 },
    { slug: "preventive-dentistry", priority: 0.8 },
    { slug: "routine-checkups", priority: 0.8 },
    { slug: "dentures", priority: 0.8 },
    { slug: "oral-surgery", priority: 0.75 },
    { slug: "gum-therapy", priority: 0.75 },
    { slug: "white-fillings", priority: 0.75 },
    { slug: "missing-teeth", priority: 0.75 },
    { slug: "childrens-dentistry", priority: 0.85 }, // Family-focused service
    { slug: "emergency-care", priority: 0.9 }, // High urgency searches
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: service.priority,
  }));

  return [...corePages, ...aboutPages, ...legalPages, ...patientInfoPages, ...servicePages];
}
