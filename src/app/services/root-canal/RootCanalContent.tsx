'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  Sparkles,
  Activity,
  Clock,
  Star,
  ThumbsUp,
  Smile,
  Award,
  CheckCircle2,
  XCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
  Syringe,
  Microscope,
  Stethoscope,
  Timer,
  HeartPulse,
  ShieldCheck,
  CircleDot,
  Target,
  Layers,
  Crown,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';

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
      'Modern root canal treatment is performed with effective local anesthesia and is generally no more uncomfortable than getting a filling. Most patients report significant relief from the pain caused by the infection. Our gentle approach and advanced techniques ensure your comfort throughout the procedure.',
  },
  {
    question: "What happens if I don't get a root canal?",
    answer:
      "Without treatment, the infection can spread beyond the tooth, causing an abscess, bone loss, and potentially affecting neighboring teeth. In severe cases, the infection can spread to other parts of the body. Ultimately, delaying treatment often leads to tooth extraction, which requires more complex and costly replacement options.",
  },
  {
    question: 'How successful is root canal treatment?',
    answer:
      'Root canal treatment has a very high success rate of over 95%. With proper care, including a dental crown and good oral hygiene, your treated tooth can last a lifetime. Regular checkups allow us to monitor the tooth and ensure it remains healthy.',
  },
  {
    question: 'How long does a root canal take?',
    answer:
      "Most root canal treatments can be completed in one to two appointments, depending on the complexity of the case. Each appointment typically lasts about 60-90 minutes. We'll provide you with a clear treatment timeline during your initial consultation.",
  },
  {
    question: 'Will I need a crown after my root canal?',
    answer:
      'In most cases, yes. A crown is recommended to protect the treated tooth, which may become more brittle after the procedure. The crown restores full function and provides long-term protection, helping your tooth last for many years to come.',
  },
];

const mythsVsReality = [
  {
    myth: "Root canals are extremely painful",
    reality: "Modern anesthesia makes the procedure virtually painless—most patients feel immediate relief",
    icon: HeartPulse,
  },
  {
    myth: "It's better to just extract the tooth",
    reality: "Keeping your natural tooth is always preferable—root canal saves it and preserves your smile",
    icon: Smile,
  },
  {
    myth: "Root canals cause illness",
    reality: "This century-old myth has been debunked—root canals are safe and prevent infection spread",
    icon: ShieldCheck,
  },
  {
    myth: "Recovery takes weeks",
    reality: "Most patients return to normal activities the same day with minimal discomfort",
    icon: Timer,
  },
];

const benefits = [
  {
    icon: Heart,
    title: 'Save Your Natural Tooth',
    description: 'Preserve your natural smile by treating the infection and keeping your own tooth intact.',
    stat: '100%',
    statLabel: 'Natural',
  },
  {
    icon: Zap,
    title: 'Immediate Pain Relief',
    description: 'Experience quick relief from the throbbing pain and sensitivity caused by tooth infection.',
    stat: '24hr',
    statLabel: 'Relief',
  },
  {
    icon: Shield,
    title: '95%+ Success Rate',
    description: 'Root canal therapy is a highly reliable treatment with excellent long-term outcomes.',
    stat: '95%',
    statLabel: 'Success',
  },
  {
    icon: Activity,
    title: 'Modern Technology',
    description: 'Advanced techniques and equipment ensure precise, comfortable, and efficient treatment.',
    stat: '3D',
    statLabel: 'Imaging',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Diagnosis',
    description: 'We take X-rays and perform a thorough examination to assess the infection and plan your treatment.',
    icon: Microscope,
    duration: 'Initial Visit',
    color: 'from-blue-500 to-blue-400',
  },
  {
    step: 2,
    title: 'Anesthesia',
    description: 'The area is numbed completely with local anesthesia to ensure your comfort throughout the procedure.',
    icon: Syringe,
    duration: 'Day 1',
    color: 'from-purple-500 to-purple-400',
  },
  {
    step: 3,
    title: 'Access & Cleaning',
    description: 'A small opening is created and infected pulp tissue is carefully removed from the root canals.',
    icon: Target,
    duration: 'Day 1',
    color: 'from-teal-500 to-teal-400',
  },
  {
    step: 4,
    title: 'Shaping & Filling',
    description: 'The canals are precisely shaped and sealed with biocompatible gutta-percha material.',
    icon: Layers,
    duration: 'Day 1',
    color: 'from-emerald-500 to-emerald-400',
  },
  {
    step: 5,
    title: 'Restoration',
    description: 'A crown is placed over the tooth to restore its strength, function, and natural appearance.',
    icon: Crown,
    duration: 'Follow-up',
    color: 'from-amber-500 to-amber-400',
  },
];

