import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Phone, Calendar, ArrowRight, Search, Stethoscope, Users, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found | Ottawa South Dental',
  description: 'The page you are looking for could not be found. Visit our homepage or contact Ottawa South Dental for assistance.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFFBF8] to-white">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Visual */}
          <div className="relative mb-8" aria-hidden="true">
            <div className="text-[10rem] md:text-[14rem] font-display font-bold text-[#722F37]/10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center shadow-lg">
                <Search className="w-10 h-10 md:w-14 md:h-14 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-lg mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or no longer exists.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Home className="w-5 h-5" />}
              >
                Go to Homepage
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5" />}
              >
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Helpful links */}
          <nav className="bg-[#FDF8F3] rounded-2xl p-6 md:p-8" aria-label="Helpful navigation">
            <h2 className="font-semibold text-lg text-neutral-900 mb-4">
              Looking for something specific?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <Link
                href="/services"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-soft transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">Our Services</p>
                  <p className="text-sm text-neutral-500">View all dental services</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#722F37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-soft transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">About Us</p>
                  <p className="text-sm text-neutral-500">Meet our team</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#722F37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
              <Link
                href="/patient-info/new-patients"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-soft transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">New Patients</p>
                  <p className="text-sm text-neutral-500">Get started with us</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#722F37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-soft transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">Contact Us</p>
                  <p className="text-sm text-neutral-500">Location &amp; hours</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#722F37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
            </div>
          </nav>

          {/* Emergency contact */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <p className="text-neutral-600 mb-3">
              Need immediate dental assistance?
            </p>
            <a
              href="tel:+16137331118"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2 rounded-sm"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span>Call us at (613) 733-1118</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
