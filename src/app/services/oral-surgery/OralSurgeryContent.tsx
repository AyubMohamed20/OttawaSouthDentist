'use client';

import { useState, useRef, useCallback } from 'react';
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
  GraduationCap,
  Timer,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Info,
  CircleDot,
  Gauge,
  Waves,
  HeartPulse,
  Bone,
  BriefcaseMedical,
  ShieldCheck,
  HandHeart,
  Users,
  Star,
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
      "Extractions are performed with local anesthesia so you won't feel pain during the procedure. You may feel some pressure, but no sharp pain. Some discomfort is normal during healing but is easily manageable with over-the-counter or prescribed pain medication. We'll provide detailed aftercare instructions to ensure a comfortable recovery.",
  },
  {
    question: 'How long is recovery after wisdom teeth removal?',
    answer:
      'Most patients recover within a few days to a week after wisdom teeth removal. The first 2-3 days typically involve the most swelling and discomfort, which gradually improves. Following post-operative instructions—including rest, ice application, and soft foods—helps ensure smooth healing. Most people return to normal activities within a week.',
  },
  {
    question: 'What should I eat after oral surgery?',
    answer:
      'Soft foods are recommended for the first few days after oral surgery. Good options include yogurt, smoothies, mashed potatoes, soup (not too hot), scrambled eggs, and applesauce. Avoid hard, crunchy, or spicy foods that could irritate the surgical site. Stay hydrated but avoid using straws, as the suction can dislodge blood clots.',
  },
  {
    question: 'When do wisdom teeth need to be removed?',
    answer:
      'Wisdom teeth often need removal when they are impacted (unable to emerge properly), causing crowding or damage to adjacent teeth, partially erupted and prone to infection, or causing pain and discomfort. We use X-rays and examination to determine if your wisdom teeth require removal and discuss the best timing for the procedure.',
  },
  {
    question: 'What is bone grafting and when is it needed?',
    answer:
      'Bone grafting is a procedure that rebuilds jawbone that has been lost due to tooth extraction, gum disease, or injury. It\'s often needed before dental implant placement to ensure there\'s enough bone to support the implant. The graft material encourages your body to regenerate natural bone, creating a strong foundation for future restoration.',
  },
];

