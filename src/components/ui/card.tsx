import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import Image from 'next/image';

export type CardVariant = 'default' | 'service' | 'team';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Card content */
  children: ReactNode;
}

export interface ServiceCardProps extends Omit<CardProps, 'variant' | 'children'> {
  /** Service icon */
  icon: ReactNode;
  /** Service title */
  title: string;
  /** Service description */
  description: string;
  /** Optional link for the card */
  href?: string;
  /** Optional additional content */
  children?: ReactNode;
}

export interface TeamMemberCardProps extends Omit<CardProps, 'variant' | 'children'> {
  /** Team member photo URL */
  imageSrc: string;
  /** Team member name */
  name: string;
  /** Team member role/title */
  role: string;
  /** Optional bio or description */
  bio?: string;
  /** Alt text for image */
  imageAlt?: string;
  /** Optional additional content */
  children?: ReactNode;
}

// Warm burgundy palette from design language
const burgundy = {
  DEFAULT: '#722F37',
  dark: '#5a252c',
  darker: '#4a1f24',
  light: '#8B4049',
  muted: '#722F37/10',
};

const cream = {
  DEFAULT: '#FDF8F3',
  dark: '#F5EDE5',
  darker: '#EDE5DD',
};

const variantStyles: Record<CardVariant, string> = {
  default: [
    // Warm cream background with subtle burgundy border accent
    'bg-white',
    'border border-[#EDE5DD]',
    // Elegant shadow system
    'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.06),0_4px_16px_-4px_rgba(114,47,55,0.08)]',
    'hover:shadow-[0_8px_24px_-6px_rgba(114,47,55,0.12),0_12px_32px_-8px_rgba(114,47,55,0.1)]',
    // Subtle lift on hover
    'hover:-translate-y-0.5',
  ].join(' '),
  service: [
    // Warm white with subtle warm undertone
    'bg-gradient-to-br from-white via-white to-[#FDF8F3]/50',
    'border border-[#EDE5DD]',
    // Refined shadow with burgundy tint
    'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.06),0_4px_16px_-4px_rgba(114,47,55,0.08)]',
    'hover:shadow-[0_12px_32px_-8px_rgba(114,47,55,0.15),0_16px_40px_-12px_rgba(114,47,55,0.12)]',
    // Burgundy border accent on hover
    'hover:border-[#722F37]/20',
    // Subtle lift
    'hover:-translate-y-1',
    'group',
  ].join(' '),
  team: [
    // Clean white base
    'bg-white',
    'border border-[#EDE5DD]',
    // Refined shadow
    'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.06),0_4px_16px_-4px_rgba(114,47,55,0.08)]',
    'hover:shadow-[0_12px_32px_-8px_rgba(114,47,55,0.15),0_16px_40px_-12px_rgba(114,47,55,0.12)]',
    'overflow-hidden',
    'hover:-translate-y-1',
    'group',
  ].join(' '),
};

/**
 * Base Card component following the Family Dental Care design language.
 * Features warm, welcoming aesthetics with refined burgundy accents,
 * soft rounded corners, and elegant hover effects.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          // Generous rounded corners - inviting and friendly
          'rounded-2xl',
          // Smooth, refined transitions
          'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          // Apply variant styles
          variantStyles[variant],
          // Custom className
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Service Card component for displaying dental services.
 * Features an elegant icon container, refined typography,
 * and sophisticated hover interactions.
 */
