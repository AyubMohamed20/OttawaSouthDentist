'use client';

import { useState, useRef } from 'react';
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
  Award,
  Stethoscope,
  Droplet,
  ThumbsUp,
  Gift,
  ShieldCheck,
  HeartHandshake,
  WandSparkles,
  ChevronRight,
  Play,
  Crown,
  Rocket,
  Rainbow,
  PartyPopper,
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "When should my child first visit?",
    answer:
      "By their first birthday or within 6 months of their first tooth appearing. Early visits help establish good dental habits.",
    icon: <Baby className="w-5 h-5" />,
  },
  {
    question: "How do you help nervous children?",
    answer:
      "We use 'show, tell, do' techniques with child-friendly language. We go at your child's pace and celebrate their bravery!",
    icon: <HeartHandshake className="w-5 h-5" />,
  },
  {
    question: "How often should they visit?",
    answer:
      "Every 6 months for checkups. Some children may benefit from more frequent visits if prone to cavities.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    question: "Are dental X-rays safe?",
    answer:
      "Yes! Digital X-rays use 80% less radiation than traditional film. We use lead aprons and take X-rays only when necessary.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

const benefits = [
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: 'Gentle Care',
    description: 'Stress-free visits',
    color: 'from-rose-400 to-pink-500',
    bgGlow: 'bg-rose-400/20',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Prevention First',
    description: 'Fluoride & sealants',
    color: 'from-sky-400 to-blue-500',
    bgGlow: 'bg-sky-400/20',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Happy Memories',
    description: 'Positive experiences',
    color: 'from-amber-400 to-orange-500',
    bgGlow: 'bg-amber-400/20',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Fun Learning',
    description: 'Brushing made easy',
    color: 'from-emerald-400 to-teal-500',
    bgGlow: 'bg-emerald-400/20',
  },
];

const servicesIncluded = [
  {
    title: 'First Visits',
    description: "Gentle introductions for babies and toddlers",
    icon: <Baby className="w-5 h-5" />,
    color: 'from-violet-400 to-purple-500',
    emoji: '👶',
  },
  {
    title: 'Exams & Cleanings',
    description: 'Fun checkups for healthy smiles',
    icon: <Stethoscope className="w-5 h-5" />,
    color: 'from-sky-400 to-blue-500',
    emoji: '🔍',
  },
  {
    title: 'Fluoride Boost',
    description: 'Strengthen growing teeth',
    icon: <Droplet className="w-5 h-5" />,
    color: 'from-teal-400 to-emerald-500',
    emoji: '💪',
  },
  {
    title: 'Dental Sealants',
    description: "Invisible cavity shields",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: 'from-amber-400 to-orange-500',
    emoji: '🛡️',
  },
  {
    title: 'Gentle Fillings',
    description: 'Tooth-colored & painless',
    icon: <WandSparkles className="w-5 h-5" />,
    color: 'from-pink-400 to-rose-500',
    emoji: '✨',
  },
  {
    title: 'Habit Help',
    description: 'Thumb-sucking guidance',
    icon: <ThumbsUp className="w-5 h-5" />,
    color: 'from-indigo-400 to-violet-500',
    emoji: '👍',
  },
];

const visitSteps = [
  { title: "Hi There!", subtitle: "Warm welcome", icon: <Smile className="w-6 h-6" />, color: 'from-pink-400 to-rose-500', emoji: '👋' },
  { title: "Chair Time", subtitle: "Spaceship ride", icon: <Rocket className="w-6 h-6" />, color: 'from-violet-400 to-purple-500', emoji: '🚀' },
  { title: "Count Teeth", subtitle: "Fun game", icon: <Star className="w-6 h-6" />, color: 'from-amber-400 to-orange-500', emoji: '🦷' },
  { title: "Sparkle Up", subtitle: "Polish time", icon: <Sparkles className="w-6 h-6" />, color: 'from-sky-400 to-cyan-500', emoji: '✨' },
  { title: "Prize Time!", subtitle: "You did it!", icon: <Gift className="w-6 h-6" />, color: 'from-emerald-400 to-teal-500', emoji: '🎁' },
];

