import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/data/site-config';

/**
 * Site-wide SEO defaults
 */
export const siteMetadata = {
  siteName: 'Ottawa South Dental',
  siteUrl: siteConfig.url,
  locale: 'en_CA',
  twitterHandle: '@ottawasouthdental',
  defaultTitle: 'Ottawa South Dental | Your Trusted Family Dentist',
  defaultDescription:
    'Ottawa South Dental provides comprehensive family dental care in a comfortable, welcoming environment. From preventive care to cosmetic dentistry, we are here for your smile.',
  defaultKeywords: [
    'dentist Ottawa',
    'family dentist',
    'dental care Ottawa South',
    'Ottawa South Dental',
    'Bank Street dentist',
    'CDCP dentist Ottawa',
  ],
  ogImage: {
    url: '/images/og/og-default.jpg',
    width: 1200,
    height: 630,
    alt: 'Ottawa South Dental - Family Dental Care',
  },
};

/**
 * Viewport configuration for the site
 */
export const viewport: Viewport = {
  themeColor: '#722F37',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Options for creating page metadata
 */
interface CreateMetadataOptions {
  /** Page title (will be appended with site name via template) */
  title: string;
  /** Page description for SEO (120-160 characters recommended) */
  description: string;
  /** Page-specific keywords */
  keywords?: string[];
  /** Canonical path (e.g., '/about', '/services/dental-implants') */
  canonicalPath?: string;
  /** Open Graph image configuration */
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    alt: string;
  };
  /** Page type for Open Graph */
  ogType?: 'website' | 'article' | 'profile';
  /** Whether to index this page (default: true) */
  noIndex?: boolean;
  /** Whether to follow links on this page (default: true) */
  noFollow?: boolean;
  /** Additional Open Graph properties */
  openGraph?: Record<string, unknown>;
  /** Additional Twitter properties */
  twitter?: Record<string, unknown>;
}

/**
 * Creates standardized metadata for a page
 *
 * @example
 * ```ts
 * export const metadata = createMetadata({
 *   title: 'About Us',
 *   description: 'Learn about Ottawa South Dental...',
 *   canonicalPath: '/about',
 *   keywords: ['about Ottawa South Dental', 'Ottawa dentist history'],
 * });
 * ```
 */
export function createMetadata(options: CreateMetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonicalPath,
    ogImage,
    ogType = 'website',
    noIndex = false,
    noFollow = false,
    openGraph: additionalOg = {},
    twitter: additionalTwitter = {},
  } = options;

  const fullTitle = `${title} | ${siteMetadata.siteName}`;
  const canonicalUrl = canonicalPath
    ? `${siteMetadata.siteUrl}${canonicalPath}`
    : undefined;

  const imageConfig = ogImage || siteMetadata.ogImage;
  const imageUrl = imageConfig.url.startsWith('http')
    ? imageConfig.url
    : `${siteMetadata.siteUrl}${imageConfig.url}`;

  return {
    title,
    description,
    keywords: [...siteMetadata.defaultKeywords, ...keywords],
    authors: [{ name: siteMetadata.siteName }],
    creator: siteMetadata.siteName,
    publisher: siteMetadata.siteName,
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      locale: siteMetadata.locale,
      siteName: siteMetadata.siteName,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: imageConfig.width || 1200,
          height: imageConfig.height || 630,
          alt: imageConfig.alt,
        },
      ],
      ...additionalOg,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: siteMetadata.twitterHandle,
      site: siteMetadata.twitterHandle,
      ...additionalTwitter,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: canonicalPath
      ? {
          canonical: canonicalPath,
        }
      : undefined,
  };
}

/**
 * Creates metadata for a dental service page with standard structure
 */
interface ServiceMetadataOptions {
  /** Service name (e.g., 'Dental Implants') */
  serviceName: string;
  /** Service description for SEO */
  description: string;
  /** Service-specific keywords */
  keywords: string[];
  /** Canonical path (e.g., '/services/dental-implants') */
  canonicalPath: string;
  /** Optional custom OG image */
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    alt: string;
  };
}

