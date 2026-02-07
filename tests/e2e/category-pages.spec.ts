import { test, expect } from "@playwright/test";

test.describe("Category Pages", () => {
  test.describe("Hochzeit Page", () => {
    test("should load wedding page", async ({ page }) => {
      await page.goto("/hochzeit");
      
      await expect(page.locator("h1")).toContainText("Hochzeitsfotografie");
    });

    test("should display gallery", async ({ page }) => {
      await page.goto("/hochzeit");
      
      // Check for images in gallery
      const images = page.locator("section img");
      await expect(images.first()).toBeVisible();
    });

    test("should have booking CTA", async ({ page }) => {
      await page.goto("/hochzeit");
      
      await expect(page.locator('a:has-text("Jetzt anfragen")')).toBeVisible();
    });
  });

  test.describe("Portrait Page", () => {
    test("should load portrait page", async ({ page }) => {
      await page.goto("/portrait");
      
      await expect(page.locator("h1")).toContainText("Portraitfotografie");
    });
  });

  test.describe("Familie Page", () => {
    test("should load family page", async ({ page }) => {
      await page.goto("/familie");
      
      await expect(page.locator("h1")).toContainText("Familienfotografie");
    });
  });
});
