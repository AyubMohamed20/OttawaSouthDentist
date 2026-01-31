'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Sparkles,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  Sun,
  Zap,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';
import { ServiceCard } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How long does teeth whitening last?',
    answer:
      'Results typically last 1-3 years depending on your diet and lifestyle habits. Consuming staining substances like coffee, tea, red wine, and tobacco can shorten longevity. Touch-up treatments can extend and maintain your results over time.',
  },
  {
    question: 'Will whitening damage my teeth?',
    answer:
      'Professional teeth whitening performed by a dentist is safe and does not damage tooth enamel. Our Spa-Dent system is designed to minimize sensitivity while delivering effective results. We carefully assess your dental health before treatment to ensure whitening is appropriate for you.',
  },
  {
    question: 'Can everyone whiten their teeth?',
    answer:
      'Most people are excellent candidates for teeth whitening. However, it may not be suitable for those with certain dental conditions, such as severe sensitivity, gum disease, or restorations on front teeth. A consultation will determine if whitening is right for you and which approach would work best.',
  },
  {
    question: 'What is the difference between professional and store-bought whitening?',
    answer:
      'Professional whitening uses higher-concentration formulas supervised by a dentist for faster, more dramatic results. Our Spa-Dent system provides customized treatment tailored to your needs, whereas over-the-counter products offer lower concentrations with gradual, subtle results that may require frequent reapplication.',
  },
  {
    question: 'How can I maintain my whitening results?',
    answer:
      'To maintain your bright smile, avoid or limit staining foods and beverages (coffee, tea, red wine), refrain from smoking or tobacco use, maintain excellent oral hygiene with regular brushing and flossing, and consider periodic touch-up treatments as needed.',
  },
];

const benefits = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast Results',
    description:
      'Achieve a noticeably brighter smile in a single visit with our LED light-activated technology.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Safe & Supervised',
    description:
      'Professional-grade whitening performed under dentist supervision for optimal safety and results.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Minimal Sensitivity',
    description:
      'Our Spa-Dent system is designed to provide effective whitening with minimal tooth sensitivity.',
  },
  {
    icon: <Sun className="w-6 h-6" />,
    title: 'Long-Lasting Brightness',
    description:
      'Enjoy results that last 1-3 years with proper care and occasional touch-up treatments.',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation & Assessment',
    description:
      'We examine your teeth and gums to ensure you are a good candidate and discuss your whitening goals.',
  },
  {
    step: 2,
    title: 'Preparation',
    description:
      'Your gums and soft tissues are carefully protected before the whitening gel is applied to your teeth.',
  },
  {
    step: 3,
    title: 'LED Light Activation',
    description:
      'The Spa-Dent dual-arch LED light activates the whitening gel, accelerating the brightening process.',
  },
  {
    step: 4,
    title: 'Reveal Your Smile',
    description:
      'The gel is removed and you see your brighter, whiter smile—up to several shades lighter!',
  },
];

const comparisonData = [
  {
    feature: 'Strength',
    professional: 'Higher concentration',
    otc: 'Lower concentration',
  },
  {
    feature: 'Results',
    professional: 'Faster, more dramatic',
    otc: 'Gradual, subtle',
  },
  {
    feature: 'Safety',
    professional: 'Supervised by dentist',
    otc: 'Self-administered',
  },
  {
    feature: 'Customization',
    professional: 'Tailored to your needs',
    otc: 'One-size-fits-all',
  },
  {
    feature: 'Longevity',
    professional: 'Longer-lasting',
    otc: 'May need frequent reapplication',
  },
];

