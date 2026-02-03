'use client';

import { useState, useRef, useEffect } from 'react';
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
  Activity,
  Clock,
  Star,
  ThumbsUp,
  Smile,
  Award,
  CheckCircle2,
  XCircle,
  Quote,
  Syringe,
  Microscope,
  Timer,
  HeartPulse,
  ShieldCheck,
  CircleDot,
  Target,
  Layers,
  Crown,
  ChevronRight,
  MapPin,
  Sparkles,
  BadgeCheck,
  Play,
  ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// ============================================================================
// DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is root canal treatment painful?',
    answer:
      'Modern root canal treatment is performed with effective local anesthesia and is generally no more uncomfortable than getting a filling. Most patients report significant relief from the pain caused by the infection.',
  },
  {
    question: "What happens if I don't get a root canal?",
    answer:
      "Without treatment, the infection can spread beyond the tooth, causing an abscess, bone loss, and potentially affecting neighboring teeth. Ultimately, delaying treatment often leads to tooth extraction.",
  },
  {
    question: 'How successful is root canal treatment?',
    answer:
      'Root canal treatment has a very high success rate of over 95%. With proper care, including a dental crown and good oral hygiene, your treated tooth can last a lifetime.',
  },
  {
    question: 'How long does a root canal take?',
    answer:
      "Most root canal treatments can be completed in one to two appointments, depending on the complexity. Each appointment typically lasts about 60-90 minutes.",
  },
  {
    question: 'Will I need a crown after my root canal?',
    answer:
      'In most cases, yes. A crown is recommended to protect the treated tooth, which may become more brittle after the procedure. The crown restores full function and provides long-term protection.',
  },
];

const mythsVsReality = [
  {
    myth: 'Root canals are extremely painful',
    reality: 'Modern anesthesia makes it virtually painless—most feel immediate relief',
    icon: HeartPulse,
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    myth: "It's better to just extract the tooth",
    reality: 'Keeping your natural tooth is always preferable—root canal saves it',
    icon: Smile,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    myth: 'Root canals cause illness',
    reality: 'This myth has been debunked—root canals are safe and prevent infection',
    icon: ShieldCheck,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    myth: 'Recovery takes weeks',
    reality: 'Most patients return to normal activities the same day',
    icon: Timer,
    gradient: 'from-blue-500 to-indigo-500',
  },
];

const benefits = [
  {
    icon: Heart,
    title: 'Save Your Natural Tooth',
    description: 'Preserve your natural smile and tooth structure',
    stat: '100%',
    statLabel: 'Natural',
    color: 'rose',
  },
  {
    icon: Zap,
    title: 'Immediate Pain Relief',
    description: 'Quick relief from throbbing pain and sensitivity',
    stat: '24hr',
    statLabel: 'Relief',
    color: 'amber',
  },
  {
    icon: Shield,
    title: '95%+ Success Rate',
    description: 'Highly reliable with excellent outcomes',
    stat: '95%',
    statLabel: 'Success',
    color: 'emerald',
  },
  {
    icon: Activity,
    title: 'Modern Technology',
    description: 'Advanced techniques for comfort and precision',
    stat: '3D',
    statLabel: 'Imaging',
    color: 'blue',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Diagnosis',
    description: 'X-rays and examination to assess infection and plan treatment.',
    icon: Microscope,
    duration: 'Initial Visit',
    color: 'from-violet-500 to-purple-600',
  },
  {
    step: 2,
    title: 'Anesthesia',
    description: 'Complete numbing for your comfort throughout the procedure.',
    icon: Syringe,
    duration: 'Day 1',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: 3,
    title: 'Access & Cleaning',
    description: 'Small opening created, infected pulp carefully removed.',
    icon: Target,
    duration: 'Day 1',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    step: 4,
    title: 'Shaping & Filling',
    description: 'Canals shaped and sealed with biocompatible material.',
    icon: Layers,
    duration: 'Day 1',
    color: 'from-amber-500 to-orange-500',
  },
  {
    step: 5,
    title: 'Restoration',
    description: 'Crown placed to restore strength and natural appearance.',
    icon: Crown,
    duration: 'Follow-up',
    color: 'from-rose-500 to-pink-500',
  },
];

