'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ChevronDown,
  ChevronRight,
  Heart,
  Stethoscope,
  ShieldPlus,
  Sparkles,
  Users,
  CreditCard,
  PhoneCall,
  Building2,
  CalendarCheck,
  Languages,
  Navigation,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FooterLink {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface FooterSection {
  title: string;
  icon: React.ElementType;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Services',
    icon: Stethoscope,
    links: [
      { label: 'Preventive Dentistry', href: '/services/preventive-dentistry', icon: ShieldPlus },
      { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry', icon: Sparkles },
      { label: 'Dental Implants', href: '/services/dental-implants', icon: Heart },
      { label: 'All Services', href: '/services', icon: Stethoscope },
    ],
  },
  {
    title: 'About',
    icon: Building2,
    links: [
      { label: 'Our Practice', href: '/about', icon: Building2 },
      { label: 'Meet the Team', href: '/about/team', icon: Users },
      { label: 'Contact Us', href: '/contact', icon: PhoneCall },
    ],
  },
  {
    title: 'Patient Info',
    icon: Users,
    links: [
      { label: 'New Patients', href: '/patient-info/new-patients', icon: Users },
      { label: 'Insurance & Payment', href: '/patient-info/payment-insurance', icon: CreditCard },
      { label: 'CDCP Coverage', href: '/patient-info/cdcp', icon: ShieldPlus },
    ],
  },
];

interface HoursOfOperation {
  day: string;
  shortDay: string;
  hours: string;
  open: boolean;
}

const hoursOfOperation: HoursOfOperation[] = [
  { day: 'Monday', shortDay: 'Mon', hours: '8:00 AM – 5:00 PM', open: true },
  { day: 'Tuesday', shortDay: 'Tue', hours: '8:00 AM – 5:00 PM', open: true },
  { day: 'Wednesday', shortDay: 'Wed', hours: '8:00 AM – 5:00 PM', open: true },
  { day: 'Thursday', shortDay: 'Thu', hours: '8:00 AM – 5:00 PM', open: true },
  { day: 'Friday', shortDay: 'Fri', hours: '8:00 AM – 2:00 PM', open: true },
  { day: 'Saturday', shortDay: 'Sat', hours: 'Closed', open: false },
  { day: 'Sunday', shortDay: 'Sun', hours: 'Closed', open: false },
];

const PRACTICE_ADDRESS = '1929 Russell Road, Suite 22, Ottawa, ON K1G 4G3';
const PHONE_NUMBER = '(613) 733-6446';
const PHONE_HREF = 'tel:+16137336446';
const LANGUAGES = ['English', 'French', 'Arabic'];

// ============================================================================
// CUSTOM TOOTH ICON SVG
// ============================================================================

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C9.5 2 7.5 3 6.5 5C5.5 7 5 9 5 11C5 13.5 5.5 15 6 17C6.5 19 7 22 8 22C9 22 9.5 20 10 18C10.5 16 11 14 12 14C13 14 13.5 16 14 18C14.5 20 15 22 16 22C17 22 17.5 19 18 17C18.5 15 19 13.5 19 11C19 9 18.5 7 17.5 5C16.5 3 14.5 2 12 2Z" />
    </svg>
  );
}

// ============================================================================
// SOCIAL ICONS
// ============================================================================

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ============================================================================
// QUICK ACTION CARD - Touch optimized (min 56px height)
// ============================================================================

interface QuickActionCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  color?: 'burgundy' | 'teal' | 'neutral';
}

function QuickActionCard({ icon: Icon, label, value, href, color = 'burgundy' }: QuickActionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const colors = {
    burgundy: {
      bg: 'bg-[#722F37]/10',
      iconBg: 'bg-[#722F37]',
      text: 'text-[#722F37]',
      border: 'border-[#722F37]/20',
    },
    teal: {
      bg: 'bg-primary-50',
      iconBg: 'bg-primary-600',
      text: 'text-primary-600',
      border: 'border-primary-100',
    },
    neutral: {
      bg: 'bg-neutral-50',
      iconBg: 'bg-neutral-800',
      text: 'text-neutral-700',
      border: 'border-neutral-200',
    },
  };

  const scheme = colors[color];

  const content = (
    <motion.div
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      className={`
        flex items-center gap-4 p-4 rounded-2xl ${scheme.bg}
        border ${scheme.border}
        min-h-[72px] touch-target
        active:opacity-90 transition-all duration-200
      `}
    >
      <div
        className={`
          w-12 h-12 ${scheme.iconBg} rounded-xl
          flex items-center justify-center flex-shrink-0
          shadow-lg
        `}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-neutral-500 uppercase tracking-wide font-medium">{label}</p>
        <p className={`font-semibold ${scheme.text} text-base truncate`}>{value}</p>
      </div>
      {href && (
        <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" aria-hidden="true" />
      )}
    </motion.div>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

    if (isExternal) {
      return (
        <a
          href={href}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-2 rounded-2xl"
          aria-label={`${label}: ${value}`}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`${label}: ${value}`}
      >
        {content}
      </Link>
    );
  }

  return content;
}

