'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  Check,
  Shield,
  Phone,
  Calendar,
  FileText,
  Users,
  Heart,
  ClipboardCheck,
  HelpCircle,
  Stethoscope,
  BadgeCheck,
  MapPin,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles,
  Clock,
  FileCheck,
  Leaf,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  HandHeart,
  HeartPulse,
  Building2,
  CircleDollarSign,
  UsersRound,
  BadgeDollarSign,
  Wallet,
  GraduationCap,
  Baby,
  UserRound,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is the Canadian Dental Care Plan (CDCP)?',
    answer:
      "The Canadian Dental Care Plan is a federal government program designed to help Canadians who don't have access to dental insurance. The program provides coverage for various dental services to make oral health care more accessible and affordable for eligible Canadians.",
  },
  {
    question: 'Am I eligible for CDCP?',
    answer:
      "To be eligible for CDCP, you generally must be a Canadian resident, have an adjusted family net income below the program threshold, and not have access to private dental insurance. Specific income thresholds and eligibility requirements are set by the federal government and may change. Visit the official CDCP website or contact our office for the most current information.",
  },
  {
    question: 'How do I apply for CDCP?',
    answer:
      "You can apply for the Canadian Dental Care Plan through the federal government's official channels. Once approved, you'll receive documentation confirming your coverage. Bring this documentation to your dental appointment at Ottawa South Dental, and we'll take care of the billing directly.",
  },
  {
    question: 'What services does CDCP cover?',
    answer:
      'CDCP covers a range of dental services including preventive care (cleanings, checkups), diagnostic services (X-rays, exams), restorative treatments (fillings), endodontic services (root canals), periodontal services (gum treatments), prosthodontic services (dentures), and oral surgery. Coverage may vary, and some services may have limitations.',
  },
  {
    question: 'Do I pay anything out of pocket with CDCP?',
    answer:
      'Depending on your income level and the specific services you receive, you may have some out-of-pocket costs. Some services may not be fully covered under the plan. Our team will explain any potential costs before proceeding with treatment so there are no surprises.',
  },
  {
    question: 'Does Ottawa South Dental accept CDCP?',
    answer:
      'Yes! Ottawa South Dental is proud to be a registered CDCP provider. We accept CDCP and will bill the program directly for covered services. Simply bring your CDCP documentation to your appointment, and our team will handle the rest.',
  },
  {
    question: 'What do I need to bring to my appointment?',
    answer:
      "Please bring your CDCP member card or letter of eligibility, a valid government-issued photo ID, and any other dental records if you're a new patient. Having your documentation ready helps us verify your coverage and process your visit smoothly.",
  },
  {
    question: 'Can I use CDCP if I have other dental insurance?',
    answer:
      "Generally, CDCP is designed for Canadians who don't have access to dental insurance through an employer, pension, or other sources. If you have questions about your specific situation, contact the CDCP program directly or speak with our team for guidance.",
  },
];

const coveredServices = [
  {
    icon: ClipboardCheck,
    title: 'Preventive Care',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    services: ['Regular checkups', 'Professional cleanings', 'Fluoride treatments'],
  },
  {
    icon: Stethoscope,
    title: 'Diagnostic Services',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10',
    services: ['Dental examinations', 'X-rays', 'Oral health assessments'],
  },
  {
    icon: Heart,
    title: 'Restorative Treatments',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-500/10',
    services: ['Fillings', 'Crown repairs', 'Basic restorations'],
  },
  {
    icon: Shield,
    title: 'Periodontal Services',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    services: ['Gum disease treatment', 'Deep cleanings', 'Periodontal maintenance'],
  },
  {
    icon: FileText,
    title: 'Endodontic Services',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-500/10',
    services: ['Root canal therapy', 'Pulp treatments', 'Endodontic retreatment'],
  },
  {
    icon: Users,
    title: 'Prosthodontics & Surgery',
    color: 'from-cyan-500 to-sky-600',
    bgColor: 'bg-cyan-500/10',
    services: ['Dentures', 'Tooth extractions', 'Oral surgery procedures'],
  },
];

