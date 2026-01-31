'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Metadata } from 'next';
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
  Play,
  Quote,
  Check,
  MoveHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

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
  },
  {
    icon: <Gem className="w-6 h-6" />,
    title: 'Porcelain Veneers',
    description: 'Ultra-thin shells custom-crafted to cover front teeth, transforming shape, color, and alignment.',
    image: '/images/cosmetic/cosmetic-07.jpg',
    features: ['Custom-designed', 'Stain-resistant', '10-15 year lifespan'],
  },
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: 'Dental Bonding',
    description: 'Tooth-colored resin repairs chips, gaps, and discoloration for a natural, seamless look.',
    image: '/images/cosmetic/cosmetic-08.jpg',
    features: ['Single-visit procedure', 'Minimal prep', 'Natural appearance'],
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Smile Makeovers',
    description: 'Comprehensive treatment plans combining multiple procedures for a complete smile transformation.',
    image: '/images/cosmetic/cosmetic-09.jpg',
    features: ['Personalized plan', 'Digital preview', 'Life-changing results'],
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    title: 'Gum Contouring',
    description: 'Reshaping the gum line to create a more balanced, aesthetically pleasing smile.',
    image: '/images/cosmetic/cosmetic-10.jpg',
    features: ['Precise sculpting', 'Quick recovery', 'Permanent results'],
  },
  {
    icon: <AlignCenter className="w-6 h-6" />,
    title: 'Invisalign',
    description: 'Clear, removable aligners that straighten teeth discreetly for a beautifully aligned smile.',
    image: '/images/cosmetic/cosmetic-11.jpg',
    features: ['Nearly invisible', 'Removable design', 'Comfortable fit'],
  },
];

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Boosted Confidence',
    description: 'A beautiful smile enhances self-esteem and makes you feel great in social and professional settings.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Long-Lasting Results',
    description: 'Modern cosmetic treatments provide durable, natural-looking results that can last for years.',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Personalized Treatment',
    description: 'Every smile is unique—we customize treatments to match your facial features and goals.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Expert Craftsmanship',
    description: 'Our skilled team uses advanced techniques and premium materials for exceptional results.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Improved Function',
    description: 'Many cosmetic procedures also enhance bite function and protect against future damage.',
  },
];

const transformationSteps = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We discuss your smile goals, examine your teeth, and explore treatment options that fit your vision.',
    image: '/images/cosmetic/cosmetic-13.jpg',
  },
  {
    step: '02',
    title: 'Custom Treatment Plan',
    description: 'We design a personalized plan, often using digital imaging to preview your potential results.',
    image: '/images/cosmetic/cosmetic-14.jpg',
  },
  {
    step: '03',
    title: 'Smile Transformation',
    description: 'Our skilled team performs your chosen procedures with precision, comfort, and attention to detail.',
    image: '/images/cosmetic/cosmetic-15.jpg',
  },
  {
    step: '04',
    title: 'Reveal & Maintain',
    description: 'Enjoy your beautiful new smile and follow our care guidelines to keep it looking perfect.',
    image: '/images/cosmetic/cosmetic-16.jpg',
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ============================================================================
// MAGNETIC BUTTON HOOK
// ============================================================================

function useMagnetic(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  }, [x, y, strength]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x: springX, y: springY, handleMouseMove, handleMouseLeave };
}

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
          alt="After treatment"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* After Label */}
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-[#722F37] text-white text-sm font-medium rounded-full shadow-lg">
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
          alt="Before treatment"
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
            <div className="px-6 py-3 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
              Drag to compare
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
          alt={service.title}
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
    '/images/cosmetic/cosmetic-20.jpg',
    '/images/cosmetic/cosmetic-21.jpg',
    '/images/cosmetic/cosmetic-22.jpg',
    '/images/cosmetic/cosmetic-23.jpg',
    '/images/cosmetic/cosmetic-24.jpg',
    '/images/cosmetic/cosmetic-25.jpg',
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
            key={img}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <Image
              src={img}
              alt="Beautiful smile transformation"
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
            key={img}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 + 0.3 }}
          >
            <Image
              src={img}
              alt="Beautiful smile transformation"
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
            key={img}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 + 0.6 }}
          >
            <Image
              src={img}
              alt="Beautiful smile transformation"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="33vw"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
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
          <Quote className="w-10 h-10 text-[#722F37]" />
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
              <div className="flex items-center justify-center gap-1 mb-8">
                {[...Array(testimonials[activeIndex]?.rating ?? 5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-6 h-6 text-[#722F37] fill-[#722F37]" />
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
                <span className="text-sm text-[#722F37] font-medium mt-1">
                  {testimonials[activeIndex]?.treatment ?? ''}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-10 bg-[#722F37]'
                  : 'bg-[#722F37]/20 hover:bg-[#722F37]/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
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
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#EDE5DD] -translate-x-1/2">
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
              <motion.span
                className="inline-block text-6xl font-bold text-[#722F37]/10 mb-4"
                whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {step.step}
              </motion.span>
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
                  alt={step.title}
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
          src="/images/cosmetic/cosmetic-05.jpg"
          alt="Beautiful confident smile"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            >
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li>/</li>
                <li className="text-white font-medium">Cosmetic Dentistry</li>
              </ol>
            </motion.nav>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
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
                    <Calendar className="w-5 h-5" />
                    Book Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
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
          <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
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
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#722F37] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5" />
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
// MAIN PAGE COMPONENT
// ============================================================================

export default function CosmeticDentistryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

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
              <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
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
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <MoveHorizontal className="w-5 h-5 text-[#722F37]" />
                  <span>Drag to compare</span>
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
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
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
              <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
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
                    className="flex gap-5"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] text-[#722F37] flex items-center justify-center shadow-sm">
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
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
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
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              Your Journey
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
              What to <span className="text-[#722F37]">Expect</span>
            </h2>
            <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
              Your journey to a stunning smile begins with a personalized consultation and careful planning.
            </p>
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
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
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