// ============================================================================
// ANIMATION VARIANTS - Optimized for mobile 60fps
// ============================================================================

const mobileSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

const gentleSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

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

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// ============================================================================
// SVG ILLUSTRATIONS - Animated & Playful
// ============================================================================

function HappyToothMascot({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      animate={{
        y: [-4, 4, -4],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow effect */}
      <defs>
        <filter id="toothGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="toothGradientMobile" x1="60" y1="10" x2="60" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F8F6F4" />
          <stop offset="100%" stopColor="#F0EBE6" />
        </linearGradient>
        <linearGradient id="crownGradient" x1="60" y1="0" x2="60" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Crown */}
      <motion.path
        d="M40 18L45 8L52 15L60 5L68 15L75 8L80 18L75 20L60 18L45 20L40 18Z"
        fill="url(#crownGradient)"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      {/* Tooth body */}
      <motion.path
        d="M60 20C42 20 28 34 28 52C28 62 30 72 34 80C36 86 38 94 40 102C42 110 48 118 56 118H64C72 118 78 110 80 102C82 94 84 86 86 80C90 72 92 62 92 52C92 34 78 20 60 20Z"
        fill="url(#toothGradientMobile)"
        stroke="#E8E0D8"
        strokeWidth="2"
        filter="url(#toothGlow)"
      />

      {/* Root divider */}
      <path d="M60 80V108" stroke="#E8E0D8" strokeWidth="2" strokeLinecap="round" />

      {/* Sparkle eyes */}
      <motion.g
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        <ellipse cx="48" cy="52" rx="5" ry="6" fill="#1e293b" />
        <ellipse cx="72" cy="52" rx="5" ry="6" fill="#1e293b" />
        <circle cx="50" cy="50" r="2" fill="white" />
        <circle cx="74" cy="50" r="2" fill="white" />
      </motion.g>

      {/* Blush marks */}
      <ellipse cx="38" cy="62" rx="7" ry="4" fill="#FDA4AF" opacity="0.5" />
      <ellipse cx="82" cy="62" rx="7" ry="4" fill="#FDA4AF" opacity="0.5" />

      {/* Happy smile */}
      <motion.path
        d="M46 66C46 76 52 82 60 82C68 82 74 76 74 66"
        stroke="#722F37"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        animate={{
          d: [
            "M46 66C46 76 52 82 60 82C68 82 74 76 74 66",
            "M44 66C44 78 50 84 60 84C70 84 76 78 76 66",
            "M46 66C46 76 52 82 60 82C68 82 74 76 74 66",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Sparkles around */}
      <motion.circle
        cx="92"
        cy="35"
        r="4"
        fill="#FCD34D"
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="28"
        cy="40"
        r="3"
        fill="#FCD34D"
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  );
}

function FloatingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Star
            className={`${i % 2 === 0 ? 'w-4 h-4' : 'w-3 h-3'} text-amber-400`}
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
}

function BubbleDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            i % 3 === 0 ? 'bg-pink-300/20' : i % 3 === 1 ? 'bg-sky-300/20' : 'bg-amber-300/20'
          }`}
          style={{
            width: 30 + i * 15,
            height: 30 + i * 15,
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// MOBILE COMPONENTS - Touch Optimized
// ============================================================================

function MobileFAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
        >
          <motion.button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={`w-full min-h-[64px] p-4 rounded-2xl flex items-center gap-3 text-left transition-all duration-300 ${
              openIndex === index
                ? 'bg-gradient-to-r from-[#722F37] to-[#8B3D47] text-white shadow-lg shadow-[#722F37]/25'
                : 'bg-white border border-gray-100 shadow-sm'
            }`}
            whileTap={{ scale: 0.98 }}
            aria-expanded={openIndex === index}
          >
            <motion.div
              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                openIndex === index
                  ? 'bg-white/20'
                  : 'bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5] text-[#722F37]'
              }`}
              animate={{
                rotate: openIndex === index ? 5 : 0,
                scale: openIndex === index ? 1.05 : 1,
              }}
              transition={mobileSpring}
            >
              {item.icon}
            </motion.div>
            <span className={`font-semibold flex-1 text-[15px] leading-snug pr-2 ${
              openIndex === index ? 'text-white' : 'text-gray-800'
            }`}>
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={mobileSpring}
              className="flex-shrink-0"
            >
              <ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-white/80' : 'text-gray-400'}`} />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 py-4 text-[15px] text-gray-600 leading-relaxed bg-gradient-to-b from-gray-50/50 to-transparent rounded-b-2xl">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof servicesIncluded[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden"
    >
      <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
        {/* Gradient icon container with glow */}
        <div className="relative">
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} blur-lg opacity-30`} />
          <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg`}>
            <span className="text-2xl">{service.emoji}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-[15px] mb-0.5">{service.title}</h3>
          <p className="text-sm text-gray-500 leading-snug">{service.description}</p>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
      </div>
    </motion.div>
  );
}

