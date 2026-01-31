# Family Dental Care Website Build Plan

This document outlines the phased development approach for building the Ottawa South Dental website. Each phase builds upon the previous one, ensuring a systematic and organized development process.

> **Design Reference**: All UI/UX decisions should follow the guidelines in [DESIGN_LANGUAGE.md](./DESIGN_LANGUAGE.md)

---

## Phase 1: Project Setup & Foundation

### Goals
Establish the technical foundation and development environment for the project.

### Tasks

#### 1.1 Next.js Project Initialization
- [ ] Initialize Next.js 14+ with App Router
- [ ] Configure TypeScript with strict mode
- [ ] Set up path aliases (`@/components`, `@/lib`, etc.)

#### 1.2 Styling Setup
- [ ] Install and configure Tailwind CSS
- [ ] Set up custom color palette from DESIGN_LANGUAGE.md
- [ ] Configure typography scale and font families
- [ ] Create CSS custom properties for theme tokens

#### 1.3 Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── services/          # Services pages
│   ├── about/             # About pages
│   ├── contact/           # Contact page
│   └── patient-info/      # Patient information pages
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Header, Footer, Navigation
│   └── sections/          # Page sections
├── lib/                   # Utilities and helpers
├── data/                  # Static data and content
└── styles/                # Global styles
```

#### 1.4 Developer Experience
- [ ] Configure ESLint with Next.js recommended rules
- [ ] Set up Prettier for code formatting
- [ ] Create `.editorconfig` for consistent coding style
- [ ] Add VS Code workspace settings

#### 1.5 Assets Integration
- [ ] Copy logo to `public/LOGO.png`
- [ ] Organize clinic images in `public/images/clinic/`
- [ ] Organize patient images in `public/images/patients/`
- [ ] Organize children images in `public/images/children/`
- [ ] Organize cosmetic images in `public/images/cosmetic/`

### Deliverables
- Functioning Next.js development environment
- Configured Tailwind with custom theme
- Organized project structure
- All assets in place

---

## Phase 2: Core Layout & Components

### Goals
Build the foundational layout components and reusable UI elements that will be used across all pages.

### Tasks

#### 2.1 Header Component
- [ ] Logo placement and sizing
- [ ] Main navigation menu
- [ ] Phone number with click-to-call
- [ ] "Book Appointment" CTA button
- [ ] Language indicator (English, Punjabi, Hindi)
- [ ] Sticky header behavior on scroll

#### 2.2 Mobile Navigation
- [ ] Hamburger menu icon
- [ ] Slide-out or dropdown mobile menu
- [ ] Touch-friendly navigation items
- [ ] Mobile-optimized CTA buttons

#### 2.3 Footer Component
- [ ] Practice logo and tagline
- [ ] Contact information section
  - Address: 1985 Bank Street, Ottawa, ON K1V 7Z9
  - Phone: (613) 733-6446
- [ ] Hours of operation display
- [ ] Languages spoken (English, Punjabi, Hindi)
- [ ] Quick links navigation
- [ ] Social media links (if applicable)
- [ ] Copyright notice

#### 2.4 Reusable UI Components
- [ ] Button component (primary, secondary, outline variants)
- [ ] Card component (for services, team members)
- [ ] Section container with consistent padding
- [ ] Heading components (page title, section title)
- [ ] Badge/Tag component (for "CDCP Accepted", "Direct Billing")
- [ ] Icon component wrapper

#### 2.5 Contact CTA Component
- [ ] Prominent call-to-action banner
- [ ] Phone number display
- [ ] "Book Appointment" button
- [ ] Emergency contact messaging
- [ ] Reusable across multiple pages

### Deliverables
- Complete header with responsive navigation
- Footer with all required information
- Library of reusable UI components
- Consistent spacing and layout system

---

## Phase 3: Homepage Development

### Goals
Create an engaging homepage that introduces the practice and guides visitors to key information.

### Tasks

#### 3.1 Hero Section
- [ ] Large hero image (from clinic images)
- [ ] Welcoming headline
- [ ] Brief practice description
- [ ] Primary CTA: "Book Your Appointment"
- [ ] Secondary CTA: "Call Us Now"
- [ ] Key trust indicators visible

#### 3.2 Key Differentiators Section
- [ ] CDCP (Canadian Dental Care Plan) Accepted badge
- [ ] Direct Insurance Billing highlight
- [ ] Emergency Dental Care availability
- [ ] 6 Experienced Dentists on staff
- [ ] Multilingual service (English, Punjabi, Hindi)
- [ ] Icon-based visual presentation

#### 3.3 Services Overview Grid
- [ ] Display of main service categories
- [ ] Service cards with icons and brief descriptions
- [ ] Links to individual service pages
- [ ] Highlight popular services:
  - Routine Checkups
  - Cosmetic Dentistry
  - Dental Implants
  - Invisalign
  - Emergency Care

#### 3.4 About/Team Preview
- [ ] Brief introduction to the practice
- [ ] "Serving Ottawa families since [year]"
- [ ] Team photo or grid of dentist photos
- [ ] "Meet Our Team" CTA button
- [ ] Link to full About page

#### 3.5 Testimonials Section
- [ ] Testimonial card design (placeholder content)
- [ ] Patient name and service received
- [ ] Star rating display
- [ ] Carousel or grid layout
- [ ] "Read More Reviews" link

#### 3.6 Contact CTA Banner
- [ ] Full-width call-to-action section
- [ ] "Ready to Schedule Your Visit?"
- [ ] Phone number prominently displayed
- [ ] Online booking button
- [ ] Office hours quick reference

### Deliverables
- Complete homepage with all sections
- Mobile-responsive design
- Clear calls-to-action throughout
- Engaging visual presentation

---

## Phase 4: Services Pages

### Goals
Create comprehensive service pages that educate patients and encourage appointments.

### Tasks

#### 4.1 Services Landing Page
- [ ] Page header with introduction
- [ ] Grid of all 13 services
- [ ] Service cards with:
  - Service icon
  - Service name
  - Brief description
  - "Learn More" link
- [ ] Category grouping (optional)
- [ ] CTA to book appointment

#### 4.2 Individual Service Pages

Each service page should include:
- [ ] Service name and hero image
- [ ] Detailed service description
- [ ] Benefits/Why choose this service
- [ ] What to expect (procedure overview)
- [ ] FAQ section (3-5 questions per service)
- [ ] Related services suggestions
- [ ] "Book This Service" CTA

##### Service Pages to Create:

1. **Routine Checkups** (`/services/routine-checkups`)
   - Regular dental examinations
   - Importance of 6-month visits
   - What's included in a checkup

2. **Preventive Dentistry** (`/services/preventive-dentistry`)
   - Fluoride treatments
   - Dental sealants
   - Oral health education

3. **Dental Hygiene** (`/services/dental-hygiene`)
   - Professional cleaning
   - Deep cleaning (scaling)
   - Periodontal maintenance

4. **White Fillings** (`/services/white-fillings`)
   - Composite resin fillings
   - Mercury-free options
   - Natural-looking results

5. **Root Canal Treatment** (`/services/root-canal`)
   - Endodontic therapy
   - Pain-free procedures
   - Saving natural teeth

6. **Cosmetic Dentistry** (`/services/cosmetic-dentistry`)
   - Smile makeovers
   - Veneers
   - Bonding

7. **Dental Implants** (`/services/dental-implants`)
   - Single tooth replacement
   - Implant-supported dentures
   - Long-term solution

8. **Missing Teeth Solutions** (`/services/missing-teeth`)
   - Bridges
   - Partial dentures
   - Treatment options comparison

9. **Gum Therapy** (`/services/gum-therapy`)
   - Periodontal treatment
   - Gum disease management
   - Maintenance programs

10. **Oral Surgery** (`/services/oral-surgery`)
    - Tooth extractions
    - Wisdom teeth removal
    - Surgical procedures

11. **Invisalign** (`/services/invisalign`)
    - Clear aligner treatment
    - Treatment process
    - Before/after results

12. **Teeth Whitening** (`/services/teeth-whitening`)
    - Professional whitening options
    - In-office vs take-home
    - Expected results

13. **Dentures** (`/services/dentures`)
    - Full dentures
    - Partial dentures
    - Denture care

### Deliverables
- Services landing page
- 13 individual service detail pages
- FAQ content for each service
- Consistent design across all service pages

---

## Phase 5: About & Team Pages

### Goals
Build trust by showcasing the practice history, philosophy, and introducing the dental team.

### Tasks

#### 5.1 About the Practice Page (`/about`)
- [ ] Practice history and founding story
- [ ] Mission statement
- [ ] Practice philosophy
- [ ] Commitment to patient care
- [ ] Office photos gallery
- [ ] Technology and equipment highlights
- [ ] Community involvement (if applicable)

#### 5.2 Meet the Team Page (`/about/team`)
- [ ] Team page introduction
- [ ] Individual dentist profiles (6 dentists):

**Team Members to Feature:**
1. **Dr. Harvinder Sidhu** - Photo available: `public/dr.sidhu.jpg`
2. **Dr. Shivani Sharma**
3. **Dr. Salima Thawer**
4. **Dr. Nancy Sehgal**
5. **Dr. Arti Joshi**
6. **Dr. Fatemah Almoaibed**

Each profile should include:
- [ ] Professional photo
- [ ] Name and credentials
- [ ] Education and training
- [ ] Specialties/Areas of focus
- [ ] Languages spoken
- [ ] Personal bio/interests

#### 5.3 Practice Philosophy Section
- [ ] Patient-centered care approach
- [ ] Commitment to comfort and anxiety-free dentistry
- [ ] Continuing education commitment
- [ ] Modern technology utilization
- [ ] Family-friendly environment

### Deliverables
- Comprehensive About page
- Team page with all 6 dentists
- Professional presentation of practice values

---

## Phase 6: Patient Information Pages

### Goals
Provide clear information about payments, insurance, and new patient procedures.

### Tasks

#### 6.1 Payment & Insurance Page (`/patient-info/payment-insurance`)
- [ ] Accepted payment methods
- [ ] Insurance information overview
- [ ] Direct billing explanation
- [ ] List of accepted insurance providers
- [ ] Payment plans (if available)
- [ ] Financial FAQs

#### 6.2 CDCP Information Section
- [ ] What is CDCP (Canadian Dental Care Plan)
- [ ] Eligibility information
- [ ] Services covered under CDCP
- [ ] How to use CDCP at our practice
- [ ] CDCP FAQs
- [ ] Call-to-action for eligible patients

#### 6.3 Direct Billing Explanation
- [ ] How direct billing works
- [ ] Benefits for patients
- [ ] Supported insurance companies
- [ ] What patients need to bring

#### 6.4 New Patient Information (`/patient-info/new-patients`)
- [ ] What to expect on first visit
- [ ] Required documents/ID
- [ ] Patient forms (downloadable or online)
- [ ] Pre-appointment instructions
- [ ] Office policies
- [ ] Cancellation policy

### Deliverables
- Payment & Insurance information page
- CDCP dedicated section
- New patient welcome page
- Clear, accessible financial information

---

## Phase 7: Contact & Location

### Goals
Make it easy for patients to find, contact, and visit the practice.

### Tasks

#### 7.1 Contact Page (`/contact`)
- [ ] Page header with welcoming message
- [ ] Contact form with fields:
  - Name
  - Email
  - Phone
  - Preferred contact method
  - Service interested in
  - Message
- [ ] Form validation
- [ ] Success/error messaging
- [ ] Spam protection (honeypot or reCAPTCHA)

#### 7.2 Location Information
- [ ] Full address display:
  **1985 Bank Street, Ottawa, ON K1V 7Z9**
- [ ] Google Maps embed
- [ ] Directions from major landmarks
- [ ] Parking information
- [ ] Public transit access
- [ ] Accessibility information

#### 7.3 Contact Details
- [ ] Phone: (613) 733-6446
- [ ] Click-to-call functionality
- [ ] Email address (if applicable)
- [ ] Fax number (if applicable)

#### 7.4 Hours of Operation
- [ ] Clear weekly schedule display
- [ ] Current day highlighting
- [ ] Holiday hours notice capability
- [ ] Emergency contact information

#### 7.5 Languages Section
- [ ] Languages spoken at practice:
  - English
  - Punjabi
  - Hindi
- [ ] Staff language capabilities

### Deliverables
- Functional contact page with form
- Embedded Google Map
- Complete contact information display
- Accessible hours and location info

---

## Phase 8: SEO & Performance

### Goals
Optimize the website for search engines and ensure fast loading times.

### Tasks

#### 8.1 Meta Tags & Open Graph
- [ ] Unique title tags for each page
- [ ] Meta descriptions for all pages
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Canonical URLs

#### 8.2 Image Optimization
- [ ] Convert images to WebP format
- [ ] Implement responsive images
- [ ] Add proper alt text to all images
- [ ] Lazy loading for below-fold images
- [ ] Image compression

#### 8.3 Structured Data
- [ ] LocalBusiness schema markup
- [ ] Dental practice specific schema
- [ ] Service schema for each service
- [ ] FAQ schema for service FAQs
- [ ] BreadcrumbList schema

#### 8.4 Technical SEO
- [ ] Generate XML sitemap
- [ ] Create robots.txt
- [ ] Implement proper heading hierarchy
- [ ] Internal linking strategy
- [ ] 404 error page

#### 8.5 Performance Optimization
- [ ] Enable Next.js static generation where possible
- [ ] Code splitting and lazy loading
- [ ] Font optimization
- [ ] Minimize JavaScript bundle
- [ ] Enable compression
- [ ] Core Web Vitals optimization

### Deliverables
- Complete SEO implementation
- Optimized images throughout
- Structured data on all pages
- Performance score targets met

---

## Phase 9: Testing & Launch

### Goals
Ensure quality, accessibility, and successful deployment.

### Tasks

#### 9.1 Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

#### 9.2 Responsive Testing
- [ ] Mobile phones (320px - 480px)
- [ ] Large phones (480px - 768px)
- [ ] Tablets (768px - 1024px)
- [ ] Desktops (1024px - 1440px)
- [ ] Large screens (1440px+)

#### 9.3 Accessibility Audit
- [ ] WCAG 2.1 AA compliance check
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Color contrast verification
- [ ] Focus indicators
- [ ] Alt text verification

#### 9.4 Functionality Testing
- [ ] Contact form submission
- [ ] All navigation links
- [ ] Phone click-to-call
- [ ] External links (open in new tab)
- [ ] Google Maps functionality
- [ ] Image loading

#### 9.5 Final Review
- [ ] Content proofreading
- [ ] Spelling and grammar check
- [ ] Consistent branding
- [ ] All placeholder content replaced
- [ ] Legal pages (Privacy Policy, if needed)

#### 9.6 Deployment
- [ ] Production build testing
- [ ] Environment variables configuration
- [ ] Domain setup
- [ ] SSL certificate verification
- [ ] Analytics setup (Google Analytics)
- [ ] Search Console registration

### Deliverables
- Fully tested website
- Accessibility compliance
- Production deployment
- Analytics tracking active

---

## Data Sources Reference

All content should be sourced from:

| Content Type | Source File |
|-------------|-------------|
| Practice Info | `ottawa_dentist_data/practice-info.md` |
| Services | `ottawa_dentist_data/services.md` |
| Team Information | `ottawa_dentist_data/team.md` |
| Payment & Insurance | `ottawa_dentist_data/payment-and-insurance.md` |

---

## Assets Inventory

### Logo
- `public/LOGO.png` - Practice logo

### Team Photos
- `public/dr.sidhu.jpg` - Dr. Harvinder Sidhu

### Image Library

| Category | Location | Count |
|----------|----------|-------|
| Clinic Images | `public/images/clinic/` | 25 images |
| Patient Images | `public/images/patients/` | 30 images |
| Children Images | `public/images/children/` | 23 images |
| Cosmetic Images | `public/images/cosmetic/` | 20 images |

---

## Timeline Overview

| Phase | Description | Dependencies |
|-------|-------------|--------------|
| Phase 1 | Project Setup & Foundation | None |
| Phase 2 | Core Layout & Components | Phase 1 |
| Phase 3 | Homepage Development | Phase 2 |
| Phase 4 | Services Pages | Phase 2 |
| Phase 5 | About & Team Pages | Phase 2 |
| Phase 6 | Patient Information Pages | Phase 2 |
| Phase 7 | Contact & Location | Phase 2 |
| Phase 8 | SEO & Performance | Phases 3-7 |
| Phase 9 | Testing & Launch | Phase 8 |

---

## Notes

- Always refer to [DESIGN_LANGUAGE.md](./DESIGN_LANGUAGE.md) for styling decisions
- Maintain consistent component usage across all pages
- Prioritize mobile-first development approach
- Test incrementally throughout development
- Document any deviations from this plan
