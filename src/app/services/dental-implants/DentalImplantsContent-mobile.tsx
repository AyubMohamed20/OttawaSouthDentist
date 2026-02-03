'use client';

import { useState, useRef, useEffect } from 'react';
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
  Heart,
  Award,
  Zap,
  DollarSign,
  Star,
  CheckCircle2,
  Bone,
  Stethoscope,
  Syringe,
  HeartPulse,
  Crown,
  Layers,
  CircleDot,
  ShieldPlus,
  Grip,
  Play,
  BadgeCheck,
  Timer,
  Infinity as InfinityIcon,
  Gem,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Am I a candidate for dental implants?',
    answer:
      "Most adults with good general health are candidates. We'll evaluate your oral health, medical history, and bone structure during your consultation.",
  },
  {
    question: 'How long do dental implants last?',
    answer:
      'With proper care, dental implants can last a lifetime. The crown may need replacement after 10-15 years due to normal wear.',
  },
  {
    question: 'Is the procedure painful?',
    answer:
      'The procedure is performed under local anesthesia, ensuring you feel no pain. Post-operative discomfort is typically manageable with over-the-counter pain medication.',
  },
  {
    question: 'How long does the process take?',
    answer:
      'The complete process typically takes 3-6 months from start to finish, including healing time for bone fusion.',
  },
  {
    question: 'How do I care for my implants?',
    answer:
      'Care for implants just like natural teeth—brush twice daily, floss regularly, and maintain routine dental checkups.',
  },
];

const benefits = [
  {
    icon: InfinityIcon,
    title: 'Lifetime Solution',
    description: 'Permanent replacement that can last forever',
    stat: '25+',
    statLabel: 'Year Lifespan',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Gem,
    title: 'Natural Aesthetics',
    description: 'Indistinguishable from your natural teeth',
    stat: '100%',
    statLabel: 'Natural Look',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Bone,
    title: 'Bone Preservation',
    description: 'Stimulates bone to prevent deterioration',
    stat: '0%',
    statLabel: 'Bone Loss',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Heart,
    title: 'Tooth Protection',
    description: 'No drilling or altering adjacent teeth',
    stat: '0',
    statLabel: 'Teeth Modified',
    gradient: 'from-violet-500 to-purple-600',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation',
    description: 'Comprehensive exam with 3D imaging and personalized treatment planning.',
    duration: '1 visit',
    icon: Stethoscope,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: 2,
    title: 'Implant Surgery',
    description: 'Precision placement of titanium post into your jawbone.',
    duration: '1-2 hours',
    icon: Syringe,
    color: 'from-violet-500 to-purple-500',
  },
  {
    step: 3,
    title: 'Osseointegration',
    description: 'Your bone naturally fuses with the implant for unmatched stability.',
    duration: '3-6 months',
    icon: HeartPulse,
    color: 'from-rose-500 to-pink-500',
  },
  {
    step: 4,
    title: 'Crown Placement',
    description: 'Custom-crafted porcelain crown attached for a perfect finish.',
    duration: '2 visits',
    icon: Crown,
    color: 'from-amber-500 to-orange-500',
  },
];

const implantComponents = [
  {
    name: 'Porcelain Crown',
    description: 'Custom-made ceramic tooth that perfectly matches your natural teeth in color, shape, and translucency',
    icon: Crown,
    position: 'top',
  },
  {
    name: 'Titanium Abutment',
    description: 'Precision-engineered connector that securely links your crown to the implant post',
    icon: Layers,
    position: 'middle',
  },
  {
    name: 'Implant Post',
    description: 'Medical-grade titanium screw that integrates with your jawbone to create a permanent foundation',
    icon: Bone,
    position: 'bottom',
  },
];

const implantTypes = [
  {
    title: 'Single Tooth',
    description: 'Perfect for replacing one missing tooth without affecting neighbors',
    icon: CircleDot,
    features: ['Standalone solution', 'Preserves bone', 'Natural appearance'],
    popular: false,
  },
  {
    title: 'Multiple Teeth',
    description: 'Restore 2-4 adjacent teeth with optimal support',
    icon: Grip,
    features: ['Cost-effective', 'Shared foundation', 'Strong stability'],
    popular: false,
  },
  {
    title: 'Implant Bridge',
    description: 'Multiple teeth supported by fewer implants',
    icon: Layers,
    features: ['Fixed in place', 'Long-term stability', 'Natural function'],
    popular: true,
  },
  {
    title: 'All-on-4',
    description: 'Full arch restoration on just 4 strategic implants',
    icon: ShieldPlus,
    features: ['Same-day teeth', 'Full arch', 'Maximum stability'],
    popular: false,
  },
];

