'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  ShieldCheck,
  Droplets,
  Shield,
  GraduationCap,
  Apple,
  BadgeCheck,
  Moon,
  Heart,
  DollarSign,
  Smile,
  Clock,
  Sparkles,
  Stethoscope,
  ChevronDown,
  Check,
  ArrowRight,
  Target,
  TrendingUp,
  Award,
  Zap,
  Sun,
  Coffee,
  Utensils,
  Bed,
  Timer,
  AlertTriangle,
  CircleDollarSign,
  Milestone,
  Star,
  Play,
  CheckCircle2,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What are dental sealants and who can benefit from them?',
    answer:
      'Dental sealants are thin protective coatings applied to the chewing surfaces of back teeth (molars and premolars) to prevent cavities. They work by sealing the grooves and pits where food particles and bacteria often get trapped. While sealants are especially beneficial for children when their permanent molars come in, adults with deep grooves in their teeth can also benefit from this simple, painless preventive treatment.',
  },
  {
    question: 'How does professional fluoride treatment protect my teeth?',
    answer:
      "Professional fluoride treatments strengthen tooth enamel and help repair early stages of tooth decay before cavities form. The fluoride concentration in professional treatments is much higher than what's found in toothpaste or tap water, providing superior protection. We typically recommend fluoride treatments every 6 months during your regular dental visits, though some patients may benefit from more frequent applications.",
  },
  {
    question: 'How often should I visit for preventive care?',
    answer:
      "Most patients benefit from preventive dental visits every 6 months. However, the ideal frequency depends on your individual oral health needs. Patients with a history of cavities, gum disease, or other risk factors may need more frequent visits. During your examination, we'll assess your oral health and recommend a personalized preventive care schedule.",
  },
  {
    question: 'Do I need a custom mouthguard for sports?',
    answer:
      "If you or your child participates in any contact sports or activities with a risk of falls, a custom mouthguard is highly recommended. Custom-fitted mouthguards from your dentist provide significantly better protection than store-bought options because they're designed to fit your teeth precisely. They're more comfortable, stay in place better, and don't interfere with breathing or speaking.",
  },
  {
    question: 'What causes teeth grinding and how can a night guard help?',
    answer:
      'Teeth grinding (bruxism) is often caused by stress, anxiety, sleep disorders, or an abnormal bite. It can lead to worn teeth, jaw pain, headaches, and even cracked teeth. A custom night guard creates a protective barrier between your upper and lower teeth, preventing damage from grinding and clenching. It also helps relax jaw muscles and can reduce associated pain and discomfort.',
  },
];

const preventiveServices = [
  {
    icon: Droplets,
    title: 'Fluoride Treatments',
    description: 'Professional fluoride applications strengthen tooth enamel and help repair early stages of decay.',
    benefit: 'Cavity Prevention',
    effectiveness: 95,
  },
  {
    icon: Shield,
    title: 'Dental Sealants',
    description: 'Thin protective coatings applied to chewing surfaces of back teeth to prevent cavities.',
    benefit: 'Long-term Protection',
    effectiveness: 90,
  },
  {
    icon: GraduationCap,
    title: 'Oral Hygiene Education',
    description: 'Personalized instruction on proper brushing, flossing, and daily care techniques.',
    benefit: 'Better Habits',
    effectiveness: 100,
  },
  {
    icon: Apple,
    title: 'Nutritional Counseling',
    description: 'Expert guidance on diet choices that support healthy teeth and gums.',
    benefit: 'Holistic Health',
    effectiveness: 85,
  },
  {
    icon: BadgeCheck,
    title: 'Custom Mouthguards',
    description: 'Professional sports mouthguards designed to protect teeth during athletic activities.',
    benefit: 'Sports Safety',
    effectiveness: 98,
  },
  {
    icon: Moon,
    title: 'Night Guards',
    description: 'Custom-fitted guards to protect teeth from grinding and clenching during sleep.',
    benefit: 'Sleep Protection',
    effectiveness: 92,
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Reduced Risk of Cavities',
    description: 'Proactive treatments significantly lower your chance of developing tooth decay and gum disease.',
    stat: '75%',
    statLabel: 'Fewer Cavities',
  },
  {
    icon: Clock,
    title: 'Early Problem Detection',
    description: "Regular preventive visits catch issues early when they're easier and less costly to treat.",
    stat: '90%',
    statLabel: 'Early Detection',
  },
  {
    icon: DollarSign,
    title: 'Long-Term Savings',
    description: 'Investing in prevention saves money on extensive dental work down the road.',
    stat: '50%',
    statLabel: 'Cost Savings',
  },
  {
    icon: Smile,
    title: 'Healthier, Beautiful Smile',
    description: 'Maintain the natural beauty and health of your teeth for a lifetime.',
    stat: '100%',
    statLabel: 'Confidence',
  },
  {
    icon: Heart,
    title: 'Better Overall Health',
    description: 'Good oral health is linked to improved heart health and lower risk of systemic diseases.',
    stat: '40%',
    statLabel: 'Lower Risk',
  },
];

