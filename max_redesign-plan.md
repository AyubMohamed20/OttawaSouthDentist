---
config:
  name: "Ottawa South Dental - Max Redesign"
  workers: 1
  timeout: 7200
  retries: 2
  model: "opus"
  working_dir: "C:/Users/AyubM/Documents/App/Dental/OttawaSouthDentistV2"
  output_dir: "./output/redesign"

variables:
  project_name: "Ottawa South Dental"
  tech_stack: "Next.js 14, React 18, Framer Motion, Tailwind CSS, Lucide React"
  design_directive: "Ultrathink and make the page 1000X better as if you are the top UX designer ever, Desktop Only design, utilize the space well, go insane the sky is the limit use framer motion to its max"

data_sources:
  global_components:
    type: inline
    items:
      - id: "header"
        name: "Header"
        file_path: "src/components/layout/Header.tsx"
        description: "Global site header with navigation"
      - id: "footer"
        name: "Footer"
        file_path: "src/components/layout/Footer.tsx"
        description: "Global site footer with links and contact info"

  pages:
    type: inline
    items:
      - id: "home"
        route: "/"
        name: "Home"
        file_path: "src/app/page.tsx"
        description: "Main landing page - first impression of the dental practice"
      - id: "contact"
        route: "/contact"
        name: "Contact"
        file_path: "src/app/contact/page.tsx"
        description: "Contact information and appointment booking page"
      - id: "privacy-policy"
        route: "/privacy-policy"
        name: "Privacy Policy"
        file_path: "src/app/privacy-policy/page.tsx"
        description: "Legal privacy policy information"
      - id: "about"
        route: "/about"
        name: "About"
        file_path: "src/app/about/page.tsx"
        description: "About the dental practice and its philosophy"
      - id: "team"
        route: "/about/team"
        name: "Team"
        file_path: "src/app/about/team/page.tsx"
        description: "Meet the dental team members"
      - id: "services"
        route: "/services"
        name: "Services Overview"
        file_path: "src/app/services/page.tsx"
        description: "Overview of all dental services offered"
      - id: "childrens-dentistry"
        route: "/services/childrens-dentistry"
        name: "Children's Dentistry"
        file_path: "src/app/services/childrens-dentistry/page.tsx"
        description: "Pediatric dental care services"
      - id: "cosmetic-dentistry"
        route: "/services/cosmetic-dentistry"
        name: "Cosmetic Dentistry"
        file_path: "src/app/services/cosmetic-dentistry/page.tsx"
        description: "Aesthetic dental procedures"
      - id: "dental-hygiene"
        route: "/services/dental-hygiene"
        name: "Dental Hygiene"
        file_path: "src/app/services/dental-hygiene/page.tsx"
        description: "Professional cleaning and hygiene services"
      - id: "dental-implants"
        route: "/services/dental-implants"
        name: "Dental Implants"
        file_path: "src/app/services/dental-implants/page.tsx"
        description: "Tooth replacement with implants"
      - id: "dentures"
        route: "/services/dentures"
        name: "Dentures"
        file_path: "src/app/services/dentures/page.tsx"
        description: "Full and partial denture services"
      - id: "emergency-care"
        route: "/services/emergency-care"
        name: "Emergency Care"
        file_path: "src/app/services/emergency-care/page.tsx"
        description: "Urgent dental care services"
      - id: "gum-therapy"
        route: "/services/gum-therapy"
        name: "Gum Therapy"
        file_path: "src/app/services/gum-therapy/page.tsx"
        description: "Periodontal treatment services"
      - id: "invisalign"
        route: "/services/invisalign"
        name: "Invisalign"
        file_path: "src/app/services/invisalign/page.tsx"
        description: "Clear aligner orthodontic treatment"
      - id: "missing-teeth"
        route: "/services/missing-teeth"
        name: "Missing Teeth"
        file_path: "src/app/services/missing-teeth/page.tsx"
        description: "Solutions for missing teeth"
      - id: "oral-surgery"
        route: "/services/oral-surgery"
        name: "Oral Surgery"
        file_path: "src/app/services/oral-surgery/page.tsx"
        description: "Surgical dental procedures"
      - id: "preventive-dentistry"
        route: "/services/preventive-dentistry"
        name: "Preventive Dentistry"
        file_path: "src/app/services/preventive-dentistry/page.tsx"
        description: "Preventive care and maintenance"
      - id: "root-canal"
        route: "/services/root-canal"
        name: "Root Canal"
        file_path: "src/app/services/root-canal/page.tsx"
        description: "Endodontic treatment services"
      - id: "routine-checkups"
        route: "/services/routine-checkups"
        name: "Routine Checkups"
        file_path: "src/app/services/routine-checkups/page.tsx"
        description: "Regular dental examinations"
      - id: "teeth-whitening"
        route: "/services/teeth-whitening"
        name: "Teeth Whitening"
        file_path: "src/app/services/teeth-whitening/page.tsx"
        description: "Professional teeth whitening services"
      - id: "white-fillings"
        route: "/services/white-fillings"
        name: "White Fillings"
        file_path: "src/app/services/white-fillings/page.tsx"
        description: "Tooth-colored composite fillings"
      - id: "patient-info"
        route: "/patient-info"
        name: "Patient Info Overview"
        file_path: "src/app/patient-info/page.tsx"
        description: "Patient information hub"
      - id: "cdcp"
        route: "/patient-info/cdcp"
        name: "CDCP"
        file_path: "src/app/patient-info/cdcp/page.tsx"
        description: "Canadian Dental Care Plan information"
      - id: "new-patients"
        route: "/patient-info/new-patients"
        name: "New Patients"
        file_path: "src/app/patient-info/new-patients/page.tsx"
        description: "Information for first-time patients"
      - id: "payment-insurance"
        route: "/patient-info/payment-insurance"
        name: "Payment & Insurance"
        file_path: "src/app/patient-info/payment-insurance/page.tsx"
        description: "Payment options and insurance information"
