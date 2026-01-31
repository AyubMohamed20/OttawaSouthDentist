'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, Phone, RefreshCcw, AlertTriangle, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <main id="main-content" className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFFBF8] to-white">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Visual */}
          <div className="relative mb-8" aria-hidden="true">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg mx-auto animate-pulse">
              <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>

          {/* Content */}
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-4 max-w-lg mx-auto">
            We apologize for the inconvenience. An unexpected error has occurred while loading this page.
          </p>
          <p className="text-neutral-500 mb-8">
            Please try again or contact us if the problem persists.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<RefreshCcw className="w-5 h-5" />}
              onClick={reset}
            >
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Home className="w-5 h-5" />}
              >
                Go to Homepage
              </Button>
            </Link>
          </div>

          {/* Quick links for common actions */}
          <div className="bg-[#FDF8F3] rounded-2xl p-6 md:p-8">
            <h2 className="font-semibold text-lg text-neutral-900 mb-4">
              While we fix this, you can:
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-soft transition-all duration-200 group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">Book an Appointment</p>
                  <p className="text-sm text-neutral-500">Schedule your visit</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#722F37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-soft transition-all duration-200 group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">Browse Services</p>
                  <p className="text-sm text-neutral-500">View what we offer</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#722F37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
            </div>

            {/* Direct contact */}
            <div className="pt-4 border-t border-neutral-200">
              <p className="text-neutral-600 mb-4">
                Or give us a call and we&apos;ll help you directly:
              </p>
              <a
                href="tel:+16137331118"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#722F37] text-white rounded-xl font-medium hover:bg-[#5a252c] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span>Call (613) 733-1118</span>
              </a>
            </div>
          </div>

          {/* Error details for debugging (only visible in development) */}
          {process.env.NODE_ENV === 'development' && error.digest && (
            <div className="mt-8 p-4 bg-neutral-100 rounded-lg text-left">
              <p className="text-sm font-mono text-neutral-500">
                Error ID: {error.digest}
              </p>
              {error.message && (
                <p className="text-sm font-mono text-neutral-500 mt-2">
                  Message: {error.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
