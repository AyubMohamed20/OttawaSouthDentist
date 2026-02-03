'use client';

import { useIsMobile } from '@/hooks/use-media-query';

interface ResponsiveWrapperProps {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
  breakpoint?: number;
}

/**
 * ResponsiveWrapper - Switches between desktop and mobile components
 *
 * Uses CSS media queries to determine which version to render.
 * The breakpoint defaults to 768px (md breakpoint in Tailwind).
 */
export function ResponsiveWrapper({
  desktop,
  mobile,
  breakpoint = 768,
}: ResponsiveWrapperProps) {
  const isMobile = useIsMobile(breakpoint);

  // Return both components but only show the appropriate one
  // This approach works better with SSR as both are in the DOM initially
  return (
    <>
      {/* Desktop version - hidden on mobile */}
      <div className="hidden md:contents">{desktop}</div>

      {/* Mobile version - shown only on mobile */}
      <div className="contents md:hidden">{mobile}</div>
    </>
  );
}

/**
 * ResponsiveWrapperClient - Client-side only switching
 *
 * This version only renders one component based on the media query.
 * Use this when you want to avoid rendering both versions.
 */
export function ResponsiveWrapperClient({
  desktop,
  mobile,
  breakpoint = 768,
}: ResponsiveWrapperProps) {
  const isMobile = useIsMobile(breakpoint);

  return <>{isMobile ? mobile : desktop}</>;
}
