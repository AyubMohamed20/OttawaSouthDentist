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
  Scissors,
  AlignCenter,
  Zap,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Check,
  MoveHorizontal,
  HeartPulse,
  Sparkle,
  BadgeCheck,
  Crown,
  Eye,
  Lightbulb,
  Target,
  TrendingUp,
  Quote,
  MapPin,
  Layers,
  Play,
  Diamond,
  CircleDot,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, PanInfo } from 'framer-motion';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { contactInfo } from '@/data/site-config';

// ============================================================================
// PREMIUM ANIMATION VARIANTS
// ============================================================================

const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOutQuart }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutQuart }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: easeOutQuart }
};

const shimmer = {
  initial: { x: '-100%' },
  animate: {
    x: '200%',
    transition: { repeat: Infinity, duration: 2.5, ease: 'linear' as const, repeatDelay: 3 }
  }
};

// ============================================================================
// DATA
// ============================================================================

const cosmeticServices = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Teeth Whitening',
    description: 'Professional whitening that safely brightens your smile by several shades in one visit.',
    features: ['In-office treatment', 'Take-home kits', 'Up to 8 shades brighter'],
    gradient: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
  },
  {
    icon: <Gem className="w-5 h-5" />,
    title: 'Porcelain Veneers',
    description: 'Ultra-thin shells custom-crafted to transform shape, color, and alignment.',
    features: ['Custom-designed', 'Stain-resistant', '10-15 year lifespan'],
    gradient: 'from-violet-400 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
  },
  {
    icon: <Wand2 className="w-5 h-5" />,
    title: 'Dental Bonding',
    description: 'Tooth-colored resin repairs chips, gaps, and discoloration naturally.',
    features: ['Single-visit', 'Minimal prep', 'Natural appearance'],
    gradient: 'from-sky-400 to-blue-500',
    bgGradient: 'from-sky-50 to-blue-50',
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: 'Smile Makeovers',
    description: 'Comprehensive treatment plans for complete smile transformation.',
    features: ['Personalized plan', 'Digital preview', 'Life-changing results'],
    gradient: 'from-rose-400 to-pink-500',
    bgGradient: 'from-rose-50 to-pink-50',
  },
  {
    icon: <Scissors className="w-5 h-5" />,
    title: 'Gum Contouring',
    description: 'Reshaping the gum line for a more balanced, pleasing smile.',
    features: ['Precise sculpting', 'Quick recovery', 'Permanent results'],
    gradient: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
  },
  {
    icon: <AlignCenter className="w-5 h-5" />,
    title: 'Invisalign',
    description: 'Clear aligners that straighten teeth discreetly and comfortably.',
    features: ['Nearly invisible', 'Removable', 'Comfortable fit'],
    gradient: 'from-cyan-400 to-sky-500',
    bgGradient: 'from-cyan-50 to-sky-50',
  },
];

const benefits = [
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Boosted Confidence',
    description: 'Feel great in social and professional settings.',
    stat: '95%',
    statLabel: 'report higher confidence',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Long-Lasting Results',
    description: 'Durable, natural-looking results that last years.',
    stat: '15+',
    statLabel: 'years average lifespan',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Personalized Treatment',
    description: 'Customized to match your unique features.',
    stat: '100%',
    statLabel: 'custom solutions',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Expert Craftsmanship',
    description: 'Advanced techniques and premium materials.',
    stat: '500+',
    statLabel: 'smile makeovers',
  },
];

const transformationSteps = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Discuss your goals and explore all available treatment options together.',
    icon: <Eye className="w-5 h-5" />,
    color: 'from-[#722F37] to-[#8a3a44]',
  },
  {
    step: '02',
    title: 'Custom Plan',
    description: 'Receive a personalized treatment plan with digital smile preview.',
    icon: <Lightbulb className="w-5 h-5" />,
    color: 'from-[#8a3a44] to-[#a04d56]',
  },
  {
    step: '03',
    title: 'Transformation',
    description: 'Experience precise, gentle procedures with your comfort as priority.',
    icon: <Target className="w-5 h-5" />,
    color: 'from-[#a04d56] to-[#b86068]',
  },
  {
    step: '04',
    title: 'New Smile',
    description: 'Reveal your stunning new smile with care guidelines for lasting results.',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'from-[#b86068] to-[#cf7a7a]',
  },
];

