'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Stethoscope,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  CalendarCheck,
  Eye,
  Activity,
  Heart,
  Sparkles,
  Timer,
  Target,
  Search,
  FileText,
  Scan,
  Smile,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  Sun,
  Moon,
  Coffee,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Brain,
  Bone,
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
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

// FAQ data
const faqs = [
  {
    question: 'How often should I have a dental checkup?',
    answer:
      'Most patients should visit the dentist every 6 months for a routine checkup and cleaning. However, some patients may need more frequent visits based on their oral health needs. Those with gum disease, a history of cavities, or certain medical conditions may benefit from visits every 3-4 months. During your visit, we\'ll recommend a schedule that\'s right for your individual situation.',
  },
  {
    question: 'What happens during a dental checkup?',
    answer:
      'During a checkup, your dentist will thoroughly examine your teeth, gums, and mouth for any signs of problems. We\'ll check for cavities and tooth decay, evaluate your bite and jaw alignment, screen for oral cancer, and review your oral hygiene habits. X-rays may be taken if necessary to detect hidden issues. You\'ll also receive a professional cleaning to remove plaque and tartar buildup.',
  },
  {
    question: 'Why are regular checkups important if my teeth feel fine?',
    answer:
      'Many dental problems don\'t cause pain in their early stages. Cavities, gum disease, and even oral cancer can develop without noticeable symptoms. Regular checkups allow us to catch these issues early when they\'re easier and less expensive to treat. Prevention is always better than cure, and routine visits help maintain your oral health before problems become serious.',
  },
  {
    question: 'What should I bring to my dental checkup?',
    answer:
      'Please bring your dental insurance information, a list of any medications you\'re currently taking, and any dental records if you\'re a new patient. If you have specific concerns or questions about your oral health, write them down so you don\'t forget to ask. Arriving a few minutes early allows time for any necessary paperwork.',
  },
  {
    question: 'Are dental checkups covered by insurance?',
    answer:
      'Most dental insurance plans cover preventive care, including routine checkups and cleanings, at 80-100%. Coverage typically includes two checkups per year. We\'re happy to help verify your coverage and explain your benefits. For patients without insurance, we offer affordable self-pay options and payment plans.',
  },
];

// Benefits data with early detection focus
const earlyDetectionBenefits = [
  {
    icon: Eye,
    title: 'Cavities & Decay',
    description: 'Detect cavities before they cause pain and require extensive treatment',
    earlyTreatment: 'Simple filling',
    lateTreatment: 'Root canal or extraction',
    savingsPercent: 85,
    color: 'from-cyan-400 to-teal-500',
  },
  {
    icon: Heart,
    title: 'Gum Disease',
    description: 'Catch gingivitis before it progresses to periodontitis',
    earlyTreatment: 'Deep cleaning',
    lateTreatment: 'Surgery & tooth loss',
    savingsPercent: 90,
    color: 'from-rose-400 to-pink-500',
  },
  {
    icon: Scan,
    title: 'Oral Cancer',
    description: 'Early screening when treatment success rates are highest',
    earlyTreatment: '84% survival rate',
    lateTreatment: '39% survival rate',
    savingsPercent: 45,
    color: 'from-violet-400 to-purple-500',
  },
  {
    icon: Bone,
    title: 'Bone Loss',
    description: 'Identify jawbone deterioration before it affects your teeth',
    earlyTreatment: 'Preventive care',
    lateTreatment: 'Bone grafts needed',
    savingsPercent: 75,
    color: 'from-amber-400 to-orange-500',
  },
];