const surgeryTypes = [
  {
    id: 'simple',
    title: 'Simple Extractions',
    shortTitle: 'Simple',
    description: 'Removal of visible teeth that are damaged, decayed, or need to come out for orthodontic treatment.',
    details: [
      'Minimally invasive procedure',
      'Local anesthesia only',
      'Quick recovery time',
      'Same-day procedure'
    ],
    duration: '15-30 min',
    recovery: '1-2 days',
    icon: CircleCheckBig,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    id: 'surgical',
    title: 'Surgical Extractions',
    shortTitle: 'Surgical',
    description: 'Removal of teeth that are broken at the gum line or haven\'t fully emerged, requiring incision access.',
    details: [
      'Incision required',
      'May need bone removal',
      'Sutures often needed',
      'Comprehensive care'
    ],
    duration: '30-60 min',
    recovery: '3-5 days',
    icon: Stethoscope,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 'wisdom',
    title: 'Wisdom Teeth Removal',
    shortTitle: 'Wisdom',
    description: 'Specialized extraction of impacted or problematic wisdom teeth to prevent pain and complications.',
    details: [
      'Expert impaction handling',
      'Sedation options available',
      'All four at once possible',
      'Prevent future issues'
    ],
    duration: '45-90 min',
    recovery: '5-7 days',
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    id: 'grafting',
    title: 'Bone Grafting',
    shortTitle: 'Grafting',
    description: 'Rebuilding jawbone structure to prepare for dental implants or restore facial support.',
    details: [
      'Multiple graft materials',
      'Prepares for implants',
      'Preserves facial structure',
      'Long-term benefits'
    ],
    duration: '60-120 min',
    recovery: '2-4 weeks',
    icon: Bone,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
  },
  {
    id: 'soft-tissue',
    title: 'Soft Tissue Procedures',
    shortTitle: 'Soft Tissue',
    description: 'Biopsies, lesion removal, and other soft tissue treatments for diagnosis and treatment.',
    details: [
      'Diagnostic biopsies',
      'Lesion removal',
      'Tissue reshaping',
      'Precision technique'
    ],
    duration: '30-60 min',
    recovery: '3-7 days',
    icon: Activity,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    id: 'pre-prosthetic',
    title: 'Pre-Prosthetic Surgery',
    shortTitle: 'Pre-Prosthetic',
    description: 'Preparing the mouth for dentures or other prosthetics by reshaping bone or removing excess tissue.',
    details: [
      'Bone smoothing',
      'Tissue reduction',
      'Ridge preparation',
      'Better prosthetic fit'
    ],
    duration: '45-90 min',
    recovery: '1-2 weeks',
    icon: Award,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
];

const sedationOptions = [
  {
    title: 'Local Anesthesia',
    description: 'Numbs only the treatment area while you remain fully conscious',
    icon: Syringe,
    level: 1,
    suitable: ['Simple extractions', 'Minor procedures', 'Patients with no anxiety'],
    features: ['Quick onset', 'Fast recovery', 'Drive yourself home'],
  },
  {
    title: 'Nitrous Oxide',
    description: 'Laughing gas that creates a relaxed, euphoric state during treatment',
    icon: Waves,
    level: 2,
    suitable: ['Mild to moderate anxiety', 'Longer procedures', 'Most patients'],
    features: ['Wears off quickly', 'Adjustable levels', 'Safe for all ages'],
  },
  {
    title: 'Oral Sedation',
    description: 'Prescription medication taken before your appointment for deeper relaxation',
    icon: Pill,
    level: 3,
    suitable: ['Moderate anxiety', 'Complex procedures', 'Dental phobia'],
    features: ['Deep relaxation', 'Little memory of procedure', 'Requires driver'],
  },
  {
    title: 'IV Sedation',
    description: 'Intravenous medication for the deepest level of relaxation while remaining conscious',
    icon: Droplets,
    level: 4,
    suitable: ['Severe anxiety', 'Multiple extractions', 'Extensive surgery'],
    features: ['Immediate effect', 'Fully adjustable', 'Maximum comfort'],
  },
];

const recoveryTimeline = [
  {
    day: 'Day 0',
    title: 'Surgery Day',
    description: 'Rest with head elevated. Apply ice 20 min on/off.',
    tips: ['Bite on gauze for 30-45 min', 'Take prescribed medications', 'Only liquids and soft foods'],
    icon: BedDouble,
    color: 'from-red-500 to-red-600',
  },
  {
    day: 'Day 1-2',
    title: 'Initial Healing',
    description: 'Maximum swelling expected. Continue rest and cold therapy.',
    tips: ['Continue ice therapy', 'Rinse gently with salt water', 'Soft foods only'],
    icon: ThermometerSnowflake,
    color: 'from-orange-500 to-orange-600',
  },
  {
    day: 'Day 3-4',
    title: 'Swelling Peak',
    description: 'Swelling begins to subside. Switch from cold to warm compresses.',
    tips: ['Switch to warm compresses', 'Gentle mouth opening exercises', 'Continue soft foods'],
    icon: HeartPulse,
    color: 'from-amber-500 to-amber-600',
  },
  {
    day: 'Day 5-7',
    title: 'Significant Improvement',
    description: 'Most discomfort resolved. Can gradually return to normal diet.',
    tips: ['Resume normal brushing carefully', 'Avoid surgical site', 'Return to light activities'],
    icon: Utensils,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    day: 'Week 2+',
    title: 'Full Recovery',
    description: 'Surgical site continues healing. Sutures dissolve or are removed.',
    tips: ['Follow-up appointment', 'Full diet resumed', 'Normal activities'],
    icon: Sparkles,
    color: 'from-green-500 to-green-600',
  },
];

const preOpInstructions = [
  {
    title: 'Before Your Procedure',
    icon: Calendar,
    items: [
      'Arrange for someone to drive you home',
      'Wear comfortable, loose-fitting clothing',
      'Remove contact lenses and jewelry',
      'Do not eat or drink 8 hours before if sedation planned',
      'Take prescribed pre-medications as directed',
    ],
  },
  {
    title: 'Medications',
    icon: Pill,
    items: [
      'Inform us of all medications you take',
      'Continue blood pressure medications',
      'Stop blood thinners only if directed',
      'Avoid aspirin 1 week before surgery',
      'Bring list of allergies to appointment',
    ],
  },
  {
    title: 'Health Preparation',
    icon: Heart,
    items: [
      'Get adequate rest the night before',
      'Avoid alcohol 24 hours before surgery',
      'Stop smoking at least 48 hours before',
      'Report any illness or fever immediately',
      'Brush teeth morning of procedure (no swallowing)',
    ],
  },
];

const postOpInstructions = [
  {
    category: 'Do',
    icon: Check,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    items: [
      { text: 'Rest with head elevated', icon: BedDouble },
      { text: 'Apply ice packs 20 min on/off', icon: ThermometerSnowflake },
      { text: 'Take medications as prescribed', icon: Pill },
      { text: 'Eat soft, cool foods', icon: Utensils },
      { text: 'Rinse gently with salt water after 24h', icon: Droplets },
    ],
  },
  {
    category: 'Don\'t',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    items: [
      { text: 'Use straws for 1 week', icon: Droplets },
      { text: 'Smoke or use tobacco', icon: Cigarette },
      { text: 'Touch or probe the surgery site', icon: Activity },
      { text: 'Eat hard, crunchy, or spicy foods', icon: Utensils },
      { text: 'Skip follow-up appointments', icon: Calendar },
    ],
  },
];

const teamCredentials = [
  { label: 'Years Experience', value: '25+', icon: Clock },
  { label: 'Procedures Performed', value: '10,000+', icon: Award },
  { label: 'Patient Satisfaction', value: '98%', icon: Heart },
  { label: 'Continuing Education', value: '100+ hrs/yr', icon: GraduationCap },
];

// ============================================================================
// SVG ILLUSTRATIONS - Flat Design Dental-Themed
// ============================================================================

// Tooth extraction illustration
function ToothExtractionSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="55" fill="#FDF8F3" />

      {/* Tooth shape - molar style */}
      <path
        d="M45 35C42 35 38 38 38 45V55C38 65 42 75 45 80C47 83 50 85 55 85H65C70 85 73 83 75 80C78 75 82 65 82 55V45C82 38 78 35 75 35H45Z"
        fill="white"
        stroke="#722F37"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tooth roots */}
      <path
        d="M48 85V95C48 98 50 100 52 100"
        stroke="#722F37"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 85V98C60 100 60 102 60 102"
        stroke="#722F37"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M72 85V95C72 98 70 100 68 100"
        stroke="#722F37"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Crown detail lines */}
      <path
        d="M50 55H70"
        stroke="#EDE5DD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M52 65H68"
        stroke="#EDE5DD"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Extraction arrow indicator */}
      <motion.g
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M60 20V30"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M55 25L60 20L65 25"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Sparkle effects */}
      <circle cx="92" cy="35" r="3" fill="#722F37" opacity="0.3" />
      <circle cx="28" cy="45" r="2" fill="#722F37" opacity="0.2" />
      <circle cx="95" cy="70" r="2.5" fill="#10B981" opacity="0.4" />
    </svg>
  );
}

