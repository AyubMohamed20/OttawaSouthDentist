'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  Check,
  Shield,
  Phone,
  Calendar,
  FileText,
  Users,
  Heart,
  ClipboardCheck,
  HelpCircle,
  Stethoscope,
  BadgeCheck,
  MapPin,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles,
  Clock,
  FileCheck,
  Leaf,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  HandHeart,
  HeartPulse,
  CircleDollarSign,
  UsersRound,
  BadgeDollarSign,
  Wallet,
  GraduationCap,
  Baby,
  UserRound,
  ArrowRight,
  Star,
  Zap,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is the Canadian Dental Care Plan (CDCP)?',
    answer:
      "The Canadian Dental Care Plan is a federal government program designed to help Canadians who don't have access to dental insurance. The program provides coverage for various dental services to make oral health care more accessible and affordable for eligible Canadians.",
  },
  {
    question: 'Am I eligible for CDCP?',
    answer:
      "To be eligible for CDCP, you generally must be a Canadian resident, have an adjusted family net income below the program threshold, and not have access to private dental insurance. Specific income thresholds and eligibility requirements are set by the federal government and may change.",
  },
  {
    question: 'How do I apply for CDCP?',
    answer:
      "You can apply for the Canadian Dental Care Plan through the federal government's official channels. Once approved, you'll receive documentation confirming your coverage. Bring this documentation to your dental appointment at Ottawa South Dental, and we'll take care of the billing directly.",
  },
  {
    question: 'What services does CDCP cover?',
    answer:
      'CDCP covers a range of dental services including preventive care (cleanings, checkups), diagnostic services (X-rays, exams), restorative treatments (fillings), endodontic services (root canals), periodontal services (gum treatments), prosthodontic services (dentures), and oral surgery.',
  },
  {
    question: 'Do I pay anything out of pocket with CDCP?',
    answer:
      'Depending on your income level and the specific services you receive, you may have some out-of-pocket costs. Some services may not be fully covered under the plan. Our team will explain any potential costs before proceeding with treatment.',
  },
  {
    question: 'Does Ottawa South Dental accept CDCP?',
    answer:
      'Yes! Ottawa South Dental is proud to be a registered CDCP provider. We accept CDCP and will bill the program directly for covered services. Simply bring your CDCP documentation to your appointment, and our team will handle the rest.',
  },
];

const coveredServices = [
  {
    icon: ClipboardCheck,
    title: 'Preventive Care',
    gradient: 'from-emerald-400 to-teal-500',
    lightBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    services: ['Regular checkups', 'Professional cleanings', 'Fluoride treatments'],
  },
  {
    icon: Stethoscope,
    title: 'Diagnostic Services',
    gradient: 'from-blue-400 to-indigo-500',
    lightBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    services: ['Dental examinations', 'X-rays', 'Oral health assessments'],
  },
  {
    icon: Heart,
    title: 'Restorative Treatments',
    gradient: 'from-rose-400 to-pink-500',
    lightBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    services: ['Fillings', 'Crown repairs', 'Basic restorations'],
  },
  {
    icon: Shield,
    title: 'Periodontal Services',
    gradient: 'from-amber-400 to-orange-500',
    lightBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    services: ['Gum disease treatment', 'Deep cleanings', 'Periodontal maintenance'],
  },
  {
    icon: FileText,
    title: 'Endodontic Services',
    gradient: 'from-purple-400 to-violet-500',
    lightBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    services: ['Root canal therapy', 'Pulp treatments', 'Endodontic retreatment'],
  },
  {
    icon: Users,
    title: 'Prosthodontics & Surgery',
    gradient: 'from-cyan-400 to-sky-500',
    lightBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    services: ['Dentures', 'Tooth extractions', 'Oral surgery procedures'],
  },
];

