'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Stethoscope,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  CalendarCheck,
  Eye,
  Activity,
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
    question: 'How often should I have a dental checkup?',
    answer:
      'Most patients should visit the dentist every 6 months for a routine checkup and cleaning. However, some patients may need more frequent visits based on their oral health needs. Those with gum disease, a history of cavities, or certain medical conditions may benefit from visits every 3-4 months. During your visit, we\'ll recommend a schedule that\'s right for your individual situation.',
  },
  {
    question: 'What happens during a dental checkup?',
    answer:
      'During a checkup, your dentist will thoroughly examine your teeth, gums, and mouth for any signs of problems. We\'ll check for cavities and tooth decay, evaluate your bite and jaw alignment, screen for oral cancer, and review your oral hygiene habits. X-rays may be taken if necessary to detect hidden issues. You\'ll also receive a professional cleaning to remove plaque and tartar buildup.',
  },
  {
    question: 'Why are regular checkups important if my teeth feel fine?',
    answer:
      'Many dental problems don\'t cause pain in their early stages. Cavities, gum disease, and even oral cancer can develop without noticeable symptoms. Regular checkups allow us to catch these issues early when they\'re easier and less expensive to treat. Prevention is always better than cure, and routine visits help maintain your oral health before problems become serious.',
  },
  {
    question: 'What should I bring to my dental checkup?',
    answer:
      'Please bring your dental insurance information, a list of any medications you\'re currently taking, and any dental records if you\'re a new patient. If you have specific concerns or questions about your oral health, write them down so you don\'t forget to ask. Arriving a few minutes early allows time for any necessary paperwork.',
  },
  {
    question: 'Are dental checkups covered by insurance?',
    answer:
      'Most dental insurance plans cover preventive care, including routine checkups and cleanings, at 80-100%. Coverage typically includes two checkups per year. We\'re happy to help verify your coverage and explain your benefits. For patients without insurance, we offer affordable self-pay options and payment plans.',
  },
];

const benefits = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Early Detection',
    description:
      'Catch cavities, gum disease, and oral cancer in their earliest, most treatable stages.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Preventive Care',
    description:
      'Regular cleanings remove plaque and tartar that brushing alone can\'t eliminate.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Overall Health',
    description:
      'Oral health is linked to heart disease, diabetes, and other systemic conditions.',
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: 'Cost Savings',
    description:
      'Preventing problems is far less expensive than treating advanced dental issues.',
  },
];

const checkupIncludes = [
  {
    step: 1,
    title: 'Comprehensive Examination',
    description:
      'We thoroughly examine your teeth, gums, and mouth for signs of decay, disease, or other concerns.',
  },
  {
    step: 2,
    title: 'Oral Cancer Screening',
    description:
      'A visual and physical examination of your mouth, throat, and neck to check for any abnormalities.',
  },
  {
    step: 3,
    title: 'Bite & Jaw Assessment',
    description:
      'Evaluation of your bite alignment and jaw function to identify any issues that may cause problems.',
  },
  {
    step: 4,
    title: 'X-Rays (When Needed)',
    description:
      'Digital X-rays help us detect hidden decay, bone loss, and other issues not visible during examination.',
  },
  {
    step: 5,
    title: 'Professional Cleaning',
    description:
      'Removal of plaque and tartar buildup, followed by polishing to leave your teeth smooth and clean.',
  },
  {
    step: 6,
    title: 'Personalized Recommendations',
    description:
      'Discussion of your oral health status and customized advice for maintaining a healthy smile.',
  },
];

const relatedServices = [
  {
    title: 'Preventive Dentistry',
    description:
      'Fluoride treatments, sealants, and other preventive services to protect your teeth.',
    href: '/services/preventive-dentistry',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Dental Hygiene',
    description:
      'Professional cleanings and deep cleaning treatments for optimal gum health.',
    href: '/services/dental-hygiene',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: 'White Fillings',
    description:
      'Natural-looking composite fillings to restore teeth affected by decay.',
    href: '/services/white-fillings',
    icon: <Check className="w-6 h-6" />,
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

export default function RoutineCheckupsPage() {
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
                      Routine Checkups
                    </li>
                  </ol>
                </nav>

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Routine Checkups
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Regular dental examinations are the foundation of a healthy smile.
                  Our comprehensive checkups help prevent problems before they start
                  and catch issues early when they're easiest to treat.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact#book">
                    <Button
                      variant="primary"
                      size="lg"
                      leftIcon={<Calendar className="w-5 h-5" />}
                    >
                      Book Your Checkup
                    </Button>
                  </Link>
                  <a
                    href="tel:+16137331312"
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
                    (613) 733-1312
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-[4/3]">
                  <Image
                    src="/images/hygiene/hygiene-03.jpg"
                    alt="Dentist performing a routine dental checkup examination"
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
                      <CalendarCheck className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e293b]">
                        Every 6 Months
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Recommended frequency
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
              Why Regular Checkups Matter
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Routine dental visits are your first line of defense against oral health
              problems and contribute to your overall well-being.
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
                The Importance of Your 6-Month Visit
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  Regular dental checkups are essential for maintaining optimal oral health.
                  While brushing and flossing at home are crucial, they can't remove all
                  plaque and tartar buildup. Professional cleanings and examinations every
                  6 months help keep your mouth healthy and catch problems before they
                  become serious.
                </p>

                <p>
                  During your routine checkup at Ottawa South Dental, our experienced
                  team will thoroughly examine your teeth, gums, and mouth. We'll check
                  for cavities, evaluate your gum health, assess your bite alignment,
                  and perform an oral cancer screening. If needed, we'll take digital
                  X-rays to see what's happening beneath the surface.
                </p>

                <p>
                  Your checkup appointment also includes a professional cleaning. Our
                  dental hygienist will remove plaque and tartar that have accumulated
                  since your last visit, polish your teeth, and provide personalized
                  tips for improving your home care routine. This combination of
                  professional care and good habits at home is the key to a lifetime
                  of healthy smiles.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <Stethoscope className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">Did you know?</span> Many serious
                  dental problems show no symptoms until they've progressed significantly.
                  Regular checkups are the best way to catch issues early.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/hygiene/hygiene-08.jpg"
                  alt="Dental professional explaining checkup findings to patient"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* What's Included Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              What's Included in Your Checkup
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Our comprehensive routine checkup covers everything needed to ensure
              your oral health is in excellent condition.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {checkupIncludes.map((item, index) => (
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
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e293b] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {item.description}
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
                    Typically 45-60 Minutes
                  </h3>
                  <p className="text-[#64748b]">
                    Your routine checkup appointment includes both the examination and
                    professional cleaning. We take the time needed to ensure thorough care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* FAQ Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#64748b] text-lg">
                Have questions about routine dental checkups? Find answers to common
                questions below.
              </p>
            </div>

            <FAQAccordion items={faqs} />

            <div className="mt-10 text-center">
              <p className="text-[#64748b] mb-4">
                Still have questions? We're happy to help.
              </p>
              <a
                href="tel:+16137331312"
                className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
              >
                <Phone className="w-5 h-5" />
                Call us at (613) 733-1312
              </a>
            </div>
          </div>
        </SectionContainer>

        {/* Related Services Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Related Services
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Explore other services that complement your routine dental care.
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
                Ready for Your Next Checkup?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Don't wait until there's a problem. Schedule your routine checkup today
                and take the first step toward a lifetime of healthy smiles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact#book">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                  >
                    Book Your Appointment
                  </Button>
                </Link>
                <a
                  href="tel:+16137331312"
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
                  (613) 733-1312
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
