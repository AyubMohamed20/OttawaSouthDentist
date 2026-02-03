'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  AlertTriangle,
  Shield,
  Clock,
  Phone,
  ArrowRight,
  Zap,
  Heart,
  Activity,
  CircleAlert,
  MapPin,
  Stethoscope,
  Bandage,
  ThermometerSun,
  Droplets,
  Timer,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  ClockAlert,
  HeartPulse,
  Siren,
  HandHeart,
  BadgeAlert,
  ShieldPlus,
  TriangleAlert,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { ResponsiveWrapperCSS } from '@/components/responsive-wrapper';
import EmergencyCarePageMobile from './page-mobile';

// ============================================================================
// DATA
// ============================================================================

const EMERGENCY_PHONE = '(613) 733-1312';
const EMERGENCY_PHONE_HREF = 'tel:+16137331312';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What constitutes a dental emergency?',
    answer:
      "Dental emergencies include severe toothache that doesn't respond to pain medication, knocked-out teeth, broken or cracked teeth with sharp edges or exposed nerves, lost fillings or crowns exposing sensitive tooth structure, dental abscesses (swelling with fever), uncontrolled bleeding after an extraction or injury, and injuries to the mouth, lips, or jaw. If you're unsure whether your situation is an emergency, call us and we'll help you determine the best course of action.",
  },
  {
    question: 'Can I get a same-day appointment for a dental emergency?',
    answer:
      "Yes, we prioritize dental emergencies and reserve time in our daily schedule for urgent cases. When you call with an emergency, we'll do everything possible to see you the same day, often within a few hours. For the fastest response, call us directly rather than booking online.",
  },
  {
    question: 'What should I do if a tooth is knocked out?',
    answer:
      "Time is critical for knocked-out teeth. Handle the tooth only by the crown (the white part), never the root. Gently rinse it with water if dirty, but don't scrub or remove any attached tissue. If possible, try to place the tooth back in its socket and hold it there. If you can't reinsert it, keep it moist by placing it in milk, saliva, or a tooth preservation kit. See a dentist within 30 minutes for the best chance of saving the tooth.",
  },
  {
    question: 'How can I manage dental pain before my appointment?',
    answer:
      'Take over-the-counter pain relievers like ibuprofen or acetaminophen as directed on the package. Apply a cold compress to the outside of your cheek for 15-20 minutes at a time to reduce swelling. Rinse gently with warm salt water (1/2 teaspoon salt in 8 ounces of water). Avoid very hot, cold, or sweet foods and drinks. Try to chew on the opposite side of your mouth. Do not apply aspirin directly to your gums as this can cause burns.',
  },
  {
    question: 'What if I have a dental emergency after hours?',
    answer:
      "Our office voicemail provides instructions for after-hours emergencies. For life-threatening emergencies involving difficulty breathing, severe bleeding, or trauma to the head and neck, go directly to the nearest emergency room. For dental-specific emergencies, call our office line and follow the prompts for emergency contact information.",
  },
];