---

# Phase 1: Header Component Redesign
**execution:** sequential
**depends_on:** none

## Task: redesign_header
**task_id:** header-redesign

**outputs:**
- name: redesigned_component
  path: ${config.output_dir}/header/implementation.md

```prompt
# Redesign: Global Header Component

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/components/layout/Header.tsx

## Instructions

1. **Read the current implementation** at src/components/layout/Header.tsx
2. **Analyze the existing structure** - navigation items, logo, CTAs, mobile menu
3. **Redesign with maximum creativity:**
   - Create a stunning fixed/sticky header with scroll-based transformations
   - Design animated logo with hover effects
   - Add mega-menu dropdowns for Services with preview animations
   - Create magnetic navigation links with hover effects
   - Implement scroll-triggered header state changes (transparent to solid)
   - Design animated hamburger menu icon (for consistency, even if desktop-focused)
   - Add micro-interactions on all interactive elements
   - Create smooth underline/highlight animations on nav items
   - Design an eye-catching CTA button with pulse/glow effects
   - Add subtle background blur effects on scroll

4. **Framer Motion techniques to use:**
   - useScroll for scroll-based header transformations
   - AnimatePresence for dropdown menus
   - Variants for staggered menu item animations
   - whileHover for magnetic/following effects
   - Layout animations for smooth transitions
   - Spring physics for natural menu movements
   - useMotionValue for cursor-following effects

5. **Write the complete redesigned component**

## Important
- Desktop only design - optimize for 1920x1080 and larger
- This component appears on EVERY page - must be performant
- Maintain all existing navigation links and structure
- Keep the component self-contained with proper TypeScript types
- Ensure accessibility (keyboard navigation, ARIA labels)
- Logo should link to home page
- Include "Book Appointment" CTA prominently
```

---

# Phase 2: Footer Component Redesign
**execution:** sequential
**depends_on:** Phase 1: Header Component Redesign

## Task: redesign_footer
**task_id:** footer-redesign

**outputs:**
- name: redesigned_component
  path: ${config.output_dir}/footer/implementation.md

```prompt
# Redesign: Global Footer Component

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/components/layout/Footer.tsx

## Instructions

1. **Read the current implementation** at src/components/layout/Footer.tsx
2. **Analyze the existing structure** - links, contact info, social media, copyright
3. **Redesign with maximum creativity:**
   - Create a visually striking footer with layered design
   - Design animated link columns with staggered reveals on scroll
   - Add interactive map preview or location visualization
   - Create animated social media icons with hover effects
   - Implement newsletter signup with animated input field
   - Design office hours display with visual timeline
   - Add animated contact information cards
   - Create scroll-to-top button with smooth animation
   - Design decorative animated elements (shapes, gradients)
   - Add subtle parallax background effects

4. **Framer Motion techniques to use:**
   - useInView for scroll-triggered animations
   - Staggered children animations for link columns
   - Hover effects on all interactive elements
   - Floating/breathing animations for decorative elements
   - Scale and opacity transitions
   - Magnetic effects on social icons
   - Smooth scroll-to-top animation

5. **Write the complete redesigned component**

## Important
- Desktop only design - optimize for 1920x1080 and larger
- This component appears on EVERY page - must be performant
- Maintain all existing links, contact info, and legal text
- Keep the component self-contained with proper TypeScript types
- Include all necessary footer sections (links, contact, social, legal)
- Ensure phone number and address are clearly visible
- Copyright year should be dynamic
```

---

# Phase 3: Home Page Redesign
**execution:** sequential
**depends_on:** Phase 2: Footer Component Redesign

## Task: redesign_home
**task_id:** home-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/home/implementation.md

```prompt
# Redesign: Home Page (/)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/page.tsx

## Instructions

1. **Read the current implementation** at src/app/page.tsx
2. **Analyze the existing structure** - understand what content exists
3. **Redesign with maximum creativity:**
   - Create a stunning hero section with advanced Framer Motion animations (staggered reveals, parallax, morphing shapes)
   - Design immersive scroll-triggered sections
   - Add micro-interactions on every interactive element
   - Use creative typography hierarchy with animated text reveals
   - Implement smooth page transitions
   - Create unique visual elements (animated gradients, floating elements, 3D effects with CSS)
   - Design an engaging services preview with hover states
   - Add testimonials section with carousel animations
   - Create a compelling CTA section
   - Ensure the layout utilizes the full desktop viewport creatively

4. **Framer Motion techniques to use:**
   - useScroll and useTransform for scroll-based animations
   - AnimatePresence for mount/unmount animations
   - Variants for orchestrated animations
   - useInView for scroll-triggered reveals
   - Layout animations for smooth transitions
   - Gesture animations (whileHover, whileTap)
   - Spring physics for natural motion

5. **Write the complete redesigned page** - replace the entire file content

## Important
- Desktop only design - optimize for 1920x1080 and larger
- Maintain all existing content/information
- Keep the existing imports pattern (lucide-react for icons)
- Use Tailwind CSS for styling
- Create any new components inline or as separate files if complex
```

---

# Phase 4: Contact Page Redesign
**execution:** sequential
**depends_on:** Phase 3: Home Page Redesign

## Task: redesign_contact
**task_id:** contact-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/contact/implementation.md

