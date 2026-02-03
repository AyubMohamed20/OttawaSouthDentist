'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Clock,
  CheckCircle2,
  Phone,
  Calendar,
  ArrowRight,
  Stethoscope,
  Droplets,
  TrendingUp,
  Zap,
  Target,
  Waves,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  HeartPulse,
  Smile,
  Star,
  BadgeCheck,
  Flame,
  X,
  Play,
  Award,
  Users,
  Timer,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { Button } from '@/components/ui/button';
import { contactInfo } from '@/data/site-config';

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

// =============================================================================
// DATA
// =============================================================================

const faqs = [
  {
    question: 'Why is professional cleaning important?',
    answer:
      'Even with excellent home care, plaque builds up in hard-to-reach areas. Over time, this hardens into tartar which only professional instruments can remove. Regular cleanings prevent gum disease and cavities.',
  },
  {
    question: 'Regular vs deep cleaning?',
    answer:
      'Regular cleaning removes buildup above the gum line. Deep cleaning (scaling and root planing) treats buildup below the gum line for patients with gum disease signs.',
  },
  {
    question: 'How often should I get cleaned?',
    answer:
      'Most patients need cleanings every 6 months. If you have gum disease or risk factors, every 3-4 months may be recommended.',
  },
  {
    question: 'Does it hurt?',
    answer:
      'Generally comfortable for most patients. You may feel some pressure or sensitivity, especially with significant buildup. We offer gentle techniques for anxious patients.',
  },
  {
    question: 'What happens during the appointment?',
    answer:
      'Examination, plaque/tartar removal, polishing, flossing, and personalized hygiene instructions. Optional fluoride treatment. Takes 45-60 minutes.',
  },
];

const relatedServices = [
  {
    title: 'Routine Checkups',
    description: 'Comprehensive exams to detect problems early',
    href: '/services/routine-checkups',
    icon: Stethoscope,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Preventive Dentistry',
    description: 'Fluoride treatments, sealants, and mouthguards',
    href: '/services/preventive-dentistry',
    icon: ShieldCheck,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Gum Therapy',
    description: 'Treatment for gum disease and periodontal health',
    href: '/services/gum-therapy',
    icon: Heart,
    gradient: 'from-rose-500 to-pink-500',
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: 'Brighter Smile',
    description: 'Remove stubborn stains that brushing cannot eliminate',
    stat: '98%',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: ShieldCheck,
    title: 'Prevent Gum Disease',
    description: 'Reduce risk of gingivitis and periodontitis',
    stat: '60%',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: HeartPulse,
    title: 'Better Health',
    description: 'Lower risk of heart disease and diabetes complications',
    stat: '3x',
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    icon: Clock,
    title: 'Early Detection',
    description: 'Catch cavities and oral cancer early',
    stat: '45min',
    gradient: 'from-violet-400 to-purple-500',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Assessment',
    description: 'We examine your teeth and gums for signs of decay, gum disease, and other concerns.',
    icon: Target,
    duration: '5-10 min',
    gradient: 'from-cyan-400 to-teal-500',
  },
  {
    step: 2,
    title: 'Scaling',
    description: 'Using specialized instruments, we remove plaque and tartar from all tooth surfaces.',
    icon: Waves,
    duration: '15-20 min',
    gradient: 'from-teal-400 to-emerald-500',
  },
  {
    step: 3,
    title: 'Polishing',
    description: 'We polish your teeth to remove surface stains and smooth enamel.',
    icon: Sparkles,
    duration: '5-10 min',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    step: 4,
    title: 'Flossing',
    description: 'Thorough flossing removes any remaining debris between teeth.',
    icon: RefreshCw,
    duration: '3-5 min',
    gradient: 'from-green-400 to-lime-500',
  },
  {
    step: 5,
    title: 'Fluoride',
    description: 'Optional protective treatment to strengthen enamel.',
    icon: ShieldCheck,
    duration: '1-2 min',
    gradient: 'from-lime-400 to-yellow-500',
  },
];

