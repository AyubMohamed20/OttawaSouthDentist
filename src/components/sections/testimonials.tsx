'use client';

import { forwardRef, useState, useCallback, useEffect, type HTMLAttributes } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionContainer, type SectionBackground } from '@/components/ui/section-container';

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
  initials?: string;
}

export interface TestimonialsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Section headline */
  headline?: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Array of testimonials to display */
  testimonials?: Testimonial[];
  /** Display variant */
  variant?: 'carousel' | 'grid' | 'featured';
  /** Show Google rating badge */
  showGoogleRating?: boolean;
  /** Overall Google rating */
  googleRating?: number;
  /** Total number of reviews */
  totalReviews?: number;
  /** Background color variant */
  background?: SectionBackground;
}

// Default testimonials for Ottawa South Dental
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    rating: 5,
    text: "I've been coming here for three years and have always received exceptional care. The staff is incredibly warm and welcoming, and Dr. Chen takes the time to explain everything thoroughly. My whole family now comes here!",
    service: 'Family Dentistry',
    date: 'December 2025',
    initials: 'SM',
  },
  {
    id: '2',
    name: 'Michael Thompson',
    rating: 5,
    text: 'After years of dental anxiety, I finally found a practice that makes me feel comfortable. They were patient with my concerns and the sedation options made my root canal completely stress-free. Highly recommend!',
    service: 'Root Canal Treatment',
    date: 'November 2025',
    initials: 'MT',
  },
  {
    id: '3',
    name: 'Jennifer Lavoie',
    rating: 5,
    text: "The cosmetic work they did on my smile exceeded my expectations. The Invisalign process was smooth, and now I can't stop smiling! The team here truly cares about giving you the best results.",
    service: 'Invisalign',
    date: 'October 2025',
    initials: 'JL',
  },
  {
    id: '4',
    name: 'Robert Chen',
    rating: 5,
    text: 'Professional, punctual, and genuinely caring. Emergency appointment was handled same-day when I cracked a tooth. The office is modern, clean, and the technology they use is impressive.',
    service: 'Emergency Care',
    date: 'January 2026',
    initials: 'RC',
  },
  {
    id: '5',
    name: 'Amanda Bouchard',
    rating: 5,
    text: "My kids actually look forward to their dental visits now! The children's area is wonderful, and the hygienists are so gentle and patient. It's made a huge difference in their attitude toward dental health.",
    service: "Children's Dentistry",
    date: 'December 2025',
    initials: 'AB',
  },
  {
    id: '6',
    name: 'David Park',
    rating: 5,
    text: 'The teeth whitening results were fantastic - several shades brighter in just one session. Very reasonable pricing compared to other clinics in Ottawa, and the results speak for themselves.',
    service: 'Teeth Whitening',
    date: 'November 2025',
    initials: 'DP',
  },
];

/**
 * Star Rating component with elegant gold styling
 */
const StarRating = ({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={[
            sizeClasses[size],
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-neutral-200 text-neutral-200',
            'transition-colors duration-200',
          ].join(' ')}
        />
      ))}
    </div>
  );
};

/**
 * Individual Testimonial Card with editorial magazine aesthetic
 */