/**
 * Creates standardized metadata for service pages
 *
 * @example
 * ```ts
 * export const metadata = createServiceMetadata({
 *   serviceName: 'Dental Implants',
 *   description: 'Permanent dental implants at Ottawa South Dental...',
 *   keywords: ['dental implants Ottawa', 'tooth replacement'],
 *   canonicalPath: '/services/dental-implants',
 * });
 * ```
 */
export function createServiceMetadata(options: ServiceMetadataOptions): Metadata {
  const { serviceName, description, keywords, canonicalPath, ogImage } = options;

  return createMetadata({
    title: serviceName,
    description,
    keywords: [
      ...keywords,
      `${serviceName.toLowerCase()} Ottawa`,
      'Ottawa South Dental',
    ],
    canonicalPath,
    ogImage: ogImage || {
      url: '/images/og/og-services.jpg',
      alt: `${serviceName} at Ottawa South Dental`,
    },
  });
}

/**
 * Available dental services with their details for structured data
 */
export const dentalServices = [
  {
    name: 'General Dentistry',
    description: 'Comprehensive dental care including exams, cleanings, and preventive treatments.',
    url: '/services/preventive-dentistry',
  },
  {
    name: 'Cosmetic Dentistry',
    description: 'Smile makeovers including teeth whitening, veneers, and dental bonding.',
    url: '/services/cosmetic-dentistry',
  },
  {
    name: 'Dental Implants',
    description: 'Permanent tooth replacement with titanium implants for natural-looking results.',
    url: '/services/dental-implants',
  },
  {
    name: 'Invisalign',
    description: 'Clear aligner orthodontic treatment for discreet teeth straightening.',
    url: '/services/invisalign',
  },
  {
    name: 'Root Canal Therapy',
    description: 'Endodontic treatment to save infected teeth and relieve pain.',
    url: '/services/root-canal',
  },
  {
    name: 'Teeth Whitening',
    description: 'Professional whitening treatments for a brighter, more radiant smile.',
    url: '/services/teeth-whitening',
  },
  {
    name: 'Dental Hygiene',
    description: 'Professional teeth cleaning and gum care for optimal oral health.',
    url: '/services/dental-hygiene',
  },
  {
    name: 'Dentures',
    description: 'Custom full and partial dentures for comfortable tooth replacement.',
    url: '/services/dentures',
  },
  {
    name: 'Oral Surgery',
    description: 'Tooth extractions and surgical procedures performed with care.',
    url: '/services/oral-surgery',
  },
  {
    name: 'Gum Therapy',
    description: 'Periodontal treatments for healthy gums and prevention of gum disease.',
    url: '/services/gum-therapy',
  },
  {
    name: 'White Fillings',
    description: 'Tooth-colored composite fillings for natural-looking cavity repairs.',
    url: '/services/white-fillings',
  },
  {
    name: 'Routine Checkups',
    description: 'Regular dental examinations to maintain your oral health.',
    url: '/services/routine-checkups',
  },
];

/**
 * JSON-LD structured data generators for rich search results
 */
