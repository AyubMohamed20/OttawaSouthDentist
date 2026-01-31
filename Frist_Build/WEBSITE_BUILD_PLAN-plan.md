---
config:
  name: "Family Dental Care Website Build"
  workers: 5
  timeout: 3600
  retries: 3
  model: "opus"
  working_dir: "./"
  output_dir: "./"

variables:
  project_name: "Ottawa South Dental"
  address: "1985 Bank Street, Ottawa, ON K1V 7Z9"
  phone: "(613) 733-6446"
  languages: "English, Punjabi, Hindi"
  design_reference: "./DESIGN_LANGUAGE.md"

data_sources:
  services:
    type: inline
    items:
      - id: "routine-checkups"
        name: "Routine Checkups"
        route: "/services/routine-checkups"
        description: "Regular dental examinations, importance of 6-month visits, what's included in a checkup"
      - id: "preventive-dentistry"
        name: "Preventive Dentistry"
        route: "/services/preventive-dentistry"
        description: "Fluoride treatments, dental sealants, oral health education"
      - id: "dental-hygiene"
        name: "Dental Hygiene"
        route: "/services/dental-hygiene"
        description: "Professional cleaning, deep cleaning (scaling), periodontal maintenance"
      - id: "white-fillings"
        name: "White Fillings"
        route: "/services/white-fillings"
        description: "Composite resin fillings, mercury-free options, natural-looking results"
      - id: "root-canal"
        name: "Root Canal Treatment"
        route: "/services/root-canal"
        description: "Endodontic therapy, pain-free procedures, saving natural teeth"
      - id: "cosmetic-dentistry"
        name: "Cosmetic Dentistry"
        route: "/services/cosmetic-dentistry"
        description: "Smile makeovers, veneers, bonding"
      - id: "dental-implants"
        name: "Dental Implants"
        route: "/services/dental-implants"
        description: "Single tooth replacement, implant-supported dentures, long-term solution"
      - id: "missing-teeth"
        name: "Missing Teeth Solutions"
        route: "/services/missing-teeth"
        description: "Bridges, partial dentures, treatment options comparison"
      - id: "gum-therapy"
        name: "Gum Therapy"
        route: "/services/gum-therapy"
        description: "Periodontal treatment, gum disease management, maintenance programs"
      - id: "oral-surgery"
        name: "Oral Surgery"
        route: "/services/oral-surgery"
        description: "Tooth extractions, wisdom teeth removal, surgical procedures"
      - id: "invisalign"
        name: "Invisalign"
        route: "/services/invisalign"
        description: "Clear aligner treatment, treatment process, before/after results"
      - id: "teeth-whitening"
        name: "Teeth Whitening"
        route: "/services/teeth-whitening"
        description: "Professional whitening options, in-office vs take-home, expected results"
      - id: "dentures"
        name: "Dentures"
        route: "/services/dentures"
        description: "Full dentures, partial dentures, denture care"

  team_members:
    type: inline
    items:
      - id: "dr-sidhu"
        name: "Dr. Harvinder Sidhu"
        photo: "public/dr.sidhu.jpg"
        has_photo: true
      - id: "dr-sharma"
        name: "Dr. Shivani Sharma"
        photo: null
        has_photo: false
      - id: "dr-thawer"
        name: "Dr. Salima Thawer"
        photo: null
        has_photo: false
      - id: "dr-sehgal"
        name: "Dr. Nancy Sehgal"
        photo: null
        has_photo: false
      - id: "dr-joshi"
        name: "Dr. Arti Joshi"
        photo: null
        has_photo: false
      - id: "dr-almoaibed"
        name: "Dr. Fatemah Almoaibed"
        photo: null
        has_photo: false

  ui_components:
    type: inline
    items:
      - id: "button"
        name: "Button"
        variants: "primary, secondary, outline"
      - id: "card"
        name: "Card"
        variants: "service card, team member card"
      - id: "section-container"
        name: "Section Container"
        variants: "consistent padding wrapper"
      - id: "heading"
        name: "Heading"
        variants: "page title, section title"
      - id: "badge"
        name: "Badge/Tag"
        variants: "CDCP Accepted, Direct Billing"
      - id: "icon-wrapper"
        name: "Icon Wrapper"
        variants: "icon component wrapper"

  homepage_sections:
    type: inline
    items:
      - id: "hero"
        name: "Hero Section"
        description: "Large hero image, welcoming headline, practice description, CTAs, trust indicators"
      - id: "differentiators"
        name: "Key Differentiators Section"
        description: "CDCP Accepted, Direct Insurance Billing, Emergency Care, 6 Dentists, Multilingual"
      - id: "services-overview"
        name: "Services Overview Grid"
        description: "Main service categories with icons, descriptions, and links"
      - id: "team-preview"
        name: "About/Team Preview"
        description: "Practice introduction, team photo grid, Meet Our Team CTA"
      - id: "testimonials"
        name: "Testimonials Section"
        description: "Testimonial cards, star ratings, carousel/grid layout"
      - id: "contact-cta"
        name: "Contact CTA Banner"
        description: "Full-width CTA, phone number, booking button, hours reference"

  patient_info_pages:
    type: inline
    items:
      - id: "payment-insurance"
        name: "Payment & Insurance"
        route: "/patient-info/payment-insurance"
        description: "Accepted payment methods, insurance info, direct billing, accepted providers, payment plans, FAQs"
      - id: "cdcp"
        name: "CDCP Information"
        route: "/patient-info/cdcp"
        description: "What is CDCP, eligibility, covered services, how to use at practice, FAQs"
      - id: "new-patients"
        name: "New Patient Information"
        route: "/patient-info/new-patients"
        description: "First visit expectations, required documents, patient forms, pre-appointment instructions, policies"
