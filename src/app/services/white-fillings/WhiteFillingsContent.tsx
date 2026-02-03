'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Eye,
  Palette,
  Layers,
  Droplets,
  Sun,
  X,
  ChevronRight,
  Star,
  Leaf,
  Timer,
  CircleDot,
  Smile,
  ShieldCheck,
  Gem,
  Paintbrush,
  CircleCheck,
  Stethoscope,
  BadgeCheck,
  ThumbsUp,
  Lightbulb,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
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
    question: 'How long do white fillings last?',
    answer:
      'With proper care, white fillings typically last 5-10 years or longer. Factors like the size and location of the filling, your bite force, and oral hygiene habits can all affect longevity. Regular dental checkups help us monitor your fillings and address any concerns early.',
  },
  {
    question: 'Are white fillings as strong as silver fillings?',
    answer:
      'Modern composite materials are very durable and suitable for most fillings. They bond directly to your tooth structure, which can actually help strengthen the tooth. For very large restorations in areas of heavy chewing, your dentist may discuss alternative options that might be more suitable.',
  },
  {
    question: 'Can I replace my old silver fillings with white ones?',
    answer:
      'Yes, many patients choose to replace amalgam fillings with white fillings for aesthetic reasons or personal preference. We can evaluate your existing fillings and discuss whether replacement is recommended based on their condition and your goals.',
  },
  {
    question: 'Is the procedure painful?',
    answer:
      'The procedure is performed with local anesthesia to ensure your comfort. Most patients feel little to no discomfort during the filling placement. Some mild sensitivity after the procedure is normal and typically resolves within a few days.',
  },
  {
    question: 'How do I care for my white fillings?',
    answer:
      'Care for white fillings just like your natural teeth: brush twice daily with fluoride toothpaste, floss daily, and maintain regular dental checkups. Avoid biting on very hard objects like ice or hard candy, which can damage both fillings and natural teeth.',
  },
];

const benefits = [
  {
    icon: Smile,
    title: 'Natural Appearance',
    description:
      'Color-matched to blend seamlessly with your natural teeth for an invisible restoration.',
    stat: '16+',
    statLabel: 'Shades Available',
  },
  {
    icon: ShieldCheck,
    title: 'Mercury-Free',
    description:
      'Safe, biocompatible composite materials without any mercury or metal content.',
    stat: '100%',
    statLabel: 'Metal-Free',
  },
  {
    icon: Leaf,
    title: 'Conservative',
    description:
      'Requires less removal of healthy tooth structure compared to traditional amalgam fillings.',
    stat: '40%',
    statLabel: 'Less Drilling',
  },
  {
    icon: Zap,
    title: 'Same-Day',
    description:
      'Most white fillings can be completed in a single appointment, restoring your smile quickly.',
    stat: '~45',
    statLabel: 'Minutes Avg',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Examination & Preparation',
    shortTitle: 'Prepare',
    description:
      'We gently remove decay and prepare the tooth, preserving as much healthy structure as possible.',
    details: [
      'Local anesthesia for comfort',
      'Careful decay removal',
      'Tooth structure preservation',
      'Surface preparation',
    ],
    duration: '~10 min',
    icon: Eye,
  },
  {
    step: 2,
    title: 'Bonding Application',
    shortTitle: 'Bond',
    description:
      'A special conditioning gel and bonding agent are applied to help the filling adhere strongly to your tooth.',
    details: [
      'Acid etching gel applied',
      'Primer layer placement',
      'Bonding agent application',
      'Light cure activation',
    ],
    duration: '~5 min',
    icon: Droplets,
  },
  {
    step: 3,
    title: 'Composite Layering',
    shortTitle: 'Layer',
    description:
      'The tooth-colored composite material is applied in thin layers, each hardened with a curing light.',
    details: [
      'Shade-matched composite selected',
      'Layered application technique',
      'UV light curing per layer',
      'Optimal strength building',
    ],
    duration: '~15 min',
    icon: Layers,
  },
  {
    step: 4,
    title: 'Shaping & Polishing',
    shortTitle: 'Polish',
    description:
      'The filling is carefully shaped to match your bite and polished for a natural, smooth finish.',
    details: [
      'Bite adjustment check',
      'Surface contouring',
      'Multi-stage polishing',
      'Final luster application',
    ],
    duration: '~10 min',
    icon: Gem,
  },
];

