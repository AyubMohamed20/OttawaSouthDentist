'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { Phone, Calendar, Clock, MapPin, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactInfo, businessHours } from '@/data/site-config';

export type ContactCTABannerVariant = 'full' | 'compact' | 'minimal' | 'editorial';
export type ContactCTABannerBackground = 'burgundy' | 'gradient' | 'cream' | 'wave';

export interface ContactCTABannerProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Visual style variant */
  variant?: ContactCTABannerVariant;
  /** Background style */
  background?: ContactCTABannerBackground;
  /** Custom headline text */
  headline?: string;
  /** Custom description text */
  description?: string;
  /** Phone number for tel: href (digits only recommended) */
  phoneNumber?: string;
  /** Phone display format (how it appears to users) */
  phoneDisplay?: string;
  /** Show emergency contact section */
  showEmergency?: boolean;
  /** Custom emergency message */
  emergencyMessage?: string;
  /** Show office hours */
  showHours?: boolean;
  /** Hours summary text */
  hoursSummary?: string;
  /** Show location info */
  showLocation?: boolean;
  /** Location address text */
  locationText?: string;
  /** Show languages spoken */
  showLanguages?: boolean;
  /** Languages spoken list */
  languages?: string[];
  /** Custom book appointment URL */
  bookUrl?: string;
  /** Book button text */
  bookText?: string;
}

// Format phone number for display
const formatPhoneDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

// Get hours summary from business hours
const getHoursSummary = (): string => {
  const weekdayHours = businessHours.find((h) => h.day === 'Monday');
  const saturdayHours = businessHours.find((h) => h.day === 'Saturday');

  let summary = '';
  if (weekdayHours && !weekdayHours.isClosed) {
    summary += `Mon-Fri: ${weekdayHours.open} - ${weekdayHours.close}`;
  }
  if (saturdayHours && !saturdayHours.isClosed) {
    summary += ` | Sat: ${saturdayHours.open} - ${saturdayHours.close}`;
  }
  return summary;
};

const backgroundStyles: Record<ContactCTABannerBackground, string> = {
  burgundy: 'bg-[#722F37]',
  gradient: 'bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]',
  cream: 'bg-[#FDF8F3]',
  wave: 'bg-[#722F37]',
};

const textStyles: Record<ContactCTABannerBackground, { heading: string; body: string; muted: string }> = {
  burgundy: {
    heading: 'text-white',
    body: 'text-white/90',
    muted: 'text-white/70',
  },
  gradient: {
    heading: 'text-white',
    body: 'text-white/90',
    muted: 'text-white/70',
  },
  cream: {
    heading: 'text-[#722F37]',
    body: 'text-[#5a252c]',
    muted: 'text-[#722F37]/70',
  },
  wave: {
    heading: 'text-white',
    body: 'text-white/90',
    muted: 'text-white/70',
  },
};

/**
 * Contact CTA Banner component for Ottawa South Dental.
 * A warm, inviting call-to-action banner using the burgundy design language.
 * Features phone display, hours reference, and booking button.
 *
 * Variants:
 * - full: Large banner with info cards grid
 * - compact: Mid-page placement with horizontal layout
 * - minimal: Simple strip CTA
 * - editorial: Premium magazine-style with wave divider and floating elements
 */
