'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  Lock,
  LockKeyhole,
  Eye,
  EyeOff,
  FileText,
  FileUser,
  Users,
  Server,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  Database,
  KeyRound,
  Fingerprint,
  Cookie,
  Globe,
  Clock,
  UserCheck,
  Scale,
  Sparkles,
  X,
  MapPin,
} from 'lucide-react';
import { contactInfo } from '@/data/site-config';

const lastUpdated = 'January 2026';

// Section data structure
const sections = [
  { id: 'commitment', title: 'Our Commitment', icon: ShieldCheck, shortTitle: 'Commitment', color: 'from-teal-500 to-emerald-500' },
  { id: 'information-collected', title: 'Information We Collect', icon: FileUser, shortTitle: 'What We Collect', color: 'from-blue-500 to-cyan-500' },
  { id: 'how-we-use', title: 'How We Use Your Information', icon: Eye, shortTitle: 'How We Use It', color: 'from-violet-500 to-purple-500' },
  { id: 'information-sharing', title: 'Information Sharing', icon: Users, shortTitle: 'Sharing', color: 'from-pink-500 to-rose-500' },
  { id: 'data-security', title: 'Data Security', icon: LockKeyhole, shortTitle: 'Security', color: 'from-amber-500 to-orange-500' },
  { id: 'your-rights', title: 'Your Rights', icon: Scale, shortTitle: 'Your Rights', color: 'from-emerald-500 to-teal-500' },
  { id: 'website-privacy', title: 'Website Privacy', icon: Globe, shortTitle: 'Website', color: 'from-indigo-500 to-blue-500' },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Cookie, shortTitle: 'Cookies', color: 'from-orange-500 to-amber-500' },
  { id: 'third-party', title: 'Third-Party Services', icon: Server, shortTitle: 'Third-Party', color: 'from-slate-500 to-zinc-500' },
  { id: 'retention', title: 'Record Retention', icon: Clock, shortTitle: 'Retention', color: 'from-cyan-500 to-teal-500' },
  { id: 'consent', title: 'Your Consent', icon: UserCheck, shortTitle: 'Consent', color: 'from-green-500 to-emerald-500' },
  { id: 'contact', title: 'Contact Us', icon: Mail, shortTitle: 'Contact', color: 'from-primary-500 to-primary-600' },
];

// Animation variants
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// Floating Orbs Background
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary-400/20 to-primary-600/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-10%', right: '-20%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-secondary-400/15 to-amber-500/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '20%', left: '-15%' }}
      />
    </div>
  );
}

