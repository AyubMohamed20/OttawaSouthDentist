import { forwardRef, type HTMLAttributes } from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  /** Display label for the breadcrumb item */
  label: string;
  /** URL path for the breadcrumb link */
  href: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items (excluding home which is auto-added) */
  items: BreadcrumbItem[];
  /** Whether to show the home icon */
  showHomeIcon?: boolean;
  /** Custom home label */
  homeLabel?: string;
}

/**
 * Breadcrumb navigation component for SEO and user navigation.
 * Automatically adds Home as the first item.
 * Uses semantic nav element with aria-label for accessibility.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      showHomeIcon = true,
      homeLabel = 'Home',
      className = '',
      ...props
    },
    ref
  ) => {
    // Prepend home to the items
    const allItems: BreadcrumbItem[] = [
      { label: homeLabel, href: '/' },
      ...items,
    ];

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={[
          'py-3 px-4 sm:px-0',
          className,
        ].join(' ')}
        {...props}
      >
        <ol
          className="flex flex-wrap items-center gap-1 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isHome = index === 0;

            return (
              <li
                key={item.href}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator (not for first item) */}
                {index > 0 && (
                  <ChevronRight
                    className="w-4 h-4 mx-1 text-neutral-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  // Current page - not a link
                  <span
                    className="text-neutral-600 font-medium"
                    aria-current="page"
                    itemProp="name"
                  >
                    {isHome && showHomeIcon ? (
                      <span className="flex items-center gap-1.5">
                        <Home className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">{item.label}</span>
                      </span>
                    ) : (
                      item.label
                    )}
                  </span>
                ) : (
                  // Link to parent page
                  <Link
                    href={item.href}
                    className={[
                      'text-neutral-500 hover:text-[#722F37]',
                      'transition-colors duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                      'rounded-sm',
                    ].join(' ')}
                    itemProp="item"
                  >
                    {isHome && showHomeIcon ? (
                      <span className="flex items-center gap-1.5">
                        <Home className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">{item.label}</span>
                      </span>
                    ) : (
                      <span itemProp="name">{item.label}</span>
                    )}
                  </Link>
                )}

                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