---

# Phase 1: Project Setup & Foundation
**execution:** sequential
**depends_on:** none

## Task: Initialize Next.js Project
**task_id:** nextjs-init

**outputs:**
- name: project_setup
  path: ${config.output_dir}/phase1/project-setup.md

```prompt
Initialize the Next.js project for ${config.project_name}.

## Instructions

1. **Next.js Project Initialization**
   - Initialize Next.js 14+ with App Router
   - Configure TypeScript with strict mode
   - Set up path aliases (@/components, @/lib, etc.)

2. **Styling Setup**
   - Install and configure Tailwind CSS
   - Set up custom color palette from ${config.design_reference}
   - Configure typography scale and font families
   - Create CSS custom properties for theme tokens

3. **Project Structure**
   Create the following directory structure:
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

4. **Developer Experience**
   - Configure ESLint with Next.js recommended rules
   - Set up Prettier for code formatting
   - Create .editorconfig for consistent coding style
   - Add VS Code workspace settings

5. **Assets Integration**
   - Copy logo to public/LOGO.png
   - Organize clinic images in public/images/clinic/
   - Organize patient images in public/images/patients/
   - Organize children images in public/images/children/
   - Organize cosmetic images in public/images/cosmetic/

## Design Reference
All styling decisions should follow: ${config.design_reference}

## Deliverables
- Functioning Next.js development environment
- Configured Tailwind with custom theme
- Organized project structure
- All assets in place

Report what was created and any configuration decisions made.
```

---

# Build Check: After Project Setup
**execution:** sequential
**depends_on:** Phase 1: Project Setup & Foundation

## Task: build_check
**task_id:** build-check-1

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-1-report.md

**requires:**
- task: nextjs-init
  output: project_setup
  as: setup_output

```prompt
Run the build checker for the project after initial setup.

## Instructions

1. **Run Build**
   - Execute: npm run build
   - Capture any errors or warnings

2. **Run Lint**
   - Execute: npm run lint
   - Note any linting issues

3. **Verify Setup**
   - Check that all directories were created
   - Verify Tailwind configuration is valid
   - Confirm TypeScript compiles without errors

4. **Fix Issues**
   - Apply fixes for any build errors
   - Resolve TypeScript type errors
   - Fix ESLint warnings/errors

5. **Report**
   - Summarize what was checked
   - List any issues found and fixes applied
   - Confirm build passes

## Previous Phase Output
${requires.setup_output}
```

---

# Phase 2: Core Layout & Components
**execution:** sequential
**depends_on:** Build Check: After Project Setup

## Task: Create Header Component
**task_id:** header-component

**outputs:**
- name: header_code
  path: ${config.output_dir}/phase2/header.md

