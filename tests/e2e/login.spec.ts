import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('input[type="email"], input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[placeholder*="البريد"], input[placeholder*="هاتف"]', 'achraf.dev.ai@gmail.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard.*|.*home.*/);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('input[placeholder*="البريد"], input[placeholder*="هاتف"]', 'wrong@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error, .text-red')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator(':has-text("مطلوب")')).toBeVisible();
  });
});