import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type IconWrapperSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconWrapperVariant = 'default' | 'primary' | 'secondary' | 'muted' | 'accent';

export interface IconWrapperProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size preset for the icon container */
  size?: IconWrapperSize;
  /** Color variant */
  variant?: IconWrapperVariant;
  /** Whether to show a background circle/container */
  withBackground?: boolean;
  /** Icon element to wrap */
  children: ReactNode;
}

const sizeStyles: Record<IconWrapperSize, string> = {
  xs: 'w-4 h-4 [&>svg]:w-3 [&>svg]:h-3',
  sm: 'w-5 h-5 [&>svg]:w-4 [&>svg]:h-4',
  md: 'w-6 h-6 [&>svg]:w-5 [&>svg]:h-5',
  lg: 'w-8 h-8 [&>svg]:w-6 [&>svg]:h-6',
  xl: 'w-10 h-10 [&>svg]:w-8 [&>svg]:h-8',
};

const backgroundSizeStyles: Record<IconWrapperSize, string> = {
  xs: 'w-6 h-6 [&>svg]:w-3 [&>svg]:h-3',
  sm: 'w-8 h-8 [&>svg]:w-4 [&>svg]:h-4',
  md: 'w-10 h-10 [&>svg]:w-5 [&>svg]:h-5',
  lg: 'w-12 h-12 [&>svg]:w-6 [&>svg]:h-6',
  xl: 'w-14 h-14 [&>svg]:w-8 [&>svg]:h-8',
};

const variantStyles: Record<IconWrapperVariant, string> = {
  default: 'text-neutral-700',
  primary: 'text-[#722F37]',
  secondary: 'text-primary-600',
  muted: 'text-neutral-400',
  accent: 'text-secondary-600',
};

const backgroundVariantStyles: Record<IconWrapperVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-[#722F37]/10 text-[#722F37]',
  secondary: 'bg-primary-100 text-primary-700',
  muted: 'bg-neutral-50 text-neutral-400',
  accent: 'bg-secondary-100 text-secondary-700',
};

/**
 * Icon Wrapper component following the Family Dental Care design language.
 * Provides consistent sizing and styling for icons throughout the application.
 * Supports optional background containers for featured icon displays.
 */
export const IconWrapper = forwardRef<HTMLSpanElement, IconWrapperProps>(
  (
    {
      size = 'md',
      variant = 'default',
      withBackground = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={[
          // Base styles
          'inline-flex items-center justify-center',
          'flex-shrink-0',
          // Smooth transitions
          'transition-colors duration-200 ease-out',
          // Background styles
          withBackground ? 'rounded-xl' : '',
          // Apply size styles
          withBackground ? backgroundSizeStyles[size] : sizeStyles[size],
          // Apply variant styles
          withBackground ? backgroundVariantStyles[variant] : variantStyles[variant],
          // Custom className
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    );
  }
);

IconWrapper.displayName = 'IconWrapper';
