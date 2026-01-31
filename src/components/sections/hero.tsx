'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import Image from 'next/image';
import {
  Phone,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Star,
  Heart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CDCPAcceptedBadge, DirectBillingBadge } from '@/components/ui/badge';

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Custom headline text */
  headline?: string;
  /** Highlighted text in headline (appears in accent color) */
  headlineAccent?: string;
  /** Custom description text */
  description?: string;
  /** Phone number for tel: href */
  phoneNumber?: string;
  /** Phone display format */
  phoneDisplay?: string;
  /** Address text */
  address?: string;
  /** Languages spoken */
  languages?: string[];
  /** Show CDCP badge */
  showCDCP?: boolean;
  /** Show Direct Billing badge */
  showDirectBilling?: boolean;
  /** Custom book appointment URL */
  bookUrl?: string;
  /** Hero image source */
  heroImage?: string;
  /** Hero image alt text */
  imageAlt?: string;
}

// Default practice information
const DEFAULT_PHONE_NUMBER = '6137331118';
const DEFAULT_PHONE_DISPLAY = '(613) 733-1118';
const DEFAULT_ADDRESS = '1729 Bank St, Ottawa, ON K1V 7Z4';
const DEFAULT_LANGUAGES = ['English', 'French', 'Arabic', 'Somali'];
const DEFAULT_HEADLINE = "Your Family's Smile Deserves";
const DEFAULT_HEADLINE_ACCENT = 'Exceptional Care';
const DEFAULT_DESCRIPTION =
  'Welcome to Ottawa South Dental, where compassionate care meets modern dentistry. We provide comprehensive dental services for your entire family in a warm, welcoming environment.';

// Trust indicators with refined presentation
const trustIndicators = [
  {
    icon: Heart,
    value: '20+',
    label: 'Years Serving Ottawa',
    sublabel: 'Trusted since 2004',
  },
  {
    icon: Star,
    value: '4.8',
    label: 'Google Rating',
    sublabel: '250+ reviews',
  },
  {
    icon: Shield,
    value: '6',
    label: 'Expert Dentists',
    sublabel: 'Specialized care',
  },
];

/**
 * Hero Section - Ottawa South Dental Homepage
 *
 * A sophisticated, welcoming hero featuring:
 * - Elegant typography with Playfair Display
 * - Organic flowing shapes creating warmth
 * - Refined animations with staggered reveals
 * - Premium floating UI elements
 * - Full accessibility support
 */
