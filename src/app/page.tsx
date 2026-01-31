import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { Differentiators } from '@/components/sections/differentiators';
import { ServicesOverview } from '@/components/sections/services-overview';
import { TeamPreview } from '@/components/sections/team-preview';
import { Testimonials } from '@/components/sections/testimonials';
import { ContactCTA } from '@/components/sections/ContactCTA';

export const metadata: Metadata = {
  title: 'Ottawa South Dental | Family Dentistry in Ottawa',
  description:
    'Ottawa South Dental provides comprehensive family dentistry services in Ottawa. CDCP accepted, direct insurance billing, same-day emergencies, and multilingual care. Book your appointment today!',
  keywords: [
    'Ottawa dentist',
    'family dentistry Ottawa',
    'Ottawa South Dental',
    'CDCP dentist Ottawa',
    'emergency dental care Ottawa',
    'teeth cleaning Ottawa',
    'dental implants Ottawa',
    'cosmetic dentistry Ottawa',
  ],
  openGraph: {
    title: 'Ottawa South Dental | Family Dentistry in Ottawa',
    description:
      'Comprehensive family dentistry with CDCP coverage, direct billing, and same-day emergencies. Multilingual care for your whole family.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ottawa South Dental | Family Dentistry in Ottawa',
    description:
      'Comprehensive family dentistry with CDCP coverage, direct billing, and same-day emergencies.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        id="hero"
        headline="Your Family's Smile Deserves"
        headlineAccent="Exceptional Care"
        description="Welcome to Ottawa South Dental, where we combine modern dentistry with compassionate care. From routine checkups to advanced treatments, we're here for your whole family."
        phoneNumber="6137331118"
        phoneDisplay="(613) 733-1118"
        address="1729 Bank St, Ottawa, ON K1V 7Z4"
        languages={['English', 'French', 'Arabic', 'Somali']}
        showCDCP={true}
        showDirectBilling={true}
        bookUrl="/contact#book"
        heroImage="/images/hero-dental-care.jpg"
      />

      {/* Key Differentiators */}
      <Differentiators
        id="why-choose-us"
        headline="Why Families Choose Us"
        subtitle="We go beyond standard dental care to provide an exceptional experience for every patient"
        variant="cards"
        background="muted"
      />

      {/* Services Overview Grid */}
      <ServicesOverview
        id="services"
        headline="Our Dental Services"
        subtitle="Comprehensive care for every member of your family, from preventive checkups to advanced treatments"
        variant="grid"
        background="default"
        showAllServicesLink={true}
        allServicesUrl="/services"
      />

      {/* About/Team Preview */}
      <TeamPreview
        id="team"
        headline="Meet Our Caring Team"
        subtitle="Experienced professionals dedicated to your comfort and oral health"
        practiceIntro="At Ottawa South Dental, we believe in building lasting relationships with our patients. Our team combines years of experience with genuine compassion to create a welcoming environment where you'll feel comfortable and cared for."
        yearsExperience={28}
        teamPageUrl="/about/team"
        ctaText="Meet the Full Team"
        background="muted"
      />

      {/* Testimonials Section */}
      <Testimonials
        id="testimonials"
        headline="What Our Patients Say"
        subtitle="Real experiences from families who trust us with their smiles"
        variant="carousel"
        showGoogleRating={true}
        googleRating={4.8}
        totalReviews={250}
        background="white"
      />

      {/* Contact CTA Banner */}
      <ContactCTA
        id="contact"
        variant="full"
        background="gradient"
        headline="Ready to Schedule Your Visit?"
        description="Whether you need a routine checkup or have a dental emergency, we're here to help. Book your appointment today or call us directly."
        phoneNumber="6137331118"
        phoneDisplay="(613) 733-1118"
        showEmergency={true}
        emergencyMessage="Dental emergency? We offer same-day appointments for urgent cases."
        showHours={true}
        officeHours={[
          { day: 'Monday - Thursday', hours: '9:00 AM - 6:00 PM' },
          { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
          { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
          { day: 'Sunday', hours: 'Closed' },
        ]}
        showAddress={true}
        address="1729 Bank St, Ottawa, ON K1V 7Z4"
        bookUrl="/contact#book"
        bookButtonText="Book Appointment"
      />
    </main>
  );
}
