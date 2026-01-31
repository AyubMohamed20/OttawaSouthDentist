'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Shield,
  Heart,
  Zap,
  Phone,
  Calendar,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Activity,
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
    question: 'Is root canal treatment painful?',
    answer:
      'Modern root canal treatment is performed with effective local anesthesia and is generally no more uncomfortable than getting a filling. Most patients report significant relief from the pain caused by the infection. Our gentle approach and advanced techniques ensure your comfort throughout the procedure.',
  },
  {
    question: 'What happens if I don\'t get a root canal?',
    answer:
      'Without treatment, the infection can spread beyond the tooth, causing an abscess, bone loss, and potentially affecting neighboring teeth. In severe cases, the infection can spread to other parts of the body. Ultimately, delaying treatment often leads to tooth extraction, which requires more complex and costly replacement options.',
  },
  {
    question: 'How successful is root canal treatment?',
    answer:
      'Root canal treatment has a very high success rate of over 95%. With proper care, including a dental crown and good oral hygiene, your treated tooth can last a lifetime. Regular checkups allow us to monitor the tooth and ensure it remains healthy.',
  },
  {
    question: 'How long does a root canal take?',
    answer:
      'Most root canal treatments can be completed in one to two appointments, depending on the complexity of the case. Each appointment typically lasts about 60-90 minutes. We\'ll provide you with a clear treatment timeline during your initial consultation.',
  },
  {
    question: 'Will I need a crown after my root canal?',
    answer:
      'In most cases, yes. A crown is recommended to protect the treated tooth, which may become more brittle after the procedure. The crown restores full function and provides long-term protection, helping your tooth last for many years to come.',
  },
];

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Save Your Natural Tooth',
    description:
      'Preserve your natural smile by treating the infection and keeping your own tooth intact.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Immediate Pain Relief',
    description:
      'Experience quick relief from the throbbing pain and sensitivity caused by tooth infection.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: '95%+ Success Rate',
    description:
      'Root canal therapy is a highly reliable treatment with excellent long-term outcomes.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Modern Technology',
    description:
      'Advanced techniques and equipment ensure precise, comfortable, and efficient treatment.',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Diagnosis',
    description:
      'We take X-rays and perform a thorough examination to assess the infection and plan your treatment.',
  },
  {
    step: 2,
    title: 'Anesthesia',
    description:
      'The area is numbed completely with local anesthesia to ensure your comfort throughout the procedure.',
  },
  {
    step: 3,
    title: 'Access',
    description:
      'A small opening is created in the crown of the tooth to access the infected pulp chamber.',
  },
  {
    step: 4,
    title: 'Cleaning',
    description:
      'The infected pulp tissue is carefully removed and the root canals are thoroughly cleaned.',
  },
  {
    step: 5,
    title: 'Shaping',
    description:
      'The canals are precisely shaped to prepare them for the filling material.',
  },
  {
    step: 6,
    title: 'Filling',
    description:
      'The canals are sealed with biocompatible gutta-percha material to prevent reinfection.',
  },
  {
    step: 7,
    title: 'Restoration',
    description:
      'A crown is placed over the tooth to restore its strength, function, and natural appearance.',
  },
];

const warningSymptoms = [
  'Severe toothache, especially when chewing',
  'Prolonged sensitivity to hot or cold',
  'Darkening or discoloration of the tooth',
  'Swelling or tenderness in nearby gums',
  'Abscess or pimple on the gums',
];

const relatedServices = [
  {
    title: 'White Fillings',
    description:
      'Natural-looking composite fillings for cavities and minor tooth damage.',
    href: '/services/white-fillings',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: 'Preventive Dentistry',
    description:
      'Comprehensive preventive care to maintain oral health and catch problems early.',
    href: '/services/preventive-dentistry',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Routine Checkups',
    description:
      'Regular examinations to catch problems early and maintain optimal oral health.',
    href: '/services/routine-checkups',
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

export function RootCanalContent() {
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
                      Root Canal Treatment
                    </li>
                  </ol>
                </nav>

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Root Canal Treatment
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Save your natural tooth with gentle, pain-free root canal
                  therapy. Our experienced team uses modern techniques to relieve
                  infection pain and preserve your smile.
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
                    src="/images/clinic/clinic-08.jpg"
                    alt="Modern dental treatment room for root canal therapy"
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
                      <Shield className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e293b]">
                        95%+ Success
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Proven treatment
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
              Why Choose Root Canal Treatment?
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Root canal therapy is a proven solution to save infected teeth and
              eliminate pain while preserving your natural smile.
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

        {/* Warning Signs Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-display font-semibold text-fluid-3xl text-[#1e293b] tracking-tight mb-6">
                When Is Root Canal Needed?
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed mb-8">
                <p>
                  Root canal treatment becomes necessary when the soft tissue
                  inside your tooth (the pulp) becomes infected or inflamed. This
                  can happen due to deep decay, repeated dental procedures, a
                  crack or chip in the tooth, or trauma.
                </p>
                <p>
                  If you&apos;re experiencing any of the following symptoms, it
                  may be time to schedule a consultation:
                </p>
              </div>

              <div className="space-y-3">
                {warningSymptoms.map((symptom, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#EDE5DD]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#722F37]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4 text-[#722F37]" />
                    </div>
                    <span className="text-[#1e293b]">{symptom}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <Phone className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">Experiencing tooth pain?</span>{' '}
                  Don&apos;t wait—early treatment can save your tooth. Call us at{' '}
                  <a
                    href="tel:+16137336446"
                    className="text-[#722F37] font-semibold hover:underline"
                  >
                    (613) 733-6446
                  </a>
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/technology/technology-05.jpg"
                  alt="Advanced dental technology for root canal diagnosis"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Procedure Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              The Root Canal Procedure
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Understanding what to expect can help ease any concerns. Here&apos;s
              a step-by-step overview of the root canal process.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {procedureSteps.slice(0, 6).map((step, index) => (
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

            {/* Final Step - Restoration */}
            <div className="mt-6">
              <div
                className={[
                  'relative p-6 rounded-2xl',
                  'bg-gradient-to-br from-[#722F37]/5 to-[#FDF8F3]',
                  'border-2 border-[#722F37]/20',
                  'transition-all duration-300',
                ].join(' ')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#722F37] text-white flex items-center justify-center font-semibold flex-shrink-0">
                    {procedureSteps[6]!.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1e293b] mb-2">
                      {procedureSteps[6]!.title}
                    </h3>
                    <p className="text-[#64748b] leading-relaxed">
                      {procedureSteps[6]!.description}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center">
                      <Check className="w-8 h-8 text-[#722F37]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">
                    Gentle, Patient-Focused Care
                  </h3>
                  <p className="text-[#64748b]">
                    Our team is dedicated to making your experience as
                    comfortable as possible. We take the time to answer your
                    questions and ensure you feel at ease throughout your
                    treatment.
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
                Have questions about root canal treatment? Find answers to common
                questions below.
              </p>
            </div>

            <FAQAccordion items={faqs} />

            <div className="mt-10 text-center">
              <p className="text-[#64748b] mb-4">
                Still have questions? We&apos;re happy to help.
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
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Related Services
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Explore other services that complement your dental care needs.
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
                Don&apos;t Let Tooth Pain Hold You Back
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Schedule your consultation today and take the first step toward
                relief. Our gentle approach makes root canal treatment
                comfortable and stress-free.
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