export const Hero = forwardRef<HTMLElement, HeroProps>(
  (
    {
      headline = DEFAULT_HEADLINE,
      headlineAccent = DEFAULT_HEADLINE_ACCENT,
      description = DEFAULT_DESCRIPTION,
      phoneNumber = DEFAULT_PHONE_NUMBER,
      phoneDisplay = DEFAULT_PHONE_DISPLAY,
      address = DEFAULT_ADDRESS,
      languages = DEFAULT_LANGUAGES,
      showCDCP = true,
      showDirectBilling = true,
      bookUrl = '/contact#book',
      heroImage = '/images/patients/patients-01.jpg',
      imageAlt = 'Welcoming dental team providing exceptional care to a smiling patient',
      className = '',
      ...props
    },
    ref
  ) => {
    const phoneHref = `tel:${phoneNumber}`;

    return (
      <section
        ref={ref}
        className={[
          'relative overflow-hidden',
          // Warm layered gradient background
          'bg-gradient-to-br from-[#FFFBF8] via-white to-[#FDF8F3]',
          'min-h-[calc(100vh-80px)]',
          className,
        ].join(' ')}
        aria-labelledby="hero-heading"
        {...props}
      >
        {/* ========== DECORATIVE BACKGROUND LAYERS ========== */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* Primary organic blob - top right */}
          <div
            className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(114,47,55,0.08) 0%, rgba(114,47,55,0.02) 50%, transparent 70%)',
            }}
          />

          {/* Secondary organic blob - bottom left */}
          <div
            className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(20,184,166,0.06) 0%, transparent 60%)',
            }}
          />

          {/* Warm cream accent - center right */}
          <div
            className="absolute top-1/3 right-0 w-[500px] h-[400px] rounded-l-full opacity-60"
            style={{
              background:
                'linear-gradient(180deg, rgba(253,248,243,0.8) 0%, rgba(245,237,229,0.4) 100%)',
            }}
          />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23722F37' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Decorative corner flourish */}
          <svg
            className="absolute top-0 left-0 w-64 h-64 text-[#722F37]/5"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M0 0 Q 100 20 200 0 Q 180 100 200 200 Q 100 180 0 200 Q 20 100 0 0"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* ========== MAIN CONTENT ========== */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* ========== LEFT COLUMN - CONTENT ========== */}
              <div className="lg:col-span-6 xl:col-span-5 text-center lg:text-left order-2 lg:order-1">
                {/* Trust badges - floating above headline */}
                <div
                  className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-6 md:mb-8 animate-fade-in"
                  style={{ animationDelay: '0ms' }}
                >
                  {showCDCP && (
                    <CDCPAcceptedBadge
                      size="md"
                      className="shadow-sm hover:shadow-md transition-shadow duration-200"
                    />
                  )}
                  {showDirectBilling && (
                    <DirectBillingBadge
                      size="md"
                      className="shadow-sm hover:shadow-md transition-shadow duration-200"
                    />
                  )}
                </div>

                {/* Headline with refined typography */}
                <h1
                  id="hero-heading"
                  className="animate-fade-in-up"
                  style={{ animationDelay: '100ms' }}
                >
                  <span
                    className={[
                      'block font-display font-bold tracking-tight',
                      'text-[2.5rem] sm:text-5xl md:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.25rem]',
                      'text-neutral-900',
                      'leading-[1.05]',
                    ].join(' ')}
                  >
                    {headline}
                  </span>
                  <span
                    className={[
                      'block font-display font-bold tracking-tight',
                      'text-[2.5rem] sm:text-5xl md:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.25rem]',
                      'leading-[1.05]',
                      'mt-1',
                      // Burgundy accent with subtle text shadow
                      'text-[#722F37]',
                    ].join(' ')}
                    style={{
                      textShadow: '0 2px 20px rgba(114,47,55,0.15)',
                    }}
                  >
                    {headlineAccent}
                  </span>
                </h1>

                {/* Description with better line height */}
                <p
                  className={[
                    'mt-6 md:mt-8',
                    'text-lg md:text-xl',
                    'text-neutral-600',
                    'max-w-xl mx-auto lg:mx-0',
                    'leading-relaxed',
                    'animate-fade-in-up',
                  ].join(' ')}
                  style={{ animationDelay: '200ms' }}
                >
                  {description}
                </p>

                {/* Location & Languages - refined pills */}
                <div
                  className="mt-5 md:mt-6 flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in-up"
                  style={{ animationDelay: '250ms' }}
                >
                  <div
                    className={[
                      'inline-flex items-center gap-2 px-4 py-2',
                      'bg-white/80 backdrop-blur-sm',
                      'rounded-full border border-neutral-200/60',
                      'text-sm text-neutral-600',
                      'shadow-sm',
                    ].join(' ')}
                  >
                    <MapPin className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
                    <span>{address}</span>
                  </div>
                  <div
                    className={[
                      'inline-flex items-center gap-2 px-4 py-2',
                      'bg-white/80 backdrop-blur-sm',
                      'rounded-full border border-neutral-200/60',
                      'text-sm text-neutral-600',
                      'shadow-sm',
                    ].join(' ')}
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-primary-600"
                      aria-hidden="true"
                    />
                    <span>{languages.join(' · ')}</span>
                  </div>
                </div>

                {/* CTA Buttons - refined styling */}
                <div
                  className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
                  style={{ animationDelay: '300ms' }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                    rightIcon={<ArrowRight className="w-4 h-4 opacity-70" />}
                    onClick={() => (window.location.href = bookUrl)}
                    className="group"
                  >
                    <span className="group-hover:tracking-wide transition-all duration-200">
                      Book Appointment
                    </span>
                  </Button>

                  <a
                    href={phoneHref}
                    className={[
                      'inline-flex items-center justify-center gap-3',
                      'px-8 py-4 rounded-xl font-medium text-lg',
                      'bg-white text-neutral-700',
                      'border border-neutral-200',
                      'shadow-sm hover:shadow-md',
                      'hover:border-[#722F37]/20 hover:text-[#722F37]',
                      'transition-all duration-200 ease-out',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                      'group',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex items-center justify-center w-10 h-10',
                        'bg-neutral-100 rounded-lg',
                        'group-hover:bg-[#722F37]/10',
                        'transition-colors duration-200',
                      ].join(' ')}
                    >
                      <Phone
                        className="w-5 h-5 text-[#722F37]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex flex-col items-start leading-tight">
                      <span className="text-xs text-neutral-500 font-normal">
                        Call us today
                      </span>
                      <span>{phoneDisplay}</span>
                    </span>
                  </a>
                </div>

                {/* Trust indicators - elegant horizontal layout */}
                <div
                  className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-neutral-200/60 animate-fade-in-up"
                  style={{ animationDelay: '400ms' }}
                >
                  <div className="grid grid-cols-3 gap-4 md:gap-6">
                    {trustIndicators.map((indicator, index) => (
                      <div
                        key={indicator.label}
                        className={[
                          'text-center lg:text-left',
                          'group cursor-default',
                        ].join(' ')}
                      >
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                          <div
                            className={[
                              'flex items-center justify-center',
                              'w-8 h-8 rounded-lg',
                              'bg-[#722F37]/10',
                              'group-hover:bg-[#722F37]/15',
                              'transition-colors duration-200',
                            ].join(' ')}
                          >
                            <indicator.icon
                              className="w-4 h-4 text-[#722F37]"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="text-2xl md:text-3xl font-bold text-neutral-900">
                            {indicator.value}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-neutral-700">
                          {indicator.label}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5 hidden sm:block">
                          {indicator.sublabel}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ========== RIGHT COLUMN - IMAGE ========== */}
              <div
                className="lg:col-span-6 xl:col-span-7 relative order-1 lg:order-2 animate-fade-in"
                style={{ animationDelay: '150ms' }}
              >
                {/* Image composition with organic shape background */}
                <div className="relative">
                  {/* Organic blob background behind image */}
                  <div
                    className="absolute -inset-4 md:-inset-6 lg:-inset-8 -z-10"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 500 400"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="blob-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="rgba(114,47,55,0.12)" />
                          <stop offset="50%" stopColor="rgba(20,184,166,0.08)" />
                          <stop offset="100%" stopColor="rgba(253,248,243,0.9)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M50,100 Q150,20 300,50 Q450,80 480,200 Q490,320 350,380 Q200,420 80,350 Q10,280 50,100"
                        fill="url(#blob-gradient)"
                      />
                    </svg>
                  </div>

                  {/* Main hero image */}
                  <div
                    className={[
                      'relative',
                      'aspect-[4/3] lg:aspect-[5/4]',
                      'rounded-2xl lg:rounded-3xl',
                      'overflow-hidden',
                      'shadow-2xl shadow-neutral-900/10',
                      'ring-1 ring-neutral-900/5',
                    ].join(' ')}
                  >
                    <Image
                      src={heroImage}
                      alt={imageAlt}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                    />
                    {/* Premium gradient overlay */}
                    <div
                      className={[
                        'absolute inset-0',
                        'bg-gradient-to-t from-neutral-900/20 via-transparent to-neutral-900/5',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  </div>

                  {/* ========== FLOATING UI CARDS ========== */}

                  {/* Card 1: Open Today - Bottom Left */}
                  <div
                    className={[
                      'absolute',
                      '-bottom-3 -left-3',
                      'sm:-bottom-4 sm:-left-4',
                      'lg:-bottom-6 lg:-left-6',
                      'bg-white',
                      'rounded-xl lg:rounded-2xl',
                      'shadow-xl shadow-neutral-900/10',
                      'p-3 sm:p-4 lg:p-5',
                      'border border-neutral-100',
                      'animate-float',
                      'z-10',
                    ].join(' ')}
                    style={{ animationDelay: '0s' }}
                    aria-label="Office hours information"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          'w-10 h-10 lg:w-12 lg:h-12',
                          'rounded-xl',
                          'bg-gradient-to-br from-primary-100 to-primary-50',
                          'flex items-center justify-center',
                          'ring-1 ring-primary-200/50',
                        ].join(' ')}
                      >
                        <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 text-sm lg:text-base">
                          Open Today
                        </p>
                        <p className="text-neutral-500 text-xs lg:text-sm">
                          Mon-Thu: 9am-6pm
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Emergency Care - Top Right */}
                  <div
                    className={[
                      'absolute',
                      '-top-3 -right-3',
                      'sm:-top-4 sm:-right-4',
                      'lg:-top-6 lg:-right-6',
                      'bg-white',
                      'rounded-xl lg:rounded-2xl',
                      'shadow-xl shadow-neutral-900/10',
                      'p-3 sm:p-4 lg:p-5',
                      'border border-neutral-100',
                      'animate-float',
                      'z-10',
                    ].join(' ')}
                    style={{ animationDelay: '1.5s' }}
                    aria-label="Emergency dental care available"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          'w-10 h-10 lg:w-12 lg:h-12',
                          'rounded-xl',
                          'bg-gradient-to-br from-accent-100 to-accent-50',
                          'flex items-center justify-center',
                          'ring-1 ring-accent-200/50',
                        ].join(' ')}
                      >
                        <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-accent-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 text-sm lg:text-base">
                          Emergency?
                        </p>
                        <p className="text-accent-600 font-medium text-xs lg:text-sm">
                          Same-day care
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: New Patients Welcome - Bottom Right (hidden on mobile) */}
                  <div
                    className={[
                      'absolute',
                      'bottom-8 -right-4',
                      'lg:bottom-12 lg:-right-8',
                      'bg-[#722F37]',
                      'rounded-xl lg:rounded-2xl',
                      'shadow-xl shadow-[#722F37]/30',
                      'p-3 lg:p-4',
                      'hidden md:flex items-center gap-3',
                      'animate-float',
                      'z-10',
                    ].join(' ')}
                    style={{ animationDelay: '0.75s' }}
                    aria-label="New patients welcome"
                  >
                    <Sparkles className="w-5 h-5 text-white/90" />
                    <p className="font-medium text-white text-sm lg:text-base whitespace-nowrap">
                      New Patients Welcome
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== BOTTOM DECORATIVE WAVE ========== */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 md:h-20 lg:h-24 overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="absolute bottom-0 w-full h-full text-white"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

/**
 * Convenience wrapper with minimal configuration for quick use.
 */
export const HeroDefault = forwardRef<
  HTMLElement,
  Omit<HeroProps, 'headline' | 'headlineAccent'>
>((props, ref) => <Hero ref={ref} {...props} />);

HeroDefault.displayName = 'HeroDefault';

export default Hero;