const comparisonData = [
  {
    feature: 'Appearance',
    composite: 'Natural tooth color',
    amalgam: 'Silver/gray metallic',
    winner: 'composite',
  },
  {
    feature: 'Mercury Content',
    composite: 'None - 100% metal-free',
    amalgam: 'Contains ~50% mercury',
    winner: 'composite',
  },
  {
    feature: 'Tooth Structure',
    composite: 'Minimal removal required',
    amalgam: 'More extensive removal',
    winner: 'composite',
  },
  {
    feature: 'Bonding',
    composite: 'Bonds directly to tooth',
    amalgam: 'Mechanical retention only',
    winner: 'composite',
  },
  {
    feature: 'Temperature Sensitivity',
    composite: 'Insulates well',
    amalgam: 'Conducts hot/cold',
    winner: 'composite',
  },
  {
    feature: 'Durability',
    composite: '5-10+ years',
    amalgam: '10-15+ years',
    winner: 'amalgam',
  },
];

const shadeGuide = [
  { name: 'A1', color: '#FFFEF0', description: 'Light Reddish-Brown' },
  { name: 'A2', color: '#FFF8E7', description: 'Medium Reddish-Brown' },
  { name: 'A3', color: '#FFEFD5', description: 'Dark Reddish-Brown' },
  { name: 'A3.5', color: '#FFE4C4', description: 'Darker Reddish-Brown' },
  { name: 'B1', color: '#FFFAF5', description: 'Light Reddish-Yellow' },
  { name: 'B2', color: '#FFF5EB', description: 'Medium Reddish-Yellow' },
  { name: 'C1', color: '#F5F5F0', description: 'Light Grayish' },
  { name: 'C2', color: '#EEEEE8', description: 'Medium Grayish' },
  { name: 'D2', color: '#FFFAF0', description: 'Reddish-Gray' },
  { name: 'D3', color: '#FFF8E5', description: 'Grayish-Brown' },
];

const materialLayers = [
  {
    name: 'Enamel Shade',
    description: 'Translucent outer layer for natural light refraction',
    gradient: 'from-white/90 via-blue-50/30 to-white/80',
    height: '25%',
  },
  {
    name: 'Dentin Shade',
    description: 'Core body shade that provides natural opacity',
    gradient: 'from-amber-50 via-yellow-50 to-orange-50/50',
    height: '45%',
  },
  {
    name: 'Bonding Layer',
    description: 'Adhesive interface connecting filling to tooth',
    gradient: 'from-blue-100/50 via-blue-50/30 to-transparent',
    height: '15%',
  },
  {
    name: 'Natural Tooth',
    description: 'Your existing healthy tooth structure',
    gradient: 'from-[#F5EDE5] via-[#EDE5DD] to-[#DDD5CD]',
    height: '15%',
  },
];

const relatedServices = [
  {
    title: 'Root Canal Treatment',
    description:
      'Save infected teeth and relieve pain with our gentle root canal therapy.',
    href: '/services/root-canal',
    icon: Shield,
  },
  {
    title: 'Dental Checkups',
    description:
      'Regular examinations to catch cavities early and maintain optimal oral health.',
    href: '/services/routine-checkups',
    icon: Stethoscope,
  },
  {
    title: 'Teeth Whitening',
    description:
      'Brighten your smile with professional whitening for a radiant appearance.',
    href: '/services/teeth-whitening',
    icon: Sparkles,
  },
];

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
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
      ease: [0.22, 1, 0.36, 1],
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================================================
// UTILITY HOOKS
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
// CUSTOM SVG ILLUSTRATIONS
// ============================================================================

