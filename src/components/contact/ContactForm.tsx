'use client';

import { useState, useTransition } from 'react';
import { Send, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/app/contact/actions';

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email';
  service: string;
  message: string;
  honeypot: string; // Spam protection
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
  // Allow various phone formats
  const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
  return phone === '' || phoneRegex.test(phone.replace(/\s/g, ''));
}

function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Format phone number as user types
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      // Silently "succeed" to not alert bots
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

  // Success state
  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" role="img" aria-label="Success">
          <CheckCircle className="w-8 h-8 text-green-700" aria-hidden="true" />
        </div>
        <h3 className="font-display font-bold text-2xl text-neutral-900 mb-3">
          Message Sent Successfully!
        </h3>
        <p className="text-neutral-600 mb-6 max-w-md mx-auto">
          Thank you for reaching out. We&apos;ll review your message and get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  const inputBaseClasses = [
    'w-full px-4 py-3 rounded-xl border bg-white',
    'text-neutral-900 placeholder:text-neutral-500',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[#722F37]/30 focus:border-[#722F37]',
  ].join(' ');

  const labelClasses = 'block text-sm font-medium text-neutral-700 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Form error message */}
      {errors.form && (
        <div
          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
          role="alert"
          aria-live="polite"
        >
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-red-700 text-sm">{errors.form}</p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className={labelClasses}>
          Full Name <span className="text-accent-500" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="John Smith"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={[
            inputBaseClasses,
            errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-200',
          ].join(' ')}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email Address <span className="text-accent-500" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={[
            inputBaseClasses,
            errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-200',
          ].join(' ')}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="(613) 555-1234"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={[
            inputBaseClasses,
            errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-200',
          ].join(' ')}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <fieldset>
        <legend className={labelClasses}>Preferred Contact Method</legend>
        <div className="flex gap-6 mt-2" role="radiogroup" aria-label="Preferred contact method">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={handleInputChange}
              className="w-4 h-4 text-[#722F37] border-neutral-300 focus:ring-[#722F37]/30 focus:ring-2"
            />
            <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors">
              Phone
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={handleInputChange}
              className="w-4 h-4 text-[#722F37] border-neutral-300 focus:ring-[#722F37]/30 focus:ring-2"
            />
            <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors">
              Email
            </span>
          </label>
        </div>
      </fieldset>

      {/* Service Interest */}
      <div>
        <label htmlFor="service" className={labelClasses}>
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          className={[inputBaseClasses, 'border-neutral-200'].join(' ')}
        >
          {SERVICES.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          Your Message <span className="text-accent-500" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell us how we can help you..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={[
            inputBaseClasses,
            'resize-none',
            errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-200',
          ].join(' ')}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot - Hidden from humans, visible to bots */}
      <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
        <label htmlFor="website">
          Leave this field empty
          <input
            type="text"
            id="website"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isPending}
        leftIcon={isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Privacy Note */}
      <p className="text-xs text-neutral-500 text-center">
        By submitting this form, you agree to our{' '}
        <a href="/privacy-policy" className="text-[#722F37] hover:underline">
          Privacy Policy
        </a>
        . We&apos;ll never share your information with third parties.
      </p>
    </form>
  );
}
