import type { Metadata } from 'next';
import { NewPatientsContent } from './NewPatientsContent';
import { NewPatientsContentMobile } from './NewPatientsContent-mobile';
import { ResponsiveWrapperCSS } from '@/components/responsive-wrapper';

export const metadata: Metadata = {
  title: 'New Patient Information | Ottawa South Dental',
  description:
    'Everything you need to know before your first visit to Ottawa South Dental. Learn about required documents, patient forms, what to expect, and our office policies.',
  keywords: [
    'new patient Ottawa dentist',
    'first dental visit Ottawa',
    'dental patient forms Ottawa',
    'Ottawa South Dental new patient',
    'dentist registration Ottawa',
    'new patient appointment Ottawa',
    'dental intake forms',
    'first dental appointment',
  ],
  openGraph: {
    title: 'New Patient Information | Ottawa South Dental',
    description:
      'Everything you need to know before your first visit. Required documents, patient forms, and what to expect at your appointment.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Patient Information | Ottawa South Dental',
    description:
      'Everything you need to know before your first visit. Required documents, patient forms, and what to expect.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/patient-info/new-patients',
  },
};

export default function NewPatientInfoPage() {
  return (
    <ResponsiveWrapperCSS
      desktop={<NewPatientsContent />}
      mobile={<NewPatientsContentMobile />}
    />
  );
}
