'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Phone, Globe, Calendar, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { NavItem } from './Header';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  phoneNumber: string;
  phoneHref: string;
}

export function MobileNav({
  isOpen,
  onClose,
  navItems,
  phoneNumber,
  phoneHref,
}: MobileNavProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button when menu opens
    closeButtonRef.current?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset expanded items when menu closes
  useEffect(() => {
    if (!isOpen) {
      setExpandedItems([]);
    }
  }, [isOpen]);

  // Handle link clicks
  const handleNavClick = () => {
    onClose();
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={[
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        ref={navRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          'fixed top-0 right-0 z-50 w-full max-w-sm h-full',
          'bg-white shadow-2xl',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-100">
            <Image
              src="/LOGO.png"
              alt="Ottawa South Dental"
              width={140}
              height={40}
              className="h-9 w-auto"
            />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className={[
                'p-2 rounded-lg',
                'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100',
                'transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              ].join(' ')}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
            <ul className="space-y-1 px-3">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  {item.children ? (
                    // Item with children - expandable
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className={[
                          'flex items-center justify-between w-full px-4 py-4',
                          'text-lg font-medium text-neutral-700',
                          'rounded-xl transition-all duration-200',
                          'hover:bg-primary-50 hover:text-primary-700',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
                          'active:bg-primary-100',
                          expandedItems.includes(item.label) ? 'bg-primary-50 text-primary-700' : '',
                        ].join(' ')}
                        aria-expanded={expandedItems.includes(item.label)}
                        style={{
                          animationDelay: isOpen ? `${index * 50}ms` : '0ms',
                          animationFillMode: 'both',
                        }}
                      >
                        {item.label}
                        <ChevronDown
                          className={[
                            'w-5 h-5 text-neutral-400 transition-transform duration-200',
                            expandedItems.includes(item.label) ? 'rotate-180 text-primary-500' : '',
                          ].join(' ')}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Expandable children */}
                      <div
                        className={[
                          'overflow-hidden transition-all duration-300',
                          expandedItems.includes(item.label) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
                        ].join(' ')}
                      >
                        <ul className="pl-4 py-2 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={handleNavClick}
                                className={[
                                  'flex items-center justify-between px-4 py-3',
                                  'text-base text-neutral-600',
                                  'rounded-lg transition-all duration-200',
                                  'hover:bg-primary-50 hover:text-primary-700',
                                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
                                ].join(' ')}
                              >
                                {child.label}
                                <ChevronRight
                                  className="w-4 h-4 text-neutral-400"
                                  aria-hidden="true"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    // Simple link without children
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      className={[
                        'flex items-center justify-between px-4 py-4',
                        'text-lg font-medium text-neutral-700',
                        'rounded-xl transition-all duration-200',
                        'hover:bg-primary-50 hover:text-primary-700',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
                        'active:bg-primary-100',
                        'animate-fade-in-up',
                      ].join(' ')}
                      style={{
                        animationDelay: isOpen ? `${index * 50}ms` : '0ms',
                        animationFillMode: 'both',
                      }}
                    >
                      {item.label}
                      <ChevronRight
                        className="w-5 h-5 text-neutral-400"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-neutral-100 space-y-3 bg-neutral-50">
            {/* Language selector */}
            <div className="flex items-center justify-center gap-2 py-2 text-neutral-500">
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">EN / FR</span>
            </div>

            {/* Phone link */}
            <a
              href={phoneHref}
              aria-label={`Call us at ${phoneNumber}`}
              className={[
                'flex items-center justify-center gap-3 w-full px-4 py-3',
                'bg-white border-2 border-primary-200 rounded-xl',
                'text-primary-700 font-semibold',
                'transition-all duration-200',
                'hover:bg-primary-50 hover:border-primary-300',
                'active:bg-primary-100',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              ].join(' ')}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span>{phoneNumber}</span>
            </a>

            {/* Book Appointment CTA */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Calendar className="w-5 h-5" />}
              onClick={() => {
                onClose();
                window.location.href = '/contact';
              }}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
