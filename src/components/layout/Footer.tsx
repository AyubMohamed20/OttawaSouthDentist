'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Clock, Globe, Mail, ArrowUp, ArrowRight, Send } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Services',
    links: [
      { label: 'Preventive Dentistry', href: '/services/preventive-dentistry' },
      { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
      { label: 'Dental Implants', href: '/services/dental-implants' },
      { label: 'All Services', href: '/services' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Practice', href: '/about' },
      { label: 'Meet the Team', href: '/about/team' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Patient Info',
    links: [
      { label: 'New Patients', href: '/patient-info/new-patients' },
      { label: 'Insurance & Payment', href: '/patient-info/payment-insurance' },
      { label: 'CDCP Coverage', href: '/patient-info/cdcp' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Book Appointment', href: '/contact#book' },
      { label: 'Directions', href: '/contact#map' },
      { label: 'Emergency Care', href: '/contact#emergency' },
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
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const floatingVariants2 = {
  animate: {
    y: [10, -10, 10],
    x: [-5, 5, -5],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const floatingVariants3 = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, -10, 10, 0],
    transition: {
      duration: 18,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

// ============================================================================
// MAGNETIC EFFECT HOOK
// ============================================================================

function useMagnetic(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
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
// DECORATIVE ELEMENTS
// ============================================================================

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orb - top right */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #722F37 0%, transparent 70%)',
        }}
      />

      {/* Medium orb - bottom left */}
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
        }}
      />

      {/* Small accent orb - center */}
      <motion.div
        variants={floatingVariants3}
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, #eab308 0%, transparent 70%)',
        }}
      />

      {/* Geometric shapes */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-[15%] w-20 h-20 border border-white/[0.03] rounded-2xl rotate-45"
      />
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="absolute bottom-32 right-[20%] w-16 h-16 border border-[#722F37]/10 rounded-full"
      />
      <motion.div
        variants={floatingVariants3}
        animate="animate"
        className="absolute top-1/3 right-[10%] w-12 h-12 bg-gradient-to-br from-[#722F37]/5 to-transparent rounded-lg rotate-12"
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// ============================================================================
// ANIMATED LINK COMPONENT
// ============================================================================

function AnimatedLink({ href, children, delay = 0 }: { href: string; children: React.ReactNode; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="group relative inline-flex items-center gap-2 py-1.5 text-neutral-400 hover:text-white transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          className="absolute left-0 w-0 h-[1px] bg-gradient-to-r from-[#722F37] to-[#722F37]/50 bottom-0"
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="text-sm font-light tracking-wide">{children}</span>
        <motion.div
          animate={{
            x: isHovered ? 4 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-3 h-3 text-[#722F37]" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// CONTACT CARD COMPONENT
// ============================================================================

function ContactCard({
  icon: Icon,
  title,
  content,
  href,
  delay = 0
}: {
  icon: React.ElementType;
  title: string;
  content: string;
  href?: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.1);

  const CardContent = (
    <motion.div
      style={{ x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={(e) => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative group"
    >
      <motion.div
        className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm overflow-hidden"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#722F37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Icon */}
        <div className="relative flex items-center gap-4">
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37]/20 to-[#722F37]/5 flex items-center justify-center"
            animate={{
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="w-5 h-5 text-[#722F37]" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-0.5 font-medium">
              {title}
            </p>
            <p className="text-white font-medium text-sm truncate">
              {content}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-2xl"
        >
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </motion.div>
  );
}

// ============================================================================
// HOURS TIMELINE COMPONENT
// ============================================================================

function HoursTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Convert Sunday=0 to our Mon=0 format

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-[#722F37]/10">
          <Clock className="w-4 h-4 text-[#722F37]" />
        </div>
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
          Office Hours
        </h3>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[6px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#722F37]/50 via-[#722F37]/20 to-transparent" />

        <div className="space-y-2.5">
          {hoursOfOperation.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="relative flex items-center gap-4 pl-6"
            >
              {/* Timeline dot */}
              <motion.div
                className={`absolute left-0 w-3.5 h-3.5 rounded-full border-2 ${
                  index === adjustedToday
                    ? 'border-[#722F37] bg-[#722F37]'
                    : item.open
                      ? 'border-neutral-600 bg-neutral-800'
                      : 'border-neutral-700 bg-neutral-900'
                }`}
                animate={index === adjustedToday ? {
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(114, 47, 55, 0.4)',
                    '0 0 0 8px rgba(114, 47, 55, 0)',
                    '0 0 0 0 rgba(114, 47, 55, 0)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className={`flex-1 flex items-center justify-between py-1.5 ${
                index === adjustedToday ? 'text-white' : 'text-neutral-400'
              }`}>
                <span className={`text-sm ${index === adjustedToday ? 'font-semibold' : 'font-light'}`}>
                  {item.day}
                </span>
                <span className={`text-sm ${
                  !item.open
                    ? 'text-neutral-600'
                    : index === adjustedToday
                      ? 'text-[#722F37] font-medium'
                      : ''
                }`}>
                  {item.hours}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SOCIAL ICONS
// ============================================================================

function SocialIcon({
  icon,
  href,
  label
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.25);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={(e) => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative group"
    >
      <motion.div
        className="relative w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#722F37] to-[#8B3A42]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1.5 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: '50%' }}
        />

        <motion.div
          className="relative z-10 text-neutral-400"
          animate={{
            color: isHovered ? '#ffffff' : 'rgb(163 163 163)',
            rotate: isHovered ? [0, -10, 10, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

// Facebook SVG Icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  );
}

// Instagram SVG Icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  );
}

// ============================================================================
// NEWSLETTER COMPONENT
// ============================================================================

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">
          Stay Connected
        </h3>
        <p className="text-neutral-500 text-sm font-light">
          Get dental tips and practice updates delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
            isFocused ? 'ring-2 ring-[#722F37]/50' : ''
          }`}
          animate={{
            boxShadow: isFocused
              ? '0 0 30px rgba(114, 47, 55, 0.15)'
              : '0 0 0px rgba(114, 47, 55, 0)',
          }}
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(114,47,55,0.3), transparent, rgba(114,47,55,0.3))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            animate={{
              opacity: isFocused ? 1 : 0.3,
            }}
          />

          <div className="relative flex items-center bg-white/[0.03] backdrop-blur-sm">
            <div className="pl-4 text-neutral-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              ref={inputRef}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent px-3 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
            />
            <motion.button
              type="submit"
              disabled={isSubmitting || !email}
              className="m-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  />
                ) : (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

// ============================================================================
// SCROLL TO TOP BUTTON
// ============================================================================

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.2);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 400);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          onMouseMove={magnetic.handleMouseMove}
          onMouseLeave={(e) => {
            magnetic.handleMouseLeave();
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          style={{ x: magnetic.x, y: magnetic.y }}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          <motion.div
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/25 flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '200%' : '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            <motion.div
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#722F37]/30"
            animate={{
              scale: [1, 1.3, 1.3],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN FOOTER COMPONENT
// ============================================================================

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });

  return (
    <>
      <footer
        ref={footerRef}
        className="relative bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 text-neutral-200 overflow-hidden"
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#722F37]/50 to-transparent" />

        {/* Floating decorative shapes */}
        <FloatingShapes />

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-12 gap-x-8 gap-y-12"
          >
            {/* Logo, Description & Contact Cards - 4 cols */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
              {/* Animated Logo */}
              <Link
                href="/"
                className="inline-block mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-lg group"
                aria-label="Ottawa South Dental - Home"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -inset-4 rounded-xl bg-[#722F37]/10 blur-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Image
                    src="/LOGO.png"
                    alt="Ottawa South Dental"
                    width={180}
                    height={50}
                    className="relative h-12 w-auto brightness-0 invert"
                  />
                </motion.div>
              </Link>

              <p className="text-neutral-400 text-sm leading-relaxed mb-8 max-w-xs font-light">
                Providing compassionate, comprehensive dental care for the whole
                family in a warm and welcoming environment.
              </p>

              {/* Contact Cards Stack */}
              <div className="space-y-3">
                <ContactCard
                  icon={Phone}
                  title="Phone"
                  content={PHONE_NUMBER}
                  href={PHONE_HREF}
                  delay={0.1}
                />
                <ContactCard
                  icon={MapPin}
                  title="Location"
                  content="1929 Russell Road, Suite 22"
                  href={`https://maps.google.com/?q=${encodeURIComponent(PRACTICE_ADDRESS)}`}
                  delay={0.15}
                />
                <ContactCard
                  icon={Globe}
                  title="Languages"
                  content={LANGUAGES.join(' • ')}
                  delay={0.2}
                />
              </div>
            </motion.div>

            {/* Navigation Links - 5 cols */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-5">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <div key={section.title}>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: sectionIndex * 0.05 }}
                      className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-5 relative inline-block"
                    >
                      {section.title}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#722F37] to-transparent"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + sectionIndex * 0.05 }}
                      />
                    </motion.h3>
                    <ul className="space-y-1" role="list">
                      {section.links.map((link, linkIndex) => (
                        <li key={`${section.title}-${linkIndex}`}>
                          <AnimatedLink
                            href={link.href}
                            delay={0.1 + linkIndex * 0.03}
                          >
                            {link.label}
                          </AnimatedLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hours & Newsletter - 3 cols */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-3 space-y-8">
              <HoursTimeline />
              <div className="pt-6 border-t border-white/[0.05]">
                <NewsletterSignup />
              </div>
            </motion.div>
          </motion.div>

          {/* Social Icons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 mt-12 pt-8 border-t border-white/[0.05]"
          >
            <span className="text-xs uppercase tracking-wider text-neutral-600 mr-2">Follow Us</span>
            <SocialIcon
              icon={<FacebookIcon className="w-5 h-5" />}
              href="https://facebook.com"
              label="Follow us on Facebook"
            />
            <SocialIcon
              icon={<InstagramIcon className="w-5 h-5" />}
              href="https://instagram.com"
              label="Follow us on Instagram"
            />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative border-t border-white/[0.03]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-neutral-600 text-sm font-light">
                © {currentYear} Ottawa South Dental. All rights reserved.
              </p>
              <p className="text-neutral-500 text-sm font-light">
                Serving Ottawa families with compassionate dental care.
              </p>
            </div>
          </div>
        </motion.div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </>
  );
}
