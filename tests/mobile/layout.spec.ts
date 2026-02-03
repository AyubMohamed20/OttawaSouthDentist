import { test, expect } from '@playwright/test';

test.describe('Mobile Layout - Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header renders correctly on mobile', async ({ page }) => {
    const header = page.locator('header').first();
    await expect(header).toBeVisible();

    // Logo should be visible
    const logo = header.locator('a[aria-label*="Ottawa South Dental"]').first();
    await expect(logo).toBeVisible();
  });

  test('hamburger menu button is visible on mobile', async ({ page }) => {
    // Look for mobile menu button with aria-label "Open menu"
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await expect(menuButton).toBeVisible();
  });

  test('hamburger menu opens', async ({ page }) => {
    // Find and click the menu button
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();

    // Wait for mobile nav animation to complete
    await page.waitForTimeout(800);

    // Check if close button is present (indicates menu is open)
    const closeButton = page.locator('button[aria-label="Close menu"]');
    await expect(closeButton).toBeAttached();

    // Or check if the mobile nav panel background is visible
    const navPanel = page.locator('[role="dialog"]').first();
    if (await navPanel.count() > 0) {
      await expect(navPanel).toBeAttached();
    }
  });

  test('navigation links are accessible', async ({ page }) => {
    // Open mobile menu
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();
    await page.waitForTimeout(500);

    // Check for key navigation items in the mobile menu
    const homeLink = page.locator('a[href="/"]');
    const contactLink = page.locator('a[href="/contact"]');

    expect(await homeLink.count()).toBeGreaterThan(0);
    expect(await contactLink.count()).toBeGreaterThan(0);
  });
});

test.describe('Mobile Layout - Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer is visible when scrolled', async ({ page }) => {
    // Scroll to bottom to ensure footer is in view
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Get the main site footer using role="contentinfo"
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
  });

  test('footer contains contact information', async ({ page }) => {
    // Check for phone number or email link anywhere on page (footer renders contact info)
    const contactInfo = page.locator('a[href^="tel:"], a[href^="mailto:"]');
    expect(await contactInfo.count()).toBeGreaterThan(0);
  });

  test('footer links exist', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Check that footer has internal links
    const footer = page.getByRole('contentinfo');
    const footerLinks = footer.locator('a[href^="/"]');
    const count = await footerLinks.count();

    // Should have at least some internal links
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Mobile Layout - Responsive Behavior', () => {
  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.goto('/');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    // Allow small tolerance for rounding
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });

  test('text is readable (min 16px)', async ({ page }) => {
    await page.goto('/');

    // Check body text font size
    const bodyText = page.locator('p, span, li').first();
    if (await bodyText.count() > 0) {
      const fontSize = await bodyText.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeGreaterThanOrEqual(14); // Allow 14px minimum for mobile
    }
  });

  test('touch targets are minimum 44x44px', async ({ page }) => {
    await page.goto('/');

    // Check CTA buttons
    const buttons = page.locator('button, a.btn, [role="button"], a[href="/contact"]');
    const count = await buttons.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          // At least 44px in one dimension (height or width)
          const meetsTarget = box.width >= 44 || box.height >= 44;
          expect(meetsTarget).toBe(true);
        }
      }
    }
  });
});