**requires:**
- task: build-check-1
  output: build_report
  as: prev_build

```prompt
Create the Header component for ${config.project_name}.

## Requirements

1. **Header Component** (src/components/layout/Header.tsx)
   - Logo placement and sizing (public/LOGO.png)
   - Main navigation menu with links to: Services, About, Patient Info, Contact
   - Phone number with click-to-call: ${config.phone}
   - "Book Appointment" CTA button (primary style)
   - Language indicator: ${config.languages}
   - Sticky header behavior on scroll

2. **Mobile Navigation**
   - Hamburger menu icon
   - Slide-out or dropdown mobile menu
   - Touch-friendly navigation items
   - Mobile-optimized CTA buttons

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- Header.tsx component with responsive behavior
- MobileNav.tsx component for mobile menu
- Proper TypeScript types
```

---

## Task: Create Footer Component
**task_id:** footer-component

**outputs:**
- name: footer_code
  path: ${config.output_dir}/phase2/footer.md

**requires:**
- task: build-check-1
  output: build_report
  as: prev_build

```prompt
Create the Footer component for ${config.project_name}.

## Requirements

1. **Footer Component** (src/components/layout/Footer.tsx)
   - Practice logo and tagline
   - Contact information section:
     - Address: ${config.address}
     - Phone: ${config.phone}
   - Hours of operation display
   - Languages spoken: ${config.languages}
   - Quick links navigation (Services, About, Contact, Patient Info)
   - Copyright notice with current year

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- Footer.tsx component
- Proper TypeScript types
- Responsive layout for mobile/desktop
```

---

## Task Template: Create UI Components
**foreach:** ${data.ui_components}
**task_id:** ui-${item.id | slugify}

**outputs:**
- name: component_code
  path: ${config.output_dir}/phase2/ui/${item.id}.md

**requires:**
- task: build-check-1
  output: build_report
  as: prev_build

```prompt
Create the ${item.name} UI component for ${config.project_name}.

## Component Details
- **Name**: ${item.name}
- **Variants**: ${item.variants}
- **Location**: src/components/ui/${item.id | slugify}.tsx

## Requirements
1. Create a reusable, well-typed component
2. Support all specified variants via props
3. Follow Tailwind CSS patterns from ${config.design_reference}
4. Include proper accessibility attributes
5. Export from src/components/ui/index.ts

## Deliverables
- Component file with TypeScript
- All variants implemented
- Exported from barrel file
```

---

## Task: Create Contact CTA Component
**task_id:** contact-cta-component

**outputs:**
- name: cta_code
  path: ${config.output_dir}/phase2/contact-cta.md

**requires:**
- task: build-check-1
  output: build_report
  as: prev_build

```prompt
Create the Contact CTA component for ${config.project_name}.

## Requirements

1. **Contact CTA Component** (src/components/sections/ContactCTA.tsx)
   - Prominent call-to-action banner
   - Phone number display: ${config.phone}
   - "Book Appointment" button
   - Emergency contact messaging
   - Reusable across multiple pages

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- ContactCTA.tsx component
- Multiple size/style variants (full-width, compact)
- Proper TypeScript types
```

---

# Build Check: After Core Components
**execution:** sequential
**depends_on:** Phase 2: Core Layout & Components

## Task: build_check
**task_id:** build-check-2

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-2-report.md

**requires:**
- task: header-component
  output: header_code
  as: header
- task: footer-component
  output: footer_code
  as: footer
- task: contact-cta-component
  output: cta_code
  as: cta

```prompt
Run the build checker after creating core layout components.

## Instructions

1. **Run Build**
   - Execute: npm run build
   - Capture any errors or warnings

2. **Run Lint**
   - Execute: npm run lint
   - Note any linting issues

3. **Verify Components**
   - Check Header component renders without errors
   - Check Footer component renders without errors
   - Verify all UI components export correctly
   - Test responsive behavior compiles

4. **Fix Issues**
   - Apply fixes for any build errors
   - Resolve TypeScript type errors
   - Fix component integration issues

5. **Validate Integration**
   - Verify components can be imported in layout.tsx
   - Check for naming conflicts
   - Ensure consistent styling tokens

6. **Report**
   - Summarize what was checked
   - List any issues found and fixes applied
   - Confirm build passes

## Previous Phase Components
- Header: ${requires.header}
- Footer: ${requires.footer}
- Contact CTA: ${requires.cta}
```

