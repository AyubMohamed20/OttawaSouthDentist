'use client';

import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import PatientInfoDesktop from './PatientInfoDesktop';
import PatientInfoPageMobile from './page-mobile';

export default function PatientInfoPage() {
  return (
    <ResponsiveWrapper
      desktop={<PatientInfoDesktop />}
      mobile={<PatientInfoPageMobile />}
    />
  );
}
