'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Heart,
  Award,
  BookOpen,
  Sparkles,
  Phone,
  Calendar,
  ArrowRight,
  X,
  Globe,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';

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
    bio: 'Dr. Harvinder Sidhu is the founder and practice owner of Ottawa South Dental, bringing over 28 years of dedicated experience to the Ottawa community. His philosophy centers on taking the time to explain procedures and treatment options thoroughly, ensuring every patient understands their oral health and feels confident in their care plan. Dr. Sidhu is committed to staying current with dental advancements through continuing education, bringing the latest techniques and technologies to his patients.',
    interests: 'Outside the office, Dr. Sidhu enjoys spending time with his family and contributing to community wellness initiatives.',
    isPracticeOwner: true,
  },
  {
    id: 'dr-sharma',
    name: 'Dr. Shivani Sharma',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/placeholder-female-1.jpg',
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
    bio: 'Dr. Shivani Sharma brings a gentle, caring approach to dentistry that puts patients at ease from the moment they walk through our doors. With a passion for cosmetic dentistry and preventive care, she helps patients achieve and maintain beautiful, healthy smiles. Dr. Sharma believes that every patient deserves personalized attention and takes pride in creating treatment plans tailored to individual needs and goals.',
    interests: 'Dr. Sharma enjoys yoga, cooking, and exploring Ottawa\'s vibrant food scene.',
  },
  {
    id: 'dr-thawer',
    name: 'Dr. Salima Thawer',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/placeholder-female-2.jpg',
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
    bio: 'Dr. Salima Thawer has a special gift for working with patients of all ages, from first-time young visitors to seniors. Her warm demeanor and patient communication style make her particularly effective at helping anxious patients feel comfortable. Dr. Thawer is passionate about family dentistry and believes that building strong relationships with patients is the foundation of excellent care.',
    interests: 'In her free time, Dr. Thawer volunteers with community health programs and enjoys hiking with her family.',
  },
  {
    id: 'dr-sehgal',
    name: 'Dr. Nancy Sehgal',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/placeholder-female-3.jpg',
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
    bio: 'Dr. Nancy Sehgal combines technical expertise with a compassionate approach to restorative dentistry. She specializes in helping patients restore damaged or decayed teeth to full function and beauty. Dr. Sehgal\'s meticulous attention to detail and commitment to patient comfort have made her a trusted provider for complex dental procedures.',
    interests: 'Dr. Sehgal is an avid reader and enjoys classical music and gardening.',
  },
  {
    id: 'dr-joshi',
    name: 'Dr. Arti Joshi',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/placeholder-female-4.jpg',
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
    bio: 'Dr. Arti Joshi is passionate about helping patients achieve straighter, more confident smiles through modern orthodontic solutions. As a certified Invisalign provider, she offers patients a discreet alternative to traditional braces. Dr. Joshi believes that a beautiful smile can transform a person\'s confidence and is dedicated to making that transformation accessible and comfortable for her patients.',
    interests: 'Outside the clinic, Dr. Joshi enjoys photography, travel, and teaching community dental health workshops.',
  },
  {
    id: 'dr-almoaibed',
    name: 'Dr. Fatemah Almoaibed',
    credentials: 'DDS',
    role: 'General Dentist',
    image: '/images/team/placeholder-female-5.jpg',
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
    bio: 'Dr. Fatemah Almoaibed brings expertise in advanced procedures including dental implants and oral surgery. Her gentle technique and thorough explanations help patients feel confident when facing complex treatments. Dr. Almoaibed is committed to providing the highest standard of care while ensuring every patient\'s comfort throughout their treatment journey.',
    interests: 'Dr. Almoaibed enjoys spending time with her family, cooking traditional dishes, and participating in cultural community events.',
  },
];

