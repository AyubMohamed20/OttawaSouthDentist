'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  Phone,
  Calendar,
  MapPin,
  Star,
  Heart,
  Shield,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Siren,
  Smile,
  ShieldCheck,
  Wrench,
  HeartPulse,
  Users,
  Award,
  Languages,
  Receipt,
  Quote,
  BadgeCheck,
  Stethoscope,
  Baby,
  Gem,
  CircleCheck,
  Navigation,
  ExternalLink,
  Play,
  ChevronRight,
} from 'lucide-react';

// ============================================================================
// MOBILE-OPTIMIZED HOOKS
// ============================================================================

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114,47,55,0.12) 0%, transparent 70%)',
        }}
        animate={prefersReducedMotion ? {} : {
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 60%)',
        }}
        animate={prefersReducedMotion ? {} : {
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function DotPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(114,47,55,0.8) 1px, transparent 0)`,
        backgroundSize: '20px 20px',
      }}
      aria-hidden="true"
    />
  );
}

function GradientBlur({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

// ============================================================================
// ANIMATED SECTION WRAPPER
// ============================================================================

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// CUSTOM SVG ILLUSTRATIONS
// ============================================================================

function ToothSparkleIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 4C16.5 4 14 6.5 13 9.5C12 12.5 11 15 9.5 18.5C8 22 7.5 25 8 28.5C8.5 32 10.5 35.5 13 37C13.5 37 14 35.5 14.5 32C15 28.5 15.5 25 16 23.5C16.5 22 17 21.5 20 21.5C23 21.5 23.5 22 24 23.5C24.5 25 25 28.5 25.5 32C26 35.5 26.5 37 27 37C29.5 35.5 31.5 32 32 28.5C32.5 25 32 22 30.5 18.5C29 15 28 12.5 27 9.5C26 6.5 23.5 4 20 4Z"
        fill="url(#toothGrad)"
        stroke="#722F37"
        strokeWidth="1.5"
      />
      <motion.circle
        cx="8"
        cy="8"
        r="2"
        fill="#722F37"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="34"
        cy="12"
        r="1.5"
        fill="#14b8a6"
        animate={{ opacity: [1, 0.3, 1], scale: [1.2, 0.8, 1.2] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <defs>
        <linearGradient id="toothGrad" x1="8" y1="4" x2="32" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F8F8F8" />
          <stop offset="1" stopColor="#F0F0F0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================================================
// MOBILE HERO SECTION - COMPLETELY REDESIGNED
// ============================================================================

function HeroSectionMobile() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col bg-gradient-to-b from-[#FFFBF8] via-white to-[#FDF8F3] overflow-hidden"
    >
      <FloatingOrbs />
      <DotPattern />

      {/* Gradient accent */}
      <GradientBlur className="w-40 h-40 bg-[#722F37]/10 top-20 -right-10" />
      <GradientBlur className="w-32 h-32 bg-teal-500/8 bottom-40 -left-10" />

      {/* Main Content */}
      <motion.div
        style={prefersReducedMotion ? {} : { y: contentY }}
        className="relative flex-1 flex flex-col px-5 pt-6 pb-4"
      >
        {/* Trust Badges - Pill design */}
        <motion.div
          className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { icon: ShieldCheck, label: 'CDCP Accepted', color: 'emerald' },
            { icon: Receipt, label: 'Direct Billing', color: 'blue' },
            { icon: Siren, label: 'Same-Day Emergency', color: 'rose' },
          ].map((badge, index) => (
            <motion.div
              key={badge.label}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm ${
                badge.color === 'emerald'
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200/60'
                  : badge.color === 'blue'
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/60'
                  : 'bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border border-rose-200/60'
              }`}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileTap={{ scale: 0.97 }}
            >
              <badge.icon className="w-3.5 h-3.5" aria-hidden="true" />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Image with Premium Treatment */}
        <motion.div
          className="relative mt-2 rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/15"
          style={{ aspectRatio: '4/3' }}
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <motion.div style={prefersReducedMotion ? {} : { scale: imageScale }} className="absolute inset-0">
            <Image
              src="/images/home/hero-dentist-consultation.jpg"
              alt="Professional dentist consultation with patient in modern clinic"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/20 via-transparent to-transparent" />

          {/* Floating badge overlays */}
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="relative">
              <span className="flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
            <span className="text-xs font-semibold text-neutral-800">Open Today</span>
          </motion.div>

          {/* Bottom info strip */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl text-xs font-medium text-neutral-700 shadow-lg">
              <CircleCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              Modern Tech
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl text-xs font-medium text-neutral-700 shadow-lg">
              <BadgeCheck className="w-4 h-4 text-blue-500" aria-hidden="true" />
              Certified
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content - Refined Typography */}
        <motion.div
          className="mt-8 text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-display font-bold tracking-tight">
            <span className="block text-[2.25rem] leading-[1.1] text-neutral-900">
              Your Family's Smile
            </span>
            <span className="block text-[2.25rem] leading-[1.1] mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37]">
              Deserves The Best
            </span>
          </h1>

          <motion.p
            className="mt-5 text-base text-neutral-600 leading-relaxed max-w-sm mx-auto"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            Welcome to Ottawa South Dental — where modern dentistry meets compassionate care for your whole family.
          </motion.p>
        </motion.div>

        {/* Location & Languages Pills */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mt-5"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200/80 text-sm text-neutral-600 shadow-sm">
            <MapPin className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
            1729 Bank St, Ottawa
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200/80 text-sm text-neutral-600 shadow-sm">
            <Languages className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
            EN · FR · AR · Somali
          </div>
        </motion.div>

        {/* Trust Stats - Elegant Cards */}
        <motion.div
          className="flex justify-center gap-4 mt-8 pt-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          {[
            { value: '20+', label: 'Years', sublabel: 'Experience' },
            { value: '4.8', label: 'Rating', icon: Star },
            { value: '6', label: 'Expert', sublabel: 'Dentists' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center px-4 py-3 bg-gradient-to-br from-white to-neutral-50/80 rounded-2xl border border-neutral-100 shadow-sm"
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-neutral-900">{stat.value}</span>
                {stat.icon && <stat.icon className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />}
              </div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">
                {stat.sublabel || stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Sticky Bottom CTA - Premium Glass Effect */}
      <motion.div
        className="sticky bottom-0 p-4 bg-white/90 backdrop-blur-xl border-t border-neutral-100/80 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        initial={prefersReducedMotion ? {} : { y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <motion.div whileTap={{ scale: 0.98 }}>
          <Link
            href="/contact#book"
            className="relative flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] text-white font-semibold text-lg rounded-2xl shadow-xl shadow-[#722F37]/30 overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <Calendar className="w-5 h-5 relative z-10" aria-hidden="true" />
            <span className="relative z-10">Book Appointment</span>
            <ArrowRight className="w-5 h-5 relative z-10" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.a
          href="tel:6137331118"
          className="flex items-center justify-center gap-2 w-full mt-3 py-3.5 text-[#722F37] font-medium text-base rounded-xl border-2 border-[#722F37]/15 active:bg-[#722F37]/5 transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>(613) 733-1118</span>
        </motion.a>
      </motion.div>
    </section>
  );
}