---

# Phase 3: Homepage Development
**execution:** parallel
**depends_on:** Build Check: After Core Components

## Task Template: Create Homepage Section
**foreach:** ${data.homepage_sections}
**task_id:** homepage-${item.id | slugify}

**outputs:**
- name: section_code
  path: ${config.output_dir}/phase3/sections/${item.id}.md

**requires:**
- task: build-check-2
  output: build_report
  as: prev_build

```prompt
Create the ${item.name} for the ${config.project_name} homepage.

## Section Details
- **Name**: ${item.name}
- **Description**: ${item.description}
- **Location**: src/components/sections/${item.id | slugify}.tsx

## Requirements
1. Create a responsive section component
2. Follow design patterns from ${config.design_reference}
3. Use existing UI components from src/components/ui/
4. Include proper accessibility attributes
5. Optimize images with Next.js Image component

## Practice Information
- Phone: ${config.phone}
- Address: ${config.address}
- Languages: ${config.languages}

## Deliverables
- Section component with TypeScript
- Mobile-responsive design
- Integration with existing components
```

---

## Task: Assemble Homepage
**task_id:** homepage-assembly

**outputs:**
- name: homepage_code
  path: ${config.output_dir}/phase3/homepage.md

**requires:**
- task: homepage-hero
  output: section_code
  as: hero
- task: homepage-differentiators
  output: section_code
  as: differentiators
- task: homepage-services-overview
  output: section_code
  as: services
- task: homepage-team-preview
  output: section_code
  as: team
- task: homepage-testimonials
  output: section_code
  as: testimonials
- task: homepage-contact-cta
  output: section_code
  as: cta

```prompt
Assemble the complete homepage for ${config.project_name}.

## Instructions

1. **Update src/app/page.tsx**
   - Import all homepage section components
   - Arrange sections in proper order:
     1. Hero Section
     2. Key Differentiators
     3. Services Overview Grid
     4. About/Team Preview
     5. Testimonials Section
     6. Contact CTA Banner

2. **Add Page Metadata**
   - Title: "${config.project_name} | Family Dentistry in Ottawa"
   - Description for SEO

3. **Verify Integration**
   - All sections render correctly
   - Smooth scrolling between sections
   - Mobile responsive layout

## Section Outputs
- Hero: ${requires.hero}
- Differentiators: ${requires.differentiators}
- Services: ${requires.services}
- Team: ${requires.team}
- Testimonials: ${requires.testimonials}
- CTA: ${requires.cta}

## Deliverables
- Complete homepage at src/app/page.tsx
- All sections integrated
- Page metadata configured
```

---

# Phase 4: Services Pages
**execution:** parallel
**depends_on:** Build Check: After Core Components

## Task: Create Services Landing Page
**task_id:** services-landing

**outputs:**
- name: landing_code
  path: ${config.output_dir}/phase4/services-landing.md

**requires:**
- task: build-check-2
  output: build_report
  as: prev_build

```prompt
Create the Services landing page for ${config.project_name}.

## Requirements

1. **Page Location**: src/app/services/page.tsx

2. **Content**
   - Page header with introduction to services
   - Grid of all 13 services
   - Service cards with:
     - Service icon
     - Service name
     - Brief description
     - "Learn More" link to individual page
   - CTA to book appointment

3. **Page Metadata**
   - Title: "Dental Services | ${config.project_name}"
   - Meta description for SEO

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- Services landing page
- Responsive grid layout
- Links to all individual service pages
```

---

## Task Template: Create Service Page
**foreach:** ${data.services}
**task_id:** service-${item.id | slugify}

**outputs:**
- name: service_page
  path: ${config.output_dir}/phase4/services/${item.id}.md

**requires:**
- task: build-check-2
  output: build_report
  as: prev_build

