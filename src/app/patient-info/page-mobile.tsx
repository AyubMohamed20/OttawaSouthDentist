'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UserPlus,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Phone,
  Calendar,
  CheckCircle2,
  Heart,
  Languages,
  Clock,
  FileText,
  Download,
  HelpCircle,
  ChevronDown,
  Sparkles,
  BookOpen,
  ClipboardList,
  Stethoscope,
  Shield,
  MessageCircle,
  MapPin,
  HeartHandshake,
  Smile,
  CalendarCheck,
  ClipboardPen,
  Building2,
  Lock,
  ChevronsRight,
  Star,
  Users,
  Wallet,
  FileCheck,
  CircleCheck,
  ArrowUpRight,
  ChevronRight,
  HeartPulse,
  HandHeart,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ============================================================================
// DATA
// ============================================================================

const patientInfoSections = [
  {
    title: 'New Patients',
    description: 'Everything you need before your first visit',
    href: '/patient-info/new-patients',
    icon: UserPlus,
    color: 'from-emerald-500 to-teal-600',
    bgGlow: 'bg-emerald-500/20',
    highlights: ['First visit checklist', 'Patient forms', 'What to expect'],
    badge: 'Start Here',
  },
  {
    title: 'Payment & Insurance',
    description: 'Flexible options for your convenience',
    href: '/patient-info/payment-insurance',
    icon: Wallet,
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/20',
    highlights: ['Direct billing', 'Payment plans', 'Treatment estimates'],
    badge: 'Flexible',
  },
  {
    title: 'CDCP Coverage',
    description: 'Canadian Dental Care Plan accepted',
    href: '/patient-info/cdcp',
    icon: ShieldCheck,
    color: 'from-[#722F37] to-[#8B3A42]',
    bgGlow: 'bg-[#722F37]/20',
    highlights: ['Eligibility info', 'Covered services', 'How to enroll'],
    badge: 'Federal Plan',
  },
];

const quickStats = [
  { icon: Heart, value: 'Patient-First', label: 'Care Philosophy' },
  { icon: Languages, value: '7+', label: 'Languages' },
  { icon: Clock, value: 'Sat 9-2', label: 'Weekend Hours' },
  { icon: Users, value: '15K+', label: 'Happy Patients' },
];

const downloadableForms = [
  {
    title: 'New Patient Registration',
    description: 'Complete before your first visit',
    fileType: 'PDF',
    fileSize: '245 KB',
    icon: ClipboardList,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Medical History Form',
    description: 'Important health information',
    fileType: 'PDF',
    fileSize: '180 KB',
    icon: Stethoscope,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Insurance Claim Form',
    description: 'Manual insurance submissions',
    fileType: 'PDF',
    fileSize: '120 KB',
    icon: Shield,
    color: 'from-violet-500 to-purple-500',
  },
  {
    title: 'Consent Forms',
    description: 'Treatment documentation',
    fileType: 'PDF',
    fileSize: '95 KB',
    icon: FileCheck,
    color: 'from-amber-500 to-orange-500',
  },
];

const faqItems = [
  {
    question: 'Do you accept walk-ins?',
    answer:
      'While we do accept walk-ins when possible, we recommend booking an appointment. For emergencies, please call us immediately.',
  },
  {
    question: 'What insurance do you accept?',
    answer:
      'We accept most major dental insurance providers and offer direct billing. We also proudly accept the Canadian Dental Care Plan (CDCP).',
  },
  {
    question: 'How early should I arrive?',
    answer:
      'New patients: 15 minutes early. Returning patients: 5 minutes before your scheduled appointment.',
  },
  {
    question: 'What payment methods accepted?',
    answer:
      'Cash, debit (Interac), Visa, MasterCard, and American Express. Payment plans available for larger treatments.',
  },
];

const patientJourneySteps = [
  {
    icon: Phone,
    title: 'Book',
    description: 'Call or book online',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ClipboardPen,
    title: 'Prepare',
    description: 'Complete your forms',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Building2,
    title: 'Arrive',
    description: '15 minutes early',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Stethoscope,
    title: 'Care',
    description: 'Personalized treatment',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Smile,
    title: 'Smile',
    description: 'Leave confident',
    color: 'from-[#722F37] to-rose-500',
  },
];

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-300/10 blur-3xl"
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      style={{ top: '-10%', right: '-20%' }}
    />
    <motion.div
      className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-emerald-300/10 to-teal-300/10 blur-3xl"
      animate={{
        x: [0, -20, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{ bottom: '10%', left: '-15%' }}
    />
  </div>
);

const DotPattern = () => (
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, #722F37 1px, transparent 0)`,
      backgroundSize: '20px 20px',
    }}
    aria-hidden="true"
  />
);

