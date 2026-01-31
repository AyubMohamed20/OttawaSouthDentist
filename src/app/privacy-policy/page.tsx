'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Server,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  ArrowUp,
} from 'lucide-react';
import { contactInfo } from '@/data/site-config';

// Metadata needs to be in a separate file for client components
// Export moved to a separate metadata.ts file or handled via generateMetadata

const lastUpdated = 'January 2026';

// Section data structure
const sections = [
  { id: 'commitment', title: 'Our Commitment', icon: Lock },
  { id: 'information-collected', title: 'Information We Collect', icon: FileText },
  { id: 'how-we-use', title: 'How We Use Your Information', icon: Eye },
  { id: 'information-sharing', title: 'Information Sharing', icon: Users },
  { id: 'data-security', title: 'Data Security', icon: Server },
  { id: 'your-rights', title: 'Your Rights', icon: FileText },
  { id: 'website-privacy', title: 'Website Privacy', icon: Lock },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Eye },
  { id: 'third-party', title: 'Third-Party Services', icon: Users },
  { id: 'retention', title: 'Record Retention', icon: FileText },
  { id: 'consent', title: 'Your Consent', icon: FileText },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

// Animated section wrapper component
function AnimatedSection({
  children,
  id,
  className = ''
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Collapsible section component
function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  sectionNumber,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  sectionNumber: number;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200/60 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1">
          <span className="font-display text-sm text-primary-600/60 tracking-wide">
            {String(sectionNumber).padStart(2, '0')}
          </span>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-xl font-display font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
            {title}
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-100 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-primary-600" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-[4.5rem]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Floating Table of Contents
function TableOfContents({ activeSection }: { activeSection: string }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="sticky top-32 w-64"
    >
      <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-soft">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/60">
          <BookOpen className="w-4 h-4 text-primary-600" />
          <span className="font-display text-sm font-semibold text-slate-900">Contents</span>
        </div>
        <ul className="space-y-1">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 group ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`text-xs font-mono ${
                  activeSection === section.id ? 'text-primary-500' : 'text-slate-400'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="truncate">{section.title}</span>
                <ChevronRight className={`w-3 h-3 ml-auto opacity-0 transition-all duration-200 ${
                  activeSection === section.id ? 'opacity-100 text-primary-500' : 'group-hover:opacity-50'
                }`} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}

// Reading Progress Bar
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// Scroll to top button
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Decorative background element
function DecorativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-100/40 to-primary-200/20 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-secondary-100/30 to-secondary-200/10 blur-3xl"
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(to right, #0d9488 1px, transparent 1px),
                            linear-gradient(to bottom, #0d9488 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('commitment');
  const mainRef = useRef<HTMLDivElement>(null);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ReadingProgress />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-28 pb-20 overflow-hidden">
        <DecorativeBackground />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm mb-12"
          >
            <Link href="/" className="text-slate-500 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-900 font-medium">Privacy Policy</span>
          </motion.nav>

          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-primary-100/50 border border-primary-200/50 text-primary-700 text-sm font-medium mb-8"
            >
              <Shield className="w-4 h-4" />
              <span>Your Privacy Matters</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-[1.1]"
            >
              Privacy{' '}
              <span className="relative inline-block">
                Policy
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-primary-200/50 -z-10 origin-left"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-slate-600 leading-relaxed mb-6 max-w-2xl"
            >
              At Ottawa South Dental, we are committed to protecting your personal information
              and maintaining the trust you place in us. This policy explains how we collect,
              use, and safeguard your data.
            </motion.p>

            {/* Last updated */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                Last updated: {lastUpdated}
              </span>
              <span className="text-slate-300">|</span>
              <span>~8 min read</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-20 bg-white" ref={mainRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-16">
            {/* Main content area */}
            <div className="flex-1 max-w-3xl">
              {/* Section 1: Commitment */}
              <AnimatedSection id="commitment" className="mb-16">
                <div className="p-8 bg-gradient-to-br from-primary-50/80 to-primary-100/40 rounded-2xl border border-primary-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">
                        Our Commitment to Privacy
                      </h2>
                      <p className="text-slate-600 leading-relaxed">
                        We comply with the Personal Information Protection and Electronic Documents
                        Act (PIPEDA) and applicable provincial privacy legislation. Your personal
                        health information is treated with the utmost confidentiality.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Collapsible Sections */}
              <AnimatedSection id="information-collected" className="mb-4">
                <CollapsibleSection
                  title="Information We Collect"
                  icon={FileText}
                  sectionNumber={1}
                  defaultOpen={true}
                >
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We collect personal information necessary to provide you with quality dental care:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-5 bg-slate-50/80 rounded-xl border border-slate-100"
                    >
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        Personal Identification
                      </h3>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Name, address, phone number, email</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Date of birth and gender</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Health card and insurance information</span>
                        </li>
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="p-5 bg-slate-50/80 rounded-xl border border-slate-100"
                    >
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        Health Information
                      </h3>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Medical and dental history</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>X-rays and diagnostic images</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Treatment records and notes</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="how-we-use" className="mb-4">
                <CollapsibleSection
                  title="How We Use Your Information"
                  icon={Eye}
                  sectionNumber={2}
                >
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Providing Dental Care',
                        description: 'To diagnose, treat, and manage your dental health, including communicating with other healthcare providers when necessary.',
                      },
                      {
                        title: 'Administrative Purposes',
                        description: 'To schedule appointments, process insurance claims, manage billing, and maintain your patient records.',
                      },
                      {
                        title: 'Communication',
                        description: 'To send appointment reminders, treatment follow-ups, and important practice updates.',
                      },
                      {
                        title: 'Quality Improvement',
                        description: 'To improve our services, maintain standards of care, and meet regulatory requirements.',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 p-5 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0 group-hover:from-primary-200 group-hover:to-primary-100 transition-all">
                          <span className="text-sm font-semibold text-primary-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="information-sharing" className="mb-4">
                <CollapsibleSection
                  title="Information Sharing & Disclosure"
                  icon={Users}
                  sectionNumber={3}
                >
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We do not sell, trade, or rent your personal information. We may share your
                    information only in the following circumstances:
                  </p>
                  <div className="space-y-3">
                    {[
                      'With your explicit consent',
                      'With other healthcare providers involved in your care',
                      'With insurance companies to process your claims',
                      'With dental laboratories for treatment purposes',
                      'When required by law or regulatory bodies',
                      'In emergencies where your health or safety is at risk',
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-slate-600"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
                        </div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="data-security" className="mb-4">
                <CollapsibleSection
                  title="Data Security"
                  icon={Server}
                  sectionNumber={4}
                >
                  <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl">
                    <p className="text-slate-600 mb-5 leading-relaxed">
                      We implement appropriate security measures to protect your personal information:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Secure electronic record systems with access controls',
                        'Physical security measures for paper records',
                        'Staff training on privacy and confidentiality',
                        'Regular security assessments and updates',
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2 p-3 bg-white rounded-lg border border-slate-200/60"
                        >
                          <Shield className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="your-rights" className="mb-4">
                <CollapsibleSection
                  title="Your Rights"
                  icon={FileText}
                  sectionNumber={5}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: 'Access',
                        description: 'You have the right to request access to your personal information held by our practice.',
                      },
                      {
                        title: 'Correction',
                        description: 'You may request corrections to any inaccurate or incomplete personal information.',
                      },
                      {
                        title: 'Withdrawal of Consent',
                        description: 'You may withdraw consent for certain uses of your information, subject to legal requirements.',
                      },
                      {
                        title: 'Complaints',
                        description: 'You have the right to file a complaint with the Privacy Commissioner of Canada.',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-5 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-sm transition-all"
                      >
                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="website-privacy" className="mb-4">
                <CollapsibleSection
                  title="Website & Online Privacy"
                  icon={Lock}
                  sectionNumber={6}
                >
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    When you use our website or contact forms:
                  </p>
                  <ul className="space-y-3 text-slate-600 mb-6">
                    {[
                      'We collect only the information you voluntarily provide (e.g., contact form submissions)',
                      'We may use cookies to improve website functionality and user experience',
                      'We use SSL encryption to protect data transmitted through our website',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="p-5 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-amber-900 mb-1">Important Notice</p>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          Do not send sensitive health information through our website contact form or email.
                          Please discuss health matters in person or by phone.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="cookies" className="mb-4">
                <CollapsibleSection
                  title="Cookies & Tracking Technologies"
                  icon={Eye}
                  sectionNumber={7}
                >
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    Our website uses cookies and tracking technologies to enhance your browsing experience:
                  </p>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="p-5 bg-slate-50/80 rounded-xl border border-slate-100"
                    >
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        What We Collect
                      </h3>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Browser type and version</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Pages visited and time spent on site</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Referring website information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>Device and access times</span>
                        </li>
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="p-5 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-amber-900 mb-1">Cookie Control</p>
                          <p className="text-sm text-amber-800 leading-relaxed">
                            You can configure your browser to refuse cookies. However, this may affect
                            some website functionality. This tracking data is not linked to your personal
                            information unless required for policy enforcement or legal compliance.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="third-party" className="mb-4">
                <CollapsibleSection
                  title="Third-Party Services"
                  icon={Users}
                  sectionNumber={8}
                >
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    Our website may contain links to third-party products, services, or websites.
                    These third parties maintain their own separate and independent privacy policies.
                  </p>
                  <div className="space-y-3">
                    {[
                      'We assume no responsibility for the privacy practices of third-party sites',
                      'We encourage you to review their privacy policies before providing information',
                      'Trusted service providers who assist our operations are bound by confidentiality agreements',
                      'We welcome feedback about any third-party services linked from our site',
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-slate-600"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
                        </div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="retention" className="mb-4">
                <CollapsibleSection
                  title="Record Retention"
                  icon={FileText}
                  sectionNumber={9}
                >
                  <p className="text-slate-600 leading-relaxed">
                    We retain your dental records in accordance with the Royal College of Dental
                    Surgeons of Ontario guidelines and applicable laws. Adult patient records are
                    kept for a minimum of 10 years after the last visit. Records for patients who
                    were minors are kept until 10 years after they turn 18.
                  </p>
                </CollapsibleSection>
              </AnimatedSection>

              <AnimatedSection id="consent" className="mb-4">
                <CollapsibleSection
                  title="Your Consent & Policy Changes"
                  icon={FileText}
                  sectionNumber={10}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        Your Consent
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        By using our website and services, you consent to this privacy policy. Your continued
                        use of our services following any changes to this policy constitutes acceptance of
                        those changes.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        Children&apos;s Privacy
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        We comply with the Children&apos;s Online Privacy Protection Act (COPPA) and do not
                        knowingly collect personal information from individuals under 13 years of age
                        through our website. Our dental services for children are provided with parental
                        or guardian consent.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        Policy Updates
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        We may update this privacy policy from time to time. Any modifications will be
                        posted on this page with an updated &quot;last modified&quot; date. We encourage you to
                        review this policy periodically to stay informed about how we protect your
                        information.
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-5 bg-slate-50/80 rounded-xl border border-slate-100"
                    >
                      <p className="text-sm text-slate-600">
                        <span className="font-medium text-slate-900">Online Policy Scope:</span> This
                        privacy policy applies exclusively to information collected through our website
                        and does not cover information collected offline at our dental practice.
                      </p>
                    </motion.div>
                  </div>
                </CollapsibleSection>
              </AnimatedSection>

              {/* Contact Section */}
              <AnimatedSection id="contact" className="mt-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative p-10 bg-gradient-to-br from-primary-50 via-primary-100/50 to-secondary-50/30 rounded-3xl overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-transparent rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary-200/20 to-transparent rounded-full blur-2xl" />

                  <div className="relative">
                    <h2 className="text-2xl font-display font-semibold text-slate-900 mb-3">
                      Questions About Your Privacy?
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-lg">
                      If you have questions about this policy or wish to exercise your privacy rights,
                      please contact our Privacy Officer:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <motion.a
                        href={`mailto:${contactInfo.email}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Email</p>
                          <p className="text-primary-600 font-medium">
                            {contactInfo.email}
                          </p>
                        </div>
                      </motion.a>

                      <motion.a
                        href={`tel:+1${contactInfo.phone}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Phone</p>
                          <p className="text-primary-600 font-medium">
                            ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
                          </p>
                        </div>
                      </motion.a>
                    </div>

                    <div className="pt-6 border-t border-primary-200/50">
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-900">Ottawa South Dental</span><br />
                        {contactInfo.address.street}<br />
                        {contactInfo.address.city}, {contactInfo.address.province} {contactInfo.address.postalCode}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* Back to Contact */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
                >
                  <span>Back to Contact Page</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Table of Contents Sidebar - Desktop only */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents activeSection={activeSection} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
