'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Puzzle,
  Heart,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Phone,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Clock,
  Award,
  Smile,
  Users,
  Target,
  RotateCcw,
  Check,
  ChevronDown,
  Stethoscope,
  CircleDot,
  Layers,
  Activity,
  HeartPulse,
  Star,
  Shield,
  Zap,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// ============================================================================
// PREMIUM DESIGN TOKENS
// ============================================================================

const colors = {
  wine: '#722F37',
  wineLight: '#8B3A42',
  wineDark: '#5A252C',
  cream: '#FDF8F3',
  warmGray: '#EDE5DD',
  emerald: '#059669',
  amber: '#D97706',
  indigo: '#4F46E5',
};

// ============================================================================
// DATA
// ============================================================================

const faqs = [
  {
    question: 'What is the best option for replacing a missing tooth?',
    answer:
      'The best option depends on your specific situation. Dental implants are often recommended as the ideal solution. However, bridges may be preferred when neighboring teeth need crowns, and dentures offer a cost-effective solution for multiple missing teeth.',
  },
  {
    question: 'How long after extraction can I get a tooth replacement?',
    answer:
      'In some cases, an implant can be placed immediately after extraction. Otherwise, a healing period of 2-3 months is typical before implant placement. Bridges and dentures can often be started sooner.',
  },
  {
    question: "What happens if I don't replace missing teeth?",
    answer:
      'Leaving missing teeth unreplaced can lead to: teeth shifting, jawbone loss, facial appearance changes, reduced chewing efficiency, and increased risk of decay on adjacent teeth.',
  },
  {
    question: 'Are dentures comfortable to wear?',
    answer:
      "Modern dentures are designed for comfort. There's typically an adjustment period of a few weeks. Implant-supported dentures offer superior stability and comfort.",
  },
  {
    question: 'How do I care for my tooth replacement?',
    answer:
      'Implants and bridges are cared for like natural teeth. Removable dentures should be taken out at night, cleaned daily, and soaked in denture solution. All replacements benefit from regular checkups.',
  },
];

const treatmentOptions = [
  {
    id: 'implants',
    title: 'Dental Implants',
    shortTitle: 'Implants',
    icon: Target,
    description: 'Permanent, standalone tooth replacements with titanium posts.',
    benefits: [
      'Best for long-term durability',
      'Preserves jawbone health',
      'Looks and functions like natural teeth',
    ],
    timeline: '3-6 months',
    investment: 'Premium',
    color: 'from-emerald-500 to-teal-600',
    lightColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accentColor: '#059669',
  },
  {
    id: 'bridges',
    title: 'Dental Bridges',
    shortTitle: 'Bridges',
    icon: Puzzle,
    description: 'Fixed prosthetic anchored to adjacent teeth.',
    benefits: [
      'Non-surgical solution',
      'Fixed (non-removable)',
      'Faster treatment timeline',
    ],
    timeline: '2-3 weeks',
    investment: 'Moderate',
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    accentColor: '#3B82F6',
  },
  {
    id: 'partial',
    title: 'Partial Dentures',
    shortTitle: 'Partials',
    icon: RotateCcw,
    description: 'Removable appliance for multiple missing teeth.',
    benefits: [
      'Cost-effective option',
      'Easily adjusted',
      'Non-invasive treatment',
    ],
    timeline: '2-4 weeks',
    investment: 'Budget-Friendly',
    color: 'from-amber-500 to-orange-600',
    lightColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    accentColor: '#D97706',
  },
  {
    id: 'full',
    title: 'Full Dentures',
    shortTitle: 'Full',
    icon: Smile,
    description: 'Complete tooth replacement for entire arch.',
    benefits: [
      'Restores full smile',
      'Improves chewing ability',
      'Affordable full-arch solution',
    ],
    timeline: '3-6 weeks',
    investment: 'Budget-Friendly',
    color: 'from-purple-500 to-pink-600',
    lightColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    accentColor: '#8B5CF6',
  },
];

