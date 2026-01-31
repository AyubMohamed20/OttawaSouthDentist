import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  Sparkles,
  Star,
  Smile,
  Heart,
  Clock,
  Award,
  Palette,
  Wand2,
  Gem,
  Layers,
  Scissors,
  AlignCenter,
  Stethoscope,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/card';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Cosmetic Dentistry | Ottawa South Dental',
  description:
    'Transform your smile with cosmetic dentistry at Ottawa South Dental. Teeth whitening, veneers, dental bonding, and complete smile makeovers. Boost your confidence with a beautiful smile.',
  keywords: [
    'cosmetic dentistry Ottawa',
    'teeth whitening Ottawa',
    'dental veneers',
    'porcelain veneers Ottawa',
    'dental bonding',
    'smile makeover Ottawa',
    'gum contouring',
    'cosmetic dental work',
    'Ottawa South Dental',
    'beautiful smile',
  ],
  openGraph: {
    title: 'Cosmetic Dentistry | Ottawa South Dental',
    description:
      'Transform your smile with cosmetic dentistry at Ottawa South Dental. Teeth whitening, veneers, dental bonding, and complete smile makeovers.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmetic Dentistry | Ottawa South Dental',
    description:
      'Transform your smile with cosmetic dentistry at Ottawa South Dental. Teeth whitening, veneers, dental bonding, and complete smile makeovers.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/cosmetic-dentistry',
  },
};

// Cosmetic services data
const cosmeticServices = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Teeth Whitening',
    description:
      'Professional whitening treatments that safely brighten your smile by several shades in just one visit.',
  },
  {
    icon: <Gem className="w-6 h-6" />,
    title: 'Porcelain Veneers',
    description:
      'Ultra-thin shells custom-crafted to cover front teeth, transforming shape, color, and alignment.',
  },
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: 'Dental Bonding',
    description:
      'Tooth-colored resin repairs chips, gaps, and discoloration for a natural, seamless look.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Smile Makeovers',
    description:
      'Comprehensive treatment plans combining multiple procedures for a complete smile transformation.',
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    title: 'Gum Contouring',
    description:
      'Reshaping the gum line to create a more balanced, aesthetically pleasing smile.',
  },
  {
    icon: <AlignCenter className="w-6 h-6" />,
    title: 'Invisalign',
    description:
      'Clear, removable aligners that straighten teeth discreetly for a beautifully aligned smile.',
  },
];

// Benefits data
const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Boosted Confidence',
    description: 'A beautiful smile enhances self-esteem and makes you feel great in social and professional settings.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Long-Lasting Results',
    description: 'Modern cosmetic treatments provide durable, natural-looking results that can last for years.',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Personalized Treatment',
    description: 'Every smile is unique—we customize treatments to match your facial features and goals.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Expert Craftsmanship',
    description: 'Our skilled team uses advanced techniques and premium materials for exceptional results.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Improved Function',
    description: 'Many cosmetic procedures also enhance bite function and protect against future damage.',
  },
];

// FAQ data
const faqItems = [
  {
    question: 'What cosmetic options are available for stained or discolored teeth?',
    answer:
      'We offer several options depending on the type and severity of staining. Professional teeth whitening is ideal for surface stains from coffee, tea, or wine. For deeper discoloration or teeth that don\'t respond to whitening, dental veneers or bonding can provide a permanently bright, natural-looking solution. During your consultation, we\'ll assess your teeth and recommend the best approach for your specific situation.',
  },
  {
    question: 'How long do dental veneers last?',
    answer:
      'With proper care, porcelain veneers typically last 10-15 years or longer. They\'re highly durable and resistant to staining. To maximize their lifespan, maintain good oral hygiene, avoid biting hard objects, and visit us regularly for checkups. If you grind your teeth, we may recommend a night guard to protect your investment.',
  },
  {
    question: 'Is teeth whitening safe for my enamel?',
    answer:
      'Yes, professional teeth whitening performed under dental supervision is completely safe for your enamel. We use carefully formulated whitening agents and monitor the process to ensure optimal results without damage. Professional whitening is much safer than over-the-counter products because we can customize the treatment to your sensitivity levels and protect your gums during the procedure.',
  },
  {
    question: 'What is the difference between veneers and dental bonding?',
    answer:
      'Both improve the appearance of teeth, but they differ in material, durability, and application. Veneers are thin porcelain shells custom-made in a lab and permanently bonded to teeth—they\'re more stain-resistant and last longer (10-15 years). Bonding uses tooth-colored composite resin applied directly to teeth in a single visit—it\'s more affordable and less invasive but typically lasts 5-10 years. We\'ll help you choose based on your goals and budget.',
  },
  {
    question: 'Is cosmetic dentistry covered by insurance?',
    answer:
      'Most cosmetic procedures are considered elective and may not be fully covered by dental insurance. However, some treatments that also restore function—such as bonding a chipped tooth or crowning a damaged tooth—may have partial coverage. We\'ll provide a detailed treatment estimate and help you understand your insurance benefits during your consultation.',
  },
];

// Related services
const relatedServices = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Teeth Whitening',
    description: 'Professional whitening for a dramatically brighter smile in just one visit.',
    href: '/services/teeth-whitening',
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'General Dentistry',
    description: 'Comprehensive dental exams and care to maintain your beautiful smile.',
    href: '/services/general',
  },
  {
    icon: <AlignCenter className="w-6 h-6" />,
    title: 'Invisalign',
    description: 'Clear aligners for discreet teeth straightening and improved alignment.',
    href: '/services/invisalign',
  },
];

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Cosmetic Dentistry', url: '/services/cosmetic-dentistry' },
];

