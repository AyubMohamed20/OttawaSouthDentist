'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  Sparkles,
  Star,
  Smile,
  Heart,
  Clock,
  Award,
  Palette,
  Wand2,
  Gem,
  Layers,
  Scissors,
  AlignCenter,
  Stethoscope,
  Zap,
  ArrowRight,
  ChevronDown,
  Quote,
  Check,
  MoveHorizontal,
  ShieldCheck,
  HeartPulse,
  CircleCheck,
  Sparkle,
  BadgeCheck,
  Crown,
  Eye,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// SVG ILLUSTRATIONS
// ============================================================================

// Sparkle burst illustration for decorative use
function SparkleIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <motion.circle
        cx="60"
        cy="60"
        r="40"
        fill="url(#sparkle-gradient)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <motion.path
        d="M60 20L64 52L96 60L64 68L60 100L56 68L24 60L56 52L60 20Z"
        fill="#722F37"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx="85"
        cy="35"
        r="4"
        fill="#722F37"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.circle
        cx="35"
        cy="85"
        r="3"
        fill="#722F37"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
      <motion.circle
        cx="90"
        cy="75"
        r="2"
        fill="#722F37"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />
      <defs>
        <radialGradient id="sparkle-gradient" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#722F37" />
          <stop offset="1" stopColor="#722F37" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// Smile transformation illustration
function SmileTransformIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Before smile - slightly imperfect */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <circle cx="40" cy="50" r="35" fill="#F5EDE5" stroke="#EDE5DD" strokeWidth="2" />
        <path
          d="M25 55 Q40 65 55 55"
          stroke="#722F37"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <circle cx="30" cy="42" r="3" fill="#722F37" opacity="0.6" />
        <circle cx="50" cy="42" r="3" fill="#722F37" opacity="0.6" />
      </motion.g>

      {/* Arrow */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <path
          d="M85 50 L105 50 M100 45 L105 50 L100 55"
          stroke="#722F37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.circle
          cx="95"
          cy="50"
          r="15"
          fill="none"
          stroke="#722F37"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </motion.g>

      {/* After smile - perfect */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <circle cx="160" cy="50" r="35" fill="#FDF8F3" stroke="#722F37" strokeWidth="2" />
        <motion.path
          d="M145 52 Q160 68 175 52"
          stroke="#722F37"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.circle
          cx="150"
          cy="42"
          r="3"
          fill="#722F37"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
        />
        <motion.circle
          cx="170"
          cy="42"
          r="3"
          fill="#722F37"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        />
        {/* Sparkles around perfect smile */}
        <motion.path
          d="M185 30 L187 35 L192 37 L187 39 L185 44 L183 39 L178 37 L183 35 Z"
          fill="#722F37"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        />
        <motion.circle
          cx="135"
          cy="28"
          r="2"
          fill="#722F37"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1 }}
        />
      </motion.g>
    </svg>
  );
}

// Tooth illustration with sparkle
function ToothSparkleIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main tooth shape */}
      <motion.path
        d="M40 10 C55 10 65 25 65 40 C65 55 60 70 55 85 C52 95 48 95 45 85 C42 75 38 75 35 85 C32 95 28 95 25 85 C20 70 15 55 15 40 C15 25 25 10 40 10Z"
        fill="#FDF8F3"
        stroke="#722F37"
        strokeWidth="2"
        initial={{ pathLength: 0, fill: 'rgba(253, 248, 243, 0)' }}
        animate={{ pathLength: 1, fill: 'rgba(253, 248, 243, 1)' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      {/* Shine effect */}
      <motion.path
        d="M30 25 Q35 35 30 45"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      {/* Sparkle */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <path
          d="M60 15 L62 20 L67 22 L62 24 L60 29 L58 24 L53 22 L58 20 Z"
          fill="#722F37"
        />
      </motion.g>
      <motion.circle
        cx="70"
        cy="35"
        r="2"
        fill="#722F37"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4 }}
      />
    </svg>
  );
}

