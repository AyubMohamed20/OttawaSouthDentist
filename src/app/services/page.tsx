'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ArrowRight,
  Calendar,
  Phone,
  Star,
  ChevronRight,
  Filter,
  Clock,
  Users,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import ServicesPageMobile from './page-mobile';

// ============================================================================
// CUSTOM DENTAL SVG ICONS - Recognizable, professional dental visuals
// ============================================================================

function ToothIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5.5 10.5C6 13 6.5 15 6 17.5C5.5 20 6.5 22 8.5 22C10 22 10.5 20.5 11 18.5C11.3 17 11.7 16 12 16C12.3 16 12.7 17 13 18.5C13.5 20.5 14 22 15.5 22C17.5 22 18.5 20 18 17.5C17.5 15 18 13 18.5 10.5C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7C9 7 10 8 12 8C14 8 15 7 15 7"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

function ToothbrushIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="10" width="14" height="4" rx="2" fill="currentColor" />
      <rect x="17" y="11" width="5" height="2" rx="0.5" fill="currentColor" opacity="0.7" />
      <rect x="5" y="6" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="8" y="6" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="11" y="6" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="14" y="6" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function DentalMirrorIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" fill="currentColor" />
      <circle cx="8" cy="8" r="4" fill="white" opacity="0.3" />
      <path d="M12 12L20 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SparkleToothIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4C10 4 8.5 5 7.7 6.2C6.9 7.4 6.5 9 6.8 11C7.2 13 7.5 14.5 7.2 16.5C6.9 18.5 7.7 20 9.2 20C10.4 20 10.8 18.8 11.2 17.2C11.4 16 11.7 15.2 12 15.2C12.3 15.2 12.6 16 12.8 17.2C13.2 18.8 13.6 20 14.8 20C16.3 20 17.1 18.5 16.8 16.5C16.5 14.5 16.8 13 17.2 11C17.5 9 17.1 7.4 16.3 6.2C15.5 5 14 4 12 4Z"
        fill="currentColor"
      />
      <path d="M3 3L4 5L3 7L1 6L3 3Z" fill="currentColor" opacity="0.6" />
      <path d="M21 3L22 5L21 7L19 6L21 3Z" fill="currentColor" opacity="0.6" />
      <path d="M4 12L5 14L4 16L2 15L4 12Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function ImplantIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C10.5 2 9 3 9 4.5V6H15V4.5C15 3 13.5 2 12 2Z"
        fill="currentColor"
      />
      <rect x="9" y="6" width="6" height="2" fill="currentColor" opacity="0.8" />
      <path
        d="M10 8H14L13.5 11H10.5L10 8Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M10.5 11H13.5L13 14H11L10.5 11Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M11 14H13L12.5 18H11.5L11 14Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M11.5 18H12.5L12 22L11.5 18Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

function DentureIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12C4 8 7 5 12 5C17 5 20 8 20 12C20 14 19 15 17 15H7C5 15 4 14 4 12Z"
        fill="currentColor"
        opacity="0.3"
      />
      <rect x="6" y="8" width="2" height="4" rx="0.5" fill="currentColor" />
      <rect x="9" y="7" width="2" height="5" rx="0.5" fill="currentColor" />
      <rect x="12" y="7" width="2" height="5" rx="0.5" fill="currentColor" />
      <rect x="15" y="8" width="2" height="4" rx="0.5" fill="currentColor" />
      <path
        d="M4 15C4 17 6 19 12 19C18 19 20 17 20 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function RootCanalIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5.5 10.5C6 13 6.5 15 6 17.5C5.5 20 6.5 22 8.5 22C10 22 10.5 20.5 11 18.5C11.3 17 11.7 16 12 16C12.3 16 12.7 17 13 18.5C13.5 20.5 14 22 15.5 22C17.5 22 18.5 20 18 17.5C17.5 15 18 13 18.5 10.5C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 8V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}

function EmergencyToothIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4C10 4 8.5 5 7.7 6.2C6.9 7.4 6.5 9 6.8 11C7.2 13 7.5 14.5 7.2 16.5C6.9 18.5 7.7 20 9.2 20C10.4 20 10.8 18.8 11.2 17.2C11.4 16 11.7 15.2 12 15.2C12.3 15.2 12.6 16 12.8 17.2C13.2 18.8 13.6 20 14.8 20C16.3 20 17.1 18.5 16.8 16.5C16.5 14.5 16.8 13 17.2 11C17.5 9 17.1 7.4 16.3 6.2C15.5 5 14 4 12 4Z"
        fill="currentColor"
      />
      <circle cx="19" cy="5" r="4" fill="#EF4444" />
      <path d="M19 3V5.5M19 7V7.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChildToothIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3C10 3 8.5 4 7.8 5.2C7 6.4 6.6 8 6.9 10C7.3 12 7.6 13.5 7.3 15.5C7 17.5 7.8 19 9.3 19C10.5 19 10.9 17.8 11.3 16.2C11.5 15 11.8 14.2 12 14.2C12.2 14.2 12.5 15 12.7 16.2C13.1 17.8 13.5 19 14.7 19C16.2 19 17 17.5 16.7 15.5C16.4 13.5 16.7 12 17.1 10C17.4 8 17 6.4 16.2 5.2C15.5 4 14 3 12 3Z"
        fill="currentColor"
      />
      <circle cx="10" cy="8" r="1" fill="white" />
      <circle cx="14" cy="8" r="1" fill="white" />
      <path d="M10 11C10 11 11 12 12 12C13 12 14 11 14 11" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function InvisalignIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12C4 8 7 5 12 5C17 5 20 8 20 12C20 14 19 15 17 15H7C5 15 4 14 4 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 2"
        fill="none"
      />
      <path
        d="M6 12C6 9 8.5 7 12 7C15.5 7 18 9 18 12C18 13 17.5 13.5 16 13.5H8C6.5 13.5 6 13 6 12Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

function GumIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 14C3 14 5 10 12 10C19 10 21 14 21 14C21 14 19 18 12 18C5 18 3 14 3 14Z"
        fill="currentColor"
        opacity="0.4"
      />
      <rect x="6" y="6" width="2.5" height="8" rx="1" fill="currentColor" />
      <rect x="10" y="5" width="2.5" height="9" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="2.5" height="9" rx="1" fill="currentColor" />
      <path
        d="M5 14C5 16 8 18 12 18C16 18 19 16 19 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SurgeryIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L14 8H20L15 12L17 20L12 16L7 20L9 12L4 8H10L12 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function FillingIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5.5 10.5C6 13 6.5 15 6 17.5C5.5 20 6.5 22 8.5 22C10 22 10.5 20.5 11 18.5C11.3 17 11.7 16 12 16C12.3 16 12.7 17 13 18.5C13.5 20.5 14 22 15.5 22C17.5 22 18.5 20 18 17.5C17.5 15 18 13 18.5 10.5C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z"
        fill="currentColor"
      />
      <circle cx="12" cy="8" r="3" fill="white" opacity="0.5" />
    </svg>
  );
}

// ============================================================================
// TYPES & DATA
// ============================================================================

interface Service {
  id: string;
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>;
  href: string;
  category: 'preventive' | 'cosmetic' | 'restorative' | 'specialized';
  featured?: boolean;
  gradient: string;
  image: string;
  benefits: string[];
}

const categories = [
  { id: 'all', label: 'All Services', icon: Star, color: '#722F37' },
  { id: 'preventive', label: 'Preventive Care', icon: ToothbrushIcon, color: '#10b981' },
  { id: 'cosmetic', label: 'Cosmetic', icon: SparkleToothIcon, color: '#8b5cf6' },
  { id: 'restorative', label: 'Restorative', icon: ImplantIcon, color: '#3b82f6' },
  { id: 'specialized', label: 'Specialized', icon: SurgeryIcon, color: '#ef4444' },
];

