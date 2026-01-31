import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Users,
  Award,
  Sparkles,
  Shield,
  Clock,
  Languages,
  MapPin,
  Phone,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Leaf,
  HandHeart,
  Building2,
  BadgeCheck,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { OfficeGallery, type GalleryImage } from '@/components/sections/office-gallery';
import { structuredData, JsonLd } from '@/lib/metadata';

// Page Metadata for SEO
export const metadata: Metadata = {
  title: 'About Us | Ottawa South Dental',
  description:
    'Learn about Ottawa South Dental, your trusted family dentist in Ottawa. Discover our practice history, philosophy, team, and commitment to compassionate dental care.',
  keywords: [
    'about Ottawa South Dental',
    'Ottawa dentist history',
    'family dentist Ottawa',
    'dental practice philosophy',
    'Ottawa dental team',
    'CDCP dentist Ottawa',
    'multilingual dentist Ottawa',
  ],
  openGraph: {
    title: 'About Us | Ottawa South Dental',
    description:
      'Discover Ottawa South Dental - a family practice dedicated to stress-free, patient-centered dental care.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Ottawa South Dental',
    description:
      'Discover Ottawa South Dental - a family practice dedicated to stress-free, patient-centered dental care.',
  },
  alternates: {
    canonical: '/about',
  },
};

// Gallery images from public/images/clinic/
const galleryImages: GalleryImage[] = [
  { src: '/images/clinic/clinic-01.jpg', alt: 'Welcoming reception area', caption: 'Our warm reception area' },
  { src: '/images/clinic/clinic-02.jpg', alt: 'Modern treatment room', caption: 'State-of-the-art treatment room' },
  { src: '/images/clinic/clinic-03.jpg', alt: 'Dental equipment', caption: 'Modern dental technology' },
  { src: '/images/clinic/clinic-04.jpg', alt: 'Patient waiting area', caption: 'Comfortable waiting area' },
  { src: '/images/clinic/clinic-05.jpg', alt: 'Consultation room', caption: 'Private consultation room' },
  { src: '/images/clinic/clinic-06.jpg', alt: 'Digital X-ray equipment', caption: 'Digital imaging technology' },
  { src: '/images/clinic/clinic-07.jpg', alt: 'Sterilization area', caption: 'Advanced sterilization center' },
  { src: '/images/clinic/clinic-08.jpg', alt: 'Treatment chair', caption: 'Ergonomic treatment chairs' },
  { src: '/images/clinic/clinic-09.jpg', alt: 'Dental tools', caption: 'Precision instruments' },
  { src: '/images/clinic/clinic-10.jpg', alt: 'Office exterior', caption: 'Our Bank Street location' },
  { src: '/images/clinic/clinic-11.jpg', alt: 'Team area', caption: 'Behind the scenes' },
  { src: '/images/clinic/clinic-12.jpg', alt: 'Modern facility', caption: 'Contemporary design' },
  { src: '/images/clinic/clinic-13.jpg', alt: 'Patient care area', caption: 'Patient-centered environment' },
  { src: '/images/clinic/clinic-14.jpg', alt: 'Dental operatory', caption: 'Fully equipped operatory' },
  { src: '/images/clinic/clinic-15.jpg', alt: 'Office interior', caption: 'Warm interior design' },
  { src: '/images/clinic/clinic-16.jpg', alt: 'Dental suite', caption: 'Modern dental suite' },
  { src: '/images/clinic/clinic-17.jpg', alt: 'Equipment station', caption: 'Professional equipment' },
  { src: '/images/clinic/clinic-18.jpg', alt: 'Treatment area', caption: 'Spacious treatment area' },
  { src: '/images/clinic/clinic-19.jpg', alt: 'Clinic space', caption: 'Inviting clinic space' },
  { src: '/images/clinic/clinic-20.jpg', alt: 'Office amenities', caption: 'Patient amenities' },
  { src: '/images/clinic/clinic-21.jpg', alt: 'Dental chair setup', caption: 'Comfortable dental chairs' },
  { src: '/images/clinic/clinic-22.jpg', alt: 'Practice facilities', caption: 'Premium facilities' },
  { src: '/images/clinic/clinic-23.jpg', alt: 'Clinical workspace', caption: 'Professional workspace' },
  { src: '/images/clinic/clinic-24.jpg', alt: 'Office features', caption: 'Thoughtful features' },
  { src: '/images/clinic/clinic-25.jpg', alt: 'Dental office tour', caption: 'Welcome to our practice' },
];

