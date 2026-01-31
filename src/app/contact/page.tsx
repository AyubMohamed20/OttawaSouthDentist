import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Car, Bus, Accessibility, Globe, AlertCircle } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { HoursDisplay } from '@/components/contact/HoursDisplay';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Contact Us | Ottawa South Dental',
  description:
    'Contact Ottawa South Dental for appointments, questions, or dental emergencies. Located at 1729 Bank St, Ottawa. Call (613) 733-1118. Multilingual staff speaking English, French, Arabic, and Somali.',
  keywords: [
    'contact Ottawa South Dental',
    'dental appointment Ottawa',
    'dentist phone number Ottawa',
    'dental clinic Bank Street',
    'emergency dentist Ottawa',
    'book dental appointment',
  ],
  openGraph: {
    title: 'Contact Us | Ottawa South Dental',
    description:
      'Contact Ottawa South Dental for appointments, questions, or dental emergencies. Call (613) 733-1118 or book online.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Ottawa South Dental',
    description: 'Contact Ottawa South Dental for appointments and inquiries. Call (613) 733-1118.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/contact',
  },
};

// Practice information
const PRACTICE_INFO = {
  name: 'Ottawa South Dental',
  address: '1729 Bank St',
  city: 'Ottawa',
  province: 'ON',
  postalCode: 'K1V 7Z4',
  fullAddress: '1729 Bank St, Ottawa, ON K1V 7Z4',
  phone: '(613) 733-1118',
  phoneHref: 'tel:+16137331118',
  email: 'info@ottawasouthdental.com',
  languages: ['English', 'French', 'Arabic', 'Somali'],
  googleMapsUrl: 'https://maps.google.com/?q=1729+Bank+St,+Ottawa,+ON+K1V+7Z4',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.0!2d-75.65!3d45.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1729+Bank+St%2C+Ottawa%2C+ON+K1V+7Z4!5e0!3m2!1sen!2sca!4v1234567890',
};

const HOURS = [
  { day: 'Monday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Tuesday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Wednesday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Thursday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Friday', hours: '9:00 AM – 5:00 PM', isOpen: true },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM', isOpen: true },
  { day: 'Sunday', hours: 'Closed', isOpen: false },
];

