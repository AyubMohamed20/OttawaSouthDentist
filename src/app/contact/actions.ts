'use server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email';
  service: string;
  message: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

// Basic server-side validation
function validateFormData(data: ContactFormData): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return 'Name is required and must be at least 2 characters';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'A valid email address is required';
  }

  if (!data.message || data.message.trim().length < 10) {
    return 'Message is required and must be at least 10 characters';
  }

  // Check for suspicious patterns (basic spam detection)
  const suspiciousPatterns = [
    /\[url=/i,
    /\[link=/i,
    /<a\s+href/i,
    /href=/i,
    /https?:\/\/[^\s]+\s+https?:\/\//i, // Multiple URLs
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(data.message)) {
      return 'Your message contains content that appears to be spam';
    }
  }

  return null;
}

export async function submitContactForm(data: ContactFormData): Promise<SubmitResult> {
  // Validate on server side
  const validationError = validateFormData(data);
  if (validationError) {
    return { success: false, error: validationError };
  }

  try {
    // In a real application, you would:
    // 1. Send an email notification to the practice
    // 2. Store the inquiry in a database
    // 3. Send a confirmation email to the patient
    // 4. Integrate with a CRM or practice management system

    // For now, we'll simulate a successful submission
    // Replace this with actual email sending logic

    // Example email sending (uncomment and configure when ready):
    // await sendEmail({
    //   to: 'info@ottawasouthdental.com',
    //   subject: `New Contact Form Submission from ${data.name}`,
    //   body: formatEmailBody(data),
    // });

    // Simulate network delay for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log submission (in production, use proper logging)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferredContact: data.preferredContact,
      service: data.service,
      messageLength: data.message.length,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: 'We were unable to send your message. Please try again or call us directly.',
    };
  }
}

// Helper function to format email body (for future use)
// eslint-disable-next-line no-unused-vars
function formatEmailBody(data: ContactFormData): string {
  return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Preferred Contact: ${data.preferredContact}
Service Interest: ${data.service || 'Not specified'}

Message:
${data.message}

---
Submitted at: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
  `.trim();
}
