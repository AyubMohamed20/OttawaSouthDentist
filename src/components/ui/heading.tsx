import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type HeadingVariant = 'page-title' | 'section-title';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Visual style variant */
  variant?: HeadingVariant;
  /** HTML heading level (h1-h6) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Optional subtitle or description */
  subtitle?: ReactNode;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Children elements */
  children: ReactNode;
}

const variantStyles: Record<HeadingVariant, string> = {
  'page-title': [
    // Large, prominent text for page headers
    'text-fluid-5xl md:text-fluid-6xl',
    // Display font for elegance
    'font-display font-bold',
    // Primary text color
    'text-foreground',
    // Generous letter spacing for readability
    'tracking-tight',
    // Leading for multi-line titles
    'leading-tight',
  ].join(' '),
  'section-title': [
    // Medium-large text for section headers
    'text-fluid-3xl md:text-fluid-4xl',
    // Display font for elegance
    'font-display font-semibold',
    // Primary text color
    'text-foreground',
    // Slight letter spacing
    'tracking-tight',
    // Leading for multi-line titles
    'leading-snug',
  ].join(' '),
};

const subtitleStyles: Record<HeadingVariant, string> = {
  'page-title': [
    'text-fluid-lg md:text-fluid-xl',
    'text-foreground-secondary',
    'font-sans font-normal',
    'mt-4 md:mt-6',
    'max-w-2xl',
  ].join(' '),
  'section-title': [
    'text-fluid-base md:text-fluid-lg',
    'text-foreground-secondary',
    'font-sans font-normal',
    'mt-3 md:mt-4',
    'max-w-xl',
  ].join(' '),
};

const alignStyles: Record<'left' | 'center' | 'right', string> = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
};

// Default heading levels for each variant (can be overridden with `as` prop)
const defaultHeadingLevel: Record<HeadingVariant, 'h1' | 'h2'> = {
  'page-title': 'h1',
  'section-title': 'h2',
};

/**
 * Heading component following the Family Dental Care design language.
 * Features elegant typography with fluid sizing for responsive layouts.
 * Supports page titles and section titles with optional subtitles.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      variant = 'section-title',
      as,
      subtitle,
      align = 'left',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // Use provided heading level or default based on variant
    const Component = as || defaultHeadingLevel[variant];

    return (
      <div
        className={[
          // Alignment styles
          alignStyles[align],
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Component
          ref={ref}
          className={[
            // Variant styles
            variantStyles[variant],
            // Alignment
            align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
            // Custom className
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        >
          {children}
        </Component>

        {/* Optional subtitle */}
        {subtitle && (
          <p
            className={[
              subtitleStyles[variant],
              align === 'center' ? 'text-center mx-auto' : align === 'right' ? 'text-right' : 'text-left',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

Heading.displayName = 'Heading';