export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ icon, title, description, href, className = '', children, ...props }, ref) => {
    const content = (
      <>
        {/* Icon container with warm gradient background */}
        <div
          className={[
            'w-14 h-14 rounded-xl',
            // Warm gradient from cream to subtle burgundy tint
            'bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD]',
            // Burgundy icon color
            'text-[#722F37]',
            'flex items-center justify-center',
            'mb-5',
            // Subtle inner shadow for depth
            'shadow-[inset_0_1px_2px_rgba(114,47,55,0.05)]',
            // Elegant transition
            'transition-all duration-300 ease-out',
            // Hover state - burgundy background with white icon
            'group-hover:bg-gradient-to-br group-hover:from-[#722F37] group-hover:via-[#722F37] group-hover:to-[#5a252c]',
            'group-hover:text-white',
            'group-hover:scale-105',
            'group-hover:shadow-[0_4px_12px_-2px_rgba(114,47,55,0.3)]',
          ].join(' ')}
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Title with refined typography */}
        <h3
          className={[
            'text-lg font-semibold',
            'text-[#1e293b]',
            'mb-2',
            // Smooth color transition
            'transition-colors duration-300',
            // Burgundy accent on hover
            'group-hover:text-[#722F37]',
          ].join(' ')}
        >
          {title}
        </h3>

        {/* Description with balanced line height */}
        <p className="text-[#64748b] text-sm leading-relaxed">{description}</p>

        {/* Optional additional content */}
        {children}

        {/* Learn more indicator with elegant arrow animation */}
        {href && (
          <div
            className={[
              'mt-5 flex items-center gap-2',
              'text-sm font-medium text-[#722F37]',
              'transition-all duration-300 ease-out',
            ].join(' ')}
          >
            <span className="relative">
              Learn more
              {/* Animated underline */}
              <span
                className={[
                  'absolute left-0 -bottom-0.5',
                  'w-0 h-[1.5px] bg-[#722F37]',
                  'transition-all duration-300 ease-out',
                  'group-hover:w-full',
                ].join(' ')}
                aria-hidden="true"
              />
            </span>
            <svg
              className={[
                'w-4 h-4',
                'transition-all duration-300 ease-out',
                'group-hover:translate-x-1',
              ].join(' ')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </>
    );

    const cardClasses = [
      // Warm gradient background
      'bg-gradient-to-br from-white via-white to-[#FDF8F3]/50',
      'border border-[#EDE5DD]',
      'rounded-2xl p-6',
      // Refined shadow system
      'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.06),0_4px_16px_-4px_rgba(114,47,55,0.08)]',
      'hover:shadow-[0_12px_32px_-8px_rgba(114,47,55,0.15),0_16px_40px_-12px_rgba(114,47,55,0.12)]',
      'hover:border-[#722F37]/20',
      // Smooth transitions
      'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
      'hover:-translate-y-1',
      href ? 'cursor-pointer' : '',
      'group',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Render as link if href is provided
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={[cardClasses, 'block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2'].join(' ')}
          {...(props as HTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {content}
      </div>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';

/**
 * Team Member Card component for displaying staff profiles.
 * Features elegant photo presentation with warm overlay effects,
 * refined typography, and sophisticated hover interactions.
 */
export const TeamMemberCard = forwardRef<HTMLDivElement, TeamMemberCardProps>(
  (
    { imageSrc, name, role, bio, imageAlt, className = '', children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          // Clean white base
          'bg-white',
          'border border-[#EDE5DD]',
          'rounded-2xl',
          'overflow-hidden',
          // Refined shadow system
          'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.06),0_4px_16px_-4px_rgba(114,47,55,0.08)]',
          'hover:shadow-[0_12px_32px_-8px_rgba(114,47,55,0.15),0_16px_40px_-12px_rgba(114,47,55,0.12)]',
          // Smooth transitions
          'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'hover:-translate-y-1',
          'group',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {/* Image container with elegant aspect ratio */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <Image
            src={imageSrc}
            alt={imageAlt || `Photo of ${name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={[
              'object-cover',
              // Smooth zoom effect
              'transition-transform duration-500 ease-out',
              'group-hover:scale-105',
            ].join(' ')}
            loading="lazy"
          />

          {/* Warm burgundy gradient overlay on hover */}
          <div
            className={[
              'absolute inset-0',
              'bg-gradient-to-t from-[#722F37]/70 via-[#722F37]/20 to-transparent',
              'opacity-0 transition-opacity duration-400 ease-out',
              'group-hover:opacity-100',
            ].join(' ')}
            aria-hidden="true"
          />

          {/* Subtle corner accent */}
          <div
            className={[
              'absolute top-0 right-0 w-16 h-16',
              'bg-gradient-to-bl from-[#722F37]/10 to-transparent',
              'opacity-0 transition-opacity duration-300',
              'group-hover:opacity-100',
            ].join(' ')}
            aria-hidden="true"
          />
        </div>

        {/* Content section with warm background accent */}
        <div className="relative p-5 bg-gradient-to-b from-white to-[#FDF8F3]/30">
          {/* Decorative accent line */}
          <div
            className={[
              'absolute top-0 left-5 right-5 h-[2px]',
              'bg-gradient-to-r from-transparent via-[#722F37]/20 to-transparent',
              'opacity-0 transition-opacity duration-300',
              'group-hover:opacity-100',
            ].join(' ')}
            aria-hidden="true"
          />

          {/* Name with elegant typography */}
          <h3
            className={[
              'text-lg font-semibold',
              'text-[#1e293b]',
              // Smooth color transition
              'transition-colors duration-300',
              // Burgundy accent on hover
              'group-hover:text-[#722F37]',
            ].join(' ')}
          >
            {name}
          </h3>

          {/* Role badge with warm styling */}
          <p
            className={[
              'text-[#722F37] text-sm font-medium mt-1.5',
              'inline-block',
              // Subtle background pill on hover
              'px-0 py-0',
              'transition-all duration-300',
              'group-hover:bg-[#722F37]/5 group-hover:px-2.5 group-hover:py-0.5 group-hover:rounded-full',
              'group-hover:-ml-2.5',
            ].join(' ')}
          >
            {role}
          </p>

          {/* Bio with balanced typography */}
          {bio && (
            <p className="text-[#64748b] text-sm leading-relaxed mt-3">{bio}</p>
          )}

          {/* Optional additional content */}
          {children}
        </div>
      </div>
    );
  }
);

TeamMemberCard.displayName = 'TeamMemberCard';

/**
 * Card Header component for composing custom card layouts.
 * Features consistent padding with warm background option.
 */
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={['px-6 pt-6 pb-4', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

/**
 * Card Content component for composing custom card layouts.
 */
export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={['px-6 pb-6', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

/**
 * Card Footer component for composing custom card layouts.
 * Features warm cream background with subtle burgundy border accent.
 */
export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={[
        'px-6 py-4',
        // Warm border with burgundy tint
        'border-t border-[#EDE5DD]',
        // Cream background for visual separation
        'bg-gradient-to-b from-[#FDF8F3]/50 to-[#FDF8F3]',
        'rounded-b-2xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';
