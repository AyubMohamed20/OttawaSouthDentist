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
  Eye,
  Smile,
  RefreshCw,
  Target,
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
    question: 'How long does Invisalign treatment take?',
    answer:
      'Treatment typically takes 12-18 months, though this varies based on the complexity of your case. Some minor cases can be completed in as few as 6 months. During your consultation, we\'ll provide a personalized timeline based on your specific needs.',
  },
  {
    question: 'How many hours a day should I wear my aligners?',
    answer:
      'For best results, wear your aligners 20-22 hours per day, removing them only for eating, drinking (anything other than water), and oral hygiene. Consistent wear is essential for keeping your treatment on track.',
  },
  {
    question: 'Is Invisalign painful?',
    answer:
      'You may experience some pressure or mild discomfort when starting a new set of aligners, but this typically subsides within a few days. Most patients find Invisalign significantly more comfortable than traditional braces since there are no metal brackets or wires to irritate your mouth.',
  },
  {
    question: 'Can I eat and drink with Invisalign?',
    answer:
      'You should remove your aligners when eating or drinking anything other than water. This protects the aligners from damage and staining. Simply brush your teeth before putting them back in to maintain optimal oral hygiene.',
  },
  {
    question: 'Will people notice I\'m wearing aligners?',
    answer:
      'Invisalign aligners are made from clear, medical-grade plastic that\'s virtually invisible. Most people won\'t notice you\'re wearing them unless you point them out. This makes Invisalign ideal for adults and teens who want to straighten their teeth discreetly.',
  },
];

const benefits = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Nearly Invisible',
    description:
      'Clear aligners are barely noticeable, so you can smile confidently throughout treatment.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Completely Removable',
    description:
      'Take out for eating, brushing, and special occasions—no food restrictions like with braces.',
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: 'More Comfortable',
    description:
      'No metal brackets or wires means no irritation to your cheeks, lips, or gums.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Predictable Results',
    description:
      'See your projected outcome before you start with 3D digital treatment planning.',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation',
    description:
      'We assess your teeth and take digital scans to determine if Invisalign is right for you.',
  },
  {
    step: 2,
    title: 'Custom Treatment Plan',
    description:
      'Using 3D technology, we create a visualization showing your teeth\'s movement from start to finish.',
  },
  {
    step: 3,
    title: 'Aligner Fabrication',
    description:
      'Your custom aligners are precisely manufactured based on your unique treatment plan.',
  },
  {
    step: 4,
    title: 'Treatment Begins',
    description:
      'Wear each set of aligners for 1-2 weeks, switching to the next set as your teeth gradually shift.',
  },
  {
    step: 5,
    title: 'Progress Checkups',
    description:
      'Regular visits every 6-8 weeks to monitor progress and receive your next sets of aligners.',
  },
  {
    step: 6,
    title: 'Completion & Retention',
    description:
      'Once treatment is complete, retainers help maintain your beautiful new smile for years to come.',
  },
];

const conditionsTreated = [
  {
    title: 'Crowded Teeth',
    description: 'When teeth overlap due to insufficient space in the jaw.',
  },
  {
    title: 'Gaps Between Teeth',
    description: 'Spaces between teeth caused by abnormal growth or missing teeth.',
  },
  {
    title: 'Overbite',
    description: 'When upper front teeth extend too far over the lower teeth.',
  },
  {
    title: 'Underbite',
    description: 'When lower teeth protrude past the upper front teeth.',
  },
  {
    title: 'Crossbite',
    description: 'When some upper teeth sit inside the lower teeth when biting down.',
  },
  {
    title: 'Open Bite',
    description: 'When upper and lower teeth don\'t meet when the mouth is closed.',
  },
];

const relatedServices = [
  {
    title: 'Teeth Whitening',
    description:
      'Complete your new smile with professional whitening after your Invisalign treatment.',
    href: '/services/teeth-whitening',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: 'Dental Veneers',
    description:
      'Enhance your smile further with porcelain veneers for a perfect finish.',
    href: '/services/veneers',
    icon: <Smile className="w-6 h-6" />,
  },
  {
    title: 'Routine Checkups',
    description:
      'Regular examinations to maintain your smile and overall oral health.',
    href: '/services/routine-checkups',
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

export function InvisalignContent() {
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
                    <li className="text-[#722F37] font-medium">Invisalign</li>
                  </ol>
                </nav>

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Invisalign
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Straighten your teeth discreetly with Invisalign clear
                  aligners—virtually invisible, completely removable, and
                  designed for your comfort. See your beautiful results before
                  treatment even begins.
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
                    src="/images/cosmetic/cosmetic-08.jpg"
                    alt="Patient with beautiful smile after Invisalign treatment at Ottawa South Dental"
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
                      <Eye className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e293b]">
                        Virtually Invisible
                      </p>
                      <p className="text-sm text-[#64748b]">Clear aligners</p>
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
              Why Choose Invisalign?
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Invisalign offers significant advantages over traditional braces
              for a more comfortable, convenient orthodontic experience.
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
                A Modern Approach to Straighter Teeth
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  Invisalign is a revolutionary orthodontic treatment that
                  straightens teeth using a series of custom-made, clear plastic
                  aligners. Unlike traditional metal braces, these aligners are
                  virtually invisible and can be removed for eating, drinking,
                  and cleaning your teeth.
                </p>

                <p>
                  Each set of aligners is worn for 1-2 weeks before moving to
                  the next set in the series. As you progress through the
                  aligners, your teeth gradually shift into their ideal
                  positions. The entire process is mapped out digitally before
                  you begin, so you can see your projected results from day one.
                </p>

                <p>
                  At Ottawa South Dental, we use advanced 3D scanning technology
                  to create precise treatment plans tailored to your unique
                  smile. Whether you have crowded teeth, gaps, or bite issues,
                  Invisalign can help you achieve the straight, beautiful smile
                  you've always wanted.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <Clock className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">Fewer Office Visits:</span>{' '}
                  Invisalign typically requires checkups every 6-8 weeks, less
                  frequent than traditional braces adjustments.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/cosmetic/cosmetic-14.jpg"
                  alt="Invisalign clear aligners being held by patient"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Conditions Treated Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Conditions We Treat with Invisalign
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Invisalign can effectively address a wide range of orthodontic
              concerns for both teens and adults.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {conditionsTreated.map((condition, index) => (
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
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#722F37] text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e293b] mb-2">
                      {condition.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">
                      {condition.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Procedure Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              How Invisalign Works
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Your journey to a straighter smile follows a simple, well-defined
              process from consultation to completion.
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
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">
                    See Your Results Before You Start
                  </h3>
                  <p className="text-[#64748b]">
                    Our 3D treatment planning technology shows you exactly how
                    your teeth will move and what your final smile will look
                    like—before you even begin treatment.
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
                Have questions about Invisalign? Find answers to common
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
              Explore other services that complement your Invisalign treatment.
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
                Ready for a Straighter Smile?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Schedule your Invisalign consultation today and discover how
                clear aligners can transform your smile discreetly and
                comfortably.
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
