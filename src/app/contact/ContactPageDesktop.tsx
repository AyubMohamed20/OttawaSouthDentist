'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Car,
  Bus,
  Accessibility,
  Globe,
  AlertCircle,
  Clock,
  Send,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Calendar,
  MessageCircle,
  Heart,
  Star,
  CheckCircle2,
  Navigation,
  Users,
  Smile,
} from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { Breadcrumb } from '@/components/ui/breadcrumb';

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

const DIRECTIONS = {
  landmarks: [
    'Located on Bank Street between Walkley Road and Heron Road',
    'Near the intersection with Alta Vista Drive',
    'Across from Tim Hortons and LCBO',
  ],
  parking: 'Free parking available in front of the building and in the rear lot',
  transit: 'OC Transpo Routes 1, 7, and 114 stop within a 2-minute walk',
  accessibility: 'Fully wheelchair accessible with ground-floor entrance and accessible washrooms',
};

// Animation variants with reduced motion support
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

// SVG Illustration Components
function ContactIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Message bubble with heart */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <path
          d="M40 60C40 49 49 40 60 40H140C151 40 160 49 160 60V100C160 111 151 120 140 120H80L60 140V120H60C49 120 40 111 40 100V60Z"
          fill="#722F37"
          fillOpacity="0.1"
          stroke="#722F37"
          strokeWidth="2"
        />
        <motion.path
          d="M100 65C94 65 85 72 85 80C85 95 100 105 100 105C100 105 115 95 115 80C115 72 106 65 100 65Z"
          fill="#722F37"
          fillOpacity="0.3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>
      {/* Connection dots */}
      <motion.circle cx="30" cy="90" r="6" fill="#722F37" fillOpacity="0.2"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle cx="170" cy="70" r="4" fill="#722F37" fillOpacity="0.15"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
      />
      <motion.circle cx="50" cy="150" r="5" fill="#722F37" fillOpacity="0.1"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.3 }}
      />
    </svg>
  );
}

function LocationIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Map pin with dental cross */}
      <motion.g
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        <path
          d="M100 20C72 20 50 42 50 70C50 110 100 180 100 180C100 180 150 110 150 70C150 42 128 20 100 20Z"
          fill="#722F37"
          fillOpacity="0.1"
          stroke="#722F37"
          strokeWidth="2"
        />
        <circle cx="100" cy="70" r="25" fill="#722F37" fillOpacity="0.2" />
        {/* Dental cross inside */}
        <rect x="95" y="55" width="10" height="30" rx="2" fill="#722F37" fillOpacity="0.4" />
        <rect x="85" y="65" width="30" height="10" rx="2" fill="#722F37" fillOpacity="0.4" />
      </motion.g>
      {/* Pulse rings */}
      <motion.circle
        cx="100" cy="70" r="40"
        stroke="#722F37"
        strokeWidth="1"
        fill="none"
        strokeOpacity="0.2"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="100" cy="70" r="55"
        stroke="#722F37"
        strokeWidth="1"
        fill="none"
        strokeOpacity="0.1"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  );
}

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
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Floating shape component
function FloatingShape({
  className,
  delay = 0,
  size = 'md',
}: {
  className?: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const prefersReducedMotion = useReducedMotion();
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
  };

  if (prefersReducedMotion) {
    return (
      <div
        className={`absolute rounded-full blur-3xl pointer-events-none opacity-30 ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${sizes[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [0.95, 1.05, 0.95],
        y: [-20, 20, -20],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Animated contact card
function ContactCard({
  icon: Icon,
  title,
  value,
  subtitle,
  href,
  delay = 0,
  accentColor = 'burgundy',
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle: string;
  href?: string;
  delay?: number;
  accentColor?: 'burgundy' | 'teal' | 'coral';
}) {
  const prefersReducedMotion = useReducedMotion();
  const colors = {
    burgundy: {
      bg: 'bg-[#722F37]/5',
      hover: 'hover:bg-[#722F37]/10',
      icon: 'bg-[#722F37]',
      text: 'text-[#722F37]',
    },
    teal: {
      bg: 'bg-primary-50',
      hover: 'hover:bg-primary-100',
      icon: 'bg-primary-600',
      text: 'text-primary-600',
    },
    coral: {
      bg: 'bg-accent-50',
      hover: 'hover:bg-accent-100',
      icon: 'bg-accent-500',
      text: 'text-accent-600',
    },
  };

  const colorScheme = colors[accentColor];
  const Wrapper = href ? motion.a : motion.div;

  return (
    <Wrapper
      href={href}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReducedMotion ? {} : {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      className={`
        group relative block p-8 rounded-3xl cursor-pointer
        ${colorScheme.bg} ${colorScheme.hover}
        border border-neutral-100/50 backdrop-blur-sm
        transition-all duration-500
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
        hover:shadow-[0_20px_50px_-12px_rgba(114,47,55,0.15)]
      `}
      style={{ perspective: '1000px' }}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(114,47,55,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Icon with animated ring */}
      <div className="relative mb-6">
        <motion.div
          className={`
            w-16 h-16 ${colorScheme.icon} rounded-2xl
            flex items-center justify-center
            shadow-lg
          `}
          whileHover={prefersReducedMotion ? {} : { rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        {/* Animated ring */}
        {!prefersReducedMotion && (
          <motion.div
            className={`absolute inset-0 w-16 h-16 rounded-2xl border-2 ${colorScheme.text} opacity-0 group-hover:opacity-30`}
            initial={false}
            animate={{ scale: [1, 1.3, 1.3], opacity: [0.3, 0, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Content */}
      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className={`text-2xl font-bold ${colorScheme.text} mb-2 group-hover:underline decoration-2 underline-offset-4`}>
        {value}
      </p>
      <p className="text-neutral-500 text-sm">{subtitle}</p>

      {/* Arrow indicator */}
      {href && (
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className={`w-5 h-5 ${colorScheme.text}`} />
        </div>
      )}
    </Wrapper>
  );
}

// Hours visualization component
function HoursVisualization() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(-1);

  useEffect(() => {
    const jsDay = new Date().getDay();
    setCurrentDayIndex(jsDay === 0 ? 6 : jsDay - 1);
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <motion.div
          className="w-14 h-14 bg-gradient-to-br from-[#722F37] to-[#8B3D47] rounded-2xl flex items-center justify-center shadow-lg"
          whileHover={prefersReducedMotion ? {} : { scale: 1.05, rotate: 5 }}
        >
          <Clock className="w-7 h-7 text-white" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900">Office Hours</h3>
          <p className="text-neutral-500 text-sm">We&apos;re here when you need us</p>
        </div>
      </div>

      {/* Hours grid */}
      <div className="space-y-2">
        {HOURS.map((entry, index) => {
          const isToday = mounted && index === currentDayIndex;
          const barWidth = entry.isOpen ? (entry.hours.includes('2:00 PM') ? '50%' : entry.hours.includes('5:00 PM') ? '80%' : '90%') : '0%';

          return (
            <motion.div
              key={entry.day}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
              className={`
                relative flex items-center justify-between p-4 rounded-xl
                ${isToday ? 'bg-[#722F37]/5 ring-2 ring-[#722F37]/20' : 'bg-neutral-50/50'}
                group cursor-default
              `}
            >
              {/* Day and hours */}
              <div className="flex items-center gap-3 z-10">
                <span
                  className={`
                    font-semibold text-sm w-24
                    ${isToday ? 'text-[#722F37]' : 'text-neutral-700'}
                  `}
                >
                  {entry.day}
                </span>
                {isToday && (
                  <motion.span
                    initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-2 py-0.5 bg-[#722F37] text-white text-xs font-bold rounded-full uppercase tracking-wide"
                  >
                    Today
                  </motion.span>
                )}
              </div>
              <span
                className={`
                  text-sm z-10
                  ${entry.isOpen ? 'text-neutral-700 font-medium' : 'text-neutral-400'}
                `}
              >
                {entry.hours}
              </span>

              {/* Visual bar indicator */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 rounded-xl bg-gradient-to-r from-[#722F37]/10 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: barWidth }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.3 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Extended hours note */}
      <motion.p
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
        className="mt-6 text-sm text-neutral-500 flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-[#722F37]" />
        Extended emergency hours available upon request
      </motion.p>
    </motion.div>
  );
}

// Language pills component
function LanguagePills() {
  const prefersReducedMotion = useReducedMotion();
  const languages = PRACTICE_INFO.languages;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-white to-primary-50/50 p-8 border border-primary-100"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-300 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: -10 }}
          >
            <Globe className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900">We Speak Your Language</h3>
            <p className="text-sm text-neutral-500">Multilingual care for our community</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {languages.map((lang, i) => (
            <motion.span
              key={lang}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : i * 0.1 }}
              whileHover={prefersReducedMotion ? {} : {
                scale: 1.08,
                y: -3,
                transition: { duration: 0.2 },
              }}
              className="
                px-5 py-2.5 rounded-full
                bg-white border border-primary-200
                text-primary-700 font-medium text-sm
                shadow-sm hover:shadow-md
                cursor-default transition-shadow
              "
            >
              {lang}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Emergency banner component
function EmergencyBanner() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
      className="
        relative overflow-hidden rounded-3xl p-8
        bg-gradient-to-br from-accent-50 via-accent-50 to-accent-100
        border-2 border-accent-200
      "
    >
      {/* Animated pulse background */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-300/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <div className="relative flex items-start gap-6">
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0"
          animate={prefersReducedMotion ? {} : {
            boxShadow: [
              '0 0 0 0 rgba(244,63,94,0.4)',
              '0 0 0 20px rgba(244,63,94,0)',
              '0 0 0 0 rgba(244,63,94,0)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <AlertCircle className="w-8 h-8 text-white" />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-accent-900 mb-2">Dental Emergency?</h3>
          <p className="text-accent-700 mb-4 leading-relaxed">
            Experiencing severe pain, swelling, or trauma? We offer same-day emergency
            appointments. Don&apos;t wait—call us immediately.
          </p>
          <motion.a
            href={PRACTICE_INFO.phoneHref}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="
              inline-flex items-center gap-3 px-6 py-3 rounded-xl
              bg-accent-600 text-white font-bold
              shadow-lg shadow-accent-500/25
              hover:bg-accent-700 transition-colors
            "
          >
            <Phone className="w-5 h-5" />
            {PRACTICE_INFO.phone}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// Direction card component
function DirectionCard({
  icon: Icon,
  title,
  description,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: 'teal' | 'blue' | 'purple';
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const colors = {
    teal: { bg: 'bg-primary-50', icon: 'bg-primary-500', text: 'text-primary-600' },
    blue: { bg: 'bg-blue-50', icon: 'bg-blue-500', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-500', text: 'text-purple-600' },
  };

  const scheme = colors[color];

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: prefersReducedMotion ? 0 : delay, duration: 0.6 }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      className={`
        ${scheme.bg} rounded-2xl p-6
        border border-neutral-100
        hover:shadow-lg transition-all duration-300
      `}
    >
      <motion.div
        className={`w-12 h-12 ${scheme.icon} rounded-xl flex items-center justify-center mb-4 shadow-md`}
        whileHover={prefersReducedMotion ? {} : { rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <h4 className="font-bold text-neutral-900 mb-2">{title}</h4>
      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Why contact us feature card
function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: prefersReducedMotion ? 0 : delay }}
      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors"
    >
      <div className="w-12 h-12 bg-[#722F37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-[#722F37]" />
      </div>
      <div>
        <h4 className="font-semibold text-neutral-900 mb-1">{title}</h4>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </motion.div>
  );
}

export function ContactPageDesktop() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <main id="main-content" className="flex min-h-screen flex-col bg-[#FDFBF9] overflow-hidden">
      {/* Hero Section with Image */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact/hero-dental-team.jpg"
            alt="Friendly dental team ready to help you"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF9] via-[#FDFBF9]/95 to-[#FDFBF9]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF9] via-transparent to-transparent" />
        </div>

        {/* Animated background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          <FloatingShape className="bg-[#722F37]/20 -top-20 -right-20" size="lg" delay={0} />
          <FloatingShape className="bg-primary-300/30 -bottom-32 -left-32" size="lg" delay={1} />
          <FloatingShape className="bg-secondary-300/20 top-1/3 right-1/4" size="md" delay={2} />

          {/* Decorative grid pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.02]"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#722F37" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Main content */}
        <motion.div
          style={prefersReducedMotion ? {} : { opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative w-full max-w-[1600px] mx-auto px-8 lg:px-16 py-20 z-10"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Breadcrumb items={[{ label: 'Contact', href: '/contact' }]} />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-semibold backdrop-blur-sm">
                  <Heart className="w-4 h-4" />
                  Let&apos;s Connect
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight mb-8"
              >
                We&apos;re Here to{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#722F37]">Help</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-4 bg-[#722F37]/10 -z-0 rounded-full"
                    initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-neutral-600 leading-relaxed max-w-xl mb-10"
              >
                Whether you&apos;re scheduling a routine checkup, have questions about our services,
                or need urgent care—our friendly team is ready to assist you every step of the way.
              </motion.p>

              {/* Quick contact actions */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <motion.a
                  href={PRACTICE_INFO.phoneHref}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  className="
                    inline-flex items-center gap-3 px-8 py-4 rounded-2xl
                    bg-[#722F37] text-white font-semibold text-lg
                    shadow-xl shadow-[#722F37]/25
                    hover:bg-[#8B3D47] transition-colors
                  "
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </motion.a>

                <motion.a
                  href="#book"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  className="
                    inline-flex items-center gap-3 px-8 py-4 rounded-2xl
                    bg-white/80 text-[#722F37] font-semibold text-lg
                    border-2 border-[#722F37]/20 backdrop-blur-sm
                    hover:border-[#722F37]/40 hover:bg-white
                    transition-all
                  "
                >
                  <Send className="w-5 h-5" />
                  Send Message
                  <ChevronRight className="w-4 h-4" />
                </motion.a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-wrap items-center gap-6 text-sm text-neutral-500"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Same-day appointments
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  5-star rated care
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#722F37]" />
                  Family-friendly
                </span>
              </motion.div>
            </motion.div>

            {/* Right: Contact cards grid */}
            <div className="grid grid-cols-2 gap-5">
              <ContactCard
                icon={Phone}
                title="Call Us"
                value={PRACTICE_INFO.phone}
                subtitle="Tap to call directly"
                href={PRACTICE_INFO.phoneHref}
                delay={0.2}
                accentColor="burgundy"
              />
              <ContactCard
                icon={Mail}
                title="Email Us"
                value="info@osd.com"
                subtitle="We reply within 24 hours"
                href={`mailto:${PRACTICE_INFO.email}`}
                delay={0.3}
                accentColor="teal"
              />
              <ContactCard
                icon={MapPin}
                title="Visit Us"
                value="1729 Bank St"
                subtitle="Ottawa, ON K1V 7Z4"
                href={PRACTICE_INFO.googleMapsUrl}
                delay={0.4}
                accentColor="burgundy"
              />
              <ContactCard
                icon={Clock}
                title="Open Today"
                value="9 AM – 6 PM"
                subtitle="Monday to Saturday"
                delay={0.5}
                accentColor="teal"
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-[#722F37]/30 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-[#722F37]/50 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Why Contact Us Section - Visual Break */}
      <section className="relative py-20 bg-gradient-to-br from-[#722F37]/5 via-white to-primary-50/30">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Illustration */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <ContactIllustration className="w-full h-full" />
                {/* Decorative elements */}
                <motion.div
                  className="absolute top-10 right-10 w-16 h-16 bg-[#722F37]/10 rounded-2xl flex items-center justify-center"
                  animate={prefersReducedMotion ? {} : { y: [-5, 5, -5], rotate: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <MessageCircle className="w-8 h-8 text-[#722F37]" />
                </motion.div>
                <motion.div
                  className="absolute bottom-20 left-5 w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center"
                  animate={prefersReducedMotion ? {} : { y: [5, -5, 5], rotate: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Calendar className="w-7 h-7 text-primary-600" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Features */}
            <div>
              <motion.span
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-semibold mb-6"
              >
                Why Contact Us?
              </motion.span>
              <motion.h2
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-8"
              >
                Your Smile is Our Priority
              </motion.h2>

              <div className="space-y-2">
                <FeatureCard
                  icon={Smile}
                  title="Friendly & Caring Team"
                  description="Our staff makes every visit comfortable and stress-free"
                  delay={0.1}
                />
                <FeatureCard
                  icon={Clock}
                  title="Flexible Scheduling"
                  description="Evening and Saturday appointments available"
                  delay={0.2}
                />
                <FeatureCard
                  icon={Globe}
                  title="Multilingual Support"
                  description="We speak English, French, Arabic, and Somali"
                  delay={0.3}
                />
                <FeatureCard
                  icon={CheckCircle2}
                  title="Quick Response"
                  description="We respond to all inquiries within 24 hours"
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section - Contact Form */}
      <section id="book" className="relative py-24 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#722F37]/20 to-transparent" />
          <div className="absolute top-40 left-0 w-1/3 h-96 bg-gradient-to-r from-[#722F37]/5 to-transparent rounded-r-full blur-3xl" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-8 lg:px-16">
          {/* Section header */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6"
            >
              <Send className="w-4 h-4 inline mr-2" />
              Get in Touch
            </motion.span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Send Us a Message
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
              For urgent matters, please call us directly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 lg:gap-24">
            {/* Contact Form - Elevated card */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Form container with depth */}
              <div
                className="
                  relative bg-white rounded-[2.5rem] p-10 lg:p-12
                  shadow-[0_25px_80px_-20px_rgba(114,47,55,0.15)]
                  border border-neutral-100
                "
              >
                {/* Decorative corner accent */}
                <div className="absolute -top-3 -left-3 w-24 h-24 bg-gradient-to-br from-[#722F37] to-[#8B3D47] rounded-2xl -z-10 opacity-10 blur-xl" />
                <div className="absolute -bottom-3 -right-3 w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl -z-10 opacity-10 blur-xl" />

                {/* Form header accent line */}
                <div className="absolute top-0 left-12 right-12 h-1 bg-gradient-to-r from-[#722F37] via-primary-500 to-[#722F37] rounded-full opacity-80" />

                {/* Decorative tooth icon */}
                <div className="absolute -top-6 right-12">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <ToothIcon className="w-6 h-6 text-[#722F37]" />
                  </div>
                </div>

                <ContactForm />
              </div>
            </motion.div>

            {/* Right sidebar - Stacked info cards */}
            <div className="space-y-8">
              {/* Hours visualization */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-100"
              >
                <HoursVisualization />
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <LanguagePills />
              </motion.div>

              {/* Emergency banner */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <EmergencyBanner />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section - Full-width immersive */}
      <section id="directions" className="relative py-24 lg:py-32 bg-neutral-900 text-white overflow-hidden">
        {/* Background with image overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/contact/reception-welcome.jpg"
            alt="Ottawa South Dental welcoming reception area"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-900/90" />
        </div>

        {/* Background map texture */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />
        </div>

        {/* Decorative elements */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-20 right-20 w-96 h-96 bg-[#722F37]/30 rounded-full blur-[120px]"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px]"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </>
        )}

        <div className="relative max-w-[1600px] mx-auto px-8 lg:px-16">
          {/* Section header */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-6 backdrop-blur-sm"
            >
              <Navigation className="w-4 h-4" />
              Find Us
            </motion.span>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              Visit Our{' '}
              <span className="text-[#722F37] bg-gradient-to-r from-[#722F37] to-accent-400 bg-clip-text text-transparent">
                Office
              </span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Conveniently located on Bank Street in Ottawa&apos;s south end, we&apos;re easy to find
              with ample parking and public transit access.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Map embed */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px] shadow-2xl"
            >
              {/* Map frame */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 z-10 pointer-events-none" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.5!2d-75.653!3d45.375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0f3c8e9d8b15%3A0x123456789!2s1729%20Bank%20St%2C%20Ottawa%2C%20ON%20K1V%207Z4!5e0!3m2!1sen!2sca!4v1705000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ottawa South Dental Location"
                className="w-full h-full"
              />

              {/* Address overlay card */}
              <motion.a
                href={PRACTICE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                className="
                  absolute bottom-6 left-6 right-6 lg:right-auto lg:max-w-sm
                  bg-white/95 backdrop-blur-md rounded-2xl p-6
                  shadow-2xl border border-white/20
                  group cursor-pointer
                "
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#722F37] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1">Our Address</h3>
                    <p className="text-[#722F37] font-semibold group-hover:underline">
                      {PRACTICE_INFO.fullAddress}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1">
                      Get directions
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </div>
              </motion.a>
            </motion.div>

            {/* Direction info */}
            <div className="space-y-8">
              {/* Illustration */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="hidden lg:flex justify-center mb-8"
              >
                <LocationIllustration className="w-40 h-40 opacity-60" />
              </motion.div>

              {/* Landmarks */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-[#722F37] rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </span>
                  How to Find Us
                </h3>
                <ul className="space-y-4">
                  {DIRECTIONS.landmarks.map((landmark, index) => (
                    <motion.li
                      key={index}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm font-bold text-[#722F37] flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-neutral-300 leading-relaxed">{landmark}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Transport options grid */}
              <div className="grid grid-cols-3 gap-4">
                <DirectionCard
                  icon={Car}
                  title="Parking"
                  description={DIRECTIONS.parking}
                  color="teal"
                  delay={0.1}
                />
                <DirectionCard
                  icon={Bus}
                  title="Transit"
                  description={DIRECTIONS.transit}
                  color="blue"
                  delay={0.2}
                />
                <DirectionCard
                  icon={Accessibility}
                  title="Accessibility"
                  description={DIRECTIONS.accessibility}
                  color="purple"
                  delay={0.3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#8B3D47] to-[#722F37]" />

        {/* Decorative image overlay */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/contact/friendly-dentist.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Decorative shapes */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-white/5 blur-3xl"
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-black/10 blur-3xl"
              animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
          </>
        )}

        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8"
            >
              <ToothIcon className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
              Questions? We&apos;re Here to Help
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Don&apos;t hesitate to reach out—we&apos;re happy to answer any questions about your dental care.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <motion.a
                href={PRACTICE_INFO.phoneHref}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -3 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="
                  inline-flex items-center gap-3 px-10 py-5 rounded-2xl
                  bg-white text-[#722F37] font-bold text-lg
                  shadow-2xl shadow-black/20
                  hover:bg-neutral-50 transition-colors
                "
              >
                <Phone className="w-6 h-6" />
                {PRACTICE_INFO.phone}
              </motion.a>

              <motion.a
                href="#book"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -3 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="
                  inline-flex items-center gap-3 px-10 py-5 rounded-2xl
                  bg-white/10 text-white font-bold text-lg
                  border-2 border-white/30 backdrop-blur-sm
                  hover:bg-white/20 hover:border-white/50
                  transition-all
                "
              >
                <Mail className="w-6 h-6" />
                Send a Message
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
