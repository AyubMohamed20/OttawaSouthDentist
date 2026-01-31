'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ContactCTAVariant = 'full' | 'compact' | 'minimal';
export type ContactCTABackground = 'primary' | 'gradient' | 'light';

export interface OfficeHoursItem {
  day: string;
  hours: string;
}

export interface ContactCTAProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Visual style variant */
  variant?: ContactCTAVariant;
  /** Background style */
  background?: ContactCTABackground;
  /** Custom headline text */
  headline?: string;
  /** Custom description text */
  description?: string;
  /** Phone number for tel: href (digits only recommended) */
  phoneNumber?: string;
  /** Phone display format (how it appears to users) */
  phoneDisplay?: string;
  /** Emergency phone number (defaults to main number) */
  emergencyNumber?: string;
  /** Show emergency contact section */
  showEmergency?: boolean;
  /** Custom emergency message */
  emergencyMessage?: string;
  /** Show office hours */
  showHours?: boolean;
  /** Office hours text (simple string) */
  hoursText?: string;
  /** Office hours array for detailed display */
  officeHours?: OfficeHoursItem[];
  /** Show location info */
  showLocation?: boolean;
  /** Location address */
  locationText?: string;
  /** Show address */
  showAddress?: boolean;
  /** Address string */
  address?: string;
  /** Custom book appointment URL */
  bookUrl?: string;
  /** Book button text (alias: bookText) */
  bookButtonText?: string;
  /** Book button text */
  bookText?: string;
}

// Default contact information - can be overridden via props
const DEFAULT_PHONE_NUMBER = '+16137336446';
const DEFAULT_PHONE_DISPLAY = '(613) 733-6446';
const DEFAULT_HOURS = 'Mon-Fri: 8am-5pm';
const DEFAULT_LOCATION = '1980 Ogilvie Rd, Ottawa';
const DEFAULT_EMERGENCY_MSG = 'Same-day emergency care available';

const backgroundStyles: Record<ContactCTABackground, string> = {
  primary: 'bg-primary-600',
  gradient: 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800',
  light: 'bg-primary-50',
};

const textStyles: Record<ContactCTABackground, { heading: string; body: string; muted: string }> = {
  primary: {
    heading: 'text-white',
    body: 'text-primary-100',
    muted: 'text-primary-200',
  },
  gradient: {
    heading: 'text-white',
    body: 'text-primary-100',
    muted: 'text-primary-200',
  },
  light: {
    heading: 'text-primary-900',
    body: 'text-primary-700',
    muted: 'text-primary-600',
  },
};

/**
 * Contact CTA component for Ottawa South Dental.
 * A prominent call-to-action banner encouraging visitors to book appointments.
 * Features phone display, emergency messaging, and multiple style variants.
 */