// Bone grafting illustration
function BoneGraftingSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      {/* Background */}
      <circle cx="60" cy="60" r="55" fill="#FDF8F3" />

      {/* Jawbone base */}
      <path
        d="M25 70C25 55 35 45 60 45C85 45 95 55 95 70V85C95 90 90 95 85 95H35C30 95 25 90 25 85V70Z"
        fill="#F5EDE5"
        stroke="#722F37"
        strokeWidth="2"
      />

      {/* Bone graft area highlight */}
      <motion.path
        d="M50 55C50 50 55 48 60 48C65 48 70 50 70 55V70H50V55Z"
        fill="#10B981"
        opacity="0.3"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Graft particles */}
      <motion.g
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="55" cy="58" r="3" fill="#10B981" opacity="0.6" />
        <circle cx="65" cy="60" r="2.5" fill="#10B981" opacity="0.5" />
        <circle cx="58" cy="64" r="2" fill="#10B981" opacity="0.7" />
        <circle cx="62" cy="56" r="2" fill="#10B981" opacity="0.5" />
        <circle cx="60" cy="62" r="2.5" fill="#10B981" opacity="0.6" />
      </motion.g>

      {/* Bone texture lines */}
      <path d="M35 75H45" stroke="#EDE5DD" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M75 75H85" stroke="#EDE5DD" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 82H50" stroke="#EDE5DD" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M70 82H80" stroke="#EDE5DD" strokeWidth="1.5" strokeLinecap="round" />

      {/* Growth indicator arrows */}
      <motion.g
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path
          d="M60 35V42"
          stroke="#722F37"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M56 38L60 35L64 38"
          stroke="#722F37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Plus signs for regeneration */}
      <g fill="#10B981" opacity="0.6">
        <path d="M30 40H34M32 38V42" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M86 40H90M88 38V42" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Wisdom tooth illustration
function WisdomToothSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      {/* Background */}
      <circle cx="60" cy="60" r="55" fill="#FDF8F3" />

      {/* Gum line */}
      <path
        d="M20 55C20 55 35 50 60 50C85 50 100 55 100 55V75C100 80 95 85 90 85H30C25 85 20 80 20 75V55Z"
        fill="#F8D7DA"
        stroke="#722F37"
        strokeWidth="1.5"
      />

      {/* Regular teeth */}
      <rect x="30" y="55" width="12" height="25" rx="3" fill="white" stroke="#722F37" strokeWidth="1.5" />
      <rect x="45" y="55" width="12" height="25" rx="3" fill="white" stroke="#722F37" strokeWidth="1.5" />
      <rect x="60" y="55" width="12" height="25" rx="3" fill="white" stroke="#722F37" strokeWidth="1.5" />

      {/* Impacted wisdom tooth (tilted) */}
      <motion.g
        animate={{ rotate: [-5, 0, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ originX: '82px', originY: '67px' }}
      >
        <rect
          x="75"
          y="58"
          width="12"
          height="22"
          rx="3"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
          transform="rotate(15 81 69)"
        />
      </motion.g>

      {/* Alert indicator */}
      <motion.circle
        cx="88"
        cy="45"
        r="8"
        fill="#F59E0B"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <text x="88" y="49" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">!</text>

      {/* Pain indication lines */}
      <motion.g
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <path d="M92 60L98 55" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M94 68L100 68" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M92 76L98 81" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

// Recovery healing illustration
function RecoveryHealingSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      {/* Background */}
      <circle cx="60" cy="60" r="55" fill="#FDF8F3" />

      {/* Heart shape for care */}
      <motion.path
        d="M60 90C60 90 25 65 25 45C25 30 40 25 60 45C80 25 95 30 95 45C95 65 60 90 60 90Z"
        fill="#FEE2E2"
        stroke="#722F37"
        strokeWidth="2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ originX: '60px', originY: '60px' }}
      />

      {/* Healing cross/plus inside heart */}
      <g fill="#10B981">
        <rect x="55" y="45" width="10" height="30" rx="2" />
        <rect x="45" y="55" width="30" height="10" rx="2" />
      </g>

      {/* Sparkle effects for healing */}
      <motion.g
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="35" cy="35" r="3" fill="#10B981" />
        <circle cx="85" cy="35" r="2.5" fill="#10B981" />
        <circle cx="25" cy="60" r="2" fill="#722F37" opacity="0.5" />
        <circle cx="95" cy="60" r="2" fill="#722F37" opacity="0.5" />
      </motion.g>

      {/* Progress arc */}
      <motion.path
        d="M30 95A45 45 0 0 1 90 95"
        fill="none"
        stroke="#10B981"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  );
}

