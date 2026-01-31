'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence,
  MotionValue,
} from 'framer-motion';
import {
  Phone,
  Calendar,
  MapPin,
  Star,
  Heart,
  Shield,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Siren,
  Smile,
  ShieldCheck,
  Wrench,
  HeartPulse,
  Users,
  Award,
  Languages,
  Receipt,
  Quote,
} from 'lucide-react';

// ============================================================================
// ANIMATION VARIANTS & CONSTANTS
// ============================================================================

const burgundy = {
  DEFAULT: '#722F37',
  dark: '#5a252c',
  light: '#8B4049',
  lighter: '#A35560',
};

const springConfig = { damping: 30, stiffness: 200 };

// Text reveal animation variants
const textRevealVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const scaleInVariants = {
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

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

function useMagnetic(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x: springX, y: springY, handleMouseMove, handleMouseLeave };
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large burgundy orb */}
      <motion.div
        className="absolute -top-32 -right-32 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(114,47,55,0.08) 0%, rgba(114,47,55,0.02) 40%, transparent 70%)',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Teal accent orb */}
      <motion.div
        className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 60%)',
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Golden accent */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(114,47,55,0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(114,47,55,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
  );
}

// ============================================================================
// ANIMATED TEXT COMPONENTS
// ============================================================================

function AnimatedHeadline({ text, accent }: { text: string; accent: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref}>
      <h1 className="font-display font-bold tracking-tight leading-[1.05]">
        <div className="overflow-hidden">
          <motion.span
            className="block text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] text-neutral-900"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.span
            className="block text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] text-[#722F37]"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ textShadow: '0 4px 30px rgba(114,47,55,0.2)' }}
          >
            {accent}
          </motion.span>
        </div>
      </h1>
    </div>
  );
}