export const structuredData = {
  /**
   * Local business schema for dental practice (Dentist type with full details)
   */
  localBusiness: () => ({
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${siteMetadata.siteUrl}/#dentist`,
    name: 'Ottawa South Dental',
    alternateName: 'Family Dental Care Ottawa South',
    description: siteMetadata.defaultDescription,
    url: siteMetadata.siteUrl,
    telephone: '+1-613-733-1312',
    email: 'info@ottawasouthdental.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1729 Bank St',
      addressLocality: 'Ottawa',
      addressRegion: 'ON',
      postalCode: 'K1V 7Z4',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.3747,
      longitude: -75.6667,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    image: [
      `${siteMetadata.siteUrl}/images/og/og-default.jpg`,
      `${siteMetadata.siteUrl}/LOGO.png`,
    ],
    logo: `${siteMetadata.siteUrl}/LOGO.png`,
    sameAs: [
      // Add social media URLs when available
    ],
    // Medical specialty for Dentist
    medicalSpecialty: 'Dentistry',
    // Available languages
    availableLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'French', alternateName: 'fr' },
      { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
      { '@type': 'Language', name: 'Somali', alternateName: 'so' },
    ],
    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dental Services',
      itemListElement: dentalServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: service.name,
          description: service.description,
          url: `${siteMetadata.siteUrl}${service.url}`,
        },
      })),
    },
    // Area served
    areaServed: [
      { '@type': 'City', name: 'Ottawa' },
      { '@type': 'AdministrativeArea', name: 'Ottawa South' },
      { '@type': 'AdministrativeArea', name: 'Billings Bridge' },
      { '@type': 'AdministrativeArea', name: 'Alta Vista' },
    ],
    // Payment info
    acceptedPaymentMethod: [
      'http://purl.org/goodrelations/v1#Cash',
      'http://purl.org/goodrelations/v1#ByBankTransferInAdvance',
    ],
    currenciesAccepted: 'CAD',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Insurance, CDCP',
    // Accessibility features
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair Accessible', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
    ],
    // CDCP acceptance
    isAcceptingNewPatients: true,
  }),

  /**
   * WebSite schema with search action for sitelinks searchbox
   */
  webSite: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteMetadata.siteUrl}/#website`,
    name: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    description: siteMetadata.defaultDescription,
    publisher: {
      '@id': `${siteMetadata.siteUrl}/#organization`,
    },
    inLanguage: 'en-CA',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/services?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }),

  /**
   * Breadcrumb schema for navigation
   */
  breadcrumb: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteMetadata.siteUrl}${item.url}`,
    })),
  }),

  /**
   * Service schema for individual service pages (MedicalProcedure)
   */
  service: (service: {
    name: string;
    description: string;
    url: string;
    image?: string;
    procedureType?: string;
    bodyLocation?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${siteMetadata.siteUrl}${service.url}/#service`,
    name: service.name,
    description: service.description,
    url: `${siteMetadata.siteUrl}${service.url}`,
    image: service.image ? `${siteMetadata.siteUrl}${service.image}` : undefined,
    procedureType: service.procedureType || 'http://schema.org/NoninvasiveProcedure',
    bodyLocation: service.bodyLocation || 'Mouth',
    provider: {
      '@type': 'Dentist',
      '@id': `${siteMetadata.siteUrl}/#dentist`,
      name: 'Ottawa South Dental',
      url: siteMetadata.siteUrl,
      telephone: '+1-613-733-1312',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1729 Bank St',
        addressLocality: 'Ottawa',
        addressRegion: 'ON',
        postalCode: 'K1V 7Z4',
        addressCountry: 'CA',
      },
    },
    // For dental services, add medical specialty
    medicalSpecialty: 'Dentistry',
  }),

  /**
   * Dental service schema with full medical details
   */
  dentalService: (service: {
    name: string;
    description: string;
    url: string;
    image?: string;
    benefits?: string[];
    risks?: string[];
    preparation?: string;
    followup?: string;
    duration?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${siteMetadata.siteUrl}${service.url}/#procedure`,
    name: service.name,
    description: service.description,
    url: `${siteMetadata.siteUrl}${service.url}`,
    image: service.image ? `${siteMetadata.siteUrl}${service.image}` : undefined,
    procedureType: 'http://schema.org/NoninvasiveProcedure',
    bodyLocation: 'Mouth',
    medicalSpecialty: 'Dentistry',
    howPerformed: service.preparation,
    followup: service.followup,
    provider: {
      '@type': 'Dentist',
      '@id': `${siteMetadata.siteUrl}/#dentist`,
      name: 'Ottawa South Dental',
    },
    ...(service.benefits && {
      recognizingAuthority: {
        '@type': 'Organization',
        name: 'Canadian Dental Association',
      },
    }),
  }),

  /**
   * FAQ schema for FAQ sections
   */
  faq: (questions: { question: string; answer: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }),

  /**
   * Organization schema
   */
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteMetadata.siteUrl}/#organization`,
    name: 'Ottawa South Dental',
    url: siteMetadata.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}/LOGO.png`,
      width: 600,
      height: 60,
    },
    image: `${siteMetadata.siteUrl}/images/og/og-default.jpg`,
    description: siteMetadata.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1729 Bank St',
      addressLocality: 'Ottawa',
      addressRegion: 'ON',
      postalCode: 'K1V 7Z4',
      addressCountry: 'CA',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-613-733-1312',
        contactType: 'customer service',
        availableLanguage: ['English', 'French', 'Arabic', 'Somali'],
        areaServed: 'CA',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-613-733-1312',
        contactType: 'reservations',
        availableLanguage: ['English', 'French', 'Arabic', 'Somali'],
        areaServed: 'CA',
      },
    ],
    sameAs: [
      // Add social media profiles when available
    ],
  }),

  /**
   * WebPage schema for individual pages
   */
  webPage: (page: {
    name: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteMetadata.siteUrl}${page.url}/#webpage`,
    name: page.name,
    description: page.description,
    url: `${siteMetadata.siteUrl}${page.url}`,
    isPartOf: {
      '@id': `${siteMetadata.siteUrl}/#website`,
    },
    about: {
      '@id': `${siteMetadata.siteUrl}/#dentist`,
    },
    inLanguage: 'en-CA',
    ...(page.datePublished && { datePublished: page.datePublished }),
    ...(page.dateModified && { dateModified: page.dateModified }),
  }),

  /**
   * MedicalWebPage schema for service pages
   */
  medicalWebPage: (page: {
    name: string;
    description: string;
    url: string;
    medicalAudience?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${siteMetadata.siteUrl}${page.url}/#medicalwebpage`,
    name: page.name,
    description: page.description,
    url: `${siteMetadata.siteUrl}${page.url}`,
    isPartOf: {
      '@id': `${siteMetadata.siteUrl}/#website`,
    },
    about: {
      '@id': `${siteMetadata.siteUrl}${page.url}/#service`,
    },
    inLanguage: 'en-CA',
    medicalAudience: page.medicalAudience || 'Patient',
    specialty: 'Dentistry',
    lastReviewed: new Date().toISOString().split('T')[0],
  }),

  /**
   * ItemList schema for services listing page
   */
  servicesList: () => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dental Services at Ottawa South Dental',
    description: 'Complete list of dental services offered at Ottawa South Dental in Ottawa, Ontario.',
    numberOfItems: dentalServices.length,
    itemListElement: dentalServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      description: service.description,
      url: `${siteMetadata.siteUrl}${service.url}`,
    })),
  }),

  /**
   * ContactPage schema
   */
  contactPage: () => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteMetadata.siteUrl}/contact/#contactpage`,
    name: 'Contact Ottawa South Dental',
    description: 'Contact Ottawa South Dental for appointments, inquiries, or emergency dental care. Call us at (613) 733-1312 or visit us at 1729 Bank St, Ottawa.',
    url: `${siteMetadata.siteUrl}/contact`,
    mainEntity: {
      '@id': `${siteMetadata.siteUrl}/#dentist`,
    },
  }),

  /**
   * AboutPage schema
   */
  aboutPage: () => ({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${siteMetadata.siteUrl}/about/#aboutpage`,
    name: 'About Ottawa South Dental',
    description: 'Learn about Ottawa South Dental, our team, philosophy, and commitment to providing exceptional dental care to the Ottawa community.',
    url: `${siteMetadata.siteUrl}/about`,
    mainEntity: {
      '@id': `${siteMetadata.siteUrl}/#organization`,
    },
  }),
};

/**
 * Helper component to render JSON-LD structured data
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
