'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  ChevronDown,
  Check,
  Sparkles,
  Shield,
  Clock,
  Heart,
  Smile,
  Star,
  ArrowRight,
  Quote,
  Sun,
  Coffee,
  Users,
  Utensils,
  MessageCircle,
  Droplets,
  Moon,
  AlertCircle,
  Award,
  ThumbsUp,
  RefreshCw,
  Layers,
  CircleDot,
  ChevronRight,
  CircleCheck,
  HandHeart,
  Stethoscope,
  BadgeCheck,
  Zap,
  Target,
  Gem,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// SVG ILLUSTRATIONS - Custom dental-themed visuals
// ============================================================================

// Complete Dentures Illustration - Full arch of teeth
function CompleteDenturesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Gum base */}
      <path
        d="M10 50 Q60 70 110 50 Q110 35 60 25 Q10 35 10 50Z"
        fill="#FECACA"
        stroke="#F87171"
        strokeWidth="1.5"
      />
      {/* Teeth row */}
      <g fill="white" stroke="#E5E5E5" strokeWidth="1">
        {/* Front teeth */}
        <rect x="45" y="32" width="8" height="14" rx="2" />
        <rect x="54" y="32" width="8" height="14" rx="2" />
        <rect x="63" y="32" width="8" height="14" rx="2" />
        {/* Left teeth */}
        <rect x="36" y="34" width="8" height="12" rx="2" transform="rotate(-10 36 34)" />
        <rect x="26" y="38" width="8" height="11" rx="2" transform="rotate(-20 26 38)" />
        <rect x="17" y="44" width="7" height="10" rx="2" transform="rotate(-30 17 44)" />
        {/* Right teeth */}
        <rect x="72" y="32" width="8" height="12" rx="2" transform="rotate(10 76 34)" />
        <rect x="82" y="34" width="8" height="11" rx="2" transform="rotate(20 86 38)" />
        <rect x="91" y="40" width="7" height="10" rx="2" transform="rotate(30 95 44)" />
      </g>
      {/* Shine effect */}
      <ellipse cx="56" cy="38" rx="3" ry="2" fill="#F0F9FF" opacity="0.6" />
    </svg>
  );
}

// Partial Dentures Illustration - Some teeth with clasps
function PartialDenturesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Metal framework */}
      <path
        d="M25 45 Q60 55 95 45"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Clasps */}
      <path d="M25 45 Q20 40 22 35" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M95 45 Q100 40 98 35" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      {/* Gum sections */}
      <ellipse cx="45" cy="42" rx="12" ry="8" fill="#FECACA" stroke="#F87171" strokeWidth="1" />
      <ellipse cx="75" cy="42" rx="12" ry="8" fill="#FECACA" stroke="#F87171" strokeWidth="1" />
      {/* Replacement teeth */}
      <g fill="white" stroke="#E5E5E5" strokeWidth="1">
        <rect x="38" y="35" width="7" height="11" rx="2" />
        <rect x="46" y="35" width="7" height="11" rx="2" />
        <rect x="68" y="35" width="7" height="11" rx="2" />
        <rect x="76" y="35" width="7" height="11" rx="2" />
      </g>
      {/* Natural teeth (darker/shaded) */}
      <g fill="#F5F5F4" stroke="#D4D4D4" strokeWidth="1">
        <rect x="20" y="30" width="6" height="10" rx="1.5" />
        <rect x="94" y="30" width="6" height="10" rx="1.5" />
      </g>
    </svg>
  );
}

