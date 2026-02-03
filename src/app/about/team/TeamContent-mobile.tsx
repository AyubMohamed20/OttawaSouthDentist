'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Users,
  GraduationCap,
  Heart,
  Award,
  BookOpen,
  Sparkles,
  Phone,
  Calendar,
  X,
  Globe,
  Stethoscope,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Star,
  Clock,
  Shield,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

interface TeamMember {
  id: string;
  name: string;
  credentials: string;
  role: string;
  image: string;
  education: string[];
  specialties: string[];
  languages: string[];
  bio: string;
  interests?: string;
  isPracticeOwner?: boolean;
}

// ============================================================================
// DATA
// ============================================================================

const teamMembers: TeamMember[] = [
  {
    id: 'dr-sidhu',
    name: 'Dr. Harvinder Sidhu',
    credentials: 'DDS',
    role: 'Practice Owner & Lead Dentist',
    image: '/dr.sidhu.jpg',
    education: [
      'Doctor of Dental Surgery (DDS)',
      'Over 28 years of dental experience',
      'Continuing education in advanced dental techniques',
    ],
    specialties: [
      'Comprehensive Family Dentistry',
      'Restorative Dentistry',
      'Patient Education & Care Planning',
    ],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Dr. Harvinder Sidhu is the founder and practice owner of Ottawa South Dental, bringing over 28 years of dedicated experience to the Ottawa community. His philosophy centers on taking the time to explain procedures and treatment options thoroughly, ensuring every patient understands their oral health and feels confident in their care plan.',
    interests: 'Outside the office, Dr. Sidhu enjoys spending time with his family and contributing to community wellness initiatives.',
    isPracticeOwner: true,
  },
  {
    id: 'dr-sharma',
    name: 'Dr. Shivani Sharma',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/team-02.jpg',
    education: [
      'Doctor of Dental Surgery (DDS)',
      'Continuing education in cosmetic dentistry',
    ],
    specialties: [
      'General Dentistry',
      'Cosmetic Dentistry',
      'Preventive Care',
    ],
    languages: ['English', 'Hindi'],
    bio: 'Dr. Shivani Sharma brings a gentle, caring approach to dentistry that puts patients at ease from the moment they walk through our doors. With a passion for cosmetic dentistry and preventive care, she helps patients achieve and maintain beautiful, healthy smiles.',
    interests: "Dr. Sharma enjoys yoga, cooking, and exploring Ottawa's vibrant food scene.",
  },
  {
    id: 'dr-thawer',
    name: 'Dr. Salima Thawer',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/team-03.jpg',
    education: [
      'Doctor of Dental Surgery (DDS)',
      'Additional training in family dentistry',
    ],
    specialties: [
      'Family Dentistry',
      'Pediatric Dentistry',
      'Anxiety-Free Dentistry',
    ],
    languages: ['English', 'French', 'Swahili'],
    bio: 'Dr. Salima Thawer has a special gift for working with patients of all ages, from first-time young visitors to seniors. Her warm demeanor and patient communication style make her particularly effective at helping anxious patients feel comfortable.',
    interests: 'In her free time, Dr. Thawer volunteers with community health programs and enjoys hiking with her family.',
  },
  {
    id: 'dr-sehgal',
    name: 'Dr. Nancy Sehgal',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/team-04.jpg',
    education: [
      'Doctor of Dental Surgery (DDS)',
      'Advanced training in restorative procedures',
    ],
    specialties: [
      'Restorative Dentistry',
      'Root Canal Therapy',
      'Dental Crowns & Bridges',
    ],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: "Dr. Nancy Sehgal combines technical expertise with a compassionate approach to restorative dentistry. She specializes in helping patients restore damaged or decayed teeth to full function and beauty.",
    interests: 'Dr. Sehgal is an avid reader and enjoys classical music and gardening.',
  },
  {
    id: 'dr-joshi',
    name: 'Dr. Arti Joshi',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/team-05.jpg',
    education: [
      'Doctor of Dental Surgery (DDS)',
      'Specialized training in Invisalign',
    ],
    specialties: [
      'Invisalign Clear Aligners',
      'Orthodontic Treatments',
      'Teeth Whitening',
    ],
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: "Dr. Arti Joshi is passionate about helping patients achieve straighter, more confident smiles through modern orthodontic solutions. As a certified Invisalign provider, she offers patients a discreet alternative to traditional braces.",
    interests: 'Outside the clinic, Dr. Joshi enjoys photography, travel, and teaching community dental health workshops.',
  },
  {
    id: 'dr-almoaibed',
    name: 'Dr. Fatemah Almoaibed',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/team-06.jpg',
    education: [
      'Doctor of Dental Surgery (DDS)',
      'Training in dental implant procedures',
    ],
    specialties: [
      'Dental Implants',
      'Oral Surgery',
      'Gum Therapy',
    ],
    languages: ['English', 'Arabic'],
    bio: "Dr. Fatemah Almoaibed brings expertise in advanced procedures including dental implants and oral surgery. Her gentle technique and thorough explanations help patients feel confident when facing complex treatments.",
    interests: 'Dr. Almoaibed enjoys spending time with her family, cooking traditional dishes, and participating in cultural community events.',
  },
];

