import { test, expect } from '@playwright/test';

test.describe('Create Report Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.fill('input[placeholder*="البريد"], input[placeholder*="هاتف"]', 'achraf.dev.ai@gmail.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*dashboard.*|.*home.*/);
  });

  test('should navigate to create report page', async ({ page }) => {
    await page.click('a:has-text("تقرير جديد"), button:has-text("تقرير جديد")');
    await expect(page.locator('form')).toBeVisible();
  });

  test('should create new report', async ({ page }) => {
    await page.click('a:has-text("تقرير جديد"), button:has-text("تقرير جديد")');
    await page.fill('input[name="title"], input[placeholder*="عنوان"]', 'Test Report from E2E');
    await page.fill('textarea[name="description"], textarea[placeholder*="وصف"]', 'This is a test report created by automated test');
    await page.selectOption('select[name="type"], select[aria-label*="نوع"]', 'leak');
    await page.click('button[type="submit"]');
    await expect(page.locator(':has-text("تم إنشاء"), :has-text("نجاح")')).toBeVisible();
  });

  test('should validate required fields in report form', async ({ page }) => {
    await page.click('a:has-text("تقرير جديد"), button:has-text("تقرير جديد")');
    await page.click('button[type="submit"]');
    await expect(page.locator(':has-text("مطلوب")')).toBeVisible();
  });
});