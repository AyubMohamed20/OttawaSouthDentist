'use client';

import { useState, useRef, useCallback } from 'react';
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
  Target,
  DollarSign,
  Star,
  CheckCircle2,
  PlayCircle,
  Bone,
  Syringe,
  Stethoscope,
  ScanHeart,
  ShieldPlus,
  HeartPulse,
  CircleDot,
  Crown,
  Layers,
  Anchor,
  Grip,
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
    question: 'Am I a candidate for dental implants?',
    answer:
      "Most adults with good general health are candidates for dental implants. Adequate jawbone density is needed to support the implant, though bone grafting procedures can help those who have experienced bone loss. During your consultation, we'll evaluate your oral health, medical history, and bone structure to determine if implants are right for you.",
  },
  {
    question: 'How long do dental implants last?',
    answer:
      'With proper care and maintenance, dental implants can last a lifetime. The titanium implant post integrates permanently with your jawbone. The crown (visible tooth portion) may need replacement after 10-15 years due to normal wear, but the implant itself is designed to be a permanent solution.',
  },
  {
    question: 'Is the dental implant procedure painful?',
    answer:
      'The implant procedure is performed under local anesthesia, ensuring you feel no pain during the surgery. Most patients report that the procedure is less uncomfortable than they expected. Post-operative discomfort is typically manageable with over-the-counter pain medication and usually subsides within a few days.',
  },
  {
    question: 'How long does the entire implant process take?',
    answer:
      'The complete implant process typically takes 3-6 months from start to finish. After the implant post is placed, a healing period of 3-6 months allows for osseointegration (bone fusion). Once healed, the abutment and crown are placed. Some cases may qualify for same-day implants with immediate loading.',
  },
  {
    question: 'How do I care for my dental implants?',
    answer:
      'Dental implants are easy to maintain—care for them just like your natural teeth. Brush twice daily, floss regularly, and maintain routine dental checkups. While implants cannot develop cavities, the surrounding gum tissue still needs proper care to prevent gum disease and ensure long-term success.',
  },
];

const benefits = [
  {
    icon: Award,
    title: 'Permanent Solution',
    description:
      'Implants can last a lifetime with proper care, unlike dentures or bridges that need replacement.',
    stat: '25+',
    statLabel: 'Years Lifespan',
    illustration: 'lifetime',
  },
  {
    icon: Sparkles,
    title: 'Natural Look & Feel',
    description:
      'Designed to match your natural teeth in color, shape, and function for a seamless smile.',
    stat: '100%',
    statLabel: 'Natural Function',
    illustration: 'natural',
  },
  {
    icon: Bone,
    title: 'Preserve Bone Health',
    description:
      'Stimulate the jawbone to prevent bone loss that naturally occurs with missing teeth.',
    stat: '0%',
    statLabel: 'Bone Deterioration',
    illustration: 'bone',
  },
  {
    icon: Heart,
    title: 'Protect Adjacent Teeth',
    description:
      "Unlike bridges, implants don't require altering healthy neighboring teeth for support.",
    stat: '0',
    statLabel: 'Teeth Affected',
    illustration: 'protect',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation & Planning',
    shortTitle: 'Consult',
    description:
      'Comprehensive assessment including X-rays and 3D imaging to evaluate bone structure and create your personalized treatment plan.',
    details: [
      'Digital X-rays & 3D CT scan',
      'Bone density evaluation',
      'Treatment timeline creation',
      'Cost estimate & financing options',
    ],
    duration: '1 visit',
    icon: Stethoscope,
    color: '#722F37',
  },
  {
    step: 2,
    title: 'Implant Placement',
    shortTitle: 'Place',
    description:
      'The titanium implant post is surgically placed into your jawbone under local anesthesia. This serves as the root for your new tooth.',
    details: [
      'Local anesthesia administration',
      'Precision-guided placement',
      'Titanium post insertion',
      'Temporary restoration (if applicable)',
    ],
    duration: '1-2 hours',
    icon: Syringe,
    color: '#0d9488',
  },
  {
    step: 3,
    title: 'Osseointegration',
    shortTitle: 'Heal',
    description:
      'Over 3-6 months, the implant fuses with your jawbone through osseointegration, creating a strong, permanent foundation.',
    details: [
      'Bone cells bond to titanium',
      'Regular progress monitoring',
      'Soft diet recommendations',
      'Healing verification X-rays',
    ],
    duration: '3-6 months',
    icon: HeartPulse,
    color: '#eab308',
  },
  {
    step: 4,
    title: 'Abutment & Crown',
    shortTitle: 'Restore',
    description:
      'Once healed, a connector piece (abutment) and your custom-made crown are secured, completing your restoration.',
    details: [
      'Abutment attachment',
      'Crown shade matching',
      'Custom crown fabrication',
      'Final placement & adjustments',
    ],
    duration: '2 visits',
    icon: Star,
    color: '#722F37',
  },
];