// Sedation comfort illustration
function SedationComfortSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      {/* Background */}
      <circle cx="60" cy="60" r="55" fill="#FDF8F3" />

      {/* Face outline - relaxed patient */}
      <circle cx="60" cy="55" r="30" fill="#FEF3C7" stroke="#722F37" strokeWidth="2" />

      {/* Closed relaxed eyes */}
      <path d="M45 50C45 50 50 48 55 50" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />
      <path d="M65 50C65 50 70 48 75 50" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />

      {/* Peaceful smile */}
      <path d="M50 65C50 65 55 70 60 70C65 70 70 65 70 65" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />

      {/* Z's for sleep/relaxation */}
      <motion.g
        animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <text x="85" y="40" fill="#722F37" fontSize="14" fontWeight="bold" opacity="0.6">z</text>
      </motion.g>
      <motion.g
        animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <text x="92" y="32" fill="#722F37" fontSize="12" fontWeight="bold" opacity="0.4">z</text>
      </motion.g>
      <motion.g
        animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <text x="98" y="25" fill="#722F37" fontSize="10" fontWeight="bold" opacity="0.3">z</text>
      </motion.g>

      {/* Cloud/comfort waves */}
      <motion.ellipse
        cx="60"
        cy="95"
        rx="35"
        ry="12"
        fill="#E0E7FF"
        opacity="0.5"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Stars for comfort */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ originX: '60px', originY: '55px' }}
      >
        <circle cx="25" cy="45" r="2" fill="#A78BFA" />
        <circle cx="95" cy="50" r="2.5" fill="#A78BFA" />
        <circle cx="30" cy="75" r="1.5" fill="#A78BFA" />
      </motion.g>
    </svg>
  );
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

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

// ============================================================================
// MAGNETIC EFFECT HOOK
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