const qualityOfLifeImpacts = [
  {
    icon: Smile,
    title: 'Confident Smile',
    description: 'Smile freely without hesitation',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Users,
    title: 'Social Freedom',
    description: 'Engage fully in every moment',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Heart,
    title: 'Eat What You Love',
    description: 'Enjoy all your favorites again',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Award,
    title: 'Professional Image',
    description: 'Present your best self always',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Consultation',
    description: 'Comprehensive exam and personalized discussion.',
    icon: Stethoscope,
    duration: '60 min',
  },
  {
    step: 2,
    title: 'Treatment Planning',
    description: 'Custom plan tailored to your unique needs.',
    icon: Target,
    duration: '30 min',
  },
  {
    step: 3,
    title: 'Treatment',
    description: 'Comfortable procedures with gentle care.',
    icon: Activity,
    duration: 'Varies',
  },
  {
    step: 4,
    title: 'Follow-Up Care',
    description: 'Ongoing support for lasting results.',
    icon: HeartPulse,
    duration: 'Ongoing',
  },
];

const decisionQuestions = [
  {
    id: 'teeth_count',
    question: 'How many teeth are you missing?',
    options: [
      { value: 'one', label: 'One tooth', emoji: '1️⃣', weight: { implants: 3, bridges: 2, partial: 1, full: 0 } },
      { value: 'few', label: '2-4 teeth', emoji: '🦷', weight: { implants: 2, bridges: 3, partial: 2, full: 0 } },
      { value: 'many', label: '5+ teeth', emoji: '😬', weight: { implants: 1, bridges: 1, partial: 3, full: 2 } },
      { value: 'all', label: 'All teeth', emoji: '✨', weight: { implants: 2, bridges: 0, partial: 0, full: 3 } },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    options: [
      { value: 'durability', label: 'Long-term durability', emoji: '💪', weight: { implants: 3, bridges: 2, partial: 1, full: 1 } },
      { value: 'natural', label: 'Most natural feel', emoji: '🌟', weight: { implants: 3, bridges: 2, partial: 1, full: 1 } },
      { value: 'speed', label: 'Quick treatment', emoji: '⚡', weight: { implants: 0, bridges: 3, partial: 3, full: 2 } },
      { value: 'cost', label: 'Lower cost', emoji: '💰', weight: { implants: 0, bridges: 2, partial: 3, full: 3 } },
    ],
  },
  {
    id: 'surgery',
    question: 'How do you feel about minor surgery?',
    options: [
      { value: 'fine', label: "I'm comfortable with it", emoji: '👍', weight: { implants: 3, bridges: 1, partial: 1, full: 1 } },
      { value: 'prefer_not', label: "I'd prefer to avoid it", emoji: '🙅', weight: { implants: 0, bridges: 3, partial: 3, full: 2 } },
    ],
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#722F37]/10 to-rose-500/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-10%', right: '-20%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', left: '-15%' }}
      />
    </div>
  );
}

function DotPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
      <pattern id="dots-mobile" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dots-mobile)" />
    </svg>
  );
}

// ============================================================================
// IMMERSIVE HERO SECTION
// ============================================================================

function MobileHeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col">
      {/* Full-bleed hero image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imageScale, opacity: imageOpacity }}
      >
        <Image
          src="https://images.pexels.com/photos/3393705/pexels-photo-3393705.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Beautiful confident smile"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#722F37]/30 to-transparent" />
      </motion.div>

      {/* Floating badge - top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 pt-6 px-5"
      >
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/50">
          <div className="flex -space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-800">98% Patient Satisfaction</span>
        </div>
      </motion.div>

      {/* Hero content - bottom aligned */}
      <motion.div
        className="relative z-10 mt-auto px-5 pb-8"
        style={{ y: contentY }}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Eyebrow badge */}
          <motion.div variants={staggerItem} className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/20">
              <Sparkles className="w-3 h-3" />
              Restore Your Confidence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl xs:text-[2.75rem] font-bold text-white leading-[1.1] tracking-tight mb-4"
          >
            Every Smile
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200">
              Deserves Completion
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-base text-white/90 mb-6 leading-relaxed max-w-[320px]"
          >
            Discover personalized solutions for your missing teeth. Your journey to a complete, confident smile starts here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="space-y-3">
            <Link href="/contact#book" className="block">
              <motion.button
                className="w-full py-4 px-6 bg-white text-[#722F37] font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-2.5 relative overflow-hidden group"
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#722F37] to-[#8B3A42] opacity-0 group-active:opacity-100 transition-opacity" />
                <Calendar className="w-5 h-5 relative z-10 group-active:text-white transition-colors" />
                <span className="relative z-10 group-active:text-white transition-colors">Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-active:text-white transition-colors" />
              </motion.button>
            </Link>

            <motion.a
              href="tel:6137331118"
              className="flex items-center justify-center gap-2 py-3.5 text-white/90 font-medium"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Phone className="w-4 h-4" />
              </div>
              <span>(613) 733-1118</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-6"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 rounded-full bg-white/80"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// QUICK STATS BAR
