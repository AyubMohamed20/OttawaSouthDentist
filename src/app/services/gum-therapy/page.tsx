'use client';

import { ResponsiveWrapper } from '@/components/ui/responsive-wrapper';
import GumTherapyPageDesktop from './page-desktop';
import GumTherapyPageMobile from './page-mobile';

export default function GumTherapyPage() {
  return (
    <ResponsiveWrapper
      desktop={<GumTherapyPageDesktop />}
      mobile={<GumTherapyPageMobile />}
    />
  );
}
