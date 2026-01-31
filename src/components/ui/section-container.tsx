import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode, type ComponentPropsWithRef } from 'react';

export type SectionSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type SectionBackground = 'transparent' | 'white' | 'secondary' | 'tertiary' | 'primary' | 'accent';

type SectionElement = 'section' | 'div' | 'article' | 'main' | 'aside';

export interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width constraint */
  size?: SectionSize;
  /** Vertical padding amount */
  paddingY?: SectionPadding;
  /** Horizontal padding amount */
  paddingX?: SectionPadding;
  /** Background color variant */
  background?: SectionBackground;
  /** Render as a different HTML element */
  as?: SectionElement;
  /** Center content horizontally */
  centered?: boolean;
  /** Children elements */
  children: ReactNode;
}

const sizeStyles: Record<SectionSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
};

const paddingYStyles: Record<SectionPadding, string> = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16 lg:py-20',
  lg: 'py-16 md:py-20 lg:py-24',
  xl: 'py-20 md:py-24 lg:py-32',
};

const paddingXStyles: Record<SectionPadding, string> = {
  none: 'px-0',
  sm: 'px-4 md:px-6',
  md: 'px-4 md:px-6 lg:px-8',
  lg: 'px-6 md:px-8 lg:px-12',
  xl: 'px-8 md:px-12 lg:px-16',
};

const backgroundStyles: Record<SectionBackground, string> = {
  transparent: 'bg-transparent',
  white: 'bg-white',
  secondary: 'bg-background-secondary',
  tertiary: 'bg-background-tertiary',
  primary: 'bg-primary-50',
  accent: 'bg-accent-50',
};

/**
 * Section Container component for consistent page section layouts.
 * Provides responsive padding, max-width constraints, and background options
 * following the Family Dental Care design language.
 */
export const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  (
    {
      size = 'xl',
      paddingY = 'md',
      paddingX = 'md',
      background = 'transparent',
      as: Component = 'section',
      centered = true,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as unknown as React.LegacyRef<HTMLDivElement>}
        className={[
          // Background styles (applied to outer container)
          backgroundStyles[background],
          // Vertical padding
          paddingYStyles[paddingY],
          // Custom className
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <div
          className={[
            // Max width constraint
            sizeStyles[size],
            // Horizontal padding
            paddingXStyles[paddingX],
            // Center the inner container
            centered ? 'mx-auto' : '',
            // Full width within constraints
            'w-full',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      </Component>
    );
  }
);

SectionContainer.displayName = 'SectionContainer';

/**
 * Convenience wrapper for hero sections with larger padding.
 */
export const HeroContainer = forwardRef<HTMLDivElement, Omit<SectionContainerProps, 'paddingY'>>(
  ({ paddingX = 'md', ...props }, ref) => {
    return (
      <SectionContainer
        ref={ref}
        paddingY="xl"
        paddingX={paddingX}
        {...props}
      />
    );
  }
);

HeroContainer.displayName = 'HeroContainer';

/**
 * Convenience wrapper for narrow content sections (text-heavy).
 */
export const NarrowContainer = forwardRef<HTMLDivElement, Omit<SectionContainerProps, 'size'>>(
  (props, ref) => {
    return <SectionContainer ref={ref} size="md" {...props} />;
  }
);

NarrowContainer.displayName = 'NarrowContainer';

/**
 * Convenience wrapper for full-width sections with no horizontal padding.
 */
export const FullWidthContainer = forwardRef<
  HTMLDivElement,
  Omit<SectionContainerProps, 'size' | 'paddingX' | 'centered'>
>((props, ref) => {
  return (
    <SectionContainer
      ref={ref}
      size="full"
      paddingX="none"
      centered={false}
      {...props}
    />
  );
});

FullWidthContainer.displayName = 'FullWidthContainer';