const DIRECTIONS = {
  landmarks: [
    'Located on Bank Street between Walkley Road and Heron Road',
    'Near the intersection with Alta Vista Drive',
    'Across from Tim Hortons and LCBO',
  ],
  parking: 'Free parking available in front of the building and in the rear lot',
  transit: 'OC Transpo Routes 1, 7, and 114 stop within a 2-minute walk',
  accessibility: 'Fully wheelchair accessible with ground-floor entrance and accessible washrooms',
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Structured Data */}
      <JsonLd data={structuredData.contactPage()} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FDF8F3] via-white to-primary-50 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#722F37]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="pt-4">
            <Breadcrumb items={[{ label: 'Contact', href: '/contact' }]} />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display font-bold tracking-tight text-[#722F37] text-fluid-4xl md:text-fluid-5xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-600 leading-relaxed">
              We&apos;re here to help with all your dental needs. Whether you&apos;re scheduling a routine
              checkup, have questions about our services, or need urgent care, our friendly team is
              ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div id="book">
              <div className="bg-[#FDF8F3] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-soft">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-[#722F37] mb-2">
                  Send Us a Message
                </h2>
                <p className="text-neutral-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Phone Card */}
                <a
                  href={PRACTICE_INFO.phoneHref}
                  className="group p-6 bg-white rounded-2xl shadow-soft border border-neutral-100 hover:shadow-soft-lg hover:border-[#722F37]/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#722F37]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#722F37] transition-colors duration-300">
                    <Phone className="w-6 h-6 text-[#722F37] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-1">Call Us</h3>
                  <p className="text-xl font-bold text-[#722F37] group-hover:underline">
                    {PRACTICE_INFO.phone}
                  </p>
                  <p className="text-sm text-neutral-500 mt-2">Tap to call directly</p>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${PRACTICE_INFO.email}`}
                  className="group p-6 bg-white rounded-2xl shadow-soft border border-neutral-100 hover:shadow-soft-lg hover:border-[#722F37]/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#722F37]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#722F37] transition-colors duration-300">
                    <Mail className="w-6 h-6 text-[#722F37] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-1">Email Us</h3>
                  <p className="text-[#722F37] font-medium group-hover:underline break-all">
                    {PRACTICE_INFO.email}
                  </p>
                  <p className="text-sm text-neutral-500 mt-2">We reply within 24 hours</p>
                </a>
              </div>

              {/* Hours of Operation */}
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 p-6">
                <HoursDisplay hours={HOURS} />
              </div>

              {/* Emergency Notice */}
              <div
                id="emergency"
                className="bg-accent-50 border border-accent-200 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-accent-900 mb-2">
                      Dental Emergency?
                    </h3>
                    <p className="text-accent-700 mb-3">
                      If you&apos;re experiencing severe pain, swelling, or trauma, call us immediately.
                      We offer same-day emergency appointments.
                    </p>
                    <a
                      href={PRACTICE_INFO.phoneHref}
                      className="inline-flex items-center gap-2 text-accent-700 font-bold hover:text-accent-800 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      {PRACTICE_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-900">Languages We Speak</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Our multilingual staff is here to serve you in your preferred language.
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRACTICE_INFO.languages.map((language) => (
                    <span
                      key={language}
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="directions" className="py-12 md:py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#722F37] mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Conveniently located on Bank Street in Ottawa&apos;s south end, we&apos;re easy to find with
              ample parking and public transit access.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-3xl shadow-soft overflow-hidden h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.5!2d-75.653!3d45.375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0f3c8e9d8b15%3A0x123456789!2s1729%20Bank%20St%2C%20Ottawa%2C%20ON%20K1V%207Z4!5e0!3m2!1sen!2sca!4v1705000000000!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ottawa South Dental Location"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Directions Info */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Address Card */}
              <a
                href={PRACTICE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl shadow-soft p-6 hover:shadow-soft-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#722F37]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#722F37] transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-[#722F37] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-neutral-900 mb-1">Our Address</h3>
                    <p className="text-[#722F37] font-medium group-hover:underline">
                      {PRACTICE_INFO.fullAddress}
                    </p>
                    <p className="text-sm text-neutral-500 mt-2">
                      Click for directions in Google Maps
                    </p>
                  </div>
                </div>
              </a>

              {/* Landmarks */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-semibold text-lg text-neutral-900 mb-4">How to Find Us</h3>
                <ul className="space-y-3">
                  {DIRECTIONS.landmarks.map((landmark, index) => (
                    <li key={index} className="flex items-start gap-3 text-neutral-600">
                      <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Parking, Transit, Accessibility */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-soft p-5">
                  <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center mb-3">
                    <Car className="w-5 h-5 text-secondary-700" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Parking</h4>
                  <p className="text-sm text-neutral-600">{DIRECTIONS.parking}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-soft p-5">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
                    <Bus className="w-5 h-5 text-primary-700" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Public Transit</h4>
                  <p className="text-sm text-neutral-600">{DIRECTIONS.transit}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-soft p-5">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mb-3">
                    <Accessibility className="w-5 h-5 text-accent-700" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Accessibility</h4>
                  <p className="text-sm text-neutral-600">{DIRECTIONS.accessibility}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA
        variant="compact"
        background="gradient"
        headline="Questions? We're Here to Help"
        description="Don't hesitate to reach out—we're happy to answer any questions about your dental care."
        phoneNumber="6137331118"
        phoneDisplay="(613) 733-1118"
        showEmergency={false}
        bookUrl="/contact#book"
        bookText="Send a Message"
      />
    </main>
  );
}
