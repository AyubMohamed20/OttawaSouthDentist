---
config:
  name: "Mobile Design Transform"
  workers: 5
  timeout: 3600
  retries: 3
  model: "opus"
  working_dir: "./"
  output_dir: "./output"

variables:
  project_name: "Ottawa South Dentist"
  build_command: "npm run build"
  typecheck_command: "npm run typecheck"
  lint_command: "npm run lint"

data_sources:
  layout_components:
    type: inline
    items:
      - id: "header"
        path: "src/components/layout/Header.tsx"
        name: "Header Component"
        description: "Main navigation header with logo, menu, and mobile hamburger"
      - id: "footer"
        path: "src/components/layout/Footer.tsx"
        name: "Footer Component"
        description: "Site footer with contact info, links, and social media"
      - id: "nav"
        path: "src/components/layout/Nav.tsx"
        name: "Navigation Component"
        description: "Mobile navigation menu with dropdowns and touch interactions"

  pages_phase1:
    type: inline
    items:
      - id: "home"
        route: "/"
        name: "Home page"
      - id: "contact"
        route: "/contact"
        name: "Contact page"
      - id: "privacy-policy"
        route: "/privacy-policy"
        name: "Privacy Policy page"
      - id: "about"
        route: "/about"
        name: "About page"
      - id: "about-team"
        route: "/about/team"
        name: "Team page"

  pages_phase2:
    type: inline
    items:
      - id: "services"
        route: "/services"
        name: "Services overview page"
      - id: "childrens-dentistry"
        route: "/services/childrens-dentistry"
        name: "Children's Dentistry page"
      - id: "cosmetic-dentistry"
        route: "/services/cosmetic-dentistry"
        name: "Cosmetic Dentistry page"
      - id: "dental-hygiene"
        route: "/services/dental-hygiene"
        name: "Dental Hygiene page"
      - id: "dental-implants"
        route: "/services/dental-implants"
        name: "Dental Implants page"

  pages_phase3:
    type: inline
    items:
      - id: "dentures"
        route: "/services/dentures"
        name: "Dentures page"
      - id: "emergency-care"
        route: "/services/emergency-care"
        name: "Emergency Care page"
      - id: "gum-therapy"
        route: "/services/gum-therapy"
        name: "Gum Therapy page"
      - id: "invisalign"
        route: "/services/invisalign"
        name: "Invisalign page"
      - id: "missing-teeth"
        route: "/services/missing-teeth"
        name: "Missing Teeth page"

  pages_phase4:
    type: inline
    items:
      - id: "oral-surgery"
        route: "/services/oral-surgery"
        name: "Oral Surgery page"
      - id: "preventive-dentistry"
        route: "/services/preventive-dentistry"
        name: "Preventive Dentistry page"
      - id: "root-canal"
        route: "/services/root-canal"
        name: "Root Canal page"
      - id: "routine-checkups"
        route: "/services/routine-checkups"
        name: "Routine Checkups page"
      - id: "teeth-whitening"
        route: "/services/teeth-whitening"
        name: "Teeth Whitening page"

  pages_phase5:
    type: inline
    items:
      - id: "white-fillings"
        route: "/services/white-fillings"
        name: "White Fillings page"
      - id: "patient-info"
        route: "/patient-info"
        name: "Patient Info overview page"
      - id: "cdcp"
        route: "/patient-info/cdcp"
        name: "CDCP Canadian Dental Care Plan page"
      - id: "new-patients"
        route: "/patient-info/new-patients"
        name: "New Patients page"
      - id: "payment-insurance"
        route: "/patient-info/payment-insurance"
        name: "Payment & Insurance page"
---

# Phase 0: Layout Components Mobile Redesign
**execution:** parallel
**depends_on:** none

## Task Template: layout_transform
**foreach:** ${data.layout_components}
**task_id:** ${item.id}-mobile-redesign

**outputs:**
- name: redesign_result
  path: ${config.output_dir}/layout/${item.id}/mobile-redesign.md