const howToUseSteps = [
  {
    step: 1,
    title: 'Apply for CDCP',
    description:
      'Apply for the Canadian Dental Care Plan through the federal government. You can apply online or by phone through official government channels.',
    icon: FileCheck,
  },
  {
    step: 2,
    title: 'Receive Your Approval',
    description:
      "Once approved, you'll receive documentation confirming your CDCP coverage. Keep this safe as you'll need it for your dental visits.",
    icon: BadgeCheck,
  },
  {
    step: 3,
    title: 'Book Your Appointment',
    description:
      "Call Ottawa South Dental at (613) 733-6446 or book online. Let us know you're a CDCP member when scheduling.",
    icon: Calendar,
  },
  {
    step: 4,
    title: 'Bring Your Documents',
    description:
      'Bring your CDCP documentation and photo ID to your appointment. Our team will verify your coverage.',
    icon: FileText,
  },
  {
    step: 5,
    title: 'Receive Your Care',
    description:
      "We'll provide your dental care and bill CDCP directly for covered services. You'll only pay for any uncovered portions.",
    icon: Heart,
  },
];

const eligibilityQuestions = [
  {
    id: 'resident',
    question: 'Are you a Canadian resident?',
    description: 'You must be a resident of Canada to qualify.',
  },
  {
    id: 'insurance',
    question: 'Do you currently have dental insurance?',
    description: 'Through an employer, pension, or private coverage.',
    inverted: true,
  },
  {
    id: 'income',
    question: 'Is your family income under $90,000?',
    description: 'Adjusted family net income threshold for eligibility.',
  },
  {
    id: 'taxReturn',
    question: 'Did you file a tax return last year?',
    description: 'Income is verified through CRA tax information.',
  },
];

const documentChecklist = [
  { item: 'CDCP Member Card or Letter of Eligibility', required: true },
  { item: 'Valid Government-Issued Photo ID', required: true },
  { item: 'Previous Dental Records (if available)', required: false },
  { item: 'List of Current Medications', required: false },
];

const importantDates = [
  { date: 'May 2024', event: 'Applications opened for seniors 70+' },
  { date: 'June 2024', event: 'Applications expanded to seniors 65+' },
  { date: 'June 2024', event: 'Coverage began for approved members' },
  { date: '2025', event: 'Full rollout to all eligible Canadians' },
];

const coverageTiers = [
  {
    income: 'Under $70,000',
    coverage: '100%',
    copay: '$0',
    icon: CircleDollarSign,
    highlight: true,
  },
  {
    income: '$70,000 - $79,999',
    coverage: '60%',
    copay: '40%',
    icon: Wallet,
    highlight: false,
  },
  {
    income: '$80,000 - $89,999',
    coverage: '40%',
    copay: '60%',
    icon: BadgeDollarSign,
    highlight: false,
  },
];

const eligibleGroups = [
  { icon: UserRound, label: 'Seniors 65+', description: 'Full access since 2024' },
  { icon: UsersRound, label: 'Adults 18-64', description: 'With disability tax credit' },
  { icon: Baby, label: 'Children under 18', description: 'Based on family income' },
  { icon: GraduationCap, label: 'Students', description: 'Without other coverage' },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ============================================================================
// MAGNETIC HOOK
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
// FLOATING PARTICLES
// ============================================================================

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Canada maple leaf patterns */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          <Leaf className="w-6 h-6 text-[#722F37]/20" />
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(114,47,55,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ============================================================================
// CANADA FLAG SVG ILLUSTRATION
// ============================================================================

function CanadaFlagIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Flag background */}
      <rect x="0" y="10" width="50" height="100" fill="#FF0000" opacity="0.9" />
      <rect x="50" y="10" width="100" height="100" fill="#FFFFFF" />
      <rect x="150" y="10" width="50" height="100" fill="#FF0000" opacity="0.9" />

      {/* Simplified maple leaf */}
      <path
        d="M100 25 L103 40 L115 35 L108 50 L120 55 L105 60 L110 75 L100 65 L90 75 L95 60 L80 55 L92 50 L85 35 L97 40 Z"
        fill="#FF0000"
      />

      {/* Decorative shield behind */}
      <ellipse cx="100" cy="60" rx="35" ry="40" fill="none" stroke="#722F37" strokeWidth="2" opacity="0.2" />
    </svg>
  );
}

