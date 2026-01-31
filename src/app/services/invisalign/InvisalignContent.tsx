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
  Eye,
  Smile,
  RefreshCw,
  Target,
  X,
  Star,
  Utensils,
  Heart,
  Zap,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Percent,
  DollarSign,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
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
    question: 'How long does Invisalign treatment take?',
    answer:
      'Treatment typically takes 12-18 months, though this varies based on the complexity of your case. Some minor cases can be completed in as few as 6 months. During your consultation, we\'ll provide a personalized timeline based on your specific needs.',
  },
  {
    question: 'How many hours a day should I wear my aligners?',
    answer:
      'For best results, wear your aligners 20-22 hours per day, removing them only for eating, drinking (anything other than water), and oral hygiene. Consistent wear is essential for keeping your treatment on track.',
  },
  {
    question: 'Is Invisalign painful?',
    answer:
      'You may experience some pressure or mild discomfort when starting a new set of aligners, but this typically subsides within a few days. Most patients find Invisalign significantly more comfortable than traditional braces since there are no metal brackets or wires to irritate your mouth.',
  },
  {
    question: 'Can I eat and drink with Invisalign?',
    answer:
      'You should remove your aligners when eating or drinking anything other than water. This protects the aligners from damage and staining. Simply brush your teeth before putting them back in to maintain optimal oral hygiene.',
  },
  {
    question: 'Will people notice I\'m wearing aligners?',
    answer:
      'Invisalign aligners are made from clear, medical-grade plastic that\'s virtually invisible. Most people won\'t notice you\'re wearing them unless you point them out. This makes Invisalign ideal for adults and teens who want to straighten their teeth discreetly.',
  },
];

const benefits = [
  {
    icon: Eye,
    title: 'Nearly Invisible',
    description: 'Clear aligners are barely noticeable, so you can smile confidently throughout treatment.',
    stat: '99%',
    statLabel: 'Discretion',
  },
  {
    icon: RefreshCw,
    title: 'Completely Removable',
    description: 'Take out for eating, brushing, and special occasions—no food restrictions like with braces.',
    stat: '0',
    statLabel: 'Food restrictions',
  },
  {
    icon: Smile,
    title: 'More Comfortable',
    description: 'No metal brackets or wires means no irritation to your cheeks, lips, or gums.',
    stat: '50%',
    statLabel: 'Less discomfort',
  },
  {
    icon: Target,
    title: 'Predictable Results',
    description: 'See your projected outcome before you start with 3D digital treatment planning.',
    stat: '3D',
    statLabel: 'Preview tech',
  },
];

const treatmentTimeline = [
  {
    week: 0,
    title: 'Initial Consultation',
    description: 'Digital scans and treatment planning',
    milestone: 'Start',
  },
  {
    week: 2,
    title: 'First Aligners',
    description: 'Begin your transformation journey',
    milestone: 'Phase 1',
  },
  {
    week: 8,
    title: 'Visible Progress',
    description: 'Noticeable improvements begin',
    milestone: 'Phase 2',
  },
  {
    week: 16,
    title: 'Midpoint Check',
    description: 'Refinement adjustments if needed',
    milestone: 'Phase 3',
  },
  {
    week: 24,
    title: 'Final Stretch',
    description: 'Fine-tuning your perfect smile',
    milestone: 'Phase 4',
  },
  {
    week: 32,
    title: 'Treatment Complete',
    description: 'Your new smile revealed',
    milestone: 'Finish',
  },
];

const conditionsTreated = [
  { title: 'Crowded Teeth', description: 'When teeth overlap due to insufficient space in the jaw.' },
  { title: 'Gaps Between Teeth', description: 'Spaces between teeth caused by abnormal growth or missing teeth.' },
  { title: 'Overbite', description: 'When upper front teeth extend too far over the lower teeth.' },
  { title: 'Underbite', description: 'When lower teeth protrude past the upper front teeth.' },
  { title: 'Crossbite', description: 'When some upper teeth sit inside the lower teeth when biting down.' },
  { title: 'Open Bite', description: 'When upper and lower teeth don\'t meet when the mouth is closed.' },
];

