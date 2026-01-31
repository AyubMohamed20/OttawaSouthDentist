import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type BadgeVariant = 'cdcp-accepted' | 'direct-billing' | 'default';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Size preset */
  size?: BadgeSize;
  /** Optional icon to display before text */
  icon?: ReactNode;
  /** Children elements */
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  'cdcp-accepted': [
    // Professional teal/primary for CDCP - conveys trust and official acceptance
    'bg-primary-100 text-primary-800',
    'border border-primary-200',
  ].join(' '),
  'direct-billing': [
    // Warm gold/secondary for Direct Billing - conveys convenience and value
    'bg-secondary-100 text-secondary-800',
    'border border-secondary-200',
  ].join(' '),
  default: [
    // Neutral styling for general use
    'bg-neutral-100 text-neutral-700',
    'border border-neutral-200',
  ].join(' '),
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-sm gap-1.5',
  lg: 'px-3 py-1.5 text-base gap-2',
};

/**
 * Badge/Tag component following the Family Dental Care design language.
 * Used to highlight important attributes like insurance acceptance
 * and billing options with warm, professional aesthetics.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
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
          'font-medium',
          // Soft rounded corners (pill shape for badges)
          'rounded-full',
          // Smooth transitions
          'transition-colors duration-200 ease-out',
          // Apply variant styles
          variantStyles[variant],
          // Apply size styles
          sizeStyles[size],
          // Custom className
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        role="status"
        {...props}
      >
        {/* Optional icon */}
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Badge text */}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Pre-configured CDCP Accepted badge with checkmark icon
 */
export const CDCPAcceptedBadge = forwardRef<
  HTMLSpanElement,
  Omit<BadgeProps, 'variant' | 'children'>
>(({ size = 'md', ...props }, ref) => (
  <Badge
    ref={ref}
    variant="cdcp-accepted"
    size={size}
    icon={
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    }
    {...props}
  >
    CDCP Accepted
  </Badge>
));

CDCPAcceptedBadge.displayName = 'CDCPAcceptedBadge';

/**
 * Pre-configured Direct Billing badge with document icon
 */
export const DirectBillingBadge = forwardRef<
  HTMLSpanElement,
  Omit<BadgeProps, 'variant' | 'children'>
>(({ size = 'md', ...props }, ref) => (
  <Badge
    ref={ref}
    variant="direct-billing"
    size={size}
    icon={
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    }
    {...props}
  >
    Direct Billing
  </Badge>
));

DirectBillingBadge.displayName = 'DirectBillingBadge';