const philosophyPoints = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'Every treatment plan is tailored to your unique needs and goals.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Sparkles,
    title: 'Anxiety-Free Dentistry',
    description: 'We ensure your visits are relaxed, comfortable, and even enjoyable.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: BookOpen,
    title: 'Continuing Education',
    description: 'Our team stays current with the latest dental advancements.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Award,
    title: 'Modern Technology',
    description: 'State-of-the-art equipment for accurate diagnoses.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Users,
    title: 'Family-Friendly',
    description: 'Warm, personalized care for every family member.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Globe,
    title: 'Multilingual Care',
    description: "We speak multiple languages to serve Ottawa's community.",
    gradient: 'from-cyan-500 to-blue-600',
  },
];

const stats = [
  { value: '28+', label: 'Years Experience', icon: Clock },
  { value: '6', label: 'Expert Dentists', icon: Users },
  { value: '7+', label: 'Languages', icon: Globe },
  { value: '5★', label: 'Patient Rating', icon: Star },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const slideUp = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 30,
      stiffness: 300
    }
  },
  exit: {
    y: '100%',
    transition: { duration: 0.3, ease: 'easeInOut' as const }
  }
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-[#722F37]/10 to-rose-400/10 blur-3xl"
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: '-10%', right: '-20%' }}
    />
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-amber-300/10 to-orange-400/10 blur-3xl"
      animate={{
        x: [0, -20, 0],
        y: [0, 30, 0],
        scale: [1, 0.9, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      style={{ bottom: '10%', left: '-15%' }}
    />
  </div>
);

const DotPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
    <pattern id="team-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="currentColor" className="text-[#722F37]" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#team-dots)" />
  </svg>
);

// ============================================================================
// TEAM MEMBER CARD - Premium Mobile Design
// ============================================================================

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  onSelect: (member: TeamMember) => void;
}

function TeamMemberCard({ member, index, onSelect }: TeamMemberCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <motion.button
        onClick={() => onSelect(member)}
        className={cn(
          'w-full text-left',
          'bg-white rounded-2xl overflow-hidden',
          'shadow-[0_4px_20px_-4px_rgba(114,47,55,0.08)]',
          'border border-[#EDE5DD]/60',
          'active:scale-[0.98]',
          'transition-all duration-200'
        )}
        whileTap={{ scale: 0.98 }}
        aria-label={`View profile of ${member.name}`}
      >
        <div className="flex gap-4 p-4">
          {/* Avatar with gradient border */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#722F37] to-rose-400 rounded-2xl opacity-80" />
            <div className="relative w-20 h-20 rounded-[14px] overflow-hidden bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD]">
              <Image
                src={member.image}
                alt={`Photo of ${member.name}`}
                fill
                sizes="80px"
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-[#722F37]/30">
                  {member.name.split(' ').slice(1).map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Practice owner badge */}
            {member.isPracticeOwner && (
              <motion.div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 500 }}
              >
                <Star className="w-3.5 h-3.5 text-white fill-white" />
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 py-0.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-semibold text-[#1e293b] leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[#722F37] mt-0.5">
                  {member.credentials}
                </p>
              </div>
              <motion.div
                className="w-8 h-8 rounded-full bg-[#FDF8F3] flex items-center justify-center flex-shrink-0"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4 text-[#722F37]" />
              </motion.div>
            </div>

            <p className="text-xs text-[#64748b] mt-1 line-clamp-1">
              {member.role}
            </p>

            {/* Specialty pills */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {member.specialties.slice(0, 2).map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-[#FDF8F3] to-[#F5EDE5] text-[#722F37]/80 rounded-full border border-[#EDE5DD]/80"
                >
                  {specialty}
                </span>
              ))}
              {member.specialties.length > 2 && (
                <span className="px-2 py-0.5 text-[10px] font-medium text-[#64748b] bg-gray-100 rounded-full">
                  +{member.specialties.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Languages bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-[#FDF8F3]/80 to-[#F5EDE5]/50 border-t border-[#EDE5DD]/50 flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-[#722F37]/60" />
          <span className="text-xs text-[#64748b]">
            {member.languages.join(' · ')}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
}

// ============================================================================
// FULL-SCREEN PROFILE VIEW
// ============================================================================

interface ProfileViewProps {
  member: TeamMember;
  onClose: () => void;
}

function ProfileView({ member, onClose }: ProfileViewProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="h-full overflow-y-auto overscroll-contain"
        variants={slideUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Sticky Header */}
        <motion.header
          className="sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-white/90 backdrop-blur-xl border-b border-[#EDE5DD]/50"
          initial={{ y: -56 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.button
            onClick={onClose}
            className="flex items-center gap-2 text-[#64748b] min-h-[44px] min-w-[44px] -ml-2"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </motion.button>

          <motion.a
            href="tel:+16137331118"
            className="w-10 h-10 rounded-full bg-[#722F37] flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4 text-white" />
          </motion.a>
        </motion.header>

        {/* Hero Image Section */}
        <div className="relative">
          <motion.div
            className="aspect-[4/3] bg-gradient-to-br from-[#FDF8F3] via-[#EDE5DD] to-[#D4C4B5]"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <Image
              src={member.image}
              alt={`Photo of ${member.name}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Fallback */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-display font-bold text-[#722F37]/15">
                {member.name.split(' ').slice(1).map(n => n[0]).join('')}
              </span>
            </div>

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </motion.div>

          {/* Floating badges */}
          <motion.div
            className="absolute top-4 left-4 flex gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {member.isPracticeOwner && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-white" />
                Practice Owner
              </span>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          className="px-5 pb-32 -mt-6 relative z-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Name & Role */}
          <motion.div variants={staggerItem} className="mb-5">
            <h1 className="font-display font-bold text-2xl text-[#1e293b] leading-tight">
              {member.name}
            </h1>
            <p className="text-[#722F37] font-semibold mt-1">{member.credentials}</p>
            <p className="text-[#64748b] text-sm mt-0.5">{member.role}</p>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div
            variants={staggerItem}
            className="flex gap-3 mb-6 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
          >
            <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#722F37] to-[#5a252c] rounded-xl">
              <GraduationCap className="w-4 h-4 text-white/80" />
              <span className="text-xs font-medium text-white whitespace-nowrap">
                {member.education?.[0]?.split('(')[0]?.trim() ?? 'Dental Professional'}
              </span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#FDF8F3] border border-[#EDE5DD] rounded-xl">
              <MessageCircle className="w-4 h-4 text-[#722F37]" />
              <span className="text-xs font-medium text-[#64748b] whitespace-nowrap">
                {member.languages.length} Languages
              </span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={staggerItem} className="mb-6">
            <p className="text-[#475569] leading-relaxed text-[15px]">
              {member.bio}
            </p>
            {member.interests && (
              <p className="text-[#64748b] leading-relaxed mt-3 text-sm italic">
                {member.interests}
              </p>
            )}
          </motion.div>

          {/* Areas of Focus */}
          <motion.div
            variants={staggerItem}
            className="mb-4"
          >
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#FDF8F3] border border-[#EDE5DD] shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#722F37] to-rose-500 flex items-center justify-center">
                  <Stethoscope className="w-4.5 h-4.5 text-white" />
                </div>
                <h2 className="font-display font-semibold text-[#1e293b]">Areas of Focus</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="px-3.5 py-2 text-sm bg-white border border-[#EDE5DD] rounded-xl text-[#475569] shadow-sm"
                  >
                    {specialty}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            variants={staggerItem}
            className="mb-4"
          >
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#FDF8F3] border border-[#EDE5DD] shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-4.5 h-4.5 text-white" />
                </div>
                <h2 className="font-display font-semibold text-[#1e293b]">Education & Training</h2>
              </div>
              <ul className="space-y-2.5">
                {member.education.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="text-sm text-[#475569] flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 mt-1.5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div variants={staggerItem}>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#FDF8F3] border border-[#EDE5DD] shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Globe className="w-4.5 h-4.5 text-white" />
                </div>
                <h2 className="font-display font-semibold text-[#1e293b]">Languages Spoken</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {member.languages.map((lang, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="px-4 py-2 text-sm bg-white border border-[#EDE5DD] rounded-xl text-[#475569] shadow-sm"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Fixed Bottom CTA */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-[#EDE5DD]/50 safe-area-pb"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex gap-3">
            <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact#book"
                className={cn(
                  'flex items-center justify-center gap-2',
                  'w-full py-4 rounded-2xl font-semibold',
                  'bg-gradient-to-r from-[#722F37] to-[#8B3D47]',
                  'text-white shadow-lg shadow-[#722F37]/20'
                )}
              >
                <Calendar className="w-5 h-5" />
                Book with {member.name.split(' ')[1]}
              </Link>
            </motion.div>
            <motion.a
              href="tel:+16137331118"
              className={cn(
                'flex items-center justify-center',
                'w-14 h-14 rounded-2xl',
                'bg-[#FDF8F3] text-[#722F37]',
                'border border-[#EDE5DD]'
              )}
              whileTap={{ scale: 0.95 }}
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// PHILOSOPHY CARD
// ============================================================================

interface PhilosophyCardProps {
  point: typeof philosophyPoints[0];
  index: number;
}

function PhilosophyCard({ point, index }: PhilosophyCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const Icon = point.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#EDE5DD]/80 shadow-sm"
    >
      <div className={cn(
        'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
        'bg-gradient-to-br shadow-lg',
        point.gradient
      )}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#1e293b] text-[15px]">{point.title}</h3>
        <p className="text-xs text-[#64748b] mt-1 leading-relaxed">{point.description}</p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TeamContentMobile() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <>
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-white via-[#FEFCFA] to-white pb-28">

        {/* ================================================================
            HERO SECTION
        ================================================================ */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5] px-5 pt-4 pb-10"
        >
          <FloatingOrbs />
          <DotPattern />

          <div className="relative z-10">
            {/* Breadcrumb */}
            <motion.nav
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-1.5 text-xs">
                <li><Link href="/" className="text-[#64748b]">Home</Link></li>
                <li className="text-[#94a3b8]">/</li>
                <li><Link href="/about" className="text-[#64748b]">About</Link></li>
                <li className="text-[#94a3b8]">/</li>
                <li className="text-[#722F37] font-semibold">Team</li>
              </ol>
            </motion.nav>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/90 backdrop-blur-sm border border-[#EDE5DD] rounded-full mb-5 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#722F37] to-rose-500 flex items-center justify-center">
                <Users className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#722F37]">Meet Our Team</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="font-display font-bold text-[28px] leading-[1.15] text-[#1e293b] tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              The Caring Professionals{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-rose-500">
                Behind Your Smile
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-[15px] text-[#64748b] leading-relaxed mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our experienced team combines clinical excellence with genuine compassion, creating a welcoming environment for every patient.
            </motion.p>

            {/* Stats Row - Horizontal Scroll */}
            <motion.div
              className="flex gap-2.5 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="flex-shrink-0 flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-[#EDE5DD] shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#722F37]" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#722F37] leading-none">{stat.value}</div>
                      <div className="text-[10px] text-[#64748b] mt-0.5">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            TEAM MEMBERS SECTION
        ================================================================ */}
        <section className="px-5 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="font-display font-bold text-xl text-[#1e293b] mb-1.5">
              Our Dentists
            </h2>
            <p className="text-sm text-[#64748b]">
              Tap to view full profile
            </p>
          </motion.div>

          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
                onSelect={setSelectedMember}
              />
            ))}
          </div>
        </section>

        {/* ================================================================
            PHILOSOPHY SECTION
        ================================================================ */}
        <section className="px-5 py-8 bg-gradient-to-br from-[#FDF8F3] via-[#FEFCFA] to-[#F5EDE5]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#722F37] to-rose-500 flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#722F37]">Our Philosophy</span>
            </div>
            <h2 className="font-display font-bold text-xl text-[#1e293b]">
              What Sets Us Apart
            </h2>
          </motion.div>

          <div className="space-y-2.5">
            {philosophyPoints.map((point, index) => (
              <PhilosophyCard key={index} point={point} index={index} />
            ))}
          </div>
        </section>

        {/* ================================================================
            TRUST SECTION
        ================================================================ */}
        <section className="px-5 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-xl text-[#1e293b] mb-4">
              Exceptional Care Built on Trust
            </h2>
            <div className="space-y-3 text-[15px] text-[#64748b] leading-relaxed">
              <p>
                At Ottawa South Dental, exceptional care goes beyond technical expertise. It&apos;s about building genuine relationships and creating an environment where everyone feels welcome.
              </p>
              <p>
                We take the time to listen, explain procedures thoroughly, and ensure you&apos;re comfortable every step of the way.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================================================================
            CTA SECTION
        ================================================================ */}
        <section className="mx-5 mb-6">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#722F37] via-[#8B3D47] to-[#5a252c] p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display font-bold text-[22px] text-white mb-2">
                  Ready to Meet Our Team?
                </h2>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  Schedule your appointment and experience personalized care.
                </p>
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact#book"
                    className={cn(
                      'flex items-center justify-center gap-2',
                      'w-full py-4 rounded-2xl font-semibold',
                      'bg-white text-[#722F37]',
                      'shadow-lg'
                    )}
                  >
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </Link>
                </motion.div>

                <motion.a
                  href="tel:+16137331118"
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'w-full py-4 rounded-2xl font-semibold',
                    'bg-white/10 text-white border border-white/20',
                    'backdrop-blur-sm'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-1118
                </motion.a>
              </motion.div>

              <p className="text-xs text-white/50 text-center mt-5">
                New patients welcome! Same-day appointments for emergencies.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================================================================
            STICKY BOTTOM BAR
        ================================================================ */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xl border-t border-[#EDE5DD]/50 safe-area-pb z-40"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex gap-3">
            <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact#book"
                className={cn(
                  'flex items-center justify-center gap-2',
                  'w-full py-3.5 rounded-xl font-semibold text-sm',
                  'bg-gradient-to-r from-[#722F37] to-[#8B3D47]',
                  'text-white shadow-lg shadow-[#722F37]/20'
                )}
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Link>
            </motion.div>
            <motion.a
              href="tel:+16137331118"
              className={cn(
                'flex items-center justify-center gap-2',
                'px-5 py-3.5 rounded-xl font-semibold text-sm',
                'bg-[#FDF8F3] text-[#722F37]',
                'border border-[#EDE5DD]'
              )}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              Call
            </motion.a>
          </div>
        </motion.div>
      </main>

      {/* ================================================================
          PROFILE MODAL
      ================================================================ */}
      <AnimatePresence mode="wait">
        {selectedMember && (
          <ProfileView
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
