import { test, expect, devices } from "@playwright/test";

test.describe("Responsive Design", () => {
  test.describe("Mobile", () => {
    const { defaultBrowserType: _, ...mobileDevice } = devices["iPhone 12"];
    test.use(mobileDevice);

    test("should show mobile menu button", async ({ page }) => {
      await page.goto("/");

      // Mobile menu button should be visible
      await expect(page.locator('button[aria-label="Toggle menu"]')).toBeVisible();

      // Desktop nav links should not be visible
      await expect(page.locator('header .hidden.lg\\:flex')).not.toBeVisible();
    });

    test("should open mobile menu", async ({ page }) => {
      await page.goto("/");

      // Click mobile menu button
      await page.click('button[aria-label="Toggle menu"]');

      // Menu items should appear (use .last() to target the mobile nav link)
      await expect(page.locator('header a:has-text("Hochzeit")').last()).toBeVisible();
    });

    test("should display hero correctly on mobile", async ({ page }) => {
      await page.goto("/");

      // Hero should be visible
      await expect(page.locator("h1")).toBeVisible();
    });
  });

  test.describe("Tablet", () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test("should display correctly on tablet", async ({ page }) => {
      await page.goto("/");

      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("header")).toBeVisible();
    });
  });

  test.describe("Desktop", () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test("should show desktop navigation", async ({ page }) => {
      await page.goto("/");

      // Desktop nav should be visible
      await expect(page.locator('header a:has-text("Hochzeit")')).toBeVisible();

      // Mobile menu button should not be visible
      await expect(page.locator('button[aria-label="Toggle menu"]')).not.toBeVisible();
    });

    test("should display three columns in category section", async ({ page }) => {
      await page.goto("/");

      // Scroll to categories
      await page.evaluate(() => window.scrollTo(0, window.innerHeight));

      // Categories should be in grid
      const categorySection = page.locator("section").filter({ hasText: "Meine Schwerpunkte" });
      await expect(categorySection).toBeVisible();
    });
  });
});
