'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Baby,
  Shield,
  Heart,
  Phone,
  Calendar,
  ArrowRight,
  Smile,
  Star,
  Sparkles,
  BookOpen,
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
    question: "When should my child first visit the dentist?",
    answer:
      "We recommend bringing your child for their first dental visit by their first birthday or within 6 months of their first tooth appearing. Early visits help establish good dental habits from a young age and allow us to monitor your child's oral development. These first appointments are usually short and focused on getting your child comfortable in the dental environment.",
  },
  {
    question: "How do you help children who are nervous about the dentist?",
    answer:
      "Our team is specially trained to work with children of all ages and temperaments. We create a calm, friendly environment and use child-friendly language to explain what we're doing. We employ 'show, tell, do' techniques where we show children our tools, explain what they do in simple terms, and then gently proceed with treatment. We always go at your child's pace and celebrate their bravery.",
  },
  {
    question: "How often should my child see the dentist?",
    answer:
      "Most children should visit the dentist every 6 months for checkups and professional cleanings. However, some children may benefit from more frequent visits, especially if they're prone to cavities or have specific dental concerns. During each visit, we'll assess your child's individual needs and recommend an appropriate schedule.",
  },
  {
    question: "Are dental X-rays safe for children?",
    answer:
      "Yes, dental X-rays are very safe for children. We use digital X-rays which emit approximately 80% less radiation than traditional film X-rays. We also use lead aprons and take X-rays only when necessary for proper diagnosis. The benefits of detecting hidden problems early far outweigh the minimal radiation exposure.",
  },
  {
    question: "What can I do to prepare my child for their dental visit?",
    answer:
      "Keep the conversation positive and avoid using words that might cause fear. Read children's books about visiting the dentist, play pretend dentist at home, and let them know that the dentist is a friendly helper who keeps their smile healthy. Avoid bribing with treats, as this can send mixed messages about dental health.",
  },
];

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Gentle Approach',
    description:
      'Our caring team makes every visit comfortable and stress-free for children and parents alike.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Preventive Focus',
    description:
      'We emphasize prevention with fluoride treatments, sealants, and education to avoid cavities.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Positive Experiences',
    description:
      'Building trust early creates lifelong healthy dental habits and eliminates dental anxiety.',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Education',
    description:
      'We teach children proper brushing and flossing techniques in fun, engaging ways.',
  },
];

const servicesIncluded = [
  {
    step: 1,
    title: 'First Dental Visits',
    description:
      "Gentle introductions to dentistry for babies and toddlers, focusing on comfort and building trust.",
  },
  {
    step: 2,
    title: 'Dental Exams & Cleanings',
    description:
      'Regular checkups with age-appropriate cleanings to keep young smiles healthy and cavity-free.',
  },
  {
    step: 3,
    title: 'Fluoride Treatments',
    description:
      'Professional fluoride applications to strengthen developing teeth and prevent decay.',
  },
  {
    step: 4,
    title: 'Dental Sealants',
    description:
      "Protective coatings applied to back teeth to shield against cavities in hard-to-brush grooves.",
  },
  {
    step: 5,
    title: 'Cavity Treatment',
    description:
      'Gentle, child-friendly approach to treating cavities with tooth-colored fillings when needed.',
  },
  {
    step: 6,
    title: 'Habit Counseling',
    description:
      'Guidance on thumb-sucking, pacifier use, and other habits that can affect dental development.',
  },
];

const relatedServices = [
  {
    title: 'Preventive Dentistry',
    description:
      'Comprehensive preventive care including sealants and fluoride for the whole family.',
    href: '/services/preventive-dentistry',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Routine Checkups',
    description:
      'Regular examinations and cleanings to maintain healthy teeth and gums.',
    href: '/services/routine-checkups',
    icon: <Check className="w-6 h-6" />,
  },
  {
    title: 'Dental Hygiene',
    description:
      'Professional cleanings and hygiene education for optimal oral health.',
    href: '/services/dental-hygiene',
    icon: <Sparkles className="w-6 h-6" />,
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

export default function ChildrensDentistryPage() {
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
                      Children&apos;s Dentistry
                    </li>
                  </ol>
                </nav>

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Children&apos;s Dentistry
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Creating positive dental experiences for your little ones. Our
                  gentle, kid-friendly approach helps children develop healthy
                  habits and beautiful smiles that last a lifetime.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact#book">
                    <Button
                      variant="primary"
                      size="lg"
                      leftIcon={<Calendar className="w-5 h-5" />}
                    >
                      Book Your Child&apos;s Visit
                    </Button>
                  </Link>
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
                    src="/images/hygiene/hygiene-03.jpg"
                    alt="Child receiving gentle dental care at Ottawa South Dental"
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
                      <Baby className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e293b]">
                        First Visit by Age 1
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Recommended timing
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
              Why Choose Us for Your Child&apos;s Care
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              We understand that visiting the dentist can be daunting for children.
              Our team creates a welcoming environment where kids feel safe and excited
              about caring for their teeth.
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
                Setting the Foundation for Lifelong Oral Health
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  Children&apos;s dental care is about more than just healthy teeth—it&apos;s
                  about building confidence and establishing habits that will last a
                  lifetime. At Ottawa South Dental, we specialize in making dental
                  visits fun and educational for children of all ages.
                </p>

                <p>
                  From a child&apos;s first tooth to their teenage years, we provide
                  comprehensive care tailored to each developmental stage. Our team
                  understands child psychology and uses age-appropriate techniques
                  to ensure every visit is a positive experience.
                </p>

                <p>
                  We work closely with parents to provide guidance on nutrition,
                  oral hygiene routines, and developmental milestones. By partnering
                  together, we can help your child grow up with a healthy, beautiful
                  smile and a positive attitude toward dental care.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <Smile className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">Did you know?</span> Children
                  who have positive dental experiences early in life are more likely
                  to maintain good oral health habits as adults.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/hygiene/hygiene-08.jpg"
                  alt="Child smiling during a dental visit"
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
              Our Children&apos;s Dental Services
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Comprehensive dental care designed specifically for children, from
              infancy through adolescence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {servicesIncluded.map((item, index) => (
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
                  <Star className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">
                    Making Dental Visits Fun
                  </h3>
                  <p className="text-[#64748b]">
                    We celebrate every visit with prizes and positive reinforcement,
                    helping children look forward to their dental appointments.
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
                Common questions parents ask about children&apos;s dental care.
              </p>
            </div>

            <FAQAccordion items={faqs} />

            <div className="mt-10 text-center">
              <p className="text-[#64748b] mb-4">
                Have more questions about your child&apos;s dental health?
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
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Related Services
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Explore other services for your family&apos;s dental care needs.
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
                Give Your Child a Healthy Start
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Schedule your child&apos;s dental appointment today and set them on
                the path to a lifetime of healthy smiles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact#book">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                  >
                    Book an Appointment
                  </Button>
                </Link>
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
