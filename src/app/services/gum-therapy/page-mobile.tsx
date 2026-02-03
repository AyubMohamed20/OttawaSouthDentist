'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  Heart,
  ShieldCheck,
  AlertCircle,
  Activity,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Clock,
  HeartPulse,
  Syringe,
  Scissors,
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Droplets,
  Thermometer,
  TrendingDown,
  Zap,
  Shield,
  Target,
  RotateCcw,
  Leaf,
  Ban,
  CircleDot,
  Star,
  Eye,
  HandHeart,
  BadgeCheck,
  CircleCheck,
  Waves,
  Play,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'backOut' as const } },
};

// ============================================================================
// DATA
// ============================================================================

const warningSign = [
  { text: 'Red, swollen, or tender gums', icon: <AlertCircle className="w-4 h-4" />, severity: 'moderate' },
  { text: 'Bleeding when brushing or flossing', icon: <Droplets className="w-4 h-4" />, severity: 'early' },
  { text: 'Receding gums or longer-appearing teeth', icon: <TrendingDown className="w-4 h-4" />, severity: 'moderate' },
  { text: 'Persistent bad breath (halitosis)', icon: <Waves className="w-4 h-4" />, severity: 'early' },
  { text: 'Loose or shifting teeth', icon: <Activity className="w-4 h-4" />, severity: 'severe' },
  { text: 'Changes in your bite', icon: <Target className="w-4 h-4" />, severity: 'severe' },
  { text: 'Pus between teeth and gums', icon: <Thermometer className="w-4 h-4" />, severity: 'severe' },
  { text: 'Pain when chewing', icon: <Zap className="w-4 h-4" />, severity: 'moderate' },
];

const stages = [
  {
    stage: 'Healthy Gums',
    severity: 'Optimal',
    description: 'Pink, firm gums that fit snugly around teeth with no bleeding or inflammation.',
    color: 'emerald',
    progress: 100,
    reversible: true,
    indicators: ['No bleeding', 'Pink color', 'Firm texture'],
    icon: <Heart className="w-5 h-5" />,
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    stage: 'Gingivitis',
    severity: 'Early Stage',
    description: 'Inflammation caused by plaque buildup. Gums may be red, swollen, and bleed easily. Fully reversible.',
    color: 'amber',
    progress: 70,
    reversible: true,
    indicators: ['Mild bleeding', 'Red, puffy gums', 'Slight inflammation'],
    icon: <AlertCircle className="w-5 h-5" />,
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    stage: 'Periodontitis',
    severity: 'Moderate Stage',
    description: 'Infection spreads below the gum line, causing pockets to form. Bone loss begins.',
    color: 'orange',
    progress: 40,
    reversible: false,
    indicators: ['Deep pockets', 'Bone loss begins', 'Bad breath'],
    icon: <AlertTriangle className="w-5 h-5" />,
    gradient: 'from-orange-400 to-red-500',
  },
  {
    stage: 'Advanced Periodontitis',
    severity: 'Severe Stage',
    description: 'Extensive bone and tissue destruction leads to loose teeth and potential tooth loss.',
    color: 'red',
    progress: 15,
    reversible: false,
    indicators: ['Severe bone loss', 'Loose teeth', 'Tooth loss risk'],
    icon: <Ban className="w-5 h-5" />,
    gradient: 'from-red-500 to-rose-600',
  },
];

const riskFactors = [
  { title: 'Smoking & Tobacco', description: 'Impairs healing', icon: <Ban className="w-5 h-5" />, riskLevel: 'high' },
  { title: 'Poor Oral Hygiene', description: 'Plaque buildup', icon: <RotateCcw className="w-5 h-5" />, riskLevel: 'high' },
  { title: 'Diabetes', description: 'Affects immunity', icon: <Activity className="w-5 h-5" />, riskLevel: 'moderate' },
  { title: 'Genetics', description: 'Family history', icon: <HeartPulse className="w-5 h-5" />, riskLevel: 'moderate' },
  { title: 'Medications', description: 'Dry mouth effect', icon: <Syringe className="w-5 h-5" />, riskLevel: 'low' },
  { title: 'Stress', description: 'Weakens defenses', icon: <Zap className="w-5 h-5" />, riskLevel: 'low' },
];

