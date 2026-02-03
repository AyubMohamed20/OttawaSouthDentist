'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  Sun,
  Zap,
  Heart,
  Star,
  Coffee,
  Cigarette,
  Home,
  Building2,
  Timer,
  Eye,
  Award,
  TrendingUp,
  Droplets,
  Play,
  Pause,
  Lightbulb,
  ShieldCheck,
  Gem,
  Brush,
  CircleDot,
  Smile,
  BadgeCheck,
  Waves,
  ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// ============================================================================
// DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How long does teeth whitening last?',
    answer:
      'Results typically last 1-3 years depending on your diet and lifestyle habits. Consuming staining substances like coffee, tea, red wine, and tobacco can shorten longevity.',
  },
  {
    question: 'Will whitening damage my teeth?',
    answer:
      'Professional teeth whitening performed by a dentist is safe and does not damage tooth enamel. Our Spa-Dent system minimizes sensitivity while delivering effective results.',
  },
  {
    question: 'Can everyone whiten their teeth?',
    answer:
      'Most people are excellent candidates. However, it may not be suitable for those with severe sensitivity, gum disease, or front tooth restorations. A consultation will determine if whitening is right for you.',
  },
  {
    question: 'Professional vs store-bought whitening?',
    answer:
      'Professional whitening uses higher-concentration formulas for faster, more dramatic results. Our Spa-Dent system provides customized treatment tailored to your needs.',
  },
  {
    question: 'How to maintain whitening results?',
    answer:
      'Limit staining beverages, avoid tobacco, maintain excellent oral hygiene, and consider periodic touch-up treatments as needed.',
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Walk out with a dramatically brighter smile in just one visit.',
    stat: '60',
    statLabel: 'Minutes',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Gentle',
    description: 'Dentist-supervised treatment with professional-grade products.',
    stat: '100%',
    statLabel: 'Safe',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Heart,
    title: 'Zero Sensitivity',
    description: 'Our Spa-Dent system is designed for maximum comfort.',
    stat: '95%',
    statLabel: 'Comfort',
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    icon: Sun,
    title: 'Long-Lasting',
    description: 'Enjoy your radiant smile for years with proper care.',
    stat: '3+',
    statLabel: 'Years',
    gradient: 'from-violet-400 to-purple-500',
  },
];

const shadeGuide = [
  { shade: 'A1', brightness: 100, label: 'Hollywood White', color: '#FFFFFF', glow: 'rgba(255,255,255,0.8)' },
  { shade: 'A2', brightness: 90, label: 'Bright White', color: '#FAFAF8', glow: 'rgba(250,250,248,0.6)' },
  { shade: 'A3', brightness: 75, label: 'Natural White', color: '#F5F0E8', glow: 'rgba(245,240,232,0.4)' },
  { shade: 'A3.5', brightness: 55, label: 'Light Cream', color: '#EDE5D8', glow: 'rgba(237,229,216,0.3)' },
  { shade: 'A4', brightness: 35, label: 'Before', color: '#DDD4C4', glow: 'rgba(221,212,196,0.2)' },
];

const treatmentOptions = [
  {
    type: 'In-Office',
    icon: Building2,
    duration: '60-90 mins',
    sessions: '1 visit',
    results: 'Immediate',
    shadeImprovement: '6-8 shades',
    description: 'Premium Spa-Dent LED treatment with instant, dramatic results. Walk in with stains, walk out with a Hollywood smile.',
    features: [
      'Professional-strength whitening gel',
      'Advanced LED light activation',
      'Complete gum protection',
      'Instant visible results',
    ],
    recommended: true,
    price: 'Premium',
  },
  {
    type: 'Take-Home',
    icon: Home,
    duration: '30 mins/day',
    sessions: '2-3 weeks',
    results: 'Gradual',
    shadeImprovement: '4-6 shades',
    description: 'Custom-fitted trays with professional gel for convenient whitening on your schedule.',
    features: [
      'Custom-molded comfort trays',
      'Professional whitening gel',
      'Flexible daily schedule',
      'Lower sensitivity formula',
    ],
    recommended: false,
    price: 'Value',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Smile Analysis',
    description: 'We examine your teeth, discuss your goals, and create a personalized whitening plan.',
    duration: '15 min',
    icon: Eye,
  },
  {
    step: 2,
    title: 'Protection',
    description: 'Gums and soft tissues are carefully protected before applying the whitening gel.',
    duration: '10 min',
    icon: Shield,
  },
  {
    step: 3,
    title: 'LED Activation',
    description: 'Our Spa-Dent LED light accelerates the whitening gel for maximum effectiveness.',
    duration: '30 min',
    icon: Lightbulb,
  },
  {
    step: 4,
    title: 'Reveal',
    description: 'Marvel at your transformation — up to 8 shades brighter in a single visit!',
    duration: '5 min',
    icon: Sparkles,
  },
];