const warningSymptoms = [
  { symptom: 'Severe toothache when chewing', severity: 'high' },
  { symptom: 'Prolonged sensitivity to hot/cold', severity: 'medium' },
  { symptom: 'Tooth darkening or discoloration', severity: 'medium' },
  { symptom: 'Swelling in nearby gums', severity: 'high' },
  { symptom: 'Abscess or pimple on gums', severity: 'high' },
];

const testimonials = [
  {
    quote:
      'I was terrified of getting a root canal, but Dr. Smith made me feel completely at ease. The procedure was painless!',
    author: 'Sarah M.',
    role: 'Patient',
    rating: 5,
    image: '/images/services/root-canal/patient-smiling-mirror.jpg',
  },
  {
    quote:
      'After years of avoiding the dentist, I finally got my root canal done here. The whole team was incredibly gentle.',
    author: 'Michael R.',
    role: 'Patient',
    rating: 5,
    image: '/images/services/root-canal/hero-happy-patient.jpg',
  },
  {
    quote: "Professional, caring, and absolutely pain-free. I wish I had done this sooner!",
    author: 'Jennifer L.',
    role: 'Patient',
    rating: 5,
    image: '/images/services/root-canal/woman-dental-care.jpg',
  },
];

const recoveryTimeline = [
  { day: 'Day 1', title: 'Treatment Complete', description: 'Take prescribed medication as needed', icon: Check },
  { day: 'Days 2-3', title: 'Mild Tenderness', description: 'OTC pain relief helps', icon: HeartPulse },
  { day: 'Week 1', title: 'Back to Normal', description: 'Resume all normal activities', icon: Smile },
  { day: 'Week 2', title: 'Crown Placement', description: 'Return for permanent crown', icon: Crown },
];

