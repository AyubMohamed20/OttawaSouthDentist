'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  ClipboardList,
  Clock,
  CreditCard,
  Shield,
  CheckCircle2,
  Phone,
  Calendar,
  ArrowRight,
  Heart,
  Sparkles,
  Languages,
  MapPin,
  Building2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Check,
  MessageCircle,
  FileCheck,
  UserPlus,
  ClipboardCheck,
  Handshake,
  BadgeCheck,
  Wallet,
  IdCard,
  Pill,
  FolderOpen,
  Camera,
  Star,
  ChevronRight,
  Zap,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, PanInfo } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

// ============================================================================
// DATA
// ============================================================================

const faqs = [
  {
    question: 'What should I bring?',
    answer:
      'Bring a valid photo ID, dental insurance card (if applicable), list of current medications, and any dental records from your previous dentist.',
    icon: ClipboardCheck,
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    question: 'Do you accept patients without insurance?',
    answer:
      'Yes! We welcome all patients. We offer various payment options including cash, debit, Visa, MasterCard, and American Express.',
    icon: Wallet,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    question: 'Do you accept CDCP?',
    answer:
      'Yes, we proudly accept the Canadian Dental Care Plan. Bring your CDCP documentation to your appointment.',
    icon: BadgeCheck,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    question: 'How early should I arrive?',
    answer:
      'Please arrive 15-20 minutes early to complete any remaining paperwork and get comfortable.',
    icon: Clock,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    question: 'What happens during my first visit?',
    answer:
      'Your visit includes a comprehensive exam, necessary X-rays, discussion of your dental history, and a personalized treatment plan.',
    icon: Stethoscope,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    question: 'Can I transfer my dental records?',
    answer:
      "Yes! Just provide your previous dentist's contact information and we'll handle the transfer.",
    icon: FolderOpen,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    question: 'What languages do you speak?',
    answer:
      'Our multilingual team speaks English, French, Spanish, Hindi, Punjabi, Farsi, and Arabic.',
    icon: Languages,
    gradient: 'from-fuchsia-500 to-pink-600',
  },
];

const firstVisitSteps = [
  {
    step: 1,
    title: 'Welcome & Check-In',
    description: 'Our friendly team will greet you and verify your information.',
    duration: '10-15 min',
    icon: Handshake,
    gradient: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
  },
  {
    step: 2,
    title: 'Health History Review',
    description: 'We review your medical and dental history together.',
    duration: '5-10 min',
    icon: ClipboardList,
    gradient: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
  },
  {
    step: 3,
    title: 'Comprehensive Exam',
    description: 'Thorough examination of teeth, gums, and oral health.',
    duration: '15-20 min',
    icon: Stethoscope,
    gradient: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    step: 4,
    title: 'Digital X-Rays',
    description: 'Low-radiation X-rays to see beneath the surface.',
    duration: '10-15 min',
    icon: Camera,
    gradient: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50',
  },
  {
    step: 5,
    title: 'Treatment Plan',
    description: 'We discuss findings and create your personalized plan.',
    duration: '10-15 min',
    icon: MessageCircle,
    gradient: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
  },
];

const requiredDocuments = [
  {
    icon: IdCard,
    title: 'Photo ID',
    description: "Driver's license, passport, or health card",
    items: ["Driver's License", 'Passport', 'Health Card'],
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: CreditCard,
    title: 'Insurance Card',
    description: 'Your dental insurance card with member ID',
    items: ['Member ID', 'Group Number', 'Policy Holder'],
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Pill,
    title: 'Medication List',
    description: 'All current medications and supplements',
    items: ['Prescriptions', 'OTC Meds', 'Supplements'],
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: FolderOpen,
    title: 'Dental Records',
    description: 'Previous X-rays and records (if available)',
    items: ['X-rays', 'Treatment History', 'Dentist Contact'],
    gradient: 'from-teal-500 to-emerald-600',
  },
];