function AnimatedText({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

function MagneticButton({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.2);

  const baseStyles =
    'relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] text-white shadow-lg shadow-[#722F37]/25 focus-visible:ring-[#722F37]',
    secondary:
      'bg-white text-neutral-800 border-2 border-neutral-200 hover:border-[#722F37]/30 hover:text-[#722F37] shadow-sm focus-visible:ring-[#722F37]',
    outline:
      'bg-transparent text-[#722F37] border-2 border-[#722F37]/30 hover:border-[#722F37] hover:bg-[#722F37]/5 focus-visible:ring-[#722F37]',
  };

  const content = (
    <motion.div
      style={{ x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={(e) => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {/* Shimmer effect for primary */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 rounded-xl"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '200%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />
      )}

      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} type="button">
      {content}
    </button>
  );
}

// ============================================================================
// FLOATING CARDS
// ============================================================================

function FloatingCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-xl shadow-neutral-900/10 border border-neutral-100 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// TRUST INDICATORS
// ============================================================================

const trustIndicators = [
  {
    icon: Heart,
    value: '20+',
    label: 'Years Serving Ottawa',
    sublabel: 'Trusted since 2004',
  },
  {
    icon: Star,
    value: '4.8',
    label: 'Google Rating',
    sublabel: '250+ reviews',
  },
  {
    icon: Shield,
    value: '6',
    label: 'Expert Dentists',
    sublabel: 'Specialized care',
  },
];

function TrustIndicator({
  indicator,
  index,
}: {
  indicator: (typeof trustIndicators)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
      className="group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#722F37]/10"
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <indicator.icon className="w-5 h-5 text-[#722F37]" />
        </motion.div>
        <div>
          <motion.div
            className="text-3xl font-bold text-neutral-900"
            animate={{ scale: isHovered ? 1.05 : 1 }}
          >
            {indicator.value}
          </motion.div>
          <div className="text-sm font-medium text-neutral-700">
            {indicator.label}
          </div>
          <div className="text-xs text-neutral-500">{indicator.sublabel}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useParallax(scrollYProgress, 100);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFFBF8] via-white to-[#FDF8F3]"
    >
      <FloatingOrbs />
      <GridPattern />

      <motion.div style={{ y, opacity, scale }} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-200px)]">
            {/* Left Content */}
            <div className="lg:col-span-6 xl:col-span-5 text-center lg:text-left">
              {/* Trust Badges */}
              <motion.div
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <ShieldCheck className="w-4 h-4" />
                  CDCP Accepted
                </motion.div>
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Receipt className="w-4 h-4" />
                  Direct Insurance Billing
                </motion.div>
              </motion.div>

              {/* Headline */}
              <AnimatedHeadline
                text="Your Family's Smile"
                accent="Deserves The Best"
              />

              {/* Description */}
              <AnimatedText delay={0.3} className="mt-8">
                <p className="text-xl md:text-2xl text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Welcome to Ottawa South Dental, where we combine modern
                  dentistry with compassionate care for your whole family.
                </p>
              </AnimatedText>

              {/* Location & Languages */}
              <AnimatedText delay={0.4} className="mt-6">
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-200/60 text-sm text-neutral-600 shadow-sm">
                    <MapPin className="w-4 h-4 text-[#722F37]" />
                    1729 Bank St, Ottawa
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-200/60 text-sm text-neutral-600 shadow-sm">
                    <Languages className="w-4 h-4 text-[#722F37]" />
                    EN · FR · AR · Somali
                  </div>
                </div>
              </AnimatedText>

              {/* CTA Buttons */}
              <AnimatedText delay={0.5} className="mt-10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <MagneticButton href="/contact#book" variant="primary">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>

                  <MagneticButton
                    href="tel:6137331118"
                    variant="secondary"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-neutral-100 rounded-lg">
                      <Phone className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-xs text-neutral-500 font-normal">
                        Call us
                      </span>
                      <span>(613) 733-1118</span>
                    </div>
                  </MagneticButton>
                </div>
              </AnimatedText>

              {/* Trust Indicators */}
              <div className="mt-12 pt-10 border-t border-neutral-200/60">
                <div className="grid grid-cols-3 gap-6">
                  {trustIndicators.map((indicator, index) => (
                    <TrustIndicator
                      key={indicator.label}
                      indicator={indicator}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Image Composition */}
            <div className="lg:col-span-6 xl:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Background Blob */}
                <motion.svg
                  viewBox="0 0 500 400"
                  className="absolute -inset-8 w-full h-full -z-10"
                  preserveAspectRatio="none"
                  animate={{
                    d: [
                      'M50,100 Q150,20 300,50 Q450,80 480,200 Q490,320 350,380 Q200,420 80,350 Q10,280 50,100',
                      'M60,90 Q160,30 290,60 Q440,90 470,210 Q480,330 340,370 Q190,410 70,340 Q20,270 60,90',
                      'M50,100 Q150,20 300,50 Q450,80 480,200 Q490,320 350,380 Q200,420 80,350 Q10,280 50,100',
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <defs>
                    <linearGradient
                      id="blob-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(114,47,55,0.12)" />
                      <stop offset="50%" stopColor="rgba(20,184,166,0.08)" />
                      <stop offset="100%" stopColor="rgba(253,248,243,0.9)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M50,100 Q150,20 300,50 Q450,80 480,200 Q490,320 350,380 Q200,420 80,350 Q10,280 50,100"
                    fill="url(#blob-gradient)"
                  />
                </motion.svg>

                {/* Main Image */}
                <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 ring-1 ring-neutral-900/5">
                  <Image
                    src="/images/patients/patients-01.jpg"
                    alt="Welcoming dental team providing exceptional care"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-neutral-900/5" />
                </div>

                {/* Floating Cards */}
                <FloatingCard
                  className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 p-4 lg:p-5 z-10"
                  delay={0.5}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center ring-1 ring-teal-200/50">
                      <Clock className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">Open Today</p>
                      <p className="text-sm text-neutral-500">Mon-Thu: 9am-6pm</p>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard
                  className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 p-4 lg:p-5 z-10"
                  delay={0.7}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center ring-1 ring-red-200/50">
                      <Siren className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">Emergency?</p>
                      <p className="text-sm text-red-600 font-medium">
                        Same-day care
                      </p>
                    </div>
                  </div>
                </FloatingCard>

                <motion.div
                  className="absolute bottom-12 -right-4 lg:bottom-16 lg:-right-8 bg-[#722F37] rounded-2xl shadow-xl shadow-[#722F37]/30 p-4 hidden md:flex items-center gap-3 z-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-5 h-5 text-white/90" />
                  <p className="font-medium text-white whitespace-nowrap">
                    New Patients Welcome
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-[#722F37]/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-2.5 rounded-full bg-[#722F37]"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// DIFFERENTIATORS SECTION
// ============================================================================

const differentiators = [
  {
    icon: ShieldCheck,
    title: 'CDCP Accepted',
    badge: 'Government Program',
    description:
      'Proud participant in the Canadian Dental Care Plan, making quality dental care accessible to more Canadians.',
    color: 'emerald',
  },
  {
    icon: Receipt,
    title: 'Direct Insurance Billing',
    badge: 'Zero Hassle',
    description:
      'We bill your insurance directly, eliminating paperwork hassles so you can focus on your smile.',
    color: 'blue',
  },
  {
    icon: Siren,
    title: 'Emergency Care',
    badge: 'Same Day',
    description:
      "Same-day emergency appointments available. When dental emergencies strike, we're here for you.",
    color: 'red',
  },
  {
    icon: Users,
    title: '6 Experienced Dentists',
    badge: 'Full Team',
    description:
      'Our team of six skilled dentists brings diverse expertise to provide comprehensive family dental care.',
    color: 'purple',
  },
  {
    icon: Languages,
    title: 'Multilingual Team',
    badge: '4+ Languages',
    description:
      'We speak your language. Our diverse team serves patients in English, French, Arabic, and more.',
    color: 'amber',
  },
];

function DifferentiatorCard({
  item,
  index,
}: {
  item: (typeof differentiators)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white rounded-3xl border border-[#EDE5DD] p-8 shadow-[0_4px_24px_-8px_rgba(114,47,55,0.08)] hover:shadow-[0_20px_50px_-12px_rgba(114,47,55,0.18)] transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner gradient on hover */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(114,47,55,0.08) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Icon */}
      <motion.div
        className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] flex items-center justify-center mb-6"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
          background: isHovered
            ? 'linear-gradient(135deg, #722F37 0%, #8B3A42 100%)'
            : 'linear-gradient(135deg, #FDF8F3 0%, #EDE5DD 100%)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <item.icon
          className={`w-8 h-8 transition-colors duration-300 ${
            isHovered ? 'text-white' : 'text-[#722F37]'
          }`}
        />
      </motion.div>

      {/* Badge */}
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border ${
          colorClasses[item.color as keyof typeof colorClasses]
        } mb-4`}
      >
        {item.badge}
      </span>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3 group-hover:text-[#722F37] transition-colors">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 leading-relaxed">{item.description}</p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r from-[#722F37] to-[#722F37]/50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0 }}
      />
    </motion.article>
  );
}

function DifferentiatorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-[#FDF8F3]/60 to-[#FDF8F3] overflow-hidden"
    >
      <FloatingOrbs />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#722F37]/40" />
            <span className="text-[#722F37] text-sm font-semibold tracking-[0.2em] uppercase">
              Why Choose Us
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#722F37]/40" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight">
            Why Families Choose
            <span className="block text-[#722F37] mt-2">Ottawa South Dental</span>
          </h2>

          <p className="mt-6 text-xl text-neutral-600 max-w-2xl mx-auto">
            Exceptional care, convenience, and compassion—everything you need
            for a healthier smile.
          </p>

          {/* Decorative flourish */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="h-1 w-1 rounded-full bg-[#722F37]/30" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#722F37]/50" />
            <Sparkles className="w-5 h-5 text-[#722F37]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#722F37]/50" />
            <div className="h-1 w-1 rounded-full bg-[#722F37]/30" />
          </div>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {differentiators.map((item, index) => (
            <DifferentiatorCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Bottom Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg shadow-[#722F37]/5 border border-[#EDE5DD]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#722F37] opacity-40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#722F37]" />
            </span>
            <span className="text-sm font-medium text-neutral-700">
              Serving Ottawa with excellence since{' '}
              <span className="text-[#722F37] font-bold">1985</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// SERVICES SECTION
// ============================================================================

const services = [
  {
    id: 'preventive',
    icon: ShieldCheck,
    title: 'Preventive Care',
    description:
      'Regular checkups, cleanings, and screenings to keep your smile healthy for life.',
    href: '/services/preventive-dentistry',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'cosmetic',
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description:
      'Transform your smile with whitening, veneers, and aesthetic treatments.',
    href: '/services/cosmetic-dentistry',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'restorative',
    icon: Wrench,
    title: 'Restorative Dentistry',
    description:
      'Crowns, bridges, implants, and dentures to restore your smile.',
    href: '/services/missing-teeth',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'emergency',
    icon: Siren,
    title: 'Emergency Care',
    description:
      'Same-day appointments for dental trauma, pain, and urgent issues.',
    href: '/services/emergency-care',
    color: 'from-red-500 to-orange-600',
  },
  {
    id: 'hygiene',
    icon: HeartPulse,
    title: 'Dental Hygiene',
    description:
      'Professional cleanings and periodontal care for optimal gum health.',
    href: '/services/dental-hygiene',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'invisalign',
    icon: Smile,
    title: 'Invisalign',
    description:
      'Clear aligners to straighten teeth discreetly without metal braces.',
    href: '/services/invisalign',
    color: 'from-purple-500 to-violet-600',
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={service.href}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.article
          className="relative bg-white rounded-3xl border border-[#EDE5DD] p-8 h-full overflow-hidden"
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Background gradient on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0`}
            animate={{ opacity: isHovered ? 0.05 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon */}
          <motion.div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <service.icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Content */}
          <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3 group-hover:text-[#722F37] transition-colors">
            {service.title}
          </h3>

          <p className="text-neutral-600 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Learn More */}
          <div className="flex items-center gap-2 text-[#722F37] font-medium">
            <span>Learn more</span>
            <motion.div animate={{ x: isHovered ? 5 : 0 }}>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Corner accent */}
          <motion.div
            className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
            style={{
              background: `radial-gradient(circle at bottom right, rgba(114,47,55,0.1) 0%, transparent 70%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-[#FDF8F3] overflow-hidden"
    >
      <GridPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight">
            Our Dental Services
          </h2>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl mx-auto">
            Comprehensive care for every member of your family, from preventive
            checkups to advanced treatments.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <MagneticButton href="/services" variant="outline">
            View All Services
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TEAM SECTION
// ============================================================================

const teamMembers = [
  {
    id: '1',
    name: 'Dr. Vineet Sidhu',
    role: 'Practice Owner',
    image: '/images/team/team-01.jpg',
  },
  {
    id: '2',
    name: 'Dr. Anthony Bui',
    role: 'General Dentist',
    image: '/images/team/team-02.jpg',
  },
  {
    id: '3',
    name: 'Dr. Sydney Saikaly',
    role: 'Dentist',
    image: '/images/team/team-03.jpg',
  },
  {
    id: '4',
    name: 'Dr. Alan Hammond',
    role: 'Dentist',
    image: '/images/team/team-04.jpg',
  },
];

function TeamMemberCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={index % 2 === 1 ? 'mt-8' : ''}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden shadow-xl"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="relative aspect-[4/5] bg-[#EDE5DD]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />

          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#722F37]/80 via-[#722F37]/30 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Name on hover */}
          <motion.div
            className="absolute inset-x-0 bottom-0 p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-white font-semibold text-xl">{member.name}</h3>
            <p className="text-white/90 text-sm mt-1">{member.role}</p>
          </motion.div>
        </div>

        {/* Name badge */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-[#EDE5DD]"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-semibold text-neutral-800 text-sm truncate">
            {member.name}
          </h3>
          <p className="text-[#722F37] text-xs font-medium">{member.role}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    { icon: Clock, label: '28+ Years Experience' },
    { icon: Heart, label: 'Patient-Centered Care' },
    { icon: Award, label: 'Latest Technology' },
    { icon: Users, label: 'Family Friendly' },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FDF8F3] border border-[#EDE5DD] rounded-full mb-6">
                <Users className="w-4 h-4 text-[#722F37]" />
                <span className="text-sm font-medium text-[#722F37]">
                  Our Team
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
                Meet Our
                <span className="block text-[#722F37]">Caring Team</span>
              </h2>

              <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                Experience compassionate dental care from our dedicated team of
                professionals who treat every patient like family.
              </p>

              <p className="mt-4 text-neutral-500">
                At Ottawa South Dental, we believe that exceptional dental care
                starts with exceptional people. Our team of experienced dentists
                and friendly staff are committed to providing you with
                personalized, comfortable care.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5]/50 border border-[#EDE5DD] rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8"
              >
                <MagneticButton href="/about/team" variant="primary">
                  Meet Our Full Team
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Team Photos */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[#EDE5DD]/60 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-[#722F37]">28+</span>
            <span className="text-sm text-neutral-500">
              Years of
              <br />
              Experience
            </span>
          </div>
          <div className="h-12 w-px bg-[#EDE5DD] hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-[#722F37]">6</span>
            <span className="text-sm text-neutral-500">
              Experienced
              <br />
              Dentists
            </span>
          </div>
          <div className="h-12 w-px bg-[#EDE5DD] hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-[#722F37]">1000s</span>
            <span className="text-sm text-neutral-500">
              Happy
              <br />
              Patients
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================

const testimonials = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    rating: 5,
    text: "I've been coming here for three years and have always received exceptional care. The staff is incredibly warm and welcoming, and the team takes the time to explain everything thoroughly. My whole family now comes here!",
    service: 'Family Dentistry',
    initials: 'SM',
  },
  {
    id: '2',
    name: 'Michael Thompson',
    rating: 5,
    text: 'After years of dental anxiety, I finally found a practice that makes me feel comfortable. They were patient with my concerns and the sedation options made my root canal completely stress-free.',
    service: 'Root Canal',
    initials: 'MT',
  },
  {
    id: '3',
    name: 'Jennifer Lavoie',
    rating: 5,
    text: "The cosmetic work they did on my smile exceeded my expectations. The Invisalign process was smooth, and now I can't stop smiling! The team here truly cares about giving you the best results.",
    service: 'Invisalign',
    initials: 'JL',
  },
  {
    id: '4',
    name: 'Robert Chen',
    rating: 5,
    text: 'Professional, punctual, and genuinely caring. Emergency appointment was handled same-day when I cracked a tooth. The office is modern, clean, and the technology they use is impressive.',
    service: 'Emergency Care',
    initials: 'RC',
  },
];

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
}) {
  return (
    <motion.article
      className="bg-white rounded-3xl border border-[#EDE5DD] p-8 lg:p-10 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.5 }}
    >
      {/* Quote mark */}
      <Quote className="w-12 h-12 text-[#722F37]/20 mb-6" />

      {/* Rating */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-neutral-200'
            }`}
          />
        ))}
        <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-[#722F37]/10 text-[#722F37]">
          {testimonial.service}
        </span>
      </div>

      {/* Text */}
      <blockquote className="text-xl lg:text-2xl text-neutral-700 leading-relaxed mb-8">
        "{testimonial.text}"
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-4 pt-6 border-t border-[#EDE5DD]">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-[#722F37]/30">
          {testimonial.initials}
        </div>
        <div>
          <cite className="not-italic font-semibold text-neutral-800 text-lg">
            {testimonial.name}
          </cite>
          <div className="flex items-center gap-1.5 text-sm text-teal-600 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
            Verified Patient
          </div>
        </div>
      </footer>
    </motion.article>
  );
}

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-[#FDF8F3] overflow-hidden"
    >
      <FloatingOrbs />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Google Rating Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-[#EDE5DD] rounded-full shadow-lg mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-800 text-xl">4.8</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
            <div className="h-4 w-px bg-neutral-200" />
            <span className="text-sm text-neutral-600">250+ reviews</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight">
            What Our Patients Say
          </h2>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl mx-auto">
            Real stories from families who trust us with their smiles.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute -left-4 lg:-left-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-[#EDE5DD] shadow-lg flex items-center justify-center text-neutral-700 hover:text-[#722F37] hover:border-[#722F37]/30 transition-all z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute -right-4 lg:-right-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-[#EDE5DD] shadow-lg flex items-center justify-center text-neutral-700 hover:text-[#722F37] hover:border-[#722F37]/30 transition-all z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Current Testimonial */}
          <AnimatePresence mode="wait">
            {testimonials[currentIndex] && (
              <TestimonialCard
                key={testimonials[currentIndex].id}
                testimonial={testimonials[currentIndex]}
                isActive={true}
              />
            )}
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2.5 bg-[#722F37]'
                    : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Read More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.google.com/maps/place/Ottawa+South+Dental"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-[#722F37] font-medium bg-white border border-[#722F37]/30 rounded-full hover:bg-[#722F37] hover:text-white transition-all duration-300"
          >
            Read More Reviews on Google
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT CTA SECTION
// ============================================================================

function ContactCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const officeHours = [
    { day: 'Monday - Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-gradient-to-br from-[#722F37] via-[#8B3A42] to-[#722F37] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Ready to Schedule
              <span className="block mt-2">Your Visit?</span>
            </h2>

            <p className="mt-6 text-xl text-white/80 max-w-lg mx-auto lg:mx-0">
              Whether you need a routine checkup or have a dental emergency,
              we're here to help. Book your appointment today.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MagneticButton href="/contact#book" variant="secondary">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </MagneticButton>

              <a
                href="tel:6137331118"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                (613) 733-1118
              </a>
            </div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-red-500/20 border border-red-400/30 rounded-xl"
            >
              <Siren className="w-5 h-5 text-red-200" />
              <span className="text-white text-sm">
                <strong>Dental emergency?</strong> Same-day appointments
                available.
              </span>
            </motion.div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-white">Call Us</h3>
              <a
                href="tel:6137331118"
                className="block mt-1 text-xl font-bold text-white hover:underline"
              >
                (613) 733-1118
              </a>
              <p className="mt-2 text-sm text-white/60">
                Speak with our friendly team
              </p>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-white">Office Hours</h3>
              <div className="mt-2 space-y-1">
                {officeHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between text-sm text-white/80"
                  >
                    <span>{item.day}</span>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 sm:col-span-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">Location</h3>
                  <p className="mt-1 text-white/80">
                    1729 Bank St, Ottawa, ON K1V 7Z4
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Free parking available • Wheelchair accessible
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <HeroSection />
      <DifferentiatorsSection />
      <ServicesSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactCTASection />
    </main>
  );
}