// Tooth with filling illustration - clean, recognizable shape
function ToothFillingIllustration({ className = '', fillingColor = '#FFF8E7' }: { className?: string; fillingColor?: string }) {
  return (
    <svg viewBox="0 0 120 160" fill="none" className={className} aria-hidden="true">
      {/* Tooth outline - molar shape */}
      <path
        d="M20 60C20 30 35 10 60 10C85 10 100 30 100 60C100 80 95 100 90 120C87 135 80 150 70 155C65 158 55 158 50 155C40 150 33 135 30 120C25 100 20 80 20 60Z"
        fill="#FDFBF9"
        stroke="#E5DDD5"
        strokeWidth="2"
      />
      {/* Crown cusps */}
      <path
        d="M30 50C30 35 42 20 60 20C78 20 90 35 90 50"
        fill="none"
        stroke="#E5DDD5"
        strokeWidth="1.5"
      />
      {/* Filling area */}
      <ellipse
        cx="60"
        cy="45"
        rx="22"
        ry="15"
        fill={fillingColor}
        stroke="#D4C8B8"
        strokeWidth="1"
      />
      {/* Filling highlight */}
      <ellipse
        cx="55"
        cy="40"
        rx="12"
        ry="6"
        fill="white"
        opacity="0.5"
      />
      {/* Root lines */}
      <path
        d="M45 120C43 135 42 145 45 155"
        stroke="#E5DDD5"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M75 120C77 135 78 145 75 155"
        stroke="#E5DDD5"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

// Before/After comparison illustration
function BeforeAfterIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 100" fill="none" className={className} aria-hidden="true">
      {/* Before - tooth with cavity */}
      <g>
        <text x="50" y="15" fontSize="10" fill="#9CA3AF" textAnchor="middle">Before</text>
        <path
          d="M30 35C30 25 40 20 50 20C60 20 70 25 70 35C70 45 68 55 65 65C63 72 58 78 50 78C42 78 37 72 35 65C32 55 30 45 30 35Z"
          fill="#FDFBF9"
          stroke="#E5DDD5"
          strokeWidth="1.5"
        />
        {/* Cavity/decay */}
        <ellipse cx="50" cy="35" rx="10" ry="8" fill="#4A4A4A" />
        <ellipse cx="48" cy="33" rx="3" ry="2" fill="#6B6B6B" />
      </g>

      {/* Arrow */}
      <path
        d="M90 50 L130 50 M125 45 L130 50 L125 55"
        stroke="#722F37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* After - tooth with white filling */}
      <g>
        <text x="180" y="15" fontSize="10" fill="#9CA3AF" textAnchor="middle">After</text>
        <path
          d="M160 35C160 25 170 20 180 20C190 20 200 25 200 35C200 45 198 55 195 65C193 72 188 78 180 78C172 78 167 72 165 65C162 55 160 45 160 35Z"
          fill="#FDFBF9"
          stroke="#E5DDD5"
          strokeWidth="1.5"
        />
        {/* White filling */}
        <ellipse cx="180" cy="35" rx="10" ry="8" fill="#FFF8E7" stroke="#E8DFD5" strokeWidth="0.5" />
        <ellipse cx="177" cy="32" rx="4" ry="2" fill="white" opacity="0.6" />
      </g>
    </svg>
  );
}

// Layering process illustration
function LayeringIllustration({ className = '', activeLayer = -1 }: { className?: string; activeLayer?: number }) {
  const layers = [
    { y: 10, height: 20, fill: 'url(#enamelGradient)', label: 'Enamel' },
    { y: 30, height: 35, fill: 'url(#dentinGradient)', label: 'Dentin' },
    { y: 65, height: 15, fill: 'url(#bondingGradient)', label: 'Bonding' },
    { y: 80, height: 20, fill: 'url(#toothGradient)', label: 'Tooth' },
  ];

  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="enamelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F8FF" />
        </linearGradient>
        <linearGradient id="dentinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="100%" stopColor="#FFEFD5" />
        </linearGradient>
        <linearGradient id="bondingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0F0FF" />
          <stop offset="100%" stopColor="#D0E8FF" />
        </linearGradient>
        <linearGradient id="toothGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5EDE5" />
          <stop offset="100%" stopColor="#EDE5DD" />
        </linearGradient>
      </defs>

      {/* Tooth cross-section shape */}
      <clipPath id="toothClip">
        <path d="M30 10 Q80 0 130 10 Q140 50 135 90 Q80 110 30 90 Q20 50 30 10Z" />
      </clipPath>

      <g clipPath="url(#toothClip)">
        {layers.map((layer, index) => (
          <rect
            key={index}
            x="20"
            y={layer.y}
            width="120"
            height={layer.height}
            fill={layer.fill}
            opacity={activeLayer === -1 || activeLayer === index ? 1 : 0.4}
            style={{ transition: 'opacity 0.3s ease' }}
          />
        ))}
      </g>

      {/* Outline */}
      <path
        d="M30 10 Q80 0 130 10 Q140 50 135 90 Q80 110 30 90 Q20 50 30 10Z"
        fill="none"
        stroke="#D4C8B8"
        strokeWidth="2"
      />
    </svg>
  );
}

