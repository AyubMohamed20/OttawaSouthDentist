'use client';

import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import ChildrensDentistryPageDesktop from './page-desktop';
import ChildrensDentistryPageMobile from './page-mobile';

/**
 * Children's Dentistry Page
 *
 * Uses ResponsiveWrapper to switch between fully redesigned
 * desktop and mobile versions for optimal UX on each device.
 *
 * Desktop: Full-featured with parallax, hover effects, and complex layouts
 * Mobile: Touch-optimized with thumb-zone CTAs, sticky navigation, and simplified animations
 */
export default function ChildrensDentistryPage() {
  return (
    <ResponsiveWrapper
      desktop={<ChildrensDentistryPageDesktop />}
      mobile={<ChildrensDentistryPageMobile />}
      breakpoint={768}
    />
  );
}