// ============================================================================
// HERO SECTION - IMMERSIVE MOBILE EXPERIENCE
// ============================================================================

function MobileHeroSection() {
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-gradient-to-b from-[#FDF8F3] via-white to-white"
    >
      <FloatingOrbs />
      <DotPattern />

      {/* Hero Image Container with Parallax */}
      <motion.div
        style={{ y: imageY }}
        className="relative w-full h-[45vh] min-h-[280px] max-h-[360px]"
      >
        <Image
          src="/images/patient-info/mobile/hero-patient-smiling.jpg"
          alt="Happy patient smiling at dental clinic"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDF8F3] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/10 via-transparent to-transparent" />

        {/* Floating Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-6 left-4 right-4"
        >
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl shadow-black/5 border border-white/50">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">Welcoming Care</p>
              <p className="text-xs text-foreground-secondary">Your comfort is our priority</p>
            </div>
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex-1 px-5 pt-6 pb-8 flex flex-col"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex-1"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-100 text-[#722F37] text-sm font-semibold">
              <CalendarCheck className="w-4 h-4" />
              Your Patient Resource Hub
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="font-display font-bold text-[2rem] leading-[1.15] text-foreground mb-4"
          >
            Patient{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37]">
                Information
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base text-foreground-secondary leading-relaxed mb-6"
          >
            Everything you need to know about visiting Ottawa South Dental — from your first
            appointment to insurance questions.
          </motion.p>

          {/* Quick Stats Row */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  className="flex-shrink-0 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-2.5 border border-[#EDE5DD] shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm leading-tight">{stat.value}</p>
                    <p className="text-[10px] text-foreground-secondary leading-tight">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-3"
        >
          <Link href="/contact" className="block">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                variant="primary"
                size="lg"
                className="w-full py-4 text-base shadow-lg shadow-[#722F37]/20"
                leftIcon={<Calendar className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book Your Appointment
              </Button>
            </motion.div>
          </Link>

          <motion.a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center justify-center gap-2.5 py-3.5 text-[#722F37] font-semibold rounded-xl border-2 border-[#722F37]/20 active:bg-[#722F37]/5 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-4 h-4" />
            <span>{formattedPhone}</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// PATIENT JOURNEY - HORIZONTAL SCROLL WITH SNAP
// ============================================================================

function MobilePatientJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-12 bg-white overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="px-5 mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">Your Journey</h2>
            <p className="text-xs text-foreground-secondary">From first call to confident smile</p>
          </div>
        </div>
      </motion.div>

      {/* Horizontal Scroll Journey */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-4 px-5 pb-4" style={{ width: 'max-content' }}>
            {patientJourneySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="snap-start"
              >
                <motion.div
                  className="relative w-[140px] bg-gradient-to-br from-white to-[#FDF8F3] rounded-2xl p-4 border border-[#EDE5DD] shadow-sm"
                  whileTap={{ scale: 0.96 }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#722F37] text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 shadow-md`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-foreground text-base mb-0.5">{step.title}</h4>
                  <p className="text-xs text-foreground-secondary leading-snug">{step.description}</p>

                  {/* Connector Line */}
                  {index < patientJourneySteps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-gradient-to-r from-[#722F37]/30 to-transparent" />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#722F37]/40"
          >
            <ChevronsRight className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// NAVIGATION CARDS - PREMIUM EXPANDABLE CARDS
// ============================================================================

function MobileNavigationCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-12 bg-gradient-to-b from-white to-[#FDF8F3] px-5">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#5a252c] mb-4 shadow-xl shadow-[#722F37]/20"
        >
          <HandHeart className="w-7 h-7 text-white" />
        </motion.div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">How Can We Help?</h2>
        <p className="text-sm text-foreground-secondary">Select a topic to explore</p>
      </motion.div>

      {/* Cards */}
      <div className="space-y-4">
        {patientInfoSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          >
            <NavigationCard section={section} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function NavigationCard({
  section,
  index,
}: {
  section: (typeof patientInfoSections)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-[#EDE5DD] overflow-hidden shadow-sm"
    >
      {/* Card Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center gap-4 text-left"
        whileTap={{ backgroundColor: 'rgba(114, 47, 55, 0.02)' }}
      >
        {/* Icon with Glow */}
        <div className="relative">
          <div className={`absolute inset-0 rounded-xl ${section.bgGlow} blur-lg`} />
          <div
            className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}
          >
            <section.icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-foreground">{section.title}</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-[10px] font-bold uppercase tracking-wide">
              {section.badge}
            </span>
          </div>
          <p className="text-sm text-foreground-secondary line-clamp-1">{section.description}</p>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FDF8F3] flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-[#722F37]" />
        </motion.div>
      </motion.button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#EDE5DD] to-transparent mb-4" />

              {/* Highlights */}
              <ul className="space-y-2.5 mb-5">
                {section.highlights.map((highlight, hIndex) => (
                  <motion.li
                    key={hIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: hIndex * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <CircleCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-foreground-secondary">{highlight}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href={section.href} className="block">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="w-full py-3.5 text-[#722F37] border-[#722F37]/20 font-semibold"
                    rightIcon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// DOWNLOADABLE FORMS - SLEEK CARDS
// ============================================================================

function MobileDownloadableForms() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-12 bg-[#FDF8F3] px-5">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg">
          <Download className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">Quick Forms</h2>
          <p className="text-xs text-foreground-secondary">Save time, complete before you visit</p>
        </div>
      </motion.div>

      {/* Forms Grid - 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        {downloadableForms.map((form, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <motion.button
              className="w-full bg-white rounded-xl p-4 border border-[#EDE5DD] text-left shadow-sm h-full flex flex-col"
              whileTap={{ scale: 0.97 }}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${form.color} flex items-center justify-center mb-3 shadow-md`}
              >
                <form.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1 leading-tight">
                {form.title}
              </h3>
              <p className="text-xs text-foreground-secondary mb-3 leading-snug flex-1">
                {form.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FDF8F3] text-neutral-600 font-medium">
                  {form.fileType} • {form.fileSize}
                </span>
                <Download className="w-4 h-4 text-[#722F37]" />
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION - ELEGANT ACCORDION
// ============================================================================

function MobileFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-12 bg-white px-5">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4 shadow-xl shadow-amber-500/20"
        >
          <HelpCircle className="w-7 h-7 text-white" />
        </motion.div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">Quick Answers</h2>
        <p className="text-sm text-foreground-secondary">Common questions answered</p>
      </motion.div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
          >
            <motion.div
              layout
              className={`rounded-xl border overflow-hidden transition-colors ${
                openIndex === index
                  ? 'border-[#722F37]/30 bg-gradient-to-br from-white to-[#FDF8F3]'
                  : 'border-[#EDE5DD] bg-white'
              }`}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 flex items-start gap-3 text-left"
                whileTap={{ backgroundColor: 'rgba(114, 47, 55, 0.02)' }}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                    openIndex === index
                      ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-md'
                      : 'bg-[#FDF8F3]'
                  }`}
                >
                  <MessageCircle
                    className={`w-4 h-4 transition-colors ${
                      openIndex === index ? 'text-white' : 'text-[#722F37]'
                    }`}
                  />
                </div>
                <span className="flex-1 font-medium text-foreground text-sm pt-1 leading-snug">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 pt-1"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-colors ${
                      openIndex === index ? 'text-[#722F37]' : 'text-neutral-400'
                    }`}
                  />
                </motion.div>
              </motion.button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 pl-[52px] text-sm text-foreground-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// PATIENT PORTAL TEASER - PREMIUM DARK SECTION
// ============================================================================

function MobilePatientPortal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const features = [
    { icon: Calendar, label: 'View appointments' },
    { icon: FileText, label: 'Access records' },
    { icon: MessageCircle, label: 'Message dentist' },
    { icon: CreditCard, label: 'Online bill pay' },
  ];

  return (
    <section ref={ref} className="relative py-14 px-5 overflow-hidden">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />

      {/* Animated Accent Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-[#722F37]/20 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: '-20%', right: '-30%' }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-rose-500/10 blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{ bottom: '-10%', left: '-20%' }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-5"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
          </motion.div>
          <span className="text-white/90 text-sm font-semibold">Coming Soon</span>
        </motion.div>

        {/* Heading */}
        <h2 className="font-display font-bold text-2xl text-white mb-3 leading-tight">
          Your Personal{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-400">
            Patient Portal
          </span>
        </h2>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          Manage your dental care anytime, anywhere — appointments, records, and more in one secure
          place.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="flex items-center gap-2.5 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center">
                <feature.icon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white/80 text-xs font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="w-full relative group overflow-hidden rounded-xl"
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#722F37] to-[#8B3A42]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B3A42] to-rose-500 opacity-0 group-active:opacity-100 transition-opacity" />
          <div className="relative flex items-center justify-center gap-2 py-4 text-white font-semibold">
            <Lock className="w-4 h-4" />
            Get Notified When Available
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}

// ============================================================================
// RESOURCE LIBRARY - VISUAL GRID
// ============================================================================

function MobileResourceLibrary() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const resources = [
    { icon: BookOpen, label: 'Guides', count: 12, color: 'from-blue-500 to-cyan-500' },
    { icon: FileText, label: 'Forms', count: 8, color: 'from-emerald-500 to-teal-500' },
    { icon: HelpCircle, label: 'FAQs', count: 24, color: 'from-amber-500 to-orange-500' },
    { icon: MessageCircle, label: 'Support', count: 5, color: 'from-violet-500 to-purple-500' },
  ];

  return (
    <section ref={ref} className="py-12 bg-gradient-to-b from-white to-[#FDF8F3] px-5">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 mb-3 shadow-lg shadow-blue-500/20">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-display font-bold text-xl text-foreground mb-1">Resource Library</h2>
        <p className="text-xs text-foreground-secondary">Helpful materials at your fingertips</p>
      </motion.div>

      {/* Resource Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <motion.button
              className="w-full bg-white rounded-xl p-4 border border-[#EDE5DD] text-center shadow-sm"
              whileTap={{ scale: 0.96 }}
            >
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${resource.color} mb-2.5 shadow-md`}
              >
                <resource.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-0.5">{resource.label}</h3>
              <div className="flex items-center justify-center gap-1 text-xs text-[#722F37] font-medium">
                {resource.count} items
                <ChevronRight className="w-3 h-3" />
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Browse All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/resources"
          className="flex items-center justify-center gap-2 text-[#722F37] font-semibold text-sm"
        >
          Browse All Resources
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}

// ============================================================================
// CONTACT CTA - WARM GRADIENT
// ============================================================================

function MobileContactCTA() {
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative py-14 px-5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-white/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '-30%', right: '-20%' }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5"
        >
          <HeartPulse className="w-7 h-7 text-white" />
        </motion.div>

        <h2 className="font-display font-bold text-2xl text-white mb-2">Have Questions?</h2>
        <p className="text-white/80 text-sm mb-8">Our friendly team is here to help you smile.</p>

        <div className="space-y-3">
          <Link href="/contact" className="block">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                variant="secondary"
                className="w-full py-4 bg-white text-[#722F37] font-semibold shadow-lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Contact Us
              </Button>
            </motion.div>
          </Link>

          <motion.a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center justify-center gap-2 py-3.5 text-white/90 font-medium rounded-xl border border-white/20 active:bg-white/10 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-4 h-4" />
            {formattedPhone}
          </motion.a>
        </div>

        <p className="text-white/50 text-xs mt-6">Same-day emergency appointments available</p>
      </motion.div>
    </section>
  );
}

// ============================================================================
// FLOATING BOTTOM CTA
// ============================================================================

function MobileFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  // Show after scrolling past hero
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { scrollY } = useScroll();
    scrollY.on('change', (latest) => {
      setIsVisible(latest > 400);
    });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-white/50 p-3">
            <div className="flex gap-3">
              <motion.a
                href={`tel:${contactInfo.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#722F37] text-[#722F37] font-semibold text-sm"
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" />
                Call
              </motion.a>
              <Link href="/contact" className="flex-[2]">
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="primary"
                    className="w-full py-3.5 text-sm shadow-lg shadow-[#722F37]/20"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book Appointment
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PatientInfoPageMobile() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col pb-24">
      {/* Hero Section */}
      <MobileHeroSection />

      {/* Patient Journey - Horizontal Scroll */}
      <MobilePatientJourney />

      {/* Navigation Cards */}
      <MobileNavigationCards />

      {/* Downloadable Forms */}
      <MobileDownloadableForms />

      {/* FAQ Section */}
      <MobileFAQSection />

      {/* Patient Portal Teaser */}
      <MobilePatientPortal />

      {/* Resource Library */}
      <MobileResourceLibrary />

      {/* Contact CTA */}
      <MobileContactCTA />

      {/* Floating Bottom CTA */}
      <MobileFloatingCTA />
    </main>
  );
}