```prompt
# Redesign: Contact Page (/contact)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/contact/page.tsx

## Instructions

1. **Read the current implementation** at src/app/contact/page.tsx
2. **Analyze the existing structure** - understand contact info, form, map, etc.
3. **Redesign with maximum creativity:**
   - Create an immersive split-screen or asymmetric layout
   - Design an animated contact form with field-by-field reveals
   - Add interactive map integration with custom styling
   - Create floating contact cards with hover effects
   - Implement animated icons and visual feedback
   - Design office hours display with creative visualization
   - Add animated background elements
   - Create engaging CTA buttons with micro-interactions
   - Use scroll-triggered animations throughout

4. **Framer Motion techniques to use:**
   - Form field staggered animations
   - Input focus animations
   - Button hover/tap states
   - Card flip or morph effects
   - Background particle or shape animations
   - Success state animations for form submission

5. **Write the complete redesigned page**

## Important
- Desktop only design - optimize for 1920x1080 and larger
- Maintain all contact information accuracy
- Keep functional form elements working
- Use Tailwind CSS for styling
```

---

# Phase 5: Privacy Policy Page Redesign
**execution:** sequential
**depends_on:** Phase 4: Contact Page Redesign

## Task: redesign_privacy
**task_id:** privacy-policy-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/privacy-policy/implementation.md

```prompt
# Redesign: Privacy Policy Page (/privacy-policy)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/privacy-policy/page.tsx

## Instructions

1. **Read the current implementation** at src/app/privacy-policy/page.tsx
2. **Analyze the existing legal content structure**
3. **Redesign with maximum creativity (while maintaining legal clarity):**
   - Create an elegant typography-focused design
   - Design animated section navigation/table of contents
   - Add smooth scroll-to-section functionality
   - Create collapsible/expandable sections with animations
   - Implement reading progress indicator
   - Design creative section dividers
   - Add subtle background animations that don't distract
   - Create highlight effects for key terms
   - Design an elegant header with animated elements

4. **Framer Motion techniques to use:**
   - Accordion expand/collapse animations
   - Smooth scroll animations
   - Reading progress bar animation
   - Section reveal animations on scroll
   - Hover effects on navigation items
   - Subtle background element animations

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Maintain ALL legal text exactly as-is (content cannot change)
- Focus on readability and navigation
- Make legal content engaging without compromising clarity
```

---

# Phase 6: About Page Redesign
**execution:** sequential
**depends_on:** Phase 5: Privacy Policy Page Redesign

## Task: redesign_about
**task_id:** about-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/about/implementation.md

```prompt
# Redesign: About Page (/about)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/about/page.tsx

## Instructions

1. **Read the current implementation** at src/app/about/page.tsx
2. **Analyze the existing content about the practice**
3. **Redesign with maximum creativity:**
   - Create a cinematic story-telling experience
   - Design parallax scrolling sections
   - Add animated timeline for practice history
   - Create immersive image galleries with lightbox effects
   - Implement animated statistics/numbers counters
   - Design floating quote sections
   - Add video background sections if applicable
   - Create mission/vision sections with dramatic reveals
   - Design value proposition cards with 3D hover effects
   - Implement scroll-triggered text animations

4. **Framer Motion techniques to use:**
   - Parallax scroll effects with useTransform
   - Number counting animations
   - Image zoom and pan effects
   - Text split animations (letter by letter)
   - Section crossfade transitions
   - 3D card rotations on hover
   - Staggered list animations

5. **Write the complete redesigned page**

## Important
- Desktop only design - optimize for 1920x1080 and larger
- Maintain the practice's brand story and values
- Create emotional connection through design
```

---

# Phase 7: Team Page Redesign
**execution:** sequential
**depends_on:** Phase 6: About Page Redesign

## Task: redesign_team
**task_id:** team-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/team/implementation.md

```prompt
# Redesign: Team Page (/about/team)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/about/team/page.tsx

## Instructions

1. **Read the current implementation** at src/app/about/team/page.tsx
2. **Analyze the existing team member information**
3. **Redesign with maximum creativity:**
   - Create stunning team member cards with 3D effects
   - Design hover-reveal bios with smooth animations
   - Add animated profile image treatments
   - Create interactive skill/specialty visualizations
   - Implement team member detail modals with AnimatePresence
   - Design creative grid/masonry layouts
   - Add floating decorative elements
   - Create animated role/title badges
   - Implement smooth filtering animations if multiple roles exist

4. **Framer Motion techniques to use:**
   - Card flip animations for bio reveal
   - Image scale and filter transitions
   - Modal enter/exit animations
   - Grid layout animations
   - Staggered card appearances
   - Hover lift and shadow effects
   - Profile image morphing effects

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Maintain all team member information accurately
- Create personal connection through interactive design
- Ensure professional presentation
```

---

# Build Check: After Global Components & Initial Pages (1-7)
**execution:** sequential
**depends_on:** Phase 7: Team Page Redesign

## Task: build_check_1
**task_id:** build-check-1

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-7-report.md

```prompt
# Build Validation Check

Run build validation after completing Header, Footer, Home, Contact, Privacy Policy, About, and Team.

## Instructions

1. **Run Build**
   Execute: npm run build
   Capture any TypeScript errors, import issues, or build failures

2. **Run Type Check**
   Execute: npm run typecheck
   Capture any type errors

3. **Run Lint**
   Execute: npm run lint
   Note any linting errors (fix critical ones)

4. **Analyze Issues**
   For each error:
   - Identify the file and line number
   - Determine the root cause
   - Check if it's related to the redesigned components/pages

5. **Fix Issues**
   - Fix any TypeScript errors
   - Fix any import errors
   - Ensure Framer Motion components are properly typed
   - Fix any Tailwind class issues
   - Verify Header and Footer work correctly on all pages

6. **Validate**
   - Run build again to confirm fixes
   - Ensure all redesigned components/pages compile correctly

7. **Report**
   Document:
   - Issues found
   - Fixes applied
   - Final build status
```

---

# Phase 8: Services Overview Page Redesign
**execution:** sequential
**depends_on:** Build Check: After Global Components & Initial Pages (1-7)

## Task: redesign_services
**task_id:** services-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/services/implementation.md

