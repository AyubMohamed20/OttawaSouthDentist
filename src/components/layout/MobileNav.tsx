'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Phone,
  PhoneCall,
  Globe,
  Calendar,
  CalendarCheck,
  ChevronRight,
  ChevronDown,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Star,
  Shield,
  ArrowRight,
  Baby,
  Siren,
  Stethoscope,
  WandSparkles,
  ScanHeart,
  HeartPulse,
  Activity,
  SmilePlus,
  Smile,
  Languages,
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo, Variants } from 'framer-motion';
import type { NavItem } from './Header';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  phoneNumber: string;
  phoneHref: string;
}

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const PRACTICE_ADDRESS = '1929 Russell Road, Suite 22';
const MAPS_URL = 'https://maps.google.com/?q=1929+Russell+Road,+Suite+22,+Ottawa,+ON+K1G+4G3';

// Service categories with icons for visual enhancement
const serviceIconMap: Record<string, React.ElementType> = {
  'All Services': Heart,
  'Routine Checkups': Stethoscope,
  'Dental Hygiene': Sparkles,
  'Preventive Dentistry': Shield,
  'Cosmetic Dentistry': WandSparkles,
  'Teeth Whitening': Sparkles,
  'Invisalign': SmilePlus,
  'Dental Implants': Activity,
  'Dentures': Smile,
  'Missing Teeth': SmilePlus,
  'White Fillings': Star,
  'Root Canal': ScanHeart,
  'Gum Therapy': HeartPulse,
  'Oral Surgery': Stethoscope,
  "Children's Dentistry": Baby,
  'Emergency Care': Siren,
  // About section
  'About Us': Heart,
  'Our Team': Heart,
  // Patient Info
  'Patient Information': Heart,
  'New Patients': Heart,
  'CDCP Coverage': Shield,
  'Payment & Insurance': Heart,
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const panelVariants: Variants = {
  hidden: { x: '100%', opacity: 0.9 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 350,
      damping: 35,
      mass: 0.8,
    },
  },
  exit: {
    x: '100%',
    opacity: 0.9,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 35,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

const childContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

const childItemVariants: Variants = {
  hidden: { opacity: 0, x: 20, y: 5 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 28,
    },
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.1 },
  },
};

const pulseRingVariants: Variants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.3, 1.3],
    opacity: [0.5, 0, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeOut' as const,
    },
  },
};

// ============================================================================
// CUSTOM TOOTH ICON
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
// ANIMATED CLOSE BUTTON
// ============================================================================