const relatedServices = [
  {
    title: 'White Fillings',
    description: 'Natural-looking composite fillings',
    href: '/services/white-fillings',
    icon: Check,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Preventive Dentistry',
    description: 'Comprehensive preventive care',
    href: '/services/preventive-dentistry',
    icon: Shield,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Routine Checkups',
    description: 'Regular examinations for optimal health',
    href: '/services/routine-checkups',
    icon: Check,
    gradient: 'from-violet-500 to-purple-500',
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-teal-400/20 to-emerald-400/10 blur-3xl"
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '-10%', left: '-20%' }}
    />
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/15 to-blue-400/10 blur-3xl"
      animate={{
        x: [0, -25, 0],
        y: [0, 25, 0],
        scale: [1, 0.9, 1],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      style={{ bottom: '10%', right: '-15%' }}
    />
  </div>
);

const GlowOrb = ({ className = '' }: { className?: string }) => (
  <div className={`absolute w-32 h-32 rounded-full bg-gradient-to-br from-teal-400/30 to-emerald-400/20 blur-2xl ${className}`} />
);

const NoiseTexture = () => (
  <div
    className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
);

// ============================================================================
// MOBILE HERO SECTION - Premium Full-Screen Experience
// ============================================================================

function MobileHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col">
      {/* Full-screen Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale, opacity: imageOpacity }}>
        <Image
          src="/images/services/root-canal/hero-happy-patient.jpg"
          alt="Happy patient smiling at dental clinic"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Premium Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2925] via-transparent to-transparent opacity-90" />
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeOut',
            }}
            style={{
              left: `${15 + i * 15}%`,
              bottom: '20%',
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <motion.div className="relative z-10 flex-1 flex flex-col justify-end px-5 pb-8 pt-20" style={{ y: contentY }}>
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 left-5 right-5"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-xs text-white/70">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/40">/</li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/40">/</li>
            <li className="text-teal-300 font-medium">Root Canal</li>
          </ol>
        </motion.nav>

        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
            </motion.span>
            Gentle, Pain-Free Treatment
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl xs:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4"
        >
          Save Your{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300">
              Smile
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-teal-500/40 to-emerald-500/40 blur-sm rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </span>
          <br />
          <span className="text-2xl xs:text-3xl font-normal text-white/80">Without the Pain</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 text-lg leading-relaxed mb-6 max-w-sm"
        >
          Modern root canal treatment is nothing like its reputation. Experience relief—not pain.
        </motion.p>

        {/* Stats Row - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-2 mb-6"
        >
          {[
            { value: '95%', label: 'Success', icon: Shield },
            { value: '0', label: 'Pain Level', icon: Heart },
            { value: '1-2', label: 'Visits', icon: Clock },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden text-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="relative">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-teal-300" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Link href="/contact#book">
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-lg"
            >
              {/* Animated Gradient Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ width: '200%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500" />
              <span className="relative flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5" />
                Book Consultation
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.div>
          </Link>

          <motion.a
            href="tel:+16137336446"
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium"
          >
            <Phone className="w-5 h-5" />
            (613) 733-6446
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// WHAT IS ROOT CANAL - MOBILE
// ============================================================================

function MobileWhatIsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const points = [
    { icon: Heart, text: 'Saves your natural tooth', color: 'rose' },
    { icon: Shield, text: 'Eliminates infection', color: 'emerald' },
    { icon: Zap, text: 'Relieves pain', color: 'amber' },
    { icon: Clock, text: 'Restores normal function', color: 'blue' },
  ];

  return (
    <section ref={ref} className="relative px-5 py-16 bg-white overflow-hidden">
      <FloatingOrbs />
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-teal-700 text-sm font-medium mb-4">
            <Microscope className="w-4 h-4" />
            Understanding the Procedure
          </span>

          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
            What is a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
              Root Canal?
            </span>
          </h2>

          <p className="text-gray-600 text-base leading-relaxed">
            A root canal repairs and saves a badly decayed or infected tooth. The procedure removes the damaged area,
            cleans and disinfects it, then fills and seals it.
          </p>
        </motion.div>

        {/* Image with Overlay */}
        <motion.div variants={scaleIn} className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-teal-900/10">
          <div className="aspect-[4/3]">
            <Image
              src="/images/services/root-canal/dental-checkup.jpg"
              alt="Gentle dental examination"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Floating Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <BadgeCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Over 95% Success Rate</p>
                <p className="text-sm text-gray-600">Trusted by thousands of patients</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Key Points */}
        <motion.div variants={staggerItem} className="space-y-3">
          {points.map((item, idx) => {
            const Icon = item.icon;
            const colorClasses = {
              rose: 'from-rose-500 to-pink-500 shadow-rose-500/20',
              emerald: 'from-emerald-500 to-teal-500 shadow-emerald-500/20',
              amber: 'from-amber-500 to-orange-500 shadow-amber-500/20',
              blue: 'from-blue-500 to-cyan-500 shadow-blue-500/20',
            };
            return (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-sm"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-800 font-medium">{item.text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MYTH VS REALITY - MOBILE (Premium Accordion)
// ============================================================================

function MobileMythsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative px-5 py-16 bg-gradient-to-b from-white via-teal-50/30 to-white overflow-hidden">
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-teal-700 text-sm font-medium mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Setting the Record Straight
          </span>

          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
            Myths vs{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Reality</span>
          </h2>

          <p className="text-gray-600 text-base">Root canals have an unfair reputation. Here&apos;s the truth.</p>
        </motion.div>

        {/* Premium Accordion Cards */}
        <motion.div variants={staggerItem} className="space-y-4">
          {mythsVsReality.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                layout
                className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? 'bg-white shadow-2xl shadow-teal-900/10 ring-2 ring-teal-200'
                    : 'bg-white shadow-md'
                }`}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full p-5 text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: isExpanded ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Myth</span>
                      </div>
                      <p className={`text-sm text-gray-500 ${isExpanded ? '' : 'line-clamp-1'}`}>
                        <span className="line-through decoration-red-300">{item.myth}</span>
                      </p>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isExpanded ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                      <div className="px-5 pb-5">
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Reality</span>
                          </div>
                          <p className="text-gray-800 font-medium leading-relaxed">{item.reality}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// PROCEDURE STEPS - MOBILE (Immersive Timeline)
// ============================================================================

function MobileProcedureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={ref} className="relative py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-teal-500/10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '-20%', right: '-20%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '-10%', left: '-20%' }}
        />
      </div>
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 px-5"
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm font-medium mb-4">
            <Activity className="w-4 h-4 text-teal-400" />
            Step-by-Step Process
          </span>

          <h2 className="text-3xl font-bold text-white leading-tight mb-2">
            Simple, Gentle{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Procedure</span>
          </h2>

          <p className="text-white/70 text-base">Understanding each step can help ease anxiety.</p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div variants={staggerItem} className="flex gap-1 mb-6">
          {procedureSteps.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                idx === activeStep ? 'bg-gradient-to-r from-teal-400 to-emerald-400' : idx < activeStep ? 'bg-teal-600' : 'bg-white/10'
              }`}
              animate={idx === activeStep ? { scaleY: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>

        {/* Steps */}
        <motion.div variants={staggerItem} className="space-y-3">
          {procedureSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <motion.button
                key={index}
                onClick={() => setActiveStep(index)}
                whileTap={{ scale: 0.98 }}
                layout
                className={`w-full text-left p-5 rounded-3xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm ring-2 ring-teal-400/50 shadow-xl shadow-teal-500/10'
                    : 'bg-white/5 active:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'shadow-lg shadow-teal-500/30' : ''
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl ring-2 ring-white/30"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-teal-400/20 text-teal-300' : 'bg-white/10 text-white/50'
                        }`}
                      >
                        Step {step.step}
                      </span>
                      <span className="text-xs text-white/40">{step.duration}</span>
                    </div>
                    <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-white/80'}`}>{step.title}</h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-white/60 text-sm leading-relaxed"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 flex-shrink-0 mt-1 transition-all ${
                      isActive ? 'text-teal-400 rotate-90' : 'text-white/30'
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// BENEFITS - MOBILE (3D Card Carousel)
// ============================================================================

function MobileBenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colorMap = {
    rose: {
      bg: 'from-rose-500 to-pink-500',
      light: 'from-rose-50 to-pink-50',
      text: 'text-rose-600',
      shadow: 'shadow-rose-500/30',
    },
    amber: {
      bg: 'from-amber-500 to-orange-500',
      light: 'from-amber-50 to-orange-50',
      text: 'text-amber-600',
      shadow: 'shadow-amber-500/30',
    },
    emerald: {
      bg: 'from-emerald-500 to-teal-500',
      light: 'from-emerald-50 to-teal-50',
      text: 'text-emerald-600',
      shadow: 'shadow-emerald-500/30',
    },
    blue: {
      bg: 'from-blue-500 to-cyan-500',
      light: 'from-blue-50 to-cyan-50',
      text: 'text-blue-600',
      shadow: 'shadow-blue-500/30',
    },
  };

  return (
    <section ref={ref} className="relative py-16 bg-white overflow-hidden">
      <FloatingOrbs />
      <NoiseTexture />

      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
        {/* Section Header */}
        <div className="px-5 mb-8">
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-teal-700 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Why Choose Root Canal
            </span>

            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Benefits of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Treatment
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Horizontal Scroll Cards */}
        <motion.div variants={staggerItem} className="overflow-x-auto pb-6 -mx-5 px-5 scrollbar-hide">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const colors = colorMap[benefit.color as keyof typeof colorMap];

              return (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-[280px] flex-shrink-0 p-6 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden"
                >
                  {/* Background Decoration */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.light} rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2`} />

                  <div className="relative">
                    {/* Stat */}
                    <div className="mb-4">
                      <div className={`text-4xl font-black ${colors.text}`}>{benefit.stat}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">{benefit.statLabel}</div>
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4 shadow-lg ${colors.shadow}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div variants={fadeIn} className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
          Swipe for more
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// WARNING SYMPTOMS - MOBILE
// ============================================================================

function MobileWarningSymptomsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative px-5 py-16 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden">
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 text-sm font-medium mb-4">
            <AlertCircle className="w-4 h-4" />
            Warning Signs
          </span>

          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
            When Is Root Canal{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Needed?</span>
          </h2>

          <p className="text-gray-600 text-base">If you&apos;re experiencing any of these symptoms, schedule a consultation:</p>
        </motion.div>

        {/* Symptoms Grid */}
        <motion.div variants={staggerItem} className="space-y-3 mb-8">
          {warningSymptoms.map((item, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                item.severity === 'high'
                  ? 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
                  : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                }`}
              >
                <AlertCircle className={`w-5 h-5 ${item.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`} />
              </div>
              <span className="text-gray-800 font-medium text-sm">{item.symptom}</span>
              {item.severity === 'high' && (
                <span className="ml-auto text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded-full">URGENT</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Emergency CTA */}
        <motion.div
          variants={scaleIn}
          className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-xl shadow-teal-500/30"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }} />
          </div>

          <div className="relative flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg mb-1">Experiencing tooth pain?</p>
              <p className="text-white/80 text-sm mb-4">Early treatment prevents complications.</p>
              <motion.a
                href="tel:+16137336446"
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-teal-600 font-bold text-sm shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Call (613) 733-6446
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS - MOBILE (Premium Carousel)
// ============================================================================

function MobileTestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative py-16 bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '-20%', left: '-10%' }}
        />
      </div>
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        {/* Section Header */}
        <div className="px-5 mb-8">
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-4">
              <Quote className="w-4 h-4" />
              Patient Stories
            </span>

            <h2 className="text-3xl font-bold text-white leading-tight">
              Real Experiences,{' '}
              <span className="text-white/80">Real Relief</span>
            </h2>
          </motion.div>
        </div>

        {/* Testimonial Card */}
        <motion.div variants={staggerItem} className="px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -right-4 w-24 h-24 text-white/10">
                <Quote className="w-full h-full" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[activeIndex]?.rating ?? 0)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white text-lg leading-relaxed mb-6">&ldquo;{testimonials[activeIndex]?.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30">
                  <Image
                    src={testimonials[activeIndex]?.image || ''}
                    alt={testimonials[activeIndex]?.author || ''}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-white font-bold">{testimonials[activeIndex]?.author}</p>
                  <p className="text-white/60 text-sm">{testimonials[activeIndex]?.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 h-2.5 bg-white rounded-full'
                    : 'w-2.5 h-2.5 bg-white/30 rounded-full hover:bg-white/50'
                }`}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// RECOVERY TIMELINE - MOBILE
// ============================================================================

function MobileRecoverySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative px-5 py-16 bg-white overflow-hidden">
      <FloatingOrbs />
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-teal-700 text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            Recovery Guide
          </span>

          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
            What to Expect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
              After Treatment
            </span>
          </h2>

          <p className="text-gray-600 text-base">Recovery is quicker than you might think.</p>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={staggerItem} className="space-y-0">
          {recoveryTimeline.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === recoveryTimeline.length - 1;

            return (
              <div key={index} className="flex gap-4">
                {/* Timeline Connector */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.15, type: 'spring' }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  {!isLast && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={isInView ? { height: '100%' } : {}}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                      className="w-0.5 flex-1 bg-gradient-to-b from-teal-400 to-teal-200 my-2"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-8'}`}>
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-600 text-xs font-bold mb-2 border border-teal-100">
                    {item.day}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION - MOBILE
// ============================================================================

function MobileFAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section ref={ref} className="relative px-5 py-16 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-teal-700 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Common Questions
          </span>

          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ Accordions */}
        <motion.div variants={staggerItem} className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                layout
                className={`rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-white shadow-xl shadow-teal-900/10 ring-2 ring-teal-200'
                    : 'bg-white shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-5 py-5 flex items-center justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-base pr-4 transition-colors ${isOpen ? 'text-teal-700' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isOpen ? 'bg-gradient-to-br from-teal-500 to-emerald-500 text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
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
                      <div className="px-5 pb-5 pt-0 border-t border-teal-100">
                        <p className="text-gray-600 text-sm leading-relaxed pt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact Link */}
        <motion.div variants={fadeIn} className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-3">Still have questions?</p>
          <motion.a
            href="tel:+16137336446"
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 text-teal-600 font-semibold"
          >
            <Phone className="w-5 h-5" />
            Call (613) 733-6446
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES - MOBILE
// ============================================================================

function MobileRelatedServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative px-5 py-16 bg-white overflow-hidden">
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.h2 variants={staggerItem} className="text-2xl font-bold text-gray-900 mb-2">
          Related Services
        </motion.h2>
        <motion.p variants={staggerItem} className="text-gray-600 text-sm mb-6">
          Explore other dental care options.
        </motion.p>

        <motion.div variants={staggerItem} className="space-y-3">
          {relatedServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <Link key={index} href={service.href}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 active:bg-teal-50 active:border-teal-200 transition-colors"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{service.title}</h3>
                    <p className="text-gray-500 text-sm truncate">{service.description}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        <Link href="/services">
          <motion.div
            variants={fadeIn}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 mt-6 py-3 text-teal-600 font-semibold"
          >
            View All Services <ArrowRight className="w-5 h-5" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}

// ============================================================================
// FINAL CTA - MOBILE (Premium Full-Width)
// ============================================================================

function MobileFinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-teal-500/20 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '-30%', left: '-20%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          style={{ bottom: '-20%', right: '-15%' }}
        />
      </div>
      <NoiseTexture />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 px-5 text-center"
      >
        {/* Icon */}
        <motion.div variants={scaleIn} className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500/30 to-emerald-500/30 backdrop-blur-sm border border-white/10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HeartPulse className="w-10 h-10 text-teal-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2 variants={staggerItem} className="text-3xl font-bold text-white leading-tight mb-4">
          Don&apos;t Let Tooth Pain
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            Hold You Back
          </span>
        </motion.h2>

        <motion.p variants={staggerItem} className="text-white/70 text-base mb-8 max-w-sm mx-auto">
          Schedule your consultation today. Our gentle approach makes treatment comfortable and stress-free.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={staggerItem} className="space-y-3">
          <Link href="/contact#book">
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ width: '200%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500" />
              <span className="relative flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5" />
                Book Appointment
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.div>
          </Link>

          <motion.a
            href="tel:+16137336446"
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold"
          >
            <Phone className="w-5 h-5" />
            (613) 733-6446
          </motion.a>
        </motion.div>

        {/* Location */}
        <motion.div variants={fadeIn} className="mt-10 pt-8 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <MapPin className="w-4 h-4" />
            <span>1729 Bank St, Ottawa, ON</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA BAR - MOBILE
// ============================================================================

function MobileStickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 py-3 safe-area-bottom shadow-2xl shadow-black/10"
        >
          <div className="flex items-center gap-3">
            <motion.a
              href="tel:+16137336446"
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white text-teal-600 font-semibold rounded-2xl border-2 border-teal-200"
            >
              <Phone className="w-5 h-5" />
              Call
            </motion.a>
            <Link href="/contact#book" className="flex-[2]">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-teal-600/30"
              >
                <Calendar className="w-5 h-5" />
                Book Consultation
              </motion.div>
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

export function RootCanalContentMobile() {
  return (
    <main id="main-content" className="min-h-screen pb-24 overflow-x-hidden">
      <MobileHeroSection />
      <MobileWhatIsSection />
      <MobileMythsSection />
      <MobileProcedureSection />
      <MobileBenefitsSection />
      <MobileWarningSymptomsSection />
      <MobileTestimonialsSection />
      <MobileRecoverySection />
      <MobileFAQSection />
      <MobileRelatedServicesSection />
      <MobileFinalCTA />
      <MobileStickyBottomCTA />
    </main>
  );
}
