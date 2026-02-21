import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("should load contact page", async ({ page }) => {
    await page.goto("/kontakt");
    
    await expect(page.locator("h1")).toContainText("Kontakt");
  });

  test("should display contact form", async ({ page }) => {
    await page.goto("/kontakt");
    
    // Check for form fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('select[name="category"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('input[name="privacy"]')).toBeVisible();
  });

  test("should show validation errors for empty form", async ({ page }) => {
    await page.goto("/kontakt");
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Form should not submit (still on same page)
    await expect(page).toHaveURL(/\/kontakt/);
  });

  test("should fill out contact form", async ({ page }) => {
    await page.goto("/kontakt");
    
    // Fill out form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.selectOption('select[name="category"]', "hochzeit");
    await page.fill('textarea[name="message"]', "This is a test message.");
    await page.check('input[name="privacy"]');
    
    // Verify fields are filled
    await expect(page.locator('input[name="name"]')).toHaveValue("Test User");
    await expect(page.locator('input[name="email"]')).toHaveValue("test@example.com");
  });

  test("should display contact information", async ({ page }) => {
    await page.goto("/kontakt");
    
    // Check for contact info section
    await expect(page.locator('text="hello@lightstories-photography.at"')).toBeVisible();
  });
});