```prompt
Create the ${item.name} service page for ${config.project_name}.

## Service Details
- **Name**: ${item.name}
- **Route**: ${item.route}
- **Description**: ${item.description}
- **Location**: src/app/services/${item.id}/page.tsx

## Page Requirements

1. **Hero Section**
   - Service name as H1
   - Hero image (select appropriate from public/images/)

2. **Content Sections**
   - Detailed service description
   - Benefits/Why choose this service
   - What to expect (procedure overview)

3. **FAQ Section**
   - 3-5 relevant questions for ${item.name}
   - Accordion-style FAQ component

4. **Related Services**
   - Suggest 2-3 related services
   - Link cards to other service pages

5. **CTA Section**
   - "Book This Service" button
   - Phone number: ${config.phone}

6. **Page Metadata**
   - Title: "${item.name} | ${config.project_name}"
   - Meta description for SEO

## Content Source
Reference: ottawa_dentist_data/services.md

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- Individual service page
- FAQ content
- Related services links
- SEO metadata
```

---

# Phase 5: About & Team Pages
**execution:** parallel
**depends_on:** Build Check: After Core Components

## Task: Create About Page
**task_id:** about-page

**outputs:**
- name: about_code
  path: ${config.output_dir}/phase5/about.md

**requires:**
- task: build-check-2
  output: build_report
  as: prev_build

```prompt
Create the About the Practice page for ${config.project_name}.

## Requirements

1. **Page Location**: src/app/about/page.tsx

2. **Content Sections**
   - Practice history and founding story
   - Mission statement
   - Practice philosophy
   - Commitment to patient care
   - Office photos gallery (from public/images/clinic/)
   - Technology and equipment highlights
   - Community involvement

3. **Page Metadata**
   - Title: "About Us | ${config.project_name}"
   - Meta description for SEO

## Content Source
Reference: ottawa_dentist_data/practice-info.md

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- About page with all sections
- Photo gallery component
- Responsive layout
```

---

## Task: Create Team Page
**task_id:** team-page

**outputs:**
- name: team_code
  path: ${config.output_dir}/phase5/team.md

**requires:**
- task: build-check-2
  output: build_report
  as: prev_build

```prompt
Create the Meet the Team page for ${config.project_name}.

## Requirements

1. **Page Location**: src/app/about/team/page.tsx

2. **Team Page Introduction**
   - Welcoming header
   - Brief introduction to the dental team

3. **Team Member Profiles** (6 dentists)
   - Dr. Harvinder Sidhu (photo: public/dr.sidhu.jpg)
   - Dr. Shivani Sharma
   - Dr. Salima Thawer
   - Dr. Nancy Sehgal
   - Dr. Arti Joshi
   - Dr. Fatemah Almoaibed

   Each profile includes:
   - Professional photo (placeholder for those without)
   - Name and credentials
   - Education and training
   - Specialties/Areas of focus
   - Languages spoken
   - Personal bio/interests

4. **Practice Philosophy Section**
   - Patient-centered care approach
   - Commitment to comfort and anxiety-free dentistry
   - Continuing education commitment
   - Modern technology utilization
   - Family-friendly environment

5. **Page Metadata**
   - Title: "Our Team | ${config.project_name}"
   - Meta description for SEO

## Content Source
Reference: ottawa_dentist_data/team.md

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- Team page with all 6 dentists
- Team member card component
- Profile modal or expandable sections
```

---

# Phase 6: Patient Information Pages
**execution:** parallel
**depends_on:** Build Check: After Core Components

## Task Template: Create Patient Info Page
**foreach:** ${data.patient_info_pages}
**task_id:** patient-info-${item.id | slugify}

**outputs:**
- name: page_code
  path: ${config.output_dir}/phase6/${item.id}.md

**requires:**
- task: build-check-2
  output: build_report
  as: prev_build

```prompt
Create the ${item.name} page for ${config.project_name}.

## Page Details
- **Name**: ${item.name}
- **Route**: ${item.route}
- **Description**: ${item.description}
- **Location**: src/app${item.route}/page.tsx

## Requirements

1. **Page Content**
   ${item.description}

2. **Design Elements**
   - Clear section headings
   - Easy-to-scan lists
   - FAQ accordion (if applicable)
   - Contact CTA at bottom

3. **Page Metadata**
   - Title: "${item.name} | ${config.project_name}"
   - Meta description for SEO

## Content Source
Reference: ottawa_dentist_data/payment-and-insurance.md

## Practice Information
- Phone: ${config.phone}
- Address: ${config.address}

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- Complete page with all content sections
- Responsive layout
- SEO metadata
```