const maintenanceTips = [
  {
    icon: Coffee,
    title: 'Limit Staining Drinks',
    description: 'Use a straw for coffee and tea to minimize contact.',
    impact: 'High',
    color: 'amber',
  },
  {
    icon: Cigarette,
    title: 'Avoid Tobacco',
    description: 'Smoking quickly reverses whitening results.',
    impact: 'Critical',
    color: 'red',
  },
  {
    icon: Droplets,
    title: 'Rinse After Meals',
    description: 'Swish water to wash away staining agents.',
    impact: 'Medium',
    color: 'blue',
  },
  {
    icon: Brush,
    title: 'Whitening Toothpaste',
    description: 'Maintain your brightness with daily care.',
    impact: 'Medium',
    color: 'teal',
  },
];

const relatedServices = [
  {
    title: 'Cosmetic Dentistry',
    description: 'Complete smile makeover solutions',
    href: '/services/cosmetic-dentistry',
    icon: Gem,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Routine Checkups',
    description: 'Keep your smile healthy & bright',
    href: '/services/routine-checkups',
    icon: ShieldCheck,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Dental Hygiene',
    description: 'Professional cleaning services',
    href: '/services/dental-hygiene',
    icon: Sparkles,
    gradient: 'from-amber-500 to-orange-500',
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
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
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ============================================================================
// SVG BACKGROUNDS & ILLUSTRATIONS
// ============================================================================

function SparkleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="w-3 h-3 text-amber-300/40" />
        </motion.div>
      ))}
    </div>
  );
}

