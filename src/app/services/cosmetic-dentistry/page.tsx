'use client';

import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import CosmeticDentistryDesktop from './CosmeticDentistryDesktop';
import CosmeticDentistryMobile from './CosmeticDentistry-mobile';

export default function CosmeticDentistryPage() {
  return (
    <ResponsiveWrapper
      desktop={<CosmeticDentistryDesktop />}
      mobile={<CosmeticDentistryMobile />}
    />
  );
}