```prompt
## Mobile Design Transform: ${item.name}

Run /design-transform on the layout component: ${item.name}

This is a mobile-only redesign for the mobile version of this layout component.

### Component Details
- File Path: ${item.path}
- Component: ${item.name}
- Description: ${item.description}

### Instructions

1. Locate the component file at ${item.path}
2. Apply the /design-transform skill to transform the mobile version into a world-class, visually stunning interface
3. Focus on:
   - Touch-friendly interactions (minimum 44px tap targets)
   - Thumb-zone optimized placement for key actions
   - Smooth hamburger menu animations
   - Elegant dropdown/slide-out navigation for mobile
   - Sticky header behavior optimized for mobile scrolling
   - Footer that works well on small screens
   - Framer Motion animations for menu open/close
   - Lucide icons at appropriate mobile sizes (20-24px)

### Mobile-Specific Considerations
- Header: Collapsible hamburger menu, sticky positioning, phone number CTA
- Footer: Stacked layout, collapsible sections, easy-tap contact links
- Nav: Full-screen mobile menu overlay, touch-friendly dropdowns, swipe gestures

### Project
${config.project_name}
```

---

# Build Check 0: After Layout Components
**execution:** sequential
**depends_on:** Phase 0: Layout Components Mobile Redesign

## Task Template: build_check
**task_id:** build-check-0

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-0-report.md

```prompt
## Build Check: After Layout Components Mobile Redesign

Run build validation to ensure the layout component changes compile correctly.

### Commands to Run

1. **TypeScript Check**
   - Run: npm run typecheck
   - Verify no type errors in Header, Footer, Nav components

2. **ESLint Check**
   - Run: npm run lint
   - Fix any linting errors in modified files

3. **Build Check**
   - Run: npm run build
   - Ensure Next.js builds successfully

### Instructions

1. Run each command and capture output
2. If errors occur:
   - Identify the root cause
   - Apply fixes to the affected files
   - Re-run the failing command to verify fix
3. Document any issues found and fixes applied
4. Confirm all checks pass before completing

### Files Modified
- src/components/layout/Header.tsx
- src/components/layout/Footer.tsx
- src/components/layout/Nav.tsx
```

---

# Phase 1: Core Pages Mobile Redesign
**execution:** parallel
**depends_on:** Build Check 0: After Layout Components

## Task Template: design_transform
**foreach:** ${data.pages_phase1}
**task_id:** ${item.id}-mobile-redesign

**outputs:**
- name: redesign_result
  path: ${config.output_dir}/${item.id}/mobile-redesign.md

```prompt
## Mobile Design Transform: ${item.name}

Run /design-transform on the (${item.route} - ${item.name})

This is a mobile-only redesign for the mobile files.

### Instructions

1. Find the mobile component file for this page (typically named with `-mobile.tsx` suffix or in a mobile-specific location)
2. Apply the /design-transform skill to transform the mobile version into a world-class, visually stunning interface
3. Focus on:
   - Touch-friendly interactions and tap targets
   - Thumb-zone optimized layouts
   - Mobile-first visual hierarchy
   - Smooth Framer Motion animations appropriate for mobile
   - High-quality Pexels images optimized for mobile viewports
   - Lucide icons at appropriate mobile sizes

### Page Details
- Route: ${item.route}
- Page Name: ${item.name}
- Project: ${config.project_name}
```

---

# Build Check 1: After Core Pages
**execution:** sequential
**depends_on:** Phase 1: Core Pages Mobile Redesign

## Task Template: build_check
**task_id:** build-check-1

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-1-report.md

```prompt
## Build Check: After Core Pages Mobile Redesign

Run build validation to ensure the core page changes compile correctly.

### Commands to Run

1. **TypeScript Check**
   - Run: npm run typecheck
   - Verify no type errors

2. **ESLint Check**
   - Run: npm run lint
   - Fix any linting errors in modified files

3. **Build Check**
   - Run: npm run build
   - Ensure Next.js builds successfully

### Instructions

1. Run each command and capture output
2. If errors occur:
   - Identify the root cause
   - Apply fixes to the affected files
   - Re-run the failing command to verify fix
3. Document any issues found and fixes applied
4. Confirm all checks pass before completing

### Pages Modified
- Home page (/)
- Contact page (/contact)
- Privacy Policy page (/privacy-policy)
- About page (/about)
- Team page (/about/team)
```

---

# Phase 2: Services Pages Batch 1 Mobile Redesign
**execution:** parallel
**depends_on:** Build Check 1: After Core Pages

## Task Template: design_transform
**foreach:** ${data.pages_phase2}
**task_id:** ${item.id}-mobile-redesign