function GlowOrb({ className = '', color = 'amber' }: { className?: string; color?: string }) {
  const colors = {
    amber: 'from-amber-400/30 to-orange-400/10',
    rose: 'from-rose-400/20 to-pink-400/5',
    violet: 'from-violet-400/20 to-purple-400/5',
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-radial ${colors[color as keyof typeof colors]} blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function ToothIllustration({ className = '', shade = '#FFFFFF', glow = 'rgba(255,255,255,0.5)' }: { className?: string; shade?: string; glow?: string }) {
  return (
    <div className="relative">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: glow }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <svg viewBox="0 0 100 140" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="toothGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={shade} />
            <stop offset="50%" stopColor={shade} />
            <stop offset="100%" stopColor={`${shade}E0`} />
          </linearGradient>
          <filter id="toothGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M50 8 C25 8, 18 35, 20 55 C22 70, 28 82, 32 95 C35 105, 40 115, 43 125 C45 130, 48 132, 50 132 C52 132, 55 130, 57 125 C60 115, 65 105, 68 95 C72 82, 78 70, 80 55 C82 35, 75 8, 50 8"
          fill="url(#toothGradientMobile)"
          filter="url(#toothGlow)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
        />
        {/* Highlight */}
        <ellipse cx="38" cy="40" rx="12" ry="20" fill="rgba(255,255,255,0.6)" />
        {/* Sparkle */}
        <circle cx="35" cy="30" r="3" fill="rgba(255,255,255,0.9)" />
      </svg>
    </div>
  );
}

function WavesDivider({ flip = false, color = 'white' }: { flip?: boolean; color?: string }) {
  return (
    <svg
      viewBox="0 0 1440 100"
      className={`w-full h-12 ${flip ? 'rotate-180' : ''}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,75 1440,50 L1440,100 L0,100 Z"
        fill={color === 'white' ? '#FFFFFF' : color}
      />
    </svg>
  );
}

// ============================================================================
// HERO SECTION - Immersive Full-Screen Experience
// ============================================================================

function MobileHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, opacity: imageOpacity }}
      >
        <Image
          src="/images/services/teeth-whitening/hero-smile.jpg"
          alt="Beautiful bright smile after professional teeth whitening"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </motion.div>

      {/* Animated Sparkles */}
      <SparkleBackground />

      {/* Floating Glow Orbs */}
      <GlowOrb className="w-64 h-64 -top-20 -right-20" color="amber" />
      <GlowOrb className="w-48 h-48 bottom-40 -left-20" color="rose" />

      {/* Breadcrumb */}
      <nav className="relative z-10 px-5 pt-4 pb-2" aria-label="Breadcrumb">
        <motion.ol
          className="flex items-center gap-1.5 text-xs"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <li>
            <Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
          </li>
          <li className="text-white/40">/</li>
          <li>
            <Link href="/services" className="text-white/60 hover:text-white transition-colors">Services</Link>
          </li>
          <li className="text-white/40">/</li>
          <li className="text-amber-400 font-medium">Whitening</li>
        </motion.ol>
      </nav>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-end px-5 pb-8"
        style={{ y: contentY }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Premium Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>
            <span className="text-white/90 text-sm font-medium">Spa-Dent LED Technology</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-[2.75rem] leading-[1.05] font-bold text-white mb-4 tracking-tight"
          >
            Unlock Your
            <span className="block">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                  Brightest
                </span>
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-lg -z-10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </span>
            <span className="block">Smile</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg leading-relaxed mb-6 max-w-[90%]"
          >
            Transform your smile in just 60 minutes with our advanced LED whitening — up to 8 shades brighter, zero sensitivity.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-4 mb-8"
          >
            {[
              { value: '60', suffix: 'min', label: 'Treatment' },
              { value: '8', suffix: '+', label: 'Shades' },
              { value: '1', suffix: '', label: 'Visit' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex-1 text-center py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                  <span className="text-amber-400 text-lg">{stat.suffix}</span>
                </div>
                <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <Link href="/contact#book">
              <motion.div
                className="relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-lg overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                <span className="relative z-10 text-black flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Whitening
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.div>
            </Link>

            <a href="tel:+16137336446">
              <motion.div
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20"
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                (613) 733-6446
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// BENEFITS SECTION - Glassmorphic Cards
// ============================================================================

function MobileBenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-16 px-5 bg-gradient-to-b from-[#0a0a0a] via-neutral-950 to-neutral-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4"
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Why Choose Professional</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white">
            The Spa-Dent{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Advantage
            </span>
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                <motion.div
                  className="relative flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${benefit.gradient}`} />

                  {/* Icon */}
                  <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                    {/* Icon glow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} blur-xl opacity-50`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-lg mb-0.5">{benefit.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-2">{benefit.description}</p>
                  </div>

                  {/* Stat */}
                  <div className="text-right flex-shrink-0">
                    <div className={`text-2xl font-bold bg-gradient-to-br ${benefit.gradient} bg-clip-text text-transparent`}>
                      {benefit.stat}
                    </div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">{benefit.statLabel}</div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// SHADE VISUALIZER - Interactive Before/After
// ============================================================================

function MobileShadeVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [currentShade, setCurrentShade] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (isInView && !hasPlayed) {
      setIsPlaying(true);
      setHasPlayed(true);
    }
  }, [isInView, hasPlayed]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentShade((prev) => {
        if (prev <= 0) {
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const resetAnimation = useCallback(() => {
    setCurrentShade(4);
    setIsPlaying(true);
  }, []);

  return (
    <section ref={ref} className="relative py-16 px-5 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 text-sm font-medium">Interactive Preview</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white">
            Watch Your{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
        </motion.div>

        {/* Visualizer Card */}
        <motion.div
          variants={fadeInScale}
          className="relative rounded-[2rem] overflow-hidden"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-400/30 via-transparent to-orange-400/30 p-[1px]">
            <div className="w-full h-full rounded-[2rem] bg-neutral-900" />
          </div>

          <div className="relative p-6">
            {/* Tooth visualization */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="relative"
                animate={{
                  scale: isPlaying ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <ToothIllustration
                  className="w-36 h-48 drop-shadow-2xl"
                  shade={shadeGuide[currentShade]?.color || '#FFFFFF'}
                  glow={shadeGuide[currentShade]?.glow || 'rgba(255,255,255,0.5)'}
                />

                {/* Brightness indicator */}
                <motion.div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500/20 to-amber-500/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-amber-500/30"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-amber-400 text-sm font-bold">
                    {shadeGuide[currentShade]?.brightness || 0}%
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Current shade info */}
            <div className="text-center mb-6">
              <motion.p
                className="text-amber-400/80 text-xs font-medium uppercase tracking-widest mb-1"
                key={currentShade}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Current Shade
              </motion.p>
              <motion.p
                className="text-white text-4xl font-bold"
                key={`shade-${currentShade}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {shadeGuide[currentShade]?.shade || 'A1'}
              </motion.p>
              <motion.p
                className="text-white/60 text-sm mt-1"
                key={`label-${currentShade}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {shadeGuide[currentShade]?.label || 'Hollywood White'}
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 rounded-full bg-white/10 mb-6 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                animate={{ width: `${shadeGuide[currentShade]?.brightness || 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Shade selector */}
            <div className="flex justify-center gap-3 mb-6">
              {shadeGuide.map((shade, index) => (
                <motion.button
                  key={shade.shade}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentShade(index);
                  }}
                  className={`relative w-11 h-11 rounded-xl transition-all duration-300 ${
                    currentShade === index
                      ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-neutral-900 scale-110'
                      : 'opacity-70'
                  }`}
                  style={{ backgroundColor: shade.color }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Select shade ${shade.shade}`}
                >
                  {currentShade === index && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ boxShadow: `0 0 20px ${shade.glow}` }}
                      layoutId="shadeIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Play/Reset button */}
            <motion.button
              onClick={resetAnimation}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 font-medium"
              whileTap={{ scale: 0.98 }}
            >
              {isPlaying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Whitening in Progress...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Watch Transformation Again
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// TREATMENT OPTIONS - Premium Cards
// ============================================================================

function MobileTreatmentOptions() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref} className="relative py-16 px-5 bg-gradient-to-b from-neutral-950 to-[#0a0a0a] overflow-hidden">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 text-sm font-medium">Treatment Options</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Path to Brilliance
            </span>
          </h2>
        </motion.div>

        {/* Tab Selector */}
        <motion.div variants={fadeInUp} className="relative flex gap-2 p-1.5 mb-6 bg-white/5 rounded-2xl">
          {treatmentOptions.map((option, index) => {
            const Icon = option.icon;
            const isActive = activeTab === index;
            return (
              <motion.button
                key={option.type}
                onClick={() => setActiveTab(index)}
                className={`relative flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-colors ${
                  isActive ? 'text-black' : 'text-white/60'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {option.type}
                  {option.recommended && (
                    <Star className="w-3.5 h-3.5 fill-current" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Option Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Card with gradient border */}
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-transparent to-orange-400/20 p-[1px] rounded-3xl">
                <div className="w-full h-full rounded-3xl bg-neutral-900" />
              </div>

              <div className="relative p-6">
                {treatmentOptions[activeTab]?.recommended && (
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-black text-xs font-bold"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      RECOMMENDED
                    </motion.div>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: 'Duration', value: treatmentOptions[activeTab]?.duration, icon: Clock },
                    { label: 'Sessions', value: treatmentOptions[activeTab]?.sessions, icon: Calendar },
                    { label: 'Results', value: treatmentOptions[activeTab]?.results, icon: Zap },
                    { label: 'Improvement', value: treatmentOptions[activeTab]?.shadeImprovement, icon: TrendingUp },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <stat.icon className="w-5 h-5 text-amber-400 mb-2" />
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{stat.label}</p>
                      <p className="text-sm font-bold text-white">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {treatmentOptions[activeTab]?.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {treatmentOptions[activeTab]?.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Link href="/contact#book">
                  <motion.div
                    className="relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400" />
                    <span className="relative z-10 text-black flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Book {treatmentOptions[activeTab]?.type} Treatment
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// ============================================================================
// PROCEDURE STEPS - Timeline Design
// ============================================================================

function MobileProcedureSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative py-16 px-5 bg-gradient-to-b from-[#0a0a0a] to-neutral-950 overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] bg-gradient-to-r from-amber-500/5 to-transparent blur-3xl" />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 text-sm font-medium">Your Journey</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white">
            What to{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Expect
            </span>
          </h2>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {procedureSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isLast = index === procedureSteps.length - 1;

            return (
              <motion.div
                key={index}
                variants={slideInLeft}
                className="relative flex gap-5 pb-8"
              >
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-3.5rem)]">
                    <motion.div
                      className="w-full h-full bg-gradient-to-b from-amber-400 to-amber-400/20"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                      style={{ transformOrigin: 'top' }}
                    />
                  </div>
                )}

                {/* Step icon */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.2, type: 'spring', bounce: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <StepIcon className="w-6 h-6 text-black" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-amber-400">{step.step}</span>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-lg">{step.title}</h3>
                    <span className="text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total Time Card */}
        <motion.div
          variants={fadeInUp}
          className="mt-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Timer className="w-8 h-8 text-amber-400" />
            </motion.div>
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider">Total Treatment Time</p>
              <p className="text-2xl font-bold text-white">60-90 minutes</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MAINTENANCE TIPS - Card Grid
// ============================================================================

function MobileMaintenanceTips() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const impactStyles = {
    Critical: { bg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30', text: 'text-red-400' },
    High: { bg: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/30', text: 'text-amber-400' },
    Medium: { bg: 'from-teal-500/20 to-teal-500/5', border: 'border-teal-500/30', text: 'text-teal-400' },
  };

  return (
    <section ref={ref} className="relative py-16 px-5 bg-gradient-to-b from-neutral-950 to-neutral-900 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 text-sm font-medium">Aftercare Guide</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white">
            Keep Your Smile{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Radiant
            </span>
          </h2>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-2 gap-3">
          {maintenanceTips.map((tip, index) => {
            const Icon = tip.icon;
            const style = impactStyles[tip.impact as keyof typeof impactStyles];

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative p-4 rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} overflow-hidden`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Impact badge */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${style.text}`}>
                    {tip.impact}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                  <Icon className={`w-5 h-5 ${style.text}`} />
                </div>

                <h3 className="font-semibold text-white text-sm mb-1">{tip.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{tip.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION - Accordion
// ============================================================================

function MobileFAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-16 px-5 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <motion.button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                  whileTap={{ scale: 0.99 }}
                >
                  <span className={`font-semibold text-sm pr-4 ${isOpen ? 'text-white' : 'text-white/80'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-amber-400' : 'text-white/40'}`} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-4">
                        <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div variants={fadeInUp} className="mt-8 text-center">
          <p className="text-white/50 text-sm mb-3">Still have questions?</p>
          <a
            href="tel:+16137336446"
            className="inline-flex items-center gap-2 text-amber-400 font-semibold"
          >
            <Phone className="w-4 h-4" />
            Call (613) 733-6446
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

function MobileRelatedServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative py-16 px-5 bg-gradient-to-b from-neutral-950 to-[#0a0a0a] overflow-hidden">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Related{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
        </motion.div>

        {/* Services */}
        <div className="space-y-3">
          {relatedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={service.href}>
                  <motion.div
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white">{service.title}</h3>
                      <p className="text-sm text-white/50">{service.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/30 flex-shrink-0" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div variants={fadeInUp} className="mt-6 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-amber-400 font-semibold"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// CTA SECTION - Final Conversion
// ============================================================================

function MobileCTASection() {
  return (
    <section className="relative py-20 px-5 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600" />

      {/* Animated pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '32px 32px'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-4"
        >
          Ready for Your
          <span className="block text-4xl mt-1">Brightest Smile?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/90 text-lg mb-8 max-w-sm mx-auto"
        >
          Schedule your whitening consultation today and discover the confidence of a radiant smile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <Link href="/contact#book">
            <motion.div
              className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white font-semibold rounded-2xl shadow-xl"
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>

          <a href="tel:+16137336446">
            <motion.div
              className="flex items-center justify-center gap-2 w-full py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl border-2 border-white/30"
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              (613) 733-6446
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA
// ============================================================================

function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
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
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Gradient blur background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/80 backdrop-blur-xl" />

          <div className="relative px-4 py-4 pb-safe">
            <div className="flex gap-3">
              <motion.a
                href="tel:+16137336446"
                className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm text-white rounded-2xl border border-white/20"
                whileTap={{ scale: 0.95 }}
                aria-label="Call us"
              >
                <Phone className="w-6 h-6" />
              </motion.a>

              <Link href="/contact#book" className="flex-1">
                <motion.div
                  className="relative flex items-center justify-center gap-2 h-14 rounded-2xl font-semibold text-black overflow-hidden"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Book Whitening
                  </span>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export function TeethWhiteningContentMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0a] pb-28">
      <MobileHeroSection />
      <MobileBenefitsSection />
      <MobileShadeVisualizer />
      <MobileTreatmentOptions />
      <MobileProcedureSteps />
      <MobileMaintenanceTips />
      <MobileFAQSection />
      <MobileRelatedServices />
      <MobileCTASection />
      <StickyBottomCTA />
    </main>
  );
}