// Checkup examination components
const examinationComponents = [
  {
    id: 'visual',
    icon: Search,
    title: 'Visual Examination',
    duration: '5-8 min',
    description: 'Thorough inspection of teeth, gums, tongue, and oral tissues for any abnormalities.',
    details: [
      'Check for visible decay or damage',
      'Examine gum color and texture',
      'Inspect tongue and soft tissues',
      'Look for signs of grinding or clenching',
    ],
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'xray',
    icon: Scan,
    title: 'Digital X-Rays',
    duration: '5-10 min',
    description: 'Low-radiation imaging to reveal hidden problems beneath the surface.',
    details: [
      'Detect cavities between teeth',
      'Check bone levels and density',
      'Identify impacted teeth',
      'Monitor existing restorations',
    ],
    color: 'from-violet-400 to-purple-500',
  },
  {
    id: 'periodontal',
    icon: Activity,
    title: 'Periodontal Assessment',
    duration: '5-7 min',
    description: 'Measurement of gum health and pocket depths around each tooth.',
    details: [
      'Measure gum pocket depths',
      'Check for bleeding or inflammation',
      'Assess gum recession',
      'Evaluate attachment levels',
    ],
    color: 'from-emerald-400 to-green-500',
  },
  {
    id: 'cancer',
    icon: Shield,
    title: 'Oral Cancer Screening',
    duration: '3-5 min',
    description: 'Careful examination of all oral tissues for early signs of cancer.',
    details: [
      'Inspect lips, cheeks, and palate',
      'Check lymph nodes',
      'Examine throat and tongue base',
      'Look for unusual lesions or patches',
    ],
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 'bite',
    icon: Target,
    title: 'Bite Analysis',
    duration: '3-5 min',
    description: 'Evaluation of how your teeth come together and jaw function.',
    details: [
      'Check jaw joint (TMJ) function',
      'Assess bite alignment',
      'Identify wear patterns',
      'Test jaw mobility',
    ],
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'consultation',
    icon: FileText,
    title: 'Treatment Planning',
    duration: '5-10 min',
    description: 'Discussion of findings and personalized recommendations.',
    details: [
      'Review examination results',
      'Discuss treatment options',
      'Create preventive care plan',
      'Answer all your questions',
    ],
    color: 'from-teal-400 to-cyan-500',
  },
];

// Appointment flexibility options
const appointmentOptions = [
  {
    icon: Sun,
    title: 'Morning',
    times: '9:00 AM - 12:00 PM',
    description: 'Start your day with a healthy smile',
    popular: false,
  },
  {
    icon: Coffee,
    title: 'Lunch Hour',
    times: '12:00 PM - 2:00 PM',
    description: 'Convenient during your break',
    popular: true,
  },
  {
    icon: Moon,
    title: 'Afternoon',
    times: '2:00 PM - 5:00 PM',
    description: 'After work or school',
    popular: false,
  },
];

// Health maintenance tips
const healthTips = [
  {
    icon: Sparkles,
    title: 'Brush Twice Daily',
    tip: 'Use fluoride toothpaste and brush for at least 2 minutes each time',
    frequency: 'Every morning & night',
  },
  {
    icon: Heart,
    title: 'Floss Daily',
    tip: 'Clean between teeth where your brush can\'t reach',
    frequency: 'Once per day',
  },
  {
    icon: Shield,
    title: 'Use Mouthwash',
    tip: 'An antiseptic rinse helps reduce bacteria and freshen breath',
    frequency: 'Once daily',
  },
  {
    icon: Zap,
    title: 'Limit Sugary Foods',
    tip: 'Reduce cavity-causing bacteria by limiting sugar intake',
    frequency: 'Ongoing',
  },
  {
    icon: TrendingUp,
    title: 'Stay Hydrated',
    tip: 'Water helps wash away food particles and maintain saliva production',
    frequency: '8 glasses daily',
  },
  {
    icon: Calendar,
    title: 'Regular Checkups',
    tip: 'Professional cleanings and exams every 6 months keep problems at bay',
    frequency: 'Twice yearly',
  },
];

// Related services
const relatedServices = [
  {
    title: 'Preventive Dentistry',
    description: 'Fluoride treatments, sealants, and other preventive services to protect your teeth.',
    href: '/services/preventive-dentistry',
    icon: Shield,
  },
  {
    title: 'Dental Hygiene',
    description: 'Professional cleanings and deep cleaning treatments for optimal gum health.',
    href: '/services/dental-hygiene',
    icon: Heart,
  },
  {
    title: 'White Fillings',
    description: 'Natural-looking composite fillings to restore teeth affected by decay.',
    href: '/services/white-fillings',
    icon: Check,
  },
];

// Frequency calculator data
const frequencyFactors = [
  { id: 'gumDisease', label: 'History of gum disease', months: -2, risk: 'high' },
  { id: 'cavities', label: 'Prone to cavities', months: -2, risk: 'high' },
  { id: 'smoking', label: 'Tobacco use', months: -3, risk: 'high' },
  { id: 'diabetes', label: 'Diabetes or other health conditions', months: -2, risk: 'medium' },
  { id: 'braces', label: 'Orthodontic treatment (braces/aligners)', months: -2, risk: 'medium' },
  { id: 'dry', label: 'Dry mouth or medications causing it', months: -1, risk: 'medium' },
];

