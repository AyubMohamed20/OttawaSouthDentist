'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Send,
  CheckCircle,
  AlertTriangle,
  Loader2,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Heart,
} from 'lucide-react';
import { submitContactForm } from '@/app/contact/actions';

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email';
  service: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  form?: string;
}

const SERVICES = [
  { value: '', label: 'Select a service (optional)' },
  { value: 'general-checkup', label: 'General Checkup & Cleaning' },
  { value: 'emergency', label: 'Emergency Dental Care' },
  { value: 'cosmetic', label: 'Cosmetic Dentistry' },
  { value: 'restorative', label: 'Restorative Dentistry' },
  { value: 'pediatric', label: 'Pediatric Dentistry' },
  { value: 'orthodontics', label: 'Orthodontics' },
  { value: 'implants', label: 'Dental Implants' },
  { value: 'whitening', label: 'Teeth Whitening' },
  { value: 'other', label: 'Other / General Inquiry' },
];

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  preferredContact: 'phone',
  service: '',
  message: '',
  honeypot: '',
};

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
  return phone === '' || phoneRegex.test(phone.replace(/\s/g, ''));
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

// Premium mobile input with animated focus state
function PremiumMobileInput({
  icon: Icon,
  label,
  error,
  required,
  delay = 0,
  ...props
}: {
  icon: React.ElementType;
  label: string;
  error?: string;
  required?: boolean;
  delay?: number;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-1 text-sm font-semibold text-neutral-700">
        {label}
        {required && (
          <span className="text-[#722F37]" aria-hidden="true">*</span>
        )}
      </label>

      <motion.div
        className={`
          relative flex items-center gap-3 px-4 py-4
          bg-neutral-50 rounded-2xl border-2 transition-all duration-300
          ${error ? 'border-red-400 bg-red-50/30' : isFocused ? 'border-[#722F37] bg-white shadow-lg shadow-[#722F37]/10' : 'border-transparent'}
        `}
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon with animated color change */}
        <motion.div
          animate={{
            color: isFocused ? '#722F37' : error ? '#f87171' : '#a3a3a3',
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
        </motion.div>

        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className="
            flex-1 bg-transparent text-base text-neutral-900
            placeholder:text-neutral-400 outline-none
            min-h-[24px]
          "
          style={{ fontSize: '16px' }} // Prevents iOS zoom
        />

        {/* Active indicator dot */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-4 w-2 h-2 bg-[#722F37] rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error message with animation */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className="flex items-center gap-2 px-1"
          >
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600 font-medium" role="alert">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Premium mobile textarea
function PremiumMobileTextarea({
  icon: Icon,
  label,
  error,
  required,
  delay = 0,
  ...props
}: {
  icon: React.ElementType;
  label: string;
  error?: string;
  required?: boolean;
  delay?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-1 text-sm font-semibold text-neutral-700">
        {label}
        {required && (
          <span className="text-[#722F37]" aria-hidden="true">*</span>
        )}
      </label>

      <motion.div
        className={`
          relative px-4 py-4
          bg-neutral-50 rounded-2xl border-2 transition-all duration-300
          ${error ? 'border-red-400 bg-red-50/30' : isFocused ? 'border-[#722F37] bg-white shadow-lg shadow-[#722F37]/10' : 'border-transparent'}
        `}
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start gap-3">
          <motion.div
            animate={{
              color: isFocused ? '#722F37' : error ? '#f87171' : '#a3a3a3',
              scale: isFocused ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="mt-0.5"
          >
            <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          </motion.div>

          <textarea
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className="
              flex-1 bg-transparent text-base text-neutral-900
              placeholder:text-neutral-400 outline-none resize-none
              min-h-[100px]
            "
            style={{ fontSize: '16px' }}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className="flex items-center gap-2 px-1"
          >
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600 font-medium" role="alert">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Premium mobile select
function PremiumMobileSelect({
  label,
  options,
  value,
  onChange,
  delay = 0,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  delay?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-neutral-700">{label}</label>

      <motion.div
        className={`
          relative transition-all duration-300
          ${isFocused ? 'scale-[1.01]' : 'scale-100'}
        `}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-4 pr-12
            bg-neutral-50 rounded-2xl border-2
            text-base text-neutral-900 appearance-none
            outline-none transition-all duration-300
            ${isFocused ? 'border-[#722F37] bg-white shadow-lg shadow-[#722F37]/10' : 'border-transparent'}
          `}
          style={{ fontSize: '16px' }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          animate={{ rotate: isFocused ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-neutral-400" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Premium contact method toggle
function PremiumContactMethodToggle({
  value,
  onChange,
  delay = 0,
}: {
  value: 'phone' | 'email';
  onChange: (value: 'phone' | 'email') => void;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-neutral-700">
        Preferred Contact Method
      </label>

      <div className="relative flex p-1 bg-neutral-100 rounded-2xl">
        {/* Animated background indicator */}
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[#722F37] to-[#8B3D47] rounded-xl shadow-md"
          animate={{ x: value === 'phone' ? 0 : 'calc(100% + 4px)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        <motion.button
          type="button"
          onClick={() => onChange('phone')}
          className={`
            relative z-10 flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
            font-semibold text-sm transition-colors duration-300
            ${value === 'phone' ? 'text-white' : 'text-neutral-600'}
          `}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          <Phone className="w-4 h-4" />
          Phone
        </motion.button>

        <motion.button
          type="button"
          onClick={() => onChange('email')}
          className={`
            relative z-10 flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
            font-semibold text-sm transition-colors duration-300
            ${value === 'email' ? 'text-white' : 'text-neutral-600'}
          `}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          <Mail className="w-4 h-4" />
          Email
        </motion.button>
      </div>
    </motion.div>
  );
}

export function ContactFormMobile() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const prefersReducedMotion = useReducedMotion();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      setIsSubmitted(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await submitContactForm({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
          service: formData.service,
          message: formData.message,
        });

        if (result.success) {
          setIsSubmitted(true);
          setFormData(initialFormData);
        } else {
          setErrors({ form: result.error || 'Something went wrong. Please try again.' });
        }
      } catch {
        setErrors({ form: 'Something went wrong. Please try again or call us directly.' });
      }
    });
  };

  // Premium success state
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative text-center py-10 px-4"
      >
        {/* Confetti-like decorative elements */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-4 left-1/4 w-3 h-3 bg-[#722F37]/20 rounded-full"
              animate={{ y: [0, -20, 0], opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="absolute top-8 right-1/4 w-2 h-2 bg-primary-300 rounded-full"
              animate={{ y: [0, -15, 0], opacity: [1, 0.5, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-1/4 left-10 w-2 h-2 bg-accent-300 rounded-full"
              animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
            />
          </>
        )}

        {/* Success icon with ring animation */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 bg-green-100 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-green-200 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display font-bold text-2xl text-neutral-900 mb-3"
        >
          Message Sent!
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-neutral-600 mb-2 text-base"
        >
          Thank you for reaching out to us.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-neutral-500 text-sm mb-8 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#722F37]" />
          We&apos;ll respond within 24 hours
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => setIsSubmitted(false)}
          className="w-full py-4 px-6 bg-neutral-100 text-neutral-700 font-bold rounded-2xl border border-neutral-200 active:bg-neutral-200 transition-colors"
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          Send Another Message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Form-level error */}
      <AnimatePresence>
        {errors.form && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl"
            role="alert"
          >
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm font-medium">{errors.form}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Input */}
      <PremiumMobileInput
        icon={User}
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, name: e.target.value }));
          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
        }}
        placeholder="Your full name"
        autoComplete="name"
        required
        error={errors.name}
        delay={0}
      />

      {/* Email Input */}
      <PremiumMobileInput
        icon={Mail}
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, email: e.target.value }));
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email}
        delay={0.05}
      />

      {/* Phone Input */}
      <PremiumMobileInput
        icon={Phone}
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(e.target.value) }));
          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
        }}
        placeholder="(613) 555-1234"
        autoComplete="tel"
        error={errors.phone}
        delay={0.1}
      />

      {/* Contact Method Toggle */}
      <PremiumContactMethodToggle
        value={formData.preferredContact}
        onChange={(value) => setFormData((prev) => ({ ...prev, preferredContact: value }))}
        delay={0.15}
      />

      {/* Service Select */}
      <PremiumMobileSelect
        label="Service Interested In"
        options={SERVICES}
        value={formData.service}
        onChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
        delay={0.2}
      />

      {/* Message Textarea */}
      <PremiumMobileTextarea
        icon={MessageSquare}
        label="Your Message"
        name="message"
        value={formData.message}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, message: e.target.value }));
          if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
        }}
        placeholder="Tell us how we can help you..."
        required
        error={errors.message}
        delay={0.25}
      />

      {/* Honeypot (hidden) */}
      <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="pt-2"
      >
        <motion.button
          type="submit"
          disabled={isPending}
          className={`
            relative w-full flex items-center justify-center gap-3
            py-5 px-6 rounded-2xl overflow-hidden
            bg-gradient-to-r from-[#722F37] to-[#8B3D47]
            text-white font-bold text-lg
            shadow-xl shadow-[#722F37]/30
            disabled:opacity-70 disabled:cursor-not-allowed
          `}
          whileTap={prefersReducedMotion || isPending ? {} : { scale: 0.98 }}
        >
          {/* Animated shine effect */}
          {!isPending && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          )}

          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Privacy Note */}
      <motion.p
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-neutral-500 text-center px-4 pt-2 flex items-center justify-center gap-1.5"
      >
        <Heart className="w-3 h-3 text-[#722F37]" />
        By submitting, you agree to our{' '}
        <a href="/privacy-policy" className="text-[#722F37] font-medium underline underline-offset-2">
          Privacy Policy
        </a>
      </motion.p>
    </form>
  );
}