```prompt
# Redesign: Services Overview Page (/services)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/page.tsx
2. **Analyze the existing services listing**
3. **Redesign with maximum creativity:**
   - Create an immersive services showcase
   - Design animated service category cards with hover effects
   - Add interactive service filtering/categorization
   - Create visual service hierarchy with icons
   - Implement service preview animations
   - Design creative grid layouts with varied card sizes
   - Add animated icons for each service
   - Create scroll-triggered service reveals
   - Design prominent CTAs for each service

4. **Framer Motion techniques to use:**
   - Card hover scale and shadow animations
   - Filter/sort layout animations
   - Icon animations on hover
   - Staggered grid item reveals
   - Service preview expand animations
   - Cursor-following effects
   - Magnetic button effects

5. **Write the complete redesigned page**

## Important
- Desktop only design
- This is the hub for all services - make navigation intuitive
- Each service should link to its detail page
- Create visual consistency for service cards
```

---

# Phase 9: Children's Dentistry Page Redesign
**execution:** sequential
**depends_on:** Phase 8: Services Overview Page Redesign

## Task: redesign_childrens
**task_id:** childrens-dentistry-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/childrens-dentistry/implementation.md

```prompt
# Redesign: Children's Dentistry Page (/services/childrens-dentistry)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/childrens-dentistry/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/childrens-dentistry/page.tsx
2. **Analyze the existing pediatric dentistry content**
3. **Redesign with maximum creativity (kid-friendly but professional):**
   - Create a playful yet professional design aesthetic
   - Design animated character/mascot elements
   - Add interactive visual elements kids would enjoy
   - Create animated procedure explanations
   - Implement fun hover effects and micro-interactions
   - Design parent-focused information sections
   - Add animated FAQ sections
   - Create trust-building elements (credentials, awards)
   - Design booking CTA with friendly animations

4. **Framer Motion techniques to use:**
   - Bouncy spring animations for playful feel
   - Character/icon animations
   - Interactive element responses
   - Scroll-triggered reveals with fun timing
   - Hover effects with personality
   - Accordion animations for FAQs
   - Floating/bobbing decorative elements

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Balance playfulness with professionalism
- Appeal to both parents and children
- Maintain all service information
```

---

# Phase 10: Cosmetic Dentistry Page Redesign
**execution:** sequential
**depends_on:** Phase 9: Children's Dentistry Page Redesign

## Task: redesign_cosmetic
**task_id:** cosmetic-dentistry-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/cosmetic-dentistry/implementation.md

```prompt
# Redesign: Cosmetic Dentistry Page (/services/cosmetic-dentistry)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/cosmetic-dentistry/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/cosmetic-dentistry/page.tsx
2. **Analyze the existing cosmetic services content**
3. **Redesign with maximum creativity (luxurious, aspirational):**
   - Create a high-end, luxury aesthetic
   - Design before/after comparison sliders with smooth animations
   - Add animated transformation showcases
   - Create elegant procedure cards with reveal effects
   - Implement cinematic image galleries
   - Design confidence-building testimonial sections
   - Add animated smile transformation visuals
   - Create premium CTA sections
   - Design elegant pricing/package displays

4. **Framer Motion techniques to use:**
   - Before/after slider with drag gestures
   - Image reveal animations (mask, clip-path)
   - Elegant fade and scale transitions
   - Testimonial carousel animations
   - Gallery lightbox with AnimatePresence
   - Smooth scroll-linked transformations
   - Premium hover effects (subtle, refined)

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Convey transformation and confidence
- High-end aesthetic appropriate for cosmetic services
- Include clear service offerings and CTAs
```

---

# Phase 11: Dental Hygiene Page Redesign
**execution:** sequential
**depends_on:** Phase 10: Cosmetic Dentistry Page Redesign

## Task: redesign_hygiene
**task_id:** dental-hygiene-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/dental-hygiene/implementation.md

```prompt
# Redesign: Dental Hygiene Page (/services/dental-hygiene)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/dental-hygiene/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/dental-hygiene/page.tsx
2. **Analyze the existing hygiene services content**
3. **Redesign with maximum creativity (clean, fresh, health-focused):**
   - Create a clean, fresh visual aesthetic
   - Design animated cleaning process visualization
   - Add interactive oral health tips sections
   - Create animated benefit showcases
   - Implement procedure timeline animations
   - Design hygiene routine recommendation sections
   - Add animated statistics about oral health
   - Create appointment booking integration
   - Design educational content with engaging visuals

4. **Framer Motion techniques to use:**
   - Process step animations
   - Clean, smooth fade transitions
   - Icon animations for health tips
   - Timeline progression animations
   - Counter animations for statistics
   - Card reveal animations
   - Interactive checklist animations

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Emphasize cleanliness and freshness in design
- Educational yet engaging
- Clear booking CTAs
```

---

# Phase 12: Dental Implants Page Redesign
**execution:** sequential
**depends_on:** Phase 11: Dental Hygiene Page Redesign

## Task: redesign_implants
**task_id:** dental-implants-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/dental-implants/implementation.md

```prompt
# Redesign: Dental Implants Page (/services/dental-implants)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/dental-implants/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/dental-implants/page.tsx
2. **Analyze the existing implant services content**
3. **Redesign with maximum creativity (technical precision, trust):**
   - Create a sophisticated, technical aesthetic
   - Design animated implant procedure visualization
   - Add 3D-style implant component breakdowns
   - Create interactive procedure step explorer
   - Implement animated comparison charts (implants vs alternatives)
   - Design trust indicators (success rates, credentials)
   - Add animated FAQ sections
   - Create financing/investment information displays
   - Design consultation booking CTAs

4. **Framer Motion techniques to use:**
   - Technical diagram animations
   - Exploded view animations for implant components
   - Step-by-step procedure reveals
   - Comparison slider animations
   - Statistics counter animations
   - Accordion FAQ animations
   - Hover effects for interactive elements

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Balance technical information with accessibility
- Build trust through precision and expertise display
- Clear path to consultation
```

---

