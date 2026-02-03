'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Banknote,
  FileCheck,
  Shield,
  CheckCircle2,
  HeartHandshake,
  Phone,
  Building2,
  ClipboardList,
  Wallet,
  BadgeCheck,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Calculator,
  Lock,
  Eye,
  DollarSign,
  Clock,
  Users,
  FileText,
  CircleDollarSign,
  ShieldCheck,
  Receipt,
  Landmark,
  HandCoins,
  Percent,
  BadgeDollarSign,
  FileSearch,
  UserCheck,
  Stethoscope,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-15, 15, -15],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const floatingVariants2 = {
  animate: {
    y: [10, -20, 10],
    x: [-10, 10, -10],
    transition: {
      duration: 16,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const floatingVariants3 = {
  animate: {
    scale: [1, 1.15, 1],
    rotate: [0, -8, 8, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

// ============================================================================
// DATA
// ============================================================================

const paymentMethods = [
  { icon: CreditCard, name: 'Visa', description: 'Credit & Debit', color: '#1A1F71' },
  { icon: CreditCard, name: 'MasterCard', description: 'Credit & Debit', color: '#EB001B' },
  { icon: CreditCard, name: 'American Express', description: 'Credit', color: '#006FCF' },
  { icon: Banknote, name: 'Interac / Debit', description: 'Direct payment', color: '#FFCC00' },
  { icon: Wallet, name: 'Cash', description: 'Accepted', color: '#22C55E' },
];

const directBillingSteps = [
  {
    step: 1,
    title: 'Provide Your Insurance Info',
    description: 'Give us your insurance details at your appointment',
    icon: ClipboardList,
  },
  {
    step: 2,
    title: 'We Verify Coverage',
    description: 'Our team confirms your benefits with your insurance provider',
    icon: FileSearch,
  },
  {
    step: 3,
    title: 'Treatment Is Performed',
    description: 'You receive your dental care',
    icon: HeartHandshake,
  },
  {
    step: 4,
    title: 'We Bill Directly',
    description: 'We submit the claim directly to your insurance company',
    icon: Receipt,
  },
  {
    step: 5,
    title: 'Pay Only Your Portion',
    description: 'You only pay any remaining balance not covered by insurance',
    icon: HandCoins,
  },
];

const directBillingBenefits = [
  {
    title: 'No Upfront Payment',
    description: "You don't have to pay the full amount and wait for reimbursement",
    icon: BadgeDollarSign,
  },
  {
    title: 'Less Paperwork',
    description: 'We handle the claim submission for you',
    icon: FileText,
  },
  {
    title: 'Know Your Costs',
    description: 'We can estimate your out-of-pocket costs before treatment',
    icon: Calculator,
  },
  {
    title: 'Convenient',
    description: 'Makes dental care more accessible',
    icon: Clock,
  },
];

const cdcpServices = [
  { name: 'Preventive care (cleanings, checkups)', icon: ShieldCheck },
  { name: 'Diagnostic services (X-rays, exams)', icon: FileSearch },
  { name: 'Restorative treatments (fillings)', icon: Stethoscope },
  { name: 'Endodontic services (root canals)', icon: HeartHandshake },
  { name: 'Periodontal services (gum treatments)', icon: Shield },
  { name: 'Prosthodontic services (dentures)', icon: UserCheck },
  { name: 'Oral surgery services', icon: Landmark },
];

const cdcpEligibility = [
  { text: 'Be a Canadian resident', icon: Users },
  { text: 'Have an adjusted family net income below the threshold', icon: DollarSign },
  { text: 'Not have access to dental insurance', icon: Shield },
];

const financialPolicyPoints = [
  { text: 'Payment is expected at the time of service', icon: Clock },
  { text: 'For patients with insurance, we will collect any estimated patient portion at the time of service', icon: Percent },
  { text: 'We will provide a detailed treatment plan with cost estimates before proceeding with non-emergency treatment', icon: FileText },
  { text: 'Please inform us of any changes to your insurance coverage', icon: Shield },
];

const faqItems = [
  {
    question: 'Do you accept my insurance?',
    answer:
      "We work with most major insurance providers in Canada. Contact our office with your insurance information, and we'll verify your coverage before your appointment.",
    icon: Shield,
  },
  {
    question: "What if my insurance doesn't cover the full cost?",
    answer:
      'You will be responsible for any portion not covered by your insurance. We can provide an estimate before treatment so you know what to expect and can plan accordingly.',
    icon: Calculator,
  },
  {
    question: 'Can you help me understand my insurance benefits?',
    answer:
      'Yes! Our team can help explain your coverage and estimate your out-of-pocket costs for recommended treatments. We want you to make informed decisions about your dental care.',
    icon: HelpCircle,
  },
  {
    question: "What if I don't have insurance?",
    answer:
      'We welcome patients without insurance. We offer various payment options and can discuss treatment plans that fit your budget. Your oral health is important to us.',
    icon: HandCoins,
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Please contact our office to discuss payment options for larger treatments. We work with patients to make dental care accessible and affordable.',
    icon: Receipt,
  },
  {
    question: 'How does direct billing work?',
    answer:
      'With direct billing, we submit your insurance claim directly to your provider. You only pay any portion not covered by your plan. This eliminates the need for you to pay upfront and wait for reimbursement.',
    icon: FileCheck,
  },
];

const transparencyFeatures = [
  {
    icon: Eye,
    title: 'Upfront Pricing',
    description: 'Know your costs before any treatment begins',
  },
  {
    icon: Lock,
    title: 'No Hidden Fees',
    description: 'What we quote is what you pay',
  },
  {
    icon: FileText,
    title: 'Detailed Estimates',
    description: 'Written treatment plans with itemized costs',
  },
  {
    icon: Users,
    title: 'Patient-First Approach',
    description: 'We prioritize your comfort and budget',
  },
];

// ============================================================================
// MAGNETIC EFFECT HOOK
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
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingShapes() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #722F37 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #722F37 0%, transparent 70%)',
        }}
      />
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
        }}
      />
      <motion.div
        variants={floatingVariants3}
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, #eab308 0%, transparent 70%)',
        }}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-32 left-[10%] w-24 h-24 border border-[#722F37]/10 rounded-2xl rotate-45"
      />
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="absolute bottom-40 right-[15%] w-20 h-20 border border-[#722F37]/10 rounded-full"
      />
    </div>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#722F37]/10 shadow-sm"
    >
      <Icon className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
      <span className="text-sm font-medium text-neutral-700">{text}</span>
    </motion.div>
  );
}