const emergencyTypes = [
  {
    id: 'toothache',
    icon: <ThermometerSun className="w-7 h-7" />,
    title: 'Severe Toothache',
    urgency: 'high',
    description: 'Intense, persistent tooth pain that may indicate infection, decay, or abscess.',
    symptoms: ['Sharp or throbbing pain', 'Sensitivity to temperature', 'Swollen gums', 'Fever'],
    firstAid: [
      'Rinse with warm salt water',
      'Take OTC pain reliever (ibuprofen)',
      'Apply cold compress externally',
      'Avoid hot/cold foods',
    ],
  },
  {
    id: 'knockedout',
    icon: <AlertTriangle className="w-7 h-7" />,
    title: 'Knocked-Out Tooth',
    urgency: 'critical',
    description: 'Quick action is essential. With proper handling and prompt treatment, the tooth may be saved.',
    symptoms: ['Complete tooth displacement', 'Bleeding from socket', 'Pain and swelling'],
    firstAid: [
      'Handle tooth by crown only',
      'Rinse gently (no scrubbing)',
      'Try to reinsert or store in milk',
      'Get to dentist within 30 minutes',
    ],
  },
  {
    id: 'broken',
    icon: <Zap className="w-7 h-7" />,
    title: 'Broken or Cracked Teeth',
    urgency: 'high',
    description: 'Damage from injury or biting hard objects that exposes sensitive inner tooth structure.',
    symptoms: ['Visible chip or crack', 'Sharp edges', 'Pain when biting', 'Sensitivity'],
    firstAid: [
      'Save any broken pieces',
      'Rinse mouth gently',
      'Apply gauze for bleeding',
      'Use cold compress for swelling',
    ],
  },
  {
    id: 'filling',
    icon: <Shield className="w-7 h-7" />,
    title: 'Lost Fillings or Crowns',
    urgency: 'medium',
    description: 'Missing restorations leave teeth vulnerable to further damage and sensitivity.',
    symptoms: ['Visible hole in tooth', 'Rough or sharp edges', 'Temperature sensitivity', 'Discomfort chewing'],
    firstAid: [
      'Save the crown if possible',
      'Apply dental cement or sugarless gum',
      'Avoid chewing on that side',
      'Keep area clean',
    ],
  },
  {
    id: 'abscess',
    icon: <Droplets className="w-7 h-7" />,
    title: 'Dental Abscess',
    urgency: 'critical',
    description: 'A serious infection causing swelling, fever, and severe pain that requires immediate treatment.',
    symptoms: ['Severe throbbing pain', 'Facial swelling', 'Fever', 'Bad taste/odor', 'Swollen lymph nodes'],
    firstAid: [
      'Rinse with salt water frequently',
      'Do NOT apply heat',
      'Take OTC pain reliever',
      'Seek immediate care',
    ],
  },
  {
    id: 'injury',
    icon: <Bandage className="w-7 h-7" />,
    title: 'Oral Injuries',
    urgency: 'high',
    description: 'Cuts, lacerations, or trauma to the lips, gums, cheeks, or tongue that need professional care.',
    symptoms: ['Bleeding', 'Swelling', 'Visible wounds', 'Difficulty opening mouth'],
    firstAid: [
      'Apply pressure with clean gauze',
      'Rinse with salt water',
      'Apply cold compress',
      'Seek care if bleeding persists',
    ],
  },
];

const benefits = [
  {
    icon: <ClockAlert className="w-6 h-6" />,
    title: 'Same-Day Appointments',
    description: 'We prioritize emergencies and work to see urgent cases the same day you call.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Immediate Pain Relief',
    description: 'Our first priority is getting you out of pain quickly and effectively.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Expert Care',
    description: 'Our experienced team handles all types of dental emergencies with skill and compassion.',
  },
  {
    icon: <HandHeart className="w-6 h-6" />,
    title: 'Compassionate Approach',
    description: "We understand emergencies are stressful and provide calm, reassuring care.",
  },
];

const relatedServices = [
  {
    title: 'Root Canal Therapy',
    description: 'Save infected teeth with gentle root canal treatment to relieve pain.',
    href: '/services/root-canal',
    icon: <Activity className="w-6 h-6" />,
    image: '/images/services/emergency-care/dental-treatment.jpg',
  },
  {
    title: 'Oral Surgery',
    description: 'Surgical solutions for extractions and complex dental issues.',
    href: '/services/oral-surgery',
    icon: <ShieldPlus className="w-6 h-6" />,
    image: '/images/services/emergency-care/dental-team.jpg',
  },
  {
    title: 'White Fillings',
    description: 'Restore damaged teeth with natural-looking composite fillings.',
    href: '/services/white-fillings',
    icon: <Check className="w-6 h-6" />,
    image: '/images/services/emergency-care/dental-consultation.jpg',
  },
];

// ============================================================================
// SVG ILLUSTRATIONS
// ============================================================================