// Philosophy pillars
const philosophyPillars = [
  {
    icon: Heart,
    title: 'Patient-First Care',
    description:
      'Every decision we make starts with your comfort and well-being in mind. We take the time to listen, understand your concerns, and create personalized treatment plans.',
  },
  {
    icon: Stethoscope,
    title: 'Education & Transparency',
    description:
      'We believe informed patients make empowered decisions. We explain every procedure, answer all questions, and ensure you understand your treatment options.',
  },
  {
    icon: Shield,
    title: 'Gentle, Stress-Free Environment',
    description:
      'We understand dental anxiety is real. Our compassionate approach and calming environment help even the most nervous patients feel at ease.',
  },
  {
    icon: Sparkles,
    title: 'Modern Excellence',
    description:
      'We invest in the latest dental technology and continue our education to provide you with the most advanced, effective treatments available.',
  },
];

// Technology highlights
const technologyHighlights = [
  {
    icon: BadgeCheck,
    title: 'Digital X-Rays',
    description: '90% less radiation, instant results, and enhanced diagnostic accuracy',
  },
  {
    icon: Star,
    title: 'Intraoral Cameras',
    description: 'See what we see with high-definition images of your teeth',
  },
  {
    icon: Shield,
    title: 'Advanced Sterilization',
    description: 'Hospital-grade sterilization protocols for your safety',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Practices',
    description: 'Digital records and sustainable materials for a greener practice',
  },
];

// Community initiatives
const communityInitiatives = [
  'Free dental education programs at local schools',
  'Participating in Give Kids A Smile day',
  'Supporting Ottawa Food Bank and local charities',
  'Sponsoring community sports teams',
  'Volunteer dental services for underserved communities',
];

