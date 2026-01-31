'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Target,
  RotateCcw,
  Leaf,
  Ban,
  CircleDot,
  MoveHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// DATA
// ============================================================================

const warningSign = [
  { text: 'Red, swollen, or tender gums', icon: <AlertCircle className="w-4 h-4" />, severity: 'moderate' },
  { text: 'Bleeding when brushing or flossing', icon: <Droplets className="w-4 h-4" />, severity: 'early' },
  { text: 'Receding gums or longer-appearing teeth', icon: <TrendingDown className="w-4 h-4" />, severity: 'moderate' },
  { text: 'Persistent bad breath (halitosis)', icon: <AlertTriangle className="w-4 h-4" />, severity: 'early' },
  { text: 'Loose or shifting teeth', icon: <Activity className="w-4 h-4" />, severity: 'severe' },
  { text: 'Changes in your bite', icon: <Target className="w-4 h-4" />, severity: 'severe' },
  { text: 'Pus between teeth and gums', icon: <Thermometer className="w-4 h-4" />, severity: 'severe' },
  { text: 'Pain when chewing', icon: <Zap className="w-4 h-4" />, severity: 'moderate' },
];

const stages = [
  {
    stage: 'Healthy Gums',
    severity: 'Optimal',
    description: 'Pink, firm gums that fit snugly around teeth with no bleeding or inflammation. The foundation of a healthy smile.',
    color: 'emerald',
    progress: 100,
    reversible: true,
    indicators: ['No bleeding', 'Pink color', 'Firm texture'],
    icon: <Heart className="w-6 h-6" />,
  },
  {
    stage: 'Gingivitis',
    severity: 'Early Stage',
    description: 'Inflammation of the gums caused by plaque buildup. Gums may appear red, swollen, and bleed easily. This stage is fully reversible with proper treatment.',
    color: 'amber',
    progress: 70,
    reversible: true,
    indicators: ['Mild bleeding', 'Red, puffy gums', 'Slight inflammation'],
    icon: <AlertCircle className="w-6 h-6" />,
  },
  {
    stage: 'Periodontitis',
    severity: 'Moderate Stage',
    description: 'The infection spreads below the gum line, causing pockets to form between teeth and gums. Bone loss begins, but significant damage can be prevented.',
    color: 'orange',
    progress: 40,
    reversible: false,
    indicators: ['Deep pockets', 'Bone loss begins', 'Bad breath'],
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    stage: 'Advanced Periodontitis',
    severity: 'Severe Stage',
    description: 'Extensive bone and tissue destruction leads to loose teeth and potential tooth loss. Aggressive treatment is needed to save remaining teeth.',
    color: 'red',
    progress: 15,
    reversible: false,
    indicators: ['Severe bone loss', 'Loose teeth', 'Tooth loss risk'],
    icon: <Ban className="w-6 h-6" />,
  },
];

const riskFactors = [
  {
    title: 'Smoking & Tobacco',
    description: 'Tobacco use is one of the most significant risk factors for developing gum disease.',
    icon: <Ban className="w-6 h-6" />,
    riskLevel: 'high',
  },
  {
    title: 'Poor Oral Hygiene',
    description: 'Inconsistent brushing and flossing allows plaque to build up and harden into tartar.',
    icon: <RotateCcw className="w-6 h-6" />,
    riskLevel: 'high',
  },
  {
    title: 'Diabetes',
    description: 'Diabetes reduces the body\'s ability to fight infection, including gum infections.',
    icon: <Activity className="w-6 h-6" />,
    riskLevel: 'moderate',
  },
  {
    title: 'Genetics',
    description: 'Family history can make you more susceptible to gum disease even with good oral care.',
    icon: <HeartPulse className="w-6 h-6" />,
    riskLevel: 'moderate',
  },
  {
    title: 'Medications',
    description: 'Some medications reduce saliva flow, leaving the mouth more vulnerable to infection.',
    icon: <Syringe className="w-6 h-6" />,
    riskLevel: 'low',
  },
  {
    title: 'Stress',
    description: 'Chronic stress weakens the immune system, making it harder to fight off infections.',
    icon: <Zap className="w-6 h-6" />,
    riskLevel: 'low',
  },
];

