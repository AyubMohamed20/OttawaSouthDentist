'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  Heart,
  Stethoscope,
  AlertCircle,
  Pill,
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
    question: 'Is tooth extraction painful?',
    answer:
      "Extractions are performed with local anesthesia so you won't feel pain during the procedure. You may feel some pressure, but no sharp pain. Some discomfort is normal during healing but is easily manageable with over-the-counter or prescribed pain medication. We'll provide detailed aftercare instructions to ensure a comfortable recovery.",
  },
  {
    question: 'How long is recovery after wisdom teeth removal?',
    answer:
      'Most patients recover within a few days to a week after wisdom teeth removal. The first 2-3 days typically involve the most swelling and discomfort, which gradually improves. Following post-operative instructions—including rest, ice application, and soft foods—helps ensure smooth healing. Most people return to normal activities within a week.',
  },
  {
    question: 'What should I eat after oral surgery?',
    answer:
      'Soft foods are recommended for the first few days after oral surgery. Good options include yogurt, smoothies, mashed potatoes, soup (not too hot), scrambled eggs, and applesauce. Avoid hard, crunchy, or spicy foods that could irritate the surgical site. Stay hydrated but avoid using straws, as the suction can dislodge blood clots.',
  },
  {
    question: 'When do wisdom teeth need to be removed?',
    answer:
      'Wisdom teeth often need removal when they are impacted (unable to emerge properly), causing crowding or damage to adjacent teeth, partially erupted and prone to infection, or causing pain and discomfort. We use X-rays and examination to determine if your wisdom teeth require removal and discuss the best timing for the procedure.',
  },
  {
    question: 'What is bone grafting and when is it needed?',
    answer:
      'Bone grafting is a procedure that rebuilds jawbone that has been lost due to tooth extraction, gum disease, or injury. It\'s often needed before dental implant placement to ensure there\'s enough bone to support the implant. The graft material encourages your body to regenerate natural bone, creating a strong foundation for future restoration.',
  },
];

const benefits = [
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Experienced Team',
    description:
      'Our skilled dental professionals have extensive training in oral surgery procedures for safe, effective care.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Gentle Approach',
    description:
      'We prioritize your comfort with careful techniques and effective anesthesia throughout every procedure.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Safe & Sterile',
    description:
      'Strict sterilization protocols and modern equipment ensure the highest standards of safety and hygiene.',
  },
  {
    icon: <Pill className="w-6 h-6" />,
    title: 'Pain Management',
    description:
      'Comprehensive pain management options keep you comfortable during and after your procedure.',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation & Examination',
    description:
      'We evaluate your oral health, take X-rays if needed, and discuss your treatment options and what to expect.',
  },
  {
    step: 2,
    title: 'Pre-Operative Preparation',
    description:
      "You'll receive instructions on how to prepare, including any medications to avoid and fasting requirements if sedation is planned.",
  },
  {
    step: 3,
    title: 'Anesthesia Administration',
    description:
      'Local anesthesia numbs the treatment area completely. Additional sedation options are available for anxious patients.',
  },
  {
    step: 4,
    title: 'Surgical Procedure',
    description:
      'The surgery is performed carefully and efficiently. For extractions, the tooth is gently loosened and removed with precision.',
  },
  {
    step: 5,
    title: 'Closure & Aftercare',
    description:
      'If needed, sutures close the site. You receive detailed aftercare instructions and any prescribed medications.',
  },
  {
    step: 6,
    title: 'Follow-Up Care',
    description:
      'We schedule a follow-up visit to monitor healing and remove sutures if necessary, ensuring optimal recovery.',
  },
];

const surgeryTypes = [
  {
    title: 'Simple Extractions',
    description: 'Removal of visible teeth that are damaged, decayed, or need to come out for orthodontic treatment.',
  },
  {
    title: 'Surgical Extractions',
    description: 'Removal of teeth that are broken at the gum line or haven\'t fully emerged, requiring incision access.',
  },
  {
    title: 'Wisdom Teeth Removal',
    description: 'Specialized extraction of impacted or problematic wisdom teeth to prevent pain and complications.',
  },
  {
    title: 'Bone Grafting',
    description: 'Rebuilding jawbone structure to prepare for dental implants or restore facial support.',
  },
  {
    title: 'Soft Tissue Procedures',
    description: 'Biopsies, lesion removal, and other soft tissue treatments for diagnosis and treatment.',
  },
  {
    title: 'Pre-Prosthetic Surgery',
    description: 'Preparing the mouth for dentures or other prosthetics by reshaping bone or removing excess tissue.',
  },
];