const oralHealthStats = [
  { value: 47, suffix: '%', label: 'Adults with gum disease', icon: TrendingUp, color: 'from-rose-500 to-pink-600' },
  { value: 6, suffix: 'mo', label: 'Between cleanings', icon: Calendar, color: 'from-cyan-500 to-teal-600' },
  { value: 700, suffix: '+', label: 'Bacteria species in mouth', icon: Zap, color: 'from-amber-500 to-orange-600' },
  { value: 3, suffix: 'x', label: 'Tooth loss risk without care', icon: Heart, color: 'from-violet-500 to-purple-600' },
];

const hygieneServices = [
  { text: 'Thorough teeth cleaning', icon: Sparkles },
  { text: 'Plaque & tartar removal', icon: Waves },
  { text: 'Surface stain polishing', icon: Star },
  { text: 'Gum health assessment', icon: HeartPulse },
  { text: 'Oral hygiene coaching', icon: Users },
  { text: 'Deep cleaning available', icon: Target },
  { text: 'Fluoride treatments', icon: ShieldCheck },
];

const dailyRoutine = [
  {
    time: 'Morning',
    icon: Sun,
    gradient: 'from-amber-400 via-orange-400 to-rose-400',
    tips: ['Brush 2 min with fluoride paste', 'Clean tongue gently', 'Wait 30 min after eating'],
  },
  {
    time: 'After Meals',
    icon: Coffee,
    gradient: 'from-rose-400 via-pink-400 to-fuchsia-400',
    tips: ['Rinse with water', 'Sugar-free gum', 'Wait before brushing acidic foods'],
  },
  {
    time: 'Evening',
    icon: Moon,
    gradient: 'from-indigo-400 via-purple-400 to-violet-400',
    tips: ['Floss all teeth', 'Use mouthwash', 'Electric toothbrush recommended'],
  },
];

// =============================================================================
// HOOKS
// =============================================================================

function useAnimatedCounter(target: number, duration: number = 2000, startAnimation: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, startAnimation]);

  return count;
}

// =============================================================================
// SVG COMPONENTS
// =============================================================================

