'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Puzzle,
  ShieldCheck,
  Heart,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Phone,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Star,
  Clock,
  DollarSign,
  Zap,
  Award,
  Smile,
  Users,
  ThumbsUp,
  Target,
  RotateCcw,
  Check,
  X,
  ChevronDown,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  MotionValue,
} from 'framer-motion';
import { SectionContainer } from '@/components/ui/section-container';
import { ContactCTA } from '@/components/sections/ContactCTA';

// ============================================================================
// DATA
// ============================================================================

const faqs = [
  {
    question: 'What is the best option for replacing a missing tooth?',
    answer:
      'The best option depends on your specific situation, including the location of the missing tooth, bone density, budget, and personal preferences. Dental implants are often recommended as the ideal solution because they preserve bone, look natural, and can last a lifetime. However, bridges may be preferred when neighboring teeth need crowns, and dentures offer a cost-effective solution for multiple missing teeth. During your consultation, we\'ll discuss all options and recommend the best choice for your needs.',
  },
  {
    question: 'How long after extraction can I get a tooth replacement?',
    answer:
      'The timeline varies depending on your chosen replacement option. In some cases, an implant can be placed immediately after extraction (immediate implant placement). Otherwise, a healing period of 2-3 months is typical before implant placement. Bridges and dentures can often be started sooner, with temporary solutions available while permanent restorations are being crafted.',
  },
  {
    question: "What happens if I don't replace missing teeth?",
    answer:
      'Leaving missing teeth unreplaced can lead to several problems: remaining teeth may shift into the gap causing bite issues, jawbone loss occurs where the tooth root was, facial appearance can change as bone deteriorates, chewing efficiency decreases, speech may be affected, and there\'s increased risk of decay and gum disease on adjacent teeth. Early replacement helps prevent these complications.',
  },
  {
    question: 'Are dentures comfortable to wear?',
    answer:
      "Modern dentures are designed for comfort and a natural fit. There's typically an adjustment period of a few weeks while your mouth adapts. We take precise impressions and make adjustments to ensure the best fit possible. Implant-supported dentures offer superior stability and comfort because they're anchored securely rather than relying solely on suction or adhesives.",
  },
  {
    question: 'How do I care for my tooth replacement?',
    answer:
      'Care depends on the type of replacement. Implants and bridges are cared for like natural teeth—brush twice daily, floss (including under bridges), and maintain regular dental visits. Removable dentures should be taken out at night, cleaned daily with denture cleaner, and soaked in water or denture solution. All replacements benefit from regular dental checkups to ensure proper fit and function.',
  },
];

const treatmentOptions = [
  {
    id: 'implants',
    title: 'Dental Implants',
    shortTitle: 'Implants',
    icon: Target,
    description: 'Permanent, standalone tooth replacements with titanium posts that fuse with your jawbone.',
    benefits: [
      'Best for long-term durability',
      'Preserves jawbone health',
      'Looks and functions like natural teeth',
      'No impact on adjacent teeth',
    ],
    ideal: 'Single or multiple missing teeth with adequate bone',
    durability: 95,
    naturalFeel: 98,
    maintenance: 90,
    timeline: '3-6 months',
    investment: 'Premium',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    textColor: 'text-emerald-400',
  },
  {
    id: 'bridges',
    title: 'Dental Bridges',
    shortTitle: 'Bridges',
    icon: Puzzle,
    description: 'Fixed prosthetic anchored to adjacent teeth to span the gap of missing teeth.',
    benefits: [
      'Non-surgical solution',
      'Fixed (non-removable) restoration',
      'Faster treatment timeline',
      'Good when neighbors need crowns',
    ],
    ideal: 'One or a few adjacent missing teeth',
    durability: 75,
    naturalFeel: 85,
    maintenance: 80,
    timeline: '2-3 weeks',
    investment: 'Moderate',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-400',
  },
  {
    id: 'partial',
    title: 'Partial Dentures',
    shortTitle: 'Partials',
    icon: RotateCcw,
    description: 'Removable appliance that replaces multiple missing teeth while preserving remaining teeth.',
    benefits: [
      'Cost-effective option',
      'Easily adjusted or replaced',
      'Non-invasive treatment',
      'Can replace teeth anywhere in arch',
    ],
    ideal: 'Multiple missing teeth with healthy remaining teeth',
    durability: 60,
    naturalFeel: 70,
    maintenance: 65,
    timeline: '2-4 weeks',
    investment: 'Budget-Friendly',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    textColor: 'text-amber-400',
  },
  {
    id: 'full',
    title: 'Full Dentures',
    shortTitle: 'Full',
    icon: Smile,
    description: 'Complete tooth replacement for upper or lower arch when all teeth are missing.',
    benefits: [
      'Restores full smile',
      'Improves chewing ability',
      'Traditional or implant-supported',
      'Affordable full-arch solution',
    ],
    ideal: 'Complete tooth loss in one or both arches',
    durability: 55,
    naturalFeel: 65,
    maintenance: 60,
    timeline: '3-6 weeks',
    investment: 'Budget-Friendly',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    textColor: 'text-purple-400',
  },
];