const warningSymptoms = [
  { symptom: 'Severe toothache, especially when chewing', severity: 'high', icon: AlertCircle },
  { symptom: 'Prolonged sensitivity to hot or cold', severity: 'medium', icon: Zap },
  { symptom: 'Darkening or discoloration of the tooth', severity: 'medium', icon: CircleDot },
  { symptom: 'Swelling or tenderness in nearby gums', severity: 'high', icon: AlertCircle },
  { symptom: 'Abscess or pimple on the gums', severity: 'high', icon: AlertCircle },
];

const testimonials = [
  {
    quote: "I was terrified of getting a root canal, but Dr. Smith made me feel completely at ease. The procedure was painless and I felt relief immediately!",
    author: "Sarah M.",
    rating: 5,
    image: "/images/services/root-canal/happy-dental-checkup.jpg",
  },
  {
    quote: "After years of avoiding the dentist, I finally got my root canal done here. The whole team was incredibly gentle and understanding.",
    author: "Michael R.",
    rating: 5,
    image: "/images/cosmetic/cosmetic-14.jpg",
  },
  {
    quote: "Professional, caring, and absolutely pain-free. I wish I had done this sooner instead of suffering for months!",
    author: "Jennifer L.",
    rating: 5,
    image: "/images/cosmetic/cosmetic-15.jpg",
  },
];

const recoveryTimeline = [
  { day: 'Day 1', title: 'Treatment Complete', description: 'Numbness wears off, take prescribed medication as needed', icon: Check },
  { day: 'Days 2-3', title: 'Mild Tenderness', description: 'Some sensitivity is normal, over-the-counter pain relief helps', icon: HeartPulse },
  { day: 'Week 1', title: 'Back to Normal', description: 'Most patients resume all normal activities without discomfort', icon: Smile },
  { day: 'Week 2', title: 'Crown Placement', description: 'Return visit to place permanent crown for protection', icon: Crown },
];

const relatedServices = [
  {
    title: 'White Fillings',
    description: 'Natural-looking composite fillings for cavities and minor tooth damage.',
    href: '/services/white-fillings',
    icon: Sparkles,
  },
  {
    title: 'Preventive Dentistry',
    description: 'Comprehensive preventive care to maintain oral health and catch problems early.',
    href: '/services/preventive-dentistry',
    icon: Shield,
  },
  {
    title: 'Routine Checkups',
    description: 'Regular examinations to catch problems early and maintain optimal oral health.',
    href: '/services/routine-checkups',
    icon: Check,
  },
];

