'use client';

import { ResponsiveWrapper } from '@/components/ui/responsive-wrapper';
import { ContactPageDesktop } from './ContactPageDesktop';
import { ContactPageMobile } from './page-mobile';

export default function ContactPage() {
  return (
    <ResponsiveWrapper
      desktop={<ContactPageDesktop />}
      mobile={<ContactPageMobile />}
      breakpoint={768}
    />
  );
}