const comparisonData = [
  { feature: 'Visibility', invisalign: 'Nearly invisible', braces: 'Clearly visible metal', advantage: 'invisalign' },
  { feature: 'Removability', invisalign: 'Fully removable', braces: 'Fixed to teeth', advantage: 'invisalign' },
  { feature: 'Diet', invisalign: 'No restrictions', braces: 'Avoid hard/sticky foods', advantage: 'invisalign' },
  { feature: 'Cleaning', invisalign: 'Normal brushing & flossing', braces: 'Special tools required', advantage: 'invisalign' },
  { feature: 'Comfort', invisalign: 'Smooth plastic', braces: 'Metal brackets & wires', advantage: 'invisalign' },
  { feature: 'Office Visits', invisalign: 'Every 6-8 weeks', braces: 'Every 4-6 weeks', advantage: 'invisalign' },
  { feature: 'Treatment Time', invisalign: '12-18 months avg', braces: '18-24 months avg', advantage: 'invisalign' },
  { feature: 'Severe Cases', invisalign: 'Moderate cases', braces: 'All case types', advantage: 'braces' },
];

const lifestyleScenarios = [
  {
    title: 'Professional Life',
    description: 'Present confidently at meetings and interviews without visible braces',
    icon: Star,
    image: '/images/cosmetic/cosmetic-08.jpg',
  },
  {
    title: 'Social Events',
    description: 'Enjoy parties and special occasions with a natural-looking smile',
    icon: Heart,
    image: '/images/cosmetic/cosmetic-14.jpg',
  },
  {
    title: 'Active Lifestyle',
    description: 'Remove aligners for sports and activities—no mouth guard conflicts',
    icon: Zap,
    image: '/images/cosmetic/cosmetic-15.jpg',
  },
  {
    title: 'Dining Freedom',
    description: 'Eat all your favorite foods without worrying about breakage',
    icon: Utensils,
    image: '/images/cosmetic/cosmetic-20.jpg',
  },
];

const relatedServices = [
  {
    title: 'Teeth Whitening',
    description: 'Complete your new smile with professional whitening after your Invisalign treatment.',
    href: '/services/teeth-whitening',
    icon: Sparkles,
  },
  {
    title: 'Cosmetic Dentistry',
    description: 'Enhance your smile further with our comprehensive cosmetic options.',
    href: '/services/cosmetic-dentistry',
    icon: Smile,
  },
  {
    title: 'Routine Checkups',
    description: 'Regular examinations to maintain your smile and overall oral health.',
    href: '/services/routine-checkups',
    icon: Shield,
  },
];