const technologyFeatures = [
  {
    title: 'Digital X-Rays',
    description: '3D imaging for precise diagnosis with 90% less radiation than traditional X-rays',
    icon: Microscope,
  },
  {
    title: 'Rotary Instruments',
    description: 'Faster, more precise cleaning with advanced nickel-titanium rotary files',
    icon: Activity,
  },
  {
    title: 'Apex Locators',
    description: 'Electronic measurement ensures accurate root canal length determination',
    icon: Zap,
  },
  {
    title: 'Dental Microscope',
    description: 'Enhanced visualization for identifying and treating all canal branches',
    icon: Stethoscope,
  },
];

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
// ANIMATION VARIANTS
// ============================================================================

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114, 47, 55, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(114, 47, 55, 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(114, 47, 55, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

// ============================================================================
// TOOTH ANATOMY ILLUSTRATION - Improved SVG
// ============================================================================

function ToothAnatomyIllustration({
  activeStep = 0,
  className = ''
}: {
  activeStep?: number;
  className?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 300 400"
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      aria-label="Tooth anatomy illustration showing root canal treatment process"
      role="img"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="enamelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="dentinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="pulpHealthy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="pulpInfected" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="guttaPercha" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="toothGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Shadow */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Background gum tissue */}
      <motion.ellipse
        cx="150"
        cy="180"
        rx="120"
        ry="30"
        fill="#fecaca"
        opacity="0.4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Tooth Enamel (Crown) */}
      <motion.path
        d="M90 120
           C 90 60, 120 30, 150 30
           C 180 30, 210 60, 210 120
           C 210 160, 195 180, 195 180
           L 105 180
           C 105 180, 90 160, 90 120"
        fill="url(#enamelGradient)"
        stroke="#cbd5e1"
        strokeWidth="2"
        filter="url(#dropShadow)"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Dentin layer */}
      <motion.path
        d="M105 130
           C 105 90, 125 65, 150 65
           C 175 65, 195 90, 195 130
           C 195 155, 185 170, 185 170
           L 115 170
           C 115 170, 105 155, 105 130"
        fill="url(#dentinGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />

      {/* Pulp Chamber */}
      <motion.ellipse
        cx="150"
        cy="130"
        rx="30"
        ry="25"
        fill={activeStep >= 3 ? 'url(#pulpHealthy)' : 'url(#pulpInfected)'}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: activeStep < 2 ? [1, 1.05, 1] : 1,
          opacity: 1
        }}
        transition={{
          scale: { duration: 1.5, repeat: activeStep < 2 ? Infinity : 0 },
          opacity: { duration: 0.5, delay: 0.6 }
        }}
      />

      {/* Root structure */}
      <g>
        {/* Left root */}
        <motion.path
          d="M115 180 L 100 300 C 95 330, 110 345, 120 340"
          fill="none"
          stroke="url(#enamelGradient)"
          strokeWidth="25"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Center root */}
        <motion.path
          d="M150 180 L 150 320 C 150 350, 150 355, 150 355"
          fill="none"
          stroke="url(#enamelGradient)"
          strokeWidth="25"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />

        {/* Right root */}
        <motion.path
          d="M185 180 L 200 300 C 205 330, 190 345, 180 340"
          fill="none"
          stroke="url(#enamelGradient)"
          strokeWidth="25"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </g>

      {/* Root Canals - animate based on procedure step */}
      <g>
        {/* Left canal */}
        <motion.path
          d="M115 170 L 105 295 C 102 315, 112 325, 118 322"
          fill="none"
          stroke={activeStep >= 4 ? 'url(#guttaPercha)' : activeStep >= 3 ? 'url(#pulpHealthy)' : 'url(#pulpInfected)'}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: activeStep >= 2 ? 1 : 0.3 }}
          transition={{ duration: 0.8 }}
        />

        {/* Center canal */}
        <motion.path
          d="M150 155 L 150 315 C 150 335, 150 340, 150 340"
          fill="none"
          stroke={activeStep >= 4 ? 'url(#guttaPercha)' : activeStep >= 3 ? 'url(#pulpHealthy)' : 'url(#pulpInfected)'}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: activeStep >= 2 ? 1 : 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Right canal */}
        <motion.path
          d="M185 170 L 195 295 C 198 315, 188 325, 182 322"
          fill="none"
          stroke={activeStep >= 4 ? 'url(#guttaPercha)' : activeStep >= 3 ? 'url(#pulpHealthy)' : 'url(#pulpInfected)'}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: activeStep >= 2 ? 1 : 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </g>

      {/* Crown overlay for final step */}
      {activeStep === 4 && (
        <motion.path
          d="M85 115
             C 85 50, 115 15, 150 15
             C 185 15, 215 50, 215 115
             C 215 160, 200 185, 200 185
             L 100 185
             C 100 185, 85 160, 85 115"
          fill="none"
          stroke="url(#crownGradient)"
          strokeWidth="4"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          filter="url(#toothGlow)"
        />
      )}

      {/* Treatment indicator animation */}
      {(activeStep === 2 || activeStep === 3) && (
        <motion.circle
          cx="150"
          cy="130"
          r="45"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2"
          strokeDasharray="6 4"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 0.3 },
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
          }}
        />
      )}

      {/* Labels */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <text x="240" y="100" fill="#64748b" fontSize="10" fontFamily="system-ui">Enamel</text>
        <line x1="210" y1="100" x2="235" y2="100" stroke="#94a3b8" strokeWidth="1" />

        <text x="240" y="140" fill="#64748b" fontSize="10" fontFamily="system-ui">Pulp</text>
        <line x1="180" y1="130" x2="235" y2="140" stroke="#94a3b8" strokeWidth="1" />

        <text x="240" y="280" fill="#64748b" fontSize="10" fontFamily="system-ui">Root Canal</text>
        <line x1="200" y1="280" x2="235" y2="280" stroke="#94a3b8" strokeWidth="1" />
      </motion.g>
    </motion.svg>
  );
}

