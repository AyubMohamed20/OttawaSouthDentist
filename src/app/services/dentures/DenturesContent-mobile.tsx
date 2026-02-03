'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  ChevronDown,
  Check,
  Sparkles,
  Shield,
  Clock,
  Heart,
  Smile,
  Star,
  ArrowRight,
  Quote,
  Sun,
  Coffee,
  Utensils,
  MessageCircle,
  Droplets,
  Moon,
  AlertCircle,
  ThumbsUp,
  Layers,
  CircleDot,
  ChevronRight,
  CircleCheck,
  HandHeart,
  Stethoscope,
  BadgeCheck,
  Zap,
  Target,
  Gem,
  ShieldCheck,
  HeartPulse,
  Play,
  ChevronLeft,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// ANIMATION VARIANTS - Optimized for mobile performance
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

// ============================================================================
// CUSTOM SVG BACKGROUNDS & DECORATIVE ELEMENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114,47,55,0.12) 0%, transparent 70%)',
          top: '5%',
          left: '-20%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114,47,55,0.08) 0%, transparent 70%)',
          bottom: '20%',
          right: '-15%',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

function GrainTexture() {
  return (
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// ============================================================================
// SVG ILLUSTRATIONS - Custom dental-themed visuals
// ============================================================================

function CompleteDenturesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 50 Q60 70 110 50 Q110 35 60 25 Q10 35 10 50Z"
        fill="#FECACA"
        stroke="#F87171"
        strokeWidth="1.5"
      />
      <g fill="white" stroke="#E5E5E5" strokeWidth="1">
        <rect x="45" y="32" width="8" height="14" rx="2" />
        <rect x="54" y="32" width="8" height="14" rx="2" />
        <rect x="63" y="32" width="8" height="14" rx="2" />
        <rect x="36" y="34" width="8" height="12" rx="2" transform="rotate(-10 36 34)" />
        <rect x="26" y="38" width="8" height="11" rx="2" transform="rotate(-20 26 38)" />
        <rect x="17" y="44" width="7" height="10" rx="2" transform="rotate(-30 17 44)" />
        <rect x="72" y="32" width="8" height="12" rx="2" transform="rotate(10 76 34)" />
        <rect x="82" y="34" width="8" height="11" rx="2" transform="rotate(20 86 38)" />
        <rect x="91" y="40" width="7" height="10" rx="2" transform="rotate(30 95 44)" />
      </g>
      <ellipse cx="56" cy="38" rx="3" ry="2" fill="#F0F9FF" opacity="0.6" />
    </svg>
  );
}

function PartialDenturesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M25 45 Q60 55 95 45"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M25 45 Q20 40 22 35" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M95 45 Q100 40 98 35" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="45" cy="42" rx="12" ry="8" fill="#FECACA" stroke="#F87171" strokeWidth="1" />
      <ellipse cx="75" cy="42" rx="12" ry="8" fill="#FECACA" stroke="#F87171" strokeWidth="1" />
      <g fill="white" stroke="#E5E5E5" strokeWidth="1">
        <rect x="38" y="35" width="7" height="11" rx="2" />
        <rect x="46" y="35" width="7" height="11" rx="2" />
        <rect x="68" y="35" width="7" height="11" rx="2" />
        <rect x="76" y="35" width="7" height="11" rx="2" />
      </g>
      <g fill="#F5F5F4" stroke="#D4D4D4" strokeWidth="1">
        <rect x="20" y="30" width="6" height="10" rx="1.5" />
        <rect x="94" y="30" width="6" height="10" rx="1.5" />
      </g>
    </svg>
  );
}

function ImplantDenturesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 70 Q60 80 105 70 L100 55 Q60 65 20 55 Z"
        fill="#E7E5E4"
        stroke="#A8A29E"
        strokeWidth="1"
      />
      <g fill="#71717A" stroke="#52525B" strokeWidth="0.5">
        <rect x="32" y="50" width="4" height="18" rx="1" />
        <rect x="57" y="50" width="4" height="18" rx="1" />
        <rect x="82" y="50" width="4" height="18" rx="1" />
      </g>
      <path
        d="M20 48 Q60 58 100 48 Q100 38 60 30 Q20 38 20 48Z"
        fill="#FECACA"
        stroke="#F87171"
        strokeWidth="1.5"
      />
      <g fill="white" stroke="#E5E5E5" strokeWidth="1">
        <rect x="48" y="32" width="7" height="12" rx="2" />
        <rect x="56" y="32" width="7" height="12" rx="2" />
        <rect x="64" y="32" width="7" height="12" rx="2" />
        <rect x="40" y="34" width="7" height="10" rx="2" transform="rotate(-8 40 34)" />
        <rect x="72" y="32" width="7" height="10" rx="2" transform="rotate(8 76 34)" />
      </g>
      <g fill="#722F37">
        <circle cx="34" cy="48" r="2" />
        <circle cx="59" cy="48" r="2" />
        <circle cx="84" cy="48" r="2" />
      </g>
    </svg>
  );
}

function SmileTransformIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(10, 10)">
        <circle cx="20" cy="20" r="18" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1.5" />
        <circle cx="14" cy="16" r="2" fill="#78716C" />
        <circle cx="26" cy="16" r="2" fill="#78716C" />
        <path d="M12 28 Q20 24 28 28" fill="none" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g transform="translate(50, 20)">
        <path d="M0 10 L15 10" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 5 L17 10 L12 15" fill="none" stroke="#722F37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(70, 10)">
        <circle cx="20" cy="20" r="18" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1.5" />
        <path d="M12 14 Q14 12 16 14" fill="none" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 14 Q26 12 28 14" fill="none" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 24 Q20 32 28 24" fill="white" stroke="#78716C" strokeWidth="1.5" />
        <line x1="16" y1="24" x2="16" y2="27" stroke="#E5E5E5" strokeWidth="0.5" />
        <line x1="20" y1="24" x2="20" y2="28" stroke="#E5E5E5" strokeWidth="0.5" />
        <line x1="24" y1="24" x2="24" y2="27" stroke="#E5E5E5" strokeWidth="0.5" />
      </g>
      <g fill="#722F37">
        <path d="M100 8 L101 12 L105 13 L101 14 L100 18 L99 14 L95 13 L99 12 Z" />
      </g>
    </svg>
  );
}

function DentureCareIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M35 25 L30 70 Q30 75 35 75 L65 75 Q70 75 70 70 L65 25 Z"
        fill="#DBEAFE"
        stroke="#60A5FA"
        strokeWidth="1.5"
      />
      <path d="M32 40 Q50 45 68 40" stroke="#93C5FD" strokeWidth="1" fill="none" />
      <ellipse cx="50" cy="55" rx="14" ry="8" fill="#FECACA" opacity="0.8" />
      <g fill="white" stroke="#E5E5E5" strokeWidth="0.5" opacity="0.9">
        <rect x="42" y="51" width="4" height="7" rx="1" />
        <rect x="47" y="51" width="4" height="7" rx="1" />
        <rect x="52" y="51" width="4" height="7" rx="1" />
        <rect x="57" y="51" width="4" height="7" rx="1" />
      </g>
      <circle cx="38" cy="50" r="2" fill="#BFDBFE" />
      <circle cx="60" cy="45" r="1.5" fill="#BFDBFE" />
      <g transform="translate(75, 20) rotate(15)">
        <rect x="0" y="0" width="8" height="35" rx="2" fill="#A78BFA" stroke="#7C3AED" strokeWidth="1" />
        <rect x="-1" y="35" width="10" height="15" rx="2" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1" />
        <g fill="#C4B5FD">
          <rect x="0" y="37" width="2" height="5" rx="0.5" />
          <rect x="3" y="37" width="2" height="5" rx="0.5" />
          <rect x="6" y="37" width="2" height="5" rx="0.5" />
        </g>
      </g>
    </svg>
  );
}

// ============================================================================
// DATA
// ============================================================================

