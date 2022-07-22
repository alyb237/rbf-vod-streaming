import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('navigation test', async ({ page }) => {
  await page.goto(baseUrl);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home/);

  // Click img[alt="profile intro"] >> nth=0
  await page.locator('img[alt="profile intro"]').first().click();

  // Click text=Login
  await page.locator('text=Login').click();
  await expect(page).toHaveURL(`${baseUrl}login`);

  // Click text=Home
  await page.locator('text=Home').click();
  await expect(page).toHaveURL(baseUrl);

  // Click text=Classes
  await page.locator('button:has-text("Classes")').click();
  await expect(page).toHaveURL(`${baseUrl}classes`);

  // Click text=Resonate Body Fitness
  await page.locator('text=Home').click();
  await expect(page).toHaveURL(baseUrl);

  // Click text=Subscribe and find out more!
  await page.locator('text=Subscribe and find out more!').click();
  await expect(page).toHaveURL(`${baseUrl}subscribe`);

  // Click text=Home
  await page.locator('text=Home').click();
  await expect(page).toHaveURL(baseUrl);

  // Click text=Account
  await page.locator('text=Account').click();
  await expect(page).toHaveURL(
    `${baseUrl}login?returnTo=/users/private-profile`,
  );

  // Click [placeholder="example\@email\.com"]
  await page.locator('[placeholder="example\\@email\\.com"]').click();
  // Fill [placeholder="example\@email\.com"]
  await page.locator('[placeholder="example\\@email\\.com"]').fill('test1');
  // Press Tab
  await page.locator('[placeholder="example\\@email\\.com"]').press('Tab');
  // Fill [placeholder="password"]
  await page.locator('[placeholder="password"]').fill('test1');
  // Click button:has-text("Login")
  await page.locator('button:has-text("Login")').click();
});