// Diamond quality illustration
function DiamondIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M40 8 L65 30 L40 72 L15 30 Z"
        fill="url(#diamond-fill)"
        stroke="#722F37"
        strokeWidth="2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        d="M15 30 L40 38 L65 30"
        stroke="#722F37"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      <motion.path
        d="M40 8 L40 38 L40 72"
        stroke="#722F37"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
      <motion.path
        d="M25 8 L15 30 M55 8 L65 30 M25 8 L40 8 L55 8"
        stroke="#722F37"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      {/* Shine */}
      <motion.path
        d="M28 20 L32 25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8 }}
      />
      <defs>
        <linearGradient id="diamond-fill" x1="40" y1="8" x2="40" y2="72">
          <stop stopColor="#FDF8F3" />
          <stop offset="1" stopColor="#EDE5DD" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================================================
// DATA
// ============================================================================

const cosmeticServices = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments that safely brighten your smile by several shades in just one visit.',
    image: '/images/cosmetic/cosmetic-06.jpg',
    features: ['In-office treatment', 'Take-home kits', 'Up to 8 shades brighter'],
    color: '#FFD700',
  },
  {
    icon: <Gem className="w-6 h-6" />,
    title: 'Porcelain Veneers',
    description: 'Ultra-thin shells custom-crafted to cover front teeth, transforming shape, color, and alignment.',
    image: '/images/cosmetic/cosmetic-07.jpg',
    features: ['Custom-designed', 'Stain-resistant', '10-15 year lifespan'],
    color: '#722F37',
  },
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: 'Dental Bonding',
    description: 'Tooth-colored resin repairs chips, gaps, and discoloration for a natural, seamless look.',
    image: '/images/cosmetic/cosmetic-08.jpg',
    features: ['Single-visit procedure', 'Minimal prep', 'Natural appearance'],
    color: '#4A90A4',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Smile Makeovers',
    description: 'Comprehensive treatment plans combining multiple procedures for a complete smile transformation.',
    image: '/images/cosmetic/cosmetic-09.jpg',
    features: ['Personalized plan', 'Digital preview', 'Life-changing results'],
    color: '#9B59B6',
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    title: 'Gum Contouring',
    description: 'Reshaping the gum line to create a more balanced, aesthetically pleasing smile.',
    image: '/images/cosmetic/cosmetic-10.jpg',
    features: ['Precise sculpting', 'Quick recovery', 'Permanent results'],
    color: '#E74C3C',
  },
  {
    icon: <AlignCenter className="w-6 h-6" />,
    title: 'Invisalign',
    description: 'Clear, removable aligners that straighten teeth discreetly for a beautifully aligned smile.',
    image: '/images/cosmetic/cosmetic-11.jpg',
    features: ['Nearly invisible', 'Removable design', 'Comfortable fit'],
    color: '#3498DB',
  },
];

const benefits = [
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Boosted Confidence',
    description: 'A beautiful smile enhances self-esteem and makes you feel great in social and professional settings.',
    illustration: <SparkleIllustration className="w-16 h-16 opacity-20 absolute -top-2 -right-2" />,
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Long-Lasting Results',
    description: 'Modern cosmetic treatments provide durable, natural-looking results that can last for years.',
    illustration: null,
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Personalized Treatment',
    description: 'Every smile is unique—we customize treatments to match your facial features and goals.',
    illustration: null,
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Expert Craftsmanship',
    description: 'Our skilled team uses advanced techniques and premium materials for exceptional results.',
    illustration: null,
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Improved Function',
    description: 'Many cosmetic procedures also enhance bite function and protect against future damage.',
    illustration: null,
  },
];

