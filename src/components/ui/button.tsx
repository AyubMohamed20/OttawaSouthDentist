'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Icon to display before text */
  leftIcon?: ReactNode;
  /** Icon to display after text */
  rightIcon?: ReactNode;
  /** Children elements */
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    // Warm burgundy background - the signature accent color from design language
    'bg-[#722F37] text-white',
    'hover:bg-[#5a252c]',
    'focus-visible:ring-[#722F37]/50',
    'active:bg-[#4a1f24]',
    // Subtle shadow for depth
    'shadow-sm hover:shadow-md',
  ].join(' '),
  secondary: [
    // Soft cream/warm white background - warm and inviting
    'bg-[#FDF8F3] text-[#722F37]',
    'hover:bg-[#F5EDE5]',
    'focus-visible:ring-[#722F37]/30',
    'active:bg-[#EDE5DD]',
    'shadow-sm hover:shadow-md',
  ].join(' '),
  outline: [
    // Transparent with burgundy border - clean and modern
    'bg-transparent text-[#722F37]',
    'border-2 border-[#722F37]',
    'hover:bg-[#722F37]/5',
    'focus-visible:ring-[#722F37]/30',
    'active:bg-[#722F37]/10',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

/**
 * Button component following the Family Dental Care design language.
 * Features warm, welcoming aesthetics with soft rounded corners
 * and smooth, gentle transitions.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={[
          // Base styles - warm and inviting
          'inline-flex items-center justify-center',
          'font-medium',
          // Soft rounded corners per design language (friendly but not childish)
          'rounded-xl',
          // Smooth, gentle transitions for warmth
          'transition-all duration-200 ease-out',
          // Focus ring for accessibility
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          // Disabled state
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
          // Apply variant styles
          variantStyles[variant],
          // Apply size styles
          sizeStyles[size],
          // Full width option
          fullWidth ? 'w-full' : '',
          // Loading cursor
          isLoading ? 'cursor-wait' : '',
          // Custom className
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button text */}
        <span>{children}</span>

        {/* Right icon */}
        {rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
