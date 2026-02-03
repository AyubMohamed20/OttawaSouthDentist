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
  Wine,
  Cigarette,
  Home,
  Building2,
  Timer,
  Smile,
  Eye,
  Award,
  TrendingUp,
  Droplets,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Lightbulb,
  ShieldCheck,
  CircleCheck,
  Gem,
  Flame,
  Brush,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  animate,
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
    question: 'How long does teeth whitening last?',
    answer:
      'Results typically last 1-3 years depending on your diet and lifestyle habits. Consuming staining substances like coffee, tea, red wine, and tobacco can shorten longevity. Touch-up treatments can extend and maintain your results over time.',
  },
  {
    question: 'Will whitening damage my teeth?',
    answer:
      'Professional teeth whitening performed by a dentist is safe and does not damage tooth enamel. Our Spa-Dent system is designed to minimize sensitivity while delivering effective results. We carefully assess your dental health before treatment to ensure whitening is appropriate for you.',
  },
  {
    question: 'Can everyone whiten their teeth?',
    answer:
      'Most people are excellent candidates for teeth whitening. However, it may not be suitable for those with certain dental conditions, such as severe sensitivity, gum disease, or restorations on front teeth. A consultation will determine if whitening is right for you and which approach would work best.',
  },
  {
    question: 'What is the difference between professional and store-bought whitening?',
    answer:
      'Professional whitening uses higher-concentration formulas supervised by a dentist for faster, more dramatic results. Our Spa-Dent system provides customized treatment tailored to your needs, whereas over-the-counter products offer lower concentrations with gradual, subtle results that may require frequent reapplication.',
  },
  {
    question: 'How can I maintain my whitening results?',
    answer:
      'To maintain your bright smile, avoid or limit staining foods and beverages (coffee, tea, red wine), refrain from smoking or tobacco use, maintain excellent oral hygiene with regular brushing and flossing, and consider periodic touch-up treatments as needed.',
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Instant Brightness',
    description: 'See dramatic results in a single 60-minute visit with our LED light-activated technology.',
    stat: '60',
    statLabel: 'Minutes',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Professional',
    description: 'Dentist-supervised treatment ensures optimal safety with professional-grade whitening agents.',
    stat: '100%',
    statLabel: 'Safe',
  },
  {
    icon: Heart,
    title: 'Minimal Sensitivity',
    description: 'Our Spa-Dent system is designed for maximum comfort with minimal tooth sensitivity.',
    stat: '95%',
    statLabel: 'Comfort Rate',
  },
  {
    icon: Sun,
    title: 'Long-Lasting Results',
    description: 'Enjoy your radiant smile for 1-3 years with proper care and occasional touch-ups.',
    stat: '1-3',
    statLabel: 'Years',
  },
];

const shadeGuide = [
  { shade: 'A1', brightness: 95, label: 'Brightest White', color: '#FEFEFE' },
  { shade: 'A2', brightness: 85, label: 'Natural White', color: '#F9F7F4' },
  { shade: 'A3', brightness: 70, label: 'Light Cream', color: '#F5F0E8' },
  { shade: 'A3.5', brightness: 55, label: 'Medium', color: '#EDE5D8' },
  { shade: 'A4', brightness: 40, label: 'Darker', color: '#E0D4C4' },
  { shade: 'B1', brightness: 90, label: 'Pearl White', color: '#FAFAF8' },
];

