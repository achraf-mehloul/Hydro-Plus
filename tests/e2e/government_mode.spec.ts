import { test, expect } from '@playwright/test';

test.describe('Government Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
  });

  test('should login as government user', async ({ page }) => {
    await page.fill('input[placeholder*="البريد"], input[placeholder*="هاتف"]', 'government@waterapp.com');
    await page.fill('input[type="password"]', 'Gov@123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*government.*/);
  });

  test('should display government dashboard', async ({ page }) => {
    await page.fill('input[placeholder*="البريد"], input[placeholder*="هاتف"]', 'government@waterapp.com');
    await page.fill('input[type="password"]', 'Gov@123');
    await page.click('button[type="submit"]');
    await expect(page.locator('.stat-card, .dashboard-stats')).toBeVisible();
  });

  test('should update report status', async ({ page }) => {
    await page.fill('input[placeholder*="البريد"], input[placeholder*="هاتف"]', 'government@waterapp.com');
    await page.fill('input[type="password"]', 'Gov@123');
    await page.click('button[type="submit"]');
    await page.click('a:has-text("تقارير"), button:has-text("تقارير")');
    await page.click('button:has-text("تعديل"), button:has-text("تحديث")');
    await page.selectOption('select[name="status"]', 'in_progress');
    await page.click('button:has-text("حفظ")');
    await expect(page.locator(':has-text("تم التحديث")')).toBeVisible();
  });
});