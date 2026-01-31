import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ottawa South Dental',
  description:
    'Learn how Ottawa South Dental collects, uses, and protects your personal information. Our commitment to your privacy and PIPEDA compliance.',
  keywords: [
    'privacy policy Ottawa dentist',
    'dental privacy policy',
    'patient data protection',
    'PIPEDA compliance dental',
    'Ottawa South Dental privacy',
  ],
  openGraph: {
    title: 'Privacy Policy | Ottawa South Dental',
    description:
      'Learn how Ottawa South Dental collects, uses, and protects your personal information.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