function AnimatedCloseButton({
  onClick,
  buttonRef,
}: {
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className="relative p-3 rounded-2xl text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] touch-target"
      style={{ minWidth: '48px', minHeight: '48px' }}
      aria-label="Close menu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Background pulse on press */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-[#722F37]/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isPressed ? 1.1 : isHovered ? 1 : 0.8,
          opacity: isPressed ? 0.6 : isHovered ? 0.4 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Hover background */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-neutral-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* X icon with rotation animation */}
      <motion.div
        className="relative"
        animate={{
          rotate: isHovered ? 90 : 0,
          color: isHovered ? '#722F37' : undefined,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </motion.div>
    </motion.button>
  );
}

// ============================================================================
// EXPANDABLE NAV ITEM
// ============================================================================

function ExpandableNavItem({
  item,
  isExpanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div variants={itemVariants}>
      <motion.button
        onClick={onToggle}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="flex items-center justify-between w-full px-5 py-4 text-lg font-semibold rounded-2xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#722F37] touch-target"
        style={{ minHeight: '56px' }}
        aria-expanded={isExpanded}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background states */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            backgroundColor: isExpanded
              ? 'rgba(114, 47, 55, 0.08)'
              : isPressed
                ? 'rgba(114, 47, 55, 0.06)'
                : 'transparent',
          }}
          transition={{ duration: 0.15 }}
        />

        <span
          className="relative flex items-center gap-3"
          style={{ color: isExpanded ? '#722F37' : '#1f2937' }}
        >
          {/* Icon container */}
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            animate={{
              backgroundColor: isExpanded ? 'rgba(114, 47, 55, 0.15)' : 'rgba(114, 47, 55, 0.08)',
            }}
            transition={{ duration: 0.2 }}
          >
            <ToothIcon className="w-5 h-5 text-[#722F37]" />
          </motion.div>

          {/* Animated indicator dot */}
          <motion.div
            className="absolute left-12 w-1.5 h-1.5 rounded-full bg-[#722F37]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isExpanded ? 1 : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          />

          <span className="tracking-wide">{item.label}</span>
        </span>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ color: isExpanded ? '#722F37' : '#9ca3af' }}
          className="relative"
        >
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        </motion.div>
      </motion.button>

      {/* Expandable children with smooth height animation */}
      <AnimatePresence mode="wait">
        {isExpanded && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: 'spring', stiffness: 400, damping: 35 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <motion.ul
              className="pl-4 pr-2 py-3 space-y-1"
              variants={childContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {item.children.map((child) => {
                const ChildIcon = serviceIconMap[child.label] || Heart;
                return (
                  <motion.li key={child.href} variants={childItemVariants}>
                    <Link
                      href={child.href}
                      onClick={onNavigate}
                      className="group flex items-center gap-3 px-4 py-3.5 text-base text-neutral-600 rounded-xl transition-all duration-200 hover:bg-[#722F37]/5 hover:text-[#722F37] active:bg-[#722F37]/10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#722F37] touch-target"
                      style={{ minHeight: '48px' }}
                    >
                      {/* Category icon with animation */}
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-[#722F37]/10 group-hover:text-[#722F37] transition-all duration-200"
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChildIcon className="w-4 h-4" aria-hidden="true" />
                      </motion.div>

                      <span className="flex-1 font-medium">{child.label}</span>

                      <motion.span
                        className="text-neutral-300 group-hover:text-[#722F37] transition-colors"
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </motion.span>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// SIMPLE NAV LINK
// ============================================================================

function SimpleNavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const Icon = item.label === 'Contact' ? Phone : Heart;

  return (
    <motion.li variants={itemVariants}>
      <Link
        href={item.href}
        onClick={onNavigate}
        className="group relative flex items-center justify-between px-5 py-4 text-lg font-semibold text-neutral-800 rounded-2xl transition-all duration-200 hover:bg-[#722F37]/5 hover:text-[#722F37] active:bg-[#722F37]/10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#722F37] touch-target"
        style={{ minHeight: '56px' }}
      >
        <span className="flex items-center gap-3">
          {/* Icon container */}
          <motion.div
            className="w-10 h-10 rounded-xl bg-[#722F37]/8 flex items-center justify-center group-hover:bg-[#722F37]/15 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Icon className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
          </motion.div>
          <span className="tracking-wide">{item.label}</span>
        </span>

        <motion.span
          className="text-neutral-300 group-hover:text-[#722F37] transition-colors"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </motion.span>
      </Link>
    </motion.li>
  );
}

// ============================================================================
// QUICK INFO CARD
// ============================================================================

function QuickInfoCard({
  icon: Icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  delay: number;
}) {
  const [isPressed, setIsPressed] = useState(false);

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 24 }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className="relative"
    >
      <motion.div
        className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-neutral-100 transition-all duration-200"
        animate={{
          scale: isPressed ? 0.97 : 1,
          backgroundColor: isPressed ? 'rgba(114, 47, 55, 0.05)' : 'rgba(255, 255, 255, 0.7)',
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="p-2 rounded-lg bg-gradient-to-br from-[#722F37]/15 to-[#722F37]/5 text-[#722F37]"
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{label}</p>
          <p className="text-sm text-neutral-800 font-semibold truncate">{value}</p>
        </div>
        {href && (
          <ChevronRight className="w-4 h-4 text-neutral-400" aria-hidden="true" />
        )}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] rounded-xl"
      >
        {content}
      </a>
    );
  }

  return content;
}

// ============================================================================
// CTA BUTTON WITH ANIMATIONS
// ============================================================================

function AnimatedCTAButton({
  onClick,
  children,
  icon: Icon,
  activeIcon: ActiveIcon,
  variant = 'primary',
  href,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  icon: React.ElementType;
  activeIcon?: React.ElementType;
  variant?: 'primary' | 'secondary';
  href?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const isPrimary = variant === 'primary';
  const DisplayIcon = isHovered && ActiveIcon ? ActiveIcon : Icon;

  const buttonContent = (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className={[
        'relative flex items-center justify-center gap-3 w-full px-6 py-4',
        'font-semibold text-base rounded-2xl overflow-hidden',
        'transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'touch-target cursor-pointer',
        isPrimary
          ? 'bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] text-white shadow-lg shadow-[#722F37]/25 focus-visible:ring-[#722F37]'
          : 'bg-white border-2 border-[#722F37]/20 text-[#722F37] hover:border-[#722F37]/40 hover:bg-[#722F37]/5 focus-visible:ring-[#722F37]',
      ].join(' ')}
      style={{ minHeight: '56px' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        scale: isPressed ? 0.98 : 1,
      }}
    >
      {/* Shimmer effect for primary button */}
      {isPrimary && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          {/* Pulse ring effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/30"
            variants={pulseRingVariants}
            initial="initial"
            animate={isHovered ? 'animate' : 'initial'}
          />
        </>
      )}

      <motion.span
        className="relative z-10 flex items-center justify-center gap-3"
        animate={{ x: isHovered ? 2 : 0 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <motion.span
          animate={{
            rotate: isHovered ? [0, -10, 10, 0] : 0,
            scale: isHovered ? 1.15 : isPressed ? 0.9 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <DisplayIcon className="w-5 h-5" aria-hidden="true" />
        </motion.span>
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {buttonContent}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="w-full">
      {buttonContent}
    </button>
  );
}

// ============================================================================
// MAIN MOBILE NAV COMPONENT
// ============================================================================

export function MobileNav({
  isOpen,
  onClose,
  navItems,
  phoneNumber,
  phoneHref,
}: MobileNavProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Swipe to close gesture
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 150], [1, 0]);
  const scale = useTransform(x, [0, 150], [1, 0.95]);

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x > 100 || info.velocity.x > 500) {
        onClose();
      }
    },
    [onClose]
  );

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button when menu opens (delayed to allow animation)
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Reset expanded items when menu closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow exit animation
      const timer = setTimeout(() => {
        setExpandedItems([]);
      }, 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen]);

  // Handle link clicks
  const handleNavClick = () => {
    onClose();
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop overlay with blur */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-out panel with swipe gesture */}
          <motion.div
            ref={navRef}
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.4 }}
            onDragEnd={handleDragEnd}
            style={{ x, opacity, scale }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-[min(380px,92vw)] h-[100dvh] bg-gradient-to-b from-white via-white to-[#FDF8F3] shadow-2xl overflow-hidden"
          >
            {/* Decorative top gradient line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            />

            {/* Swipe indicator */}
            <motion.div
              className="absolute top-1/2 left-2 -translate-y-1/2 w-1 h-16 bg-neutral-200 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
            />

            <div className="flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex-shrink-0 flex items-center justify-between p-4 pt-5 border-b border-neutral-100/80 bg-white/80 backdrop-blur-sm"
              >
                <Link
                  href="/"
                  onClick={handleNavClick}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] rounded-lg"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -inset-2 rounded-xl bg-[#722F37]/10 blur-md"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.5 }}
                    />
                    <Image
                      src="/LOGO.png"
                      alt="Ottawa South Dental"
                      width={140}
                      height={40}
                      className="relative h-10 w-auto"
                    />
                  </motion.div>
                </Link>

                <AnimatedCloseButton onClick={onClose} buttonRef={closeButtonRef} />
              </motion.div>

              {/* Navigation links with staggered animation */}
              <nav
                className="flex-1 min-h-0 overflow-y-auto py-4 px-3 scrollbar-hide overscroll-contain"
                aria-label="Mobile navigation"
              >
                <motion.ul
                  className="space-y-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {navItems.map((item) => (
                    <li key={item.href}>
                      {item.children ? (
                        <ExpandableNavItem
                          item={item}
                          isExpanded={expandedItems.includes(item.label)}
                          onToggle={() => toggleExpanded(item.label)}
                          onNavigate={handleNavClick}
                        />
                      ) : (
                        <SimpleNavLink item={item} onNavigate={handleNavClick} />
                      )}
                    </li>
                  ))}
                </motion.ul>
              </nav>

              {/* Bottom actions - thumb zone optimized */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                className="flex-shrink-0 p-4 pb-6 bg-gradient-to-t from-[#FDF8F3]/90 to-transparent border-t border-neutral-100 space-y-4 safe-area-bottom"
              >
                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <QuickInfoCard
                    icon={Clock}
                    label="Today"
                    value="8AM - 5PM"
                    delay={0.35}
                  />
                  <QuickInfoCard
                    icon={MapPin}
                    label="Location"
                    value="Russell Rd"
                    href={MAPS_URL}
                    delay={0.4}
                  />
                </div>

                {/* Language selector */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex items-center justify-center gap-2 py-2 text-neutral-500"
                >
                  <motion.span
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <Languages className="w-4 h-4" aria-hidden="true" />
                  </motion.span>
                  <span className="text-sm font-medium tracking-wide">EN / FR / AR</span>
                </motion.div>

                {/* Phone CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <AnimatedCTAButton
                    href={phoneHref}
                    icon={Phone}
                    activeIcon={PhoneCall}
                    variant="secondary"
                  >
                    {phoneNumber}
                  </AnimatedCTAButton>
                </motion.div>

                {/* Book Appointment CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <AnimatedCTAButton
                    onClick={() => {
                      onClose();
                      window.location.href = '/contact';
                    }}
                    icon={Calendar}
                    activeIcon={CalendarCheck}
                    variant="primary"
                  >
                    Book Appointment
                  </AnimatedCTAButton>
                </motion.div>

                {/* Address link */}
                <motion.a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-2 py-2 text-neutral-500 hover:text-[#722F37] transition-colors duration-200"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">{PRACTICE_ADDRESS}</span>
                  <motion.span whileHover={{ x: 3 }}>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