// Shade matching illustration
function ShadeMatchIllustration({ className = '', selectedShade = '#FFF8E7' }: { className?: string; selectedShade?: string }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" className={className} aria-hidden="true">
      {/* Shade guide fan */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = -20 + i * 10;
        const colors = ['#FFFEF0', '#FFF8E7', '#FFEFD5', '#FFE4C4', '#FFFAF5'];
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <rect
              x="90"
              y="20"
              width="20"
              height="60"
              rx="3"
              fill={colors[i]}
              stroke="#E5DDD5"
              strokeWidth="1"
            />
            <rect
              x="93"
              y="70"
              width="14"
              height="15"
              fill="#8B7355"
              rx="2"
            />
          </g>
        );
      })}

      {/* Selected indicator */}
      <circle cx="100" cy="100" r="8" fill="#722F37" />
      <text x="100" y="118" fontSize="8" fill="#722F37" textAnchor="middle" fontWeight="600">
        Perfect Match
      </text>
    </svg>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const [selectedShade, setSelectedShade] = useState(1);
  const shadeColors = ['#FFFEF0', '#FFF8E7', '#FFEFD5', '#FFE4C4', '#FFFAF5'];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#FDFCFB] via-[#F8F6F3] to-[#F5F2EF]"
    >
      {/* Hero background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/services/white-fillings/shade-guide-hero.jpg"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCFB]/95 via-[#F8F6F3]/90 to-[#F5F2EF]/95" />
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Organic blob shapes */}
        <motion.div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(114,47,55,0.04) 0%, transparent 70%)',
            y,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(245,237,229,0.8) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Floating tooth illustration */}
        <motion.div
          className="absolute top-1/4 right-[15%] w-20 h-28 opacity-10"
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ToothFillingIllustration className="w-full h-full" fillingColor={shadeColors[selectedShade]} />
        </motion.div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #722F37 1px, transparent 1px),
              linear-gradient(to bottom, #722F37 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Breadcrumb */}
            <motion.nav variants={itemVariants} className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-neutral-500 hover:text-[#722F37] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4 text-neutral-300" aria-hidden="true" />
                <li>
                  <Link
                    href="/services"
                    className="text-neutral-500 hover:text-[#722F37] transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4 text-neutral-300" aria-hidden="true" />
                <li className="text-[#722F37] font-medium">White Fillings</li>
              </ol>
            </motion.nav>

            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 text-emerald-700 text-sm font-medium">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                100% Mercury-Free
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight mb-6"
            >
              <span className="block">White</span>
              <span className="block bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] bg-clip-text text-transparent">
                Fillings
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-neutral-600 leading-relaxed mb-10 max-w-lg"
            >
              Restore your smile naturally with tooth-colored composite fillings.
              Seamlessly matched to your teeth for{' '}
              <span className="text-[#722F37] font-medium">invisible restorations</span>{' '}
              that look and feel completely natural.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact#book">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-2xl overflow-hidden shadow-lg shadow-[#722F37]/25"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                    Book Consultation
                  </span>
                </motion.button>
              </Link>

              <motion.a
                href="tel:+16137336446"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-medium bg-white text-[#722F37] border-2 border-[#722F37]/20 hover:border-[#722F37]/40 hover:bg-[#FDF8F3] transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                (613) 733-6446
              </motion.a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { value: '5-10+', label: 'Year Lifespan', icon: Clock },
                { value: '~45', label: 'Min Procedure', icon: Timer },
                { value: '16+', label: 'Shade Options', icon: Palette },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-[#722F37]/60" aria-hidden="true" />
                  <div className="text-2xl font-bold text-[#722F37]">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Shade Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main visualization card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-neutral-100">
              {/* Hero image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/services/white-fillings/confident-smile.jpg"
                  alt="Beautiful natural smile showing results of white filling restorations"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-neutral-800 text-sm font-medium">
                    <Sparkles className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
                    Natural-Looking Results
                  </span>
                </div>
              </div>

              {/* Shade selector */}
              <div className="p-4 bg-[#FDF8F3] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-800 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                    Shade Matching
                  </h3>
                </div>
                <div className="flex gap-2 justify-center flex-wrap" role="group" aria-label="Select tooth shade">
                  {shadeColors.map((color, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedShade(index)}
                      aria-label={`Shade ${shadeGuide[index]?.name}`}
                      aria-pressed={selectedShade === index}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        selectedShade === index
                          ? 'border-[#722F37] ring-2 ring-[#722F37]/30 scale-110'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                      style={{ backgroundColor: color }}
                      whileHover={{ scale: selectedShade === index ? 1.1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-500 text-center mt-3">
                  Selected: <span className="font-medium text-[#722F37]">{shadeGuide[selectedShade]?.name}</span> - {shadeGuide[selectedShade]?.description}
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-[#722F37]/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-dashed border-amber-200/50"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-neutral-300 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#722F37]"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// BEFORE/AFTER VISUAL SECTION
// ============================================================================

function BeforeAfterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Invisible Restorations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Seamless, Natural Results
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            White fillings blend perfectly with your natural tooth structure, making restorations virtually invisible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative p-8 bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl border border-neutral-100 shadow-lg">
              <BeforeAfterIllustration className="w-full max-w-sm h-auto" />
              <div className="mt-4 flex justify-center gap-8">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <div className="w-3 h-3 rounded-full bg-neutral-400" aria-hidden="true" />
                  Cavity/Decay
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <div className="w-3 h-3 rounded-full bg-[#FFF8E7] border border-neutral-300" aria-hidden="true" />
                  White Filling
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {[
              { icon: Eye, title: 'Invisible to the Eye', desc: 'Matches your natural tooth color perfectly' },
              { icon: ShieldCheck, title: 'Preserves Tooth Structure', desc: 'Requires less drilling than metal fillings' },
              { icon: ThumbsUp, title: 'Bonds Directly', desc: 'Creates a stronger, more stable restoration' },
              { icon: Lightbulb, title: 'Modern Materials', desc: 'Advanced composites that last for years' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-100 hover:border-[#722F37]/20 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
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
// COMPOSITE VS AMALGAM COMPARISON
// ============================================================================

function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4">
            Material Comparison
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Composite vs Amalgam
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            See why modern composite fillings have become the preferred choice for
            tooth-colored restorations.
          </p>
        </motion.div>

        {/* Visual Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Composite Side */}
            <motion.div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-white to-[#FDF8F3] border border-[#722F37]/20 shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                  <BadgeCheck className="w-3 h-3" aria-hidden="true" />
                  RECOMMENDED
                </span>
              </div>

              {/* Tooth visualization */}
              <div className="relative w-24 h-32 mx-auto mb-6">
                <ToothFillingIllustration className="w-full h-full" fillingColor="#FFF8E7" />
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-2 text-center">
                White Composite
              </h3>
              <p className="text-neutral-600 text-center mb-6">
                Tooth-colored, mercury-free restoration
              </p>

              <ul className="space-y-3">
                {[
                  'Natural appearance',
                  'Bonds to tooth structure',
                  'Mercury-free composition',
                  'Minimal tooth removal',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 text-neutral-700"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center" aria-hidden="true">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Amalgam Side */}
            <motion.div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 shadow-lg opacity-75"
              whileHover={{ y: -5, opacity: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-neutral-200 text-neutral-600 text-xs font-semibold">
                  TRADITIONAL
                </span>
              </div>

              {/* Tooth visualization with silver filling */}
              <div className="relative w-24 h-32 mx-auto mb-6">
                <ToothFillingIllustration className="w-full h-full" fillingColor="#9CA3AF" />
              </div>

              <h3 className="text-2xl font-bold text-neutral-700 mb-2 text-center">
                Silver Amalgam
              </h3>
              <p className="text-neutral-500 text-center mb-6">
                Traditional metal filling material
              </p>

              <ul className="space-y-3">
                {[
                  'Visible metal appearance',
                  'Mechanical retention only',
                  'Contains mercury (~50%)',
                  'More tooth removal needed',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 text-neutral-500"
                  >
                    <div className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center" aria-hidden="true">
                      <X className="w-3 h-3 text-neutral-400" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Detailed Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white">
              <div className="p-4 font-semibold">Feature</div>
              <div className="p-4 font-semibold text-center">White Composite</div>
              <div className="p-4 font-semibold text-center">Silver Amalgam</div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-3 border-b border-neutral-100 last:border-0 transition-colors ${
                  activeRow === index ? 'bg-[#FDF8F3]' : 'hover:bg-neutral-50'
                }`}
                onMouseEnter={() => setActiveRow(index)}
                onMouseLeave={() => setActiveRow(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <div className="p-4 font-medium text-neutral-800">{row.feature}</div>
                <div
                  className={`p-4 text-center ${
                    row.winner === 'composite' ? 'text-emerald-600 font-medium' : 'text-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {row.winner === 'composite' && (
                      <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    )}
                    {row.composite}
                  </div>
                </div>
                <div
                  className={`p-4 text-center ${
                    row.winner === 'amalgam' ? 'text-emerald-600 font-medium' : 'text-neutral-500'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {row.winner === 'amalgam' && (
                      <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    )}
                    {row.amalgam}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// BENEFITS SECTION
// ============================================================================

function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
            <Award className="w-4 h-4" aria-hidden="true" />
            Key Benefits
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Why Choose White Fillings?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Modern composite fillings offer significant advantages for a healthier,
            more beautiful smile.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <motion.div
                className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white to-[#FDF8F3] border border-neutral-100 overflow-hidden"
                whileHover={{
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(114, 47, 55, 0.15)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <motion.div
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-6 text-[#722F37]"
                  animate={{
                    rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <benefit.icon className="w-8 h-8" aria-hidden="true" />
                </motion.div>

                {/* Stat */}
                <div className="relative mb-4">
                  <motion.span
                    className="text-4xl font-bold bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent"
                    animate={{
                      scale: hoveredIndex === index ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {benefit.stat}
                  </motion.span>
                  <span className="block text-sm text-neutral-500 mt-1">
                    {benefit.statLabel}
                  </span>
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="relative text-neutral-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative corner element */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-gradient-to-br from-[#722F37]/5 to-transparent"
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MATERIAL TECHNOLOGY SECTION
// ============================================================================

function MaterialTechnologySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#FDF8F3] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4"
            >
              <Layers className="w-4 h-4" aria-hidden="true" />
              Advanced Materials
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
            >
              Multi-Layer{' '}
              <span className="bg-gradient-to-r from-[#722F37] to-[#8B3A42] bg-clip-text text-transparent">
                Technology
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-neutral-600 leading-relaxed mb-8"
            >
              Modern composite fillings use sophisticated layering techniques to mimic
              the natural optical properties of your teeth, creating restorations that
              are virtually indistinguishable from natural enamel.
            </motion.p>

            {/* Layer descriptions */}
            <motion.div variants={containerVariants} className="space-y-4" role="tablist">
              {materialLayers.map((layer, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  role="tab"
                  aria-selected={activeLayer === index}
                  aria-controls={`layer-panel-${index}`}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeLayer === index
                      ? 'bg-white border-[#722F37]/30 shadow-lg'
                      : 'bg-transparent border-neutral-200 hover:border-neutral-300'
                  }`}
                  onClick={() => setActiveLayer(index)}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeLayer === index
                          ? 'bg-[#722F37] scale-125'
                          : 'bg-neutral-300'
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900">{layer.name}</h4>
                      <AnimatePresence>
                        {activeLayer === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-neutral-600 mt-1"
                            id={`layer-panel-${index}`}
                            role="tabpanel"
                          >
                            {layer.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Mercury-free badge */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200/50"
            >
              <ShieldCheck className="w-8 h-8 text-emerald-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-neutral-900">100% Mercury-Free</p>
                <p className="text-sm text-neutral-600">
                  Safe, biocompatible materials for patients of all ages
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Layer Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Layering illustration */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-neutral-100">
                <LayeringIllustration className="w-full h-auto" activeLayer={activeLayer} />

                {/* Layer labels */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {materialLayers.map((layer, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveLayer(index)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        activeLayer === index
                          ? 'bg-[#722F37]/10 border border-[#722F37]/30'
                          : 'bg-neutral-50 border border-transparent hover:bg-neutral-100'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mb-1 ${
                        activeLayer === index ? 'bg-[#722F37]' : 'bg-neutral-300'
                      }`} aria-hidden="true" />
                      <p className={`text-xs font-medium ${
                        activeLayer === index ? 'text-[#722F37]' : 'text-neutral-600'
                      }`}>
                        {layer.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -z-10 -top-10 -left-10 w-40 h-40 rounded-full bg-[#722F37]/5"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute -z-10 -bottom-10 -right-10 w-32 h-32 rounded-full bg-amber-200/30"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PROCEDURE SECTION
// ============================================================================

function ProcedureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentProcedure = procedureSteps[activeStep]!;

  // Auto-advance steps
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % procedureSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Stethoscope className="w-4 h-4" aria-hidden="true" />
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            What to Expect
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Getting a white filling is a comfortable, straightforward process typically
            completed in a single visit.
          </p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between relative" role="tablist" aria-label="Procedure steps">
            {/* Progress line background */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-neutral-200 rounded-full" aria-hidden="true" />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep / (procedureSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              aria-hidden="true"
            />

            {/* Step indicators */}
            {procedureSteps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveStep(index);
                  setIsPlaying(false);
                }}
                className="relative z-10 flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                role="tab"
                aria-selected={index === activeStep}
                aria-label={`Step ${step.step}: ${step.title}`}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    index <= activeStep
                      ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42] border-[#722F37] text-white'
                      : 'bg-white border-neutral-200 text-neutral-400'
                  }`}
                  animate={{
                    scale: index === activeStep ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: index === activeStep ? Infinity : 0, repeatDelay: 3 }}
                >
                  <step.icon className="w-5 h-5" aria-hidden="true" />
                </motion.div>
                <span
                  className={`mt-3 text-sm font-medium transition-colors ${
                    index === activeStep ? 'text-[#722F37]' : 'text-neutral-500'
                  }`}
                >
                  {step.shortTitle}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Active step details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8 items-center"
              role="tabpanel"
              aria-label={`Step ${currentProcedure.step}: ${currentProcedure.title}`}
            >
              {/* Step visualization */}
              <div className="relative aspect-square max-w-sm mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] overflow-hidden"
                  animate={{
                    boxShadow: [
                      '0 20px 40px -12px rgba(114, 47, 55, 0.1)',
                      '0 25px 50px -12px rgba(114, 47, 55, 0.15)',
                      '0 20px 40px -12px rgba(114, 47, 55, 0.1)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Step-specific animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {React.createElement(currentProcedure.icon, {
                        className: 'w-16 h-16 text-[#722F37]',
                        'aria-hidden': true,
                      })}
                    </motion.div>
                  </div>

                  {/* Animated particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-[#722F37]/20"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        x: [-5, 5, -5],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </motion.div>

                {/* Duration badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 px-4 py-2 bg-white rounded-xl shadow-lg border border-neutral-100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
                    <span className="font-semibold text-neutral-800">
                      {currentProcedure.duration}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Step content */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-4">
                  Step {currentProcedure.step} of {procedureSteps.length}
                </span>

                <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                  {currentProcedure.title}
                </h3>

                <p className="text-lg text-neutral-600 mb-6">
                  {currentProcedure.description}
                </p>

                <ul className="space-y-3">
                  {currentProcedure.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-neutral-700"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Play/Pause control */}
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause auto-advance' : 'Play auto-advance'}
            >
              {isPlaying ? (
                <>
                  <div className="w-4 h-4 flex items-center gap-0.5" aria-hidden="true">
                    <div className="w-1 h-3 bg-current" />
                    <div className="w-1 h-3 bg-current" />
                  </div>
                  <span className="text-sm font-medium">Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-sm font-medium">Play</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Quick info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white">
            {/* Background image */}
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/images/services/white-fillings/dental-clinic.jpg"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
            <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Timer className="w-10 h-10" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Quick & Comfortable</h3>
                <p className="text-white/80">
                  Most white fillings are completed in just 45 minutes. Local anesthesia
                  ensures your complete comfort throughout the procedure.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
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
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <CircleCheck className="w-4 h-4" aria-hidden="true" />
            Have Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-neutral-600">
            Find answers to common questions about white fillings.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`rounded-2xl border overflow-hidden transition-all ${
                  openIndex === index
                    ? 'border-[#722F37]/20 shadow-lg bg-white'
                    : 'border-neutral-200 bg-white/50 hover:border-neutral-300'
                }`}
                layout
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50"
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
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5 text-[#722F37]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-600 mb-4">Still have questions? We're happy to help.</p>
          <motion.a
            href="tel:+16137336446"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
            whileHover={{ x: 3 }}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Call us at (613) 733-6446
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES SECTION
// ============================================================================

function RelatedServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-4">
            <Heart className="w-4 h-4" aria-hidden="true" />
            Explore More
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Related Services
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Discover other services that complement your dental care needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {relatedServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <motion.div
                  className="group relative h-full p-8 rounded-3xl bg-gradient-to-br from-white to-[#FDF8F3] border border-neutral-100 overflow-hidden"
                  whileHover={{
                    y: -8,
                    boxShadow: '0 25px 50px -12px rgba(114, 47, 55, 0.15)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-6 text-[#722F37]"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="w-7 h-7" aria-hidden="true" />
                  </motion.div>

                  <h3 className="relative text-xl font-bold text-neutral-900 mb-3 group-hover:text-[#722F37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="relative text-neutral-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <motion.div
                    className="relative inline-flex items-center gap-2 text-[#722F37] font-semibold"
                    whileHover={{ x: 4 }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const magnetic = useMagnetic(0.2);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/services/white-fillings/dental-procedure.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          aria-hidden="true"
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/5"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.1)',
                '0 0 40px rgba(255,255,255,0.2)',
                '0 0 20px rgba(255,255,255,0.1)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Natural-Looking Results
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready for a{' '}
            <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
              Natural-Looking
            </span>{' '}
            Smile?
          </h2>

          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Schedule your appointment today and discover how white fillings can restore
            your teeth while preserving your natural appearance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              style={{ x: magnetic.x, y: magnetic.y }}
              onMouseMove={magnetic.handleMouseMove}
              onMouseLeave={magnetic.handleMouseLeave}
            >
              <Link href="/contact#book">
                <motion.button
                  className="group relative px-10 py-5 bg-white text-[#722F37] font-bold rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-50 to-white"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  />
                  <span className="relative flex items-center justify-center gap-3 text-lg">
                    <Calendar className="w-6 h-6" aria-hidden="true" />
                    Book Your Appointment
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            <motion.a
              href="tel:+16137336446"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-6 h-6" aria-hidden="true" />
              (613) 733-6446
            </motion.a>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-white/60"
          >
            {[
              { icon: ShieldCheck, text: 'Mercury-Free' },
              { icon: Zap, text: 'Same-Day Service' },
              { icon: Heart, text: 'Gentle Care' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function WhiteFillingsContent() {
  return (
    <main id="main-content" className="min-h-screen">
      <HeroSection />
      <BeforeAfterSection />
      <ComparisonSection />
      <BenefitsSection />
      <MaterialTechnologySection />
      <ProcedureSection />
      <FAQSection />
      <RelatedServicesSection />
      <CTASection />
    </main>
  );
}
