'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  AlertTriangle,
  Shield,
  Clock,
  Phone,
  ArrowRight,
  Zap,
  Activity,
  MapPin,
  Stethoscope,
  Bandage,
  ThermometerSun,
  Droplets,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  ClockAlert,
  HeartPulse,
  HandHeart,
  ShieldPlus,
  TriangleAlert,
  Sparkles,
  Timer,
  Siren,
  CircleDot,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const EMERGENCY_PHONE = '(613) 733-1312';
const EMERGENCY_PHONE_HREF = 'tel:+16137331312';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What constitutes a dental emergency?',
    answer:
      "Dental emergencies include severe toothache, knocked-out teeth, broken teeth, lost fillings, dental abscesses, and uncontrolled bleeding. If you're unsure, call us.",
  },
  {
    question: 'Can I get a same-day appointment?',
    answer:
      "Yes, we prioritize emergencies and reserve time daily for urgent cases. Call us directly for the fastest response.",
  },
  {
    question: 'What if a tooth is knocked out?',
    answer:
      "Handle by crown only, rinse gently, try to reinsert or keep in milk. See a dentist within 30 minutes for best results.",
  },
  {
    question: 'How do I manage pain before my visit?',
    answer:
      'Take OTC pain relievers as directed, apply cold compress, rinse with salt water, and avoid hot/cold foods.',
  },
];

const emergencyTypes = [
  {
    id: 'toothache',
    icon: ThermometerSun,
    title: 'Severe Toothache',
    urgency: 'high' as const,
    shortDesc: 'Intense pain indicating infection or decay',
    firstAid: ['Salt water rinse', 'OTC pain reliever', 'Cold compress'],
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50',
  },
  {
    id: 'knockedout',
    icon: AlertTriangle,
    title: 'Knocked-Out Tooth',
    urgency: 'critical' as const,
    shortDesc: 'Quick action can save the tooth',
    firstAid: ['Handle by crown only', 'Keep moist in milk', 'See dentist in 30 min'],
    gradient: 'from-red-500 to-rose-600',
    bgGradient: 'from-red-50 to-rose-50',
  },
  {
    id: 'broken',
    icon: Zap,
    title: 'Broken Tooth',
    urgency: 'high' as const,
    shortDesc: 'Visible chip or crack with sensitivity',
    firstAid: ['Save broken pieces', 'Rinse gently', 'Apply gauze if bleeding'],
    gradient: 'from-amber-500 to-yellow-600',
    bgGradient: 'from-amber-50 to-yellow-50',
  },
  {
    id: 'abscess',
    icon: Droplets,
    title: 'Dental Abscess',
    urgency: 'critical' as const,
    shortDesc: 'Serious infection with swelling',
    firstAid: ['Salt water rinse', 'Do NOT apply heat', 'Seek immediate care'],
    gradient: 'from-red-600 to-pink-600',
    bgGradient: 'from-red-50 to-pink-50',
  },
];