const allServices: Service[] = [
  {
    id: 'routine-checkups',
    title: 'Routine Checkups',
    description: 'Comprehensive care including cleanings, exams, and preventive treatments to maintain your oral health.',
    Icon: DentalMirrorIcon,
    href: '/services/routine-checkups',
    category: 'preventive',
    featured: true,
    gradient: 'from-emerald-500 to-teal-600',
    image: '/images/clinic/clinic-02.jpg',
    benefits: ['Early problem detection', 'Professional cleaning', 'Personalized care plan'],
  },
  {
    id: 'dental-hygiene',
    title: 'Dental Hygiene',
    description: 'Professional cleanings and hygiene treatments to keep your teeth and gums healthy.',
    Icon: ToothbrushIcon,
    href: '/services/dental-hygiene',
    category: 'preventive',
    gradient: 'from-cyan-500 to-blue-600',
    image: '/images/hygiene/hygiene-01.jpg',
    benefits: ['Plaque removal', 'Gum health', 'Fresh breath'],
  },
  {
    id: 'preventive-dentistry',
    title: 'Preventive Dentistry',
    description: 'Fluoride treatments, sealants, and oral cancer screenings to protect your smile for years to come.',
    Icon: ToothIcon,
    href: '/services/preventive-dentistry',
    category: 'preventive',
    gradient: 'from-blue-500 to-indigo-600',
    image: '/images/clinic/clinic-01.jpg',
    benefits: ['Cavity prevention', 'Long-term protection', 'Health screenings'],
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with teeth whitening, veneers, bonding, and other aesthetic treatments for a radiant look.',
    Icon: SparkleToothIcon,
    href: '/services/cosmetic-dentistry',
    category: 'cosmetic',
    featured: true,
    gradient: 'from-pink-500 to-rose-600',
    image: '/images/cosmetic/cosmetic-02.jpg',
    benefits: ['Brighter smile', 'Improved confidence', 'Natural-looking results'],
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments to brighten your smile. Achieve noticeable results safely and effectively.',
    Icon: SparkleToothIcon,
    href: '/services/teeth-whitening',
    category: 'cosmetic',
    gradient: 'from-amber-400 to-orange-500',
    image: '/images/cosmetic/cosmetic-04.jpg',
    benefits: ['Up to 8 shades whiter', 'Safe procedure', 'Long-lasting results'],
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description: 'Straighten your teeth discreetly with clear aligners. A comfortable alternative to traditional braces.',
    Icon: InvisalignIcon,
    href: '/services/invisalign',
    category: 'cosmetic',
    featured: true,
    gradient: 'from-violet-500 to-purple-600',
    image: '/images/cosmetic/cosmetic-05.jpg',
    benefits: ['Nearly invisible', 'Removable aligners', 'Comfortable fit'],
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    Icon: ImplantIcon,
    href: '/services/dental-implants',
    category: 'restorative',
    featured: true,
    gradient: 'from-slate-500 to-zinc-700',
    image: '/images/implants/implants-01.jpg',
    benefits: ['Permanent solution', 'Natural appearance', 'Bone preservation'],
  },
  {
    id: 'dentures',
    title: 'Dentures',
    description: 'Custom-fitted dentures to restore your smile and confidence. Full and partial options available.',
    Icon: DentureIcon,
    href: '/services/dentures',
    category: 'restorative',
    gradient: 'from-rose-400 to-pink-500',
    image: '/images/seniors/seniors-01.jpg',
    benefits: ['Custom fit', 'Natural look', 'Improved chewing'],
  },
  {
    id: 'missing-teeth',
    title: 'Missing Teeth Solutions',
    description: 'Comprehensive options for replacing missing teeth including bridges, implants, and dentures.',
    Icon: ToothIcon,
    href: '/services/missing-teeth',
    category: 'restorative',
    gradient: 'from-indigo-500 to-blue-600',
    image: '/images/implants/implants-02.jpg',
    benefits: ['Multiple options', 'Restored function', 'Complete smile'],
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    description: 'Save damaged or infected teeth with gentle root canal treatment to relieve pain and preserve your natural smile.',
    Icon: RootCanalIcon,
    href: '/services/root-canal',
    category: 'specialized',
    gradient: 'from-red-500 to-rose-600',
    image: '/images/clinic/clinic-03.jpg',
    benefits: ['Pain relief', 'Save natural tooth', 'Prevent extraction'],
  },
  {
    id: 'white-fillings',
    title: 'White Fillings',
    description: 'Natural-looking composite fillings that blend seamlessly with your teeth for a beautiful, healthy smile.',
    Icon: FillingIcon,
    href: '/services/white-fillings',
    category: 'restorative',
    gradient: 'from-sky-400 to-blue-500',
    image: '/images/clinic/clinic-04.jpg',
    benefits: ['Invisible repair', 'Mercury-free', 'Durable'],
  },
  {
    id: 'gum-therapy',
    title: 'Gum Therapy',
    description: 'Treatment for gum disease and periodontal issues to restore your gum health and protect your teeth.',
    Icon: GumIcon,
    href: '/services/gum-therapy',
    category: 'specialized',
    gradient: 'from-pink-500 to-red-500',
    image: '/images/clinic/clinic-05.jpg',
    benefits: ['Healthier gums', 'Reduced inflammation', 'Tooth protection'],
  },
  {
    id: 'oral-surgery',
    title: 'Oral Surgery',
    description: 'Safe and comfortable surgical procedures including extractions and wisdom teeth removal.',
    Icon: SurgeryIcon,
    href: '/services/oral-surgery',
    category: 'specialized',
    gradient: 'from-slate-600 to-gray-700',
    image: '/images/clinic/clinic-06.jpg',
    benefits: ['Expert care', 'Modern techniques', 'Quick recovery'],
  },
  {
    id: 'childrens-dentistry',
    title: "Children's Dentistry",
    description: 'Gentle, kid-friendly dental care creating positive experiences for children of all ages.',
    Icon: ChildToothIcon,
    href: '/services/childrens-dentistry',
    category: 'specialized',
    featured: true,
    gradient: 'from-yellow-400 to-orange-500',
    image: '/images/children/children-02.jpg',
    benefits: ['Fun environment', 'Gentle approach', 'Education focused'],
  },
  {
    id: 'emergency-care',
    title: 'Emergency Care',
    description: 'Same-day emergency appointments for toothaches, broken teeth, and urgent dental issues.',
    Icon: EmergencyToothIcon,
    href: '/services/emergency-care',
    category: 'specialized',
    featured: true,
    gradient: 'from-red-600 to-rose-700',
    image: '/images/emergency/emergency-01.jpg',
    benefits: ['Same-day appointments', '24/7 support', 'Immediate relief'],
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
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
    </div>
  );
}