const testimonials = [
  {
    quote: "The team transformed my confidence along with my teeth. I can't stop smiling now!",
    author: "Sarah M.",
    treatment: "Porcelain Veneers",
    rating: 5,
    image: "https://images.pexels.com/photos/6554598/pexels-photo-6554598.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    quote: "My smile is brighter than I ever imagined possible. Absolutely life-changing!",
    author: "Michael R.",
    treatment: "Professional Whitening",
    rating: 5,
    image: "https://images.pexels.com/photos/3845843/pexels-photo-3845843.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    quote: "Every step was handled with such care and expertise. Truly life-changing results.",
    author: "Jennifer L.",
    treatment: "Smile Makeover",
    rating: 5,
    image: "https://images.pexels.com/photos/3845759/pexels-photo-3845759.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
];

const faqItems = [
  {
    question: 'What cosmetic options are available for stained teeth?',
    answer: 'We offer professional teeth whitening for surface stains, and veneers or bonding for deeper discoloration. During your consultation, we\'ll assess your teeth and recommend the best approach.',
  },
  {
    question: 'How long do dental veneers last?',
    answer: 'With proper care, porcelain veneers typically last 10-15 years or longer. Maintain good oral hygiene and visit us regularly for checkups.',
  },
  {
    question: 'Is teeth whitening safe?',
    answer: 'Yes, professional teeth whitening under dental supervision is completely safe. We customize treatment to your sensitivity levels.',
  },
  {
    question: 'What\'s the difference between veneers and bonding?',
    answer: 'Veneers are porcelain shells lasting 10-15 years. Bonding uses composite resin in a single visit, lasting 5-10 years. We\'ll help you choose based on your goals.',
  },
  {
    question: 'Is cosmetic dentistry covered by insurance?',
    answer: 'Most cosmetic procedures are elective and may not be fully covered. We\'ll provide detailed estimates and help you understand your benefits.',
  },
];

const stats = [
  { value: '500+', label: 'Smile Makeovers', icon: <Smile className="w-5 h-5" /> },
  { value: '15+', label: 'Years Experience', icon: <Award className="w-5 h-5" /> },
  { value: '98%', label: 'Satisfaction', icon: <Heart className="w-5 h-5" /> },
  { value: '8', label: 'Shades Brighter', icon: <Sparkles className="w-5 h-5" /> },
];

const relatedServices = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Teeth Whitening',
    description: 'Brighten your smile',
    href: '/services/teeth-whitening',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: <AlignCenter className="w-6 h-6" />,
    title: 'Invisalign',
    description: 'Straighten discreetly',
    href: '/services/invisalign',
    gradient: 'from-cyan-400 to-blue-500',
  },
];

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-500/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '5%', right: '-20%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-500/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: '20%', left: '-15%' }}
      />
    </div>
  );
}

function SparkleDecoration({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Sparkle className="w-3 h-3 text-[#722F37]/30" />
    </motion.div>
  );
}