const treatmentOptions = [
  {
    type: 'In-Office',
    icon: Building2,
    duration: '60-90 mins',
    sessions: '1 visit',
    results: 'Immediate',
    shadeImprovement: '6-8 shades',
    description: 'Our premium Spa-Dent LED treatment delivers instant, dramatic results in a single comfortable visit.',
    features: [
      'Professional-strength whitening gel',
      'LED light activation technology',
      'Gum protection throughout',
      'Immediate visible results',
      'Custom-tailored treatment',
    ],
    recommended: true,
  },
  {
    type: 'Take-Home',
    icon: Home,
    duration: '30 mins/day',
    sessions: '2-3 weeks',
    results: 'Gradual',
    shadeImprovement: '4-6 shades',
    description: 'Custom-fitted trays with professional-grade gel for convenient whitening at your own pace.',
    features: [
      'Custom-molded trays',
      'Professional-grade gel',
      'Flexible schedule',
      'Great for maintenance',
      'Lower sensitivity option',
    ],
    recommended: false,
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation & Assessment',
    description: 'We examine your teeth and gums to ensure you are a good candidate and discuss your whitening goals.',
    duration: '15 min',
    icon: Eye,
  },
  {
    step: 2,
    title: 'Preparation & Protection',
    description: 'Your gums and soft tissues are carefully protected before the whitening gel is applied to your teeth.',
    duration: '10 min',
    icon: Shield,
  },
  {
    step: 3,
    title: 'LED Light Activation',
    description: 'The Spa-Dent dual-arch LED light activates the whitening gel, accelerating the brightening process.',
    duration: '30 min',
    icon: Lightbulb,
  },
  {
    step: 4,
    title: 'Reveal Your Radiant Smile',
    description: 'The gel is removed and you see your brighter, whiter smile—up to several shades lighter!',
    duration: '5 min',
    icon: Sparkles,
  },
];

const resultsTimeline = [
  { day: 0, label: 'Treatment Day', description: 'Initial brightening visible', improvement: 60 },
  { day: 1, label: 'Day 1', description: 'Full results settle in', improvement: 80 },
  { day: 7, label: 'Week 1', description: 'Optimal brightness achieved', improvement: 100 },
  { day: 30, label: 'Month 1', description: 'Maintained with care', improvement: 98 },
  { day: 180, label: '6 Months', description: 'Touch-up recommended', improvement: 90 },
  { day: 365, label: '1 Year', description: 'Results with maintenance', improvement: 85 },
];

const maintenanceTips = [
  {
    icon: Coffee,
    title: 'Limit Staining Beverages',
    description: 'Reduce coffee, tea, and red wine consumption, or use a straw.',
    impact: 'High',
  },
  {
    icon: Cigarette,
    title: 'Avoid Tobacco',
    description: 'Smoking and tobacco use can quickly reverse whitening results.',
    impact: 'Critical',
  },
  {
    icon: Droplets,
    title: 'Rinse After Meals',
    description: 'Swish water after eating or drinking to prevent staining.',
    impact: 'Medium',
  },
  {
    icon: Brush,
    title: 'Use Whitening Toothpaste',
    description: 'Maintain brightness with dentist-recommended whitening toothpaste.',
    impact: 'Medium',
  },
];

const lifestyleBenefits = [
  {
    title: 'Professional Confidence',
    description: 'Make a lasting impression in interviews, meetings, and presentations',
    icon: Award,
    image: '/images/services/teeth-whitening/confident-smile.jpg',
  },
  {
    title: 'Social Radiance',
    description: 'Smile freely at parties, dates, and social gatherings',
    icon: Heart,
    image: '/images/services/teeth-whitening/hero-smile.jpg',
  },
  {
    title: 'Photo-Ready Smile',
    description: 'Look your best in photos and on video calls',
    icon: Star,
    image: '/images/services/teeth-whitening/dentist-consultation.jpg',
  },
  {
    title: 'Self-Esteem Boost',
    description: 'Feel more confident and positive about your appearance',
    icon: TrendingUp,
    image: '/images/services/teeth-whitening/shade-guide.jpg',
  },
];

const relatedServices = [
  {
    title: 'Cosmetic Dentistry',
    description: 'Comprehensive smile makeover options including veneers and bonding.',
    href: '/services/cosmetic-dentistry',
    icon: Gem,
  },
  {
    title: 'Routine Checkups',
    description: 'Regular examinations to maintain your bright smile and oral health.',
    href: '/services/routine-checkups',
    icon: ShieldCheck,
  },
  {
    title: 'Dental Hygiene',
    description: 'Professional cleaning to keep your teeth healthy and bright.',
    href: '/services/dental-hygiene',
    icon: Sparkles,
  },
];