---

# Phase 7: Contact & Location
**execution:** parallel
**depends_on:** Build Check: After Core Components

## Task: Create Contact Page
**task_id:** contact-page

**outputs:**
- name: contact_code
  path: ${config.output_dir}/phase7/contact.md

**requires:**
- task: build-check-2
  output: build_report
  as: prev_build

```prompt
Create the Contact page for ${config.project_name}.

## Requirements

1. **Page Location**: src/app/contact/page.tsx

2. **Page Header**
   - Welcoming message
   - Brief introduction

3. **Contact Form**
   - Fields: Name, Email, Phone, Preferred contact method, Service interested in, Message
   - Form validation
   - Success/error messaging
   - Spam protection (honeypot)

4. **Location Information**
   - Full address: ${config.address}
   - Google Maps embed
   - Directions from major landmarks
   - Parking information
   - Public transit access
   - Accessibility information

5. **Contact Details**
   - Phone: ${config.phone}
   - Click-to-call functionality
   - Email address (if applicable)

6. **Hours of Operation**
   - Clear weekly schedule display
   - Current day highlighting
   - Holiday hours notice capability
   - Emergency contact information

7. **Languages Section**
   - Languages spoken: ${config.languages}
   - Staff language capabilities

8. **Page Metadata**
   - Title: "Contact Us | ${config.project_name}"
   - Meta description for SEO

## Design Reference
Follow styling guidelines from ${config.design_reference}

## Deliverables
- Contact page with form
- Google Maps integration
- Hours display component
- Form handling setup
```

---

# Build Check: After Page Development
**execution:** sequential
**depends_on:** Phase 3: Homepage Development, Phase 4: Services Pages, Phase 5: About & Team Pages, Phase 6: Patient Information Pages, Phase 7: Contact & Location

## Task: build_check
**task_id:** build-check-3

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-3-7-report.md

**requires:**
- task: homepage-assembly
  output: homepage_code
  as: homepage
- task: services-landing
  output: landing_code
  as: services_landing
- task: about-page
  output: about_code
  as: about
- task: team-page
  output: team_code
  as: team
- task: contact-page
  output: contact_code
  as: contact

```prompt
Run the build checker after all page development phases.

## Instructions

1. **Run Build**
   - Execute: npm run build
   - Capture any errors or warnings

2. **Run Lint**
   - Execute: npm run lint
   - Note any linting issues

3. **Verify All Pages**
   - Homepage renders correctly
   - All 13 service pages render
   - Services landing page works
   - About and Team pages render
   - All patient info pages render
   - Contact page with form works

4. **Check Navigation**
   - All internal links work
   - Navigation menu links to correct pages
   - Footer links work

5. **Fix Issues**
   - Apply fixes for any build errors
   - Resolve TypeScript type errors
   - Fix broken links or imports

6. **Validate Integration**
   - Verify shared components work across pages
   - Check for duplicate code
   - Ensure consistent styling

7. **Report**
   - Summarize what was checked
   - List any issues found and fixes applied
   - Confirm build passes

## Phase Outputs
- Homepage: ${requires.homepage}
- Services Landing: ${requires.services_landing}
- About: ${requires.about}
- Team: ${requires.team}
- Contact: ${requires.contact}
```

---

# Phase 8: SEO & Performance
**execution:** sequential
**depends_on:** Build Check: After Page Development

## Task: Implement Meta Tags & Open Graph
**task_id:** seo-meta-tags

**outputs:**
- name: meta_code
  path: ${config.output_dir}/phase8/meta-tags.md

**requires:**
- task: build-check-3
  output: build_report
  as: prev_build

```prompt
Implement meta tags and Open Graph for ${config.project_name}.

## Requirements

1. **Meta Tags**
   - Unique title tags for each page
   - Meta descriptions for all pages
   - Canonical URLs

2. **Open Graph Tags**
   - og:title, og:description, og:image
   - og:url, og:type
   - Twitter Card tags

3. **Implementation**
   - Create metadata utility in src/lib/metadata.ts
   - Update each page with proper metadata
   - Add favicon and site icons

## Deliverables
- Metadata utility function
- All pages updated with SEO metadata
- Open Graph and Twitter Cards configured
```