// Implant-Supported Dentures Illustration - Teeth with implant screws
function ImplantDenturesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Jawbone base */}
      <path
        d="M15 70 Q60 80 105 70 L100 55 Q60 65 20 55 Z"
        fill="#E7E5E4"
        stroke="#A8A29E"
        strokeWidth="1"
      />
      {/* Implant posts */}
      <g fill="#71717A" stroke="#52525B" strokeWidth="0.5">
        <rect x="32" y="50" width="4" height="18" rx="1" />
        <rect x="57" y="50" width="4" height="18" rx="1" />
        <rect x="82" y="50" width="4" height="18" rx="1" />
        {/* Screw threads */}
        <line x1="32" y1="55" x2="36" y2="55" stroke="#52525B" strokeWidth="0.5" />
        <line x1="32" y1="60" x2="36" y2="60" stroke="#52525B" strokeWidth="0.5" />
        <line x1="57" y1="55" x2="61" y2="55" stroke="#52525B" strokeWidth="0.5" />
        <line x1="57" y1="60" x2="61" y2="60" stroke="#52525B" strokeWidth="0.5" />
        <line x1="82" y1="55" x2="86" y2="55" stroke="#52525B" strokeWidth="0.5" />
        <line x1="82" y1="60" x2="86" y2="60" stroke="#52525B" strokeWidth="0.5" />
      </g>
      {/* Denture base */}
      <path
        d="M20 48 Q60 58 100 48 Q100 38 60 30 Q20 38 20 48Z"
        fill="#FECACA"
        stroke="#F87171"
        strokeWidth="1.5"
      />
      {/* Teeth */}
      <g fill="white" stroke="#E5E5E5" strokeWidth="1">
        <rect x="48" y="32" width="7" height="12" rx="2" />
        <rect x="56" y="32" width="7" height="12" rx="2" />
        <rect x="64" y="32" width="7" height="12" rx="2" />
        <rect x="40" y="34" width="7" height="10" rx="2" transform="rotate(-8 40 34)" />
        <rect x="72" y="32" width="7" height="10" rx="2" transform="rotate(8 76 34)" />
        <rect x="30" y="38" width="6" height="9" rx="2" transform="rotate(-20 30 38)" />
        <rect x="84" y="36" width="6" height="9" rx="2" transform="rotate(20 88 38)" />
      </g>
      {/* Connection indicators */}
      <g fill="#722F37">
        <circle cx="34" cy="48" r="2" />
        <circle cx="59" cy="48" r="2" />
        <circle cx="84" cy="48" r="2" />
      </g>
    </svg>
  );
}

// Denture Care Illustration - Cleaning tools
function DentureCareIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Container/glass */}
      <path
        d="M35 25 L30 70 Q30 75 35 75 L65 75 Q70 75 70 70 L65 25 Z"
        fill="#DBEAFE"
        stroke="#60A5FA"
        strokeWidth="1.5"
      />
      {/* Water line */}
      <path d="M32 40 Q50 45 68 40" stroke="#93C5FD" strokeWidth="1" fill="none" />
      {/* Dentures in water */}
      <ellipse cx="50" cy="55" rx="14" ry="8" fill="#FECACA" opacity="0.8" />
      <g fill="white" stroke="#E5E5E5" strokeWidth="0.5" opacity="0.9">
        <rect x="42" y="51" width="4" height="7" rx="1" />
        <rect x="47" y="51" width="4" height="7" rx="1" />
        <rect x="52" y="51" width="4" height="7" rx="1" />
        <rect x="57" y="51" width="4" height="7" rx="1" />
      </g>
      {/* Bubbles */}
      <circle cx="38" cy="50" r="2" fill="#BFDBFE" />
      <circle cx="60" cy="45" r="1.5" fill="#BFDBFE" />
      <circle cx="45" cy="42" r="1" fill="#BFDBFE" />
      {/* Toothbrush */}
      <g transform="translate(75, 20) rotate(15)">
        <rect x="0" y="0" width="8" height="35" rx="2" fill="#A78BFA" stroke="#7C3AED" strokeWidth="1" />
        <rect x="-1" y="35" width="10" height="15" rx="2" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1" />
        {/* Bristles */}
        <g fill="#C4B5FD">
          <rect x="0" y="37" width="2" height="5" rx="0.5" />
          <rect x="3" y="37" width="2" height="5" rx="0.5" />
          <rect x="6" y="37" width="2" height="5" rx="0.5" />
        </g>
      </g>
    </svg>
  );
}

// Smile Transformation Illustration
function SmileTransformIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Before - sad/incomplete smile */}
      <g transform="translate(10, 10)">
        <circle cx="20" cy="20" r="18" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1.5" />
        {/* Eyes */}
        <circle cx="14" cy="16" r="2" fill="#78716C" />
        <circle cx="26" cy="16" r="2" fill="#78716C" />
        {/* Sad mouth with missing teeth */}
        <path d="M12 28 Q20 24 28 28" fill="none" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      {/* Arrow */}
      <g transform="translate(50, 20)">
        <path d="M0 10 L15 10" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 5 L17 10 L12 15" fill="none" stroke="#722F37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* After - happy smile */}
      <g transform="translate(70, 10)">
        <circle cx="20" cy="20" r="18" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1.5" />
        {/* Happy eyes */}
        <path d="M12 14 Q14 12 16 14" fill="none" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 14 Q26 12 28 14" fill="none" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
        {/* Big smile with teeth */}
        <path d="M12 24 Q20 32 28 24" fill="white" stroke="#78716C" strokeWidth="1.5" />
        {/* Teeth detail */}
        <line x1="16" y1="24" x2="16" y2="27" stroke="#E5E5E5" strokeWidth="0.5" />
        <line x1="20" y1="24" x2="20" y2="28" stroke="#E5E5E5" strokeWidth="0.5" />
        <line x1="24" y1="24" x2="24" y2="27" stroke="#E5E5E5" strokeWidth="0.5" />
      </g>
      {/* Sparkles around happy face */}
      <g fill="#722F37">
        <path d="M100 8 L101 12 L105 13 L101 14 L100 18 L99 14 L95 13 L99 12 Z" />
        <path d="M108 25 L108.5 27 L110.5 27.5 L108.5 28 L108 30 L107.5 28 L105.5 27.5 L107.5 27 Z" />
      </g>
    </svg>
  );
}