const dailyRoutineSteps = [
  {
    time: 'Morning',
    icon: Sun,
    title: 'Start Fresh',
    actions: [
      'Brush for 2 minutes with fluoride toothpaste',
      'Clean your tongue thoroughly',
      'Floss between all teeth',
      'Rinse with mouthwash',
    ],
    tip: 'Wait 30 minutes after eating before brushing',
    duration: '5 min',
  },
  {
    time: 'After Meals',
    icon: Utensils,
    title: 'Mid-Day Care',
    actions: [
      'Rinse mouth with water',
      'Use sugar-free gum to stimulate saliva',
      'Avoid frequent snacking',
      'Choose teeth-friendly snacks',
    ],
    tip: 'Crunchy fruits and vegetables help clean teeth naturally',
    duration: '2 min',
  },
  {
    time: 'Evening',
    icon: Moon,
    title: 'Night Routine',
    actions: [
      'Brush thoroughly before bed',
      'Floss to remove daily buildup',
      'Use fluoride mouthwash',
      'Wear night guard if prescribed',
    ],
    tip: 'Never skip nighttime brushing',
    duration: '5 min',
  },
];

const costComparison = [
  {
    category: 'Prevention',
    treatments: ['Regular Cleaning', 'Fluoride Treatment', 'Sealants'],
    avgCost: 150,
    frequency: '2x/year',
    annualCost: 300,
    color: '#22c55e',
    description: 'Routine preventive care',
  },
  {
    category: 'Minor Treatment',
    treatments: ['Filling', 'Minor Repair'],
    avgCost: 250,
    frequency: '1-2x/year',
    annualCost: 500,
    color: '#eab308',
    description: 'When prevention is skipped',
  },
  {
    category: 'Major Treatment',
    treatments: ['Root Canal', 'Crown', 'Extraction'],
    avgCost: 1500,
    frequency: 'As needed',
    annualCost: 3000,
    color: '#ef4444',
    description: 'Advanced decay treatment',
  },
];

const healthMilestones = [
  {
    age: '0-6',
    title: 'Early Childhood',
    milestones: [
      'First dental visit by age 1',
      'Establish brushing habits',
      'Fluoride varnish applications',
      'Monitor tooth development',
    ],
    icon: Star,
  },
  {
    age: '6-12',
    title: 'Transition Years',
    milestones: [
      'Sealants on permanent molars',
      'X-rays to check development',
      'Orthodontic evaluation',
      'Sports mouthguard fitting',
    ],
    icon: Target,
  },
  {
    age: '13-18',
    title: 'Adolescence',
    milestones: [
      'Wisdom teeth monitoring',
      'Periodontal health focus',
      'Whitening consultations',
      'Diet and oral health education',
    ],
    icon: Zap,
  },
  {
    age: '19-40',
    title: 'Adult Years',
    milestones: [
      'Regular professional cleanings',
      'Gum disease prevention',
      'Night guard if grinding',
      'Cosmetic considerations',
    ],
    icon: Award,
  },
  {
    age: '40+',
    title: 'Mature Adult',
    milestones: [
      'Oral cancer screenings',
      'Dry mouth management',
      'Restoration maintenance',
      'Bone health monitoring',
    ],
    icon: Heart,
  },
];

