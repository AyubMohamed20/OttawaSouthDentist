'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  Heart,
  Stethoscope,
  AlertCircle,
  Pill,
  Syringe,
  Activity,
  ThermometerSnowflake,
  Utensils,
  BedDouble,
  Cigarette,
  Droplets,
  CircleCheckBig,
  Award,
  Timer,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Waves,
  HeartPulse,
  Bone,
  BriefcaseMedical,
  ShieldCheck,
  Star,
  MapPin,
  Play,
  X,
  Users,
  CheckCircle2,
  Zap,
  BadgeCheck,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

// ============================================================================
// SVG BACKGROUNDS & DECORATIVE ELEMENTS
// ============================================================================

const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-rose-200/40 to-amber-100/30 blur-3xl"
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{ top: '-10%', right: '-20%' }}
    />
    <motion.div
      className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-[#722F37]/20 to-rose-200/30 blur-3xl"
      animate={{
        x: [0, -20, 0],
        y: [0, 30, 0],
        scale: [1, 0.9, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      style={{ bottom: '10%', left: '-15%' }}
    />
  </div>
);

const SubtleGrid = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
    <pattern id="mobile-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-[#722F37]" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#mobile-grid)" />
  </svg>
);

const WaveShape = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 1440 80"
    className={`w-full ${className}`}
    preserveAspectRatio="none"
  >
    <path
      d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
      fill="currentColor"
    />
  </svg>
);

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is tooth extraction painful?',
    answer:
      "Extractions are performed with local anesthesia so you won't feel pain during the procedure. You may feel some pressure, but no sharp pain. Some discomfort is normal during healing but is easily manageable with over-the-counter or prescribed pain medication.",
  },
  {
    question: 'How long is recovery after wisdom teeth removal?',
    answer:
      'Most patients recover within a few days to a week. The first 2-3 days typically involve the most swelling and discomfort. Following post-operative instructions helps ensure smooth healing.',
  },
  {
    question: 'What should I eat after oral surgery?',
    answer:
      'Soft foods are recommended for the first few days. Good options include yogurt, smoothies, mashed potatoes, soup (not too hot), scrambled eggs, and applesauce. Avoid hard, crunchy, or spicy foods.',
  },
  {
    question: 'When do wisdom teeth need to be removed?',
    answer:
      'Wisdom teeth often need removal when they are impacted, causing crowding or damage to adjacent teeth, partially erupted and prone to infection, or causing pain and discomfort.',
  },
  {
    question: 'What is bone grafting and when is it needed?',
    answer:
      "Bone grafting rebuilds jawbone lost due to tooth extraction, gum disease, or injury. It's often needed before dental implant placement to ensure there's enough bone to support the implant.",
  },
];