export const ContactCtaBanner = forwardRef<HTMLDivElement, ContactCTABannerProps>(
  (
    {
      variant = 'full',
      background = 'gradient',
      headline = 'Ready for Your Healthiest Smile?',
      description = "Our caring team is here to help your whole family. Schedule your visit today or give us a call — we'd love to hear from you.",
      phoneNumber = contactInfo.phone,
      phoneDisplay,
      showEmergency = true,
      emergencyMessage = 'Same-day emergency appointments available',
      showHours = true,
      hoursSummary,
      showLocation = true,
      locationText,
      showLanguages = true,
      languages = ['English', 'French', 'Arabic'],
      bookUrl = '/book',
      bookText = 'Book Your Appointment',
      className = '',
      ...props
    },
    ref
  ) => {
    const colors = textStyles[background];
    const isCream = background === 'cream';
    const isWave = background === 'wave';
    const phoneHref = `tel:${phoneNumber}`;
    const formattedPhone = phoneDisplay || formatPhoneDisplay(phoneNumber);
    const displayHours = hoursSummary || getHoursSummary();
    const displayLocation = locationText ||
      `${contactInfo.address.street}, ${contactInfo.address.city}, ${contactInfo.address.province}`;

    // ============================================
    // EDITORIAL VARIANT - Premium Magazine Style
    // ============================================
    if (variant === 'editorial') {
      return (
        <section
          ref={ref}
          aria-labelledby="contact-cta-editorial-heading"
          className={[
            'relative overflow-hidden',
            'bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]',
            className,
          ].join(' ')}
          {...props}
        >
          {/* Dramatic Wave Background Pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* Layered wave SVGs for depth */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[60%] opacity-10"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="white"
                d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-full h-[40%] opacity-5"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="white"
                d="M0,256L48,266.7C96,277,192,299,288,277.3C384,256,480,192,576,181.3C672,171,768,213,864,234.7C960,256,1056,256,1152,240C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>

            {/* Floating organic shapes */}
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-2xl opacity-15"
              style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)' }}
            />

            {/* Subtle noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Diagonal accent line */}
            <div
              className="absolute top-0 right-0 w-px h-[200%] bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top-right -rotate-45 translate-x-[40vw]"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

              {/* Left Content - Typography Focus */}
              <div className="lg:col-span-7 text-center lg:text-left">
                {/* Accent label */}
                <div
                  className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 animate-fade-in"
                  style={{ animationDelay: '0ms' }}
                >
                  <Sparkles className="w-4 h-4 text-primary-300" aria-hidden="true" />
                  <span className="text-sm font-medium text-white/90 tracking-wide">
                    Accepting New Patients
                  </span>
                </div>

                {/* Main headline with editorial typography */}
                <h2
                  id="contact-cta-editorial-heading"
                  className="animate-fade-in-up"
                  style={{ animationDelay: '100ms' }}
                >
                  <span
                    className={[
                      'block font-display font-bold',
                      'text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]',
                      'leading-[1.05] tracking-tight',
                      'text-white',
                    ].join(' ')}
                  >
                    {headline}
                  </span>
                </h2>

                {/* Description with refined spacing */}
                <p
                  className={[
                    'mt-6 md:mt-8',
                    'text-lg md:text-xl lg:text-[1.35rem]',
                    'text-white/85',
                    'max-w-2xl mx-auto lg:mx-0',
                    'leading-relaxed',
                    'animate-fade-in-up',
                  ].join(' ')}
                  style={{ animationDelay: '200ms' }}
                >
                  {description}
                </p>

                {/* Action buttons with premium styling */}
                <div
                  className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
                  style={{ animationDelay: '300ms' }}
                >
                  {/* Primary CTA with breathing animation */}
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" aria-hidden="true" />}
                    rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
                    onClick={() => window.location.href = bookUrl}
                    className="group relative overflow-hidden shadow-2xl shadow-black/20 hover:shadow-3xl"
                  >
                    <span className="relative z-10">{bookText}</span>
                    {/* Shimmer effect on hover */}
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      aria-hidden="true"
                    />
                  </Button>

                  {/* Phone button with elegant styling */}
                  <a
                    href={phoneHref}
                    className={[
                      'group inline-flex items-center justify-center gap-3',
                      'px-8 py-4 rounded-xl font-medium text-lg',
                      'bg-white/10 backdrop-blur-sm text-white',
                      'border border-white/20',
                      'hover:bg-white/15 hover:border-white/30',
                      'transition-all duration-300 ease-out',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#722F37]',
                    ].join(' ')}
                  >
                    <span className={[
                      'flex items-center justify-center w-10 h-10',
                      'bg-white/10 rounded-lg',
                      'group-hover:bg-white/20',
                      'transition-all duration-300',
                    ].join(' ')}>
                      <Phone className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col items-start leading-tight">
                      <span className="text-xs text-white/60 font-normal">Call us today</span>
                      <span className="font-semibold">{formattedPhone}</span>
                    </span>
                  </a>
                </div>

                {/* Emergency note */}
                {showEmergency && (
                  <p
                    className="mt-8 text-sm text-white/70 inline-flex items-center gap-2 animate-fade-in"
                    style={{ animationDelay: '400ms' }}
                  >
                    <span
                      className="relative flex h-2 w-2"
                      aria-hidden="true"
                    >
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                    </span>
                    {emergencyMessage}
                  </p>
                )}
              </div>

              {/* Right Column - Floating Info Cards */}
              <div
                className="lg:col-span-5 relative animate-fade-in"
                style={{ animationDelay: '250ms' }}
              >
                {/* Stacked floating cards with depth */}
                <div className="relative">
                  {/* Card 1: Hours - Main card */}
                  {showHours && (
                    <div className={[
                      'relative z-30',
                      'bg-white/95 backdrop-blur-md',
                      'rounded-2xl p-6 lg:p-8',
                      'shadow-2xl shadow-black/20',
                      'border border-white/50',
                      'transform hover:-translate-y-1 transition-transform duration-300',
                    ].join(' ')}>
                      <div className="flex items-start gap-4">
                        <div className={[
                          'flex-shrink-0 w-14 h-14 rounded-xl',
                          'bg-gradient-to-br from-[#722F37] to-[#5a252c]',
                          'flex items-center justify-center',
                          'shadow-lg shadow-[#722F37]/20',
                        ].join(' ')}>
                          <Clock className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-neutral-900">Office Hours</h3>
                          <p className="mt-1 text-sm text-neutral-600 font-medium">
                            {displayHours}
                          </p>
                          <p className="mt-2 text-xs text-primary-600 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />
                            Saturday appointments available
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 2: Location - Offset to right */}
                  {showLocation && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(displayLocation)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        'block relative z-20',
                        'mt-4 ml-8 lg:ml-12',
                        'bg-white/90 backdrop-blur-sm',
                        'rounded-2xl p-5 lg:p-6',
                        'shadow-xl shadow-black/10',
                        'border border-white/30',
                        'transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300',
                        'group',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-3">
                        <div className={[
                          'flex-shrink-0 w-11 h-11 rounded-xl',
                          'bg-gradient-to-br from-primary-100 to-primary-50',
                          'flex items-center justify-center',
                          'group-hover:from-[#722F37] group-hover:to-[#5a252c]',
                          'transition-all duration-300',
                        ].join(' ')}>
                          <MapPin className="w-5 h-5 text-[#722F37] group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-neutral-900">Visit Us</h3>
                          <p className="text-sm text-neutral-600">
                            {contactInfo.address.street}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {contactInfo.address.city}, {contactInfo.address.province} {contactInfo.address.postalCode}
                          </p>
                        </div>
                      </div>
                    </a>
                  )}

                  {/* Card 3: Languages - Offset to left */}
                  {showLanguages && languages.length > 0 && (
                    <div className={[
                      'relative z-10',
                      'mt-4 mr-8 lg:mr-12',
                      'bg-white/85 backdrop-blur-sm',
                      'rounded-2xl p-5 lg:p-6',
                      'shadow-lg shadow-black/5',
                      'border border-white/20',
                    ].join(' ')}>
                      <div className="flex items-center gap-3">
                        <div className={[
                          'flex-shrink-0 w-11 h-11 rounded-xl',
                          'bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD]',
                          'flex items-center justify-center',
                        ].join(' ')}>
                          <Globe className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-neutral-900">We Speak</h3>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {languages.map((lang) => (
                              <span
                                key={lang}
                                className="px-2.5 py-1 text-xs font-medium text-[#722F37] bg-[#722F37]/10 rounded-full"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Decorative floating element */}
                  <div
                    className="absolute -top-8 -right-4 lg:-right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 opacity-90 shadow-lg animate-float z-0"
                    style={{ animationDelay: '0.5s' }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave divider */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden"
            aria-hidden="true"
          >
            <svg
              className="absolute bottom-0 w-full h-full text-white"
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1350,50 1440,45 L1440,60 L0,60 Z" />
            </svg>
          </div>
        </section>
      );
    }

    // ============================================
    // FULL VARIANT - Large banner with all info
    // ============================================
    if (variant === 'full') {
      return (
        <section
          ref={ref}
          aria-labelledby="contact-cta-heading"
          className={[
            backgroundStyles[background],
            'relative overflow-hidden',
            className,
          ].join(' ')}
          {...props}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className={[
              'absolute -top-24 -right-24 w-96 h-96 rounded-full',
              isCream ? 'bg-[#722F37]/5' : 'bg-white/5',
            ].join(' ')} />
            <div className={[
              'absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full',
              isCream ? 'bg-[#722F37]/5' : 'bg-white/5',
            ].join(' ')} />
            {/* Subtle pattern overlay */}
            <div
              className={[
                'absolute inset-0',
                isCream ? 'opacity-[0.02]' : 'opacity-[0.03]',
              ].join(' ')}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isCream ? '722F37' : 'ffffff'}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <h2
                  id="contact-cta-heading"
                  className={[
                    'font-display font-bold tracking-tight',
                    'text-fluid-3xl md:text-fluid-4xl',
                    colors.heading,
                  ].join(' ')}
                >
                  {headline}
                </h2>
                <p className={[
                  'mt-4 text-fluid-lg max-w-xl mx-auto lg:mx-0',
                  colors.body,
                ].join(' ')}>
                  {description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    variant={isCream ? 'primary' : 'secondary'}
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" aria-hidden="true" />}
                    onClick={() => window.location.href = bookUrl}
                  >
                    {bookText}
                  </Button>
                  <a
                    href={phoneHref}
                    className={[
                      'inline-flex items-center justify-center gap-2',
                      'px-8 py-4 rounded-xl font-medium text-lg',
                      'transition-all duration-200',
                      isCream
                        ? 'bg-white text-[#722F37] border-2 border-[#EDE5DD] hover:border-[#722F37]/30 hover:bg-[#FDF8F3]'
                        : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/30',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      isCream ? 'focus-visible:ring-[#722F37]' : 'focus-visible:ring-white',
                    ].join(' ')}
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    {formattedPhone}
                  </a>
                </div>

                {/* Emergency note */}
                {showEmergency && (
                  <p className={[
                    'mt-6 text-sm inline-flex items-center gap-2',
                    colors.muted,
                  ].join(' ')}>
                    <span className={[
                      'w-2 h-2 rounded-full animate-pulse',
                      isCream ? 'bg-accent-500' : 'bg-accent-300',
                    ].join(' ')} aria-hidden="true" />
                    {emergencyMessage}
                  </p>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Phone Card */}
                <a
                  href={phoneHref}
                  className={[
                    'group p-6 rounded-2xl transition-all duration-300',
                    isCream
                      ? 'bg-white shadow-[0_2px_8px_-2px_rgba(114,47,55,0.08),0_4px_16px_-4px_rgba(114,47,55,0.1)] hover:shadow-[0_8px_24px_-4px_rgba(114,47,55,0.15)]'
                      : 'bg-white/10 backdrop-blur-sm hover:bg-white/15',
                    'hover:-translate-y-0.5',
                  ].join(' ')}
                >
                  <div className={[
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300',
                    isCream
                      ? 'bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] group-hover:from-[#722F37] group-hover:to-[#5a252c]'
                      : 'bg-white/10 group-hover:bg-white/20',
                  ].join(' ')}>
                    <Phone className={[
                      'w-6 h-6 transition-colors duration-300',
                      isCream ? 'text-[#722F37] group-hover:text-white' : 'text-white',
                    ].join(' ')} aria-hidden="true" />
                  </div>
                  <h3 className={[
                    'font-semibold text-lg',
                    colors.heading,
                  ].join(' ')}>
                    Call Us
                  </h3>
                  <p className={[
                    'mt-1 text-xl font-bold',
                    colors.heading,
                  ].join(' ')}>
                    {formattedPhone}
                  </p>
                  <p className={['mt-2 text-sm', colors.muted].join(' ')}>
                    Speak with our friendly team
                  </p>
                </a>

                {/* Hours Card */}
                {showHours && (
                  <div className={[
                    'p-6 rounded-2xl',
                    isCream
                      ? 'bg-white shadow-[0_2px_8px_-2px_rgba(114,47,55,0.08),0_4px_16px_-4px_rgba(114,47,55,0.1)]'
                      : 'bg-white/10 backdrop-blur-sm',
                  ].join(' ')}>
                    <div className={[
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      isCream
                        ? 'bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD]'
                        : 'bg-white/10',
                    ].join(' ')}>
                      <Clock className={[
                        'w-6 h-6',
                        isCream ? 'text-[#722F37]' : 'text-white',
                      ].join(' ')} aria-hidden="true" />
                    </div>
                    <h3 className={[
                      'font-semibold text-lg',
                      colors.heading,
                    ].join(' ')}>
                      Office Hours
                    </h3>
                    <p className={['mt-1 font-medium text-sm leading-relaxed', colors.heading].join(' ')}>
                      {displayHours}
                    </p>
                    <p className={['mt-2 text-sm', colors.muted].join(' ')}>
                      Saturday appointments available
                    </p>
                  </div>
                )}

                {/* Location Card */}
                {showLocation && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(displayLocation)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'group p-6 rounded-2xl transition-all duration-300',
                      isCream
                        ? 'bg-white shadow-[0_2px_8px_-2px_rgba(114,47,55,0.08),0_4px_16px_-4px_rgba(114,47,55,0.1)] hover:shadow-[0_8px_24px_-4px_rgba(114,47,55,0.15)]'
                        : 'bg-white/10 backdrop-blur-sm hover:bg-white/15',
                      'hover:-translate-y-0.5',
                    ].join(' ')}
                  >
                    <div className={[
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300',
                      isCream
                        ? 'bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] group-hover:from-[#722F37] group-hover:to-[#5a252c]'
                        : 'bg-white/10 group-hover:bg-white/20',
                    ].join(' ')}>
                      <MapPin className={[
                        'w-6 h-6 transition-colors duration-300',
                        isCream ? 'text-[#722F37] group-hover:text-white' : 'text-white',
                      ].join(' ')} aria-hidden="true" />
                    </div>
                    <h3 className={[
                      'font-semibold text-lg',
                      colors.heading,
                    ].join(' ')}>
                      Visit Us
                    </h3>
                    <p className={['mt-1 font-medium text-sm leading-relaxed', colors.heading].join(' ')}>
                      {displayLocation}
                    </p>
                    <p className={['mt-2 text-sm', colors.muted].join(' ')}>
                      Free parking available
                    </p>
                  </a>
                )}

                {/* Languages Card */}
                {showLanguages && languages.length > 0 && (
                  <div className={[
                    'p-6 rounded-2xl',
                    isCream
                      ? 'bg-white shadow-[0_2px_8px_-2px_rgba(114,47,55,0.08),0_4px_16px_-4px_rgba(114,47,55,0.1)]'
                      : 'bg-white/10 backdrop-blur-sm',
                  ].join(' ')}>
                    <div className={[
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      isCream
                        ? 'bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD]'
                        : 'bg-white/10',
                    ].join(' ')}>
                      <Globe className={[
                        'w-6 h-6',
                        isCream ? 'text-[#722F37]' : 'text-white',
                      ].join(' ')} aria-hidden="true" />
                    </div>
                    <h3 className={[
                      'font-semibold text-lg',
                      colors.heading,
                    ].join(' ')}>
                      We Speak
                    </h3>
                    <p className={['mt-1 font-medium', colors.heading].join(' ')}>
                      {languages.join(' | ')}
                    </p>
                    <p className={['mt-2 text-sm', colors.muted].join(' ')}>
                      Multilingual care for everyone
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    // ============================================
    // COMPACT VARIANT - Mid-page placement
    // ============================================
    if (variant === 'compact') {
      return (
        <section
          ref={ref}
          aria-labelledby="contact-cta-heading-compact"
          className={[
            backgroundStyles[background],
            'relative overflow-hidden',
            className,
          ].join(' ')}
          {...props}
        >
          {/* Subtle decorative element */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className={[
              'absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full',
              isCream ? 'bg-[#722F37]/5' : 'bg-white/5',
            ].join(' ')} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Content */}
              <div className="text-center md:text-left">
                <h2
                  id="contact-cta-heading-compact"
                  className={[
                    'font-display font-bold tracking-tight',
                    'text-fluid-2xl md:text-fluid-3xl',
                    colors.heading,
                  ].join(' ')}
                >
                  {headline}
                </h2>
                <p className={[
                  'mt-2 text-fluid-base max-w-lg',
                  colors.body,
                ].join(' ')}>
                  {description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={phoneHref}
                  className={[
                    'flex items-center gap-2 text-lg font-semibold',
                    colors.heading,
                    'hover:underline',
                  ].join(' ')}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {formattedPhone}
                </a>
                <Button
                  variant={isCream ? 'primary' : 'secondary'}
                  size="md"
                  leftIcon={<Calendar className="w-5 h-5" aria-hidden="true" />}
                  onClick={() => window.location.href = bookUrl}
                >
                  {bookText}
                </Button>
              </div>
            </div>

            {/* Hours reference */}
            {showHours && (
              <div className={[
                'mt-6 pt-6 border-t text-center md:text-left',
                isCream ? 'border-[#722F37]/10' : 'border-white/20',
              ].join(' ')}>
                <p className={['text-sm inline-flex items-center gap-2', colors.muted].join(' ')}>
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {displayHours}
                  {showEmergency && (
                    <>
                      <span className="mx-2">|</span>
                      <span className={[
                        'w-2 h-2 rounded-full animate-pulse',
                        isCream ? 'bg-accent-500' : 'bg-accent-300',
                      ].join(' ')} aria-hidden="true" />
                      {emergencyMessage}
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </section>
      );
    }

    // ============================================
    // MINIMAL VARIANT - Simple CTA strip
    // ============================================
    return (
      <section
        ref={ref}
        aria-label="Contact us"
        className={[
          backgroundStyles[background],
          'relative',
          className,
        ].join(' ')}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <p className={[
              'font-display font-semibold text-center sm:text-left',
              colors.heading,
            ].join(' ')}>
              {headline}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={phoneHref}
                className={[
                  'flex items-center gap-2 font-semibold',
                  colors.heading,
                  'hover:underline',
                ].join(' ')}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {formattedPhone}
              </a>
              <Button
                variant={isCream ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => window.location.href = bookUrl}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ContactCtaBanner.displayName = 'ContactCtaBanner';

/**
 * Convenience wrapper for full-width banner CTA.
 */
export const ContactCtaFull = forwardRef<HTMLDivElement, Omit<ContactCTABannerProps, 'variant'>>(
  (props, ref) => <ContactCtaBanner ref={ref} variant="full" {...props} />
);
ContactCtaFull.displayName = 'ContactCtaFull';

/**
 * Convenience wrapper for compact inline CTA.
 */
export const ContactCtaCompact = forwardRef<HTMLDivElement, Omit<ContactCTABannerProps, 'variant'>>(
  (props, ref) => <ContactCtaBanner ref={ref} variant="compact" {...props} />
);
ContactCtaCompact.displayName = 'ContactCtaCompact';

/**
 * Convenience wrapper for minimal CTA strip.
 */
export const ContactCtaMinimal = forwardRef<HTMLDivElement, Omit<ContactCTABannerProps, 'variant'>>(
  (props, ref) => <ContactCtaBanner ref={ref} variant="minimal" {...props} />
);
ContactCtaMinimal.displayName = 'ContactCtaMinimal';

/**
 * Premium editorial-style CTA with wave design and floating cards.
 * Best used as a prominent homepage CTA section.
 */
export const ContactCtaEditorial = forwardRef<HTMLDivElement, Omit<ContactCTABannerProps, 'variant' | 'background'>>(
  (props, ref) => <ContactCtaBanner ref={ref} variant="editorial" background="wave" {...props} />
);
ContactCtaEditorial.displayName = 'ContactCtaEditorial';
