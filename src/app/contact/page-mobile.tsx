'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Bus,
  Accessibility,
  Globe,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Heart,
  Star,
  CheckCircle2,
  Navigation,
  Sparkles,
  Calendar,
  ArrowRight,
  Zap,
  Shield,
  Users,
} from 'lucide-react';
import { ContactFormMobile } from '@/components/contact/ContactForm-mobile';

// Practice information
const PRACTICE_INFO = {
  name: 'Ottawa South Dental',
  address: '1729 Bank St',
  city: 'Ottawa',
  province: 'ON',
  postalCode: 'K1V 7Z4',
  fullAddress: '1729 Bank St, Ottawa, ON K1V 7Z4',
  phone: '(613) 733-1118',
  phoneHref: 'tel:+16137331118',
  email: 'info@ottawasouthdental.com',
  languages: ['English', 'French', 'Arabic', 'Somali'],
  googleMapsUrl: 'https://maps.google.com/?q=1729+Bank+St,+Ottawa,+ON+K1V+7Z4',
};

const HOURS = [
  { day: 'Monday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Tuesday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Wednesday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Thursday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Friday', hours: '9:00 AM – 5:00 PM', isOpen: true },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM', isOpen: true },
  { day: 'Sunday', hours: 'Closed', isOpen: false },
];

// Animation variants optimized for mobile
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const cardTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

