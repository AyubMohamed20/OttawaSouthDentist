'use client';

import { useState, useRef } from 'react';
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
  Sun,
  Utensils,
  Timer,
  CircleDollarSign,
  Star,
  Baby,
  Zap,
  Award,
  ChevronRight,
  Play,
  TrendingUp,
  Users,
  Activity,
  Leaf,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What are dental sealants?',
    answer:
      'Dental sealants are thin protective coatings applied to back teeth to prevent cavities. They seal grooves where food and bacteria get trapped. Beneficial for children and adults with deep grooves.',
  },
  {
    question: 'How does fluoride treatment work?',
    answer:
      "Professional fluoride strengthens enamel and repairs early decay. It's much stronger than toothpaste fluoride. We recommend treatments every 6 months during regular visits.",
  },
  {
    question: 'How often should I visit?',
    answer:
      "Most patients benefit from visits every 6 months. Those with a history of cavities or gum disease may need more frequent visits. We'll assess your needs and recommend a personalized schedule.",
  },
  {
    question: 'Do I need a custom mouthguard?',
    answer:
      "If you or your child plays contact sports, a custom mouthguard is highly recommended. Custom-fitted guards provide better protection than store-bought options and don't interfere with breathing.",
  },
  {
    question: 'What causes teeth grinding?',
    answer:
      'Teeth grinding (bruxism) is often caused by stress, sleep disorders, or bite issues. It can lead to worn teeth, jaw pain, and headaches. A custom night guard protects against damage.',
  },
];

const preventiveServices = [
  {
    icon: Droplets,
    title: 'Fluoride Treatments',
    description: 'Professional-strength fluoride to strengthen enamel and repair early decay before it becomes a problem.',
    benefit: 'Cavity Prevention',
    effectiveness: 95,
    gradient: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-400',
  },
  {
    icon: Shield,
    title: 'Dental Sealants',
    description: 'Invisible protective barriers that shield the grooves of back teeth from decay-causing bacteria.',
    benefit: 'Long-term Protection',
    effectiveness: 90,
    gradient: 'from-violet-500 to-purple-400',
    bgColor: 'bg-violet-50',
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-400',
  },
  {
    icon: GraduationCap,
    title: 'Oral Hygiene Education',
    description: 'Personalized coaching on brushing techniques, flossing, and building habits that last a lifetime.',
    benefit: 'Better Habits',
    effectiveness: 100,
    gradient: 'from-emerald-500 to-green-400',
    bgColor: 'bg-emerald-50',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-green-400',
  },
  {
    icon: Apple,
    title: 'Nutritional Counseling',
    description: 'Expert guidance on foods that strengthen teeth and dietary changes to reduce cavity risk.',
    benefit: 'Holistic Health',
    effectiveness: 85,
    gradient: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange-50',
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-400',
  },
  {
    icon: BadgeCheck,
    title: 'Custom Mouthguards',
    description: 'Professional-grade protection for athletes, perfectly fitted for comfort and maximum safety.',
    benefit: 'Sports Safety',
    effectiveness: 98,
    gradient: 'from-cyan-500 to-teal-400',
    bgColor: 'bg-cyan-50',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-400',
  },
  {
    icon: Moon,
    title: 'Night Guards',
    description: 'Custom-crafted guards that protect teeth from grinding and clenching while you sleep.',
    benefit: 'Sleep Protection',
    effectiveness: 92,
    gradient: 'from-indigo-500 to-blue-400',
    bgColor: 'bg-indigo-50',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-400',
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Fewer Cavities',
    stat: '75%',
    description: 'Reduced decay risk',
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-500/20 to-green-500/10',
  },
  {
    icon: Clock,
    title: 'Early Detection',
    stat: '90%',
    description: 'Issues caught early',
    color: 'text-blue-600',
    bgGradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    icon: DollarSign,
    title: 'Cost Savings',
    stat: '50%',
    description: 'Less spent on repairs',
    color: 'text-amber-600',
    bgGradient: 'from-amber-500/20 to-yellow-500/10',
  },
  {
    icon: Smile,
    title: 'Confidence',
    stat: '100%',
    description: 'Beautiful, healthy smile',
    color: 'text-rose-600',
    bgGradient: 'from-rose-500/20 to-pink-500/10',
  },
];