// ============================================================================
// COVERAGE TIERS ILLUSTRATION
// ============================================================================

function CoverageTiersIllustration() {
  return (
    <svg
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-md mx-auto"
      aria-hidden="true"
    >
      {/* Background circles */}
      <circle cx="150" cy="100" r="90" fill="#722F37" opacity="0.05" />
      <circle cx="150" cy="100" r="70" fill="#722F37" opacity="0.08" />
      <circle cx="150" cy="100" r="50" fill="#722F37" opacity="0.1" />

      {/* Dollar sign center */}
      <text x="150" y="115" textAnchor="middle" fontSize="40" fill="#722F37" fontWeight="bold">$</text>

      {/* Coverage indicators */}
      <g transform="translate(50, 160)">
        <rect x="0" y="0" width="60" height="8" rx="4" fill="#22c55e" />
        <text x="30" y="25" textAnchor="middle" fontSize="10" fill="#666">100%</text>
      </g>
      <g transform="translate(120, 160)">
        <rect x="0" y="0" width="60" height="8" rx="4" fill="#f59e0b" />
        <text x="30" y="25" textAnchor="middle" fontSize="10" fill="#666">60%</text>
      </g>
      <g transform="translate(190, 160)">
        <rect x="0" y="0" width="60" height="8" rx="4" fill="#ef4444" />
        <text x="30" y="25" textAnchor="middle" fontSize="10" fill="#666">40%</text>
      </g>
    </svg>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]"
        style={{ y: backgroundY }}
      />

      {/* Hero image overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/patient-info/cdcp/hero-dental-care.jpg"
          alt="Patient receiving dental care with a warm smile in a modern dental clinic"
          fill
          className="object-cover opacity-10"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F3] via-[#FDF8F3]/95 to-transparent" />
      </div>

      {/* Canada flag-inspired accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#722F37] via-[#FF0000] to-[#722F37]" />

      <FloatingParticles />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #722F37 1px, transparent 1px),
            linear-gradient(180deg, #722F37 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Breadcrumb */}
            <motion.nav variants={fadeInUp} className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-neutral-500 hover:text-[#722F37] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4 text-neutral-400" aria-hidden="true" />
                <li>
                  <Link
                    href="/patient-info"
                    className="text-neutral-500 hover:text-[#722F37] transition-colors"
                  >
                    Patient Info
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4 text-neutral-400" aria-hidden="true" />
                <li className="text-[#722F37] font-medium">CDCP</li>
              </ol>
            </motion.nav>

            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <motion.div
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-red-500/10 border border-[#722F37]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ShieldCheck className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </motion.div>
                <span className="font-semibold text-[#722F37]">
                  Registered CDCP Provider
                </span>
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 tracking-tight mb-6 leading-[1.1]"
            >
              Canadian{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-red-600">
                  Dental Care
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-[#722F37]/10 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
              </span>{' '}
              Plan
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-600 leading-relaxed mb-10 max-w-lg"
            >
              Ottawa South Dental proudly accepts the CDCP, making quality dental
              care more accessible to eligible Canadians.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="/contact#book" primary>
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Book Appointment
              </MagneticButton>
              <MagneticButton href="tel:+16137336446">
                <Phone className="w-5 h-5" aria-hidden="true" />
                (613) 733-6446
              </MagneticButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center gap-6 lg:gap-8"
            >
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
                <span>Direct Billing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
                <span>No Paperwork</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
                <span>Same-Day Care</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Hero image and card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/patient-info/cdcp/happy-patient.jpg"
                alt="Happy patient smiling after receiving dental care covered by CDCP"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 px-5 py-3 bg-white rounded-2xl shadow-xl border border-neutral-100"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Coverage up to</p>
                  <p className="font-bold text-green-600">100%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 px-5 py-3 bg-white rounded-2xl shadow-xl border border-neutral-100"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#722F37]/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Government</p>
                  <p className="font-bold text-[#722F37]">Federal Program</p>
                </div>
              </div>
            </motion.div>

            {/* Canada flag illustration */}
            <motion.div
              className="absolute top-1/2 -right-8 -translate-y-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.3, x: 0 }}
              transition={{ delay: 1 }}
            >
              <CanadaFlagIllustration className="w-24 h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-neutral-400"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MAGNETIC BUTTON
// ============================================================================

function MagneticButton({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const magnetic = useMagnetic(0.2);
  const [isHovered, setIsHovered] = useState(false);

  const isExternal = href.startsWith('tel:') || href.startsWith('http');
  const Component = isExternal ? 'a' : Link;

  return (
    <motion.div
      style={{ x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={() => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      <Component
        href={href}
        className={`
          relative inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-base
          overflow-hidden transition-all duration-300
          ${
            primary
              ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white shadow-lg shadow-[#722F37]/25'
              : 'bg-white text-[#722F37] border-2 border-[#722F37]/20 hover:border-[#722F37]/40'
          }
        `}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '200%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <span className="relative flex items-center gap-3">
          {children}
        </span>
      </Component>
    </motion.div>
  );
}

// ============================================================================
// WHO QUALIFIES SECTION (NEW)
// ============================================================================

function WhoQualifiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FDF8F3] to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image and stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/images/patient-info/cdcp/senior-dental.jpg"
                alt="Elderly man at dental appointment, representing seniors eligible for CDCP coverage"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/30 to-transparent" />
            </div>

            {/* Stats overlay */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-neutral-100"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#722F37]/10 flex items-center justify-center">
                  <UsersRound className="w-7 h-7 text-[#722F37]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#722F37]">9M+</p>
                  <p className="text-sm text-neutral-500">Canadians Eligible</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6"
            >
              <HandHeart className="w-4 h-4" aria-hidden="true" />
              Eligibility Groups
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
            >
              Who Qualifies for CDCP?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-600 mb-10"
            >
              The Canadian Dental Care Plan is designed to help those who need it most.
              Check if you or your family members qualify.
            </motion.p>

            {/* Eligible groups grid */}
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
              {eligibleGroups.map((group, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group p-5 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-[#722F37]/20 hover:bg-[#FDF8F3] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#722F37]/10 transition-colors">
                      <group.icon className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{group.label}</h3>
                      <p className="text-sm text-neutral-500">{group.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COVERAGE TIERS SECTION (NEW)
// ============================================================================

function CoverageTiersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden"
    >
      {/* Background illustration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" aria-hidden="true">
        <CoverageTiersIllustration />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6"
          >
            <CircleDollarSign className="w-4 h-4" aria-hidden="true" />
            Income-Based Coverage
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
          >
            Coverage Based on Your Income
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Your coverage level depends on your adjusted family net income.
            Lower income means higher coverage.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {coverageTiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                tier.highlight
                  ? 'bg-[#722F37] border-[#722F37] text-white shadow-xl shadow-[#722F37]/20'
                  : 'bg-white border-neutral-200 hover:border-[#722F37]/30'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                  Full Coverage
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl ${tier.highlight ? 'bg-white/20' : 'bg-[#722F37]/10'} flex items-center justify-center mb-6`}>
                <tier.icon className={`w-7 h-7 ${tier.highlight ? 'text-white' : 'text-[#722F37]'}`} aria-hidden="true" />
              </div>

              <p className={`text-sm font-medium ${tier.highlight ? 'text-white/80' : 'text-neutral-500'} mb-2`}>
                Family Income
              </p>
              <p className={`text-2xl font-bold ${tier.highlight ? 'text-white' : 'text-neutral-900'} mb-6`}>
                {tier.income}
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${tier.highlight ? 'text-white/80' : 'text-neutral-500'}`}>Coverage</span>
                  <span className={`text-2xl font-bold ${tier.highlight ? 'text-white' : 'text-green-600'}`}>{tier.coverage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${tier.highlight ? 'text-white/80' : 'text-neutral-500'}`}>Your Co-pay</span>
                  <span className={`font-semibold ${tier.highlight ? 'text-white' : 'text-neutral-700'}`}>{tier.copay}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-neutral-500 text-sm mt-8 max-w-2xl mx-auto"
        >
          * Income thresholds are based on adjusted family net income as reported on your tax return.
          Verify your specific coverage on the official CDCP website.
        </motion.p>
      </div>
    </section>
  );
}

// ============================================================================
// ELIGIBILITY CHECKER
// ============================================================================

function EligibilityChecker() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (currentQuestion < eligibilityQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 500);
    } else {
      setTimeout(() => setShowResult(true), 500);
    }
  };

  const resetChecker = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const isEligible = () => {
    return (
      answers['resident'] === true && // Canadian resident
      answers['insurance'] === false && // No insurance (inverted question)
      answers['income'] === true && // Income under threshold
      answers['taxReturn'] === true // Filed tax return
    );
  };

  const progress = (Object.keys(answers).length / eligibilityQuestions.length) * 100;

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #722F37 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Interactive Tool
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
          >
            Check Your Eligibility
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Answer a few quick questions to see if you may qualify for the Canadian
            Dental Care Plan.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden">
            {/* Progress bar */}
            <div className="h-2 bg-neutral-100">
              <motion.div
                className="h-full bg-gradient-to-r from-[#722F37] to-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>

            <div className="p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Question counter */}
                    <div className="flex items-center gap-3 mb-8" role="group" aria-label="Question progress">
                      {eligibilityQuestions.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                            index === currentQuestion
                              ? 'bg-[#722F37] text-white'
                              : index < currentQuestion
                              ? 'bg-green-500 text-white'
                              : 'bg-neutral-100 text-neutral-400'
                          }`}
                          aria-current={index === currentQuestion ? 'step' : undefined}
                        >
                          {index < currentQuestion ? (
                            <Check className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            index + 1
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                        {eligibilityQuestions[currentQuestion]?.question}
                      </h3>
                      <p className="text-neutral-500">
                        {eligibilityQuestions[currentQuestion]?.description}
                      </p>
                    </div>

                    {/* Answer buttons */}
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const q = eligibilityQuestions[currentQuestion];
                          if (q) handleAnswer(q.id, true);
                        }}
                        className="flex-1 py-4 px-6 rounded-xl font-semibold text-lg bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                        Yes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const q = eligibilityQuestions[currentQuestion];
                          if (q) handleAnswer(q.id, false);
                        }}
                        className="flex-1 py-4 px-6 rounded-xl font-semibold text-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" aria-hidden="true" />
                        No
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                        isEligible() ? 'bg-green-100' : 'bg-amber-100'
                      }`}
                    >
                      {isEligible() ? (
                        <CheckCircle2 className="w-12 h-12 text-green-600" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="w-12 h-12 text-amber-600" aria-hidden="true" />
                      )}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      {isEligible()
                        ? 'You May Be Eligible!'
                        : 'Eligibility Uncertain'}
                    </h3>
                    <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                      {isEligible()
                        ? 'Based on your answers, you may qualify for the Canadian Dental Care Plan. Contact us to learn more!'
                        : 'Based on your answers, you may not meet all eligibility criteria. However, we recommend contacting the CDCP program directly for official verification.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {isEligible() && (
                        <Link
                          href="/contact#book"
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#722F37] text-white rounded-xl font-semibold hover:bg-[#5a252c] transition-colors"
                        >
                          <Calendar className="w-5 h-5" aria-hidden="true" />
                          Book Appointment
                        </Link>
                      )}
                      <button
                        onClick={resetChecker}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-100 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
                      >
                        Start Over
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Disclaimer */}
            <div className="px-8 lg:px-12 pb-8">
              <p className="text-xs text-neutral-400 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                This is a preliminary eligibility check only. Actual eligibility is
                determined by the federal government. Visit the official CDCP website
                for accurate information.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// COVERAGE BREAKDOWN VISUALIZATION
// ============================================================================

function CoverageBreakdown() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-neutral-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6"
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            Comprehensive Coverage
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
          >
            Services Covered by CDCP
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            The Canadian Dental Care Plan covers a comprehensive range of dental
            services to keep your smile healthy.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coveredServices.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative"
            >
              <motion.div
                className="relative h-full p-8 rounded-2xl bg-white border border-neutral-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  aria-hidden="true"
                />

                {/* Icon */}
                <motion.div
                  className={`relative w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6`}
                  animate={{
                    rotate: activeService === index ? [0, 5, -5, 0] : 0,
                    scale: activeService === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <service.icon
                    className={`w-8 h-8 ${
                      index === 0
                        ? 'text-emerald-600'
                        : index === 1
                        ? 'text-blue-600'
                        : index === 2
                        ? 'text-rose-600'
                        : index === 3
                        ? 'text-amber-600'
                        : index === 4
                        ? 'text-purple-600'
                        : 'text-cyan-600'
                    }`}
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-[#722F37] transition-colors">
                  {service.title}
                </h3>

                {/* Services list */}
                <ul className="space-y-3">
                  {service.services.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                      className="flex items-center gap-3 text-neutral-600"
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Check className="w-3 h-3 text-white" aria-hidden="true" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative corner */}
                <div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${service.color} opacity-5`}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coverage note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#722F37]/5 to-transparent border border-[#722F37]/10">
            <p className="text-center text-neutral-600">
              <span className="font-semibold text-neutral-900">
                Coverage may vary.
              </span>{' '}
              Some services may have limitations or require co-payments depending on
              your income level. Our team can help explain your specific coverage.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// ENROLLMENT STEPS
// ============================================================================

function EnrollmentSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[#722F37]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[#FF6B6B] text-sm font-medium mb-6 border border-white/10"
          >
            <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
            Step-by-Step Guide
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            How to Use CDCP at Our Practice
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-neutral-400 max-w-2xl mx-auto"
          >
            Using your CDCP benefits at Ottawa South Dental is simple. Follow these
            easy steps.
          </motion.p>
        </motion.div>

        {/* Steps timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#722F37] via-[#722F37]/50 to-transparent hidden lg:block" aria-hidden="true" />

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-8"
          >
            {howToUseSteps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className="relative"
              >
                <div className="flex gap-8 items-start">
                  {/* Step number */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    animate={{
                      scale: hoveredStep === index ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl transition-all duration-300 ${
                        hoveredStep === index
                          ? 'bg-[#722F37] text-white shadow-lg shadow-[#722F37]/30'
                          : 'bg-white/5 text-white border border-white/10'
                      }`}
                    >
                      {step.step}
                    </div>
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    className="flex-1 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    animate={{
                      x: hoveredStep === index ? 8 : 0,
                      borderColor:
                        hoveredStep === index
                          ? 'rgba(114, 47, 55, 0.3)'
                          : 'rgba(255, 255, 255, 0.1)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl transition-colors duration-300 ${
                          hoveredStep === index
                            ? 'bg-[#722F37]/20'
                            : 'bg-white/5'
                        }`}
                      >
                        <step.icon
                          className={`w-6 h-6 transition-colors duration-300 ${
                            hoveredStep === index
                              ? 'text-[#FF6B6B]'
                              : 'text-white/60'
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// DOCUMENT CHECKLIST
// ============================================================================

function DocumentChecklist() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              Be Prepared
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
            >
              What to Bring to Your Appointment
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-600 mb-8"
            >
              Having these documents ready helps us verify your coverage and process
              your visit smoothly.
            </motion.p>

            {/* Interactive checklist */}
            <motion.div variants={staggerContainer} className="space-y-4" role="group" aria-label="Document checklist">
              {documentChecklist.map((doc, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItem(index);
                    }
                  }}
                  role="checkbox"
                  aria-checked={checkedItems.has(index)}
                  tabIndex={0}
                  className={`group flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    checkedItems.has(index)
                      ? 'bg-green-50 border-green-200'
                      : 'bg-neutral-50 border-neutral-200 hover:border-[#722F37]/30'
                  }`}
                >
                  <motion.div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      checkedItems.has(index)
                        ? 'bg-green-500'
                        : 'bg-white border-2 border-neutral-300 group-hover:border-[#722F37]'
                    }`}
                    animate={{
                      scale: checkedItems.has(index) ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {checkedItems.has(index) && (
                      <Check className="w-4 h-4 text-white" aria-hidden="true" />
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        checkedItems.has(index)
                          ? 'text-green-700'
                          : 'text-neutral-700'
                      }`}
                    >
                      {doc.item}
                    </span>
                  </div>
                  {doc.required ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#722F37]/10 text-[#722F37]">
                      Required
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-200 text-neutral-500">
                      Optional
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Progress indicator */}
            <motion.div variants={fadeInUp} className="mt-6">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(checkedItems.size / documentChecklist.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                    role="progressbar"
                    aria-valuenow={(checkedItems.size / documentChecklist.length) * 100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <span className="text-sm font-medium text-neutral-600">
                  {checkedItems.size}/{documentChecklist.length} ready
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5] rounded-3xl p-8 lg:p-10">
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
                Important CDCP Dates
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-[#722F37]/20" aria-hidden="true" />

                <div className="space-y-6">
                  {importantDates.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="relative flex gap-4 pl-8"
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-0 w-6 h-6 rounded-full bg-white border-2 border-[#722F37] flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#722F37]" />
                      </motion.div>

                      <div>
                        <span className="text-sm font-semibold text-[#722F37]">
                          {item.date}
                        </span>
                        <p className="text-neutral-600 mt-1">{item.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Official link */}
              <motion.a
                href="https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
                whileHover={{ x: 4 }}
              >
                Visit Official CDCP Website
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>
        </div>
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#FDF8F3] to-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6"
          >
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            Common Questions
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-neutral-600"
          >
            Find answers to common questions about the Canadian Dental Care Plan.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <motion.div
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'border-[#722F37]/20 bg-white shadow-lg shadow-neutral-100/50'
                    : 'border-neutral-200 bg-white/50 hover:border-[#722F37]/10'
                }`}
                layout
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2 rounded-2xl"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                  </motion.div>
                </button>

                <AnimatePresence mode="wait">
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-5 text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-600 mb-4">
            Still have questions? We&apos;re happy to help.
          </p>
          <a
            href="tel:+16137336446"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Call us at (613) 733-6446
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#5a252c]"
    >
      {/* Parallax background elements */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }} aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5" />

        {/* Floating maple leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <Leaf className="w-8 h-8 text-white/10" />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8"
          >
            <HeartPulse className="w-10 h-10 text-white" aria-hidden="true" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6"
          >
            Ready to Use Your CDCP Benefits?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Ottawa South Dental is here to help you make the most of your Canadian
            Dental Care Plan coverage. Book your appointment today.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact#book"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#722F37] rounded-xl font-semibold text-lg hover:bg-neutral-100 transition-colors shadow-lg"
            >
              <Calendar className="w-6 h-6" aria-hidden="true" />
              Book Your Appointment
            </Link>
            <a
              href="tel:+16137336446"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <Phone className="w-6 h-6" aria-hidden="true" />
              (613) 733-6446
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              <span>1929 Russell Road, Suite 22, Ottawa</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5" aria-hidden="true" />
              <span>Registered CDCP Provider</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 100V50C240 83 480 100 720 100C960 100 1200 83 1440 50V100H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export function CDCPContent() {
  return (
    <main id="main-content" className="min-h-screen">
      <HeroSection />
      <WhoQualifiesSection />
      <CoverageTiersSection />
      <EligibilityChecker />
      <CoverageBreakdown />
      <EnrollmentSteps />
      <DocumentChecklist />
      <FAQSection />
      <CTASection />
    </main>
  );
}
