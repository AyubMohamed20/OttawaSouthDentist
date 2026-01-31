'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';
import {
  Stethoscope,
  Sparkles,
  Smile,
  ShieldCheck,
  ScanFace,
  Bone,
  CircleDot,
  Lightbulb,
  Layers,
  Scissors,
  Baby,
  AlertTriangle,
  ArrowRight,
  Calendar,
  Phone,
  Star,
  Heart,
  Shield,
  Zap,
  ChevronRight,
  Filter,
  Check,
} from 'lucide-react';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  category: 'preventive' | 'cosmetic' | 'restorative' | 'specialized';
  featured?: boolean;
  gradient: string;
}

const categories = [
  { id: 'all', label: 'All Services', icon: Star },
  { id: 'preventive', label: 'Preventive Care', icon: Shield },
  { id: 'cosmetic', label: 'Cosmetic', icon: Sparkles },
  { id: 'restorative', label: 'Restorative', icon: Heart },
  { id: 'specialized', label: 'Specialized', icon: Zap },
];

const allServices: Service[] = [
  {
    id: 'routine-checkups',
    title: 'Routine Checkups',
    description: 'Comprehensive care including cleanings, exams, and preventive treatments to maintain your oral health.',
    icon: Stethoscope,
    href: '/services/routine-checkups',
    category: 'preventive',
    featured: true,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'dental-hygiene',
    title: 'Dental Hygiene',
    description: 'Professional cleanings and hygiene treatments to keep your teeth and gums healthy.',
    icon: ShieldCheck,
    href: '/services/dental-hygiene',
    category: 'preventive',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'preventive-dentistry',
    title: 'Preventive Dentistry',
    description: 'Fluoride treatments, sealants, and oral cancer screenings to protect your smile for years to come.',
    icon: Shield,
    href: '/services/preventive-dentistry',
    category: 'preventive',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with teeth whitening, veneers, bonding, and other aesthetic treatments for a radiant look.',
    icon: Sparkles,
    href: '/services/cosmetic-dentistry',
    category: 'cosmetic',
    featured: true,
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments to brighten your smile. Achieve noticeable results safely and effectively.',
    icon: Lightbulb,
    href: '/services/teeth-whitening',
    category: 'cosmetic',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description: 'Straighten your teeth discreetly with clear aligners. A comfortable alternative to traditional braces.',
    icon: ScanFace,
    href: '/services/invisalign',
    category: 'cosmetic',
    featured: true,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    icon: Bone,
    href: '/services/dental-implants',
    category: 'restorative',
    featured: true,
    gradient: 'from-slate-500 to-zinc-700',
  },
  {
    id: 'dentures',
    title: 'Dentures',
    description: 'Custom-fitted dentures to restore your smile and confidence. Full and partial options available.',
    icon: Smile,
    href: '/services/dentures',
    category: 'restorative',
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    id: 'missing-teeth',
    title: 'Missing Teeth Solutions',
    description: 'Comprehensive options for replacing missing teeth including bridges, implants, and dentures.',
    icon: Layers,
    href: '/services/missing-teeth',
    category: 'restorative',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    description: 'Save damaged or infected teeth with gentle root canal treatment to relieve pain and preserve your natural smile.',
    icon: CircleDot,
    href: '/services/root-canal',
    category: 'specialized',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    id: 'white-fillings',
    title: 'White Fillings',
    description: 'Natural-looking composite fillings that blend seamlessly with your teeth for a beautiful, healthy smile.',
    icon: CircleDot,
    href: '/services/white-fillings',
    category: 'restorative',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    id: 'gum-therapy',
    title: 'Gum Therapy',
    description: 'Treatment for gum disease and periodontal issues to restore your gum health and protect your teeth.',
    icon: Heart,
    href: '/services/gum-therapy',
    category: 'specialized',
    gradient: 'from-pink-500 to-red-500',
  },
  {
    id: 'oral-surgery',
    title: 'Oral Surgery',
    description: 'Safe and comfortable surgical procedures including extractions and wisdom teeth removal.',
    icon: Scissors,
    href: '/services/oral-surgery',
    category: 'specialized',
    gradient: 'from-slate-600 to-gray-700',
  },
  {
    id: 'childrens-dentistry',
    title: "Children's Dentistry",
    description: 'Gentle, kid-friendly dental care creating positive experiences for children of all ages.',
    icon: Baby,
    href: '/services/childrens-dentistry',
    category: 'specialized',
    featured: true,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'emergency-care',
    title: 'Emergency Care',
    description: 'Same-day emergency appointments for toothaches, broken teeth, and urgent dental issues.',
    icon: AlertTriangle,
    href: '/services/emergency-care',
    category: 'specialized',
    featured: true,
    gradient: 'from-red-600 to-rose-700',
  },
];

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