const howToUseSteps = [
  {
    step: 1,
    title: 'Apply for CDCP',
    description: 'Apply through the federal government online or by phone.',
    icon: FileCheck,
    color: 'from-rose-500 to-red-600',
  },
  {
    step: 2,
    title: 'Receive Approval',
    description: "You'll get documentation confirming your CDCP coverage.",
    icon: BadgeCheck,
    color: 'from-amber-500 to-orange-600',
  },
  {
    step: 3,
    title: 'Book Appointment',
    description: "Call us or book online. Let us know you're a CDCP member.",
    icon: Calendar,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    step: 4,
    title: 'Bring Documents',
    description: 'Bring your CDCP documentation and photo ID.',
    icon: FileText,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    step: 5,
    title: 'Receive Care',
    description: "We'll bill CDCP directly for covered services.",
    icon: Heart,
    color: 'from-purple-500 to-violet-600',
  },
];

const eligibilityQuestions = [
  {
    id: 'resident',
    question: 'Are you a Canadian resident?',
    description: 'You must be a resident of Canada to qualify.',
    icon: MapPin,
  },
  {
    id: 'insurance',
    question: 'Do you currently have dental insurance?',
    description: 'Through an employer, pension, or private coverage.',
    inverted: true,
    icon: Shield,
  },
  {
    id: 'income',
    question: 'Is your family income under $90,000?',
    description: 'Adjusted family net income threshold for eligibility.',
    icon: Wallet,
  },
  {
    id: 'taxReturn',
    question: 'Did you file a tax return last year?',
    description: 'Income is verified through CRA tax information.',
    icon: FileCheck,
  },
];

const documentChecklist = [
  { item: 'CDCP Member Card or Letter', required: true, icon: BadgeCheck },
  { item: 'Government-Issued Photo ID', required: true, icon: UserRound },
  { item: 'Previous Dental Records', required: false, icon: FileText },
  { item: 'List of Current Medications', required: false, icon: ClipboardCheck },
];

const coverageTiers = [
  {
    income: 'Under $70K',
    coverage: '100%',
    copay: '$0',
    icon: CircleDollarSign,
    highlight: true,
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    income: '$70K-$80K',
    coverage: '60%',
    copay: '40%',
    icon: Wallet,
    highlight: false,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    income: '$80K-$90K',
    coverage: '40%',
    copay: '60%',
    icon: BadgeDollarSign,
    highlight: false,
    gradient: 'from-rose-500 to-red-600',
  },
];

const eligibleGroups = [
  { icon: UserRound, label: 'Seniors 65+', description: 'Full access since 2024', color: 'from-purple-500 to-violet-600' },
  { icon: UsersRound, label: 'Adults 18-64', description: 'With disability tax credit', color: 'from-blue-500 to-indigo-600' },
  { icon: Baby, label: 'Children under 18', description: 'Based on family income', color: 'from-rose-500 to-pink-600' },
  { icon: GraduationCap, label: 'Students', description: 'Without other coverage', color: 'from-amber-500 to-orange-600' },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ============================================================================
// CUSTOM SVG COMPONENTS
// ============================================================================

function MapleLeafPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
      <defs>
        <pattern id="maple-pattern-mobile" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M30 5 L32 15 L40 12 L35 22 L45 25 L33 28 L37 38 L30 32 L23 38 L27 28 L15 25 L25 22 L20 12 L28 15 Z"
            fill="currentColor"
            className="text-[#722F37]"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#maple-pattern-mobile)" />
    </svg>
  );
}