const relatedServices = [
  {
    icon: Sparkles,
    title: 'Dental Hygiene',
    description: 'Professional teeth cleaning to remove plaque and tartar for optimal oral health.',
    href: '/services/dental-hygiene',
  },
  {
    icon: Stethoscope,
    title: 'Routine Checkups',
    description: 'Comprehensive dental exams and checkups to maintain your oral health.',
    href: '/services/routine-checkups',
  },
  {
    icon: Heart,
    title: 'Gum Therapy',
    description: 'Specialized treatment for gum disease to restore your periodontal health.',
    href: '/services/gum-therapy',
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// MAGNETIC EFFECT HOOK
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
// ANIMATED SHIELD VISUALIZATION
// ============================================================================

function AnimatedShieldVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeLayer, setActiveLayer] = useState(0);

  const protectionLayers = [
    { name: 'Daily Brushing', color: '#22c55e', radius: 180 },
    { name: 'Flossing', color: '#3b82f6', radius: 150 },
    { name: 'Professional Cleaning', color: '#8b5cf6', radius: 120 },
    { name: 'Fluoride Treatment', color: '#ec4899', radius: 90 },
    { name: 'Dental Sealants', color: '#f59e0b', radius: 60 },
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveLayer((prev) => (prev + 1) % protectionLayers.length);
      }, 3000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isInView, protectionLayers.length]);

  return (
    <div ref={containerRef} className="relative h-[500px] flex items-center justify-center">
      {/* Central tooth */}
      <motion.div
        className="relative z-20 w-24 h-32 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        <div className="relative">
          {/* Tooth shape */}
          <div className="w-20 h-28 bg-gradient-to-b from-white via-neutral-100 to-neutral-200 rounded-t-full rounded-b-lg shadow-xl" />
          {/* Tooth roots */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-3 h-8 bg-gradient-to-b from-neutral-200 to-neutral-300 rounded-b-full" />
            <div className="w-3 h-6 bg-gradient-to-b from-neutral-200 to-neutral-300 rounded-b-full" />
          </div>
          {/* Sparkle */}
          <motion.div
            className="absolute top-4 right-2 w-4 h-4 text-white"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Protection layers */}
      {protectionLayers.map((layer, index) => (
        <motion.div
          key={layer.name}
          className="absolute rounded-full border-2"
          style={{
            width: layer.radius * 2,
            height: layer.radius * 2,
            borderColor: layer.color,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  scale: activeLayer >= index ? 1 : 0.8,
                  opacity: activeLayer >= index ? 0.6 : 0.2,
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            delay: index * 0.2,
            duration: 0.5,
            type: 'spring',
          }}
        >
          {/* Animated pulse */}
          {activeLayer === index && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ borderColor: layer.color }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}

      {/* Layer labels */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-3">
        {protectionLayers.map((layer, index) => (
          <motion.button
            key={layer.name}
            onClick={() => setActiveLayer(index)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeLayer === index
                ? 'bg-white shadow-lg scale-105'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: layer.color }}
            />
            <span className={`text-sm font-medium ${activeLayer === index ? 'text-[#1e293b]' : 'text-neutral-500'}`}>
              {layer.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE ORAL HEALTH ASSESSMENT
// ============================================================================

function OralHealthAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const questions: { question: string; weight: number }[] = [
    { question: 'Do you brush twice daily for at least 2 minutes?', weight: 20 },
    { question: 'Do you floss daily?', weight: 20 },
    { question: 'Have you visited a dentist in the last 6 months?', weight: 20 },
    { question: 'Do you limit sugary foods and drinks?', weight: 15 },
    { question: 'Do you use fluoride toothpaste?', weight: 15 },
    { question: 'Do you wear a mouthguard during sports?', weight: 10 },
  ];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      const q = questions[index];
      return score + (answer && q ? q.weight : 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { message: 'Excellent oral health habits!', color: '#22c55e', emoji: '🌟' };
    if (score >= 60) return { message: 'Good habits, room for improvement', color: '#eab308', emoji: '👍' };
    if (score >= 40) return { message: 'Some areas need attention', color: '#f97316', emoji: '⚠️' };
    return { message: "Let's build better habits together", color: '#ef4444', emoji: '💪' };
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100"
          >
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-neutral-500 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#722F37]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1e293b] mb-8">
                {questions[currentQuestion]?.question}
              </h3>

              <div className="flex justify-center gap-4">
                <motion.button
                  onClick={() => handleAnswer(true)}
                  className="px-12 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Yes
                </motion.button>
                <motion.button
                  onClick={() => handleAnswer(false)}
                  className="px-12 py-4 bg-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-300 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100 text-center"
          >
            {(() => {
              const score = calculateScore();
              const result = getScoreMessage(score);
              return (
                <>
                  <motion.div
                    className="text-6xl mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {result.emoji}
                  </motion.div>

                  <motion.div
                    className="relative w-40 h-40 mx-auto mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke={result.color}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={440}
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <motion.span
                          className="text-4xl font-bold"
                          style={{ color: result.color }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          {score}
                        </motion.span>
                        <span className="text-lg text-neutral-400">/100</span>
                      </div>
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-semibold text-[#1e293b] mb-4">
                    {result.message}
                  </h3>

                  <p className="text-neutral-500 mb-8">
                    Schedule a consultation to discuss personalized recommendations for your oral health journey.
                  </p>

                  <div className="flex justify-center gap-4">
                    <Link
                      href="/contact#book"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#722F37] text-white font-semibold rounded-xl hover:bg-[#8B3A42] transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                      Book Consultation
                    </Link>
                    <button
                      onClick={resetAssessment}
                      className="px-6 py-3 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
                    >
                      Retake Assessment
                    </button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// ANIMATED DAILY ROUTINE GUIDE
// ============================================================================

function DailyRoutineGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const currentStep = dailyRoutineSteps[activeStep]!;

  return (
    <div ref={containerRef}>
      {/* Timeline Navigation */}
      <div className="relative mb-12">
        <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full" />
        <motion.div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: isInView ? `${((activeStep + 1) / dailyRoutineSteps.length) * 100}%` : '0%' }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative flex justify-between">
          {dailyRoutineSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <motion.button
                key={step.time}
                onClick={() => setActiveStep(index)}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/30'
                      : isCompleted
                        ? 'bg-[#722F37]'
                        : 'bg-white border-2 border-neutral-200 hover:border-[#722F37]/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StepIcon
                    className={`w-7 h-7 ${isActive || isCompleted ? 'text-white' : 'text-neutral-400'}`}
                  />

                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#722F37]"
                      animate={{
                        scale: [1, 1.3, 1.3],
                        opacity: [0.5, 0, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <div className="mt-4 text-center">
                  <p className={`text-sm font-semibold ${isActive ? 'text-[#722F37]' : 'text-neutral-500'}`}>
                    {step.time}
                  </p>
                  <p className="text-xs text-neutral-400">{step.duration}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm"
        >
          <div className="grid lg:grid-cols-2">
            {/* Visual Side */}
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5] flex items-center justify-center p-8">
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {(() => {
                  const ActiveIcon = currentStep.icon;
                  return (
                    <div className="relative">
                      <motion.div
                        className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#722F37]/20 to-[#722F37]/5 flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(114, 47, 55, 0.2)',
                            '0 0 0 20px rgba(114, 47, 55, 0)',
                            '0 0 0 0 rgba(114, 47, 55, 0)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ActiveIcon className="w-16 h-16 text-[#722F37]" />
                      </motion.div>
                      <motion.div
                        className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                      >
                        <Timer className="w-6 h-6 text-[#722F37]" />
                      </motion.div>
                    </div>
                  );
                })()}
                <motion.p
                  className="mt-6 text-lg font-semibold text-[#1e293b]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentStep.title}
                </motion.p>
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium">
                  {currentStep.time}
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-sm font-medium">
                  {currentStep.duration}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-[#1e293b] mb-6">
                {currentStep.title}
              </h3>

              <div className="space-y-4 mb-6">
                {currentStep.actions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#722F37]" />
                    </div>
                    <span className="text-neutral-600">{action}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-xl bg-[#FDF8F3] border border-[#EDE5DD]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#722F37] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1e293b] text-sm">Pro Tip</p>
                    <p className="text-sm text-neutral-600">{currentStep.tip}</p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-100">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-[#722F37] hover:bg-[#722F37]/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(dailyRoutineSteps.length - 1, activeStep + 1))}
                  disabled={activeStep === dailyRoutineSteps.length - 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#722F37] text-white hover:bg-[#8B3A42] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// COST COMPARISON CHART
// ============================================================================

function CostComparisonChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxCost = Math.max(...costComparison.map((c) => c.annualCost));

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Chart */}
      <div className="relative bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm">
        <div className="flex items-end justify-around gap-8 h-80">
          {costComparison.map((item, index) => {
            const barHeight = (item.annualCost / maxCost) * 100;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={item.category}
                className="flex flex-col items-center flex-1 max-w-[200px]"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Cost label */}
                <motion.div
                  className="mb-4 text-center"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                >
                  <p className="text-3xl font-bold" style={{ color: item.color }}>
                    ${item.annualCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-neutral-500">per year</p>
                </motion.div>

                {/* Bar */}
                <div className="relative w-full h-48 bg-neutral-100 rounded-t-2xl overflow-hidden">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-t-2xl"
                    style={{ backgroundColor: item.color }}
                    initial={{ height: 0 }}
                    animate={{ height: isInView ? `${barHeight}%` : 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                  >
                    {/* Animated stripes for prevention */}
                    {index === 0 && (
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)',
                        }}
                        animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </motion.div>

                  {/* Treatments inside bar */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-end justify-center pb-4"
                      >
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                          {item.treatments.map((t, i) => (
                            <p key={i} className="text-xs text-neutral-700 whitespace-nowrap">
                              {t}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Category label */}
                <div className="mt-4 text-center">
                  <p className="font-semibold text-[#1e293b]">{item.category}</p>
                  <p className="text-xs text-neutral-500">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Savings callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1 }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center">
              <CircleDollarSign className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-[#1e293b]">
                Save up to $2,700 annually with preventive care
              </p>
              <p className="text-sm text-neutral-600">
                Investing in prevention costs 90% less than treating advanced dental problems
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-green-600">90%</p>
              <p className="text-sm text-green-600">Savings</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// HEALTH MILESTONES TIMELINE
// ============================================================================

function HealthMilestonesTimeline() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const currentMilestone = healthMilestones[activeMilestone]!;

  return (
    <div ref={containerRef}>
      {/* Age selector */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {healthMilestones.map((milestone, index) => (
          <motion.button
            key={milestone.age}
            onClick={() => setActiveMilestone(index)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeMilestone === index
                ? 'bg-[#722F37] text-white shadow-lg shadow-[#722F37]/25'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:border-[#722F37]/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold">{milestone.age}</span>
            <span className="ml-2 text-sm opacity-80">years</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMilestone}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm"
        >
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Info side */}
            <div className="lg:col-span-2 p-8 lg:p-12 bg-gradient-to-br from-[#722F37] to-[#5a252c]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {(() => {
                  const MilestoneIcon = currentMilestone.icon;
                  return (
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                      <MilestoneIcon className="w-8 h-8 text-white" />
                    </div>
                  );
                })()}
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
                  Ages {currentMilestone.age}
                </p>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {currentMilestone.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Key preventive care milestones for this life stage to ensure optimal oral health.
                </p>
              </motion.div>
            </div>

            {/* Milestones */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">
                Key Milestones
              </h4>
              <div className="space-y-4">
                {currentMilestone.milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#FDF8F3] hover:bg-[#F5EDE5] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <span className="text-[#1e293b] font-medium">{milestone}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8"
              >
                <Link
                  href="/contact#book"
                  className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
                >
                  Schedule age-appropriate care
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// SERVICES GRID WITH EFFECTIVENESS
// ============================================================================

function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={containerRef}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {preventiveServices.map((service, index) => {
        const ServiceIcon = service.icon;
        return (
          <motion.div
            key={service.title}
            variants={fadeInUp}
            className="group relative p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-500"
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ServiceIcon className="w-7 h-7 text-[#722F37]" />
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  {service.benefit}
                </span>
              </div>

              <h3 className="font-semibold text-lg text-[#1e293b] mb-2">{service.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Effectiveness bar */}
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-500">Effectiveness</span>
                  <span className="text-sm font-bold text-[#722F37]">{service.effectiveness}%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${service.effectiveness}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ============================================================================
// FAQ ACCORDION
// ============================================================================

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            variants={fadeInUp}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              isOpen
                ? 'border-[#722F37]/20 bg-white shadow-lg shadow-[#722F37]/5'
                : 'border-neutral-200 bg-white hover:border-[#722F37]/10'
            }`}
          >
            <motion.button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-inset"
              whileHover={{ backgroundColor: 'rgba(114, 47, 55, 0.02)' }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'bg-[#722F37]' : 'bg-neutral-100'
                  }`}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-sm font-semibold ${isOpen ? 'text-white' : 'text-neutral-500'}`}>
                    {index + 1}
                  </span>
                </motion.div>
                <span className="font-semibold text-[#1e293b] pr-4">{item.question}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChevronDown className="w-5 h-5 text-[#722F37]" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-14 text-neutral-600 leading-relaxed">{item.answer}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ============================================================================
// HERO SECTION
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

  const magnetic = useMagnetic(0.15);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]"
          style={{ y }}
        />

        {/* Animated protection rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#722F37]/5"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#722F37]/10"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#722F37]/15"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute top-20 left-[15%] w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <ShieldCheck className="w-6 h-6 text-green-600" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-[20%] w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
          animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <Droplets className="w-5 h-5 text-blue-600" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-[10%] w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center"
          animate={{ y: [-15, 15, -15], x: [5, -5, 5] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Sparkles className="w-7 h-7 text-purple-600" />
        </motion.div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #722F37 1px, transparent 1px), linear-gradient(to bottom, #722F37 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div style={{ opacity, scale }} className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <ol className="flex items-center gap-2 text-sm">
                  <li>
                    <Link href="/" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-neutral-300">/</li>
                  <li>
                    <Link href="/services" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                      Services
                    </Link>
                  </li>
                  <li className="text-neutral-300">/</li>
                  <li className="text-[#722F37] font-medium">Preventive Dentistry</li>
                </ol>
              </motion.nav>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-green-700">
                  Protection for Your Whole Family
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1e293b] tracking-tight leading-[1.1] mb-6"
              >
                Preventive{' '}
                <span className="relative">
                  <span className="relative z-10 text-[#722F37]">Dentistry</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-[#722F37]/10 -skew-x-3 rounded"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-xl"
              >
                Protect your smile before problems start. Our proactive preventive care
                services help keep your teeth healthy, strong, and beautiful for a lifetime.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  style={{ x: magnetic.x, y: magnetic.y }}
                  onMouseMove={magnetic.handleMouseMove}
                  onMouseLeave={magnetic.handleMouseLeave}
                >
                  <Link
                    href="/contact#book"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-[#722F37]/25"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <Calendar className="w-5 h-5" />
                    <span className="relative">Book This Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <a
                  href="tel:+16137336446"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl border-2 border-[#722F37]/20 hover:border-[#722F37]/40 hover:bg-[#FDF8F3] transition-all"
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-6446
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center gap-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1e293b]">75%</p>
                    <p className="text-sm text-neutral-500">Fewer Cavities</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1e293b]">50%</p>
                    <p className="text-sm text-neutral-500">Cost Savings</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 aspect-[4/3]">
                <Image
                  src="/images/hygiene/hygiene-05.jpg"
                  alt="Dental hygienist performing preventive care treatment"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1e293b]">90%</p>
                    <p className="text-sm text-neutral-500">Prevention Rate</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#722F37]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e293b]">All Ages</p>
                    <p className="text-xs text-neutral-500">Family Care</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PreventiveDentistryContent() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Grid */}
      <section className="relative py-24 bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Comprehensive Protection
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Our Preventive Services
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Comprehensive preventive care to protect your smile at every stage of life.
            </p>
          </motion.div>

          <ServicesGrid />
        </div>
      </section>

      {/* Protection Visualization */}
      <section className="relative py-24 bg-[#FDF8F3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Layers of Defense
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Your Prevention Shield
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Each layer of preventive care adds protection against dental problems.
            </p>
          </motion.div>

          <AnimatedShieldVisualization />
        </div>
      </section>

      {/* Daily Routine Guide */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Build Great Habits
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Your Daily Routine Guide
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Follow this simple routine for optimal oral health throughout the day.
            </p>
          </motion.div>

          <DailyRoutineGuide />
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="relative py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              Smart Investment
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Prevention vs. Treatment
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              See how preventive care saves you money in the long run.
            </p>
          </motion.div>

          <CostComparisonChart />
        </div>
      </section>

      {/* Oral Health Assessment */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Quick Assessment
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Check Your Oral Health Habits
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Take our quick assessment to see how your habits stack up.
            </p>
          </motion.div>

          <OralHealthAssessment />
        </div>
      </section>

      {/* Health Milestones */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Lifetime Care
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Dental Health Milestones
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Key preventive care milestones for every stage of life.
            </p>
          </motion.div>

          <HealthMilestonesTimeline />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Why Prevention Matters
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              The Benefits of Preventive Care
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Discover why investing in prevention is the smartest choice for your oral health.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="group relative p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <BenefitIcon className="w-7 h-7 text-[#722F37]" />
                    </div>

                    <h3 className="font-semibold text-lg text-[#1e293b] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      {benefit.description}
                    </p>

                    <div className="pt-4 border-t border-neutral-100">
                      <p className="text-2xl font-bold text-[#722F37]">{benefit.stat}</p>
                      <p className="text-xs text-neutral-400 uppercase tracking-wide">
                        {benefit.statLabel}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Find answers to frequently asked questions about preventive dentistry.
            </p>
          </motion.div>

          <FAQAccordion items={faqItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-500 mb-4">Still have questions? We&apos;re happy to help.</p>
            <a
              href="tel:+16137336446"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
            >
              <Phone className="w-5 h-5" />
              Call us at (613) 733-6446
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Complete Care
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Related Services
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Explore other services that complement your preventive care.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {relatedServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div key={service.title} variants={fadeInUp}>
                  <Link
                    href={service.href}
                    className="group block p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <ServiceIcon className="w-7 h-7 text-[#722F37]" />
                    </div>

                    <h3 className="font-semibold text-lg text-[#1e293b] mb-2 group-hover:text-[#722F37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-[#722F37] font-medium text-sm group-hover:gap-3 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]" />

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        {/* Animated protection rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-[600px] h-[600px] rounded-full border border-white/10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full border border-white/15"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(255, 255, 255, 0.2)',
                  '0 0 0 20px rgba(255, 255, 255, 0)',
                  '0 0 0 0 rgba(255, 255, 255, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShieldCheck className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Ready to Protect Your Smile?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Schedule your preventive care appointment today and take the first step
              toward a lifetime of healthy teeth. Our caring team is here to help your whole family.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact#book"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl hover:bg-neutral-100 transition-colors shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Book This Service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <a
                href="tel:+16137336446"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5" />
                (613) 733-6446
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