const qualityOfLifeImpacts = [
  {
    icon: Smile,
    title: 'Confident Smile',
    description: 'Smile freely without hiding your teeth',
    before: 'Avoiding photos, covering mouth',
    after: 'Beaming with confidence everywhere',
  },
  {
    icon: Users,
    title: 'Social Freedom',
    description: 'Engage fully in social situations',
    before: 'Self-conscious in conversations',
    after: 'Chatting and laughing without worry',
  },
  {
    icon: Heart,
    title: 'Eat What You Love',
    description: 'Enjoy all your favorite foods again',
    before: 'Limited food choices, discomfort',
    after: 'Biting into apples, enjoying steak',
  },
  {
    icon: Award,
    title: 'Professional Image',
    description: 'Present your best self at work',
    before: 'Hesitant to speak up in meetings',
    after: 'Presenting with full confidence',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Consultation',
    description: 'Comprehensive exam, X-rays, and discussion of your goals and options.',
    icon: Calendar,
    duration: '60 min',
  },
  {
    step: 2,
    title: 'Treatment Planning',
    description: 'We create a personalized plan based on your needs, timeline, and budget.',
    icon: Target,
    duration: '30 min',
  },
  {
    step: 3,
    title: 'Treatment',
    description: 'Comfortable procedures with clear communication at every step.',
    icon: Zap,
    duration: 'Varies',
  },
  {
    step: 4,
    title: 'Follow-Up Care',
    description: 'Regular checkups to ensure long-lasting results and your satisfaction.',
    icon: ThumbsUp,
    duration: 'Ongoing',
  },
];

