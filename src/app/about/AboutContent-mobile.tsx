'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Heart,
  Users,
  Award,
  Sparkles,
  Shield,
  Clock,
  Languages,
  MapPin,
  Phone,
  Calendar,
  ChevronDown,
  CheckCircle2,
  Stethoscope,
  Leaf,
  HandHeart,
  Building2,
  BadgeCheck,
  Star,
  ChevronRight,
  Grid3X3,
  ZoomIn,
  X,
  ChevronLeft,
  Play,
  Quote,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GalleryImage } from '@/components/sections/office-gallery';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const }
  }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

// ============================================================================
// DATA
// ============================================================================

const philosophyPillars = [
  {
    icon: Heart,
    title: 'Patient-First Care',
    description: 'Every decision we make starts with your comfort and well-being in mind.',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
  },
  {
    icon: Stethoscope,
    title: 'Education & Transparency',
    description: 'We explain every procedure and ensure you understand your treatment options.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Gentle Environment',
    description: 'Our compassionate approach helps even the most nervous patients feel at ease.',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Sparkles,
    title: 'Modern Excellence',
    description: 'We invest in the latest technology to provide advanced, effective treatments.',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
  },
];

const technologyHighlights = [
  {
    icon: BadgeCheck,
    title: 'Digital X-Rays',
    description: '90% less radiation',
    stat: '90%',
    statLabel: 'Less Radiation',
  },
  {
    icon: Star,
    title: 'Intraoral Cameras',
    description: 'HD imaging',
    stat: 'HD',
    statLabel: 'Quality',
  },
  {
    icon: Shield,
    title: 'Sterilization',
    description: 'Hospital-grade',
    stat: '100%',
    statLabel: 'Safe',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Green practices',
    stat: '♻️',
    statLabel: 'Sustainable',
  },
];

const communityInitiatives = [
  { text: 'Free dental education at local schools', icon: '🎓' },
  { text: 'Give Kids A Smile day participation', icon: '😊' },
  { text: 'Supporting Ottawa Food Bank', icon: '🍎' },
  { text: 'Sponsoring community sports teams', icon: '⚽' },
  { text: 'Volunteer services for underserved communities', icon: '💝' },
];

const practiceStats = [
  { value: '20+', label: 'Years', sublabel: 'Serving Ottawa', icon: Clock },
  { value: '10K+', label: 'Patients', sublabel: 'Happy smiles', icon: Users },
  { value: '7', label: 'Languages', sublabel: 'Multilingual', icon: Languages },
  { value: '4.8', label: 'Rating', sublabel: 'Google ★', icon: Star },
];

const commitmentItems = [
  'Comprehensive treatment explanations',
  'Flexible payment options',
  'Same-day emergency appointments',
  'Comfortable, anxiety-free environment',
  'Personalized treatment plans',
  'Follow-up care and support',
];

