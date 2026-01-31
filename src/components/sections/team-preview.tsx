'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, ArrowRight, Heart, Award, Clock } from 'lucide-react';
import { SectionContainer, type SectionBackground } from '@/components/ui/section-container';

export type TeamPreviewBackground = SectionBackground | 'default' | 'muted';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
}

export interface TeamPreviewProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Section headline */
  headline?: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Team members to display in the preview grid */
  teamMembers?: TeamMember[];
  /** Link to full team page */
  teamPageUrl?: string;
  /** CTA button text */
  ctaText?: string;
  /** Practice introduction text */
  practiceIntro?: string;
  /** Years of experience */
  yearsExperience?: number;
  /** Highlight values/features */
  highlights?: Array<{
    icon: 'heart' | 'award' | 'clock' | 'users';
    label: string;
  }>;
  /** Background style variant */
  background?: TeamPreviewBackground;
}

// Default team members for preview (showing 4 featured members)
const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Vineet Sidhu',
    role: 'Practice Owner',
    image: '/images/team/team-01.jpg',
    imageAlt: 'Dr. Vineet Sidhu, Practice Owner',
  },
  {
    id: '2',
    name: 'Dr. Anthony Bui',
    role: 'General Dentist',
    image: '/images/team/team-02.jpg',
    imageAlt: 'Dr. Anthony Bui, General Dentist',
  },
  {
    id: '3',
    name: 'Dr. Sydney Saikaly',
    role: 'Dentist',
    image: '/images/team/team-03.jpg',
    imageAlt: 'Dr. Sydney Saikaly, Dentist',
  },
  {
    id: '4',
    name: 'Dr. Alan Hammond',
    role: 'Dentist',
    image: '/images/team/team-04.jpg',
    imageAlt: 'Dr. Alan Hammond, Dentist',
  },
];

const DEFAULT_HIGHLIGHTS: TeamPreviewProps['highlights'] = [
  { icon: 'clock', label: '28+ Years Experience' },
  { icon: 'heart', label: 'Patient-Centered Care' },
  { icon: 'award', label: 'Latest Technology' },
  { icon: 'users', label: 'Family Friendly' },
];

const iconMap = {
  heart: Heart,
  award: Award,
  clock: Clock,
  users: Users,
};

/**
 * Team Member Photo Card for the preview grid
 */