const dailyRoutineSteps = [
  {
    time: 'Morning',
    icon: Sun,
    title: 'Start Fresh',
    emoji: '🌅',
    actions: [
      'Brush 2 mins with fluoride toothpaste',
      'Clean your tongue gently',
      'Floss between all teeth',
      'Rinse with mouthwash',
    ],
    tip: 'Wait 30 minutes after eating before brushing',
    duration: '5 min',
    color: 'from-amber-400 to-orange-500',
  },
  {
    time: 'After Meals',
    icon: Utensils,
    title: 'Mid-Day Care',
    emoji: '🥗',
    actions: [
      'Rinse mouth with water',
      'Chew sugar-free gum',
      'Avoid frequent snacking',
      'Choose teeth-friendly snacks',
    ],
    tip: 'Crunchy fruits and veggies help clean teeth naturally',
    duration: '2 min',
    color: 'from-green-400 to-emerald-500',
  },
  {
    time: 'Evening',
    icon: Moon,
    title: 'Night Routine',
    emoji: '🌙',
    actions: [
      'Brush thoroughly before bed',
      'Floss to remove daily buildup',
      'Use fluoride mouthwash',
      'Wear night guard if prescribed',
    ],
    tip: 'Never skip nighttime brushing—it\'s the most important',
    duration: '5 min',
    color: 'from-indigo-400 to-purple-500',
  },
];

const healthMilestones = [
  {
    age: '0-6',
    title: 'Early Childhood',
    subtitle: 'Building foundations',
    milestones: ['First dental visit by age 1', 'Establish brushing habits', 'Fluoride varnish treatments', 'Monitor jaw development'],
    icon: Baby,
    color: 'from-pink-500 to-rose-400',
  },
  {
    age: '6-12',
    title: 'Transition Years',
    subtitle: 'Growing smiles',
    milestones: ['Sealants on permanent molars', 'X-rays for development', 'Orthodontic evaluation', 'Sports mouthguard fitting'],
    icon: Star,
    color: 'from-amber-500 to-yellow-400',
  },
  {
    age: '13-18',
    title: 'Adolescence',
    subtitle: 'Maintaining health',
    milestones: ['Wisdom teeth monitoring', 'Periodontal health focus', 'Whitening consultations', 'Diet & lifestyle education'],
    icon: Zap,
    color: 'from-violet-500 to-purple-400',
  },
  {
    age: '19-40',
    title: 'Adult Years',
    subtitle: 'Prevention focus',
    milestones: ['Regular professional cleanings', 'Gum disease prevention', 'Night guard assessment', 'Cosmetic options review'],
    icon: Award,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    age: '40+',
    title: 'Mature Adult',
    subtitle: 'Comprehensive care',
    milestones: ['Oral cancer screenings', 'Dry mouth management', 'Restoration maintenance', 'Bone health monitoring'],
    icon: Heart,
    color: 'from-emerald-500 to-green-400',
  },
];

const costComparison = [
  { category: 'Prevention', cost: 300, color: '#22c55e', description: 'Regular preventive care', icon: Shield },
  { category: 'Minor Treatment', cost: 500, color: '#eab308', description: 'When prevention is skipped', icon: Activity },
  { category: 'Major Treatment', cost: 3000, color: '#ef4444', description: 'Advanced decay treatment', icon: TrendingUp },
];

const relatedServices = [
  {
    icon: Sparkles,
    title: 'Dental Hygiene',
    description: 'Professional cleanings',
    href: '/services/dental-hygiene',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Stethoscope,
    title: 'Routine Checkups',
    description: 'Comprehensive exams',
    href: '/services/routine-checkups',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Heart,
    title: 'Gum Therapy',
    description: 'Periodontal health',
    href: '/services/gum-therapy',
    gradient: 'from-rose-500 to-pink-500',
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-10%', left: '-20%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-[#722F37]/15 to-rose-400/15 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '-15%' }}
      />
    </div>
  );
}

function ShieldPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
      <pattern id="shield-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path
          d="M30 5 L50 15 L50 35 C50 45 40 52 30 55 C20 52 10 45 10 35 L10 15 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#shield-pattern)" />
    </svg>
  );
}

