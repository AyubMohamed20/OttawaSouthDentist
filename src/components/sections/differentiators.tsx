'use client';

import { forwardRef, type HTMLAttributes, useRef, useEffect, useState } from 'react';
import {
  ShieldCheck,
  Receipt,
  Siren,
  Users,
  Languages,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';

export interface DifferentiatorItem {
  /** Icon component from lucide-react */
  icon: LucideIcon;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Short badge text for visual emphasis */
  badge?: string;
  /** Optional accent color override */
  accentColor?: string;
}

export interface DifferentiatorsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Custom headline */
  headline?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Override default differentiators */
  items?: DifferentiatorItem[];
  /** Visual variant - reserved for future use */
  variant?: 'default' | 'cards' | 'compact';
  /** Background style - reserved for future use */
  background?: 'default' | 'muted' | 'transparent';
}

// Design tokens - warm burgundy palette
const burgundy = {
  DEFAULT: '#722F37',
  dark: '#5a252c',
  light: '#8B4049',
  lighter: '#A35560',
  muted: 'rgba(114, 47, 55, 0.1)',
};

const cream = {
  DEFAULT: '#FDF8F3',
  dark: '#F5EDE5',
  darker: '#EDE5DD',
};

// Default differentiators for Ottawa South Dental
const defaultDifferentiators: DifferentiatorItem[] = [
  {
    icon: ShieldCheck,
    title: 'CDCP Accepted',
    badge: 'Government Program',
    description: 'Proud participant in the Canadian Dental Care Plan, making quality dental care accessible to more Canadians.',
  },
  {
    icon: Receipt,
    title: 'Direct Insurance Billing',
    badge: 'Zero Hassle',
    description: 'We bill your insurance directly, eliminating paperwork hassles so you can focus on your smile.',
  },
  {
    icon: Siren,
    title: 'Emergency Care',
    badge: 'Same Day',
    description: 'Same-day emergency appointments available. When dental emergencies strike, we\'re here for you.',
  },
  {
    icon: Users,
    title: '6 Experienced Dentists',
    badge: 'Full Team',
    description: 'Our team of six skilled dentists brings diverse expertise to provide comprehensive family dental care.',
  },
  {
    icon: Languages,
    title: 'Multilingual Team',
    badge: '4+ Languages',
    description: 'We speak your language. Our diverse team serves patients in English, French, Arabic, and more.',
  },
];

/**
 * Key Differentiators Section for Ottawa South Dental homepage.
 *
 * Features an editorial-inspired asymmetric layout with floating badge pills,
 * sophisticated hover interactions, and staggered entrance animations.
 * Designed with warm burgundy accents against cream backgrounds.
 */