// ============================================================================
// HERO SECTION - REASSURING DESIGN
// ============================================================================

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F0FDF4] via-white to-[#FDF8F3]">
      <FloatingOrbs />

      <motion.div style={{ y, opacity, scale }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-neutral-500 hover:text-teal-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-neutral-400" aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="text-neutral-500 hover:text-teal-600 transition-colors">
                Services
              </Link>
            </li>
            <li className="text-neutral-400" aria-hidden="true">/</li>
            <li className="text-teal-600 font-medium" aria-current="page">Root Canal Treatment</li>
          </ol>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium border border-teal-100">
                <HeartPulse className="w-4 h-4" aria-hidden="true" />
                Gentle, Pain-Free Treatment
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-7xl font-bold text-[#1e293b] tracking-tight mb-6 leading-[1.1]"
            >
              Save Your
              <span className="relative ml-4">
                <span className="relative z-10 bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                  Smile
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 8 C 50 2, 150 2, 198 8"
                    fill="none"
                    stroke="url(#heroGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              <br />
              <span className="text-4xl lg:text-5xl font-light text-neutral-600">Without the Pain</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-neutral-600 leading-relaxed mb-10 max-w-xl">
              Modern root canal treatment is nothing like its reputation. With advanced anesthesia and gentle techniques, you&apos;ll experience relief—not pain. Let us help you keep your natural tooth.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/contact#book"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-2xl shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Book Consultation
                <motion.span className="inline-block" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </motion.span>
              </Link>
              <a
                href="tel:+16137336446"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-700 font-semibold rounded-2xl border-2 border-teal-100 hover:border-teal-200 hover:bg-teal-50 transition-all duration-300"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                (613) 733-6446
              </a>
            </motion.div>

            {/* Reassurance Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6">
              {[
                { value: '95%', label: 'Success Rate', icon: Shield },
                { value: '0', label: 'Pain Level', icon: Heart },
                { value: '1-2', label: 'Visits Only', icon: Clock },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-teal-100/50"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: 'spring' }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-teal-600" aria-hidden="true" />
                    </div>
                    <div className="text-2xl font-bold text-teal-600">{stat.value}</div>
                    <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Hero Image with Floating Cards */}
          <motion.div variants={slideInRight} initial="hidden" animate="visible" className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-neutral-200/50">
              <Image
                src="/images/services/root-canal/hero-patient-smile.jpg"
                alt="Smiling patient in dental chair feeling relaxed during root canal consultation"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Calming gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* Floating Success Card */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-8 top-1/4 bg-white rounded-2xl p-5 shadow-xl shadow-neutral-200/50 border border-teal-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                  <ThumbsUp className="w-7 h-7 text-teal-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-[#1e293b] text-lg">Pain-Free</p>
                  <p className="text-sm text-neutral-500">Modern anesthesia</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Trust Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -right-8 bottom-1/4 bg-gradient-to-br from-teal-600 to-teal-500 rounded-2xl p-5 shadow-xl shadow-teal-600/30 text-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Award className="w-7 h-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-lg">Lifetime Results</p>
                  <p className="text-sm text-white/80">Save your natural tooth</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-teal-600/30 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-3 rounded-full bg-teal-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// WHAT IS ROOT CANAL - EDUCATIONAL SECTION WITH ILLUSTRATION
// ============================================================================

function WhatIsRootCanal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-white">
      <GridPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Illustration */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative order-2 lg:order-1"
          >
            <div className="relative bg-gradient-to-br from-teal-50/50 to-white rounded-3xl p-8 border border-teal-100">
              <ToothAnatomyIllustration activeStep={0} />

              {/* Info badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3 shadow-lg border border-teal-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" />
                  <span className="text-sm text-neutral-600">Infected pulp (red)</span>
                  <div className="w-px h-4 bg-neutral-200" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-teal-500" aria-hidden="true" />
                  <span className="text-sm text-neutral-600">Treated (teal)</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="order-1 lg:order-2"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6 border border-teal-100"
            >
              <Microscope className="w-4 h-4" aria-hidden="true" />
              Understanding the Procedure
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6"
            >
              What is a
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent ml-3">Root Canal?</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-lg text-neutral-600 mb-6 leading-relaxed">
              A root canal is a treatment used to repair and save a tooth that is badly decayed or infected. The procedure involves removing the damaged area of the tooth (the pulp), cleaning and disinfecting it, then filling and sealing it.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-4 mb-8">
              {[
                { icon: Heart, text: 'Saves your natural tooth from extraction' },
                { icon: Shield, text: 'Eliminates infection and prevents spread' },
                { icon: Zap, text: 'Relieves pain caused by pulp inflammation' },
                { icon: Clock, text: 'Restores normal biting and chewing function' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-teal-50/50 to-transparent border border-teal-100/50"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-teal-600" aria-hidden="true" />
                  </div>
                  <span className="text-neutral-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link
                href="#procedure"
                className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all"
              >
                See the procedure steps
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MYTH VS REALITY SECTION
// ============================================================================

function MythVsRealitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-[#F0FDF4]">
      <GridPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6 border border-teal-100"
          >
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            Let&apos;s Set the Record Straight
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Myths vs
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent ml-3">Reality</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Root canals have an unfair reputation. Here&apos;s what modern endodontic treatment is really like.
          </motion.p>
        </motion.div>

        {/* Myth vs Reality illustration */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 flex justify-center"
        >
          <div className="relative">
            <Image
              src="/images/services/root-canal/happy-dental-checkup.jpg"
              alt="Happy patient receiving comfortable dental treatment"
              width={600}
              height={400}
              className="rounded-3xl shadow-xl object-cover"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-lg border border-teal-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Smile className="w-6 h-6 text-teal-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-[#1e293b]">Actually Comfortable</p>
                  <p className="text-sm text-neutral-500">Modern techniques work</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {mythsVsReality.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <motion.div
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'border-teal-300 bg-gradient-to-br from-teal-50 to-white shadow-xl'
                      : 'border-neutral-200 bg-white hover:border-teal-200'
                  }`}
                  whileHover={{ y: -4 }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-teal-600 to-teal-500 shadow-lg shadow-teal-600/30'
                          : 'bg-teal-50'
                      }`}
                      animate={{ rotate: isActive ? [0, -5, 5, 0] : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-teal-600'}`} aria-hidden="true" />
                    </motion.div>

                    {/* Myth */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
                        <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">Myth</span>
                      </div>
                      <p className="text-lg text-neutral-500 line-through decoration-red-300/50">{item.myth}</p>
                    </div>

                    {/* Reality */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-500" aria-hidden="true" />
                        <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Reality</span>
                      </div>
                      <motion.p
                        className="text-lg text-[#1e293b] font-medium"
                        animate={{ scale: isActive ? 1.02 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.reality}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// PROCEDURE VISUALIZATION
// ============================================================================

function ProcedureVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = procedureSteps[activeStep]!;

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % procedureSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="procedure" ref={ref} className="relative py-32 overflow-hidden bg-[#1e293b]">
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
          >
            <Activity className="w-4 h-4" aria-hidden="true" />
            Step-by-Step Process
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Simple, Gentle
            <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent ml-3">Procedure</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-white/70 max-w-3xl mx-auto">
            Understanding each step can help ease anxiety. Here&apos;s exactly what to expect during your treatment.
          </motion.p>
        </motion.div>

        {/* Animated Procedure Steps */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps List */}
          <motion.div variants={slideInLeft} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-4">
            {procedureSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-500 ${
                    isActive
                      ? 'border-teal-400/50 bg-gradient-to-br from-teal-500/20 to-transparent'
                      : 'border-white/10 bg-white/5 hover:border-teal-400/30'
                  }`}
                  whileHover={{ x: 4 }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-5">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-gradient-to-br ${
                        isActive ? step.color + ' shadow-lg' : 'from-white/10 to-white/5'
                      }`}
                      animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-white/60'}`} aria-hidden="true" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
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
                            className="text-white/60 text-sm"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${
                        isActive ? 'text-teal-400 translate-x-1' : 'text-white/30'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Visual Representation - Improved Tooth Illustration */}
          <motion.div variants={slideInRight} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative">
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-teal-500/20 to-white/5 p-8 border border-teal-400/20">
              <ToothAnatomyIllustration activeStep={activeStep} />

              {/* Step Label */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentStep.color} text-white text-sm font-semibold`}>
                  <currentStep.icon className="w-4 h-4" aria-hidden="true" />
                  {currentStep.title}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// BENEFITS SECTION
// ============================================================================

function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-[#F0FDF4] to-white">
      <FloatingOrbs />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6 border border-teal-100"
          >
            <Star className="w-4 h-4" aria-hidden="true" />
            Why Choose Root Canal
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Benefits of
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent ml-3">Treatment</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Root canal therapy is a proven solution to save infected teeth and eliminate pain while preserving your natural smile.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 rounded-3xl bg-white border-2 border-teal-100 hover:border-teal-200 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Stat */}
                  <div className="mb-6">
                    <motion.div
                      className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    >
                      {benefit.stat}
                    </motion.div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">{benefit.statLabel}</div>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3">{benefit.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TECHNOLOGY SHOWCASE
// ============================================================================

function TechnologyShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-white">
      <GridPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6 border border-teal-100"
            >
              <Zap className="w-4 h-4" aria-hidden="true" />
              Modern Technology
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              Advanced Care for
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent ml-3">Your Comfort</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-neutral-600 mb-10">
              Our clinic uses the latest dental technology to ensure precise diagnosis, comfortable treatment, and optimal outcomes.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-4">
              {technologyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-teal-50/50 to-transparent border border-teal-100 hover:border-teal-200 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-500/20">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1e293b] mb-1">{feature.title}</h3>
                      <p className="text-neutral-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div variants={slideInRight} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-200/50">
              <Image
                src="/images/services/root-canal/modern-dental-equipment.jpg"
                alt="Modern dental equipment used for precise root canal treatment"
                width={600}
                height={600}
                className="object-cover w-full aspect-square"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-teal-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center">
                  <Microscope className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-[#1e293b]">90% Less</p>
                  <p className="text-sm text-neutral-500">Radiation exposure</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// WARNING SYMPTOMS SECTION
// ============================================================================

function WarningSymptomsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-[#FDF8F3]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div variants={slideInLeft} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/services/root-canal/dental-xray-consultation.jpg"
                alt="Dentist showing X-ray to patient during root canal consultation"
                width={600}
                height={500}
                className="object-cover w-full aspect-[4/3]"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-neutral-700">
                    <strong>Early detection</strong> prevents complications
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="order-1 lg:order-2"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-6 border border-amber-200"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              Warning Signs
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              When Is Root Canal
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent ml-3">Needed?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-neutral-600 mb-8">
              If you&apos;re experiencing any of these symptoms, it may be time to schedule a consultation:
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-4 mb-8">
              {warningSymptoms.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                      item.severity === 'high'
                        ? 'bg-red-50/50 border-red-200 hover:border-red-300'
                        : 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${item.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`} aria-hidden="true" />
                    </div>
                    <span className="text-[#1e293b] font-medium">{item.symptom}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-200"
            >
              <div className="flex items-start gap-4">
                <Phone className="w-8 h-8 text-teal-600 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-bold text-[#1e293b] mb-1">Experiencing tooth pain?</p>
                  <p className="text-neutral-600 text-sm mb-3">
                    Don&apos;t wait—early treatment can save your tooth and prevent complications.
                  </p>
                  <a
                    href="tel:+16137336446"
                    className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    Call (613) 733-6446 now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS CAROUSEL
// ============================================================================

function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTestimonial = testimonials[activeIndex]!;

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-teal-600">
      {/* Decorative Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
          >
            <Quote className="w-4 h-4" aria-hidden="true" />
            Patient Stories
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-16">
            Real Experiences, Real
            <span className="text-white/90 ml-3">Relief</span>
          </motion.h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div variants={scaleIn} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20"
            >
              <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Image */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={currentTestimonial.image}
                    alt={`${currentTestimonial.author} - root canal patient testimonial`}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Stars */}
                  <div className="flex items-center justify-center lg:justify-start gap-1 mb-4" aria-label={`${currentTestimonial.rating} out of 5 stars`}>
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                      </motion.div>
                    ))}
                  </div>

                  <Quote className="w-10 h-10 text-white/20 mb-4 mx-auto lg:mx-0" aria-hidden="true" />
                  <p className="text-xl text-white/90 leading-relaxed mb-6">{currentTestimonial.quote}</p>
                  <p className="font-semibold text-white">{currentTestimonial.author}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </motion.button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'
                  }`}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RECOVERY TIMELINE
// ============================================================================

function RecoveryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progressWidth = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-[#F0FDF4]">
      <FloatingOrbs />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6 border border-teal-100"
          >
            <Clock className="w-4 h-4" aria-hidden="true" />
            Recovery Guide
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            What to Expect
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent ml-3">After Treatment</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Recovery is quicker than you might think. Here&apos;s your timeline back to normal.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full hidden md:block" aria-hidden="true">
            <motion.div className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full" style={{ width: progressWidth }} />
          </div>

          {/* Timeline Items */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {recoveryTimeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={fadeInUp} className="relative text-center">
                  {/* Dot */}
                  <motion.div
                    className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/30"
                    whileHover={{ scale: 1.1 }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  >
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </motion.div>

                  {/* Content */}
                  <motion.div whileHover={{ y: -4 }}>
                    <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-semibold mb-3 border border-teal-100">
                      {item.day}
                    </span>
                    <h3 className="font-bold text-[#1e293b] mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-500">{item.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-white">
      <GridPattern />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6 border border-teal-100"
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            Common Questions
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent ml-3">Questions</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? 'border-teal-200 bg-gradient-to-br from-white to-teal-50/50 shadow-xl'
                  : 'border-neutral-200 bg-white hover:border-teal-200'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-teal-700' : 'text-[#1e293b]'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-4 ${
                    openIndex === index ? 'bg-teal-600 text-white' : 'bg-neutral-100 text-neutral-400'
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-neutral-600 leading-relaxed border-t border-teal-100 pt-4">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">Still have questions? We&apos;re happy to help.</p>
          <a href="tel:+16137336446" className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:underline">
            <Phone className="w-5 h-5" aria-hidden="true" />
            Call us at (613) 733-6446
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

function RelatedServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-[#F0FDF4] to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold text-[#1e293b] tracking-tight mb-4">
            Related Services
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore other services that complement your dental care needs.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {relatedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Link
                  href={service.href}
                  className="group block p-8 rounded-3xl bg-white border-2 border-neutral-200 hover:border-teal-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-teal-100">
                    <Icon className="w-7 h-7 text-teal-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-2 group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-teal-600 font-semibold group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all">
            View All Services <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const magnetic = useMagnetic(0.2);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b]">
      {/* Decorative Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <motion.div variants={scaleIn} className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-teal-500/20 backdrop-blur-sm mb-6">
              <HeartPulse className="w-10 h-10 text-teal-400" aria-hidden="true" />
            </div>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Don&apos;t Let Tooth Pain
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">Hold You Back</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Schedule your consultation today and take the first step toward relief. Our gentle approach makes root canal treatment
            comfortable and stress-free.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
            <motion.div
              style={{ x: magnetic.x, y: magnetic.y }}
              onMouseMove={magnetic.handleMouseMove}
              onMouseLeave={magnetic.handleMouseLeave}
            >
              <Link
                href="/contact#book"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/40 transition-all duration-300"
              >
                <Calendar className="w-6 h-6" aria-hidden="true" />
                Book Appointment
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </motion.div>

            <a
              href="tel:+16137336446"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 text-white font-semibold text-lg rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <Phone className="w-6 h-6" aria-hidden="true" />
              (613) 733-6446
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function RootCanalContent() {
  return (
    <main id="main-content" className="min-h-screen">
      <HeroSection />
      <WhatIsRootCanal />
      <MythVsRealitySection />
      <ProcedureVisualization />
      <BenefitsSection />
      <TechnologyShowcase />
      <WarningSymptomsSection />
      <TestimonialsSection />
      <RecoveryTimeline />
      <FAQSection />
      <RelatedServicesSection />
      <FinalCTA />
    </main>
  );
}