const officeHours = [
  { day: 'Mon-Fri', hours: '9AM - 5PM' },
  { day: 'Saturday', hours: '9AM - 2PM' },
  { day: 'Sunday', hours: 'Closed' },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

// ============================================================================
// CUSTOM SVG BACKGROUNDS & ILLUSTRATIONS
// ============================================================================

function EmergencyPulseBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated pulse rings */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border-2 border-red-500/20"
        animate={{
          scale: [1, 2.5, 2.5],
          opacity: [0.5, 0, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border-2 border-red-500/20"
        animate={{
          scale: [1, 2.5, 2.5],
          opacity: [0.5, 0, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border-2 border-red-500/20"
        animate={{
          scale: [1, 2.5, 2.5],
          opacity: [0.5, 0, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 2 }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-20 h-20 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/20 blur-2xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/10 blur-3xl"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function FloatingCross({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className={className}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="16" y="4" width="8" height="32" rx="2" fill="currentColor" />
      <rect x="4" y="16" width="32" height="8" rx="2" fill="currentColor" />
    </motion.svg>
  );
}

function DotPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
      <pattern id="mobile-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#mobile-dots)" />
    </svg>
  );
}

// ============================================================================
// STICKY EMERGENCY CTA
// ============================================================================

function StickyEmergencyCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
        >
          {/* Glassmorphism backdrop */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-neutral-200/50" />

          <div className="relative px-4 py-3">
            <motion.a
              href={EMERGENCY_PHONE_HREF}
              className="group relative flex items-center justify-center gap-3 w-full py-4 overflow-hidden rounded-2xl"
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#722F37] via-[#8a3a44] to-[#722F37]"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />

              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-white/30"
                animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.div
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                className="relative"
              >
                <PhoneCall className="w-6 h-6 text-white" />
              </motion.div>

              <span className="relative text-white font-bold text-lg tracking-wide">
                Call Emergency Line
              </span>

              {/* Live indicator */}
              <motion.div
                className="relative flex items-center gap-1.5 ml-1"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-300 text-xs font-medium">LIVE</span>
              </motion.div>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// LIVE STATUS BADGE
// ============================================================================

function LiveStatusBadge({ variant = 'default' }: { variant?: 'default' | 'hero' }) {
  const [status, setStatus] = useState<'open' | 'closed'>('closed');

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = hour * 60 + now.getMinutes();

    if (day === 0) {
      setStatus('closed');
    } else if (day === 6) {
      setStatus(minutes >= 540 && minutes < 840 ? 'open' : 'closed');
    } else {
      setStatus(minutes >= 540 && minutes < 1020 ? 'open' : 'closed');
    }
  }, []);

  if (variant === 'hero') {
    return (
      <motion.div
        className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md border ${
          status === 'open'
            ? 'bg-green-500/20 border-green-400/30 text-green-300'
            : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${
              status === 'open' ? 'bg-green-400' : 'bg-amber-400'
            }`}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            status === 'open' ? 'bg-green-400' : 'bg-amber-400'
          }`} />
        </span>
        <span className="text-sm font-semibold">
          {status === 'open' ? 'Open Now' : 'After Hours'}
        </span>
      </motion.div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
      status === 'open'
        ? 'bg-green-500/15 text-green-700 border border-green-500/20'
        : 'bg-amber-500/15 text-amber-700 border border-amber-500/20'
    }`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full ${
          status === 'open' ? 'bg-green-500' : 'bg-amber-500'
        } opacity-75 animate-ping`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${
          status === 'open' ? 'bg-green-500' : 'bg-amber-500'
        }`} />
      </span>
      {status === 'open' ? 'Open Now' : 'After Hours'}
    </div>
  );
}

// ============================================================================
// MOBILE HERO SECTION
// ============================================================================

function MobileHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/services/emergency-care/emergency-hero.jpg"
          alt="Emergency dental care"
          fill
          priority
          className="object-cover scale-110"
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/60 to-neutral-900/95" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#722F37]/40 via-transparent to-transparent" />
      </motion.div>

      {/* Emergency Pulse Background */}
      <EmergencyPulseBackground />

      {/* Dot Pattern */}
      <DotPattern />

      {/* Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col px-5 pt-6 pb-8"
        style={{ opacity: contentOpacity }}
      >
        {/* Top Status Row */}
        <div className="flex items-center justify-between mb-auto">
          <LiveStatusBadge variant="hero" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <FloatingCross className="w-5 h-5 text-red-400" />
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          className="mt-auto space-y-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Urgency Badge */}
          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500/20 to-amber-500/20 backdrop-blur-md rounded-full border border-red-500/30"
              animate={{ boxShadow: ['0 0 0 0 rgba(239,68,68,0)', '0 0 20px 4px rgba(239,68,68,0.3)', '0 0 0 0 rgba(239,68,68,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Siren className="w-4 h-4 text-red-400" />
              </motion.div>
              <span className="text-white/90 text-sm font-semibold tracking-wide">
                Same-Day Emergency Care
              </span>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-[2.75rem] font-bold text-white leading-[1.05] tracking-tight">
              Emergency
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">
                  Dental Care
                </span>
                {/* Underline accent */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-red-400 to-amber-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-white/75 text-lg leading-relaxed max-w-[320px]"
          >
            In pain? We offer <span className="text-white font-medium">same-day appointments</span> to get you relief fast.
          </motion.p>

          {/* Trust Pills */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-2"
          >
            {[
              { icon: CheckCircle2, text: 'Same-day visits' },
              { icon: Heart, text: 'Walk-ins OK' },
              { icon: ShieldCheck, text: 'Insurance accepted' },
            ].map((item, index) => (
              <motion.span
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
              >
                <item.icon className="w-3.5 h-3.5 text-green-400" />
                <span className="text-white/80 text-xs font-medium">{item.text}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div variants={fadeInUp} className="pt-2">
            <motion.a
              href={EMERGENCY_PHONE_HREF}
              className="group relative flex items-center justify-center gap-3 w-full py-5 overflow-hidden rounded-2xl"
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#722F37] via-[#8a3a44] to-[#722F37]" />

              {/* Animated shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(114,47,55,0.5)]" />

              <motion.div
                className="relative"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <PhoneCall className="w-6 h-6 text-white" />
              </motion.div>
              <span className="relative text-white font-bold text-xl tracking-wide">{EMERGENCY_PHONE}</span>
            </motion.a>
          </motion.div>

          {/* Secondary Actions */}
          <motion.div variants={fadeInUp} className="flex gap-3">
            <motion.a
              href="https://maps.google.com/?q=1729+Bank+St+Ottawa+ON"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl font-medium text-sm border border-white/10"
              whileTap={{ scale: 0.97 }}
            >
              <MapPin className="w-4 h-4" />
              Directions
            </motion.a>
            <motion.button
              onClick={() => document.getElementById('symptoms')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl font-medium text-sm border border-white/10"
              whileTap={{ scale: 0.97 }}
            >
              <Stethoscope className="w-4 h-4" />
              Check Symptoms
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 mt-8"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll for help</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/40"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// QUICK BENEFITS STRIP
// ============================================================================

function QuickBenefits() {
  const benefits = [
    { icon: ClockAlert, text: 'Same-Day Care', color: 'from-amber-500 to-orange-500' },
    { icon: Zap, text: 'Fast Relief', color: 'from-yellow-500 to-amber-500' },
    { icon: ShieldCheck, text: 'Expert Team', color: 'from-green-500 to-emerald-500' },
    { icon: HandHeart, text: 'Compassionate', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <section className="relative py-8 bg-gradient-to-r from-[#722F37] via-[#8a3a44] to-[#722F37] overflow-hidden">
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative px-4">
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                }}
              />

              <div className="relative flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}>
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">{benefit.text}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EMERGENCY TYPE CARD (MOBILE)
// ============================================================================

function EmergencyTypeCard({
  emergency,
  isExpanded,
  onToggle,
  index,
}: {
  emergency: typeof emergencyTypes[0];
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = emergency.icon;

  const urgencyConfig = {
    critical: {
      badge: 'bg-gradient-to-r from-red-500 to-rose-500',
      glow: 'shadow-red-500/25',
      ring: 'ring-red-500/30',
    },
    high: {
      badge: 'bg-gradient-to-r from-amber-500 to-orange-500',
      glow: 'shadow-amber-500/25',
      ring: 'ring-amber-500/30',
    },
    medium: {
      badge: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      glow: 'shadow-blue-500/25',
      ring: 'ring-blue-500/30',
    },
  };

  const config = urgencyConfig[emergency.urgency];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
        isExpanded
          ? `bg-gradient-to-br ${emergency.bgGradient} ring-2 ${config.ring} shadow-xl ${config.glow}`
          : 'bg-white border border-neutral-200 shadow-sm'
      }`}
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-5 flex items-center gap-4 text-left"
        whileTap={{ scale: 0.99 }}
        aria-expanded={isExpanded}
      >
        {/* Icon container */}
        <motion.div
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${
            isExpanded
              ? 'bg-white shadow-lg'
              : 'bg-gradient-to-br from-neutral-100 to-neutral-50'
          }`}
          animate={isExpanded ? { rotate: [0, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Glow ring when expanded */}
          {isExpanded && (
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${emergency.gradient} opacity-20`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <Icon className={`w-6 h-6 ${isExpanded ? 'text-neutral-900' : 'text-neutral-600'}`} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-neutral-900 text-base truncate">{emergency.title}</h3>
            <span className={`px-2 py-0.5 ${config.badge} text-white text-[10px] font-bold uppercase tracking-wide rounded-full shadow-sm`}>
              {emergency.urgency}
            </span>
          </div>
          <p className="text-neutral-500 text-sm truncate">{emergency.shortDesc}</p>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isExpanded ? 'bg-white shadow-sm' : 'bg-neutral-100'
          }`}
        >
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="pt-4 border-t border-neutral-200/50">
                <h4 className="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-4">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${emergency.gradient} flex items-center justify-center`}>
                    <Bandage className="w-3.5 h-3.5 text-white" />
                  </div>
                  First Aid Steps
                </h4>

                <ul className="space-y-3">
                  {emergency.firstAid.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${emergency.gradient} text-white flex items-center justify-center text-xs font-bold shadow-sm`}>
                        {i + 1}
                      </span>
                      <span className="text-neutral-700 text-sm pt-0.5">{step}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href={EMERGENCY_PHONE_HREF}
                  className="flex items-center justify-center gap-2 w-full mt-5 py-3.5 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#722F37]/25"
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-4 h-4" />
                  Call for This Emergency
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// SYMPTOM CHECKER SECTION (MOBILE)
// ============================================================================

function MobileSymptomChecker() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      id="symptoms"
      ref={sectionRef}
      className="relative py-14 px-5 bg-gradient-to-b from-[#FDF8F3] via-white to-[#FDF8F3] overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-[#722F37]/10 to-transparent blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#722F37]/10 rounded-full mb-4"
        >
          <Stethoscope className="w-4 h-4 text-[#722F37]" />
          <span className="text-[#722F37] text-xs font-semibold tracking-widest uppercase">
            Symptom Checker
          </span>
        </motion.div>

        <h2 className="text-3xl font-bold text-neutral-900 mb-3">
          What&apos;s Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]"> Emergency</span>?
        </h2>
        <p className="text-neutral-500 text-base">
          Tap to see first aid tips
        </p>
      </motion.div>

      {/* Emergency Cards */}
      <div className="space-y-4">
        {emergencyTypes.map((emergency, index) => (
          <EmergencyTypeCard
            key={emergency.id}
            emergency={emergency}
            isExpanded={expandedId === emergency.id}
            onToggle={() => setExpandedId(expandedId === emergency.id ? null : emergency.id)}
            index={index}
          />
        ))}
      </div>

      {/* Bottom Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-amber-900 text-sm mb-1">Not sure about your symptoms?</p>
            <p className="text-amber-700 text-sm">
              When in doubt, call us. We&apos;ll help determine if you need immediate care.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// STEP CARD
// ============================================================================

function StepCard({ step, index }: { step: { title: string; description: string; icon: React.ReactNode; color: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="relative flex gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-lg shadow-neutral-200/50"
    >
      {/* Step number badge */}
      <motion.div
        className={`absolute -top-3 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} text-white text-sm font-bold flex items-center justify-center shadow-lg`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 400 }}
      >
        {index + 1}
      </motion.div>

      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
        {step.icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-neutral-900 text-base mb-1">{step.title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// WHAT TO DO SECTION (MOBILE)
// ============================================================================

function MobileWhatToDo() {
  const steps = [
    {
      title: 'Stay Calm',
      description: 'Take a breath. Most emergencies are treatable with prompt care.',
      icon: <HeartPulse className="w-5 h-5" />,
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Assess Symptoms',
      description: 'Check for bleeding, swelling, or loose teeth to report.',
      icon: <Stethoscope className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Apply First Aid',
      description: 'Use our guide above for immediate relief steps.',
      icon: <Bandage className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Call Us Now',
      description: 'Reach out for priority same-day emergency care.',
      icon: <PhoneCall className="w-5 h-5" />,
      color: 'from-[#722F37] to-[#a04d56]',
    },
  ];

  return (
    <section className="relative py-14 px-5 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FDF8F3] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#722F37]/10 to-[#a04d56]/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-[#722F37]" />
          <span className="text-[#722F37] text-xs font-semibold tracking-widest uppercase">
            Emergency Guide
          </span>
        </div>

        <h2 className="text-3xl font-bold text-neutral-900">
          What To <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]">Do</span>
        </h2>
      </motion.div>

      <div className="relative space-y-4">
        {/* Connecting line */}
        <div className="absolute left-[2.15rem] top-16 bottom-16 w-0.5 bg-gradient-to-b from-pink-300 via-amber-300 to-[#722F37]/50 rounded-full" />

        {steps.map((step, index) => (
          <StepCard key={step.title} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// OFFICE HOURS (MOBILE)
// ============================================================================

function MobileOfficeHours() {
  const [isExpanded, setIsExpanded] = useState(false);
  const today = new Date().getDay();

  const fullHours = [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM', isToday: today === 1 },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM', isToday: today === 2 },
    { day: 'Wednesday', hours: '9:00 AM - 5:00 PM', isToday: today === 3 },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM', isToday: today === 4 },
    { day: 'Friday', hours: '9:00 AM - 5:00 PM', isToday: today === 5 },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM', isToday: today === 6 },
    { day: 'Sunday', hours: 'Closed', isToday: today === 0, closed: true },
  ];

  return (
    <section className="relative py-14 px-5 bg-gradient-to-b from-white via-[#FDF8F3] to-white overflow-hidden">
      {/* Decorative orb */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-[#722F37]/10 to-transparent blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#722F37]/10 to-[#a04d56]/10 rounded-full mb-4">
          <Clock className="w-4 h-4 text-[#722F37]" />
          <span className="text-[#722F37] text-xs font-semibold tracking-widest uppercase">
            Visit Us
          </span>
        </div>

        <h2 className="text-3xl font-bold text-neutral-900">
          Hours & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]">Location</span>
        </h2>
      </motion.div>

      {/* Hours Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-200/50 mb-5"
      >
        {/* Header */}
        <div className="relative p-5 bg-gradient-to-r from-[#722F37] via-[#8a3a44] to-[#722F37] text-white overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">Office Hours</span>
            </div>
            <LiveStatusBadge variant="hero" />
          </div>
        </div>

        {/* Quick View */}
        <div className="p-5">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {officeHours.map((item) => (
              <div key={item.day} className="p-3 bg-neutral-50 rounded-xl text-center">
                <div className="text-xs text-neutral-400 mb-1 font-medium">{item.day}</div>
                <div className="text-sm font-semibold text-neutral-700">{item.hours}</div>
              </div>
            ))}
          </div>

          {/* Expand Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 w-full py-3 text-[#722F37] font-semibold text-sm"
            whileTap={{ scale: 0.98 }}
          >
            {isExpanded ? 'Show Less' : 'View Full Schedule'}
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          {/* Expanded Hours */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-2 border-t border-neutral-100">
                  {fullHours.map((item, index) => (
                    <motion.div
                      key={item.day}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex justify-between p-4 rounded-xl ${
                        item.isToday
                          ? 'bg-gradient-to-r from-[#722F37]/10 to-[#a04d56]/10 border border-[#722F37]/20'
                          : 'bg-neutral-50'
                      }`}
                    >
                      <span className={`font-medium ${item.isToday ? 'text-[#722F37]' : 'text-neutral-700'}`}>
                        {item.day}
                        {item.isToday && (
                          <span className="ml-2 text-xs bg-gradient-to-r from-[#722F37] to-[#a04d56] text-white px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={item.closed ? 'text-neutral-400' : 'text-neutral-600 font-medium'}>
                        {item.hours}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Location Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-200/50"
      >
        {/* Map Image */}
        <div className="relative h-44">
          <Image
            src="/images/services/emergency-care/dental-consultation.jpg"
            alt="Our dental office"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

          {/* Floating pin */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-10 h-10 rounded-full bg-[#722F37] flex items-center justify-center shadow-lg shadow-[#722F37]/30">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="w-3 h-3 bg-[#722F37] rotate-45 mx-auto -mt-1.5" />
          </motion.div>
        </div>

        <div className="p-5 -mt-6 relative">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#a04d56] flex items-center justify-center text-white shadow-lg shadow-[#722F37]/25 flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-lg">Our Location</h3>
              <p className="text-neutral-500 text-sm">1729 Bank St, Ottawa ON</p>
            </div>
          </div>

          <motion.a
            href="https://maps.google.com/?q=1729+Bank+St+Ottawa+ON+K1V+7Z4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-semibold text-sm transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <MapPin className="w-4 h-4" />
            Get Directions
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>

      {/* After Hours Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-5 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
            <TriangleAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-amber-900 text-sm mb-1">After-Hours?</p>
            <p className="text-amber-700 text-sm">
              Call our main line for emergency instructions.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE FAQ
// ============================================================================

function MobileFAQItem({ faq, isOpen, onToggle, index }: { faq: FAQItem; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-neutral-100 last:border-b-0"
    >
      <motion.button
        onClick={onToggle}
        className="w-full py-5 flex items-start gap-4 text-left"
        whileTap={{ scale: 0.99 }}
        aria-expanded={isOpen}
      >
        <motion.div
          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-gradient-to-br from-[#722F37] to-[#a04d56] text-white shadow-lg shadow-[#722F37]/25'
              : 'bg-neutral-100 text-neutral-500'
          }`}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-lg font-light">+</span>
        </motion.div>
        <span className={`font-semibold pr-4 transition-colors ${isOpen ? 'text-[#722F37]' : 'text-neutral-800'}`}>
          {faq.question}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-12 pr-4 text-neutral-600 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MobileFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-14 px-5 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#722F37]/10 to-[#a04d56]/10 rounded-full mb-4">
          <CircleDot className="w-4 h-4 text-[#722F37]" />
          <span className="text-[#722F37] text-xs font-semibold tracking-widest uppercase">
            Questions
          </span>
        </div>

        <h2 className="text-3xl font-bold text-neutral-900">
          Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]">Asked</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-200/50"
      >
        <div className="p-2">
          {faqs.map((faq, index) => (
            <MobileFAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES (MOBILE)
// ============================================================================

function MobileRelatedServices() {
  const services = [
    {
      title: 'Root Canal',
      href: '/services/root-canal',
      icon: Activity,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Oral Surgery',
      href: '/services/oral-surgery',
      icon: ShieldPlus,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'White Fillings',
      href: '/services/white-fillings',
      icon: Check,
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section className="relative py-14 px-5 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#722F37]/10 to-[#a04d56]/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-[#722F37]" />
          <span className="text-[#722F37] text-xs font-semibold tracking-widest uppercase">
            Related
          </span>
        </div>

        <h2 className="text-3xl font-bold text-neutral-900">
          Other <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]">Services</span>
        </h2>
      </motion.div>

      <div className="space-y-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={service.href}
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-lg shadow-neutral-200/50 active:scale-[0.99] transition-transform"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="flex-1 font-bold text-neutral-900 text-lg">{service.title}</span>
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-active:bg-neutral-200 transition-colors">
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[#722F37] font-bold text-sm"
        >
          View All Services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION (MOBILE)
// ============================================================================

function MobileFinalCTA() {
  return (
    <section className="relative py-16 px-5 bg-gradient-to-br from-[#722F37] via-[#8a3a44] to-[#5a252c] overflow-hidden">
      {/* Animated background elements */}
      <EmergencyPulseBackground />

      {/* Floating crosses */}
      <FloatingCross className="absolute top-10 right-10 w-8 h-8 text-white/10" />
      <FloatingCross className="absolute bottom-20 left-6 w-6 h-6 text-white/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative text-center"
      >
        {/* Animated icon */}
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm mb-6"
          animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 0 0 rgba(255,255,255,0)', '0 0 30px 10px rgba(255,255,255,0.2)', '0 0 0 0 rgba(255,255,255,0)'] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <TriangleAlert className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Need Emergency Care?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xs mx-auto">
          Don&apos;t wait in pain. We&apos;re here to help with same-day appointments.
        </p>

        <motion.a
          href={EMERGENCY_PHONE_HREF}
          className="group relative flex items-center justify-center gap-3 w-full py-5 overflow-hidden rounded-2xl"
          whileTap={{ scale: 0.98 }}
        >
          {/* White background */}
          <div className="absolute inset-0 bg-white" />

          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#722F37]/10 to-transparent -skew-x-12"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />

          <PhoneCall className="relative w-6 h-6 text-[#722F37]" />
          <span className="relative text-[#722F37] font-bold text-xl">Call {EMERGENCY_PHONE}</span>
        </motion.a>

        <p className="text-white/50 text-sm mt-5">
          Walk-ins welcome during office hours
        </p>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MAIN MOBILE PAGE COMPONENT
// ============================================================================

export default function EmergencyCarePageMobile() {
  return (
    <main className="min-h-screen pb-24 overflow-x-hidden">
      {/* Hero */}
      <MobileHero />

      {/* Quick Benefits */}
      <QuickBenefits />

      {/* Symptom Checker */}
      <MobileSymptomChecker />

      {/* What To Do */}
      <MobileWhatToDo />

      {/* Hours & Location */}
      <MobileOfficeHours />

      {/* FAQ */}
      <MobileFAQ />

      {/* Related Services */}
      <MobileRelatedServices />

      {/* Final CTA */}
      <MobileFinalCTA />

      {/* Sticky Bottom CTA */}
      <StickyEmergencyCTA />
    </main>
  );
}
