'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  AlertTriangle,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  Zap,
  Heart,
  Activity,
  CircleAlert,
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
    question: 'What constitutes a dental emergency?',
    answer:
      "Dental emergencies include severe toothache that doesn't respond to pain medication, knocked-out teeth, broken or cracked teeth with sharp edges or exposed nerves, lost fillings or crowns exposing sensitive tooth structure, dental abscesses (swelling with fever), uncontrolled bleeding after an extraction or injury, and injuries to the mouth, lips, or jaw. If you're unsure whether your situation is an emergency, call us and we'll help you determine the best course of action.",
  },
  {
    question: 'Can I get a same-day appointment for a dental emergency?',
    answer:
      "Yes, we prioritize dental emergencies and reserve time in our daily schedule for urgent cases. When you call with an emergency, we'll do everything possible to see you the same day, often within a few hours. For the fastest response, call us directly rather than booking online.",
  },
  {
    question: 'What should I do if a tooth is knocked out?',
    answer:
      "Time is critical for knocked-out teeth. Handle the tooth only by the crown (the white part), never the root. Gently rinse it with water if dirty, but don't scrub or remove any attached tissue. If possible, try to place the tooth back in its socket and hold it there. If you can't reinsert it, keep it moist by placing it in milk, saliva, or a tooth preservation kit. See a dentist within 30 minutes for the best chance of saving the tooth.",
  },
  {
    question: 'How can I manage dental pain before my appointment?',
    answer:
      'Take over-the-counter pain relievers like ibuprofen or acetaminophen as directed on the package. Apply a cold compress to the outside of your cheek for 15-20 minutes at a time to reduce swelling. Rinse gently with warm salt water (1/2 teaspoon salt in 8 ounces of water). Avoid very hot, cold, or sweet foods and drinks. Try to chew on the opposite side of your mouth. Do not apply aspirin directly to your gums as this can cause burns.',
  },
  {
    question: 'What if I have a dental emergency after hours?',
    answer:
      "Our office voicemail provides instructions for after-hours emergencies. For life-threatening emergencies involving difficulty breathing, severe bleeding, or trauma to the head and neck, go directly to the nearest emergency room. For dental-specific emergencies, call our office line and follow the prompts for emergency contact information.",
  },
];

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Same-Day Appointments',
    description:
      'We prioritize emergencies and work to see urgent cases the same day you call.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Immediate Pain Relief',
    description:
      'Our first priority is getting you out of pain quickly and effectively.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Expert Care',
    description:
      'Our experienced team handles all types of dental emergencies with skill and compassion.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Compassionate Approach',
    description:
      "We understand emergencies are stressful and provide calm, reassuring care.",
  },
];

const emergencyTypes = [
  {
    step: 1,
    title: 'Severe Toothache',
    description:
      'Intense, persistent tooth pain that may indicate infection, decay, or abscess requiring immediate attention.',
  },
  {
    step: 2,
    title: 'Knocked-Out Tooth',
    description:
      'Quick action is essential. With proper handling and prompt treatment, the tooth may be saved.',
  },
  {
    step: 3,
    title: 'Broken or Cracked Teeth',
    description:
      'Damage from injury or biting hard objects that exposes sensitive inner tooth structure.',
  },
  {
    step: 4,
    title: 'Lost Fillings or Crowns',
    description:
      'Missing restorations leave teeth vulnerable to further damage and sensitivity.',
  },
  {
    step: 5,
    title: 'Dental Abscess',
    description:
      'A serious infection causing swelling, fever, and severe pain that requires immediate treatment.',
  },
  {
    step: 6,
    title: 'Oral Injuries',
    description:
      'Cuts, lacerations, or trauma to the lips, gums, cheeks, or tongue that need professional care.',
  },
];