// ============================================================================
// DIFFERENTIATORS SECTION - PREMIUM CARD DESIGN
// ============================================================================

const differentiators = [
  {
    id: 'cdcp',
    icon: ShieldCheck,
    title: 'CDCP Accepted',
    badge: 'Government Program',
    description: 'Proud participant in the Canadian Dental Care Plan, making quality dental care accessible to more Canadians.',
    gradient: 'from-emerald-500 to-teal-600',
    lightGradient: 'from-emerald-50 to-teal-50',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
  },
  {
    id: 'billing',
    icon: Receipt,
    title: 'Direct Insurance Billing',
    badge: 'Zero Hassle',
    description: 'We bill your insurance directly, eliminating paperwork so you can focus on your smile.',
    gradient: 'from-blue-500 to-indigo-600',
    lightGradient: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  {
    id: 'emergency',
    icon: Siren,
    title: 'Emergency Care',
    badge: 'Same Day',
    description: "Same-day emergency appointments available. We're here when you need us most.",
    gradient: 'from-rose-500 to-red-600',
    lightGradient: 'from-rose-50 to-red-50',
    iconBg: 'bg-gradient-to-br from-rose-500 to-red-600',
  },
  {
    id: 'team',
    icon: Users,
    title: '6 Expert Dentists',
    badge: 'Full Team',
    description: 'Diverse expertise for comprehensive family dental care under one roof.',
    gradient: 'from-purple-500 to-violet-600',
    lightGradient: 'from-purple-50 to-violet-50',
    iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
  },
  {
    id: 'languages',
    icon: Languages,
    title: 'Multilingual Team',
    badge: '4+ Languages',
    description: 'We speak English, French, Arabic, Somali and more to serve our diverse community.',
    gradient: 'from-amber-500 to-orange-600',
    lightGradient: 'from-amber-50 to-orange-50',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
  },
];

function DifferentiatorCard({
  item,
  index,
  isExpanded,
  onToggle,
}: {
  item: (typeof differentiators)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <motion.button
        onClick={onToggle}
        className={`w-full p-4 bg-white rounded-2xl border transition-all duration-300 text-left ${
          isExpanded
            ? 'border-[#722F37]/20 shadow-lg shadow-[#722F37]/10'
            : 'border-neutral-100 shadow-sm hover:shadow-md'
        }`}
        whileTap={{ scale: 0.99 }}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          {/* Icon with gradient background */}
          <motion.div
            className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center shadow-lg flex-shrink-0`}
            animate={isExpanded ? { rotate: [0, 5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-900 text-base">{item.title}</h3>
            <span className={`inline-block mt-1 px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full bg-gradient-to-r ${item.lightGradient} text-neutral-700`}>
              {item.badge}
            </span>
          </div>

          <motion.div
            className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4 text-neutral-500" aria-hidden="true" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-sm text-neutral-600 leading-relaxed pl-16">
                {item.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

function DifferentiatorsSectionMobile() {
  const [expandedId, setExpandedId] = useState<string | null>('cdcp');

  return (
    <section className="relative py-16 px-5 bg-gradient-to-b from-white via-[#FDFBF9] to-[#FDF8F3] overflow-hidden">
      <FloatingOrbs />

      {/* Section Header */}
      <AnimatedSection className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#722F37]/5 rounded-full mb-5"
          whileTap={{ scale: 0.97 }}
        >
          <Sparkles className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
          <span className="text-[#722F37] text-sm font-semibold tracking-wide">Why Choose Us</span>
        </motion.div>

        <h2 className="font-display text-[1.75rem] font-bold text-neutral-900 leading-tight">
          Why Families Choose
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#8B3A42] mt-1">
            Ottawa South Dental
          </span>
        </h2>
      </AnimatedSection>

      {/* Cards */}
      <div className="space-y-3">
        {differentiators.map((item, index) => (
          <DifferentiatorCard
            key={item.id}
            item={item}
            index={index}
            isExpanded={expandedId === item.id}
            onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
          />
        ))}
      </div>

      {/* Trust indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex justify-center"
      >
        <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-full shadow-md border border-neutral-100">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#722F37] opacity-40" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#722F37]" />
          </span>
          <span className="text-sm font-medium text-neutral-700">
            Serving Ottawa since <span className="text-[#722F37] font-bold">1985</span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// SERVICES SECTION - IMMERSIVE HORIZONTAL SCROLL
// ============================================================================

const services = [
  {
    id: 'preventive',
    icon: ShieldCheck,
    title: 'Preventive Care',
    description: 'Checkups, cleanings & screenings',
    href: '/services/preventive-dentistry',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 via-teal-50 to-white',
  },
  {
    id: 'cosmetic',
    icon: Gem,
    title: 'Cosmetic Dentistry',
    description: 'Whitening, veneers & smile design',
    href: '/services/cosmetic-dentistry',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-50 via-rose-50 to-white',
  },
  {
    id: 'restorative',
    icon: Wrench,
    title: 'Restorative',
    description: 'Crowns, bridges & implants',
    href: '/services/missing-teeth',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 via-indigo-50 to-white',
  },
  {
    id: 'emergency',
    icon: Siren,
    title: 'Emergency Care',
    description: 'Same-day urgent appointments',
    href: '/services/emergency-care',
    gradient: 'from-red-500 to-orange-600',
    bgGradient: 'from-red-50 via-orange-50 to-white',
  },
  {
    id: 'children',
    icon: Baby,
    title: "Children's Dentistry",
    description: 'Gentle care for little smiles',
    href: '/services/childrens-dentistry',
    gradient: 'from-amber-500 to-yellow-500',
    bgGradient: 'from-amber-50 via-yellow-50 to-white',
  },
  {
    id: 'invisalign',
    icon: Smile,
    title: 'Invisalign',
    description: 'Clear aligners for straighter teeth',
    href: '/services/invisalign',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 via-violet-50 to-white',
  },
];

function ServiceCardMobile({ service, index }: { service: (typeof services)[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link href={service.href} className="block">
        <motion.article
          className={`relative w-[180px] p-5 rounded-3xl bg-gradient-to-br ${service.bgGradient} border border-white/60 shadow-lg overflow-hidden`}
          whileTap={{ scale: 0.97 }}
        >
          {/* Decorative gradient orb */}
          <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${service.gradient} opacity-20 blur-xl`} />

          {/* Icon */}
          <motion.div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-4`}
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <service.icon className="w-7 h-7 text-white" aria-hidden="true" />
          </motion.div>

          {/* Content */}
          <h3 className="font-bold text-neutral-900 text-base mb-1.5">{service.title}</h3>
          <p className="text-xs text-neutral-600 leading-relaxed mb-4">{service.description}</p>

          {/* CTA */}
          <div className="flex items-center gap-1.5 text-[#722F37] text-sm font-semibold">
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

function ServicesSectionMobile() {
  return (
    <section className="relative py-16 bg-[#FDF8F3] overflow-hidden">
      <DotPattern />

      {/* Section Header */}
      <AnimatedSection className="text-center px-5 mb-8">
        <motion.div
          className="inline-flex items-center justify-center p-3.5 bg-white rounded-2xl shadow-lg border border-neutral-100 mb-5"
          whileTap={{ scale: 0.97 }}
        >
          <Stethoscope className="w-7 h-7 text-[#722F37]" aria-hidden="true" />
        </motion.div>
        <h2 className="font-display text-[1.75rem] font-bold text-neutral-900">
          Our Dental Services
        </h2>
        <p className="mt-3 text-base text-neutral-600">
          Comprehensive care for your whole family
        </p>
      </AnimatedSection>

      {/* Horizontal Scroll Services */}
      <div className="overflow-x-auto pb-6 scrollbar-hide">
        <div className="flex gap-4 px-5" style={{ width: 'max-content' }}>
          {services.map((service, index) => (
            <ServiceCardMobile key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* View All CTA */}
      <div className="px-5 mt-2">
        <motion.div whileTap={{ scale: 0.98 }}>
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-[#722F37]/15 text-[#722F37] font-semibold rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            View All Services
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TEAM SECTION - ELEGANT PHOTO GRID
// ============================================================================

const teamMembers = [
  { id: '1', name: 'Dr. Vineet Sidhu', role: 'Practice Owner', image: '/images/team/team-01.jpg' },
  { id: '2', name: 'Dr. Anthony Bui', role: 'General Dentist', image: '/images/team/team-02.jpg' },
  { id: '3', name: 'Dr. Sydney Saikaly', role: 'Dentist', image: '/images/team/team-03.jpg' },
  { id: '4', name: 'Dr. Alan Hammond', role: 'Dentist', image: '/images/team/team-04.jpg' },
];

function TeamSectionMobile() {
  const prefersReducedMotion = useReducedMotion();

  const highlights = [
    { icon: Clock, label: '28+ Years', gradient: 'from-blue-500 to-indigo-600' },
    { icon: Heart, label: 'Patient-Focused', gradient: 'from-rose-500 to-pink-600' },
    { icon: Award, label: 'Latest Tech', gradient: 'from-amber-500 to-orange-600' },
    { icon: Users, label: 'Family Care', gradient: 'from-teal-500 to-emerald-600' },
  ];

  return (
    <section className="relative py-16 px-5 bg-white overflow-hidden">
      <FloatingOrbs />

      {/* Section Header */}
      <AnimatedSection className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FDF8F3] to-[#F5EDE5] border border-[#EDE5DD] rounded-full mb-5"
          whileTap={{ scale: 0.97 }}
        >
          <Users className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
          <span className="text-sm font-semibold text-[#722F37]">Our Team</span>
        </motion.div>

        <h2 className="font-display text-[1.75rem] font-bold text-neutral-900 leading-tight">
          Meet Our
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#8B3A42] mt-1">
            Caring Team
          </span>
        </h2>

        <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-sm mx-auto">
          Dedicated professionals who treat every patient like family.
        </p>
      </AnimatedSection>

      {/* Team Grid - 2x2 with staggered layout */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={index % 2 === 1 ? 'mt-4' : ''}
          >
            <motion.div
              className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl group"
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                fill
                className="object-cover transition-transform duration-500 group-active:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Name card */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-white text-sm truncate">{member.name}</h3>
                <p className="text-white/80 text-xs mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#FDFBF9] to-white border border-neutral-100 rounded-2xl shadow-sm">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                <item.icon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-neutral-800">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Link
          href="/about/team"
          className="relative flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] text-white font-semibold rounded-2xl shadow-xl shadow-[#722F37]/25 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
          />
          <span className="relative z-10">Meet Our Full Team</span>
          <ArrowRight className="w-5 h-5 relative z-10" aria-hidden="true" />
        </Link>
      </motion.div>

      {/* Stats Strip */}
      <div className="flex justify-center gap-6 mt-10 pt-8 border-t border-neutral-100">
        {[
          { value: '28+', label: 'Years' },
          { value: '6', label: 'Dentists' },
          { value: '1000s', label: 'Patients' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-[#722F37]">{stat.value}</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS SECTION - SWIPEABLE CARDS
// ============================================================================

const testimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    rating: 5,
    text: "Exceptional care. The staff is incredibly warm and welcoming. My whole family comes here now!",
    service: 'Family Dentistry',
    initials: 'SM',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: '2',
    name: 'Michael T.',
    rating: 5,
    text: "Finally found a practice that makes me feel comfortable. The sedation options made my root canal stress-free.",
    service: 'Root Canal',
    initials: 'MT',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: '3',
    name: 'Jennifer L.',
    rating: 5,
    text: "The Invisalign process was smooth, and now I can't stop smiling! The team truly cares about results.",
    service: 'Invisalign',
    initials: 'JL',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: '4',
    name: 'Robert C.',
    rating: 5,
    text: "Emergency appointment handled same-day when I cracked a tooth. Professional and genuinely caring.",
    service: 'Emergency Care',
    initials: 'RC',
    gradient: 'from-rose-500 to-red-600',
  },
];

function TestimonialCardMobile({ testimonial, index }: { testimonial: (typeof testimonials)[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.1 }}
      className="flex-shrink-0 w-[300px]"
    >
      <motion.div
        className="p-6 bg-white rounded-3xl border border-neutral-100 shadow-xl h-full"
        whileTap={{ scale: 0.98 }}
      >
        {/* Rating & Service */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-gradient-to-r ${testimonial.gradient} text-white`}>
            {testimonial.service}
          </span>
        </div>

        {/* Quote */}
        <Quote className="w-8 h-8 text-[#722F37]/10 mb-3" aria-hidden="true" />
        <blockquote className="text-base text-neutral-700 leading-relaxed mb-5">
          "{testimonial.text}"
        </blockquote>

        {/* Author */}
        <footer className="flex items-center gap-3 pt-4 border-t border-neutral-100">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
            {testimonial.initials}
          </div>
          <div>
            <cite className="not-italic font-bold text-neutral-900">{testimonial.name}</cite>
            <div className="flex items-center gap-1.5 text-xs text-teal-600 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              Verified Patient
            </div>
          </div>
        </footer>
      </motion.div>
    </motion.article>
  );
}

