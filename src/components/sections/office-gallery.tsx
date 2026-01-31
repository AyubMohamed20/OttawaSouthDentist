'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3 } from 'lucide-react';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface OfficeGalleryProps {
  images: GalleryImage[];
  headline?: string;
  subtitle?: string;
}

/**
 * Office Gallery component with masonry-style layout and lightbox.
 * Features smooth animations, keyboard navigation, and touch support.
 */
export function OfficeGallery({
  images,
  headline = 'Our Modern Facility',
  subtitle = 'Take a virtual tour of our warm, welcoming dental office',
}: OfficeGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev !== null ? (prev - 1 + images.length) % images.length : 0
      );
    }
  }, [selectedIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev !== null ? (prev + 1) % images.length : 0
      );
    }
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Generate varied aspect ratios for masonry effect
  const getAspectClass = (index: number) => {
    const patterns = [
      'aspect-[4/3]',    // Landscape
      'aspect-square',   // Square
      'aspect-[3/4]',    // Portrait
      'aspect-[4/3]',    // Landscape
      'aspect-[16/10]',  // Wide
      'aspect-[3/4]',    // Portrait
    ];
    return patterns[index % patterns.length];
  };

  // Generate span classes for grid items
  const getSpanClass = (index: number) => {
    const patterns = [
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-2 md:row-span-1 lg:row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 md:col-span-2 row-span-1',
      'col-span-1 row-span-1',
    ];
    return patterns[index % patterns.length];
  };

  return (
    <section className="relative" aria-labelledby="gallery-heading">
      {/* Section Header */}
      <div className="text-center mb-10 lg:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
          <Grid3X3 className="w-4 h-4" />
          <span>Photo Gallery</span>
        </div>
        <h2
          id="gallery-heading"
          className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight"
        >
          {headline}
        </h2>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[220px]">
        {images.slice(0, 12).map((image, index) => (
          <button
            key={`gallery-${index}`}
            onClick={() => openLightbox(index)}
            className={[
              getSpanClass(index),
              'group relative overflow-hidden',
              'rounded-2xl lg:rounded-3xl',
              'cursor-pointer',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-2',
              'transition-all duration-300',
              'hover:shadow-xl hover:shadow-neutral-900/10',
            ].join(' ')}
            aria-label={`View ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              className={[
                'object-cover',
                'transition-transform duration-500 ease-out',
                'group-hover:scale-105',
              ].join(' ')}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Hover Overlay */}
            <div
              className={[
                'absolute inset-0',
                'bg-gradient-to-t from-neutral-900/60 via-neutral-900/20 to-transparent',
                'opacity-0 group-hover:opacity-100',
                'transition-opacity duration-300',
                'flex items-end justify-between p-4',
              ].join(' ')}
            >
              <span className="text-white text-sm font-medium truncate max-w-[70%]">
                {image.caption || image.alt}
              </span>
              <span
                className={[
                  'flex items-center justify-center',
                  'w-10 h-10 rounded-full',
                  'bg-white/20 backdrop-blur-sm',
                  'text-white',
                ].join(' ')}
              >
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>

            {/* Decorative corner accent for first few images */}
            {index < 3 && (
              <div
                className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-white/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      {/* "View All" button if more than 12 images */}
      {images.length > 12 && (
        <div className="text-center mt-8">
          <button
            onClick={() => openLightbox(0)}
            className={[
              'inline-flex items-center gap-2',
              'px-6 py-3 rounded-xl',
              'bg-white text-neutral-700',
              'border border-neutral-200',
              'shadow-sm hover:shadow-md',
              'hover:border-[#722F37]/30 hover:text-[#722F37]',
              'transition-all duration-200',
              'font-medium',
            ].join(' ')}
          >
            <Grid3X3 className="w-4 h-4" />
            View All {images.length} Photos
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedIndex !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-neutral-900/95 backdrop-blur-sm"
            onClick={closeLightbox}
            aria-hidden="true"
          />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className={[
              'absolute top-4 right-4 z-10',
              'w-12 h-12 rounded-full',
              'bg-white/10 hover:bg-white/20',
              'flex items-center justify-center',
              'text-white',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
            ].join(' ')}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={goToPrevious}
            className={[
              'absolute left-4 top-1/2 -translate-y-1/2 z-10',
              'w-12 h-12 rounded-full',
              'bg-white/10 hover:bg-white/20',
              'flex items-center justify-center',
              'text-white',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
              'hidden md:flex',
            ].join(' ')}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation - Next */}
          <button
            onClick={goToNext}
            className={[
              'absolute right-4 top-1/2 -translate-y-1/2 z-10',
              'w-12 h-12 rounded-full',
              'bg-white/10 hover:bg-white/20',
              'flex items-center justify-center',
              'text-white',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
              'hidden md:flex',
            ].join(' ')}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={images[selectedIndex!]!.src}
                alt={images[selectedIndex!]!.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-900/80 to-transparent">
              <p className="text-white text-center font-medium">
                {images[selectedIndex!]!.caption || images[selectedIndex!]!.alt}
              </p>
              <p className="text-white/60 text-center text-sm mt-1">
                {selectedIndex! + 1} of {images.length}
              </p>
            </div>
          </div>

          {/* Mobile swipe hint */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 md:hidden">
            <p className="text-white/50 text-xs">Swipe or use arrows to navigate</p>
          </div>

          {/* Thumbnail strip */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex gap-2 max-w-4xl overflow-x-auto p-2 scrollbar-hide"
            role="tablist"
            aria-label="Image thumbnails"
          >
            {images.map((image, index) => (
              <button
                key={`thumb-${index}`}
                onClick={() => setSelectedIndex(index)}
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`View image ${index + 1}: ${image.alt}`}
                className={[
                  'relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0',
                  'transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
                  index === selectedIndex
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900'
                    : 'opacity-50 hover:opacity-100',
                ].join(' ')}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="64px"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default OfficeGallery;