const faqs = [
  {
    question: 'How long do dentures last?',
    answer:
      'Dentures typically last 5-10 years before needing replacement. Regular adjustments may be needed to maintain proper fit.',
  },
  {
    question: 'Will dentures affect my speech?',
    answer:
      'There may be a brief adjustment period. Most patients adapt within a few days to a couple of weeks.',
  },
  {
    question: 'Can I sleep with my dentures in?',
    answer:
      "It's recommended to remove dentures at night to rest your gums and maintain oral health.",
  },
  {
    question: 'How do I care for my dentures?',
    answer:
      'Remove and rinse after eating, brush daily with denture cleaner, handle carefully, and soak overnight.',
  },
  {
    question: 'Full vs. partial dentures?',
    answer:
      'Full dentures replace all teeth in an arch. Partial dentures replace some missing teeth and attach to remaining teeth.',
  },
];

const dentureTypes = [
  {
    id: 'complete',
    title: 'Complete Dentures',
    subtitle: 'Full Arch Replacement',
    description:
      'Replace all teeth in the upper or lower arch. Available in conventional or immediate options.',
    features: ['Full arch replacement', 'Natural gum appearance', 'Custom shade matching'],
    icon: <Layers className="w-6 h-6" />,
    illustration: CompleteDenturesIllustration,
    color: 'from-rose-500/20 to-pink-500/10',
  },
  {
    id: 'partial',
    title: 'Partial Dentures',
    subtitle: 'Selective Tooth Replacement',
    description:
      'Ideal when some natural teeth remain. Attach to existing teeth with clasps.',
    features: ['Preserves natural teeth', 'Metal or flexible options', 'Removable design'],
    icon: <CircleDot className="w-6 h-6" />,
    illustration: PartialDenturesIllustration,
    color: 'from-amber-500/20 to-orange-500/10',
  },
  {
    id: 'implant',
    title: 'Implant-Supported',
    subtitle: 'Maximum Stability',
    description:
      'Anchored by dental implants for superior stability. Eliminates slipping.',
    features: ['Maximum stability', 'Prevents bone loss', 'Like natural teeth'],
    icon: <Shield className="w-6 h-6" />,
    illustration: ImplantDenturesIllustration,
    color: 'from-emerald-500/20 to-teal-500/10',
  },
];

const benefits = [
  { icon: <Smile className="w-5 h-5" />, title: 'Natural Look', description: 'Custom-crafted to match your face', gradient: 'from-pink-500 to-rose-500' },
  { icon: <Utensils className="w-5 h-5" />, title: 'Eat Freely', description: 'Enjoy your favorite foods again', gradient: 'from-amber-500 to-orange-500' },
  { icon: <MessageCircle className="w-5 h-5" />, title: 'Clear Speech', description: 'Speak without worry', gradient: 'from-blue-500 to-cyan-500' },
  { icon: <HeartPulse className="w-5 h-5" />, title: 'Facial Support', description: 'Maintain facial structure', gradient: 'from-purple-500 to-violet-500' },
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Durable', description: 'Long-lasting results', gradient: 'from-emerald-500 to-teal-500' },
  { icon: <HandHeart className="w-5 h-5" />, title: 'Gentle Care', description: 'Compassionate treatment', gradient: 'from-rose-500 to-pink-500' },
];

const procedureSteps = [
  { step: '01', title: 'Consultation', description: 'Comprehensive exam and goal discussion', icon: <Stethoscope className="w-5 h-5" />, color: 'bg-blue-500' },
  { step: '02', title: 'Impressions', description: 'Detailed molds for perfect fit', icon: <Target className="w-5 h-5" />, color: 'bg-purple-500' },
  { step: '03', title: 'Try-In', description: 'Preview and adjust in wax form', icon: <Smile className="w-5 h-5" />, color: 'bg-amber-500' },
  { step: '04', title: 'Final Fitting', description: 'Receive your completed dentures', icon: <BadgeCheck className="w-5 h-5" />, color: 'bg-emerald-500' },
  { step: '05', title: 'Follow-Up', description: 'Ongoing adjustments as needed', icon: <Heart className="w-5 h-5" />, color: 'bg-rose-500' },
];

