'use client';

import React, { useState, useRef, useCallback } from 'react';
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
  Heart,
  Zap,
  Eye,
  Palette,
  Layers,
  Droplets,
  ChevronRight,
  Leaf,
  Timer,
  Smile,
  ShieldCheck,
  Gem,
  Stethoscope,
  ThumbsUp,
  Lightbulb,
  MapPin,
  Star,
  BadgeCheck,
  CircleCheck,
  Brush,
  Sun,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How long do white fillings last?',
    answer:
      'With proper care, white fillings typically last 5-10 years or longer. Regular dental checkups help monitor your fillings and ensure they remain in excellent condition.',
  },
  {
    question: 'Are white fillings as strong as silver?',
    answer:
      'Modern composites are incredibly durable and bond directly to your tooth structure, actually helping strengthen the tooth. They\'re perfect for small to medium restorations.',
  },
  {
    question: 'Can I replace my old silver fillings?',
    answer:
      'Absolutely! Many patients choose to replace amalgam fillings with natural-looking white composites for aesthetic reasons or personal preference. We can discuss your options.',
  },
  {
    question: 'Is the procedure painful?',
    answer:
      'We use local anesthesia for complete comfort. Most patients report feeling little to no discomfort during or after the procedure.',
  },
  {
    question: 'How do I care for white fillings?',
    answer:
      'Care for them just like natural teeth: brush twice daily, floss regularly, and maintain routine dental checkups. Avoid biting hard objects.',
  },
];

const benefits = [
  {
    icon: Smile,
    title: 'Natural Appearance',
    description: 'Precisely color-matched to blend seamlessly with your natural teeth',
    stat: '16+',
    statLabel: 'Shades Available',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: ShieldCheck,
    title: '100% Mercury-Free',
    description: 'Safe, biocompatible materials for your peace of mind',
    stat: '100%',
    statLabel: 'Metal-Free',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Leaf,
    title: 'Tooth-Conserving',
    description: 'Minimal drilling preserves more of your natural tooth structure',
    stat: '40%',
    statLabel: 'Less Drilling',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Same-Day Results',
    description: 'Walk in with a cavity, walk out with a beautiful smile',
    stat: '~45',
    statLabel: 'Minutes',
    gradient: 'from-violet-400 to-purple-500',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Gentle Preparation',
    description: 'We carefully remove decay while preserving maximum tooth structure using local anesthesia for complete comfort.',
    icon: Eye,
    duration: '~10 min',
    color: 'from-sky-400 to-blue-500',
  },
  {
    step: 2,
    title: 'Precision Bonding',
    description: 'Special conditioning agents create a strong molecular bond between your tooth and the filling.',
    icon: Droplets,
    duration: '~5 min',
    color: 'from-teal-400 to-emerald-500',
  },
  {
    step: 3,
    title: 'Artful Layering',
    description: 'Composite is carefully sculpted in layers and cured with UV light for maximum strength.',
    icon: Layers,
    duration: '~15 min',
    color: 'from-amber-400 to-orange-500',
  },
  {
    step: 4,
    title: 'Perfect Finish',
    description: 'Final shaping and polishing creates a natural, comfortable bite and beautiful shine.',
    icon: Gem,
    duration: '~10 min',
    color: 'from-rose-400 to-pink-500',
  },
];

const comparisonPoints = [
  { label: 'Appearance', composite: 'Natural', amalgam: 'Metallic', winner: 'composite', icon: Eye },
  { label: 'Mercury', composite: 'None', amalgam: '~50%', winner: 'composite', icon: ShieldCheck },
  { label: 'Bonding', composite: 'Direct', amalgam: 'Mechanical', winner: 'composite', icon: Layers },
  { label: 'Tooth Removal', composite: 'Minimal', amalgam: 'More', winner: 'composite', icon: Leaf },
];