function WaveDecoration({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      className={`w-full ${flip ? 'rotate-180' : ''} ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,90 1440,60 L1440,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FloatingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-hidden="true"
    />
  );
}

// ============================================================================
// MOBILE HERO SECTION - Premium Redesign
// ============================================================================

function MobileHeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col bg-gradient-to-b from-[#FDF8F3] via-white to-[#F8F4F0] overflow-hidden">
      {/* Premium Canada-inspired accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#722F37] via-red-500 to-[#722F37]" />

      {/* Floating orbs */}
      <FloatingOrb className="w-64 h-64 bg-[#722F37]/20 -top-20 -right-20" delay={0} />
      <FloatingOrb className="w-48 h-48 bg-red-400/15 bottom-40 -left-20" delay={2} />

      {/* Maple leaf pattern background */}
      <MapleLeafPattern />

      {/* Breadcrumb */}
      <motion.nav
        className="relative z-10 px-5 pt-6 pb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 text-xs text-neutral-500">
          <li><Link href="/" className="hover:text-[#722F37] transition-colors">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
          <li><Link href="/patient-info" className="hover:text-[#722F37] transition-colors">Patient Info</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
          <li className="text-[#722F37] font-semibold">CDCP</li>
        </ol>
      </motion.nav>

      {/* Hero Image with Parallax */}
      <motion.div
        className="relative mx-5 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#722F37]/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src="/images/patient-info/cdcp/hero-dental-care.jpg"
            alt="Patient receiving dental care with a warm smile"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#722F37]/30 to-transparent" />

        {/* Floating badges on image */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
            <span className="text-xs font-semibold text-green-700">CDCP Provider</span>
          </div>
        </motion.div>

        {/* Coverage badge */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">100%</p>
                <p className="text-[11px] text-neutral-500 font-medium">Coverage Available</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-neutral-800">9M+</p>
              <p className="text-[10px] text-neutral-500">Canadians Eligible</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="flex-1 px-5 pt-8 pb-6"
        style={{ opacity }}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Government badge */}
        <motion.div variants={fadeInUp} className="mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#722F37]/10 to-red-500/10 border border-[#722F37]/20">
            <Leaf className="w-4 h-4 text-[#722F37]" />
            <span className="text-xs font-semibold text-[#722F37]">Federal Government Program</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-[2rem] leading-[1.15] font-bold text-neutral-900 tracking-tight mb-4"
        >
          Canadian{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-red-600">
              Dental Care
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-2 bg-[#722F37]/10 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </span>{' '}
          Plan
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-base text-neutral-600 leading-relaxed mb-8"
        >
          Ottawa South Dental proudly accepts the CDCP, making quality dental care accessible to eligible Canadians.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeInUp} className="space-y-3">
          <Link
            href="/contact#book"
            className="group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-2xl shadow-xl shadow-[#722F37]/30 active:scale-[0.98] transition-all"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Appointment</span>
            <motion.div
              className="ml-1"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>

          <a
            href="tel:+16137336446"
            className="flex items-center justify-center gap-3 w-full py-3.5 bg-white text-[#722F37] font-semibold rounded-2xl border-2 border-[#722F37]/20 active:scale-[0.98] transition-all"
          >
            <Phone className="w-5 h-5" />
            (613) 733-6446
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-neutral-200/60"
        >
          {[
            { icon: Zap, label: 'Direct Billing' },
            { icon: Clock, label: 'Same-Day Care' },
            { icon: Award, label: 'No Paperwork' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-[#722F37]/5 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#722F37]" />
              </div>
              <span className="text-[10px] font-medium text-neutral-500">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// WHO QUALIFIES SECTION - Premium Cards
// ============================================================================

function MobileWhoQualifiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-14 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#FDF8F3] to-transparent" />

      <motion.div
        className="relative px-5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-red-500/10 text-[#722F37] text-xs font-semibold mb-4">
          <HandHeart className="w-3.5 h-3.5" />
          Eligibility Groups
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Who Qualifies?</h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Check if you or your family qualify for coverage.
        </p>
      </motion.div>

      {/* Premium Horizontal Scroll Cards */}
      <div className="overflow-x-auto scrollbar-hide -mx-5 px-5">
        <motion.div
          className="flex gap-4 pb-4"
          style={{ width: 'max-content' }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {eligibleGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="w-[165px] flex-shrink-0"
              >
                <motion.div
                  className="relative h-full p-5 rounded-3xl bg-white border border-neutral-100 shadow-lg shadow-neutral-200/50 overflow-hidden"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${group.color}`} />

                  {/* Icon container */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-bold text-neutral-900 text-base mb-1">{group.label}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{group.description}</p>

                  {/* Decorative corner */}
                  <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${group.color} opacity-5`} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Stats Card */}
      <motion.div
        className="mx-5 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
      >
        <div className="relative p-5 rounded-3xl bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#5a252c] overflow-hidden shadow-xl shadow-[#722F37]/30">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <UsersRound className="w-8 h-8 text-white" />
            </div>
            <div>
              <motion.p
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                9 Million+
              </motion.p>
              <p className="text-sm text-white/70">Canadians are eligible for CDCP</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// COVERAGE TIERS SECTION - Interactive Tabs
// ============================================================================

function MobileCoverageTiersSection() {
  const [activeTier, setActiveTier] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-14 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #722F37 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <motion.div
        className="relative px-5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-red-500/10 text-[#722F37] text-xs font-semibold mb-4">
          <CircleDollarSign className="w-3.5 h-3.5" />
          Income-Based Coverage
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your Coverage Level</h2>
        <p className="text-sm text-neutral-600">Coverage depends on your adjusted family income.</p>
      </motion.div>

      {/* Premium Tab Selector */}
      <div className="px-5 mb-6">
        <div className="flex gap-2 p-1.5 bg-neutral-100 rounded-2xl">
          {coverageTiers.map((tier, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTier(index)}
              className={`flex-1 py-3 px-3 rounded-xl text-sm font-semibold transition-all ${
                activeTier === index
                  ? 'bg-white text-[#722F37] shadow-lg shadow-neutral-200/50'
                  : 'text-neutral-500'
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {tier.income}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Tier Card */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-3xl p-6 overflow-hidden shadow-xl ${
              coverageTiers[activeTier]?.highlight
                ? 'bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#5a252c] shadow-[#722F37]/30'
                : 'bg-white border border-neutral-200 shadow-neutral-200/50'
            }`}
          >
            {/* Full coverage badge */}
            {coverageTiers[activeTier]?.highlight && (
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Full Coverage - No Co-pay!
              </motion.div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className={`text-sm font-medium ${coverageTiers[activeTier]?.highlight ? 'text-white/70' : 'text-neutral-500'} mb-1`}>
                  Family Income
                </p>
                <p className={`text-2xl font-bold ${coverageTiers[activeTier]?.highlight ? 'text-white' : 'text-neutral-900'}`}>
                  {coverageTiers[activeTier]?.income}
                </p>
              </div>
              <motion.div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  coverageTiers[activeTier]?.highlight
                    ? 'bg-white/15'
                    : `bg-gradient-to-br ${coverageTiers[activeTier]?.gradient}`
                }`}
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
              >
                {(() => {
                  const Icon = coverageTiers[activeTier]?.icon || CircleDollarSign;
                  return <Icon className={`w-8 h-8 ${coverageTiers[activeTier]?.highlight ? 'text-white' : 'text-white'}`} />;
                })()}
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className={`p-4 rounded-2xl ${coverageTiers[activeTier]?.highlight ? 'bg-white/10' : 'bg-emerald-50'}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <p className={`text-xs font-medium ${coverageTiers[activeTier]?.highlight ? 'text-white/70' : 'text-neutral-500'} mb-1`}>
                  CDCP Covers
                </p>
                <p className={`text-4xl font-bold ${coverageTiers[activeTier]?.highlight ? 'text-white' : 'text-emerald-600'}`}>
                  {coverageTiers[activeTier]?.coverage}
                </p>
              </motion.div>
              <motion.div
                className={`p-4 rounded-2xl ${coverageTiers[activeTier]?.highlight ? 'bg-white/10' : 'bg-neutral-50'}`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className={`text-xs font-medium ${coverageTiers[activeTier]?.highlight ? 'text-white/70' : 'text-neutral-500'} mb-1`}>
                  Your Co-pay
                </p>
                <p className={`text-4xl font-bold ${coverageTiers[activeTier]?.highlight ? 'text-white' : 'text-neutral-800'}`}>
                  {coverageTiers[activeTier]?.copay}
                </p>
              </motion.div>
            </div>

            {/* Decorative elements */}
            {coverageTiers[activeTier]?.highlight && (
              <>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="text-xs text-neutral-500 text-center mt-5">
          * Based on adjusted family net income from your tax return
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// ELIGIBILITY CHECKER - Premium Interactive Experience
// ============================================================================

function MobileEligibilityChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (currentQuestion < eligibilityQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 400);
    } else {
      setTimeout(() => setShowResult(true), 400);
    }
  };

  const resetChecker = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const isEligible = () => {
    return (
      answers['resident'] === true &&
      answers['insurance'] === false &&
      answers['income'] === true &&
      answers['taxReturn'] === true
    );
  };

  const progress = (Object.keys(answers).length / eligibilityQuestions.length) * 100;

  return (
    <section ref={containerRef} className="relative py-14 px-5 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDF8F3]/30 to-transparent" />

      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-red-500/10 text-[#722F37] text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Tool
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Check Your Eligibility</h2>
        <p className="text-sm text-neutral-600">Answer a few questions to see if you may qualify.</p>
      </motion.div>

      <motion.div
        className="relative bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xl shadow-neutral-200/50"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        {/* Premium Progress Bar */}
        <div className="h-2 bg-neutral-100">
          <motion.div
            className="h-full bg-gradient-to-r from-[#722F37] via-red-500 to-[#722F37]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          />
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                {/* Question progress dots */}
                <div className="flex items-center gap-3 mb-6">
                  {eligibilityQuestions.map((q, index) => {
                    const Icon = q.icon;
                    return (
                      <motion.div
                        key={index}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                          index === currentQuestion
                            ? 'bg-[#722F37] shadow-lg shadow-[#722F37]/30'
                            : index < currentQuestion
                            ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                            : 'bg-neutral-100'
                        }`}
                        animate={index === currentQuestion ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.5, repeat: index === currentQuestion ? Infinity : 0, repeatDelay: 1 }}
                      >
                        {index < currentQuestion ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className={`w-5 h-5 ${index === currentQuestion ? 'text-white' : 'text-neutral-400'}`} />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {eligibilityQuestions[currentQuestion]?.question}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {eligibilityQuestions[currentQuestion]?.description}
                  </p>
                </div>

                {/* Answer Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      const q = eligibilityQuestions[currentQuestion];
                      if (q) handleAnswer(q.id, true);
                    }}
                    className="flex-1 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 active:shadow-md transition-shadow"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Yes
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      const q = eligibilityQuestions[currentQuestion];
                      if (q) handleAnswer(q.id, false);
                    }}
                    className="flex-1 py-4 rounded-2xl font-bold text-base bg-neutral-100 text-neutral-700 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    No
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  className={`w-24 h-24 rounded-3xl mx-auto mb-5 flex items-center justify-center shadow-xl ${
                    isEligible()
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/30'
                      : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30'
                  }`}
                >
                  {isEligible() ? (
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  ) : (
                    <AlertCircle className="w-12 h-12 text-white" />
                  )}
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-neutral-900 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {isEligible() ? 'You May Be Eligible!' : 'Eligibility Uncertain'}
                </motion.h3>
                <motion.p
                  className="text-sm text-neutral-600 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {isEligible()
                    ? 'Based on your answers, you may qualify for CDCP. Contact us to learn more!'
                    : 'Based on your answers, you may not meet all criteria. Contact CDCP for official verification.'}
                </motion.p>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {isEligible() && (
                    <Link
                      href="/contact#book"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white rounded-2xl font-bold shadow-lg shadow-[#722F37]/30"
                    >
                      <Calendar className="w-5 h-5" />
                      Book Appointment
                    </Link>
                  )}
                  <button
                    onClick={resetChecker}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-neutral-100 text-neutral-700 rounded-2xl font-semibold"
                  >
                    Start Over
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Disclaimer */}
        <div className="px-6 pb-6">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-neutral-50">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-neutral-400" />
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              This is a preliminary check only. Actual eligibility is determined by the federal government.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// COVERED SERVICES - Premium Accordion
// ============================================================================

function MobileCoveredServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-14 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      <motion.div
        className="px-5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-red-500/10 text-[#722F37] text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Comprehensive Coverage
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Services Covered</h2>
        <p className="text-sm text-neutral-600">Tap to see what&apos;s included in each category.</p>
      </motion.div>

      <div className="px-5 space-y-3">
        {coveredServices.map((service, index) => {
          const Icon = service.icon;
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
            >
              <motion.button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full text-left"
                whileTap={{ scale: 0.99 }}
              >
                <div className={`relative p-4 rounded-2xl border-2 transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-[#722F37]/30 shadow-xl shadow-neutral-200/50'
                    : 'bg-white border-neutral-100 shadow-sm'
                }`}>
                  {/* Gradient accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-13 h-13 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                        animate={isExpanded ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <span className={`font-bold text-base transition-colors ${isExpanded ? 'text-[#722F37]' : 'text-neutral-800'}`}>
                        {service.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${isExpanded ? 'bg-[#722F37]/10' : 'bg-neutral-100'}`}
                    >
                      <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-[#722F37]' : 'text-neutral-400'}`} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-4 border-t border-neutral-100 space-y-3">
                          {service.services.map((item, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.1 }}
                            >
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                <Check className="w-3.5 h-3.5 text-white" />
                              </div>
                              <span className="text-sm text-neutral-700 font-medium">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-neutral-500 text-center mt-6 px-5">
        Coverage may vary. Some services may have limitations.
      </p>
    </section>
  );
}

// ============================================================================
// HOW TO USE STEPS - Premium Timeline
// ============================================================================

function MobileHowToUseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-14 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#722F37]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(180deg, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <motion.div
        className="relative px-5 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-red-400 text-xs font-semibold mb-4 backdrop-blur-sm">
          <ClipboardCheck className="w-3.5 h-3.5" />
          Step-by-Step Guide
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">How to Use CDCP</h2>
        <p className="text-sm text-neutral-400">Simple steps to access your benefits.</p>
      </motion.div>

      <div className="relative px-5">
        {/* Timeline Line with gradient */}
        <div className="absolute left-[29px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#722F37] via-[#722F37]/50 to-transparent" />

        <div className="space-y-6">
          {howToUseSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.12 }}
                className="relative flex gap-5"
              >
                {/* Step Number with gradient */}
                <motion.div
                  className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl flex-shrink-0`}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </motion.div>

                {/* Content Card */}
                <div className="flex-1 pb-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-red-400" />
                      <h3 className="font-bold text-white text-base">{step.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// DOCUMENT CHECKLIST - Interactive
// ============================================================================

function MobileDocumentChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const allChecked = checkedItems.size === documentChecklist.length;

  return (
    <section ref={containerRef} className="relative py-14 px-5 bg-white overflow-hidden">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-red-500/10 text-[#722F37] text-xs font-semibold mb-4">
          <FileText className="w-3.5 h-3.5" />
          Be Prepared
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">What to Bring</h2>
        <p className="text-sm text-neutral-600">Tap to check off as you prepare.</p>
      </motion.div>

      {/* Interactive Checklist */}
      <div className="space-y-3 mb-8">
        {documentChecklist.map((doc, index) => {
          const Icon = doc.icon;
          const isChecked = checkedItems.has(index);

          return (
            <motion.button
              key={index}
              onClick={() => toggleItem(index)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                isChecked
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-neutral-50 border-neutral-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated checkbox */}
              <motion.div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                  isChecked
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                    : 'bg-white border-2 border-neutral-300'
                }`}
                animate={isChecked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {isChecked && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isChecked ? 'bg-emerald-100' : 'bg-white'}`}>
                <Icon className={`w-5 h-5 ${isChecked ? 'text-emerald-600' : 'text-neutral-400'}`} />
              </div>

              {/* Text */}
              <span className={`flex-1 text-sm font-semibold transition-colors ${
                isChecked ? 'text-emerald-700' : 'text-neutral-700'
              }`}>
                {doc.item}
              </span>

              {/* Badge */}
              {doc.required ? (
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                  isChecked ? 'bg-emerald-200 text-emerald-700' : 'bg-[#722F37]/10 text-[#722F37]'
                }`}>
                  Required
                </span>
              ) : (
                <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-neutral-200 text-neutral-500">
                  Optional
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${(checkedItems.size / documentChecklist.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          />
        </div>
        <span className="text-sm font-bold text-neutral-700">
          {checkedItems.size}/{documentChecklist.length}
        </span>
      </div>

      {/* Completion celebration */}
      <AnimatePresence>
        {allChecked && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-center shadow-lg shadow-emerald-500/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Star className="w-6 h-6" />
            </motion.div>
            <p className="font-bold">You&apos;re all set!</p>
            <p className="text-sm text-white/80">Ready for your appointment</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Official Link Card */}
      <motion.a
        href="https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#FDF8F3] to-[#F5EDE5] border border-neutral-200"
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
          <ExternalLink className="w-6 h-6 text-[#722F37]" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-neutral-900">Official CDCP Website</p>
          <p className="text-xs text-neutral-500">canada.ca</p>
        </div>
        <ChevronRight className="w-5 h-5 text-neutral-400" />
      </motion.a>
    </section>
  );
}

// ============================================================================
// FAQ SECTION - Premium Accordion
// ============================================================================

function MobileFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-14 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      <motion.div
        className="px-5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-red-500/10 text-[#722F37] text-xs font-semibold mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          FAQ
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Common Questions</h2>
      </motion.div>

      <div className="px-5 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.06 }}
              className={`rounded-2xl border-2 overflow-hidden transition-all ${
                isOpen ? 'border-[#722F37]/30 bg-white shadow-xl shadow-neutral-200/50' : 'border-neutral-100 bg-white'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-5 py-4 flex items-start justify-between text-left"
                aria-expanded={isOpen}
              >
                <span className={`font-semibold text-[15px] leading-snug pr-4 transition-colors ${isOpen ? 'text-[#722F37]' : 'text-neutral-800'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isOpen ? 'bg-[#722F37]/10' : 'bg-neutral-100'}`}
                >
                  <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#722F37]' : 'text-neutral-400'}`} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <motion.div
        className="mt-8 px-5 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-neutral-500 mb-3">Still have questions?</p>
        <a
          href="tel:+16137336446"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#722F37]/10 rounded-full text-[#722F37] font-semibold text-sm"
        >
          <Phone className="w-4 h-4" />
          Call (613) 733-6446
        </a>
      </motion.div>
    </section>
  );
}

// ============================================================================
// CTA SECTION - Premium Finish
// ============================================================================

function MobileCTASection() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#5a252c] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Floating leaves */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <Leaf className="w-6 h-6 text-white/10" />
          </motion.div>
        ))}
      </div>

      <div className="relative px-5">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <motion.div
            className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <HeartPulse className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Use Your CDCP Benefits?
          </h2>
          <p className="text-white/80 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            We&apos;re here to help you make the most of your coverage. Book your appointment today.
          </p>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              href="/contact#book"
              className="group flex items-center justify-center gap-3 w-full py-4 bg-white text-[#722F37] font-bold rounded-2xl shadow-xl active:scale-[0.98] transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Your Appointment</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>

            <a
              href="tel:+16137336446"
              className="flex items-center justify-center gap-3 w-full py-3.5 text-white/90 font-semibold border-2 border-white/20 rounded-2xl backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              (613) 733-6446
            </a>
          </div>

          {/* Footer info */}
          <div className="mt-10 space-y-3">
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
              <MapPin className="w-4 h-4" />
              <span>1929 Russell Road, Suite 22, Ottawa</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
              <BadgeCheck className="w-4 h-4" />
              <span>Registered CDCP Provider</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 text-white">
        <WaveDecoration />
      </div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA BAR
// ============================================================================

function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-neutral-200 px-4 py-3"
          style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center gap-3">
            <a
              href="tel:+16137336446"
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-100 flex-shrink-0"
            >
              <Phone className="w-6 h-6 text-[#722F37]" />
            </a>
            <Link
              href="/contact#book"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-bold rounded-2xl shadow-lg shadow-[#722F37]/30"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN MOBILE COMPONENT
// ============================================================================

export function CDCPContentMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <MobileHeroSection />
      <MobileWhoQualifiesSection />
      <MobileCoverageTiersSection />
      <MobileEligibilityChecker />
      <MobileCoveredServicesSection />
      <MobileHowToUseSection />
      <MobileDocumentChecklist />
      <MobileFAQSection />
      <MobileCTASection />

      {/* Sticky Bottom CTA - appears after scrolling */}
      <StickyBottomCTA />

      {/* Bottom padding for sticky CTA */}
      <div className="h-24" />
    </main>
  );
}
