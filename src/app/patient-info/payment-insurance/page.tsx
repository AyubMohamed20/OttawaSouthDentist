'use client';

import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import PaymentInsuranceDesktop from './PaymentInsuranceDesktop';
import PaymentInsurancePageMobile from './page-mobile';

export default function PaymentInsurancePage() {
  return (
    <ResponsiveWrapper
      desktop={<PaymentInsuranceDesktop />}
      mobile={<PaymentInsurancePageMobile />}
    />
  );
}
