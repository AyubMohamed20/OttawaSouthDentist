'use client';

import { useIsMobile } from '@/hooks/use-media-query';

interface ResponsiveWrapperProps {
  /** Component rendered on desktop viewports (768px+) */
  desktop: React.ReactNode;
  /** Component rendered on mobile viewports (< 768px) */
  mobile: React.ReactNode;
  /** Custom breakpoint in pixels (default: 768) */
  breakpoint?: number;
}

/**
 * Wrapper component for switching between desktop and mobile versions
 * Uses CSS-first approach with hidden classes for immediate display,
 * then hydrates with JS for proper behavior
 */
export function ResponsiveWrapper({
  desktop,
  mobile,
  breakpoint = 768,
}: ResponsiveWrapperProps) {
  const isMobile = useIsMobile(breakpoint);

  return (
    <>
      {/* SSR: Both render but hidden appropriately */}
      {/* After hydration: Only one is shown based on viewport */}
      <div className={`${isMobile ? 'hidden' : 'contents'} md:contents`}>
        {!isMobile && desktop}
      </div>
      <div className={`${isMobile ? 'contents' : 'hidden'} md:hidden`}>
        {isMobile && mobile}
      </div>
    </>
  );
}

/**
 * Alternative wrapper that always renders both but hides with CSS
 * This prevents layout shift but uses more memory
 */
export function ResponsiveWrapperCSS({
  desktop,
  mobile,
}: Omit<ResponsiveWrapperProps, 'breakpoint'>) {
  return (
    <>
      <div className="hidden md:contents">{desktop}</div>
      <div className="contents md:hidden">{mobile}</div>
    </>
  );
}
