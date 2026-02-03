'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  PhoneCall,
  Globe,
  ChevronDown,
  Sparkles,
  Calendar,
  CalendarCheck,
  ArrowRight,
  Smile,
  SmilePlus,
  Shield,
  ShieldCheck,
  Heart,
  HeartPulse,
  Star,
  Baby,
  Siren,
  Stethoscope,
  WandSparkles,
  HandHeart,
  ScanHeart,
  Activity,
  Users
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MobileNav } from './MobileNav';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; icon?: React.ReactNode; description?: string }[];
}

// Animated icon wrapper for consistent hover effects
function AnimatedIcon({
  children,
  className = "",
  hoverScale = 1.1,
  hoverRotate = 0
}: {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

// Service categories with dental-themed icons and descriptions for mega menu
const serviceCategories = {
  preventive: {
    title: 'Preventive Care',
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
    iconHover: <Shield className="w-5 h-5" aria-hidden="true" />,
    items: [
      {
        label: 'Routine Checkups',
        href: '/services/routine-checkups',
        description: 'Regular dental examinations',
        icon: <Stethoscope className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Dental Hygiene',
        href: '/services/dental-hygiene',
        description: 'Professional cleaning',
        icon: <Sparkles className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Preventive Dentistry',
        href: '/services/preventive-dentistry',
        description: 'Protect your smile',
        icon: <ShieldCheck className="w-4 h-4" aria-hidden="true" />
      },
    ],
  },
  cosmetic: {
    title: 'Cosmetic',
    icon: <WandSparkles className="w-5 h-5" aria-hidden="true" />,
    iconHover: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    items: [
      {
        label: 'Cosmetic Dentistry',
        href: '/services/cosmetic-dentistry',
        description: 'Smile transformations',
        icon: <WandSparkles className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Teeth Whitening',
        href: '/services/teeth-whitening',
        description: 'Brighten your smile',
        icon: <Sparkles className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Invisalign',
        href: '/services/invisalign',
        description: 'Clear aligners',
        icon: <SmilePlus className="w-4 h-4" aria-hidden="true" />
      },
    ],
  },
  restorative: {
    title: 'Restorative',
    icon: <HeartPulse className="w-5 h-5" aria-hidden="true" />,
    iconHover: <Heart className="w-5 h-5" aria-hidden="true" />,
    items: [
      {
        label: 'Dental Implants',
        href: '/services/dental-implants',
        description: 'Permanent tooth replacement',
        icon: <Activity className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Dentures',
        href: '/services/dentures',
        description: 'Custom-fit dentures',
        icon: <Smile className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Missing Teeth',
        href: '/services/missing-teeth',
        description: 'Complete your smile',
        icon: <SmilePlus className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'White Fillings',
        href: '/services/white-fillings',
        description: 'Natural-looking restorations',
        icon: <Star className="w-4 h-4" aria-hidden="true" />
      },
    ],
  },
  specialized: {
    title: 'Specialized',
    icon: <Star className="w-5 h-5" aria-hidden="true" />,
    iconHover: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    items: [
      {
        label: 'Root Canal',
        href: '/services/root-canal',
        description: 'Pain-free treatment',
        icon: <ScanHeart className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Gum Therapy',
        href: '/services/gum-therapy',
        description: 'Periodontal health',
        icon: <HeartPulse className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Oral Surgery',
        href: '/services/oral-surgery',
        description: 'Expert surgical care',
        icon: <Stethoscope className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: "Children's Dentistry",
        href: '/services/childrens-dentistry',
        description: 'Gentle pediatric care',
        icon: <Baby className="w-4 h-4" aria-hidden="true" />
      },
      {
        label: 'Emergency Care',
        href: '/services/emergency-care',
        description: '24/7 urgent dental',
        icon: <Siren className="w-4 h-4" aria-hidden="true" />
      },
    ],
  },
};

const navItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      ...Object.values(serviceCategories).flatMap(cat => cat.items.map(item => ({
        label: item.label,
        href: item.href,
      }))),
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about/team' },
    ],
  },
  {
    label: 'Patient Info',
    href: '/patient-info',
    children: [
      { label: 'Patient Information', href: '/patient-info' },
      { label: 'New Patients', href: '/patient-info/new-patients' },
      { label: 'CDCP Coverage', href: '/patient-info/cdcp' },
      { label: 'Payment & Insurance', href: '/patient-info/payment-insurance' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

const PHONE_NUMBER = '(613) 733-6446';
const PHONE_HREF = 'tel:+16137336446';

// Magnetic button effect hook
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

// Animated underline component
function AnimatedUnderline({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] rounded-full"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: isHovered ? 1 : 0,
        opacity: isHovered ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0.5 }}
    />
  );
}

