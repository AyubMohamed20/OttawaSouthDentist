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
  Heart,
  Smile,
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
    question: 'How long do dentures last?',
    answer:
      'Dentures typically last 5-10 years before needing replacement. However, your mouth naturally changes over time, so regular adjustments may be needed to maintain proper fit and comfort. We recommend annual checkups to ensure your dentures continue to fit well and function properly.',
  },
  {
    question: 'Will dentures affect my speech?',
    answer:
      'There may be a brief adjustment period when you first get dentures. Some people notice minor changes in their speech initially, but most patients adapt quickly within a few days to a couple of weeks. Reading aloud and practicing speaking can help speed up this adjustment process.',
  },
  {
    question: 'Can I sleep with my dentures in?',
    answer:
      "It's generally recommended to remove dentures at night to give your gums a rest and maintain oral health. Wearing dentures continuously can lead to gum irritation and accelerate bone loss. Soaking them overnight in water or denture solution also helps keep them clean and maintains their shape.",
  },
  {
    question: 'How do I care for my dentures?',
    answer:
      'Proper denture care includes removing and rinsing them after eating, brushing daily with a soft-bristled denture brush and non-abrasive cleaner, handling them carefully over a soft surface, and soaking overnight in water or denture solution. Also, remember to clean your gums, tongue, and palate daily before inserting your dentures.',
  },
  {
    question: 'What is the difference between full and partial dentures?',
    answer:
      'Full dentures replace all teeth in an upper or lower arch and rest directly on the gums. Partial dentures replace only some missing teeth and attach to your remaining natural teeth using metal or plastic clasps. Your dentist will recommend the best option based on how many teeth need to be replaced and the health of your remaining teeth.',
  },
];

const benefits = [
  {
    icon: <Smile className="w-6 h-6" />,
    title: 'Restore Your Smile',
    description:
      'Modern dentures look natural and help you smile with confidence again.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Improve Eating',
    description:
      'Chew your favorite foods comfortably and enjoy a balanced, healthy diet.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Support Facial Structure',
    description:
      'Dentures help maintain facial shape and prevent the sunken appearance caused by missing teeth.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Custom Fit',
    description:
      'Each denture is custom-made to fit your mouth precisely for maximum comfort.',
  },
];

const dentureTypes = [
  {
    title: 'Complete Dentures',
    description:
      'Replace all teeth in the upper or lower arch. Available in conventional (after healing) or immediate (placed same day as extractions) options.',
    features: ['Full arch replacement', 'Rest on gums', 'Natural appearance'],
  },
  {
    title: 'Partial Dentures',
    description:
      'Ideal when some natural teeth remain. Attach to existing teeth with metal or plastic clasps for a secure, removable solution.',
    features: [
      'Replace some teeth',
      'Preserve natural teeth',
      'Removable design',
    ],
  },
  {
    title: 'Implant-Supported Dentures',
    description:
      'Anchored by dental implants for superior stability. Eliminates slipping, improves chewing function, and helps preserve jawbone.',
    features: ['Maximum stability', 'Better chewing', 'Bone preservation'],
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation',
    description:
      'Comprehensive examination to assess your oral health and discuss the best denture options for your needs and lifestyle.',
  },
  {
    step: 2,
    title: 'Impressions',
    description:
      'Precise molds are taken of your mouth to ensure your custom dentures fit perfectly and comfortably.',
  },
  {
    step: 3,
    title: 'Try-In',
    description:
      'A wax model of your dentures allows you to preview the fit and appearance before the final dentures are made.',
  },
  {
    step: 4,
    title: 'Adjustments',
    description:
      'Fine-tuning the fit to ensure maximum comfort, proper bite alignment, and natural function.',
  },
  {
    step: 5,
    title: 'Final Delivery',
    description:
      'Receive your completed dentures with detailed care instructions and guidance for the adjustment period.',
  },
];