// ============================================================================
// DATA
// ============================================================================

const faqs = [
  {
    question: 'How long do dentures last?',
    answer:
      'Dentures typically last 5-10 years before needing replacement. However, your mouth naturally changes over time, so regular adjustments may be needed to maintain proper fit and comfort. We recommend annual checkups to ensure your dentures continue to fit well and function properly.',
  },
  {
    question: 'Will dentures affect my speech?',
    answer:
      'There may be a brief adjustment period when you first get dentures. Some people notice minor changes in their speech initially, but most patients adapt quickly within a few days to a couple of weeks. Reading aloud and practicing speaking can help speed up this adjustment process.',
  },
  {
    question: 'Can I sleep with my dentures in?',
    answer:
      "It's generally recommended to remove dentures at night to give your gums a rest and maintain oral health. Wearing dentures continuously can lead to gum irritation and accelerate bone loss. Soaking them overnight in water or denture solution also helps keep them clean and maintains their shape.",
  },
  {
    question: 'How do I care for my dentures?',
    answer:
      'Proper denture care includes removing and rinsing them after eating, brushing daily with a soft-bristled denture brush and non-abrasive cleaner, handling them carefully over a soft surface, and soaking overnight in water or denture solution. Also, remember to clean your gums, tongue, and palate daily before inserting your dentures.',
  },
  {
    question: 'What is the difference between full and partial dentures?',
    answer:
      'Full dentures replace all teeth in an upper or lower arch and rest directly on the gums. Partial dentures replace only some missing teeth and attach to your remaining natural teeth using metal or plastic clasps. Your dentist will recommend the best option based on how many teeth need to be replaced and the health of your remaining teeth.',
  },
];

const dentureTypes = [
  {
    id: 'complete',
    title: 'Complete Dentures',
    subtitle: 'Full Arch Replacement',
    description:
      'Replace all teeth in the upper or lower arch. Available in conventional (after healing) or immediate (placed same day as extractions) options.',
    features: ['Full arch replacement', 'Natural gum appearance', 'Custom shade matching', 'Comfortable fit'],
    ideal: 'Ideal for patients missing all teeth in one or both arches',
    image: '/images/seniors/seniors-02.jpg',
    icon: <Layers className="w-7 h-7" />,
    illustration: CompleteDenturesIllustration,
    stats: { stability: 75, comfort: 85, aesthetics: 90 },
  },
  {
    id: 'partial',
    title: 'Partial Dentures',
    subtitle: 'Selective Tooth Replacement',
    description:
      'Ideal when some natural teeth remain. Attach to existing teeth with metal or plastic clasps for a secure, removable solution.',
    features: ['Preserves natural teeth', 'Metal or flexible options', 'Easy to adjust', 'Removable design'],
    ideal: 'Best for patients with some healthy natural teeth remaining',
    image: '/images/seniors/seniors-03.jpg',
    icon: <CircleDot className="w-7 h-7" />,
    illustration: PartialDenturesIllustration,
    stats: { stability: 80, comfort: 88, aesthetics: 85 },
  },
  {
    id: 'implant',
    title: 'Implant-Supported',
    subtitle: 'Maximum Stability',
    description:
      'Anchored by dental implants for superior stability. Eliminates slipping, improves chewing function, and helps preserve jawbone.',
    features: ['Maximum stability', 'Prevents bone loss', 'Like natural teeth', 'Long-lasting solution'],
    ideal: 'Perfect for patients seeking the most secure, permanent-feeling solution',
    image: '/images/seniors/seniors-04.jpg',
    icon: <Shield className="w-7 h-7" />,
    illustration: ImplantDenturesIllustration,
    stats: { stability: 98, comfort: 95, aesthetics: 95 },
  },
];