function TestimonialsSectionMobile() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-[#FDF8F3] to-[#F5EDE5] overflow-hidden">
      <FloatingOrbs />

      {/* Section Header */}
      <AnimatedSection className="text-center px-5 mb-8">
        {/* Google Rating Badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-neutral-100 rounded-full shadow-lg mb-6"
          whileTap={{ scale: 0.97 }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 text-xl">4.8</span>
            <div className="flex" aria-label="4.8 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              ))}
            </div>
          </div>
          <span className="text-xs text-neutral-500 font-medium">250+ reviews</span>
        </motion.div>

        <h2 className="font-display text-[1.75rem] font-bold text-neutral-900">
          What Patients Say
        </h2>
      </AnimatedSection>

      {/* Horizontal Scroll Testimonials */}
      <div className="overflow-x-auto pb-6 scrollbar-hide">
        <div className="flex gap-4 px-5" style={{ width: 'max-content' }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCardMobile key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      {/* Google Reviews CTA */}
      <div className="px-5 mt-2">
        <motion.a
          href="https://www.google.com/maps/place/Ottawa+South+Dental"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 bg-white text-[#722F37] font-semibold border-2 border-[#722F37]/15 rounded-2xl shadow-sm"
          whileTap={{ scale: 0.98 }}
        >
          Read More on Google
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT CTA SECTION - GLASSMORPHISM DESIGN
// ============================================================================

function ContactCTASectionMobile() {
  const prefersReducedMotion = useReducedMotion();

  const officeHours = [
    { day: 'Mon - Thu', hours: '9am - 6pm' },
    { day: 'Friday', hours: '9am - 5pm' },
    { day: 'Saturday', hours: '9am - 2pm' },
  ];

  return (
    <section className="relative py-16 px-5 bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#6B2830] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/5"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        {/* Subtle tooth icon */}
        <div className="absolute top-1/4 right-8 opacity-10">
          <ToothSparkleIcon className="w-16 h-16" />
        </div>
      </div>

      {/* Content */}
      <AnimatedSection className="relative text-center mb-10">
        <h2 className="font-display text-[1.75rem] font-bold leading-tight">
          Ready to Schedule
          <span className="block mt-1">Your Visit?</span>
        </h2>
        <p className="mt-4 text-base text-white/80 max-w-sm mx-auto">
          Whether you need a routine checkup or have a dental emergency, we're here to help.
        </p>
      </AnimatedSection>

      {/* Quick Actions */}
      <div className="relative space-y-3 mb-8">
        <motion.div whileTap={{ scale: 0.98 }}>
          <Link
            href="/contact#book"
            className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#722F37] font-bold text-lg rounded-2xl shadow-xl"
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            Book Appointment
          </Link>
        </motion.div>

        <motion.a
          href="tel:6137331118"
          className="flex items-center justify-center gap-3 w-full py-4 bg-white/15 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl"
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          (613) 733-1118
        </motion.a>
      </div>

      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative flex items-center gap-4 p-5 bg-red-500/25 backdrop-blur-sm border border-red-400/30 rounded-2xl mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center flex-shrink-0">
          <Siren className="w-6 h-6 text-red-100" aria-hidden="true" />
        </div>
        <div className="text-left">
          <p className="font-bold text-white">Dental emergency?</p>
          <p className="text-sm text-white/80 mt-0.5">Same-day appointments available</p>
        </div>
      </motion.div>

      {/* Info Cards - Glass Effect */}
      <div className="relative space-y-3">
        {/* Hours Card */}
        <motion.div
          className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-white text-lg">Office Hours</h3>
          </div>
          <dl className="space-y-2">
            {officeHours.map((item) => (
              <div key={item.day} className="flex justify-between text-sm">
                <dt className="text-white/70">{item.day}</dt>
                <dd className="font-semibold text-white">{item.hours}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Location Card */}
        <motion.div
          className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg mb-1">Location</h3>
              <address className="text-sm text-white/80 not-italic leading-relaxed">
                1729 Bank St, Ottawa, ON K1V 7Z4
              </address>
              <p className="mt-2 text-xs text-white/60">
                Free parking • Wheelchair accessible
              </p>
            </div>
          </div>

          <motion.a
            href="https://maps.google.com/?q=1729+Bank+St+Ottawa+ON+K1V+7Z4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-5 py-3 bg-white/15 rounded-xl text-sm font-semibold text-white"
            whileTap={{ scale: 0.98 }}
          >
            <Navigation className="w-4 h-4" aria-hidden="true" />
            Get Directions
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MOBILE HOME PAGE COMPONENT
// ============================================================================

export default function HomeMobile() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <HeroSectionMobile />
      <DifferentiatorsSectionMobile />
      <ServicesSectionMobile />
      <TeamSectionMobile />
      <TestimonialsSectionMobile />
      <ContactCTASectionMobile />
    </main>
  );
}