**outputs:**
- name: redesign_result
  path: ${config.output_dir}/${item.id}/mobile-redesign.md

```prompt
## Mobile Design Transform: ${item.name}

Run /design-transform on the (${item.route} - ${item.name})

This is a mobile-only redesign for the mobile files.

### Instructions

1. Find the mobile component file for this page (typically named with `-mobile.tsx` suffix or in a mobile-specific location)
2. Apply the /design-transform skill to transform the mobile version into a world-class, visually stunning interface
3. Focus on:
   - Touch-friendly interactions and tap targets
   - Thumb-zone optimized layouts
   - Mobile-first visual hierarchy
   - Smooth Framer Motion animations appropriate for mobile
   - High-quality Pexels images optimized for mobile viewports
   - Lucide icons at appropriate mobile sizes

### Page Details
- Route: ${item.route}
- Page Name: ${item.name}
- Project: ${config.project_name}
```

---

# Build Check 2: After Services Batch 1
**execution:** sequential
**depends_on:** Phase 2: Services Pages Batch 1 Mobile Redesign

## Task Template: build_check
**task_id:** build-check-2

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-2-report.md

```prompt
## Build Check: After Services Pages Batch 1 Mobile Redesign

Run build validation to ensure the services page changes compile correctly.

### Commands to Run

1. **TypeScript Check**
   - Run: npm run typecheck
   - Verify no type errors

2. **ESLint Check**
   - Run: npm run lint
   - Fix any linting errors in modified files

3. **Build Check**
   - Run: npm run build
   - Ensure Next.js builds successfully

### Instructions

1. Run each command and capture output
2. If errors occur:
   - Identify the root cause
   - Apply fixes to the affected files
   - Re-run the failing command to verify fix
3. Document any issues found and fixes applied
4. Confirm all checks pass before completing

### Pages Modified
- Services overview (/services)
- Children's Dentistry (/services/childrens-dentistry)
- Cosmetic Dentistry (/services/cosmetic-dentistry)
- Dental Hygiene (/services/dental-hygiene)
- Dental Implants (/services/dental-implants)
```

---

# Phase 3: Services Pages Batch 2 Mobile Redesign
**execution:** parallel
**depends_on:** Build Check 2: After Services Batch 1

## Task Template: design_transform
**foreach:** ${data.pages_phase3}
**task_id:** ${item.id}-mobile-redesign

**outputs:**
- name: redesign_result
  path: ${config.output_dir}/${item.id}/mobile-redesign.md

```prompt
## Mobile Design Transform: ${item.name}

Run /design-transform on the (${item.route} - ${item.name})

This is a mobile-only redesign for the mobile files.

### Instructions

1. Find the mobile component file for this page (typically named with `-mobile.tsx` suffix or in a mobile-specific location)
2. Apply the /design-transform skill to transform the mobile version into a world-class, visually stunning interface
3. Focus on:
   - Touch-friendly interactions and tap targets
   - Thumb-zone optimized layouts
   - Mobile-first visual hierarchy
   - Smooth Framer Motion animations appropriate for mobile
   - High-quality Pexels images optimized for mobile viewports
   - Lucide icons at appropriate mobile sizes

### Page Details
- Route: ${item.route}
- Page Name: ${item.name}
- Project: ${config.project_name}
```

---

# Build Check 3: After Services Batch 2
**execution:** sequential
**depends_on:** Phase 3: Services Pages Batch 2 Mobile Redesign

## Task Template: build_check
**task_id:** build-check-3

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-3-report.md

```prompt
## Build Check: After Services Pages Batch 2 Mobile Redesign

Run build validation to ensure the services page changes compile correctly.

### Commands to Run

1. **TypeScript Check**
   - Run: npm run typecheck
   - Verify no type errors

2. **ESLint Check**
   - Run: npm run lint
   - Fix any linting errors in modified files

3. **Build Check**
   - Run: npm run build
   - Ensure Next.js builds successfully

### Instructions

1. Run each command and capture output
2. If errors occur:
   - Identify the root cause
   - Apply fixes to the affected files
   - Re-run the failing command to verify fix
3. Document any issues found and fixes applied
4. Confirm all checks pass before completing

### Pages Modified
- Dentures (/services/dentures)
- Emergency Care (/services/emergency-care)
- Gum Therapy (/services/gum-therapy)
- Invisalign (/services/invisalign)
- Missing Teeth (/services/missing-teeth)
```

