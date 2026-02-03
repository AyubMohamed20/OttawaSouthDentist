'use client';

import { ResponsiveWrapperCSS } from '@/components/responsive-wrapper';
import PrivacyPolicyDesktop from './page-desktop';
import PrivacyPolicyMobile from './page-mobile';

export default function PrivacyPolicyPage() {
  return (
    <ResponsiveWrapperCSS
      desktop={<PrivacyPolicyDesktop />}
      mobile={<PrivacyPolicyMobile />}
    />
  );
}