const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <motion.div
      className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-200/40 to-teal-200/40 blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 20, 0],
        y: [0, -20, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/3 -left-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#722F37]/20 to-rose-200/30 blur-3xl"
      animate={{
        scale: [1, 1.15, 1],
        y: [0, 30, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-1/4 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-violet-200/30 to-purple-200/30 blur-3xl"
      animate={{
        scale: [1.1, 1, 1.1],
        x: [0, -15, 0],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const WavePattern = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 1440 100"
    className={`w-full ${className}`}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <motion.path
      d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z"
      fill="currentColor"
      initial={{ d: "M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z" }}
      animate={{
        d: [
          "M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z",
          "M0,60 C200,20 400,80 600,40 C800,0 1000,80 1200,40 C1300,60 1400,40 1440,60 L1440,100 L0,100 Z",
          "M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z",
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

const SparklingToothSVG = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="toothGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F0F0F0" />
      </linearGradient>
      <filter id="toothGlowMobile" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Main tooth shape */}
    <motion.path
      d="M40 8 C55 8 68 18 70 32 C72 46 70 60 68 74 C66 84 62 92 56 96 C52 98 48 94 44 88 C42 92 40 96 36 96 C30 92 26 84 24 74 C22 60 20 46 22 32 C24 18 35 8 40 8Z"
      fill="url(#toothGradientMobile)"
      stroke="#E8E8E8"
      strokeWidth="2"
      filter="url(#toothGlowMobile)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    />
    {/* Crown lines */}
    <path d="M30 24 C35 28 40 30 45 28 C50 26 55 22 58 20" stroke="#D8D8D8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M32 32 C37 35 42 36 47 34 C52 32 56 28 58 26" stroke="#D8D8D8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Sparkles */}
    <motion.g
      animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <path d="M12 16 L14 20 L18 18 L14 16 L12 12 L10 16 L6 18 L10 20 L12 16Z" fill="#FCD34D" />
      <path d="M68 12 L70 16 L74 14 L70 12 L68 8 L66 12 L62 14 L66 16 L68 12Z" fill="#FCD34D" />
      <path d="M72 48 L74 52 L78 50 L74 48 L72 44 L70 48 L66 50 L70 52 L72 48Z" fill="#FCD34D" />
    </motion.g>
  </svg>
);

// =============================================================================
// COMPONENTS
// =============================================================================

// Premium Hero Image with parallax
function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3845759/pexels-photo-3845759.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
          alt="Happy patient with bright smile after dental hygiene treatment"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, 400px"
        />
      </motion.div>

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/20 to-transparent" />

      {/* Floating stats badge */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Droplets className="w-7 h-7 text-white" />
            </motion.div>
            <div className="flex-1">
              <p className="font-bold text-lg text-foreground">20+ Years</p>
              <p className="text-sm text-foreground-secondary">Gentle, Expert Care</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated corner badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        className="absolute top-4 right-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center shadow-xl shadow-[#722F37]/30 backdrop-blur-sm">
          <SparklingToothSVG className="w-12 h-12" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Animated stat card with glassmorphism
function MobileStatCard({ stat, index }: { stat: typeof oralHealthStats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useAnimatedCounter(stat.value, 1500, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative group"
    >
      <motion.div
        className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/50 shadow-lg overflow-hidden"
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-active:opacity-10 transition-opacity duration-300`}
        />

        <div className="relative flex items-center gap-4">
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
            animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <motion.span
              className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {count}{stat.suffix}
            </motion.span>
            <p className="text-xs text-foreground-secondary leading-tight mt-0.5">
              {stat.label}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Premium benefit card with gesture support
function MobileBenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const Icon = benefit.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <motion.div
        className="relative bg-white rounded-2xl border border-[#EDE5DD] overflow-hidden shadow-lg"
        whileTap={{ scale: 0.98 }}
      >
        {/* Gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient}`} />

        <div className="p-5">
          <div className="flex items-start gap-4">
            <motion.div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
              animate={isInView ? { scale: [0.8, 1.1, 1] } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: 'spring' }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">{benefit.title}</h3>
                <motion.span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${benefit.gradient} shadow-sm`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                >
                  {benefit.stat}
                </motion.span>
              </div>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Interactive cleaning demo with enhanced visuals
function MobileCleaningDemo() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  const steps = [
    { label: 'Plaque', icon: Flame, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
    { label: 'Scaling', icon: Waves, color: 'from-teal-400 to-cyan-500', bg: 'bg-teal-50' },
    { label: 'Polishing', icon: Sparkles, color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50' },
    { label: 'Clean!', icon: BadgeCheck, color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-white via-[#FDF8F3] to-white rounded-3xl p-6 border border-[#EDE5DD] shadow-xl overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
            style={{
              left: `${20 + i * 15}%`,
              top: '80%',
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative text-center mb-6">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 text-sm font-medium mb-3"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Play className="w-4 h-4" />
          Interactive Demo
        </motion.div>
        <h3 className="font-display font-semibold text-xl text-foreground">
          The Cleaning Process
        </h3>
      </div>

      {/* Tooth visualization */}
      <div className="relative flex justify-center mb-6">
        <motion.div
          className="relative w-32 h-40"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <SparklingToothSVG className="w-full h-full" />

          {/* Effect overlays */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {step === 0 && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-wrap gap-1.5 justify-center w-20">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-amber-300 shadow-sm"
                      animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
                    />
                  ))}
                </div>
              )}
              {step === 1 && (
                <motion.div
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-16 rounded-full bg-gradient-to-r from-teal-300/50 to-cyan-300/50 blur-sm"
                  animate={{ x: [-15, 15, -15] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {step === 2 && (
                <motion.div
                  className="absolute top-4 left-1/2 -translate-x-1/2"
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-20 h-16 rounded-full bg-gradient-radial from-cyan-300/60 to-transparent blur-sm" />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  className="absolute top-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <Sparkles className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Step indicators */}
      <div className="relative grid grid-cols-4 gap-2">
        {steps.map((s, i) => {
          const StepIcon = s.icon;
          const isActive = i === step;
          return (
            <motion.button
              key={i}
              className={`relative p-3 rounded-xl text-center transition-all duration-300 ${
                isActive ? 'bg-white shadow-lg border border-[#EDE5DD]' : s.bg
              }`}
              onClick={() => setStep(i)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`w-9 h-9 rounded-full mx-auto mb-1.5 bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
              >
                <StepIcon className="w-4 h-4 text-white" />
              </motion.div>
              <span className={`text-[11px] font-medium ${isActive ? 'text-foreground' : 'text-foreground-secondary'}`}>
                {s.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${s.color}`}
                  layoutId="activeStep"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// Process step with swipe-friendly design
function MobileProcessStep({
  step,
  isActive,
  onToggle,
  index,
}: {
  step: typeof processSteps[0];
  isActive: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = step.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-2xl border border-[#EDE5DD] overflow-hidden shadow-sm"
        whileTap={{ scale: 0.99 }}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-4 min-h-[76px] active:bg-[#FDF8F3]/50"
        >
          <motion.div
            className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
              isActive
                ? `bg-gradient-to-br ${step.gradient}`
                : 'bg-gradient-to-br from-[#FDF8F3] to-white border border-[#EDE5DD]'
            }`}
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-[#722F37]'}`} />
          </motion.div>

          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-[#722F37]/70 uppercase tracking-wider">
                Step {step.step}
              </span>
              <span className="text-xs text-foreground-secondary bg-[#FDF8F3] px-2 py-0.5 rounded-full">
                {step.duration}
              </span>
            </div>
            <h4 className="font-semibold text-foreground text-lg">{step.title}</h4>
          </div>

          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isActive ? 'bg-gradient-to-br ' + step.gradient : 'bg-[#FDF8F3]'
            }`}
          >
            <ChevronDown className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#722F37]'}`} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pl-[76px]">
                <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${step.gradient} mb-3 opacity-30`} />
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Daily routine card with beautiful gradient
function MobileRoutineCard({ routine, index }: { routine: typeof dailyRoutine[0]; index: number }) {
  const Icon = routine.icon;
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
    >
      <motion.div
        className="bg-white rounded-2xl border border-[#EDE5DD] overflow-hidden shadow-lg"
        whileTap={{ scale: 0.99 }}
      >
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full">
          <div className={`relative h-24 bg-gradient-to-r ${routine.gradient} overflow-hidden`}>
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative flex items-center justify-between px-5 h-full">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  animate={{ rotate: isExpanded ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-7 h-7 text-white drop-shadow-md" />
                </motion.div>
                <div className="text-left">
                  <h3 className="font-semibold text-xl text-white drop-shadow-md">{routine.time}</h3>
                  <p className="text-sm text-white/90">{routine.tips.length} tips</p>
                </div>
              </div>

              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center"
              >
                <ChevronDown className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="overflow-hidden"
            >
              <div className="p-5 space-y-3">
                {routine.tips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      className={`w-7 h-7 rounded-full bg-gradient-to-r ${routine.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.1, type: 'spring' }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </motion.div>
                    <span className="text-sm text-foreground-secondary pt-1">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// FAQ Accordion with smooth animations
function MobileFAQItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: typeof faqs[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="border border-[#EDE5DD] rounded-2xl overflow-hidden bg-white shadow-sm"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 p-5 text-left min-h-[68px] active:bg-[#FDF8F3]/50"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? 'text-[#722F37]' : 'text-foreground'}`}>
          {item.question}
        </span>
        <motion.div
          className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-gradient-to-br from-[#722F37] to-[#5a252c] shadow-lg shadow-[#722F37]/30'
              : 'bg-[#FDF8F3]'
          }`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-[#722F37]'}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="px-5 pb-5">
              <div className="h-px bg-gradient-to-r from-[#722F37]/20 via-[#722F37]/10 to-transparent mb-4" />
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Services modal with premium design
function ServicesModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl pt-3 pb-3 px-5 border-b border-[#EDE5DD] z-10">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xl text-foreground">All Hygiene Services</h3>
                  <p className="text-sm text-foreground-secondary">Complete care for your smile</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-[#FDF8F3] flex items-center justify-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-foreground-secondary" />
                </motion.button>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {hygieneServices.map((service, i) => {
                const ServiceIcon = service.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#FDF8F3] to-white rounded-xl border border-[#EDE5DD]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center shadow-lg">
                      <ServiceIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-foreground font-medium flex-1">{service.text}</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </motion.div>
                );
              })}
            </div>

            <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl p-5 border-t border-[#EDE5DD]">
              <Link href="/contact#book" className="block">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  className="w-full"
                  onClick={onClose}
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// MAIN MOBILE COMPONENT
// =============================================================================

export default function DentalHygienePageMobile() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<number | null>(0);
  const [showServicesModal, setShowServicesModal] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <main className="flex min-h-screen flex-col bg-white pb-24">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] bg-gradient-to-b from-[#FDF8F3] via-white to-white overflow-hidden"
      >
        <FloatingOrbs />

        {/* Wave pattern at bottom */}
        <div className="absolute bottom-0 left-0 right-0 text-white h-20 z-10">
          <WavePattern />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative px-5 pt-6 pb-24"
        >
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-5"
          >
            {/* Badge */}
            <motion.div variants={staggerItem} className="flex justify-center">
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-100 via-teal-100 to-cyan-100 text-teal-700 text-sm font-medium shadow-lg shadow-teal-500/10"
                animate={{ boxShadow: ['0 4px 20px rgba(20, 184, 166, 0.1)', '0 4px 30px rgba(20, 184, 166, 0.2)', '0 4px 20px rgba(20, 184, 166, 0.1)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Professional Hygiene Care
              </motion.span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={staggerItem}
              className="text-center font-display font-bold text-[2.5rem] leading-[1.1] text-foreground"
            >
              Fresh, Clean{' '}
              <span className="bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] bg-clip-text text-transparent">
                Healthy Smile
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="text-center text-foreground-secondary text-base leading-relaxed max-w-sm mx-auto"
            >
              Professional cleaning and personalized care to keep your teeth and gums healthy for life.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap justify-center gap-2"
            >
              {['CDCP Accepted', 'Direct Billing', 'Gentle Care'].map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-[#EDE5DD] shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {badge}
                </motion.span>
              ))}
            </motion.div>

            {/* Hero image */}
            <motion.div variants={staggerItem}>
              <HeroImage />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={staggerItem} className="space-y-3 pt-2">
              <Link href="/contact#book" className="block">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                    className="w-full py-4 text-lg shadow-xl shadow-[#722F37]/20"
                  >
                    Book Cleaning
                  </Button>
                </motion.div>
              </Link>

              <motion.a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-medium text-[#722F37] bg-white border-2 border-[#EDE5DD] active:bg-[#FDF8F3] shadow-lg"
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="px-5 py-10 bg-white relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs font-medium mb-3"
            whileInView={{ scale: [0.9, 1] }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-4 h-4" />
            Important Facts
          </motion.span>
          <h2 className="font-display font-bold text-2xl text-foreground">
            Why Hygiene Matters
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {oralHealthStats.map((stat, index) => (
            <MobileStatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* ===== INTERACTIVE DEMO SECTION ===== */}
      <section className="px-5 py-10 bg-gradient-to-b from-[#FDF8F3] to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            What We Offer
          </h2>
          <p className="text-sm text-foreground-secondary">
            Comprehensive dental hygiene services
          </p>
        </motion.div>

        <MobileCleaningDemo />

        {/* Services quick list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 bg-white rounded-2xl p-5 border border-[#EDE5DD] shadow-lg"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Our Services Include</h3>
              <p className="text-xs text-foreground-secondary">Professional dental care</p>
            </div>
          </div>

          <div className="space-y-3">
            {hygieneServices.slice(0, 4).map((service, i) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
                    <ServiceIcon className="w-4 h-4 text-[#722F37]" />
                  </div>
                  <span className="text-sm text-foreground-secondary">{service.text}</span>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            onClick={() => setShowServicesModal(true)}
            className="w-full mt-5 py-4 text-sm font-medium text-[#722F37] flex items-center justify-center gap-2 bg-gradient-to-r from-[#FDF8F3] to-white rounded-xl border border-[#EDE5DD] active:bg-[#FDF8F3]"
            whileTap={{ scale: 0.98 }}
          >
            See all services
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* ===== BENEFITS SECTION ===== */}
      <section className="px-5 py-10 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-medium mb-3"
          >
            <ShieldCheck className="w-4 h-4" />
            Health Benefits
          </motion.span>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Why Regular Cleanings
          </h2>
          <p className="text-sm text-foreground-secondary">
            Benefits beyond a clean smile
          </p>
        </motion.div>

        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <MobileBenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="px-5 py-10 bg-gradient-to-b from-[#FDF8F3] to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 text-teal-700 text-xs font-medium mb-3"
          >
            <Timer className="w-4 h-4" />
            45-60 Minutes
          </motion.span>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            What to Expect
          </h2>
          <p className="text-sm text-foreground-secondary">
            Our gentle, thorough cleaning process
          </p>
        </motion.div>

        <div className="space-y-3">
          {processSteps.map((step, index) => (
            <MobileProcessStep
              key={index}
              step={step}
              isActive={activeProcessStep === index}
              onToggle={() => setActiveProcessStep(activeProcessStep === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ===== DAILY ROUTINE SECTION ===== */}
      <section className="px-5 py-10 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-xs font-medium mb-3"
          >
            <Sparkles className="w-4 h-4" />
            Daily Care Guide
          </motion.span>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Your Daily Routine
          </h2>
          <p className="text-sm text-foreground-secondary">
            Essential tips for optimal oral health
          </p>
        </motion.div>

        <div className="space-y-4">
          {dailyRoutine.map((routine, index) => (
            <MobileRoutineCard key={index} routine={routine} index={index} />
          ))}
        </div>

        {/* Pro tip card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#5a252c] rounded-2xl p-6 text-white shadow-xl overflow-hidden relative"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
            animate={{ x: [0, 24, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />

          <div className="relative flex items-start gap-4">
            <motion.div
              className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <RefreshCw className="w-7 h-7" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Pro Tip</h3>
              <p className="text-sm text-white/85 leading-relaxed">
                Replace your toothbrush every 3 months for best results!
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="px-5 py-10 bg-gradient-to-b from-[#FDF8F3] to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Common Questions
          </h2>
          <p className="text-sm text-foreground-secondary">
            Quick answers about dental hygiene
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <MobileFAQItem
              key={index}
              item={faq}
              isOpen={faqOpen === index}
              onToggle={() => setFaqOpen(faqOpen === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ===== RELATED SERVICES ===== */}
      <section className="px-5 py-10 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Related Services
          </h2>
          <p className="text-sm text-foreground-secondary">
            Complete your oral care journey
          </p>
        </motion.div>

        <div className="space-y-4">
          {relatedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <motion.div
                    className="flex items-center gap-4 p-4 bg-white border border-[#EDE5DD] rounded-2xl shadow-lg active:bg-[#FDF8F3]"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{service.title}</h3>
                      <p className="text-sm text-foreground-secondary truncate">{service.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#722F37]" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="px-5 py-12 bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#5a252c] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative text-center text-white"
        >
          <motion.div
            className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-xl"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Smile className="w-10 h-10" />
          </motion.div>

          <h2 className="font-display font-bold text-2xl mb-3">
            Ready for Your Cleaning?
          </h2>
          <p className="text-white/80 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Book your appointment today and experience the difference professional care makes.
          </p>

          <div className="space-y-3">
            <Link href="/contact#book" className="block">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  className="w-full py-4 text-lg bg-white text-[#722F37] hover:bg-white/90 shadow-xl"
                >
                  Book This Service
                </Button>
              </motion.div>
            </Link>

            <motion.a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-medium text-white border-2 border-white/30 active:bg-white/10"
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </motion.a>
          </div>

          {/* Quick info */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-left"
            >
              <Clock className="w-5 h-5 mb-2 text-white/70" />
              <p className="text-xs text-white/70">Hours</p>
              <p className="text-sm font-medium">Mon-Fri 9-5</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-left"
            >
              <Users className="w-5 h-5 mb-2 text-white/70" />
              <p className="text-xs text-white/70">Languages</p>
              <p className="text-sm font-medium">EN, FR, AR</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== STICKY BOTTOM CTA ===== */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#EDE5DD] p-4 z-50 shadow-2xl shadow-black/10"
      >
        <div className="flex gap-3">
          <motion.a
            href={`tel:${contactInfo.phone}`}
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-white border border-[#EDE5DD] flex items-center justify-center flex-shrink-0 shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-6 h-6 text-[#722F37]" />
          </motion.a>
          <Link href="/contact#book" className="flex-1">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5" />}
                className="w-full h-14 shadow-xl shadow-[#722F37]/20"
              >
                Book Cleaning
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* ===== SERVICES MODAL ===== */}
      <ServicesModal
        isOpen={showServicesModal}
        onClose={() => setShowServicesModal(false)}
      />
    </main>
  );
}