const implantComponents = [
  {
    name: 'Crown',
    description: 'Custom-made porcelain tooth that matches your natural teeth',
    icon: Crown,
    color: '#F5F5F5',
    accentColor: '#722F37',
  },
  {
    name: 'Abutment',
    description: 'Titanium connector that links the crown to the implant post',
    icon: Layers,
    color: '#C0C0C0',
    accentColor: '#64748b',
  },
  {
    name: 'Implant Post',
    description: 'Medical-grade titanium screw that fuses with your jawbone',
    icon: Anchor,
    color: '#808080',
    accentColor: '#334155',
  },
  {
    name: 'Jawbone',
    description: 'Natural bone that integrates with the titanium implant',
    icon: Bone,
    color: '#FDF8F3',
    accentColor: '#a16207',
  },
];

const comparisonData = [
  {
    feature: 'Lifespan',
    implant: '25+ years',
    implantScore: 100,
    bridge: '5-15 years',
    bridgeScore: 50,
    denture: '5-10 years',
    dentureScore: 35,
  },
  {
    feature: 'Bone Preservation',
    implant: 'Stimulates growth',
    implantScore: 100,
    bridge: 'No protection',
    bridgeScore: 20,
    denture: 'Accelerates loss',
    dentureScore: 10,
  },
  {
    feature: 'Adjacent Teeth',
    implant: 'No alteration',
    implantScore: 100,
    bridge: 'Requires grinding',
    bridgeScore: 30,
    denture: 'May cause damage',
    dentureScore: 25,
  },
  {
    feature: 'Stability',
    implant: 'Permanent',
    implantScore: 100,
    bridge: 'Fixed',
    bridgeScore: 75,
    denture: 'Removable',
    dentureScore: 40,
  },
  {
    feature: 'Eating Ability',
    implant: 'Full function',
    implantScore: 100,
    bridge: 'Near normal',
    bridgeScore: 80,
    denture: 'Limited',
    dentureScore: 45,
  },
];

const implantTypes = [
  {
    title: 'Single Tooth Implants',
    description:
      'Replace individual missing teeth without affecting neighboring teeth. Ideal for single tooth loss from injury, decay, or extraction.',
    image: '/images/implants/implants-01.jpg',
    features: ['Standalone restoration', 'No adjacent tooth modification', 'Natural appearance'],
    icon: CircleDot,
  },
  {
    title: 'Multiple Tooth Implants',
    description:
      'Restore several teeth with strategically placed implants. Perfect for patients missing 2-4 adjacent teeth.',
    image: '/images/implants/implants-02.jpg',
    features: ['Implant-supported bridge', 'Cost-effective solution', 'Preserved bone structure'],
    icon: Grip,
  },
  {
    title: 'Implant-Supported Bridges',
    description:
      'Replace multiple adjacent teeth with implant-anchored bridges. No removable appliance needed.',
    image: '/images/implants/implants-03.jpg',
    features: ['Fixed restoration', 'Fewer implants needed', 'Long-term stability'],
    icon: Layers,
  },
  {
    title: 'All-on-4 Full Arch',
    description:
      'Complete upper or lower arch restoration supported by just four strategically angled implants.',
    image: '/images/implants/implants-04.jpg',
    features: ['Full arch in one day', 'Minimal implants', 'Maximum stability'],
    icon: ShieldPlus,
  },
];

const trustIndicators = [
  { value: '98%', label: 'Success Rate', icon: ScanHeart },
  { value: '5000+', label: 'Implants Placed', icon: Award },
  { value: '25+', label: 'Years Experience', icon: Clock },
  { value: '100%', label: 'Patient Satisfaction', icon: Star },
];

const financingOptions = [
  {
    title: 'Insurance Coverage',
    description: 'Many dental insurance plans cover a portion of implant treatment',
    icon: Shield,
  },
  {
    title: 'Flexible Financing',
    description: 'Monthly payment plans available through CareCredit and other providers',
    icon: DollarSign,
  },
  {
    title: 'Transparent Pricing',
    description: 'Detailed cost breakdown provided during your consultation',
    icon: CheckCircle2,
  },
];

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
// SVG ILLUSTRATIONS
// ============================================================================