const policies = [
  {
    icon: Clock,
    title: 'Appointments',
    gradient: 'from-blue-500 to-indigo-600',
    items: [
      'Arrive 15 min early for first visit',
      '48-hour cancellation notice',
      'Late arrivals may reschedule',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payment',
    gradient: 'from-emerald-500 to-teal-600',
    items: [
      'Payment due at service',
      'Cash, debit, Visa, MC, AMEX',
      'Direct insurance billing',
    ],
  },
  {
    icon: Shield,
    title: 'Insurance & CDCP',
    gradient: 'from-violet-500 to-purple-600',
    items: [
      'Most insurance accepted',
      'CDCP accepted',
      'Coverage estimates provided',
    ],
  },
];

const whyChooseUs = [
  {
    icon: Heart,
    title: 'Patient-Centered',
    stat: '20+',
    statLabel: 'Years',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Languages,
    title: 'Multilingual',
    stat: '7',
    statLabel: 'Languages',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Modern Tech',
    stat: '90%',
    statLabel: 'Less Radiation',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Shield,
    title: 'CDCP Accepted',
    stat: '100%',
    statLabel: 'Support',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#722F37]/10 to-rose-400/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-10%', right: '-20%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-violet-400/10 to-purple-400/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', left: '-15%' }}
      />
    </div>
  );
}

function GlowingBadge({
  children,
  gradient = 'from-[#722F37] to-rose-600',
  className = ''
}: {
  children: React.ReactNode;
  gradient?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative inline-flex ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full blur-lg opacity-30`} />
      <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-white/50 shadow-lg">
        {children}
      </div>
    </motion.div>
  );
}

// ============================================================================
// MOBILE HERO SECTION
// ============================================================================

function MobileHero() {
  const prefersReducedMotion = useReducedMotion();
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-gradient-to-b from-[#FDF8F3] via-white to-white">
      <FloatingOrbs />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col pt-6 pb-8 px-5">
        {/* Badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-5"
        >
          <GlowingBadge>
            <UserPlus className="w-4 h-4 text-[#722F37]" />
            <span className="text-sm font-semibold text-[#722F37]">New Patients Welcome</span>
          </GlowingBadge>
        </motion.div>

        {/* Hero Image with parallax */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ y: prefersReducedMotion ? 0 : imageY, opacity }}
          className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl mb-6 mx-auto w-full max-w-sm"
        >
          {/* Gradient border effect */}
          <div className="absolute -inset-[2px] bg-gradient-to-br from-[#722F37] via-rose-400 to-[#722F37] rounded-3xl opacity-60" />

          <div className="absolute inset-[2px] rounded-[22px] overflow-hidden">
            <Image
              src="/images/patient-info/new-patients/mobile/hero-welcome-mobile.jpg"
              alt="Smiling patient at Ottawa South Dental"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/20 to-transparent" />
          </div>

          {/* Floating badges on image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-rose-600 flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-[#722F37] leading-none">20+ Years</p>
                  <p className="text-sm text-foreground-secondary mt-0.5">Serving Ottawa Families</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top corner accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute top-4 right-4"
          >
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/50">
              <Sparkles className="w-7 h-7 text-[#722F37]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center px-2"
        >
          <h1 className="font-display font-bold text-[2rem] leading-[1.15] text-foreground mb-4">
            Your First Visit,
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] via-rose-600 to-[#722F37]">
              Made Simple
            </span>
          </h1>

          <p className="text-foreground-secondary text-base leading-relaxed mb-6 max-w-xs mx-auto">
            Everything you need to prepare for your first appointment with our caring team.
          </p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {[
              { icon: BadgeCheck, label: 'CDCP Accepted', gradient: 'from-emerald-500 to-teal-600' },
              { icon: Languages, label: '7 Languages', gradient: 'from-violet-500 to-purple-600' },
              { icon: Award, label: 'Top Rated', gradient: 'from-amber-500 to-orange-600' },
            ].map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-gray-100"
              >
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                  <item.icon className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs font-medium text-foreground-secondary">{item.label}</span>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Link href="/contact#book" className="block">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="relative w-full group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#722F37] to-rose-600 rounded-2xl blur-lg opacity-40 group-active:opacity-60 transition-opacity" />
              <div className="relative flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#722F37] to-rose-600 text-white rounded-2xl font-semibold text-lg shadow-xl">
                <Calendar className="w-5 h-5" />
                Book Your First Visit
                <ArrowRight className="w-5 h-5 transition-transform group-active:translate-x-1" />
              </div>
            </motion.button>
          </Link>

          <motion.a
            href={`tel:${contactInfo.phone}`}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-[#722F37] bg-white border-2 border-[#722F37]/20 shadow-sm active:bg-[#FDF8F3] transition-colors"
          >
            <Phone className="w-5 h-5" />
            {formattedPhone}
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

// ============================================================================
// INTERACTIVE CHECKLIST SECTION
// ============================================================================

function MobileChecklistItem({
  doc,
  index,
  isChecked,
  onToggle,
}: {
  doc: typeof requiredDocuments[0];
  index: number;
  isChecked: boolean;
  onToggle: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = doc.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative rounded-2xl overflow-hidden transition-all duration-300
        ${isChecked
          ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200'
          : 'bg-white border-2 border-gray-100 shadow-sm'
        }
      `}
    >
      {/* Success glow effect */}
      {isChecked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-400/10"
        />
      )}

      {/* Main row */}
      <div className="relative flex items-center gap-4 p-4">
        {/* Animated checkbox */}
        <motion.button
          onClick={onToggle}
          whileTap={{ scale: 0.9 }}
          className={`
            relative flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center
            transition-all duration-300
            ${isChecked
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
              : 'border-2 border-gray-300 bg-white'
            }
          `}
        >
          <AnimatePresence mode="wait">
            {isChecked && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Icon */}
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
            ${isChecked
              ? 'bg-emerald-100'
              : `bg-gradient-to-br ${doc.gradient} shadow-lg`
            }
          `}
        >
          <Icon className={`w-6 h-6 ${isChecked ? 'text-emerald-600' : 'text-white'}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base transition-all duration-300 ${
              isChecked ? 'text-emerald-700 line-through decoration-2' : 'text-foreground'
            }`}
          >
            {doc.title}
          </h3>
          <p className="text-sm text-foreground-secondary truncate">{doc.description}</p>
        </div>

        {/* Expand button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileTap={{ scale: 0.9 }}
          className="p-2 -mr-2 rounded-lg active:bg-gray-100"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-foreground-secondary" />
          </motion.div>
        </motion.button>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3" />
              <div className="flex flex-wrap gap-2">
                {doc.items.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium
                      ${isChecked
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-foreground-secondary'
                      }
                    `}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MobileChecklistSection() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const progressPercentage = (checkedItems.size / requiredDocuments.length) * 100;
  const isComplete = progressPercentage === 100;

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

  return (
    <section className="py-12 px-5 bg-gradient-to-b from-white to-[#FDF8F3]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <GlowingBadge gradient="from-violet-500 to-purple-600" className="mb-4">
          <ClipboardCheck className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-semibold text-violet-600">Preparation Checklist</span>
        </GlowingBadge>

        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          What to Bring
        </h2>
        <p className="text-foreground-secondary text-sm">
          Tap to check off items as you prepare
        </p>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground-secondary">Your Progress</span>
            <motion.span
              key={checkedItems.size}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-sm font-bold text-[#722F37]"
            >
              {checkedItems.size}/{requiredDocuments.length}
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                isComplete
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  : 'bg-gradient-to-r from-[#722F37] to-rose-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </div>

          {/* Completion message */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </motion.div>
                  <span className="text-sm font-semibold text-emerald-700">
                    All set! You're ready for your visit
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Checklist items */}
      <div className="space-y-3">
        {requiredDocuments.map((doc, index) => (
          <MobileChecklistItem
            key={index}
            doc={doc}
            index={index}
            isChecked={checkedItems.has(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// FORMS DOWNLOAD SECTION
// ============================================================================

function MobileFormsSection() {
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  const forms = [
    { title: 'Medical History', icon: ClipboardList, gradient: 'from-rose-500 to-pink-600' },
    { title: 'Consent Forms', icon: FileCheck, gradient: 'from-violet-500 to-purple-600' },
    { title: 'Insurance Info', icon: Shield, gradient: 'from-blue-500 to-indigo-600' },
  ];

  return (
    <section className="py-12 px-5 bg-[#FDF8F3]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-rose-700 to-[#5a252c]" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-400/20 rounded-full blur-2xl" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <pattern id="formPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#formPattern)" />
          </svg>
        </div>

        <div className="relative p-6">
          <GlowingBadge gradient="from-white/20 to-white/10" className="mb-4">
            <FileText className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Save Time</span>
          </GlowingBadge>

          <h2 className="font-display font-bold text-2xl text-white mb-2">
            Complete Forms Ahead
          </h2>
          <p className="text-white/80 text-sm mb-6 leading-relaxed">
            Download and complete your patient forms at home to speed up check-in.
          </p>

          {/* Form cards - horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide mb-6">
            {forms.map((form, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20 min-w-[170px]"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${form.gradient} flex items-center justify-center shadow-lg`}>
                  <form.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium text-sm">{form.title}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = '/contact')}
              className="w-full py-4 bg-white text-[#722F37] rounded-2xl font-semibold text-base flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Request Forms
            </motion.button>

            <motion.a
              href={`tel:${contactInfo.phone}`}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white/90 border-2 border-white/30 active:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">{formattedPhone}</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// JOURNEY TIMELINE SECTION (Swipeable Cards)
// ============================================================================

function MobileJourneySection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && activeStep < firstVisitSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (info.offset.x > threshold && activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <section className="py-12 bg-white overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center px-5 mb-8"
      >
        <GlowingBadge gradient="from-blue-500 to-indigo-600" className="mb-4">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">Your Journey</span>
        </GlowingBadge>

        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Your First Appointment
        </h2>
        <p className="text-foreground-secondary text-sm mb-4">
          Swipe to explore each step
        </p>

        {/* Total duration badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-foreground-secondary">Total:</span>
          <span className="text-sm font-bold text-blue-600">60-90 min</span>
        </div>
      </motion.div>

      {/* Swipeable cards */}
      <div ref={containerRef} className="relative px-5">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="wait">
            {(() => {
              const currentStep = firstVisitSteps[activeStep];
              if (!currentStep) return null;
              const StepIcon = currentStep.icon;
              return (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className={`${currentStep.bgColor} rounded-3xl p-6 relative overflow-hidden`}
                >
                  {/* Background decoration */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${currentStep.gradient} opacity-10 rounded-full blur-2xl`} />

                  <div className="relative flex items-start gap-5">
                    {/* Step icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStep.gradient} flex items-center justify-center flex-shrink-0 shadow-xl`}
                    >
                      <StepIcon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="flex-1 pt-1">
                      {/* Step indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wide bg-gradient-to-r ${currentStep.gradient} text-transparent bg-clip-text`}>
                          Step {currentStep.step}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/80 text-xs font-medium text-foreground-secondary shadow-sm">
                          {currentStep.duration}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-foreground mb-2">
                        {currentStep.title}
                      </h3>
                      <p className="text-foreground-secondary text-sm leading-relaxed">
                        {currentStep.description}
                      </p>
                    </div>
                  </div>

                  {/* Navigation hint */}
                  <div className="mt-6 flex items-center justify-between text-xs text-foreground-secondary">
                    <span className="opacity-60">
                      {activeStep > 0 ? '← Swipe right for previous' : ''}
                    </span>
                    <span className="opacity-60">
                      {activeStep < firstVisitSteps.length - 1 ? 'Swipe left for next →' : ''}
                    </span>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {firstVisitSteps.map((step, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <motion.div
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeStep === index
                    ? `w-8 bg-gradient-to-r ${step.gradient}`
                    : 'w-2 bg-gray-300'
                }`}
              />
              {activeStep === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.gradient} blur-sm opacity-50`}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Plan ahead notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-5 mt-8"
      >
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Plan Ahead</p>
            <p className="text-foreground-secondary text-xs leading-relaxed">
              Please arrive 15 minutes early to complete any remaining paperwork.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// POLICIES SECTION
// ============================================================================

function MobilePoliciesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-12 px-5 bg-gradient-to-b from-white to-[#FDF8F3]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <GlowingBadge gradient="from-emerald-500 to-teal-600" className="mb-4">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-600">Good to Know</span>
        </GlowingBadge>

        <h2 className="font-display font-bold text-2xl text-foreground">
          Office Policies
        </h2>
      </motion.div>

      {/* Policy accordions */}
      <div className="space-y-3">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative rounded-2xl overflow-hidden transition-all duration-300
                ${isExpanded
                  ? 'bg-white shadow-xl border-2 border-gray-100'
                  : 'bg-white shadow-sm border-2 border-transparent'
                }
              `}
            >
              <motion.button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${policy.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-foreground flex-1">{policy.title}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isExpanded ? `bg-gradient-to-br ${policy.gradient}` : 'bg-gray-100'
                  }`}
                >
                  <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-white' : 'text-foreground-secondary'}`} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3" />
                      {policy.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${policy.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-sm text-foreground-secondary">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Payment methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#722F37] to-rose-700 p-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

          <h3 className="font-semibold text-white text-center mb-4 flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Methods
          </h3>

          <div className="flex flex-wrap justify-center gap-2">
            {['Debit', 'Visa', 'MasterCard', 'AMEX', 'Cash'].map((method, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 bg-white/15 text-white text-sm font-medium rounded-xl border border-white/20 backdrop-blur-sm"
              >
                {method}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// WHY CHOOSE US SECTION
// ============================================================================

function MobileWhyChooseUs() {
  return (
    <section className="py-12 px-5 bg-[#FDF8F3]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <GlowingBadge gradient="from-amber-500 to-orange-600" className="mb-4">
          <Star className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-amber-600">Our Promise</span>
        </GlowingBadge>

        <h2 className="font-display font-bold text-2xl text-foreground">
          Why Choose Us
        </h2>
      </motion.div>

      {/* Cards - 2x2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {whyChooseUs.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.97 }}
              className="relative bg-white rounded-2xl p-5 shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-10 rounded-full blur-xl`} />

              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <p className={`text-3xl font-bold bg-gradient-to-r ${item.gradient} text-transparent bg-clip-text`}>
                  {item.stat}
                </p>
                <p className="text-[10px] text-foreground-secondary uppercase tracking-wider font-medium">
                  {item.statLabel}
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">{item.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function MobileFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <section className="py-12 px-5 bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <GlowingBadge gradient="from-fuchsia-500 to-pink-600" className="mb-4">
          <MessageCircle className="w-4 h-4 text-fuchsia-600" />
          <span className="text-sm font-semibold text-fuchsia-600">Have Questions?</span>
        </GlowingBadge>

        <h2 className="font-display font-bold text-2xl text-foreground">
          FAQs
        </h2>
      </motion.div>

      {/* FAQ accordions */}
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const Icon = faq.icon;
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`
                rounded-2xl overflow-hidden transition-all duration-300
                ${isOpen
                  ? 'bg-white shadow-xl border-2 border-gray-100'
                  : 'bg-gray-50 border-2 border-transparent'
                }
              `}
            >
              <motion.button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${isOpen
                      ? `bg-gradient-to-br ${faq.gradient} shadow-lg`
                      : 'bg-white border border-gray-200'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-foreground-secondary'}`} />
                </div>

                <span className={`text-sm font-medium flex-1 transition-colors ${isOpen ? 'text-foreground' : 'text-foreground-secondary'}`}>
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                    ${isOpen
                      ? `bg-gradient-to-br ${faq.gradient}`
                      : 'bg-white border border-gray-200'
                    }
                  `}
                >
                  <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-foreground-secondary'}`} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3" />
                      <p className="text-foreground-secondary text-sm leading-relaxed pl-13">
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

      {/* Still have questions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <p className="text-foreground-secondary text-sm mb-3">Still have questions?</p>
        <motion.a
          href={`tel:${contactInfo.phone}`}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#722F37] to-rose-600 text-white rounded-xl font-semibold shadow-lg"
        >
          <Phone className="w-4 h-4" />
          {formattedPhone}
        </motion.a>
      </motion.div>
    </section>
  );
}

// ============================================================================
// LOCATION INFO SECTION
// ============================================================================

function MobileLocationInfo() {
  const locationItems = [
    {
      icon: MapPin,
      title: 'Location',
      content: `${contactInfo.address.street}, ${contactInfo.address.city}`,
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Fri: 9am-5pm | Sat: 9am-2pm',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Building2,
      title: 'Parking',
      content: 'Free on-site parking available',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section className="py-8 px-5 bg-[#FDF8F3]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 space-y-4"
      >
        {locationItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground-secondary uppercase tracking-wide">{item.title}</p>
                <p className="text-sm font-semibold text-foreground truncate">{item.content}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-foreground-secondary" />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function MobileFinalCTA() {
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-rose-700 to-[#5a252c]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-rose-400/20 rounded-full blur-3xl" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <pattern id="ctaPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ctaPattern)" />
        </svg>
      </div>

      <div className="relative py-14 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-5"
          >
            <Heart className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Join Our Dental Family</span>
          </motion.div>

          <h2 className="font-display font-bold text-3xl text-white mb-3 leading-tight">
            Ready to Get
            <span className="block">Started?</span>
          </h2>

          <p className="text-white/80 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
            Book your first appointment today and experience warm, welcoming care.
          </p>

          <div className="space-y-3">
            <Link href="/contact#book" className="block">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="relative w-full group"
              >
                <div className="absolute inset-0 bg-white rounded-2xl blur-lg opacity-30 group-active:opacity-50 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3 w-full py-4 bg-white text-[#722F37] rounded-2xl font-bold text-lg shadow-xl">
                  <Calendar className="w-5 h-5" />
                  Book Your First Visit
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>
            </Link>

            <motion.a
              href={`tel:${contactInfo.phone}`}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-semibold border-2 border-white/30 active:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {formattedPhone}
            </motion.a>
          </div>

          {/* Emergency notice */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/90 text-xs font-medium">Same-day emergency appointments</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN MOBILE COMPONENT
// ============================================================================

export function NewPatientsContentMobile() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col overflow-x-hidden">
      <MobileHero />
      <MobileChecklistSection />
      <MobileFormsSection />
      <MobileJourneySection />
      <MobilePoliciesSection />
      <MobileWhyChooseUs />
      <MobileFAQSection />
      <MobileLocationInfo />
      <MobileFinalCTA />
    </main>
  );
}
