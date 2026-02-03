'use client';

import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import RoutineCheckupsPageDesktop from './page-desktop';
import RoutineCheckupsPageMobile from './page-mobile';

export default function RoutineCheckupsPage() {
  return (
    <ResponsiveWrapper
      desktop={<RoutineCheckupsPageDesktop />}
      mobile={<RoutineCheckupsPageMobile />}
    />
  );
}
