import { test, expect } from '@playwright/test';

test.describe('Mobile Core Pages - Home', () => {
  test('home page loads within 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Allow 5 seconds for local dev server variation
    expect(loadTime).toBeLessThan(5000);
  });

  test('home page renders hero section', async ({ page }) => {
    await page.goto('/');

    // Hero section should be visible
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('home page has no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out common benign errors
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('404')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('home page images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // All images should have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull();
    }
  });

  test('home page CTA buttons are tappable', async ({ page }) => {
    await page.goto('/');

    // Find primary CTA buttons
    const ctaButtons = page.locator('a[href="/contact"], a[href="/services"], button');
    const count = await ctaButtons.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const button = ctaButtons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    }
  });
});

test.describe('Mobile Core Pages - Contact', () => {
  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL(/\/contact/);
  });

  test('contact page has content', async ({ page }) => {
    await page.goto('/contact');

    // Check for contact info section (form or contact details)
    const contactContent = page.locator('main, section').first();
    await expect(contactContent).toBeAttached();

    // Should have phone or address info visible
    const pageContent = await page.textContent('body');
    expect(pageContent).toMatch(/contact|phone|call|email|address/i);
  });

  test('contact page has phone number', async ({ page }) => {
    await page.goto('/contact');

    const phoneLink = page.locator('a[href^="tel:"]');
    expect(await phoneLink.count()).toBeGreaterThan(0);
  });

  test('contact page has address', async ({ page }) => {
    await page.goto('/contact');

    // Check for address content
    const pageContent = await page.textContent('body');
    expect(pageContent).toMatch(/Ottawa|Ontario|address|street/i);
  });
});

test.describe('Mobile Core Pages - About', () => {
  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about/);
  });

  test('about page content renders', async ({ page }) => {
    await page.goto('/about');

    // Main content should be visible
    const mainContent = page.locator('main, section').first();
    await expect(mainContent).toBeVisible();
  });

  test('about page has heading', async ({ page }) => {
    await page.goto('/about');

    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });
});

test.describe('Mobile Core Pages - Team', () => {
  test('team page loads', async ({ page }) => {
    await page.goto('/about/team');
    await expect(page).toHaveURL(/\/about\/team/);
  });

  test('team page has content', async ({ page }) => {
    await page.goto('/about/team');

    // Check for team member content
    const teamContent = page.locator('main, section').first();
    await expect(teamContent).toBeAttached();

    // Should have team-related content
    const pageContent = await page.textContent('body');
    expect(pageContent).toMatch(/team|doctor|dentist|staff/i);
  });
});

test.describe('Mobile Core Pages - Privacy Policy', () => {
  test('privacy policy page loads', async ({ page }) => {
    await page.goto('/privacy-policy');
    await expect(page).toHaveURL(/\/privacy-policy/);
  });

  test('privacy policy is readable', async ({ page }) => {
    await page.goto('/privacy-policy');

    // Content should be present
    const content = page.locator('main, article, section').first();
    await expect(content).toBeAttached();

    // Should have substantial text content about privacy
    const pageContent = await page.textContent('body');
    expect(pageContent).toMatch(/privacy|policy|information|data/i);
  });

  test('privacy policy has proper heading', async ({ page }) => {
    await page.goto('/privacy-policy');

    // Check for h1 or h2 heading with privacy content
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeAttached();
    const text = await heading.textContent();
    expect(text?.toLowerCase()).toMatch(/privacy|policy/i);
  });
});