const benefits = [
  {
    icon: <Smile className="w-6 h-6" />,
    title: 'Natural Appearance',
    description: 'Custom-crafted to match your facial features and desired smile aesthetics.',
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    title: 'Restored Function',
    description: 'Eat your favorite foods with confidence and proper chewing ability.',
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Clear Speech',
    description: 'Speak clearly without worrying about slipping or clicking.',
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Facial Support',
    description: 'Maintain facial structure and prevent the sunken look from missing teeth.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Durable Materials',
    description: 'High-quality acrylics and porcelain for long-lasting results.',
  },
  {
    icon: <HandHeart className="w-6 h-6" />,
    title: 'Gentle Care',
    description: 'Compassionate treatment tailored to your comfort level.',
  },
];

const lifestyleImprovements = [
  {
    icon: <Utensils className="w-6 h-6" />,
    title: 'Enjoy Your Favorite Foods',
    description: 'Bite into apples, enjoy steaks, and savor corn on the cob again with confidence.',
    image: '/images/seniors/seniors-05.jpg',
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Speak with Clarity',
    description: 'Clear pronunciation and confident conversations in any social setting.',
    image: '/images/seniors/seniors-06.jpg',
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: 'Smile Without Worry',
    description: 'Natural-looking teeth that let you laugh, smile, and express yourself freely.',
    image: '/images/seniors/seniors-07.jpg',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Social Confidence',
    description: 'Feel comfortable in any social situation knowing your smile looks beautiful.',
    image: '/images/seniors/seniors-08.jpg',
  },
];

const procedureSteps = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'Comprehensive examination to assess your oral health, discuss goals, and explore the best denture options for your lifestyle.',
    duration: '45-60 min',
    icon: <Stethoscope className="w-6 h-6" />,
  },
  {
    step: '02',
    title: 'Precise Impressions',
    description: 'Detailed molds of your mouth ensure your custom dentures fit perfectly and look completely natural.',
    duration: '30-45 min',
    icon: <Target className="w-6 h-6" />,
  },
  {
    step: '03',
    title: 'Try-In Appointment',
    description: 'Preview your dentures in wax form. We adjust fit, bite, and aesthetics until everything is perfect.',
    duration: '30-45 min',
    icon: <Smile className="w-6 h-6" />,
  },
  {
    step: '04',
    title: 'Final Fitting',
    description: 'Receive your completed dentures with detailed care instructions and guidance for the adjustment period.',
    duration: '30-45 min',
    icon: <BadgeCheck className="w-6 h-6" />,
  },
  {
    step: '05',
    title: 'Follow-Up Care',
    description: 'We schedule follow-up visits to ensure optimal comfort and make any necessary adjustments.',
    duration: 'Ongoing',
    icon: <Heart className="w-6 h-6" />,
  },
];

const careGuide = [
  {
    icon: <Sun className="w-5 h-5" />,
    time: 'Morning',
    title: 'Daily Routine',
    tasks: ['Rinse dentures before wearing', 'Brush gums and tongue', 'Insert dentures carefully'],
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    time: 'After Meals',
    title: 'Post-Meal Care',
    tasks: ['Remove and rinse dentures', 'Clean food particles', 'Reinsert when clean'],
  },
  {
    icon: <Moon className="w-5 h-5" />,
    time: 'Nighttime',
    title: 'Overnight Care',
    tasks: ['Remove dentures', 'Brush with denture cleaner', 'Soak overnight in solution'],
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    time: 'Weekly',
    title: 'Deep Clean',
    tasks: ['Use effervescent cleaner', 'Check for damage', 'Inspect fit quality'],
  },
];

const testimonials = [
  {
    quote: "After years of struggling with ill-fitting dentures, I finally found a team that truly cares. My new dentures feel so natural I forget I'm wearing them.",
    author: "Margaret S.",
    age: "72",
    treatment: "Complete Dentures",
    rating: 5,
    image: '/images/seniors/seniors-09.jpg',
  },
  {
    quote: "The implant-supported dentures changed my life. I can eat anything now and my confidence has skyrocketed. Worth every penny.",
    author: "Robert K.",
    age: "68",
    treatment: "Implant-Supported",
    rating: 5,
    image: '/images/seniors/seniors-10.jpg',
  },
  {
    quote: "The team's patience and expertise made all the difference. They took time to ensure the perfect fit and I couldn't be happier with my smile.",
    author: "Eleanor P.",
    age: "75",
    treatment: "Partial Dentures",
    rating: 5,
    image: '/images/seniors/seniors-11.jpg',
  },
];

