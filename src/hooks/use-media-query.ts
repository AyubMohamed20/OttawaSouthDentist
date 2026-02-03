'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for responsive media query detection
 * Returns true if the viewport matches the media query
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleChange = useCallback((event: MediaQueryListEvent | MediaQueryList) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    setMounted(true);

    // Create media query list
    const mediaQueryList = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Add listener for changes
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query, handleChange]);

  // Return false during SSR to prevent hydration mismatch
  if (!mounted) {
    return false;
  }

  return matches;
}

/**
 * Hook to detect if current viewport is mobile
 * Default breakpoint is 768px (md breakpoint in Tailwind)
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  return !useMediaQuery(`(min-width: ${breakpoint}px)`);
}

/**
 * Hook to detect if current viewport is tablet
 * Returns true for viewports between 768px and 1024px
 */
export function useIsTablet(): boolean {
  const isAboveMobile = useMediaQuery('(min-width: 768px)');
  const isBelowDesktop = !useMediaQuery('(min-width: 1024px)');
  return isAboveMobile && isBelowDesktop;
}

/**
 * Hook to detect if current viewport is desktop
 * Default breakpoint is 1024px (lg breakpoint in Tailwind)
 */
export function useIsDesktop(breakpoint: number = 1024): boolean {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
}

/**
 * Hook to detect reduced motion preference
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