// Professional tooth illustration
function ToothIllustration({ className = '', animated = false }: { className?: string; animated?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {/* Tooth crown (upper part) */}
      <path
        d="M50 8C32 8 20 20 20 38C20 50 24 56 28 62C32 68 34 76 34 86C34 94 38 100 44 100C50 100 52 94 52 88C52 82 50 76 50 70C50 66 52 64 56 64C60 64 62 66 62 70C62 76 60 82 60 88C60 94 62 100 68 100C74 100 78 94 78 86C78 76 80 68 84 62C88 56 92 50 92 38C92 20 80 8 50 8Z"
        fill="url(#toothGradient)"
        stroke="#722F37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Highlight on tooth */}
      <path
        d="M35 28C35 28 40 22 50 22C60 22 65 28 65 28"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="toothGradient" x1="50" y1="8" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F5F0EB" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

// Emergency alert illustration with tooth
function EmergencyToothIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pulsing background circle */}
      <circle cx="70" cy="70" r="60" fill="#722F37" fillOpacity="0.1" />
      <circle cx="70" cy="70" r="45" fill="#722F37" fillOpacity="0.15" />

      {/* Tooth shape */}
      <path
        d="M70 30C55 30 45 40 45 55C45 65 48 70 51 75C54 80 56 86 56 94C56 100 59 105 64 105C69 105 71 100 71 95C71 90 69 85 69 80C69 77 71 75 74 75C77 75 79 77 79 80C79 85 77 90 77 95C77 100 79 105 84 105C89 105 92 100 92 94C92 86 94 80 97 75C100 70 103 65 103 55C103 40 93 30 70 30Z"
        fill="white"
        stroke="#722F37"
        strokeWidth="2.5"
      />

      {/* Alert triangle on tooth */}
      <path
        d="M70 50L78 65H62L70 50Z"
        fill="#722F37"
        stroke="#722F37"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <line x1="70" y1="54" x2="70" y2="59" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="70" cy="62" r="1.5" fill="white" />
    </svg>
  );
}

// First aid kit illustration
function FirstAidIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Kit body */}
      <rect x="15" y="30" width="70" height="55" rx="6" fill="#722F37" />
      <rect x="20" y="35" width="60" height="45" rx="4" fill="#8a3a44" />

      {/* Handle */}
      <path
        d="M35 30V22C35 18 40 15 50 15C60 15 65 18 65 22V30"
        stroke="#722F37"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Cross symbol */}
      <rect x="44" y="45" width="12" height="24" rx="2" fill="white" />
      <rect x="38" y="51" width="24" height="12" rx="2" fill="white" />

      {/* Highlight */}
      <rect x="22" y="38" width="20" height="4" rx="2" fill="white" fillOpacity="0.3" />
    </svg>
  );
}

// Clock urgent illustration
function UrgentClockIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Clock body */}
      <circle cx="50" cy="50" r="40" fill="white" stroke="#722F37" strokeWidth="4" />
      <circle cx="50" cy="50" r="35" fill="#FDF8F3" />

      {/* Clock marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line
          key={i}
          x1="50"
          y1="18"
          x2="50"
          y2={i % 3 === 0 ? "24" : "21"}
          stroke="#722F37"
          strokeWidth={i % 3 === 0 ? "3" : "2"}
          strokeLinecap="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Clock hands */}
      <line x1="50" y1="50" x2="50" y2="28" stroke="#722F37" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="50" x2="68" y2="50" stroke="#722F37" strokeWidth="3" strokeLinecap="round" />

      {/* Center dot */}
      <circle cx="50" cy="50" r="4" fill="#722F37" />

      {/* Urgent indicator */}
      <circle cx="75" cy="25" r="12" fill="#ef4444" />
      <text x="75" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text>
    </svg>
  );
}

// Phone call illustration
function PhoneCallIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Phone body */}
      <path
        d="M25 15C25 12 27 10 30 10H70C73 10 75 12 75 15V85C75 88 73 90 70 90H30C27 90 25 88 25 85V15Z"
        fill="#722F37"
      />
      <rect x="30" y="18" width="40" height="60" rx="2" fill="white" />

      {/* Call waves */}
      <path
        d="M80 35C85 40 85 55 80 60"
        stroke="#722F37"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M88 28C98 38 98 58 88 68"
        stroke="#722F37"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Phone icon on screen */}
      <circle cx="50" cy="48" r="15" fill="#722F37" fillOpacity="0.1" />
      <path
        d="M43 40C43 40 44 44 48 48C52 52 56 53 56 53L54 56C54 56 49 55 45 51C41 47 40 42 40 42L43 40Z"
        fill="#722F37"
      />

      {/* Home button */}
      <circle cx="50" cy="83" r="4" stroke="#EDE5DD" strokeWidth="2" />
    </svg>
  );
}

// Calming heart illustration for compassionate care
function CompassionateIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Hands */}
      <path
        d="M20 55C20 55 25 45 35 45C45 45 50 55 50 55C50 55 55 45 65 45C75 45 80 55 80 55"
        stroke="#722F37"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M25 60C25 60 30 52 38 52C46 52 50 60 50 60"
        stroke="#722F37"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M50 60C50 60 54 52 62 52C70 52 75 60 75 60"
        stroke="#722F37"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Heart */}
      <path
        d="M50 35C50 35 45 25 38 25C31 25 26 31 26 38C26 52 50 65 50 65C50 65 74 52 74 38C74 31 69 25 62 25C55 25 50 35 50 35Z"
        fill="#722F37"
        fillOpacity="0.2"
        stroke="#722F37"
        strokeWidth="2"
      />

      {/* Pulse line */}
      <path
        d="M35 45L42 45L45 38L50 52L55 42L58 45L65 45"
        stroke="#722F37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  hidden: { opacity: 0, scale: 0.8 },
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      x.set(deltaX);
      y.set(deltaY);
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
// LIVE STATUS INDICATOR
// ============================================================================