// ============================================================================
// ACCORDION SECTION - Collapsible nav sections
// ============================================================================

interface AccordionSectionProps {
  section: FooterSection;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionSection({ section, isOpen, onToggle, index }: AccordionSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = section.icon;

  return (
    <div className="border-b border-neutral-800/50 last:border-b-0">
      <motion.button
        onClick={onToggle}
        className="
          w-full flex items-center justify-between py-4 px-1
          min-h-[56px] touch-target
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-inset
        "
        whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#722F37]/20 rounded-xl flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
          </div>
          <span className="font-semibold text-white text-base">{section.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-neutral-400" aria-hidden="true" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-4 pl-12 space-y-1" role="list">
              {section.links.map((link, linkIndex) => {
                const LinkIcon = link.icon;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: linkIndex * 0.03 }}
                  >
                    <Link
                      href={link.href}
                      className="
                        flex items-center gap-3 py-3 pr-4
                        text-neutral-400 hover:text-white
                        min-h-[44px] touch-target
                        transition-colors duration-200
                        focus:outline-none focus-visible:text-white
                      "
                    >
                      {LinkIcon && (
                        <LinkIcon className="w-4 h-4 text-neutral-500 flex-shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-sm font-light">{link.label}</span>
                      <ChevronRight className="w-4 h-4 ml-auto text-neutral-600" aria-hidden="true" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// HOURS SECTION - Compact mobile view
// ============================================================================

function HoursSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(-1);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const jsDay = new Date().getDay();
    setCurrentDayIndex(jsDay === 0 ? 6 : jsDay - 1);
    setMounted(true);
  }, []);

  // Get today's status for the collapsed preview
  const todayHours = mounted && currentDayIndex >= 0 ? hoursOfOperation[currentDayIndex] : null;

  return (
    <div className="border-b border-neutral-800/50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between py-4 px-1
          min-h-[56px] touch-target
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-inset
        "
        whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#722F37]/20 rounded-xl flex items-center justify-center">
            <Clock className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
          </div>
          <div>
            <span className="font-semibold text-white text-base block">Hours</span>
            {todayHours && (
              <span className="text-xs text-neutral-400">
                Today: <span className={todayHours.open ? 'text-green-400' : 'text-red-400'}>
                  {todayHours.hours}
                </span>
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-neutral-400" aria-hidden="true" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-1">
              {hoursOfOperation.map((item, index) => {
                const isToday = mounted && index === currentDayIndex;
                return (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`
                      flex items-center justify-between py-2 px-3 rounded-lg
                      ${isToday ? 'bg-[#722F37]/10' : ''}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isToday ? 'text-white font-medium' : 'text-neutral-400 font-light'}`}>
                        {item.day}
                      </span>
                      {isToday && (
                        <span className="px-2 py-0.5 bg-[#722F37] text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                          Today
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        !item.open
                          ? 'text-neutral-600'
                          : isToday
                            ? 'text-[#722F37] font-medium'
                            : 'text-neutral-400'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// SOCIAL LINKS ROW
// ============================================================================

function SocialLinksRow() {
  const prefersReducedMotion = useReducedMotion();

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: InstagramIcon,
      href: 'https://instagram.com',
      label: 'Instagram',
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${label}`}
          className="
            w-12 h-12 rounded-xl
            bg-neutral-800/50 border border-neutral-700/50
            flex items-center justify-center
            text-neutral-400 hover:text-white hover:bg-[#722F37]
            transition-all duration-200
            touch-target
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]
          "
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <Icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  );
}

// ============================================================================
// SCROLL TO TOP BUTTON - Mobile optimized
// ============================================================================

function ScrollToTopMobile() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 300);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="
            fixed bottom-24 right-4 z-40
            w-12 h-12 rounded-full
            bg-[#722F37] shadow-lg shadow-[#722F37]/30
            flex items-center justify-center
            touch-target
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#722F37]
          "
          aria-label="Scroll to top"
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5 text-white" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// LANGUAGE PILLS
// ============================================================================

function LanguagePills() {
  return (
    <div className="flex items-center gap-2 py-4 border-b border-neutral-800/50">
      <div className="w-9 h-9 bg-[#722F37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <Languages className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {LANGUAGES.map((lang) => (
          <span
            key={lang}
            className="px-3 py-1 bg-neutral-800/50 text-neutral-300 text-xs font-medium rounded-full"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// STICKY BOTTOM CTA BAR
// ============================================================================

function StickyBottomCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="
        sticky bottom-0 left-0 right-0 z-40
        bg-neutral-900/95 backdrop-blur-lg
        border-t border-neutral-800/50
        px-4 py-3 safe-area-bottom
      "
    >
      <div className="flex gap-3">
        <motion.a
          href={PHONE_HREF}
          className="
            flex-1 flex items-center justify-center gap-2
            py-4 bg-[#722F37] text-white font-semibold rounded-xl
            shadow-lg shadow-[#722F37]/25
            min-h-[52px] touch-target
          "
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          aria-label={`Call us at ${PHONE_NUMBER}`}
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>Call Now</span>
        </motion.a>

        <motion.a
          href={`https://maps.google.com/?q=${encodeURIComponent(PRACTICE_ADDRESS)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex-1 flex items-center justify-center gap-2
            py-4 bg-neutral-800 text-white font-semibold rounded-xl
            border border-neutral-700
            min-h-[52px] touch-target
          "
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          aria-label="Get directions to our office"
        >
          <Navigation className="w-5 h-5" aria-hidden="true" />
          <span>Directions</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN MOBILE FOOTER COMPONENT
// ============================================================================

export function FooterMobile() {
  const currentYear = new Date().getFullYear();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const toggleSection = useCallback((title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  }, []);

  return (
    <>
      <footer className="relative bg-neutral-900 text-neutral-200">
        {/* Decorative top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#722F37] to-transparent opacity-60" />

        {/* Main content */}
        <div className="px-4 pt-8 pb-4">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            className="flex flex-col items-center text-center mb-8"
          >
            <Link
              href="/"
              className="inline-block mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] rounded-lg"
              aria-label="Ottawa South Dental - Home"
            >
              <Image
                src="/LOGO.png"
                alt="Ottawa South Dental"
                width={160}
                height={44}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Heart className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
              <span>Compassionate care for the whole family</span>
            </div>
          </motion.div>

          {/* Quick Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: prefersReducedMotion ? 0 : 0.4 }}
            className="space-y-3 mb-8"
          >
            <QuickActionCard
              icon={PhoneCall}
              label="Call Us"
              value={PHONE_NUMBER}
              href={PHONE_HREF}
              color="burgundy"
            />
            <QuickActionCard
              icon={MapPin}
              label="Visit Us"
              value="1929 Russell Road, Suite 22"
              href={`https://maps.google.com/?q=${encodeURIComponent(PRACTICE_ADDRESS)}`}
              color="teal"
            />
            <QuickActionCard
              icon={MessageCircle}
              label="Book Online"
              value="Schedule your appointment"
              href="/contact"
              color="neutral"
            />
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-6" />

          {/* Accordion Navigation Sections */}
          <nav aria-label="Footer navigation" className="mb-6">
            {footerSections.map((section, index) => (
              <AccordionSection
                key={section.title}
                section={section}
                isOpen={openSections.includes(section.title)}
                onToggle={() => toggleSection(section.title)}
                index={index}
              />
            ))}

            {/* Hours Section */}
            <HoursSection />

            {/* Languages */}
            <LanguagePills />
          </nav>

          {/* Social Links */}
          <SocialLinksRow />

          {/* Bottom Bar */}
          <div className="pt-4 border-t border-neutral-800/50">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <ToothIcon className="w-4 h-4 text-[#722F37]" />
                <p className="text-neutral-500 text-xs">
                  © {currentYear} Ottawa South Dental. All rights reserved.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <Link
                  href="/privacy-policy"
                  className="text-neutral-500 hover:text-white transition-colors touch-target py-2"
                >
                  Privacy Policy
                </Link>
                <span className="text-neutral-700">|</span>
                <Link
                  href="/terms"
                  className="text-neutral-500 hover:text-white transition-colors touch-target py-2"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom CTA */}
        <StickyBottomCTA />
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTopMobile />
    </>
  );
}
