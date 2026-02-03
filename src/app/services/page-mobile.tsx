'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Phone,
  Star,
  ChevronDown,
  Clock,
  CheckCircle2,
  Sparkles,
  Shield,
  Heart,
  Users,
  Award,
  Zap,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

// ============================================================================
// ANIMATION VARIANTS - Premium mobile animations
// ============================================================================

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ============================================================================
// CUSTOM DENTAL SVG ICONS - Premium dental visuals
// ============================================================================

function ToothIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function ToothbrushIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function DentalMirrorIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" fill="currentColor" />
      <circle cx="8" cy="8" r="4" fill="white" opacity="0.3" />
      <path d="M12 12L20 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SparkleToothIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function ImplantIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10.5 2 9 3 9 4.5V6H15V4.5C15 3 13.5 2 12 2Z" fill="currentColor" />
      <rect x="9" y="6" width="6" height="2" fill="currentColor" opacity="0.8" />
      <path d="M10 8H14L13.5 11H10.5L10 8Z" fill="currentColor" opacity="0.9" />
      <path d="M10.5 11H13.5L13 14H11L10.5 11Z" fill="currentColor" opacity="0.8" />
      <path d="M11 14H13L12.5 18H11.5L11 14Z" fill="currentColor" opacity="0.7" />
      <path d="M11.5 18H12.5L12 22L11.5 18Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function DentureIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function RootCanalIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5.5 10.5C6 13 6.5 15 6 17.5C5.5 20 6.5 22 8.5 22C10 22 10.5 20.5 11 18.5C11.3 17 11.7 16 12 16C12.3 16 12.7 17 13 18.5C13.5 20.5 14 22 15.5 22C17.5 22 18.5 20 18 17.5C17.5 15 18 13 18.5 10.5C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M12 8V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}

function EmergencyToothIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function ChildToothIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function InvisalignIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function GumIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function SurgeryIcon({ className = 'w-8 h-8' }: { className?: string }) {
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

function FillingIcon({ className = 'w-8 h-8' }: { className?: string }) {
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
  shortDescription: string;
  Icon: React.FC<{ className?: string }>;
  href: string;
  category: 'preventive' | 'cosmetic' | 'restorative' | 'specialized';
  featured?: boolean;
  gradient: string;
  accentColor: string;
  image: string;
  benefits: string[];
}

const categories = [
  { id: 'all', label: 'All', icon: Star, color: '#722F37', bg: 'from-[#722F37] to-[#8B3A42]' },
  { id: 'preventive', label: 'Preventive', icon: ToothbrushIcon, color: '#10b981', bg: 'from-emerald-500 to-teal-600' },
  { id: 'cosmetic', label: 'Cosmetic', icon: SparkleToothIcon, color: '#8b5cf6', bg: 'from-violet-500 to-purple-600' },
  { id: 'restorative', label: 'Restorative', icon: ImplantIcon, color: '#3b82f6', bg: 'from-blue-500 to-indigo-600' },
  { id: 'specialized', label: 'Specialized', icon: SurgeryIcon, color: '#ef4444', bg: 'from-red-500 to-rose-600' },
];

const allServices: Service[] = [
  {
    id: 'routine-checkups',
    title: 'Routine Checkups',
    description: 'Comprehensive care including cleanings, exams, and preventive treatments to maintain your oral health.',
    shortDescription: 'Cleanings, exams & preventive care',
    Icon: DentalMirrorIcon,
    href: '/services/routine-checkups',
    category: 'preventive',
    featured: true,
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: '#10b981',
    image: 'https://images.pexels.com/photos/3845759/pexels-photo-3845759.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Early detection', 'Professional cleaning', 'Care plan'],
  },
  {
    id: 'dental-hygiene',
    title: 'Dental Hygiene',
    description: 'Professional cleanings and hygiene treatments to keep your teeth and gums healthy.',
    shortDescription: 'Professional hygiene care',
    Icon: ToothbrushIcon,
    href: '/services/dental-hygiene',
    category: 'preventive',
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: '#06b6d4',
    image: 'https://images.pexels.com/photos/6627411/pexels-photo-6627411.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Plaque removal', 'Gum health', 'Fresh breath'],
  },
  {
    id: 'preventive-dentistry',
    title: 'Preventive Dentistry',
    description: 'Fluoride treatments, sealants, and oral cancer screenings to protect your smile for years to come.',
    shortDescription: 'Protect your smile long-term',
    Icon: ToothIcon,
    href: '/services/preventive-dentistry',
    category: 'preventive',
    gradient: 'from-blue-500 to-indigo-600',
    accentColor: '#3b82f6',
    image: 'https://images.pexels.com/photos/6812507/pexels-photo-6812507.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Cavity prevention', 'Long-term protection', 'Screenings'],
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with teeth whitening, veneers, bonding, and other aesthetic treatments for a radiant look.',
    shortDescription: 'Transform your smile',
    Icon: SparkleToothIcon,
    href: '/services/cosmetic-dentistry',
    category: 'cosmetic',
    featured: true,
    gradient: 'from-pink-500 to-rose-600',
    accentColor: '#ec4899',
    image: 'https://images.pexels.com/photos/3762434/pexels-photo-3762434.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Brighter smile', 'Confidence boost', 'Natural results'],
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments to brighten your smile. Achieve noticeable results safely and effectively.',
    shortDescription: 'Brighten your smile safely',
    Icon: SparkleToothIcon,
    href: '/services/teeth-whitening',
    category: 'cosmetic',
    gradient: 'from-amber-400 to-orange-500',
    accentColor: '#f59e0b',
    image: 'https://images.pexels.com/photos/3762441/pexels-photo-3762441.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['8 shades whiter', 'Safe', 'Long-lasting'],
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description: 'Straighten your teeth discreetly with clear aligners. A comfortable alternative to traditional braces.',
    shortDescription: 'Clear aligners for straighter teeth',
    Icon: InvisalignIcon,
    href: '/services/invisalign',
    category: 'cosmetic',
    featured: true,
    gradient: 'from-violet-500 to-purple-600',
    accentColor: '#8b5cf6',
    image: 'https://images.pexels.com/photos/3762410/pexels-photo-3762410.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Nearly invisible', 'Removable', 'Comfortable'],
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    shortDescription: 'Permanent tooth replacement',
    Icon: ImplantIcon,
    href: '/services/dental-implants',
    category: 'restorative',
    featured: true,
    gradient: 'from-slate-500 to-zinc-700',
    accentColor: '#64748b',
    image: 'https://images.pexels.com/photos/6502623/pexels-photo-6502623.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Permanent', 'Natural look', 'Bone preservation'],
  },
  {
    id: 'dentures',
    title: 'Dentures',
    description: 'Custom-fitted dentures to restore your smile and confidence. Full and partial options available.',
    shortDescription: 'Custom-fitted smile restoration',
    Icon: DentureIcon,
    href: '/services/dentures',
    category: 'restorative',
    gradient: 'from-rose-400 to-pink-500',
    accentColor: '#fb7185',
    image: 'https://images.pexels.com/photos/3845843/pexels-photo-3845843.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Custom fit', 'Natural look', 'Better chewing'],
  },
  {
    id: 'missing-teeth',
    title: 'Missing Teeth',
    description: 'Comprehensive options for replacing missing teeth including bridges, implants, and dentures.',
    shortDescription: 'Multiple replacement options',
    Icon: ToothIcon,
    href: '/services/missing-teeth',
    category: 'restorative',
    gradient: 'from-indigo-500 to-blue-600',
    accentColor: '#6366f1',
    image: 'https://images.pexels.com/photos/6627342/pexels-photo-6627342.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Multiple options', 'Restored function', 'Complete smile'],
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    description: 'Save damaged or infected teeth with gentle root canal treatment to relieve pain and preserve your natural smile.',
    shortDescription: 'Save your natural teeth',
    Icon: RootCanalIcon,
    href: '/services/root-canal',
    category: 'specialized',
    gradient: 'from-red-500 to-rose-600',
    accentColor: '#ef4444',
    image: 'https://images.pexels.com/photos/6629413/pexels-photo-6629413.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Pain relief', 'Save tooth', 'Prevent extraction'],
  },
  {
    id: 'white-fillings',
    title: 'White Fillings',
    description: 'Natural-looking composite fillings that blend seamlessly with your teeth for a beautiful, healthy smile.',
    shortDescription: 'Natural-looking tooth repair',
    Icon: FillingIcon,
    href: '/services/white-fillings',
    category: 'restorative',
    gradient: 'from-sky-400 to-blue-500',
    accentColor: '#38bdf8',
    image: 'https://images.pexels.com/photos/6812476/pexels-photo-6812476.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Invisible', 'Mercury-free', 'Durable'],
  },
  {
    id: 'gum-therapy',
    title: 'Gum Therapy',
    description: 'Treatment for gum disease and periodontal issues to restore your gum health and protect your teeth.',
    shortDescription: 'Restore gum health',
    Icon: GumIcon,
    href: '/services/gum-therapy',
    category: 'specialized',
    gradient: 'from-pink-500 to-red-500',
    accentColor: '#ec4899',
    image: 'https://images.pexels.com/photos/9957423/pexels-photo-9957423.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Healthier gums', 'Less inflammation', 'Tooth protection'],
  },
  {
    id: 'oral-surgery',
    title: 'Oral Surgery',
    description: 'Safe and comfortable surgical procedures including extractions and wisdom teeth removal.',
    shortDescription: 'Expert surgical procedures',
    Icon: SurgeryIcon,
    href: '/services/oral-surgery',
    category: 'specialized',
    gradient: 'from-slate-600 to-gray-700',
    accentColor: '#475569',
    image: 'https://images.pexels.com/photos/9957422/pexels-photo-9957422.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Expert care', 'Modern tech', 'Quick recovery'],
  },
  {
    id: 'childrens-dentistry',
    title: "Children's Dentistry",
    description: 'Gentle, kid-friendly dental care creating positive experiences for children of all ages.',
    shortDescription: 'Kid-friendly dental care',
    Icon: ChildToothIcon,
    href: '/services/childrens-dentistry',
    category: 'specialized',
    featured: true,
    gradient: 'from-yellow-400 to-orange-500',
    accentColor: '#fbbf24',
    image: 'https://images.pexels.com/photos/6627278/pexels-photo-6627278.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Fun environment', 'Gentle approach', 'Education focused'],
  },
  {
    id: 'emergency-care',
    title: 'Emergency Care',
    description: 'Same-day emergency appointments for toothaches, broken teeth, and urgent dental issues.',
    shortDescription: 'Same-day urgent care',
    Icon: EmergencyToothIcon,
    href: '/services/emergency-care',
    category: 'specialized',
    featured: true,
    gradient: 'from-red-600 to-rose-700',
    accentColor: '#dc2626',
    image: 'https://images.pexels.com/photos/14235194/pexels-photo-14235194.jpeg?auto=compress&cs=tinysrgb&w=800',
    benefits: ['Same-day', '24/7 support', 'Immediate relief'],
  },
];

