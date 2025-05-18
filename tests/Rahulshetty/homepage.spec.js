import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/');
  await page.locator("(//a[@class='theme-btn'])[1]").click();
    await page.locator("(//a[text()='Log in'])").click();
  await page.locator("//a[@class='loginPasswordBtn']").click();
    await page.waitForTimeout(7000);
  await page.locator("//input[@id='email']").fill("zoro@yopmail.com");
  await page.locator("//input[@id='password']").fill("Zoro@22");
  await page.locator("//input[@value='Log in']").click();
});