const relatedServices = [
  {
    title: 'Dental Implants',
    description: 'Permanent tooth replacement option or support for implant-retained dentures.',
    href: '/services/dental-implants',
    icon: <Shield className="w-6 h-6" />,
    image: '/images/seniors/seniors-12.jpg',
  },
  {
    title: 'Missing Teeth Solutions',
    description: 'Explore all options for replacing missing teeth and restoring your smile.',
    href: '/services/missing-teeth',
    icon: <Sparkles className="w-6 h-6" />,
    image: '/images/seniors/seniors-13.jpg',
  },
  {
    title: 'Routine Checkups',
    description: 'Regular examinations to maintain your dentures and overall oral health.',
    href: '/services/routine-checkups',
    icon: <Calendar className="w-6 h-6" />,
    image: '/images/seniors/seniors-14.jpg',
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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

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

// ============================================================================
// DECORATIVE VISUAL DIVIDER
// ============================================================================

function SectionDivider({ variant = 'wave' }: { variant?: 'wave' | 'teeth' | 'dots' }) {
  if (variant === 'teeth') {
    return (
      <div className="flex justify-center items-center gap-2 py-4" aria-hidden="true">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#722F37]/30" />
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#722F37]/40">
          <path
            fill="currentColor"
            d="M12 2C8 2 5 5 5 9c0 3 1 5 2 7s2 4 2 6c0 1 1 2 3 2s3-1 3-2c0-2 1-4 2-6s2-4 2-7c0-4-3-7-7-7z"
          />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#722F37]/30" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex justify-center items-center gap-3 py-6" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[#722F37]"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-16 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0 30 Q300 50 600 30 T1200 30"
          fill="none"
          stroke="rgba(114,47,55,0.1)"
          strokeWidth="2"
        />
        <path
          d="M0 35 Q300 55 600 35 T1200 35"
          fill="none"
          stroke="rgba(114,47,55,0.05)"
          strokeWidth="1"
        />
      </svg>
    </div>
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

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD]" />

      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute right-0 top-0 w-[60%] h-full">
          <Image
            src="/images/services/dentures/senior-couple-smiling.jpg"
            alt="Happy senior couple with confident smiles thanks to quality dentures"
            fill
            priority
            className="object-cover object-center"
            sizes="60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F3] via-[#FDF8F3]/80 to-transparent" />
        </div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(114,47,55,0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(114,47,55,0.05) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Decorative tooth icons floating */}
        <motion.div
          className="absolute top-[20%] right-[15%] opacity-10"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SmileTransformIllustration className="w-32 h-20" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center"
        style={{ opacity, scale }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-2 text-sm text-neutral-500">
                <li><Link href="/" className="hover:text-[#722F37] transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className="hover:text-[#722F37] transition-colors">Services</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-[#722F37] font-medium" aria-current="page">Dentures</li>
              </ol>
            </motion.nav>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-8"
            >
              <HandHeart className="w-4 h-4" aria-hidden="true" />
              <span>Compassionate Denture Care</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-[#1e293b] leading-[1.05] tracking-tight mb-8"
            >
              Rediscover the
              <br />
              <span className="text-[#722F37]">Joy of Smiling</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-neutral-600 leading-relaxed max-w-xl mb-12"
            >
              Custom-fitted dentures designed for comfort, function, and natural beauty.
              From full dentures to implant-supported options, we restore your smile
              and your confidence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/contact#book">
                <motion.button
                  className="group relative px-8 py-4 bg-[#722F37] text-white rounded-full font-semibold text-lg overflow-hidden shadow-lg shadow-[#722F37]/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                    Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#8a3a44] to-[#722F37]"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>

              <a
                href={phoneHref}
                className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#722F37]/20 text-[#722F37] rounded-full font-semibold text-lg hover:bg-[#722F37]/5 hover:border-[#722F37]/40 transition-all duration-300"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {formattedPhone}
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#722F37]/20 to-[#722F37]/40 border-2 border-white flex items-center justify-center"
                    >
                      <Star className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
                    </div>
                  ))}
                </div>
                <div className="ml-2">
                  <div className="text-sm font-semibold text-[#1e293b]">500+ Happy Patients</div>
                  <div className="text-xs text-neutral-500">Trusted denture care</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// BENEFITS OVERVIEW SECTION (NEW)
// ============================================================================

function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Why Choose Dentures</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-6">
            Benefits of <span className="text-[#722F37]">Quality Dentures</span>
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Modern dentures offer remarkable comfort, natural appearance, and restored function
            that can truly transform your quality of life.
          </p>
        </motion.div>

        {/* Benefits Grid with Illustration */}
        <div ref={containerRef} className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Benefits */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {benefits.slice(0, 3).map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#FDF8F3] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/20 flex items-center justify-center text-[#722F37] flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-1">{benefit.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Center Illustration */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 rounded-full blur-3xl scale-150" />

              {/* Main illustration card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-[#722F37]/10 border border-[#EDE5DD]">
                <SmileTransformIllustration className="w-64 h-32 mx-auto" />
                <div className="text-center mt-4">
                  <p className="text-sm font-medium text-[#722F37]">Your Smile Transformation</p>
                  <p className="text-xs text-neutral-500 mt-1">From consultation to confidence</p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <CircleCheck className="w-6 h-6 text-green-500" aria-hidden="true" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <Heart className="w-6 h-6 text-[#722F37]" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Benefits */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {benefits.slice(3, 6).map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#FDF8F3] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/20 flex items-center justify-center text-[#722F37] flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-1">{benefit.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
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
// DENTURE TYPE COMPARISON SECTION (ENHANCED)
// ============================================================================

function DentureTypeCard({
  type,
  isActive,
  onClick,
  index,
}: {
  type: typeof dentureTypes[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const Illustration = type.illustration;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-500
        ${isActive
          ? 'col-span-2 row-span-2'
          : 'col-span-1'
        }
      `}
    >
      <div className={`
        relative h-full min-h-[300px] ${isActive ? 'min-h-[500px]' : ''}
        bg-white border-2 transition-all duration-500 rounded-3xl overflow-hidden
        ${isActive
          ? 'border-[#722F37] shadow-2xl shadow-[#722F37]/10'
          : 'border-[#EDE5DD] hover:border-[#722F37]/30 hover:shadow-xl'
        }
      `}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={type.image}
            alt={`${type.title} - ${type.subtitle}`}
            fill
            className={`object-cover transition-all duration-700 ${isActive ? 'scale-100' : 'scale-105'}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className={`
            absolute inset-0 transition-all duration-500
            ${isActive
              ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
              : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent'
            }
          `} />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8">
          {/* Illustration Badge - Shows diagram when active */}
          {isActive && (
            <motion.div
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Illustration className="w-24 h-16" />
            </motion.div>
          )}

          {/* Icon Badge */}
          <motion.div
            className={`
              w-16 h-16 rounded-2xl flex items-center justify-center mb-4
              ${isActive
                ? 'bg-[#722F37] text-white'
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
              }
            `}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {type.icon}
          </motion.div>

          {/* Title & Subtitle */}
          <h3 className="text-2xl font-bold text-white mb-1">{type.title}</h3>
          <p className="text-white/70 text-sm mb-4">{type.subtitle}</p>

          {/* Expanded Content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-white/80 leading-relaxed mb-6">{type.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {type.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#722F37] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" aria-hidden="true" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats Visualization */}
                <div className="space-y-3">
                  {Object.entries(type.stats).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: '100%' }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className="flex justify-between text-sm text-white/70 mb-1">
                        <span className="capitalize">{key}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#722F37] to-[#a04d56] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Ideal For */}
                <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-start gap-3">
                    <ThumbsUp className="w-5 h-5 text-[#722F37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-white/90">{type.ideal}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand indicator when not active */}
          {!isActive && (
            <motion.div
              className="flex items-center gap-2 text-white/70 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>Click to explore</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DentureComparisonSection() {
  const [activeType, setActiveType] = useState<string>('complete');

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>Find Your Perfect Fit</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-6">
            Types of <span className="text-[#722F37]">Dentures</span>
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Explore our denture options and find the solution that best matches
            your needs, lifestyle, and budget. Click each card to learn more.
          </p>
        </motion.div>

        {/* Mini illustrations preview */}
        <motion.div
          className="flex justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {dentureTypes.map((type) => {
            const Illustration = type.illustration;
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
                  ${activeType === type.id
                    ? 'bg-[#722F37]/10 scale-105'
                    : 'hover:bg-[#FDF8F3]'
                  }
                `}
              >
                <Illustration className="w-20 h-14" />
                <span className={`text-xs font-medium ${activeType === type.id ? 'text-[#722F37]' : 'text-neutral-500'}`}>
                  {type.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {dentureTypes.map((type, index) => (
            <DentureTypeCard
              key={type.id}
              type={type}
              isActive={activeType === type.id}
              onClick={() => setActiveType(type.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// LIFESTYLE IMPROVEMENT SHOWCASE
// ============================================================================

function LifestyleCard({
  item,
  index,
}: {
  item: typeof lifestyleImprovements[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[400px] rounded-3xl overflow-hidden">
        {/* Background Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-2xl bg-[#722F37] text-white flex items-center justify-center mb-4"
            animate={{
              y: isHovered ? -8 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {item.icon}
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>

          <motion.p
            className="text-white/80 text-sm leading-relaxed"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {item.description}
          </motion.p>
        </div>

        {/* Hover Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 pointer-events-none"
          animate={{
            borderColor: isHovered ? 'rgba(114,47,55,0.5)' : 'rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function LifestyleSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>Transform Your Life</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-6">
            Life is <span className="text-[#722F37]">Better with a Smile</span>
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Quality dentures do more than restore your teeth—they restore your confidence,
            your social life, and your enjoyment of everyday pleasures.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifestyleImprovements.map((item, index) => (
            <LifestyleCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PROCESS TIMELINE
// ============================================================================

function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
            <Target className="w-4 h-4" aria-hidden="true" />
            <span>Your Journey</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-6">
            The Denture <span className="text-[#722F37]">Process</span>
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            We guide you through every step with care, ensuring your dentures fit perfectly
            and feel comfortable from day one.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#EDE5DD] -translate-x-1/2 rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#722F37] to-[#a04d56] rounded-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-24">
            {procedureSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className={`relative grid grid-cols-2 gap-16 items-center ${
                  index % 2 === 0 ? '' : 'direction-rtl'
                }`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16 order-2'}`}>
                  <motion.span
                    className="inline-block text-7xl font-bold text-[#722F37]/10 mb-2"
                    whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.step}
                  </motion.span>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">{step.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {step.duration}
                  </div>
                </div>

                {/* Icon Card */}
                <div className={`${index % 2 === 0 ? 'pl-16 order-2' : 'pr-16'}`}>
                  <motion.div
                    className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] flex items-center justify-center shadow-lg mx-auto"
                    whileInView={{ scale: [0.9, 1], rotate: [5, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#722F37] text-white flex items-center justify-center">
                      {step.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#722F37] border-4 border-white shadow-lg z-10 flex items-center justify-center"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CARE & MAINTENANCE GUIDE (ENHANCED)
// ============================================================================

function CareGuideSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
            <Gem className="w-4 h-4" aria-hidden="true" />
            <span>Keep Your Smile Bright</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-6">
            Denture <span className="text-[#722F37]">Care Guide</span>
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Proper care keeps your dentures comfortable, clean, and long-lasting.
            Follow our simple daily routine for the best results.
          </p>
        </motion.div>

        {/* Care Illustration */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#EDE5DD] inline-flex items-center gap-8">
            <DentureCareIllustration className="w-32 h-20" />
            <div className="text-left">
              <h3 className="font-bold text-lg text-neutral-900">Daily Care Essentials</h3>
              <p className="text-sm text-neutral-600 mt-1">Soak, brush, and rinse for a healthy smile</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Cards */}
        <div className="grid lg:grid-cols-4 gap-6">
          {careGuide.map((item, index) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveTab(index)}
              className={`
                cursor-pointer rounded-2xl p-6 transition-all duration-300
                ${activeTab === index
                  ? 'bg-[#722F37] text-white shadow-xl shadow-[#722F37]/20 scale-105'
                  : 'bg-white border border-[#EDE5DD] hover:border-[#722F37]/30 hover:shadow-lg'
                }
              `}
            >
              {/* Icon */}
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-4
                ${activeTab === index
                  ? 'bg-white/20'
                  : 'bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD]'
                }
              `}>
                <div className={activeTab === index ? 'text-white' : 'text-[#722F37]'}>
                  {item.icon}
                </div>
              </div>

              {/* Time & Title */}
              <div className={`text-xs font-medium uppercase tracking-wider mb-1 ${activeTab === index ? 'text-white/70' : 'text-[#722F37]'}`}>
                {item.time}
              </div>
              <h3 className={`text-lg font-bold mb-4 ${activeTab === index ? 'text-white' : 'text-neutral-900'}`}>
                {item.title}
              </h3>

              {/* Tasks */}
              <AnimatePresence>
                {activeTab === index && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    {item.tasks.map((task, i) => (
                      <motion.li
                        key={task}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-white/90"
                      >
                        <Check className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        {task}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Important Tips */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 p-8 rounded-2xl bg-white border border-[#EDE5DD] shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Important Care Tips</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-neutral-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#722F37]" aria-hidden="true" />
                  Never use hot water—it can warp your dentures
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#722F37]" aria-hidden="true" />
                  Handle over a towel to prevent breakage
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#722F37]" aria-hidden="true" />
                  Schedule regular checkups every 6 months
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#722F37]" aria-hidden="true" />
                  Don&apos;t use regular toothpaste—it&apos;s too abrasive
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================

function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
            <Heart className="w-4 h-4" aria-hidden="true" />
            <span>Patient Stories</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            Smiles <span className="text-[#722F37]">Restored</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div ref={containerRef} className="relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              className="relative aspect-square rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={testimonials[activeIndex]?.image ?? ''}
                    alt={`${testimonials[activeIndex]?.author ?? 'Patient'} - ${testimonials[activeIndex]?.treatment ?? 'Dentures'} patient testimonial`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Decorative frame */}
              <div className="absolute inset-0 rounded-3xl border-4 border-[#722F37]/20 pointer-events-none" />
              <div className="absolute -inset-4 rounded-3xl border border-[#722F37]/10 pointer-events-none" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Large Quote Icon */}
              <motion.div
                className="w-20 h-20 rounded-full bg-[#722F37]/10 flex items-center justify-center mb-8"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Quote className="w-10 h-10 text-[#722F37]" aria-hidden="true" />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6" role="img" aria-label={`${testimonials[activeIndex]?.rating ?? 5} out of 5 stars`}>
                    {[...Array(testimonials[activeIndex]?.rating ?? 5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-6 h-6 text-[#722F37] fill-[#722F37]" aria-hidden="true" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-2xl md:text-3xl font-display text-neutral-800 leading-relaxed mb-8">
                    &ldquo;{testimonials[activeIndex]?.quote ?? ''}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold text-neutral-900 block">
                        {testimonials[activeIndex]?.author ?? ''}
                      </span>
                      <span className="text-sm text-neutral-500">
                        Age {testimonials[activeIndex]?.age ?? ''} · {testimonials[activeIndex]?.treatment ?? ''}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="flex items-center gap-3 mt-12" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-12 bg-[#722F37]'
                        : 'w-3 bg-[#722F37]/20 hover:bg-[#722F37]/40'
                    }`}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function FAQSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Questions Answered</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-6">
            Frequently Asked <span className="text-[#722F37]">Questions</span>
          </h2>
          <p className="text-neutral-600 text-lg">
            Find answers to common questions about dentures, care, and our process.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FAQAccordion items={faqs} />
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-600 mb-4">Still have questions? We&apos;re here to help.</p>
          <a
            href={`tel:${contactInfo.phone}`}
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Call us at ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES SECTION
// ============================================================================

function RelatedServicesSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Explore More</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            Related <span className="text-[#722F37]">Services</span>
          </h2>
          <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
            Explore other services that complement your denture treatment.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {relatedServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={service.href} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#722F37] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center text-[#722F37] group-hover:bg-[#722F37] group-hover:text-white transition-all duration-300 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#722F37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-neutral-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
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
// MAIN COMPONENT
// ============================================================================

export function DenturesContent() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Overview - NEW */}
      <BenefitsSection />

      {/* Visual Divider */}
      <SectionDivider variant="teeth" />

      {/* Denture Type Comparison */}
      <DentureComparisonSection />

      {/* Visual Divider */}
      <SectionDivider variant="dots" />

      {/* Lifestyle Improvements */}
      <LifestyleSection />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Visual Divider */}
      <SectionDivider variant="wave" />

      {/* Care Guide */}
      <CareGuideSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Related Services */}
      <RelatedServicesSection />

      {/* CTA Section */}
      <ContactCtaBanner
        headline="Ready to Restore Your Smile?"
        description="Schedule your denture consultation today and discover how we can help you smile, eat, and speak with confidence again. Your journey to a beautiful smile starts here."
        bookText="Book Free Consultation"
        background="gradient"
      />
    </main>
  );
}
