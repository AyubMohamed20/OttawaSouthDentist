'use client';

import { forwardRef, useState, type HTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Array of FAQ items */
  items: FAQItem[];
  /** Allow multiple items to be open at once */
  allowMultiple?: boolean;
}

export interface FAQItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
  /** Whether the item is expanded */
  isOpen: boolean;
  /** Toggle callback */
  onToggle: () => void;
  /** Index for animation delay */
  index: number;
}

/**
 * Individual FAQ Item component with accordion behavior.
 * Features smooth animations and warm burgundy accents.
 */
const FAQAccordionItem = forwardRef<HTMLDivElement, FAQItemProps>(
  ({ question, answer, isOpen, onToggle, index, className = '', ...props }, ref) => {
    const headingId = `faq-heading-${index}`;
    const panelId = `faq-panel-${index}`;

    return (
      <div
        ref={ref}
        className={[
          'border border-[#EDE5DD] rounded-xl',
          'transition-all duration-300 ease-out',
          isOpen
            ? 'bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 shadow-[0_4px_16px_-4px_rgba(114,47,55,0.1)]'
            : 'bg-white hover:bg-[#FDF8F3]/30',
          'animate-fade-in-up',
          className,
        ].join(' ')}
        style={{ animationDelay: `${index * 50}ms` }}
        {...props}
      >
        <h3>
          <button
            type="button"
            onClick={onToggle}
            id={headingId}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className={[
              'w-full px-6 py-5 flex items-start justify-between gap-4',
              'text-left cursor-pointer',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-inset',
              'rounded-xl',
              'transition-colors duration-200',
            ].join(' ')}
          >
            <span
              className={[
                'text-base sm:text-lg font-semibold leading-snug',
                'transition-colors duration-200',
                isOpen ? 'text-[#722F37]' : 'text-[#1e293b]',
              ].join(' ')}
            >
              {question}
            </span>
            <span
              className={[
                'flex-shrink-0 w-8 h-8 rounded-lg',
                'flex items-center justify-center',
                'transition-all duration-300 ease-out',
                isOpen
                  ? 'bg-[#722F37] text-white rotate-180'
                  : 'bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] text-[#722F37]',
              ].join(' ')}
              aria-hidden="true"
            >
              <ChevronDown className="w-5 h-5" />
            </span>
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          hidden={!isOpen}
          className={[
            'overflow-hidden transition-all duration-300 ease-out',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="px-6 pb-5 pt-0">
            <div className="h-px bg-gradient-to-r from-transparent via-[#EDE5DD] to-transparent mb-4" aria-hidden="true" />
            <p className="text-[#64748b] leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    );
  }
);

FAQAccordionItem.displayName = 'FAQAccordionItem';

/**
 * FAQ Accordion component for displaying frequently asked questions.
 * Features smooth expand/collapse animations with warm burgundy accents
 * following the Family Dental Care design language.
 */
export const FAQAccordion = forwardRef<HTMLDivElement, FAQAccordionProps>(
  ({ items, allowMultiple = false, className = '', ...props }, ref) => {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const toggleItem = (index: number) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          if (!allowMultiple) {
            newSet.clear();
          }
          newSet.add(index);
        }
        return newSet;
      });
    };

    return (
      <div
        ref={ref}
        className={['space-y-3', className].join(' ')}
        role="region"
        aria-label="Frequently Asked Questions"
        {...props}
      >
        {items.map((item, index) => (
          <FAQAccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openItems.has(index)}
            onToggle={() => toggleItem(index)}
            index={index}
          />
        ))}
      </div>
    );
  }
);

FAQAccordion.displayName = 'FAQAccordion';
