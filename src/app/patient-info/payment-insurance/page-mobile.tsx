'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Banknote,
  FileCheck,
  Shield,
  CheckCircle2,
  HeartHandshake,
  Phone,
  Building2,
  ClipboardList,
  Wallet,
  BadgeCheck,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Calculator,
  Lock,
  Eye,
  DollarSign,
  Clock,
  Users,
  FileText,
  CircleDollarSign,
  ShieldCheck,
  Receipt,
  Landmark,
  HandCoins,
  Percent,
  BadgeDollarSign,
  FileSearch,
  UserCheck,
  Stethoscope,
  Check,
  MapPin,
  Mail,
  ArrowRight,
  Zap,
  Star,
  Heart,
  Crown,
  Fingerprint,
  WalletCards,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// PREMIUM MOBILE ANIMATION VARIANTS
// ============================================================================

const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

// ============================================================================
// DECORATIVE SVG COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#722F37]/20 to-rose-400/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-10%', right: '-20%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-amber-300/15 to-orange-200/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '20%', left: '-15%' }}
      />
    </div>
  );
}

function DotPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
      <pattern id="payment-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#payment-dots)" />
    </svg>
  );
}

function WaveDecoration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      className={`w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ============================================================================
// DATA
// ============================================================================

const paymentMethods = [
  { icon: CreditCard, name: 'Visa', color: '#1A1F71', bg: 'from-blue-900/10 to-blue-600/5' },
  { icon: CreditCard, name: 'MasterCard', color: '#EB001B', bg: 'from-red-600/10 to-orange-500/5' },
  { icon: CreditCard, name: 'Amex', color: '#006FCF', bg: 'from-blue-500/10 to-cyan-400/5' },
  { icon: Banknote, name: 'Interac', color: '#FFCC00', bg: 'from-amber-400/15 to-yellow-300/5' },
  { icon: Wallet, name: 'Cash', color: '#22C55E', bg: 'from-green-500/10 to-emerald-400/5' },
  { icon: WalletCards, name: 'Debit', color: '#8B5CF6', bg: 'from-violet-500/10 to-purple-400/5' },
];

const directBillingSteps = [
  {
    step: 1,
    title: 'Share Your Info',
    description: 'Provide your insurance details at check-in - we handle the rest',
    icon: ClipboardList,
    gradient: 'from-[#722F37] to-rose-500',
  },
  {
    step: 2,
    title: 'We Verify Coverage',
    description: 'Our team confirms your benefits with your provider instantly',
    icon: FileSearch,
    gradient: 'from-rose-500 to-orange-400',
  },
  {
    step: 3,
    title: 'Get Your Treatment',
    description: 'Relax and receive the quality dental care you deserve',
    icon: HeartHandshake,
    gradient: 'from-orange-400 to-amber-400',
  },
  {
    step: 4,
    title: 'Direct Billing',
    description: 'We submit the claim directly to your insurance company',
    icon: Receipt,
    gradient: 'from-amber-400 to-emerald-400',
  },
  {
    step: 5,
    title: 'Pay Your Portion',
    description: 'Only pay what insurance doesn\'t cover - simple and stress-free',
    icon: HandCoins,
    gradient: 'from-emerald-400 to-teal-500',
  },
];

const directBillingBenefits = [
  { title: 'No Upfront Costs', icon: BadgeDollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Zero Paperwork', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Clear Pricing', icon: Calculator, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Fast & Easy', icon: Zap, color: 'text-violet-600', bg: 'bg-violet-50' },
];

const cdcpServices = [
  { name: 'Preventive care', icon: ShieldCheck },
  { name: 'Diagnostic services', icon: FileSearch },
  { name: 'Restorative treatments', icon: Stethoscope },
  { name: 'Root canals', icon: HeartHandshake },
  { name: 'Gum treatments', icon: Shield },
  { name: 'Dentures', icon: UserCheck },
  { name: 'Oral surgery', icon: Landmark },
];

const cdcpEligibility = [
  { text: 'Canadian resident', icon: MapPin, detail: 'Must be a legal resident' },
  { text: 'Income below threshold', icon: DollarSign, detail: 'Based on annual income' },
  { text: 'No dental insurance', icon: Shield, detail: 'Private or employer coverage' },
];

const transparencyFeatures = [
  {
    icon: Eye,
    title: 'Upfront Pricing',
    description: 'Know your costs before any treatment begins',
    gradient: 'from-[#722F37] to-rose-400'
  },
  {
    icon: Lock,
    title: 'No Hidden Fees',
    description: 'What we quote is exactly what you pay',
    gradient: 'from-rose-400 to-orange-400'
  },
  {
    icon: FileText,
    title: 'Written Estimates',
    description: 'Detailed treatment plans you can review',
    gradient: 'from-orange-400 to-amber-400'
  },
  {
    icon: Heart,
    title: 'Patient-First Care',
    description: 'Your comfort and trust come first',
    gradient: 'from-amber-400 to-[#722F37]'
  },
];

const faqItems = [
  {
    question: 'Do you accept my insurance?',
    answer: 'We work with most major insurance providers across Canada. Simply bring your insurance card and we\'ll verify your coverage on the spot.',
    icon: Shield,
    color: 'bg-blue-500',
  },
  {
    question: 'What if insurance doesn\'t cover everything?',
    answer: 'You\'ll only pay the portion not covered. We always provide detailed estimates before treatment so you can plan accordingly.',
    icon: Calculator,
    color: 'bg-amber-500',
  },
  {
    question: 'Can you help explain my benefits?',
    answer: 'Absolutely! Our knowledgeable team helps explain your coverage and estimates out-of-pocket costs for your care.',
    icon: HelpCircle,
    color: 'bg-violet-500',
  },
  {
    question: 'What if I don\'t have insurance?',
    answer: 'Everyone deserves quality dental care. We welcome patients without insurance and offer flexible payment options to work with your budget.',
    icon: HandCoins,
    color: 'bg-emerald-500',
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'For larger treatments, we\'re happy to discuss payment arrangements. Contact our office to learn about available options.',
    icon: Receipt,
    color: 'bg-rose-500',
  },
  {
    question: 'How does direct billing work?',
    answer: 'We submit claims directly to your insurance company so you don\'t have to. You only pay your portion at the time of service - no upfront payment required.',
    icon: FileCheck,
    color: 'bg-teal-500',
  },
];

const financialPolicyPoints = [
  { text: 'Payment expected at time of service', icon: Clock, color: 'text-[#722F37]' },
  { text: 'Estimated patient portion collected at visit', icon: Percent, color: 'text-amber-600' },
  { text: 'Treatment plans provided before non-emergency care', icon: FileText, color: 'text-blue-600' },
  { text: 'Please inform us of insurance changes', icon: Shield, color: 'text-emerald-600' },
];

// ============================================================================
// MOBILE HERO SECTION - Premium Full-Bleed Design
// ============================================================================

function MobileHero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col bg-gradient-to-b from-[#FDF8F3] via-white to-white overflow-hidden">
      {/* Decorative elements */}
      <FloatingOrbs />
      <DotPattern />

      {/* Hero Image with Overlay */}
      <div className="relative h-[45vh] min-h-[320px]">
        <Image
          src="https://images.pexels.com/photos/6812577/pexels-photo-6812577.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600"
          alt="Friendly dentist greeting a happy patient with a warm handshake"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#FDF8F3]"
          aria-hidden="true"
        />

        {/* Floating trust badges */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute bottom-6 left-4 right-4"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { icon: ShieldCheck, text: 'Secure Payments', color: 'bg-emerald-500' },
              { icon: FileCheck, text: 'Direct Billing', color: 'bg-blue-500' },
              { icon: Crown, text: 'CDCP Accepted', color: 'bg-amber-500' },
            ].map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg shadow-black/10 border border-white/50"
              >
                <div className={`w-6 h-6 rounded-full ${badge.color} flex items-center justify-center`}>
                  <badge.icon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="relative flex-1 px-5 pt-6 pb-8">
        {/* Main heading with animated gradient */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#722F37]/10 rounded-full text-[#722F37] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Hassle-Free Experience
          </span>

          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-neutral-900 tracking-tight">
            Payment &{' '}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] via-rose-500 to-[#722F37]">
                Insurance
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-3 bg-[#722F37]/10 rounded-full -z-0"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ originX: 0 }}
                aria-hidden="true"
              />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-base text-neutral-600 leading-relaxed"
        >
          Quality dental care accessible to everyone. We handle the paperwork so you can focus on your smile.
        </motion.p>

        {/* Quick stats grid */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 grid grid-cols-3 gap-3"
        >
          {[
            { icon: CreditCard, value: '6+', label: 'Payment Options' },
            { icon: Building2, value: '100+', label: 'Insurers' },
            { icon: Fingerprint, value: 'CDCP', label: 'Certified' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#722F37]/5 to-transparent rounded-bl-full" aria-hidden="true" />
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-rose-100 flex items-center justify-center mb-2">
                <stat.icon className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
              </div>
              <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <motion.a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] text-white font-semibold rounded-2xl shadow-lg shadow-[#722F37]/25"
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span>Questions? Call Us</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TRANSPARENCY SECTION - Glass Morphism Cards
// ============================================================================

function MobileTransparencySection() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative px-5 py-14 bg-white overflow-hidden">
      <DotPattern />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : fadeInUp.hidden}
        animate={isInView ? fadeInUp.visible : {}}
        className="relative z-10"
      >
        {/* Section header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#722F37]/20 to-transparent" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#722F37]/5 rounded-full text-[#722F37] text-xs font-semibold">
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            Transparency
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#722F37]/20 to-transparent" aria-hidden="true" />
        </div>

        <h2 className="text-center text-2xl font-bold text-neutral-900 tracking-tight mt-4 mb-2">
          No Surprises,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
            Just Trust
          </span>
        </h2>
        <p className="text-center text-sm text-neutral-500 mb-8 max-w-xs mx-auto">
          We believe in complete cost transparency. Know exactly what to expect.
        </p>
      </motion.div>

      {/* Feature grid with premium cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 gap-3"
      >
        {transparencyFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={staggerItem}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-5 border border-neutral-100 shadow-sm"
          >
            {/* Decorative gradient corner */}
            <div
              className={`absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-xl`}
              aria-hidden="true"
            />

            <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 shadow-sm`}>
              <feature.icon className="w-5 h-5 text-white" aria-hidden="true" />
            </div>

            <h3 className="font-bold text-neutral-900 text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// PAYMENT METHODS - Interactive Card Carousel
