import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Clock, Globe } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Services',
    links: [
      { label: 'Preventive Dentistry', href: '/services/preventive-dentistry' },
      { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
      { label: 'Dental Implants', href: '/services/dental-implants' },
      { label: 'All Services', href: '/services' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Practice', href: '/about' },
      { label: 'Meet the Team', href: '/about/team' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Patient Info',
    links: [
      { label: 'New Patients', href: '/patient-info/new-patients' },
      { label: 'Insurance & Payment', href: '/patient-info/payment-insurance' },
      { label: 'CDCP Coverage', href: '/patient-info/cdcp' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Book Appointment', href: '/contact#book' },
      { label: 'Directions', href: '/contact#map' },
      { label: 'Emergency Care', href: '/contact#emergency' },
    ],
  },
];

interface HoursOfOperation {
  day: string;
  hours: string;
}

const hoursOfOperation: HoursOfOperation[] = [
  { day: 'Monday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 2:00 PM' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
];

const PRACTICE_ADDRESS = '1929 Russell Road, Suite 22, Ottawa, ON K1G 4G3';
const PHONE_NUMBER = '(613) 733-6446';
const PHONE_HREF = 'tel:+16137336446';
const LANGUAGES = ['English', 'French', 'Arabic'];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo and Practice Info */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-lg"
              aria-label="Ottawa South Dental - Home"
            >
              <Image
                src="/LOGO.png"
                alt="Ottawa South Dental"
                width={180}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              Providing compassionate, comprehensive dental care for the whole
              family in a warm and welcoming environment.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(PRACTICE_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-neutral-300 hover:text-primary-400 transition-colors duration-200 group"
              >
                <MapPin
                  className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5 group-hover:text-primary-400 transition-colors"
                  aria-hidden="true"
                />
                <span>{PRACTICE_ADDRESS}</span>
              </a>

              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 text-sm text-neutral-300 hover:text-primary-400 transition-colors duration-200 group"
              >
                <Phone
                  className="w-5 h-5 text-primary-500 flex-shrink-0 group-hover:text-primary-400 transition-colors"
                  aria-hidden="true"
                />
                <span>{PHONE_NUMBER}</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Globe
                  className="w-5 h-5 text-primary-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{LANGUAGES.join(' • ')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5" role="list">
                    {section.links.map((link, index) => (
                      <li key={`${section.title}-${index}`}>
                        <Link
                          href={link.href}
                          className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 focus:outline-none focus-visible:text-primary-400 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Hours of Operation */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-500" aria-hidden="true" />
              Hours of Operation
            </h3>
            <dl className="space-y-2" aria-label="Office hours by day">
              {hoursOfOperation.map(({ day, hours }) => (
                <div
                  key={day}
                  className="flex justify-between text-sm gap-4"
                >
                  <dt className="text-neutral-400">{day}</dt>
                  <dd
                    className={
                      hours === 'Closed'
                        ? 'text-neutral-500'
                        : 'text-neutral-300'
                    }
                  >
                    {hours}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>
              © {currentYear} Ottawa South Dental. All rights reserved.
            </p>
            <p className="text-neutral-400">
              Serving Ottawa families with compassionate dental care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