// Dental Implant Anatomy SVG - Professional flat illustration
function ImplantAnatomySVG({ className = '', hoveredPart }: { className?: string; hoveredPart: string | null }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 200 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dental implant anatomy illustration showing crown, abutment, implant post, and jawbone"
    >
      {/* Jawbone Background */}
      <motion.path
        d="M20 280 Q20 260 40 260 L160 260 Q180 260 180 280 L180 380 Q180 400 160 400 L40 400 Q20 400 20 380 Z"
        fill="#FDF8F3"
        stroke="#E5DDD5"
        strokeWidth="2"
        animate={{
          opacity: hoveredPart === 'Jawbone' ? 1 : 0.9,
          scale: hoveredPart === 'Jawbone' ? 1.02 : 1
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      />

      {/* Bone Texture Pattern */}
      <g opacity="0.3">
        <circle cx="50" cy="300" r="8" fill="#DDD5CD" />
        <circle cx="150" cy="320" r="6" fill="#DDD5CD" />
        <circle cx="70" cy="350" r="7" fill="#DDD5CD" />
        <circle cx="130" cy="370" r="5" fill="#DDD5CD" />
        <circle cx="90" cy="380" r="6" fill="#DDD5CD" />
      </g>

      {/* Implant Post (Titanium Screw) */}
      <motion.g
        animate={{
          scale: hoveredPart === 'Implant Post' ? 1.03 : 1,
          filter: hoveredPart === 'Implant Post' ? 'drop-shadow(0 4px 8px rgba(114, 47, 55, 0.3))' : 'none'
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        {/* Main screw body */}
        <path
          d="M85 180 L85 320 Q85 330 100 330 Q115 330 115 320 L115 180 Z"
          fill="url(#titaniumGradient)"
          stroke="#64748b"
          strokeWidth="1"
        />
        {/* Screw threads */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path
            key={i}
            d={`M80 ${195 + i * 16} L120 ${195 + i * 16}`}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        {/* Screw tip */}
        <path
          d="M90 320 L100 340 L110 320"
          fill="url(#titaniumGradient)"
          stroke="#64748b"
          strokeWidth="1"
        />
      </motion.g>

      {/* Abutment */}
      <motion.g
        animate={{
          scale: hoveredPart === 'Abutment' ? 1.05 : 1,
          filter: hoveredPart === 'Abutment' ? 'drop-shadow(0 4px 8px rgba(114, 47, 55, 0.3))' : 'none'
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        <path
          d="M88 140 L88 180 L112 180 L112 140 Q112 135 108 130 L92 130 Q88 135 88 140"
          fill="url(#abutmentGradient)"
          stroke="#94a3b8"
          strokeWidth="1"
        />
        {/* Connector detail */}
        <rect x="95" y="170" width="10" height="15" fill="#a1a1aa" rx="2" />
      </motion.g>

      {/* Crown */}
      <motion.g
        animate={{
          scale: hoveredPart === 'Crown' ? 1.05 : 1,
          filter: hoveredPart === 'Crown' ? 'drop-shadow(0 4px 12px rgba(114, 47, 55, 0.4))' : 'none'
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        {/* Tooth shape */}
        <path
          d="M70 130 Q70 50 100 40 Q130 50 130 130 L120 130 Q118 80 100 70 Q82 80 80 130 Z"
          fill="url(#crownGradient)"
          stroke="#e5e5e5"
          strokeWidth="2"
        />
        {/* Tooth highlight */}
        <path
          d="M85 90 Q90 70 100 65 Q95 75 92 95"
          fill="white"
          opacity="0.6"
        />
        {/* Cusps */}
        <ellipse cx="87" cy="45" rx="8" ry="10" fill="url(#crownGradient)" stroke="#e5e5e5" strokeWidth="1" />
        <ellipse cx="100" cy="42" rx="8" ry="10" fill="url(#crownGradient)" stroke="#e5e5e5" strokeWidth="1" />
        <ellipse cx="113" cy="45" rx="8" ry="10" fill="url(#crownGradient)" stroke="#e5e5e5" strokeWidth="1" />
      </motion.g>

      {/* Gum line */}
      <motion.path
        d="M30 260 Q60 240 100 235 Q140 240 170 260"
        fill="none"
        stroke="#FDA4AF"
        strokeWidth="12"
        strokeLinecap="round"
        animate={{
          strokeWidth: hoveredPart ? 10 : 12
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#E5E5E5" />
        </linearGradient>
        <linearGradient id="abutmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4D4D8" />
          <stop offset="100%" stopColor="#A1A1AA" />
        </linearGradient>
        <linearGradient id="titaniumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Mini illustration for benefits cards
function BenefitIllustration({ type }: { type: string }) {
  switch (type) {
    case 'lifetime':
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
          <circle cx="30" cy="30" r="25" fill="#722F37" opacity="0.1" />
          <path d="M30 10 L30 30 L45 30" stroke="#722F37" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="30" r="3" fill="#722F37" />
          <path d="M30 5 L30 8 M30 52 L30 55 M5 30 L8 30 M52 30 L55 30" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'natural':
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
          <path d="M15 40 Q15 15 30 10 Q45 15 45 40 L40 40 Q38 20 30 18 Q22 20 20 40 Z" fill="#722F37" opacity="0.15" stroke="#722F37" strokeWidth="1.5" />
          <path d="M22 25 Q25 18 30 16" stroke="#722F37" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
          <circle cx="45" cy="15" r="8" fill="none" stroke="#722F37" strokeWidth="1.5" />
          <path d="M42 15 L45 18 L51 12" stroke="#722F37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'bone':
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
          <ellipse cx="15" cy="15" rx="8" ry="6" fill="#722F37" opacity="0.2" />
          <ellipse cx="45" cy="15" rx="8" ry="6" fill="#722F37" opacity="0.2" />
          <rect x="12" y="13" width="36" height="34" rx="6" fill="#722F37" opacity="0.15" />
          <ellipse cx="15" cy="45" rx="8" ry="6" fill="#722F37" opacity="0.2" />
          <ellipse cx="45" cy="45" rx="8" ry="6" fill="#722F37" opacity="0.2" />
          <path d="M25 25 L35 35 M35 25 L25 35" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'protect':
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
          <path d="M30 5 L50 15 L50 35 Q50 50 30 55 Q10 50 10 35 L10 15 Z" fill="#722F37" opacity="0.1" stroke="#722F37" strokeWidth="1.5" />
          <path d="M22 30 L28 36 L40 24" stroke="#722F37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

// Procedure step illustration
function ProcedureStepIllustration({ step, isActive }: { step: number; isActive: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const illustrations = [
    // Step 1: Consultation
    <svg key="consult" viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      <motion.g
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        <rect x="20" y="15" width="60" height="45" rx="4" fill="#722F37" opacity="0.1" stroke="#722F37" strokeWidth="1.5" />
        <rect x="25" y="22" width="20" height="15" rx="2" fill="#722F37" opacity="0.2" />
        <rect x="25" y="42" width="50" height="3" rx="1" fill="#722F37" opacity="0.3" />
        <rect x="25" y="50" width="35" height="3" rx="1" fill="#722F37" opacity="0.2" />
        <circle cx="65" cy="75" r="15" fill="#722F37" opacity="0.1" stroke="#722F37" strokeWidth="1.5" />
        <path d="M60 75 L65 80 L75 70" stroke="#722F37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>,
    // Step 2: Placement
    <svg key="place" viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      <motion.g
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        <path d="M35 80 Q35 50 50 45 Q65 50 65 80" fill="#FDA4AF" opacity="0.3" />
        <rect x="45" y="55" width="10" height="30" rx="2" fill="#64748B" stroke="#475569" strokeWidth="1" />
        <motion.path
          d="M50 20 L50 50"
          stroke="#722F37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
          animate={isActive && !prefersReducedMotion ? { strokeDashoffset: [0, 8] } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <polygon points="45,20 50,10 55,20" fill="#722F37" />
      </motion.g>
    </svg>,
    // Step 3: Healing
    <svg key="heal" viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      <motion.g
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        <rect x="40" y="40" width="20" height="40" rx="3" fill="#64748B" />
        <rect x="35" y="75" width="30" height="15" rx="3" fill="#FDF8F3" stroke="#E5DDD5" strokeWidth="1" />
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx={35 + i * 10}
            cy={82}
            r="3"
            fill="#722F37"
            animate={isActive && !prefersReducedMotion ? {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <path d="M50 15 L50 35" stroke="#722F37" strokeWidth="3" strokeLinecap="round" />
        <path d="M40 25 L60 25" stroke="#722F37" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </svg>,
    // Step 4: Restore
    <svg key="restore" viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      <motion.g
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        <path d="M35 80 Q35 45 50 40 Q65 45 65 80" fill="#FDA4AF" opacity="0.3" />
        <rect x="45" y="55" width="10" height="30" rx="2" fill="#64748B" />
        <rect x="44" y="45" width="12" height="12" rx="2" fill="#A1A1AA" />
        <path d="M38 45 Q38 20 50 15 Q62 20 62 45 L57 45 Q55 25 50 22 Q45 25 43 45 Z" fill="white" stroke="#E5E5E5" strokeWidth="1.5" />
        <motion.g
          animate={isActive && !prefersReducedMotion ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx="75" cy="25" r="12" fill="#722F37" opacity="0.1" />
          <path d="M70 25 L74 29 L82 21" stroke="#722F37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </motion.g>
    </svg>,
  ];

  return illustrations[step - 1] || null;
}

// ============================================================================
// ANIMATED 3D IMPLANT VISUALIZATION
// ============================================================================

function ImplantVisualization() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [isAssembled, setIsAssembled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef} className="relative">
      {/* Toggle Button */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={() => setIsAssembled(!isAssembled)}
          className="group relative px-6 py-3 rounded-full bg-white border border-neutral-200 shadow-sm overflow-hidden"
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#722F37]/10 to-[#8B3A42]/10"
            initial={{ x: '-100%' }}
            whileHover={prefersReducedMotion ? {} : { x: '0%' }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative flex items-center gap-2 text-sm font-medium text-neutral-700">
            <PlayCircle className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
            {isAssembled ? 'Explode View' : 'Assemble View'}
          </span>
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* SVG Implant Illustration */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-radial from-[#722F37]/5 via-transparent to-transparent rounded-3xl" />

          <div className="relative w-full max-w-xs mx-auto">
            <ImplantAnatomySVG
              className="w-full h-auto drop-shadow-lg"
              hoveredPart={hoveredComponent}
            />

            {/* Floating labels */}
            <AnimatePresence>
              {hoveredComponent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-4 py-2 shadow-lg border border-[#722F37]/10"
                >
                  <p className="text-sm font-semibold text-[#722F37]">{hoveredComponent}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Component Details */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
              <Layers className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#1e293b]">Implant Anatomy</h3>
              <p className="text-sm text-neutral-500">Hover to explore each component</p>
            </div>
          </motion.div>

          {implantComponents.map((component, index) => {
            const Icon = component.icon;
            return (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1 }}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  hoveredComponent === component.name
                    ? 'bg-[#722F37]/5 border-[#722F37]/20 shadow-md'
                    : 'bg-white border-neutral-200 hover:border-[#722F37]/10'
                }`}
                onMouseEnter={() => setHoveredComponent(component.name)}
                onMouseLeave={() => setHoveredComponent(null)}
                onFocus={() => setHoveredComponent(component.name)}
                onBlur={() => setHoveredComponent(null)}
                tabIndex={0}
                role="button"
                aria-label={`${component.name}: ${component.description}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-300"
                    style={{ backgroundColor: component.color }}
                  >
                    <Icon className="w-5 h-5" style={{ color: component.accentColor }} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#1e293b]">{component.name}</h4>
                    <p className="text-sm text-neutral-500">{component.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-neutral-500">{index + 1}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE PROCEDURE TIMELINE
// ============================================================================

function ProcedureTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef} className="relative">
      {/* Step Navigation - Horizontal Timeline */}
      <div className="relative mb-12">
        {/* Timeline Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full" aria-hidden="true" />
        <motion.div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
          initial={{ width: '0%' }}
          animate={{
            width: isInView ? `${(activeStep / (procedureSteps.length - 1)) * 100}%` : '0%',
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        {/* Step Indicators */}
        <div className="relative flex justify-between" role="tablist" aria-label="Procedure steps">
          {procedureSteps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            const StepIcon = step.icon;

            return (
              <motion.button
                key={step.step}
                onClick={() => setActiveStep(index)}
                className="relative flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`step-panel-${index}`}
                id={`step-tab-${index}`}
              >
                {/* Step Circle */}
                <motion.div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/30'
                      : isCompleted
                        ? 'bg-[#722F37]'
                        : 'bg-white border-2 border-neutral-200 group-hover:border-[#722F37]/30'
                  }`}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white" aria-hidden="true" />
                  ) : (
                    <StepIcon
                      className={`w-6 h-6 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-[#722F37]'}`}
                      aria-hidden="true"
                    />
                  )}

                  {/* Pulse ring for active */}
                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#722F37]"
                      animate={{
                        scale: [1, 1.3, 1.3],
                        opacity: [0.5, 0, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${isActive || isCompleted ? 'text-[#722F37]' : 'text-neutral-500'}`}
                  >
                    {step.shortTitle}
                  </p>
                  <p className="text-xs text-neutral-400">{step.duration}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden"
          role="tabpanel"
          id={`step-panel-${activeStep}`}
          aria-labelledby={`step-tab-${activeStep}`}
        >
          <div className="grid lg:grid-cols-2">
            {/* Illustration Side */}
            <div className="relative h-72 lg:h-auto bg-gradient-to-br from-[#FDF8F3] to-white p-8 flex items-center justify-center">
              <div className="w-48 h-48">
                <ProcedureStepIllustration step={procedureSteps[activeStep]?.step ?? 1} isActive={true} />
              </div>
              <div className="absolute bottom-6 left-6">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#722F37] shadow-sm">
                  Step {procedureSteps[activeStep]?.step} of {procedureSteps.length}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${procedureSteps[activeStep]?.color}15` }}
                >
                  {(() => {
                    const StepIcon = procedureSteps[activeStep]?.icon;
                    return StepIcon ? (
                      <StepIcon className="w-6 h-6" style={{ color: procedureSteps[activeStep]?.color }} aria-hidden="true" />
                    ) : null;
                  })()}
                </div>
                <div>
                  <p className="text-sm text-[#722F37] font-medium">Step {procedureSteps[activeStep]?.step}</p>
                  <h3 className="text-2xl font-semibold text-[#1e293b]">
                    {procedureSteps[activeStep]?.title}
                  </h3>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-6">
                {procedureSteps[activeStep]?.description}
              </p>

              <div className="space-y-3">
                <p className="text-sm font-medium text-[#1e293b] uppercase tracking-wide">
                  What to Expect
                </p>
                {procedureSteps[activeStep]?.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#722F37]" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-neutral-600">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-100">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-[#722F37] hover:bg-[#722F37]/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Go to previous step"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(procedureSteps.length - 1, activeStep + 1))}
                  disabled={activeStep === procedureSteps.length - 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#722F37] text-white hover:bg-[#8B3A42] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Go to next step"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// ANIMATED COMPARISON CHART
// ============================================================================

function ComparisonChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [selectedOption, setSelectedOption] = useState<'implant' | 'bridge' | 'denture'>('implant');
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef}>
      {/* Option Selector */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap" role="tablist" aria-label="Comparison options">
        {[
          { key: 'implant', label: 'Dental Implants', recommended: true },
          { key: 'bridge', label: 'Dental Bridge' },
          { key: 'denture', label: 'Dentures' },
        ].map((option) => (
          <motion.button
            key={option.key}
            onClick={() => setSelectedOption(option.key as 'implant' | 'bridge' | 'denture')}
            className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedOption === option.key
                ? 'bg-[#722F37] text-white shadow-lg shadow-[#722F37]/25'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:border-[#722F37]/20'
            }`}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            role="tab"
            aria-selected={selectedOption === option.key}
          >
            {option.recommended && selectedOption === option.key && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full">
                Best
              </span>
            )}
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* Comparison Bars */}
      <div className="space-y-6" role="tabpanel">
        {comparisonData.map((item, index) => (
          <motion.div
            key={item.feature}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#1e293b]">{item.feature}</span>
              <span className="text-sm text-neutral-500">
                {selectedOption === 'implant'
                  ? item.implant
                  : selectedOption === 'bridge'
                    ? item.bridge
                    : item.denture}
              </span>
            </div>

            <div className="relative h-8 bg-neutral-100 rounded-full overflow-hidden">
              {/* Background bars (faded) */}
              {selectedOption !== 'implant' && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#722F37]/20 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${item.implantScore}%` : 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  aria-hidden="true"
                />
              )}

              {/* Active bar */}
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${
                  selectedOption === 'implant'
                    ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42]'
                    : selectedOption === 'bridge'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                      : 'bg-gradient-to-r from-neutral-400 to-neutral-500'
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: isInView
                    ? `${selectedOption === 'implant' ? item.implantScore : selectedOption === 'bridge' ? item.bridgeScore : item.dentureScore}%`
                    : 0,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : index * 0.1 + 0.2 }}
                role="progressbar"
                aria-valuenow={selectedOption === 'implant' ? item.implantScore : selectedOption === 'bridge' ? item.bridgeScore : item.dentureScore}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.feature} score`}
              />

              {/* Score indicator */}
              <motion.div
                className="absolute inset-y-0 flex items-center px-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 + 0.6 }}
              >
                <span className="text-sm font-semibold text-white drop-shadow">
                  {selectedOption === 'implant'
                    ? item.implantScore
                    : selectedOption === 'bridge'
                      ? item.bridgeScore
                      : item.dentureScore}
                  %
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-[#722F37]/10 border border-[#722F37]/10"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#722F37] flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-semibold text-[#1e293b] mb-1">Why Implants Lead</h4>
            <p className="text-sm text-neutral-600">
              Dental implants consistently outperform other options across all categories.
              They&apos;re the only solution that preserves bone, protects adjacent teeth, and provides
              permanent stability.
            </p>
          </div>
        </div>
      </motion.div>
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
              id={`faq-question-${index}`}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'bg-[#722F37]' : 'bg-neutral-100'
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${isOpen ? 'text-white' : 'text-neutral-500'}`}
                  >
                    {index + 1}
                  </span>
                </motion.div>
                <span className="font-semibold text-[#1e293b] pr-4">{item.question}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChevronDown className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
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
// TRUST INDICATORS
// ============================================================================

function TrustIndicators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {trustIndicators.map((indicator, index) => {
        const Icon = indicator.icon;
        return (
          <motion.div
            key={indicator.label}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: prefersReducedMotion ? 0 : 0.6 }}
            className="relative group"
          >
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 transition-all duration-300 hover:border-[#722F37]/20 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                </div>
                <div>
                  <motion.p
                    className="text-2xl font-bold text-[#722F37]"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 + 0.3 }}
                  >
                    {indicator.value}
                  </motion.p>
                  <p className="text-sm text-neutral-500">{indicator.label}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// IMPLANT TYPES SHOWCASE
// ============================================================================

function ImplantTypesShowcase() {
  const [activeType, setActiveType] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef}>
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Type Selector */}
        <div className="lg:col-span-4 space-y-3" role="tablist" aria-label="Implant types">
          {implantTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.button
                key={type.title}
                onClick={() => setActiveType(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  activeType === index
                    ? 'bg-[#722F37] border-[#722F37] shadow-lg shadow-[#722F37]/20'
                    : 'bg-white border-neutral-200 hover:border-[#722F37]/20'
                }`}
                role="tab"
                aria-selected={activeType === index}
                aria-controls={`type-panel-${index}`}
                id={`type-tab-${index}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activeType === index ? 'bg-white/20' : 'bg-[#722F37]/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${activeType === index ? 'text-white' : 'text-[#722F37]'}`} aria-hidden="true" />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold mb-1 ${activeType === index ? 'text-white' : 'text-[#1e293b]'}`}
                    >
                      {type.title}
                    </h4>
                    <p
                      className={`text-sm ${activeType === index ? 'text-white/80' : 'text-neutral-500'}`}
                    >
                      {type.description.slice(0, 50)}...
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Type Details */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
              className="bg-white rounded-3xl border border-neutral-200 overflow-hidden"
              role="tabpanel"
              id={`type-panel-${activeType}`}
              aria-labelledby={`type-tab-${activeType}`}
            >
              <div className="relative h-72">
                <Image
                  src={implantTypes[activeType]?.image ?? ''}
                  alt={implantTypes[activeType]?.title ?? 'Implant type'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {implantTypes[activeType]?.title}
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {implantTypes[activeType]?.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {implantTypes[activeType]?.features.map((feature, index) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium"
                    >
                      <Check className="w-4 h-4" aria-hidden="true" />
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// FINANCING SECTION
// ============================================================================

function FinancingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef}>
      <div className="grid lg:grid-cols-3 gap-6">
        {financingOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-green-600" aria-hidden="true" />
              </div>
              <h4 className="font-semibold text-[#1e293b] mb-2">{option.title}</h4>
              <p className="text-sm text-neutral-500">{option.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#FDF8F3] to-white border border-[#EDE5DD]"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#722F37] flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1e293b]">Investing in Your Smile</h4>
              <p className="text-sm text-neutral-500">
                Dental implants are a long-term investment that pays dividends in health and
                confidence.
              </p>
            </div>
          </div>
          <Link
            href="/contact#book"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#722F37] text-white font-medium rounded-xl hover:bg-[#8B3A42] transition-colors"
          >
            Get Your Custom Quote
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0.95]);

  const magnetic = useMagnetic(0.15);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]"
          style={{ y }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(114,47,55,0.1) 0%, transparent 70%)',
          }}
          animate={prefersReducedMotion ? {} : {
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(114,47,55,0.15) 0%, transparent 70%)',
          }}
          animate={prefersReducedMotion ? {} : {
            y: [20, -20, 20],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #722F37 1px, transparent 1px), linear-gradient(to bottom, #722F37 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
      </div>

      <motion.div style={{ opacity, scale }} className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
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
                    <Link
                      href="/services"
                      className="text-neutral-500 hover:text-[#722F37] transition-colors"
                    >
                      Services
                    </Link>
                  </li>
                  <li className="text-neutral-300" aria-hidden="true">/</li>
                  <li className="text-[#722F37] font-medium" aria-current="page">Dental Implants</li>
                </ol>
              </motion.nav>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 border border-[#722F37]/10 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#722F37] animate-pulse" aria-hidden="true" />
                <span className="text-sm font-medium text-[#722F37]">
                  Gold Standard in Tooth Replacement
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.8 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1e293b] tracking-tight leading-[1.1] mb-6"
              >
                Dental{' '}
                <span className="relative">
                  <span className="relative z-10 text-[#722F37]">Implants</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-[#722F37]/10 -skew-x-3 rounded"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 0.6 }}
                    aria-hidden="true"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
                className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-xl"
              >
                Restore your smile permanently with the most advanced tooth replacement solution.
                Natural-looking, long-lasting, and designed to function exactly like your real teeth.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  style={prefersReducedMotion ? {} : { x: magnetic.x, y: magnetic.y }}
                  onMouseMove={magnetic.handleMouseMove}
                  onMouseLeave={magnetic.handleMouseLeave}
                >
                  <Link
                    href="/contact#book"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-[#722F37]/25"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: '-100%' }}
                      whileHover={prefersReducedMotion ? {} : { x: '200%' }}
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
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl border-2 border-[#722F37]/20 hover:border-[#722F37]/40 hover:bg-[#FDF8F3] transition-all"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  (613) 733-6446
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
                className="mt-12 flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 border-2 border-white"
                      />
                    ))}
                  </div>
                  <div className="ml-2">
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500">5,000+ Happy Patients</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 aspect-[4/3]">
                <Image
                  src="/images/implants/implants-08.jpg"
                  alt="Patient smiling with dental implants at Ottawa South Dental"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
                    <Award className="w-7 h-7 text-[#722F37]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1e293b]">98%</p>
                    <p className="text-sm text-neutral-500">Success Rate</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e293b]">Lifetime</p>
                    <p className="text-xs text-neutral-500">Solution</p>
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
// MAIN COMPONENT
// ============================================================================

export function DentalImplantsContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <section className="relative py-16 bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustIndicators />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Why Choose Implants
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              The Clear Advantage
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Dental implants offer unmatched benefits over traditional tooth replacement options.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-500"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                  <div className="relative">
                    {/* Icon and illustration row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-[#722F37]" aria-hidden="true" />
                      </div>
                      <div className="w-16 h-16 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                        <BenefitIllustration type={benefit.illustration} />
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-[#1e293b] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      {benefit.description}
                    </p>

                    <div className="pt-4 border-t border-neutral-100">
                      <p className="text-2xl font-bold text-[#722F37]">{benefit.stat}</p>
                      <p className="text-xs text-neutral-400 uppercase tracking-wide">
                        {benefit.statLabel}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3D Implant Anatomy Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              <Layers className="w-4 h-4" aria-hidden="true" />
              Technical Excellence
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Understanding Your Implant
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Explore the precision engineering behind every dental implant we place.
            </p>
          </motion.div>

          <ImplantVisualization />
        </div>
      </section>

      {/* Procedure Timeline Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              <Clock className="w-4 h-4" aria-hidden="true" />
              Your Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              The Implant Process
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              A step-by-step guide to your dental implant transformation.
            </p>
          </motion.div>

          <ProcedureTimeline />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              <Target className="w-4 h-4" aria-hidden="true" />
              Compare Options
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              How Implants Stack Up
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              See why dental implants consistently outperform other tooth replacement options.
            </p>
          </motion.div>

          <ComparisonChart />
        </div>
      </section>

      {/* Implant Types Section */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              <Grip className="w-4 h-4" aria-hidden="true" />
              Solutions
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Implant Options
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              From single teeth to full arch restoration, we have the right solution for you.
            </p>
          </motion.div>

          <ImplantTypesShowcase />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              <Zap className="w-4 h-4" aria-hidden="true" />
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Find answers to frequently asked questions about dental implants.
            </p>
          </motion.div>

          <FAQAccordion items={faqs} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-500 mb-4">Still have questions? We&apos;re happy to help.</p>
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

      {/* Financing Section */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              <DollarSign className="w-4 h-4" aria-hidden="true" />
              Affordable Care
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Investment in Your Future
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              We offer flexible financing options to make your implant treatment affordable.
            </p>
          </motion.div>

          <FinancingSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]" />

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5"
          animate={prefersReducedMotion ? {} : { rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Ready to Restore Your Smile?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Schedule your implant consultation today and discover how dental implants can give you
              a permanent, natural-looking smile you&apos;ll love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <Link
                  href="/contact#book"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl hover:bg-neutral-100 transition-colors shadow-lg"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Book Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </motion.div>

              <a
                href="tel:+16137336446"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors"
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