const relatedServices = [
  {
    title: 'Dental Implants',
    description:
      'Permanent tooth replacement that may follow extraction once the site has healed.',
    href: '/services/dental-implants',
    icon: <Check className="w-6 h-6" />,
  },
  {
    title: 'Missing Teeth Solutions',
    description:
      'Explore all options for replacing teeth after extraction, including bridges and dentures.',
    href: '/services/missing-teeth',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Root Canal Treatment',
    description:
      'An alternative to extraction that can save your natural tooth when infection is present.',
    href: '/services/root-canal',
    icon: <Heart className="w-6 h-6" />,
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

export function OralSurgeryContent() {
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
                      Oral Surgery
                    </li>
                  </ol>
                </nav>

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Oral Surgery
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Safe, comfortable oral surgery services including tooth
                  extractions, wisdom teeth removal, and bone grafting. Our
                  experienced team ensures gentle care throughout your
                  procedure.
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
                    href="tel:+16137331118"
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
                    (613) 733-1118
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-[4/3]">
                  <Image
                    src="/images/clinic/clinic-08.jpg"
                    alt="Oral surgery consultation at Ottawa South Dental"
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
                        Safe & Gentle
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Experienced care
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
              Why Choose Us for Oral Surgery?
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Our commitment to patient comfort and safety makes us a trusted
              choice for oral surgery procedures.
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
                Comprehensive Oral Surgery Care
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  Oral surgery encompasses a range of procedures designed to
                  address issues that can't be resolved with routine dental
                  care. From removing problematic teeth to preparing your jaw
                  for dental implants, our experienced team provides safe,
                  effective surgical solutions.
                </p>

                <p>
                  We understand that the thought of oral surgery can be
                  anxiety-inducing. That's why we prioritize patient comfort at
                  every step—from thorough explanations of what to expect, to
                  effective anesthesia during the procedure, to comprehensive
                  aftercare support during your recovery.
                </p>

                <p>
                  At Ottawa South Dental, we use modern techniques and equipment
                  to ensure precise, minimally invasive procedures whenever
                  possible. This approach promotes faster healing and reduces
                  post-operative discomfort.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <AlertCircle className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">Emergency Extractions:</span>{' '}
                  If you're experiencing severe tooth pain or swelling, contact
                  us immediately. We offer same-day emergency appointments when
                  possible.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/clinic/clinic-14.jpg"
                  alt="Modern oral surgery treatment room at Ottawa South Dental"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Surgery Types Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Our Oral Surgery Services
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              We offer a full range of oral surgery procedures to address
              various dental needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {surgeryTypes.map((type, index) => (
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
                      {type.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">
                      {type.description}
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
              What to Expect
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Understanding the oral surgery process helps you feel prepared and
              confident about your procedure.
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
                    Recovery Tips for Faster Healing
                  </h3>
                  <p className="text-[#64748b]">
                    Rest for the first 24 hours, apply ice to reduce swelling,
                    take prescribed medications as directed, eat soft foods, and
                    avoid smoking or using straws to ensure optimal healing.
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
                Have questions about oral surgery? Find answers to common
                questions below.
              </p>
            </div>

            <FAQAccordion items={faqs} />

            <div className="mt-10 text-center">
              <p className="text-[#64748b] mb-4">
                Still have questions? We're happy to help.
              </p>
              <a
                href="tel:+16137331118"
                className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
              >
                <Phone className="w-5 h-5" />
                Call us at (613) 733-1118
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
              Explore other services that may complement your oral surgery treatment.
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
                Need Oral Surgery?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Schedule a consultation to discuss your needs. Our experienced
                team will evaluate your situation and recommend the best
                treatment approach for you.
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
                  href="tel:+16137331118"
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
                  (613) 733-1118
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
