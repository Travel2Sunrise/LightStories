import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/");
    
    // Check for hero section
    await expect(page.locator("h1")).toBeVisible();
    
    // Check for navigation
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator('a:has-text("LIGHTSTORIES")')).toBeVisible();
  });

  test("should display hero section with parallax", async ({ page }) => {
    await page.goto("/");
    
    // Hero title should be visible
    const heroTitle = page.locator('h1:has-text("Momente, die bleiben")');
    await expect(heroTitle).toBeVisible();
    
    // CTA button should be visible
    await expect(page.locator('a:has-text("Projekte entdecken")')).toBeVisible();
  });

  test("should display three category cards", async ({ page }) => {
    await page.goto("/");
    
    // Scroll to categories section
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    
    // Check for category cards
    await expect(page.locator('h3:has-text("Hochzeitsfotografie")')).toBeVisible();
    await expect(page.locator('h3:has-text("Portraitfotografie")')).toBeVisible();
    await expect(page.locator('h3:has-text("Familienfotografie")')).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");
    
    // Test navigation to Hochzeit
    await page.click('header a:has-text("Hochzeit")');
    await expect(page).toHaveURL(/\/hochzeit/);
    
    // Navigate back to home
    await page.click('a:has-text("LIGHTSTORIES")');
    await expect(page).toHaveURL("/");
  });
});

test.describe("Navigation", () => {
  test("should navigate to all main pages", async ({ page }) => {
    await page.goto("/");
    
    // Test each navigation link
    const links = [
      { text: "Hochzeit", url: "/hochzeit" },
      { text: "Portrait", url: "/portrait" },
      { text: "Familie", url: "/familie" },
      { text: "Projekte", url: "/projekte" },
      { text: "Kontakt", url: "/kontakt" },
    ];
    
    for (const link of links) {
      await page.goto("/");
      await page.click(`header a:has-text("${link.text}")`);
      await expect(page).toHaveURL(new RegExp(link.url));
    }
  });
});

test.describe("Language Switching", () => {
  test("should switch to English", async ({ page }) => {
    await page.goto("/");
    
    // Click EN button
    await page.click('button:has-text("EN")');
    
    // Check for English content
    await expect(page.locator('h1:has-text("Moments that last")')).toBeVisible();
  });

  test("should switch back to German", async ({ page }) => {
    await page.goto("/en");
    
    // Click DE button
    await page.click('button:has-text("DE")');
    
    // Check for German content
    await expect(page.locator('h1:has-text("Momente, die bleiben")')).toBeVisible();
  });
});
