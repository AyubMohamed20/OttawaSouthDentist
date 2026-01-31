import type { Metadata } from 'next';
import { CDCPContent } from './CDCPContent';

export const metadata: Metadata = {
  title: 'CDCP Information | Ottawa South Dental',
  description:
    'Learn about the Canadian Dental Care Plan (CDCP) at Ottawa South Dental. Find out about eligibility requirements, covered services, and how to use your CDCP benefits at our practice.',
  keywords: [
    'CDCP Ottawa',
    'Canadian Dental Care Plan Ottawa',
    'CDCP dentist Ottawa',
    'CDCP eligibility',
    'CDCP covered services',
    'federal dental plan Ottawa',
    'Ottawa South Dental CDCP',
    'CDCP benefits',
  ],
  openGraph: {
    title: 'CDCP Information | Ottawa South Dental',
    description:
      'Ottawa South Dental accepts the Canadian Dental Care Plan (CDCP). Learn about eligibility, covered services, and how to use your benefits.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CDCP Information | Ottawa South Dental',
    description:
      'We accept CDCP! Learn about eligibility and covered services at Ottawa South Dental.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/patient-info/cdcp',
  },
};

export default function CDCPPage() {
  return <CDCPContent />;
}