// Service data for structured data
const serviceData = {
  name: 'Cosmetic Dentistry',
  description: 'Transform your smile with cosmetic dentistry at Ottawa South Dental. Teeth whitening, veneers, dental bonding, and complete smile makeovers.',
  url: '/services/cosmetic-dentistry',
  image: '/images/cosmetic/cosmetic-05.jpg',
};

export default function CosmeticDentistryPage() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <main id="main-content" className="min-h-screen">
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Cosmetic Dentistry Services',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-primary-50/30">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] -translate-y-1/3 translate-x-1/4 rounded-full bg-gradient-to-br from-primary-100/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] translate-y-1/2 -translate-x-1/4 rounded-full bg-gradient-to-tr from-secondary-100/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                {/* Breadcrumb */}
                <nav className="mb-6 animate-fade-in" aria-label="Breadcrumb">
                  <ol className="flex items-center justify-center lg:justify-start gap-2 text-sm text-foreground-secondary">
                    <li>
                      <Link href="/" className="hover:text-[#722F37] transition-colors">
                        Home
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                      <Link href="/services" className="hover:text-[#722F37] transition-colors">
                        Services
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li className="text-[#722F37] font-medium">Cosmetic Dentistry</li>
                  </ol>
                </nav>

                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6 animate-fade-in"
                  style={{ animationDelay: '50ms' }}
                >
                  <Sparkles className="w-4 h-4" />
                  Transform Your Smile
                </div>

                {/* Headline */}
                <h1
                  className="font-display font-bold tracking-tight text-fluid-4xl sm:text-fluid-5xl lg:text-fluid-6xl text-foreground leading-[1.1] animate-fade-in-up"
                  style={{ animationDelay: '100ms' }}
                >
                  Cosmetic
                  <br />
                  <span className="text-[#722F37]">Dentistry</span>
                </h1>

                {/* Description */}
                <p
                  className="mt-6 text-fluid-lg text-foreground-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: '200ms' }}
                >
                  Unlock the smile you've always wanted. From teeth whitening and porcelain veneers
                  to complete smile makeovers, our cosmetic treatments combine artistry with dental
                  expertise to enhance your natural beauty.
                </p>

                {/* CTA Buttons */}
                <div
                  className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
                  style={{ animationDelay: '300ms' }}
                >
                  <Link href="/book">
                    <Button
                      variant="primary"
                      size="lg"
                      leftIcon={<Calendar className="w-5 h-5" />}
                    >
                      Book This Service
                    </Button>
                  </Link>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white text-[#722F37] border-2 border-[#EDE5DD] shadow-sm hover:shadow-md hover:border-[#722F37]/20 hover:bg-[#FDF8F3] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    <span>{formattedPhone}</span>
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div
                className="relative order-1 lg:order-2 animate-fade-in"
                style={{ animationDelay: '150ms' }}
              >
                <div className="relative">
                  <div
                    className="absolute -inset-4 lg:-inset-6 bg-gradient-to-br from-[#722F37]/10 via-primary-100/30 to-secondary-100/20 rounded-[2rem] lg:rounded-[2.5rem] -z-10"
                    aria-hidden="true"
                  />
                  <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/cosmetic/cosmetic-05.jpg"
                      alt="Beautiful smile after cosmetic dentistry treatment"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              Our Cosmetic <span className="text-[#722F37]">Services</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
              Discover the range of treatments we offer to enhance your smile. Each procedure is
              tailored to your unique needs and aesthetic goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cosmeticServices.map((service, index) => (
              <div
                key={service.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div
                className="absolute -inset-4 bg-gradient-to-br from-[#722F37]/5 via-primary-100/20 to-transparent rounded-[2rem] -z-10"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/cosmetic/cosmetic-12.jpg"
                  alt="Patient with confident, radiant smile after cosmetic dental work"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
                Why Choose <span className="text-[#722F37]">Cosmetic Dentistry?</span>
              </h2>
              <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
                Your smile is one of the first things people notice. Cosmetic dentistry goes beyond
                aesthetics—it's about feeling confident, comfortable, and proud every time you
                smile.
              </p>

              <div className="mt-8 space-y-5">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="flex gap-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] text-[#722F37] flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-foreground-secondary mt-1">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              What to <span className="text-[#722F37]">Expect</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
              Your journey to a stunning smile begins with a personalized consultation and careful planning.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Consultation',
                description:
                  'We discuss your smile goals, examine your teeth, and explore treatment options that fit your vision.',
              },
              {
                step: '2',
                title: 'Custom Treatment Plan',
                description:
                  'We design a personalized plan, often using digital imaging to preview your potential results.',
              },
              {
                step: '3',
                title: 'Smile Transformation',
                description:
                  'Our skilled team performs your chosen procedures with precision, comfort, and attention to detail.',
              },
              {
                step: '4',
                title: 'Reveal & Maintain',
                description:
                  'Enjoy your beautiful new smile and follow our care guidelines to keep it looking perfect.',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              Frequently Asked <span className="text-[#722F37]">Questions</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base">
              Get answers to common questions about cosmetic dentistry treatments.
            </p>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              Related <span className="text-[#722F37]">Services</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base">
              Explore other services that complement your smile transformation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => (
              <div
                key={service.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactCtaBanner
        headline="Ready for Your Smile Transformation?"
        description="Schedule your cosmetic dentistry consultation today and take the first step toward the smile you've always dreamed of. Our expert team is here to help you shine."
        bookText="Book This Service"
        background="gradient"
      />
    </main>
  );
}