---

# Phase 4: Services Pages Batch 3 Mobile Redesign
**execution:** parallel
**depends_on:** Build Check 3: After Services Batch 2

## Task Template: design_transform
**foreach:** ${data.pages_phase4}
**task_id:** ${item.id}-mobile-redesign

**outputs:**
- name: redesign_result
  path: ${config.output_dir}/${item.id}/mobile-redesign.md

```prompt
## Mobile Design Transform: ${item.name}

Run /design-transform on the (${item.route} - ${item.name})

This is a mobile-only redesign for the mobile files.

### Instructions

1. Find the mobile component file for this page (typically named with `-mobile.tsx` suffix or in a mobile-specific location)
2. Apply the /design-transform skill to transform the mobile version into a world-class, visually stunning interface
3. Focus on:
   - Touch-friendly interactions and tap targets
   - Thumb-zone optimized layouts
   - Mobile-first visual hierarchy
   - Smooth Framer Motion animations appropriate for mobile
   - High-quality Pexels images optimized for mobile viewports
   - Lucide icons at appropriate mobile sizes

### Page Details
- Route: ${item.route}
- Page Name: ${item.name}
- Project: ${config.project_name}
```

---

# Build Check 4: After Services Batch 3
**execution:** sequential
**depends_on:** Phase 4: Services Pages Batch 3 Mobile Redesign

## Task Template: build_check
**task_id:** build-check-4

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-4-report.md

```prompt
## Build Check: After Services Pages Batch 3 Mobile Redesign

Run build validation to ensure the services page changes compile correctly.

### Commands to Run

1. **TypeScript Check**
   - Run: npm run typecheck
   - Verify no type errors

2. **ESLint Check**
   - Run: npm run lint
   - Fix any linting errors in modified files

3. **Build Check**
   - Run: npm run build
   - Ensure Next.js builds successfully

### Instructions

1. Run each command and capture output
2. If errors occur:
   - Identify the root cause
   - Apply fixes to the affected files
   - Re-run the failing command to verify fix
3. Document any issues found and fixes applied
4. Confirm all checks pass before completing

### Pages Modified
- Oral Surgery (/services/oral-surgery)
- Preventive Dentistry (/services/preventive-dentistry)
- Root Canal (/services/root-canal)
- Routine Checkups (/services/routine-checkups)
- Teeth Whitening (/services/teeth-whitening)
```

---

# Phase 5: Patient Info Pages Mobile Redesign
**execution:** parallel
**depends_on:** Build Check 4: After Services Batch 3

## Task Template: design_transform
**foreach:** ${data.pages_phase5}
**task_id:** ${item.id}-mobile-redesign

**outputs:**
- name: redesign_result
  path: ${config.output_dir}/${item.id}/mobile-redesign.md

```prompt
## Mobile Design Transform: ${item.name}

Run /design-transform on the (${item.route} - ${item.name})

This is a mobile-only redesign for the mobile files.

### Instructions

1. Find the mobile component file for this page (typically named with `-mobile.tsx` suffix or in a mobile-specific location)
2. Apply the /design-transform skill to transform the mobile version into a world-class, visually stunning interface
3. Focus on:
   - Touch-friendly interactions and tap targets
   - Thumb-zone optimized layouts
   - Mobile-first visual hierarchy
   - Smooth Framer Motion animations appropriate for mobile
   - High-quality Pexels images optimized for mobile viewports
   - Lucide icons at appropriate mobile sizes

### Page Details
- Route: ${item.route}
- Page Name: ${item.name}
- Project: ${config.project_name}
```

---

# Build Check 5: Final Validation
**execution:** sequential
**depends_on:** Phase 5: Patient Info Pages Mobile Redesign

## Task Template: build_check
**task_id:** build-check-5

**outputs:**
- name: build_report
  path: ${config.output_dir}/build-checks/phase-5-final-report.md