interface Treatment {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  recovery: string;
}

const nonSurgicalTreatments: Treatment[] = [
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Deep Cleaning',
    subtitle: 'Scaling & Root Planing',
    description: 'Thorough removal of plaque and tartar from below the gum line, smoothing root surfaces.',
    duration: '1-2 visits',
    recovery: 'Minimal',
  },
  {
    icon: <Syringe className="w-6 h-6" />,
    title: 'Antibiotic Therapy',
    description: 'Targeted antimicrobial treatments to control and eliminate bacterial infection.',
    duration: '2-4 weeks',
    recovery: 'None',
  },
  {
    icon: <HandHeart className="w-6 h-6" />,
    title: 'Home Care Program',
    description: 'Personalized oral hygiene instructions and specialized tools for optimal results.',
    duration: 'Ongoing',
    recovery: 'None',
  },
];

const surgicalTreatments: Treatment[] = [
  {
    icon: <Scissors className="w-6 h-6" />,
    title: 'Pocket Reduction',
    description: 'Reduces periodontal pocket depth by securing gum tissue to the bone.',
    duration: '1-3 hours',
    recovery: '1-2 weeks',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Gum Grafting',
    description: 'Transplants healthy tissue to cover exposed roots and prevent further recession.',
    duration: '1-2 hours',
    recovery: '2-3 weeks',
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Bone Grafting',
    description: 'Rebuilds and regenerates bone lost to periodontitis for implant support.',
    duration: '1-2 hours',
    recovery: '3-6 months',
  },
];

const benefits = [
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Prevent Tooth Loss', description: 'Stop disease progression and save your natural teeth.', color: 'from-blue-500 to-indigo-600' },
  { icon: <Heart className="w-6 h-6" />, title: 'Protect Overall Health', description: 'Reduce risk of heart disease, diabetes complications.', color: 'from-rose-500 to-pink-600' },
  { icon: <Sparkles className="w-6 h-6" />, title: 'Fresher Breath', description: 'Eliminate odor-causing bacteria for lasting confidence.', color: 'from-amber-500 to-orange-600' },
  { icon: <Clock className="w-6 h-6" />, title: 'Early Intervention', description: 'Simpler, faster, more comfortable treatment options.', color: 'from-emerald-500 to-teal-600' },
];

const preventionTips = [
  { title: 'Brush Twice Daily', description: '2 minutes each', icon: <RotateCcw className="w-5 h-5" /> },
  { title: 'Floss Daily', description: 'Between all teeth', icon: <Target className="w-5 h-5" /> },
  { title: 'Regular Checkups', description: 'Every 6 months', icon: <Calendar className="w-5 h-5" /> },
  { title: 'Quit Tobacco', description: 'Improves healing', icon: <Ban className="w-5 h-5" /> },
  { title: 'Healthy Diet', description: 'Vitamin C & D', icon: <Leaf className="w-5 h-5" /> },
  { title: 'Manage Stress', description: 'Protects immunity', icon: <Heart className="w-5 h-5" /> },
];

const processSteps = [
  { step: '1', title: 'Comprehensive Evaluation', description: 'Measure pocket depths, X-rays, and assess bone loss with precision.', icon: <Stethoscope className="w-5 h-5" /> },
  { step: '2', title: 'Personalized Treatment Plan', description: 'Create a customized approach based on your unique condition.', icon: <Target className="w-5 h-5" /> },
  { step: '3', title: 'Active Treatment Phase', description: 'Perform targeted procedures to eliminate infection and restore health.', icon: <Activity className="w-5 h-5" /> },
  { step: '4', title: 'Ongoing Maintenance', description: 'Regular follow-up visits to maintain your results long-term.', icon: <Shield className="w-5 h-5" /> },
];

const faqItems = [
  {
    question: 'Is gum disease reversible?',
    answer: 'Gingivitis is fully reversible with proper treatment. However, periodontitis damage cannot be fully reversed—but it can be managed effectively. Early intervention is key.',
  },
  {
    question: 'How can I prevent gum disease?',
    answer: 'Brush twice daily, floss daily, use mouthwash if recommended, avoid tobacco, eat a balanced diet, and visit us regularly for professional cleanings.',
  },
  {
    question: 'Is scaling and root planing painful?',
    answer: 'We use local anesthesia so you should not feel pain during treatment. Some sensitivity afterward is normal and manageable with over-the-counter pain relievers.',
  },
  {
    question: 'How often will I need maintenance visits?',
    answer: 'Most patients require visits every 3-4 months after gum therapy, rather than the standard 6-month schedule, to monitor and maintain gum health.',
  },
];

