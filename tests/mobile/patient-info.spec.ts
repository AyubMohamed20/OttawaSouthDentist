import { test, expect } from '@playwright/test';

const PATIENT_INFO_PAGES = [
  { path: '/patient-info', name: 'Patient Info Overview' },
  { path: '/patient-info/cdcp', name: 'CDCP' },
  { path: '/patient-info/new-patients', name: 'New Patients' },
  { path: '/patient-info/payment-insurance', name: 'Payment & Insurance' },
];

test.describe('Mobile Patient Info - Overview Page', () => {
  test('patient info overview loads', async ({ page }) => {
    await page.goto('/patient-info');
    await expect(page).toHaveURL(/\/patient-info/);
  });

  test('patient info overview has heading', async ({ page }) => {
    await page.goto('/patient-info');

    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('patient info overview shows category links', async ({ page }) => {
    await page.goto('/patient-info');

    // Should have links to sub-pages
    const subpageLinks = page.locator('a[href*="/patient-info/"]');
    const count = await subpageLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Mobile Patient Info - All Pages Load', () => {
  for (const patientPage of PATIENT_INFO_PAGES) {
    test(`${patientPage.name} page loads correctly`, async ({ page }) => {
      const response = await page.goto(patientPage.path);

      // Page should load successfully (allow redirects/soft errors, but not 500)
      expect(response?.status()).toBeLessThan(500);

      // URL should be correct
      await expect(page).toHaveURL(new RegExp(patientPage.path));

      // Main content should be attached
      const mainContent = page.locator('main, section').first();
      await expect(mainContent).toBeAttached();
    });
  }
});

test.describe('Mobile Patient Info - CDCP Page', () => {
  test('CDCP page loads', async ({ page }) => {
    await page.goto('/patient-info/cdcp');
    await expect(page).toHaveURL(/\/patient-info\/cdcp/);
  });

  test('CDCP page has proper heading', async ({ page }) => {
    await page.goto('/patient-info/cdcp');

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('CDCP page has informative content', async ({ page }) => {
    await page.goto('/patient-info/cdcp');

    const content = page.locator('main, section').first();
    const textContent = await content.textContent();

    // Should have substantial content
    expect(textContent?.length).toBeGreaterThan(100);
  });

  test('CDCP page has CTA', async ({ page }) => {
    await page.goto('/patient-info/cdcp');

    const cta = page.locator('a[href="/contact"], button:has-text("Contact"), a:has-text("Learn More"), a:has-text("Book")');
    const count = await cta.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Mobile Patient Info - New Patients Page', () => {
  test('new patients page loads', async ({ page }) => {
    await page.goto('/patient-info/new-patients');
    await expect(page).toHaveURL(/\/patient-info\/new-patients/);
  });

  test('new patients page has welcoming content', async ({ page }) => {
    await page.goto('/patient-info/new-patients');

    const pageContent = await page.textContent('body');

    // Should mention new patients or welcome
    expect(pageContent?.toLowerCase()).toMatch(/new patient|welcome|first visit/i);
  });

  test('new patients page shows what to expect', async ({ page }) => {
    await page.goto('/patient-info/new-patients');

    // Should have informative sections
    const sections = page.locator('section, div').filter({ hasText: /expect|bring|appointment|visit/i });
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });

  test('new patients page has contact CTA', async ({ page }) => {
    await page.goto('/patient-info/new-patients');

    const cta = page.locator('a[href="/contact"], a:has-text("Book"), a:has-text("Schedule"), button:has-text("Book")');
    const count = await cta.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Mobile Patient Info - Payment & Insurance', () => {
  test('payment & insurance page loads', async ({ page }) => {
    await page.goto('/patient-info/payment-insurance');
    await expect(page).toHaveURL(/\/patient-info\/payment-insurance/);
  });

  test('payment page has proper heading', async ({ page }) => {
    await page.goto('/patient-info/payment-insurance');

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('payment page mentions insurance info', async ({ page }) => {
    await page.goto('/patient-info/payment-insurance');

    const pageContent = await page.textContent('body');

    // Should mention payment or insurance
    expect(pageContent?.toLowerCase()).toMatch(/insurance|payment|coverage|plan/i);
  });

  test('payment page is readable', async ({ page }) => {
    await page.goto('/patient-info/payment-insurance');

    const content = page.locator('main, section').first();
    const textContent = await content.textContent();

    // Should have substantial content
    expect(textContent?.length).toBeGreaterThan(100);
  });
});

test.describe('Mobile Patient Info - Images', () => {
  for (const patientPage of PATIENT_INFO_PAGES) {
    test(`${patientPage.name} images have alt text`, async ({ page }) => {
      await page.goto(patientPage.path);

      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });
  }
});

test.describe('Mobile Patient Info - No Horizontal Scroll', () => {
  for (const patientPage of PATIENT_INFO_PAGES) {
    test(`${patientPage.name} has no horizontal scroll`, async ({ page }) => {
      await page.goto(patientPage.path);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      // Allow small tolerance
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
    });
  }
});

test.describe('Mobile Patient Info - Touch Targets', () => {
  test('patient info CTAs are tappable', async ({ page }) => {
    await page.goto('/patient-info/new-patients');

    const ctaButtons = page.locator('a[href="/contact"], button, a:has-text("Book")');
    const count = await ctaButtons.count();

    let testedCount = 0;
    for (let i = 0; i < count && testedCount < 3; i++) {
      const button = ctaButtons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(40);
          testedCount++;
        }
      }
    }
  });
});

test.describe('Mobile Patient Info - Performance', () => {
  test('patient info overview loads within 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/patient-info');
    const loadTime = Date.now() - startTime;

    // Allow 5 seconds for local dev server variation
    expect(loadTime).toBeLessThan(5000);
  });

  test('CDCP page loads within 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/patient-info/cdcp');
    const loadTime = Date.now() - startTime;

    // Allow 5 seconds for local dev server variation
    expect(loadTime).toBeLessThan(5000);
  });
});
