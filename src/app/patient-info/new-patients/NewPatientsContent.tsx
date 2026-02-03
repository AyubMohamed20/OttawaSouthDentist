'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  ClipboardList,
  Clock,
  CreditCard,
  Shield,
  CheckCircle2,
  Phone,
  Calendar,
  ArrowRight,
  Heart,
  Sparkles,
  Users,
  Languages,
  MapPin,
  Building2,
  AlertCircle,
  Download,
  ChevronDown,
  Play,
  Eye,
  Camera,
  Stethoscope,
  Smile,
  Star,
  Check,
  MessageCircle,
  FileCheck,
  UserPlus,
  ClipboardCheck,
  Handshake,
  BadgeCheck,
  Wallet,
  IdCard,
  Pill,
  FolderOpen,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { Button } from '@/components/ui/button';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// ============================================================================
// SVG ILLUSTRATIONS
// ============================================================================

// First Visit Journey Illustration - A welcoming path visualization
function JourneyIllustration({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 120"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#722F37" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#722F37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#722F37" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Flowing path */}
      <motion.path
        d="M20 60 C80 20, 120 100, 200 60 C280 20, 320 100, 380 60"
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Journey milestones */}
      {[20, 110, 200, 290, 380].map((x, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={x}
            cy={60}
            r={12}
            fill="#FDF8F3"
            stroke="#722F37"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={prefersReducedMotion ? { scale: 1 } : { scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
          />
          <motion.circle
            cx={x}
            cy={60}
            r={5}
            fill="#722F37"
            initial={{ scale: 0 }}
            animate={prefersReducedMotion ? { scale: 1 } : { scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
          />
        </motion.g>
      ))}

      {/* Sparkle decorations */}
      {!prefersReducedMotion && (
        <>
          <motion.circle
            cx="60"
            cy="30"
            r="3"
            fill="#722F37"
            opacity="0.3"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="160"
            cy="90"
            r="2"
            fill="#722F37"
            opacity="0.4"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="340"
            cy="35"
            r="2.5"
            fill="#722F37"
            opacity="0.35"
            animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </>
      )}
    </svg>
  );
}

// Checklist Illustration - Visual representation of preparation
function ChecklistIllustration({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="clipboardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#722F37" />
          <stop offset="100%" stopColor="#5a252c" />
        </linearGradient>
      </defs>

      {/* Clipboard body */}
      <motion.rect
        x="40"
        y="30"
        width="120"
        height="150"
        rx="8"
        fill="#FDF8F3"
        stroke="#EDE5DD"
        strokeWidth="2"
        initial={{ y: 10, opacity: 0 }}
        animate={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Clipboard clip */}
      <motion.rect
        x="70"
        y="20"
        width="60"
        height="25"
        rx="4"
        fill="url(#clipboardGrad)"
        initial={{ scale: 0 }}
        animate={prefersReducedMotion ? { scale: 1 } : { scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      />

      {/* Checklist items */}
      {[0, 1, 2, 3].map((i) => (
        <motion.g key={i}>
          {/* Checkbox */}
          <motion.rect
            x="55"
            y={65 + i * 30}
            width="18"
            height="18"
            rx="4"
            fill={i < 2 ? "#722F37" : "white"}
            stroke="#722F37"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={prefersReducedMotion ? { scale: 1 } : { scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
          />
          {/* Check mark for completed items */}
          {i < 2 && (
            <motion.path
              d="M59 74 L63 78 L71 68"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
              style={{ transform: `translateY(${i * 30}px)` }}
            />
          )}
          {/* Line placeholder */}
          <motion.rect
            x="85"
            y={70 + i * 30}
            width={i === 3 ? 50 : 60}
            height="8"
            rx="4"
            fill={i < 2 ? "#722F37" : "#EDE5DD"}
            opacity={i < 2 ? 0.3 : 1}
            initial={{ scaleX: 0 }}
            animate={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.g>
      ))}

      {/* Decorative sparkle */}
      {!prefersReducedMotion && (
        <motion.g
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: "175px 45px" }}
        >
          <path
            d="M170 45 L175 40 L180 45 L175 50 Z"
            fill="#722F37"
            opacity="0.6"
          />
        </motion.g>
      )}
    </svg>
  );
}

// Welcome Heart Illustration
function WelcomeIllustration({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#722F37" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="#FDF8F3"
        stroke="#EDE5DD"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={prefersReducedMotion ? { scale: 1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
      />

      {/* Heart shape */}
      <motion.path
        d="M50 75 C30 60, 20 45, 30 35 C40 25, 50 35, 50 40 C50 35, 60 25, 70 35 C80 45, 70 60, 50 75"
        fill="url(#heartGrad)"
        initial={{ scale: 0 }}
        animate={prefersReducedMotion ? { scale: 1 } : { scale: [0, 1.1, 1] }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Pulse animation */}
      {!prefersReducedMotion && (
        <motion.path
          d="M50 75 C30 60, 20 45, 30 35 C40 25, 50 35, 50 40 C50 35, 60 25, 70 35 C80 45, 70 60, 50 75"
          fill="none"
          stroke="url(#heartGrad)"
          strokeWidth="2"
          opacity="0.5"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "50px 50px" }}
        />
      )}
    </svg>
  );
}

// ============================================================================
// DATA
// ============================================================================

const faqs = [
  {
    question: 'What should I bring to my first appointment?',
    answer:
      'Please bring a valid government-issued photo ID, your dental insurance card (if applicable), a list of current medications, and any relevant dental records or X-rays from your previous dentist. If you have completed our patient forms online, bring a copy; otherwise, please arrive 15 minutes early to fill them out.',
    icon: ClipboardCheck,
  },
  {
    question: 'Do you accept new patients without insurance?',
    answer:
      'Absolutely! We welcome patients with or without dental insurance. We offer various payment options including cash, debit, Visa, MasterCard, and American Express. We can also provide treatment estimates and discuss payment arrangements for larger procedures.',
    icon: Wallet,
  },
  {
    question: 'Do you accept the Canadian Dental Care Plan (CDCP)?',
    answer:
      'Yes, Ottawa South Dental is proud to accept the Canadian Dental Care Plan (CDCP). If you are enrolled in the program, please bring your CDCP documentation to your appointment. We will bill the program directly for covered services.',
    icon: BadgeCheck,
  },
  {
    question: 'How early should I arrive for my first appointment?',
    answer:
      'We recommend arriving 15-20 minutes before your scheduled appointment time. This allows you to complete any remaining paperwork, get comfortable with our office, and ask any questions you may have before your examination begins.',
    icon: Clock,
  },
  {
    question: 'What happens during my first visit?',
    answer:
      'Your first visit typically includes a comprehensive oral examination, necessary X-rays, a discussion of your dental history and concerns, and a review of any treatment recommendations. We take time to listen to your needs and create a personalized care plan tailored to your oral health goals.',
    icon: Stethoscope,
  },
  {
    question: 'Can I transfer my dental records from my previous dentist?',
    answer:
      "Yes, we can request your dental records and X-rays from your previous dentist. Simply provide us with their contact information during your first visit, and we'll handle the transfer. Having your records helps us provide continuity of care and a complete picture of your dental health.",
    icon: FolderOpen,
  },
  {
    question: 'Do you offer services in languages other than English?',
    answer:
      'Yes! Our multilingual team can serve you in English, French, Spanish, Hindi, Punjabi, Farsi, and Arabic. Just let us know your language preference when booking your appointment, and we will do our best to accommodate you.',
    icon: Languages,
  },
];

const firstVisitSteps = [
  {
    step: 1,
    title: 'Welcome & Check-In',
    description:
      'Our friendly team will greet you, collect your paperwork, and verify your insurance information if applicable.',
    duration: '10-15 min',
    icon: Handshake,
    color: '#ec4899',
    bgColor: 'from-pink-50 to-pink-100/50',
  },
  {
    step: 2,
    title: 'Health History Review',
    description:
      'We will review your medical and dental history together to understand your unique needs and any concerns.',
    duration: '5-10 min',
    icon: ClipboardList,
    color: '#8b5cf6',
    bgColor: 'from-violet-50 to-violet-100/50',
  },
  {
    step: 3,
    title: 'Comprehensive Examination',
    description:
      'Your dentist will perform a thorough examination of your teeth, gums, jaw, and oral tissues to assess your overall oral health.',
    duration: '15-20 min',
    icon: Stethoscope,
    color: '#3b82f6',
    bgColor: 'from-blue-50 to-blue-100/50',
  },
  {
    step: 4,
    title: 'Digital X-Rays',
    description:
      'If needed, we will take digital X-rays using low-radiation technology to see what is happening beneath the surface.',
    duration: '10-15 min',
    icon: Camera,
    color: '#14b8a6',
    bgColor: 'from-teal-50 to-teal-100/50',
  },
  {
    step: 5,
    title: 'Discussion & Treatment Plan',
    description:
      'We will discuss our findings, answer your questions, and create a personalized treatment plan together.',
    duration: '10-15 min',
    icon: MessageCircle,
    color: '#f59e0b',
    bgColor: 'from-amber-50 to-amber-100/50',
  },
];

const requiredDocuments = [
  {
    icon: IdCard,
    title: 'Photo ID',
    description: "Valid government-issued identification (driver's license, passport, health card)",
    checkItems: ['Driver\'s License', 'Passport', 'Ontario Health Card'],
    illustration: 'id',
  },
  {
    icon: CreditCard,
    title: 'Insurance Card',
    description: 'Your dental insurance card with member ID and group number (if applicable)',
    checkItems: ['Member ID', 'Group Number', 'Policy Holder Name'],
    illustration: 'insurance',
  },
  {
    icon: Pill,
    title: 'Medication List',
    description: 'List of all current medications, vitamins, and supplements you are taking',
    checkItems: ['Prescription Medications', 'Over-the-counter Meds', 'Supplements & Vitamins'],
    illustration: 'meds',
  },
  {
    icon: FolderOpen,
    title: 'Dental Records',
    description: 'Previous X-rays and dental records from your former dentist (if available)',
    checkItems: ['Previous X-rays', 'Treatment History', 'Former Dentist Contact'],
    illustration: 'records',
  },
];

const policies = [
  {
    icon: Clock,
    title: 'Appointment Policy',
    color: '#3b82f6',
    items: [
      'Please arrive 15 minutes early for your first visit',
      '48-hour notice required for cancellations',
      'Late arrivals may need to be rescheduled',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payment Policy',
    color: '#14b8a6',
    items: [
      'Payment is due at the time of service',
      'We accept cash, debit, Visa, MC, and AMEX',
      'Direct billing to most insurance companies',
    ],
  },
  {
    icon: Shield,
    title: 'Insurance & CDCP',
    color: '#8b5cf6',
    items: [
      'We accept most major insurance providers',
      'CDCP (Canadian Dental Care Plan) accepted',
      'We will estimate your coverage before treatment',
    ],
  },
];

const whyChooseUs = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'We take time to listen to your concerns and create personalized treatment plans.',
    stat: '20+',
    statLabel: 'Years Experience',
    color: '#ec4899',
  },
  {
    icon: Languages,
    title: 'Multilingual Team',
    description: 'We speak English, French, Spanish, Hindi, Punjabi, Farsi, and Arabic.',
    stat: '7',
    statLabel: 'Languages',
    color: '#8b5cf6',
  },
  {
    icon: Sparkles,
    title: 'Modern Technology',
    description: 'Digital X-rays with 90% less radiation and advanced diagnostic tools.',
    stat: '90%',
    statLabel: 'Less Radiation',
    color: '#3b82f6',
  },
  {
    icon: Shield,
    title: 'CDCP Accepted',
    description: 'Proud to accept the Canadian Dental Care Plan for eligible patients.',
    stat: '100%',
    statLabel: 'Coverage Support',
    color: '#14b8a6',
  },
];

const virtualTourSpots = [
  { id: 1, title: 'Reception Area', x: 20, y: 30, description: 'Warm, welcoming check-in desk' },
  { id: 2, title: 'Waiting Lounge', x: 40, y: 50, description: 'Comfortable seating area' },
  { id: 3, title: 'Treatment Rooms', x: 65, y: 35, description: 'State-of-the-art equipment' },
  { id: 4, title: 'Consultation Room', x: 80, y: 60, description: 'Private discussions' },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function useMagnetic(strength: number = 0.3) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      x.set(deltaX);
      y.set(deltaY);
    },
    [x, y, strength, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x: springX, y: springY, handleMouseMove, handleMouseLeave };
}

// Animated Welcome Banner with Typewriter Effect
function WelcomeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Welcome to Your New Dental Home';

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayedText(fullText);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [isInView, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="text-center mb-8"
    >
      <motion.div
        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#722F37]/10 via-[#722F37]/5 to-[#722F37]/10 border border-[#722F37]/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Sparkles className="w-5 h-5 text-[#722F37]" />
        </motion.div>
        <span className="text-[#722F37] font-medium">{displayedText}</span>
        {!prefersReducedMotion && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="w-0.5 h-5 bg-[#722F37]"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// Animated Scroll Indicator
function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-sm text-[#722F37]/70 font-medium">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-8 h-12 rounded-full border-2 border-[#722F37]/30 flex items-start justify-center p-2"
      >
        <motion.div className="w-1.5 h-3 rounded-full bg-[#722F37]" />
      </motion.div>
    </motion.div>
  );
}

// Interactive Checklist Item with enhanced visuals
function ChecklistItem({
  doc,
  index,
  isChecked,
  onToggle,
}: {
  doc: typeof requiredDocuments[0];
  index: number;
  isChecked: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : {
        hidden: { opacity: 0, x: -40 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group"
    >
      <motion.div
        className={`
          relative overflow-hidden rounded-2xl border-2 transition-all duration-500
          ${isChecked
            ? 'border-green-400/50 bg-gradient-to-br from-green-50 to-emerald-50/50'
            : 'border-[#EDE5DD] bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 hover:border-[#722F37]/20'
          }
        `}
        whileHover={prefersReducedMotion ? {} : { y: -4, boxShadow: '0 20px 40px -15px rgba(114, 47, 55, 0.15)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: isChecked ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Checkbox */}
            <motion.button
              onClick={onToggle}
              className={`
                relative flex-shrink-0 w-8 h-8 rounded-lg border-2 transition-all duration-300
                ${isChecked
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-400'
                  : 'border-[#722F37]/30 hover:border-[#722F37]/50 hover:bg-[#722F37]/5'
                }
              `}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              aria-label={isChecked ? `${doc.title} - completed` : `${doc.title} - not completed, click to mark as complete`}
            >
              <AnimatePresence>
                {isChecked && (
                  <motion.div
                    initial={prefersReducedMotion ? { scale: 1 } : { scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={prefersReducedMotion ? { scale: 0 } : { scale: 0, rotate: 45 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isChecked
                      ? 'bg-gradient-to-br from-green-400/20 to-emerald-500/20'
                      : 'bg-gradient-to-br from-[#722F37] to-[#5a252c]'
                    }
                  `}
                >
                  <doc.icon className={`w-6 h-6 ${isChecked ? 'text-green-600' : 'text-white'}`} aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className={`font-display font-semibold text-lg transition-colors duration-300 ${
                      isChecked ? 'text-green-700 line-through' : 'text-foreground'
                    }`}
                  >
                    {doc.title}
                  </h3>
                </div>
              </div>
              <p className="text-foreground-secondary text-sm leading-relaxed mb-3">
                {doc.description}
              </p>

              {/* Expandable Checklist */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm text-[#722F37] font-medium hover:underline"
                aria-expanded={isExpanded}
              >
                <span>View details</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-2">
                      {doc.checkItems.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-sm text-foreground-secondary"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#722F37]/50" aria-hidden="true" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Enhanced Journey Step Card
function JourneyStep({
  step,
  index,
  activeStep,
  setActiveStep,
}: {
  step: typeof firstVisitSteps[0];
  index: number;
  activeStep: number;
  setActiveStep: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isActive = activeStep === index;
  const isPast = activeStep > index;
  const Icon = step.icon;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="relative"
    >
      {/* Connector Line */}
      {index < firstVisitSteps.length - 1 && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-full hidden lg:block" aria-hidden="true">
          <motion.div
            className="w-full bg-gradient-to-b from-[#722F37] to-[#722F37]/30"
            initial={{ height: 0 }}
            animate={isInView ? { height: isPast ? '100%' : isActive ? '50%' : '0%' } : { height: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      <motion.button
        onClick={() => setActiveStep(index)}
        className="relative z-10 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-2 rounded-3xl group"
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        aria-label={`Step ${step.step}: ${step.title}${isActive ? ' (currently selected)' : ''}`}
      >
        <motion.div
          className={`
            relative overflow-hidden rounded-3xl p-8 transition-all duration-500
            ${isActive
              ? 'bg-gradient-to-br from-[#722F37] to-[#5a252c] text-white shadow-xl shadow-[#722F37]/25'
              : isPast
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                : 'bg-white border-2 border-[#EDE5DD] hover:border-[#722F37]/30'
            }
          `}
          layout
        >
          {/* Animated Background Pattern */}
          {isActive && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
              aria-hidden="true"
            />
          )}

          {/* Step Number Badge */}
          <motion.div
            className={`
              absolute -top-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
              ${isActive
                ? 'bg-white text-[#722F37] shadow-lg'
                : isPast
                  ? 'bg-green-500 text-white'
                  : 'bg-[#722F37] text-white'
              }
            `}
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
            aria-label={isPast ? 'Completed' : `Step ${step.step}`}
          >
            {isPast ? <Check className="w-5 h-5" aria-hidden="true" /> : step.step}
          </motion.div>

          {/* Icon */}
          <motion.div
            className={`
              w-16 h-16 rounded-2xl flex items-center justify-center mb-6
              ${isActive
                ? 'bg-white/20'
                : isPast
                  ? 'bg-green-100'
                  : `bg-gradient-to-br ${step.bgColor}`
              }
            `}
            whileHover={prefersReducedMotion ? {} : { rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon
              className={`w-8 h-8 ${isActive ? 'text-white' : isPast ? 'text-green-600' : ''}`}
              style={{ color: !isActive && !isPast ? step.color : undefined }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Content */}
          <h3
            className={`font-display font-semibold text-xl mb-3 ${
              isActive ? 'text-white' : isPast ? 'text-green-800' : 'text-foreground'
            }`}
          >
            {step.title}
          </h3>
          <p
            className={`text-sm leading-relaxed mb-4 ${
              isActive ? 'text-white/80' : isPast ? 'text-green-700' : 'text-foreground-secondary'
            }`}
          >
            {step.description}
          </p>

          {/* Duration Badge */}
          <motion.div
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              ${isActive
                ? 'bg-white/20 text-white'
                : isPast
                  ? 'bg-green-100 text-green-700'
                  : 'bg-[#FDF8F3] text-[#722F37]'
              }
            `}
          >
            <Clock className="w-4 h-4" aria-hidden="true" />
            {step.duration}
          </motion.div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

// Virtual Office Tour Component
function VirtualOfficeTour() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeSpot, setActiveSpot] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative"
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4">
          <Eye className="w-4 h-4" aria-hidden="true" />
          Virtual Preview
        </span>
        <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-foreground tracking-tight mb-4">
          Take a Virtual Tour
        </h2>
        <p className="text-foreground-secondary text-lg max-w-2xl mx-auto">
          Get familiar with our warm and welcoming space before your first visit
        </p>
      </motion.div>

      <motion.div
        variants={scaleIn}
        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#722F37]/10 group"
      >
        {/* Main Image */}
        <div className="relative aspect-[21/9]">
          <Image
            src="/images/patient-info/new-patients/friendly-dentist.jpg"
            alt="Friendly dentist in modern clinic at Ottawa South Dental"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />

          {/* Play Button Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl cursor-pointer"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
              role="button"
              aria-label="Play virtual tour video"
              tabIndex={0}
            >
              <Play className="w-10 h-10 text-[#722F37] ml-1" aria-hidden="true" />
            </motion.div>
          </motion.div>

          {/* Interactive Hotspots */}
          {virtualTourSpots.map((spot) => (
            <motion.button
              key={spot.id}
              className="absolute z-20"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onMouseEnter={() => setActiveSpot(spot.id)}
              onMouseLeave={() => setActiveSpot(null)}
              onFocus={() => setActiveSpot(spot.id)}
              onBlur={() => setActiveSpot(null)}
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: spot.id * 0.2, type: 'spring' }}
              aria-label={`${spot.title}: ${spot.description}`}
            >
              <motion.div
                className="relative"
                animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: spot.id * 0.3 }}
              >
                {/* Pulse Ring */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    aria-hidden="true"
                  />
                )}

                {/* Dot */}
                <div className="relative w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#722F37]" />
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {activeSpot === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap"
                      role="tooltip"
                    >
                      <div className="bg-white rounded-xl px-4 py-3 shadow-xl">
                        <p className="font-semibold text-foreground text-sm">{spot.title}</p>
                        <p className="text-xs text-foreground-secondary">{spot.description}</p>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-white rotate-45 -mt-1.5" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {virtualTourSpots.map((spot) => (
              <motion.button
                key={spot.id}
                onClick={() => setActiveSpot(activeSpot === spot.id ? null : spot.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeSpot === spot.id
                    ? 'bg-white text-[#722F37]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                  }
                `}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                {spot.title}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            1929 Russell Road, Suite 22
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Animated Forms Section with enhanced visuals
function FormsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredForm, setHoveredForm] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const forms = [
    { id: 'medical', title: 'Medical History', icon: ClipboardList, description: 'Your health information', color: '#ec4899' },
    { id: 'consent', title: 'Consent Forms', icon: FileCheck, description: 'Treatment agreements', color: '#8b5cf6' },
    { id: 'insurance', title: 'Insurance Info', icon: Shield, description: 'Coverage details', color: '#3b82f6' },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative"
    >
      <motion.div
        variants={fadeInUp}
        className="bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24] rounded-3xl p-10 md:p-14 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" aria-hidden="true" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <motion.div
              variants={slideInLeft}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Save Time
            </motion.div>
            <motion.h2
              variants={slideInLeft}
              className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mb-6"
            >
              Complete Forms Before Your Visit
            </motion.h2>
            <motion.p variants={slideInLeft} className="text-white/80 text-lg leading-relaxed mb-8">
              Download and complete your patient forms at home to save time during check-in. Contact us to receive the
              forms by email.
            </motion.p>

            {/* Illustration */}
            <motion.div variants={slideInLeft} className="mb-8 flex justify-center lg:justify-start">
              <ChecklistIllustration className="w-40 h-40 opacity-90" />
            </motion.div>

            <motion.div variants={slideInLeft} className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
                onClick={() => (window.location.href = '/contact')}
              >
                Request Forms
              </Button>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                (613) 733-6446
              </a>
            </motion.div>
          </div>

          {/* Form Cards */}
          <motion.div variants={slideInRight} className="grid gap-4">
            {forms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.15 + 0.3, duration: 0.6 }}
                onMouseEnter={() => setHoveredForm(form.id)}
                onMouseLeave={() => setHoveredForm(null)}
                className="group"
              >
                <motion.div
                  className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  whileHover={prefersReducedMotion ? {} : { x: 10, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${form.color}30` }}
                      animate={prefersReducedMotion ? {} : (hoveredForm === form.id ? { rotate: [0, -5, 5, 0] } : {})}
                      transition={{ duration: 0.5 }}
                    >
                      <form.icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg">{form.title}</h3>
                      <p className="text-white/60 text-sm">{form.description}</p>
                    </div>
                    <motion.div
                      animate={hoveredForm === form.id ? { x: 5 } : { x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" aria-hidden="true" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Why Choose Us Cards with Stats
function WhyChooseUsCard({ item, index }: { item: typeof whyChooseUs[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.1);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      style={prefersReducedMotion ? {} : { x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={(e) => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      <motion.div
        className="relative bg-white rounded-3xl p-8 border-2 border-[#EDE5DD] hover:border-[#722F37]/20 transition-all duration-500 overflow-hidden h-full"
        whileHover={prefersReducedMotion ? {} : { y: -8, boxShadow: '0 30px 60px -20px rgba(114, 47, 55, 0.2)' }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        {/* Stat Badge */}
        <motion.div
          className="absolute top-6 right-6"
          animate={prefersReducedMotion ? {} : (isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 })}
          transition={{ duration: 0.3 }}
        >
          <div className="text-right">
            <p className="text-3xl font-bold" style={{ color: item.color }}>{item.stat}</p>
            <p className="text-xs text-foreground-secondary">{item.statLabel}</p>
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
            boxShadow: `0 10px 30px -10px ${item.color}50`
          }}
          animate={prefersReducedMotion ? {} : (isHovered ? { rotate: [0, -5, 5, 0] } : {})}
          transition={{ duration: 0.5 }}
        >
          <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
        </motion.div>

        <h3 className="font-display font-semibold text-xl text-foreground mb-3 relative z-10">{item.title}</h3>
        <p className="text-foreground-secondary text-sm leading-relaxed relative z-10">{item.description}</p>
      </motion.div>
    </motion.div>
  );
}

// Animated FAQ Accordion with icons
function AnimatedFAQ({ items }: { items: typeof faqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="space-y-4"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          className="group"
        >
          <motion.div
            className={`
              rounded-2xl border-2 overflow-hidden transition-all duration-500
              ${openIndex === index
                ? 'border-[#722F37]/20 bg-gradient-to-br from-white to-[#FDF8F3]/50 shadow-lg shadow-[#722F37]/5'
                : 'border-[#EDE5DD] bg-white hover:border-[#722F37]/10'
              }
            `}
            layout
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-inset rounded-2xl"
              whileHover={prefersReducedMotion ? {} : { x: 4 }}
              aria-expanded={openIndex === index}
            >
              <div className="flex items-center gap-4 pr-4">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300
                  ${openIndex === index ? 'bg-[#722F37]/10' : 'bg-[#FDF8F3]'}
                `}>
                  <item.icon className={`w-5 h-5 transition-colors duration-300 ${openIndex === index ? 'text-[#722F37]' : 'text-foreground-secondary'}`} aria-hidden="true" />
                </div>
                <span
                  className={`font-semibold text-lg transition-colors duration-300 ${
                    openIndex === index ? 'text-[#722F37]' : 'text-foreground'
                  }`}
                >
                  {item.question}
                </span>
              </div>
              <motion.div
                className={`
                  flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                  ${openIndex === index
                    ? 'bg-[#722F37] text-white'
                    : 'bg-[#FDF8F3] text-[#722F37]'
                  }
                `}
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <div className="h-px bg-gradient-to-r from-[#722F37]/10 via-[#722F37]/20 to-[#722F37]/10 mb-4" aria-hidden="true" />
                    <p className="text-foreground-secondary leading-relaxed pl-14">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Policy Card with Animation
function PolicyCard({ policy, index }: { policy: typeof policies[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 border-2 border-[#EDE5DD] h-full hover:border-[#722F37]/20 transition-all duration-300"
        whileHover={prefersReducedMotion ? {} : { y: -4, boxShadow: '0 20px 40px -15px rgba(114, 47, 55, 0.1)' }}
      >
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${policy.color}15, ${policy.color}25)`,
          }}
          whileHover={prefersReducedMotion ? {} : { rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <policy.icon className="w-7 h-7" style={{ color: policy.color }} aria-hidden="true" />
        </motion.div>

        <h3 className="font-display font-semibold text-xl text-foreground mb-5">{policy.title}</h3>

        <ul className="space-y-4">
          {policy.items.map((item, itemIndex) => (
            <motion.li
              key={itemIndex}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.15 + itemIndex * 0.1 + 0.3 }}
              className="flex items-start gap-3"
            >
              <div
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${policy.color}15` }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: policy.color }} aria-hidden="true" />
              </div>
              <span className="text-foreground-secondary text-sm leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function NewPatientsContent() {
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const prefersReducedMotion = useReducedMotion();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const progressPercentage = (checkedItems.size / requiredDocuments.length) * 100;

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
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#722F37]/5"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary-100/40"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#722F37]/3"
            animate={prefersReducedMotion ? {} : { y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating Decorative Icons */}
          {!prefersReducedMotion && [Heart, Star, Smile, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-[#722F37]/10"
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Icon className="w-8 h-8" />
            </motion.div>
          ))}
        </div>

        <motion.div
          style={prefersReducedMotion ? {} : { y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <WelcomeBanner />

              <motion.div variants={fadeInUp} className="mb-6">
                <motion.span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm text-[#722F37] text-sm font-medium shadow-lg shadow-[#722F37]/5 border border-[#722F37]/10"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <motion.div
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <UserPlus className="w-4 h-4" aria-hidden="true" />
                  </motion.div>
                  Welcome New Patients
                </motion.span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-display font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1]"
              >
                Your First Visit
                <motion.span
                  className="block text-[#722F37]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Made Simple
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-8 text-xl text-foreground-secondary max-w-xl leading-relaxed"
              >
                We are excited to welcome you to our dental family! Here is everything you need to know to prepare for your first appointment with us.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.03 }} whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}>
                  <Link href="/contact#book">
                    <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                      Book Your First Visit
                    </Button>
                  </Link>
                </motion.div>
                <motion.a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white text-[#722F37] border-2 border-[#EDE5DD] hover:border-[#722F37]/30 hover:bg-[#FDF8F3] transition-all duration-200 shadow-lg shadow-[#722F37]/5"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {formattedPhone}
                </motion.a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-6">
                {[
                  { icon: BadgeCheck, label: 'CDCP Accepted' },
                  { icon: CheckCircle2, label: 'Direct Insurance Billing' },
                  { icon: Languages, label: '7 Languages Spoken' },
                ].map((item, i) => (
                  <motion.span
                    key={i}
                    className="inline-flex items-center gap-2 text-sm text-foreground-secondary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <item.icon className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                    {item.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image with Floating Elements */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInRight}
              className="relative"
            >
              <motion.div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#722F37]/20"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/patient-info/new-patients/hero-welcome.jpg"
                  alt="Dentist and patient discussing treatment plan using a tablet in a modern clinic setting"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" aria-hidden="true" />
              </motion.div>

              {/* Welcome Illustration Badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl shadow-[#722F37]/15 border border-[#EDE5DD]"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.6, type: 'spring', stiffness: 150 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
              >
                <div className="flex items-center gap-4">
                  <WelcomeIllustration className="w-16 h-16" />
                  <div>
                    <p className="font-bold text-2xl text-[#722F37]">20+</p>
                    <p className="text-sm text-foreground-secondary">Years Serving Ottawa</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge - Languages */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-xl shadow-[#722F37]/10 border border-[#EDE5DD]"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5, y: -30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.8, type: 'spring', stiffness: 150 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              >
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                  <span className="font-semibold text-foreground">7 Languages</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* Journey Illustration Banner */}
      <section className="py-8 bg-white border-b border-[#EDE5DD]" aria-hidden="true">
        <div className="max-w-4xl mx-auto px-4">
          <JourneyIllustration className="w-full h-auto" />
        </div>
      </section>

      {/* Preparation Checklist Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4"
            >
              <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
              Preparation Checklist
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-foreground tracking-tight mb-4"
            >
              What to Bring
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground-secondary text-lg max-w-2xl mx-auto">
              Check off each item as you prepare for your visit
            </motion.p>

            {/* Progress Bar */}
            <motion.div variants={fadeInUp} className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground-secondary">Your Progress</span>
                <span className="text-sm font-bold text-[#722F37]">{checkedItems.size}/{requiredDocuments.length} Complete</span>
              </div>
              <div className="h-3 bg-[#EDE5DD] rounded-full overflow-hidden" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
                <motion.div
                  className="h-full bg-gradient-to-r from-[#722F37] to-[#5a252c] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              {progressPercentage === 100 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-green-600 font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  All set! You are ready for your visit.
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {requiredDocuments.map((doc, index) => (
              <ChecklistItem
                key={index}
                doc={doc}
                index={index}
                isChecked={checkedItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-24 md:py-32 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FormsSection />
        </div>
      </section>

      {/* Journey Map Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23722F37' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Your Journey
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-foreground tracking-tight mb-4"
            >
              Your First Appointment
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground-secondary text-lg max-w-2xl mx-auto mb-8">
              Click each step to explore what happens during your visit
            </motion.p>

            {/* Total Duration */}
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#722F37]/5 border border-[#722F37]/10"
            >
              <Clock className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
              <span className="text-foreground-secondary">Total Duration:</span>
              <span className="font-bold text-[#722F37]">60-90 minutes</span>
            </motion.div>
          </motion.div>

          {/* Journey Steps - Horizontal on Desktop */}
          <div className="grid lg:grid-cols-5 gap-6">
            {firstVisitSteps.map((step, index) => (
              <JourneyStep
                key={index}
                step={step}
                index={index}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            ))}
          </div>

          {/* Plan Ahead Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5, duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-[#722F37]/5 via-[#722F37]/10 to-[#722F37]/5 rounded-3xl p-8 border border-[#722F37]/10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center"
                  animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <AlertCircle className="w-8 h-8 text-[#722F37]" aria-hidden="true" />
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <p className="font-semibold text-xl text-foreground mb-2">Plan Ahead</p>
                  <p className="text-foreground-secondary">
                    Your first appointment typically lasts 60-90 minutes. Please plan accordingly and arrive 15 minutes early to complete any remaining paperwork.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Virtual Office Tour Section */}
      <section className="py-24 md:py-32 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VirtualOfficeTour />
        </div>
      </section>

      {/* Office Policies Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4"
            >
              <Shield className="w-4 h-4" aria-hidden="true" />
              Good to Know
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-foreground tracking-tight mb-4"
            >
              Office Policies
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground-secondary text-lg max-w-2xl mx-auto">
              Understanding our policies helps ensure a smooth experience for all patients
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <PolicyCard key={index} policy={policy} index={index} />
            ))}
          </div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3, duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24] rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" aria-hidden="true" />

              <motion.h3
                className="relative font-display font-semibold text-2xl text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Payment Methods Accepted
              </motion.h3>
              <p className="relative text-white/80 max-w-2xl mx-auto mb-8">
                We offer flexible payment options to make dental care accessible for everyone.
              </p>
              <div className="relative flex flex-wrap justify-center gap-4">
                {['Interac / Debit', 'Visa', 'MasterCard', 'American Express', 'Cash'].map((method, i) => (
                  <motion.span
                    key={method}
                    className="px-5 py-2.5 bg-white/10 text-white rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    {method}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4"
            >
              <Star className="w-4 h-4" aria-hidden="true" />
              Our Promise
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-foreground tracking-tight mb-4"
            >
              Why Choose Us
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground-secondary text-lg max-w-2xl mx-auto">
              Discover what makes Ottawa South Dental the right choice for your family
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <WhyChooseUsCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Have Questions?
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-foreground tracking-tight mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground-secondary text-lg max-w-2xl mx-auto">
              Find answers to common questions from new patients
            </motion.p>
          </motion.div>

          <AnimatedFAQ items={faqs} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-foreground-secondary mb-4">Still have questions? We're happy to help.</p>
            <motion.a
              href={`tel:${contactInfo.phone}`}
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Call us at {formattedPhone}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Location Quick Info */}
      <section className="py-16 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border-2 border-[#EDE5DD] shadow-lg"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: 'Our Location',
                  content: `${contactInfo.address.street}, ${contactInfo.address.city}, ${contactInfo.address.province}`,
                  color: '#ec4899',
                },
                {
                  icon: Clock,
                  title: 'Office Hours',
                  content: 'Mon-Fri: 8am-5pm',
                  color: '#3b82f6',
                },
                {
                  icon: Building2,
                  title: 'Free Parking',
                  content: 'Convenient on-site parking available',
                  color: '#14b8a6',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                    whileHover={prefersReducedMotion ? {} : { rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} aria-hidden="true" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-foreground-secondary">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], rotate: [0, -45, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              Join Our Dental Family
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6"
            >
              Ready to Get Started?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-white/80 text-xl max-w-2xl mx-auto mb-10"
            >
              We are excited to meet you! Book your first appointment today and experience the warm, welcoming care that Ottawa South Dental is known for.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}>
                <Link href="/contact#book">
                  <Button variant="secondary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                    Book Your First Visit
                  </Button>
                </Link>
              </motion.div>
              <motion.a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 transition-all duration-200"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {formattedPhone}
              </motion.a>
            </motion.div>

            {/* Emergency Notice */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 border border-white/20"
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="w-5 h-5 text-white" aria-hidden="true" />
              </motion.div>
              <span className="text-white/90">Same-day emergency appointments available</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