function VisitStepCard({ step, index, isActive }: { step: typeof visitSteps[0]; index: number; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex-shrink-0 w-[110px] p-4 rounded-2xl text-center transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-br from-[#722F37] to-[#8B3D47] text-white shadow-xl shadow-[#722F37]/30 scale-105'
          : 'bg-white border border-gray-100 shadow-sm'
      }`}
    >
      {/* Step number badge */}
      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        isActive ? 'bg-amber-400 text-amber-900' : 'bg-gray-100 text-gray-500'
      }`}>
        {index + 1}
      </div>

      {/* Icon with glow */}
      <div className="relative mb-2">
        {isActive && (
          <motion.div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} blur-xl opacity-50`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <div className={`relative w-14 h-14 mx-auto rounded-xl ${
          isActive ? 'bg-white/20' : `bg-gradient-to-br ${step.color}`
        } flex items-center justify-center`}>
          <span className="text-2xl">{step.emoji}</span>
        </div>
      </div>

      <h4 className={`font-bold text-sm mb-0.5 ${isActive ? 'text-white' : 'text-gray-800'}`}>
        {step.title}
      </h4>
      <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
        {step.subtitle}
      </p>
    </motion.div>
  );
}

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileTap={{ scale: 0.97 }}
      className="relative overflow-hidden"
    >
      <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
        {/* Background glow */}
        <div className={`absolute top-0 right-0 w-24 h-24 ${benefit.bgGlow} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />

        {/* Icon */}
        <div className="relative mb-3">
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${benefit.color} blur-lg opacity-30`} />
          <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white shadow-lg`}>
            {benefit.icon}
          </div>
        </div>

        <h3 className="font-bold text-gray-800 text-[15px] mb-1">{benefit.title}</h3>
        <p className="text-sm text-gray-500">{benefit.description}</p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN MOBILE PAGE COMPONENT
// ============================================================================

export default function ChildrensDentistryPageMobile() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeStep, setActiveStep] = useState(2);

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-b from-[#FEFCFA] to-white">
      {/* ================================================================== */}
      {/* IMMERSIVE HERO - Full viewport with layered visuals */}
      {/* ================================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F0] via-[#FDF8F3] to-[#F0F8FF]" />

        {/* Floating decorations */}
        <FloatingStars />
        <BubbleDecoration />

        {/* Large decorative orb */}
        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br from-pink-200/40 to-rose-300/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-gradient-to-br from-sky-200/40 to-blue-300/30 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        {/* Header spacer */}
        <div className="h-4" />

        {/* Content container */}
        <div className="relative flex-1 flex flex-col px-5 pb-6">
          {/* Breadcrumb - Minimal */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-1.5 text-xs text-gray-500">
              <li><Link href="/" className="hover:text-[#722F37] transition-colors">Home</Link></li>
              <li className="text-gray-300">/</li>
              <li><Link href="/services" className="hover:text-[#722F37] transition-colors">Services</Link></li>
              <li className="text-gray-300">/</li>
              <li className="text-[#722F37] font-semibold">Kids</li>
            </ol>
          </motion.nav>

          {/* Hero Image with mascot overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[4/3] rounded-[28px] overflow-hidden mb-6 shadow-2xl shadow-[#722F37]/10"
          >
            <Image
              src="/images/services/childrens-dentistry/hero-child-smiling.jpg"
              alt="Happy child with a bright smile during dental visit"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#722F37]/20 to-transparent" />

            {/* Floating mascot */}
            <div className="absolute top-3 right-3 z-10">
              <HappyToothMascot size={70} />
            </div>

            {/* Stats badge - glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-4 shadow-xl border border-white/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Star className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">1000+ Happy Kids</p>
                  <p className="text-sm text-gray-600">Trust us with their smiles</p>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {['👧', '👦', '🧒'][i]}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Title & Description */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="mb-6"
          >
            <motion.div variants={staggerItem} className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-200/50">
                <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ✨ Kid-Friendly Care
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="font-display font-bold text-[32px] leading-[1.15] tracking-tight text-gray-900 mb-3"
            >
              Happy Smiles for{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#722F37] via-pink-500 to-[#722F37] bg-clip-text text-transparent">
                  Little Ones
                </span>
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.path
                    d="M2 6C50 2 150 2 198 6"
                    stroke="url(#underlineGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="underlineGrad" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#722F37" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#722F37" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-gray-600 text-base leading-relaxed"
            >
              Creating magical dental adventures where kids feel safe, excited, and eager to care for their teeth!
            </motion.p>
          </motion.div>

          {/* Trust badges - Horizontal scroll */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide mb-4"
          >
            {[
              { icon: <Award className="w-4 h-4" />, label: 'Kid-Friendly', color: 'from-pink-500 to-rose-500' },
              { icon: <ShieldCheck className="w-4 h-4" />, label: 'Super Gentle', color: 'from-sky-500 to-blue-500' },
              { icon: <Heart className="w-4 h-4" />, label: 'Family Care', color: 'from-rose-500 to-red-500' },
              { icon: <Crown className="w-4 h-4" />, label: 'VIP Tots', color: 'from-amber-500 to-orange-500' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm whitespace-nowrap flex-shrink-0"
              >
                <span className={`bg-gradient-to-br ${badge.color} text-white p-1 rounded-lg`}>
                  {badge.icon}
                </span>
                <span className="text-sm font-semibold text-gray-700">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Spacer to push CTAs to bottom */}
          <div className="flex-1 min-h-4" />

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <Link href="/contact#book" className="block">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#722F37] via-[#8B3D47] to-[#722F37] rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  className="relative w-full py-4 text-base justify-center bg-transparent hover:bg-transparent"
                >
                  Book Your Child&apos;s Adventure
                </Button>
              </motion.div>
            </Link>

            <motion.a
              href="tel:+16137331118"
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 py-3.5 text-[#722F37] font-semibold rounded-xl bg-white/80 backdrop-blur border border-[#722F37]/20 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span>(613) 733-1118</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* WHY KIDS LOVE US - Animated benefit cards */}
      {/* ================================================================== */}
      <section className="py-12 px-5 bg-white relative overflow-hidden">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
          <svg className="w-full h-full">
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-200/50">
              <span className="text-sm font-semibold text-rose-600 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                Why Kids Love Us
              </span>
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900">
            What Makes Us Special
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* THE DENTAL ADVENTURE - Interactive step journey */}
      {/* ================================================================== */}
      <section className="py-12 bg-gradient-to-br from-[#FFF8F5] via-[#FDF8F3] to-[#F5F8FF] relative overflow-hidden">
        <BubbleDecoration />

        <div className="px-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1.5 rounded-full bg-white border border-amber-200/50 shadow-sm">
                <span className="text-sm font-semibold text-amber-600 flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5" />
                  The Adventure
                </span>
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-gray-900">
              What Happens at a Visit?
            </h2>
            <p className="text-gray-600 text-sm mt-2">Tap to explore each magical step!</p>
          </motion.div>
        </div>

        {/* Horizontal scrolling steps */}
        <div className="flex gap-3 overflow-x-auto pb-6 px-5 scrollbar-hide">
          {visitSteps.map((step, index) => (
            <div
              key={index}
              onClick={() => setActiveStep(index)}
              className="relative"
            >
              <VisitStepCard step={step} index={index} isActive={activeStep === index} />
            </div>
          ))}
        </div>

        {/* Active step description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-5 p-5 rounded-2xl bg-white border border-gray-100 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${visitSteps[activeStep]?.color} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{visitSteps[activeStep]?.emoji}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Step {activeStep + 1}: {visitSteps[activeStep]?.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {activeStep === 0 && "We greet your little one with smiles and let them explore our kid-friendly space!"}
                  {activeStep === 1 && "The dental chair becomes a spaceship or race car - their choice for the adventure!"}
                  {activeStep === 2 && "We count teeth together like a fun game while checking everything is healthy."}
                  {activeStep === 3 && "Yummy-flavored toothpaste makes teeth super shiny and sparkling clean!"}
                  {activeStep === 4 && "Every brave explorer picks a treasure from our prize chest!"}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ================================================================== */}
      {/* OUR PHILOSOPHY - Story section */}
      {/* ================================================================== */}
      <section className="py-12 px-5 bg-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-200/50">
              <span className="text-sm font-semibold text-violet-600 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Our Philosophy
              </span>
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">
            Building Lifelong Smiles
          </h2>
        </motion.div>

        {/* Image with overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 shadow-xl"
        >
          <Image
            src="/images/services/childrens-dentistry/dentist-showing-tool.jpg"
            alt="Dentist showing dental tools to a smiling child"
            fill
            className="object-cover"
            loading="lazy"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Floating mascot */}
          <div className="absolute bottom-4 right-4">
            <HappyToothMascot size={50} />
          </div>
        </motion.div>

        <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
          <p>
            Children&apos;s dental care is about more than healthy teeth—it&apos;s about building <strong className="text-gray-800">confidence</strong> and establishing habits that last a lifetime.
          </p>
          <p>
            From first tooth to teenage years, we provide care tailored to each developmental stage with patience and understanding.
          </p>
        </div>

        {/* Fun fact card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur-lg opacity-40" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <Rainbow className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-[15px] mb-1">Did you know? 🌟</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Kids with positive dental experiences early in life maintain better oral health as adults!
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* OUR SERVICES - Interactive cards */}
      {/* ================================================================== */}
      <section className="py-12 px-5 bg-gradient-to-br from-[#FDF8F3] to-[#FEFCFA] relative overflow-hidden">
        <FloatingStars />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1.5 rounded-full bg-white border border-sky-200/50 shadow-sm">
              <span className="text-sm font-semibold text-sky-600 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                Complete Care
              </span>
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900">
            Our Kids&apos; Services
          </h2>
        </motion.div>

        <div className="space-y-3">
          {servicesIncluded.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Prize callout card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] to-[#5a252c] rounded-2xl" />
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>

          <div className="relative p-5 flex items-center gap-4">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <PartyPopper className="w-8 h-8 text-amber-300" />
            </motion.div>
            <div className="text-white">
              <h3 className="font-bold text-lg mb-1">Prize Time! 🎁</h3>
              <p className="text-white/80 text-sm">Every visit ends with a trip to our treasure chest!</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* FAQ SECTION - Accordion */}
      {/* ================================================================== */}
      <section className="py-12 px-5 bg-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-200/50">
              <span className="text-sm font-semibold text-indigo-600 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Parent Resources
              </span>
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900">
            Common Questions
          </h2>
        </motion.div>

        <MobileFAQAccordion items={faqs} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
        >
          <p className="text-gray-600 text-sm mb-3">Have more questions?</p>
          <motion.a
            href="tel:+16137331118"
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#722F37] to-[#8B3D47] text-white font-semibold shadow-lg shadow-[#722F37]/25"
          >
            <Phone className="w-4 h-4" />
            Call Us Now
          </motion.a>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* RELATED SERVICES - Horizontal scroll */}
      {/* ================================================================== */}
      <section className="py-12 bg-gradient-to-br from-[#FDF8F3] to-white">
        <div className="px-5 mb-5">
          <h2 className="font-display font-bold text-2xl text-gray-900">
            Related Services
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 px-5 scrollbar-hide">
          {[
            { title: 'Preventive Care', desc: 'Protect their smile', icon: <Shield className="w-5 h-5" />, href: '/services/preventive-dentistry', color: 'from-emerald-400 to-teal-500', emoji: '🛡️' },
            { title: 'Routine Checkups', desc: 'Regular visits', icon: <Check className="w-5 h-5" />, href: '/services/routine-checkups', color: 'from-sky-400 to-blue-500', emoji: '✅' },
            { title: 'Dental Hygiene', desc: 'Clean & fresh', icon: <Sparkles className="w-5 h-5" />, href: '/services/dental-hygiene', color: 'from-violet-400 to-purple-500', emoji: '✨' },
          ].map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="flex-shrink-0 w-[170px]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileTap={{ scale: 0.97 }}
                className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm h-full"
              >
                <div className="relative mb-3">
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} blur-lg opacity-30`} />
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-xl">{service.emoji}</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-[15px] mb-1">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{service.desc}</p>
                <div className="flex items-center gap-1 text-[#722F37] text-sm font-semibold">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="px-5 mt-2">
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 py-3 text-[#722F37] font-semibold text-sm"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FINAL CTA SECTION */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#8B3D47] to-[#5a252c]" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/5"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-white/5"
            animate={{ scale: [1.3, 1, 1.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Floating mascot */}
          <div className="absolute top-6 right-6">
            <HappyToothMascot size={55} />
          </div>
        </div>

        <div className="relative px-5 py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-5">
              <Heart className="w-4 h-4 text-pink-300" />
              <span className="text-sm font-semibold text-white/90">Start Their Journey</span>
            </div>

            <h2 className="font-display font-bold text-[26px] text-white leading-tight mb-3">
              Give Your Child a<br />Healthy Start
            </h2>
            <p className="text-white/80 text-base mb-8 max-w-[280px] mx-auto">
              Schedule your child&apos;s dental adventure today!
            </p>

            <div className="space-y-3">
              <Link href="/contact#book" className="block">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                    className="w-full py-4 justify-center shadow-xl"
                  >
                    Book an Appointment
                  </Button>
                </motion.div>
              </Link>

              <motion.a
                href="tel:+16137331118"
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3.5 text-white/90 font-semibold"
              >
                <Phone className="w-5 h-5" />
                (613) 733-1118
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* STICKY BOTTOM CTA */}
      {/* ================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] z-50 safe-area-inset-bottom">
        <div className="flex gap-3">
          <motion.a
            href="tel:+16137331118"
            whileTap={{ scale: 0.97 }}
            className="flex-1 min-h-[52px] flex items-center justify-center gap-2 rounded-xl border-2 border-[#722F37] text-[#722F37] font-semibold bg-white shadow-sm"
          >
            <Phone className="w-5 h-5" />
            <span>Call</span>
          </motion.a>
          <Link href="/contact#book" className="flex-[2]">
            <motion.div whileTap={{ scale: 0.97 }} className="relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#722F37] via-[#8B3D47] to-[#722F37] rounded-xl" />
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5" />}
                className="relative w-full min-h-[52px] justify-center bg-transparent hover:bg-transparent"
              >
                Book Visit
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Bottom padding for sticky CTA */}
      <div className="h-28" />

      {/* Shimmer animation keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </main>
  );
}
