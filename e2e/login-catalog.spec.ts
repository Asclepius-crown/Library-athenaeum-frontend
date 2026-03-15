import { test, expect } from '@playwright/test';

test('login to catalog flow', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Fill login form
  await page.fill('input[type="email"]', 'student@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');

  // Wait for navigation to catalog
  await page.waitForURL('**/catalog');

  // Check if catalog is loaded
  await expect(page.locator('h1')).toContainText('Library Catalog');

  // Test search
  await page.fill('input[placeholder*="Search"]', 'Test Book');
  await page.press('Enter');

  // Check results
  await expect(page.locator('.book-card')).toHaveCountGreaterThan(0);
});