const financingOptions = [
  {
    icon: CreditCard,
    title: 'Flexible Payment Plans',
    description: 'Spread your treatment cost over manageable monthly payments',
  },
  {
    icon: Percent,
    title: 'Insurance Coverage',
    description: 'Most dental plans cover orthodontic treatments including Invisalign',
  },
  {
    icon: DollarSign,
    title: 'Interest-Free Options',
    description: 'Qualifying patients can access 0% financing for up to 24 months',
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
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114, 47, 55, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114, 47, 55, 0.04) 0%, transparent 70%)',
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(114, 47, 55, 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(114, 47, 55, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const smileImages = [
    '/images/cosmetic/cosmetic-08.jpg',
    '/images/cosmetic/cosmetic-14.jpg',
    '/images/cosmetic/cosmetic-15.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % smileImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [smileImages.length]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]">
      <FloatingOrbs />
      <GridPattern />

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
            <li className="text-neutral-400">/</li>
            <li>
              <Link href="/services" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                Services
              </Link>
            </li>
            <li className="text-neutral-400">/</li>
            <li className="text-[#722F37] font-medium">Invisalign</li>
          </ol>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Clear Aligner Technology
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-7xl font-bold text-[#1e293b] tracking-tight mb-6 leading-[1.1]"
            >
              Transform Your
              <span className="relative ml-4">
                <span className="relative z-10 bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent">
                  Smile
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  <motion.path
                    d="M2 8 C 50 2, 150 2, 198 8"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#722F37" />
                      <stop offset="100%" stopColor="#8B3A42" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              <br />
              <span className="text-4xl lg:text-5xl font-light text-neutral-600">Invisibly</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-neutral-600 leading-relaxed mb-10 max-w-xl">
              Experience the future of orthodontics with Invisalign clear aligners—virtually invisible, completely removable, and designed for your lifestyle. See your transformation before treatment begins.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/contact#book"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-2xl shadow-lg shadow-[#722F37]/25 hover:shadow-xl hover:shadow-[#722F37]/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Free Consultation
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
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
                { value: '99%', label: 'Satisfaction Rate' },
                { value: '6-18', label: 'Month Treatment' },
                { value: '50%', label: 'Faster Results' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    className="text-3xl font-bold bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image with Morph Animation */}
          <motion.div variants={slideInRight} initial="hidden" animate="visible" className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-neutral-200/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={smileImages[currentImageIndex] || '/images/cosmetic/cosmetic-08.jpg'}
                    alt="Beautiful smile transformation with Invisalign"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/30 via-transparent to-transparent" />

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {smileImages.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-8 top-1/4 bg-white rounded-2xl p-5 shadow-xl shadow-neutral-200/50 border border-neutral-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-[#722F37]" />
                </div>
                <div>
                  <p className="font-bold text-[#1e293b] text-lg">Virtually Invisible</p>
                  <p className="text-sm text-neutral-500">Clear aligner technology</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -right-8 bottom-1/4 bg-gradient-to-br from-[#722F37] to-[#8B3A42] rounded-2xl p-5 shadow-xl shadow-[#722F37]/30 text-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-bold text-lg">3D Treatment Preview</p>
                  <p className="text-sm text-white/80">See results before you start</p>
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
      >
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-[#722F37]/30 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-3 rounded-full bg-[#722F37]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// ALIGNER TECHNOLOGY SHOWCASE
// ============================================================================

function AlignerTechShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'SmartTrack Material',
      description: 'Patented thermoplastic material engineered for precise tooth movement and maximum comfort.',
      detail: 'The SmartTrack material applies gentle, consistent force throughout your treatment.',
    },
    {
      title: 'Precision Cut Edges',
      description: 'Laser-trimmed edges follow your gumline for a seamless, comfortable fit.',
      detail: 'No more irritation from bulky plastic—just smooth, natural-feeling aligners.',
    },
    {
      title: 'SmartForce Attachments',
      description: 'Tooth-colored attachments provide additional grip for complex tooth movements.',
      detail: 'These small bumps are nearly invisible and enable more predictable results.',
    },
    {
      title: 'ClinCheck Software',
      description: '3D treatment visualization shows your complete smile transformation journey.',
      detail: 'Watch your teeth move virtually before your treatment even begins.',
    },
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-[#FDF8F3]/50 to-white">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#722F37]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#722F37]/20 to-transparent" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            Advanced Technology
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Precision-Engineered for
            <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
              Your Smile
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Every Invisalign aligner is custom-manufactured using cutting-edge technology and proprietary materials for optimal results.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Aligner Visual */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#F5EDE5] to-white p-12 shadow-inner">
              {/* Aligner SVG Illustration */}
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <defs>
                    <linearGradient id="alignerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(114, 47, 55, 0.1)" />
                      <stop offset="100%" stopColor="rgba(139, 58, 66, 0.2)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Aligner Shape */}
                  <motion.path
                    d="M50 150 C 50 80, 100 50, 200 50 C 300 50, 350 80, 350 150 C 350 220, 300 250, 200 250 C 100 250, 50 220, 50 150"
                    fill="url(#alignerGradient)"
                    stroke="#722F37"
                    strokeWidth="2"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />

                  {/* Teeth Indicators */}
                  {[
                    { cx: 120, cy: 120 },
                    { cx: 160, cy: 100 },
                    { cx: 200, cy: 95 },
                    { cx: 240, cy: 100 },
                    { cx: 280, cy: 120 },
                    { cx: 120, cy: 180 },
                    { cx: 160, cy: 200 },
                    { cx: 200, cy: 205 },
                    { cx: 240, cy: 200 },
                    { cx: 280, cy: 180 },
                  ].map((tooth, i) => (
                    <motion.circle
                      key={i}
                      cx={tooth.cx}
                      cy={tooth.cy}
                      r="15"
                      fill="white"
                      stroke="#722F37"
                      strokeWidth="1.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    />
                  ))}

                  {/* Feature Highlight Points */}
                  {[
                    { cx: 50, cy: 150, label: 'Edge' },
                    { cx: 200, cy: 50, label: 'Material' },
                    { cx: 350, cy: 150, label: 'Fit' },
                  ].map((point, i) => (
                    <motion.g key={i}>
                      <motion.circle
                        cx={point.cx}
                        cy={point.cy}
                        r="8"
                        fill="#722F37"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ delay: 1 + i * 0.2, duration: 2, repeat: Infinity }}
                      />
                      <motion.circle
                        cx={point.cx}
                        cy={point.cy}
                        r="16"
                        fill="none"
                        stroke="#722F37"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ delay: 1 + i * 0.2, duration: 2, repeat: Infinity }}
                      />
                    </motion.g>
                  ))}
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature Tabs */}
          <motion.div variants={slideInRight} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeFeature === index
                      ? 'border-[#722F37] bg-gradient-to-br from-[#722F37]/5 to-transparent shadow-lg'
                      : 'border-neutral-200 bg-white hover:border-[#722F37]/30 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        activeFeature === index ? 'bg-[#722F37] text-white' : 'bg-neutral-100 text-neutral-400'
                      }`}
                      animate={{ rotate: activeFeature === index ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="font-bold">{index + 1}</span>
                    </motion.div>
                    <div className="flex-1">
                      <h3
                        className={`font-bold text-lg mb-1 ${
                          activeFeature === index ? 'text-[#722F37]' : 'text-[#1e293b]'
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 text-sm">{feature.description}</p>
                      <AnimatePresence>
                        {activeFeature === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[#722F37] text-sm mt-3 pt-3 border-t border-[#722F37]/20"
                          >
                            {feature.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform flex-shrink-0 ${
                        activeFeature === index ? 'rotate-90 text-[#722F37]' : 'text-neutral-300'
                      }`}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// BENEFITS SECTION WITH ANIMATED CARDS
// ============================================================================

function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-[#1e293b]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(114, 47, 55, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4" />
            Why Choose Invisalign
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            The Clear Advantage
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover why millions of patients choose Invisalign for a more comfortable, convenient orthodontic experience.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-[#722F37]/50 transition-all duration-500"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#722F37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                <div className="relative">
                  {/* Stat */}
                  <div className="mb-6">
                    <motion.div
                      className="text-5xl font-bold bg-gradient-to-r from-[#722F37] to-[#b85a65] bg-clip-text text-transparent"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    >
                      {benefit.stat}
                    </motion.div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{benefit.statLabel}</div>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center mb-6 shadow-lg shadow-[#722F37]/30 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TREATMENT TIMELINE ANIMATION
// ============================================================================

function TreatmentTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progressWidth = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-[#FDF8F3]">
      <FloatingOrbs />

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
            Your Journey
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Smile Transformation
            <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
              Timeline
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Follow your transformation journey from consultation to your beautiful new smile.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full hidden lg:block">
            <motion.div
              className="h-full bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
              style={{ width: progressWidth }}
            />
          </div>

          {/* Timeline Items */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 lg:grid-cols-6 gap-6"
          >
            {treatmentTimeline.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
                custom={index}
              >
                {/* Dot */}
                <motion.div
                  className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg shadow-[#722F37]/30"
                  whileHover={{ scale: 1.1 }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                >
                  <span className="text-white font-bold text-sm">
                    {item.milestone === 'Start' ? 'S' : item.milestone === 'Finish' ? 'F' : index}
                  </span>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className="text-center p-4"
                  whileHover={{ y: -4 }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold mb-3">
                    Week {item.week}
                  </span>
                  <h3 className="font-bold text-[#1e293b] mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// INVISALIGN VS BRACES COMPARISON
// ============================================================================

function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-white">
      <GridPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6"
          >
            <Target className="w-4 h-4" />
            Compare Options
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Invisalign vs Traditional
            <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
              Braces
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            See how Invisalign compares to traditional braces across key factors that matter to you.
          </motion.p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-6 rounded-2xl bg-neutral-100 text-center">
              <span className="text-neutral-600 font-semibold">Feature</span>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] text-center shadow-lg shadow-[#722F37]/20">
              <span className="text-white font-bold text-lg">Invisalign</span>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-200 text-center">
              <span className="text-neutral-700 font-semibold">Traditional Braces</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {comparisonData.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`grid grid-cols-3 gap-4 transition-all duration-300 ${
                  hoveredRow === index ? 'scale-[1.02]' : ''
                }`}
              >
                <div
                  className={`p-5 rounded-xl border-2 transition-all ${
                    hoveredRow === index ? 'border-[#722F37]/30 bg-[#FDF8F3]' : 'border-transparent bg-neutral-50'
                  }`}
                >
                  <span className="font-semibold text-[#1e293b]">{row.feature}</span>
                </div>
                <div
                  className={`p-5 rounded-xl flex items-center gap-3 transition-all ${
                    row.advantage === 'invisalign'
                      ? 'bg-[#722F37]/10 border-2 border-[#722F37]/30'
                      : 'bg-neutral-50 border-2 border-transparent'
                  }`}
                >
                  {row.advantage === 'invisalign' && <Check className="w-5 h-5 text-[#722F37] flex-shrink-0" />}
                  <span className={row.advantage === 'invisalign' ? 'text-[#722F37] font-medium' : 'text-neutral-600'}>
                    {row.invisalign}
                  </span>
                </div>
                <div
                  className={`p-5 rounded-xl flex items-center gap-3 transition-all ${
                    row.advantage === 'braces'
                      ? 'bg-neutral-200 border-2 border-neutral-300'
                      : 'bg-neutral-50 border-2 border-transparent'
                  }`}
                >
                  {row.advantage === 'braces' && <Check className="w-5 h-5 text-neutral-700 flex-shrink-0" />}
                  <span className={row.advantage === 'braces' ? 'text-neutral-700 font-medium' : 'text-neutral-500'}>
                    {row.braces}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-[#722F37]/5 to-[#722F37]/10 border border-[#722F37]/20"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg shadow-[#722F37]/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1e293b] mb-1">Invisalign Wins in 7 out of 8 Categories</h3>
                <p className="text-neutral-600">
                  For most patients, Invisalign offers a superior experience with comparable or better results.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// LIFESTYLE BENEFITS CAROUSEL
// ============================================================================

function LifestyleShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % lifestyleScenarios.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + lifestyleScenarios.length) % lifestyleScenarios.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4" />
            Live Your Life
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Invisalign Fits Your
            <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
              Lifestyle
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Carousel */}
          <motion.div variants={slideInLeft} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-neutral-200/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={lifestyleScenarios[activeIndex]?.image ?? '/images/cosmetic/cosmetic-08.jpg'}
                    alt={lifestyleScenarios[activeIndex]?.title ?? 'Lifestyle'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {lifestyleScenarios.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Cards */}
          <motion.div variants={slideInRight} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <div className="space-y-4">
              {lifestyleScenarios.map((scenario, index) => {
                const Icon = scenario.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-500 ${
                      activeIndex === index
                        ? 'border-[#722F37] bg-gradient-to-br from-[#722F37]/10 to-transparent shadow-lg scale-105'
                        : 'border-neutral-200 bg-white hover:border-[#722F37]/30'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          activeIndex === index
                            ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/30'
                            : 'bg-neutral-100'
                        }`}
                      >
                        <Icon className={`w-7 h-7 ${activeIndex === index ? 'text-white' : 'text-neutral-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-bold text-lg mb-1 ${
                            activeIndex === index ? 'text-[#722F37]' : 'text-[#1e293b]'
                          }`}
                        >
                          {scenario.title}
                        </h3>
                        <p className="text-neutral-600 text-sm">{scenario.description}</p>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          activeIndex === index ? 'text-[#722F37] translate-x-1' : 'text-neutral-300'
                        }`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONDITIONS TREATED
// ============================================================================

function ConditionsTreated() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-white">
      <GridPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6"
          >
            <Check className="w-4 h-4" />
            What We Treat
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Conditions We Treat with
            <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
              Invisalign
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Invisalign can effectively address a wide range of orthodontic concerns for both teens and adults.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {conditionsTreated.map((condition, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white to-[#FDF8F3]/50 border border-neutral-200 hover:border-[#722F37]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#722F37]/20 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-[#1e293b] mb-2 group-hover:text-[#722F37] transition-colors">
                    {condition.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{condition.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FINANCING OPTIONS
// ============================================================================

function FinancingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6"
          >
            <DollarSign className="w-4 h-4" />
            Flexible Financing
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Investment in Your
            <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
              Smile
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We believe everyone deserves a beautiful smile. Explore our flexible payment options designed to fit your budget.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {financingOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-white border-2 border-neutral-200 hover:border-[#722F37]/30 hover:shadow-2xl transition-all duration-500"
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 12 }}
                >
                  <Icon className="w-8 h-8 text-[#722F37]" />
                </motion.div>
                <h3 className="text-xl font-bold text-[#1e293b] mb-3">{option.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{option.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Box */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-[#722F37] to-[#5a252c] text-white text-center shadow-2xl shadow-[#722F37]/30"
        >
          <h3 className="text-2xl font-bold mb-4">Get Your Free Consultation</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a complimentary consultation to discuss your treatment options and receive a personalized payment plan that works for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact#book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </Link>
            <a
              href="tel:+16137336446"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (613) 733-6446
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-white">
      <GridPattern />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            Common Questions
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent ml-3">
              Questions
            </span>
          </motion.h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? 'border-[#722F37]/30 bg-gradient-to-br from-white to-[#FDF8F3] shadow-xl'
                  : 'border-neutral-200 bg-white hover:border-[#722F37]/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50"
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-[#722F37]' : 'text-[#1e293b]'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-4 ${
                    openIndex === index ? 'bg-[#722F37] text-white' : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
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
                    <div className="px-8 pb-6 text-neutral-600 leading-relaxed border-t border-[#722F37]/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div variants={fadeInUp} className="mt-12 text-center">
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
  );
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

function RelatedServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold text-[#1e293b] tracking-tight mb-4">
            Complete Your Smile Journey
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore other services that complement your Invisalign treatment.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {relatedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Link
                  href={service.href}
                  className="group block p-8 rounded-3xl bg-white border-2 border-neutral-200 hover:border-[#722F37]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-[#722F37]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-2 group-hover:text-[#722F37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-[#722F37] font-semibold group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:gap-3 transition-all"
          >
            View All Services <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const magnetic = useMagnetic(0.2);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <motion.div variants={scaleIn} className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm mb-6">
              <Smile className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Ready to Transform
            <br />
            <span className="text-white/90">Your Smile?</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Schedule your free Invisalign consultation today and discover how clear aligners can transform your smile discreetly and comfortably.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
            <motion.div
              style={{ x: magnetic.x, y: magnetic.y }}
              onMouseMove={magnetic.handleMouseMove}
              onMouseLeave={magnetic.handleMouseLeave}
            >
              <Link
                href="/contact#book"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-[#722F37] font-bold text-lg rounded-2xl shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300"
              >
                <Calendar className="w-6 h-6" />
                Book Free Consultation
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <a
              href="tel:+16137336446"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 text-white font-semibold text-lg rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <Phone className="w-6 h-6" />
              (613) 733-6446
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function InvisalignContent() {
  return (
    <main id="main-content" className="min-h-screen">
      <HeroSection />
      <AlignerTechShowcase />
      <BenefitsSection />
      <TreatmentTimeline />
      <ComparisonSection />
      <LifestyleShowcase />
      <ConditionsTreated />
      <FinancingSection />
      <FAQSection />
      <RelatedServices />
      <FinalCTA />
    </main>
  );
}
