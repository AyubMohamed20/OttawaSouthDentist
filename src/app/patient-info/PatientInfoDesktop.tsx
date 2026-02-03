'use client';

import { useState, useRef, useCallback } from 'react';
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
  User,
  Lock,
  Sparkles,
  BookOpen,
  ClipboardList,
  Stethoscope,
  Shield,
  ChevronsRight,
  MessageCircle,
  Search,
  BadgeInfo,
  MapPin,
  Handshake,
  ClipboardCheck,
  CircleDot,
  ArrowDown,
  HeartHandshake,
  Smile,
  CalendarCheck,
  ClipboardPen,
  Building2,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// DATA
// ============================================================================

const patientInfoSections = [
  {
    title: 'New Patients',
    description:
      'Everything you need to know before your first visit. Required documents, what to expect, and how to prepare for your appointment.',
    href: '/patient-info/new-patients',
    icon: UserPlus,
    color: 'from-emerald-500 to-teal-600',
    bgGlow: 'bg-emerald-500/20',
    highlights: [
      'First visit checklist',
      'Patient registration forms',
      'What to expect',
      'Office policies',
    ],
  },
  {
    title: 'Payment & Insurance',
    description:
      'We accept most major insurance providers and offer flexible payment options. Learn about our billing process and accepted payment methods.',
    href: '/patient-info/payment-insurance',
    icon: CreditCard,
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/20',
    highlights: [
      'Direct insurance billing',
      'Flexible payment options',
      'Treatment estimates',
      'No-interest financing',
    ],
  },
  {
    title: 'Canadian Dental Care Plan (CDCP)',
    description:
      'Ottawa South Dental is proud to accept the Canadian Dental Care Plan. Learn how to access dental coverage through this federal program.',
    href: '/patient-info/cdcp',
    icon: ShieldCheck,
    color: 'from-[#722F37] to-[#5a252c]',
    bgGlow: 'bg-[#722F37]/20',
    highlights: [
      'CDCP eligibility info',
      'Covered services',
      'How to enroll',
      'Direct billing available',
    ],
  },
];

const quickFacts = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'Your comfort and well-being are our top priorities.',
  },
  {
    icon: Languages,
    title: '7 Languages Spoken',
    description: 'English, French, Spanish, Hindi, Punjabi, Farsi, Arabic.',
  },
  {
    icon: Clock,
    title: 'Convenient Hours',
    description: 'Open Monday-Friday 9am-5pm, Saturday 9am-2pm.',
  },
  {
    icon: ShieldCheck,
    title: 'CDCP Accepted',
    description: 'We accept the Canadian Dental Care Plan.',
  },
];

const downloadableForms = [
  {
    title: 'New Patient Registration',
    description: 'Complete this form before your first visit',
    fileType: 'PDF',
    fileSize: '245 KB',
    icon: ClipboardList,
  },
  {
    title: 'Medical History Form',
    description: 'Important health information for safe treatment',
    fileType: 'PDF',
    fileSize: '180 KB',
    icon: Stethoscope,
  },
  {
    title: 'Insurance Claim Form',
    description: 'For manual insurance submissions',
    fileType: 'PDF',
    fileSize: '120 KB',
    icon: Shield,
  },
  {
    title: 'Consent Forms',
    description: 'Treatment consent documentation',
    fileType: 'PDF',
    fileSize: '95 KB',
    icon: FileText,
  },
];

const faqItems = [
  {
    question: 'Do you accept walk-ins?',
    answer:
      'While we do accept walk-ins when possible, we recommend booking an appointment to ensure you receive timely care. For emergencies, please call us immediately.',
  },
  {
    question: 'What insurance do you accept?',
    answer:
      'We accept most major dental insurance providers and offer direct billing. We also proudly accept the Canadian Dental Care Plan (CDCP).',
  },
  {
    question: 'How early should I arrive?',
    answer:
      'For new patients, please arrive 15 minutes early to complete paperwork. Returning patients can arrive 5 minutes before their scheduled appointment.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cash, debit (Interac), Visa, MasterCard, and American Express. We can also discuss payment plans for larger treatments.',
  },
];

const resourceCategories = [
  { icon: BookOpen, label: 'Guides', count: 12 },
  { icon: FileText, label: 'Forms', count: 8 },
  { icon: HelpCircle, label: 'FAQs', count: 24 },
  { icon: MessageCircle, label: 'Support', count: 5 },
];