export const ContactCTA = forwardRef<HTMLDivElement, ContactCTAProps>(
  (
    {
      variant = 'full',
      background = 'gradient',
      headline = 'Ready to Schedule Your Visit?',
      description = "We're here to help you achieve your healthiest smile. Book your appointment today or give us a call.",
      phoneNumber = DEFAULT_PHONE_NUMBER,
      phoneDisplay = DEFAULT_PHONE_DISPLAY,
      emergencyNumber,
      showEmergency = true,
      emergencyMessage = DEFAULT_EMERGENCY_MSG,
      showHours = true,
      hoursText = DEFAULT_HOURS,
      officeHours,
      showLocation = false,
      locationText = DEFAULT_LOCATION,
      showAddress = false,
      address,
      bookUrl = '/book',
      bookText: bookTextProp,
      bookButtonText,
      className = '',
      ...props
    },
    ref
  ) => {
    const bookText = bookButtonText || bookTextProp || 'Book Appointment';
    const colors = textStyles[background];
    const isLight = background === 'light';
    const phoneHref = `tel:${phoneNumber}`;
    const emergencyPhoneDisplay = emergencyNumber || phoneDisplay;
    const emergencyPhoneHref = emergencyNumber ? `tel:${emergencyNumber}` : phoneHref;

    // Full variant - large banner with all information
    if (variant === 'full') {
      return (
        <section
          ref={ref}
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
              isLight ? 'bg-primary-100/50' : 'bg-white/5',
            ].join(' ')} />
            <div className={[
              'absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full',
              isLight ? 'bg-primary-100/30' : 'bg-white/5',
            ].join(' ')} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <h2 className={[
                  'font-display font-bold tracking-tight',
                  'text-fluid-3xl md:text-fluid-4xl',
                  colors.heading,
                ].join(' ')}>
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
                    variant={isLight ? 'primary' : 'secondary'}
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
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
                      isLight
                        ? 'bg-white text-primary-700 border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                        : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      isLight ? 'focus-visible:ring-primary-500' : 'focus-visible:ring-white',
                    ].join(' ')}
                  >
                    <Phone className="w-5 h-5" />
                    {phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Phone Card */}
                <div className={[
                  'p-6 rounded-2xl',
                  isLight ? 'bg-white shadow-soft' : 'bg-white/10 backdrop-blur-sm',
                ].join(' ')}>
                  <div className={[
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                    isLight ? 'bg-primary-100' : 'bg-white/10',
                  ].join(' ')}>
                    <Phone className={[
                      'w-6 h-6',
                      isLight ? 'text-primary-600' : 'text-white',
                    ].join(' ')} />
                  </div>
                  <h3 className={[
                    'font-semibold text-lg',
                    colors.heading,
                  ].join(' ')}>
                    Call Us
                  </h3>
                  <a
                    href={phoneHref}
                    className={[
                      'block mt-1 text-xl font-bold',
                      colors.heading,
                      'hover:underline',
                    ].join(' ')}
                  >
                    {phoneDisplay}
                  </a>
                  <p className={['mt-2 text-sm', colors.muted].join(' ')}>
                    Speak with our friendly team
                  </p>
                </div>

                {/* Hours Card */}
                {showHours && (
                  <div className={[
                    'p-6 rounded-2xl',
                    isLight ? 'bg-white shadow-soft' : 'bg-white/10 backdrop-blur-sm',
                  ].join(' ')}>
                    <div className={[
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      isLight ? 'bg-primary-100' : 'bg-white/10',
                    ].join(' ')}>
                      <Clock className={[
                        'w-6 h-6',
                        isLight ? 'text-primary-600' : 'text-white',
                      ].join(' ')} />
                    </div>
                    <h3 className={[
                      'font-semibold text-lg',
                      colors.heading,
                    ].join(' ')}>
                      Office Hours
                    </h3>
                    <p className={['mt-1 font-medium', colors.heading].join(' ')}>
                      {hoursText}
                    </p>
                    <p className={['mt-2 text-sm', colors.muted].join(' ')}>
                      Extended hours available
                    </p>
                  </div>
                )}

                {/* Location Card */}
                {showLocation && (
                  <div className={[
                    'p-6 rounded-2xl',
                    isLight ? 'bg-white shadow-soft' : 'bg-white/10 backdrop-blur-sm',
                  ].join(' ')}>
                    <div className={[
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      isLight ? 'bg-primary-100' : 'bg-white/10',
                    ].join(' ')}>
                      <MapPin className={[
                        'w-6 h-6',
                        isLight ? 'text-primary-600' : 'text-white',
                      ].join(' ')} />
                    </div>
                    <h3 className={[
                      'font-semibold text-lg',
                      colors.heading,
                    ].join(' ')}>
                      Location
                    </h3>
                    <p className={['mt-1 font-medium', colors.heading].join(' ')}>
                      {locationText}
                    </p>
                    <p className={['mt-2 text-sm', colors.muted].join(' ')}>
                      Free parking available
                    </p>
                  </div>
                )}

                {/* Emergency Card */}
                {showEmergency && (
                  <div className={[
                    'p-6 rounded-2xl',
                    isLight ? 'bg-accent-50 border border-accent-200' : 'bg-accent-500/20 backdrop-blur-sm border border-accent-400/30',
                  ].join(' ')}>
                    <div className={[
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      isLight ? 'bg-accent-100' : 'bg-accent-500/30',
                    ].join(' ')}>
                      <Phone className={[
                        'w-6 h-6',
                        isLight ? 'text-accent-600' : 'text-accent-200',
                      ].join(' ')} />
                    </div>
                    <h3 className={[
                      'font-semibold text-lg',
                      isLight ? 'text-accent-900' : 'text-white',
                    ].join(' ')}>
                      Dental Emergency?
                    </h3>
                    <a
                      href={emergencyPhoneHref}
                      className={[
                        'block mt-1 text-xl font-bold',
                        isLight ? 'text-accent-700' : 'text-accent-200',
                        'hover:underline',
                      ].join(' ')}
                    >
                      {emergencyPhoneDisplay}
                    </a>
                    <p className={[
                      'mt-2 text-sm',
                      isLight ? 'text-accent-600' : 'text-accent-200/80',
                    ].join(' ')}>
                      {emergencyMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    // Compact variant - smaller banner suitable for mid-page placement
    if (variant === 'compact') {
      return (
        <section
          ref={ref}
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
              isLight ? 'bg-primary-100/50' : 'bg-white/5',
            ].join(' ')} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Content */}
              <div className="text-center md:text-left">
                <h2 className={[
                  'font-display font-bold tracking-tight',
                  'text-fluid-2xl md:text-fluid-3xl',
                  colors.heading,
                ].join(' ')}>
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
                  <Phone className="w-5 h-5" />
                  {phoneDisplay}
                </a>
                <Button
                  variant={isLight ? 'primary' : 'secondary'}
                  size="md"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => window.location.href = bookUrl}
                >
                  {bookText}
                </Button>
              </div>
            </div>

            {/* Emergency note */}
            {showEmergency && (
              <div className={[
                'mt-6 pt-6 border-t text-center md:text-left',
                isLight ? 'border-primary-200' : 'border-white/20',
              ].join(' ')}>
                <p className={['text-sm', colors.muted].join(' ')}>
                  <span className="font-semibold">Dental emergency?</span>
                  {' '}Call us immediately at{' '}
                  <a href={emergencyPhoneHref} className={[colors.heading, 'font-semibold hover:underline'].join(' ')}>
                    {emergencyPhoneDisplay}
                  </a>
                  {' '}{emergencyMessage}
                </p>
              </div>
            )}
          </div>
        </section>
      );
    }

    // Minimal variant - simple inline CTA
    return (
      <section
        ref={ref}
        className={[
          backgroundStyles[background],
          'relative',
          className,
        ].join(' ')}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <p className={[
              'font-medium text-center sm:text-left',
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
                <Phone className="w-4 h-4" />
                {phoneDisplay}
              </a>
              <Button
                variant={isLight ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => window.location.href = bookUrl}
              >
                {bookText}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ContactCTA.displayName = 'ContactCTA';

/**
 * Convenience wrapper for full-width banner CTA.
 */
export const ContactCTABanner = forwardRef<HTMLDivElement, Omit<ContactCTAProps, 'variant'>>(
  (props, ref) => <ContactCTA ref={ref} variant="full" {...props} />
);
ContactCTABanner.displayName = 'ContactCTABanner';

/**
 * Convenience wrapper for compact inline CTA.
 */
export const ContactCTACompact = forwardRef<HTMLDivElement, Omit<ContactCTAProps, 'variant'>>(
  (props, ref) => <ContactCTA ref={ref} variant="compact" {...props} />
);
ContactCTACompact.displayName = 'ContactCTACompact';

/**
 * Convenience wrapper for minimal CTA strip.
 */
export const ContactCTAMinimal = forwardRef<HTMLDivElement, Omit<ContactCTAProps, 'variant'>>(
  (props, ref) => <ContactCTA ref={ref} variant="minimal" {...props} />
);
ContactCTAMinimal.displayName = 'ContactCTAMinimal';