const careGuide = [
  { icon: <Sun className="w-5 h-5" />, time: 'Morning', tasks: ['Rinse before wearing', 'Brush gums & tongue'], color: 'from-amber-400 to-orange-500' },
  { icon: <Coffee className="w-5 h-5" />, time: 'After Meals', tasks: ['Remove & rinse', 'Clean food particles'], color: 'from-amber-600 to-amber-700' },
  { icon: <Moon className="w-5 h-5" />, time: 'Nighttime', tasks: ['Remove dentures', 'Soak overnight'], color: 'from-indigo-500 to-purple-600' },
  { icon: <Droplets className="w-5 h-5" />, time: 'Weekly', tasks: ['Deep clean', 'Check for damage'], color: 'from-cyan-500 to-blue-500' },
];

const testimonials = [
  {
    quote: "My new dentures feel so natural I forget I'm wearing them.",
    author: 'Margaret S.',
    age: '72',
    treatment: 'Complete Dentures',
    avatar: 'M',
  },
  {
    quote: 'The implant-supported dentures changed my life. I can eat anything now.',
    author: 'Robert K.',
    age: '68',
    treatment: 'Implant-Supported',
    avatar: 'R',
  },
  {
    quote: "The team's patience made all the difference. Couldn't be happier.",
    author: 'Eleanor P.',
    age: '75',
    treatment: 'Partial Dentures',
    avatar: 'E',
  },
];

const relatedServices = [
  { title: 'Dental Implants', href: '/services/dental-implants', icon: <Shield className="w-5 h-5" />, color: 'bg-blue-500' },
  { title: 'Missing Teeth', href: '/services/missing-teeth', icon: <Sparkles className="w-5 h-5" />, color: 'bg-purple-500' },
  { title: 'Routine Checkups', href: '/services/routine-checkups', icon: <Calendar className="w-5 h-5" />, color: 'bg-emerald-500' },
];

// ============================================================================
// MOBILE HERO SECTION - Immersive full-screen experience
// ============================================================================