// Animated Shield Icon for Hero
function AnimatedShieldIcon() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 blur-xl opacity-40"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main icon container */}
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
        <motion.div
          animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ShieldCheck className="w-10 h-10 text-white" strokeWidth={1.5} />
        </motion.div>

        {/* Sparkle decorations */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-full h-full text-secondary-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Trust Badge Component
function TrustBadge({ icon: Icon, label, delay = 0 }: { icon: React.ElementType; label: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-primary-100 shadow-sm"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-primary-600" />
      </div>
      <span className="text-xs font-medium text-slate-700 whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

// Mobile Accordion Section with Enhanced Styling
function MobileAccordion({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  sectionNumber,
  gradientColor,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  sectionNumber: number;
  gradientColor: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="overflow-hidden"
      initial={false}
      layout
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 py-5 text-left touch-manipulation group"
        whileTap={{ scale: 0.99 }}
        style={{ minHeight: '64px' }}
      >
        {/* Icon with gradient background */}
        <motion.div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-lg flex-shrink-0`}
          animate={isOpen ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: isOpen ? '0 8px 20px -4px rgba(0,0,0,0.15)' : '0 4px 12px -2px rgba(0,0,0,0.1)',
          }}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </motion.div>

        {/* Title and number */}
        <div className="flex-1 min-w-0">
          <motion.span
            className="text-[10px] font-bold uppercase tracking-wider text-primary-500/70"
            animate={{ opacity: isOpen ? 1 : 0.7 }}
          >
            Section {String(sectionNumber).padStart(2, '0')}
          </motion.span>
          <h2 className="text-base font-semibold text-slate-900 leading-tight pr-2">
            {title}
          </h2>
        </div>

        {/* Expand indicator */}
        <motion.div
          className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0"
          animate={{
            backgroundColor: isOpen ? 'rgb(240, 253, 250)' : 'rgb(241, 245, 249)',
            rotate: isOpen ? 180 : 0,
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-primary-600' : 'text-slate-400'}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
              opacity: { duration: 0.3 },
            }}
            className="overflow-hidden"
          >
            <motion.div
              className="pb-6 pl-16"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Quick Navigation Bottom Sheet
function QuickNavSheet({
  isOpen,
  onClose,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          {/* Bottom Sheet */}
          <motion.div
            initial={prefersReducedMotion ? { y: 0 } : { y: '100%' }}
            animate={{ y: 0 }}
            exit={prefersReducedMotion ? { y: 0 } : { y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[28px] z-50 max-h-[75vh] overflow-hidden shadow-2xl"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <motion.div
                className="w-10 h-1 bg-slate-300 rounded-full"
                whileTap={{ scale: 0.9 }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Quick Navigation</h3>
                <p className="text-xs text-slate-500">Jump to any section</p>
              </div>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center touch-manipulation"
                whileTap={{ scale: 0.9 }}
                aria-label="Close navigation"
              >
                <X className="w-5 h-5 text-slate-600" />
              </motion.button>
            </div>

            {/* Scrollable list */}
            <div className="overflow-y-auto max-h-[calc(75vh-100px)] overscroll-contain">
              <motion.div
                className="px-4 py-3 space-y-1"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      onNavigate(section.id);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl active:bg-slate-50 transition-colors touch-manipulation"
                    variants={fadeInUp}
                    whileTap={{ scale: 0.98 }}
                    style={{ minHeight: '56px' }}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <section.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-left flex-1 text-slate-800 font-medium">
                      {section.shortTitle}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-300 bg-slate-100 px-2 py-1 rounded-full">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Info Card Component
function InfoCard({
  icon: Icon,
  title,
  description,
  variant = 'default',
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  variant?: 'default' | 'warning' | 'success';
}) {
  const variants = {
    default: {
      bg: 'bg-slate-50',
      border: 'border-slate-200/60',
      iconBg: 'bg-white',
      iconColor: 'text-primary-600',
      titleColor: 'text-slate-900',
      textColor: 'text-slate-600',
    },
    warning: {
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      border: 'border-amber-200/60',
      iconBg: 'bg-white',
      iconColor: 'text-amber-600',
      titleColor: 'text-amber-900',
      textColor: 'text-amber-800',
    },
    success: {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      border: 'border-emerald-200/60',
      iconBg: 'bg-white',
      iconColor: 'text-emerald-600',
      titleColor: 'text-emerald-900',
      textColor: 'text-emerald-800',
    },
  };

  const styles = variants[variant];

  return (
    <motion.div
      className={`p-4 rounded-2xl border ${styles.bg} ${styles.border}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${styles.iconBg} shadow-sm flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm mb-1 ${styles.titleColor}`}>{title}</h4>
          <p className={`text-sm leading-relaxed ${styles.textColor}`}>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Check item for lists
function CheckItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.li
      className="flex items-start gap-3 py-2"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
      </div>
      <span className="text-sm text-slate-600 leading-relaxed">{children}</span>
    </motion.li>
  );
}

// Feature Card for compact display
function FeatureCard({
  icon: Icon,
  title,
  desc,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  gradient?: string;
}) {
  return (
    <motion.div
      className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`w-10 h-10 rounded-xl ${gradient || 'bg-gradient-to-br from-primary-100 to-primary-200'} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${gradient ? 'text-white' : 'text-primary-600'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-slate-900 mb-0.5">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// Stats Card
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-primary-100 text-center shadow-sm"
      whileTap={{ scale: 0.95 }}
    >
      <motion.p
        className="text-3xl font-bold bg-gradient-to-br from-primary-600 to-primary-700 bg-clip-text text-transparent"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {value}
      </motion.p>
      <p className="text-xs text-slate-600 mt-1 leading-tight">{label}</p>
    </motion.div>
  );
}

export default function PrivacyPolicyMobile() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 200], [1, 0.95]);

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50" ref={mainRef}>
      {/* Hero Section - Premium Mobile Design */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50/30" />
        <FloatingOrbs />

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full">
            <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div
          className="relative px-5 pt-6 pb-10"
          style={{ opacity: prefersReducedMotion ? 1 : heroOpacity, scale: prefersReducedMotion ? 1 : heroScale }}
        >
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-sm mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-slate-500 active:text-primary-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300" aria-hidden="true" />
            <span className="text-primary-600 font-medium">Privacy Policy</span>
          </motion.nav>

          {/* Hero Content */}
          <motion.div
            className="flex flex-col items-center text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Animated Shield */}
            <motion.div variants={scaleIn} className="mb-6">
              <AnimatedShieldIcon />
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-primary-50 border border-primary-200/50 mb-4"
            >
              <Lock className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-semibold text-primary-700 uppercase tracking-wider">Your Privacy Protected</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl font-bold text-slate-900 leading-tight mb-3"
            >
              Privacy{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-slate-600 text-sm leading-relaxed max-w-xs mb-6"
            >
              Your privacy matters to us. Learn how we collect, use, and protect your personal information.
            </motion.p>

            {/* Meta info */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 text-xs text-slate-500"
            >
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-primary-500" />
                Updated: {lastUpdated}
              </span>
              <span className="bg-white/80 px-3 py-1.5 rounded-full">~8 min read</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators - Horizontal Scroll */}
        <div className="relative pb-6">
          <div className="overflow-x-auto scrollbar-hide px-5">
            <div className="flex gap-2 min-w-max pb-1">
              <TrustBadge icon={ShieldCheck} label="PIPEDA Compliant" delay={0.1} />
              <TrustBadge icon={LockKeyhole} label="SSL Encrypted" delay={0.2} />
              <TrustBadge icon={Database} label="Secure Storage" delay={0.3} />
              <TrustBadge icon={Fingerprint} label="Access Controls" delay={0.4} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Jump Button - Sticky */}
      <motion.div
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-5 py-3"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.button
          onClick={() => setIsNavOpen(true)}
          className="w-full flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-slate-50 to-slate-100/80 rounded-2xl active:from-slate-100 active:to-slate-150 transition-all touch-manipulation border border-slate-200/50"
          whileTap={{ scale: 0.98 }}
          style={{ minHeight: '52px' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Jump to Section</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-full">
              {sections.length} sections
            </span>
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </div>
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <main className="px-5 py-8">
        {/* Commitment Highlight Card */}
        <motion.section
          id="commitment"
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden p-6 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl shadow-xl shadow-primary-500/20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Section 01</span>
                  <h2 className="text-lg font-bold text-white">Our Commitment</h2>
                </div>
              </div>

              <p className="text-white/90 text-sm leading-relaxed mb-5">
                We comply with PIPEDA and provincial privacy legislation. Your personal health information is treated with the utmost confidentiality.
              </p>

              <div className="flex flex-wrap gap-2">
                {['PIPEDA', 'Provincial Laws', 'Health Privacy'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Accordion Sections */}
        <div className="divide-y divide-slate-100">
          {/* Section 1: Information Collected */}
          <MobileAccordion
            title="Information We Collect"
            icon={FileUser}
            sectionNumber={2}
            gradientColor={sections[1]?.color ?? 'blue'}
            defaultOpen
          >
            <div id="information-collected">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                We collect personal information necessary to provide quality dental care:
              </p>

              {/* Personal Identification */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl mb-3 border border-blue-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-900">Personal Identification</h3>
                </div>
                <ul className="space-y-0">
                  <CheckItem delay={0}>Name, address, phone, email</CheckItem>
                  <CheckItem delay={0.05}>Date of birth and gender</CheckItem>
                  <CheckItem delay={0.1}>Health card & insurance info</CheckItem>
                </ul>
              </div>

              {/* Health Information */}
              <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-violet-600" />
                  <h3 className="font-bold text-sm text-slate-900">Health Information</h3>
                </div>
                <ul className="space-y-0">
                  <CheckItem delay={0}>Medical and dental history</CheckItem>
                  <CheckItem delay={0.05}>X-rays and diagnostic images</CheckItem>
                  <CheckItem delay={0.1}>Treatment records and notes</CheckItem>
                </ul>
              </div>
            </div>
          </MobileAccordion>

          {/* Section 2: How We Use */}
          <MobileAccordion
            title="How We Use Your Information"
            icon={Eye}
            sectionNumber={3}
            gradientColor={sections[2]?.color ?? 'teal'}
          >
            <div id="how-we-use" className="space-y-3">
              <FeatureCard
                icon={Shield}
                title="Providing Dental Care"
                desc="To diagnose, treat, and manage your dental health effectively."
                gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
              />
              <FeatureCard
                icon={FileText}
                title="Administration"
                desc="Scheduling, insurance claims, billing, and records management."
                gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
              />
              <FeatureCard
                icon={Mail}
                title="Communication"
                desc="Appointment reminders and important practice updates."
                gradient="bg-gradient-to-br from-violet-500 to-purple-500"
              />
              <FeatureCard
                icon={CheckCircle2}
                title="Quality Improvement"
                desc="Enhancing services and meeting regulatory requirements."
                gradient="bg-gradient-to-br from-pink-500 to-rose-500"
              />
            </div>
          </MobileAccordion>

          {/* Section 3: Information Sharing */}
          <MobileAccordion
            title="Information Sharing"
            icon={Users}
            sectionNumber={4}
            gradientColor={sections[3]?.color ?? 'purple'}
          >
            <div id="information-sharing">
              <InfoCard
                icon={Shield}
                title="We Never Sell Your Data"
                description="We do not sell, trade, or rent your personal information to third parties."
                variant="success"
              />

              <h4 className="font-semibold text-sm text-slate-900 mt-5 mb-3">We may share only when:</h4>
              <ul className="space-y-0">
                {[
                  'With your explicit consent',
                  'With healthcare providers involved in your care',
                  'With insurance companies for claims processing',
                  'With dental laboratories for treatment',
                  'When required by law or court order',
                  'In emergencies for your safety',
                ].map((item, i) => (
                  <CheckItem key={i} delay={i * 0.05}>{item}</CheckItem>
                ))}
              </ul>
            </div>
          </MobileAccordion>

          {/* Section 4: Data Security */}
          <MobileAccordion
            title="Data Security"
            icon={LockKeyhole}
            sectionNumber={5}
            gradientColor={sections[4]?.color ?? 'amber'}
          >
            <div id="data-security">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                We implement robust security measures to protect your information:
              </p>
              <div className="space-y-3">
                <FeatureCard
                  icon={Database}
                  title="Secure Electronic Records"
                  desc="Advanced access controls and encryption for digital data."
                />
                <FeatureCard
                  icon={Lock}
                  title="Physical Security"
                  desc="Locked storage and restricted access for paper records."
                />
                <FeatureCard
                  icon={Users}
                  title="Staff Training"
                  desc="Regular privacy and security training for all team members."
                />
                <FeatureCard
                  icon={ShieldCheck}
                  title="Security Assessments"
                  desc="Regular audits to identify and address vulnerabilities."
                />
              </div>
            </div>
          </MobileAccordion>

          {/* Section 5: Your Rights */}
          <MobileAccordion
            title="Your Rights"
            icon={Scale}
            sectionNumber={6}
            gradientColor={sections[5]?.color ?? 'rose'}
          >
            <div id="your-rights" className="space-y-3">
              {[
                { icon: Eye, title: 'Access', desc: 'Request access to your personal information at any time.', color: 'from-blue-500 to-cyan-500' },
                { icon: FileText, title: 'Correction', desc: 'Request corrections to any inaccurate information.', color: 'from-violet-500 to-purple-500' },
                { icon: EyeOff, title: 'Withdrawal', desc: 'Withdraw consent for certain uses, subject to legal requirements.', color: 'from-amber-500 to-orange-500' },
                { icon: AlertCircle, title: 'Complaints', desc: 'File a complaint with the Privacy Commissioner of Canada.', color: 'from-rose-500 to-pink-500' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 pl-13">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </MobileAccordion>

          {/* Section 6: Website Privacy */}
          <MobileAccordion
            title="Website & Online Privacy"
            icon={Globe}
            sectionNumber={7}
            gradientColor={sections[6]?.color ?? 'indigo'}
          >
            <div id="website-privacy">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                When you use our website or contact forms:
              </p>
              <ul className="mb-4">
                <CheckItem>We collect only info you voluntarily provide</CheckItem>
                <CheckItem delay={0.05}>We may use cookies for website functionality</CheckItem>
                <CheckItem delay={0.1}>SSL encryption protects transmitted data</CheckItem>
              </ul>
              <InfoCard
                icon={AlertCircle}
                title="Important Notice"
                description="Do not send sensitive health info through our website. Please discuss health matters in person or by phone."
                variant="warning"
              />
            </div>
          </MobileAccordion>

          {/* Section 7: Cookies */}
          <MobileAccordion
            title="Cookies & Tracking"
            icon={Cookie}
            sectionNumber={8}
            gradientColor={sections[7]?.color ?? 'emerald'}
          >
            <div id="cookies">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Our website uses cookies to enhance your browsing experience:
              </p>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl mb-4 border border-orange-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-sm text-slate-900">What We Collect</h3>
                </div>
                <ul className="space-y-0">
                  <CheckItem>Browser type and version</CheckItem>
                  <CheckItem delay={0.05}>Pages visited and time spent</CheckItem>
                  <CheckItem delay={0.1}>Referring website info</CheckItem>
                  <CheckItem delay={0.15}>Device and access times</CheckItem>
                </ul>
              </div>
              <InfoCard
                icon={AlertCircle}
                title="Cookie Control"
                description="You can configure your browser to refuse cookies. This may affect some website functionality."
                variant="warning"
              />
            </div>
          </MobileAccordion>

          {/* Section 8: Third-Party */}
          <MobileAccordion
            title="Third-Party Services"
            icon={Server}
            sectionNumber={9}
            gradientColor={sections[8]?.color ?? 'sky'}
          >
            <div id="third-party">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Our website may contain links to third-party services with their own privacy policies.
              </p>
              <ul>
                <CheckItem>We assume no responsibility for third-party privacy practices</CheckItem>
                <CheckItem delay={0.05}>Review their policies before providing information</CheckItem>
                <CheckItem delay={0.1}>Trusted service providers are bound by confidentiality agreements</CheckItem>
              </ul>
            </div>
          </MobileAccordion>

          {/* Section 9: Retention */}
          <MobileAccordion
            title="Record Retention"
            icon={Clock}
            sectionNumber={10}
            gradientColor={sections[9]?.color ?? 'violet'}
          >
            <div id="retention">
              <div className="p-5 bg-gradient-to-br from-cyan-50 via-teal-50 to-primary-50 rounded-2xl border border-primary-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow-md flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <p className="text-sm text-slate-700 flex-1 font-medium">
                    Records retained per RCDSO guidelines
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard value="10+" label="Years for adults after last visit" />
                  <StatCard value="10+" label="Years after minors turn 18" />
                </div>
              </div>
            </div>
          </MobileAccordion>

          {/* Section 10: Consent */}
          <MobileAccordion
            title="Your Consent"
            icon={UserCheck}
            sectionNumber={11}
            gradientColor={sections[10]?.color ?? 'blue'}
          >
            <div id="consent" className="space-y-3">
              <FeatureCard
                icon={UserCheck}
                title="Your Consent"
                desc="By using our services, you consent to this policy. Continued use after changes constitutes acceptance."
              />
              <FeatureCard
                icon={Users}
                title="Children's Privacy"
                desc="We comply with COPPA. Dental services for children require parental consent."
              />
              <FeatureCard
                icon={FileText}
                title="Policy Updates"
                desc="We may update this policy. Changes will be posted with an updated date."
              />

              <div className="p-3 bg-slate-100 rounded-xl mt-4">
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold">Note:</span> This policy applies to our website only, not information collected offline.
                  </p>
                </div>
              </div>
            </div>
          </MobileAccordion>
        </div>

        {/* Contact Section - Premium Card */}
        <motion.section
          id="contact"
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30"
                  whileTap={{ scale: 0.95 }}
                >
                  <KeyRound className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-400">Section 12</span>
                  <h2 className="text-lg font-bold text-white">Privacy Questions?</h2>
                </div>
              </div>

              <p className="text-slate-300 text-sm mb-6">
                Contact our Privacy Officer for questions or to exercise your rights:
              </p>

              {/* Contact buttons */}
              <div className="space-y-3 mb-6">
                <motion.a
                  href={`tel:+1${contactInfo.phone}`}
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 active:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.98 }}
                  style={{ minHeight: '68px' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Call Us</p>
                    <p className="text-white font-bold text-lg">
                      ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 active:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.98 }}
                  style={{ minHeight: '68px' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Email Us</p>
                    <p className="text-white font-semibold">
                      {contactInfo.email}
                    </p>
                  </div>
                </motion.a>
              </div>

              {/* Address */}
              <div className="pt-5 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Ottawa South Dental</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {contactInfo.address.street}<br />
                      {contactInfo.address.city}, {contactInfo.address.province} {contactInfo.address.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Back to Contact Link */}
        <motion.div
          className="mt-10 text-center pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 text-primary-700 font-semibold rounded-full active:bg-primary-100 transition-colors"
          >
            <span>Back to Contact Page</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </main>

      {/* Quick Navigation Bottom Sheet */}
      <QuickNavSheet
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onNavigate={scrollToSection}
      />

      {/* Scroll to Top - Fixed Bottom */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
            className="fixed bottom-6 right-5 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-2xl shadow-xl shadow-primary-500/30 flex items-center justify-center z-30 active:scale-95 transition-transform"
            aria-label="Scroll to top"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
