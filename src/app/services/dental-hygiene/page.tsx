'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  Timer,
  TrendingUp,
  Zap,
  Target,
  Waves,
  RefreshCw,
  ChevronRight,
  Info,
  Sun,
  Moon,
  Coffee,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

// FAQ data for the accordion
const faqs = [
  {
    question: 'Why is professional cleaning important if I brush and floss regularly?',
    answer:
      'Even with excellent home care, plaque can build up in hard-to-reach areas that your toothbrush and floss cannot effectively clean. Over time, this plaque hardens into tartar (calculus), which can only be removed by professional dental instruments. Regular professional cleanings help prevent gum disease, cavities, and other oral health issues while keeping your breath fresh and your smile bright.',
  },
  {
    question: 'What is the difference between regular cleaning and deep cleaning?',
    answer:
      'Regular cleaning (prophylaxis) removes plaque and tartar from above the gum line and is ideal for patients with healthy gums. Deep cleaning (scaling and root planing) treats buildup below the gum line and smooths the tooth roots to help gums reattach. Deep cleaning is typically recommended for patients showing signs of gum disease, such as bleeding gums, receding gums, or periodontal pockets.',
  },
  {
    question: 'How often should I get my teeth professionally cleaned?',
    answer:
      'Most patients benefit from professional cleanings every 6 months. However, if you have gum disease, a history of cavities, or other risk factors, your dentist may recommend more frequent visits—typically every 3 to 4 months. During your appointment, our hygienists will assess your oral health and recommend a cleaning schedule tailored to your needs.',
  },
  {
    question: 'Does teeth cleaning hurt?',
    answer:
      'Professional teeth cleaning is generally comfortable for most patients. You may feel some pressure or slight sensitivity during the process, particularly if you have sensitive teeth or significant tartar buildup. For patients who experience anxiety or discomfort, we offer gentle techniques and can discuss options to ensure your comfort throughout the procedure.',
  },
  {
    question: 'What can I expect during a dental hygiene appointment?',
    answer:
      'Your appointment typically includes a thorough examination of your teeth and gums, removal of plaque and tartar using specialized instruments, polishing to remove surface stains, flossing between all teeth, and personalized oral hygiene instructions. We may also recommend fluoride treatment for additional protection. The entire process usually takes 45 minutes to an hour.',
  },
];

// Related services data
const relatedServices = [
  {
    title: 'Routine Checkups',
    description:
      'Comprehensive dental examinations to detect problems early and maintain your oral health.',
    href: '/services/routine-checkups',
    icon: Stethoscope,
  },
  {
    title: 'Preventive Dentistry',
    description:
      'Fluoride treatments, sealants, and custom mouthguards to protect your teeth from decay and damage.',
    href: '/services/preventive-dentistry',
    icon: ShieldCheck,
  },
  {
    title: 'Gum Therapy',
    description:
      'Specialized treatment for gum disease to restore your periodontal health and prevent tooth loss.',
    href: '/services/gum-therapy',
    icon: Heart,
  },
];

// Benefits data
const benefits = [
  {
    icon: Sparkles,
    title: 'Brighter, Cleaner Smile',
    description:
      'Remove stubborn stains and tartar buildup that brushing alone cannot eliminate.',
    stat: '98%',
    statLabel: 'Stain Removal',
  },
  {
    icon: ShieldCheck,
    title: 'Prevent Gum Disease',
    description:
      'Regular cleanings significantly reduce your risk of gingivitis and periodontitis.',
    stat: '60%',
    statLabel: 'Risk Reduction',
  },
  {
    icon: Heart,
    title: 'Better Overall Health',
    description:
      'Good oral health is linked to lower risk of heart disease, diabetes complications, and more.',
    stat: '3x',
    statLabel: 'Healthier Life',
  },
  {
    icon: Clock,
    title: 'Early Problem Detection',
    description:
      'Catch cavities, oral cancer, and other issues early when they are easier to treat.',
    stat: '45min',
    statLabel: 'Avg. Visit',
  },
];

