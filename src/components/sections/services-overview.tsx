import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Siren,
  Smile,
  ShieldCheck,
  ArrowRight,
  Wrench,
  HeartPulse,
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { ServiceCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SectionBackground } from '@/components/ui/section-container';

export type ServicesOverviewVariant = 'grid' | 'featured' | 'compact';
export type ServicesBackground = SectionBackground | 'default' | 'muted';

export interface ServiceItem {
  /** Unique identifier */
  id: string;
  /** Service title */
  title: string;
  /** Brief service description */
  description: string;
  /** Icon component to display */
  icon: ReactNode;
  /** Link to service detail page */
  href: string;
}

export interface ServicesOverviewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Visual layout variant */
  variant?: ServicesOverviewVariant;
  /** Background color style */
  background?: ServicesBackground;
  /** Section heading (alias: headline) */
  title?: string;
  /** Section heading (alias for title) */
  headline?: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Custom services array (overrides defaults) */
  services?: ServiceItem[];
  /** Show "View All Services" button (alias: showAllServicesLink) */
  showViewAll?: boolean;
  /** Show "View All Services" button (alias for showViewAll) */
  showAllServicesLink?: boolean;
  /** Custom view all button text */
  viewAllText?: string;
  /** Custom view all URL (alias: allServicesUrl) */
  viewAllHref?: string;
  /** Custom view all URL (alias for viewAllHref) */
  allServicesUrl?: string;
  /** Number of services to display (for featured variant) */
  limit?: number;
  /** Center align section header */
  centerHeader?: boolean;
}

// Map background aliases to actual SectionBackground values
const backgroundMap: Record<ServicesBackground, SectionBackground> = {
  transparent: 'transparent',
  white: 'white',
  secondary: 'secondary',
  tertiary: 'tertiary',
  primary: 'primary',
  accent: 'accent',
  default: 'white',
  muted: 'secondary',
};

// Default dental services for Ottawa South Dental
const defaultServices: ServiceItem[] = [
  {
    id: 'preventive',
    title: 'Preventive Care',
    description:
      'Regular checkups, cleanings, fluoride treatments, and oral cancer screenings to keep your smile healthy for life.',
    icon: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
    href: '/services/preventive-dentistry',
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description:
      'Transform your smile with professional teeth whitening, veneers, bonding, and aesthetic treatments.',
    icon: <Sparkles className="w-6 h-6" aria-hidden="true" />,
    href: '/services/cosmetic-dentistry',
  },
  {
    id: 'restorative',
    title: 'Restorative Dentistry',
    description:
      'Crowns, bridges, dental implants, and dentures to restore function and beauty to damaged or missing teeth.',
    icon: <Wrench className="w-6 h-6" aria-hidden="true" />,
    href: '/services/missing-teeth',
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description:
      'Same-day appointments for dental trauma, severe pain, infections, and other urgent dental emergencies.',
    icon: <Siren className="w-6 h-6" aria-hidden="true" />,
    href: '/services/root-canal',
  },
  {
    id: 'hygiene',
    title: 'Dental Hygiene',
    description:
      'Professional cleanings, scaling, and periodontal care to maintain optimal gum health and fresh breath.',
    icon: <HeartPulse className="w-6 h-6" aria-hidden="true" />,
    href: '/services/dental-hygiene',
  },
  {
    id: 'orthodontics',
    title: 'Invisalign',
    description:
      'Clear aligner therapy to straighten your teeth discreetly. Achieve the smile you deserve without metal braces.',
    icon: <Smile className="w-6 h-6" aria-hidden="true" />,
    href: '/services/invisalign',
  },
];

/**
 * Services Overview Grid component for Ottawa South Dental homepage.
 * Displays main service categories with icons, descriptions, and links.
 * Features a responsive grid layout with elegant hover interactions.
 */