# Build Check: After Service Pages (8-12)
**execution:** sequential
**depends_on:** Phase 12: Dental Implants Page Redesign

## Task: build_check_2
**task_id:** build-check-2

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-12-report.md

```prompt
# Build Validation Check

Run build validation after completing Services Overview, Children's Dentistry, Cosmetic Dentistry, Dental Hygiene, and Dental Implants pages.

## Instructions

1. **Run Build**
   Execute: npm run build
   Capture any TypeScript errors, import issues, or build failures

2. **Run Type Check**
   Execute: npm run typecheck
   Capture any type errors

3. **Run Lint**
   Execute: npm run lint
   Note any linting errors (fix critical ones)

4. **Analyze Issues**
   For each error:
   - Identify the file and line number
   - Determine the root cause
   - Check if it's related to the service pages

5. **Fix Issues**
   - Fix any TypeScript errors
   - Fix any import errors
   - Ensure Framer Motion components are properly typed
   - Fix any Tailwind class issues

6. **Validate**
   - Run build again to confirm fixes
   - Ensure all service pages compile correctly

7. **Report**
   Document:
   - Issues found
   - Fixes applied
   - Final build status
```

---

# Phase 13: Dentures Page Redesign
**execution:** sequential
**depends_on:** Build Check: After Service Pages (8-12)

## Task: redesign_dentures
**task_id:** dentures-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/dentures/implementation.md

```prompt
# Redesign: Dentures Page (/services/dentures)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/dentures/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/dentures/page.tsx
2. **Analyze the existing dentures content**
3. **Redesign with maximum creativity (comfort, quality of life):**
   - Create a warm, reassuring design aesthetic
   - Design animated denture type comparisons
   - Add interactive fit/comfort visualizations
   - Create lifestyle improvement showcases
   - Implement process timeline animations
   - Design care and maintenance guides
   - Add animated testimonials from satisfied patients
   - Create quality/material information displays
   - Design consultation and fitting CTAs

4. **Framer Motion techniques to use:**
   - Type comparison slider animations
   - Comfort visualization animations
   - Lifestyle image transitions
   - Timeline step reveals
   - Care tip card animations
   - Testimonial carousel effects
   - Warm, gentle transition curves

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Sensitive, reassuring tone in design
- Emphasize comfort and quality of life improvements
- Clear path to consultation
```

---

# Phase 14: Emergency Care Page Redesign
**execution:** sequential
**depends_on:** Phase 13: Dentures Page Redesign

## Task: redesign_emergency
**task_id:** emergency-care-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/emergency-care/implementation.md

```prompt
# Redesign: Emergency Care Page (/services/emergency-care)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/emergency-care/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/emergency-care/page.tsx
2. **Analyze the existing emergency care content**
3. **Redesign with maximum creativity (urgent, clear, reassuring):**
   - Create an urgent but calming design
   - Design prominent emergency contact display
   - Add animated emergency type identification
   - Create clear "What to do" step guides
   - Implement animated symptom checkers
   - Design hours/availability displays with live status feel
   - Add animated first-aid tip sections
   - Create direct call-to-action buttons (call now, directions)
   - Design reassurance messaging with calming animations

4. **Framer Motion techniques to use:**
   - Attention-grabbing but not alarming animations
   - Pulsing/breathing effects for contact info
   - Step-by-step guide animations
   - Symptom card hover effects
   - Map/directions integration animations
   - Quick, responsive button animations
   - Calming background animations

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Information must be IMMEDIATELY accessible
- Balance urgency with calm reassurance
- Phone number and address must be prominent
```

---

# Phase 15: Gum Therapy Page Redesign
**execution:** sequential
**depends_on:** Phase 14: Emergency Care Page Redesign

## Task: redesign_gum_therapy
**task_id:** gum-therapy-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/gum-therapy/implementation.md

```prompt
# Redesign: Gum Therapy Page (/services/gum-therapy)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/gum-therapy/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/gum-therapy/page.tsx
2. **Analyze the existing periodontal content**
3. **Redesign with maximum creativity (health, healing, prevention):**
   - Create a health-focused, healing aesthetic
   - Design animated gum health stages visualization
   - Add interactive symptom identification
   - Create treatment process animations
   - Implement before/after health comparisons
   - Design prevention tip sections
   - Add animated risk factor displays
   - Create treatment option comparisons
   - Design assessment/consultation CTAs

4. **Framer Motion techniques to use:**
   - Health progression animations
   - Symptom highlight animations
   - Treatment step reveals
   - Comparison slider effects
   - Educational diagram animations
   - Prevention checklist animations
   - Healing-focused gentle transitions

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Educational without being alarming
- Emphasize treatment benefits and prevention
- Clear path to assessment
```

---

# Phase 16: Invisalign Page Redesign
**execution:** sequential
**depends_on:** Phase 15: Gum Therapy Page Redesign

## Task: redesign_invisalign
**task_id:** invisalign-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/invisalign/implementation.md

```prompt
# Redesign: Invisalign Page (/services/invisalign)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/invisalign/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/invisalign/page.tsx
2. **Analyze the existing Invisalign content**
3. **Redesign with maximum creativity (modern, transformative, discreet):**
   - Create a sleek, modern aesthetic
   - Design animated smile transformation timeline
   - Add interactive aligner technology showcase
   - Create before/after morphing animations
   - Implement Invisalign vs braces comparison
   - Design lifestyle benefit showcases
   - Add animated treatment process explainer
   - Create financing/payment plan displays
   - Design consultation booking with smile preview concept

4. **Framer Motion techniques to use:**
   - Smile transformation morph animations
   - Aligner 3D rotation effects
   - Treatment timeline progression
   - Comparison toggle animations
   - Lifestyle image transitions
   - Process step animations
   - Premium hover effects

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Modern, tech-forward aesthetic matching Invisalign brand
- Emphasize discretion and lifestyle compatibility
- Clear consultation CTA
```

