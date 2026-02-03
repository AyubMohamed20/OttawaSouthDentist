'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
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
  BookOpen,
  ArrowUp,
  Database,
  KeyRound,
  Fingerprint,
  Cookie,
  Globe,
  Clock,
  UserCheck,
  Scale,
} from 'lucide-react';
import { contactInfo } from '@/data/site-config';

const lastUpdated = 'January 2026';

// Section data structure with enhanced icons
const sections = [
  { id: 'commitment', title: 'Our Commitment', icon: ShieldCheck },
  { id: 'information-collected', title: 'Information We Collect', icon: FileUser },
  { id: 'how-we-use', title: 'How We Use Your Information', icon: Eye },
  { id: 'information-sharing', title: 'Information Sharing', icon: Users },
  { id: 'data-security', title: 'Data Security', icon: LockKeyhole },
  { id: 'your-rights', title: 'Your Rights', icon: Scale },
  { id: 'website-privacy', title: 'Website Privacy', icon: Globe },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Cookie },
  { id: 'third-party', title: 'Third-Party Services', icon: Server },
  { id: 'retention', title: 'Record Retention', icon: Clock },
  { id: 'consent', title: 'Your Consent', icon: UserCheck },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

// Privacy Shield Illustration SVG
function PrivacyShieldIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="lockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      {/* Shield background */}
      <path
        d="M100 20 L170 50 L170 100 C170 140 140 170 100 185 C60 170 30 140 30 100 L30 50 Z"
        fill="url(#shieldGradient)"
        stroke="#0d9488"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      {/* Inner shield */}
      <path
        d="M100 35 L155 58 L155 95 C155 128 130 152 100 165 C70 152 45 128 45 95 L45 58 Z"
        fill="white"
        fillOpacity="0.5"
        stroke="#0d9488"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      {/* Lock body */}
      <rect
        x="75"
        y="85"
        width="50"
        height="40"
        rx="6"
        fill="url(#lockGradient)"
      />
      {/* Lock shackle */}
      <path
        d="M85 85 L85 70 C85 58 92 50 100 50 C108 50 115 58 115 70 L115 85"
        stroke="#0d9488"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Keyhole */}
      <circle cx="100" cy="102" r="6" fill="white" />
      <rect x="97" y="105" width="6" height="12" rx="2" fill="white" />
      {/* Decorative circles */}
      <circle cx="100" cy="100" r="90" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.2" fill="none" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="95" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />
    </svg>
  );
}

// Document Security Illustration
function DocumentSecurityIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      {/* Document */}
      <rect x="25" y="15" width="70" height="90" rx="4" fill="url(#docGradient)" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Document fold */}
      <path d="M75 15 L95 35 L75 35 Z" fill="#cbd5e1" />
      {/* Text lines */}
      <rect x="35" y="45" width="40" height="4" rx="2" fill="#cbd5e1" />
      <rect x="35" y="55" width="50" height="4" rx="2" fill="#cbd5e1" />
      <rect x="35" y="65" width="35" height="4" rx="2" fill="#cbd5e1" />
      <rect x="35" y="75" width="45" height="4" rx="2" fill="#cbd5e1" />
      {/* Shield badge */}
      <g transform="translate(65, 70)">
        <path
          d="M20 5 L35 12 L35 22 C35 30 28 36 20 40 C12 36 5 30 5 22 L5 12 Z"
          fill="#0d9488"
        />
        <path
          d="M15 22 L18 25 L26 17"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

// Data Flow Illustration
function DataFlowIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* User icon */}
      <circle cx="30" cy="40" r="12" fill="#e2e8f0" stroke="#0d9488" strokeWidth="2" />
      <circle cx="30" cy="35" r="5" fill="#0d9488" />
      <path d="M20 52 C20 45 40 45 40 52" fill="#0d9488" />

      {/* Arrow 1 */}
      <path d="M50 40 L70 40" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M68 36 L74 40 L68 44" fill="#0d9488" />

      {/* Shield (protection) */}
      <path
        d="M100 25 L120 33 L120 48 C120 58 112 65 100 70 C88 65 80 58 80 48 L80 33 Z"
        fill="#0d9488"
        fillOpacity="0.15"
        stroke="#0d9488"
        strokeWidth="2"
      />
      <path d="M93 47 L98 52 L108 42" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Arrow 2 */}
      <path d="M125 40 L145 40" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M143 36 L149 40 L143 44" fill="#0d9488" />

      {/* Database icon */}
      <ellipse cx="170" cy="32" rx="15" ry="6" fill="#e2e8f0" stroke="#0d9488" strokeWidth="2" />
      <path d="M155 32 L155 52 C155 56 161 60 170 60 C179 60 185 56 185 52 L185 32" stroke="#0d9488" strokeWidth="2" fill="#e2e8f0" />
      <path d="M155 42 C155 46 161 50 170 50 C179 50 185 46 185 42" stroke="#0d9488" strokeWidth="2" fill="none" />

      {/* Labels */}
      <text x="30" y="75" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="system-ui">You</text>
      <text x="100" y="85" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="system-ui">Protected</text>
      <text x="170" y="75" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="system-ui">Secure Storage</text>
    </svg>
  );
}

