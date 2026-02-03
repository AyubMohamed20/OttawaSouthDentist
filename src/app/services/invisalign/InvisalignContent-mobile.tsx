'use client';

import { useState, useRef } from 'react';
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
  Eye,
  Smile,
  RefreshCw,
  Target,
  Star,
  Utensils,
  Heart,
  Zap,
  CreditCard,
  Percent,
  DollarSign,
  Layers,
  Award,
  ThumbsUp,
  Users,
  Timer,
  CircleCheck,
  Play,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Briefcase,
  PartyPopper,
  Dumbbell,
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
    question: 'How long does Invisalign treatment take?',
    answer:
      'Treatment typically takes 12-18 months, though this varies based on the complexity of your case. Some minor cases can be completed in as few as 6 months.',
  },
  {
    question: 'How many hours a day should I wear my aligners?',
    answer:
      'For best results, wear your aligners 20-22 hours per day, removing them only for eating, drinking (anything other than water), and oral hygiene.',
  },
  {
    question: 'Is Invisalign painful?',
    answer:
      'You may experience some pressure or mild discomfort when starting a new set of aligners, but this typically subsides within a few days.',
  },
  {
    question: 'Can I eat and drink with Invisalign?',
    answer:
      'You should remove your aligners when eating or drinking anything other than water. Simply brush your teeth before putting them back in.',
  },
  {
    question: "Will people notice I'm wearing aligners?",
    answer:
      "Invisalign aligners are made from clear, medical-grade plastic that's virtually invisible. Most people won't notice you're wearing them.",
  },
];

const benefits = [
  {
    icon: Eye,
    title: 'Nearly Invisible',
    description: 'Crystal-clear aligners that blend seamlessly with your natural smile.',
    gradient: 'from-violet-500 to-purple-600',
    stat: '99%',
    statLabel: 'Discretion',
  },
  {
    icon: RefreshCw,
    title: 'Fully Removable',
    description: 'Take them out for meals, brushing, and special occasions.',
    gradient: 'from-emerald-500 to-teal-600',
    stat: 'Zero',
    statLabel: 'Food limits',
  },
  {
    icon: Smile,
    title: 'Smooth Comfort',
    description: 'No metal brackets or wires irritating your mouth.',
    gradient: 'from-amber-500 to-orange-600',
    stat: '50%',
    statLabel: 'Less discomfort',
  },
  {
    icon: Target,
    title: '3D Precision',
    description: 'See your smile transformation before treatment begins.',
    gradient: 'from-cyan-500 to-blue-600',
    stat: '3D',
    statLabel: 'Preview tech',
  },
];

const treatmentTimeline = [
  { week: 0, title: 'Consultation', description: 'Digital scans & custom plan', icon: MessageCircle },
  { week: 2, title: 'First Aligners', description: 'Begin your transformation', icon: Play },
  { week: 8, title: 'Visible Progress', description: 'See noticeable changes', icon: Sparkles },
  { week: 16, title: 'Refinement', description: 'Fine-tune your smile', icon: Target },
  { week: 24, title: 'Final Phase', description: 'Perfect the details', icon: Star },
  { week: 32, title: 'Beautiful Smile', description: 'Reveal your new you', icon: Award },
];

const conditionsTreated = [
  { title: 'Crowded Teeth', icon: Layers, description: 'Overlapping teeth' },
  { title: 'Gaps & Spacing', icon: ArrowRight, description: 'Spaces between teeth' },
  { title: 'Overbite', icon: ChevronDown, description: 'Upper teeth overlap' },
  { title: 'Underbite', icon: ChevronDown, description: 'Lower teeth forward' },
  { title: 'Crossbite', icon: RefreshCw, description: 'Misaligned bite' },
  { title: 'Open Bite', icon: Target, description: 'Teeth don\'t meet' },
];

const comparisonData = [
  { feature: 'Visibility', invisalign: 'Nearly invisible', braces: 'Visible metal', winner: 'invisalign' },
  { feature: 'Removable', invisalign: 'Yes, anytime', braces: 'Fixed in place', winner: 'invisalign' },
  { feature: 'Diet', invisalign: 'Eat anything', braces: 'Limited foods', winner: 'invisalign' },
  { feature: 'Comfort', invisalign: 'Smooth plastic', braces: 'Metal wires', winner: 'invisalign' },
  { feature: 'Treatment', invisalign: '6-18 months', braces: '18-36 months', winner: 'invisalign' },
  { feature: 'Cleaning', invisalign: 'Easy brushing', braces: 'Complex care', winner: 'invisalign' },
];