const transformationSteps = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We discuss your smile goals, examine your teeth, and explore treatment options that fit your vision.',
    image: '/images/cosmetic/cosmetic-13.jpg',
    icon: <Eye className="w-5 h-5" />,
  },
  {
    step: '02',
    title: 'Custom Treatment Plan',
    description: 'We design a personalized plan, often using digital imaging to preview your potential results.',
    image: '/images/cosmetic/cosmetic-14.jpg',
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    step: '03',
    title: 'Smile Transformation',
    description: 'Our skilled team performs your chosen procedures with precision, comfort, and attention to detail.',
    image: '/images/cosmetic/cosmetic-15.jpg',
    icon: <Target className="w-5 h-5" />,
  },
  {
    step: '04',
    title: 'Reveal & Maintain',
    description: 'Enjoy your beautiful new smile and follow our care guidelines to keep it looking perfect.',
    image: '/images/cosmetic/cosmetic-16.jpg',
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const testimonials = [
  {
    quote: "I never knew my smile could look this good. The team at Ottawa South Dental transformed my confidence along with my teeth.",
    author: "Sarah M.",
    treatment: "Porcelain Veneers",
    rating: 5,
  },
  {
    quote: "The whitening treatment exceeded all my expectations. My smile is brighter than I ever imagined possible.",
    author: "Michael R.",
    treatment: "Professional Whitening",
    rating: 5,
  },
  {
    quote: "From the consultation to the final reveal, every step was handled with such care and expertise. Truly life-changing.",
    author: "Jennifer L.",
    treatment: "Smile Makeover",
    rating: 5,
  },
];

const faqItems = [
  {
    question: 'What cosmetic options are available for stained or discolored teeth?',
    answer:
      'We offer several options depending on the type and severity of staining. Professional teeth whitening is ideal for surface stains from coffee, tea, or wine. For deeper discoloration or teeth that don\'t respond to whitening, dental veneers or bonding can provide a permanently bright, natural-looking solution. During your consultation, we\'ll assess your teeth and recommend the best approach for your specific situation.',
  },
  {
    question: 'How long do dental veneers last?',
    answer:
      'With proper care, porcelain veneers typically last 10-15 years or longer. They\'re highly durable and resistant to staining. To maximize their lifespan, maintain good oral hygiene, avoid biting hard objects, and visit us regularly for checkups. If you grind your teeth, we may recommend a night guard to protect your investment.',
  },
  {
    question: 'Is teeth whitening safe for my enamel?',
    answer:
      'Yes, professional teeth whitening performed under dental supervision is completely safe for your enamel. We use carefully formulated whitening agents and monitor the process to ensure optimal results without damage. Professional whitening is much safer than over-the-counter products because we can customize the treatment to your sensitivity levels and protect your gums during the procedure.',
  },
  {
    question: 'What is the difference between veneers and dental bonding?',
    answer:
      'Both improve the appearance of teeth, but they differ in material, durability, and application. Veneers are thin porcelain shells custom-made in a lab and permanently bonded to teeth—they\'re more stain-resistant and last longer (10-15 years). Bonding uses tooth-colored composite resin applied directly to teeth in a single visit—it\'s more affordable and less invasive but typically lasts 5-10 years. We\'ll help you choose based on your goals and budget.',
  },
  {
    question: 'Is cosmetic dentistry covered by insurance?',
    answer:
      'Most cosmetic procedures are considered elective and may not be fully covered by dental insurance. However, some treatments that also restore function—such as bonding a chipped tooth or crowning a damaged tooth—may have partial coverage. We\'ll provide a detailed treatment estimate and help you understand your insurance benefits during your consultation.',
  },
];

const relatedServices = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Teeth Whitening',
    description: 'Professional whitening for a dramatically brighter smile in just one visit.',
    href: '/services/teeth-whitening',
    image: '/images/cosmetic/cosmetic-17.jpg',
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'General Dentistry',
    description: 'Comprehensive dental exams and care to maintain your beautiful smile.',
    href: '/services/general',
    image: '/images/cosmetic/cosmetic-18.jpg',
  },
  {
    icon: <AlignCenter className="w-6 h-6" />,
    title: 'Invisalign',
    description: 'Clear aligners for discreet teeth straightening and improved alignment.',
    href: '/services/invisalign',
    image: '/images/cosmetic/cosmetic-19.jpg',
  },
];

// Stats for visual impact
const stats = [
  { value: '500+', label: 'Smile Makeovers', icon: <Smile className="w-5 h-5" /> },
  { value: '15+', label: 'Years Experience', icon: <Award className="w-5 h-5" /> },
  { value: '98%', label: 'Patient Satisfaction', icon: <Heart className="w-5 h-5" /> },
  { value: '8', label: 'Shades Brighter', icon: <Sparkles className="w-5 h-5" /> },
];