// Floating orbs background for mobile
function FloatingOrbsMobile() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#722F37]/10 blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-32 h-32 rounded-full bg-primary-300/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#722F37]/20 to-[#8B3D47]/10 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -left-20 w-32 h-32 rounded-full bg-gradient-to-br from-primary-300/30 to-primary-400/10 blur-3xl"
        animate={{
          x: [0, 15, 0],
          y: [0, 20, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-accent-300/20 to-accent-400/10 blur-2xl"
        animate={{
          x: [0, -10, 0],
          y: [0, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}

// Decorative tooth SVG
function ToothIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C9.5 2 7.5 3 6 4.5C4.5 6 4 8 4 10C4 12 4.5 14 5 16C5.5 18 6 20 7 21.5C7.5 22 8 22 8.5 21.5C9 21 9 20 9.5 18C10 16 10.5 14 11 13C11.5 12 12 12 12 12C12 12 12.5 12 13 13C13.5 14 14 16 14.5 18C15 20 15 21 15.5 21.5C16 22 16.5 22 17 21.5C18 20 18.5 18 19 16C19.5 14 20 12 20 10C20 8 19.5 6 18 4.5C16.5 3 14.5 2 12 2Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Premium trust badge with animation
function TrustBadge({
  icon: Icon,
  label,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
      className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50"
    >
      <motion.div
        animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
      >
        <Icon className={`w-4 h-4 ${color}`} />
      </motion.div>
      <span className="text-xs font-medium text-neutral-700">{label}</span>
    </motion.div>
  );
}

// Premium quick action card with glassmorphism
function QuickActionCard({
  icon: Icon,
  label,
  value,
  href,
  gradient,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  gradient: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      whileTap={prefersReducedMotion ? {} : cardTap}
      className="relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-neutral-200/50 border border-neutral-100/80 active:shadow-md transition-shadow"
    >
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${gradient}`} />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <pattern id={`dots-${label}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#dots-${label})`} />
        </svg>
      </div>

      <div className="relative flex items-center gap-4 p-4">
        {/* Icon with gradient background */}
        <motion.div
          className={`relative w-14 h-14 ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95, rotate: -5 }}
        >
          <Icon className="w-6 h-6 text-white" />
          {/* Glow effect */}
          <div className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-40`} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
            {label}
          </p>
          <p className="font-bold text-neutral-900 text-base truncate">{value}</p>
        </div>

        {href && (
          <motion.div
            className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center"
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block" aria-label={`${label}: ${value}`}>
        {content}
      </a>
    );
  }
  return content;
}

// Premium emergency banner with pulsing animation
function EmergencyBannerMobile() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={PRACTICE_INFO.phoneHref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      className="block"
      aria-label="Dental emergency? Call us now"
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500 bg-[length:200%_100%]">
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          )}
        </div>

        {/* Pulse rings */}
        {!prefersReducedMotion && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <motion.div
              className="absolute w-16 h-16 rounded-full border-2 border-white/20"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-16 h-16 rounded-full border-2 border-white/20"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        )}

        <div className="relative flex items-center gap-4 p-5">
          <motion.div
            className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertCircle className="w-7 h-7 text-white" />
          </motion.div>

          <div className="flex-1">
            <h3 className="font-bold text-white text-lg">Dental Emergency?</h3>
            <p className="text-white/80 text-sm">Tap to call for immediate help</p>
          </div>

          <motion.div
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
          >
            <Phone className="w-5 h-5 text-accent-600" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}

// Premium accordion with smooth animations
function PremiumAccordion({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  accentColor = '#722F37',
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 min-h-[64px]"
        whileTap={prefersReducedMotion ? {} : { scale: 0.995 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}10` }}
            animate={isOpen && !prefersReducedMotion ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5" style={{ color: accentColor }} />
          </motion.div>
          <span className="font-semibold text-neutral-900 text-[15px]">{title}</span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center"
        >
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Enhanced hours list with visual bars
function HoursListMobile() {
  const [mounted, setMounted] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(-1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const jsDay = new Date().getDay();
    setCurrentDayIndex(jsDay === 0 ? 6 : jsDay - 1);
    setMounted(true);
  }, []);

  return (
    <div className="space-y-2">
      {HOURS.map((entry, index) => {
        const isToday = mounted && index === currentDayIndex;
        const barWidth = entry.isOpen
          ? entry.hours.includes('2:00 PM')
            ? '45%'
            : entry.hours.includes('5:00 PM')
              ? '75%'
              : '85%'
          : '0%';

        return (
          <motion.div
            key={entry.day}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              relative flex items-center justify-between py-3 px-3 rounded-xl overflow-hidden
              ${isToday ? 'bg-[#722F37]/5 ring-1 ring-[#722F37]/20' : 'bg-neutral-50/50'}
            `}
          >
            {/* Animated bar indicator */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#722F37]/10 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: barWidth }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.6, ease: 'easeOut' }}
            />

            <div className="relative flex items-center gap-2">
              <span
                className={`font-medium text-sm ${isToday ? 'text-[#722F37]' : 'text-neutral-700'}`}
              >
                {entry.day}
              </span>
              {isToday && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="px-2 py-0.5 bg-[#722F37] text-white text-[10px] font-bold rounded-full uppercase tracking-wide"
                >
                  Today
                </motion.span>
              )}
            </div>

            <span
              className={`relative text-sm font-medium ${
                entry.isOpen ? 'text-neutral-600' : 'text-neutral-400'
              }`}
            >
              {entry.hours}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

// Language pills with hover effects
function LanguagePillsMobile() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap gap-2">
      {PRACTICE_INFO.languages.map((lang, index) => (
        <motion.span
          key={lang}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className="px-4 py-2.5 bg-gradient-to-br from-primary-50 to-primary-100 text-primary-700 text-sm font-semibold rounded-full border border-primary-200/50 shadow-sm"
        >
          {lang}
        </motion.span>
      ))}
    </div>
  );
}

// Enhanced directions cards
function DirectionsCardMobile() {
  const prefersReducedMotion = useReducedMotion();
  const directions = [
    {
      icon: Car,
      title: 'Parking',
      description: 'Free lot',
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Bus,
      title: 'Transit',
      description: 'Routes 1, 7',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Accessibility,
      title: 'Accessible',
      description: 'Full access',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {directions.map(({ icon: Icon, title, description, color, bgColor }, index) => (
        <motion.div
          key={title}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.08 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className={`${bgColor} rounded-2xl p-3 text-center border border-neutral-100/50`}
        >
          <motion.div
            className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md`}
            whileTap={prefersReducedMotion ? {} : { rotate: -10 }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <p className="font-semibold text-neutral-900 text-xs">{title}</p>
          <p className="text-neutral-500 text-[10px] mt-0.5">{description}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Main contact page mobile component
export function ContactPageMobile() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <main id="main-content" className="flex min-h-screen flex-col bg-gradient-to-b from-[#FDFBF9] via-white to-[#FDFBF9]">
      {/* Hero Section - Immersive mobile experience */}
      <section ref={heroRef} className="relative overflow-hidden">
        <FloatingOrbsMobile />

        {/* Hero Image with gradient overlay */}
        <motion.div
          style={prefersReducedMotion ? {} : { opacity: heroOpacity, scale: heroScale }}
          className="relative"
        >
          <div className="relative h-[280px] overflow-hidden">
            <Image
              src="/images/contact/hero-dental-team.jpg"
              alt="Friendly dental team ready to help"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Multi-layer gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF9] via-[#FDFBF9]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#722F37]/10 via-transparent to-transparent" />

            {/* Floating badge on image */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 left-4 right-4"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 w-fit">
                <motion.div
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-[#722F37]" />
                </motion.div>
                <span className="text-sm font-semibold text-neutral-800">
                  Caring for Ottawa Since 1985
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content overlay */}
        <div className="relative px-5 -mt-4 z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Title section */}
            <motion.div variants={staggerItem} className="text-center">
              <motion.span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-3 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold"
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Sparkles className="w-3 h-3" />
                We&apos;re Here to Help
              </motion.span>

              <h1 className="font-display text-4xl font-bold text-neutral-900 leading-tight mb-2">
                Contact{' '}
                <span className="relative inline-block">
                  <span className="text-[#722F37]">Us</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-2 bg-[#722F37]/10 rounded-full -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />
                </span>
              </h1>

              <p className="text-neutral-600 text-base leading-relaxed">
                Schedule a visit or reach out with questions—we&apos;re always happy to hear from you.
              </p>
            </motion.div>

            {/* Trust badges row */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center justify-center gap-2 py-2"
            >
              <TrustBadge icon={CheckCircle2} label="Same-Day Appts" color="text-emerald-500" delay={0.4} />
              <TrustBadge icon={Star} label="5-Star Rated" color="text-amber-500" delay={0.5} />
              <TrustBadge icon={Users} label="Family Care" color="text-[#722F37]" delay={0.6} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions - Thumb-zone optimized */}
      <section className="px-5 py-6 space-y-3">
        <QuickActionCard
          icon={Phone}
          label="Call Us"
          value={PRACTICE_INFO.phone}
          href={PRACTICE_INFO.phoneHref}
          gradient="bg-gradient-to-r from-[#722F37] to-[#8B3D47]"
          delay={0.1}
        />
        <QuickActionCard
          icon={Mail}
          label="Email Us"
          value="info@osd.com"
          href={`mailto:${PRACTICE_INFO.email}`}
          gradient="bg-gradient-to-r from-primary-500 to-primary-600"
          delay={0.15}
        />
        <QuickActionCard
          icon={MapPin}
          label="Visit Us"
          value={PRACTICE_INFO.fullAddress}
          href={PRACTICE_INFO.googleMapsUrl}
          gradient="bg-gradient-to-r from-[#722F37] to-[#8B3D47]"
          delay={0.2}
        />
      </section>

      {/* Emergency Banner */}
      <section className="px-5 pb-6">
        <EmergencyBannerMobile />
      </section>

      {/* Contact Form Section - Elevated card design */}
      <section id="book" className="px-5 pb-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative background elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#722F37]/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-200/30 rounded-full blur-2xl" />

          <div className="relative bg-white rounded-3xl p-6 shadow-xl shadow-neutral-200/50 border border-neutral-100">
            {/* Gradient accent bar */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#722F37] via-primary-500 to-[#722F37] rounded-full" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pt-2">
              <motion.div
                className="relative w-12 h-12 bg-gradient-to-br from-[#722F37] to-[#8B3D47] rounded-2xl flex items-center justify-center shadow-lg"
                whileTap={prefersReducedMotion ? {} : { scale: 0.95, rotate: -5 }}
              >
                <Calendar className="w-6 h-6 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] to-[#8B3D47] rounded-2xl blur-lg opacity-40" />
              </motion.div>
              <div>
                <h2 className="font-display font-bold text-xl text-neutral-900">
                  Send a Message
                </h2>
                <p className="text-neutral-500 text-sm">We&apos;ll respond within 24 hours</p>
              </div>
            </div>

            <ContactFormMobile />
          </div>
        </motion.div>
      </section>

      {/* Info Sections - Progressive disclosure */}
      <section className="px-5 pb-6 space-y-3">
        {/* Office Hours */}
        <PremiumAccordion title="Office Hours" icon={Clock} defaultOpen>
          <HoursListMobile />
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-neutral-500 flex items-center gap-2 p-3 bg-[#722F37]/5 rounded-xl"
          >
            <Zap className="w-4 h-4 text-[#722F37]" />
            Emergency hours available upon request
          </motion.p>
        </PremiumAccordion>

        {/* Languages */}
        <PremiumAccordion title="Languages We Speak" icon={Globe} accentColor="#0891b2">
          <LanguagePillsMobile />
          <p className="mt-4 text-sm text-neutral-500">
            Our diverse team provides care in multiple languages for your comfort.
          </p>
        </PremiumAccordion>

        {/* Getting Here */}
        <PremiumAccordion title="Getting Here" icon={Navigation} accentColor="#722F37">
          <div className="space-y-4">
            {/* Embedded Map */}
            <div className="relative h-36 rounded-2xl overflow-hidden shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.5!2d-75.653!3d45.375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0f3c8e9d8b15%3A0x123456789!2s1729%20Bank%20St%2C%20Ottawa%2C%20ON%20K1V%207Z4!5e0!3m2!1sen!2sca!4v1705000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ottawa South Dental Location"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
            </div>

            {/* Get Directions Link */}
            <motion.a
              href={PRACTICE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#722F37]/5 rounded-2xl border border-[#722F37]/10 active:bg-[#722F37]/10 transition-colors"
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#722F37] rounded-xl flex items-center justify-center shadow-md">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 text-sm block">Get Directions</span>
                  <span className="text-xs text-neutral-500">Open in Google Maps</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#722F37]" />
            </motion.a>

            {/* Transport Options */}
            <DirectionsCardMobile />
          </div>
        </PremiumAccordion>
      </section>

      {/* Why Choose Us - Visual break section */}
      <section className="px-5 pb-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6 text-white"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <pattern id="grid-mobile" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-mobile)" />
            </svg>
          </div>

          {/* Glowing orb */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#722F37]/30 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg">Your Comfort Matters</h3>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-5">
              From your first call to your follow-up care, our team is committed to making your
              dental experience positive and stress-free.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Heart, label: 'Gentle Care' },
                { icon: Clock, label: 'Flexible Hours' },
                { icon: Globe, label: '4 Languages' },
                { icon: Star, label: '5-Star Service' },
              ].map(({ icon: Icon, label }, index) => (
                <motion.div
                  key={label}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <Icon className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-xs font-medium text-white/90">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom CTA - Sticky with blur */}
      <section className="sticky bottom-0 left-0 right-0 z-50">
        {/* Gradient fade */}
        <div className="h-6 bg-gradient-to-t from-white to-transparent" />

        <div className="bg-white/95 backdrop-blur-xl border-t border-neutral-200/50 px-5 py-4 safe-area-inset-bottom">
          <div className="flex gap-3">
            <motion.a
              href={PRACTICE_INFO.phoneHref}
              className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3D47] text-white font-bold rounded-2xl shadow-lg shadow-[#722F37]/25"
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </motion.a>
            <motion.a
              href="#book"
              className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-neutral-100 text-neutral-700 font-bold rounded-2xl border border-neutral-200"
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              Message
            </motion.a>
          </div>
        </div>
      </section>
    </main>
  );
}