---

# Phase 17: Missing Teeth Page Redesign
**execution:** sequential
**depends_on:** Phase 16: Invisalign Page Redesign

## Task: redesign_missing_teeth
**task_id:** missing-teeth-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/missing-teeth/implementation.md

```prompt
# Redesign: Missing Teeth Page (/services/missing-teeth)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/missing-teeth/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/missing-teeth/page.tsx
2. **Analyze the existing missing teeth solutions content**
3. **Redesign with maximum creativity (solutions-focused, hopeful):**
   - Create a solutions-oriented, hopeful design
   - Design animated solution comparison (implants, bridges, dentures)
   - Add interactive decision helper
   - Create consequence awareness section (gentle approach)
   - Implement treatment option explorer
   - Design personalized recommendation flow concept
   - Add animated restoration visualizations
   - Create confidence/quality of life messaging
   - Design consultation CTAs for each solution type

4. **Framer Motion techniques to use:**
   - Solution comparison animations
   - Interactive selector animations
   - Restoration visualization reveals
   - Option card hover effects
   - Decision tree animations
   - Before/after transitions
   - Hopeful, uplifting motion design

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Focus on solutions, not problems
- Help users understand their options
- Clear paths to specific treatments
```

---

# Build Check: After Service Pages (13-17)
**execution:** sequential
**depends_on:** Phase 17: Missing Teeth Page Redesign

## Task: build_check_3
**task_id:** build-check-3

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-17-report.md

```prompt
# Build Validation Check

Run build validation after completing Dentures, Emergency Care, Gum Therapy, Invisalign, and Missing Teeth pages.

## Instructions

1. **Run Build**
   Execute: npm run build
   Capture any TypeScript errors, import issues, or build failures

2. **Run Type Check**
   Execute: npm run typecheck
   Capture any type errors

3. **Run Lint**
   Execute: npm run lint
   Note any linting errors (fix critical ones)

4. **Analyze Issues**
   For each error:
   - Identify the file and line number
   - Determine the root cause
   - Check if it's related to the service pages

5. **Fix Issues**
   - Fix any TypeScript errors
   - Fix any import errors
   - Ensure Framer Motion components are properly typed
   - Fix any Tailwind class issues

6. **Validate**
   - Run build again to confirm fixes
   - Ensure all service pages compile correctly

7. **Report**
   Document:
   - Issues found
   - Fixes applied
   - Final build status
```

---

# Phase 18: Oral Surgery Page Redesign
**execution:** sequential
**depends_on:** Build Check: After Service Pages (13-17)

## Task: redesign_oral_surgery
**task_id:** oral-surgery-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/oral-surgery/implementation.md

```prompt
# Redesign: Oral Surgery Page (/services/oral-surgery)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/oral-surgery/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/oral-surgery/page.tsx
2. **Analyze the existing oral surgery content**
3. **Redesign with maximum creativity (professional, reassuring, expert):**
   - Create a professional, clinical-yet-warm aesthetic
   - Design animated procedure type showcase
   - Add interactive preparation guides
   - Create recovery timeline animations
   - Implement sedation/comfort options display
   - Design surgeon credentials showcase
   - Add animated FAQ sections
   - Create pre/post-operative care guides
   - Design consultation booking CTAs

4. **Framer Motion techniques to use:**
   - Procedure card animations
   - Timeline progression effects
   - Preparation checklist animations
   - Credential badge animations
   - FAQ accordion effects
   - Reassuring, steady animations
   - Professional transition timing

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Balance clinical professionalism with warmth
- Address common concerns and fears
- Build trust through expertise display
```

---

# Phase 19: Preventive Dentistry Page Redesign
**execution:** sequential
**depends_on:** Phase 18: Oral Surgery Page Redesign

## Task: redesign_preventive
**task_id:** preventive-dentistry-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/preventive-dentistry/implementation.md

```prompt
# Redesign: Preventive Dentistry Page (/services/preventive-dentistry)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/preventive-dentistry/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/preventive-dentistry/page.tsx
2. **Analyze the existing preventive care content**
3. **Redesign with maximum creativity (proactive, educational, empowering):**
   - Create an empowering, proactive design aesthetic
   - Design animated prevention strategy showcase
   - Add interactive oral health assessment concept
   - Create habit-building tip sections
   - Implement prevention vs treatment cost comparisons
   - Design dental health milestone visualizations
   - Add animated daily routine guides
   - Create family prevention program showcases
   - Design regular checkup booking CTAs

4. **Framer Motion techniques to use:**
   - Prevention strategy card animations
   - Health milestone progress animations
   - Tip reveal animations
   - Comparison visualization effects
   - Routine step animations
   - Empowering, positive motion design
   - Interactive element responses

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Empower patients to take action
- Educational and encouraging tone
- Clear path to preventive care appointments
```

---

# Phase 20: Root Canal Page Redesign
**execution:** sequential
**depends_on:** Phase 19: Preventive Dentistry Page Redesign

## Task: redesign_root_canal
**task_id:** root-canal-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/root-canal/implementation.md

```prompt
# Redesign: Root Canal Page (/services/root-canal)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/root-canal/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/root-canal/page.tsx
2. **Analyze the existing root canal content**
3. **Redesign with maximum creativity (myth-busting, reassuring, modern):**
   - Create a modern, reassuring aesthetic
   - Design animated myth vs reality sections
   - Add procedure visualization with friendly animations
   - Create pain management information displays
   - Implement modern technology showcase
   - Design success rate and benefit statistics
   - Add animated patient testimonials
   - Create recovery expectation guides
   - Design emergency/scheduled appointment CTAs

4. **Framer Motion techniques to use:**
   - Myth-busting reveal animations
   - Procedure step visualizations
   - Technology showcase animations
   - Statistics counter effects
   - Testimonial transitions
   - Reassuring, calming motion curves
   - Interactive FAQ animations

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Address root canal anxiety/myths directly
- Emphasize modern, comfortable experience
- Build confidence in the procedure
```

