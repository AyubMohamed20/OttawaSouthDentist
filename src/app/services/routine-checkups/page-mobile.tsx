'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  Check,
  Stethoscope,
  Shield,
  Clock,
  ArrowRight,
  CalendarCheck,
  Eye,
  Activity,
  Heart,
  Sparkles,
  Timer,
  Target,
  Search,
  FileText,
  Scan,
  Smile,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Sun,
  Moon,
  Coffee,
  ChevronDown,
  ChevronRight,
  Zap,
  Brain,
  Bone,
  ShieldCheck,
  HeartPulse,
  ClipboardCheck,
  Star,
  RotateCcw,
  BadgeCheck,
  CircleCheck,
  ArrowUpRight,
  Play,
  Droplets,
  Leaf,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const staggerContainer = {
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

// ============================================================================
// DATA
// ============================================================================

const faqs = [
  {
    question: 'How often should I have a dental checkup?',
    answer:
      'Most patients should visit the dentist every 6 months for a routine checkup and cleaning. However, some patients may need more frequent visits based on their oral health needs. Those with gum disease, a history of cavities, or certain medical conditions may benefit from visits every 3-4 months.',
  },
  {
    question: 'What happens during a dental checkup?',
    answer:
      "During a checkup, your dentist will thoroughly examine your teeth, gums, and mouth for any signs of problems. We'll check for cavities and tooth decay, evaluate your bite and jaw alignment, screen for oral cancer, and review your oral hygiene habits.",
  },
  {
    question: 'Why are regular checkups important if my teeth feel fine?',
    answer:
      "Many dental problems don't cause pain in their early stages. Cavities, gum disease, and even oral cancer can develop without noticeable symptoms. Regular checkups allow us to catch these issues early when they're easier and less expensive to treat.",
  },
  {
    question: 'Are dental checkups covered by insurance?',
    answer:
      "Most dental insurance plans cover preventive care, including routine checkups and cleanings, at 80-100%. Coverage typically includes two checkups per year. We're happy to help verify your coverage and explain your benefits.",
  },
];

const earlyDetectionBenefits = [
  {
    icon: Eye,
    title: 'Cavities & Decay',
    description: 'Detect cavities before they cause pain',
    earlyTreatment: 'Simple filling',
    lateTreatment: 'Root canal',
    gradient: 'from-cyan-500 to-teal-600',
    bgGradient: 'from-cyan-500/10 to-teal-500/10',
  },
  {
    icon: HeartPulse,
    title: 'Gum Disease',
    description: 'Catch gingivitis early',
    earlyTreatment: 'Deep cleaning',
    lateTreatment: 'Surgery',
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'from-rose-500/10 to-pink-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Oral Cancer',
    description: 'Early screening saves lives',
    earlyTreatment: '84% survival',
    lateTreatment: '39% survival',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    icon: Bone,
    title: 'Bone Loss',
    description: 'Prevent jawbone issues',
    earlyTreatment: 'Preventive care',
    lateTreatment: 'Bone grafts',
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
  },
];

const examinationComponents = [
  {
    id: 'visual',
    icon: Search,
    title: 'Visual Examination',
    duration: '5-8 min',
    description: 'Thorough inspection of teeth, gums, tongue, and oral tissues.',
    details: ['Check for decay', 'Examine gum health', 'Inspect soft tissues', 'Check for grinding'],
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'xray',
    icon: Scan,
    title: 'Digital X-Rays',
    duration: '5-10 min',
    description: 'Low-radiation imaging to reveal hidden problems.',
    details: ['Detect hidden cavities', 'Check bone levels', 'Find impacted teeth', 'Monitor restorations'],
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'periodontal',
    icon: Activity,
    title: 'Periodontal Check',
    duration: '5-7 min',
    description: 'Measurement of gum health and pocket depths.',
    details: ['Measure pocket depths', 'Check for bleeding', 'Assess recession', 'Evaluate attachment'],
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'cancer',
    icon: Shield,
    title: 'Cancer Screening',
    duration: '3-5 min',
    description: 'Examination for early signs of oral cancer.',
    details: ['Check oral tissues', 'Feel lymph nodes', 'Examine throat', 'Look for lesions'],
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'bite',
    icon: Target,
    title: 'Bite Analysis',
    duration: '3-5 min',
    description: 'Evaluation of jaw function and alignment.',
    details: ['Check TMJ function', 'Assess alignment', 'Identify wear', 'Test mobility'],
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'consultation',
    icon: FileText,
    title: 'Treatment Plan',
    duration: '5-10 min',
    description: 'Discussion of findings and recommendations.',
    details: ['Review results', 'Discuss options', 'Create care plan', 'Answer questions'],
    gradient: 'from-teal-500 to-cyan-600',
  },
];

const appointmentOptions = [
  {
    icon: Sun,
    title: 'Morning',
    times: '9:00 AM - 12:00 PM',
    description: 'Start your day right',
    popular: false,
    emoji: '🌅',
  },
  {
    icon: Coffee,
    title: 'Lunch Hour',
    times: '12:00 PM - 2:00 PM',
    description: 'On your break',
    popular: true,
    emoji: '☕',
  },
  {
    icon: Moon,
    title: 'Afternoon',
    times: '2:00 PM - 5:00 PM',
    description: 'After work or school',
    popular: false,
    emoji: '🌙',
  },
];

const healthTips = [
  { icon: Sparkles, title: 'Brush Twice', frequency: 'Daily', color: 'from-blue-500 to-cyan-500' },
  { icon: Heart, title: 'Floss Daily', frequency: 'Once', color: 'from-rose-500 to-pink-500' },
  { icon: Droplets, title: 'Mouthwash', frequency: 'Daily', color: 'from-violet-500 to-purple-500' },
  { icon: Leaf, title: 'Limit Sugar', frequency: 'Ongoing', color: 'from-emerald-500 to-green-500' },
  { icon: TrendingUp, title: 'Stay Hydrated', frequency: '8 glasses', color: 'from-cyan-500 to-teal-500' },
  { icon: Calendar, title: 'Regular Visits', frequency: '6 months', color: 'from-amber-500 to-orange-500' },
];

const relatedServices = [
  { icon: Shield, title: 'Preventive Dentistry', href: '/services/preventive-dentistry', color: 'from-emerald-500 to-teal-600' },
  { icon: Heart, title: 'Dental Hygiene', href: '/services/dental-hygiene', color: 'from-rose-500 to-pink-600' },
  { icon: Check, title: 'White Fillings', href: '/services/white-fillings', color: 'from-blue-500 to-cyan-600' },
];

const frequencyFactors = [
  { id: 'gumDisease', label: 'History of gum disease', months: -2, risk: 'high' },
  { id: 'cavities', label: 'Prone to cavities', months: -2, risk: 'high' },
  { id: 'smoking', label: 'Tobacco use', months: -3, risk: 'high' },
  { id: 'diabetes', label: 'Diabetes or health conditions', months: -2, risk: 'medium' },
  { id: 'braces', label: 'Braces or aligners', months: -2, risk: 'medium' },
  { id: 'dry', label: 'Dry mouth', months: -1, risk: 'medium' },
];

const whyCheckupReasons = [
  { icon: Eye, title: 'Early Detection', desc: 'Catch problems before pain', gradient: 'from-cyan-500 to-teal-600' },
  { icon: Shield, title: 'Prevention', desc: 'Professional cleaning', gradient: 'from-emerald-500 to-green-600' },
  { icon: HeartPulse, title: 'Overall Health', desc: 'Connected to heart & more', gradient: 'from-rose-500 to-pink-600' },
  { icon: TrendingUp, title: 'Cost Savings', desc: 'Prevent expensive issues', gradient: 'from-amber-500 to-orange-600' },
];

// ============================================================================
// FLOATING PARTICLES BACKGROUND
// ============================================================================

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-[#722F37]/20 to-teal-500/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// IMMERSIVE MOBILE HERO SECTION
// ============================================================================

function MobileHeroSection() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#722F37]/30 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 -left-20 w-48 h-48 rounded-full bg-gradient-to-br from-teal-500/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            y: [0, -20, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Hero Image with Parallax */}
      <motion.div
        className="relative w-full aspect-[3/4] max-h-[55vh]"
        style={{ scale: imageScale, opacity: imageOpacity }}
      >
        <Image
          src="/images/services/routine-checkups/hero-checkup.jpg"
          alt="Routine dental checkup"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#722F37]/20 via-transparent to-teal-900/20" />

        {/* Floating Stats Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-6 left-4 right-4"
        >
          <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <motion.div
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <CalendarCheck className="w-7 h-7 text-white" />
            </motion.div>
            <div className="flex-1">
              <p className="text-white/60 text-xs uppercase tracking-wider">Recommended</p>
              <p className="font-bold text-white text-lg">Every 6 Months</p>
            </div>
            <div className="text-right">
              <p className="text-teal-400 text-2xl font-bold">90%</p>
              <p className="text-white/50 text-xs">Preventable</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative flex-1 px-5 pt-6 pb-8 flex flex-col">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex-1"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 backdrop-blur-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Smile className="w-4 h-4 text-teal-400" />
              </motion.div>
              <span className="text-teal-300 text-sm font-medium">Preventive Care</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="font-display font-bold text-4xl text-white leading-[1.1] mb-4"
          >
            Routine{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400">
              Dental Checkups
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="text-white/70 text-base leading-relaxed mb-6"
          >
            Regular examinations are the foundation of a healthy smile. Prevent problems before they start with comprehensive checkups.
          </motion.p>

          {/* Trust indicators */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-8">
            {[
              { icon: CalendarCheck, text: '6-Month Visits' },
              { icon: ShieldCheck, text: 'CDCP Accepted' },
              { icon: Clock, text: 'Same-Day' },
            ].map((item) => (
              <span
                key={item.text}
                className="flex items-center gap-1.5 text-xs text-white/60 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10"
              >
                <item.icon className="w-3.5 h-3.5 text-teal-400" />
                {item.text}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-3"
        >
          <Link href="/contact#book" className="block">
            <motion.button
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl font-semibold text-base shadow-xl shadow-teal-500/30 relative overflow-hidden group"
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Calendar className="w-5 h-5" />
              <span>Book Your Checkup</span>
              <ArrowRight className="w-5 h-5 group-active:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <a
            href={phoneHref}
            className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm py-3"
          >
            <Phone className="w-4 h-4" />
            Call {formattedPhone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// WHY CHECKUPS MATTER - PREMIUM BENTO GRID
// ============================================================================

function MobileWhyCheckupsMatter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-white to-[#fafafa] relative overflow-hidden">
      <FloatingParticles />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative"
      >
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold tracking-wider uppercase mb-3"
          whileInView={{ scale: [0.9, 1] }}
          transition={{ duration: 0.3 }}
        >
          <Stethoscope className="w-4 h-4" />
          Why It Matters
        </motion.span>
        <h2 className="font-display font-bold text-3xl text-neutral-900 leading-tight">
          Regular Checkups{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a85058]">
            Save Smiles
          </span>
        </h2>
      </motion.div>

      {/* Hero Image with Overlay Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mb-6"
      >
        <Image
          src="/images/services/routine-checkups/patient-smiling.jpg"
          alt="Happy patient after dental checkup"
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Floating Stat Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <div className="flex items-center gap-4 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-neutral-900">90%</p>
              <p className="text-sm text-neutral-600">of dental issues are preventable</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bento Grid of Reasons */}
      <div className="grid grid-cols-2 gap-3">
        {whyCheckupReasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="relative group"
            >
              <motion.div
                className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-lg h-full relative overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-active:opacity-5 transition-opacity`} />

                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-3 shadow-lg`}
                  whileInView={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">{reason.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// WHAT TO EXPECT - INTERACTIVE TIMELINE
// ============================================================================

function MobileWhatToExpect() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#fafafa] via-white to-[#f5f0eb] relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-100/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-32 h-32 bg-gradient-to-br from-[#722F37]/10 to-transparent rounded-full blur-2xl" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-200 text-teal-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <ClipboardCheck className="w-4 h-4" />
          Step-by-Step
        </span>
        <h2 className="font-display font-bold text-3xl text-neutral-900 leading-tight mb-2">
          What to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
            Expect
          </span>
        </h2>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-md border border-neutral-100">
          <Timer className="w-4 h-4 text-[#722F37]" />
          <span className="text-sm font-medium text-neutral-700">45-60 minute appointment</span>
        </div>
      </motion.div>

      {/* Interactive Timeline */}
      <div className="space-y-3 relative">
        {/* Timeline line */}
        <div className="absolute left-[26px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 opacity-20" />

        {examinationComponents.map((step, index) => {
          const isExpanded = expandedStep === index;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <motion.button
                onClick={() => setExpandedStep(isExpanded ? null : index)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-teal-200 shadow-xl'
                    : 'bg-white/80 backdrop-blur-sm border-neutral-100 shadow-md'
                }`}
                whileTap={{ scale: 0.99 }}
              >
                {/* Step number indicator */}
                <div className="relative z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                    animate={isExpanded ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold text-neutral-700 border border-neutral-100">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="font-bold text-neutral-900 text-base">{step.title}</h3>
                  <span className="flex items-center gap-1.5 text-xs text-teal-600 font-medium">
                    <Timer className="w-3 h-3" />
                    {step.duration}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isExpanded ? 'bg-teal-100' : 'bg-neutral-100'
                  }`}
                >
                  <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-teal-600' : 'text-neutral-400'}`} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-5 ml-6 border-l-2 border-teal-200 bg-gradient-to-br from-teal-50/50 to-white rounded-b-2xl">
                      <p className="text-neutral-600 text-sm mb-4 leading-relaxed">{step.description}</p>

                      <div className="grid grid-cols-2 gap-2">
                        {step.details.map((detail, i) => (
                          <motion.div
                            key={detail}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-2 text-sm bg-white rounded-xl p-2.5 shadow-sm border border-neutral-100"
                          >
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0`}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-neutral-700 text-xs">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// EARLY DETECTION - HORIZONTAL SCROLL CARDS
// ============================================================================

function MobileEarlyDetection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 bg-gradient-to-b from-[#f5f0eb] to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-cyan-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-rose-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center px-5 mb-8 relative"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-500/10 border border-[#722F37]/20 text-[#722F37] text-xs font-semibold tracking-wider uppercase mb-3">
          <Eye className="w-4 h-4" />
          Early Detection
        </span>
        <h2 className="font-display font-bold text-3xl text-neutral-900 leading-tight">
          Catch Problems{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
            Early
          </span>
        </h2>
      </motion.div>

      {/* Feature Image */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/services/routine-checkups/dental-examination.jpg"
            alt="Dental examination"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-5 pb-4" style={{ width: 'max-content' }}>
          {earlyDetectionBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="w-[280px] flex-shrink-0"
              >
                <motion.div
                  className={`relative h-full bg-gradient-to-br ${benefit.bgGradient} backdrop-blur-sm rounded-3xl p-5 border border-white/50 shadow-xl overflow-hidden`}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-xl" />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg mb-4`}
                      whileInView={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="font-bold text-neutral-900 text-lg mb-1">{benefit.title}</h3>
                    <p className="text-neutral-600 text-sm mb-4">{benefit.description}</p>

                    {/* Early vs Late Comparison */}
                    <div className="space-y-3 pt-4 border-t border-neutral-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider">Early</p>
                          <p className="font-semibold text-emerald-600">{benefit.earlyTreatment}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider">Late</p>
                          <p className="font-semibold text-rose-600">{benefit.lateTreatment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-4">
        <motion.div
          className="flex items-center gap-2 text-neutral-400 text-xs"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Swipe for more</span>
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FREQUENCY CALCULATOR - INTERACTIVE
// ============================================================================

function MobileFrequencyCalculator() {
  const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const baseMonths = 6;
  const adjustedMonths = Math.max(
    3,
    baseMonths + Array.from(selectedFactors).reduce((acc, id) => {
      const factor = frequencyFactors.find((f) => f.id === id);
      return acc + (factor?.months || 0);
    }, 0)
  );

  const toggleFactor = (id: string) => {
    setSelectedFactors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const resetCalculator = () => {
    setSelectedFactors(new Set());
  };

  const progressPercentage = ((6 - adjustedMonths + 3) / 3) * 100;

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-white via-[#f5f0eb] to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-violet-200/40 to-transparent blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-br from-teal-200/40 to-transparent blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-200 text-violet-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <Brain className="w-4 h-4" />
          Personalized
        </span>
        <h2 className="font-display font-bold text-3xl text-neutral-900 leading-tight mb-2">
          How Often Should{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
            You Visit?
          </span>
        </h2>
        <p className="text-neutral-600 text-sm">
          Tap any factors that apply to you
        </p>
      </motion.div>

      {/* Factor Buttons */}
      <div className="space-y-2 mb-6 relative">
        {frequencyFactors.map((factor, index) => {
          const isSelected = selectedFactors.has(factor.id);
          return (
            <motion.button
              key={factor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => toggleFactor(factor.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-300 shadow-lg'
                  : 'bg-white border-neutral-100 shadow-md'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 border-violet-500'
                    : 'border-neutral-300 bg-white'
                }`}
                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </motion.div>
              <span className={`flex-1 font-medium text-sm ${isSelected ? 'text-violet-900' : 'text-neutral-700'}`}>
                {factor.label}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                  factor.risk === 'high'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {factor.risk === 'high' ? 'High' : 'Moderate'}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative overflow-hidden"
      >
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-[#722F37] via-[#8a3a44] to-[#5a252c] shadow-2xl">
          {/* Animated background pattern */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 15, repeat: Infinity }}
            />
          </div>

          <div className="relative flex items-center justify-between mb-6">
            <div>
              <p className="text-white/60 text-sm mb-1">Recommended frequency</p>
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={adjustedMonths}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-bold text-white"
                >
                  {adjustedMonths}
                </motion.span>
                <span className="text-xl text-white/70">months</span>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="w-20 h-20 relative">
              <svg className="w-full h-full -rotate-90" aria-hidden="true">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 214' }}
                  animate={{ strokeDasharray: `${(progressPercentage / 100) * 214} 214` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <CalendarCheck className="w-7 h-7 text-white/80" />
              </div>
            </div>
          </div>

          <p className="text-white/60 text-sm mb-4">
            {selectedFactors.size === 0
              ? 'Standard recommendation for healthy patients'
              : `Based on ${selectedFactors.size} risk factor${selectedFactors.size > 1 ? 's' : ''}`}
          </p>

          {selectedFactors.size > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={resetCalculator}
              className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              Reset calculator
            </motion.button>
          )}

          <div className="mt-5 pt-4 border-t border-white/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white/70 leading-relaxed">
              This is a general guideline. Your dentist will recommend the best schedule for you.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// APPOINTMENT OPTIONS - PREMIUM TIME SLOTS
// ============================================================================

function MobileAppointmentOptions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-white to-[#fafafa] relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <Clock className="w-4 h-4" />
          Flexible Scheduling
        </span>
        <h2 className="font-display font-bold text-3xl text-neutral-900 leading-tight">
          Times That{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            Fit You
          </span>
        </h2>
      </motion.div>

      {/* Time Slot Cards */}
      <div className="space-y-4">
        {appointmentOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div
                className={`relative bg-white rounded-3xl p-5 shadow-xl border-2 overflow-hidden ${
                  option.popular
                    ? 'border-amber-300 shadow-amber-100'
                    : 'border-neutral-100'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Popular Badge */}
                {option.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-0 right-4"
                  >
                    <span className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-b-xl shadow-lg flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Popular
                    </span>
                  </motion.div>
                )}

                <div className="flex items-center gap-4">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                      option.popular
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-300/50'
                        : 'bg-gradient-to-br from-neutral-100 to-neutral-50'
                    }`}
                    whileInView={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {option.emoji}
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-900 text-lg">{option.title}</h3>
                    <p className="text-base font-medium text-amber-600">{option.times}</p>
                    <p className="text-sm text-neutral-500">{option.description}</p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-neutral-400" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <Link href="/contact#book" className="block">
          <motion.button
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold text-base shadow-xl shadow-amber-500/30"
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-5 h-5" />
            Book Your Preferred Time
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

// ============================================================================
// HEALTH TIPS - ANIMATED GRID
// ============================================================================

function MobileHealthTips() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#fafafa] via-teal-50/30 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 right-0 w-40 h-40 bg-gradient-to-br from-teal-200/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-32 h-32 bg-gradient-to-br from-cyan-200/40 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-200 text-teal-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-4 h-4" />
          Between Visits
        </span>
        <h2 className="font-display font-bold text-3xl text-neutral-900 leading-tight">
          Keep Your Smile{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
            Healthy
          </span>
        </h2>
      </motion.div>

      {/* Tips Grid */}
      <div className="grid grid-cols-3 gap-3 relative">
        {healthTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-lg text-center h-full"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="font-bold text-neutral-900 text-xs leading-tight mb-1">{tip.title}</h3>
                <span className="text-[10px] text-teal-600 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">
                  {tip.frequency}
                </span>
              </motion.div>
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-white relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold tracking-wider uppercase mb-3">
          <CircleCheck className="w-4 h-4" />
          Common Questions
        </span>
        <h2 className="font-display font-bold text-3xl text-neutral-900">
          Frequently Asked
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <FAQAccordion items={faqs} />
      </motion.div>

      {/* Contact Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-neutral-600 text-sm mb-3">Still have questions?</p>
        <a
          href={`tel:${contactInfo.phone}`}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#722F37]/10 to-rose-500/10 rounded-full text-[#722F37] font-semibold"
        >
          <Phone className="w-5 h-5" />
          Call (613) 733-1312
        </a>
      </motion.div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

function MobileRelatedServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-white to-[#f5f0eb] relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-4 h-4" />
          Explore More
        </span>
        <h2 className="font-display font-bold text-3xl text-neutral-900">
          Related{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
            Services
          </span>
        </h2>
      </motion.div>

      {/* Service Cards */}
      <div className="space-y-3">
        {relatedServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <motion.div
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-lg"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                    whileInView={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="flex-1 font-bold text-neutral-900 text-base">{service.title}</span>
                  <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-neutral-400" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[#722F37] font-semibold"
        >
          View All Services
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA - GLASSMORPHISM
// ============================================================================

function StickyBottomCTA() {
  const phoneHref = `tel:${contactInfo.phone}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-neutral-200/50" />

      <div className="relative flex gap-3 p-4">
        <motion.a
          href={phoneHref}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-neutral-100 text-neutral-700 rounded-xl font-semibold text-sm shadow-sm"
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="w-5 h-5" />
          Call
        </motion.a>
        <Link href="/contact#book" className="flex-[2]">
          <motion.button
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-xl font-semibold text-sm shadow-xl shadow-[#722F37]/30 relative overflow-hidden"
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <Calendar className="w-5 h-5" />
            Book Checkup
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN MOBILE PAGE COMPONENT
// ============================================================================

export default function RoutineCheckupsPageMobile() {
  return (
    <main id="main-content" className="min-h-screen pb-28">
      {/* Immersive Hero */}
      <MobileHeroSection />

      {/* Why Checkups Matter */}
      <MobileWhyCheckupsMatter />

      {/* What to Expect Timeline */}
      <MobileWhatToExpect />

      {/* Early Detection Cards */}
      <MobileEarlyDetection />

      {/* Frequency Calculator */}
      <MobileFrequencyCalculator />

      {/* Appointment Options */}
      <MobileAppointmentOptions />

      {/* Health Tips Grid */}
      <MobileHealthTips />

      {/* FAQ Section */}
      <MobileFAQSection />

      {/* Related Services */}
      <MobileRelatedServices />

      {/* Final CTA */}
      <div className="pb-8">
        <ContactCtaBanner
          headline="Ready for Your Checkup?"
          description="Schedule your routine checkup today."
          bookText="Book Appointment"
          background="gradient"
        />
      </div>

      {/* Sticky Bottom CTA */}
      <StickyBottomCTA />
    </main>
  );
}