const surgeryTypes = [
  {
    id: 'simple',
    title: 'Simple Extractions',
    shortTitle: 'Simple',
    description: 'Removal of visible teeth that are damaged or decayed.',
    details: ['Minimally invasive', 'Local anesthesia', 'Quick recovery'],
    duration: '15-30 min',
    recovery: '1-2 days',
    icon: CircleCheckBig,
    gradient: 'from-emerald-500 via-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'surgical',
    title: 'Surgical Extractions',
    shortTitle: 'Surgical',
    description: 'Removal of teeth broken at the gum line or not fully emerged.',
    details: ['Incision required', 'Sutures needed', 'Comprehensive care'],
    duration: '30-60 min',
    recovery: '3-5 days',
    icon: Stethoscope,
    gradient: 'from-blue-500 via-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    id: 'wisdom',
    title: 'Wisdom Teeth',
    shortTitle: 'Wisdom',
    description: 'Specialized extraction of impacted or problematic wisdom teeth.',
    details: ['Expert handling', 'Sedation available', 'All four at once'],
    duration: '45-90 min',
    recovery: '5-7 days',
    icon: Sparkles,
    gradient: 'from-violet-500 via-purple-400 to-fuchsia-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
  {
    id: 'grafting',
    title: 'Bone Grafting',
    shortTitle: 'Grafting',
    description: 'Rebuilding jawbone structure for dental implants.',
    details: ['Multiple materials', 'Implant prep', 'Long-term benefits'],
    duration: '60-120 min',
    recovery: '2-4 weeks',
    icon: Bone,
    gradient: 'from-rose-500 via-pink-400 to-rose-400',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200',
  },
];

const sedationOptions = [
  {
    title: 'Local Anesthesia',
    description: 'Numbs only the treatment area for focused comfort',
    icon: Syringe,
    level: 1,
    color: 'from-emerald-400 to-emerald-500',
  },
  {
    title: 'Nitrous Oxide',
    description: 'Relaxed, euphoric state throughout procedure',
    icon: Waves,
    level: 2,
    color: 'from-sky-400 to-blue-500',
  },
  {
    title: 'Oral Sedation',
    description: 'Deep relaxation via medication before surgery',
    icon: Pill,
    level: 3,
    color: 'from-violet-400 to-purple-500',
  },
  {
    title: 'IV Sedation',
    description: 'Maximum comfort for complex procedures',
    icon: Droplets,
    level: 4,
    color: 'from-rose-400 to-pink-500',
  },
];

const recoveryTimeline = [
  {
    day: 'Day 0',
    title: 'Surgery Day',
    tips: ['Rest with head elevated', 'Apply ice 20 min on/off', 'Take medications as directed'],
    icon: BedDouble,
    color: 'from-red-400 to-rose-500',
    bgColor: 'bg-red-50',
  },
  {
    day: 'Day 1-2',
    title: 'Initial Healing',
    tips: ['Continue ice therapy', 'Start salt water rinse', 'Stick to soft foods'],
    icon: ThermometerSnowflake,
    color: 'from-orange-400 to-amber-500',
    bgColor: 'bg-orange-50',
  },
  {
    day: 'Day 3-4',
    title: 'Swelling Peak',
    tips: ['Switch to warm compress', 'Gentle jaw exercises', 'Continue soft diet'],
    icon: HeartPulse,
    color: 'from-amber-400 to-yellow-500',
    bgColor: 'bg-amber-50',
  },
  {
    day: 'Day 5-7',
    title: 'Improvement',
    tips: ['Resume gentle brushing', 'Light activities OK', 'Gradual diet return'],
    icon: Utensils,
    color: 'from-emerald-400 to-green-500',
    bgColor: 'bg-emerald-50',
  },
  {
    day: 'Week 2+',
    title: 'Full Recovery',
    tips: ['Follow-up appointment', 'Resume normal diet', 'Return to activities'],
    icon: Sparkles,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
  },
];

const postOpDos = [
  { text: 'Rest with head elevated', icon: BedDouble },
  { text: 'Apply ice packs 20 min on/off', icon: ThermometerSnowflake },
  { text: 'Take medications as prescribed', icon: Pill },
  { text: 'Eat soft, cool foods', icon: Utensils },
  { text: 'Rinse gently with salt water', icon: Droplets },
];

const postOpDonts = [
  { text: 'Use straws for 1 week', icon: Droplets },
  { text: 'Smoke or use tobacco', icon: Cigarette },
  { text: 'Touch the surgery site', icon: Activity },
  { text: 'Eat hard or spicy foods', icon: Utensils },
  { text: 'Skip follow-up appointments', icon: Calendar },
];

// ============================================================================
// HERO SECTION - Immersive, Cinematic Mobile Experience
// ============================================================================

function MobileHeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col">
      {/* Full-screen Hero Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <Image
          src="/images/services/oral-surgery/hero-dental-surgery.jpg"
          alt="Expert oral surgery care"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/40 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            style={{
              left: `${15 + i * 15}%`,
              bottom: '20%',
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-5 pb-8 pt-20">
        {/* Breadcrumb - Minimal */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-5 right-5"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-xs text-white/70">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-white/40">/</li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li aria-hidden="true" className="text-white/40">/</li>
            <li className="text-white font-medium">Oral Surgery</li>
          </ol>
        </motion.nav>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-5"
        >
          {/* Trust Badges - Floating Pills */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Safe & Sterile
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              25+ Years
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl xs:text-5xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Expert{' '}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300">
                Oral Surgery
              </span>
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-lg"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-base text-white/80 leading-relaxed max-w-[320px]"
          >
            Gentle, experienced care with your comfort as our priority.
            From wisdom teeth to bone grafting.
          </motion.p>

          {/* Stats Row - Glass Cards */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-3 gap-2"
          >
            {[
              { label: 'Procedures', value: '10K+', icon: BriefcaseMedical },
              { label: 'Success Rate', value: '98%', icon: BadgeCheck },
              { label: 'Experience', value: '25yr', icon: Award },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-3"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                  <Icon className="w-4 h-4 text-amber-300 mb-1.5" />
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-white/60 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="flex gap-3 pt-2">
            <Link
              href="/contact#book"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-white to-gray-100 text-[#722F37] font-semibold rounded-2xl shadow-xl shadow-black/20"
            >
              <Calendar className="w-5 h-5" />
              Book Now
            </Link>
            <a
              href="tel:+16137336446"
              className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-3 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Bottom Wave Transition */}
      <div className="absolute -bottom-1 left-0 right-0 z-10">
        <WaveShape className="text-white h-12" />
      </div>
    </section>
  );
}

// ============================================================================
// PROCEDURE TYPES - Premium Horizontal Scroll Cards
// ============================================================================

function MobileProcedureTypes() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      <FloatingOrbs />
      <SubtleGrid />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="px-5 mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-100 text-[#722F37] text-xs font-semibold mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            Our Expertise
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Oral Surgery{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
              Services
            </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            Comprehensive surgical care tailored to your needs
          </p>
        </motion.div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-hide snap-x snap-mandatory -mx-1">
          {surgeryTypes.map((type, index) => {
            const Icon = type.icon;
            const isActive = activeId === type.id;

            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                className="flex-shrink-0 w-[280px] snap-center"
              >
                <motion.button
                  onClick={() => setActiveId(isActive ? null : type.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left rounded-3xl overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'shadow-2xl shadow-gray-200/50 ring-2 ring-[#722F37]/20'
                      : 'shadow-lg shadow-gray-100'
                  }`}
                >
                  {/* Card Header with Gradient */}
                  <div className={`relative p-5 bg-gradient-to-br ${type.gradient}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{type.shortTitle}</h3>
                          <div className="flex items-center gap-1.5 text-white/80 text-xs mt-0.5">
                            <Timer className="w-3 h-3" />
                            {type.duration}
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-white/80" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 bg-white">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {type.description}
                    </p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-gray-100 space-y-3">
                            {type.details.map((detail, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-3"
                              >
                                <div className={`w-6 h-6 rounded-full ${type.bgColor} flex items-center justify-center`}>
                                  <Check className={`w-3.5 h-3.5 ${type.textColor}`} />
                                </div>
                                <span className="text-sm text-gray-700">{detail}</span>
                              </motion.div>
                            ))}
                            <div className={`flex items-center gap-2 mt-4 pt-3 border-t ${type.borderColor} text-xs`}>
                              <Activity className={`w-4 h-4 ${type.textColor}`} />
                              <span className="text-gray-500">Recovery: <span className="font-medium text-gray-700">{type.recovery}</span></span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe to explore</span>
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// SEDATION OPTIONS - Elegant Interactive Slider
// ============================================================================

function MobileSedationOptions() {
  const [activeLevel, setActiveLevel] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const currentOption = sedationOptions[activeLevel];

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white via-[#FDF8F3] to-white relative overflow-hidden">
      <FloatingOrbs />

      <div className="relative z-10 px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 text-xs font-semibold mb-3">
            <Waves className="w-3.5 h-3.5" />
            Your Comfort
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Sedation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Options
            </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Choose your comfort level for a stress-free experience
          </p>
        </motion.div>

        {/* Level Indicator Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between mb-2 text-xs text-gray-400 font-medium">
            <span>Light</span>
            <span>Deep</span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            {/* Gradient Fill */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-sky-400 via-violet-400 to-rose-400 rounded-full"
              initial={{ width: '25%' }}
              animate={{ width: `${((activeLevel + 1) / sedationOptions.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            />

            {/* Level Dots */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              {sedationOptions.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveLevel(idx)}
                  whileTap={{ scale: 1.2 }}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    idx <= activeLevel
                      ? 'bg-white border-white shadow-lg'
                      : 'bg-gray-200 border-gray-200'
                  }`}
                  aria-label={`Select level ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Option Card */}
        <AnimatePresence mode="wait">
          {currentOption && (
            <motion.div
              key={activeLevel}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentOption.color} p-6 text-white`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {(() => {
                        const Icon = currentOption.icon;
                        return <Icon className="w-8 h-8" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
                        Level {currentOption.level}
                      </span>
                      <h3 className="text-2xl font-bold">{currentOption.title}</h3>
                    </div>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed">
                    {currentOption.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Select Pills */}
        <div className="flex gap-2 flex-wrap">
          {sedationOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={idx}
                onClick={() => setActiveLevel(idx)}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-medium text-sm transition-all duration-300 ${
                  idx === activeLevel
                    ? 'bg-[#722F37] text-white shadow-lg shadow-[#722F37]/25'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {option.title.split(' ')[0]}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// RECOVERY TIMELINE - Interactive Journey
// ============================================================================

function MobileRecoveryTimeline() {
  const [activeDay, setActiveDay] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const currentRecovery = recoveryTimeline[activeDay];

  return (
    <section ref={sectionRef} className="py-16 bg-[#FDF8F3] relative overflow-hidden">
      <SubtleGrid />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="px-5 mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs font-semibold mb-3">
            <HeartPulse className="w-3.5 h-3.5" />
            Recovery Guide
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Your Healing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
              Journey
            </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            What to expect during your recovery
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="px-5 mb-6"
        >
          {/* Progress Bar */}
          <div className="relative h-1.5 bg-gray-200 rounded-full mb-4 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-400 via-amber-400 to-green-400 rounded-full"
              animate={{ width: `${((activeDay + 1) / recoveryTimeline.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Day Selectors */}
          <div className="flex justify-between">
            {recoveryTimeline.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeDay;
              const isPast = idx < activeDay;

              return (
                <motion.button
                  key={idx}
                  onClick={() => setActiveDay(idx)}
                  whileTap={{ scale: 1.1 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${item.color} shadow-lg`
                        : isPast
                          ? 'bg-green-500'
                          : 'bg-white border border-gray-200'
                    }`}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isPast && !isActive ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive || isPast ? 'text-white' : 'text-gray-400'}`} />
                    )}
                  </motion.div>
                  <span className={`text-[10px] mt-1.5 font-medium ${isActive ? 'text-[#722F37]' : 'text-gray-400'}`}>
                    {item.day.split(' ')[0]}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Day Content */}
        <div className="px-5">
          <AnimatePresence mode="wait">
            {currentRecovery && (
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden"
              >
                {/* Header */}
                <div className={`h-2 bg-gradient-to-r ${currentRecovery.color}`} />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentRecovery.color} flex items-center justify-center shadow-lg`}>
                      {(() => {
                        const Icon = currentRecovery.icon;
                        return <Icon className="w-7 h-7 text-white" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {currentRecovery.day}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{currentRecovery.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {currentRecovery.tips.map((tip, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                        className={`flex items-start gap-3 p-3 rounded-xl ${currentRecovery.bgColor}`}
                      >
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Check className="w-3.5 h-3.5 text-[#722F37]" />
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">{tip}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-3 mt-6 px-5">
          <motion.button
            onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
            disabled={activeDay === 0}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center disabled:opacity-30 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            onClick={() => setActiveDay(Math.min(recoveryTimeline.length - 1, activeDay + 1))}
            disabled={activeDay === recoveryTimeline.length - 1}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center disabled:opacity-30 shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// POST-OP CARE - Beautiful Do's and Don'ts
// ============================================================================

function MobilePostOpCare() {
  const [activeTab, setActiveTab] = useState<'dos' | 'donts'>('dos');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      <FloatingOrbs />

      <div className="relative z-10 px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            Patient Guide
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            After Surgery{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Care
            </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Follow these guidelines for optimal healing
          </p>
        </motion.div>

        {/* Tab Selector - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="relative p-1.5 bg-gray-100 rounded-2xl mb-6"
        >
          <motion.div
            className={`absolute inset-y-1.5 w-[calc(50%-6px)] rounded-xl shadow-md ${
              activeTab === 'dos' ? 'bg-white left-1.5' : 'bg-white left-[calc(50%+3px)]'
            }`}
            layoutId="tab-bg"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <div className="relative flex">
            <button
              onClick={() => setActiveTab('dos')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-colors z-10 ${
                activeTab === 'dos' ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              Do This
            </button>
            <button
              onClick={() => setActiveTab('donts')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-colors z-10 ${
                activeTab === 'donts' ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
              Avoid This
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`rounded-3xl overflow-hidden ${
              activeTab === 'dos'
                ? 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200'
                : 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'
            }`}>
              <div className={`px-5 py-4 ${
                activeTab === 'dos' ? 'bg-emerald-100/50' : 'bg-red-100/50'
              }`}>
                <h3 className={`font-bold ${activeTab === 'dos' ? 'text-emerald-700' : 'text-red-700'}`}>
                  {activeTab === 'dos' ? 'Recommended Actions' : 'Things to Avoid'}
                </h3>
              </div>
              <div className="p-5 space-y-3">
                {(activeTab === 'dos' ? postOpDos : postOpDonts).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: activeTab === 'dos' ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm ${
                        activeTab === 'dos' ? 'border border-emerald-100' : 'border border-red-100'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activeTab === 'dos' ? 'bg-emerald-100' : 'bg-red-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${activeTab === 'dos' ? 'text-emerald-600' : 'text-red-500'}`} />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION - Elegant Accordion
// ============================================================================

function MobileFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white via-[#FDF8F3] to-white relative overflow-hidden">
      <SubtleGrid />

      <div className="relative z-10 px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-100 text-[#722F37] text-xs font-semibold mb-3">
            <AlertCircle className="w-3.5 h-3.5" />
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Common{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
              Questions
            </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Everything you need to know
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08 }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-white shadow-xl shadow-gray-200/50 ring-1 ring-[#722F37]/10'
                    : 'bg-white shadow-sm border border-gray-100'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-5 flex items-start gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-gradient-to-br from-[#722F37] to-rose-500 shadow-lg shadow-[#722F37]/25'
                        : 'bg-gray-100'
                    }`}
                    animate={isOpen ? { scale: [1, 1.1, 1] } : {}}
                  >
                    <span className={`text-sm font-bold ${isOpen ? 'text-white' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>
                  </motion.div>
                  <span className="flex-1 font-semibold text-gray-900 text-sm pt-2 leading-relaxed">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-2"
                  >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#722F37]' : 'text-gray-400'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    >
                      <div className="px-5 pb-5 pl-[76px]">
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm text-center"
        >
          <p className="text-sm text-gray-500 mb-4">Still have questions?</p>
          <a
            href="tel:+16137336446"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#722F37] to-rose-600 text-white font-semibold rounded-xl shadow-lg shadow-[#722F37]/25"
          >
            <Phone className="w-4 h-4" />
            (613) 733-6446
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TEAM SECTION - Trust & Credentials
// ============================================================================

function MobileTeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const credentials = [
    { label: 'Years Experience', value: '25+', icon: Clock, color: 'from-amber-400 to-orange-500' },
    { label: 'Procedures', value: '10,000+', icon: Award, color: 'from-emerald-400 to-green-500' },
    { label: 'Patient Satisfaction', value: '98%', icon: Heart, color: 'from-rose-400 to-pink-500' },
    { label: 'Continuing Education', value: '100+ hrs/yr', icon: Sparkles, color: 'from-violet-400 to-purple-500' },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-[#FDF8F3] relative overflow-hidden">
      <FloatingOrbs />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="px-5 mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            Our Team
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Expert{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Surgical Care
            </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Clinical excellence with compassionate care
          </p>
        </motion.div>

        {/* Team Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="px-5 mb-8"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl shadow-gray-300/30">
            <Image
              src="/images/services/oral-surgery/dental-team-care.jpg"
              alt="Our experienced dental surgery team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-white font-semibold text-lg">Experienced care you can trust</p>
              <p className="text-white/80 text-sm mt-1">Dedicated to your comfort and well-being</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="px-5 grid grid-cols-2 gap-3">
          {credentials.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-100 border border-gray-100"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="px-5 mt-6"
        >
          <Link
            href="/about/team"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold text-sm"
          >
            Meet Our Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES - Elegant Cards
// ============================================================================

function MobileRelatedServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const services = [
    {
      title: 'Dental Implants',
      description: 'Permanent tooth replacement',
      href: '/services/dental-implants',
      icon: Sparkles,
      gradient: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50',
    },
    {
      title: 'Missing Teeth Solutions',
      description: 'Bridges and dentures',
      href: '/services/missing-teeth',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Root Canal Therapy',
      description: 'Save your natural tooth',
      href: '/services/root-canal',
      icon: Heart,
      gradient: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50',
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      <SubtleGrid />

      <div className="relative z-10 px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-100 text-[#722F37] text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            Explore More
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Related{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
              Services
            </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Services that complement oral surgery
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#722F37]/20 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500">{service.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold text-sm"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA - Premium Gradient Section
// ============================================================================

function MobileCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-rose-500/20 to-transparent rounded-full translate-y-1/2 translate-x-1/4" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${40 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-white">Trusted by 10,000+ Patients</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl xs:text-4xl font-bold text-white leading-tight mb-4"
          >
            Ready for Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200">
              Consultation?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-base mb-8 max-w-sm mx-auto"
          >
            Schedule a consultation to discuss your oral surgery needs with our experienced team.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Link
              href="/contact#book"
              className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#722F37] font-bold rounded-2xl shadow-xl shadow-black/20 text-lg"
            >
              <Calendar className="w-5 h-5" />
              Book Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="tel:+16137336446"
              className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20"
            >
              <Phone className="w-5 h-5" />
              (613) 733-6446
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 pt-8 border-t border-white/10"
          >
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Ottawa South Dental • Serving Our Community</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA
// ============================================================================

function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
        >
          <div className="flex gap-3">
            <Link
              href="/contact#book"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#722F37] to-rose-600 text-white font-semibold rounded-2xl shadow-lg shadow-[#722F37]/30"
            >
              <Calendar className="w-5 h-5" />
              Book Consultation
            </Link>
            <a
              href="tel:+16137336446"
              className="flex items-center justify-center w-14 h-14 bg-white text-[#722F37] rounded-2xl border-2 border-[#722F37]/20 shadow-sm"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export function OralSurgeryContentMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <MobileHeroSection />
      <MobileProcedureTypes />
      <MobileSedationOptions />
      <MobileRecoveryTimeline />
      <MobilePostOpCare />
      <MobileTeamSection />
      <MobileFAQ />
      <MobileRelatedServices />
      <MobileCTASection />
      <StickyBottomCTA />

      {/* Bottom padding for sticky CTA */}
      <div className="h-24" />
    </main>
  );
}
