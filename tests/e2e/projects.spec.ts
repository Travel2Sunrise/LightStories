import { test, expect } from "@playwright/test";

test.describe("Projects Page", () => {
  test("should load projects page", async ({ page }) => {
    await page.goto("/projekte");
    
    await expect(page.locator("h1")).toContainText("Projekte");
  });

  test("should display project cards", async ({ page }) => {
    await page.goto("/projekte");
    
    // Wait for projects to load
    await page.waitForSelector('a[href*="/projekte/"]');
    
    // Should have at least one project
    const projectLinks = page.locator('a[href*="/projekte/"][href*="-"]');
    await expect(projectLinks.first()).toBeVisible();
  });

  test("should filter by category", async ({ page }) => {
    await page.goto("/projekte");
    
    // Click on Hochzeit filter
    await page.click('button:has-text("Hochzeit")');
    
    // Check that filter is applied (visual confirmation)
    await expect(page.locator('button:has-text("Hochzeit")')).toHaveClass(/bg-primary/);
  });

  test("should navigate to single project", async ({ page }) => {
    await page.goto("/projekte");
    
    // Click on first project
    const firstProject = page.locator('a[href*="/projekte/"][href*="-"]').first();
    await firstProject.click();
    
    // Should be on project detail page
    await expect(page).toHaveURL(/\/projekte\/.+/);
    
    // Should have project content
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Single Project Page", () => {
  test("should display project details", async ({ page }) => {
    await page.goto("/projekte/sarah-michael-hochzeit");
    
    // Check for project title
    await expect(page.locator("h1")).toBeVisible();
    
    // Check for project info
    await expect(page.locator('text="Datum"')).toBeVisible();
    await expect(page.locator('text="Kategorie"')).toBeVisible();
  });

  test("should display gallery", async ({ page }) => {
    await page.goto("/projekte/sarah-michael-hochzeit");
    
    // Should have gallery images
    const galleryImages = page.locator("section img");
    await expect(galleryImages.first()).toBeVisible();
  });

  test("should have navigation back to projects", async ({ page }) => {
    await page.goto("/projekte/sarah-michael-hochzeit");
    
    await expect(page.locator('a:has-text("Zurück zu Projekten")')).toBeVisible();
  });
});