---

## Task: Optimize Images
**task_id:** seo-image-optimization

**outputs:**
- name: image_optimization
  path: ${config.output_dir}/phase8/image-optimization.md

**requires:**
- task: build-check-3
  output: build_report
  as: prev_build

```prompt
Optimize all images for ${config.project_name}.

## Requirements

1. **Image Optimization**
   - Ensure all images use Next.js Image component
   - Implement responsive images with srcset
   - Add proper alt text to all images
   - Configure lazy loading for below-fold images

2. **Image Formats**
   - Configure next.config.js for WebP output
   - Set appropriate quality settings

3. **Image Audit**
   - Review all images in public/images/
   - Ensure consistent aspect ratios
   - Verify image sizes are appropriate

## Image Locations
- Clinic: public/images/clinic/ (25 images)
- Patients: public/images/patients/ (30 images)
- Children: public/images/children/ (23 images)
- Cosmetic: public/images/cosmetic/ (20 images)

## Deliverables
- All images optimized with Next.js Image
- Alt text audit complete
- Lazy loading implemented
```

---

## Task: Add Structured Data
**task_id:** seo-structured-data

**outputs:**
- name: structured_data
  path: ${config.output_dir}/phase8/structured-data.md

**requires:**
- task: build-check-3
  output: build_report
  as: prev_build

```prompt
Add structured data (JSON-LD) for ${config.project_name}.

## Requirements

1. **LocalBusiness Schema**
   - Business name: ${config.project_name}
   - Address: ${config.address}
   - Phone: ${config.phone}
   - Hours of operation
   - Languages: ${config.languages}

2. **Dental Practice Schema**
   - Medical specialty: Dentistry
   - Available services

3. **Additional Schemas**
   - Service schema for each service page
   - FAQ schema for service FAQs
   - BreadcrumbList schema for navigation

4. **Implementation**
   - Create JSON-LD component
   - Add to layout.tsx for global schemas
   - Add page-specific schemas

## Deliverables
- JSON-LD component
- All schemas implemented
- Validated with Google Rich Results Test
```

---

## Task: Technical SEO & Performance
**task_id:** seo-technical

**outputs:**
- name: technical_seo
  path: ${config.output_dir}/phase8/technical-seo.md

**requires:**
- task: seo-meta-tags
  output: meta_code
  as: meta
- task: seo-image-optimization
  output: image_optimization
  as: images
- task: seo-structured-data
  output: structured_data
  as: structured

```prompt
Complete technical SEO and performance optimization for ${config.project_name}.

## Technical SEO Requirements

1. **Sitemap & Robots**
   - Generate XML sitemap (use Next.js built-in)
   - Create robots.txt with proper rules

2. **Heading Hierarchy**
   - Audit and fix heading structure
   - Ensure single H1 per page
   - Logical H2-H6 nesting

3. **Internal Linking**
   - Review and optimize internal links
   - Add breadcrumb navigation

4. **Error Pages**
   - Create custom 404 page
   - Create custom error page

## Performance Optimization

1. **Next.js Optimization**
   - Enable static generation where possible
   - Configure code splitting
   - Optimize font loading

2. **Bundle Optimization**
   - Analyze bundle size
   - Minimize JavaScript
   - Enable compression

3. **Core Web Vitals**
   - Optimize LCP (Largest Contentful Paint)
   - Minimize CLS (Cumulative Layout Shift)
   - Improve FID (First Input Delay)

## Previous Phase Outputs
- Meta Tags: ${requires.meta}
- Images: ${requires.images}
- Structured Data: ${requires.structured}

## Deliverables
- Sitemap and robots.txt
- 404 and error pages
- Performance optimizations applied
- Core Web Vitals audit
```

---

# Build Check: After SEO & Performance
**execution:** sequential
**depends_on:** Phase 8: SEO & Performance

## Task: build_check
**task_id:** build-check-4

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-8-report.md

**requires:**
- task: seo-technical
  output: technical_seo
  as: technical