function GlowOrb({ className = '', color = 'bg-[#722F37]' }: { className?: string; color?: string }) {
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${color} ${className}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ============================================================================
// MOBILE BEFORE/AFTER SLIDER - PREMIUM VERSION
// ============================================================================

function MobileBeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(8, Math.min(92, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3762434/pexels-photo-3762434.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="After cosmetic treatment - Beautiful confident smile"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Premium glass label */}
        <motion.div
          className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white text-xs font-semibold rounded-full flex items-center gap-2 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkle className="w-3.5 h-3.5" />
          After
        </motion.div>
      </div>

      {/* Before Image (Clipped) */}
      <motion.div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src="https://images.pexels.com/photos/6627275/pexels-photo-6627275.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Before cosmetic treatment"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle overlay on before */}
        <div className="absolute inset-0 bg-neutral-900/5" />
        <motion.div
          className="absolute bottom-4 left-4 px-4 py-2 bg-neutral-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          Before
        </motion.div>
      </motion.div>

      {/* Animated Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        animate={{
          boxShadow: isDragging
            ? '0 0 30px rgba(114, 47, 55, 0.5)'
            : '0 0 15px rgba(114, 47, 55, 0.3)'
        }}
      >
        {/* Glowing line */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white shadow-xl" />

        {/* Premium handle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center"
          animate={{ scale: isDragging ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-[#722F37]/20 animate-pulse" style={{ transform: 'scale(1.3)' }} />

          {/* Main handle */}
          <div className="relative w-full h-full bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#722F37]">
            <MoveHorizontal className="w-5 h-5 text-[#722F37]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Premium instruction tooltip */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md text-white text-xs rounded-full flex items-center gap-2 border border-white/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isDragging ? 0 : 1, y: isDragging ? -10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <MoveHorizontal className="w-3.5 h-3.5" />
        </motion.div>
        <span className="font-medium">Slide to reveal</span>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// PREMIUM SERVICE CARD - SWIPEABLE
// ============================================================================

function ServiceCard({
  service,
  index,
  isActive,
  onTap,
}: {
  service: typeof cosmeticServices[0];
  index: number;
  isActive: boolean;
  onTap: () => void;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
        isActive ? 'bg-white shadow-xl border-2 border-[#722F37]/20' : 'bg-white/80 border border-neutral-100'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileTap={{ scale: 0.98 }}
      onTap={onTap}
    >
      {/* Shimmer effect on active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
      )}

      {/* Header */}
      <div className="relative p-5">
        <div className="flex items-start gap-4">
          {/* Icon with gradient background */}
          <motion.div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
            animate={{ rotate: isActive ? [0, -5, 5, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            {service.icon}
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} blur-xl opacity-40`} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-neutral-900">{service.title}</h3>
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#722F37]"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
            <p className="text-sm text-neutral-500 mt-0.5 line-clamp-1">{service.description}</p>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-neutral-100">
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features with staggered animation */}
                <div className="space-y-2.5 mb-5">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm text-neutral-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/book"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-semibold text-sm shadow-lg`}
                  >
                    Book Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ============================================================================
// TESTIMONIAL CAROUSEL WITH SWIPE
// ============================================================================

function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef(null);

  const handleDragEnd = (e: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    } else if (info.offset.x < -threshold && activeIndex < testimonials.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="relative" ref={constraintsRef}>
      <div className="overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-6 shadow-xl border border-neutral-100"
          >
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#722F37]/5 to-rose-500/5 rounded-full blur-2xl" />

            {/* Quote icon with gradient */}
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8a3a44] flex items-center justify-center mb-5 shadow-lg">
              <Quote className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8a3a44] blur-xl opacity-40" />
            </div>

            {/* Stars */}
            <div className="flex gap-1.5 mb-4">
              {[...Array(testimonials[activeIndex]?.rating ?? 5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-neutral-800 text-lg font-medium leading-relaxed mb-6">
              &ldquo;{testimonials[activeIndex]?.quote ?? ''}&rdquo;
            </blockquote>

            {/* Author with image */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#722F37]/20">
                <Image
                  src={testimonials[activeIndex]?.image ?? ''}
                  alt={testimonials[activeIndex]?.author ?? ''}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-neutral-900">
                  {testimonials[activeIndex]?.author ?? ''}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#722F37]">
                  <BadgeCheck className="w-4 h-4" />
                  {testimonials[activeIndex]?.treatment ?? ''}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Premium pagination dots */}
      <div className="flex justify-center gap-3 mt-6">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > activeIndex ? 1 : -1);
              setActiveIndex(i);
            }}
            className="relative h-2.5 rounded-full overflow-hidden"
            animate={{ width: i === activeIndex ? 32 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`absolute inset-0 rounded-full ${
              i === activeIndex
                ? 'bg-gradient-to-r from-[#722F37] to-[#8a3a44]'
                : 'bg-[#722F37]/20'
            }`} />
            {i === activeIndex && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{ x: [-32, 32] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MOBILE HERO SECTION - PREMIUM
// ============================================================================

function MobileHeroSection() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
        <Image
          src="https://images.pexels.com/photos/3762434/pexels-photo-3762434.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Beautiful confident smile showcasing cosmetic dentistry results"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#722F37]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div style={{ opacity: heroOpacity }}>
        <SparkleDecoration className="top-28 left-8" />
        <SparkleDecoration className="top-40 right-12" />
        <SparkleDecoration className="bottom-48 left-16" />
        <GlowOrb className="top-36 right-20 bg-white/50" />
        <GlowOrb className="bottom-60 left-10 bg-[#722F37]/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-end px-5 pb-10 pt-28"
        style={{ opacity: heroOpacity }}
      >
        {/* Breadcrumb */}
        <nav className="mb-5" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs">
            <li><Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
            <li className="text-white/40">/</li>
            <li><Link href="/services" className="text-white/60 hover:text-white transition-colors">Services</Link></li>
            <li className="text-white/40">/</li>
            <li className="text-white font-medium">Cosmetic</li>
          </ol>
        </nav>

        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>
            <span className="text-white text-sm font-medium">Transform Your Smile</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl font-bold text-white leading-[1.1] mb-5"
          >
            Cosmetic
            <span className="block mt-1">
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-[#cf7a7a] to-amber-300">
                  Dentistry
                </span>
                {/* Glow effect behind text */}
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-amber-300 blur-lg opacity-50">
                  Dentistry
                </span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-white/80 text-base leading-relaxed mb-8 max-w-[320px]"
          >
            Unlock your dream smile with professional whitening, veneers, and complete smile makeovers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="flex flex-col gap-3">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/book"
                className="group relative flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-2xl font-semibold overflow-hidden shadow-2xl shadow-[#722F37]/30"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.6 }}
                />
                <Calendar className="w-5 h-5" />
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 group-active:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <a
                href={phoneHref}
                className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-medium"
              >
                <Phone className="w-5 h-5" />
                <span>{formattedPhone}</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: heroOpacity }}
      >
        <span className="text-white/40 text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
}

// ============================================================================
// PREMIUM STATS SECTION
// ============================================================================

function MobileStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#8a3a44] to-[#5a252c]" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="relative grid grid-cols-2 gap-4 px-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl" />

            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3 text-white">
                {stat.icon}
              </div>
              <motion.div
                className="text-3xl font-bold text-white mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs text-white/70 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// PREMIUM BENEFITS SECTION
// ============================================================================

function MobileBenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-16 px-5 bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
      <FloatingOrbs />

      {/* Header */}
      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 mb-4">
          <Crown className="w-4 h-4 text-[#722F37]" />
          <span className="text-[#722F37] text-xs font-semibold uppercase tracking-wider">Why Choose Us</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-neutral-900">
          Benefits of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]">
            Cosmetic Dentistry
          </span>
        </h2>
      </motion.div>

      {/* Benefits Cards */}
      <div className="space-y-4 relative z-10">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            className="relative bg-white rounded-2xl p-5 shadow-lg border border-neutral-100 overflow-hidden"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#722F37]/5 to-transparent rounded-full blur-2xl" />

            <div className="relative flex items-start gap-4">
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8a3a44] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                {benefit.icon}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#8a3a44] blur-xl opacity-30" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-neutral-900">{benefit.title}</h3>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#722F37]">{benefit.stat}</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{benefit.description}</p>
                <span className="text-[10px] text-[#722F37]/60 font-medium uppercase tracking-wider">{benefit.statLabel}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// SERVICES SECTION
// ============================================================================

function MobileServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 px-5 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#722F37]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-400/5 to-transparent rounded-full blur-3xl" />

      {/* Header */}
      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 mb-4">
          <Wand2 className="w-4 h-4 text-violet-600" />
          <span className="text-violet-700 text-xs font-semibold uppercase tracking-wider">Our Treatments</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-neutral-900 mb-3">
          Cosmetic{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">
            Services
          </span>
        </h2>
        <p className="text-neutral-600 text-sm max-w-xs mx-auto">
          Discover treatments tailored to your aesthetic goals.
        </p>
      </motion.div>

      {/* Service Cards */}
      <div className="space-y-3 relative z-10">
        {cosmeticServices.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            index={index}
            isActive={activeIndex === index}
            onTap={() => setActiveIndex(activeIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// BEFORE/AFTER SECTION
// ============================================================================

function MobileBeforeAfterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 px-5 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
      <FloatingOrbs />

      {/* Header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 mb-4">
          <Eye className="w-4 h-4 text-rose-600" />
          <span className="text-rose-700 text-xs font-semibold uppercase tracking-wider">Real Results</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-neutral-900">
          See The{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]">
            Transformation
          </span>
        </h2>
      </motion.div>

      <MobileBeforeAfterSlider />

      {/* Feature card below slider */}
      <motion.div
        className="mt-8 p-5 bg-white rounded-2xl shadow-xl border border-neutral-100 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-full blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Diamond className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900">Premium Quality</h4>
            <p className="text-sm text-neutral-600">Highest quality materials and expert techniques.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// JOURNEY TIMELINE SECTION
// ============================================================================

function MobileJourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 px-5 bg-white relative overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#722F37]/10 to-rose-100 mb-4">
          <Target className="w-4 h-4 text-[#722F37]" />
          <span className="text-[#722F37] text-xs font-semibold uppercase tracking-wider">Your Journey</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-neutral-900">
          What to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]">
            Expect
          </span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Animated vertical line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#722F37] via-[#a04d56] to-[#cf7a7a] rounded-full"
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        />

        <div className="space-y-8">
          {transformationSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            >
              {/* Step indicator dot */}
              <motion.div
                className={`absolute -left-6 top-0 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg z-10`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 300 }}
              >
                <span className="text-xs font-bold">{step.step}</span>
              </motion.div>

              {/* Content card */}
              <div className="ml-8 bg-white rounded-2xl p-5 shadow-lg border border-neutral-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white`}>
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900">{step.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================

function MobileTestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 px-5 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      <FloatingOrbs />

      {/* Header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 mb-4">
          <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
          <span className="text-rose-700 text-xs font-semibold uppercase tracking-wider">Patient Stories</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-neutral-900">
          Confidence{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04d56]">
            Restored
          </span>
        </h2>
      </motion.div>

      <TestimonialCarousel />
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function MobileFAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 px-5 bg-white">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-4">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span className="text-amber-700 text-xs font-semibold uppercase tracking-wider">Common Questions</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-neutral-900">
          FAQs
        </h2>
      </motion.div>

      <FAQAccordion items={faqItems} />
    </section>
  );
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

function MobileRelatedServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 px-5 bg-neutral-50">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-100 mb-4">
          <Layers className="w-4 h-4 text-neutral-600" />
          <span className="text-neutral-700 text-xs font-semibold uppercase tracking-wider">Explore More</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-neutral-900">
          Related Services
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        {relatedServices.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={service.href}
              className="block bg-white rounded-2xl p-5 shadow-lg border border-neutral-100 text-center relative overflow-hidden group"
            >
              {/* Gradient overlay on active */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-active:opacity-10 transition-opacity`} />

              <div className={`relative w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg mb-4`}>
                {service.icon}
              </div>
              <h3 className="font-bold text-neutral-900 mb-1">{service.title}</h3>
              <p className="text-xs text-neutral-500">{service.description}</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-sm font-medium text-[#722F37]">
                <span>Learn more</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// PREMIUM CTA SECTION
// ============================================================================

function MobileCTASection() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-20 px-5 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#8a3a44] to-[#5a252c]" />

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <motion.div
          className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-white/30"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-1.5 h-1.5 rounded-full bg-white/20"
          animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        {/* Icon */}
        <motion.div
          className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        <h2 className="font-display font-bold text-3xl text-white mb-4 leading-tight">
          Ready for Your Smile Transformation?
        </h2>
        <p className="text-white/80 text-base mb-8 max-w-xs mx-auto">
          Take the first step toward the smile you've always dreamed of.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Link
              href="/book"
              className="group flex items-center justify-center gap-3 w-full py-4 bg-white text-[#722F37] rounded-2xl font-bold shadow-2xl relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#722F37]/10 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6 }}
              />
              <Calendar className="w-5 h-5" />
              <span>Book Consultation</span>
              <ArrowRight className="w-5 h-5 group-active:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <a
              href={phoneHref}
              className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-2xl font-semibold"
            >
              <Phone className="w-5 h-5" />
              <span>Call {formattedPhone}</span>
            </a>
          </motion.div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 text-white/70 text-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Visit Our Office</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// PREMIUM STICKY FOOTER
// ============================================================================

function StickyBookingFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Gradient blur backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-white/90 backdrop-blur-xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

          <div className="relative px-4 py-4">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/book"
                className="group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#722F37] to-[#8a3a44] text-white rounded-2xl font-bold shadow-2xl shadow-[#722F37]/20 relative overflow-hidden"
              >
                {/* Animated shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                />
                <Calendar className="w-5 h-5" />
                <span>Book Your Consultation</span>
                <ArrowRight className="w-5 h-5 group-active:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN MOBILE PAGE COMPONENT
// ============================================================================

export default function CosmeticDentistryMobile() {
  return (
    <main id="main-content" className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero */}
      <MobileHeroSection />

      {/* Stats */}
      <MobileStatsSection />

      {/* Benefits */}
      <MobileBenefitsSection />

      {/* Before/After */}
      <MobileBeforeAfterSection />

      {/* Services */}
      <MobileServicesSection />

      {/* Journey */}
      <MobileJourneySection />

      {/* Testimonials */}
      <MobileTestimonialsSection />

      {/* FAQ */}
      <MobileFAQSection />

      {/* Related Services */}
      <MobileRelatedServices />

      {/* CTA */}
      <MobileCTASection />

      {/* Bottom Spacer for sticky nav */}
      <div className="h-24" />

      {/* Sticky Bottom CTA */}
      <StickyBookingFooter />
    </main>
  );
}