export const ServicesOverview = forwardRef<HTMLDivElement, ServicesOverviewProps>(
  (
    {
      variant = 'grid',
      background = 'secondary',
      title,
      headline,
      subtitle = 'Comprehensive care for your entire family. From routine checkups to advanced treatments, we provide personalized dental solutions in a comfortable environment.',
      services = defaultServices,
      showViewAll,
      showAllServicesLink,
      viewAllText = 'View All Services',
      viewAllHref,
      allServicesUrl,
      limit,
      centerHeader = true,
      className = '',
      ...props
    },
    ref
  ) => {
    // Handle prop aliases
    const sectionTitle = title || headline || 'Our Dental Services';
    const shouldShowViewAll = showViewAll ?? showAllServicesLink ?? true;
    const viewAllUrl = viewAllHref || allServicesUrl || '/services';
    const resolvedBackground = backgroundMap[background] || 'secondary';

    // Apply limit if specified
    const displayServices = limit ? services.slice(0, limit) : services;

    // Grid variant - full service grid
    if (variant === 'grid') {
      return (
        <SectionContainer
          ref={ref}
          as="section"
          background={resolvedBackground}
          paddingY="lg"
          size="xl"
          className={className}
          aria-labelledby="services-heading"
          {...props}
        >
          {/* Section Header */}
          <div className={centerHeader ? 'text-center mb-12 md:mb-16' : 'mb-12 md:mb-16'}>
            <Heading
              variant="section-title"
              subtitle={subtitle}
              align={centerHeader ? 'center' : 'left'}
              id="services-heading"
            >
              {sectionTitle}
            </Heading>
          </div>

          {/* Services Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            role="list"
            aria-label="Dental services"
          >
            {displayServices.map((service, index) => (
              <div
                key={service.id}
                role="listitem"
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              </div>
            ))}
          </div>

          {/* View All Button */}
          {shouldShowViewAll && (
            <div className="mt-12 md:mt-16 text-center">
              <Link href={viewAllUrl}>
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
                >
                  {viewAllText}
                </Button>
              </Link>
            </div>
          )}
        </SectionContainer>
      );
    }

    // Featured variant - larger cards with emphasis
    if (variant === 'featured') {
      const featuredServices = displayServices.slice(0, 4);

      return (
        <SectionContainer
          ref={ref}
          as="section"
          background={resolvedBackground}
          paddingY="lg"
          size="xl"
          className={className}
          aria-labelledby="services-heading"
          {...props}
        >
          {/* Section Header */}
          <div className={centerHeader ? 'text-center mb-12 md:mb-16' : 'mb-12 md:mb-16'}>
            <Heading
              variant="section-title"
              subtitle={subtitle}
              align={centerHeader ? 'center' : 'left'}
              id="services-heading"
            >
              {sectionTitle}
            </Heading>
          </div>

          {/* Featured Services Grid - 2x2 on larger screens */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            role="list"
            aria-label="Featured dental services"
          >
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                role="listitem"
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* View All Button */}
          {shouldShowViewAll && (
            <div className="mt-12 md:mt-16 text-center">
              <Link href={viewAllUrl}>
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
                >
                  {viewAllText}
                </Button>
              </Link>
            </div>
          )}
        </SectionContainer>
      );
    }

    // Compact variant - horizontal scroll on mobile, smaller cards
    return (
      <SectionContainer
        ref={ref}
        as="section"
        background={resolvedBackground}
        paddingY="md"
        size="xl"
        className={className}
        aria-labelledby="services-heading"
        {...props}
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
          <Heading variant="section-title" subtitle={subtitle} align="left" id="services-heading">
            {sectionTitle}
          </Heading>

          {shouldShowViewAll && (
            <Link
              href={viewAllUrl}
              className={[
                'inline-flex items-center gap-2',
                'text-[#722F37] font-medium',
                'hover:underline transition-colors duration-200',
                'shrink-0',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2 rounded',
              ].join(' ')}
            >
              {viewAllText}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Horizontally scrollable on mobile */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <div
            className={[
              'flex gap-4 md:gap-6',
              'overflow-x-auto md:overflow-visible',
              'pb-4 md:pb-0',
              'snap-x snap-mandatory md:snap-none',
              'scrollbar-hide',
              // On desktop, show as grid
              'md:grid md:grid-cols-3 lg:grid-cols-4',
            ].join(' ')}
            role="list"
            aria-label="Dental services"
          >
            {displayServices.map((service) => (
              <div
                key={service.id}
                role="listitem"
                className={[
                  'flex-shrink-0',
                  'w-[280px] md:w-auto',
                  'snap-start',
                ].join(' ')}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Scroll fade indicator (mobile only) */}
          <div
            className={[
              'absolute right-0 top-0 bottom-4',
              'w-8 bg-gradient-to-l from-[#FDF8F3] to-transparent',
              'pointer-events-none',
              'md:hidden',
            ].join(' ')}
            aria-hidden="true"
          />
        </div>
      </SectionContainer>
    );
  }
);

ServicesOverview.displayName = 'ServicesOverview';

/**
 * Convenience wrapper for the full grid variant.
 */
export const ServicesGrid = forwardRef<HTMLDivElement, Omit<ServicesOverviewProps, 'variant'>>(
  (props, ref) => <ServicesOverview ref={ref} variant="grid" {...props} />
);
ServicesGrid.displayName = 'ServicesGrid';

/**
 * Convenience wrapper for the featured/highlighted variant.
 */
export const ServicesFeatured = forwardRef<HTMLDivElement, Omit<ServicesOverviewProps, 'variant'>>(
  (props, ref) => <ServicesOverview ref={ref} variant="featured" limit={4} {...props} />
);
ServicesFeatured.displayName = 'ServicesFeatured';

/**
 * Convenience wrapper for the compact horizontal variant.
 */
export const ServicesCompact = forwardRef<HTMLDivElement, Omit<ServicesOverviewProps, 'variant'>>(
  (props, ref) => <ServicesOverview ref={ref} variant="compact" {...props} />
);
ServicesCompact.displayName = 'ServicesCompact';
