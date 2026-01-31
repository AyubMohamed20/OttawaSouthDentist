import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patient Information | Ottawa South Dental',
  description:
    'Everything you need to know as a patient at Ottawa South Dental. Information for new patients, insurance and payment options, and the Canadian Dental Care Plan (CDCP).',
  keywords: [
    'dental patient information Ottawa',
    'new dental patient Ottawa',
    'dental insurance Ottawa',
    'CDCP dentist Ottawa',
    'dental payment options',
    'Ottawa South Dental patients',
  ],
  openGraph: {
    title: 'Patient Information | Ottawa South Dental',
    description:
      'Everything you need to know as a patient. New patient info, insurance, payment options, and CDCP coverage.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patient Information | Ottawa South Dental',
    description:
      'Everything you need to know as a patient. New patient info, insurance, and CDCP coverage.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/patient-info',
  },
};

export default function PatientInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