// ============================================================================
// HERO SECTION - Enhanced with new imagery
// ============================================================================

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const magnetic = useMagnetic(0.15);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]"
          style={{ y: prefersReducedMotion ? 0 : y }}
        />

        {/* Floating orbs with clinical-yet-warm aesthetic */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(114,47,55,0.1) 0%, transparent 70%)',
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
              }}
              animate={{
                y: [20, -20, 20],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {/* Subtle medical cross pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M27 27h6v-6h-6v6zm0 6h6v6h-6v-6zm6 0h6v-6h-6v6zm-12 0h6v-6h-6v6z' fill='%23722F37' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
      </div>

      <motion.div style={{ opacity, scale: prefersReducedMotion ? 1 : scale }} className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
                aria-label="Breadcrumb"
              >
                <ol className="flex items-center gap-2 text-sm">
                  <li>
                    <Link href="/" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-neutral-300" aria-hidden="true">/</li>
                  <li>
                    <Link href="/services" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                      Services
                    </Link>
                  </li>
                  <li className="text-neutral-300" aria-hidden="true">/</li>
                  <li className="text-[#722F37] font-medium" aria-current="page">Oral Surgery</li>
                </ol>
              </motion.nav>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span className="text-sm font-medium text-emerald-700">
                  Safe, Gentle & Experienced Care
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1e293b] tracking-tight leading-[1.1] mb-6"
              >
                Oral{' '}
                <span className="relative">
                  <span className="relative z-10 text-[#722F37]">Surgery</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-[#722F37]/10 -skew-x-3 rounded"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    aria-hidden="true"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-xl"
              >
                Expert surgical dental care with your comfort as our priority.
                From wisdom teeth to bone grafting, our experienced team ensures
                safe, gentle procedures and comprehensive recovery support.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  style={{ x: magnetic.x, y: magnetic.y }}
                  onMouseMove={magnetic.handleMouseMove}
                  onMouseLeave={magnetic.handleMouseLeave}
                >
                  <Link
                    href="/contact#book"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-[#722F37]/25 focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.6 }}
                      aria-hidden="true"
                    />
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                    <span className="relative">Book Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </motion.div>

                <a
                  href="tel:+16137336446"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl border-2 border-[#722F37]/20 hover:border-[#722F37]/40 hover:bg-[#FDF8F3] transition-all focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  (613) 733-6446
                </a>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 grid grid-cols-3 gap-6"
              >
                {[
                  { label: 'Procedures', value: '10K+', icon: BriefcaseMedical },
                  { label: 'Success Rate', value: '98%', icon: Star },
                  { label: 'Years Exp.', value: '25+', icon: Award },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-[#722F37]/60" aria-hidden="true" />
                        <p className="text-2xl font-bold text-[#722F37]">{stat.value}</p>
                      </div>
                      <p className="text-sm text-neutral-500">{stat.label}</p>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Hero Image with floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image - using new Pexels image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 aspect-[4/3]">
                <Image
                  src="/images/services/oral-surgery/hero-dental-surgery.jpg"
                  alt="Dental surgeons performing a procedure in a modern clinical setting"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
              </div>

              {/* Floating safety card */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-emerald-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e293b]">Safe & Sterile</p>
                    <p className="text-sm text-neutral-500">Hospital-grade protocols</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating comfort card */}
              <motion.div
                initial={{ opacity: 0, y: -20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Pill className="w-5 h-5 text-purple-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e293b]">Sedation Options</p>
                    <p className="text-xs text-neutral-500">Maximum comfort</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// PROCEDURE TYPE SHOWCASE - Enhanced with illustrations
// ============================================================================

function ProcedureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const currentSurgery = surgeryTypes[activeIndex]!;

  // Get appropriate illustration based on procedure type
  const getIllustration = (procedureId: string) => {
    switch (procedureId) {
      case 'simple':
      case 'surgical':
        return <ToothExtractionSVG className="w-full h-full max-w-[200px]" />;
      case 'wisdom':
        return <WisdomToothSVG className="w-full h-full max-w-[200px]" />;
      case 'grafting':
        return <BoneGraftingSVG className="w-full h-full max-w-[200px]" />;
      default:
        return <RecoveryHealingSVG className="w-full h-full max-w-[200px]" />;
    }
  };

  return (
    <div ref={containerRef}>
      {/* Procedure Type Selector - Carousel Style */}
      <div className="relative mb-12">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide" role="tablist" aria-label="Procedure types">
          {surgeryTypes.map((type, index) => {
            const Icon = type.icon;
            const isActive = index === activeIndex;

            return (
              <motion.button
                key={type.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`procedure-panel-${type.id}`}
                id={`procedure-tab-${type.id}`}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.08 }}
                className={`relative flex-shrink-0 px-6 py-4 rounded-2xl border-2 transition-all duration-300 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2 ${
                  isActive
                    ? 'border-[#722F37] bg-white shadow-lg shadow-[#722F37]/10'
                    : 'border-neutral-200 bg-white hover:border-[#722F37]/30'
                }`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProcedure"
                    className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent rounded-2xl"
                    transition={{ type: 'spring', bounce: 0.2 }}
                    aria-hidden="true"
                  />
                )}

                <div className="relative flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-[#722F37]' : 'text-neutral-700'}`}>
                    {type.shortTitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active Procedure Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          id={`procedure-panel-${currentSurgery.id}`}
          role="tabpanel"
          aria-labelledby={`procedure-tab-${currentSurgery.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm"
        >
          <div className="grid lg:grid-cols-2">
            {/* Info Side */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentSurgery.color} flex items-center justify-center shadow-lg`}>
                  {(() => {
                    const Icon = currentSurgery.icon;
                    return <Icon className="w-8 h-8 text-white" aria-hidden="true" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1e293b]">
                    {currentSurgery.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-sm text-neutral-500">
                      <Timer className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">Duration:</span>
                      {currentSurgery.duration}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-neutral-500">
                      <Activity className="w-4 h-4" aria-hidden="true" />
                      Recovery: {currentSurgery.recovery}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-8">
                {currentSurgery.description}
              </p>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#1e293b] uppercase tracking-wide">
                  Key Features
                </p>
                <ul className="space-y-3">
                  {currentSurgery.details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full ${currentSurgery.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Check className={`w-3.5 h-3.5 ${currentSurgery.textColor}`} aria-hidden="true" />
                      </div>
                      <span className="text-sm text-neutral-700">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100">
                <Link
                  href="/contact#book"
                  className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:gap-3 transition-all focus:outline-none focus:underline"
                >
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Visual Side - Now with SVG illustrations */}
            <div className="relative h-80 lg:h-auto bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {/* SVG Illustration */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.5 }}
                  className="relative flex items-center justify-center"
                >
                  {getIllustration(currentSurgery.id)}
                </motion.div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-3 flex-wrap">
                  <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                    <span className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                      <Timer className="w-4 h-4" aria-hidden="true" />
                      {currentSurgery.duration}
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                    <span className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                      <Activity className="w-4 h-4" aria-hidden="true" />
                      {currentSurgery.recovery} recovery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Procedure navigation">
        {surgeryTypes.map((type, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`View ${type.title}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2 ${
              index === activeIndex ? 'w-8 bg-[#722F37]' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SEDATION OPTIONS DISPLAY - Enhanced with comfort illustration
// ============================================================================

function SedationOptions() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const currentSedation = sedationOptions[selectedLevel]!;

  return (
    <div ref={containerRef}>
      {/* Sedation Level Meter */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-neutral-500">Light Sedation</span>
          <span className="text-sm font-medium text-neutral-500">Deep Sedation</span>
        </div>

        <div className="relative h-3 bg-neutral-100 rounded-full overflow-hidden" role="slider" aria-label="Sedation level" aria-valuemin={1} aria-valuemax={4} aria-valuenow={selectedLevel + 1}>
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: isInView ? '100%' : '0%' }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 1.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          {/* Level indicators */}
          {sedationOptions.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedLevel(index)}
              aria-label={`Select ${option.title}`}
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2 ${
                selectedLevel === index
                  ? 'bg-white border-[#722F37] scale-125 z-10 shadow-lg'
                  : 'bg-white border-neutral-300 hover:border-[#722F37]/50'
              }`}
              style={{ left: `${(index / (sedationOptions.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Selected Option Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedLevel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm"
        >
          <div className="grid lg:grid-cols-3">
            {/* Main info */}
            <div className="lg:col-span-2 p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center"
                  animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {(() => {
                    const Icon = currentSedation.icon;
                    return <Icon className="w-8 h-8 text-[#722F37]" aria-hidden="true" />;
                  })()}
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-[#1e293b]">
                      {currentSedation.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold">
                      Level {currentSedation.level}
                    </span>
                  </div>
                  <p className="text-neutral-600">{currentSedation.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-[#1e293b] uppercase tracking-wide mb-3">
                    Best Suited For
                  </p>
                  <ul className="space-y-2">
                    {currentSedation.suitable.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-neutral-600"
                      >
                        <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#1e293b] uppercase tracking-wide mb-3">
                    Key Features
                  </p>
                  <ul className="space-y-2">
                    {currentSedation.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-neutral-600"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sedation level visualization - with SVG illustration */}
            <div className="relative bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5] p-8 flex items-center justify-center">
              <SedationComfortSVG className="w-full h-full max-w-[180px]" />

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-sm font-medium text-neutral-600">
                  Sedation Level: <span className="text-[#722F37] font-bold">{selectedLevel + 1}/4</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* All options grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {sedationOptions.map((option, index) => {
          const Icon = option.icon;
          const isSelected = index === selectedLevel;

          return (
            <motion.button
              key={index}
              onClick={() => setSelectedLevel(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2 ${
                isSelected
                  ? 'border-[#722F37] bg-[#722F37]/5'
                  : 'border-neutral-200 bg-white hover:border-[#722F37]/30'
              }`}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-[#722F37]' : 'text-neutral-400'}`} aria-hidden="true" />
                <span className={`text-sm font-medium ${isSelected ? 'text-[#722F37]' : 'text-neutral-600'}`}>
                  {option.title}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// RECOVERY TIMELINE ANIMATION - Enhanced with illustration
// ============================================================================

function RecoveryTimeline() {
  const [activeDay, setActiveDay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const currentRecovery = recoveryTimeline[activeDay]!;

  // Auto-play functionality
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPlayback = () => {
    if (prefersReducedMotion) {
      // Just cycle through without animation
      setActiveDay((prev) => (prev + 1) % recoveryTimeline.length);
      return;
    }
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setActiveDay((prev) => {
        if (prev >= recoveryTimeline.length - 1) {
          setIsPlaying(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev + 1;
      });
    }, 2500);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div ref={containerRef}>
      {/* Timeline Navigation */}
      <div className="relative mb-12">
        {/* Timeline line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full" aria-hidden="true" />
        <motion.div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-green-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{
            width: isInView ? `${(activeDay / (recoveryTimeline.length - 1)) * 100}%` : '0%',
          }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        {/* Day markers */}
        <div className="relative flex justify-between" role="tablist" aria-label="Recovery timeline days">
          {recoveryTimeline.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeDay;
            const isPast = index < activeDay;

            return (
              <motion.button
                key={index}
                role="tab"
                aria-selected={isActive}
                aria-label={`${item.day}: ${item.title}`}
                onClick={() => { stopPlayback(); setActiveDay(index); }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                className="relative flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2 rounded-full"
              >
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${item.color} shadow-lg`
                      : isPast
                        ? 'bg-green-500'
                        : 'bg-white border-2 border-neutral-200 hover:border-[#722F37]/30'
                  }`}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  {isPast && !isActive ? (
                    <Check className="w-6 h-6 text-white" aria-hidden="true" />
                  ) : (
                    <Icon className={`w-6 h-6 ${isActive || isPast ? 'text-white' : 'text-neutral-400'}`} aria-hidden="true" />
                  )}

                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-current"
                      style={{ borderColor: 'inherit' }}
                      animate={{
                        scale: [1, 1.2, 1.2],
                        opacity: [0.5, 0, 0],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>

                <div className="mt-3 text-center">
                  <p className={`text-sm font-semibold ${isActive ? 'text-[#722F37]' : 'text-neutral-700'}`}>
                    {item.day}
                  </p>
                  <p className="text-xs text-neutral-500 max-w-[100px] hidden sm:block">{item.title}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
          disabled={activeDay === 0}
          aria-label="Previous day"
          className="p-3 rounded-full bg-white border border-neutral-200 hover:border-[#722F37]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2"
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5 text-neutral-600" aria-hidden="true" />
        </motion.button>

        <motion.button
          onClick={isPlaying ? stopPlayback : startPlayback}
          className="px-6 py-3 rounded-full bg-[#722F37] text-white font-medium flex items-center gap-2 hover:bg-[#8B3A42] transition-colors focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2"
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          {isPlaying ? <Pause className="w-5 h-5" aria-hidden="true" /> : <Play className="w-5 h-5" aria-hidden="true" />}
          {isPlaying ? 'Pause' : 'Play Timeline'}
        </motion.button>

        <motion.button
          onClick={() => setActiveDay(Math.min(recoveryTimeline.length - 1, activeDay + 1))}
          disabled={activeDay === recoveryTimeline.length - 1}
          aria-label="Next day"
          className="p-3 rounded-full bg-white border border-neutral-200 hover:border-[#722F37]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2"
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5 text-neutral-600" aria-hidden="true" />
        </motion.button>
      </div>

      {/* Active Day Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          role="tabpanel"
          aria-label={`${currentRecovery.day} recovery information`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm"
        >
          <div className={`h-2 bg-gradient-to-r ${currentRecovery.color}`} aria-hidden="true" />

          <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
              {/* Left: Icon and text */}
              <div className="flex items-start gap-6 flex-1">
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentRecovery.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                  animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {(() => {
                    const Icon = currentRecovery.icon;
                    return <Icon className="w-10 h-10 text-white" aria-hidden="true" />;
                  })()}
                </motion.div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${currentRecovery.color} text-white`}>
                      {currentRecovery.day}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1e293b]">
                      {currentRecovery.title}
                    </h3>
                  </div>
                  <p className="text-lg text-neutral-600">
                    {currentRecovery.description}
                  </p>
                </div>
              </div>

              {/* Right: Recovery illustration */}
              <div className="w-full lg:w-40 flex-shrink-0">
                <RecoveryHealingSVG className="w-full h-auto max-w-[160px] mx-auto" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-2xl p-6">
              <p className="text-sm font-semibold text-[#722F37] uppercase tracking-wide mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" aria-hidden="true" />
                Tips for This Stage
              </p>
              <ul className="grid md:grid-cols-3 gap-4">
                {currentRecovery.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#722F37]" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-neutral-700">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// PRE/POST-OPERATIVE CARE GUIDES - Enhanced with visual anchors
// ============================================================================

function CareGuides() {
  const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef}>
      {/* Tab Selector */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 bg-neutral-100 rounded-2xl" role="tablist" aria-label="Care instructions">
          {[
            { key: 'pre' as const, label: 'Pre-Operative Care', icon: Calendar },
            { key: 'post' as const, label: 'Post-Operative Care', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`${tab.key}-panel`}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-inset ${
                  activeTab === tab.key
                    ? 'text-white'
                    : 'text-neutral-600 hover:text-[#722F37]'
                }`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="careTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2 }}
                    aria-hidden="true"
                  />
                )}
                <Icon className="relative w-5 h-5" aria-hidden="true" />
                <span className="relative">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'pre' ? (
          <motion.div
            key="pre"
            id="pre-panel"
            role="tabpanel"
            aria-labelledby="pre-tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {preOpInstructions.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: prefersReducedMotion ? 0 : sectionIndex * 0.1 }}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6 bg-gradient-to-br from-[#FDF8F3] to-white border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold text-lg text-[#1e293b]">{section.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {section.items.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: prefersReducedMotion ? 0 : 0.3 + index * 0.05 }}
                          className="flex items-start gap-3 text-sm text-neutral-600"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-blue-600" aria-hidden="true" />
                          </div>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="post"
            id="post-panel"
            role="tabpanel"
            aria-labelledby="post-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {postOpInstructions.map((section, sectionIndex) => {
              const SectionIcon = section.icon;
              return (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: prefersReducedMotion ? 0 : sectionIndex * 0.1 }}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden"
                >
                  <div className={`p-6 ${section.bgColor} border-b border-neutral-100`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
                        <SectionIcon className={`w-6 h-6 ${section.color}`} aria-hidden="true" />
                      </div>
                      <h3 className={`font-semibold text-xl ${section.color}`}>
                        {section.category}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {section.items.map((item, index) => {
                        const ItemIcon = item.icon;
                        return (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: sectionIndex === 0 ? -10 : 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: prefersReducedMotion ? 0 : 0.3 + index * 0.05 }}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                          >
                            <div className={`w-10 h-10 rounded-lg ${section.bgColor} flex items-center justify-center flex-shrink-0`}>
                              <ItemIcon className={`w-5 h-5 ${section.color}`} aria-hidden="true" />
                            </div>
                            <span className="text-neutral-700">{item.text}</span>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// SURGEON CREDENTIALS SHOWCASE - Enhanced with new imagery
// ============================================================================

function TeamCredentials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image and overlay - using new Pexels image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
            <Image
              src="/images/services/oral-surgery/dental-team-care.jpg"
              alt="Two dental professionals providing careful treatment in a modern clinical environment"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/60 to-transparent" aria-hidden="true" />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white/80 text-sm uppercase tracking-wider mb-2">Our Promise</p>
              <p className="text-white text-2xl font-semibold">
                Experienced care you can trust
              </p>
            </div>
          </div>

          {/* Floating credential badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
            className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                <Award className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1e293b]">25+</p>
                <p className="text-sm text-neutral-500">Years Combined</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats and info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
            Expert Surgical Team
          </h3>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            Our dental professionals bring extensive training and experience in oral surgery procedures.
            We combine clinical expertise with a gentle, patient-centered approach to ensure your comfort
            and safety throughout every procedure.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {teamCredentials.map((credential, index) => {
              const Icon = credential.icon;
              return (
                <motion.div
                  key={credential.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#FDF8F3] to-white border border-[#EDE5DD] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-neutral-500">{credential.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#722F37]">{credential.value}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
            className="mt-8"
          >
            <Link
              href="/about/team"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:gap-3 transition-all focus:outline-none focus:underline"
            >
              Meet Our Team
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// ANIMATED FAQ ACCORDION
// ============================================================================

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            variants={fadeInUp}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              isOpen
                ? 'border-[#722F37]/20 bg-white shadow-lg shadow-[#722F37]/5'
                : 'border-neutral-200 bg-white hover:border-[#722F37]/10'
            }`}
          >
            <motion.button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-inset"
              whileHover={prefersReducedMotion ? {} : { backgroundColor: 'rgba(114, 47, 55, 0.02)' }}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'bg-[#722F37]' : 'bg-neutral-100'
                  }`}
                  animate={prefersReducedMotion ? {} : { rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                >
                  <span className={`text-sm font-semibold ${isOpen ? 'text-white' : 'text-neutral-500'}`}>
                    {index + 1}
                  </span>
                </motion.div>
                <span className="font-semibold text-[#1e293b] pr-4">{item.question}</span>
              </div>
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <ChevronDown className="w-5 h-5 text-[#722F37]" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-14 text-neutral-600 leading-relaxed">{item.answer}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ============================================================================
// RELATED SERVICES - Enhanced with icons
// ============================================================================

function RelatedServices() {
  const prefersReducedMotion = useReducedMotion();
  const services = [
    {
      title: 'Dental Implants',
      description: 'Permanent tooth replacement that may follow extraction once the site has healed.',
      href: '/services/dental-implants',
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Missing Teeth Solutions',
      description: 'Explore all options for replacing teeth after extraction, including bridges and dentures.',
      href: '/services/missing-teeth',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Root Canal Treatment',
      description: 'An alternative to extraction that can save your natural tooth when infection is present.',
      href: '/services/root-canal',
      icon: Heart,
      color: 'from-rose-500 to-rose-600',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
          >
            <Link
              href={service.href}
              className="group block p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg text-[#1e293b] mb-2 group-hover:text-[#722F37] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">{service.description}</p>
              <span className="inline-flex items-center gap-2 text-[#722F37] font-medium text-sm group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// IMAGE GALLERY SECTION - New section showcasing procedure imagery
// ============================================================================

function ImageGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const images = [
    {
      src: '/images/services/oral-surgery/dental-procedure.jpg',
      alt: 'Dental professionals performing an oral surgery procedure with precision',
      caption: 'Precision & Care',
    },
    {
      src: '/images/services/oral-surgery/patient-consultation.jpg',
      alt: 'Patient smiling during a dental consultation appointment',
      caption: 'Patient Comfort',
    },
    {
      src: '/images/services/oral-surgery/dental-team-care.jpg',
      alt: 'Dental team providing attentive care during a procedure',
      caption: 'Expert Team',
    },
  ];

  return (
    <section ref={containerRef} className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
            Our Facility
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
            Modern Care Environment
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Experience oral surgery in our state-of-the-art facility designed for your comfort and safety.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function OralSurgeryContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Procedure Types Showcase */}
      <section className="relative py-24 bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Our Procedures
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Oral Surgery Services
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              From simple extractions to complex surgical procedures, our experienced team provides comprehensive care for all your oral surgery needs.
            </p>
          </motion.div>

          <ProcedureShowcase />
        </div>
      </section>

      {/* Image Gallery - New section */}
      <ImageGallerySection />

      {/* Surgeon Credentials */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Experienced Surgical Team
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Our team combines clinical expertise with a gentle, patient-centered approach.
            </p>
          </motion.div>

          <TeamCredentials />
        </div>
      </section>

      {/* Sedation Options */}
      <section className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              Comfort Options
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Sedation & Comfort
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Choose from multiple sedation options to ensure your complete comfort throughout your procedure.
            </p>
          </motion.div>

          <SedationOptions />
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="relative py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              Recovery Guide
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Recovery Timeline
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Follow along with our interactive timeline to understand what to expect during your healing journey.
            </p>
          </motion.div>

          <RecoveryTimeline />
        </div>
      </section>

      {/* Pre/Post-Operative Care */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              Patient Guide
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Care Instructions
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Everything you need to know before and after your oral surgery procedure.
            </p>
          </motion.div>

          <CareGuides />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Find answers to frequently asked questions about oral surgery procedures.
            </p>
          </motion.div>

          <FAQAccordion items={faqs} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-500 mb-4">Still have questions? We&apos;re happy to help.</p>
            <a
              href="tel:+16137336446"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline focus:outline-none focus:underline"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Call us at (613) 733-6446
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Related Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Explore More Services
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Discover other services that may complement your oral surgery treatment.
            </p>
          </motion.div>

          <RelatedServices />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
            className="mt-10 text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group focus:outline-none focus:underline"
            >
              View All Services
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]" aria-hidden="true" />

        {/* Decorative elements */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Medical cross pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M27 27h6v-6h-6v6zm0 6h6v6h-6v-6zm6 0h6v-6h-6v6zm-12 0h6v-6h-6v6z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <ShieldCheck className="w-4 h-4 text-white" aria-hidden="true" />
              <span className="text-sm font-medium text-white">Safe & Experienced Care</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Ready for Your Consultation?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Schedule a consultation to discuss your oral surgery needs. Our experienced team will evaluate your situation and recommend the best treatment approach for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.02 }} whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}>
                <Link
                  href="/contact#book"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl hover:bg-neutral-100 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#722F37]"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Book Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </motion.div>

              <a
                href="tel:+16137336446"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#722F37]"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                (613) 733-6446
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