const relatedServices = [
  { icon: <Sparkles className="w-5 h-5" />, title: 'Dental Hygiene', href: '/services/dental-hygiene', description: 'Professional cleaning' },
  { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Routine Checkups', href: '/services/routine-checkups', description: 'Preventive exams' },
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Preventive Dentistry', href: '/services/preventive-dentistry', description: 'Long-term care' },
];

// ============================================================================
// IMMERSIVE HERO SECTION
// ============================================================================

function ImmersiveHeroSection() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#722F37]/20">
      {/* Cinematic Background Image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/6812570/pexels-photo-6812570.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
          alt="Professional dental care"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative flex flex-col justify-end min-h-[100svh] px-5 pb-8 pt-20">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Periodontal Specialists
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display font-bold text-[2.75rem] leading-[1.05] text-white mb-4"
        >
          Restore Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
            Gum Health
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/70 text-base leading-relaxed mb-6 max-w-[320px]"
        >
          Expert periodontal treatment from early gingivitis to advanced care. Gentle, effective, personalized.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[
            { icon: <HandHeart className="w-3.5 h-3.5" />, text: 'Gentle Care' },
            { icon: <BadgeCheck className="w-3.5 h-3.5" />, text: 'Expert Team' },
            { icon: <Shield className="w-3.5 h-3.5" />, text: 'Lasting Results' },
          ].map((item) => (
            <span
              key={item.text}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-xs"
            >
              <span className="text-emerald-400">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3"
        >
          <Link href="/book" className="block">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl font-semibold text-base shadow-[0_8px_32px_rgba(16,185,129,0.35)] relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-500" />
              <Calendar className="w-5 h-5" />
              Book Your Evaluation
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>

          <a
            href={phoneHref}
            className="flex items-center justify-center gap-2 py-3 text-white/80 font-medium text-sm"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            Call {formattedPhone}
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// GUM HEALTH JOURNEY - VISUAL STORY
// ============================================================================

function GumHealthJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // activeStage is always 0-3, stages array has exactly 4 elements
  const currentStage = stages[activeStage]!;

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <Eye className="w-4 h-4" />
          Understanding Gum Health
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight">
          Stages of
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> Gum Disease</span>
        </h2>
      </motion.div>

      {/* Interactive Stage Selector */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2"
      >
        {stages.map((stage, index) => (
          <motion.button
            key={stage.stage}
            variants={scaleIn}
            onClick={() => setActiveStage(index)}
            className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeStage === index
                ? `bg-gradient-to-r ${stage.gradient} text-white shadow-lg`
                : 'bg-white/5 text-white/60 border border-white/10'
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
              {stage.icon}
              {stage.stage}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Active Stage Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`rounded-3xl p-6 bg-gradient-to-br ${currentStage.gradient}/10 border border-white/10 backdrop-blur-sm`}
        >
          {/* Stage Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentStage.gradient} flex items-center justify-center text-white shadow-lg`}>
              {currentStage.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-white mb-1">{currentStage.stage}</h3>
              <span className={`text-sm font-medium bg-gradient-to-r ${currentStage.gradient} bg-clip-text text-transparent`}>
                {currentStage.severity}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/70 text-base leading-relaxed mb-6">
            {currentStage.description}
          </p>

          {/* Indicators */}
          <div className="flex flex-wrap gap-2 mb-6">
            {currentStage.indicators.map((indicator) => (
              <span
                key={indicator}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs"
              >
                <CircleDot className="w-3 h-3" />
                {indicator}
              </span>
            ))}
          </div>

          {/* Reversibility Status */}
          <div className={`flex items-center gap-3 p-4 rounded-xl ${
            currentStage.reversible
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : 'bg-orange-500/10 border border-orange-500/20'
          }`}>
            {currentStage.reversible ? (
              <>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="font-semibold text-emerald-400 text-sm">Fully Reversible</span>
                  <p className="text-white/60 text-xs mt-0.5">With proper treatment</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <span className="font-semibold text-orange-400 text-sm">Manageable, Not Reversible</span>
                  <p className="text-white/60 text-xs mt-0.5">Early treatment is crucial</p>
                </div>
              </>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/50 text-xs">Gum Health Level</span>
              <span className="text-white/80 text-xs font-medium">{currentStage.progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentStage.progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${currentStage.gradient} rounded-full`}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ============================================================================
// INTERACTIVE SYMPTOM CHECKER
// ============================================================================

function InteractiveSymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const toggleSymptom = useCallback((symptomText: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomText)
        ? prev.filter((s) => s !== symptomText)
        : [...prev, symptomText]
    );
  }, []);

  const getRiskLevel = () => {
    const severeCount = selectedSymptoms.filter((s) =>
      warningSign.find((w) => w.text === s)?.severity === 'severe'
    ).length;
    const moderateCount = selectedSymptoms.filter((s) =>
      warningSign.find((w) => w.text === s)?.severity === 'moderate'
    ).length;

    if (severeCount >= 2 || selectedSymptoms.length >= 5) return 'high';
    if (severeCount >= 1 || moderateCount >= 2 || selectedSymptoms.length >= 3) return 'moderate';
    if (selectedSymptoms.length > 0) return 'low';
    return 'none';
  };

  const getSeverityStyle = (severity: string, isSelected: boolean) => {
    if (!isSelected) return 'bg-white/5 border-white/10';
    switch (severity) {
      case 'early': return 'bg-amber-500/20 border-amber-500/40';
      case 'moderate': return 'bg-orange-500/20 border-orange-500/40';
      case 'severe': return 'bg-red-500/20 border-red-500/40';
      default: return 'bg-white/10 border-white/20';
    }
  };

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#0f0f0f] to-[#1a0a0a]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 text-red-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <AlertCircle className="w-4 h-4" />
          Self Assessment
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight mb-3">
          Warning
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"> Signs</span>
        </h2>
        <p className="text-white/60 text-sm">
          Tap any symptoms you&apos;re experiencing
        </p>
      </motion.div>

      {/* Symptom Grid */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="space-y-2"
      >
        {warningSign.map((sign) => {
          const isSelected = selectedSymptoms.includes(sign.text);
          return (
            <motion.button
              key={sign.text}
              variants={slideInLeft}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSymptom(sign.text)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${getSeverityStyle(sign.severity, isSelected)}`}
            >
              <motion.div
                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#722F37] to-[#8a3a44]'
                    : 'bg-white/10 border border-white/20'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
              </motion.div>
              <div className="flex-1">
                <span className="font-medium text-white text-sm">{sign.text}</span>
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                sign.severity === 'early' ? 'bg-amber-500/20 text-amber-400' :
                sign.severity === 'moderate' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {sign.severity}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Results Panel */}
      <AnimatePresence>
        {selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 30, height: 0 }}
            className="mt-8"
          >
            <div className={`rounded-3xl p-6 border backdrop-blur-sm ${
              getRiskLevel() === 'high' ? 'bg-red-500/10 border-red-500/30' :
              getRiskLevel() === 'moderate' ? 'bg-orange-500/10 border-orange-500/30' : 'bg-amber-500/10 border-amber-500/30'
            }`}>
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    getRiskLevel() === 'high' ? 'bg-red-500' :
                    getRiskLevel() === 'moderate' ? 'bg-orange-500' : 'bg-amber-500'
                  }`}
                >
                  <AlertTriangle className="w-7 h-7 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    {getRiskLevel() === 'high' ? 'High Risk Detected' :
                     getRiskLevel() === 'moderate' ? 'Moderate Risk' : 'Monitor Symptoms'}
                  </h4>
                  <p className="text-white/60 text-xs mt-0.5">
                    {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} selected
                  </p>
                </div>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {getRiskLevel() === 'high'
                  ? 'These symptoms suggest advanced gum disease. We strongly recommend scheduling an evaluation as soon as possible.'
                  : getRiskLevel() === 'moderate'
                  ? 'These symptoms may indicate developing gum disease. Early treatment can prevent permanent damage.'
                  : 'Worth monitoring closely. Good oral hygiene and a checkup can help prevent progression.'}
              </p>

              <Link href="/contact" className="block">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-xl font-semibold text-sm shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Your Evaluation
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============================================================================
// RISK FACTORS CAROUSEL
// ============================================================================

function RiskFactorsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const getRiskGradient = (level: string) => {
    switch (level) {
      case 'high': return 'from-red-500 to-rose-600';
      case 'moderate': return 'from-orange-500 to-amber-600';
      case 'low': return 'from-amber-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section ref={containerRef} className="py-16 bg-[#0a0a0a]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center px-5 mb-8"
      >
        <span className="inline-flex items-center gap-2 text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <ShieldCheck className="w-4 h-4" />
          Know Your Risks
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight">
          Risk
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400"> Factors</span>
        </h2>
      </motion.div>

      {/* Horizontal Scroll Cards */}
      <div className="overflow-x-auto scrollbar-hide">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex gap-4 px-5 pb-4"
          style={{ width: 'max-content' }}
        >
          {riskFactors.map((factor) => (
            <motion.div
              key={factor.title}
              variants={fadeInScale}
              className="w-40 flex-shrink-0"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRiskGradient(factor.riskLevel)} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {factor.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{factor.title}</h3>
                <p className="text-white/50 text-xs mb-3">{factor.description}</p>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${
                  factor.riskLevel === 'high' ? 'text-red-400' :
                  factor.riskLevel === 'moderate' ? 'text-orange-400' : 'text-amber-400'
                }`}>
                  {factor.riskLevel} risk
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TREATMENT OPTIONS - PREMIUM TABS
// ============================================================================

function TreatmentOptionsSection() {
  const [activeTab, setActiveTab] = useState<'non-surgical' | 'surgical'>('non-surgical');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const treatments = activeTab === 'non-surgical' ? nonSurgicalTreatments : surgicalTreatments;

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#1a0a0a] to-[#0f0a08]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <Stethoscope className="w-4 h-4" />
          Treatment Options
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight">
          Tailored
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Treatment</span>
        </h2>
      </motion.div>

      {/* Tab Selector */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="flex gap-2 p-1.5 bg-white/5 rounded-2xl mb-8 border border-white/10"
      >
        <button
          onClick={() => setActiveTab('non-surgical')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'non-surgical'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
              : 'text-white/60'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          Non-Surgical
        </button>
        <button
          onClick={() => setActiveTab('surgical')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'surgical'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
              : 'text-white/60'
          }`}
        >
          <Scissors className="w-4 h-4" />
          Surgical
        </button>
      </motion.div>

      {/* Treatment Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0 border border-cyan-500/20">
                  {treatment.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{treatment.title}</h3>
                  {treatment.subtitle && (
                    <span className="text-cyan-400 text-xs font-medium">{treatment.subtitle}</span>
                  )}
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">{treatment.description}</p>

                  <div className="flex gap-6 mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/40" />
                      <span className="text-white/70 text-xs">{treatment.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-white/40" />
                      <span className="text-white/70 text-xs">Recovery: {treatment.recovery}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ============================================================================
// VISUAL BREAK - PREMIUM IMAGE
// ============================================================================

function PremiumVisualBreak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-8 px-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative aspect-[4/3] rounded-3xl overflow-hidden"
      >
        <Image
          src="https://images.pexels.com/photos/3762408/pexels-photo-3762408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
          alt="Happy patient with beautiful smile"
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Floating Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="absolute bottom-6 left-5 right-5"
        >
          <p className="text-white text-lg font-medium italic leading-relaxed">
            &quot;A healthy smile is worth the investment.&quot;
          </p>
          <span className="text-white/60 text-sm mt-2 block">— Our Philosophy</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// BENEFITS SECTION - GRADIENT CARDS
// ============================================================================

function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#0f0a08] to-[#0a0a0a]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <Star className="w-4 h-4" />
          Why It Matters
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight">
          Benefits of
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> Gum Therapy</span>
        </h2>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="grid grid-cols-2 gap-4"
      >
        {benefits.map((benefit) => (
          <motion.div
            key={benefit.title}
            variants={fadeInScale}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
              {benefit.icon}
            </div>
            <h3 className="font-semibold text-white text-sm mb-2">{benefit.title}</h3>
            <p className="text-white/50 text-xs leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// TREATMENT JOURNEY - VERTICAL TIMELINE
// ============================================================================

function TreatmentJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-[#0a0a0a]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-purple-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <Activity className="w-4 h-4" />
          Your Journey
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight">
          What to
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Expect</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-transparent" />

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-6"
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={slideInLeft}
              className="relative flex gap-5 pl-2"
            >
              {/* Step Number */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-purple-500/30 z-10 flex-shrink-0">
                {step.step}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-400">{step.icon}</span>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// PREVENTION TIPS - INTERACTIVE GRID
// ============================================================================

function PreventionTipsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#0a0a0a] to-[#0a1a0a]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <Leaf className="w-4 h-4" />
          Prevention
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight">
          Keep Gums
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400"> Healthy</span>
        </h2>
      </motion.div>

      {/* Tips Grid */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="grid grid-cols-3 gap-3"
      >
        {preventionTips.map((tip) => (
          <motion.div
            key={tip.title}
            variants={scaleIn}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500/10 backdrop-blur-sm rounded-2xl p-4 border border-emerald-500/20 text-center"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-emerald-500/30">
              {tip.icon}
            </div>
            <h3 className="font-medium text-white text-xs leading-tight mb-1">{tip.title}</h3>
            <p className="text-white/50 text-[10px]">{tip.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-[#0a0a0a]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <CircleCheck className="w-4 h-4" />
          Common Questions
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight">
          FAQ
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <FAQAccordion items={faqItems} />
      </motion.div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

function RelatedServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <Sparkles className="w-4 h-4" />
          Explore More
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight">
          Related
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"> Services</span>
        </h2>
      </motion.div>

      {/* Services */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="space-y-3"
      >
        {relatedServices.map((service) => (
          <motion.div key={service.title} variants={slideInLeft}>
            <Link href={service.href}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-white block">{service.title}</span>
                  <span className="text-white/50 text-xs">{service.description}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function FinalCTASection() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-16 px-5 bg-gradient-to-b from-[#0f0f0f] to-[#722F37]/30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#722F37] to-[#8a3a44] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#722F37]/40"
        >
          <HeartPulse className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="font-display font-bold text-3xl text-white leading-tight mb-4">
          Ready to Restore
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#d4656f]">
            Your Gum Health?
          </span>
        </h2>

        <p className="text-white/60 text-base mb-8 max-w-xs mx-auto">
          Schedule your comprehensive periodontal evaluation today.
        </p>

        <Link href="/book" className="block mb-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-2xl font-semibold text-base shadow-lg shadow-[#722F37]/30 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-500" />
            <Calendar className="w-5 h-5" />
            Book Your Evaluation
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>

        <a
          href={phoneHref}
          className="flex items-center justify-center gap-2 text-white/70 font-medium text-sm"
        >
          <Phone className="w-4 h-4" />
          Call {formattedPhone}
        </a>
      </motion.div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA
// ============================================================================

function StickyBottomCTA() {
  const phoneHref = `tel:${contactInfo.phone}`;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: 'spring', stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 safe-area-pb"
    >
      <div className="flex gap-3 p-4 max-w-lg mx-auto">
        <a
          href={phoneHref}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/10 text-white rounded-xl font-semibold text-sm border border-white/10 active:scale-[0.98] transition-transform"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <Link href="/book" className="flex-[2]">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-emerald-500/30"
          >
            <Calendar className="w-4 h-4" />
            Book Evaluation
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN MOBILE PAGE COMPONENT
// ============================================================================

export default function GumTherapyPageMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Immersive Hero */}
      <ImmersiveHeroSection />

      {/* Gum Health Journey */}
      <GumHealthJourney />

      {/* Premium Visual Break */}
      <PremiumVisualBreak />

      {/* Interactive Symptom Checker */}
      <InteractiveSymptomChecker />

      {/* Risk Factors */}
      <RiskFactorsCarousel />

      {/* Treatment Options */}
      <TreatmentOptionsSection />

      {/* Benefits */}
      <BenefitsSection />

      {/* Treatment Journey */}
      <TreatmentJourney />

      {/* Prevention Tips */}
      <PreventionTipsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Related Services */}
      <RelatedServicesSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Sticky Bottom CTA */}
      <StickyBottomCTA />
    </main>
  );
}