const relatedServices = [
  {
    title: 'Root Canal Therapy',
    description: 'Save infected teeth with gentle, modern treatment',
    href: '/services/root-canal',
    icon: Shield,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Routine Checkups',
    description: 'Preventive care for lasting dental health',
    href: '/services/routine-checkups',
    icon: Stethoscope,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Teeth Whitening',
    description: 'Professional brightening for a radiant smile',
    href: '/services/teeth-whitening',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-600',
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleSpring = {
  tap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 17 },
};

// ============================================================================
// FLOATING DECORATIVE ELEMENTS
// ============================================================================

const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-200/20 blur-3xl"
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '-10%', left: '-20%' }}
    />
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-rose-200/25 to-pink-200/15 blur-3xl"
      animate={{
        x: [0, -25, 0],
        y: [0, 30, 0],
        scale: [1, 0.95, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      style={{ bottom: '10%', right: '-15%' }}
    />
  </div>
);

const DotPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
    <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
  </svg>
);

// ============================================================================
// MOBILE HERO SECTION
// ============================================================================

function MobileHeroSection() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.3]);

  return (
    <section className="relative min-h-[100svh] flex flex-col bg-gradient-to-b from-[#FFFBF7] via-[#FDF8F3] to-white overflow-hidden">
      <FloatingOrbs />
      <DotPattern />

      {/* Hero Image with Parallax */}
      <motion.div
        className="relative h-[45vh] w-full overflow-hidden"
        style={{ y: imageY }}
      >
        <Image
          src="/images/services/white-fillings/mobile/hero-smile.jpg"
          alt="Beautiful confident smile showcasing natural-looking white fillings"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#FFFBF7]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#722F37]/10 via-transparent to-transparent" />

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute top-5 left-5"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-xl shadow-black/5 border border-white/50">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </motion.div>
            <span className="text-xs font-semibold text-emerald-700">Mercury-Free</span>
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute top-5 right-5"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-md shadow-lg">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
            <span className="text-xs font-semibold text-white">Natural Results</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="flex-1 px-5 pt-6 pb-8 relative z-10"
        style={{ opacity }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Breadcrumb */}
          <motion.nav variants={fadeInUp} className="mb-5">
            <ol className="flex items-center gap-1.5 text-xs">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-[#722F37] transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3 h-3 text-neutral-300" />
              <li>
                <Link href="/services" className="text-neutral-400 hover:text-[#722F37] transition-colors">
                  Services
                </Link>
              </li>
              <ChevronRight className="w-3 h-3 text-neutral-300" />
              <li className="text-[#722F37] font-semibold">White Fillings</li>
            </ol>
          </motion.nav>

          {/* Title with Animated Gradient */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl xs:text-[2.75rem] font-bold text-neutral-900 leading-[1.1] tracking-tight mb-4"
          >
            Natural{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#A04550] bg-clip-text text-transparent">
                White Fillings
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-amber-200/60 to-orange-200/40 -rotate-1 rounded"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base text-neutral-600 leading-relaxed mb-8"
          >
            Restore your smile with invisible, tooth-colored restorations that blend seamlessly with your natural teeth.
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {[
              { value: '5-10+', label: 'Years', icon: Clock, color: 'from-blue-500 to-indigo-600' },
              { value: '~45', label: 'Minutes', icon: Timer, color: 'from-emerald-500 to-teal-600' },
              { value: '16+', label: 'Shades', icon: Palette, color: 'from-amber-500 to-orange-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden text-center p-4 bg-white rounded-2xl border border-neutral-100 shadow-lg shadow-neutral-100/50"
                whileTap={{ scale: 0.97 }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                <div className={`w-8 h-8 mx-auto mb-2 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-xl font-bold text-neutral-900">{stat.value}</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Sticky CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="sticky bottom-0 left-0 right-0 px-5 py-4 bg-white/95 backdrop-blur-xl border-t border-neutral-100 safe-area-bottom"
      >
        <Link href="/contact#book" className="block">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] bg-[length:200%_100%] text-white font-semibold rounded-2xl shadow-xl shadow-[#722F37]/20 flex items-center justify-center gap-2.5 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <Calendar className="w-5 h-5" />
            <span>Book Your Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
        <a
          href="tel:+16137336446"
          className="block mt-3 text-center text-neutral-600 font-medium text-sm py-2 active:text-[#722F37]"
        >
          Or call <span className="text-[#722F37] font-semibold">(613) 733-6446</span>
        </a>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE BENEFITS SECTION
// ============================================================================

function MobileBenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-14 px-5 bg-white relative overflow-hidden">
      <DotPattern />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
              Key Benefits
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl font-bold text-neutral-900 leading-tight">
            Why Choose{' '}
            <span className="text-[#722F37]">White Fillings?</span>
          </h2>
        </motion.div>

        {/* Benefits Cards */}
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
            >
              <motion.button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${
                  expandedIndex === index
                    ? 'bg-gradient-to-br from-[#FFFBF7] to-white border-[#722F37]/20 shadow-xl shadow-[#722F37]/5'
                    : 'bg-white border-neutral-100 shadow-sm'
                }`}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      expandedIndex === index
                        ? `bg-gradient-to-br ${benefit.gradient} shadow-lg`
                        : 'bg-gradient-to-br from-neutral-50 to-neutral-100'
                    }`}
                    animate={{
                      scale: expandedIndex === index ? 1.05 : 1,
                      rotate: expandedIndex === index ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <benefit.icon className={`w-7 h-7 ${
                      expandedIndex === index ? 'text-white' : 'text-[#722F37]'
                    }`} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-neutral-900">{benefit.title}</h3>
                      <div className="text-right ml-3">
                        <span className={`text-xl font-bold ${
                          expandedIndex === index ? 'text-[#722F37]' : 'text-neutral-700'
                        }`}>
                          {benefit.stat}
                        </span>
                        <span className="block text-[10px] text-neutral-500 font-medium uppercase tracking-wide">
                          {benefit.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 ${
                      expandedIndex === index ? 'text-[#722F37]' : 'text-neutral-400'
                    }`} />
                  </motion.div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-neutral-100">
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {benefit.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-[#722F37]">
                          <CircleCheck className="w-4 h-4" />
                          <span className="text-sm font-medium">Trusted by thousands</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE TRANSFORMATION SECTION (Before/After)
// ============================================================================

function MobileTransformationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-14 px-5 bg-gradient-to-b from-[#FFFBF7] to-white relative overflow-hidden">
      <FloatingOrbs />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">
              Invisible Restoration
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl font-bold text-neutral-900 leading-tight mb-2">
            See the{' '}
            <span className="text-[#722F37]">Transformation</span>
          </h2>
          <p className="text-sm text-neutral-600">
            White fillings blend perfectly with your natural teeth
          </p>
        </motion.div>

        {/* Transformation Visual */}
        <motion.div
          variants={fadeInScale}
          className="relative bg-white rounded-3xl p-6 shadow-2xl shadow-neutral-200/50 border border-neutral-100 mb-8 overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-transparent rounded-full blur-2xl" />

          <div className="relative flex items-center justify-center gap-6">
            {/* Before */}
            <motion.div
              className="text-center"
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center mb-3 shadow-inner">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-500 shadow-md" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center">
                  <span className="text-[10px] font-bold text-neutral-500">Ag</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-neutral-500">Silver Amalgam</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg shadow-[#722F37]/30">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              className="text-center"
              initial={{ x: 20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center mb-3 border-2 border-amber-200/50 shadow-lg shadow-amber-100/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFF8E7] to-[#FFE8CC] border border-amber-200/50" />
                <motion.div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                </motion.div>
              </div>
              <span className="text-sm font-semibold text-[#722F37]">White Composite</span>
            </motion.div>
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : { x: '-100%' }}
            transition={{ delay: 0.8, duration: 1.5 }}
          />
        </motion.div>

        {/* Key Points */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Eye, title: 'Invisible', desc: 'Matches tooth color', color: 'from-blue-400 to-indigo-500' },
            { icon: ShieldCheck, title: 'Preserves', desc: 'Natural structure', color: 'from-emerald-400 to-teal-500' },
            { icon: ThumbsUp, title: 'Strong Bond', desc: 'Durable results', color: 'from-amber-400 to-orange-500' },
            { icon: Lightbulb, title: 'Modern', desc: 'Advanced materials', color: 'from-violet-400 to-purple-500' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-lg shadow-neutral-100/50"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-md`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">{item.title}</h4>
              <p className="text-xs text-neutral-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE COMPARISON SECTION
// ============================================================================

function MobileComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-14 px-5 bg-white relative overflow-hidden">
      <DotPattern />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Comparison
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl font-bold text-neutral-900 leading-tight">
            Composite vs{' '}
            <span className="text-neutral-400">Amalgam</span>
          </h2>
        </motion.div>

        {/* Comparison Cards */}
        <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mb-6">
          {/* White Composite */}
          <div className="relative p-5 rounded-3xl bg-gradient-to-br from-[#FFFBF7] to-white border-2 border-[#722F37]/20 shadow-xl shadow-[#722F37]/5 overflow-hidden">
            <motion.div
              className="absolute top-3 right-3"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </motion.div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFF8E7] to-[#FFE8CC] mx-auto mb-4 border-2 border-amber-200/50 shadow-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-bold text-neutral-900 text-center mb-1">White Composite</h3>
            <span className="block text-center text-xs text-emerald-600 font-semibold bg-emerald-50 rounded-full py-1 px-3 mx-auto w-fit">
              RECOMMENDED
            </span>
          </div>

          {/* Silver Amalgam */}
          <div className="relative p-5 rounded-3xl bg-neutral-50 border border-neutral-200 opacity-70">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-400 mx-auto mb-4 shadow-inner flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-neutral-500" />
            </div>
            <h3 className="font-semibold text-neutral-600 text-center mb-1">Silver Amalgam</h3>
            <span className="block text-center text-xs text-neutral-500 font-medium bg-neutral-100 rounded-full py-1 px-3 mx-auto w-fit">
              TRADITIONAL
            </span>
          </div>
        </motion.div>

        {/* Comparison Points */}
        <motion.div variants={fadeInUp} className="space-y-2">
          {comparisonPoints.map((point, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center flex-shrink-0">
                <point.icon className="w-4 h-4 text-neutral-500" />
              </div>
              <span className="text-xs font-semibold text-neutral-500 w-20 flex-shrink-0">
                {point.label}
              </span>
              <div className="flex-1 flex items-center gap-2">
                <span className="flex-1 text-xs text-center py-2 rounded-xl bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                  {point.composite}
                </span>
                <span className="text-neutral-300 text-xs">vs</span>
                <span className="flex-1 text-xs text-center py-2 rounded-xl bg-neutral-50 text-neutral-500 font-medium">
                  {point.amalgam}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mercury-Free Badge */}
        <motion.div
          variants={fadeInScale}
          className="mt-6 p-5 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="relative flex items-center gap-4">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <ShieldCheck className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <p className="font-bold text-lg">100% Mercury-Free</p>
              <p className="text-sm text-white/80">Safe biocompatible materials for all ages</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE PROCEDURE SECTION
// ============================================================================

function MobileProcedureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={ref} className="py-14 px-5 bg-gradient-to-b from-[#FFFBF7] to-white relative overflow-hidden">
      <FloatingOrbs />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
              Simple Process
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl font-bold text-neutral-900 leading-tight mb-2">
            What to{' '}
            <span className="text-[#722F37]">Expect</span>
          </h2>
          <p className="text-sm text-neutral-600">
            A comfortable procedure completed in just one visit
          </p>
        </motion.div>

        {/* Step Indicators */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-between mb-8 relative"
        >
          {/* Progress Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-neutral-200 rounded-full" />
          <motion.div
            className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStep / (procedureSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            style={{ maxWidth: 'calc(100% - 48px)' }}
          />

          {procedureSteps.map((step, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              className="relative z-10 flex flex-col items-center"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                  i === activeStep
                    ? `bg-gradient-to-br ${step.color} border-transparent shadow-lg`
                    : i < activeStep
                    ? 'bg-[#722F37]/10 border-[#722F37]/30'
                    : 'bg-white border-neutral-200'
                }`}
                animate={{
                  scale: i === activeStep ? 1.1 : 1,
                  y: i === activeStep ? -4 : 0,
                }}
              >
                <step.icon className={`w-5 h-5 ${
                  i === activeStep ? 'text-white' : i < activeStep ? 'text-[#722F37]' : 'text-neutral-400'
                }`} />
              </motion.div>
              <span className={`text-[10px] mt-2 font-semibold ${
                i === activeStep ? 'text-[#722F37]' : 'text-neutral-400'
              }`}>
                Step {step.step}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Step Content */}
        <AnimatePresence mode="wait">
          {procedureSteps[activeStep] && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="bg-white rounded-3xl p-6 shadow-2xl shadow-neutral-200/50 border border-neutral-100 relative overflow-hidden"
            >
              {/* Step gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${procedureSteps[activeStep].color}`} />

              <div className="flex items-start gap-4 mb-5">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${procedureSteps[activeStep].color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {React.createElement(procedureSteps[activeStep].icon, {
                    className: 'w-8 h-8 text-white',
                  })}
                </motion.div>
                <div>
                  <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                    Step {procedureSteps[activeStep].step} of {procedureSteps.length}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {procedureSteps[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-5">
                {procedureSteps[activeStep].description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-xl">
                  <Clock className="w-4 h-4 text-[#722F37]" />
                  <span className="font-semibold text-neutral-700">{procedureSteps[activeStep].duration}</span>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center disabled:opacity-40"
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5 rotate-180 text-neutral-600" />
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveStep(Math.min(procedureSteps.length - 1, activeStep + 1))}
                    disabled={activeStep === procedureSteps.length - 1}
                    className="w-10 h-10 rounded-xl bg-[#722F37] flex items-center justify-center disabled:opacity-40"
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Summary */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 p-5 rounded-3xl bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#722F37] text-white relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Timer className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Quick & Comfortable</p>
              <p className="text-sm text-white/80">Most fillings completed in approximately 45 minutes</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE FAQ SECTION
// ============================================================================

function MobileFAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-14 px-5 bg-white relative overflow-hidden">
      <DotPattern />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">
              Common Questions
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl font-bold text-neutral-900 leading-tight">
            Frequently{' '}
            <span className="text-[#722F37]">Asked</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-gradient-to-br from-[#FFFBF7] to-white border-[#722F37]/20 shadow-xl shadow-[#722F37]/5'
                    : 'bg-white border-neutral-100 shadow-sm'
                }`}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <motion.div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        openIndex === index
                          ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42]'
                          : 'bg-neutral-100'
                      }`}
                      animate={{ rotate: openIndex === index ? 360 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className={`text-sm font-bold ${
                        openIndex === index ? 'text-white' : 'text-neutral-500'
                      }`}>
                        {index + 1}
                      </span>
                    </motion.div>
                    <span className={`font-semibold leading-snug ${
                      openIndex === index ? 'text-neutral-900' : 'text-neutral-700'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 ${
                      openIndex === index ? 'text-[#722F37]' : 'text-neutral-400'
                    }`} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-neutral-600 leading-relaxed mt-4 pt-4 border-t border-neutral-100 pl-11">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 text-center"
        >
          <p className="text-sm text-neutral-500 mb-4">Have more questions? We're here to help!</p>
          <a
            href="tel:+16137336446"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 rounded-2xl text-[#722F37] font-semibold active:bg-neutral-200 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call (613) 733-6446
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE RELATED SERVICES SECTION
// ============================================================================

function MobileRelatedServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-14 px-5 bg-gradient-to-b from-[#FFFBF7] to-white relative overflow-hidden">
      <FloatingOrbs />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">
              Explore More
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl font-bold text-neutral-900 leading-tight">
            Related{' '}
            <span className="text-[#722F37]">Services</span>
          </h2>
        </motion.div>

        {/* Service Cards */}
        <div className="space-y-4">
          {relatedServices.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
            >
              <Link href={service.href}>
                <motion.div
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-lg shadow-neutral-100/50 relative overflow-hidden"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Gradient accent */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${service.color}`} />

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-0.5">{service.title}</h3>
                    <p className="text-sm text-neutral-500 line-clamp-1">{service.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Services */}
        <motion.div variants={fadeInUp} className="mt-6">
          <Link href="/services">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 border-2 border-[#722F37]/20 text-[#722F37] font-semibold rounded-2xl flex items-center justify-center gap-2 bg-white hover:bg-[#FFFBF7] transition-colors"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE CTA SECTION
// ============================================================================

function MobileCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-16 px-5 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={fadeInUp}
          className="mb-6"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.1)',
                '0 0 40px rgba(255,255,255,0.2)',
                '0 0 20px rgba(255,255,255,0.1)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Natural-Looking Results
          </motion.span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeInUp}
          className="text-3xl xs:text-4xl font-bold text-white mb-4 leading-tight"
        >
          Ready for a{' '}
          <span className="text-amber-300">Beautiful</span>{' '}
          Smile?
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-white/80 mb-8 max-w-sm mx-auto"
        >
          Schedule your consultation and discover how white fillings can restore your teeth naturally.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeInUp} className="space-y-3">
          <Link href="/contact#book" className="block">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-[#722F37] font-bold rounded-2xl shadow-2xl shadow-black/20 flex items-center justify-center gap-2.5 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#722F37]/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>

          <a href="tel:+16137336446" className="block">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              (613) 733-6446
            </motion.button>
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8"
        >
          {[
            { icon: ShieldCheck, text: 'Mercury-Free' },
            { icon: Zap, text: 'Same-Day' },
            { icon: Heart, text: 'Gentle Care' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-white/60 text-xs">
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE BOTTOM NAV
// ============================================================================

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-neutral-200 px-4 py-2 z-50 safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <a
          href="tel:+16137336446"
          className="flex flex-col items-center gap-1 py-2 px-4 text-neutral-500 active:text-[#722F37] transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium">Call</span>
        </a>

        <Link href="/contact#book">
          <motion.div
            className="flex flex-col items-center gap-1 py-3 px-8 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white rounded-2xl -mt-5 shadow-xl shadow-[#722F37]/30 relative overflow-hidden"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Book Now</span>
          </motion.div>
        </Link>

        <Link
          href="/contact"
          className="flex flex-col items-center gap-1 py-2 px-4 text-neutral-500 active:text-[#722F37] transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] font-medium">Location</span>
        </Link>
      </div>
    </nav>
  );
}

// ============================================================================
// MAIN MOBILE COMPONENT
// ============================================================================

export function WhiteFillingsContentMobile() {
  return (
    <main id="main-content" className="min-h-screen pb-24 overflow-x-hidden">
      <MobileHeroSection />
      <MobileBenefitsSection />
      <MobileTransformationSection />
      <MobileComparisonSection />
      <MobileProcedureSection />
      <MobileFAQSection />
      <MobileRelatedServicesSection />
      <MobileCTASection />
      <MobileBottomNav />
    </main>
  );
}