const trustStats = [
  { value: '98%', label: 'Success Rate', icon: BadgeCheck },
  { value: '5000+', label: 'Implants', icon: Award },
  { value: '25+', label: 'Years Exp.', icon: Timer },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ============================================================================
// FLOATING ORBS BACKGROUND
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-[#722F37]/20 to-rose-400/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ top: '-10%', left: '-20%' }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-amber-400/15 to-orange-400/15 blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ bottom: '10%', right: '-15%' }}
      />
    </div>
  );
}

// ============================================================================
// NOISE TEXTURE OVERLAY
// ============================================================================

function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// ============================================================================
// PREMIUM HERO SECTION
// ============================================================================

function MobileHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
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
          src="https://images.pexels.com/photos/3762408/pexels-photo-3762408.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800"
          alt="Beautiful confident smile after dental implants"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/40 via-transparent to-transparent" />
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
            style={{
              left: `${15 + i * 15}%`,
              bottom: '20%',
            }}
          />
        ))}
      </div>

      {/* Breadcrumb - Top */}
      <motion.nav
        className="relative z-20 pt-4 px-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ol className="flex items-center gap-1.5 text-xs text-white/70">
          <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-white/40">/</li>
          <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
          <li aria-hidden="true" className="text-white/40">/</li>
          <li className="text-white font-medium">Implants</li>
        </ol>
      </motion.nav>

      {/* Content - Bottom */}
      <div className="relative z-20 mt-auto px-5 pb-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Premium Badge */}
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-white">Gold Standard in Tooth Replacement</span>
          </motion.div>

          {/* Title with gradient accent */}
          <motion.h1
            variants={staggerItem}
            className="text-[2.75rem] leading-[1.05] font-bold text-white tracking-tight mb-4"
          >
            Dental{' '}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300">
                Implants
              </span>
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-rose-500/20 blur-lg rounded-lg"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-lg text-white/80 leading-relaxed mb-8 max-w-[90%]"
          >
            Experience the confidence of a complete, permanent smile that looks and feels completely natural.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="space-y-3">
            <Link
              href="/contact#book"
              className="group relative flex items-center justify-center gap-3 w-full py-4.5 overflow-hidden rounded-2xl"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37]"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }}
              />
              <span className="relative z-10 flex items-center gap-3 text-white font-semibold text-lg">
                <Calendar className="w-5 h-5" />
                Book Free Consultation
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </Link>

            <a
              href="tel:+16137336446"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium active:scale-[0.98] transition-transform"
            >
              <Phone className="w-5 h-5" />
              (613) 733-6446
            </a>
          </motion.div>

          {/* Trust Stats Row */}
          <motion.div
            variants={staggerItem}
            className="flex items-center justify-between mt-8 pt-6 border-t border-white/10"
          >
            {trustStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-[11px] text-white/60 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-white/40" />
      </motion.div>
    </section>
  );
}

// ============================================================================
// PREMIUM BENEFITS SECTION - Swipeable Cards
// ============================================================================

function MobileBenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section ref={containerRef} className="relative py-16 bg-white overflow-hidden">
      <FloatingOrbs />
      <NoiseOverlay />

      <div className="relative z-10 px-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 mb-4">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">Why Implants?</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">Clear Advantage</span>
          </h2>
          <p className="text-gray-500">Swipe to explore the benefits</p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-4 px-5 pb-4" style={{ width: 'max-content' }}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="w-[280px] snap-center flex-shrink-0"
                onViewportEnter={() => setActiveCard(index)}
              >
                <div className="relative h-full p-6 rounded-3xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
                  {/* Gradient accent at top */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient}`} />

                  {/* Icon with glow */}
                  <div className="relative mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} blur-xl opacity-40`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{benefit.description}</p>

                  {/* Stat highlight */}
                  <div className="pt-5 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${benefit.gradient}`}>
                        {benefit.stat}
                      </span>
                      <span className="text-sm text-gray-400">{benefit.statLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {benefits.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeCard === index ? 'w-8 bg-[#722F37]' : 'w-2 bg-gray-200'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// 3D-STYLE ANATOMY SECTION
// ============================================================================

function MobileAnatomySection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <NoiseOverlay />

      <div className="relative z-10 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200/50 mb-4">
            <Layers className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-700">Technical Excellence</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Implant Anatomy</h2>
          <p className="text-gray-500">Tap to explore each precision component</p>
        </motion.div>

        {/* 3D-style Component Stack */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-400 via-violet-400 to-emerald-400 rounded-full" />

          <div className="space-y-4">
            {implantComponents.map((component, index) => {
              const Icon = component.icon;
              const isExpanded = expandedIndex === index;
              const colorOptions = [
                { bg: 'from-amber-500 to-orange-500', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
                { bg: 'from-violet-500 to-purple-500', light: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700' },
                { bg: 'from-emerald-500 to-teal-500', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
              ];
              const colors = colorOptions[index % colorOptions.length]!;

              return (
                <motion.div
                  key={component.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 }}
                >
                  <motion.button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full text-left"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
                        isExpanded
                          ? `${colors.light} ${colors.border} shadow-lg`
                          : 'bg-white border-gray-100 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Animated Icon */}
                        <motion.div
                          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg flex-shrink-0`}
                          animate={isExpanded ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                          {isExpanded && (
                            <motion.div
                              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.bg} blur-lg opacity-50`}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1.2, opacity: 0.5 }}
                            />
                          )}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className={`font-bold text-lg ${isExpanded ? colors.text : 'text-gray-900'}`}>
                                {component.name}
                              </span>
                              <span className={`block text-xs ${isExpanded ? colors.text + '/60' : 'text-gray-400'} mt-0.5`}>
                                Component {index + 1} of 3
                              </span>
                            </div>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className={`w-8 h-8 rounded-full ${isExpanded ? colors.light : 'bg-gray-50'} flex items-center justify-center`}
                            >
                              <ChevronDown className={`w-5 h-5 ${isExpanded ? colors.text : 'text-gray-400'}`} />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className={`mt-4 pt-4 border-t ${colors.border} ${colors.text}/80 text-sm leading-relaxed`}>
                              {component.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
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
// ELEGANT PROCEDURE TIMELINE
// ============================================================================

function MobileProcedureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-16 bg-white overflow-hidden">
      <FloatingOrbs />

      <div className="relative z-10 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 mb-4">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Your Journey</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">The Process</h2>
          <p className="text-gray-500">Four simple steps to your new smile</p>
        </motion.div>

        {/* Premium Timeline */}
        <div className="relative">
          {procedureSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === procedureSteps.length - 1;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex gap-5 pb-8"
              >
                {/* Timeline connector */}
                {!isLast && (
                  <div className="absolute left-7 top-16 bottom-0 w-0.5">
                    <motion.div
                      className={`h-full bg-gradient-to-b ${step.color} rounded-full`}
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                      style={{ transformOrigin: 'top' }}
                    />
                  </div>
                )}

                {/* Step Circle */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-lg`}
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">{step.step}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white shadow-sm`}>
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// IMPLANT TYPES - SWIPEABLE CAROUSEL
// ============================================================================

function MobileImplantTypesSection() {
  const [activeType, setActiveType] = useState(2); // Default to popular one
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <NoiseOverlay />

      <div className="relative z-10">
        <div className="px-5 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/50 mb-4">
              <Grip className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-semibold text-rose-700">Solutions</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Fit</h2>
            <p className="text-gray-500">Tailored options for every situation</p>
          </motion.div>
        </div>

        {/* Tab Pills - Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-hide mb-6">
          <div className="flex gap-2 px-5" style={{ width: 'max-content' }}>
            {implantTypes.map((type, index) => (
              <motion.button
                key={type.title}
                onClick={() => setActiveType(index)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeType === index
                    ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white shadow-lg shadow-[#722F37]/25'
                    : 'bg-white text-gray-600 border border-gray-200 shadow-sm'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {type.popular && activeType !== index && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
                )}
                {type.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Active Type Card */}
        <div className="px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden"
            >
              {/* Popular badge */}
              {implantTypes[activeType]?.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4 mb-5">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37] to-rose-500 flex items-center justify-center shadow-lg flex-shrink-0"
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {(() => {
                    const Icon = implantTypes[activeType]?.icon || CircleDot;
                    return <Icon className="w-8 h-8 text-white" />;
                  })()}
                </motion.div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {implantTypes[activeType]?.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {implantTypes[activeType]?.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {implantTypes[activeType]?.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-emerald-800">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/contact#book"
                className="flex items-center justify-center gap-2 w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold shadow-lg shadow-[#722F37]/25 active:scale-[0.98] transition-transform"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PREMIUM FAQ ACCORDION
// ============================================================================

function MobileFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-16 bg-white overflow-hidden">
      <FloatingOrbs />

      <div className="relative z-10 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 mb-4">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Common Questions</h2>
          <p className="text-gray-500">Everything you need to know</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-[#722F37]/20 bg-gradient-to-br from-rose-50/50 to-white shadow-lg'
                    : 'border-gray-100 bg-white shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-5 flex items-start justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold pr-4 transition-colors ${isOpen ? 'text-[#722F37]' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isOpen ? 'bg-[#722F37]/10' : 'bg-gray-100'
                    }`}
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
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5">
                        <p className="text-gray-600 leading-relaxed">
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

        {/* More questions CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-100 text-center"
        >
          <p className="text-gray-600 mb-3">Still have questions?</p>
          <a
            href="tel:+16137336446"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#722F37] font-semibold border border-[#722F37]/20 shadow-sm active:scale-[0.98] transition-transform"
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
// FINANCING SECTION
// ============================================================================

function MobileFinancingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const financingOptions = [
    { icon: Shield, title: 'Insurance', desc: 'Most plans accepted', color: 'from-emerald-500 to-teal-500' },
    { icon: DollarSign, title: 'Financing', desc: 'Easy monthly plans', color: 'from-blue-500 to-cyan-500' },
    { icon: CheckCircle2, title: 'Transparent', desc: 'No hidden fees', color: 'from-violet-500 to-purple-500' },
  ];

  return (
    <section ref={containerRef} className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <NoiseOverlay />

      <div className="relative z-10 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 mb-4">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Affordable Care</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Investment in Your Future</h2>
          <p className="text-gray-500">Flexible options to fit your budget</p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {financingOptions.map((option, i) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-lg shadow-gray-100/50"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-sm text-gray-900 mb-0.5">{option.title}</p>
                <p className="text-[11px] text-gray-500">{option.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <Link
          href="/contact#book"
          className="flex items-center justify-center gap-2 w-full py-4 bg-white text-[#722F37] font-semibold rounded-2xl border-2 border-[#722F37]/20 shadow-sm active:scale-[0.98] transition-transform"
        >
          Get Your Custom Quote
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ============================================================================
// PREMIUM CTA SECTION
// ============================================================================

function MobileCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]" />

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-72 h-72 bg-rose-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 px-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <motion.div
            className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10 text-amber-300" />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Restore<br />Your Smile?
          </h2>
          <p className="text-white/70 mb-10 max-w-xs mx-auto">
            Book your free consultation today and discover how dental implants can transform your life.
          </p>

          <div className="space-y-3">
            <Link
              href="/contact#book"
              className="group relative flex items-center justify-center gap-3 w-full py-4.5 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-100 to-rose-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-3 text-[#722F37] font-bold text-lg">
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </span>
            </Link>

            <a
              href="tel:+16137336446"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white/90 font-medium border border-white/20 backdrop-blur-sm active:scale-[0.98] transition-transform"
            >
              <Phone className="w-5 h-5" />
              (613) 733-6446
            </a>
          </div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
          >
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-300 to-teal-400 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            <span className="text-sm text-white/80">Trusted by 5000+ patients</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM CTA BAR
// ============================================================================

function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
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
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50" />

          <div className="relative px-4 py-3 safe-area-pb">
            <div className="flex items-center gap-3">
              <a
                href="tel:+16137336446"
                className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm flex-shrink-0 active:scale-95 transition-transform"
              >
                <Phone className="w-6 h-6 text-[#722F37]" />
              </a>
              <Link
                href="/contact#book"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold shadow-lg shadow-[#722F37]/30 active:scale-[0.98] transition-transform"
              >
                <Calendar className="w-5 h-5" />
                Book Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN MOBILE COMPONENT
// ============================================================================

export function DentalImplantsContentMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-white pb-24">
      <MobileHeroSection />
      <MobileBenefitsSection />
      <MobileAnatomySection />
      <MobileProcedureSection />
      <MobileImplantTypesSection />
      <MobileFAQSection />
      <MobileFinancingSection />
      <MobileCTASection />

      {/* Sticky Bottom CTA - Only visible after scrolling */}
      <StickyBottomCTA />
    </main>
  );
}