// Magnetic hover effect hook
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

// Checkup frequency calculator component
function FrequencyCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const baseMonths = 6;
  const adjustedMonths = Math.max(
    3,
    baseMonths + Array.from(selectedFactors).reduce((acc, id) => {
      const factor = frequencyFactors.find((f) => f.id === id);
      return acc + (factor?.months || 0);
    }, 0)
  );

  const toggleFactor = (id: string) => {
    setSelectedFactors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    setShowResult(true);
  };

  const resetCalculator = () => {
    setSelectedFactors(new Set());
    setShowResult(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl p-8 lg:p-10 border border-[#EDE5DD] shadow-soft overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#722F37]/5"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-teal-100/50"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <CalendarCheck className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-display font-semibold text-2xl text-[#1e293b]">
                Checkup Frequency Calculator
              </h3>
              <p className="text-sm text-[#64748b]">Find your ideal visit schedule</p>
            </div>
          </div>
        </div>

        {selectedFactors.size > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={resetCalculator}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#722F37] bg-white rounded-lg border border-[#EDE5DD] hover:bg-[#FDF8F3] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        )}
      </div>

      {/* Risk factors */}
      <div className="relative space-y-3 mb-8">
        <p className="text-sm font-medium text-[#64748b] mb-4">
          Select any factors that apply to you:
        </p>
        {frequencyFactors.map((factor, index) => (
          <motion.button
            key={factor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleFactor(factor.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
              selectedFactors.has(factor.id)
                ? 'bg-[#722F37]/10 border-[#722F37]/30 shadow-sm'
                : 'bg-white border-[#EDE5DD] hover:border-[#722F37]/20 hover:bg-[#FDF8F3]/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  selectedFactors.has(factor.id)
                    ? 'bg-[#722F37] border-[#722F37]'
                    : 'border-[#EDE5DD]'
                }`}
                animate={selectedFactors.has(factor.id) ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {selectedFactors.has(factor.id) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </motion.div>
              <span
                className={`font-medium ${
                  selectedFactors.has(factor.id) ? 'text-[#722F37]' : 'text-[#1e293b]'
                }`}
              >
                {factor.label}
              </span>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                factor.risk === 'high'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {factor.risk === 'high' ? 'Higher risk' : 'Moderate risk'}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        <motion.div
          key={adjustedMonths}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative p-6 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#5a252c] text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Recommended frequency</p>
              <div className="flex items-baseline gap-2">
                <motion.span
                  className="text-5xl font-bold"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {adjustedMonths}
                </motion.span>
                <span className="text-xl text-white/80">months</span>
              </div>
              <p className="text-white/70 text-sm mt-2">
                {selectedFactors.size === 0
                  ? 'Standard recommendation for healthy patients'
                  : `Adjusted based on ${selectedFactors.size} risk factor${
                      selectedFactors.size > 1 ? 's' : ''
                    }`}
              </p>
            </div>

            <div className="w-24 h-24 relative">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 251' }}
                  animate={{
                    strokeDasharray: `${((6 - adjustedMonths + 3) / 3) * 251} 251`,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <CalendarCheck className="w-8 h-8 text-white/80" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span className="text-sm text-white/80">
              This is a general guideline. Your dentist will recommend the best schedule for you.
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// Animated walkthrough component
function WhatToExpectWalkthrough() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || !isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % examinationComponents.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, isInView]);

  const currentStep = examinationComponents[activeStep]!;
  const Icon = currentStep.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Main visualization */}
      <div className="relative bg-gradient-to-br from-[#FDF8F3] via-white to-[#E8F5F3] rounded-3xl p-8 lg:p-12 border border-[#EDE5DD] shadow-soft overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-[#722F37]/10"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Header with controls */}
        <div className="relative flex items-center justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-3">
              <Timer className="w-4 h-4" />
              45-60 minute appointment
            </span>
            <h3 className="font-display font-semibold text-2xl text-[#1e293b]">
              What to Expect During Your Checkup
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white border border-[#EDE5DD] flex items-center justify-center text-[#722F37] hover:bg-[#FDF8F3] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Step indicators */}
        <div className="relative flex items-center justify-between mb-10">
          {examinationComponents.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <motion.button
                key={step.id}
                onClick={() => {
                  setActiveStep(index);
                  setIsPlaying(false);
                }}
                className="relative flex flex-col items-center group"
                whileHover={{ scale: 1.05 }}
              >
                {/* Connecting line */}
                {index < examinationComponents.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-0.5 bg-[#EDE5DD]">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${step.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: isPast || isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                <motion.div
                  className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${step.color} shadow-lg`
                      : isPast
                        ? 'bg-[#722F37] shadow-sm'
                        : 'bg-white border-2 border-[#EDE5DD] group-hover:border-[#722F37]/30'
                  }`}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(114, 47, 55, 0.3)',
                            '0 0 0 8px rgba(114, 47, 55, 0)',
                            '0 0 0 0 rgba(114, 47, 55, 0)',
                          ],
                        }
                      : {}
                  }
                  transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
                >
                  <StepIcon
                    className={`w-5 h-5 ${
                      isActive || isPast ? 'text-white' : 'text-[#722F37]'
                    }`}
                  />
                </motion.div>

                <span
                  className={`mt-2 text-xs font-medium transition-colors ${
                    isActive ? 'text-[#722F37]' : 'text-[#64748b]'
                  }`}
                >
                  {index + 1}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Active step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Step info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-display font-semibold text-xl text-[#1e293b]">
                    {currentStep.title}
                  </h4>
                  <p className="text-sm text-[#722F37] font-medium">
                    <Timer className="w-3.5 h-3.5 inline mr-1" />
                    {currentStep.duration}
                  </p>
                </div>
              </div>

              <p className="text-[#64748b] leading-relaxed mb-6">{currentStep.description}</p>

              <ul className="space-y-3">
                {currentStep.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentStep.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.2, type: 'spring' }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                    <span className="text-[#64748b]">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Visual representation */}
            <div className="relative">
              <motion.div
                className="relative aspect-square max-w-[300px] mx-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-dashed border-[#722F37]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-dashed border-[#722F37]/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full border border-dashed border-[#722F37]/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center shadow-2xl`}
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Icon className="w-16 h-16 text-white" />
                  </motion.div>
                </div>

                {/* Floating step numbers */}
                {examinationComponents.map((_, i) => {
                  const angle = (i / examinationComponents.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 140;
                  const x = Math.cos(angle) * radius + 150;
                  const y = Math.sin(angle) * radius + 150;

                  return (
                    <motion.div
                      key={i}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        i === activeStep
                          ? 'bg-[#722F37] text-white scale-110'
                          : i < activeStep
                            ? 'bg-[#722F37]/80 text-white'
                            : 'bg-white text-[#722F37] border border-[#EDE5DD]'
                      }`}
                      style={{
                        left: x - 16,
                        top: y - 16,
                      }}
                      animate={
                        i === activeStep
                          ? {
                              scale: [1.1, 1.2, 1.1],
                            }
                          : {}
                      }
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {i + 1}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mt-8 pt-6 border-t border-[#EDE5DD]">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#64748b]">Checkup Progress</span>
            <span className="font-medium text-[#722F37]">
              Step {activeStep + 1} of {examinationComponents.length}
            </span>
          </div>
          <div className="h-2 bg-[#EDE5DD] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#722F37] to-[#8B3A42]"
              initial={{ width: 0 }}
              animate={{
                width: `${((activeStep + 1) / examinationComponents.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Early detection benefit card
function EarlyDetectionCard({
  benefit,
  index,
}: {
  benefit: (typeof earlyDetectionBenefits)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = benefit.icon;
  const savings = useAnimatedCounter(benefit.savingsPercent, 1500, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="relative h-full bg-white rounded-2xl p-6 shadow-soft border border-[#EDE5DD] overflow-hidden"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background gradient on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 transition-opacity duration-500`}
          animate={{ opacity: isHovered ? 0.05 : 0 }}
        />

        {/* Icon */}
        <div className="relative mb-5">
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}
            animate={isHovered ? { rotate: [0, -5, 5, 0], scale: 1.05 } : {}}
            transition={{ duration: 0.4 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <h4 className="font-display font-semibold text-lg text-[#1e293b] mb-2 group-hover:text-[#722F37] transition-colors">
          {benefit.title}
        </h4>
        <p className="text-[#64748b] text-sm leading-relaxed mb-4">{benefit.description}</p>

        {/* Comparison */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-[#64748b]">
              <span className="font-medium text-emerald-600">Early:</span> {benefit.earlyTreatment}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span className="text-[#64748b]">
              <span className="font-medium text-rose-600">Late:</span> {benefit.lateTreatment}
            </span>
          </div>
        </div>

        {/* Savings indicator */}
        <motion.div
          className="mt-5 pt-5 border-t border-[#EDE5DD]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748b]">Treatment cost savings</span>
            <span className="text-lg font-bold text-[#722F37]">{savings}%</span>
          </div>
          <div className="mt-2 h-2 bg-[#EDE5DD] rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${benefit.color}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${benefit.savingsPercent}%` } : {}}
              transition={{ duration: 1.5, delay: index * 0.1 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Health maintenance tip card
function HealthTipCard({ tip, index }: { tip: (typeof healthTips)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tip.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="relative bg-white rounded-xl p-5 shadow-soft border border-[#EDE5DD] overflow-hidden"
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative flex items-start gap-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center flex-shrink-0"
            animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#1e293b] mb-1 group-hover:text-[#722F37] transition-colors">
              {tip.title}
            </h4>
            <p className="text-sm text-[#64748b] leading-relaxed mb-2">{tip.tip}</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#722F37] bg-[#722F37]/10 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {tip.frequency}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Appointment option card
function AppointmentOptionCard({
  option,
  index,
}: {
  option: (typeof appointmentOptions)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = option.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`relative bg-white rounded-2xl p-6 shadow-soft border transition-all duration-300 ${
          option.popular ? 'border-[#722F37]/30' : 'border-[#EDE5DD]'
        }`}
        whileHover={{ y: -4, scale: 1.02 }}
      >
        {option.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="px-3 py-1 text-xs font-medium text-white bg-[#722F37] rounded-full shadow-md">
              Most Popular
            </span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <motion.div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              option.popular
                ? 'bg-gradient-to-br from-[#722F37] to-[#5a252c]'
                : 'bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD]'
            }`}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Icon className={`w-7 h-7 ${option.popular ? 'text-white' : 'text-[#722F37]'}`} />
          </motion.div>

          <div className="flex-1">
            <h4 className="font-semibold text-lg text-[#1e293b]">{option.title}</h4>
            <p className="text-sm text-[#722F37] font-medium">{option.times}</p>
            <p className="text-sm text-[#64748b] mt-1">{option.description}</p>
          </div>

          <ChevronRight className="w-5 h-5 text-[#722F37]" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Floating bubbles background
function FloatingBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-[#722F37]/10 to-teal-200/20"
          style={{
            width: Math.random() * 80 + 40,
            height: Math.random() * 80 + 40,
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

export default function RoutineCheckupsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-teal-100/50 to-cyan-100/50"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#722F37]/10 to-transparent"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />

          {/* Wave pattern */}
          <svg
            className="absolute bottom-0 left-0 right-0 w-full h-32 text-white"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z"
              fill="currentColor"
              animate={{
                d: [
                  'M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z',
                  'M0,60 C200,20 400,80 600,40 C800,0 1000,80 1200,40 C1300,60 1400,40 1440,60 L1440,100 L0,100 Z',
                  'M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1400,25 1440,50 L1440,100 L0,100 Z',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
              {/* Breadcrumb */}
              <nav className="mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-[#64748b] hover:text-[#722F37] transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="text-[#64748b]">/</li>
                  <li>
                    <Link
                      href="/services"
                      className="text-[#64748b] hover:text-[#722F37] transition-colors"
                    >
                      Services
                    </Link>
                  </li>
                  <li className="text-[#64748b]">/</li>
                  <li className="text-[#722F37] font-medium">Routine Checkups</li>
                </ol>
              </nav>

              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Smile className="w-4 h-4" />
                </motion.div>
                Preventive Care
              </motion.span>

              <h1 className="font-display font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl text-[#1e293b] leading-[1.1]">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="block"
                >
                  Routine
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="block bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] bg-clip-text text-transparent"
                >
                  Dental Checkups
                </motion.span>
              </h1>

              <motion.p
                className="mt-6 text-xl text-[#64748b] max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Regular dental examinations are the foundation of a healthy smile. Our
                comprehensive checkups help prevent problems before they start and catch
                issues early when they're easiest to treat.
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
                    <span>Book Your Checkup</span>
                  </Button>
                </Link>
                <motion.a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white text-[#722F37] border-2 border-[#EDE5DD] hover:border-[#722F37]/30 hover:bg-[#FDF8F3] transition-all duration-200 shadow-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-1312
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
                  'Every 6 Months Recommended',
                  'CDCP Accepted',
                  'Same-Day Available',
                ].map((item, i) => (
                  <motion.span
                    key={item}
                    className="inline-flex items-center gap-2 text-sm text-[#64748b]"
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
                  src="/images/hygiene/hygiene-03.jpg"
                  alt="Dentist performing a routine dental checkup examination"
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
                    <CalendarCheck className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-bold text-lg text-[#1e293b]">Every 6 Months</p>
                    <p className="text-sm text-[#64748b]">Recommended Frequency</p>
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
                <Stethoscope className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* What to Expect Walkthrough */}
      <SectionContainer background="white" paddingY="lg">
        <WhatToExpectWalkthrough />
      </SectionContainer>

      {/* Early Detection Benefits */}
      <SectionContainer background="secondary" paddingY="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4">
            <Eye className="w-4 h-4" />
            Early Detection Saves
          </span>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-[#1e293b] tracking-tight mb-4">
            Catch Problems Early
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            Regular checkups allow us to identify and treat issues before they become
            serious, saving you time, money, and discomfort.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {earlyDetectionBenefits.map((benefit, index) => (
            <EarlyDetectionCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </SectionContainer>

      {/* Frequency Calculator */}
      <SectionContainer background="white" paddingY="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              Personalized Recommendation
            </span>
            <h2 className="font-display font-semibold text-4xl text-[#1e293b] tracking-tight mb-4">
              How Often Should You Visit?
            </h2>
            <p className="text-[#64748b] text-lg mb-6">
              While most patients benefit from checkups every 6 months, your ideal
              frequency depends on individual factors. Use our calculator to get a
              personalized recommendation.
            </p>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hygiene/hygiene-08.jpg"
                alt="Dental professional explaining checkup findings to patient"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <FrequencyCalculator />
        </div>
      </SectionContainer>

      {/* Appointment Flexibility */}
      <SectionContainer background="secondary" paddingY="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            Flexible Scheduling
          </span>
          <h2 className="font-display font-semibold text-4xl text-[#1e293b] tracking-tight mb-4">
            Appointments That Fit Your Schedule
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            We offer convenient appointment times throughout the day to accommodate your
            busy lifestyle.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {appointmentOptions.map((option, index) => (
            <AppointmentOptionCard key={index} option={option} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link href="/contact#book">
            <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
              Book Your Preferred Time
            </Button>
          </Link>
        </motion.div>
      </SectionContainer>

      {/* Health Maintenance Tips */}
      <SectionContainer background="white" paddingY="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Between Visits
          </span>
          <h2 className="font-display font-semibold text-4xl text-[#1e293b] tracking-tight mb-4">
            Maintain Your Healthy Smile
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            Follow these essential tips between checkups to keep your teeth and gums
            healthy every day.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthTips.map((tip, index) => (
            <HealthTipCard key={index} tip={tip} index={index} />
          ))}
        </div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-semibold text-4xl text-[#1e293b] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#64748b] text-lg">
            Have questions about routine dental checkups? Find answers below.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FAQAccordion items={faqs} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-[#64748b] mb-4">Still have questions? We're happy to help.</p>
          <a
            href={`tel:${contactInfo.phone}`}
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
          >
            <Phone className="w-5 h-5" />
            Call us at (613) 733-1312
          </a>
        </motion.div>
      </SectionContainer>

      {/* Related Services */}
      <SectionContainer background="white" paddingY="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-semibold text-4xl text-[#1e293b] tracking-tight mb-4">
            Related Services
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            Explore other services that complement your routine dental care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
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
                  <h3 className="font-display font-semibold text-lg text-[#1e293b] mb-2 group-hover:text-[#722F37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-4">
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </SectionContainer>

      {/* CTA Section */}
      <ContactCtaBanner
        variant="full"
        background="gradient"
        headline="Ready for Your Next Checkup?"
        description="Don't wait until there's a problem. Schedule your routine checkup today and take the first step toward a lifetime of healthy smiles."
        phoneNumber={contactInfo.phone}
        showEmergency={true}
        emergencyMessage="Same-day emergency appointments available"
        showHours={true}
        showLocation={true}
        showLanguages={true}
        bookUrl="/contact#book"
        bookText="Book Your Appointment"
      />
    </main>
  );
}