// Navigation link with magnetic effect
function NavLink({
  href,
  children,
  isActive = false
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.15);

  return (
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
        href={href}
        className={`relative px-4 py-2 text-[15px] font-medium tracking-wide transition-colors duration-300 ${
          isActive
            ? 'text-[#722F37]'
            : 'text-neutral-700 hover:text-[#722F37]'
        }`}
      >
        {children}
        <AnimatedUnderline isHovered={isHovered || isActive} />
      </Link>
    </motion.div>
  );
}

// Category icon with hover state transition
function CategoryIcon({
  icon,
  isHovered
}: {
  icon: React.ReactNode;
  isHovered: boolean;
}) {
  return (
    <motion.div
      className="p-2 rounded-lg bg-[#722F37]/10 text-[#722F37]"
      animate={{
        scale: isHovered ? 1.1 : 1,
        backgroundColor: isHovered ? 'rgba(114, 47, 55, 0.15)' : 'rgba(114, 47, 55, 0.1)',
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        animate={{ rotate: isHovered ? 5 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}

// Services Mega Menu
function ServicesMegaMenu({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const categories = Object.entries(serviceCategories);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[76px] bg-black/10 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />

          {/* Mega Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[900px] max-w-[95vw] z-50"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-100/80 overflow-hidden">
              {/* Decorative top gradient line */}
              <div className="h-1 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37]" />

              <div className="p-8">
                <div className="grid grid-cols-4 gap-8">
                  {categories.map(([key, category], categoryIndex) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: categoryIndex * 0.05,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onMouseEnter={() => setHoveredCategory(key)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
                        <CategoryIcon
                          icon={category.icon}
                          isHovered={hoveredCategory === key}
                        />
                        <span className="font-semibold text-neutral-800 tracking-wide">
                          {category.title}
                        </span>
                      </div>

                      {/* Category Items */}
                      <div className="space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: categoryIndex * 0.05 + itemIndex * 0.03,
                              duration: 0.3,
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="group block py-2.5 px-3 -mx-3 rounded-lg transition-all duration-200 hover:bg-[#722F37]/5"
                            >
                              <div className="flex items-center gap-2">
                                <motion.span
                                  className="text-neutral-400 group-hover:text-[#722F37] transition-colors"
                                  whileHover={{ scale: 1.15, rotate: 5 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                  {item.icon}
                                </motion.span>
                                <span className="text-sm text-neutral-700 group-hover:text-[#722F37] transition-colors font-medium flex-1">
                                  {item.label}
                                </span>
                                <ArrowRight
                                  className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#722F37] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="text-xs text-neutral-400 mt-0.5 ml-6 group-hover:text-neutral-500 transition-colors">
                                {item.description}
                              </p>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="mt-8 pt-6 border-t border-neutral-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg shadow-[#722F37]/20"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <HandHeart className="w-6 h-6 text-white" aria-hidden="true" />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-neutral-800">Not sure which service you need?</p>
                        <p className="text-sm text-neutral-500">Schedule a consultation and we&apos;ll guide you</p>
                      </div>
                    </div>
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#FDF8F3] text-[#722F37] font-medium rounded-xl hover:bg-[#F5EDE5] transition-colors"
                    >
                      <span>View All Services</span>
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Simple dropdown for non-Services items
function SimpleDropdown({
  item,
  isOpen,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && item.children && (
        <motion.div
          initial={{ opacity: 0, y: -5, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 mt-2 py-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-neutral-100/80 min-w-[220px] z-50 overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#722F37]/50 to-transparent" />

          {item.children.map((child, index) => (
            <motion.div
              key={child.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
            >
              <Link
                href={child.href}
                onClick={onClose}
                className="group flex items-center justify-between px-4 py-2.5 text-sm text-neutral-700 hover:bg-[#722F37]/5 hover:text-[#722F37] transition-all"
              >
                <span className="font-medium">{child.label}</span>
                <ArrowRight
                  className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#722F37] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Dropdown trigger with magnetic effect
function DropdownTrigger({
  item,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.15);

  if (!item.children) {
    return <NavLink href={item.href}>{item.label}</NavLink>;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        onMouseEnter();
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        onMouseLeave();
        setIsHovered(false);
      }}
    >
      <motion.button
        onClick={onToggle}
        style={{ x: magnetic.x, y: magnetic.y }}
        onMouseMove={magnetic.handleMouseMove}
        onMouseLeave={magnetic.handleMouseLeave}
        className={`relative flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium tracking-wide transition-colors duration-300 ${
          isOpen ? 'text-[#722F37]' : 'text-neutral-700 hover:text-[#722F37]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </motion.div>
        <AnimatedUnderline isHovered={isHovered || isOpen} />
      </motion.button>

      {item.label === 'Services' ? (
        <ServicesMegaMenu isOpen={isOpen} onClose={onToggle} />
      ) : (
        <SimpleDropdown item={item} isOpen={isOpen} onClose={onToggle} />
      )}
    </div>
  );
}

// Animated logo component
function AnimatedLogo({ scrollProgress }: { scrollProgress: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      className="relative flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-2 rounded-lg group"
      aria-label="Ottawa South Dental - Home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="relative"
      >
        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute -inset-2 rounded-xl bg-[#722F37]/10 blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <Image
          src="/LOGO.png"
          alt="Ottawa South Dental"
          width={180}
          height={50}
          className="relative w-auto h-11 transition-all duration-300"
          style={{
            width: 'auto',
            height: scrollProgress > 0.1 ? '40px' : '44px',
          }}
          priority
        />
      </motion.div>
    </Link>
  );
}

// Animated phone icon with pulse effect
function AnimatedPhoneIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div className="relative">
      {/* Pulse ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#722F37]/20"
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: isHovered ? [1, 1.5, 1.5] : 1,
          opacity: isHovered ? [0, 0.5, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
          ease: "easeOut"
        }}
      />
      <motion.div
        animate={{
          rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        {isHovered ? (
          <PhoneCall className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Phone className="w-4 h-4" aria-hidden="true" />
        )}
      </motion.div>
    </motion.div>
  );
}

// Animated CTA Button
function BookAppointmentButton() {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.2);

  return (
    <motion.div
      style={{ x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={(e) => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      <Link href="/contact" className="relative group inline-block">
        <motion.div
          className="relative px-6 py-3 bg-gradient-to-r from-[#722F37] via-[#8B3A42] to-[#722F37] text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-[#722F37]/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Animated shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Pulse ring effect */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-white/30"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: isHovered ? [1, 1.1, 1.1] : 1,
              opacity: isHovered ? [0, 0.5, 0] : 0,
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          />

          <span className="relative flex items-center gap-2 text-[15px]">
            <motion.span
              animate={{
                rotate: isHovered ? [0, -5, 5, 0] : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {isHovered ? (
                <CalendarCheck className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Calendar className="w-4 h-4" aria-hidden="true" />
              )}
            </motion.span>
            Book Appointment
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Premium animated hamburger icon for mobile
function AnimatedHamburger({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
      className="lg:hidden relative p-3 rounded-2xl text-neutral-700 hover:text-[#722F37] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] touch-target"
      aria-label="Open menu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      suppressHydrationWarning
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered || isPressed ? 1 : 0,
          scale: isHovered || isPressed ? 1 : 0.8,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* Pulse ring on press */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-[#722F37]/30"
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: isPressed ? [1, 1.3, 1.3] : 1,
          opacity: isPressed ? [0, 0.5, 0] : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Hamburger lines with staggered animation */}
      <div className="relative w-6 h-5 flex flex-col justify-between">
        {/* Top line */}
        <motion.span
          className="block h-[2.5px] bg-current rounded-full origin-left"
          animate={{
            width: isHovered ? '100%' : '100%',
            x: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.2, delay: 0 }}
        />

        {/* Middle line */}
        <motion.span
          className="block h-[2.5px] bg-current rounded-full origin-left"
          animate={{
            width: isHovered ? '70%' : '100%',
            x: isHovered ? 0 : 0,
          }}
          transition={{ duration: 0.2, delay: 0.05 }}
        />

        {/* Bottom line */}
        <motion.span
          className="block h-[2.5px] bg-current rounded-full origin-left"
          animate={{
            width: isHovered ? '85%' : '100%',
            x: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.2, delay: 0.1 }}
        />
      </div>

      {/* Hover sparkle effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-1 -right-1"
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-3 h-3 text-[#722F37]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Language indicator with globe animation
function LanguageIndicator() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-50/80 text-neutral-500 text-sm font-medium cursor-default"
      role="group"
      aria-label="Available languages: English and French"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Globe className="w-3.5 h-3.5" aria-hidden="true" />
      </motion.span>
      <span aria-hidden="true" className="text-xs tracking-wide">EN / FR</span>
    </motion.div>
  );
}

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll tracking
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth header background opacity
  const headerBg = useTransform(scrollY, [0, 100], [0.8, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const headerShadow = useTransform(scrollY, [0, 50], [0, 1]);
  const headerPadding = useTransform(scrollY, [0, 100], [20, 12]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const unsubscribe = scrollY.on('change', (latest) => {
      setScrollProgress(Math.min(latest / 100, 1));
    });

    return () => unsubscribe();
  }, [mounted, scrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!mounted) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, mounted]);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 border-b"
          style={{
            backgroundColor: `rgba(255, 255, 255, ${mounted ? headerBg.get() : 0.95})`,
            backdropFilter: `blur(${mounted ? headerBlur.get() : 16}px)`,
            boxShadow: `0 4px 30px rgba(0, 0, 0, ${mounted ? headerShadow.get() * 0.08 : 0.04})`,
            borderColor: `rgba(0, 0, 0, ${mounted ? headerShadow.get() * 0.05 : 0.02})`,
          }}
        />

        {/* Subtle gradient overlay at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#722F37]/20 to-transparent" />

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            paddingTop: mounted ? headerPadding : 20,
            paddingBottom: mounted ? headerPadding : 20,
          }}
        >
          <div className="flex items-center justify-between">
            {/* Animated Logo */}
            <AnimatedLogo scrollProgress={scrollProgress} />

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={`nav-${index}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <DropdownTrigger
                    item={item}
                    isOpen={openDropdown === item.label}
                    onToggle={() => handleDropdownToggle(item.label)}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  />
                </motion.div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Language indicator - Desktop only */}
              <LanguageIndicator />

              {/* Phone number - Desktop */}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href={PHONE_HREF}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-[#722F37] font-semibold rounded-xl hover:bg-[#722F37]/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]"
                aria-label={`Call us at ${PHONE_NUMBER}`}
                onMouseEnter={() => setIsPhoneHovered(true)}
                onMouseLeave={() => setIsPhoneHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedPhoneIcon isHovered={isPhoneHovered} />
                <span className="hidden md:inline text-[15px] tracking-wide">{PHONE_NUMBER}</span>
              </motion.a>

              {/* Book Appointment CTA - Desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="hidden sm:block"
              >
                <BookAppointmentButton />
              </motion.div>

              {/* Mobile menu button */}
              <AnimatedHamburger onClick={() => setIsMobileMenuOpen(true)} />
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        phoneNumber={PHONE_NUMBER}
        phoneHref={PHONE_HREF}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[76px]" aria-hidden="true" />
    </>
  );
}