// Stats for the practice
const practiceStats = [
  { value: '20+', label: 'Years Serving Ottawa', sublabel: 'Established 2004' },
  { value: '10,000+', label: 'Happy Patients', sublabel: 'And counting' },
  { value: '7', label: 'Languages Spoken', sublabel: 'Multilingual care' },
  { value: '4.8', label: 'Google Rating', sublabel: '250+ reviews' },
];

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Structured Data */}
      <JsonLd data={structuredData.aboutPage()} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />

      {/* ========== HERO SECTION ========== */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#FFFBF8] via-white to-[#FDF8F3]"
        aria-labelledby="about-hero-heading"
      >
        {/* Breadcrumb Navigation */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 z-10">
          <Breadcrumb items={[{ label: 'About', href: '/about' }]} />
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(114,47,55,0.08) 0%, rgba(114,47,55,0.02) 50%, transparent 70%)',
            }}
          />
          <div
            className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.06) 0%, transparent 60%)',
            }}
          />
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23722F37' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6 animate-fade-in">
                <Building2 className="w-4 h-4" />
                <span>About Our Practice</span>
              </div>

              <h1
                id="about-hero-heading"
                className="font-display font-bold tracking-tight animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                <span className="block text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl text-neutral-900 leading-tight">
                  Your Smile Is
                </span>
                <span
                  className="block text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl leading-tight text-[#722F37]"
                  style={{ textShadow: '0 2px 20px rgba(114,47,55,0.15)' }}
                >
                  Our Passion
                </span>
              </h1>

              <p
                className="mt-6 text-lg md:text-xl text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
              >
                For over two decades, Ottawa South Dental has been providing compassionate, patient-centered
                dental care to families across Ottawa. We combine modern dentistry with genuine warmth to
                create an experience that puts you at ease.
              </p>

              {/* Quick stats */}
              <div
                className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up"
                style={{ animationDelay: '300ms' }}
              >
                {practiceStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-neutral-100 shadow-sm"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-[#722F37]">{stat.value}</p>
                    <p className="text-sm font-medium text-neutral-700">{stat.label}</p>
                    <p className="text-xs text-neutral-500">{stat.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div
              className="relative animate-fade-in"
              style={{ animationDelay: '150ms' }}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 ring-1 ring-neutral-900/5">
                <Image
                  src="/images/clinic/clinic-01.jpg"
                  alt="Ottawa South Dental team welcoming patients"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl shadow-neutral-900/10 p-5 border border-neutral-100 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center ring-1 ring-primary-200/50">
                    <Heart className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Family-Focused</p>
                    <p className="text-sm text-neutral-500">Care for all ages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden" aria-hidden="true">
          <svg
            className="absolute bottom-0 w-full h-full text-white"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,70 1440,60 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ========== OUR STORY SECTION ========== */}
      <SectionContainer background="white" paddingY="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-soft-lg">
              <Image
                src="/images/clinic/clinic-02.jpg"
                alt="Ottawa South Dental office history"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-[#722F37]/20 rounded-tl-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-primary-300/30 rounded-br-3xl"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              <span>Our Story</span>
            </div>

            <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight">
              A Legacy of <span className="text-[#722F37]">Caring</span> Since 2004
            </h2>

            <div className="mt-6 space-y-5 text-neutral-600 leading-relaxed">
              <p>
                Ottawa South Dental was founded with a simple yet powerful vision: to create a dental practice
                where patients feel genuinely cared for, not just treated. For over 20 years, we&apos;ve stayed
                true to that founding principle.
              </p>
              <p>
                What started as a small practice on Bank Street has grown into a trusted community institution,
                serving thousands of families across Ottawa. Through the years, we&apos;ve expanded our services,
                upgraded our technology, and welcomed new team members&mdash;but our core commitment to
                compassionate, patient-first care has never wavered.
              </p>
              <p>
                Today, we&apos;re proud to serve a diverse, multilingual community, offering care in English,
                French, Spanish, Hindi, Punjabi, Farsi, and Arabic. We accept the Canadian Dental Care Plan
                (CDCP) because we believe quality dental care should be accessible to everyone.
              </p>
            </div>

            {/* Highlight box */}
            <div className="mt-8 bg-gradient-to-r from-[#FDF8F3] to-[#FFFBF8] rounded-2xl p-6 border border-[#722F37]/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                  <Languages className="w-6 h-6 text-[#722F37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Serving Ottawa&apos;s Diverse Community</p>
                  <p className="text-sm text-neutral-600 mt-1">
                    We speak English, French, Spanish, Hindi, Punjabi, Farsi, and Arabic to ensure every patient
                    feels at home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ========== MISSION STATEMENT SECTION ========== */}
      <section className="relative bg-[#722F37] overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect fill="url(#dots)" width="100%" height="100%" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Our Mission</span>
          </div>

          <blockquote>
            <p className="font-display text-fluid-2xl md:text-fluid-3xl lg:text-fluid-4xl text-white leading-relaxed font-medium">
              &ldquo;To provide exceptional dental care in a warm, welcoming environment where every patient
              is treated like family. We are committed to educating our patients, using the latest technology,
              and creating stress-free experiences that build lifelong relationships.&rdquo;
            </p>
          </blockquote>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-white/30" />
            <Heart className="w-6 h-6 text-white/80" />
            <div className="w-16 h-px bg-white/30" />
          </div>
        </div>
      </section>

      {/* ========== PHILOSOPHY SECTION ========== */}
      <SectionContainer background="secondary" paddingY="lg">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6">
            <HandHeart className="w-4 h-4" />
            <span>Our Philosophy</span>
          </div>

          <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight">
            What <span className="text-[#722F37]">Guides</span> Us
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Our practice philosophy shapes everything we do, from how we greet you at the door to how we
            approach your treatment plan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {philosophyPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={[
                'group relative bg-white rounded-3xl p-8 lg:p-10',
                'border border-neutral-100',
                'shadow-soft hover:shadow-soft-lg',
                'transition-all duration-300',
              ].join(' ')}
            >
              {/* Icon */}
              <div
                className={[
                  'w-16 h-16 rounded-2xl',
                  'flex items-center justify-center',
                  'bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5',
                  'group-hover:from-[#722F37] group-hover:to-[#5a252c]',
                  'transition-all duration-300',
                  'mb-6',
                ].join(' ')}
              >
                <pillar.icon
                  className={[
                    'w-8 h-8 text-[#722F37]',
                    'group-hover:text-white',
                    'transition-colors duration-300',
                  ].join(' ')}
                />
              </div>

              <h3 className="text-xl lg:text-2xl font-display font-semibold text-neutral-900 mb-3">
                {pillar.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">{pillar.description}</p>

              {/* Number decoration */}
              <div
                className="absolute top-6 right-6 text-6xl font-display font-bold text-neutral-100 group-hover:text-[#722F37]/5 transition-colors duration-300"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ========== COMMITMENT TO CARE SECTION ========== */}
      <SectionContainer background="white" paddingY="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Our Commitment</span>
            </div>

            <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight">
              Dedicated to Your <span className="text-[#722F37]">Well-Being</span>
            </h2>

            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              At Ottawa South Dental, our commitment to you goes beyond just treating teeth. We&apos;re
              dedicated to your overall well-being, comfort, and long-term oral health.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Comprehensive treatment explanations before any procedure',
                'Flexible payment options and direct insurance billing',
                'Same-day emergency appointments for urgent cases',
                'Comfortable, anxiety-free environment',
                'Personalized treatment plans tailored to your needs',
                'Follow-up care and ongoing support',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact#book">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                >
                  Book Your Visit
                </Button>
              </Link>
              <Link
                href="tel:6137331118"
                className={[
                  'inline-flex items-center gap-2',
                  'px-6 py-3 rounded-xl',
                  'text-neutral-700 font-medium',
                  'bg-white border border-neutral-200',
                  'hover:border-[#722F37]/30 hover:text-[#722F37]',
                  'shadow-sm hover:shadow-md',
                  'transition-all duration-200',
                ].join(' ')}
              >
                <Phone className="w-5 h-5" />
                (613) 733-1118
              </Link>
            </div>
          </div>

          {/* Image grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/clinic/clinic-03.jpg"
                    alt="Modern dental equipment"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/clinic/clinic-04.jpg"
                    alt="Comfortable patient area"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/clinic/clinic-05.jpg"
                    alt="Consultation with patient"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/clinic/clinic-06.jpg"
                    alt="Digital imaging technology"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#722F37] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-float">
              <Award className="w-5 h-5" />
              <span className="font-medium whitespace-nowrap">CDCP Accepted</span>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ========== OFFICE GALLERY SECTION ========== */}
      <SectionContainer background="secondary" paddingY="lg">
        <OfficeGallery
          images={galleryImages}
          headline="Step Inside Our Office"
          subtitle="Take a virtual tour of our modern, welcoming dental facility designed with your comfort in mind"
        />
      </SectionContainer>

      {/* ========== TECHNOLOGY SECTION ========== */}
      <SectionContainer background="white" paddingY="lg">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
            <Stethoscope className="w-4 h-4" />
            <span>Technology & Equipment</span>
          </div>

          <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight">
            Modern Care, <span className="text-[#722F37]">Advanced Technology</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            We invest in the latest dental technology to provide you with safer, faster, and more
            comfortable treatments.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologyHighlights.map((tech) => (
            <div
              key={tech.title}
              className={[
                'group bg-white rounded-2xl p-6',
                'border border-neutral-100',
                'shadow-soft hover:shadow-soft-lg',
                'hover:border-[#722F37]/20',
                'transition-all duration-300',
                'text-center',
              ].join(' ')}
            >
              <div
                className={[
                  'w-14 h-14 mx-auto rounded-xl',
                  'flex items-center justify-center',
                  'bg-gradient-to-br from-primary-50 to-primary-100',
                  'group-hover:from-[#722F37] group-hover:to-[#5a252c]',
                  'transition-all duration-300',
                  'mb-4',
                ].join(' ')}
              >
                <tech.icon
                  className={[
                    'w-7 h-7 text-primary-600',
                    'group-hover:text-white',
                    'transition-colors duration-300',
                  ].join(' ')}
                />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{tech.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{tech.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ========== COMMUNITY SECTION ========== */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                <span>Community Involvement</span>
              </div>

              <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-white tracking-tight">
                Giving Back to <span className="text-primary-200">Our Community</span>
              </h2>

              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                We believe in being more than just a dental practice&mdash;we strive to be active,
                contributing members of the Ottawa community. Through various initiatives, we work to
                improve oral health awareness and support those in need.
              </p>

              <ul className="mt-8 space-y-4">
                {communityInitiatives.map((initiative) => (
                  <li key={initiative} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary-300" />
                    </div>
                    <span className="text-white/90">{initiative}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/images/clinic/clinic-10.jpg"
                  alt="Ottawa South Dental community involvement"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Accent decoration */}
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 border-l-4 border-b-4 border-primary-400/30 rounded-bl-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="bg-gradient-to-r from-[#FDF8F3] via-white to-[#FFFBF8] border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight">
            Ready to Join Our <span className="text-[#722F37]">Family</span>?
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            We&apos;re always welcoming new patients. Schedule your first visit today and experience the
            Ottawa South Dental difference.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact#book">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book Your Appointment
              </Button>
            </Link>

            <Link
              href="/contact"
              className={[
                'inline-flex items-center gap-2',
                'px-8 py-4 rounded-xl',
                'text-[#722F37] font-medium text-lg',
                'bg-white border-2 border-[#722F37]/20',
                'hover:border-[#722F37] hover:bg-[#722F37]/5',
                'shadow-sm hover:shadow-md',
                'transition-all duration-200',
              ].join(' ')}
            >
              <MapPin className="w-5 h-5" />
              Visit Us
            </Link>
          </div>

          {/* Contact info */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-neutral-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#722F37]" />
              <span>1729 Bank St, Ottawa, ON</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-neutral-300" />
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#722F37]" />
              <a href="tel:6137331118" className="hover:text-[#722F37] transition-colors">
                (613) 733-1118
              </a>
            </div>
            <div className="hidden sm:block w-px h-5 bg-neutral-300" />
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#722F37]" />
              <span>Mon-Thu: 9am-6pm</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