---

# Phase 21: Routine Checkups Page Redesign
**execution:** sequential
**depends_on:** Phase 20: Root Canal Page Redesign

## Task: redesign_checkups
**task_id:** routine-checkups-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/routine-checkups/implementation.md

```prompt
# Redesign: Routine Checkups Page (/services/routine-checkups)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/routine-checkups/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/routine-checkups/page.tsx
2. **Analyze the existing checkup content**
3. **Redesign with maximum creativity (friendly, approachable, essential):**
   - Create a friendly, welcoming design aesthetic
   - Design animated "what to expect" walkthrough
   - Add checkup frequency reminder/calculator concept
   - Create examination component breakdowns
   - Implement early detection benefit showcases
   - Design appointment flexibility displays
   - Add animated health maintenance tips
   - Create family checkup package showcases
   - Design easy booking CTAs with calendar integration feel

4. **Framer Motion techniques to use:**
   - Walkthrough step animations
   - Calendar/reminder animations
   - Examination component reveals
   - Benefit card animations
   - Tip carousel effects
   - Friendly, inviting motion design
   - Quick booking button effects

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Make checkups feel welcoming, not clinical
- Emphasize importance of regular visits
- Frictionless path to booking
```

---

# Phase 22: Teeth Whitening Page Redesign
**execution:** sequential
**depends_on:** Phase 21: Routine Checkups Page Redesign

## Task: redesign_whitening
**task_id:** teeth-whitening-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/teeth-whitening/implementation.md

```prompt
# Redesign: Teeth Whitening Page (/services/teeth-whitening)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/teeth-whitening/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/teeth-whitening/page.tsx
2. **Analyze the existing whitening content**
3. **Redesign with maximum creativity (bright, transformative, confident):**
   - Create a bright, radiant design aesthetic
   - Design animated shade transformation visualizations
   - Add before/after comparison sliders
   - Create treatment option comparisons (in-office vs take-home)
   - Implement results timeline expectations
   - Design maintenance tip sections
   - Add animated confidence/lifestyle benefits
   - Create special occasion targeting (weddings, events)
   - Design consultation/treatment booking CTAs

4. **Framer Motion techniques to use:**
   - Shade transformation animations
   - Before/after drag slider
   - Brightness/radiance effects
   - Treatment comparison toggles
   - Timeline progression animations
   - Lifestyle image transitions
   - Confident, uplifting motion design

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Radiant, bright visual aesthetic
- Show transformation possibilities
- Clear treatment options and pricing if available
```

---

# Build Check: After Service Pages (18-22)
**execution:** sequential
**depends_on:** Phase 22: Teeth Whitening Page Redesign

## Task: build_check_4
**task_id:** build-check-4

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-22-report.md

```prompt
# Build Validation Check

Run build validation after completing Oral Surgery, Preventive Dentistry, Root Canal, Routine Checkups, and Teeth Whitening pages.

## Instructions

1. **Run Build**
   Execute: npm run build
   Capture any TypeScript errors, import issues, or build failures

2. **Run Type Check**
   Execute: npm run typecheck
   Capture any type errors

3. **Run Lint**
   Execute: npm run lint
   Note any linting errors (fix critical ones)

4. **Analyze Issues**
   For each error:
   - Identify the file and line number
   - Determine the root cause
   - Check if it's related to the service pages

5. **Fix Issues**
   - Fix any TypeScript errors
   - Fix any import errors
   - Ensure Framer Motion components are properly typed
   - Fix any Tailwind class issues

6. **Validate**
   - Run build again to confirm fixes
   - Ensure all service pages compile correctly

7. **Report**
   Document:
   - Issues found
   - Fixes applied
   - Final build status
```

---

# Phase 23: White Fillings Page Redesign
**execution:** sequential
**depends_on:** Build Check: After Service Pages (18-22)

## Task: redesign_fillings
**task_id:** white-fillings-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/white-fillings/implementation.md

```prompt
# Redesign: White Fillings Page (/services/white-fillings)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/services/white-fillings/page.tsx

## Instructions

1. **Read the current implementation** at src/app/services/white-fillings/page.tsx
2. **Analyze the existing fillings content**
3. **Redesign with maximum creativity (natural, seamless, modern):**
   - Create a clean, natural aesthetic
   - Design animated composite vs amalgam comparisons
   - Add shade matching visualization concept
   - Create durability and longevity showcases
   - Implement procedure simplicity demonstrations
   - Design natural appearance benefit displays
   - Add animated material technology explanations
   - Create replacement program information
   - Design treatment booking CTAs

4. **Framer Motion techniques to use:**
   - Material comparison animations
   - Shade matching color transitions
   - Durability timeline animations
   - Procedure step reveals
   - Natural appearance demonstrations
   - Technology showcase effects
   - Clean, precise motion design

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Emphasize natural, invisible results
- Modern materials and techniques
- Clear booking path
```

---

# Phase 24: Patient Info Overview Page Redesign
**execution:** sequential
**depends_on:** Phase 23: White Fillings Page Redesign

## Task: redesign_patient_info
**task_id:** patient-info-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/patient-info/implementation.md

```prompt
# Redesign: Patient Info Overview Page (/patient-info)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/patient-info/page.tsx

## Instructions

1. **Read the current implementation** at src/app/patient-info/page.tsx
2. **Analyze the existing patient information hub**
3. **Redesign with maximum creativity (helpful, organized, accessible):**
   - Create a helpful, organized information hub design
   - Design animated category navigation cards
   - Add quick-access information sections
   - Create downloadable forms section with previews
   - Implement FAQ quick answers
   - Design patient portal/login area concept
   - Add animated resource library
   - Create contact/support quick links
   - Design clear navigation to sub-pages

4. **Framer Motion techniques to use:**
   - Category card hover animations
   - Quick info reveal effects
   - Form preview animations
   - FAQ accordion effects
   - Resource card interactions
   - Navigation path animations
   - Helpful, guiding motion design

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Information architecture is key
- Easy navigation to all patient resources
- Helpful, supportive tone
```

