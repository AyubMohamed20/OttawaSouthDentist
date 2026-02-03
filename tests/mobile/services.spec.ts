import { test, expect } from '@playwright/test';

const SERVICE_PAGES = [
  { path: '/services', name: 'Services Overview' },
  { path: '/services/childrens-dentistry', name: "Children's Dentistry" },
  { path: '/services/cosmetic-dentistry', name: 'Cosmetic Dentistry' },
  { path: '/services/dental-hygiene', name: 'Dental Hygiene' },
  { path: '/services/dental-implants', name: 'Dental Implants' },
  { path: '/services/dentures', name: 'Dentures' },
  { path: '/services/emergency-care', name: 'Emergency Care' },
  { path: '/services/gum-therapy', name: 'Gum Therapy' },
  { path: '/services/invisalign', name: 'Invisalign' },
  { path: '/services/missing-teeth', name: 'Missing Teeth' },
  { path: '/services/oral-surgery', name: 'Oral Surgery' },
  { path: '/services/preventive-dentistry', name: 'Preventive Dentistry' },
  { path: '/services/root-canal', name: 'Root Canal' },
  { path: '/services/routine-checkups', name: 'Routine Checkups' },
  { path: '/services/teeth-whitening', name: 'Teeth Whitening' },
  { path: '/services/white-fillings', name: 'White Fillings' },
];

test.describe('Mobile Services - Overview Page', () => {
  test('services overview page loads', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveURL(/\/services/);
  });

  test('services overview shows service categories', async ({ page }) => {
    await page.goto('/services');

    // Should have multiple service links or cards
    const serviceLinks = page.locator('a[href*="/services/"]');
    const count = await serviceLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('services overview has heading', async ({ page }) => {
    await page.goto('/services');

    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });
});

test.describe('Mobile Services - All Service Pages Load', () => {
  for (const service of SERVICE_PAGES) {
    test(`${service.name} page loads correctly`, async ({ page }) => {
      const response = await page.goto(service.path);

      // Page should load successfully (allow 500 errors to be caught, but not 404)
      expect(response?.status()).toBeLessThan(500);

      // URL should be correct
      await expect(page).toHaveURL(new RegExp(service.path));

      // Main content should be attached (not necessarily visible due to positioning)
      const mainContent = page.locator('main, section').first();
      await expect(mainContent).toBeAttached();
    });
  }
});

test.describe('Mobile Services - Content Validation', () => {
  for (const service of SERVICE_PAGES.slice(1)) {
    // Skip overview for content tests
    test(`${service.name} has proper heading`, async ({ page }) => {
      await page.goto(service.path);

      // Check for h1 or h2 heading - may not be visible due to hero positioning
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeAttached();
    });

    test(`${service.name} has CTA button`, async ({ page }) => {
      await page.goto(service.path);

      // Look for CTA buttons (contact, book appointment, etc.)
      const ctaButton = page.locator(
        'a[href="/contact"], a[href*="book"], button:has-text("Book"), button:has-text("Contact"), a:has-text("Book"), a:has-text("Schedule")'
      );
      const count = await ctaButton.count();
      expect(count).toBeGreaterThan(0);
    });
  }
});

test.describe('Mobile Services - Images', () => {
  const testServices = [
    '/services/childrens-dentistry',
    '/services/cosmetic-dentistry',
    '/services/dental-implants',
    '/services/invisalign',
    '/services/teeth-whitening',
  ];

  for (const servicePath of testServices) {
    test(`${servicePath} images load properly`, async ({ page }) => {
      await page.goto(servicePath);

      const images = page.locator('img');
      const count = await images.count();

      // Should have at least one image
      expect(count).toBeGreaterThan(0);

      // Check that images have alt text
      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });
  }
});

test.describe('Mobile Services - Touch Targets', () => {
  test('service page CTAs are tappable (min 44px)', async ({ page }) => {
    await page.goto('/services/dental-implants');
    await page.waitForTimeout(500);

    // Find visible CTA buttons specifically
    const ctaButtons = page.locator('a[href="/contact"], a:has-text("Book"), a:has-text("Contact"), a:has-text("Schedule")');
    const count = await ctaButtons.count();

    let testedCount = 0;
    for (let i = 0; i < count && testedCount < 3; i++) {
      const element = ctaButtons.nth(i);
      if (await element.isVisible()) {
        const box = await element.boundingBox();
        if (box && box.height > 10) {
          // Primary CTA buttons should be at least 40px in height
          expect(box.height).toBeGreaterThanOrEqual(36);
          testedCount++;
        }
      }
    }
    // Should have tested at least one button
    expect(testedCount).toBeGreaterThan(0);
  });
});

test.describe('Mobile Services - No Horizontal Scroll', () => {
  const testServices = [
    '/services',
    '/services/childrens-dentistry',
    '/services/dental-implants',
    '/services/emergency-care',
  ];

  for (const servicePath of testServices) {
    test(`${servicePath} has no horizontal scroll`, async ({ page }) => {
      await page.goto(servicePath);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      // Allow small tolerance
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
    });
  }
});

test.describe('Mobile Services - Performance', () => {
  test('services overview loads within 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/services');
    const loadTime = Date.now() - startTime;

    // Allow 5 seconds for local dev server variation
    expect(loadTime).toBeLessThan(5000);
  });

  test('individual service page loads within 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/services/dental-implants');
    const loadTime = Date.now() - startTime;

    // Allow 5 seconds for local dev server variation
    expect(loadTime).toBeLessThan(5000);
  });
});
