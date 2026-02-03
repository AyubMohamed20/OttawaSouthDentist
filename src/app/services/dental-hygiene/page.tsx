'use client';

import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import DentalHygieneDesktop from './DentalHygieneDesktop';
import DentalHygienePageMobile from './page-mobile';

export default function DentalHygienePage() {
  return (
    <ResponsiveWrapper
      desktop={<DentalHygieneDesktop />}
      mobile={<DentalHygienePageMobile />}
    />
  );
}