const galleryImages: GalleryImage[] = [
  { src: '/images/clinic/clinic-01.jpg', alt: 'Welcoming reception area', caption: 'Our warm reception area' },
  { src: '/images/clinic/clinic-02.jpg', alt: 'Modern treatment room', caption: 'State-of-the-art treatment room' },
  { src: '/images/clinic/clinic-03.jpg', alt: 'Dental equipment', caption: 'Modern dental technology' },
  { src: '/images/clinic/clinic-04.jpg', alt: 'Patient waiting area', caption: 'Comfortable waiting area' },
  { src: '/images/clinic/clinic-05.jpg', alt: 'Consultation room', caption: 'Private consultation room' },
  { src: '/images/clinic/clinic-06.jpg', alt: 'Digital X-ray equipment', caption: 'Digital imaging technology' },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Animated stat card with counting effect
 */
function StatCard({ stat, index }: { stat: typeof practiceStats[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative overflow-hidden"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-lg shadow-black/5">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#722F37] via-[#8B3D46] to-[#722F37]" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#722F37]" />
          </div>
          <div>
            <motion.p
              className="text-2xl font-bold text-[#722F37]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
            >
              {stat.value}
            </motion.p>
            <p className="text-xs text-neutral-600">{stat.sublabel}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Philosophy card with animated reveal
 */
function PhilosophyCard({ pillar, index, isExpanded, onToggle }: {
  pillar: typeof philosophyPillars[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = pillar.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full text-left"
        whileTap={{ scale: 0.98 }}
      >
        <div className={`
          relative overflow-hidden rounded-2xl border transition-all duration-300
          ${isExpanded
            ? 'bg-white border-[#722F37]/20 shadow-lg shadow-[#722F37]/5'
            : 'bg-white/80 border-neutral-100 shadow-sm'
          }
        `}>
          {/* Animated gradient border on expand */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#722F37] via-[#9B4D56] to-[#722F37]"
                style={{ transformOrigin: 'left' }}
              />
            )}
          </AnimatePresence>

          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <motion.div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isExpanded
                      ? `bg-gradient-to-br ${pillar.color} shadow-lg`
                      : pillar.bgColor
                    }
                  `}
                  animate={{ rotate: isExpanded ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-[#722F37]'}`} />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{pillar.title}</h3>
                  <p className="text-xs text-neutral-500">Tap to learn more</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-[#722F37]" />
              </motion.div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-neutral-100">
                    <p className="text-sm text-neutral-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

/**
 * Immersive gallery with swipe and lightbox
 */
function ImmersiveGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <>
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="space-y-3"
      >
        {/* Featured large image */}
        {images[0] && (
          <motion.button
            variants={scaleIn}
            onClick={() => openLightbox(0)}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden group"
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-active:scale-105"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Tour Our Office</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ZoomIn className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.button>
        )}

        {/* Grid of smaller images */}
        <div className="grid grid-cols-3 gap-2">
          {images.slice(1, 4).map((image, index) => (
            <motion.button
              key={index}
              variants={scaleIn}
              onClick={() => openLightbox(index + 1)}
              className="relative aspect-square rounded-xl overflow-hidden group"
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-active:scale-110"
                sizes="33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
            </motion.button>
          ))}
        </div>

        {/* View all button */}
        <motion.button
          variants={fadeInUp}
          onClick={() => openLightbox(0)}
          className="w-full py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium flex items-center justify-center gap-2 active:bg-neutral-100 transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          <Grid3X3 className="w-4 h-4" />
          View All {images.length} Photos
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation */}
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Main image */}
            <motion.div
              className="w-full h-full flex items-center justify-center p-4"
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-full max-h-[70vh]">
                {images[currentIndex] && (
                  <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                )}
              </div>
            </motion.div>

            {/* Caption and dots */}
            <div className="absolute bottom-8 left-0 right-0 text-center space-y-3">
              <p className="text-white font-medium">{images[currentIndex]?.caption}</p>
              <div className="flex items-center justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? 'bg-white w-6' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Technology card with animated stat
 */
function TechCard({ tech, index }: { tech: typeof technologyHighlights[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = tech.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm h-full">
        {/* Animated gradient on hover/tap */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-transparent opacity-0"
          whileTap={{ opacity: 1 }}
        />

        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary-600" />
            </div>
            <motion.span
              className="text-lg font-bold text-[#722F37]"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
            >
              {tech.stat}
            </motion.span>
          </div>
          <h3 className="font-semibold text-neutral-900 text-sm">{tech.title}</h3>
          <p className="text-xs text-neutral-500 mt-0.5">{tech.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AboutContentMobile() {
  const [expandedPhilosophy, setExpandedPhilosophy] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  return (
    <main id="main-content" className="flex flex-col pb-28 bg-neutral-50">
      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative min-h-[85vh] overflow-hidden">
        {/* Background with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImageY, opacity: heroOpacity }}
        >
          <Image
            src="https://images.pexels.com/photos/3952124/pexels-photo-3952124.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Dental team with patient"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-4 w-20 h-20 rounded-full bg-[#722F37]/20 blur-2xl" />
        <div className="absolute bottom-40 left-4 w-32 h-32 rounded-full bg-white/10 blur-3xl" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end px-5 pb-8 pt-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium w-fit mb-4 border border-white/20"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>About Our Practice</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl text-white leading-[1.1] mb-4"
          >
            Your Smile Is{' '}
            <span className="relative">
              <span className="relative z-10 text-[#F5D0C5]">Our Passion</span>
              <motion.span
                className="absolute bottom-1 left-0 right-0 h-3 bg-[#722F37]/50 -z-0 rounded-sm"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 text-base leading-relaxed mb-6 max-w-[90%]"
          >
            For over two decades, we&apos;ve been providing compassionate, patient-centered dental care to families across Ottawa.
          </motion.p>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            {practiceStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== OUR STORY SECTION ========== */}
      <section className="px-5 py-10 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium w-fit mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Our Story</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-neutral-900 leading-tight">
            A Legacy of <span className="text-[#722F37]">Caring</span>
            <br />Since 2004
          </motion.h2>

          {/* Story image with overlay */}
          <motion.div
            variants={scaleIn}
            className="mt-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.pexels.com/photos/6627533/pexels-photo-6627533.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Happy patient at dental clinic"
              fill
              loading="lazy"
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Quote overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-start gap-2">
                <Quote className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm italic">
                  &quot;Where patients feel genuinely cared for, not just treated.&quot;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story text */}
          <motion.div variants={fadeInUp} className="mt-5 space-y-4 text-neutral-600 text-[15px] leading-relaxed">
            <p>
              Ottawa South Dental was founded with a simple yet powerful vision: to create a dental practice where patients feel genuinely cared for.
            </p>
            <p>
              What started as a small practice on Bank Street has grown into a trusted community institution, serving thousands of families across Ottawa.
            </p>
          </motion.div>

          {/* Languages highlight */}
          <motion.div
            variants={slideInFromLeft}
            className="mt-6 bg-gradient-to-r from-[#FDF8F3] to-[#FFFBF8] rounded-2xl p-4 border border-[#722F37]/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#8B3D46] flex items-center justify-center shadow-lg shadow-[#722F37]/20">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">7 Languages Spoken</p>
                <p className="text-xs text-neutral-600 mt-0.5">
                  English, French, Spanish, Hindi, Punjabi, Farsi, Arabic
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== MISSION STATEMENT ========== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#8B3D46] to-[#5a252c]" />

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="mission-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect fill="url(#mission-dots)" width="100%" height="100%" />
          </svg>
        </div>

        <div className="relative px-5 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium w-fit mx-auto mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Mission</span>
            </div>

            <blockquote className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/20" />
              <p className="text-white text-lg leading-relaxed font-medium px-4">
                To provide exceptional dental care in a warm, welcoming environment where every patient is treated like family.
              </p>
            </blockquote>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-white/30" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-white/80" />
              </motion.div>
              <div className="w-12 h-px bg-white/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== PHILOSOPHY SECTION ========== */}
      <section className="px-5 py-10 bg-gradient-to-b from-neutral-50 to-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#722F37]/5 text-[#722F37] text-xs font-medium w-fit mb-4">
            <HandHeart className="w-3.5 h-3.5" />
            <span>Our Philosophy</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-neutral-900 mb-2">
            What <span className="text-[#722F37]">Guides</span> Us
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-neutral-600 text-sm mb-6">
            Our practice philosophy shapes everything we do.
          </motion.p>

          <div className="space-y-3">
            {philosophyPillars.map((pillar, index) => (
              <PhilosophyCard
                key={pillar.title}
                pillar={pillar}
                index={index}
                isExpanded={expandedPhilosophy === index}
                onToggle={() => setExpandedPhilosophy(expandedPhilosophy === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== COMMITMENT SECTION ========== */}
      <section className="px-5 py-10 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium w-fit mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Our Commitment</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-neutral-900">
            Dedicated to Your <span className="text-[#722F37]">Well-Being</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="mt-3 text-neutral-600 text-sm">
            Our commitment goes beyond just treating teeth. We&apos;re dedicated to your overall well-being.
          </motion.p>

          <motion.ul variants={staggerContainer} className="mt-6 space-y-3">
            {commitmentItems.map((item, index) => (
              <motion.li
                key={item}
                variants={slideInFromLeft}
                className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                </motion.div>
                <span className="text-sm text-neutral-700">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CDCP badge */}
          <motion.div
            variants={scaleIn}
            className="mt-6"
          >
            <div className="bg-gradient-to-r from-[#722F37] to-[#8B3D46] text-white px-5 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-[#722F37]/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold">CDCP Accepted</span>
                <p className="text-xs text-white/80">Canadian Dental Care Plan</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== GALLERY SECTION ========== */}
      <section className="px-5 py-10 bg-neutral-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#722F37]/5 text-[#722F37] text-xs font-medium w-fit mb-4">
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Photo Gallery</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-neutral-900 mb-2">
            Step Inside Our Office
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-neutral-600 text-sm mb-6">
            Take a virtual tour of our modern, welcoming facility.
          </motion.p>

          <ImmersiveGallery images={galleryImages} />
        </motion.div>
      </section>

      {/* ========== TECHNOLOGY SECTION ========== */}
      <section className="px-5 py-10 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium w-fit mb-4">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Technology</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-neutral-900 mb-6">
            Modern <span className="text-[#722F37]">Technology</span>
          </motion.h2>

          <div className="grid grid-cols-2 gap-3">
            {technologyHighlights.map((tech, index) => (
              <TechCard key={tech.title} tech={tech} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== COMMUNITY SECTION ========== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />

        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-white/5 blur-3xl" />

        <div className="relative px-5 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium w-fit mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Community</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-white">
              Giving Back to{' '}
              <span className="text-primary-200">Our Community</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="mt-3 text-white/80 text-sm">
              We believe in being active, contributing members of the Ottawa community.
            </motion.p>

            {/* Community image */}
            <motion.div
              variants={scaleIn}
              className="mt-5 relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.pexels.com/photos/6646873/pexels-photo-6646873.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Community volunteers"
                fill
                loading="lazy"
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            <motion.ul variants={staggerContainer} className="mt-6 space-y-3">
              {communityInitiatives.map((initiative, index) => (
                <motion.li
                  key={initiative.text}
                  variants={slideInFromLeft}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                >
                  <span className="text-xl">{initiative.icon}</span>
                  <span className="text-sm text-white/90">{initiative.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ========== MEET THE TEAM CTA ========== */}
      <section className="px-5 py-10 bg-gradient-to-b from-neutral-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-xl font-bold text-neutral-900 mb-3">
            Ready to Meet Our Team?
          </h2>
          <p className="text-neutral-600 text-sm mb-5">
            Get to know the caring professionals behind your smile.
          </p>

          <Link href="/about/team">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white font-medium shadow-lg"
            >
              <Users className="w-5 h-5" />
              Meet the Team
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ========== STICKY CTA FOOTER ========== */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-neutral-100 px-4 py-3 shadow-2xl shadow-black/10 z-40"
      >
        <div className="flex gap-3">
          <Link href="/contact#book" className="flex-1">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<Calendar className="w-5 h-5" />}
              >
                Book Visit
              </Button>
            </motion.div>
          </Link>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="tel:6137331118"
              className="w-14 h-14 rounded-xl border-2 border-[#722F37] flex items-center justify-center text-[#722F37] bg-[#722F37]/5"
            >
              <Phone className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Quick info */}
        <div className="flex items-center justify-center gap-4 mt-2.5 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>1729 Bank St</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-neutral-300" />
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Mon-Thu: 9am-6pm</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default AboutContentMobile;