const TeamPhotoCard = ({ member }: { member: TeamMember }) => {
  return (
    <div
      className={[
        'group relative',
        'rounded-2xl overflow-hidden',
        // Elegant shadow system with burgundy tint
        'shadow-[0_2px_8px_-2px_rgba(114,47,55,0.06),0_4px_16px_-4px_rgba(114,47,55,0.08)]',
        'hover:shadow-[0_12px_32px_-8px_rgba(114,47,55,0.15),0_16px_40px_-12px_rgba(114,47,55,0.12)]',
        // Smooth transitions
        'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:-translate-y-1',
      ].join(' ')}
    >
      {/* Image container with 4:5 aspect ratio */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE5DD]">
        <Image
          src={member.image}
          alt={member.imageAlt || `Photo of ${member.name}`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={[
            'object-cover',
            // Smooth zoom effect
            'transition-transform duration-700 ease-out',
            'group-hover:scale-105',
          ].join(' ')}
        />

        {/* Warm burgundy gradient overlay on hover */}
        <div
          className={[
            'absolute inset-0',
            'bg-gradient-to-t from-[#722F37]/80 via-[#722F37]/30 to-transparent',
            'opacity-0 transition-opacity duration-500 ease-out',
            'group-hover:opacity-100',
          ].join(' ')}
          aria-hidden="true"
        />

        {/* Name and role overlay - visible on hover */}
        <div
          className={[
            'absolute inset-x-0 bottom-0',
            'p-4',
            'translate-y-full',
            'transition-transform duration-500 ease-out',
            'group-hover:translate-y-0',
          ].join(' ')}
        >
          <h3 className="text-white font-semibold text-lg leading-tight">
            {member.name}
          </h3>
          <p className="text-white/90 text-sm mt-0.5">{member.role}</p>
        </div>
      </div>

      {/* Name badge below image (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm border-t border-[#EDE5DD] group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="font-semibold text-neutral-800 text-sm truncate">
          {member.name}
        </h3>
        <p className="text-[#722F37] text-xs font-medium">{member.role}</p>
      </div>
    </div>
  );
};

/**
 * Team Preview Section component for Ottawa South Dental homepage.
 * Features a practice introduction, team photo grid, and Meet Our Team CTA.
 * Showcases the warm, welcoming nature of the dental practice.
 */
// Map background aliases to actual SectionBackground values
const backgroundMap: Record<TeamPreviewBackground, SectionBackground> = {
  transparent: 'transparent',
  white: 'white',
  secondary: 'secondary',
  tertiary: 'tertiary',
  primary: 'primary',
  accent: 'accent',
  default: 'white',
  muted: 'secondary',
};

export const TeamPreview = forwardRef<HTMLDivElement, TeamPreviewProps>(
  (
    {
      headline = 'Meet Our Team',
      subtitle = 'Experience compassionate dental care from our dedicated team of professionals who treat every patient like family.',
      teamMembers = DEFAULT_TEAM_MEMBERS,
      teamPageUrl = '/about',
      ctaText = 'Meet Our Full Team',
      practiceIntro = 'At Family Dental Care, we believe that exceptional dental care starts with exceptional people. Our team of experienced dentists and friendly staff are committed to providing you with personalized, comfortable care in a welcoming environment.',
      yearsExperience = 28,
      highlights = DEFAULT_HIGHLIGHTS,
      background = 'white',
      className = '',
      ...props
    },
    ref
  ) => {
    const resolvedBackground = backgroundMap[background];

    return (
      <SectionContainer
        ref={ref}
        as="section"
        paddingY="lg"
        background={resolvedBackground}
        className={className}
        aria-labelledby="team-preview-heading"
        {...props}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            {/* Section badge */}
            <div
              className={[
                'inline-flex items-center gap-2',
                'px-4 py-2',
                'bg-[#FDF8F3]',
                'border border-[#EDE5DD]',
                'rounded-full',
                'mb-6',
              ].join(' ')}
            >
              <Users className="w-4 h-4 text-[#722F37]" aria-hidden="true" />
              <span className="text-sm font-medium text-[#722F37]">Our Team</span>
            </div>

            {/* Headline */}
            <h2
              id="team-preview-heading"
              className={[
                'font-display font-bold tracking-tight',
                'text-fluid-3xl md:text-fluid-4xl',
                'text-neutral-900',
              ].join(' ')}
            >
              {headline}
            </h2>

            {/* Subtitle */}
            <p
              className={[
                'mt-4 md:mt-5',
                'text-fluid-base md:text-fluid-lg',
                'text-neutral-600',
                'leading-relaxed',
              ].join(' ')}
            >
              {subtitle}
            </p>

            {/* Practice Introduction */}
            <p
              className={[
                'mt-4',
                'text-base',
                'text-neutral-500',
                'leading-relaxed',
              ].join(' ')}
            >
              {practiceIntro}
            </p>

            {/* Highlights Grid */}
            {highlights && highlights.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-8">
                {highlights.map((highlight, index) => {
                  const IconComponent = iconMap[highlight.icon];
                  return (
                    <div
                      key={index}
                      className={[
                        'flex items-center gap-3',
                        'p-3',
                        'bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5]/50',
                        'border border-[#EDE5DD]',
                        'rounded-xl',
                        'transition-all duration-300',
                        'hover:shadow-[0_4px_12px_-4px_rgba(114,47,55,0.1)]',
                        'hover:border-[#722F37]/20',
                      ].join(' ')}
                    >
                      <div
                        className={[
                          'w-10 h-10',
                          'rounded-lg',
                          'bg-[#722F37]/10',
                          'flex items-center justify-center',
                          'flex-shrink-0',
                        ].join(' ')}
                      >
                        <IconComponent
                          className="w-5 h-5 text-[#722F37]"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">
                        {highlight.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href={teamPageUrl}
                className={[
                  'inline-flex items-center justify-center gap-2.5',
                  'px-8 py-4 text-lg font-medium',
                  'bg-[#722F37] text-white',
                  'hover:bg-[#5a252c]',
                  'rounded-xl',
                  'shadow-sm hover:shadow-md',
                  'transition-all duration-200 ease-out',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                  'group',
                ].join(' ')}
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column - Team Photo Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {teamMembers.slice(0, 4).map((member, index) => (
                <div
                  key={member.id}
                  className={[
                    // Stagger the cards vertically for visual interest
                    index % 2 === 1 ? 'mt-6 md:mt-8' : '',
                  ].join(' ')}
                >
                  <TeamPhotoCard member={member} />
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div
              className={[
                'hidden lg:block',
                'absolute -z-10 -right-8 -bottom-8',
                'w-64 h-64',
                'bg-gradient-to-br from-[#722F37]/5 via-[#722F37]/3 to-transparent',
                'rounded-full',
                'blur-3xl',
              ].join(' ')}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bottom decorative accent */}
        <div
          className={[
            'mt-16 pt-8',
            'border-t border-[#EDE5DD]/60',
            'flex flex-wrap items-center justify-center gap-x-8 gap-y-4',
            'text-center',
          ].join(' ')}
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#722F37]">{yearsExperience}+</span>
            <span className="text-sm text-neutral-500">Years of<br />Experience</span>
          </div>
          <div className="h-10 w-px bg-[#EDE5DD] hidden sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#722F37]">6</span>
            <span className="text-sm text-neutral-500">Experienced<br />Dentists</span>
          </div>
          <div className="h-10 w-px bg-[#EDE5DD] hidden sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#722F37]">1000s</span>
            <span className="text-sm text-neutral-500">Happy<br />Patients</span>
          </div>
        </div>
      </SectionContainer>
    );
  }
);

TeamPreview.displayName = 'TeamPreview';

export default TeamPreview;