// ============================================================================
// MOBILE HERO SECTION - COMPLETELY REDESIGNED
// ============================================================================

function MobileHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col">
      {/* Full-bleed Hero Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <Image
            src="/images/services/preventive-dentistry/mobile/hero-smile-mirror.jpg"
            alt="Happy patient admiring their healthy smile in dental mirror"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/90 via-transparent to-transparent" />
      </div>

      {/* Breadcrumb - Top */}
      <div className="relative z-10 pt-4 px-5">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-xs text-white/80">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-white font-medium">Preventive Care</li>
          </ol>
        </motion.nav>
      </div>

      {/* Content - Bottom */}
      <div className="relative z-10 mt-auto px-5 pb-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Animated badge */}
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Protect Your Family's Smiles
            </span>
          </motion.div>

          {/* Hero headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-[2.5rem] leading-[1.1] font-bold text-white tracking-tight mb-4"
          >
            Preventive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-white">
              Dentistry
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-base text-white/90 leading-relaxed mb-6 max-w-[280px]"
          >
            Stop problems before they start. Keep teeth healthy and beautiful for a lifetime.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            variants={fadeInUp}
            className="flex gap-3 mb-8"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">75%</p>
                <p className="text-[10px] text-white/70">Less Decay</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">All Ages</p>
                <p className="text-[10px] text-white/70">Family Care</p>
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <Link
              href="/contact#book"
              className="group flex items-center justify-center gap-2 w-full py-4 bg-white text-[#722F37] font-semibold rounded-2xl shadow-2xl shadow-black/20 active:scale-[0.98] transition-transform"
            >
              <Calendar className="w-5 h-5" />
              Book Preventive Visit
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>

            <a
              href="tel:+16137336446"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-2xl border border-white/20 active:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              (613) 733-6446
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="w-5 h-5 text-white/50" />
      </motion.div>
    </section>
  );
}

// ============================================================================
// WHY PREVENTION - IMMERSIVE SECTION
// ============================================================================

function MobileWhyPrevention() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const features = [
    {
      icon: ShieldCheck,
      title: 'Stop Problems Early',
      desc: 'Catch issues when they\'re tiny—before they become big (and expensive)',
      gradient: 'from-emerald-500 to-green-400',
    },
    {
      icon: Heart,
      title: 'Whole-Body Health',
      desc: 'Healthy gums linked to lower risk of heart disease & diabetes',
      gradient: 'from-rose-500 to-pink-400',
    },
    {
      icon: CircleDollarSign,
      title: 'Smart Savings',
      desc: 'Prevention costs 10x less than treatment—save money long-term',
      gradient: 'from-amber-500 to-yellow-400',
    },
    {
      icon: Smile,
      title: 'Lasting Confidence',
      desc: 'Keep your natural, beautiful smile for decades to come',
      gradient: 'from-violet-500 to-purple-400',
    },
  ];

  return (
    <section ref={containerRef} className="relative py-16 px-5 bg-white overflow-hidden">
      <FloatingOrbs />

      {/* Section image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="relative rounded-3xl overflow-hidden aspect-[4/3] mb-8 shadow-2xl shadow-[#722F37]/10"
      >
        <Image
          src="/images/services/preventive-dentistry/mobile/pediatric-checkup.jpg"
          alt="Friendly dentist performing gentle checkup on child patient"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Floating stat card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 20 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#1e293b]">90%</p>
              <p className="text-xs text-neutral-500">Issues Preventable</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs font-semibold mb-3">
          <Leaf className="w-3.5 h-3.5" />
          Why Prevention?
        </span>

        <h2 className="text-[1.75rem] font-bold text-[#1e293b] leading-tight mb-3">
          The Best Treatment is{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
            Prevention
          </span>
        </h2>

        <p className="text-neutral-600 leading-relaxed">
          Like changing your car's oil prevents engine damage, regular dental care prevents
          costly problems before they start.
        </p>
      </motion.div>

      {/* Feature cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="space-y-3"
      >
        {features.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={slideInRight}
              className="group relative p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 shadow-lg shadow-${feature.gradient.split('-')[1]}-500/20`}>
                  <FeatureIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1e293b] mb-1">{feature.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// ============================================================================
// SERVICES - PREMIUM SWIPEABLE CARDS
// ============================================================================

function MobileServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const activeService = preventiveServices[activeIndex]!;
  const ActiveIcon = activeService.icon;

  return (
    <section ref={containerRef} className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-50" />
      <ShieldPattern />

      <div className="relative px-5">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-100 text-[#722F37] text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            Complete Protection
          </span>

          <h2 className="text-[1.75rem] font-bold text-[#1e293b] leading-tight mb-2">
            Our Preventive Services
          </h2>
          <p className="text-neutral-600">
            Comprehensive care to keep your smile healthy.
          </p>
        </motion.div>

        {/* Service pills - horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide mb-6">
          {preventiveServices.map((service, index) => {
            const isActive = activeIndex === index;
            const ServiceIcon = service.icon;
            return (
              <motion.button
                key={service.title}
                onClick={() => setActiveIndex(index)}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white shadow-lg shadow-[#722F37]/25'
                    : 'bg-white text-neutral-600 border border-neutral-200 shadow-sm'
                }`}
              >
                <ServiceIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span className="text-sm font-medium">{service.title.split(' ')[0]}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active service card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className={`relative rounded-3xl overflow-hidden ${activeService.bgColor} border border-neutral-100`}
          >
            {/* Card header with icon */}
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 rounded-2xl ${activeService.iconBg} flex items-center justify-center shadow-lg`}>
                  <ActiveIcon className="w-8 h-8 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full bg-white/80 text-xs font-semibold bg-gradient-to-r ${activeService.gradient} bg-clip-text text-transparent`}>
                  {activeService.benefit}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#1e293b] mb-2">
                {activeService.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-6">
                {activeService.description}
              </p>
            </div>

            {/* Effectiveness meter */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-500">Effectiveness Rate</span>
                <motion.span
                  key={`effectiveness-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-lg font-bold bg-gradient-to-r from-[#722F37] to-rose-500 bg-clip-text text-transparent"
                >
                  {activeService.effectiveness}%
                </motion.span>
              </div>
              <div className="h-3 bg-white/80 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${activeService.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${activeService.effectiveness}%` }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                />
              </div>
            </div>

            {/* Decorative element */}
            <div className={`absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${activeService.gradient} opacity-10 blur-2xl`} />
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {preventiveServices.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-8 bg-gradient-to-r from-[#722F37] to-[#8B3A42]'
                  : 'w-2 bg-neutral-300'
              }`}
              aria-label={`View service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// BENEFITS - STUNNING GRID
// ============================================================================

function MobileBenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section ref={containerRef} className="relative py-16 px-5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-white to-emerald-50/30" />

      <div className="relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-100 text-[#722F37] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Proven Results
          </span>

          <h2 className="text-[1.75rem] font-bold text-[#1e293b] leading-tight">
            Why Prevention{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
              Matters
            </span>
          </h2>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-3"
        >
          {benefits.map((benefit, index) => {
            const BenefitIcon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={scaleIn}
                className="relative group"
              >
                <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${benefit.bgGradient} border border-white shadow-lg overflow-hidden`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4`}>
                    <BenefitIcon className={`w-6 h-6 ${benefit.color}`} />
                  </div>

                  {/* Stat */}
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                    className={`text-3xl font-bold ${benefit.color} mb-1`}
                  >
                    {benefit.stat}
                  </motion.p>

                  <h3 className="font-bold text-[#1e293b] text-sm mb-0.5">{benefit.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{benefit.description}</p>

                  {/* Decorative circle */}
                  <div className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full ${benefit.color.replace('text-', 'bg-')}/10 blur-xl`} />
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
// DAILY ROUTINE - INTERACTIVE TIMELINE
// ============================================================================

function MobileDailyRoutine() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const currentStep = dailyRoutineSteps[activeStep]!;
  const CurrentIcon = currentStep.icon;

  return (
    <section ref={containerRef} className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />

      <div className="relative px-5">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5" />
            Daily Habits
          </span>

          <h2 className="text-[1.75rem] font-bold text-[#1e293b] leading-tight mb-2">
            Your Daily{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Routine Guide
            </span>
          </h2>
          <p className="text-neutral-600">Simple steps for a lifetime of healthy smiles.</p>
        </motion.div>

        {/* Timeline tabs */}
        <div className="flex gap-3 mb-6">
          {dailyRoutineSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = activeStep === index;
            return (
              <motion.button
                key={step.time}
                onClick={() => setActiveStep(index)}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  isActive
                    ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                    : 'bg-white text-neutral-500 border border-neutral-200'
                }`}
              >
                <StepIcon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span className="text-xs font-medium">{step.time}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active step card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="bg-white rounded-3xl border border-neutral-100 shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${currentStep.color} p-5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-2xl">{currentStep.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentStep.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Timer className="w-4 h-4" />
                      {currentStep.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions list */}
            <div className="p-5 space-y-3">
              {currentStep.actions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentStep.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm text-neutral-700 leading-relaxed pt-0.5">{action}</span>
                </motion.div>
              ))}

              {/* Pro tip */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-700 mb-0.5">Pro Tip</p>
                    <p className="text-sm text-amber-800/80 leading-relaxed">{currentStep.tip}</p>
                  </div>
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
// COST COMPARISON - VISUAL IMPACT
// ============================================================================

function MobileCostComparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const maxCost = Math.max(...costComparison.map(c => c.cost));

  return (
    <section ref={containerRef} className="relative py-16 px-5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50" />

      <div className="relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs font-semibold mb-3">
            <CircleDollarSign className="w-3.5 h-3.5" />
            Smart Investment
          </span>

          <h2 className="text-[1.75rem] font-bold text-[#1e293b] leading-tight mb-2">
            Prevention vs.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500">
              Treatment
            </span>
          </h2>
          <p className="text-neutral-600">See how preventive care saves you money.</p>
        </motion.div>

        {/* Cost visualization */}
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl p-5 mb-6">
          <div className="space-y-5">
            {costComparison.map((item, index) => {
              const barWidth = (item.cost / maxCost) * 100;
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <ItemIcon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="font-medium text-[#1e293b] text-sm">{item.category}</span>
                    </div>
                    <span className="text-lg font-bold" style={{ color: item.color }}>
                      ${item.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-10 bg-neutral-100 rounded-xl overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-xl flex items-center px-3"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${barWidth}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                      {barWidth > 35 && (
                        <span className="text-xs text-white font-medium truncate">{item.description}</span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Savings callout */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ delay: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-white shadow-2xl shadow-emerald-500/30"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CircleDollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">Save $2,700+</p>
              <p className="text-emerald-100 text-sm">per year with preventive care</p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-emerald-400/30 rounded-full blur-xl" />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// HEALTH MILESTONES - AGE TIMELINE
// ============================================================================

function MobileHealthMilestones() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const current = healthMilestones[activeIndex]!;
  const CurrentIcon = current.icon;

  return (
    <section ref={containerRef} className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-[#FDF8F3]" />

      <div className="relative px-5">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5" />
            Lifetime Care
          </span>

          <h2 className="text-[1.75rem] font-bold text-[#1e293b] leading-tight mb-2">
            Care for Every{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">
              Stage of Life
            </span>
          </h2>
          <p className="text-neutral-600">Age-appropriate preventive care for your family.</p>
        </motion.div>

        {/* Age selector - horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide mb-6">
          {healthMilestones.map((milestone, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.button
                key={milestone.age}
                onClick={() => setActiveIndex(index)}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-2xl whitespace-nowrap transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${milestone.color} text-white shadow-lg`
                    : 'bg-white text-neutral-600 border border-neutral-200 shadow-sm'
                }`}
              >
                <span className="text-lg font-bold">{milestone.age}</span>
                <span className={`block text-xs ${isActive ? 'text-white/80' : 'text-neutral-400'}`}>years</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active milestone card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="bg-white rounded-3xl border border-neutral-100 shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${current.color} p-5`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <CurrentIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Ages {current.age}</p>
                  <h3 className="text-xl font-bold text-white">{current.title}</h3>
                  <p className="text-white/70 text-sm">{current.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Milestones list */}
            <div className="p-5 space-y-3">
              {current.milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${current.color} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-neutral-700">{milestone}</span>
                </motion.div>
              ))}

              {/* CTA */}
              <Link
                href="/contact#book"
                className={`flex items-center justify-center gap-2 mt-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r ${current.color} bg-clip-text text-transparent border border-current`}
              >
                Schedule age-appropriate care
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ - ELEGANT ACCORDION
// ============================================================================

function MobileFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section ref={containerRef} className="relative py-16 px-5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F3] to-white" />

      <div className="relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-100 text-[#722F37] text-xs font-semibold mb-3">
            <Play className="w-3.5 h-3.5" />
            Got Questions?
          </span>

          <h2 className="text-[1.75rem] font-bold text-[#1e293b] leading-tight">
            Common{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
              Questions
            </span>
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden transition-all ${
                  isOpen
                    ? 'bg-white shadow-xl shadow-[#722F37]/5 border-[#722F37]/20'
                    : 'bg-white border-neutral-100'
                } border`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    isOpen
                      ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42] text-white'
                      : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className={`font-medium flex-1 pr-2 transition-colors ${
                    isOpen ? 'text-[#722F37]' : 'text-[#1e293b]'
                  }`}>
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#722F37]' : 'text-neutral-400'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 pb-4 pl-[72px]">
                        <p className="text-neutral-600 leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-neutral-500 text-sm mb-3">Still have questions?</p>
          <a
            href="tel:+16137336446"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#722F37]/10 text-[#722F37] font-medium text-sm"
          >
            <Phone className="w-4 h-4" />
            Call (613) 733-6446
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

function MobileRelatedServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section ref={containerRef} className="relative py-16 px-5 bg-white overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-50 text-neutral-600 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Complete Care
        </span>

        <h2 className="text-[1.75rem] font-bold text-[#1e293b] leading-tight">
          Related Services
        </h2>
      </motion.div>

      {/* Services list */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="space-y-3"
      >
        {relatedServices.map((service, index) => {
          const ServiceIcon = service.icon;
          return (
            <motion.div key={service.title} variants={slideInRight}>
              <Link
                href={service.href}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 shadow-sm active:scale-[0.98] transition-transform"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                  <ServiceIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1e293b] mb-0.5">{service.title}</h3>
                  <p className="text-sm text-neutral-500">{service.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function MobileCTASection() {
  return (
    <section className="relative py-20 px-5 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-white/5 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: '-20%', right: '-20%' }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-emerald-400/10 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ bottom: '-10%', left: '-10%' }}
        />
      </div>

      {/* Shield pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <ShieldPattern />
      </div>

      <div className="relative z-10 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
        >
          <ShieldCheck className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-3"
        >
          Ready to Protect Your Smile?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/80 mb-8 max-w-xs mx-auto leading-relaxed"
        >
          Take the first step toward a lifetime of healthy, beautiful teeth for your whole family.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <Link
            href="/contact#book"
            className="group flex items-center justify-center gap-2 w-full py-4 bg-white text-[#722F37] font-bold rounded-2xl shadow-2xl shadow-black/20 active:scale-[0.98] transition-transform"
          >
            <Calendar className="w-5 h-5" />
            Book Preventive Visit
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>

          <a
            href="tel:+16137336446"
            className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-2xl border border-white/20 active:bg-white/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            (613) 733-6446
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA
// ============================================================================

function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-neutral-200 px-4 py-3 safe-area-pb">
      <Link
        href="/contact#book"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-xl shadow-lg shadow-[#722F37]/25 active:scale-[0.98] transition-transform"
      >
        <Calendar className="w-5 h-5" />
        Book Preventive Care
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PreventiveDentistryContentMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-white pb-20">
      <MobileHeroSection />
      <MobileWhyPrevention />
      <MobileServicesSection />
      <MobileBenefitsSection />
      <MobileDailyRoutine />
      <MobileCostComparison />
      <MobileHealthMilestones />
      <MobileFAQSection />
      <MobileRelatedServices />
      <MobileCTASection />
      <StickyMobileCTA />
    </main>
  );
}