```prompt
Run the build checker after SEO and performance optimization.

## Instructions

1. **Run Production Build**
   - Execute: npm run build
   - Check for any build warnings
   - Verify static generation output

2. **Run Lint**
   - Execute: npm run lint
   - Ensure no new issues

3. **Verify SEO Implementation**
   - Check sitemap generates correctly
   - Verify robots.txt is accessible
   - Test meta tags render in HTML
   - Validate structured data

4. **Performance Audit**
   - Check bundle sizes
   - Verify image optimization
   - Test page load performance

5. **Fix Issues**
   - Apply fixes for any build errors
   - Resolve performance issues
   - Fix SEO implementation bugs

6. **Report**
   - Summarize what was checked
   - List any issues found and fixes applied
   - Confirm build passes
   - Report bundle sizes

## Previous Phase Output
${requires.technical}
```

---

# Phase 9: Testing & Launch
**execution:** sequential
**depends_on:** Build Check: After SEO & Performance

## Task: Cross-Browser & Responsive Testing
**task_id:** testing-browsers

**outputs:**
- name: browser_report
  path: ${config.output_dir}/phase9/browser-testing.md

**requires:**
- task: build-check-4
  output: build_report
  as: prev_build

```prompt
Perform cross-browser and responsive testing for ${config.project_name}.

## Cross-Browser Testing

Test on the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Testing

Test at the following breakpoints:
- Mobile phones (320px - 480px)
- Large phones (480px - 768px)
- Tablets (768px - 1024px)
- Desktops (1024px - 1440px)
- Large screens (1440px+)

## Test Checklist

1. **Layout Testing**
   - Navigation renders correctly
   - Images scale properly
   - Text is readable at all sizes
   - Forms are usable on mobile

2. **Functionality Testing**
   - Contact form submission works
   - All navigation links work
   - Phone click-to-call functions
   - External links open in new tab
   - Google Maps loads correctly

## Deliverables
- Browser compatibility report
- Responsive design audit
- List of issues found and fixed
```

---

## Task: Accessibility Audit
**task_id:** testing-accessibility

**outputs:**
- name: a11y_report
  path: ${config.output_dir}/phase9/accessibility.md

**requires:**
- task: build-check-4
  output: build_report
  as: prev_build

```prompt
Perform accessibility audit for ${config.project_name}.

## WCAG 2.1 AA Compliance Check

1. **Keyboard Navigation**
   - All interactive elements focusable
   - Logical tab order
   - No keyboard traps

2. **Screen Reader Testing**
   - Proper heading structure
   - Alt text on all images
   - Form labels and ARIA

3. **Visual Accessibility**
   - Color contrast verification (4.5:1 minimum)
   - Focus indicators visible
   - Text resizing works

4. **Forms**
   - Labels associated with inputs
   - Error messages accessible
   - Required fields indicated

## Tools to Use
- axe DevTools
- WAVE
- Lighthouse accessibility audit

## Deliverables
- Accessibility audit report
- List of issues found
- Fixes applied
- Compliance confirmation
```

---

## Task: Final Review & Deployment
**task_id:** testing-deployment

**outputs:**
- name: deployment_report
  path: ${config.output_dir}/phase9/deployment.md

**requires:**
- task: testing-browsers
  output: browser_report
  as: browser_tests
- task: testing-accessibility
  output: a11y_report
  as: a11y_tests

```prompt
Complete final review and prepare deployment for ${config.project_name}.

## Final Review Checklist

1. **Content Review**
   - Proofreading complete
   - Spelling and grammar check
   - All placeholder content replaced
   - Consistent branding

2. **Legal/Compliance**
   - Privacy Policy page (if needed)
   - Cookie consent (if applicable)
   - Copyright notices current

3. **Technical Verification**
   - All environment variables documented
   - Build succeeds without warnings
   - No console errors

## Deployment Preparation

1. **Production Build**
   - Run: npm run build
   - Verify output

2. **Environment Setup**
   - Document required environment variables
   - Configure production settings

3. **Analytics & Tracking**
   - Google Analytics setup
   - Search Console registration preparation

4. **SSL & Domain**
   - Verify SSL certificate requirements
   - Document domain configuration needs

## Test Results
- Browser Testing: ${requires.browser_tests}
- Accessibility: ${requires.a11y_tests}

## Deliverables
- Final review report
- Deployment checklist
- Environment configuration documentation
- Analytics setup guide
- Launch readiness confirmation
```