const patientJourneySteps = [
  {
    icon: Phone,
    title: 'Book Appointment',
    description: 'Call or book online',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ClipboardPen,
    title: 'Complete Forms',
    description: 'Fill out paperwork',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Building2,
    title: 'Visit Our Clinic',
    description: 'Arrive 15 min early',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Stethoscope,
    title: 'Dental Exam',
    description: 'Comprehensive care',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Smile,
    title: 'Healthy Smile',
    description: 'Leave happy',
    color: 'from-[#722F37] to-rose-500',
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 3, -3, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

// ============================================================================
// HOOKS
// ============================================================================

function useMagnetic(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      x.set(deltaX);
      y.set(deltaY);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x: springX, y: springY, handleMouseMove, handleMouseLeave };
}

// ============================================================================
// SVG ILLUSTRATIONS
// ============================================================================

// Patient Journey Flow Illustration
function PatientJourneyIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative py-16"
    >
      {/* Desktop Flow - Horizontal */}
      <div className="hidden lg:flex items-center justify-between max-w-5xl mx-auto relative">
        {/* Connecting Line */}
        <svg
          className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="25%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="75%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#722F37" />
            </linearGradient>
          </defs>
          <motion.line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={isInView && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>

        {patientJourneySteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.15 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl mb-4`}
            >
              <step.icon className="w-10 h-10 text-white" />
            </motion.div>
            <h4 className="font-semibold text-foreground text-sm">{step.title}</h4>
            <p className="text-xs text-foreground-secondary mt-1">{step.description}</p>

            {/* Step number badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold text-[#722F37]">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Flow - Vertical */}
      <div className="lg:hidden flex flex-col items-center gap-4 max-w-xs mx-auto">
        {patientJourneySteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
            className="relative w-full"
          >
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#EDE5DD] shadow-sm">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{step.title}</h4>
                <p className="text-sm text-foreground-secondary">{step.description}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#722F37]/10 flex items-center justify-center text-sm font-bold text-[#722F37]">
                {index + 1}
              </div>
            </div>

            {/* Connector arrow */}
            {index < patientJourneySteps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="w-5 h-5 text-[#722F37]/30" aria-hidden="true" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Decorative dental-themed SVG shapes
function DecorativeShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Abstract tooth shape */}
      <svg
        className="absolute top-20 right-10 w-32 h-32 opacity-5"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 10c-15 0-25 12-25 30 0 10 5 20 10 30 3 6 5 15 5 20 0 5 5 10 10 10s10-5 10-10c0-5 2-14 5-20 5-10 10-20 10-30 0-18-10-30-25-30z" />
      </svg>

      {/* Plus symbols for medical theme */}
      <svg
        className="absolute bottom-40 left-20 w-16 h-16 opacity-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
      </svg>

      {/* Smile curve */}
      <svg
        className="absolute top-1/3 left-10 w-24 h-24 opacity-5"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      >
        <path d="M20 40 Q50 80 80 40" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Animated Background Orbs
function FloatingOrbs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        variants={prefersReducedMotion ? {} : floatingVariants}
        animate={prefersReducedMotion ? {} : 'animate'}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(114, 47, 55, 0.15) 0%, transparent 70%)',
        }}
      />
      <motion.div
        variants={prefersReducedMotion ? {} : floatingVariants}
        animate={prefersReducedMotion ? {} : 'animate'}
        className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
        }}
      />
      <motion.div
        variants={prefersReducedMotion ? {} : pulseVariants}
        animate={prefersReducedMotion ? {} : 'animate'}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// Hero Section with Image
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const prefersReducedMotion = useReducedMotion();

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5] overflow-hidden"
    >
      <FloatingOrbs />
      <DecorativeShapes />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23722F37' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            style={prefersReducedMotion ? {} : { y, opacity }}
            className="relative z-10"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-[#722F37]/5 border border-[#722F37]/20 text-[#722F37] text-sm font-medium mb-8"
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <BadgeInfo className="w-4 h-4" />
              </motion.div>
              Your Patient Resource Hub
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1]"
            >
              Patient
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37]"
              >
                Information
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl text-foreground-secondary max-w-2xl leading-relaxed"
            >
              Everything you need to know about visiting Ottawa South Dental. From
              your first appointment to insurance questions, we have got you covered.
            </motion.p>

            <QuickSearchBar />
            <HeroCTAButtons />
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#722F37]/20 to-teal-500/20 rounded-3xl blur-2xl" aria-hidden="true" />

            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
              <Image
                src="/images/patient-info/hero-patient-smile.jpg"
                alt="Friendly patient smiling in our modern dental clinic"
                width={940}
                height={650}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/20 to-transparent" aria-hidden="true" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-[#EDE5DD]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Welcoming Care</p>
                  <p className="text-sm text-foreground-secondary">Every patient matters</p>
                </div>
              </div>
            </motion.div>

            {/* Second floating element */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-[#EDE5DD]"
            >
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-[#722F37]" />
                <span className="text-sm font-medium text-foreground">Easy Booking</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Quick Access Search Bar
function QuickSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-10 max-w-xl"
    >
      <motion.div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          isFocused
            ? 'ring-2 ring-[#722F37]/30 shadow-xl shadow-[#722F37]/10'
            : 'shadow-lg'
        }`}
        animate={prefersReducedMotion ? {} : {
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
        <div className="relative flex items-center gap-3 px-5 py-4">
          <Search className="w-5 h-5 text-neutral-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search patient resources..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent text-foreground placeholder:text-neutral-400 focus:outline-none text-lg"
            aria-label="Search patient resources"
          />
          <motion.div
            animate={{ opacity: isFocused ? 1 : 0 }}
            className="px-3 py-1.5 rounded-lg bg-[#722F37] text-white text-sm font-medium"
          >
            Search
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Quick Facts Ticker
function QuickFactsTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative py-8 bg-white border-y border-[#EDE5DD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {quickFacts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="group flex items-start gap-4"
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#722F37]/20"
              >
                <fact.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </motion.div>
              <div>
                <p className="font-semibold text-foreground">{fact.title}</p>
                <p className="text-sm text-foreground-secondary mt-0.5">
                  {fact.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Patient Journey Section
function PatientJourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-b from-white to-[#FDF8F3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#5a252c] mb-6 shadow-xl shadow-[#722F37]/25"
          >
            <MapPin className="w-8 h-8 text-white" aria-hidden="true" />
          </motion.div>
          <h2 className="font-display font-bold text-4xl text-foreground mb-4">
            Your Patient Journey
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            From your first call to your healthy smile, here is what to expect
          </p>
        </motion.div>

        {/* Journey Flow Illustration */}
        <PatientJourneyIllustration />
      </div>
    </motion.section>
  );
}

// Animated Navigation Card
function NavigationCard({
  section,
  index,
}: {
  section: (typeof patientInfoSections)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.05);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : index * 0.15 }}
    >
      <Link href={section.href} className="block group" ref={cardRef}>
        <motion.div
          style={prefersReducedMotion ? {} : { x: magnetic.x, y: magnetic.y }}
          onMouseMove={prefersReducedMotion ? undefined : magnetic.handleMouseMove}
          onMouseLeave={(e) => {
            if (!prefersReducedMotion) magnetic.handleMouseLeave();
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          className="relative"
        >
          {/* Card glow effect */}
          <motion.div
            className={`absolute -inset-1 rounded-3xl ${section.bgGlow} blur-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />

          <motion.div
            className="relative bg-white rounded-2xl p-8 border border-[#EDE5DD] overflow-hidden"
            animate={prefersReducedMotion ? {} : {
              y: isHovered ? -8 : 0,
              boxShadow: isHovered
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background gradient on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0`}
              animate={{ opacity: isHovered ? 0.03 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />

            {/* Icon with animated background */}
            <div className="relative mb-6">
              <motion.div
                className={`absolute -inset-4 rounded-2xl bg-gradient-to-br ${section.color} opacity-10 blur-lg`}
                animate={prefersReducedMotion ? {} : { scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
              <motion.div
                className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}
                animate={prefersReducedMotion ? {} : {
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <section.icon className="w-8 h-8 text-white" aria-hidden="true" />
              </motion.div>
            </div>

            {/* Content */}
            <h2 className="font-display font-semibold text-2xl text-foreground mb-3 group-hover:text-[#722F37] transition-colors">
              {section.title}
            </h2>

            <p className="text-foreground-secondary leading-relaxed mb-6">
              {section.description}
            </p>

            {/* Highlights with staggered animation */}
            <ul className="space-y-2.5 mb-8">
              {section.highlights.map((highlight, hIndex) => (
                <motion.li
                  key={hIndex}
                  initial={{ opacity: 0.7, x: 0 }}
                  animate={prefersReducedMotion ? {} : {
                    opacity: isHovered ? 1 : 0.7,
                    x: isHovered ? 8 : 0,
                  }}
                  transition={{ duration: 0.2, delay: hIndex * 0.05 }}
                  className="flex items-center gap-3 text-foreground-secondary"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                  {highlight}
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-[#722F37] font-semibold"
              animate={prefersReducedMotion ? {} : { x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
              <motion.div
                animate={prefersReducedMotion ? {} : { x: isHovered ? 8 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Downloadable Forms Section
function DownloadableFormsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-b from-[#FDF8F3] to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#5a252c] mb-6 shadow-xl shadow-[#722F37]/25"
          >
            <ClipboardCheck className="w-8 h-8 text-white" aria-hidden="true" />
          </motion.div>
          <h2 className="font-display font-bold text-4xl text-foreground mb-4">
            Downloadable Forms
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Save time at your appointment by completing forms in advance
          </p>
        </motion.div>

        {/* Forms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {downloadableForms.map((form, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.1 + index * 0.1 }}
            >
              <FormCard form={form} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FormCard({ form }: { form: (typeof downloadableForms)[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      className="w-full text-left relative group"
      aria-label={`Download ${form.title} - ${form.fileType}, ${form.fileSize}`}
    >
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#722F37]/20 to-transparent blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-xl p-6 border border-[#EDE5DD] hover:border-[#722F37]/30 transition-colors h-full">
        {/* Preview mockup */}
        <div className="relative mb-4 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50 p-4 aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
          <div className="space-y-2" aria-hidden="true">
            <div className="h-2 bg-neutral-200 rounded w-3/4" />
            <div className="h-2 bg-neutral-200 rounded w-1/2" />
            <div className="h-2 bg-neutral-200 rounded w-2/3" />
          </div>

          {/* Download overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-[#722F37]/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <motion.div
              initial={{ scale: 0.8, y: 10 }}
              animate={isHovered ? { scale: 1, y: 0 } : { scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-white flex flex-col items-center"
            >
              <Download className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Download {form.fileType}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Form Info */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
            <form.icon className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {form.title}
            </h3>
            <p className="text-sm text-foreground-secondary mt-0.5 line-clamp-2">
              {form.description}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
              <span className="px-2 py-0.5 rounded bg-neutral-100 font-medium">
                {form.fileType}
              </span>
              <span>{form.fileSize}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// FAQ Section with Accordion
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: prefersReducedMotion ? 0 : -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-6 shadow-xl shadow-amber-500/25"
          >
            <HelpCircle className="w-8 h-8 text-white" aria-hidden="true" />
          </motion.div>
          <h2 className="font-display font-bold text-4xl text-foreground mb-4">
            Quick Answers
          </h2>
          <p className="text-xl text-foreground-secondary">
            Common questions answered to help you prepare for your visit
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4" role="region" aria-label="Frequently asked questions">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.1 + index * 0.1 }}
            >
              <FAQItem
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative"
      animate={prefersReducedMotion ? {} : {
        boxShadow: isOpen
          ? '0 10px 40px -10px rgba(114, 47, 55, 0.15)'
          : '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={onToggle}
        className={`w-full text-left p-6 rounded-2xl bg-white border transition-colors ${
          isOpen ? 'border-[#722F37]/30' : 'border-[#EDE5DD] hover:border-[#722F37]/20'
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{
                backgroundColor: isOpen ? '#722F37' : '#FDF8F3',
              }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <motion.div
                animate={{ color: isOpen ? '#ffffff' : '#722F37' }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </motion.div>
            <h3 className="font-semibold text-lg text-foreground pt-1.5">
              {item.question}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mt-1.5"
          >
            <ChevronDown className="w-5 h-5 text-neutral-400" aria-hidden="true" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pt-4 pl-14 text-foreground-secondary leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

// Patient Portal Concept Section
function PatientPortalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden relative"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, #722F37 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Coming Soon
            </motion.div>

            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              Your Personal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-400">
                Patient Portal
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Access your dental records, book appointments, and manage your
              care all in one secure place. Your health information at your
              fingertips.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'View upcoming appointments',
                'Access treatment history',
                'Secure messaging with your dentist',
                'Online bill pay',
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold shadow-xl shadow-[#722F37]/25 hover:shadow-2xl hover:shadow-[#722F37]/30 transition-shadow"
            >
              <Lock className="w-5 h-5" aria-hidden="true" />
              Get Notified When Available
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </motion.button>
          </motion.div>

          {/* Portal Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
            aria-hidden="true"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : {
                y: isHovered ? -10 : 0,
                rotateX: isHovered ? 5 : 0,
                rotateY: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1000 }}
              className="relative"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#722F37]/40 to-purple-500/20 blur-3xl"
                animate={{ opacity: isHovered ? 0.8 : 0.4 }}
                transition={{ duration: 0.3 }}
              />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Welcome Back</p>
                      <p className="text-white/50 text-sm">John Smith</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-white/50 text-sm">Online</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <Calendar className="w-5 h-5 text-[#722F37] mb-2" />
                    <p className="text-2xl font-bold text-white">2</p>
                    <p className="text-white/50 text-sm">Upcoming</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <FileText className="w-5 h-5 text-emerald-400 mb-2" />
                    <p className="text-2xl font-bold text-white">5</p>
                    <p className="text-white/50 text-sm">Documents</p>
                  </div>
                </div>

                {/* Next Appointment */}
                <div className="bg-gradient-to-br from-[#722F37]/20 to-[#722F37]/10 rounded-xl p-5 border border-[#722F37]/30">
                  <p className="text-white/50 text-sm mb-2">Next Appointment</p>
                  <p className="text-white font-semibold text-lg">Dental Checkup</p>
                  <div className="flex items-center gap-4 mt-3 text-white/70 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> Mar 15, 2024
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> 10:00 AM
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Resource Library Section
function ResourceLibrarySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-[#FDF8F3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: prefersReducedMotion ? 0 : 180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 mb-6 shadow-xl shadow-blue-500/25"
          >
            <BookOpen className="w-8 h-8 text-white" aria-hidden="true" />
          </motion.div>
          <h2 className="font-display font-bold text-4xl text-foreground mb-4">
            Resource Library
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Browse our collection of helpful resources and educational materials
          </p>
        </motion.div>

        {/* Resource Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1 }}
            >
              <ResourceCategoryCard category={category} />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:gap-4 transition-all"
          >
            Browse All Resources
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ResourceCategoryCard({
  category,
}: {
  category: (typeof resourceCategories)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative rounded-2xl p-8 bg-gradient-to-br from-white to-[#FDF8F3] border border-[#EDE5DD] text-center overflow-hidden"
        animate={{
          borderColor: isHovered ? 'rgba(114, 47, 55, 0.3)' : 'rgb(237, 229, 221)',
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        {/* Icon */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] mb-4 shadow-lg shadow-[#722F37]/20"
        >
          <category.icon className="w-7 h-7 text-white" aria-hidden="true" />
        </motion.div>

        {/* Label */}
        <h3 className="relative font-semibold text-lg text-foreground mb-2">
          {category.label}
        </h3>

        {/* Count badge */}
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: isHovered ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium"
        >
          {category.count} items
          <motion.div
            animate={prefersReducedMotion ? {} : { x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronsRight className="w-4 h-4" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Hero CTA Buttons
function HeroCTAButtons() {
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-10 flex flex-col sm:flex-row gap-4"
    >
      <Link href="/contact">
        <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.02 }} whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}>
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Calendar className="w-5 h-5" />}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Book Appointment
          </Button>
        </motion.div>
      </Link>

      <motion.a
        href={`tel:${contactInfo.phone}`}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-lg bg-white/80 backdrop-blur-sm text-[#722F37] border-2 border-[#EDE5DD] hover:border-[#722F37]/30 hover:bg-white transition-all duration-200 shadow-lg"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        {formattedPhone}
      </motion.a>
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PatientInfoDesktop() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Hero Section with Image */}
      <HeroSection />

      {/* Quick Facts */}
      <QuickFactsTicker />

      {/* Patient Journey Visual */}
      <PatientJourneySection />

      {/* Navigation Cards Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 mb-6 shadow-xl shadow-emerald-500/25"
            >
              <Handshake className="w-8 h-8 text-white" aria-hidden="true" />
            </motion.div>
            <h2 className="font-display font-bold text-4xl text-foreground mb-4">
              How Can We Help?
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              Select a topic below to find the information you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {patientInfoSections.map((section, index) => (
              <NavigationCard key={index} section={section} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Forms */}
      <DownloadableFormsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Patient Portal */}
      <PatientPortalSection />

      {/* Resource Library */}
      <ResourceLibrarySection />

      {/* CTA Section */}
      <ContactCtaBanner
        variant="editorial"
        background="wave"
        headline="Have Questions?"
        description="Our friendly team is here to help. Contact us today and we will be happy to answer any questions about your visit."
        phoneNumber={contactInfo.phone}
        showEmergency={true}
        emergencyMessage="Same-day emergency appointments available"
        showHours={true}
        showLocation={true}
        showLanguages={true}
        bookUrl="/contact"
        bookText="Contact Us"
      />
    </main>
  );
}