// ============================================================================

function QuickStatsBar() {
  const stats = [
    { value: '25+', label: 'Years Experience', icon: Award },
    { value: '10K+', label: 'Smiles Restored', icon: Smile },
    { value: '4.9', label: 'Patient Rating', icon: Star },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative bg-gradient-to-r from-[#722F37] to-[#8B3A42] py-6 px-4 -mt-1">
      <DotPattern />
      <div className="relative z-10 flex justify-around">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Icon className="w-4 h-4 text-white/70" />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-[10px] text-white/70 font-medium tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// PREMIUM TREATMENT OPTIONS - Swipeable Cards
// ============================================================================

function MobileTreatmentOptions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85 + 16; // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, treatmentOptions.length - 1));
  };

  return (
    <section ref={sectionRef} className="py-12 bg-white overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-8 px-5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/25 mb-4"
        >
          <Layers className="w-7 h-7 text-white" />
        </motion.div>
        <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-2">
          Your <span className="text-[#722F37]">Options</span>
        </h2>
        <p className="text-gray-600 text-sm max-w-[280px] mx-auto">
          Swipe to explore solutions tailored to your needs
        </p>
      </motion.div>

      {/* Horizontal scroll cards */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-5 pb-4"
        style={{ scrollPaddingLeft: '20px' }}
      >
        {treatmentOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[85%] snap-center"
            >
              <div
                className={`relative bg-white rounded-3xl p-6 border-2 transition-all duration-300 ${
                  activeIndex === index
                    ? 'border-[#722F37]/30 shadow-xl shadow-gray-200/50'
                    : 'border-gray-100 shadow-md'
                }`}
              >
                {/* Best match badge for implants */}
                {option.id === 'implants' && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wide">Most Popular</span>
                  </div>
                )}

                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{option.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${option.lightColor} ${option.iconColor}`}>
                        {option.investment}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {option.timeline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                  {option.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2.5 mb-5">
                  {option.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${option.accentColor}15` }}
                      >
                        <Check className="w-3 h-3" style={{ color: option.accentColor }} />
                      </div>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Link href="/contact#book">
                  <motion.button
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-gradient-to-r ${option.color} text-white shadow-lg`}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {treatmentOptions.map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-6 bg-[#722F37]' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// INTERACTIVE QUIZ SECTION - Immersive Experience
// ============================================================================

function MobileDecisionHelper() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const currentQ = decisionQuestions[currentQuestion]!;
  const progress = ((Object.keys(answers).length / decisionQuestions.length) * 100);

  const handleAnswer = (questionId: string, value: string) => {
    setSelectedAnswer(value);

    setTimeout(() => {
      const newAnswers = { ...answers, [questionId]: value };
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < decisionQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 400);
  };

  const calculateRecommendation = () => {
    const scores = { implants: 0, bridges: 0, partial: 0, full: 0 };

    Object.entries(answers).forEach(([questionId, value]) => {
      const question = decisionQuestions.find((q) => q.id === questionId);
      if (question) {
        const option = question.options.find((o) => o.value === value);
        if (option) {
          scores.implants += option.weight.implants;
          scores.bridges += option.weight.bridges;
          scores.partial += option.weight.partial;
          scores.full += option.weight.full;
        }
      }
    });

    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([key]) => treatmentOptions.find((t) => t.id === key)!);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer(null);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-gradient-to-b from-gray-900 via-gray-900 to-black relative overflow-hidden"
    >
      <FloatingOrbs />
      <DotPattern />

      <div className="relative z-10 px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#722F37]/30 to-rose-500/20 border border-[#722F37]/30 mb-4"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">2-Minute Quiz</span>
          </motion.div>
          <h2 className="text-2xl xs:text-3xl font-bold text-white mb-2">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Perfect Match</span>
          </h2>
          <p className="text-white/60 text-sm">
            Answer 3 questions for personalized recommendations
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/50">Progress</span>
            <span className="text-xs text-white/50">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#722F37] via-rose-500 to-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Quiz content */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Question card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722F37] to-rose-500 flex items-center justify-center text-white font-bold">
                    {currentQuestion + 1}
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Question {currentQuestion + 1} of {decisionQuestions.length}</p>
                    <h3 className="text-lg font-bold text-white">{currentQ.question}</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((option) => {
                    const isSelected = selectedAnswer === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        onClick={() => handleAnswer(currentQ.id, option.value)}
                        className={`w-full p-4 rounded-2xl text-left transition-all border-2 ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#722F37] to-rose-500 border-transparent'
                            : 'bg-white/5 border-white/10 active:border-[#722F37]/50'
                        }`}
                        whileTap={{ scale: 0.98 }}
                        disabled={selectedAnswer !== null}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{option.emoji}</span>
                          <span className={`font-semibold ${isSelected ? 'text-white' : 'text-white/80'}`}>
                            {option.label}
                          </span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              <Check className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Back button */}
                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="flex items-center gap-2 mt-6 text-white/50 active:text-white text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous question
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
            >
              {/* Success animation */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-4 shadow-lg shadow-emerald-500/25"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-1">Your Top Recommendations</h3>
                <p className="text-sm text-white/60">Based on your unique preferences</p>
              </div>

              {/* Top 2 recommendations */}
              <div className="space-y-3 mb-6">
                {calculateRecommendation()
                  .slice(0, 2)
                  .map((option, i) => {
                    const Icon = option.icon;
                    return (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className={`p-4 rounded-2xl border-2 ${
                          i === 0
                            ? 'bg-gradient-to-r from-white/10 to-white/5 border-emerald-500/50'
                            : 'border-white/10 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{option.title}</span>
                              {i === 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                                  Best Match
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/60 mt-0.5">{option.description}</p>
                          </div>
                          <div className="text-2xl font-bold text-white/30">#{i + 1}</div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>

              {/* CTA buttons */}
              <div className="space-y-3">
                <Link href="/contact#book" className="block">
                  <motion.button
                    className="w-full py-4 bg-gradient-to-r from-[#722F37] to-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-[#722F37]/25 flex items-center justify-center gap-2"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="w-5 h-5" />
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <button
                  onClick={resetQuiz}
                  className="w-full py-3.5 bg-white/10 text-white font-medium rounded-2xl border border-white/20 active:bg-white/20 transition-colors"
                >
                  Take Quiz Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// QUALITY OF LIFE TRANSFORMATION
// ============================================================================

function MobileQualityOfLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="py-12 bg-gradient-to-b from-white to-[#FDF8F3] relative overflow-hidden">
      <FloatingOrbs />

      <div className="relative z-10 px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/25 mb-4"
          >
            <Heart className="w-7 h-7 text-white" />
          </motion.div>
          <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-2">
            Transform Your <span className="text-rose-500">Life</span>
          </h2>
          <p className="text-gray-600 text-sm">
            A complete smile changes everything
          </p>
        </motion.div>

        {/* Impact grid */}
        <div className="grid grid-cols-2 gap-4">
          {qualityOfLifeImpacts.map((impact, i) => {
            const Icon = impact.icon;
            return (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-lg shadow-gray-100/50 h-full">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${impact.gradient} flex items-center justify-center shadow-lg mb-4`}
                    whileTap={{ scale: 0.95, rotate: -5 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 mb-1">{impact.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{impact.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Emotional image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="https://images.pexels.com/photos/5790828/pexels-photo-5790828.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Happy couple with confident smiles"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-white text-lg font-semibold mb-1">Your transformation awaits</p>
            <p className="text-white/80 text-sm">Join thousands of happy patients</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// PREMIUM PROCESS TIMELINE
// ============================================================================

function MobileProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="py-12 bg-[#FDF8F3] relative overflow-hidden">
      <DotPattern />

      <div className="relative z-10 px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/25 mb-4"
          >
            <Calendar className="w-7 h-7 text-white" />
          </motion.div>
          <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-2">
            Your <span className="text-[#722F37]">Journey</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Simple steps to your complete smile
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#722F37] via-[#722F37]/50 to-[#722F37]/10" />

          <div className="space-y-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex gap-4"
                >
                  {/* Step indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                    className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg shadow-[#722F37]/25 flex-shrink-0"
                  >
                    <span className="text-white font-bold">{step.step}</span>
                  </motion.div>

                  {/* Content card */}
                  <div className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 shadow-lg shadow-gray-100/50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-[#722F37]" />
                          <h3 className="font-bold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#FDF8F3] text-[#722F37] font-semibold whitespace-nowrap">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ELEGANT FAQ ACCORDION
// ============================================================================

function MobileFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 mb-4"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </motion.div>
          <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-2">
            Common <span className="text-indigo-600">Questions</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Everything you need to know
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
              >
                <motion.button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    isOpen
                      ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42] border-transparent text-white shadow-lg shadow-[#722F37]/25'
                      : 'bg-white border-gray-100 active:bg-gray-50'
                  }`}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-semibold text-sm leading-snug ${isOpen ? 'text-white' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-[#722F37]'}`} />
                    </motion.div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pt-3 pb-1">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES - Premium Cards
// ============================================================================

function MobileRelatedServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const relatedServices = [
    {
      title: 'Dental Implants',
      description: 'Permanent, natural-looking replacements',
      href: '/services/dental-implants',
      icon: CircleDot,
      gradient: 'from-emerald-500 to-teal-600',
      image: 'https://images.pexels.com/photos/6502343/pexels-photo-6502343.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Dentures',
      description: 'Complete and partial denture solutions',
      href: '/services/dentures',
      icon: Smile,
      gradient: 'from-purple-500 to-pink-600',
      image: 'https://images.pexels.com/photos/6627533/pexels-photo-6627533.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Enhance your smile aesthetics',
      href: '/services/cosmetic-dentistry',
      icon: Sparkles,
      gradient: 'from-amber-500 to-orange-600',
      image: 'https://images.pexels.com/photos/3952124/pexels-photo-3952124.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 bg-[#FDF8F3]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-6 px-5"
      >
        <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-2">
          Related <span className="text-[#722F37]">Services</span>
        </h2>
        <p className="text-gray-600 text-sm">
          More ways to restore your smile
        </p>
      </motion.div>

      {/* Horizontal scroll */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-5 pb-4" style={{ width: 'max-content' }}>
          {relatedServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                style={{ width: '280px' }}
              >
                <Link href={service.href} className="block">
                  <motion.div
                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-100/50 h-full"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      <div className="flex items-center gap-1 text-[#722F37] text-sm font-semibold">
                        Learn more
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function MobileFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="py-12 px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="relative bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-rose-600 rounded-3xl p-6 overflow-hidden shadow-2xl shadow-[#722F37]/30"
      >
        <FloatingOrbs />
        <DotPattern />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={isInView ? { x: '200%' } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        <div className="relative z-10">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-white/80 text-sm">
              Book your free consultation today
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/contact#book" className="block">
              <motion.button
                className="w-full py-4 bg-white text-[#722F37] font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5" />
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <motion.a
              href="tel:6137331118"
              className="flex items-center justify-center gap-3 py-3.5 text-white font-medium"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span>(613) 733-1118</span>
            </motion.a>
          </div>

          {/* Hours */}
          <div className="mt-6 pt-4 border-t border-white/20 text-center">
            <p className="text-xs text-white/60">
              Mon-Sat: 9am-5pm • Free parking available
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA
// ============================================================================

function MobileStickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
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
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl shadow-black/10"
        >
          <div className="flex gap-3">
            <Link href="/contact#book" className="flex-1">
              <motion.button
                className="w-full py-3.5 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-bold rounded-xl shadow-lg shadow-[#722F37]/25 flex items-center justify-center gap-2"
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-4 h-4" />
                Book Consultation
              </motion.button>
            </Link>
            <motion.a
              href="tel:6137331118"
              className="w-14 h-[50px] bg-[#722F37]/10 rounded-xl flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 text-[#722F37]" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN MOBILE PAGE COMPONENT
// ============================================================================

export default function MissingTeethMobilePage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col bg-white pb-24">
      <MobileHeroSection />
      <QuickStatsBar />
      <MobileTreatmentOptions />
      <MobileDecisionHelper />
      <MobileQualityOfLife />
      <MobileProcessTimeline />
      <MobileFAQ />
      <MobileRelatedServices />
      <MobileFinalCTA />
      <MobileStickyBottomCTA />
    </main>
  );
}