// ============================================================================
// INSURANCE PROCESS FLOWCHART SVG
// ============================================================================

function InsuranceFlowchart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7 }}
      className="relative bg-gradient-to-br from-white to-[#FDF8F3] rounded-3xl p-8 border border-neutral-100 shadow-lg overflow-hidden"
    >
      <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#722F37]/10 flex items-center justify-center">
          <FileCheck className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
        </div>
        Insurance Billing Process
      </h3>

      <svg
        viewBox="0 0 400 280"
        className="w-full h-auto"
        role="img"
        aria-label="Insurance billing process flowchart showing 5 steps from appointment to payment"
      >
        {/* Background decorative elements */}
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#722F37" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#722F37" stopOpacity="0.05" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Connector lines */}
        <motion.path
          d="M80 60 L80 90 L200 90 L200 60"
          stroke="#722F37"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M200 60 L200 90 L320 90 L320 60"
          stroke="#722F37"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.path
          d="M320 60 L320 140 L200 140"
          stroke="#722F37"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
        <motion.path
          d="M200 140 L80 140 L80 200"
          stroke="#722F37"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        />

        {/* Step 1: Visit */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <rect x="30" y="20" width="100" height="40" rx="8" fill="white" filter="url(#shadow)" stroke="#722F37" strokeWidth="1.5" />
          <text x="80" y="45" textAnchor="middle" className="text-xs font-medium fill-neutral-800">Your Visit</text>
          <circle cx="80" cy="8" r="8" fill="#722F37" />
          <text x="80" y="12" textAnchor="middle" className="text-[10px] font-bold fill-white">1</text>
        </motion.g>

        {/* Step 2: Verify */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <rect x="150" y="20" width="100" height="40" rx="8" fill="white" filter="url(#shadow)" stroke="#722F37" strokeWidth="1.5" />
          <text x="200" y="45" textAnchor="middle" className="text-xs font-medium fill-neutral-800">Verify Coverage</text>
          <circle cx="200" cy="8" r="8" fill="#722F37" />
          <text x="200" y="12" textAnchor="middle" className="text-[10px] font-bold fill-white">2</text>
        </motion.g>

        {/* Step 3: Treatment */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <rect x="270" y="20" width="100" height="40" rx="8" fill="white" filter="url(#shadow)" stroke="#722F37" strokeWidth="1.5" />
          <text x="320" y="45" textAnchor="middle" className="text-xs font-medium fill-neutral-800">Treatment</text>
          <circle cx="320" cy="8" r="8" fill="#722F37" />
          <text x="320" y="12" textAnchor="middle" className="text-[10px] font-bold fill-white">3</text>
        </motion.g>

        {/* Step 4: We Bill Insurance */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <rect x="150" y="120" width="100" height="40" rx="8" fill="url(#flowGradient)" filter="url(#shadow)" stroke="#722F37" strokeWidth="1.5" />
          <text x="200" y="145" textAnchor="middle" className="text-xs font-medium fill-[#722F37]">We Bill Insurance</text>
          <circle cx="200" cy="108" r="8" fill="#722F37" />
          <text x="200" y="112" textAnchor="middle" className="text-[10px] font-bold fill-white">4</text>
        </motion.g>

        {/* Step 5: You Pay Remainder */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <rect x="30" y="200" width="100" height="50" rx="8" fill="#722F37" filter="url(#shadow)" />
          <text x="80" y="222" textAnchor="middle" className="text-xs font-medium fill-white">You Pay Only</text>
          <text x="80" y="238" textAnchor="middle" className="text-xs font-medium fill-white">Your Portion</text>
          <circle cx="80" cy="188" r="8" fill="#22C55E" />
          <text x="80" y="192" textAnchor="middle" className="text-[10px] font-bold fill-white">5</text>
        </motion.g>

        {/* Savings callout */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <rect x="160" y="200" width="220" height="60" rx="12" fill="#F0FDF4" stroke="#22C55E" strokeWidth="1.5" />
          <text x="270" y="225" textAnchor="middle" className="text-xs font-semibold fill-green-700">No upfront payment needed!</text>
          <text x="270" y="245" textAnchor="middle" className="text-[10px] fill-green-600">We handle the paperwork for you</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

// ============================================================================
// PAYMENT CARD COMPONENT
// ============================================================================

function PaymentCard({
  method,
  index,
}: {
  method: (typeof paymentMethods)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.1);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={prefersReducedMotion ? {} : { x: magnetic.x, y: magnetic.y }}
      onMouseMove={prefersReducedMotion ? undefined : magnetic.handleMouseMove}
      onMouseLeave={(e) => {
        if (!prefersReducedMotion) magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative group"
    >
      <motion.div
        className="relative bg-white rounded-2xl p-8 border border-neutral-100 overflow-hidden cursor-pointer"
        whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(114, 47, 55, 0.15)'
            : '0 4px 20px -4px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${method.color}08 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />

        {/* Shimmer effect */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
            initial={{ x: '-200%' }}
            animate={{ x: isHovered ? '200%' : '-200%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}

        {/* Icon with animated background */}
        <div className="relative flex flex-col items-center">
          <motion.div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: `linear-gradient(135deg, ${method.color}15 0%, ${method.color}05 100%)`,
            }}
            animate={prefersReducedMotion ? {} : {
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: method.color }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? 0.1 : 0,
              }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            <method.icon
              className="w-10 h-10 transition-colors duration-300 relative z-10"
              style={{ color: method.color }}
              aria-hidden="true"
            />
          </motion.div>

          <h3 className="font-bold text-lg text-neutral-900 text-center">{method.name}</h3>
          <p className="text-sm text-neutral-500 mt-1">{method.description}</p>

          {/* Check mark indicator */}
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            aria-hidden="true"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// DIRECT BILLING STEP COMPONENT
// ============================================================================

function DirectBillingStep({
  step,
  index,
  isActive,
  onActivate,
}: {
  step: (typeof directBillingSteps)[0];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
      onMouseEnter={onActivate}
    >
      {/* Connector line */}
      {index < directBillingSteps.length - 1 && (
        <motion.div
          className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-[#722F37] to-[#722F37]/20"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          style={{ originY: 0 }}
          aria-hidden="true"
        />
      )}

      <motion.div
        className={`flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
          isActive
            ? 'bg-gradient-to-r from-[#722F37]/10 via-[#722F37]/5 to-transparent'
            : 'bg-white/50 hover:bg-white'
        }`}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02, x: 8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Step number */}
        <motion.div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
            isActive
              ? 'bg-[#722F37] text-white shadow-lg shadow-[#722F37]/30'
              : 'bg-white border-2 border-[#722F37]/20 text-[#722F37]'
          }`}
          animate={isActive && !prefersReducedMotion ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          {step.step}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={isActive && !prefersReducedMotion ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <step.icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-[#722F37]' : 'text-neutral-400'
                }`}
                aria-hidden="true"
              />
            </motion.div>
            <h4
              className={`font-semibold transition-colors duration-300 ${
                isActive ? 'text-[#722F37]' : 'text-neutral-900'
              }`}
            >
              {step.title}
            </h4>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed">{step.description}</p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <ArrowRight className="w-5 h-5 text-[#722F37]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// BENEFIT CARD COMPONENT
// ============================================================================

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof directBillingBenefits)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        className="relative bg-white rounded-2xl p-6 border border-neutral-100 overflow-hidden h-full"
        whileHover={prefersReducedMotion ? {} : { y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          boxShadow: isHovered
            ? '0 20px 40px -12px rgba(114, 47, 55, 0.12)'
            : '0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#722F37]/10 to-transparent rounded-bl-full" />
        </motion.div>

        <div className="flex items-start gap-4">
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center"
            animate={prefersReducedMotion ? {} : {
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <benefit.icon className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
          </motion.div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">{benefit.title}</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">{benefit.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// CDCP SERVICE ITEM
// ============================================================================

function CDCPServiceItem({ service, index }: { service: (typeof cdcpServices)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-start gap-3 py-2 cursor-default"
    >
      <motion.div
        className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mt-0.5"
        animate={prefersReducedMotion ? {} : {
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
        }}
        transition={{ duration: 0.2 }}
      >
        <service.icon className="w-4 h-4 text-primary-200" aria-hidden="true" />
      </motion.div>
      <motion.span
        className="text-white/90"
        animate={prefersReducedMotion ? {} : { x: isHovered ? 5 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {service.name}
      </motion.span>
    </motion.li>
  );
}

// ============================================================================
// TRANSPARENCY FEATURE CARD
// ============================================================================

function TransparencyCard({
  feature,
  index,
}: {
  feature: (typeof transparencyFeatures)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.08);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={prefersReducedMotion ? {} : { x: magnetic.x, y: magnetic.y }}
      onMouseMove={prefersReducedMotion ? undefined : magnetic.handleMouseMove}
      onMouseLeave={(e) => {
        if (!prefersReducedMotion) magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative group"
    >
      <motion.div
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 text-center overflow-hidden"
        whileHover={prefersReducedMotion ? {} : { y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(114, 47, 55, 0.12)'
            : '0 4px 20px -4px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            padding: '2px',
            background: 'linear-gradient(135deg, #722F37, #8B3A42, #722F37)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        <motion.div
          className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center mb-5"
          animate={prefersReducedMotion ? {} : {
            rotate: isHovered ? [0, -10, 10, 0] : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <feature.icon className="w-8 h-8 text-[#722F37]" aria-hidden="true" />
        </motion.div>

        <h3 className="font-bold text-lg text-neutral-900 mb-2">{feature.title}</h3>
        <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>

        {/* Sparkle effect */}
        <motion.div
          className="absolute top-4 right-4"
          animate={prefersReducedMotion ? {} : {
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1 : 0.5,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <Sparkles className="w-5 h-5 text-[#722F37]/30" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// FAQ ITEM COMPONENT
// ============================================================================

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border-[#722F37]/20 shadow-lg shadow-[#722F37]/5'
            : 'bg-white border-neutral-100 hover:border-[#722F37]/10'
        }`}
        layout
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-inset rounded-2xl"
          aria-expanded={isOpen}
        >
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              isOpen ? 'bg-[#722F37]/10' : 'bg-neutral-100'
            }`}>
              <item.icon className={`w-4 h-4 transition-colors duration-300 ${
                isOpen ? 'text-[#722F37]' : 'text-neutral-400'
              }`} aria-hidden="true" />
            </div>
            <span
              className={`text-base font-semibold leading-snug transition-colors duration-200 ${
                isOpen ? 'text-[#722F37]' : 'text-neutral-900'
              }`}
            >
              {item.question}
            </span>
          </div>
          <motion.div
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? 'bg-[#722F37] text-white'
                : 'bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] text-[#722F37]'
            }`}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5">
                <div className="h-px bg-gradient-to-r from-transparent via-[#722F37]/10 to-transparent mb-4" aria-hidden="true" />
                <p className="text-neutral-600 leading-relaxed pl-11">{item.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// COST VISUALIZATION COMPONENT
// ============================================================================

function CostVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const insuranceCoverage = 80;
  const patientPortion = 20;

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
          <CircleDollarSign className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-neutral-900">Cost Breakdown Example</h3>
          <p className="text-sm text-neutral-500">See how direct billing works</p>
        </div>
      </div>

      {/* Progress visualization */}
      <div className="relative h-12 bg-neutral-100 rounded-2xl overflow-hidden mb-6" role="img" aria-label="Cost breakdown: Insurance covers 80%, you pay 20%">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#722F37] to-[#8B3A42] flex items-center justify-center"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${insuranceCoverage}%` : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-white font-semibold text-sm">Insurance Covers</span>
        </motion.div>
        <motion.div
          className="absolute inset-y-0 right-0 bg-gradient-to-r from-primary-200 to-primary-100 flex items-center justify-center"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${patientPortion}%` : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[#722F37] font-semibold text-sm">You Pay</span>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          className="text-center p-4 rounded-xl bg-neutral-50"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-2xl font-bold text-neutral-900">$500</p>
          <p className="text-xs text-neutral-500">Treatment Cost</p>
        </motion.div>
        <motion.div
          className="text-center p-4 rounded-xl bg-[#722F37]/5"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-2xl font-bold text-[#722F37]">$400</p>
          <p className="text-xs text-neutral-500">Insurance Pays</p>
        </motion.div>
        <motion.div
          className="text-center p-4 rounded-xl bg-green-50"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-2xl font-bold text-green-600">$100</p>
          <p className="text-xs text-neutral-500">You Pay</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// HERO IMAGE COMPONENT
// ============================================================================

function HeroImage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src="/images/patient-info/payment-insurance/hero-patient-smiling.jpg"
          alt="Happy patient smiling in dental chair during appointment"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/20 via-transparent to-transparent" aria-hidden="true" />

        {/* Floating badge */}
        <motion.div
          className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Hassle-Free Billing</p>
              <p className="text-xs text-neutral-500">Direct insurance claims</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN DESKTOP PAGE COMPONENT
// ============================================================================

export default function PaymentInsuranceDesktop() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* ========== HERO SECTION ========== */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-br from-[#FDF8F3] via-[#FFFBF8] to-white overflow-hidden"
        style={prefersReducedMotion ? {} : { opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <FloatingShapes />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              {/* Trust badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
              >
                <TrustBadge icon={ShieldCheck} text="Secure Payments" />
                <TrustBadge icon={FileCheck} text="Direct Billing" />
                <TrustBadge icon={BadgeCheck} text="CDCP Accepted" />
              </motion.div>

              {/* Main heading */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1]"
              >
                Payment &{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#722F37]">Insurance</span>
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 10C50 4 150 0 298 8"
                      stroke="#722F37"
                      strokeWidth="3"
                      strokeLinecap="round"
                      style={{ pathLength: prefersReducedMotion ? 1 : scrollYProgress }}
                    />
                  </motion.svg>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                We believe quality dental care should be accessible to everyone. We offer flexible
                payment options, direct insurance billing, and participate in the Canadian Dental Care
                Plan (CDCP).
              </motion.p>

              {/* Quick stats */}
              <motion.div
                variants={itemVariants}
                className="mt-8 grid grid-cols-3 gap-4"
              >
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <CreditCard className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                    <span className="text-2xl font-bold text-neutral-900">5+</span>
                  </div>
                  <p className="text-xs text-neutral-500">Payment Methods</p>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <Building2 className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                    <span className="text-2xl font-bold text-neutral-900">100+</span>
                  </div>
                  <p className="text-xs text-neutral-500">Insurers Accepted</p>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <Shield className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                    <span className="text-2xl font-bold text-neutral-900">CDCP</span>
                  </div>
                  <p className="text-xs text-neutral-500">Participant</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Image */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:block"
            >
              <HeroImage />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex justify-center lg:hidden"
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-14 mx-auto rounded-full border-2 border-[#722F37]/30 flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-3 bg-[#722F37] rounded-full"
                animate={prefersReducedMotion ? {} : { y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ========== COST TRANSPARENCY SECTION ========== */}
      <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {!prefersReducedMotion && (
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#722F37]/5 blur-3xl"
            />
          )}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-[#722F37]/5 text-[#722F37] text-sm font-semibold mb-6"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>Complete Transparency</span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              No Surprises, <span className="text-[#722F37]">Just Trust</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              We believe in complete cost transparency. Know exactly what to expect before any
              treatment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transparencyFeatures.map((feature, index) => (
              <TransparencyCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== PAYMENT METHODS SECTION ========== */}
      <section className="relative bg-gradient-to-b from-[#FDF8F3] to-white py-24 lg:py-32 overflow-hidden">
        <FloatingShapes />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#722F37]/10 text-[#722F37] text-sm font-semibold mb-6 shadow-sm"
            >
              <CreditCard className="w-4 h-4" aria-hidden="true" />
              <span>Accepted Payments</span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              Payment Methods <span className="text-[#722F37]">Accepted</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              We accept a variety of payment methods for your convenience.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {paymentMethods.map((method, index) => (
              <PaymentCard key={method.name} method={method} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== DIRECT BILLING SECTION ========== */}
      <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {!prefersReducedMotion && (
            <motion.div
              variants={floatingVariants2}
              animate="animate"
              className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#722F37]/3 blur-3xl"
            />
          )}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left column - Content */}
            <div>
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-[#722F37]/5 text-[#722F37] text-sm font-semibold mb-6"
                >
                  <FileCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Insurance</span>
                </motion.div>

                <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
                  Direct Billing to{' '}
                  <span className="text-[#722F37]">Insurance</span>
                </h2>

                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  We offer <strong className="text-neutral-900">direct billing</strong> to most
                  insurance companies, making dental care more accessible and hassle-free. No more
                  paying upfront and waiting for reimbursement.
                </p>
              </motion.div>

              {/* Supporting image */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden mb-10 shadow-lg"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/patient-info/payment-insurance/insurance-discussion.jpg"
                    alt="Dentist explaining treatment options and insurance coverage to patient"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
                </div>
              </motion.div>

              {/* Benefits grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {directBillingBenefits.map((benefit, index) => (
                  <BenefitCard key={benefit.title} benefit={benefit} index={index} />
                ))}
              </div>

              {/* Insurance providers note */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative bg-gradient-to-r from-[#FDF8F3] to-[#FFFBF8] rounded-2xl p-6 border border-[#722F37]/10 overflow-hidden"
              >
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#722F37]/5 to-transparent"
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-[#722F37]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-lg">Insurance Providers</p>
                    <p className="text-neutral-600 mt-1 leading-relaxed">
                      We work with most major insurance providers in Canada. Please bring your
                      insurance card to your appointment, and our team will verify your coverage.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column - Steps & Visualization */}
            <div className="space-y-8">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl p-8 border border-neutral-100"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#722F37]/10 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                  </div>
                  How Direct Billing Works
                </h3>
                <div className="space-y-2">
                  {directBillingSteps.map((step, index) => (
                    <DirectBillingStep
                      key={step.step}
                      step={step}
                      index={index}
                      isActive={activeStep === index}
                      onActivate={() => setActiveStep(index)}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Cost visualization */}
              <CostVisualization />

              {/* Insurance Flowchart */}
              <InsuranceFlowchart />
            </div>
          </div>
        </div>
      </section>

      {/* ========== CDCP SECTION ========== */}
      <section className="relative bg-[#722F37] overflow-hidden py-24 lg:py-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {!prefersReducedMotion && (
            <>
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5"
              />
              <motion.div
                variants={floatingVariants2}
                animate="animate"
                className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/3"
              />
            </>
          )}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 backdrop-blur-sm border border-white/10"
              >
                <Landmark className="w-4 h-4" aria-hidden="true" />
                <span>Government Program</span>
              </motion.div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Canadian Dental Care Plan{' '}
                <span className="text-primary-200">(CDCP)</span>
              </h2>

              <p className="text-lg text-white/80 leading-relaxed mb-10">
                We are proud to accept the{' '}
                <strong className="text-white">Canadian Dental Care Plan (CDCP)</strong>, making
                dental care more accessible to eligible Canadians.
              </p>

              {/* Eligibility */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary-200" aria-hidden="true" />
                  Eligibility Requirements
                </h3>
                <ul className="space-y-3">
                  {cdcpEligibility.map((item, index) => (
                    <motion.li
                      key={item.text}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-primary-200" aria-hidden="true" />
                      </div>
                      <span className="text-white/90">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* How to use */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary-200" aria-hidden="true" />
                  How to Use CDCP at Our Office
                </h3>
                <ol className="space-y-3">
                  {[
                    { text: 'Apply for CDCP through the federal government', icon: FileText },
                    { text: 'Bring your CDCP documentation to your appointment', icon: BadgeCheck },
                    { text: 'We bill the program directly for covered services', icon: Receipt },
                    { text: 'You may pay for any services not covered', icon: HandCoins },
                  ].map((step, index) => (
                    <motion.li
                      key={index}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 text-white/80"
                    >
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <step.icon className="w-4 h-4 text-primary-300" aria-hidden="true" />
                        <span>{step.text}</span>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            </motion.div>

            {/* Services covered */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/20">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center"
                    animate={prefersReducedMotion ? {} : {
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <ShieldCheck className="w-7 h-7 text-white" aria-hidden="true" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">Services Covered by CDCP</h3>
                </div>

                <ul className="space-y-1">
                  {cdcpServices.map((service, index) => (
                    <CDCPServiceItem key={service.name} service={service} index={index} />
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-sm text-white/70">
                    <strong className="text-white">Note:</strong> Coverage details may vary. Contact
                    our office or visit the federal government website for complete eligibility
                    information.
                  </p>
                </div>
              </div>

              {/* Decorative badge */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl"
                animate={prefersReducedMotion ? {} : { rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <div className="text-center">
                  <BadgeCheck className="w-8 h-8 text-[#722F37] mx-auto" />
                  <span className="text-xs font-bold text-[#722F37]">CDCP</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FINANCIAL POLICY SECTION ========== */}
      <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {!prefersReducedMotion && (
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#722F37]/3 blur-3xl"
            />
          )}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#722F37]/10 to-[#722F37]/5 text-[#722F37] text-sm font-semibold mb-6"
            >
              <ClipboardList className="w-4 h-4" aria-hidden="true" />
              <span>Policy</span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              Our Financial <span className="text-[#722F37]">Policy</span>
            </h2>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-gradient-to-br from-[#FDF8F3] via-white to-[#FFFBF8] rounded-3xl p-10 md:p-12 border border-neutral-100 shadow-xl"
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#722F37]/5 to-transparent rounded-bl-full" aria-hidden="true" />

            <ul className="space-y-6">
              {financialPolicyPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-start gap-5"
                >
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <point.icon className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
                  </motion.div>
                  <p className="text-neutral-700 leading-relaxed text-lg pt-2.5">{point.text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="relative bg-gradient-to-b from-[#FDF8F3] to-white py-24 lg:py-32 overflow-hidden">
        <FloatingShapes />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#722F37]/10 text-[#722F37] text-sm font-semibold mb-6 shadow-sm"
            >
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              <span>Help</span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
              Frequently Asked <span className="text-[#722F37]">Questions</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-xl mx-auto">
              Have questions about payment or insurance? Find answers to common questions below.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT CTA SECTION ========== */}
      <section className="relative bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#722F37] overflow-hidden py-24 lg:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0" aria-hidden="true">
          {!prefersReducedMotion && (
            <>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl"
              />
            </>
          )}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/patient-info/payment-insurance/dental-consultation.jpg"
                    alt="Dental team member ready to assist with billing questions"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
                </div>
                {/* Overlay card */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#722F37]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Need Help?</p>
                      <p className="text-xs text-neutral-500">Our team is here to assist</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - CTA Content */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto lg:mx-0 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8"
              >
                <Phone className="w-10 h-10 text-white" aria-hidden="true" />
              </motion.div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Questions About Billing?
              </h2>

              <p className="text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Our friendly team is happy to help with any payment, insurance, or billing questions.
                Don&apos;t hesitate to reach out.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <motion.a
                  href={`tel:${contactInfo.phone}`}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-bold rounded-2xl overflow-hidden shadow-xl shadow-black/20"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-white"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                      aria-hidden="true"
                    />
                  )}
                  <Phone className="w-5 h-5 relative z-10" aria-hidden="true" />
                  <span className="relative z-10">
                    ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-
                    {contactInfo.phone.slice(6)}
                  </span>
                </motion.a>

                <Link href="/contact">
                  <motion.span
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 overflow-hidden"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">Contact Us</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </motion.span>
                </Link>
              </div>

              <motion.p
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-white/60 text-sm"
              >
                Mon-Fri: 8am-5pm | Sat: By Appointment
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