const nonSurgicalTreatments = [
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Deep Cleaning (Scaling & Root Planing)',
    description: 'Thorough removal of plaque and tartar from below the gum line, followed by smoothing of tooth roots to help gums reattach.',
    duration: '1-2 visits',
    recovery: 'Minimal',
  },
  {
    icon: <Syringe className="w-6 h-6" />,
    title: 'Antibiotic Therapy',
    description: 'Targeted antimicrobial treatments, including medicated mouth rinses and locally applied antibiotics, to control bacterial infection.',
    duration: '2-4 weeks',
    recovery: 'None',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Improved Home Care Routine',
    description: 'Personalized oral hygiene instructions and guidance on proper brushing, flossing, and interdental cleaning techniques.',
    duration: 'Ongoing',
    recovery: 'None',
  },
];

const surgicalTreatments = [
  {
    icon: <Scissors className="w-6 h-6" />,
    title: 'Pocket Reduction Surgery',
    description: 'Reduces the depth of periodontal pockets by folding back gum tissue, removing bacteria, and securing the tissue in place.',
    duration: '1-3 hours',
    recovery: '1-2 weeks',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Gum Grafting',
    description: 'Transplants healthy gum tissue to cover exposed roots and restore gum coverage, reducing sensitivity and preventing further recession.',
    duration: '1-2 hours',
    recovery: '2-3 weeks',
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Bone Grafting',
    description: 'Rebuilds bone lost to periodontitis using natural or synthetic bone material to support teeth and prepare for implants.',
    duration: '1-2 hours',
    recovery: '3-6 months',
  },
];

const benefits = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Prevent Tooth Loss',
    description: 'Stop gum disease progression before it destroys the bone and tissue supporting your teeth.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Protect Overall Health',
    description: 'Reduce your risk of heart disease, diabetes complications, and other systemic conditions linked to gum disease.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Fresher Breath',
    description: 'Eliminate the bacteria and infection that cause persistent bad breath (halitosis).',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Early Intervention',
    description: 'Catch and treat gum disease early when treatment is simpler, more effective, and less invasive.',
  },
];

const preventionTips = [
  { title: 'Brush Twice Daily', description: 'Use fluoride toothpaste and a soft-bristled brush for 2 minutes', icon: <RotateCcw className="w-5 h-5" /> },
  { title: 'Floss Daily', description: 'Clean between teeth where your brush can\'t reach', icon: <Target className="w-5 h-5" /> },
  { title: 'Regular Checkups', description: 'Visit us every 6 months for professional cleaning and exams', icon: <Calendar className="w-5 h-5" /> },
  { title: 'Quit Tobacco', description: 'Tobacco use significantly increases your risk of gum disease', icon: <Ban className="w-5 h-5" /> },
  { title: 'Healthy Diet', description: 'Limit sugary foods and eat plenty of fruits and vegetables', icon: <Leaf className="w-5 h-5" /> },
  { title: 'Manage Stress', description: 'Chronic stress weakens your immune system', icon: <Heart className="w-5 h-5" /> },
];

const processSteps = [
  {
    step: '1',
    title: 'Comprehensive Evaluation',
    description: 'We measure pocket depths, assess bone loss, and evaluate the overall health of your gums to determine the stage of disease.',
    icon: <Stethoscope className="w-6 h-6" />,
  },
  {
    step: '2',
    title: 'Personalized Treatment Plan',
    description: 'Based on your evaluation, we create a customized treatment plan addressing your specific condition and goals.',
    icon: <Target className="w-6 h-6" />,
  },
  {
    step: '3',
    title: 'Active Treatment',
    description: 'We perform the recommended procedures, whether non-surgical deep cleaning or surgical intervention, to eliminate infection.',
    icon: <Activity className="w-6 h-6" />,
  },
  {
    step: '4',
    title: 'Ongoing Maintenance',
    description: 'Regular maintenance visits and home care guidance help you maintain results and prevent disease recurrence.',
    icon: <Shield className="w-6 h-6" />,
  },
];