// ============================================================================
// HERO SECTION WITH IMAGERY
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

  const featuredServices = allServices.filter(s => s.featured).slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#FFFBF8] via-white to-[#FDF8F3]"
    >
      <FloatingOrbs />

      {/* Hero Image Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <Image
            src="/images/clinic/clinic-01.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white" />
        </div>
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="hover:text-[#722F37] transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                <span className="text-[#722F37] font-medium">Services</span>
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <ToothIcon className="w-8 h-8 text-[#722F37]" />
                <span className="text-[#722F37] text-sm font-semibold tracking-[0.2em] uppercase">
                  Comprehensive Care
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block text-neutral-900">Our Dental</span>
                <span className="block text-[#722F37]">Services</span>
              </motion.h1>

              <motion.p
                className="text-xl text-neutral-600 max-w-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                From routine checkups to advanced treatments, we provide comprehensive
                dental care for your entire family with compassion and expertise.
              </motion.p>

              {/* Stats with Icons */}
              <motion.div
                className="flex flex-wrap gap-8 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {[
                  { value: '15+', label: 'Services', icon: ToothIcon },
                  { value: '20+', label: 'Years', icon: Award },
                  { value: '6', label: 'Dentists', icon: Users },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-[#722F37]">{stat.value}</span>
                      <span className="text-sm text-neutral-500">{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link
                  href="/contact#book"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#722F37] text-white rounded-xl font-semibold hover:bg-[#5a252c] transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Link>
                <Link
                  href="tel:6137331118"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#722F37] text-[#722F37] rounded-xl font-semibold hover:bg-[#722F37]/5 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-1118
                </Link>
              </motion.div>
            </div>

            {/* Right: Featured Services Preview Cards */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                {/* Floating tooth illustration */}
                <motion.div
                  className="absolute -top-8 -left-8 w-24 h-24 text-[#722F37]/20"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ToothIcon className="w-full h-full" />
                </motion.div>

                <div className="space-y-4">
                  {featuredServices.map((service, index) => (
                    <FeaturedServicePreview key={service.id} service={service} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
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
  const Icon = service.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={service.href} className="group block">
        <motion.div
          className="relative flex items-center gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-neutral-100 shadow-lg overflow-hidden"
          whileHover={{ x: 8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Service Image */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={service.image}
              alt={`${service.title} service`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-40`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-[#722F37] transition-colors truncate">
              {service.title}
            </h3>
            <p className="text-sm text-neutral-500 line-clamp-1">{service.description}</p>
            <div className="flex items-center gap-1 mt-1 text-[#722F37] text-sm font-medium">
              <span>Learn more</span>
              <motion.div animate={{ x: isHovered ? 4 : 0 }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Featured badge */}
          <div className="absolute top-2 right-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// CATEGORY FILTER WITH DENTAL ICONS
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
      className="sticky top-20 z-30 py-4 bg-white/95 backdrop-blur-xl border-b border-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 text-neutral-500 text-sm mr-2">
            <Filter className="w-4 h-4" aria-hidden="true" />
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
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
                    layoutId="activeCategory"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`relative w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                <span className="relative">{category.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// ENHANCED SERVICE CARD WITH IMAGE AND ICONS
// ============================================================================

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = service.Icon;

  return (
    <motion.div
      ref={ref}
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
          className="relative h-full bg-white rounded-3xl border border-[#EDE5DD] overflow-hidden shadow-[0_4px_24px_-8px_rgba(114,47,55,0.08)]"
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Service Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={service.image}
              alt={`${service.title} - dental service`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 group-hover:opacity-50 transition-opacity`} />

            {/* Icon overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
            </motion.div>

            {/* Featured badge */}
            {service.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#722F37] text-xs font-semibold">
                <Star className="w-3 h-3 fill-current" />
                Popular
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-[#722F37] transition-colors mb-2">
              {service.title}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Benefits with checkmarks */}
            <ul className="space-y-2 mb-4">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-neutral-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Learn more link */}
            <motion.div
              className="flex items-center gap-2 text-[#722F37] font-semibold"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span>Learn more</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: 'left' }}
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
          <div className="flex items-center gap-3 mb-2">
            {activeCategory !== 'all' && (
              <div className="w-10 h-10 rounded-xl bg-[#722F37]/10 flex items-center justify-center">
                {(() => {
                  const cat = categories.find(c => c.id === activeCategory);
                  if (cat) {
                    const CatIcon = cat.icon;
                    return <CatIcon className="w-5 h-5 text-[#722F37]" />;
                  }
                  return null;
                })()}
              </div>
            )}
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
              {activeCategory === 'all' ? 'All Services' : categories.find(c => c.id === activeCategory)?.label}
            </h2>
          </div>
          <p className="mt-2 text-neutral-600">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
          </p>
        </motion.div>

        {/* Services Grid */}
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
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// PROCESS ILLUSTRATION SECTION
// ============================================================================

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Schedule online or call us. We offer flexible hours including evenings.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: DentalMirrorIcon,
      title: 'Consultation',
      description: 'Meet your dentist for a comprehensive exam and personalized care plan.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: ToothIcon,
      title: 'Treatment',
      description: 'Receive expert care using the latest techniques and technology.',
      color: 'from-[#722F37] to-[#8B3A42]',
    },
    {
      icon: SparkleToothIcon,
      title: 'Beautiful Smile',
      description: 'Enjoy your healthy, confident smile with ongoing support.',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#FFFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-semibold mb-4">
            <Clock className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Your Journey to a Healthier Smile
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We've made dental care simple and stress-free. Here's what to expect when you visit us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-neutral-200 to-neutral-100" />
                )}

                {/* Step number */}
                <div className="relative inline-block mb-4">
                  <motion.div
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Icon className="w-12 h-12 text-white" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#722F37] font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION WITH IMAGERY
// ============================================================================

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const magnetic = useMagnetic(0.2);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/clinic/clinic-07.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/95 via-[#8B3A42]/90 to-[#722F37]/95" />
      </div>

      {/* Floating dental icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[ToothIcon, SparkleToothIcon, ToothbrushIcon, DentalMirrorIcon].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              top: `${15 + index * 20}%`,
              left: `${5 + index * 25}%`,
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
            <Icon className="w-16 h-16" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <ToothIcon className="w-16 h-16 text-white/80" />
          </motion.div>

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
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <EmergencyToothIcon className="w-6 h-6 text-red-200" />
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
// DESKTOP CONTENT COMPONENT
// ============================================================================

function ServicesPageDesktop() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <HeroSection />
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <ServicesGrid activeCategory={activeCategory} />
      <ProcessSection />
      <CTASection />
    </main>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT WITH RESPONSIVE WRAPPER
// ============================================================================

export default function ServicesPage() {
  return (
    <ResponsiveWrapper
      desktop={<ServicesPageDesktop />}
      mobile={<ServicesPageMobile />}
    />
  );
}