const TestimonialCard = ({
  testimonial,
  featured = false,
}: {
  testimonial: Testimonial;
  featured?: boolean;
}) => {
  return (
    <article
      className={[
        'group relative',
        // Base card styling with warm cream undertones
        'bg-gradient-to-br from-white via-white to-[#FDF8F3]/60',
        'border border-[#EDE5DD]',
        'rounded-2xl',
        // Elegant shadow system with burgundy tint
        'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.05),0_4px_16px_-4px_rgba(114,47,55,0.06)]',
        'hover:shadow-[0_12px_32px_-8px_rgba(114,47,55,0.12),0_16px_40px_-12px_rgba(114,47,55,0.08)]',
        // Smooth transitions
        'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:-translate-y-1',
        // Featured card gets extra emphasis
        featured ? 'lg:col-span-2 lg:row-span-2' : '',
      ].join(' ')}
    >
      {/* Decorative quote mark - elegant oversized typography */}
      <div
        className={[
          'absolute -top-3 -left-2 md:-top-4 md:-left-3',
          'text-[80px] md:text-[100px] leading-none',
          'font-display font-bold',
          'text-primary-200/40',
          'select-none pointer-events-none',
          'transition-all duration-500',
          'group-hover:text-primary-300/50',
          'group-hover:scale-105',
        ].join(' ')}
        aria-hidden="true"
      >
        "
      </div>

      {/* Card content */}
      <div className={[
        'relative z-10',
        featured ? 'p-8 md:p-10 lg:p-12' : 'p-6 md:p-8',
      ].join(' ')}>
        {/* Rating and service badge row */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={testimonial.rating} size={featured ? 'lg' : 'md'} />
          {testimonial.service && (
            <span
              className={[
                'text-xs font-medium tracking-wide uppercase',
                'px-3 py-1 rounded-full',
                'bg-primary-50 text-primary-700',
                'border border-primary-100',
              ].join(' ')}
            >
              {testimonial.service}
            </span>
          )}
        </div>

        {/* Testimonial text with elegant typography */}
        <blockquote
          className={[
            'relative',
            featured ? 'text-lg md:text-xl lg:text-2xl' : 'text-base md:text-lg',
            'leading-relaxed',
            'text-neutral-700',
            'font-normal',
            // Subtle italic styling for quote feel
            '[font-style:normal]',
          ].join(' ')}
        >
          <p className="relative">
            {testimonial.text}
          </p>
        </blockquote>

        {/* Author attribution with elegant styling */}
        <footer className="mt-6 pt-5 border-t border-[#EDE5DD]/80">
          <div className="flex items-center gap-4">
            {/* Avatar with initials */}
            <div
              className={[
                'flex-shrink-0',
                featured ? 'w-14 h-14' : 'w-12 h-12',
                'rounded-full',
                // Warm gradient background
                'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700',
                // Inner glow effect
                'shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_2px_8px_-2px_rgba(13,148,136,0.4)]',
                'flex items-center justify-center',
                // Subtle animation on hover
                'transition-transform duration-300',
                'group-hover:scale-105',
              ].join(' ')}
            >
              <span
                className={[
                  'font-semibold text-white',
                  featured ? 'text-lg' : 'text-base',
                ].join(' ')}
              >
                {testimonial.initials || testimonial.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            {/* Name and date */}
            <div>
              <cite
                className={[
                  'not-italic font-semibold',
                  'text-neutral-800',
                  featured ? 'text-lg' : 'text-base',
                  'block',
                ].join(' ')}
              >
                {testimonial.name}
              </cite>
              {testimonial.date && (
                <span className="text-sm text-neutral-500 mt-0.5 block">
                  {testimonial.date}
                </span>
              )}
            </div>

            {/* Verified badge */}
            <div
              className={[
                'ml-auto',
                'flex items-center gap-1.5',
                'text-xs font-medium',
                'text-primary-600',
              ].join(' ')}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">Verified</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Subtle corner accent on hover */}
      <div
        className={[
          'absolute bottom-0 right-0 w-24 h-24',
          'bg-gradient-to-tl from-primary-100/30 to-transparent',
          'rounded-br-2xl rounded-tl-[100px]',
          'opacity-0 transition-opacity duration-500',
          'group-hover:opacity-100',
        ].join(' ')}
        aria-hidden="true"
      />
    </article>
  );
};

/**
 * Google Rating Badge component
 */
const GoogleRatingBadge = ({
  rating,
  totalReviews,
}: {
  rating: number;
  totalReviews: number;
}) => {
  return (
    <div
      className={[
        'inline-flex items-center gap-3',
        'px-5 py-3',
        'bg-white',
        'border border-[#EDE5DD]',
        'rounded-full',
        'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.06),0_4px_12px_-4px_rgba(114,47,55,0.08)]',
      ].join(' ')}
    >
      {/* Google "G" logo */}
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>

      <div className="flex items-center gap-2">
        <span className="font-bold text-neutral-800 text-lg">{rating.toFixed(1)}</span>
        <StarRating rating={Math.round(rating)} size="sm" />
      </div>

      <div className="h-4 w-px bg-neutral-200" aria-hidden="true" />

      <span className="text-sm text-neutral-600">
        {totalReviews.toLocaleString()} reviews
      </span>
    </div>
  );
};

/**
 * Carousel Navigation Button
 */
const CarouselButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
      className={[
        'flex items-center justify-center',
        'w-12 h-12 md:w-14 md:h-14',
        'rounded-full',
        'bg-white',
        'border border-[#EDE5DD]',
        'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.08)]',
        'transition-all duration-300',
        'hover:shadow-[0_4px_12px_-2px_rgba(114,47,55,0.15)]',
        'hover:border-primary-200',
        'hover:bg-primary-50',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'disabled:hover:shadow-[0_2px_8px_-2px_rgba(114,47,55,0.08)]',
        'disabled:hover:border-[#EDE5DD]',
        'disabled:hover:bg-white',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      ].join(' ')}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />
    </button>
  );
};