const faqItems = [
  {
    question: 'Is gum disease reversible?',
    answer: 'Gingivitis, the early stage of gum disease, is fully reversible with proper professional treatment and improved home care. However, once gum disease progresses to periodontitis, the damage to bone and tissue cannot be fully reversed—but it can be managed effectively. Early intervention is key, which is why regular dental checkups are so important for catching gum disease in its earliest, most treatable stage.',
  },
  {
    question: 'How can I prevent gum disease?',
    answer: 'Prevention involves a combination of excellent home care and regular professional visits. Brush twice daily with fluoride toothpaste, floss daily to remove plaque between teeth, and use an antimicrobial mouthwash if recommended. Avoid tobacco products, eat a balanced diet, and manage conditions like diabetes that can increase your risk. Most importantly, visit us regularly for professional cleanings and checkups—we can remove hardened plaque (tartar) that brushing alone cannot.',
  },
  {
    question: 'What does gum therapy treatment involve?',
    answer: 'Treatment depends on the severity of your condition. For early gum disease, we typically start with scaling and root planing (deep cleaning), which removes bacteria and tartar from below the gum line and smooths the tooth roots. We may also prescribe antibiotics or antimicrobial rinses. For advanced cases, surgical options like pocket reduction, gum grafting, or bone grafting may be recommended. We\'ll create a personalized treatment plan based on your specific needs.',
  },
  {
    question: 'Is scaling and root planing painful?',
    answer: 'We prioritize your comfort during every procedure. Scaling and root planing is performed under local anesthesia, so you should not feel pain during the treatment. You may experience some sensitivity or mild discomfort for a few days afterward, which can be managed with over-the-counter pain relievers and saltwater rinses. Our team will provide detailed aftercare instructions and is always available to address any concerns.',
  },
  {
    question: 'How often will I need to come in for maintenance after gum therapy?',
    answer: 'After initial gum therapy, most patients require periodontal maintenance visits every 3 to 4 months rather than the standard 6-month cleaning schedule. These more frequent visits allow us to monitor your gum health closely, remove any new bacterial buildup, and catch any signs of disease recurrence early. Over time, if your gum health stabilizes, we may be able to extend the interval between visits.',
  },
];

const relatedServices = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Dental Hygiene',
    description: 'Professional teeth cleaning and periodontal maintenance to keep your gums healthy after treatment.',
    href: '/services/dental-hygiene',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Routine Checkups',
    description: 'Regular examinations to monitor your gum health and catch any early signs of disease recurrence.',
    href: '/services/routine-checkups',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Preventive Dentistry',
    description: 'Fluoride treatments and oral hygiene education to support your long-term gum health.',
    href: '/services/preventive-dentistry',
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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ============================================================================
// MAGNETIC BUTTON HOOK
// ============================================================================