```prompt
## Build Check: Final Validation

Run final build validation to ensure all mobile redesign changes compile correctly.

### Commands to Run

1. **TypeScript Check**
   - Run: npm run typecheck
   - Verify no type errors across entire project

2. **ESLint Check**
   - Run: npm run lint
   - Fix any remaining linting errors

3. **Build Check**
   - Run: npm run build
   - Ensure Next.js builds successfully
   - Verify no warnings or errors

### Instructions

1. Run each command and capture output
2. If errors occur:
   - Identify the root cause
   - Apply fixes to the affected files
   - Re-run the failing command to verify fix
3. Document any issues found and fixes applied
4. Confirm all checks pass

### Pages Modified
- White Fillings (/services/white-fillings)
- Patient Info (/patient-info)
- CDCP (/patient-info/cdcp)
- New Patients (/patient-info/new-patients)
- Payment & Insurance (/patient-info/payment-insurance)

### Final Checklist
- [ ] All TypeScript types resolve correctly
- [ ] No ESLint errors or warnings
- [ ] Next.js production build succeeds
- [ ] No console errors during build
- [ ] All pages render without errors
```

---

# Playwright Check: Final E2E Validation
**execution:** sequential
**depends_on:** Build Check 5: Final Validation

## Task Template: playwright_check
**task_id:** playwright-final

**outputs:**
- name: e2e_report
  path: ${config.output_dir}/playwright/final-e2e-report.md

```prompt
## Playwright E2E Tests: Final Mobile Validation

Run Playwright E2E tests to validate all mobile pages render and function correctly.

### Setup (if Playwright not installed)

1. **Install Playwright**
   - Run: npm init playwright@latest
   - Select TypeScript, tests folder, GitHub Actions workflow (optional)
   - Run: npx playwright install

2. **Create playwright.config.ts** (if not exists)
   - Configure mobile viewport (iPhone 12: 390x844)
   - Set baseURL to http://localhost:3000
   - Enable screenshots on failure

### Test Creation

Create E2E tests for all mobile pages in `tests/mobile/` folder:

1. **Layout Tests** (tests/mobile/layout.spec.ts)
   - Header renders correctly on mobile
   - Hamburger menu opens/closes
   - Navigation links work
   - Footer is visible and links work

2. **Core Pages Tests** (tests/mobile/core-pages.spec.ts)
   - Home page loads and renders
   - Contact page form is visible
   - About page content loads
   - Team page shows team members
   - Privacy policy is readable

3. **Services Pages Tests** (tests/mobile/services.spec.ts)
   - Services overview page loads
   - All 15 service pages render correctly
   - CTAs are tappable (min 44px)
   - Images load properly

4. **Patient Info Tests** (tests/mobile/patient-info.spec.ts)
   - Patient info overview loads
   - CDCP page renders
   - New patients page loads
   - Payment & Insurance info visible

### Commands to Run

1. **Start Dev Server**
   - Run: npm run dev (in background)

2. **Run Playwright Tests**
   - Run: npx playwright test --project=mobile
   - Or: npx playwright test tests/mobile/

3. **Generate Report**
   - Run: npx playwright show-report

### Mobile Viewports to Test
- iPhone 12 (390x844)
- iPhone SE (375x667)
- Samsung Galaxy S21 (360x800)

### Test Assertions
- All pages load within 3 seconds
- No console errors
- All images have alt text
- Touch targets are minimum 44x44px
- Text is readable (min 16px font)
- No horizontal scroll

### Instructions

1. Set up Playwright if not already configured
2. Create mobile-specific test files
3. Run tests on mobile viewports
4. Fix any failing tests by updating components
5. Generate and save test report

### If Tests Fail
- Screenshot failures for debugging
- Identify root cause (layout, functionality, performance)
- Fix component issues
- Re-run failing tests
- Document fixes applied

### All Pages to Test
**Layout:**
- Header, Footer, Navigation

**Core Pages:**
- / (Home)
- /contact
- /privacy-policy
- /about
- /about/team

**Services:**
- /services
- /services/childrens-dentistry
- /services/cosmetic-dentistry
- /services/dental-hygiene
- /services/dental-implants
- /services/dentures
- /services/emergency-care
- /services/gum-therapy
- /services/invisalign
- /services/missing-teeth
- /services/oral-surgery
- /services/preventive-dentistry
- /services/root-canal
- /services/routine-checkups
- /services/teeth-whitening
- /services/white-fillings

**Patient Info:**
- /patient-info
- /patient-info/cdcp
- /patient-info/new-patients
- /patient-info/payment-insurance
```