/**
 * Testimonials Section component for Ottawa South Dental.
 * Features an editorial magazine aesthetic with elegant typography,
 * asymmetric layouts, and sophisticated visual hierarchy.
 */
export const Testimonials = forwardRef<HTMLDivElement, TestimonialsProps>(
  (
    {
      headline = 'What Our Patients Say',
      subtitle = 'Real stories from families who trust us with their smiles. Read why Ottawa chooses us for their dental care.',
      testimonials = DEFAULT_TESTIMONIALS,
      variant = 'grid',
      showGoogleRating = true,
      googleRating = 4.9,
      totalReviews = 247,
      background = 'secondary',
      className = '',
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Carousel navigation
    const goToPrevious = useCallback(() => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, testimonials.length]);

    const goToNext = useCallback(() => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, testimonials.length]);

    // Auto-advance carousel
    useEffect(() => {
      if (variant !== 'carousel') return;

      const interval = setInterval(() => {
        goToNext();
      }, 8000);

      return () => clearInterval(interval);
    }, [variant, goToNext]);

    // Grid Layout
    if (variant === 'grid') {
      return (
        <SectionContainer
          ref={ref}
          as="section"
          paddingY="lg"
          background={background}
          className={className}
          aria-labelledby="testimonials-heading"
          {...props}
        >
          {/* Section Header */}
          <header className="text-center mb-12 md:mb-16">
            {showGoogleRating && (
              <div className="flex justify-center mb-6">
                <GoogleRatingBadge rating={googleRating} totalReviews={totalReviews} />
              </div>
            )}

            <h2
              id="testimonials-heading"
              className={[
                'font-display font-bold tracking-tight',
                'text-fluid-3xl md:text-fluid-4xl',
                'text-neutral-900',
              ].join(' ')}
            >
              {headline}
            </h2>

            <p
              className={[
                'mt-4 md:mt-5',
                'text-fluid-base md:text-fluid-lg',
                'text-neutral-600',
                'max-w-2xl mx-auto',
                'leading-relaxed',
              ].join(' ')}
            >
              {subtitle}
            </p>
          </header>

          {/* Testimonials Grid - Magazine-style asymmetric layout */}
          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {/* First column - stacked cards */}
            <div className="space-y-6 md:space-y-8">
              {testimonials.slice(0, 2).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            {/* Middle column - featured large card + small card */}
            <div className="space-y-6 md:space-y-8 lg:pt-8">
              {testimonials.slice(2, 4).map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  featured={index === 0}
                />
              ))}
            </div>

            {/* Third column - stacked cards */}
            <div className="space-y-6 md:space-y-8 lg:pt-16">
              {testimonials.slice(4, 6).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <footer className="mt-12 md:mt-16 text-center">
            <a
              href="https://www.google.com/maps/place/Ottawa+South+Dental"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'inline-flex items-center gap-2',
                'px-6 py-3',
                'text-base font-medium',
                'text-primary-700',
                'bg-primary-50',
                'border border-primary-200',
                'rounded-full',
                'transition-all duration-300',
                'hover:bg-primary-100',
                'hover:border-primary-300',
                'hover:shadow-[0_4px_12px_-2px_rgba(13,148,136,0.2)]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              ].join(' ')}
            >
              <span>Read More Reviews on Google</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </footer>
        </SectionContainer>
      );
    }

    // Carousel Layout
    if (variant === 'carousel') {
      return (
        <SectionContainer
          ref={ref}
          as="section"
          paddingY="lg"
          background={background}
          className={className}
          aria-labelledby="testimonials-heading"
          {...props}
        >
          {/* Section Header */}
          <header className="text-center mb-12 md:mb-16">
            {showGoogleRating && (
              <div className="flex justify-center mb-6">
                <GoogleRatingBadge rating={googleRating} totalReviews={totalReviews} />
              </div>
            )}

            <h2
              id="testimonials-heading"
              className={[
                'font-display font-bold tracking-tight',
                'text-fluid-3xl md:text-fluid-4xl',
                'text-neutral-900',
              ].join(' ')}
            >
              {headline}
            </h2>

            <p
              className={[
                'mt-4 md:mt-5',
                'text-fluid-base md:text-fluid-lg',
                'text-neutral-600',
                'max-w-2xl mx-auto',
                'leading-relaxed',
              ].join(' ')}
            >
              {subtitle}
            </p>
          </header>

          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <div className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 z-10">
              <CarouselButton
                direction="prev"
                onClick={goToPrevious}
                disabled={isAnimating}
              />
            </div>
            <div className="hidden md:block absolute -right-20 top-1/2 -translate-y-1/2 z-10">
              <CarouselButton
                direction="next"
                onClick={goToNext}
                disabled={isAnimating}
              />
            </div>

            {/* Testimonial Card */}
            <div
              className={[
                'transition-all duration-500 ease-out',
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
              ].join(' ')}
            >
              <TestimonialCard
                testimonial={testimonials[currentIndex]!}
                featured
              />
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center justify-center gap-4 mt-6">
              <CarouselButton
                direction="prev"
                onClick={goToPrevious}
                disabled={isAnimating}
              />
              <CarouselButton
                direction="next"
                onClick={goToNext}
                disabled={isAnimating}
              />
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => {
                    if (!isAnimating && index !== currentIndex) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={[
                    'transition-all duration-300',
                    'rounded-full',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    index === currentIndex
                      ? 'w-8 h-2.5 bg-primary-500'
                      : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400',
                  ].join(' ')}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <footer className="mt-12 md:mt-16 text-center">
            <a
              href="https://www.google.com/maps/place/Ottawa+South+Dental"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'inline-flex items-center gap-2',
                'px-6 py-3',
                'text-base font-medium',
                'text-primary-700',
                'bg-primary-50',
                'border border-primary-200',
                'rounded-full',
                'transition-all duration-300',
                'hover:bg-primary-100',
                'hover:border-primary-300',
                'hover:shadow-[0_4px_12px_-2px_rgba(13,148,136,0.2)]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              ].join(' ')}
            >
              <span>Read More Reviews on Google</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </footer>
        </SectionContainer>
      );
    }

    // Featured Layout - Single prominent testimonial with supporting quotes
    return (
      <SectionContainer
        ref={ref}
        as="section"
        paddingY="lg"
        background={background}
        className={className}
        aria-labelledby="testimonials-heading"
        {...props}
      >
        {/* Section Header */}
        <header className="text-center mb-12 md:mb-16">
          {showGoogleRating && (
            <div className="flex justify-center mb-6">
              <GoogleRatingBadge rating={googleRating} totalReviews={totalReviews} />
            </div>
          )}

          <h2
            id="testimonials-heading"
            className={[
              'font-display font-bold tracking-tight',
              'text-fluid-3xl md:text-fluid-4xl',
              'text-neutral-900',
            ].join(' ')}
          >
            {headline}
          </h2>

          <p
            className={[
              'mt-4 md:mt-5',
              'text-fluid-base md:text-fluid-lg',
              'text-neutral-600',
              'max-w-2xl mx-auto',
              'leading-relaxed',
            ].join(' ')}
          >
            {subtitle}
          </p>
        </header>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-14">
          <TestimonialCard
            testimonial={testimonials[0]!}
            featured
          />
        </div>

        {/* Supporting Testimonials - Compact Grid */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {testimonials.slice(1, 4).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Bottom CTA */}
        <footer className="mt-12 md:mt-16 text-center">
          <a
            href="https://www.google.com/maps/place/Ottawa+South+Dental"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'inline-flex items-center gap-2',
              'px-6 py-3',
              'text-base font-medium',
              'text-primary-700',
              'bg-primary-50',
              'border border-primary-200',
              'rounded-full',
              'transition-all duration-300',
              'hover:bg-primary-100',
              'hover:border-primary-300',
              'hover:shadow-[0_4px_12px_-2px_rgba(13,148,136,0.2)]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
            ].join(' ')}
          >
            <span>Read More Reviews on Google</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </footer>
      </SectionContainer>
    );
  }
);

Testimonials.displayName = 'Testimonials';

/**
 * Convenience wrapper for carousel variant
 */
export const TestimonialsCarousel = forwardRef<HTMLDivElement, Omit<TestimonialsProps, 'variant'>>(
  (props, ref) => <Testimonials ref={ref} variant="carousel" {...props} />
);
TestimonialsCarousel.displayName = 'TestimonialsCarousel';

/**
 * Convenience wrapper for featured variant
 */
export const TestimonialsFeatured = forwardRef<HTMLDivElement, Omit<TestimonialsProps, 'variant'>>(
  (props, ref) => <Testimonials ref={ref} variant="featured" {...props} />
);
TestimonialsFeatured.displayName = 'TestimonialsFeatured';

export default Testimonials;