// Process steps with detailed info
const processSteps = [
  {
    step: 1,
    title: 'Assessment',
    description:
      'We examine your teeth and gums, checking for signs of decay, gum disease, and other concerns.',
    icon: Target,
    color: 'from-cyan-400 to-teal-500',
    duration: '5-10 min',
  },
  {
    step: 2,
    title: 'Scaling',
    description:
      'Using specialized instruments, we carefully remove plaque and tartar from all tooth surfaces.',
    icon: Waves,
    color: 'from-teal-400 to-emerald-500',
    duration: '15-20 min',
  },
  {
    step: 3,
    title: 'Polishing',
    description:
      'We polish your teeth with a gentle gritty paste to remove surface stains and smooth enamel.',
    icon: Sparkles,
    color: 'from-emerald-400 to-green-500',
    duration: '5-10 min',
  },
  {
    step: 4,
    title: 'Flossing',
    description:
      'A thorough flossing removes any remaining debris and cleans between your teeth.',
    icon: RefreshCw,
    color: 'from-green-400 to-lime-500',
    duration: '3-5 min',
  },
  {
    step: 5,
    title: 'Fluoride Treatment',
    description:
      'Optional protective fluoride treatment helps strengthen enamel and prevent cavities.',
    icon: ShieldCheck,
    color: 'from-lime-400 to-yellow-500',
    duration: '1-2 min',
  },
];

// Oral health statistics
const oralHealthStats = [
  { value: 47, suffix: '%', label: 'of adults have some form of gum disease', icon: TrendingUp },
  { value: 6, suffix: ' months', label: 'recommended time between cleanings', icon: Calendar },
  { value: 700, suffix: '+', label: 'bacteria species can live in your mouth', icon: Zap },
  { value: 3, suffix: 'x', label: 'more likely to lose teeth without cleanings', icon: Heart },
];

// Hygiene routine tips
const hygieneRoutineTips = [
  {
    timeOfDay: 'Morning',
    icon: Sun,
    tips: [
      'Brush for 2 minutes with fluoride toothpaste',
      'Clean your tongue to remove bacteria',
      'Wait 30 minutes after eating before brushing',
    ],
    color: 'from-amber-400 to-orange-500',
  },
  {
    timeOfDay: 'After Meals',
    icon: Coffee,
    tips: [
      'Rinse with water to neutralize acids',
      'Chew sugar-free gum to stimulate saliva',
      'Avoid brushing immediately after acidic foods',
    ],
    color: 'from-rose-400 to-pink-500',
  },
  {
    timeOfDay: 'Evening',
    icon: Moon,
    tips: [
      'Floss between all teeth before brushing',
      'Use an antiseptic mouthwash',
      'Consider an electric toothbrush for better cleaning',
    ],
    color: 'from-indigo-400 to-purple-500',
  },
];

// Services included
const hygieneServices = [
  'Thorough teeth cleaning (prophylaxis)',
  'Removal of plaque and tartar buildup',
  'Polishing to remove surface stains',
  'Comprehensive gum health assessment',
  'Personalized oral hygiene instructions',
  'Deep cleaning (scaling and root planing)',
  'Periodontal maintenance programs',
  'Fluoride treatments for cavity prevention',
];

// Animated counter hook
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

// Magnetic hover effect hook
function useMagnetic(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  }, [x, y, strength]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x: springX, y: springY, handleMouseMove, handleMouseLeave };
}