// ============================================================================

function MobilePaymentMethods() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-14 bg-gradient-to-b from-white via-[#FDF8F3] to-white overflow-hidden">
      <FloatingOrbs />

      <div className="px-5">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : fadeInUp.hidden}
          animate={isInView ? fadeInUp.visible : {}}
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-[#722F37]/10 shadow-sm mb-4">
            <WalletCards className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
            <span className="text-xs font-semibold text-neutral-700">Flexible Options</span>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
            Payment Methods
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            We accept all major payment options for your convenience.
          </p>
        </motion.div>
      </div>

      {/* Scrollable card carousel */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-4 px-5 scrollbar-hide snap-x snap-mandatory">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 snap-center w-[110px] bg-gradient-to-br ${method.bg} backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm text-center`}
            >
              <div
                className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${method.color}15 0%, ${method.color}08 100%)` }}
              >
                <method.icon
                  className="w-7 h-7"
                  style={{ color: method.color }}
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm font-semibold text-neutral-800">{method.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-[#FDF8F3] to-transparent pointer-events-none" aria-hidden="true" />
      </div>

      {/* Payment assurance */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
        className="mx-5 mt-4 flex items-center gap-3 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <Lock className="w-5 h-5 text-emerald-600" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-neutral-900 text-sm">Secure Transactions</p>
          <p className="text-xs text-neutral-500">All payments are encrypted and protected</p>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// DIRECT BILLING - Immersive Timeline Experience
// ============================================================================

function MobileDirectBillingSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative px-5 py-14 bg-white overflow-hidden">
      <DotPattern />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : fadeInUp.hidden}
        animate={isInView ? fadeInUp.visible : {}}
        className="relative z-10"
      >
        {/* Premium section header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722F37] to-rose-500 flex items-center justify-center shadow-lg shadow-[#722F37]/20">
            <FileCheck className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              Direct Insurance Billing
            </h2>
            <p className="text-xs text-neutral-500">We handle the paperwork for you</p>
          </div>
        </div>
      </motion.div>

      {/* Benefits pills */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide mb-6"
      >
        {directBillingBenefits.map((benefit) => (
          <div
            key={benefit.title}
            className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 ${benefit.bg} rounded-full border border-white/50 shadow-sm`}
          >
            <benefit.icon className={`w-4 h-4 ${benefit.color}`} aria-hidden="true" />
            <span className={`text-xs font-semibold ${benefit.color} whitespace-nowrap`}>{benefit.title}</span>
          </div>
        ))}
      </motion.div>

      {/* Interactive Timeline Steps */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#722F37] via-amber-400 to-emerald-400 rounded-full" aria-hidden="true" />

        <div className="space-y-3">
          {directBillingSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <motion.button
                type="button"
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                className={`relative w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 min-h-[72px] ${
                  expandedStep === index
                    ? 'bg-gradient-to-r from-[#722F37]/5 to-rose-50 border-[#722F37]/20 shadow-md'
                    : 'bg-white border-neutral-100 shadow-sm active:bg-neutral-50'
                }`}
                whileTap={{ scale: 0.98 }}
                aria-expanded={expandedStep === index}
              >
                {/* Step number with gradient */}
                <div
                  className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                    expandedStep === index
                      ? `bg-gradient-to-br ${step.gradient} text-white shadow-lg`
                      : 'bg-gradient-to-br from-neutral-100 to-neutral-50 text-neutral-600'
                  }`}
                >
                  {expandedStep === index ? (
                    <step.icon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    step.step
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <p className={`font-semibold text-sm transition-colors duration-200 ${
                    expandedStep === index ? 'text-[#722F37]' : 'text-neutral-900'
                  }`}>
                    {step.title}
                  </p>
                  {expandedStep !== index && (
                    <p className="text-xs text-neutral-400 truncate mt-0.5">{step.description}</p>
                  )}
                </div>

                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                    expandedStep === index ? 'text-[#722F37] rotate-180' : 'text-neutral-300'
                  }`}
                  aria-hidden="true"
                />
              </motion.button>

              <AnimatePresence>
                {expandedStep === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-4 ml-16">
                      <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visual Cost Breakdown Example */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : fadeInScale.hidden}
        animate={isInView ? fadeInScale.visible : {}}
        transition={{ delay: 0.5 }}
        className="mt-8 relative overflow-hidden bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-rose-600 rounded-3xl p-6 shadow-xl shadow-[#722F37]/20"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" aria-hidden="true" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CircleDollarSign className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-white">See How It Works</h3>
              <p className="text-xs text-white/70">Example with 80% coverage</p>
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="relative h-12 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden mb-5" role="img" aria-label="Insurance covers 80%, you pay 20%">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/30 to-white/20 flex items-center justify-center"
              initial={{ width: 0 }}
              animate={isInView ? { width: '80%' } : {}}
              transition={{ duration: 1, delay: 0.6, ease: smoothEase }}
            >
              <span className="text-white font-semibold text-sm flex items-center gap-1.5">
                <Shield className="w-4 h-4" aria-hidden="true" />
                Insurance 80%
              </span>
            </motion.div>
            <div className="absolute inset-y-0 right-0 w-[20%] bg-emerald-400/40 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-semibold text-xs">You 20%</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Treatment', value: '$500', color: 'bg-white/10' },
              { label: 'Insurance Covers', value: '$400', color: 'bg-white/15' },
              { label: 'You Pay', value: '$100', color: 'bg-emerald-500/30' },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.color} backdrop-blur-sm rounded-xl p-3 text-center`}>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-white/70 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Insurance providers note */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-5 flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-100"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Building2 className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-blue-900 text-sm">100+ Insurance Providers</p>
          <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
            Bring your insurance card and we'll verify your coverage instantly.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// CDCP SECTION - Government Program Highlight
// ============================================================================

function MobileCDCPSection() {
  const [showServices, setShowServices] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-14 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-rose-700" aria-hidden="true" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg className="w-full h-full">
          <pattern id="cdcp-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#cdcp-pattern)" />
        </svg>
      </div>

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-10 right-5 w-20 h-20 rounded-full bg-white/5 blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 left-5 w-24 h-24 rounded-full bg-white/5 blur-xl"
        animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-5">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : fadeInUp.hidden}
          animate={isInView ? fadeInUp.visible : {}}
        >
          {/* Government badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-5">
            <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
              <Crown className="w-3.5 h-3.5 text-amber-900" aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold text-white">Federal Government Program</span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
            Canadian Dental Care Plan
          </h2>
          <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-xs">
            We're proud to be a certified CDCP provider, making quality dental care accessible to eligible Canadians.
          </p>
        </motion.div>

        {/* Eligibility card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : fadeInScale.hidden}
          animate={isInView ? fadeInScale.visible : {}}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 mb-4"
        >
          <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-300" aria-hidden="true" />
            Who Qualifies?
          </h3>
          <div className="space-y-3">
            {cdcpEligibility.map((item, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-amber-300" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.text}</p>
                  <p className="text-xs text-white/60">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services covered - expandable */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : fadeInUp.hidden}
          animate={isInView ? fadeInUp.visible : {}}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setShowServices(!showServices)}
            className="w-full flex items-center justify-between p-5 min-h-[64px]"
            aria-expanded={showServices}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-300" aria-hidden="true" />
              </div>
              <span className="font-semibold text-white text-sm">Covered Services</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-white/70 transition-transform duration-300 ${showServices ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          <AnimatePresence>
            {showServices && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-1 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {cdcpServices.map((service, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" aria-hidden="true" />
                        <span className="text-xs text-white/90">{service.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* How to use CDCP */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : fadeInUp.hidden}
          animate={isInView ? fadeInUp.visible : {}}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <h3 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-amber-300" aria-hidden="true" />
            Getting Started
          </h3>
          <div className="space-y-2">
            {[
              { text: 'Apply through the federal government', icon: FileText },
              { text: 'Receive your CDCP documentation', icon: BadgeCheck },
              { text: 'Book your appointment with us', icon: Phone },
              { text: 'We bill the program directly', icon: Receipt },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.08 }}
                className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl"
              >
                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
                <span className="text-sm text-white/90">{step.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Link href="/patient-info/cdcp">
            <motion.span
              className="flex items-center justify-center gap-2 w-full py-4 bg-white text-[#722F37] font-bold rounded-2xl shadow-lg"
              whileTap={{ scale: 0.98 }}
            >
              Learn More About CDCP
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FINANCIAL POLICY SECTION
// ============================================================================

function MobileFinancialPolicy() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative px-5 py-14 bg-white overflow-hidden">
      <DotPattern />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : fadeInUp.hidden}
        animate={isInView ? fadeInUp.visible : {}}
        className="relative z-10"
      >
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center shadow-sm">
            <ClipboardList className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              Financial Policy
            </h2>
            <p className="text-xs text-neutral-500">What to expect at your visit</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="space-y-3"
      >
        {financialPolicyPoints.map((point, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="flex items-start gap-4 p-4 bg-gradient-to-r from-neutral-50 to-white rounded-2xl border border-neutral-100 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center flex-shrink-0`}>
              <point.icon className={`w-5 h-5 ${point.color}`} aria-hidden="true" />
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed pt-2">{point.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION - Elegant Accordion
// ============================================================================

function MobileFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-14 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      <FloatingOrbs />

      <div className="px-5">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : fadeInUp.hidden}
          animate={isInView ? fadeInUp.visible : {}}
          className="relative z-10 text-center mb-8"
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#722F37]/10 shadow-sm mb-4">
            <HelpCircle className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
            <span className="text-xs font-semibold text-neutral-700">Got Questions?</span>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
              Questions
            </span>
          </h2>
          <p className="text-sm text-neutral-500 max-w-xs mx-auto">
            Everything you need to know about payment and insurance.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.06 }}
            >
              <motion.button
                type="button"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className={`w-full flex items-start gap-3 p-4 rounded-2xl border transition-all duration-300 text-left ${
                  openFAQ === index
                    ? 'bg-white border-[#722F37]/15 shadow-lg shadow-[#722F37]/5'
                    : 'bg-white border-neutral-100 shadow-sm active:bg-neutral-50'
                }`}
                whileTap={{ scale: 0.99 }}
                aria-expanded={openFAQ === index}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openFAQ === index ? item.color : 'bg-neutral-100'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      openFAQ === index ? 'text-white' : 'text-neutral-400'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <span
                    className={`font-semibold text-sm leading-snug transition-colors duration-200 ${
                      openFAQ === index ? 'text-[#722F37]' : 'text-neutral-900'
                    }`}
                  >
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 mt-1.5 transition-all duration-300 ${
                    openFAQ === index ? 'text-[#722F37] rotate-180' : 'text-neutral-300'
                  }`}
                  aria-hidden="true"
                />
              </motion.button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-4 ml-13">
                      <p className="text-sm text-neutral-600 leading-relaxed pl-13">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT CTA SECTION - Premium Floating Card
// ============================================================================

function MobileContactCTA() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-rose-600" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" aria-hidden="true" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 -right-10 w-40 h-40 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 -left-10 w-32 h-32 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-5">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : fadeInScale.hidden}
          animate={isInView ? fadeInScale.visible : {}}
          className="text-center"
        >
          {/* Icon with glow effect */}
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 w-20 h-20 bg-white/20 rounded-2xl blur-xl" aria-hidden="true" />
            <div className="relative w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Phone className="w-9 h-9 text-white" aria-hidden="true" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
            Questions About Billing?
          </h2>
          <p className="text-base text-white/80 mb-8 leading-relaxed max-w-xs mx-auto">
            Our friendly team is here to help with any payment, insurance, or billing questions.
          </p>

          {/* Primary CTA - Call */}
          <motion.a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#722F37] font-bold rounded-2xl shadow-xl shadow-black/20 mb-4"
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span className="text-lg">
              ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
            </span>
          </motion.a>

          {/* Secondary CTA - Contact Page */}
          <Link href="/contact" className="block">
            <motion.span
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20"
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Contact Us Online</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </motion.span>
          </Link>

          {/* Hours indicator */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
            <Clock className="w-4 h-4 text-white/70" aria-hidden="true" />
            <span className="text-xs text-white/70">Mon-Fri: 9am-5pm | Sat: 9am-2pm</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 text-white">
        <WaveDecoration className="h-12 opacity-10" />
      </div>
    </section>
  );
}

// ============================================================================
// MAIN MOBILE PAGE COMPONENT
// ============================================================================

export default function PaymentInsurancePageMobile() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col bg-white">
      <MobileHero />
      <MobileTransparencySection />
      <MobilePaymentMethods />
      <MobileDirectBillingSection />
      <MobileCDCPSection />
      <MobileFinancialPolicy />
      <MobileFAQSection />
      <MobileContactCTA />
    </main>
  );
}