const relatedServices = [
  {
    title: 'Root Canal Therapy',
    description:
      'Save infected teeth with gentle root canal treatment to relieve pain.',
    href: '/services/root-canal',
    icon: <Activity className="w-6 h-6" />,
  },
  {
    title: 'Oral Surgery',
    description:
      'Surgical solutions for extractions and complex dental issues.',
    href: '/services/oral-surgery',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'White Fillings',
    description:
      'Restore damaged teeth with natural-looking composite fillings.',
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
              openIndex === index ? 'max-h-[500px]' : 'max-h-0',
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

export default function EmergencyCarePage() {
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
                      Emergency Care
                    </li>
                  </ol>
                </nav>

                {/* Urgent Banner */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] font-medium text-sm mb-6">
                  <AlertTriangle className="w-4 h-4" />
                  Same-Day Emergency Appointments Available
                </div>

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Emergency Dental Care
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Dental emergencies don&apos;t wait, and neither should you. We offer
                  same-day appointments for urgent dental issues to get you out of
                  pain and protect your oral health.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+16137331118"
                    className={[
                      'inline-flex items-center justify-center gap-2',
                      'px-6 py-4 rounded-xl font-semibold text-lg',
                      'bg-[#722F37] text-white',
                      'hover:bg-[#5a252c]',
                      'transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                    ].join(' ')}
                  >
                    <Phone className="w-5 h-5" />
                    Call Now: (613) 733-1118
                  </a>
                  <Link href="/contact#book">
                    <Button
                      variant="outline"
                      size="lg"
                      leftIcon={<Calendar className="w-5 h-5" />}
                    >
                      Book Online
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-[4/3]">
                  <Image
                    src="/images/hygiene/hygiene-03.jpg"
                    alt="Emergency dental care at Ottawa South Dental"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-soft-lg border border-[#EDE5DD] hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/20 flex items-center justify-center">
                      <CircleAlert className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e293b]">
                        Don&apos;t Wait
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Call immediately
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
              Why Choose Us for Dental Emergencies
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              When you&apos;re in pain, you need a dental team that responds quickly
              with expert care and genuine compassion.
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
                Fast, Effective Emergency Treatment
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  Dental emergencies can happen at any time—a sudden toothache,
                  a sports injury, or an accident that damages your teeth. When
                  they do, you need a dental team that can respond quickly and
                  provide expert care to relieve your pain and protect your smile.
                </p>

                <p>
                  At Ottawa South Dental, we understand the urgency of dental
                  emergencies. That&apos;s why we reserve time in our schedule every
                  day for emergency patients. When you call with an urgent dental
                  issue, we&apos;ll work to get you in as quickly as possible—often
                  the same day.
                </p>

                <p>
                  Our experienced team is equipped to handle all types of dental
                  emergencies, from severe toothaches and infections to broken
                  teeth and knocked-out teeth. We focus first on relieving your
                  pain, then develop a treatment plan to restore your oral health.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <AlertTriangle className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">Important:</span> If you
                  experience severe bleeding, difficulty breathing, or trauma
                  to the head and neck, go to the emergency room immediately.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/hygiene/hygiene-08.jpg"
                  alt="Dentist providing emergency dental treatment"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Emergency Types Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Common Dental Emergencies We Treat
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              We&apos;re equipped to handle all types of urgent dental situations
              quickly and effectively.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyTypes.map((item, index) => (
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

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-[#722F37]/10 border border-[#722F37]/20">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center flex-shrink-0">
                  <Phone className="w-8 h-8 text-[#722F37]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1e293b] mb-1">
                    Experiencing a Dental Emergency?
                  </h3>
                  <p className="text-[#64748b]">
                    Call us immediately at{' '}
                    <a href="tel:+16137331118" className="text-[#722F37] font-semibold hover:underline">
                      (613) 733-1118
                    </a>
                    . We&apos;ll get you in as quickly as possible.
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
                Common questions about dental emergencies and how we can help.
              </p>
            </div>

            <FAQAccordion items={faqs} />

            <div className="mt-10 text-center">
              <p className="text-[#64748b] mb-4">
                Have an emergency? Don&apos;t wait—call us now.
              </p>
              <a
                href="tel:+16137331118"
                className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
              >
                <Phone className="w-5 h-5" />
                (613) 733-1118
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
              Services often needed following dental emergencies.
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
                Dental Emergency? We&apos;re Here to Help
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Don&apos;t suffer in pain. Call us now for same-day emergency
                dental care and get the relief you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+16137331118"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-8 py-4 rounded-xl font-semibold text-lg',
                    'bg-white text-[#722F37]',
                    'hover:bg-primary-50',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#722F37]',
                  ].join(' ')}
                >
                  <Phone className="w-5 h-5" />
                  Call Now: (613) 733-1118
                </a>
                <Link
                  href="/contact#book"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-8 py-4 rounded-xl font-medium text-lg',
                    'bg-white/10 text-white border-2 border-white/20',
                    'hover:bg-white/20',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#722F37]',
                  ].join(' ')}
                >
                  <Calendar className="w-5 h-5" />
                  Book Online
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