// ============================================================================
// PREMIUM FLOATING ORBS - Animated background
// ============================================================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(114,47,55,0.12) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/4 -left-20 w-56 h-56 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 60%)',
        }}
        animate={{ y: [0, 25, 0], x: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)',
        }}
        animate={{ y: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ============================================================================
// PREMIUM DOT PATTERN
// ============================================================================

function DotPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]" aria-hidden="true">
      <svg className="w-full h-full">
        <pattern id="mobile-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" className="text-[#722F37]" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#mobile-dots)" />
      </svg>
    </div>
  );
}

// ============================================================================
// MOBILE HERO SECTION - IMMERSIVE FULL-SCREEN DESIGN
// ============================================================================

function MobileHeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Image with Premium Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3762408/pexels-photo-3762408.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Beautiful confident smile"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        {/* Multi-layer premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#722F37] via-[#722F37]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#722F37] to-transparent" />
      </div>

      <FloatingOrbs />

      {/* Animated sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-5 pb-10 pt-20"
        style={{ scale, y }}
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Premium Badge */}
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/12 backdrop-blur-xl border border-white/20 mb-5 shadow-lg shadow-black/10"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
          </motion.div>
          <span className="text-white/95 text-sm font-semibold tracking-wide">Comprehensive Dental Care</span>
        </motion.div>

        {/* Main Headline with animated underline */}
        <motion.h1
          variants={fadeInUp}
          className="text-[2.75rem] leading-[1.05] font-bold text-white tracking-tight mb-4"
        >
          Our Dental{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white">
              Services
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-amber-400/40 to-orange-400/40 rounded-full blur-sm"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-white/75 text-[1.0625rem] leading-relaxed mb-7 max-w-[320px]"
        >
          From routine checkups to advanced treatments, compassionate care for your entire family.
        </motion.p>

        {/* Premium Stats Row */}
        <motion.div variants={fadeInUp} className="flex gap-2.5 mb-7">
          {[
            { value: '15+', label: 'Services', Icon: ToothIcon, gradient: 'from-emerald-400/20 to-teal-400/20' },
            { value: '20+', label: 'Years', Icon: Award, gradient: 'from-amber-400/20 to-orange-400/20' },
            { value: '6', label: 'Dentists', Icon: Users, gradient: 'from-violet-400/20 to-purple-400/20' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`flex-1 flex flex-col items-center justify-center py-4 px-2 bg-gradient-to-br ${stat.gradient} backdrop-blur-xl rounded-2xl border border-white/15 shadow-lg shadow-black/10`}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <stat.Icon className="w-5 h-5 text-white/80 mb-1.5" />
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-[11px] text-white/60 font-medium tracking-wide uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={fadeInUp} className="space-y-3">
          <Link href="/contact#book" className="block">
            <motion.div
              className="relative flex items-center justify-center gap-3 w-full py-4.5 bg-white text-[#722F37] rounded-2xl font-bold text-[15px] shadow-2xl shadow-black/25 overflow-hidden"
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />
              <Calendar className="w-5 h-5 relative" />
              <span className="relative">Book Appointment</span>
              <ArrowRight className="w-4 h-4 relative" />
            </motion.div>
          </Link>
          <Link href="tel:6137331118" className="block">
            <motion.div
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/10 backdrop-blur-md text-white/95 rounded-2xl font-semibold text-sm border border-white/15"
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-4 h-4" />
              (613) 733-1118
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">Explore</span>
          <div className="w-6 h-9 rounded-full border-2 border-white/25 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 rounded-full bg-white/50"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ============================================================================
// MOBILE CATEGORY PILLS - PREMIUM PILL DESIGN
// ============================================================================

function MobileCategoryPills({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="sticky top-0 z-40 bg-white/98 backdrop-blur-2xl border-b border-neutral-100/80 shadow-sm shadow-neutral-200/50">
      <div className="flex gap-2.5 overflow-x-auto px-5 py-4 scrollbar-hide">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all min-h-[52px] ${
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-neutral-600 bg-neutral-100/90 active:bg-neutral-200'
              }`}
              style={{
                boxShadow: isActive ? `0 10px 30px -6px ${category.color}50` : undefined,
              }}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${category.bg} rounded-2xl`}
                  layoutId="activeCategoryPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <Icon className={`relative w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              <span className="relative">{category.label}</span>
              {isActive && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// FEATURED SERVICE SHOWCASE - HORIZONTAL CAROUSEL
// ============================================================================

function FeaturedServicesShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const featuredServices = allServices.filter((s) => s.featured);

  return (
    <section ref={ref} className="py-8 bg-gradient-to-b from-white to-neutral-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="px-5 mb-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <motion.div
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Star className="w-4 h-4 text-white fill-white" />
          </motion.div>
          <span className="text-[#722F37] text-xs font-bold tracking-wider uppercase">Popular</span>
        </div>
        <h2 className="text-xl font-bold text-neutral-900">Featured Services</h2>
      </motion.div>

      {/* Horizontal Scroll Carousel */}
      <div className="flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-hide snap-x snap-mandatory">
        {featuredServices.map((service, index) => {
          const Icon = service.Icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <Link href={service.href}>
                <motion.div
                  className="relative h-[200px] rounded-3xl overflow-hidden shadow-xl"
                  whileTap={{ scale: 0.97 }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30`} />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                        style={{ boxShadow: `0 8px 16px -4px ${service.accentColor}60` }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">{service.title}</h3>
                        <p className="text-white/70 text-xs">{service.shortDescription}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-white/80 text-xs font-medium">
                      <span>Learn more</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Star badge */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// MOBILE SERVICE CARD - ULTRA-PREMIUM DESIGN
// ============================================================================

function MobileServiceCard({
  service,
  isExpanded,
  onToggle,
  index,
}: {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = service.Icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      layout
      className="group"
    >
      <motion.div
        className={`relative bg-white rounded-[1.75rem] overflow-hidden transition-all ${
          isExpanded
            ? 'shadow-2xl shadow-neutral-300/50'
            : 'shadow-lg shadow-neutral-200/40'
        }`}
        style={{
          border: `1.5px solid ${isExpanded ? service.accentColor + '35' : '#f0f0f0'}`,
        }}
        layout
      >
        {/* Collapsed Header */}
        <motion.button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-4 text-left min-h-[88px] active:bg-neutral-50/50 transition-colors"
          aria-expanded={isExpanded}
          whileTap={{ scale: 0.99 }}
        >
          {/* Icon Container with Premium Gradient */}
          <motion.div
            className={`relative w-[68px] h-[68px] rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}
            style={{ boxShadow: `0 10px 24px -6px ${service.accentColor}50` }}
            whileTap={{ scale: 0.95, rotate: -2 }}
          >
            <Icon className="w-8 h-8 text-white" />
            {service.featured && (
              <motion.div
                className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Star className="w-3.5 h-3.5 text-white fill-white" />
              </motion.div>
            )}
          </motion.div>

          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-neutral-900 mb-0.5 leading-tight">
              {service.title}
            </h3>
            <p className="text-[13px] text-neutral-500 line-clamp-2 leading-snug">
              {service.shortDescription}
            </p>
          </div>

          {/* Expand Indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.35, type: 'spring', stiffness: 300 }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isExpanded
                ? `bg-gradient-to-br ${service.gradient}`
                : 'bg-neutral-100'
            }`}
          >
            <ChevronDown className={`w-4 h-4 ${isExpanded ? 'text-white' : 'text-neutral-500'}`} />
          </motion.div>
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            >
              <div className="px-4 pb-5 space-y-4">
                {/* Service Image with overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative h-48 rounded-2xl overflow-hidden"
                >
                  <Image
                    src={service.image}
                    alt={`${service.title} service`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`} />
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-[14px] text-neutral-600 leading-relaxed"
                >
                  {service.description}
                </motion.p>

                {/* Benefits List - Pill style */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2"
                >
                  {service.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.06 }}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100/80 rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-[12px] font-semibold text-neutral-700">{benefit}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href={service.href}>
                    <motion.div
                      className={`relative flex items-center justify-center gap-2.5 w-full py-4 bg-gradient-to-r ${service.gradient} text-white rounded-2xl font-bold text-[14px] overflow-hidden`}
                      style={{ boxShadow: `0 12px 28px -6px ${service.accentColor}55` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      />
                      <span className="relative">Learn More</span>
                      <ArrowRight className="w-4 h-4 relative" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MOBILE SERVICES LIST
// ============================================================================

function MobileServicesList({ activeCategory }: { activeCategory: string }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const filteredServices =
    activeCategory === 'all'
      ? allServices
      : allServices.filter((s) => s.category === activeCategory);

  return (
    <section ref={ref} className="px-5 py-8 bg-gradient-to-b from-neutral-50/50 via-white to-[#FDF8F3]/40">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            {activeCategory === 'all'
              ? 'All Services'
              : categories.find((c) => c.id === activeCategory)?.label}
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <motion.div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${
              categories.find((c) => c.id === activeCategory)?.color
            }18, ${categories.find((c) => c.id === activeCategory)?.color}08)`,
          }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {(() => {
            const cat = categories.find((c) => c.id === activeCategory);
            if (cat) {
              const CatIcon = cat.icon;
              return <CatIcon className="w-5 h-5" style={{ color: cat.color }} />;
            }
            return null;
          })()}
        </motion.div>
      </motion.div>

      {/* Services List */}
      <motion.div className="space-y-4" layout>
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => (
            <MobileServiceCard
              key={service.id}
              service={service}
              isExpanded={expandedId === service.id}
              onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// ============================================================================
// MOBILE PROCESS SECTION - PREMIUM TIMELINE DESIGN
// ============================================================================

function MobileProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const steps = [
    {
      icon: Calendar,
      title: 'Book',
      description: 'Schedule online or call us',
      gradient: 'from-blue-500 to-indigo-600',
      color: '#3b82f6',
    },
    {
      icon: DentalMirrorIcon,
      title: 'Consult',
      description: 'Meet your caring dentist',
      gradient: 'from-emerald-500 to-teal-600',
      color: '#10b981',
    },
    {
      icon: ToothIcon,
      title: 'Treat',
      description: 'Receive expert care',
      gradient: 'from-[#722F37] to-[#8B3A42]',
      color: '#722F37',
    },
    {
      icon: SparkleToothIcon,
      title: 'Smile',
      description: 'Enjoy your results',
      gradient: 'from-amber-500 to-orange-600',
      color: '#f59e0b',
    },
  ];

  return (
    <section ref={ref} className="py-12 bg-gradient-to-b from-[#FDF8F3]/60 to-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="px-5 mb-8"
      >
        <div className="flex items-center gap-2.5 mb-2">
          <motion.div
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#722F37] to-[#8B3A42] flex items-center justify-center shadow-lg shadow-[#722F37]/25"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Zap className="w-4.5 h-4.5 text-white" />
          </motion.div>
          <span className="text-[#722F37] text-xs font-bold tracking-wider uppercase">Simple Process</span>
        </div>
        <h2 className="text-[1.625rem] font-bold text-neutral-900 leading-tight">
          Your Path to a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#a04050]">
            Healthier Smile
          </span>
        </h2>
      </motion.div>

      {/* Horizontal Scroll Steps */}
      <div className="flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-hide snap-x">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="flex-shrink-0 w-[150px] snap-start"
            >
              <motion.div
                className="relative bg-white rounded-[1.5rem] p-5 shadow-xl shadow-neutral-200/60 border border-neutral-100/80"
                whileTap={{ scale: 0.97 }}
              >
                {/* Step Number Badge */}
                <motion.div
                  className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)` }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  style={{ boxShadow: `0 10px 24px -6px ${step.color}45` }}
                  whileTap={{ rotate: 5, scale: 1.05 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-[15px] font-bold text-neutral-900 mb-1">{step.title}</h3>
                <p className="text-[12px] text-neutral-500 leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// WHY CHOOSE US SECTION - PREMIUM BENTO GRID
// ============================================================================

function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const features = [
    { icon: Shield, title: 'Trusted Care', description: '20+ years serving families', color: '#10b981', gradient: 'from-emerald-500 to-teal-600' },
    { icon: Heart, title: 'Gentle Touch', description: 'Comfort is our priority', color: '#ec4899', gradient: 'from-pink-500 to-rose-600' },
    { icon: Award, title: 'Expert Team', description: '6 skilled dentists', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600' },
    { icon: Clock, title: 'Flexible Hours', description: 'Evening & weekend slots', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600' },
  ];

  return (
    <section ref={ref} className="px-5 py-10 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Why Choose Us</h2>
        <p className="text-sm text-neutral-500">What makes our practice special</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3.5">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileTap={{ scale: 0.97 }}
              className="p-4 bg-gradient-to-br from-neutral-50 to-white rounded-2xl border border-neutral-100/80 shadow-sm"
            >
              <motion.div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 shadow-lg`}
                style={{ boxShadow: `0 8px 20px -5px ${feature.color}40` }}
                whileTap={{ rotate: 5 }}
              >
                <Icon className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="text-sm font-bold text-neutral-900 mb-0.5">{feature.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// MOBILE CTA SECTION - IMMERSIVE PREMIUM DESIGN
// ============================================================================

function MobileCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section ref={ref} className="relative mx-5 mb-8 rounded-[2rem] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/11515380/pexels-photo-11515380.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37]/95 via-[#8B3A42]/92 to-[#722F37]/95" />
        <DotPattern />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-6 right-6 text-white/8"
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
      >
        <ToothIcon className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-4 text-white/6"
        animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <SparkleToothIcon className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="relative z-10 p-7 pt-10"
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center mb-5"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
            <ToothIcon className="w-9 h-9 text-white" />
          </div>
        </motion.div>

        <h2 className="text-[1.625rem] font-bold text-white text-center mb-2.5 leading-tight">
          Ready to Get Started?
        </h2>
        <p className="text-sm text-white/80 text-center mb-7 max-w-[280px] mx-auto leading-relaxed">
          Book your appointment today and take the first step towards a healthier, more confident smile.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link href="/contact#book" className="block">
            <motion.div
              className="relative flex items-center justify-center gap-3 w-full py-4.5 bg-white text-[#722F37] rounded-2xl font-bold text-[15px] shadow-2xl overflow-hidden"
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#722F37]/10 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
              />
              <Calendar className="w-5 h-5 relative" />
              <span className="relative">Book Your Appointment</span>
            </motion.div>
          </Link>

          <Link href="tel:6137331118" className="block">
            <motion.div
              className="flex items-center justify-center gap-2.5 w-full py-4 bg-white/12 backdrop-blur-md text-white rounded-2xl font-semibold text-sm border border-white/20"
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-5 h-5" />
              (613) 733-1118
            </motion.div>
          </Link>
        </div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6 flex items-center gap-3 justify-center px-4 py-3.5 bg-red-500/20 border border-red-400/30 rounded-2xl"
        >
          <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <EmergencyToothIcon className="w-5 h-5 text-red-200" />
          </motion.div>
          <span className="text-white text-[13px]">
            <strong>Emergency?</strong> Same-day appointments available
          </span>
        </motion.div>

        {/* Location hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-2 text-white/60 text-xs"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Ottawa South • Serving families since 2003</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// STICKY BOTTOM NAVIGATION - PREMIUM FLOATING BAR
// ============================================================================

function StickyBottomNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="fixed bottom-0 left-0 right-0 p-4 pb-7 bg-white/98 backdrop-blur-2xl border-t border-neutral-100/80 z-50 shadow-2xl shadow-neutral-300/40"
        >
          <div className="flex gap-3">
            <Link href="/contact#book" className="flex-1">
              <motion.div
                className="relative flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white rounded-2xl font-bold text-[14px] overflow-hidden"
                style={{ boxShadow: '0 12px 28px -6px rgba(114,47,55,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <Calendar className="w-4 h-4 relative" />
                <span className="relative">Book Now</span>
              </motion.div>
            </Link>
            <Link href="tel:6137331118">
              <motion.div
                className="flex items-center justify-center gap-2 px-6 py-4 bg-neutral-100 text-neutral-700 rounded-2xl font-bold text-[14px]"
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" />
                Call
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN MOBILE PAGE COMPONENT
// ============================================================================

export default function ServicesPageMobile() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <main id="main-content" className="flex min-h-screen flex-col bg-white">
      <MobileHeroSection />
      <MobileCategoryPills activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      {activeCategory === 'all' && <FeaturedServicesShowcase />}
      <MobileServicesList activeCategory={activeCategory} />
      <MobileProcessSection />
      <WhyChooseUsSection />
      <MobileCTASection />
      <StickyBottomNav />

      {/* Bottom padding for sticky nav */}
      <div className="h-32" />
    </main>
  );
}