function LiveStatusIndicator() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      setCurrentTime(now);
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentMinutes = hour * 60 + minute;

      if (day === 0) {
        setIsOpen(false);
      } else if (day === 6) {
        setIsOpen(currentMinutes >= 540 && currentMinutes < 840);
      } else {
        setIsOpen(currentMinutes >= 540 && currentMinutes < 1020);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`inline-flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md border ${
        isOpen
          ? 'bg-green-500/10 border-green-500/30'
          : 'bg-amber-500/10 border-amber-500/30'
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.span className="relative flex h-3 w-3" aria-hidden="true">
        <motion.span
          className={`absolute inline-flex h-full w-full rounded-full ${
            isOpen ? 'bg-green-500' : 'bg-amber-500'
          } opacity-75`}
          animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${
            isOpen ? 'bg-green-500' : 'bg-amber-500'
          }`}
        />
      </motion.span>
      <span className={`text-sm font-semibold ${isOpen ? 'text-green-400' : 'text-amber-400'}`}>
        {isOpen ? 'Open Now' : 'After Hours'}
      </span>
      {currentTime && (
        <span className="text-white/60 text-sm">
          {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </span>
      )}
    </motion.div>
  );
}

// ============================================================================
// EMERGENCY CALL BUTTON WITH PULSE
// ============================================================================