const philosophyPoints = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'Every treatment plan is tailored to your unique needs, concerns, and goals. We listen first, then create solutions together.',
  },
  {
    icon: Sparkles,
    title: 'Comfort & Anxiety-Free Dentistry',
    description: 'We understand dental anxiety and go the extra mile to ensure your visits are relaxed, comfortable, and even enjoyable.',
  },
  {
    icon: BookOpen,
    title: 'Continuing Education',
    description: 'Our team stays current with the latest dental advancements, bringing you modern techniques and technologies.',
  },
  {
    icon: Award,
    title: 'Modern Technology',
    description: 'We invest in state-of-the-art equipment to provide more accurate diagnoses and comfortable treatments.',
  },
  {
    icon: Users,
    title: 'Family-Friendly Environment',
    description: 'From toddlers to grandparents, every member of your family is welcomed with warm, personalized care.',
  },
  {
    icon: Globe,
    title: 'Multilingual Care',
    description: 'Our diverse team speaks multiple languages to better serve Ottawa\'s vibrant multicultural community.',
  },
];

interface TeamMemberCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

function TeamMemberCard({ member, onSelect }: TeamMemberCardProps) {
  return (
    <div
      className={[
        'group relative',
        'rounded-2xl overflow-hidden',
        'bg-white',
        'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.06),0_4px_16px_-4px_rgba(114,47,55,0.08)]',
        'hover:shadow-[0_12px_32px_-8px_rgba(114,47,55,0.15),0_16px_40px_-12px_rgba(114,47,55,0.12)]',
        'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:-translate-y-1',
        'cursor-pointer',
      ].join(' ')}
      onClick={() => onSelect(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(member)}
      aria-label={`View profile of ${member.name}`}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD]">
        <Image
          src={member.image}
          alt={`Photo of ${member.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={[
            'object-cover',
            'transition-transform duration-700 ease-out',
            'group-hover:scale-105',
          ].join(' ')}
          onError={(e) => {
            // Fallback to placeholder with initials
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />

        {/* Fallback initials */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/20">
          <span className="text-5xl font-display font-semibold text-[#722F37]/40">
            {member.name.split(' ').slice(1).map(n => n[0]).join('')}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className={[
            'absolute inset-0',
            'bg-gradient-to-t from-[#722F37]/90 via-[#722F37]/40 to-transparent',
            'opacity-0 transition-opacity duration-500 ease-out',
            'group-hover:opacity-100',
          ].join(' ')}
          aria-hidden="true"
        />

        {/* View profile prompt on hover */}
        <div
          className={[
            'absolute inset-x-0 bottom-0',
            'p-6',
            'translate-y-full',
            'transition-transform duration-500 ease-out',
            'group-hover:translate-y-0',
          ].join(' ')}
        >
          <div className="flex items-center gap-2 text-white font-medium">
            <span>View Profile</span>
            <ChevronRight className="w-5 h-5" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {member.specialties.slice(0, 2).map((specialty, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-white/20 rounded-full text-white"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Practice owner badge */}
        {member.isPracticeOwner && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#722F37] text-white text-xs font-medium rounded-full shadow-lg">
            Practice Owner
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-[#1e293b]">
          {member.name}
        </h3>
        <p className="text-sm text-[#722F37] font-medium mt-0.5">
          {member.credentials}
        </p>
        <p className="text-sm text-[#64748b] mt-1">
          {member.role}
        </p>

        {/* Languages */}
        <div className="mt-3 flex items-center gap-2 text-xs text-[#64748b]">
          <Globe className="w-3.5 h-3.5" />
          <span>{member.languages.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}

interface ProfileModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

function ProfileModal({ member, onClose }: ProfileModalProps) {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        className={[
          'relative w-full max-w-3xl max-h-[90vh] overflow-y-auto',
          'bg-white rounded-3xl shadow-2xl',
          'animate-scale-in',
        ].join(' ')}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={[
            'absolute top-4 right-4 z-10',
            'w-10 h-10 rounded-full',
            'bg-white/90 backdrop-blur-sm',
            'flex items-center justify-center',
            'text-[#64748b] hover:text-[#1e293b]',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50',
            'shadow-md',
          ].join(' ')}
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-5">
          {/* Image column */}
          <div className="md:col-span-2 relative">
            <div className="aspect-[3/4] md:aspect-auto md:h-full relative bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD]">
              <Image
                src={member.image}
                alt={`Photo of ${member.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-display font-semibold text-[#722F37]/30">
                  {member.name.split(' ').slice(1).map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="md:col-span-3 p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              {member.isPracticeOwner && (
                <span className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-[#722F37]/10 text-[#722F37] rounded-full">
                  Practice Owner
                </span>
              )}
              <h2 id="modal-title" className="font-display font-bold text-2xl md:text-3xl text-[#1e293b]">
                {member.name}, {member.credentials}
              </h2>
              <p className="text-[#722F37] font-medium mt-1">{member.role}</p>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-[#64748b] leading-relaxed">{member.bio}</p>
              {member.interests && (
                <p className="text-[#64748b] leading-relaxed mt-3 italic">
                  {member.interests}
                </p>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid gap-4">
              {/* Education */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5]/50 border border-[#EDE5DD]">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-[#722F37]" />
                  <h3 className="font-semibold text-[#1e293b]">Education & Training</h3>
                </div>
                <ul className="space-y-1.5">
                  {member.education.map((item, idx) => (
                    <li key={idx} className="text-sm text-[#64748b] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]/40 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specialties */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5]/50 border border-[#EDE5DD]">
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope className="w-5 h-5 text-[#722F37]" />
                  <h3 className="font-semibold text-[#1e293b]">Areas of Focus</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-sm bg-white border border-[#EDE5DD] rounded-full text-[#64748b]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5]/50 border border-[#EDE5DD]">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-[#722F37]" />
                  <h3 className="font-semibold text-[#1e293b]">Languages Spoken</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-sm bg-white border border-[#EDE5DD] rounded-full text-[#64748b]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-6 border-t border-[#EDE5DD]">
              <p className="text-sm text-[#64748b] mb-3">
                Ready to meet {member.name.split(' ')[1]}?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact#book"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-5 py-2.5 rounded-xl font-medium',
                    'bg-[#722F37] text-white',
                    'hover:bg-[#5a252c]',
                    'transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                  ].join(' ')}
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Link>
                <a
                  href="tel:+16137331118"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-5 py-2.5 rounded-xl font-medium',
                    'bg-white text-[#722F37] border border-[#722F37]/20',
                    'hover:bg-[#FDF8F3]',
                    'transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                  ].join(' ')}
                >
                  <Phone className="w-4 h-4" />
                  (613) 733-1118
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamContent() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]">
          {/* Decorative elements */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#722F37]/5" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-100/30" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-[#64748b] hover:text-[#722F37] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-[#64748b]">/</li>
                <li>
                  <Link
                    href="/about"
                    className="text-[#64748b] hover:text-[#722F37] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li className="text-[#64748b]">/</li>
                <li className="text-[#722F37] font-medium">Our Team</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              {/* Section badge */}
              <div
                className={[
                  'inline-flex items-center gap-2',
                  'px-4 py-2',
                  'bg-white/80 backdrop-blur-sm',
                  'border border-[#EDE5DD]',
                  'rounded-full',
                  'mb-6',
                ].join(' ')}
              >
                <Users className="w-4 h-4 text-[#722F37]" />
                <span className="text-sm font-medium text-[#722F37]">
                  Meet Our Team
                </span>
              </div>

              <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                The Caring Professionals Behind Your Smile
              </h1>

              <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8">
                At Ottawa South Dental, our experienced team of dentists combines clinical excellence with genuine compassion. We're dedicated to creating a welcoming environment where every patient—from toddlers to grandparents—feels comfortable and cared for.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => (window.location.href = '/contact#book')}
                >
                  Book Appointment
                </Button>
                <a
                  href="tel:+16137331118"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-6 py-3 rounded-xl font-medium',
                    'bg-white text-[#722F37] border-2 border-[#722F37]/20',
                    'hover:border-[#722F37]/40 hover:bg-[#FDF8F3]',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                  ].join(' ')}
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-1118
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Our Dentists
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Click on any team member to learn more about their background, specialties, and approach to dental care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onSelect={setSelectedMember}
              />
            ))}
          </div>
        </SectionContainer>

        {/* Practice Philosophy Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div
                className={[
                  'inline-flex items-center gap-2',
                  'px-4 py-2',
                  'bg-white/80',
                  'border border-[#EDE5DD]',
                  'rounded-full',
                  'mb-6',
                ].join(' ')}
              >
                <Heart className="w-4 h-4 text-[#722F37]" />
                <span className="text-sm font-medium text-[#722F37]">
                  Our Philosophy
                </span>
              </div>

              <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-6">
                Exceptional Care Built on Trust & Compassion
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  At Ottawa South Dental, we believe that exceptional dental care goes far beyond technical expertise. It's about building genuine relationships with our patients and their families, understanding their unique needs, and creating an environment where everyone feels welcome and at ease.
                </p>
                <p>
                  Our team is united by a shared commitment to patient-centered care. We take the time to listen, explain procedures thoroughly, and ensure you're comfortable every step of the way. Whether you're coming in for a routine cleaning or a complex treatment, you'll experience the same level of attentive, personalized care.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[#722F37]">28+</span>
                  </div>
                  <span className="text-sm text-[#64748b]">Years of Combined Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[#722F37]">6</span>
                  </div>
                  <span className="text-sm text-[#64748b]">Dedicated Dentists</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[#722F37]">7+</span>
                  </div>
                  <span className="text-sm text-[#64748b]">Languages Spoken</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[#722F37]">1000s</span>
                  </div>
                  <span className="text-sm text-[#64748b]">Happy Families</span>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-[4/5]">
                  <Image
                    src="/images/clinic/clinic-01.jpg"
                    alt="Ottawa South Dental welcoming reception area"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-square">
                  <Image
                    src="/images/patients/patients-01.jpg"
                    alt="Happy patient smiling"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-square">
                  <Image
                    src="/images/clinic/clinic-02.jpg"
                    alt="Modern dental treatment room"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-[4/5]">
                  <Image
                    src="/images/children/children-02.jpg"
                    alt="Child receiving gentle dental care"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Philosophy Values Grid */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Our core values guide everything we do, ensuring you receive exceptional care at every visit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className={[
                    'p-6 rounded-2xl',
                    'bg-gradient-to-br from-white to-[#FDF8F3]/50',
                    'border border-[#EDE5DD]',
                    'transition-all duration-300',
                    'hover:shadow-soft hover:-translate-y-1 hover:border-[#722F37]/20',
                  ].join(' ')}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#722F37]" />
                  </div>
                  <h3 className="font-semibold text-[#1e293b] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </SectionContainer>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]">
          {/* Decorative elements */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center">
              <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-white tracking-tight mb-4">
                Ready to Meet Our Team?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Schedule your appointment today and experience the warm, personalized care that makes Ottawa South Dental a trusted choice for families across Ottawa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => (window.location.href = '/contact#book')}
                >
                  Book Appointment
                </Button>
                <a
                  href="tel:+16137331118"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-8 py-4 rounded-xl font-medium text-lg',
                    'bg-white/10 text-white border-2 border-white/20',
                    'hover:bg-white/20',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#722F37]',
                  ].join(' ')}
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-1118
                </a>
              </div>

              <p className="mt-6 text-sm text-primary-200">
                New patients welcome! Same-day appointments available for emergencies.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Profile Modal */}
      <ProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}