function MobileHeroSection() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src="/images/services/dentures/senior-couple-smiling.jpg"
          alt="Happy senior couple with confident smiles"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#722F37]/40 via-transparent to-transparent" />

      {/* Grain texture */}
      <GrainTexture />

      {/* Content */}
      <motion.div
        className="relative flex-1 flex flex-col justify-end px-5 pb-10 pt-24"
        style={{ opacity: contentOpacity }}
      >
        {/* Breadcrumb - Minimal */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-xs text-white/60">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-white/40">/</li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li aria-hidden="true" className="text-white/40">/</li>
            <li className="text-white/90 font-medium">Dentures</li>
          </ol>
        </motion.nav>

        {/* Badge with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-5 self-start"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-[#722F37]/30 blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <HandHeart className="w-4 h-4 relative z-10" aria-hidden="true" />
          <span className="relative z-10">Compassionate Care</span>
        </motion.div>

        {/* Headline with staggered animation */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            variants={staggerItem}
            className="text-[2.75rem] leading-[1.05] font-bold text-white tracking-tight mb-4"
          >
            Rediscover the
          </motion.h1>
          <motion.div
            variants={staggerItem}
            className="relative inline-block mb-5"
          >
            <span className="text-[2.75rem] leading-[1.05] font-bold bg-gradient-to-r from-[#f0b4ba] via-[#e8a0a8] to-[#d88a94] bg-clip-text text-transparent">
              Joy of Smiling
            </span>
            {/* Decorative underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[#722F37] to-[#a04d56] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/80 text-base leading-relaxed mb-8 max-w-[320px]"
        >
          Custom-fitted dentures for comfort, function, and natural beauty. Restore your confidence.
        </motion.p>

        {/* CTA Buttons - Large touch targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-3"
        >
          <Link href="/contact#book" className="block">
            <motion.button
              className="w-full py-4.5 px-6 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-xl shadow-[#722F37]/30"
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <span>Book Free Consultation</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.span>
            </motion.button>
          </Link>

          <motion.a
            href={phoneHref}
            className="flex items-center justify-center gap-2 py-3.5 text-white/90 font-medium backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span>{formattedPhone}</span>
          </motion.a>
        </motion.div>

        {/* Trust indicators with animated stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex -space-x-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 500 }}
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <span className="text-white/70 text-sm font-medium">500+ Happy Patients</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE BENEFITS SECTION - Elegant grid with micro-interactions
// ============================================================================

function MobileBenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-16 px-5 bg-gradient-to-b from-white via-[#FDFBF9] to-white overflow-hidden">
      <FloatingOrbs />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#722F37]/10 to-[#722F37]/5 text-[#722F37] text-xs font-semibold mb-4"
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Why Choose Dentures</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-900 leading-tight">
          Benefits of{' '}
          <span className="bg-gradient-to-r from-[#722F37] to-[#a04d56] bg-clip-text text-transparent">
            Quality Dentures
          </span>
        </h2>
      </motion.div>

      {/* Smile Transformation Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mb-10"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/10 to-transparent rounded-3xl blur-2xl scale-110" />
          <div className="relative bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] rounded-2xl p-6 shadow-lg shadow-[#722F37]/5 border border-[#EDE5DD]">
            <SmileTransformIllustration className="w-52 h-28" />
          </div>
        </div>
      </motion.div>

      {/* Benefits Grid - 2 columns with staggered animation */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            variants={staggerItem}
            whileTap={{ scale: 0.97 }}
            className="group relative bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 overflow-hidden"
          >
            {/* Gradient background on tap */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent opacity-0 group-active:opacity-100 transition-opacity" />

            <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white mb-3 shadow-lg`}>
              {benefit.icon}
            </div>
            <h3 className="font-bold text-sm text-neutral-900 mb-1">{benefit.title}</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE DENTURE TYPES SECTION - Interactive horizontal cards
// ============================================================================

function MobileDentureTypesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 bg-gradient-to-b from-white to-[#FDF8F3] overflow-hidden">
      <div className="px-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold mb-4"
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Find Your Perfect Fit</span>
          </motion.div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Types of <span className="text-[#722F37]">Dentures</span>
          </h2>
        </motion.div>
      </div>

      {/* Tab Pills - Horizontally scrollable */}
      <motion.div
        className="flex gap-2 px-5 mb-6 overflow-x-auto scrollbar-hide pb-2 -mx-1"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {dentureTypes.map((type, index) => (
          <motion.button
            key={type.id}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all text-sm font-semibold ${
              activeIndex === index
                ? 'bg-[#722F37] text-white shadow-lg shadow-[#722F37]/25'
                : 'bg-white text-neutral-600 border border-neutral-200 shadow-sm'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <span className={activeIndex === index ? 'text-white' : 'text-[#722F37]'}>
              {type.icon}
            </span>
            {type.title.split(' ')[0]}
          </motion.button>
        ))}
      </motion.div>

      {/* Active Card with AnimatePresence */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50 border border-neutral-100"
          >
            {/* Illustration Header */}
            <div className={`relative bg-gradient-to-br ${dentureTypes[activeIndex]?.color ?? 'from-rose-500/20 to-pink-500/10'} p-8 flex justify-center overflow-hidden`}>
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {(() => {
                  const Illustration = dentureTypes[activeIndex]?.illustration ?? CompleteDenturesIllustration;
                  return <Illustration className="w-44 h-28 relative z-10" />;
                })()}
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8a3a44] text-white flex items-center justify-center shadow-lg shadow-[#722F37]/20">
                  {dentureTypes[activeIndex]?.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900">{dentureTypes[activeIndex]?.title}</h3>
                  <p className="text-sm text-[#722F37] font-medium">{dentureTypes[activeIndex]?.subtitle}</p>
                </div>
              </div>

              <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                {dentureTypes[activeIndex]?.description}
              </p>

              {/* Features with staggered animation */}
              <motion.div
                className="space-y-2.5"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                {dentureTypes[activeIndex]?.features.map((feature) => (
                  <motion.div
                    key={feature}
                    variants={staggerItem}
                    className="flex items-center gap-3 text-sm text-neutral-700"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {dentureTypes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-[#722F37]' : 'w-2 bg-neutral-300'
            }`}
            whileTap={{ scale: 0.9 }}
            aria-label={`View ${dentureTypes[index]?.title}`}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// MOBILE PROCESS SECTION - Beautiful vertical timeline
// ============================================================================

function MobileProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold mb-4"
        >
          <Target className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Your Journey</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-900">
          The Denture <span className="text-[#722F37]">Process</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Animated line */}
        <motion.div
          className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#722F37] via-[#a04d56] to-[#d88a94]"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ transformOrigin: 'top' }}
        />

        <div className="space-y-6">
          {procedureSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative flex gap-5 items-start"
            >
              {/* Circle with Icon */}
              <motion.div
                className={`relative z-10 w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}
                whileTap={{ scale: 0.95 }}
              >
                {step.icon}
                {/* Pulse effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl ${step.color}`}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </motion.div>

              {/* Content Card */}
              <div className="flex-1 bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs font-bold text-[#722F37] bg-[#722F37]/10 px-2 py-0.5 rounded-full">{step.step}</span>
                  <h3 className="font-bold text-neutral-900">{step.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MOBILE CARE GUIDE SECTION - Interactive cards
// ============================================================================

function MobileCareGuideSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold mb-4"
        >
          <Gem className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Keep Your Smile Bright</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Denture <span className="text-[#722F37]">Care Guide</span>
        </h2>
      </motion.div>

      {/* Care Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-neutral-100">
          <DentureCareIllustration className="w-36 h-24" />
        </div>
      </motion.div>

      {/* Accordion Items */}
      <div className="space-y-3">
        {careGuide.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                openIndex === index
                  ? 'bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white shadow-lg shadow-[#722F37]/20'
                  : 'bg-white border border-neutral-200 text-neutral-900 shadow-sm'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  openIndex === index
                    ? 'bg-white/20'
                    : `bg-gradient-to-br ${item.color} text-white`
                }`}>
                  {item.icon}
                </div>
                <span className="font-semibold text-base">{item.time}</span>
              </div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className="overflow-hidden"
                >
                  <div className="bg-white border border-t-0 border-neutral-200 rounded-b-2xl p-4 pt-3 -mt-2">
                    <ul className="space-y-2.5">
                      {item.tasks.map((task, i) => (
                        <motion.li
                          key={task}
                          className="flex items-center gap-3 text-sm text-neutral-700"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                          </div>
                          {task}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Important Tips Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
            <AlertCircle className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-sm mb-2">Important Tips</h3>
            <ul className="space-y-1.5 text-xs text-neutral-700">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-500" />
                Never use hot water—it warps dentures
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-500" />
                Handle over a soft surface
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-500" />
                Don&apos;t use regular toothpaste
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE TESTIMONIALS - Beautiful carousel
// ============================================================================

function MobileTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goToNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section ref={containerRef} className="py-16 px-5 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold mb-4"
        >
          <Heart className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Patient Stories</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Smiles <span className="text-[#722F37]">Restored</span>
        </h2>
      </motion.div>

      {/* Testimonial Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="relative bg-gradient-to-br from-[#FDF8F3] via-[#F8F0E8] to-[#EDE5DD] rounded-3xl p-6 shadow-lg border border-[#EDE5DD]"
          >
            {/* Quote Icon with glow */}
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8a3a44] flex items-center justify-center mb-5 shadow-lg shadow-[#722F37]/20">
              <Quote className="w-6 h-6 text-white" aria-hidden="true" />
              <motion.div
                className="absolute inset-0 rounded-2xl bg-[#722F37]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4" role="img" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" aria-hidden="true" />
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg font-medium text-neutral-800 leading-relaxed mb-6">
              &ldquo;{testimonials[activeIndex]?.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#722F37] to-[#a04d56] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {testimonials[activeIndex]?.avatar}
              </div>
              <div>
                <p className="font-bold text-neutral-900">{testimonials[activeIndex]?.author}</p>
                <p className="text-sm text-neutral-500">
                  Age {testimonials[activeIndex]?.age} · {testimonials[activeIndex]?.treatment}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2">
          <motion.button
            onClick={goToPrev}
            className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center pointer-events-auto"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </motion.button>
          <motion.button
            onClick={goToNext}
            className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center pointer-events-auto"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </motion.button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-[#722F37]' : 'w-2 bg-neutral-300'
            }`}
            whileTap={{ scale: 0.9 }}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// MOBILE FAQ SECTION - Clean accordion
// ============================================================================

function MobileFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#FDF8F3] to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold mb-4"
        >
          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Common Questions</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Frequently <span className="text-[#722F37]">Asked</span>
        </h2>
      </motion.div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-200 text-left shadow-sm"
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold text-neutral-900 pr-4 text-[15px]">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className="overflow-hidden"
                >
                  <div className="bg-white border border-t-0 border-neutral-200 rounded-b-2xl p-4 pt-3 -mt-2">
                    <p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-neutral-500 text-sm mb-3">Still have questions?</p>
        <motion.a
          href={`tel:${contactInfo.phone}`}
          className="inline-flex items-center gap-2 text-[#722F37] font-semibold text-sm"
          whileTap={{ scale: 0.95 }}
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Call us anytime
        </motion.a>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE RELATED SERVICES
// ============================================================================

function MobileRelatedServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl font-bold text-neutral-900">
          Related <span className="text-[#722F37]">Services</span>
        </h2>
      </motion.div>

      <div className="space-y-3">
        {relatedServices.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={service.href}>
              <motion.div
                className="flex items-center justify-between p-4 bg-gradient-to-r from-neutral-50 to-white rounded-2xl border border-neutral-100 shadow-sm"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center text-white shadow-lg`}>
                    {service.icon}
                  </div>
                  <span className="font-semibold text-neutral-900">{service.title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400" aria-hidden="true" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 text-center"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[#722F37] font-semibold text-sm"
        >
          View All Services
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE CTA SECTION - Gradient background with floating elements
// ============================================================================

function MobileCTASection() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <section className="relative py-16 px-5 bg-gradient-to-br from-[#722F37] via-[#8a3a44] to-[#5a252c] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-white/5"
          style={{ top: '-20%', right: '-20%' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-white/5"
          style={{ bottom: '-15%', left: '-15%' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <GrainTexture />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative text-center"
      >
        {/* Sparkle icon */}
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
          Ready to Restore<br />Your Smile?
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-[280px] mx-auto">
          Schedule your free consultation today and discover how we can help you smile with confidence again.
        </p>

        <div className="space-y-3">
          <Link href="/contact#book" className="block">
            <motion.button
              className="w-full py-4 px-6 bg-white text-[#722F37] rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 shadow-xl"
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book Free Consultation
            </motion.button>
          </Link>

          <motion.a
            href={phoneHref}
            className="flex items-center justify-center gap-2 py-3.5 text-white/90 font-medium"
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            {formattedPhone}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA BAR - Appears after scrolling
// ============================================================================

function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight);
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
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-xl border-t border-neutral-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
        >
          <div className="flex gap-3 max-w-md mx-auto">
            <Link href="/contact#book" className="flex-1">
              <motion.button
                className="w-full py-3.5 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#722F37]/20"
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Book Now
              </motion.button>
            </Link>
            <motion.a
              href={`tel:${contactInfo.phone}`}
              className="w-14 h-14 bg-neutral-100 text-[#722F37] rounded-xl flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN MOBILE COMPONENT
// ============================================================================

export function DenturesContentMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <MobileHeroSection />

      {/* Benefits Section */}
      <MobileBenefitsSection />

      {/* Denture Types */}
      <MobileDentureTypesSection />

      {/* Process Timeline */}
      <MobileProcessSection />

      {/* Care Guide */}
      <MobileCareGuideSection />

      {/* Testimonials */}
      <MobileTestimonialsSection />

      {/* FAQ */}
      <MobileFAQSection />

      {/* Related Services */}
      <MobileRelatedServicesSection />

      {/* CTA Section */}
      <MobileCTASection />

      {/* Sticky Bottom CTA */}
      <StickyBottomCTA />
    </main>
  );
}