---

# Phase 25: CDCP Page Redesign
**execution:** sequential
**depends_on:** Phase 24: Patient Info Overview Page Redesign

## Task: redesign_cdcp
**task_id:** cdcp-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/cdcp/implementation.md

```prompt
# Redesign: CDCP Page (/patient-info/cdcp)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/patient-info/cdcp/page.tsx

## Instructions

1. **Read the current implementation** at src/app/patient-info/cdcp/page.tsx
2. **Analyze the existing Canadian Dental Care Plan content**
3. **Redesign with maximum creativity (informative, supportive, clear):**
   - Create an informative, government-program-appropriate design
   - Design animated eligibility checker concept
   - Add coverage breakdown visualizations
   - Create step-by-step enrollment guides
   - Implement FAQ sections for common questions
   - Design covered services displays
   - Add important dates/deadlines showcases
   - Create documentation requirements checklists
   - Design appointment booking for CDCP patients CTAs

4. **Framer Motion techniques to use:**
   - Eligibility flow animations
   - Coverage chart reveals
   - Step-by-step guide animations
   - FAQ accordion effects
   - Checklist interactions
   - Date/deadline highlights
   - Clear, informative motion design

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Government program - maintain accuracy
- Help patients understand eligibility
- Clear path to booking covered services
```

---

# Phase 26: New Patients Page Redesign
**execution:** sequential
**depends_on:** Phase 25: CDCP Page Redesign

## Task: redesign_new_patients
**task_id:** new-patients-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/new-patients/implementation.md

```prompt
# Redesign: New Patients Page (/patient-info/new-patients)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/patient-info/new-patients/page.tsx

## Instructions

1. **Read the current implementation** at src/app/patient-info/new-patients/page.tsx
2. **Analyze the existing new patient content**
3. **Redesign with maximum creativity (welcoming, informative, exciting):**
   - Create a warm, welcoming first-visit experience design
   - Design animated "what to expect" journey map
   - Add new patient checklist with progress tracking feel
   - Create virtual office tour section concept
   - Implement downloadable/fillable forms section
   - Design first appointment preparation guides
   - Add animated welcome messaging
   - Create insurance/payment info quick access
   - Design prominent first appointment booking CTAs

4. **Framer Motion techniques to use:**
   - Welcome message animations
   - Journey map progression
   - Checklist item animations
   - Virtual tour transitions
   - Form preview animations
   - Preparation guide reveals
   - Warm, inviting motion design

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Make first-time visitors feel welcomed
- Reduce anxiety about first visits
- Clear, easy booking process
```

---

# Phase 27: Payment & Insurance Page Redesign
**execution:** sequential
**depends_on:** Phase 26: New Patients Page Redesign

## Task: redesign_payment
**task_id:** payment-insurance-redesign

**outputs:**
- name: redesigned_page
  path: ${config.output_dir}/payment-insurance/implementation.md

```prompt
# Redesign: Payment & Insurance Page (/patient-info/payment-insurance)

${config.design_directive}

## Tech Stack
${config.tech_stack}

## File to Modify
src/app/patient-info/payment-insurance/page.tsx

## Instructions

1. **Read the current implementation** at src/app/patient-info/payment-insurance/page.tsx
2. **Analyze the existing payment and insurance content**
3. **Redesign with maximum creativity (transparent, helpful, flexible):**
   - Create a transparent, trustworthy design aesthetic
   - Design animated payment option displays
   - Add accepted insurance provider showcase
   - Create financing plan calculators/visualizations
   - Implement direct billing explanation
   - Design payment FAQ sections
   - Add animated cost transparency messaging
   - Create insurance verification process guides
   - Design contact CTAs for billing questions

4. **Framer Motion techniques to use:**
   - Payment option card animations
   - Insurance logo showcase effects
   - Calculator/slider interactions
   - Process flow animations
   - FAQ accordion effects
   - Trust indicator animations
   - Clear, professional motion design

5. **Write the complete redesigned page**

## Important
- Desktop only design
- Financial transparency builds trust
- Make payment/insurance easy to understand
- Clear contact for questions
```

---

# Final Build Check: Complete Validation
**execution:** sequential
**depends_on:** Phase 27: Payment & Insurance Page Redesign

## Task: final_build_check
**task_id:** build-check-final

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/final-report.md

```prompt
# Final Build Validation Check

Run comprehensive build validation after completing all 27 component/page redesigns.

## Instructions

1. **Run Full Build**
   Execute: npm run build
   Capture any TypeScript errors, import issues, or build failures

2. **Run Type Check**
   Execute: npm run typecheck
   Capture any type errors across all files

3. **Run Lint**
   Execute: npm run lint
   Fix any linting errors

4. **Cross-Page Validation**
   - Check for consistent component usage
   - Verify Header and Footer work correctly on all pages
   - Verify shared animations work across pages
   - Ensure no duplicate component definitions conflict
   - Validate all internal links work

5. **Fix All Issues**
   - Fix any remaining TypeScript errors
   - Fix any import errors
   - Ensure all Framer Motion components are properly typed
   - Fix any Tailwind class issues
   - Resolve any component conflicts

6. **Final Validation**
   - Run build one more time
   - Ensure clean build with no errors
   - Document any warnings for review

7. **Summary Report**
   Document:
   - Total issues found across all phases
   - All fixes applied
   - Final build status
   - Any recommendations for future improvements
   - List of all redesigned components/pages with their file paths:
     * Header: src/components/layout/Header.tsx
     * Footer: src/components/layout/Footer.tsx
     * 25 Pages (Home through Payment & Insurance)
```