const relatedServices = [
  {
    title: 'Dental Veneers',
    description:
      'Transform your smile with custom porcelain veneers for a complete aesthetic makeover.',
    href: '/services/veneers',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: 'Dental Checkups',
    description:
      'Regular examinations to maintain your bright smile and optimal oral health.',
    href: '/services/checkups',
    icon: <Check className="w-6 h-6" />,
  },
  {
    title: 'Dental Bonding',
    description:
      'Repair chips and improve tooth appearance with natural-looking composite bonding.',
    href: '/services/bonding',
    icon: <Shield className="w-6 h-6" />,
  },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={[
            'rounded-2xl border transition-all duration-300',
            openIndex === index
              ? 'border-[#722F37]/20 bg-gradient-to-br from-white to-[#FDF8F3]/50 shadow-soft'
              : 'border-[#EDE5DD] bg-white hover:border-[#722F37]/10',
          ].join(' ')}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2 rounded-2xl"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-[#1e293b] pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={[
                'w-5 h-5 text-[#722F37] flex-shrink-0 transition-transform duration-300',
                openIndex === index ? 'rotate-180' : '',
              ].join(' ')}
            />
          </button>
          <div
            className={[
              'overflow-hidden transition-all duration-300 ease-out',
              openIndex === index ? 'max-h-96' : 'max-h-0',
            ].join(' ')}
          >
            <div className="px-6 pb-5 text-[#64748b] leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TeethWhiteningContent() {
  return (
    <>
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]">
          {/* Decorative elements */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#722F37]/5" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-100/30" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <nav className="mb-6" aria-label="Breadcrumb">
                  <ol className="flex items-center gap-2 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-[#64748b] hover:text-[#722F37] transition-colors"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="text-[#64748b]">/</li>
                    <li>
                      <Link
                        href="/services"
                        className="text-[#64748b] hover:text-[#722F37] transition-colors"
                      >
                        Services
                      </Link>
                    </li>
                    <li className="text-[#64748b]">/</li>
                    <li className="text-[#722F37] font-medium">
                      Teeth Whitening
                    </li>
                  </ol>
                </nav>

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Teeth Whitening
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Brighten your smile with professional Spa-Dent LED whitening.
                  Our advanced light-activated technology delivers stunning
                  results in a single visit with minimal sensitivity.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                    onClick={() => (window.location.href = '/contact#book')}
                  >
                    Book Appointment
                  </Button>
                  <a
                    href="tel:+16137336446"
                    className={[
                      'inline-flex items-center justify-center gap-2',
                      'px-6 py-3 rounded-xl font-medium',
                      'bg-white text-[#722F37] border-2 border-[#722F37]/20',
                      'hover:border-[#722F37]/40 hover:bg-[#FDF8F3]',
                      'transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                    ].join(' ')}
                  >
                    <Phone className="w-5 h-5" />
                    (613) 733-6446
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-[4/3]">
                  <Image
                    src="/images/cosmetic/cosmetic-15.jpg"
                    alt="Patient with bright white smile after professional teeth whitening"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-soft-lg border border-[#EDE5DD] hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center">
                      <Sun className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e293b]">
                        Single Visit
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Brighter smile today
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Why Choose Professional Whitening?
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Our Spa-Dent LED whitening system delivers superior results
              compared to over-the-counter products, with the safety of
              professional supervision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={[
                  'p-6 rounded-2xl',
                  'bg-gradient-to-br from-white to-[#FDF8F3]/50',
                  'border border-[#EDE5DD]',
                  'transition-all duration-300',
                  'hover:shadow-soft hover:-translate-y-1 hover:border-[#722F37]/20',
                ].join(' ')}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-4 text-[#722F37]">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-[#1e293b] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Detailed Description Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-display font-semibold text-fluid-3xl text-[#1e293b] tracking-tight mb-6">
                Advanced Spa-Dent Whitening Technology
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  At Ottawa South Dental, we use the Spa-Dent whitening system—an
                  advanced dual-arch LED light-activated technology that provides
                  fast, comfortable, and effective teeth whitening in a single
                  visit.
                </p>

                <p>
                  Unlike store-bought whitening products that offer gradual,
                  subtle results, our professional treatment uses higher
                  concentrations of whitening agents combined with LED light
                  activation to deliver dramatic improvements. Many patients
                  achieve smiles up to several shades brighter in just one
                  appointment.
                </p>

                <p>
                  The treatment is carefully supervised by our dental team, who
                  protect your gums and soft tissues throughout the process. This
                  professional approach ensures both optimal results and minimal
                  sensitivity.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <Zap className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">LED Light-Activated:</span> Our
                  dual-arch technology whitens both upper and lower teeth
                  simultaneously for efficient, even results.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/cosmetic/cosmetic-20.jpg"
                  alt="Professional teeth whitening treatment at Ottawa South Dental"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Professional vs OTC Comparison Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Professional vs. Over-the-Counter Whitening
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              See why professional whitening delivers superior results compared
              to store-bought options.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-[#EDE5DD] shadow-soft">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-br from-[#722F37] to-[#5a252c]">
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Professional
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Over-the-Counter
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? 'bg-white' : 'bg-[#FDF8F3]/50'
                      }
                    >
                      <td className="px-6 py-4 font-medium text-[#1e293b]">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-[#64748b]">
                        <span className="inline-flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {row.professional}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#64748b]">{row.otc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionContainer>

        {/* Procedure Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              What to Expect
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Your teeth whitening treatment is a comfortable, straightforward
              process completed in a single visit.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {procedureSteps.map((step, index) => (
                <div
                  key={index}
                  className={[
                    'relative p-6 rounded-2xl',
                    'bg-gradient-to-br from-white to-[#FDF8F3]/50',
                    'border border-[#EDE5DD]',
                    'transition-all duration-300',
                    'hover:shadow-soft hover:border-[#722F37]/20',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#722F37] text-white flex items-center justify-center font-semibold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e293b] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">
                    Comfortable, Single-Visit Treatment
                  </h3>
                  <p className="text-[#64748b]">
                    Most patients complete their whitening treatment in one
                    appointment. The process is comfortable and the results are
                    immediately visible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* FAQ Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#64748b] text-lg">
                Have questions about teeth whitening? Find answers to common
                questions below.
              </p>
            </div>

            <FAQAccordion items={faqs} />

            <div className="mt-10 text-center">
              <p className="text-[#64748b] mb-4">
                Still have questions? We're happy to help.
              </p>
              <a
                href="tel:+16137336446"
                className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
              >
                <Phone className="w-5 h-5" />
                Call us at (613) 733-6446
              </a>
            </div>
          </div>
        </SectionContainer>

        {/* Related Services Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Related Services
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Explore other cosmetic services that can enhance your smile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group"
            >
              View All Services
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SectionContainer>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]">
          {/* Decorative elements */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center">
              <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-white tracking-tight mb-4">
                Ready for a Brighter Smile?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Schedule your professional teeth whitening appointment today and
                discover the confidence that comes with a radiant, white smile.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => (window.location.href = '/contact#book')}
                >
                  Book Appointment
                </Button>
                <a
                  href="tel:+16137336446"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-8 py-4 rounded-xl font-medium text-lg',
                    'bg-white/10 text-white border-2 border-white/20',
                    'hover:bg-white/20',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#722F37]',
                  ].join(' ')}
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-6446
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