// ============================================================================
// HOOKS
// ============================================================================

function useCounter(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(start, end, {
      duration: duration / 1000,
      ease: 'easeOut',
      onUpdate: (value) => setCount(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, start, end, duration]);

  return { count, ref };
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
// SVG ILLUSTRATIONS
// ============================================================================

function ToothIllustration({ className = '', shade = '#FEFEFE' }: { className?: string; shade?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="toothFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={shade} />
          <stop offset="100%" stopColor={`${shade}DD`} />
        </linearGradient>
        <filter id="toothShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
        </filter>
      </defs>
      {/* Tooth crown */}
      <path
        d="M50 8 C25 8, 18 35, 20 55 C22 70, 28 82, 32 95 C35 105, 40 115, 43 125 C45 130, 48 132, 50 132 C52 132, 55 130, 57 125 C60 115, 65 105, 68 95 C72 82, 78 70, 80 55 C82 35, 75 8, 50 8"
        fill="url(#toothFill)"
        filter="url(#toothShadow)"
        stroke="rgba(0,0,0,0.05)"
        strokeWidth="0.5"
      />
      {/* Crown shine */}
      <ellipse cx="38" cy="40" rx="10" ry="18" fill="rgba(255,255,255,0.5)" />
      {/* Root division line hint */}
      <path
        d="M50 90 L50 120"
        stroke="rgba(0,0,0,0.03)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkleIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

function LEDLightIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ledGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="ledGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* LED device body */}
      <rect x="30" y="10" width="60" height="25" rx="8" fill="#374151" />
      {/* LED lights */}
      <motion.circle
        cx="45"
        cy="22"
        r="6"
        fill="url(#ledGradient)"
        filter="url(#ledGlow)"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="60"
        cy="22"
        r="6"
        fill="url(#ledGradient)"
        filter="url(#ledGlow)"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="75"
        cy="22"
        r="6"
        fill="url(#ledGradient)"
        filter="url(#ledGlow)"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      {/* Light rays */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={i}
          x1={40 + i * 10}
          y1="38"
          x2={35 + i * 12}
          y2="75"
          stroke="#FCD34D"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.4}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      {/* Teeth being whitened */}
      <rect x="35" y="75" width="50" height="20" rx="5" fill="#FEFEFE" stroke="#E5E7EB" strokeWidth="1" />
    </svg>
  );
}

function ShadeComparisonIllustration({ className = '' }: { className?: string }) {
  const shades = ['#E0D4C4', '#EDE5D8', '#F5F0E8', '#F9F7F4', '#FEFEFE'];

  return (
    <svg viewBox="0 0 200 80" className={className} aria-hidden="true">
      {shades.map((shade, i) => (
        <g key={i}>
          <rect
            x={10 + i * 38}
            y="10"
            width="32"
            height="50"
            rx="4"
            fill={shade}
            stroke="#D1D5DB"
            strokeWidth="1"
          />
          <text
            x={26 + i * 38}
            y="72"
            fontSize="8"
            fill="#6B7280"
            textAnchor="middle"
          >
            {i === 0 ? 'Before' : i === 4 ? 'After' : ''}
          </text>
        </g>
      ))}
      <motion.path
        d="M30 35 L170 35"
        stroke="#FCD34D"
        strokeWidth="2"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <polygon points="165,30 175,35 165,40" fill="#FCD34D" />
    </svg>
  );
}

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function RadiantOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0.04) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 50%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114, 47, 55, 0.06) 0%, transparent 60%)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function SparkleParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -30],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

function SunburstPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]" viewBox="0 0 400 400" aria-hidden="true">
        {[...Array(24)].map((_, i) => (
          <motion.line
            key={i}
            x1="200"
            y1="200"
            x2="200"
            y2="0"
            stroke="#FCD34D"
            strokeWidth="0.5"
            transform={`rotate(${i * 15} 200 200)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.05 }}
          />
        ))}
      </svg>
    </div>
  );
}

// ============================================================================
// SHADE TRANSFORMATION VISUALIZER
// ============================================================================

function ShadeTransformationVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentShade, setCurrentShade] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!isInView || !autoPlay) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentShade((prev) => {
        if (prev <= 0) {
          setAutoPlay(false);
          return 0;
        }
        return prev - 1;
      });
      setTimeout(() => setIsAnimating(false), 800);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView, autoPlay]);

  const handleShadeClick = (index: number) => {
    setAutoPlay(false);
    setIsAnimating(true);
    setCurrentShade(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative"
    >
      <motion.div variants={fadeInUp} className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            background: [
              `radial-gradient(circle at 50% 50%, ${shadeGuide[currentShade]?.color || '#FEFEFE'}20 0%, transparent 50%)`,
              `radial-gradient(circle at 50% 50%, ${shadeGuide[currentShade]?.color || '#FEFEFE'}30 0%, transparent 60%)`,
              `radial-gradient(circle at 50% 50%, ${shadeGuide[currentShade]?.color || '#FEFEFE'}20 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
          {/* Tooth Visualization */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-64">
              <motion.div
                animate={{ scale: isAnimating ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                <ToothIllustration
                  className="w-full h-full drop-shadow-2xl"
                  shade={shadeGuide[currentShade]?.color || '#FEFEFE'}
                />
              </motion.div>

              {/* Brightness indicator */}
              <motion.div
                className="absolute -right-4 top-1/2 -translate-y-1/2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 bg-amber-400/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 text-sm font-semibold">
                    {shadeGuide[currentShade]?.brightness || 0}%
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Current Shade Label */}
            <motion.div
              key={currentShade}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <p className="text-amber-400 text-sm font-medium tracking-wider uppercase">Current Shade</p>
              <p className="text-white text-3xl font-bold mt-1">{shadeGuide[currentShade]?.shade || 'A1'}</p>
              <p className="text-neutral-400 text-sm mt-1">{shadeGuide[currentShade]?.label || 'Brightest White'}</p>
            </motion.div>
          </div>

          {/* Shade Guide */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <Gem className="w-5 h-5 text-amber-400" />
              Shade Guide
            </h4>
            <div className="space-y-3">
              {shadeGuide.map((shade, index) => (
                <motion.button
                  key={shade.shade}
                  onClick={() => handleShadeClick(index)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                    currentShade === index
                      ? 'bg-white/10 ring-2 ring-amber-400/50'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg shadow-inner border border-white/20"
                    style={{ backgroundColor: shade.color }}
                  />
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium">{shade.shade}</p>
                    <p className="text-neutral-400 text-sm">{shade.label}</p>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${shade.brightness}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => {
                setAutoPlay(!autoPlay);
                if (!autoPlay) setCurrentShade(4);
              }}
              className="mt-6 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm">{autoPlay ? 'Pause Animation' : 'Watch Transformation'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// BEFORE/AFTER COMPARISON SLIDER
// ============================================================================

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={sliderPosition}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <Image
          src="/images/services/teeth-whitening/hero-smile.jpg"
          alt="After professional teeth whitening - bright radiant smile"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-[#722F37] font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> After
          </span>
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src="/images/services/teeth-whitening/shade-guide.jpg"
          alt="Before teeth whitening - natural tooth shade"
          fill
          className="object-cover"
          style={{ filter: 'sepia(15%) saturate(85%)' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 bg-neutral-900/80 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white font-semibold">Before</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex items-center gap-0.5">
            <ChevronLeft className="w-4 h-4 text-[#722F37]" />
            <ChevronRight className="w-4 h-4 text-[#722F37]" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: sliderPosition === 50 ? 1 : 0 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 pointer-events-none"
      >
        <p className="text-white text-sm font-medium">Drag to compare</p>
      </motion.div>
    </div>
  );
}

// ============================================================================
// TREATMENT OPTIONS COMPARISON
// ============================================================================

function TreatmentOptionsComparison() {
  const [selectedOption, setSelectedOption] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {/* Option Tabs */}
      <motion.div variants={fadeInUp} className="flex justify-center gap-4 mb-12">
        {treatmentOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.type}
              onClick={() => setSelectedOption(index)}
              className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                selectedOption === index
                  ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white shadow-lg shadow-[#722F37]/25'
                  : 'bg-white text-neutral-700 hover:bg-[#FDF8F3] border border-neutral-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                {option.type}
              </span>
              {option.recommended && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Best
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Option Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedOption}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Stats */}
          <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl p-8 border border-[#EDE5DD]">
            <h4 className="text-2xl font-bold text-[#1e293b] mb-6 flex items-center gap-3">
              {selectedOption === 0 ? (
                <Building2 className="w-7 h-7 text-[#722F37]" />
              ) : (
                <Home className="w-7 h-7 text-[#722F37]" />
              )}
              {treatmentOptions[selectedOption]?.type} Whitening
            </h4>
            <p className="text-neutral-600 mb-8">
              {treatmentOptions[selectedOption]?.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { label: 'Duration', value: treatmentOptions[selectedOption]?.duration || '', icon: Clock },
                { label: 'Sessions', value: treatmentOptions[selectedOption]?.sessions || '', icon: Calendar },
                { label: 'Results', value: treatmentOptions[selectedOption]?.results || '', icon: Zap },
                { label: 'Improvement', value: treatmentOptions[selectedOption]?.shadeImprovement || '', icon: TrendingUp },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
                  <stat.icon className="w-5 h-5 text-[#722F37] mb-2" />
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                  <p className="text-lg font-bold text-[#1e293b]">{stat.value}</p>
                </div>
              ))}
            </div>

            <Link
              href="/contact#book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#722F37]/25 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Book {treatmentOptions[selectedOption]?.type} Treatment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Features */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-lg">
            <h4 className="text-lg font-semibold text-[#1e293b] mb-6 flex items-center gap-2">
              <CircleCheck className="w-5 h-5 text-[#722F37]" />
              What&apos;s Included
            </h4>
            <div className="space-y-4">
              {treatmentOptions[selectedOption]?.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#FDF8F3]/50 hover:bg-[#FDF8F3] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#722F37]" />
                  </div>
                  <span className="text-neutral-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini illustration */}
            <div className="mt-8 flex justify-center">
              <LEDLightIllustration className="w-32 h-24" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// RESULTS TIMELINE
// ============================================================================

function ResultsTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activePoint, setActivePoint] = useState(2);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative"
    >
      {/* Timeline Bar */}
      <motion.div variants={fadeInUp} className="relative mb-12">
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200"
            initial={{ width: 0 }}
            animate={{ width: isInView ? '100%' : '0%' }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </div>

        {/* Timeline Points */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2">
          {resultsTimeline.map((point, index) => (
            <motion.button
              key={index}
              onClick={() => setActivePoint(index)}
              className={`relative w-6 h-6 rounded-full transition-all duration-300 ${
                activePoint === index
                  ? 'bg-[#722F37] scale-125 ring-4 ring-[#722F37]/20'
                  : index <= activePoint
                  ? 'bg-amber-400'
                  : 'bg-neutral-300'
              }`}
              whileHover={{ scale: 1.2 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.15 }}
              aria-label={`View ${point.label} results`}
            >
              {activePoint === index && (
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-[#722F37]"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Labels */}
      <div className="flex justify-between mb-8">
        {resultsTimeline.map((point, index) => (
          <motion.div
            key={index}
            className={`text-center cursor-pointer transition-all duration-300 ${
              activePoint === index ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setActivePoint(index)}
            variants={fadeInUp}
          >
            <p className={`text-sm font-medium ${activePoint === index ? 'text-[#722F37]' : 'text-neutral-600'}`}>
              {point.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePoint}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl p-8 border border-[#EDE5DD] shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1e293b] mb-2 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-amber-500" />
                {resultsTimeline[activePoint]?.label}
              </h4>
              <p className="text-neutral-600">{resultsTimeline[activePoint]?.description}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
                {resultsTimeline[activePoint]?.improvement}%
              </div>
              <p className="text-sm text-neutral-500">Brightness Level</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-4 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${resultsTimeline[activePoint]?.improvement || 0}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// MAINTENANCE TIPS SECTION
// ============================================================================

function MaintenanceTipsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {maintenanceTips.map((tip, index) => {
        const Icon = tip.icon;
        const impactColors = {
          Critical: 'from-red-500 to-red-400',
          High: 'from-amber-500 to-amber-400',
          Medium: 'from-teal-500 to-teal-400',
        };

        return (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="group relative bg-white rounded-2xl p-6 border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-4 right-4">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${impactColors[tip.impact as keyof typeof impactColors]} text-white`}>
                {tip.impact}
              </span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-[#722F37]" />
            </div>

            <h4 className="text-lg font-semibold text-[#1e293b] mb-2">{tip.title}</h4>
            <p className="text-neutral-600 text-sm leading-relaxed">{tip.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ============================================================================
// LIFESTYLE BENEFITS CAROUSEL
// ============================================================================

function LifestyleBenefitsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % lifestyleBenefits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Carousel */}
        <motion.div variants={slideInLeft} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={lifestyleBenefits[activeIndex]?.image || '/images/services/teeth-whitening/hero-smile.jpg'}
                alt={lifestyleBenefits[activeIndex]?.title || 'Lifestyle benefit'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Floating badge */}
          <motion.div
            className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-[#1e293b]">Confidence Boost</span>
            </div>
          </motion.div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {lifestyleBenefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`View benefit ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Benefits List */}
        <motion.div variants={slideInRight}>
          <div className="space-y-4">
            {lifestyleBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white shadow-lg shadow-[#722F37]/25'
                      : 'bg-[#FDF8F3] text-[#1e293b] hover:bg-[#F5EDE5]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeIndex === index ? 'bg-white/20' : 'bg-[#722F37]/10'
                    }`}>
                      <Icon className={`w-6 h-6 ${activeIndex === index ? 'text-white' : 'text-[#722F37]'}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{benefit.title}</h4>
                      <p className={`text-sm ${activeIndex === index ? 'text-white/80' : 'text-neutral-600'}`}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// FAQ ACCORDION
// ============================================================================

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
            openIndex === index
              ? 'border-[#722F37]/20 bg-gradient-to-br from-white to-[#FDF8F3]/50 shadow-lg'
              : 'border-neutral-200 bg-white hover:border-[#722F37]/10'
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#722F37]/20 focus:ring-inset"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-[#1e293b] pr-4">{item.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-[#722F37]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-5 text-neutral-600 leading-relaxed">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
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

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50/50 via-white to-[#FDF8F3]">
      <RadiantOrbs />
      <SparkleParticles />
      <SunburstPattern />

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
              <Link href="/" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-neutral-400" aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                Services
              </Link>
            </li>
            <li className="text-neutral-400" aria-hidden="true">/</li>
            <li className="text-[#722F37] font-medium" aria-current="page">Teeth Whitening</li>
          </ol>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-sm font-medium border border-amber-200/50">
                <Sparkles className="w-4 h-4" />
                Professional Spa-Dent Technology
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold text-[#1e293b] tracking-tight mb-6 leading-[1.1]">
              Reveal Your
              <span className="relative ml-4 inline-block">
                <span className="relative z-10 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Brightest
                </span>
                <motion.div
                  className="absolute -inset-2 bg-amber-400/20 blur-xl rounded-full"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-4xl lg:text-5xl font-light text-neutral-600">Smile</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-neutral-600 leading-relaxed mb-10 max-w-xl">
              Transform your smile in just one visit with our advanced LED light-activated whitening system.
              Experience stunning results with minimal sensitivity—up to 8 shades brighter!
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/contact#book"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-2xl shadow-lg shadow-[#722F37]/25 hover:shadow-xl hover:shadow-[#722F37]/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Book Whitening
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+16137336446"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-2xl border-2 border-[#722F37]/20 hover:border-[#722F37]/40 hover:bg-[#FDF8F3] transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                (613) 733-6446
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6">
              {[
                { value: '60', suffix: 'min', label: 'Treatment Time', icon: Clock },
                { value: '8', suffix: '+', label: 'Shades Brighter', icon: Sparkles },
                { value: '1', suffix: '', label: 'Visit Needed', icon: CircleCheck },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent flex items-baseline justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: 'spring' }}
                  >
                    {stat.value}
                    <span className="text-lg ml-0.5">{stat.suffix}</span>
                  </motion.div>
                  <div className="text-sm text-neutral-500 mt-1 flex items-center justify-center gap-1">
                    <stat.icon className="w-3.5 h-3.5" />
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div variants={slideInRight} initial="hidden" animate="visible" className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-amber-200/30">
              <Image
                src="/images/services/teeth-whitening/hero-smile.jpg"
                alt="Beautiful bright smile after professional teeth whitening treatment"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent" />

              {/* Sparkle overlay effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                animate={{
                  opacity: [0, 0.5, 0],
                  x: ['-100%', '100%'],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                aria-hidden="true"
              />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-8 top-1/4 bg-white rounded-2xl p-5 shadow-xl shadow-neutral-200/50 border border-neutral-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                  <Sun className="w-7 h-7 text-amber-500" />
                </div>
                <div>
                  <p className="font-bold text-[#1e293b] text-lg">Single Visit</p>
                  <p className="text-sm text-neutral-500">Instant results</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -right-8 bottom-1/4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-5 shadow-xl shadow-amber-500/30 text-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-bold text-lg">8+ Shades</p>
                  <p className="text-sm text-white/80">Brighter smile</p>
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
          className="w-8 h-12 rounded-full border-2 border-amber-400/30 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-3 rounded-full bg-amber-400" />
        </motion.div>
      </motion.div>
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
    <section ref={ref} className="relative py-32 overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            Why Choose Professional Whitening
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            The Spa-Dent
            <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent ml-3">
              Advantage
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our advanced LED whitening system delivers superior results with maximum comfort and safety.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-gradient-to-br from-white to-[#FDF8F3]/50 rounded-3xl p-8 border border-neutral-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-500"
                whileHover={{ y: -8 }}
              >
                {/* Stat Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-xl font-bold">{benefit.stat}</span>
                  <span className="text-xs ml-1 opacity-80">{benefit.statLabel}</span>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-amber-500" />
                </div>

                <h3 className="text-xl font-semibold text-[#1e293b] mb-3">{benefit.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// PROCEDURE STEPS SECTION
// ============================================================================

function ProcedureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % procedureSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6"
          >
            <Clock className="w-4 h-4" />
            What to Expect
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Your Whitening
            <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
              Journey
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            A comfortable, straightforward process completed in a single visit.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            {procedureSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`relative flex gap-6 cursor-pointer transition-all duration-300 ${
                    index !== procedureSteps.length - 1 ? 'pb-8' : ''
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Timeline Line */}
                  {index !== procedureSteps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-neutral-200">
                      <motion.div
                        className="w-full bg-gradient-to-b from-amber-400 to-amber-300"
                        initial={{ height: 0 }}
                        animate={{ height: activeStep > index ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}

                  {/* Step Number */}
                  <motion.div
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      activeStep >= index
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-400/30'
                        : 'bg-neutral-100 text-neutral-400'
                    }`}
                    animate={{ scale: activeStep === index ? 1.1 : 1 }}
                  >
                    <StepIcon className="w-5 h-5" />
                  </motion.div>

                  {/* Content */}
                  <div className={`flex-1 pb-2 ${activeStep === index ? '' : 'opacity-50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-[#1e293b]">{step.title}</h4>
                      <span className="text-sm text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Visual */}
          <motion.div variants={slideInRight} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/services/teeth-whitening/dentist-consultation.jpg"
                alt="Professional teeth whitening treatment in progress"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/40 via-transparent to-transparent" />

              {/* Total Time Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Total Treatment Time</p>
                    <p className="text-3xl font-bold text-[#1e293b]">60-90 minutes</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center">
                    <Timer className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// WHITENING PROCESS ILLUSTRATION SECTION
// ============================================================================

function WhiteningProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6"
          >
            <Lightbulb className="w-4 h-4" />
            How It Works
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            LED Whitening
            <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent ml-3">
              Technology
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Step 1: Apply Gel */}
          <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl p-8 border border-[#EDE5DD] text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Droplets className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-[#1e293b] mb-3">1. Apply Whitening Gel</h3>
            <p className="text-neutral-600">Professional-strength hydrogen peroxide gel is carefully applied to your teeth.</p>
          </div>

          {/* Step 2: LED Activation */}
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-8 border border-amber-200 text-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-6">
                <LEDLightIllustration className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-[#1e293b] mb-3">2. LED Light Activation</h3>
              <p className="text-neutral-600">Our Spa-Dent LED light accelerates the whitening process for faster results.</p>
            </div>
          </div>

          {/* Step 3: Reveal */}
          <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl p-8 border border-[#EDE5DD] text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-[#1e293b] mb-3">3. Reveal Brighter Smile</h3>
            <p className="text-neutral-600">See your dramatically whiter smile—up to 8 shades brighter in one visit!</p>
          </div>
        </motion.div>

        {/* Shade comparison illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
            <p className="text-sm text-neutral-500 text-center mb-4">Your shade transformation journey</p>
            <ShadeComparisonIllustration className="w-64 h-20 mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export function TeethWhiteningContent() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Whitening Process Section - NEW */}
      <WhiteningProcessSection />

      {/* Shade Transformation Visualizer */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              Interactive Visualization
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              Watch Your Smile
              <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent ml-3">
                Transform
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              See how professional whitening can brighten your smile by multiple shades.
            </p>
          </motion.div>

          <ShadeTransformationVisualizer />
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Real Results
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              Before &
              <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
                After
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Drag the slider to see the dramatic difference professional whitening makes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </section>

      {/* Treatment Options */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Treatment Options
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent ml-3">
                Path to Brightness
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We offer two professional whitening options to fit your lifestyle and preferences.
            </p>
          </motion.div>

          <TreatmentOptionsComparison />
        </div>
      </section>

      {/* Procedure Section */}
      <ProcedureSection />

      {/* Results Timeline */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Results Timeline
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              What to
              <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent ml-3">
                Expect
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Your whitening results and how they develop over time.
            </p>
          </motion.div>

          <ResultsTimeline />
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Maintenance Guide
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              Keep Your Smile
              <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
                Radiant
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Simple tips to maintain your bright, beautiful smile for years to come.
            </p>
          </motion.div>

          <MaintenanceTipsSection />
        </div>
      </section>

      {/* Lifestyle Benefits */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Life-Changing Confidence
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              Smile with
              <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent ml-3">
                Confidence
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A brighter smile opens doors in every aspect of your life.
            </p>
          </motion.div>

          <LifestyleBenefitsCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              Frequently Asked
              <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
                Questions
              </span>
            </h2>
            <p className="text-xl text-neutral-600">
              Everything you need to know about teeth whitening.
            </p>
          </motion.div>

          <FAQAccordion items={faqs} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-600 mb-4">Still have questions? We&apos;re happy to help.</p>
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
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
              Related
              <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent ml-3">
                Services
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Explore other services to enhance your smile.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={service.href}
                    className="group block bg-gradient-to-br from-white to-[#FDF8F3]/50 rounded-3xl p-8 border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-[#722F37]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1e293b] mb-3 group-hover:text-[#722F37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 mb-4">{service.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#722F37] font-medium group-hover:gap-3 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group"
            >
              View All Services
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 60%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
            }}
            animate={{
              x: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-400/20 mb-8"
            >
              <Sparkles className="w-10 h-10 text-amber-400" />
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Ready for a
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent ml-3">
                Brighter Smile?
              </span>
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
              Schedule your professional teeth whitening appointment today and discover the confidence
              that comes with a radiant, white smile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact#book"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+16137336446"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
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