// ============================================================================
// BEFORE/AFTER COMPARISON SLIDER
// ============================================================================

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt="Smile after cosmetic treatment showing brighter, more aligned teeth"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* After Label */}
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-[#722F37] text-white text-sm font-medium rounded-full shadow-lg flex items-center gap-2">
          <Sparkle className="w-4 h-4" />
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Smile before cosmetic treatment"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Before Label */}
        <div className="absolute bottom-6 left-6 px-4 py-2 bg-neutral-800/90 text-white text-sm font-medium rounded-full shadow-lg">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)] z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-[#722F37]">
          <MoveHorizontal className="w-6 h-6 text-[#722F37]" />
        </div>
      </div>

      {/* Instruction overlay */}
      <AnimatePresence>
        {sliderPosition === 50 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="px-6 py-3 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full flex items-center gap-2">
              <MoveHorizontal className="w-4 h-4" />
              Drag to compare
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// STATS BANNER
// ============================================================================

function StatsBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={containerRef}
      className="relative py-16 bg-gradient-to-r from-[#722F37] via-[#8a3a44] to-[#722F37] overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/5"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-white/5"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <ToothSparkleIllustration className="absolute top-1/2 left-10 -translate-y-1/2 w-24 h-30 opacity-10" />
        <DiamondIllustration className="absolute top-1/2 right-10 -translate-y-1/2 w-20 h-20 opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white mb-4">
                {stat.icon}
              </div>
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
              >
                {stat.value}
              </motion.div>
              <div className="text-white/80 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PROCEDURE CARD WITH REVEAL EFFECT
// ============================================================================

function ProcedureCard({
  service,
  index,
}: {
  service: typeof cosmeticServices[0];
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
      <div className="relative h-[500px] rounded-3xl overflow-hidden bg-neutral-100">
        {/* Background Image */}
        <Image
          src={service.image}
          alt={`${service.title} cosmetic dental procedure`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Content Container */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6"
            animate={{
              y: isHovered ? -10 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-2xl font-bold text-white mb-3"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-white/80 text-base leading-relaxed mb-6"
            animate={{ y: isHovered ? -10 : 0, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.description}
          </motion.p>

          {/* Features - Reveal on hover */}
          <motion.div
            className="space-y-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-3 text-white/90"
                initial={{ x: -20, opacity: 0 }}
                animate={isHovered ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="w-5 h-5 rounded-full bg-[#722F37] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mt-6"
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#722F37] rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Hover border effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-white/0 pointer-events-none"
          animate={{ borderColor: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0)' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

// ============================================================================
// CINEMATIC GALLERY
// ============================================================================

function CinematicGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const galleryImages = [
    { src: '/images/cosmetic/cosmetic-20.jpg', alt: 'Patient showing beautiful smile after teeth whitening' },
    { src: '/images/cosmetic/cosmetic-21.jpg', alt: 'Close-up of perfectly aligned white teeth' },
    { src: '/images/cosmetic/cosmetic-22.jpg', alt: 'Woman smiling confidently after veneer treatment' },
    { src: '/images/cosmetic/cosmetic-23.jpg', alt: 'Natural-looking dental bonding results' },
    { src: '/images/cosmetic/cosmetic-24.jpg', alt: 'Happy patient after smile makeover' },
    { src: '/images/cosmetic/cosmetic-25.jpg', alt: 'Before and after cosmetic dental work' },
  ];

  return (
    <div ref={containerRef} className="relative h-[700px] overflow-hidden">
      {/* Column 1 */}
      <motion.div
        className="absolute left-0 w-1/3 space-y-6"
        style={{ y: y1 }}
      >
        {galleryImages.slice(0, 2).map((img, i) => (
          <motion.div
            key={img.src}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="33vw"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Column 2 */}
      <motion.div
        className="absolute left-1/3 w-1/3 px-6 pt-20 space-y-6"
        style={{ y: y2 }}
      >
        {galleryImages.slice(2, 4).map((img, i) => (
          <motion.div
            key={img.src}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 + 0.3 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="33vw"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Column 3 */}
      <motion.div
        className="absolute right-0 w-1/3 space-y-6"
        style={{ y: y3 }}
      >
        {galleryImages.slice(4, 6).map((img, i) => (
          <motion.div
            key={img.src}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 + 0.6 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="33vw"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" aria-hidden="true" />
    </div>
  );
}

// ============================================================================
// TESTIMONIAL CAROUSEL
// ============================================================================

function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="relative max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Large Quote Icon */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#722F37]/10 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Quote className="w-10 h-10 text-[#722F37]" aria-hidden="true" />
        </motion.div>

        {/* Testimonial Content */}
        <div className="pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-8" aria-label={`${testimonials[activeIndex]?.rating ?? 5} out of 5 stars`}>
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
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display text-neutral-800 leading-relaxed mb-8">
                &ldquo;{testimonials[activeIndex]?.quote ?? ''}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-neutral-900">
                  {testimonials[activeIndex]?.author ?? ''}
                </span>
                <span className="text-sm text-[#722F37] font-medium mt-1 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                  {testimonials[activeIndex]?.treatment ?? ''}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-10" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`View testimonial ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-10 bg-[#722F37]'
                  : 'bg-[#722F37]/20 hover:bg-[#722F37]/40'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// TRANSFORMATION TIMELINE
// ============================================================================

function TransformationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#EDE5DD] -translate-x-1/2" aria-hidden="true">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[#722F37] origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-32">
        {transformationSteps.map((step, index) => (
          <motion.div
            key={step.step}
            className={`relative grid grid-cols-2 gap-20 items-center ${
              index % 2 === 0 ? '' : 'direction-rtl'
            }`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Content */}
            <div className={`${index % 2 === 0 ? 'text-right pr-20' : 'text-left pl-20 order-2'}`}>
              <motion.div
                className="inline-flex items-center gap-3 mb-4"
                whileInView={{ opacity: [0, 1], x: index % 2 === 0 ? [20, 0] : [-20, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-6xl font-bold text-[#722F37]/10">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#722F37]/10 flex items-center justify-center text-[#722F37]">
                  {step.icon}
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{step.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{step.description}</p>
            </div>

            {/* Image */}
            <div className={`${index % 2 === 0 ? 'pl-20 order-2' : 'pr-20'}`}>
              <motion.div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={step.image}
                  alt={`Step ${step.step}: ${step.title} - ${step.description}`}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
            </div>

            {/* Center Dot */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#722F37] border-4 border-white shadow-lg z-10"
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
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
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src="/images/services/cosmetic-dentistry/hero-smile.jpg"
          alt="Beautiful confident smile showcasing cosmetic dentistry results"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(114,47,55,0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Decorative Illustrations */}
        <SparkleIllustration className="absolute top-1/3 right-20 w-32 h-32 opacity-30" />
        <ToothSparkleIllustration className="absolute bottom-1/4 right-1/3 w-20 h-25 opacity-20" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center"
        style={{ opacity, scale }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium" aria-current="page">Cosmetic Dentistry</li>
              </ol>
            </motion.nav>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Transform Your Smile</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-8"
            >
              Cosmetic
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] via-[#a04d56] to-[#722F37]">
                Dentistry
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-white/80 leading-relaxed max-w-xl mb-12"
            >
              Unlock the smile you've always wanted. From teeth whitening and porcelain veneers
              to complete smile makeovers, our cosmetic treatments combine artistry with dental
              expertise to enhance your natural beauty.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/book">
                <motion.button
                  className="group relative px-8 py-4 bg-[#722F37] text-white rounded-full font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                    Book Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#8a3a44] to-[#722F37]"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  />
                </motion.button>
              </Link>

              <a
                href={phoneHref}
                className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {formattedPhone}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// SMILE TRANSFORMATION SHOWCASE
// ============================================================================

function SmileShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-white to-[#FDF8F3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Illustration Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative bg-white rounded-3xl p-12 shadow-xl">
              <SmileTransformIllustration className="w-full h-auto" />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24" aria-hidden="true">
                <SparkleIllustration className="w-full h-full" />
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              <Crown className="w-4 h-4" aria-hidden="true" />
              Premium Results
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 leading-tight mb-6">
              Your Dream Smile
              <br />
              <span className="text-[#722F37]">Awaits</span>
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
              Every smile transformation begins with understanding your unique goals. Whether you're
              looking for subtle enhancements or a complete makeover, our expert team crafts
              personalized solutions that bring out your best smile.
            </p>

            {/* Quick benefits with icons */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <CircleCheck className="w-5 h-5" />, text: 'Natural-Looking Results' },
                { icon: <Sparkle className="w-5 h-5" />, text: 'Advanced Techniques' },
                { icon: <ShieldCheck className="w-5 h-5" />, text: 'Safe Procedures' },
                { icon: <Heart className="w-5 h-5" />, text: 'Patient-Focused Care' },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#FDF8F3] border border-[#EDE5DD]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-[#722F37]" aria-hidden="true">{item.icon}</div>
                  <span className="text-sm font-medium text-neutral-700">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES SECTION
// ============================================================================

function RelatedServicesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
            <Layers className="w-4 h-4" aria-hidden="true" />
            Explore More
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            Related <span className="text-[#722F37]">Services</span>
          </h2>
          <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
            Explore other services that complement your smile transformation.
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
                    alt={`${service.title} - ${service.description}`}
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
      </div>
    </section>
  );
}

// ============================================================================
// MAIN DESKTOP COMPONENT
// ============================================================================

export default function CosmeticDentistryDesktop() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Banner */}
      <StatsBanner />

      {/* Smile Showcase with Illustrations */}
      <SmileShowcase />

      {/* Before/After Comparison Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
                <Eye className="w-4 h-4" aria-hidden="true" />
                See The Difference
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 leading-tight">
                Real Results,
                <br />
                <span className="text-[#722F37]">Real Transformations</span>
              </h2>
              <p className="mt-6 text-neutral-600 text-lg leading-relaxed">
                Our skilled cosmetic dentistry team has helped hundreds of patients achieve their dream smiles.
                Drag the slider to see the remarkable before and after transformations.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-neutral-500 bg-[#FDF8F3] px-4 py-2 rounded-full">
                  <MoveHorizontal className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                  <span>Drag to compare</span>
                </div>
              </div>

              {/* Additional visual element */}
              <div className="mt-8 p-6 bg-gradient-to-r from-[#FDF8F3] to-transparent rounded-2xl border-l-4 border-[#722F37]">
                <div className="flex items-start gap-4">
                  <DiamondIllustration className="w-16 h-16 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Premium Quality</h4>
                    <p className="text-sm text-neutral-600">We use only the highest quality materials and cutting-edge techniques for lasting results.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Slider */}
            <BeforeAfterSlider
              beforeImage="/images/cosmetic/cosmetic-02.jpg"
              afterImage="/images/cosmetic/cosmetic-03.jpg"
            />
          </div>
        </div>
      </section>

      {/* Cosmetic Services Grid */}
      <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              <Wand2 className="w-4 h-4" aria-hidden="true" />
              Our Services
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Cosmetic <span className="text-[#722F37]">Treatments</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              Discover the range of treatments we offer to enhance your smile. Each procedure is
              tailored to your unique needs and aesthetic goals.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cosmeticServices.map((service, index) => (
              <ProcedureCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Cinematic Gallery */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Gallery */}
            <CinematicGallery />

            {/* Benefits Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
                <Award className="w-4 h-4" aria-hidden="true" />
                Why Choose Us
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 leading-tight mb-8">
                Why Choose
                <br />
                <span className="text-[#722F37]">Cosmetic Dentistry?</span>
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-10">
                Your smile is one of the first things people notice. Cosmetic dentistry goes beyond
                aesthetics—it's about feeling confident, comfortable, and proud every time you smile.
              </p>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="relative flex gap-5 p-4 rounded-2xl hover:bg-[#FDF8F3] transition-colors duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {benefit.illustration}
                    <div className="relative flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] text-[#722F37] flex items-center justify-center shadow-sm">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900">{benefit.title}</h3>
                      <p className="text-neutral-600 text-sm mt-1 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              <Heart className="w-4 h-4" aria-hidden="true" />
              Patient Stories
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Confidence <span className="text-[#722F37]">Restored</span>
            </h2>
          </motion.div>

          <TestimonialSection />
        </div>
      </section>

      {/* Transformation Journey */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              <Target className="w-4 h-4" aria-hidden="true" />
              Your Journey
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              What to <span className="text-[#722F37]">Expect</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              Your journey to a stunning smile begins with a personalized consultation and careful planning.
            </p>

            {/* Smile Transform Illustration */}
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FDF8F3] rounded-full border border-[#EDE5DD]">
                <Sparkles className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
                <span className="text-sm font-medium text-neutral-700">Personalized care at every step</span>
              </div>
            </motion.div>
          </motion.div>

          <TransformationTimeline />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              <Lightbulb className="w-4 h-4" aria-hidden="true" />
              Common Questions
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              Frequently Asked <span className="text-[#722F37]">Questions</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg">
              Get answers to common questions about cosmetic dentistry treatments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FAQAccordion items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServicesSection />

      {/* CTA Section */}
      <ContactCtaBanner
        headline="Ready for Your Smile Transformation?"
        description="Schedule your cosmetic dentistry consultation today and take the first step toward the smile you've always dreamed of. Our expert team is here to help you shine."
        bookText="Book This Service"
        background="gradient"
      />
    </main>
  );
}