function EmergencyCallButton({ size = 'large' }: { size?: 'small' | 'large' }) {
  const [isHovered, setIsHovered] = useState(false);
  const magnetic = useMagnetic(0.15);

  if (size === 'small') {
    return (
      <motion.a
        href={EMERGENCY_PHONE_HREF}
        className="group inline-flex items-center gap-2 px-5 py-3 bg-[#722F37] text-white rounded-full font-semibold text-sm hover:bg-[#5a252c] transition-all shadow-lg shadow-[#722F37]/25"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
        Call Now
      </motion.a>
    );
  }

  return (
    <motion.div
      style={{ x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={() => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative"
    >
      {/* Pulsing rings */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-[#722F37]"
        animate={{
          scale: [1, 1.15, 1.15],
          opacity: [0.4, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-[#722F37]"
        animate={{
          scale: [1, 1.1, 1.1],
          opacity: [0.4, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 0.5,
        }}
        aria-hidden="true"
      />

      <motion.a
        href={EMERGENCY_PHONE_HREF}
        className="relative group flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-[#722F37] via-[#8a3a44] to-[#722F37] text-white rounded-2xl font-bold text-xl overflow-hidden shadow-2xl shadow-[#722F37]/30"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`Call our emergency line at ${EMERGENCY_PHONE}`}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '200%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <motion.div
          className="relative flex items-center justify-center w-14 h-14 bg-white/20 rounded-xl"
          animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <PhoneCall className="w-7 h-7" aria-hidden="true" />
        </motion.div>

        <div className="relative flex flex-col items-start">
          <span className="text-white/80 text-sm font-medium">Emergency Line</span>
          <span className="text-2xl tracking-wide">{EMERGENCY_PHONE}</span>
        </div>

        <motion.div
          className="relative ml-2"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-6 h-6" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
}

// ============================================================================
// FLOATING EMERGENCY BANNER (STICKY)
// ============================================================================

function FloatingEmergencyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 600);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40"
          role="banner"
          aria-label="Emergency contact banner"
        >
          <div className="flex items-center gap-4 px-6 py-3 bg-[#722F37]/95 backdrop-blur-md rounded-full shadow-2xl border border-white/10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              aria-hidden="true"
            >
              <TriangleAlert className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-white font-medium">Dental Emergency?</span>
            <a
              href={EMERGENCY_PHONE_HREF}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#722F37] rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {EMERGENCY_PHONE}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// SYMPTOM CHECKER CARD
// ============================================================================

function SymptomCheckerCard({
  emergency,
  isSelected,
  onSelect,
  index,
}: {
  emergency: (typeof emergencyTypes)[0];
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const urgencyColors = {
    critical: {
      bg: 'from-red-500/20 to-red-600/10',
      border: 'border-red-500/30',
      badge: 'bg-red-500 text-white',
      icon: 'text-red-500',
    },
    high: {
      bg: 'from-amber-500/20 to-amber-600/10',
      border: 'border-amber-500/30',
      badge: 'bg-amber-500 text-white',
      icon: 'text-amber-500',
    },
    medium: {
      bg: 'from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/30',
      badge: 'bg-blue-500 text-white',
      icon: 'text-blue-500',
    },
  };

  const colors = urgencyColors[emergency.urgency as keyof typeof urgencyColors];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        onClick={onSelect}
        className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
          isSelected
            ? `bg-gradient-to-br ${colors.bg} ${colors.border} shadow-lg`
            : 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-md'
        }`}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isSelected}
        aria-label={`${emergency.title} - ${emergency.urgency} urgency. Click to view first aid tips.`}
      >
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isSelected
                ? 'bg-white shadow-md'
                : 'bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD]'
            }`}
            animate={isSelected ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          >
            <span className={colors.icon}>{emergency.icon}</span>
          </motion.div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colors.badge}`}
            aria-label={`Urgency level: ${emergency.urgency}`}
          >
            {emergency.urgency}
          </span>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-2">{emergency.title}</h3>
        <p className="text-neutral-600 text-sm leading-relaxed">{emergency.description}</p>

        <motion.div
          className="flex items-center gap-2 mt-4 text-[#722F37] font-medium text-sm"
          animate={{ x: isSelected ? 5 : 0 }}
        >
          <span>View first aid tips</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

// ============================================================================
// FIRST AID DETAIL PANEL
// ============================================================================

function FirstAidPanel({ emergency }: { emergency: (typeof emergencyTypes)[0] | null }) {
  if (!emergency) {
    return (
      <motion.div
        className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-[#FDF8F3] to-white rounded-3xl border border-[#EDE5DD]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-24 h-24 mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FirstAidIllustration className="w-full h-full" />
        </motion.div>
        <h3 className="text-xl font-bold text-neutral-900 mb-3">Select an Emergency Type</h3>
        <p className="text-neutral-600 max-w-sm">
          Click on any emergency condition to see symptoms and first aid instructions.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={emergency.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-full bg-white rounded-3xl border border-[#EDE5DD] overflow-hidden shadow-xl"
      role="region"
      aria-label={`First aid information for ${emergency.title}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#722F37] to-[#5a252c] p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center" aria-hidden="true">
            {emergency.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{emergency.title}</h3>
            <p className="text-white/80 text-sm">{emergency.description}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Symptoms */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-bold text-neutral-900 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-500" aria-hidden="true" />
            Common Symptoms
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {emergency.symptoms.map((symptom, i) => (
              <motion.div
                key={symptom}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-neutral-700"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
                <span className="text-sm">{symptom}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* First Aid Steps */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-bold text-neutral-900 mb-4">
            <Bandage className="w-5 h-5 text-[#722F37]" aria-hidden="true" />
            First Aid Steps
          </h4>
          <ol className="space-y-3" aria-label="First aid steps">
            {emergency.firstAid.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#FDF8F3] to-white rounded-xl"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-sm" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="text-neutral-700 pt-1">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Emergency CTA */}
        <motion.div
          className="p-6 bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl border border-red-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              aria-hidden="true"
            >
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </motion.div>
            <div className="flex-1">
              <p className="font-bold text-neutral-900">Still need help?</p>
              <p className="text-sm text-neutral-600">Call us immediately for emergency care</p>
            </div>
            <a
              href={EMERGENCY_PHONE_HREF}
              className="flex items-center gap-2 px-5 py-3 bg-[#722F37] text-white rounded-xl font-semibold hover:bg-[#5a252c] transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// OFFICE HOURS DISPLAY
// ============================================================================

function OfficeHoursDisplay() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1;

  const hours = [
    { day: 'Monday', hours: '9:00 AM – 5:00 PM', isOpen: true },
    { day: 'Tuesday', hours: '9:00 AM – 5:00 PM', isOpen: true },
    { day: 'Wednesday', hours: '9:00 AM – 5:00 PM', isOpen: true },
    { day: 'Thursday', hours: '9:00 AM – 5:00 PM', isOpen: true },
    { day: 'Friday', hours: '9:00 AM – 5:00 PM', isOpen: true },
    { day: 'Saturday', hours: '9:00 AM – 2:00 PM', isOpen: true },
    { day: 'Sunday', hours: 'Closed', isOpen: false },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl border border-[#EDE5DD] overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#722F37] to-[#5a252c] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center" aria-hidden="true">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Office Hours</h3>
              <p className="text-white/80 text-sm">Emergency slots available daily</p>
            </div>
          </div>
          <LiveStatusIndicator />
        </div>
      </div>

      {/* Hours Grid */}
      <div className="p-6 space-y-2">
        {hours.map((item, index) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              index === adjustedToday
                ? 'bg-[#722F37]/10 border-2 border-[#722F37]/20'
                : 'bg-neutral-50 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {index === adjustedToday && (
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#722F37]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
              )}
              <span
                className={`font-medium ${
                  index === adjustedToday ? 'text-[#722F37]' : 'text-neutral-700'
                }`}
              >
                {item.day}
                {index === adjustedToday && (
                  <span className="ml-2 text-xs bg-[#722F37] text-white px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </span>
            </div>
            <span
              className={`text-sm font-medium ${
                !item.isOpen
                  ? 'text-neutral-400'
                  : index === adjustedToday
                  ? 'text-[#722F37]'
                  : 'text-neutral-600'
              }`}
            >
              {item.hours}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Emergency Note */}
      <div className="px-6 pb-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <TriangleAlert className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">After-Hours Emergencies</p>
              <p className="text-amber-700 text-sm mt-1">
                Call our main line and follow the prompts for emergency instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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

  return (
    <section ref={containerRef} className="relative min-h-[90vh] overflow-hidden bg-neutral-900">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/services/emergency-care/emergency-hero.jpg"
          alt="Patient receiving emergency dental care with cold compress for pain relief"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/95 via-neutral-900/80 to-neutral-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
      </motion.div>

      {/* Animated emergency pulse overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(114,47,55,0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-[90vh] flex items-center"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium" aria-current="page">Emergency Care</li>
              </ol>
            </motion.nav>

            {/* Live Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <LiveStatusIndicator />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-[0.95] tracking-tight mb-6"
            >
              Emergency
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-[#a04d56] to-amber-400">
                Dental Care
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-white/80 leading-relaxed max-w-xl mb-10"
            >
              Dental emergencies don&apos;t wait, and neither should you. We offer same-day appointments
              for urgent dental issues to get you out of pain and protect your oral health.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <EmergencyCallButton />

              <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
                  Same-day appointments
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
                  Walk-ins welcome
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
                  Insurance accepted
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Contact Card - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute top-1/2 right-8 -translate-y-1/2 hidden xl:block"
          >
            <div className="w-80 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <EmergencyToothIllustration className="w-full h-full" />
                </motion.div>
                <h3 className="text-white font-bold text-lg">Need Immediate Help?</h3>
              </div>

              <div className="space-y-4">
                <a
                  href={EMERGENCY_PHONE_HREF}
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-white" aria-hidden="true" />
                  <div className="text-white">
                    <div className="text-xs opacity-70">Call Now</div>
                    <div className="font-bold">{EMERGENCY_PHONE}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
                  <div className="text-white">
                    <div className="text-xs opacity-70">Location</div>
                    <div className="font-medium text-sm">1729 Bank St, Ottawa</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <Timer className="w-5 h-5 text-white" aria-hidden="true" />
                  <div className="text-white">
                    <div className="text-xs opacity-70">Response Time</div>
                    <div className="font-medium text-sm">Usually same day</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll for Help</span>
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
// BENEFITS SECTION
// ============================================================================

function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const illustrations = [
    <UrgentClockIllustration key="clock" className="w-16 h-16" />,
    <FirstAidIllustration key="firstaid" className="w-16 h-16" />,
    <ToothIllustration key="tooth" className="w-16 h-16" />,
    <CompassionateIllustration key="heart" className="w-16 h-16" />,
  ];

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            Trusted <span className="text-[#722F37]">Emergency Care</span>
          </h2>
          <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
            When you&apos;re in pain, you need a dental team that responds quickly with expert care
            and genuine compassion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-white to-[#FDF8F3] border border-[#EDE5DD] hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-[#722F37]/10 flex items-center justify-center text-[#722F37] mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                aria-hidden="true"
              >
                {illustrations[index]}
              </motion.div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#722F37]" aria-hidden="true">{benefit.icon}</span>
                <h3 className="text-xl font-bold text-neutral-900">{benefit.title}</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SYMPTOM CHECKER SECTION
// ============================================================================

function SymptomCheckerSection() {
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const selectedData = emergencyTypes.find((e) => e.id === selectedEmergency) || null;

  return (
    <section className="py-24 bg-gradient-to-b from-[#FDF8F3] to-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <EmergencyToothIllustration className="w-24 h-24" />
            </motion.div>
          </div>
          <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
            Symptom Checker
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            Identify Your <span className="text-[#722F37]">Emergency</span>
          </h2>
          <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
            Select your condition below to see first aid tips while you arrange to visit us.
            Remember: when in doubt, call us immediately.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Emergency Type Cards */}
          <div className="grid sm:grid-cols-2 gap-4" role="listbox" aria-label="Emergency types">
            {emergencyTypes.map((emergency, index) => (
              <SymptomCheckerCard
                key={emergency.id}
                emergency={emergency}
                isSelected={selectedEmergency === emergency.id}
                onSelect={() =>
                  setSelectedEmergency(selectedEmergency === emergency.id ? null : emergency.id)
                }
                index={index}
              />
            ))}
          </div>

          {/* First Aid Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              <FirstAidPanel emergency={selectedData} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// WHAT TO DO SECTION
// ============================================================================

function WhatToDoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      title: 'Stay Calm',
      description:
        'Take a deep breath. Most dental emergencies are treatable, especially with prompt care.',
      icon: <HeartPulse className="w-6 h-6" />,
      illustration: <CompassionateIllustration className="w-12 h-12" />,
    },
    {
      number: '02',
      title: 'Assess the Situation',
      description:
        'Check for severe bleeding, loose teeth, or swelling. Note your symptoms to share with us.',
      icon: <Stethoscope className="w-6 h-6" />,
      illustration: <ToothIllustration className="w-12 h-12" />,
    },
    {
      number: '03',
      title: 'Apply First Aid',
      description:
        'Use the symptom checker above for specific guidance while you prepare to contact us.',
      icon: <Bandage className="w-6 h-6" />,
      illustration: <FirstAidIllustration className="w-12 h-12" />,
    },
    {
      number: '04',
      title: 'Call Us Immediately',
      description:
        "Reach out to our emergency line. We'll prioritize your care and see you as soon as possible.",
      icon: <PhoneCall className="w-6 h-6" />,
      illustration: <PhoneCallIllustration className="w-12 h-12" />,
    },
  ];

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
            Emergency Guide
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            What to Do in an <span className="text-[#722F37]">Emergency</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#722F37]/30 to-transparent z-0" aria-hidden="true" />
              )}

              <div className="relative p-8 bg-gradient-to-br from-white to-[#FDF8F3] rounded-3xl border border-[#EDE5DD] h-full">
                {/* Step number */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-lg shadow-lg"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  aria-hidden="true"
                >
                  {step.number}
                </motion.div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center text-[#722F37]" aria-hidden="true">
                    {step.icon}
                  </div>
                  <div aria-hidden="true">{step.illustration}</div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 p-8 bg-gradient-to-r from-[#722F37] to-[#5a252c] rounded-3xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                aria-hidden="true"
              >
                <TriangleAlert className="w-10 h-10 text-white" />
              </motion.div>
              <div className="text-white">
                <h3 className="text-2xl font-bold">Experiencing an Emergency Right Now?</h3>
                <p className="text-white/80">Don&apos;t wait—call us immediately for priority care.</p>
              </div>
            </div>
            <EmergencyCallButton size="small" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TEAM IMAGE SECTION
// ============================================================================

function TeamImageSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#FDF8F3]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/services/emergency-care/dental-team.jpg"
                alt="Our experienced dental team providing emergency care to a patient"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-[#EDE5DD]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#722F37]/10 flex items-center justify-center" aria-hidden="true">
                  <ShieldCheck className="w-7 h-7 text-[#722F37]" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Experienced Team</p>
                  <p className="text-sm text-neutral-600">24+ years serving Ottawa</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
              Expert Emergency Team
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-6">
              Caring Professionals <span className="text-[#722F37]">Ready to Help</span>
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
              Our team understands that dental emergencies are stressful and often painful.
              We prioritize getting you out of pain quickly while providing the compassionate
              care you deserve. With years of experience handling all types of dental emergencies,
              you can trust us to provide expert treatment when you need it most.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: <Clock className="w-5 h-5" />, text: 'Same-Day Appointments' },
                { icon: <ShieldCheck className="w-5 h-5" />, text: 'Experienced Professionals' },
                { icon: <HandHeart className="w-5 h-5" />, text: 'Compassionate Care' },
                { icon: <Zap className="w-5 h-5" />, text: 'Fast Pain Relief' },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#EDE5DD]"
                >
                  <span className="text-[#722F37]" aria-hidden="true">{item.icon}</span>
                  <span className="font-medium text-neutral-700">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <EmergencyCallButton size="small" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// HOURS & LOCATION SECTION
// ============================================================================

function HoursLocationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-gradient-to-b from-[#FDF8F3] to-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
            We&apos;re Here For You
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            Hours & <span className="text-[#722F37]">Location</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Hours Display */}
          <OfficeHoursDisplay />

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl border border-[#EDE5DD] overflow-hidden shadow-xl"
          >
            {/* Map placeholder */}
            <div className="relative h-64 bg-gradient-to-br from-neutral-200 to-neutral-300">
              <Image
                src="/images/services/emergency-care/dental-consultation.jpg"
                alt="Dental consultation at our Ottawa office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>

            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#722F37] flex items-center justify-center text-white flex-shrink-0" aria-hidden="true">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Our Location</h3>
                  <p className="text-neutral-600 mt-1">
                    1729 Bank St
                    <br />
                    Ottawa, ON K1V 7Z4
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="https://maps.google.com/?q=1729+Bank+St+Ottawa+ON+K1V+7Z4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#FDF8F3] rounded-xl hover:bg-[#EDE5DD] transition-colors group"
                >
                  <span className="font-medium text-neutral-700">Get Directions</span>
                  <ArrowRight className="w-5 h-5 text-[#722F37] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>

                <a
                  href={EMERGENCY_PHONE_HREF}
                  className="flex items-center justify-between p-4 bg-[#722F37] text-white rounded-xl hover:bg-[#5a252c] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    <span className="font-medium">Call for Emergency</span>
                  </div>
                  <span className="font-bold">{EMERGENCY_PHONE}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
            Common Questions
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            Frequently Asked <span className="text-[#722F37]">Questions</span>
          </h2>
          <p className="mt-6 text-neutral-600 text-lg">
            Common questions about dental emergencies and how we can help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FAQAccordion items={faqs} />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-600 mb-4">Have an emergency? Don&apos;t wait—call us now.</p>
          <a
            href={EMERGENCY_PHONE_HREF}
            className="inline-flex items-center gap-2 text-[#722F37] font-bold text-lg hover:underline"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            {EMERGENCY_PHONE}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED SERVICES SECTION
// ============================================================================

function RelatedServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-gradient-to-b from-[#FDF8F3] to-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[#722F37] text-sm font-semibold tracking-widest uppercase mb-4">
            Explore More
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900">
            Related <span className="text-[#722F37]">Services</span>
          </h2>
          <p className="mt-6 text-neutral-600 text-lg max-w-2xl mx-auto">
            Services often needed following dental emergencies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
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
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#722F37] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0" aria-hidden="true">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center text-[#722F37] group-hover:bg-[#722F37] group-hover:text-white transition-all duration-300 flex-shrink-0" aria-hidden="true">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// DESKTOP PAGE COMPONENT
// ============================================================================

function EmergencyCarePageDesktop() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Floating Emergency Banner */}
      <FloatingEmergencyBanner />

      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Symptom Checker Section */}
      <SymptomCheckerSection />

      {/* What To Do Section */}
      <WhatToDoSection />

      {/* Team Image Section */}
      <TeamImageSection />

      {/* Hours & Location Section */}
      <HoursLocationSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Related Services Section */}
      <RelatedServicesSection />

      {/* CTA Section */}
      <ContactCtaBanner
        headline="Dental Emergency? We're Here to Help"
        description="Don't suffer in pain. Call us now for same-day emergency dental care and get the relief you need."
        bookText="Book Emergency Visit"
        background="gradient"
      />
    </main>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT WITH RESPONSIVE WRAPPER
// ============================================================================

export default function EmergencyCarePage() {
  return (
    <ResponsiveWrapperCSS
      desktop={<EmergencyCarePageDesktop />}
      mobile={<EmergencyCarePageMobile />}
    />
  );
}