// Animated section wrapper component
function AnimatedSection({
  children,
  id,
  className = ''
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : (prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 })}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Collapsible section component
function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  sectionNumber,
  illustration,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  sectionNumber: number;
  illustration?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-slate-200/60 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1">
          <span className="font-display text-sm text-primary-600/60 tracking-wide">
            {String(sectionNumber).padStart(2, '0')}
          </span>
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          >
            <Icon className="w-5 h-5 text-primary-600" />
          </motion.div>
          <h2 className="text-xl font-display font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
            {title}
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-100 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-primary-600" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-[4.5rem]">
              {illustration && (
                <div className="mb-6 flex justify-center">
                  {illustration}
                </div>
              )}
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Floating Table of Contents
function TableOfContents({ activeSection }: { activeSection: string }) {
  const prefersReducedMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="sticky top-32 w-64"
      aria-label="Table of contents"
    >
      <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-soft">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/60">
          <BookOpen className="w-4 h-4 text-primary-600" aria-hidden="true" />
          <span className="font-display text-sm font-semibold text-slate-900">Contents</span>
        </div>
        <ul className="space-y-1" role="list">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 group ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                aria-current={activeSection === section.id ? 'true' : undefined}
              >
                <span className={`text-xs font-mono ${
                  activeSection === section.id ? 'text-primary-500' : 'text-slate-400'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="truncate">{section.title}</span>
                <ChevronRight className={`w-3 h-3 ml-auto opacity-0 transition-all duration-200 ${
                  activeSection === section.id ? 'opacity-100 text-primary-500' : 'group-hover:opacity-50'
                }`} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}

// Reading Progress Bar
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 origin-left z-50"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

// Scroll to top button
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center z-40"
          aria-label="Scroll to top"
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Decorative background element
function DecorativeBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Gradient orbs */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-100/40 to-primary-200/20 blur-3xl"
      />
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-secondary-100/30 to-secondary-200/10 blur-3xl"
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(to right, #0d9488 1px, transparent 1px),
                            linear-gradient(to bottom, #0d9488 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
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
  variant?: 'default' | 'highlight' | 'warning';
}) {
  const prefersReducedMotion = useReducedMotion();
  const variants = {
    default: 'bg-slate-50/80 border-slate-100 hover:border-primary-200',
    highlight: 'bg-gradient-to-r from-primary-50 to-primary-100/50 border-primary-200/60',
    warning: 'bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-200/60',
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      className={`p-5 rounded-xl border transition-all ${variants[variant]}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          variant === 'warning' ? 'bg-amber-100' : 'bg-white shadow-sm'
        }`}>
          <Icon className={`w-5 h-5 ${variant === 'warning' ? 'text-amber-600' : 'text-primary-600'}`} />
        </div>
        <div>
          <h3 className={`font-semibold mb-1 ${variant === 'warning' ? 'text-amber-900' : 'text-slate-900'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${variant === 'warning' ? 'text-amber-800' : 'text-slate-600'}`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PrivacyPolicyDesktop() {
  const [activeSection, setActiveSection] = useState('commitment');
  const mainRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ReadingProgress />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-28 pb-20 overflow-hidden">
        <DecorativeBackground />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <motion.nav
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm mb-12"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-slate-500 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300" aria-hidden="true" />
            <span className="text-slate-900 font-medium" aria-current="page">Privacy Policy</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              {/* Badge */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-primary-100/50 border border-primary-200/50 text-primary-700 text-sm font-medium mb-8"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Your Privacy Matters</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-[1.1]"
              >
                Privacy{' '}
                <span className="relative inline-block">
                  Policy
                  <motion.span
                    initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-2 left-0 right-0 h-3 bg-primary-200/50 -z-10 origin-left"
                    aria-hidden="true"
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl text-slate-600 leading-relaxed mb-6"
              >
                At Ottawa South Dental, we are committed to protecting your personal information
                and maintaining the trust you place in us. This policy explains how we collect,
                use, and safeguard your data.
              </motion.p>

              {/* Last updated */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4 text-sm text-slate-500"
              >
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-500" aria-hidden="true" />
                  Last updated: {lastUpdated}
                </span>
                <span className="text-slate-300" aria-hidden="true">|</span>
                <span>~8 min read</span>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-secondary-100/30 rounded-3xl transform rotate-3" aria-hidden="true" />

                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/privacy-policy/hero-document.jpg"
                    alt="Professional document signing representing secure data handling and privacy protection"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" aria-hidden="true" />
                </div>

                {/* Floating shield illustration */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-2xl shadow-xl p-4"
                >
                  <PrivacyShieldIllustration className="w-full h-full" />
                </motion.div>

                {/* Stats badge */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <LockKeyhole className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">PIPEDA</p>
                      <p className="font-semibold text-slate-900">Compliant</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gradient-to-b from-white to-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: ShieldCheck, label: 'PIPEDA Compliant', sublabel: 'Federal Privacy Law' },
              { icon: LockKeyhole, label: 'SSL Encrypted', sublabel: 'Secure Connection' },
              { icon: Database, label: 'Secure Storage', sublabel: 'Protected Records' },
              { icon: Fingerprint, label: 'Access Controls', sublabel: 'Authorized Only' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-3 group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05, rotate: 5 }}
                >
                  <item.icon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </motion.div>
                <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                <p className="text-xs text-slate-500">{item.sublabel}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-20 bg-white" ref={mainRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-16">
            {/* Main content area */}
            <div className="flex-1 max-w-3xl">
              {/* Section 1: Commitment */}
              <AnimatedSection id="commitment" className="mb-16">
                <div className="p-8 bg-gradient-to-br from-primary-50/80 to-primary-100/40 rounded-2xl border border-primary-100">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <PrivacyShieldIllustration className="w-16 h-16" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">
                        Our Commitment to Privacy
                      </h2>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        We comply with the Personal Information Protection and Electronic Documents
                        Act (PIPEDA) and applicable provincial privacy legislation. Your personal
                        health information is treated with the utmost confidentiality.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['PIPEDA Compliant', 'Provincial Laws', 'Health Privacy'].map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 text-primary-700 text-xs font-medium">
                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Data Flow Visualization */}
              <AnimatedSection id="data-flow-visual" className="mb-12">
                <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-100">
                  <h3 className="text-center text-sm font-medium text-slate-500 mb-4">How We Protect Your Information</h3>
                  <DataFlowIllustration className="w-full max-w-md mx-auto h-auto" />
                </div>
              </AnimatedSection>

              {/* Collapsible Sections */}
              <AnimatedSection id="information-collected" className="mb-4">
                <CollapsibleSection
                  title="Information We Collect"
                  icon={FileUser}
                  sectionNumber={1}
                  defaultOpen={true}
                >
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We collect personal information necessary to provide you with quality dental care:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-5 bg-slate-50/80 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Personal Identification</h3>
                      </div>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Name, address, phone number, email</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Date of birth and gender</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Health card and insurance information</span>
                        </li>
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="p-5 bg-slate-50/80 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Health Information</h3>
                      </div>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Medical and dental history</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>X-rays and diagnostic images</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Treatment records and notes</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="how-we-use" className="mb-4">
                <CollapsibleSection
                  title="How We Use Your Information"
                  icon={Eye}
                  sectionNumber={2}
                >
                  <div className="space-y-4">
                    {[
                      {
                        icon: Shield,
                        title: 'Providing Dental Care',
                        description: 'To diagnose, treat, and manage your dental health, including communicating with other healthcare providers when necessary.',
                      },
                      {
                        icon: FileText,
                        title: 'Administrative Purposes',
                        description: 'To schedule appointments, process insurance claims, manage billing, and maintain your patient records.',
                      },
                      {
                        icon: Mail,
                        title: 'Communication',
                        description: 'To send appointment reminders, treatment follow-ups, and important practice updates.',
                      },
                      {
                        icon: CheckCircle2,
                        title: 'Quality Improvement',
                        description: 'To improve our services, maintain standards of care, and meet regulatory requirements.',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={prefersReducedMotion ? {} : { x: 4 }}
                        className="flex items-start gap-4 p-5 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0 group-hover:from-primary-200 group-hover:to-primary-100 transition-all">
                          <item.icon className="w-5 h-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="information-sharing" className="mb-4">
                <CollapsibleSection
                  title="Information Sharing & Disclosure"
                  icon={Users}
                  sectionNumber={3}
                >
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We do not sell, trade, or rent your personal information. We may share your
                    information only in the following circumstances:
                  </p>
                  <div className="space-y-3">
                    {[
                      { text: 'With your explicit consent', icon: UserCheck },
                      { text: 'With other healthcare providers involved in your care', icon: Users },
                      { text: 'With insurance companies to process your claims', icon: FileText },
                      { text: 'With dental laboratories for treatment purposes', icon: Server },
                      { text: 'When required by law or regulatory bodies', icon: Scale },
                      { text: 'In emergencies where your health or safety is at risk', icon: AlertCircle },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-slate-600 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="data-security" className="mb-4">
                <CollapsibleSection
                  title="Data Security"
                  icon={LockKeyhole}
                  sectionNumber={4}
                >
                  <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl">
                    <p className="text-slate-600 mb-5 leading-relaxed">
                      We implement appropriate security measures to protect your personal information:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: Database, text: 'Secure electronic record systems with access controls' },
                        { icon: Lock, text: 'Physical security measures for paper records' },
                        { icon: Users, text: 'Staff training on privacy and confidentiality' },
                        { icon: ShieldCheck, text: 'Regular security assessments and updates' },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200/60 hover:shadow-sm transition-shadow"
                        >
                          <item.icon className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm text-slate-600">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="your-rights" className="mb-4">
                <CollapsibleSection
                  title="Your Rights"
                  icon={Scale}
                  sectionNumber={5}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: Eye,
                        title: 'Access',
                        description: 'You have the right to request access to your personal information held by our practice.',
                      },
                      {
                        icon: FileText,
                        title: 'Correction',
                        description: 'You may request corrections to any inaccurate or incomplete personal information.',
                      },
                      {
                        icon: EyeOff,
                        title: 'Withdrawal of Consent',
                        description: 'You may withdraw consent for certain uses of your information, subject to legal requirements.',
                      },
                      {
                        icon: AlertCircle,
                        title: 'Complaints',
                        description: 'You have the right to file a complaint with the Privacy Commissioner of Canada.',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={prefersReducedMotion ? {} : { y: -2 }}
                        className="p-5 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-primary-600" aria-hidden="true" />
                          </div>
                          <h3 className="font-semibold text-slate-900">{item.title}</h3>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="website-privacy" className="mb-4">
                <CollapsibleSection
                  title="Website & Online Privacy"
                  icon={Globe}
                  sectionNumber={6}
                >
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    When you use our website or contact forms:
                  </p>
                  <ul className="space-y-3 text-slate-600 mb-6">
                    {[
                      'We collect only the information you voluntarily provide (e.g., contact form submissions)',
                      'We may use cookies to improve website functionality and user experience',
                      'We use SSL encryption to protect data transmitted through our website',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" aria-hidden="true" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <InfoCard
                    icon={AlertCircle}
                    title="Important Notice"
                    description="Do not send sensitive health information through our website contact form or email. Please discuss health matters in person or by phone."
                    variant="warning"
                  />
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="cookies" className="mb-4">
                <CollapsibleSection
                  title="Cookies & Tracking Technologies"
                  icon={Cookie}
                  sectionNumber={7}
                >
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    Our website uses cookies and tracking technologies to enhance your browsing experience:
                  </p>
                  <div className="space-y-4">
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="p-5 bg-slate-50/80 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                          <Database className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-slate-900">What We Collect</h3>
                      </div>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Browser type and version</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Pages visited and time spent on site</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Referring website information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>Device and access times</span>
                        </li>
                      </ul>
                    </motion.div>

                    <InfoCard
                      icon={AlertCircle}
                      title="Cookie Control"
                      description="You can configure your browser to refuse cookies. However, this may affect some website functionality. This tracking data is not linked to your personal information unless required for policy enforcement or legal compliance."
                      variant="warning"
                    />
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="third-party" className="mb-4">
                <CollapsibleSection
                  title="Third-Party Services"
                  icon={Server}
                  sectionNumber={8}
                >
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    Our website may contain links to third-party products, services, or websites.
                    These third parties maintain their own separate and independent privacy policies.
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: Globe, text: 'We assume no responsibility for the privacy practices of third-party sites' },
                      { icon: Eye, text: 'We encourage you to review their privacy policies before providing information' },
                      { icon: ShieldCheck, text: 'Trusted service providers who assist our operations are bound by confidentiality agreements' },
                      { icon: Mail, text: 'We welcome feedback about any third-party services linked from our site' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-slate-600 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="retention" className="mb-4">
                <CollapsibleSection
                  title="Record Retention"
                  icon={Clock}
                  sectionNumber={9}
                >
                  <div className="p-6 bg-gradient-to-br from-primary-50/50 to-primary-100/30 rounded-xl border border-primary-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          We retain your dental records in accordance with the Royal College of Dental
                          Surgeons of Ontario guidelines and applicable laws.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-white/80 rounded-lg">
                            <p className="text-2xl font-bold text-primary-600 mb-1">10+</p>
                            <p className="text-sm text-slate-600">Years for adult patient records after last visit</p>
                          </div>
                          <div className="p-4 bg-white/80 rounded-lg">
                            <p className="text-2xl font-bold text-primary-600 mb-1">10+</p>
                            <p className="text-sm text-slate-600">Years after minor patients turn 18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="consent" className="mb-4">
                <CollapsibleSection
                  title="Your Consent & Policy Changes"
                  icon={UserCheck}
                  sectionNumber={10}
                >
                  <div className="space-y-6">
                    <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Your Consent</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        By using our website and services, you consent to this privacy policy. Your continued
                        use of our services following any changes to this policy constitutes acceptance of
                        those changes.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Children&apos;s Privacy</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        We comply with the Children&apos;s Online Privacy Protection Act (COPPA) and do not
                        knowingly collect personal information from individuals under 13 years of age
                        through our website. Our dental services for children are provided with parental
                        or guardian consent.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Policy Updates</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        We may update this privacy policy from time to time. Any modifications will be
                        posted on this page with an updated &quot;last modified&quot; date. We encourage you to
                        review this policy periodically to stay informed about how we protect your
                        information.
                      </p>
                    </div>

                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-5 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <p className="text-sm text-slate-600">
                          <span className="font-medium text-slate-900">Online Policy Scope:</span> This
                          privacy policy applies exclusively to information collected through our website
                          and does not cover information collected offline at our dental practice.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              {/* Contact Section */}
              <AnimatedSection id="contact" className="mt-12">
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative p-10 bg-gradient-to-br from-primary-50 via-primary-100/50 to-secondary-50/30 rounded-3xl overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-transparent rounded-full blur-3xl" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary-200/20 to-transparent rounded-full blur-2xl" aria-hidden="true" />

                  {/* Document illustration */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <DocumentSecurityIllustration className="w-24 h-24" />
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/80 shadow-sm flex items-center justify-center">
                        <KeyRound className="w-6 h-6 text-primary-600" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-display font-semibold text-slate-900">
                        Questions About Your Privacy?
                      </h2>
                    </div>
                    <p className="text-slate-600 mb-8 max-w-lg">
                      If you have questions about this policy or wish to exercise your privacy rights,
                      please contact our Privacy Officer:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <motion.a
                        href={`mailto:${contactInfo.email}`}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Email</p>
                          <p className="text-primary-600 font-medium">
                            {contactInfo.email}
                          </p>
                        </div>
                      </motion.a>

                      <motion.a
                        href={`tel:+1${contactInfo.phone}`}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Phone</p>
                          <p className="text-primary-600 font-medium">
                            ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
                          </p>
                        </div>
                      </motion.a>
                    </div>

                    <div className="pt-6 border-t border-primary-200/50">
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-900">Ottawa South Dental</span><br />
                        {contactInfo.address.street}<br />
                        {contactInfo.address.city}, {contactInfo.address.province} {contactInfo.address.postalCode}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* Back to Contact */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
                >
                  <span>Back to Contact Page</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

            {/* Table of Contents Sidebar - Desktop only */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents activeSection={activeSection} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