const springConfig = { damping: 30, stiffness: 200 };

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

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-32 -right-32 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114,47,55,0.08) 0%, rgba(114,47,55,0.02) 40%, transparent 70%)',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 60%)',
        }}
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.015]"
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
// HERO SECTION
// ============================================================================

function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const featuredServices = allServices.filter(s => s.featured).slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#FFFBF8] via-white to-[#FDF8F3]"
    >
      <FloatingOrbs />
      <GridPattern />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#722F37]/10"
            style={{
              width: 100 + i * 100,
              height: 100 + i * 100,
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="text-center">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 text-sm text-neutral-500 mb-8"
            >
              <Link href="/" className="hover:text-[#722F37] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#722F37] font-medium">Services</span>
            </motion.nav>

            {/* Animated Title */}
            <motion.div style={{ y: titleY }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <motion.div
                  className="h-px w-16 bg-gradient-to-r from-transparent to-[#722F37]/40"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <span className="text-[#722F37] text-sm font-semibold tracking-[0.3em] uppercase">
                  Comprehensive Care
                </span>
                <motion.div
                  className="h-px w-16 bg-gradient-to-l from-transparent to-[#722F37]/40"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.div>

              <motion.h1
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block text-neutral-900">Our Dental</span>
                <motion.span
                  className="block text-[#722F37] relative"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Services
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-4"
                    viewBox="0 0 300 12"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    <motion.path
                      d="M2 10 Q75 2, 150 6 T298 4"
                      fill="none"
                      stroke="#722F37"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </motion.svg>
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              From routine checkups to advanced treatments, we provide comprehensive
              dental care for your entire family with compassion and expertise.
            </motion.p>

            {/* Animated Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {[
                { value: '15+', label: 'Services Offered' },
                { value: '20+', label: 'Years Experience' },
                { value: '6', label: 'Expert Dentists' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <span className="text-4xl font-bold text-[#722F37]">{stat.value}</span>
                  <span className="text-sm text-neutral-500 text-left leading-tight">
                    {stat.label.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Featured Services Preview */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {featuredServices.map((service, index) => (
              <FeaturedServicePreview key={service.id} service={service} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-neutral-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-wider">Explore Services</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-[#722F37]/30 flex justify-center pt-2"
          >
            <motion.div
              className="w-1.5 h-2.5 rounded-full bg-[#722F37]"
              animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeaturedServicePreview({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={service.href} className="group block">
        <motion.div
          className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-neutral-100 shadow-lg overflow-hidden"
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0`}
            animate={{ opacity: isHovered ? 0.05 : 0 }}
          />

          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-6`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-[#722F37] transition-colors">
            {service.title}
          </h3>
          <p className="mt-2 text-neutral-600 text-sm line-clamp-2">{service.description}</p>

          <motion.div
            className="mt-4 flex items-center gap-2 text-[#722F37] font-medium text-sm"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            Learn more <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Corner decoration */}
          <motion.div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(114,47,55,0.1) 0%, transparent 70%)`,
            }}
            animate={{ scale: isHovered ? 1.2 : 1 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// CATEGORY FILTER
// ============================================================================

function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="sticky top-20 z-30 py-4 bg-white/80 backdrop-blur-xl border-b border-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 text-neutral-500 text-sm mr-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter:</span>
          </div>

          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-600 hover:text-[#722F37] bg-neutral-50 hover:bg-neutral-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.05 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
                    layoutId="activeCategory"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`relative w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                <span className="relative">{category.label}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative w-2 h-2 rounded-full bg-white/50"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SERVICE CARD
// ============================================================================

function ServiceCard({
  service,
  index,
  size = 'normal',
}: {
  service: Service;
  index: number;
  size?: 'normal' | 'large' | 'featured';
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = service.icon;

  const sizeClasses = {
    normal: 'col-span-1',
    large: 'col-span-1 md:col-span-2',
    featured: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2',
  };

  return (
    <motion.div
      ref={ref}
      className={sizeClasses[size]}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      layout
    >
      <Link
        href={service.href}
        className="group block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.article
          className={`relative h-full bg-white rounded-3xl border border-[#EDE5DD] overflow-hidden shadow-[0_4px_24px_-8px_rgba(114,47,55,0.08)] ${
            size === 'featured' ? 'p-10' : 'p-8'
          }`}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Animated background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.05 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Corner glow */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(114,47,55,0.15) 0%, transparent 70%)`,
            }}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Featured badge */}
          {service.featured && (
            <motion.div
              className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Star className="w-3 h-3 fill-current" />
              Popular
            </motion.div>
          )}

          {/* Icon with animation */}
          <motion.div
            className={`relative w-16 h-16 ${size === 'featured' ? 'lg:w-20 lg:h-20' : ''} rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-6`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              animate={{
                rotate: isHovered ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <Icon className={`w-8 h-8 ${size === 'featured' ? 'lg:w-10 lg:h-10' : ''} text-white`} />
            </motion.div>

            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={isHovered ? {
                boxShadow: [
                  '0 0 0 0 rgba(114,47,55,0.4)',
                  '0 0 0 20px rgba(114,47,55,0)',
                ],
              } : {}}
              transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
            />
          </motion.div>

          {/* Content */}
          <motion.h3
            className={`font-display font-semibold text-neutral-900 group-hover:text-[#722F37] transition-colors mb-3 ${
              size === 'featured' ? 'text-2xl lg:text-3xl' : 'text-xl'
            }`}
          >
            {service.title}
          </motion.h3>

          <p className={`text-neutral-600 leading-relaxed mb-6 ${
            size === 'featured' ? 'text-base lg:text-lg' : 'text-sm'
          }`}>
            {service.description}
          </p>

          {/* Learn more link */}
          <motion.div
            className="flex items-center gap-2 text-[#722F37] font-semibold"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <span>Learn more</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${
                service.gradient.includes('emerald') ? '#10b981' :
                service.gradient.includes('pink') ? '#ec4899' :
                service.gradient.includes('violet') ? '#8b5cf6' :
                service.gradient.includes('red') ? '#ef4444' :
                service.gradient.includes('yellow') ? '#f59e0b' :
                '#722F37'
              }, transparent)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// SERVICES GRID
// ============================================================================

function ServicesGrid({ activeCategory }: { activeCategory: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredServices = activeCategory === 'all'
    ? allServices
    : allServices.filter(s => s.category === activeCategory);

  // Determine card sizes for visual variety
  const getCardSize = (index: number, service: Service): 'normal' | 'large' | 'featured' => {
    if (service.featured && index === 0) return 'featured';
    if (service.featured && index % 5 === 0) return 'large';
    return 'normal';
  };

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
            {activeCategory === 'all' ? 'All Services' : categories.find(c => c.id === activeCategory)?.label}
          </h2>
          <p className="mt-2 text-neutral-600">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
          </p>
        </motion.div>

        {/* Services Grid with varied sizes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                size={getCardSize(index, service)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const magnetic = useMagnetic(0.2);
  const [isHovered, setIsHovered] = useState(false);

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

        {/* Floating icons */}
        {[Sparkles, Heart, Star, Shield].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              top: `${20 + index * 20}%`,
              left: `${10 + index * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          >
            <Icon className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="mt-6 text-xl text-white/80 max-w-2xl mx-auto">
            Whether you need a routine cleaning or a specific treatment, our team is here to help.
            Book your appointment today and take the first step towards a healthier smile.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            style={{ x: magnetic.x, y: magnetic.y }}
            onMouseMove={magnetic.handleMouseMove}
            onMouseLeave={(e) => {
              magnetic.handleMouseLeave();
              setIsHovered(false);
            }}
            onMouseEnter={() => setIsHovered(true)}
          >
            <Link
              href="/contact#book"
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-white"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.6 }}
              />
              <Calendar className="relative w-5 h-5" />
              <span className="relative">Book Your Appointment</span>
              <motion.div animate={{ x: isHovered ? 4 : 0 }} className="relative">
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>

          <Link
            href="tel:6137331118"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transition-all"
          >
            <Phone className="w-5 h-5" />
            (613) 733-1118
          </Link>
        </motion.div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 inline-flex items-center gap-3 px-6 py-3 bg-red-500/20 border border-red-400/30 rounded-xl"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <AlertTriangle className="w-5 h-5 text-red-200" />
          </motion.div>
          <span className="text-white text-sm">
            <strong>Dental emergency?</strong> We offer same-day appointments for urgent cases.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <HeroSection />
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <ServicesGrid activeCategory={activeCategory} />
      <CTASection />
    </main>
  );
}
