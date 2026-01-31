import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Server,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { contactInfo } from '@/data/site-config';

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

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Privacy Policy', href: '/privacy-policy', current: true },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 2026';

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-primary-50/30 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23047857' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <SectionContainer>
          <Breadcrumb items={breadcrumbItems} />

          <div className="max-w-3xl mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Your Privacy Matters</span>
            </div>

            <Heading as="h1" variant="page-title" className="mb-6 text-slate-900">
              Privacy Policy
            </Heading>

            <p className="text-xl text-slate-600 leading-relaxed mb-4">
              At Ottawa South Dental, we are committed to protecting your personal information
              and maintaining the trust you place in us. This policy explains how we collect,
              use, and safeguard your data.
            </p>

            <p className="text-sm text-slate-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Main Content */}
      <SectionContainer className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="mb-12">
            <div className="flex items-start gap-4 p-6 bg-primary-50 rounded-xl border border-primary-100 mb-8">
              <Lock className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  Our Commitment to Privacy
                </h2>
                <p className="text-slate-600">
                  We comply with the Personal Information Protection and Electronic Documents
                  Act (PIPEDA) and applicable provincial privacy legislation. Your personal
                  health information is treated with the utmost confidentiality.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Information We Collect
              </h2>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-4">
                We collect personal information necessary to provide you with quality dental care:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-2">Personal Identification</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>Name, address, phone number, email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>Date of birth and gender</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>Health card and insurance information</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-2">Health Information</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>Medical and dental history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>X-rays and diagnostic images</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>Treatment records and notes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                How We Use Your Information
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Providing Dental Care',
                  description: 'To diagnose, treat, and manage your dental health, including communicating with other healthcare providers when necessary.',
                },
                {
                  title: 'Administrative Purposes',
                  description: 'To schedule appointments, process insurance claims, manage billing, and maintain your patient records.',
                },
                {
                  title: 'Communication',
                  description: 'To send appointment reminders, treatment follow-ups, and important practice updates.',
                },
                {
                  title: 'Quality Improvement',
                  description: 'To improve our services, maintain standards of care, and meet regulatory requirements.',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary-600">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Information Sharing & Disclosure
              </h2>
            </div>

            <div className="prose prose-slate max-w-none mb-6">
              <p className="text-slate-600 mb-4">
                We do not sell, trade, or rent your personal information. We may share your
                information only in the following circumstances:
              </p>
            </div>

            <div className="space-y-3">
              {[
                'With your explicit consent',
                'With other healthcare providers involved in your care',
                'With insurance companies to process your claims',
                'With dental laboratories for treatment purposes',
                'When required by law or regulatory bodies',
                'In emergencies where your health or safety is at risk',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Server className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Data Security
              </h2>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <p className="text-slate-600 mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  <span>Secure electronic record systems with access controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  <span>Physical security measures for paper records</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  <span>Staff training on privacy and confidentiality</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  <span>Regular security assessments and updates</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Your Rights
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Access',
                  description: 'You have the right to request access to your personal information held by our practice.',
                },
                {
                  title: 'Correction',
                  description: 'You may request corrections to any inaccurate or incomplete personal information.',
                },
                {
                  title: 'Withdrawal of Consent',
                  description: 'You may withdraw consent for certain uses of your information, subject to legal requirements.',
                },
                {
                  title: 'Complaints',
                  description: 'You have the right to file a complaint with the Privacy Commissioner of Canada.',
                },
              ].map((item, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Website Privacy */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Website & Online Privacy
              </h2>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-4">
                When you use our website or contact forms:
              </p>
              <ul className="space-y-2 text-slate-600 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  <span>
                    We collect only the information you voluntarily provide (e.g., contact form submissions)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  <span>
                    We may use cookies to improve website functionality and user experience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  <span>
                    We use SSL encryption to protect data transmitted through our website
                  </span>
                </li>
              </ul>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <strong>Important:</strong> Do not send sensitive health information through
                    our website contact form or email. Please discuss health matters in person
                    or by phone.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Retention */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Record Retention
              </h2>
            </div>

            <p className="text-slate-600">
              We retain your dental records in accordance with the Royal College of Dental
              Surgeons of Ontario guidelines and applicable laws. Adult patient records are
              kept for a minimum of 10 years after the last visit. Records for patients who
              were minors are kept until 10 years after they turn 18.
            </p>
          </section>

          {/* Contact Information */}
          <section className="p-8 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-slate-600 mb-6">
              If you have questions about this policy or wish to exercise your privacy rights,
              please contact our Privacy Officer:
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <a
                    href={`tel:+1${contactInfo.phone}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-primary-200">
              <p className="text-sm text-slate-600">
                <strong>Ottawa South Dental</strong><br />
                {contactInfo.address.street}<br />
                {contactInfo.address.city}, {contactInfo.address.province} {contactInfo.address.postalCode}
              </p>
            </div>
          </section>

          {/* Back to Contact */}
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2"
            >
              Back to Contact Page
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