const relatedServices = [
  {
    title: 'Dental Implants',
    description:
      'Permanent tooth replacement option or support for implant-retained dentures.',
    href: '/services/dental-implants',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Missing Teeth Solutions',
    description:
      'Explore all options for replacing missing teeth and restoring your smile.',
    href: '/services/missing-teeth',
    icon: <Check className="w-6 h-6" />,
  },
  {
    title: 'Routine Checkups',
    description:
      'Regular examinations to maintain your dentures and overall oral health.',
    href: '/services/routine-checkups',
    icon: <Calendar className="w-6 h-6" />,
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

export function DenturesContent() {
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
                    <li className="text-[#722F37] font-medium">Dentures</li>
                  </ol>
                </nav>

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Dentures
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Restore your smile and confidence with custom-fitted dentures.
                  From full dentures to partial and implant-supported options,
                  we provide comfortable, natural-looking solutions for missing
                  teeth.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                    onClick={() => (window.location.href = '/contact#book')}
                  >
                    Book Consultation
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
                    src="/images/seniors/seniors-01.jpg"
                    alt="Senior patient smiling with dentures at Ottawa South Dental"
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
                      <Smile className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e293b]">
                        Custom Fit
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Natural comfort
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
              Why Choose Dentures?
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Modern dentures offer a reliable, comfortable solution for
              replacing missing teeth and restoring your quality of life.
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
                Comfortable, Natural-Looking Tooth Replacement
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  Dentures are removable appliances that replace missing teeth
                  and surrounding tissues, helping restore your smile and oral
                  function. At Ottawa South Dental, we offer various denture
                  options tailored to your specific needs and lifestyle.
                </p>

                <p>
                  Whether you're missing all your teeth or just a few, modern
                  dentures are designed to look natural and feel comfortable.
                  Using advanced materials and precise fitting techniques, we
                  create dentures that match your facial features and provide
                  reliable function for eating and speaking.
                </p>

                <p>
                  Our experienced team will guide you through every step of the
                  process, from initial consultation to final fitting and
                  beyond. We're committed to ensuring your dentures fit well,
                  look great, and serve you comfortably for years to come.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <Heart className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">Quality Materials:</span> Our
                  dentures are crafted from durable, biocompatible materials
                  designed for comfort and longevity.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/seniors/seniors-08.jpg"
                  alt="Patient consultation for dentures at Ottawa South Dental"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Denture Types Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Types of Dentures
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              We offer a range of denture solutions to meet your unique needs
              and preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {dentureTypes.map((type, index) => (
              <div
                key={index}
                className={[
                  'p-6 rounded-2xl',
                  'bg-gradient-to-br from-white to-[#FDF8F3]/50',
                  'border border-[#EDE5DD]',
                  'transition-all duration-300',
                  'hover:shadow-soft hover:border-[#722F37]/20',
                ].join(' ')}
              >
                <h3 className="font-semibold text-lg text-[#1e293b] mb-3">
                  {type.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#722F37] flex-shrink-0" />
                      <span className="text-sm text-[#64748b]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Procedure Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              The Denture Process
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Our step-by-step process ensures your dentures fit perfectly and
              feel comfortable from day one.
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
                    index === procedureSteps.length - 1 &&
                    procedureSteps.length % 2 !== 0
                      ? 'md:col-span-2 md:max-w-md md:mx-auto'
                      : '',
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
                    Allow Time to Adjust
                  </h3>
                  <p className="text-[#64748b]">
                    New dentures may feel different at first. Most patients
                    adjust within a few weeks as the mouth adapts. We're here to
                    make any necessary adjustments to ensure your comfort.
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
                Have questions about dentures? Find answers to common questions
                below.
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
              Explore other services that complement your denture treatment.
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
                Ready to Restore Your Smile?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Schedule your denture consultation today and discover how we can
                help you smile, eat, and speak with confidence again.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => (window.location.href = '/contact#book')}
                >
                  Book Consultation
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