export const Differentiators = forwardRef<HTMLElement, DifferentiatorsProps>(
  (
    {
      headline = 'Why Choose Ottawa South Dental',
      subtitle = 'Exceptional care, convenience, and compassion—everything you need for a healthier smile.',
      items = defaultDifferentiators,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: '50px' }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    // Split items for asymmetric layout
    const featuredItems = items.slice(0, 2);
    const regularItems = items.slice(2);

    return (
      <section
        ref={(node) => {
          sectionRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={[
          'relative overflow-hidden',
          'bg-gradient-to-b from-white via-[#FDF8F3]/60 to-[#FDF8F3]',
          className,
        ].join(' ')}
        aria-labelledby="differentiators-heading"
        {...props}
      >
        {/* Layered decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Large radial gradient - top right */}
          <div
            className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(114,47,55,0.06) 0%, rgba(114,47,55,0.02) 40%, transparent 70%)',
            }}
          />
          {/* Smaller accent - bottom left */}
          <div
            className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(114,47,55,0.05) 0%, transparent 60%)',
            }}
          />
          {/* Floating geometric accents */}
          <div
            className="absolute top-1/4 left-[10%] w-24 h-24 rounded-full border border-[#722F37]/10 animate-float"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute top-2/3 right-[15%] w-16 h-16 rounded-full border border-[#722F37]/8 animate-float"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-1/4 left-[25%] w-12 h-12 rounded-full bg-[#722F37]/3 animate-float"
            style={{ animationDelay: '4s' }}
          />
          {/* Decorative cross pattern */}
          <svg
            className="absolute top-20 right-20 w-32 h-32 text-[#722F37]/5"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <rect x="45" y="10" width="10" height="80" />
            <rect x="10" y="45" width="80" height="10" />
          </svg>
        </div>

        <SectionContainer
          size="xl"
          paddingY="lg"
          paddingX="md"
          background="transparent"
        >
          {/* Section header with editorial styling */}
          <div className={[
            'relative text-center mb-16 md:mb-20',
            'transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}>
            {/* Eyebrow text */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#722F37]/40" />
              <span className="text-[#722F37] text-sm font-semibold tracking-[0.2em] uppercase">
                Our Difference
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#722F37]/40" />
            </div>

            <Heading
              variant="section-title"
              as="h2"
              align="center"
              id="differentiators-heading"
            >
              {headline}
            </Heading>

            <p className="mt-5 text-foreground-secondary text-fluid-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            {/* Decorative flourish */}
            <div className="flex items-center justify-center gap-2 mt-8" aria-hidden="true">
              <div className="h-1 w-1 rounded-full bg-[#722F37]/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#722F37]/50" />
              <Sparkles className="w-5 h-5 text-[#722F37]" strokeWidth={1.5} />
              <div className="h-1.5 w-1.5 rounded-full bg-[#722F37]/50" />
              <div className="h-1 w-1 rounded-full bg-[#722F37]/30" />
            </div>
          </div>

          {/* Featured items - larger cards with asymmetric layout */}
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 mb-8">
            {featuredItems.map((item, index) => (
              <FeaturedDifferentiatorCard
                key={item.title}
                item={item}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Regular items - smaller cards in a row */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regularItems.map((item, index) => (
              <DifferentiatorCard
                key={item.title}
                item={item}
                index={index + featuredItems.length}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Bottom trust strip */}
          <div
            className={[
              'mt-14 md:mt-20',
              'transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            ].join(' ')}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative">
              {/* Decorative line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#722F37]/15 to-transparent" aria-hidden="true" />

              {/* Center pill */}
              <div className="relative flex justify-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-[0_4px_20px_-4px_rgba(114,47,55,0.12)] border border-[#EDE5DD]">
                  <span
                    className="relative flex h-2.5 w-2.5"
                    aria-hidden="true"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#722F37] opacity-40" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#722F37]" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    Serving Ottawa with excellence since{' '}
                    <span className="text-[#722F37] font-semibold">1985</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    );
  }
);

Differentiators.displayName = 'Differentiators';

/**
 * Featured differentiator card - larger format with more visual emphasis
 */
interface FeaturedDifferentiatorCardProps {
  item: DifferentiatorItem;
  index: number;
  isVisible: boolean;
}

function FeaturedDifferentiatorCard({ item, index, isVisible }: FeaturedDifferentiatorCardProps) {
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  return (
    <article
      className={[
        'relative group',
        'bg-white',
        'rounded-3xl',
        'border border-[#EDE5DD]',
        'p-7 lg:p-9',
        // Shadow system
        'shadow-[0_4px_24px_-8px_rgba(114,47,55,0.08)]',
        'hover:shadow-[0_20px_50px_-12px_rgba(114,47,55,0.18)]',
        // Border accent on hover
        'hover:border-[#722F37]/20',
        // Transitions
        'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:-translate-y-2',
        // Animation state
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
      ].join(' ')}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      }}
    >
      {/* Corner gradient accent */}
      <div
        className={[
          'absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
          isEven ? 'top-0 right-0 -translate-y-1/3 translate-x-1/3' : 'bottom-0 left-0 translate-y-1/3 -translate-x-1/3',
        ].join(' ')}
        style={{
          background: 'radial-gradient(circle, rgba(114,47,55,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className={[
        'flex flex-col lg:flex-row gap-6 lg:gap-8',
        isEven ? '' : 'lg:flex-row-reverse',
      ].join(' ')}>
        {/* Icon container */}
        <div className="flex-shrink-0">
          <div
            className={[
              'relative w-18 h-18 lg:w-20 lg:h-20 rounded-2xl',
              'flex items-center justify-center',
              'bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD]',
              'shadow-[inset_0_2px_4px_rgba(114,47,55,0.04)]',
              'transition-all duration-500 ease-out',
              'group-hover:bg-gradient-to-br group-hover:from-[#722F37] group-hover:via-[#722F37] group-hover:to-[#5a252c]',
              'group-hover:scale-110',
              'group-hover:shadow-[0_12px_30px_-6px_rgba(114,47,55,0.4)]',
              'group-hover:rotate-3',
            ].join(' ')}
            aria-hidden="true"
          >
            <Icon
              className={[
                'w-9 h-9 lg:w-10 lg:h-10',
                'text-[#722F37]',
                'transition-all duration-500 ease-out',
                'group-hover:text-white',
                'group-hover:scale-110',
              ].join(' ')}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          {item.badge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#722F37]/8 text-[#722F37] mb-3">
              {item.badge}
            </span>
          )}

          <h3
            className={[
              'font-display text-xl lg:text-2xl font-semibold',
              'text-foreground',
              'mb-3',
              'transition-colors duration-300',
              'group-hover:text-[#722F37]',
            ].join(' ')}
          >
            {item.title}
          </h3>

          <p className="text-foreground-secondary text-base lg:text-lg leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={[
          'absolute bottom-0 left-8 right-8 h-0.5 rounded-full',
          'scale-x-0 group-hover:scale-x-100',
          'transition-transform duration-500 ease-out',
          isEven ? 'origin-left' : 'origin-right',
        ].join(' ')}
        style={{
          background: `linear-gradient(90deg, ${burgundy.DEFAULT}, ${burgundy.light}, transparent)`,
        }}
        aria-hidden="true"
      />
    </article>
  );
}

/**
 * Regular differentiator card - compact format
 */
interface DifferentiatorCardProps {
  item: DifferentiatorItem;
  index: number;
  isVisible: boolean;
}

function DifferentiatorCard({ item, index, isVisible }: DifferentiatorCardProps) {
  const Icon = item.icon;

  return (
    <article
      className={[
        'relative group',
        'bg-white',
        'rounded-2xl',
        'border border-[#EDE5DD]',
        'p-6',
        // Shadow system
        'shadow-[0_2px_12px_-4px_rgba(114,47,55,0.06)]',
        'hover:shadow-[0_16px_40px_-8px_rgba(114,47,55,0.15)]',
        // Border accent on hover
        'hover:border-[#722F37]/25',
        // Transitions
        'transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:-translate-y-1.5',
        // Animation state
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      ].join(' ')}
      style={{
        transitionDelay: isVisible ? `${index * 100 + 200}ms` : '0ms',
      }}
    >
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(114,47,55,0.02) 0%, transparent 50%, rgba(253,248,243,0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className={[
          'relative w-12 h-12 rounded-xl',
          'flex items-center justify-center',
          'mb-4',
          'bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD]',
          'shadow-[inset_0_1px_2px_rgba(114,47,55,0.04)]',
          'transition-all duration-400 ease-out',
          'group-hover:bg-gradient-to-br group-hover:from-[#722F37] group-hover:to-[#5a252c]',
          'group-hover:scale-110',
          'group-hover:shadow-[0_8px_20px_-4px_rgba(114,47,55,0.35)]',
        ].join(' ')}
        aria-hidden="true"
      >
        <Icon
          className={[
            'w-6 h-6',
            'text-[#722F37]',
            'transition-all duration-400 ease-out',
            'group-hover:text-white',
          ].join(' ')}
          strokeWidth={1.75}
        />
      </div>

      {/* Badge */}
      {item.badge && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#722F37]/6 text-[#722F37]/80 mb-2">
          {item.badge}
        </span>
      )}

      {/* Title */}
      <h3
        className={[
          'font-display text-lg font-semibold',
          'text-foreground',
          'mb-2',
          'transition-colors duration-300',
          'group-hover:text-[#722F37]',
        ].join(' ')}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-foreground-secondary text-sm leading-relaxed">
        {item.description}
      </p>

      {/* Corner accent on hover */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(114,47,55,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </article>
  );
}

/**
 * Pre-configured compact variant for narrower layouts.
 */
export const DifferentiatorsCompact = forwardRef<HTMLElement, Omit<DifferentiatorsProps, 'items'>>(
  (props, ref) => {
    const compactItems = defaultDifferentiators.slice(0, 3);
    return <Differentiators ref={ref} items={compactItems} {...props} />;
  }
);

DifferentiatorsCompact.displayName = 'DifferentiatorsCompact';

/**
 * Horizontal scrolling variant for mobile-first layouts.
 */
export const DifferentiatorsCarousel = forwardRef<HTMLElement, DifferentiatorsProps>(
  (
    {
      headline = 'Why Choose Us',
      subtitle,
      items = defaultDifferentiators,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={[
          'relative overflow-hidden py-12 md:py-16',
          'bg-gradient-to-b from-white to-[#FDF8F3]/50',
          className,
        ].join(' ')}
        aria-labelledby="differentiators-carousel-heading"
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2
              id="differentiators-carousel-heading"
              className="font-display text-fluid-2xl md:text-fluid-3xl font-semibold text-foreground"
            >
              {headline}
            </h2>
            {subtitle && (
              <p className="mt-3 text-foreground-secondary max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* Horizontal scroll container */}
          <div className="relative -mx-4 px-4">
            <div
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              role="list"
            >
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={[
                      'flex-shrink-0 w-72 snap-center',
                      'bg-white rounded-2xl border border-[#EDE5DD] p-5',
                      'shadow-soft',
                      'transition-transform duration-300',
                      'hover:-translate-y-1 hover:shadow-soft-lg',
                    ].join(' ')}
                    role="listitem"
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-4"
                    >
                      <Icon className="w-6 h-6 text-[#722F37]" strokeWidth={1.75} />
                    </div>
                    {item.badge && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#722F37]/6 text-[#722F37]/80 mb-2">
                        {item.badge}
                      </span>
                    )}
                    <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center gap-2 mt-4 md:hidden" aria-hidden="true">
              {items.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#722F37]/20"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

DifferentiatorsCarousel.displayName = 'DifferentiatorsCarousel';

export default Differentiators;