const decisionQuestions = [
  {
    id: 'teeth_count',
    question: 'How many teeth are you missing?',
    options: [
      { value: 'one', label: 'One tooth', weight: { implants: 3, bridges: 2, partial: 1, full: 0 } },
      { value: 'few', label: '2-4 teeth', weight: { implants: 2, bridges: 3, partial: 2, full: 0 } },
      { value: 'many', label: '5+ teeth', weight: { implants: 1, bridges: 1, partial: 3, full: 2 } },
      { value: 'all', label: 'All teeth', weight: { implants: 2, bridges: 0, partial: 0, full: 3 } },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    options: [
      { value: 'durability', label: 'Long-term durability', weight: { implants: 3, bridges: 2, partial: 1, full: 1 } },
      { value: 'natural', label: 'Most natural feel', weight: { implants: 3, bridges: 2, partial: 1, full: 1 } },
      { value: 'speed', label: 'Quick treatment', weight: { implants: 0, bridges: 3, partial: 3, full: 2 } },
      { value: 'cost', label: 'Lower cost', weight: { implants: 0, bridges: 2, partial: 3, full: 3 } },
    ],
  },
  {
    id: 'surgery',
    question: 'How do you feel about minor surgery?',
    options: [
      { value: 'fine', label: "I'm comfortable with it", weight: { implants: 3, bridges: 1, partial: 1, full: 1 } },
      { value: 'prefer_not', label: "I'd prefer to avoid it", weight: { implants: 0, bridges: 3, partial: 3, full: 2 } },
    ],
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 3, -3, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large hope orb - top right */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(114,47,55,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Confidence orb - bottom left */}
      <motion.div
        animate={{
          y: [10, -15, 10],
          x: [-5, 5, -5],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
        }}
      />
      {/* Accent orb - center */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

function ToothRestoreAnimation() {
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRestored((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Tooth row visualization */}
      <div className="flex items-end gap-1">
        {[...Array(5)].map((_, i) => {
          const isGap = i === 2;
          return (
            <motion.div
              key={i}
              className="relative"
              animate={{
                y: isGap && !isRestored ? [0, -5, 0] : 0,
              }}
              transition={{ duration: 2, repeat: isGap && !isRestored ? Infinity : 0 }}
            >
              {isGap ? (
                <AnimatePresence mode="wait">
                  {isRestored ? (
                    <motion.div
                      key="restored"
                      initial={{ scale: 0, opacity: 0, y: -20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="w-10 h-14 bg-gradient-to-b from-white to-gray-100 rounded-t-lg rounded-b-md shadow-lg border-2 border-emerald-400/50 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gap"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-10 h-14 border-2 border-dashed border-[#722F37]/30 rounded-t-lg rounded-b-md flex items-center justify-center bg-[#722F37]/5"
                    >
                      <span className="text-[#722F37]/50 text-xs font-bold">?</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <div className="w-10 h-14 bg-gradient-to-b from-gray-50 to-gray-200 rounded-t-lg rounded-b-md shadow-md" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Status indicator */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium"
        animate={{
          backgroundColor: isRestored ? 'rgba(16,185,129,0.1)' : 'rgba(114,47,55,0.1)',
          color: isRestored ? 'rgb(16,185,129)' : 'rgb(114,47,55)',
        }}
      >
        {isRestored ? 'Restored!' : 'Missing Tooth'}
      </motion.div>
    </div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5] overflow-hidden"
      style={{ opacity: heroOpacity }}
    >
      <FloatingOrbs />

      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#722F37]/10 to-[#722F37]/5 border border-[#722F37]/20 mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Puzzle className="w-4 h-4 text-[#722F37]" />
              </motion.div>
              <span className="text-sm font-medium text-[#722F37]">Solutions That Restore Confidence</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="font-display font-bold tracking-tight text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                Every Smile
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37]"
              >
                Deserves Completion
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-foreground-secondary max-w-xl mb-8 leading-relaxed"
            >
              Discover the perfect solution for your missing teeth. From dental implants to dentures, we&apos;ll help you
              find the right path to restore your complete, confident smile.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link href="/contact#book">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-2xl overflow-hidden shadow-lg shadow-[#722F37]/25"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
              <motion.a
                href="tel:6137331118"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-[#722F37] bg-white border-2 border-[#722F37]/20 hover:border-[#722F37]/40 hover:bg-[#FDF8F3] transition-all shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                (613) 733-1118
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: CheckCircle2, text: 'Free Consultation' },
                { icon: Star, text: 'Multiple Options' },
                { icon: Heart, text: 'Compassionate Care' },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-foreground-secondary"
                >
                  <item.icon className="w-4 h-4 text-emerald-500" />
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/implants/implants-01.jpg"
                alt="Missing teeth replacement solutions at Ottawa South Dental"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating restore animation card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-[#EDE5DD] min-w-[200px]"
            >
              <div className="h-24 mb-4">
                <ToothRestoreAnimation />
              </div>
              <p className="text-xs text-foreground-secondary text-center">Watch your smile transform</p>
            </motion.div>

            {/* Stats floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-[#722F37] to-[#8B3A42] text-white rounded-2xl p-5 shadow-xl"
            >
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-xs opacity-90">Patient Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// ============================================================================
// SOLUTION COMPARISON SECTION
// ============================================================================

function SolutionComparisonSection() {
  const [activeOption, setActiveOption] = useState(0);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const currentOption = treatmentOptions[activeOption]!;

  const metrics = [
    { key: 'durability', label: 'Durability', icon: ShieldCheck },
    { key: 'naturalFeel', label: 'Natural Feel', icon: Heart },
    { key: 'maintenance', label: 'Low Maintenance', icon: Zap },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-white via-[#FDF8F3]/30 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#722F37]/[0.02] to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-emerald-500/[0.03] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/20 mb-6"
          >
            <Puzzle className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Compare Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#8B3A42]">Options</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Every solution has its strengths. Explore each option to find the perfect match for your needs.
          </p>
        </motion.div>

        {/* Option tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {treatmentOptions.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => setActiveOption(index)}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all ${
                activeOption === index
                  ? 'text-white shadow-lg'
                  : 'text-foreground-secondary bg-white border border-[#EDE5DD] hover:border-[#722F37]/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeOption === index && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${option.color}`}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <option.icon className="w-4 h-4" />
                {option.shortTitle}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Comparison content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOption}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Left: Details */}
            <div className="space-y-8">
              <div className={`p-8 rounded-3xl border-2 ${currentOption.borderColor} ${currentOption.bgColor}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentOption.color} flex items-center justify-center shadow-lg`}>
                    {(() => {
                      const Icon = currentOption.icon;
                      return <Icon className="w-7 h-7 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{currentOption.title}</h3>
                    <p className={`text-sm font-medium ${currentOption.textColor}`}>
                      {currentOption.investment} Investment
                    </p>
                  </div>
                </div>

                <p className="text-foreground-secondary mb-6 leading-relaxed">
                  {currentOption.description}
                </p>

                <div className="space-y-3">
                  {currentOption.benefits.map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className={`w-5 h-5 ${currentOption.textColor}`} />
                      <span className="text-foreground-secondary">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-current/10">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-foreground-secondary" />
                    <span className="text-foreground-secondary">Timeline:</span>
                    <span className="font-semibold text-foreground">{currentOption.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Ideal for */}
              <div className="p-6 rounded-2xl bg-white border border-[#EDE5DD] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-[#722F37]" />
                  <span className="font-semibold text-foreground">Ideal For</span>
                </div>
                <p className="text-foreground-secondary">{currentOption.ideal}</p>
              </div>
            </div>

            {/* Right: Metrics visualization */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-foreground mb-6">Performance Metrics</h4>

              {metrics.map((metric) => {
                const value = currentOption[metric.key as keyof typeof treatmentOptions[0]] as number;
                return (
                  <motion.div
                    key={metric.key}
                    className="relative p-5 rounded-2xl bg-white border border-[#EDE5DD] shadow-sm cursor-pointer"
                    onMouseEnter={() => setHoveredMetric(metric.key)}
                    onMouseLeave={() => setHoveredMetric(null)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <metric.icon className="w-5 h-5 text-[#722F37]" />
                        <span className="font-medium text-foreground">{metric.label}</span>
                      </div>
                      <motion.span
                        className="text-2xl font-bold"
                        animate={{
                          color: hoveredMetric === metric.key ? '#722F37' : '#1a1a1a',
                        }}
                      >
                        {value}%
                      </motion.span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-3 bg-[#EDE5DD] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${currentOption.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                );
              })}

              {/* Quick comparison all options */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#FDF8F3] to-white border border-[#EDE5DD]">
                <h5 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wider mb-4">
                  Quick Comparison: Durability
                </h5>
                <div className="space-y-3">
                  {treatmentOptions.map((option, i) => (
                    <div
                      key={option.id}
                      className={`flex items-center gap-3 ${i === activeOption ? 'opacity-100' : 'opacity-60'}`}
                    >
                      <div className="w-20 text-xs font-medium text-foreground">{option.shortTitle}</div>
                      <div className="flex-1 h-2 bg-[#EDE5DD] rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${option.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${option.durability}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                      <div className="w-10 text-xs font-semibold text-right">{option.durability}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// DECISION HELPER SECTION
// ============================================================================

function DecisionHelperSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const currentQ = decisionQuestions[currentQuestion]!;

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < decisionQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
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

    const sortedOptions = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([key]) => treatmentOptions.find((t) => t.id === key)!);

    return sortedOptions;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((Object.keys(answers).length / decisionQuestions.length) * 100);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full border border-[#722F37]/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full border border-white/5"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/20 border border-[#722F37]/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#722F37]" />
            <span className="text-sm font-medium text-white/80">Interactive Decision Helper</span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Find Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#8B3A42]">
              Perfect Solution
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Answer a few quick questions and we&apos;ll recommend the best options for your situation.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-white/50 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Quiz content */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-white/50">
                  Question {currentQuestion + 1} of {decisionQuestions.length}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-8">
                {currentQ.question}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {currentQ.options.map((option, i) => {
                  const isSelected = answers[currentQ.id] === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleAnswer(currentQ.id, option.value)}
                      className={`relative p-6 rounded-2xl text-left transition-all ${
                        isSelected
                          ? 'bg-[#722F37] border-2 border-[#722F37]'
                          : 'bg-white/5 border-2 border-white/10 hover:border-[#722F37]/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>
                          {option.label}
                        </span>
                        {isSelected && <Check className="w-5 h-5 text-white" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              {currentQuestion > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="mt-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous question
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 shadow-lg shadow-emerald-500/25"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Your Personalized Recommendations</h3>
                <p className="text-white/60">Based on your answers, here are your best options:</p>
              </div>

              <div className="space-y-4 mb-8">
                {calculateRecommendation()
                  .slice(0, 3)
                  .map((option, i) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`p-6 rounded-2xl border-2 ${
                        i === 0 ? `${option.borderColor} ${option.bgColor}` : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${i === 0 ? option.textColor : 'text-white'}`}>
                              {option.title}
                            </span>
                            {i === 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                                Best Match
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/50 mt-1">{option.description}</p>
                        </div>
                        <ArrowRight className={`w-5 h-5 ${i === 0 ? option.textColor : 'text-white/30'}`} />
                      </div>
                    </motion.div>
                  ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact#book">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-xl shadow-lg shadow-[#722F37]/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Free Consultation
                  </motion.button>
                </Link>
                <motion.button
                  onClick={resetQuiz}
                  className="px-8 py-4 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Over
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// QUALITY OF LIFE SECTION
// ============================================================================

function QualityOfLifeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeImpact, setActiveImpact] = useState(0);

  const currentImpact = qualityOfLifeImpacts[activeImpact]!;

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-white via-[#FDF8F3]/50 to-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/20 mb-6"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transform Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              Quality of Life
            </span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            A complete smile does more than look good—it changes how you feel, interact, and live every day.
          </p>
        </motion.div>

        {/* Impact cards */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {qualityOfLifeImpacts.map((impact, i) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setActiveImpact(i)}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
                  activeImpact === i
                    ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42] text-white shadow-xl shadow-[#722F37]/20 scale-[1.02]'
                    : 'bg-white border border-[#EDE5DD] hover:border-[#722F37]/30'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    activeImpact === i ? 'bg-white/20' : 'bg-[#722F37]/10'
                  }`}
                >
                  <impact.icon className={`w-6 h-6 ${activeImpact === i ? 'text-white' : 'text-[#722F37]'}`} />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${activeImpact === i ? '' : 'text-foreground'}`}>
                  {impact.title}
                </h3>
                <p className={`text-sm ${activeImpact === i ? 'text-white/80' : 'text-foreground-secondary'}`}>
                  {impact.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: Before/After visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl border border-[#EDE5DD] shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#722F37]" />
                <span className="font-semibold text-foreground">The Transformation</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImpact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Before */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">Before</span>
                    </div>
                    <p className="text-foreground-secondary">{currentImpact.before}</p>
                  </div>

                  {/* Transformation arrow */}
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg"
                    >
                      <ChevronDown className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  {/* After */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">After</span>
                    </div>
                    <p className="text-foreground-secondary">{currentImpact.after}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PROCESS TIMELINE SECTION
// ============================================================================

function ProcessTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/20 mb-6"
          >
            <Calendar className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Journey to a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#8B3A42]">
              Complete Smile
            </span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            We guide you through every step of your tooth replacement journey with care and expertise.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EDE5DD] to-transparent -translate-y-1/2 hidden lg:block" />

          <div className="grid lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                className="relative"
              >
                <motion.div
                  className="relative bg-white rounded-3xl p-8 border border-[#EDE5DD] shadow-sm h-full"
                  animate={{
                    scale: hoveredStep === i ? 1.02 : 1,
                    y: hoveredStep === i ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step number */}
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#722F37] to-[#8B3A42] text-white text-sm font-bold flex items-center justify-center shadow-lg"
                    animate={{
                      scale: hoveredStep === i ? 1.2 : 1,
                    }}
                  >
                    {step.step}
                  </motion.div>

                  {/* Icon */}
                  <div className="mt-4 mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-[#722F37]/10 flex items-center justify-center mx-auto"
                      animate={{
                        backgroundColor: hoveredStep === i ? 'rgba(114,47,55,0.2)' : 'rgba(114,47,55,0.1)',
                      }}
                    >
                      <step.icon className="w-8 h-8 text-[#722F37]" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground text-center mb-3">{step.title}</h3>
                  <p className="text-foreground-secondary text-center text-sm mb-4">{step.description}</p>

                  {/* Duration badge */}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FDF8F3] text-[#722F37] text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </span>
                  </div>
                </motion.div>

                {/* Connector arrow */}
                {i < processSteps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 z-10"
                    animate={{ x: hoveredStep === i ? 5 : 0 }}
                  >
                    <ArrowRight className="w-6 h-6 text-[#722F37]/30" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-32 bg-white overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#8B3A42]">
              Questions
            </span>
          </h2>
          <p className="text-xl text-foreground-secondary">
            Get answers to common questions about missing teeth replacement.
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  openIndex === i
                    ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42] border-[#722F37] text-white shadow-lg shadow-[#722F37]/20'
                    : 'bg-white border-[#EDE5DD] hover:border-[#722F37]/30'
                }`}
                whileHover={{ scale: openIndex === i ? 1 : 1.01 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-semibold ${openIndex === i ? '' : 'text-foreground'}`}>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ${openIndex === i ? '' : 'text-[#722F37]'}`} />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-4">
                      <p className="text-foreground-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES SECTION
// ============================================================================

function RelatedServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const magnetic = useMagnetic(0.1);

  const relatedServices = [
    {
      title: 'Dental Implants',
      description: 'Permanent, natural-looking tooth replacements that preserve bone and function like real teeth.',
      href: '/services/dental-implants',
      icon: Target,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Dentures',
      description: 'Complete and partial dentures for comfortable, affordable tooth replacement solutions.',
      href: '/services/dentures',
      icon: Smile,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Enhance your smile with whitening, veneers, and other aesthetic dental treatments.',
      href: '/services/cosmetic-dentistry',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Related{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#8B3A42]">
              Services
            </span>
          </h2>
          <p className="text-xl text-foreground-secondary">
            Explore more ways we can help restore and enhance your smile.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {relatedServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link href={service.href} className="block group">
                <motion.div
                  className="relative bg-white rounded-3xl p-8 border border-[#EDE5DD] shadow-sm h-full overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#722F37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-foreground-secondary mb-6">{service.description}</p>

                    <div className="flex items-center gap-2 text-[#722F37] font-medium">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function MissingTeethPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <HeroSection />
      <SolutionComparisonSection />
      <DecisionHelperSection />
      <QualityOfLifeSection />
      <ProcessTimelineSection />
      <FAQSection />
      <RelatedServicesSection />

      {/* CTA Section */}
      <ContactCTA
        variant="full"
        background="gradient"
        headline="Ready to Restore Your Complete Smile?"
        description="Book a consultation today to discuss your missing teeth replacement options. Our experienced team will help you find the perfect solution for your needs and budget."
        phoneNumber="6137331118"
        phoneDisplay="(613) 733-1118"
        showEmergency={false}
        showHours={true}
        hoursText="Mon-Sat: 9am-5pm"
        bookUrl="/contact#book"
        bookText="Book This Service"
      />
    </main>
  );
}