// Animated stat card component
function AnimatedStatCard({
  stat,
  index
}: {
  stat: typeof oralHealthStats[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useAnimatedCounter(stat.value, 2000, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#EDE5DD] p-6 shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1">
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Icon */}
        <div className="relative mb-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Stat value */}
        <div className="relative">
          <motion.span
            className="text-4xl font-bold text-[#722F37]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            {count}{stat.suffix}
          </motion.span>
        </div>

        {/* Label */}
        <p className="relative mt-2 text-sm text-foreground-secondary leading-relaxed">
          {stat.label}
        </p>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#722F37]/5 to-transparent rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

// Animated process step component
function ProcessStep({
  step,
  index,
  activeStep,
  setActiveStep
}: {
  step: typeof processSteps[0];
  index: number;
  activeStep: number;
  setActiveStep: (step: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isActive = activeStep === index;
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      onMouseEnter={() => setActiveStep(index)}
    >
      <div className="flex gap-6">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <motion.div
            className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isActive
                ? `bg-gradient-to-br ${step.color} shadow-lg`
                : 'bg-white border-2 border-[#EDE5DD] hover:border-[#722F37]/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isActive ? {
              boxShadow: ['0 0 0 0 rgba(114, 47, 55, 0.4)', '0 0 0 10px rgba(114, 47, 55, 0)', '0 0 0 0 rgba(114, 47, 55, 0)']
            } : {}}
            transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-[#722F37]'}`} />
          </motion.div>

          {/* Connecting line */}
          {index < processSteps.length - 1 && (
            <motion.div
              className="w-0.5 flex-1 my-2 rounded-full"
              initial={{ height: 0, background: '#EDE5DD' }}
              animate={isInView ? {
                height: '100%',
                background: isActive ? 'linear-gradient(to bottom, #722F37, #EDE5DD)' : '#EDE5DD'
              } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            />
          )}
        </div>

        {/* Content */}
        <motion.div
          className={`flex-1 pb-8 transition-all duration-300 ${isActive ? 'scale-[1.02]' : ''}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-medium text-[#722F37]/60 uppercase tracking-wider">
                Step {step.step}
              </span>
              <h4 className="font-display font-semibold text-xl text-foreground mt-1">
                {step.title}
              </h4>
            </div>
            <motion.span
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-[#722F37] text-white'
                  : 'bg-[#FDF8F3] text-[#722F37]'
              }`}
              layout
            >
              <Timer className="w-3 h-3 inline mr-1" />
              {step.duration}
            </motion.span>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={isActive ? 'active' : 'inactive'}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`mt-3 text-foreground-secondary leading-relaxed transition-all duration-300 ${
                isActive ? 'text-base' : 'text-sm'
              }`}
            >
              {step.description}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Animated benefit card
function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.1);
  const Icon = benefit.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={(e) => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative group"
    >
      <motion.div
        className="relative h-full bg-white rounded-2xl p-6 shadow-soft border border-[#EDE5DD] overflow-hidden"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#722F37]/10 via-transparent to-[#722F37]/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Icon with pulse animation */}
        <div className="relative mb-5">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center shadow-lg"
            animate={isHovered ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Stat badge */}
          <motion.div
            className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-[#FDF8F3] border border-[#EDE5DD] shadow-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.4, type: 'spring', stiffness: 200 }}
          >
            <span className="text-sm font-bold text-[#722F37]">{benefit.stat}</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-[#722F37] transition-colors">
            {benefit.title}
          </h3>
          <p className="text-foreground-secondary text-sm leading-relaxed">
            {benefit.description}
          </p>

          {/* Stat label */}
          <motion.div
            className="mt-4 pt-4 border-t border-[#EDE5DD] flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs text-foreground-secondary">{benefit.statLabel}</span>
            <ChevronRight className="w-4 h-4 text-[#722F37]" />
          </motion.div>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#722F37]/10 to-transparent rounded-tl-full"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Hygiene routine card
function HygieneRoutineCard({ routine, index }: { routine: typeof hygieneRoutineTips[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = routine.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden shadow-soft border border-[#EDE5DD] cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ y: -4 }}
        layout
      >
        {/* Header */}
        <div className="relative p-6">
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${routine.color} opacity-10`} />

          <div className="relative flex items-center gap-4">
            <motion.div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${routine.color} flex items-center justify-center shadow-lg`}
              animate={{ rotate: isExpanded ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>

            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-foreground">
                {routine.timeOfDay}
              </h3>
              <p className="text-sm text-foreground-secondary mt-0.5">
                {routine.tips.length} essential tips
              </p>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-6 h-6 text-[#722F37]" />
            </motion.div>
          </div>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-3">
                {routine.tips.map((tip, tipIndex) => (
                  <motion.div
                    key={tipIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: tipIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${routine.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: tipIndex * 0.1 + 0.2, type: 'spring' }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                    <span className="text-foreground-secondary text-sm leading-relaxed">
                      {tip}
                    </span>
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

// Cleaning visualization component
function CleaningVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  const steps = [
    { label: 'Plaque & Tartar', description: 'Buildup on teeth surfaces', color: 'bg-amber-400' },
    { label: 'Scaling', description: 'Removing hardened deposits', color: 'bg-teal-400' },
    { label: 'Polishing', description: 'Smoothing tooth surfaces', color: 'bg-cyan-400' },
    { label: 'Clean & Fresh', description: 'Healthy, sparkling teeth', color: 'bg-emerald-400' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl p-8 border border-[#EDE5DD] overflow-hidden"
    >
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-[#722F37]/5"
            initial={{
              x: Math.random() * 100 + '%',
              y: '100%',
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: '-20%',
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="relative text-center mb-8">
        <h3 className="font-display font-semibold text-2xl text-foreground">
          The Cleaning Process
        </h3>
        <p className="text-foreground-secondary mt-2">
          Watch how we transform your smile
        </p>
      </div>

      {/* Tooth visualization */}
      <div className="relative flex justify-center mb-8">
        <motion.div
          className="relative w-40 h-48"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {/* Tooth shape */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 120" className="w-full h-full">
              <defs>
                <linearGradient id="toothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F0F0F0" />
                </linearGradient>
              </defs>
              {/* Tooth outline */}
              <motion.path
                d="M 50 10 C 70 10 80 25 80 40 C 80 55 75 70 75 85 C 75 100 65 110 55 110 C 50 110 50 95 50 95 C 50 95 50 110 45 110 C 35 110 25 100 25 85 C 25 70 20 55 20 40 C 20 25 30 10 50 10"
                fill="url(#toothGradient)"
                stroke="#E0E0E0"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* Cleaning effect overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {step === 0 && (
                <div className="absolute inset-4 flex flex-wrap gap-1 justify-center items-center opacity-60">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-amber-300"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
              )}
              {step === 1 && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-4 rounded-full bg-gradient-to-r from-teal-400/30 to-transparent" />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 80%)',
                      'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {step === 3 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-12 h-12 text-emerald-400" />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Step indicators */}
      <div className="relative grid grid-cols-4 gap-2">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className={`relative p-3 rounded-xl text-center cursor-pointer transition-all duration-300 ${
              i === step
                ? 'bg-white shadow-lg border border-[#EDE5DD]'
                : 'bg-[#FDF8F3] hover:bg-white'
            }`}
            onClick={() => setStep(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full mx-auto mb-2 ${s.color}`}
              animate={i === step ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5, repeat: i === step ? Infinity : 0 }}
            />
            <p className="text-xs font-medium text-foreground">{s.label}</p>
            <p className="text-[10px] text-foreground-secondary mt-0.5 hidden sm:block">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Floating bubbles background decoration
function FloatingBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-cyan-200/30 to-teal-200/30"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

export default function DentalHygienePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] bg-gradient-to-br from-[#FDF8F3] via-white to-[#E8F5F3] overflow-hidden flex items-center"
      >
        {/* Animated background elements */}
        <FloatingBubbles />

        {/* Decorative gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-100/50 to-teal-100/50"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#722F37]/10 to-transparent"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />

          {/* Wave pattern */}
          <svg className="absolute bottom-0 left-0 right-0 w-full h-32 text-white" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z"
              fill="currentColor"
              initial={{ d: "M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z" }}
              animate={{
                d: [
                  "M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z",
                  "M0,60 C200,20 400,80 600,40 C800,0 1000,80 1200,40 C1300,60 1400,40 1440,60 L1440,100 L0,100 Z",
                  "M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 text-teal-700 text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Professional Hygiene Care
              </motion.span>

              <h1 className="font-display font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="block"
                >
                  Fresh, Clean
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="block bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] bg-clip-text text-transparent"
                >
                  Healthy Smile
                </motion.span>
              </h1>

              <motion.p
                className="mt-6 text-xl text-foreground-secondary max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Professional cleaning, deep cleaning (scaling and root planing), and personalized
                periodontal maintenance to keep your teeth and gums healthy for life.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link href="/contact#book">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                    className="group"
                  >
                    <span>Book Cleaning</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-xl"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </Link>
                <motion.a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white text-[#722F37] border-2 border-[#EDE5DD] hover:border-[#722F37]/30 hover:bg-[#FDF8F3] transition-all duration-200 shadow-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
                </motion.a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {[
                  'CDCP Accepted',
                  'Direct Insurance Billing',
                  'Gentle, Experienced Hygienists',
                ].map((item, i) => (
                  <motion.span
                    key={item}
                    className="inline-flex items-center gap-2 text-sm text-foreground-secondary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    </motion.div>
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/hygiene/hygiene-01.jpg"
                  alt="Professional dental hygiene cleaning at Ottawa South Dental"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 border border-[#EDE5DD]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Droplets className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-bold text-lg text-foreground">20+ Years</p>
                    <p className="text-sm text-foreground-secondary">Expert Care</p>
                  </div>
                </div>
              </motion.div>

              {/* Second floating element */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-br from-[#722F37] to-[#5a252c] rounded-2xl shadow-xl p-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Oral Health Statistics Section */}
      <SectionContainer background="white" paddingY="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Important Facts
          </span>
          <Heading variant="section-title" align="center">
            Why Dental Hygiene Matters
          </Heading>
          <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
            Understanding the importance of professional dental hygiene can help you maintain optimal oral health
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {oralHealthStats.map((stat, index) => (
            <AnimatedStatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </SectionContainer>

      {/* Service Description Section with Cleaning Visualization */}
      <SectionContainer background="secondary" paddingY="lg">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Heading
            variant="section-title"
            align="center"
            subtitle="Our comprehensive dental hygiene services help you maintain optimal oral health and a beautiful smile"
          >
            What We Offer
          </Heading>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Cleaning Visualization */}
          <CleaningVisualization />

          {/* Services list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-soft border border-[#EDE5DD]"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="font-display font-semibold text-xl text-foreground">
                Our Hygiene Services Include
              </h3>
            </div>

            <ul className="space-y-3">
              {hygieneServices.map((service, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setActiveHoverIndex(index)}
                  onMouseLeave={() => setActiveHoverIndex(null)}
                >
                  <motion.div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                      activeHoverIndex === index
                        ? 'bg-gradient-to-br from-[#722F37] to-[#5a252c]'
                        : 'bg-[#722F37]/10'
                    }`}
                    animate={activeHoverIndex === index ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 transition-colors duration-300 ${
                      activeHoverIndex === index ? 'text-white' : 'text-[#722F37]'
                    }`} />
                  </motion.div>
                  <span className={`text-foreground-secondary group-hover:text-foreground transition-colors duration-300 ${
                    activeHoverIndex === index ? 'font-medium' : ''
                  }`}>
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-6 pt-6 border-t border-[#EDE5DD] flex items-center gap-2 text-sm text-[#722F37] font-medium cursor-pointer group"
              whileHover={{ x: 5 }}
            >
              <Info className="w-4 h-4" />
              <span>Learn more about each service</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Benefits Section */}
      <SectionContainer background="white" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Regular professional dental hygiene appointments offer benefits that extend far beyond a clean smile"
        >
          Why Regular Cleanings Matter
        </Heading>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </SectionContainer>

      {/* Process Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
                <Clock className="w-4 h-4" />
                45-60 Minutes
              </span>
              <Heading
                variant="section-title"
                subtitle="Our gentle, thorough cleaning process ensures you leave with a fresh, healthy smile"
              >
                What to Expect
              </Heading>
            </motion.div>

            <motion.div
              className="mt-8 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/images/hygiene/hygiene-05.jpg"
                alt="Dental hygienist performing professional teeth cleaning"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Progress indicator overlay */}
              {processSteps[activeProcessStep] && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-foreground">
                          Step {activeProcessStep + 1}: {processSteps[activeProcessStep].title}
                        </span>
                        <span className="text-foreground-secondary">
                          {processSteps[activeProcessStep].duration}
                        </span>
                      </div>
                      <div className="h-2 bg-[#EDE5DD] rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${processSteps[activeProcessStep].color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${((activeProcessStep + 1) / processSteps.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-0">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                step={step}
                index={index}
                activeStep={activeProcessStep}
                setActiveStep={setActiveProcessStep}
              />
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Hygiene Routine Tips Section */}
      <SectionContainer background="white" paddingY="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Daily Care Guide
          </span>
          <Heading
            variant="section-title"
            align="center"
            subtitle="Follow these essential tips throughout your day to maintain optimal oral health between professional visits"
          >
            Your Daily Hygiene Routine
          </Heading>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {hygieneRoutineTips.map((routine, index) => (
            <HygieneRoutineCard key={index} routine={routine} index={index} />
          ))}
        </div>

        {/* Pro tip callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-br from-[#722F37] to-[#5a252c] rounded-2xl p-8 text-white text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          <h3 className="font-display font-semibold text-2xl mb-2">
            Pro Tip: Replace Your Toothbrush Every 3 Months
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            A worn toothbrush is less effective at removing plaque. Set a reminder to replace yours regularly,
            or sooner if the bristles become frayed.
          </p>
        </motion.div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Find answers to common questions about our dental hygiene services"
        >
          Frequently Asked Questions
        </Heading>

        <motion.div
          className="mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FAQAccordion items={faqs} />
        </motion.div>
      </SectionContainer>

      {/* Related Services Section */}
      <SectionContainer background="white" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Complete your oral health care with these complementary services"
        >
          Related Services
        </Heading>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {relatedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="group block bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2"
                >
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-[#722F37]/10 flex items-center justify-center mb-5 group-hover:bg-[#722F37] transition-colors duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-7 h-7 text-[#722F37] group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-[#722F37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-[#722F37]">
                    Learn more
                    <motion.div
                      className="ml-1"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <ContactCtaBanner
        variant="full"
        background="gradient"
        headline="Ready for Your Professional Cleaning?"
        description="Book your dental hygiene appointment today and experience the difference professional care makes. Our gentle hygienists are here to help you achieve your healthiest smile."
        phoneNumber={contactInfo.phone}
        showEmergency={false}
        showHours={true}
        showLocation={true}
        showLanguages={true}
        bookUrl="/contact#book"
        bookText="Book This Service"
      />
    </main>
  );
}