const lifestyleScenarios = [
  { title: 'Professional Life', icon: Briefcase, description: 'Present confidently in meetings', color: 'from-slate-600 to-slate-800' },
  { title: 'Social Events', icon: PartyPopper, description: 'Smile naturally at parties', color: 'from-pink-500 to-rose-600' },
  { title: 'Active Lifestyle', icon: Dumbbell, description: 'Work out without restrictions', color: 'from-emerald-500 to-green-600' },
  { title: 'Dining Freedom', icon: Utensils, description: 'Enjoy all your favorites', color: 'from-amber-500 to-orange-600' },
];

const relatedServices = [
  { title: 'Teeth Whitening', href: '/services/teeth-whitening', icon: Sparkles, description: 'Brighten your smile' },
  { title: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry', icon: Smile, description: 'Transform your look' },
  { title: 'Routine Checkups', href: '/services/routine-checkups', icon: Shield, description: 'Maintain your smile' },
];

const financingOptions = [
  { icon: CreditCard, title: 'Flexible Payments', description: 'Monthly plans that fit your budget', highlight: 'From $99/mo' },
  { icon: Percent, title: 'Insurance Welcome', description: 'We work with all major providers', highlight: 'Direct billing' },
  { icon: DollarSign, title: '0% Financing', description: 'Interest-free options available', highlight: '24 months' },
];

// ============================================================================
// ANIMATION VARIANTS (Optimized for mobile performance)
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// ============================================================================
// MOBILE HERO SECTION - Immersive Full-Screen Experience
// ============================================================================

function MobileHeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] bg-[#0A0A0B] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0"
      >
        <Image
          src="/images/services/invisalign/beautiful-smile-woman.jpg"
          alt="Beautiful confident smile with Invisalign"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
      </motion.div>

      {/* Floating Glassmorphism Badge */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ opacity }}
        className="absolute top-24 left-4 right-4 z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37] to-[#9B4D56] flex items-center justify-center shadow-lg shadow-[#722F37]/30">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">Virtually Invisible</p>
              <p className="text-white/70 text-sm">Clear aligner technology</p>
            </div>
            <div className="ml-auto">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100svh] px-5 pb-32 pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* Premium Badge */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Certified Invisalign Provider
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Transform Your{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-[#F4B8BD] via-[#E89CA3] to-[#D88A92] bg-clip-text text-transparent">
                Smile
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 7 Q25 0, 50 7 T100 7" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#722F37"/>
                    <stop offset="100%" stopColor="#9B4D56"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>{' '}
            Invisibly
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/80 leading-relaxed max-w-[90%]"
          >
            Experience the future of orthodontics with clear aligners that fit your lifestyle perfectly.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            variants={fadeInUp}
            className="flex gap-6 pt-4"
          >
            {[
              { value: '15M+', label: 'Smiles Created' },
              { value: '99%', label: 'Satisfaction' },
              { value: '6-18', label: 'Months Avg' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/98 to-transparent pt-6 pb-4 px-4 safe-area-bottom">
        <div className="flex gap-3">
          <Link
            href="/contact#book"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-4 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] text-white font-semibold rounded-2xl shadow-lg shadow-[#722F37]/40 active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-500" />
            <Calendar className="w-5 h-5" />
            <span>Free Consultation</span>
          </Link>
          <a
            href="tel:+16137336446"
            className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl active:scale-[0.98] transition-transform"
            aria-label="Call us"
          >
            <Phone className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// TRUST STATS BAR - Animated Counter
// ============================================================================

function MobileTrustStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    { value: '15M+', label: 'Smiles', icon: Smile },
    { value: '25+', label: 'Years', icon: Award },
    { value: '99%', label: 'Happy', icon: ThumbsUp },
    { value: '500+', label: 'Experts', icon: Users },
  ];

  return (
    <section ref={ref} className="py-10 bg-gradient-to-r from-[#1e293b] via-[#0f172a] to-[#1e293b] relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#722F37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#722F37] rounded-full blur-3xl" />
      </div>

      <div className="relative px-5">
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-2 border border-white/10">
                  <Icon className="w-5 h-5 text-[#E89CA3]" />
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// BENEFITS SECTION - Premium Horizontal Scroll Cards
// ============================================================================

function MobileBenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 bg-[#FAFAFA]">
      <div className="px-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5" />
            The Clear Advantage
          </span>
          <h2 className="text-3xl font-bold text-[#1e293b] leading-tight">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-[#722F37] to-[#9B4D56] bg-clip-text text-transparent">
              Invisalign
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-5 pb-4" style={{ width: 'max-content' }}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="w-[260px] group"
              >
                <div className="relative h-full bg-white rounded-3xl p-6 shadow-lg shadow-black/5 border border-neutral-100 overflow-hidden">
                  {/* Background Gradient Orb */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${benefit.gradient} opacity-10 blur-2xl group-active:opacity-20 transition-opacity`} />

                  {/* Stat Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent`}>
                        {benefit.stat}
                      </div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {benefit.statLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#1e293b] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{benefit.description}</p>
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
// TREATMENT TIMELINE - Elegant Vertical Journey
// ============================================================================

function MobileTreatmentTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#722F37] rounded-full blur-3xl" />
      </div>

      <div className="relative px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5" />
            Your Journey
          </span>
          <h2 className="text-3xl font-bold text-[#1e293b] leading-tight">
            From Start to{' '}
            <span className="bg-gradient-to-r from-[#722F37] to-[#9B4D56] bg-clip-text text-transparent">
              Stunning
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient Line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#722F37] via-[#9B4D56] to-[#E89CA3] rounded-full" />

          <div className="space-y-6">
            {treatmentTimeline.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === treatmentTimeline.length - 1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative flex gap-5"
                >
                  {/* Node */}
                  <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    isLast
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/30'
                      : 'bg-gradient-to-br from-[#722F37] to-[#9B4D56] shadow-[#722F37]/30'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 rounded-2xl p-4 ${
                    isLast
                      ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200'
                      : 'bg-neutral-50 border border-neutral-100'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isLast ? 'text-emerald-600' : 'text-[#722F37]'
                      }`}>
                        {item.week === 0 ? 'Day 1' : `Week ${item.week}`}
                      </span>
                      {isLast && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                    <h3 className={`font-bold text-lg ${isLast ? 'text-emerald-800' : 'text-[#1e293b]'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm ${isLast ? 'text-emerald-600' : 'text-neutral-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPARISON SECTION - Interactive Visual Comparison
// ============================================================================

function MobileComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-4">
            <Target className="w-3.5 h-3.5" />
            Compare Options
          </span>
          <h2 className="text-3xl font-bold text-white leading-tight">
            Invisalign vs{' '}
            <span className="text-neutral-400">Traditional Braces</span>
          </h2>
        </motion.div>

        {/* Comparison Cards */}
        <div className="space-y-3">
          {comparisonData.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
            >
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                {row.feature}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Invisalign */}
                <div className="relative bg-gradient-to-br from-[#722F37]/20 to-[#722F37]/10 rounded-xl p-3 border border-[#722F37]/30">
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="text-[10px] font-bold text-[#E89CA3] uppercase tracking-wider mb-1">
                    Invisalign
                  </div>
                  <div className="text-sm font-semibold text-white">{row.invisalign}</div>
                </div>

                {/* Braces */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 opacity-60">
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">
                    Braces
                  </div>
                  <div className="text-sm text-white/60">{row.braces}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Winner Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#5a252c] border border-[#722F37]/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Clear Winner</h3>
              <p className="text-white/70 text-sm">Invisalign wins in all 6 categories</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// LIFESTYLE SECTION - Visual Grid
// ============================================================================

function MobileLifestyleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 bg-[#FAFAFA]">
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5" />
            Your Lifestyle
          </span>
          <h2 className="text-3xl font-bold text-[#1e293b] leading-tight">
            Fits Seamlessly Into{' '}
            <span className="bg-gradient-to-r from-[#722F37] to-[#9B4D56] bg-clip-text text-transparent">
              Your Life
            </span>
          </h2>
        </motion.div>

        {/* 2x2 Grid with Images */}
        <div className="grid grid-cols-2 gap-3">
          {lifestyleScenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className={`relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br ${scenario.color} p-4 flex flex-col justify-between`}>
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-0.5">{scenario.title}</h3>
                    <p className="text-white/80 text-xs leading-snug">{scenario.description}</p>
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
// CONDITIONS TREATED - Interactive Pills
// ============================================================================

function MobileConditionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            What We Treat
          </span>
          <h2 className="text-3xl font-bold text-[#1e293b] leading-tight">
            Conditions We{' '}
            <span className="bg-gradient-to-r from-[#722F37] to-[#9B4D56] bg-clip-text text-transparent">
              Correct
            </span>
          </h2>
        </motion.div>

        {/* Conditions Grid */}
        <div className="grid grid-cols-2 gap-3">
          {conditionsTreated.map((condition, index) => {
            const Icon = condition.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-4 border border-neutral-100 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#722F37] to-[#9B4D56] flex items-center justify-center mb-3 shadow-lg shadow-[#722F37]/20">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[#1e293b] text-sm mb-0.5">{condition.title}</h3>
                <p className="text-xs text-neutral-500">{condition.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FINANCING SECTION - Premium Cards
// ============================================================================

function MobileFinancingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-[#FAFAFA] to-white">
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold uppercase tracking-wider mb-4">
            <DollarSign className="w-3.5 h-3.5" />
            Affordable Options
          </span>
          <h2 className="text-3xl font-bold text-[#1e293b] leading-tight">
            Invest in Your{' '}
            <span className="bg-gradient-to-r from-[#722F37] to-[#9B4D56] bg-clip-text text-transparent">
              Confidence
            </span>
          </h2>
        </motion.div>

        {/* Financing Cards */}
        <div className="space-y-3">
          {financingOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-[#722F37]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1e293b] mb-0.5">{option.title}</h3>
                  <p className="text-sm text-neutral-500 truncate">{option.description}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37] to-[#9B4D56] text-white text-xs font-bold flex-shrink-0">
                  {option.highlight}
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
// FAQ SECTION - Elegant Accordion
// ============================================================================

function MobileFAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-[#1e293b] leading-tight">
            Common{' '}
            <span className="bg-gradient-to-r from-[#722F37] to-[#9B4D56] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'bg-gradient-to-br from-[#722F37]/5 to-[#722F37]/10 border-2 border-[#722F37]/20'
                  : 'bg-neutral-50 border border-neutral-100'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left min-h-[60px]"
                aria-expanded={openIndex === index}
              >
                <span className={`font-semibold text-[15px] pr-4 leading-snug ${
                  openIndex === index ? 'text-[#722F37]' : 'text-[#1e293b]'
                }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    openIndex === index
                      ? 'bg-gradient-to-br from-[#722F37] to-[#9B4D56] text-white shadow-lg shadow-[#722F37]/30'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <div className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-neutral-500 text-sm mb-3">Still have questions?</p>
          <a
            href="tel:+16137336446"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#722F37]/10 text-[#722F37] font-semibold rounded-xl active:scale-[0.98] transition-transform"
          >
            <Phone className="w-4 h-4" />
            Call (613) 733-6446
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES - Elegant Cards
// ============================================================================

function MobileRelatedServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 bg-[#FAFAFA]">
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-[#1e293b]">Complete Your Smile Journey</h2>
        </motion.div>

        <div className="space-y-3">
          {relatedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm active:scale-[0.99] transition-transform"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-[#722F37]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1e293b] mb-0.5">{service.title}</h3>
                    <p className="text-sm text-neutral-500">{service.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-300" />
                </Link>
              </motion.div>
            );
          })}
        </div>

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
            Explore All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA - Immersive Full-Width
// ============================================================================

function MobileFinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative py-20 pb-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/services/invisalign/happy-smile-portrait.jpg"
          alt="Happy confident smile"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#722F37] via-[#722F37]/90 to-[#722F37]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Smile className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Ready to Transform<br />Your Smile?
          </h2>

          <p className="text-white/80 text-lg mb-8 max-w-xs mx-auto">
            Schedule your free consultation and see your new smile today.
          </p>

          <div className="space-y-3">
            <Link
              href="/contact#book"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white text-[#722F37] font-bold rounded-2xl shadow-2xl active:scale-[0.98] transition-transform"
            >
              <Calendar className="w-5 h-5" />
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="tel:+16137336446"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/20 active:scale-[0.98] transition-transform"
            >
              <Phone className="w-5 h-5" />
              (613) 733-6446
            </a>
          </div>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm"
          >
            <MapPin className="w-4 h-4" />
            1440 Bank Street, Ottawa
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN MOBILE COMPONENT
// ============================================================================

export function InvisalignContentMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <MobileHeroSection />
      <MobileTrustStats />
      <MobileBenefitsSection />
      <MobileTreatmentTimeline />
      <MobileComparisonSection />
      <MobileLifestyleSection />
      <MobileConditionsSection />
      <MobileFinancingSection />
      <MobileFAQSection />
      <MobileRelatedServices />
      <MobileFinalCTA />
    </main>
  );
}