function useMagnetic(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
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

// ============================================================================
// ANIMATED GUM HEALTH STAGES VISUALIZATION
// ============================================================================

function GumHealthVisualization() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentStage = stages[activeStage];

  const getColorClasses = (color: string, isActive: boolean): { bg: string; border: string; text: string; fill: string } => {
    const defaultColor = {
      bg: isActive ? 'bg-emerald-500' : 'bg-emerald-100',
      border: 'border-emerald-500',
      text: 'text-emerald-600',
      fill: 'bg-emerald-500',
    };

    const colorMap: Record<string, { bg: string; border: string; text: string; fill: string }> = {
      emerald: defaultColor,
      amber: {
        bg: isActive ? 'bg-amber-500' : 'bg-amber-100',
        border: 'border-amber-500',
        text: 'text-amber-600',
        fill: 'bg-amber-500',
      },
      orange: {
        bg: isActive ? 'bg-orange-500' : 'bg-orange-100',
        border: 'border-orange-500',
        text: 'text-orange-600',
        fill: 'bg-orange-500',
      },
      red: {
        bg: isActive ? 'bg-red-500' : 'bg-red-100',
        border: 'border-red-500',
        text: 'text-red-600',
        fill: 'bg-red-500',
      },
    };
    return colorMap[color] || defaultColor;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Stage Selector */}
      <div className="flex justify-center gap-4 mb-12">
        {stages.map((stage, index) => {
          const colors = getColorClasses(stage.color, index === activeStage);
          return (
            <motion.button
              key={stage.stage}
              onClick={() => {
                setActiveStage(index);
                setIsAutoPlaying(false);
              }}
              className={`relative group flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-300 ${
                index === activeStage
                  ? `${colors.bg} text-white shadow-lg`
                  : 'bg-white/50 hover:bg-white border border-neutral-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-xl ${index === activeStage ? 'bg-white/20' : colors.bg}`}>
                <div className={index === activeStage ? 'text-white' : colors.text}>
                  {stage.icon}
                </div>
              </div>
              <span className={`text-sm font-semibold ${index === activeStage ? 'text-white' : 'text-neutral-700'}`}>
                {stage.stage}
              </span>

              {/* Progress indicator */}
              {index === activeStage && isAutoPlaying && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-white/50 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                  key={activeStage}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Main Visualization */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Visual Representation */}
          <div className="relative">
            {/* Gum Health Meter */}
            <div className="relative bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-10 shadow-2xl border border-neutral-100">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#722F37]/5 to-transparent" />
              <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-500/5 to-transparent" />

              <div className="relative z-10">
                {/* Health Score Circle */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-48 h-48">
                    {/* Background circle */}
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="#f0f0f0"
                        strokeWidth="12"
                      />
                      <motion.circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke={
                          currentStage?.color === 'emerald' ? '#10b981' :
                          currentStage?.color === 'amber' ? '#f59e0b' :
                          currentStage?.color === 'orange' ? '#f97316' : '#ef4444'
                        }
                        strokeWidth="12"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: (currentStage?.progress ?? 0) / 100 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                          strokeDasharray: '553',
                          strokeDashoffset: '0',
                        }}
                      />
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        className={`text-5xl font-bold ${getColorClasses(currentStage?.color || 'emerald', true).text}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {currentStage?.progress ?? 0}%
                      </motion.span>
                      <span className="text-sm text-neutral-500 mt-1">Health Score</span>
                    </div>
                  </div>
                </div>

                {/* Indicators */}
                <div className="space-y-3">
                  {currentStage?.indicators.map((indicator, i) => (
                    <motion.div
                      key={indicator}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-neutral-100"
                    >
                      <CircleDot className={`w-5 h-5 ${getColorClasses(currentStage?.color || 'emerald', true).text}`} />
                      <span className="text-neutral-700 font-medium">{indicator}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Severity Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                getColorClasses(currentStage?.color || 'emerald', true).bg
              } text-white`}>
                {currentStage?.icon}
                {currentStage?.severity}
              </div>

              <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                {currentStage?.stage}
              </h3>

              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {currentStage?.description}
              </p>

              {/* Reversibility indicator */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${
                currentStage?.reversible ? 'bg-emerald-50 border border-emerald-200' : 'bg-orange-50 border border-orange-200'
              }`}>
                {currentStage?.reversible ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <div>
                      <span className="font-semibold text-emerald-800">Fully Reversible</span>
                      <p className="text-sm text-emerald-600">With proper treatment and home care</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <div>
                      <span className="font-semibold text-orange-800">Manageable, Not Reversible</span>
                      <p className="text-sm text-orange-600">Early intervention is crucial</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// INTERACTIVE SYMPTOM CHECKER
// ============================================================================

function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const toggleSymptom = (symptomText: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomText)
        ? prev.filter((s) => s !== symptomText)
        : [...prev, symptomText]
    );
    setShowResults(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'early': return 'border-amber-400 bg-amber-50';
      case 'moderate': return 'border-orange-400 bg-orange-50';
      case 'severe': return 'border-red-400 bg-red-50';
      default: return 'border-neutral-300 bg-neutral-50';
    }
  };

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

  return (
    <div ref={containerRef}>
      <motion.div
        className="grid md:grid-cols-2 gap-4 mb-8"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {warningSign.map((sign, index) => {
          const isSelected = selectedSymptoms.includes(sign.text);
          return (
            <motion.button
              key={sign.text}
              variants={fadeInUp}
              onClick={() => toggleSymptom(sign.text)}
              className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left group ${
                isSelected
                  ? `${getSeverityColor(sign.severity)} border-2`
                  : 'border-neutral-200 bg-white hover:border-[#722F37]/30 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Checkbox indicator */}
              <div className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? 'bg-[#722F37] border-[#722F37]'
                  : 'border-neutral-300 group-hover:border-[#722F37]'
              }`}>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`transition-colors duration-300 ${
                    isSelected ? 'text-[#722F37]' : 'text-neutral-400'
                  }`}>
                    {sign.icon}
                  </span>
                  <span className={`font-medium ${isSelected ? 'text-neutral-900' : 'text-neutral-700'}`}>
                    {sign.text}
                  </span>
                </div>
                <span className={`text-xs uppercase tracking-wider font-semibold ${
                  sign.severity === 'early' ? 'text-amber-600' :
                  sign.severity === 'moderate' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {sign.severity} warning sign
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`p-6 rounded-2xl border-2 ${
              getRiskLevel() === 'high'
                ? 'bg-red-50 border-red-300'
                : getRiskLevel() === 'moderate'
                ? 'bg-orange-50 border-orange-300'
                : 'bg-amber-50 border-amber-300'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${
                getRiskLevel() === 'high'
                  ? 'bg-red-500'
                  : getRiskLevel() === 'moderate'
                  ? 'bg-orange-500'
                  : 'bg-amber-500'
              }`}>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-neutral-900">
                  {getRiskLevel() === 'high'
                    ? 'High Risk - Seek Care Soon'
                    : getRiskLevel() === 'moderate'
                    ? 'Moderate Risk - Schedule an Appointment'
                    : 'Mild Risk - Monitor & Consult'
                  }
                </h4>
                <p className="text-neutral-600">
                  You selected {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <p className="text-neutral-700 mb-4">
              {getRiskLevel() === 'high'
                ? 'These symptoms suggest advanced gum disease. We strongly recommend scheduling a periodontal evaluation as soon as possible.'
                : getRiskLevel() === 'moderate'
                ? 'These symptoms may indicate developing gum disease. Early treatment can prevent progression and permanent damage.'
                : 'These symptoms are worth monitoring. Good oral hygiene and a checkup can help prevent problems from developing.'
              }
            </p>

            <Link href="/contact">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                Schedule Evaluation
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// ANIMATED RISK FACTORS
// ============================================================================

function RiskFactorsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'from-red-500 to-red-600';
      case 'moderate': return 'from-orange-500 to-orange-600';
      case 'low': return 'from-amber-500 to-amber-600';
      default: return 'from-neutral-500 to-neutral-600';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'moderate': return 'bg-orange-50 border-orange-200';
      case 'low': return 'bg-amber-50 border-amber-200';
      default: return 'bg-neutral-50 border-neutral-200';
    }
  };

  return (
    <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {riskFactors.map((factor, index) => (
        <motion.div
          key={factor.title}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`group relative p-6 rounded-2xl border-2 ${getRiskBg(factor.riskLevel)} hover:shadow-lg transition-all duration-300`}
          whileHover={{ y: -4 }}
        >
          {/* Risk level indicator */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRiskColor(factor.riskLevel)}`}>
            {factor.riskLevel.toUpperCase()} RISK
          </div>

          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getRiskColor(factor.riskLevel)} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {factor.icon}
          </div>

          <h3 className="text-xl font-bold text-neutral-900 mb-2">{factor.title}</h3>
          <p className="text-neutral-600 text-sm leading-relaxed">{factor.description}</p>

          {/* Animated bar */}
          <div className="mt-4 h-2 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${getRiskColor(factor.riskLevel)}`}
              initial={{ width: 0 }}
              animate={isInView ? {
                width: factor.riskLevel === 'high' ? '100%' :
                       factor.riskLevel === 'moderate' ? '66%' : '33%'
              } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// TREATMENT COMPARISON
// ============================================================================

function TreatmentComparison() {
  const [activeTab, setActiveTab] = useState<'non-surgical' | 'surgical'>('non-surgical');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const treatments = activeTab === 'non-surgical' ? nonSurgicalTreatments : surgicalTreatments;

  return (
    <div ref={containerRef}>
      {/* Tab Selector */}
      <div className="flex justify-center gap-4 mb-12">
        <motion.button
          onClick={() => setActiveTab('non-surgical')}
          className={`relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            activeTab === 'non-surgical'
              ? 'bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white shadow-lg shadow-[#722F37]/25'
              : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-[#722F37]/30'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Non-Surgical
          </span>
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('surgical')}
          className={`relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            activeTab === 'surgical'
              ? 'bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white shadow-lg shadow-[#722F37]/25'
              : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-[#722F37]/30'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Surgical
          </span>
        </motion.button>
      </div>

      {/* Treatment Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-3 gap-8"
        >
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border border-neutral-100 hover:shadow-2xl hover:border-[#722F37]/20 transition-all duration-500"
              whileHover={{ y: -8 }}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#722F37] via-[#8a3a44] to-[#722F37]" />

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center text-[#722F37] mb-6 group-hover:scale-110 group-hover:bg-[#722F37] group-hover:text-white transition-all duration-300">
                {treatment.icon}
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-3">{treatment.title}</h3>
              <p className="text-neutral-600 leading-relaxed mb-6">{treatment.description}</p>

              {/* Duration & Recovery */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration
                  </span>
                  <span className="text-sm font-semibold text-neutral-700">{treatment.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Recovery
                  </span>
                  <span className="text-sm font-semibold text-neutral-700">{treatment.recovery}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// PREVENTION TIPS CAROUSEL
// ============================================================================

function PreventionTipsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {preventionTips.map((tip, index) => (
        <motion.div
          key={tip.title}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative p-6 bg-white rounded-2xl border border-neutral-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -4 }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
            {tip.icon}
          </div>

          <h3 className="text-lg font-bold text-neutral-900 mb-2">{tip.title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{tip.description}</p>

          {/* Hover effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// ANIMATED TREATMENT PROCESS
// ============================================================================

function TreatmentProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 -translate-x-1/2">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#722F37] to-[#8a3a44] origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-24">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`relative grid grid-cols-2 gap-16 items-center ${
              index % 2 === 0 ? '' : 'direction-rtl'
            }`}
          >
            {/* Content */}
            <div className={index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16 order-2'}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                  index % 2 === 0
                    ? 'bg-[#722F37]/10 text-[#722F37]'
                    : 'bg-[#722F37]/10 text-[#722F37]'
                }`}
              >
                Step {step.step}
              </motion.div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">{step.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{step.description}</p>
            </div>

            {/* Icon Box */}
            <div className={index % 2 === 0 ? 'pl-16' : 'pr-16'}>
              <motion.div
                whileInView={{ scale: [0.8, 1], rotate: [10, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#722F37] to-[#8a3a44] flex items-center justify-center text-white shadow-2xl shadow-[#722F37]/25 mx-auto"
              >
                {step.icon}
              </motion.div>
            </div>

            {/* Center node */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#722F37] shadow-lg z-10"
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-1 rounded-full bg-[#722F37]" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
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

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fef9f6] via-[#fdf4ee] to-[#f5ebe3]" />

      {/* Floating organic shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(114,47,55,0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        {/* Decorative leaf/healing elements */}
        <motion.div
          className="absolute top-32 left-20 w-24 h-24 opacity-10"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Leaf className="w-full h-full text-emerald-600" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-32 w-20 h-20 opacity-10"
          animate={{ rotate: [0, -15, 15, 0], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        >
          <Heart className="w-full h-full text-[#722F37]" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center"
        style={{ opacity, scale }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <ol className="flex items-center gap-2 text-sm text-neutral-500">
                  <li><Link href="/" className="hover:text-[#722F37] transition-colors">Home</Link></li>
                  <li>/</li>
                  <li><Link href="/services" className="hover:text-[#722F37] transition-colors">Services</Link></li>
                  <li>/</li>
                  <li className="text-[#722F37] font-medium">Gum Therapy</li>
                </ol>
              </motion.nav>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-semibold mb-8"
              >
                <HeartPulse className="w-4 h-4" />
                <span>Periodontal Health & Healing</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-neutral-900 leading-[0.95] tracking-tight mb-8"
              >
                Gum
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] via-[#8a3a44] to-emerald-600">
                  Therapy
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl text-neutral-600 leading-relaxed max-w-xl mb-12"
              >
                Restore your gum health with expert periodontal treatment. From early gingivitis to
                advanced periodontitis, our comprehensive gum therapy programs help you protect your
                teeth and maintain a healthy smile for life.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link href="/book">
                  <motion.button
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-full font-semibold text-lg overflow-hidden shadow-lg shadow-[#722F37]/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Book Evaluation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#8a3a44] to-[#722F37]"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>

                <a
                  href={phoneHref}
                  className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-700 rounded-full font-semibold text-lg hover:border-[#722F37]/30 hover:text-[#722F37] transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {formattedPhone}
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-6 mt-12"
              >
                {['Gentle Care', 'Personalized Plans', 'Ongoing Support'].map((text, i) => (
                  <span key={text} className="flex items-center gap-2 text-sm text-neutral-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-200/30 via-[#722F37]/10 to-amber-200/30 rounded-[3rem] blur-2xl" />

              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hygiene/hygiene-03.jpg"
                  alt="Professional gum therapy treatment at Ottawa South Dental"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Floating health indicator */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-sm text-neutral-500">Our Goal</span>
                      <p className="font-semibold text-neutral-900">Restore Your Gum Health</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-neutral-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to Learn More</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function GumTherapyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Gum Health Stages Visualization */}
      <section className="py-32 bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              Understanding Gum Health
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Stages of <span className="text-[#722F37]">Gum Disease</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              Understanding the progression of gum disease helps you take action at the right time.
              The earlier we intervene, the better your outcomes.
            </p>
          </motion.div>

          <GumHealthVisualization />
        </div>
      </section>

      {/* Interactive Symptom Checker */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-red-600 text-sm font-semibold tracking-widest uppercase mb-4">
              Self Assessment
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Warning <span className="text-[#722F37]">Signs</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              Select any symptoms you're experiencing. This interactive tool helps you understand
              when it's time to seek professional care.
            </p>
          </motion.div>

          <SymptomChecker />
        </div>
      </section>

      {/* Risk Factors */}
      <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-orange-600 text-sm font-semibold tracking-widest uppercase mb-4">
              Know Your Risks
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Risk <span className="text-[#722F37]">Factors</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              Understanding what increases your risk of gum disease helps you take preventive action
              and make informed decisions about your oral health.
            </p>
          </motion.div>

          <RiskFactorsSection />
        </div>
      </section>

      {/* Treatment Options */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              Treatment Options
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Tailored <span className="text-[#722F37]">Treatment Plans</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              We offer a comprehensive range of treatments tailored to your specific condition,
              from conservative non-surgical approaches to advanced surgical solutions.
            </p>
          </motion.div>

          <TreatmentComparison />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-200/30 to-[#722F37]/10 rounded-[3rem] blur-2xl" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hygiene/hygiene-15.jpg"
                  alt="Happy patient after successful gum therapy"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
                Benefits
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 leading-tight mb-8">
                Why Choose
                <br />
                <span className="text-[#722F37]">Gum Therapy?</span>
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-10">
                Treating gum disease is not just about your oral health—it's an investment in your
                overall wellbeing. Healthy gums support healthy teeth and a healthier body.
              </p>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="flex gap-5"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] text-[#722F37] flex items-center justify-center shadow-sm">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900">{benefit.title}</h3>
                      <p className="text-neutral-600 text-sm mt-1 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              Your Journey
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              What to <span className="text-[#722F37]">Expect</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              Our gum therapy process is designed to be thorough yet comfortable,
              with clear communication at every step.
            </p>
          </motion.div>

          <TreatmentProcess />
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-32 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-4">
              Prevention
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Keep Your Gums <span className="text-emerald-600">Healthy</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              The best treatment is prevention. Follow these tips to maintain healthy gums
              and reduce your risk of gum disease.
            </p>
          </motion.div>

          <PreventionTipsSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              Common Questions
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Frequently Asked <span className="text-[#722F37]">Questions</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg">
              Get answers to common questions about gum therapy and periodontal treatment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FAQAccordion items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              Explore More
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Related <span className="text-[#722F37]">Services</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              Explore other services that complement your gum therapy treatment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link href={service.href} className="group block">
                  <div className="relative p-8 bg-white rounded-3xl shadow-lg border border-neutral-100 hover:shadow-2xl hover:border-[#722F37]/20 transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center text-[#722F37] mb-6 group-hover:bg-[#722F37] group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-[#722F37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed mb-4">{service.description}</p>

                    <span className="inline-flex items-center gap-2 text-[#722F37] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactCtaBanner
        headline="Ready to Restore Your Gum Health?"
        description="Do not let gum disease compromise your smile or your health. Schedule your comprehensive periodontal evaluation today and take the first step toward healthier gums."
        bookText="Book This Service"
        background="gradient"
      />
    </main>
  );
}
