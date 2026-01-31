'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileNav } from './MobileNav';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Routine Checkups', href: '/services/routine-checkups' },
      { label: 'Dental Hygiene', href: '/services/dental-hygiene' },
      { label: 'Preventive Dentistry', href: '/services/preventive-dentistry' },
      { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
      { label: 'Teeth Whitening', href: '/services/teeth-whitening' },
      { label: 'Invisalign', href: '/services/invisalign' },
      { label: 'Dental Implants', href: '/services/dental-implants' },
      { label: 'Dentures', href: '/services/dentures' },
      { label: 'Missing Teeth', href: '/services/missing-teeth' },
      { label: 'Root Canal', href: '/services/root-canal' },
      { label: 'White Fillings', href: '/services/white-fillings' },
      { label: 'Gum Therapy', href: '/services/gum-therapy' },
      { label: 'Oral Surgery', href: '/services/oral-surgery' },
      { label: "Children's Dentistry", href: '/services/childrens-dentistry' },
      { label: 'Emergency Care', href: '/services/emergency-care' },
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

function DropdownMenu({
  item,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="relative px-4 py-2 text-neutral-700 font-medium rounded-lg transition-all duration-200 hover:text-primary-700 hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 px-4 py-2 text-neutral-700 font-medium rounded-lg transition-all duration-200 hover:text-primary-700 hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isOpen ? 'text-primary-700 bg-primary-50' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute top-full left-0 mt-2 py-2 bg-white rounded-xl shadow-lg border border-neutral-100 min-w-[220px] z-50 transition-all duration-200 ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        } ${item.children.length > 8 ? 'max-h-[400px] overflow-y-auto' : ''}`}
      >
        {item.children.map((child, index) => (
          <Link
            key={`${item.label}-${index}`}
            href={child.href}
            onClick={onToggle}
            className="block px-4 py-2 text-neutral-700 text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Only run client-side effects after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out bg-white ${
          mounted && isScrolled ? 'shadow-soft py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
              aria-label="Ottawa South Dental - Home"
            >
              <Image
                src="/LOGO.png"
                alt="Ottawa South Dental"
                width={180}
                height={50}
                className="w-auto h-11 sm:h-12 transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navItems.map((item, index) => (
                <DropdownMenu
                  key={`nav-${index}`}
                  item={item}
                  isOpen={openDropdown === item.label}
                  onToggle={() => handleDropdownToggle(item.label)}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language indicator - Desktop only */}
              <div
                className="hidden md:flex items-center gap-1.5 text-neutral-500 text-sm"
                role="group"
                aria-label="Available languages: English and French"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span aria-hidden="true">EN / FR</span>
              </div>

              {/* Phone number - Desktop */}
              <a
                href={PHONE_HREF}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={`Call us at ${PHONE_NUMBER}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="hidden md:inline">{PHONE_NUMBER}</span>
              </a>

              {/* Book Appointment CTA - Desktop */}
              <Link href="/contact" className="hidden sm:inline-flex">
                <Button variant="primary" size="sm">
                  Book Appointment
                </Button>
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

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
