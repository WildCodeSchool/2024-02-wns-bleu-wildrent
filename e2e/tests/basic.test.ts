import { test, expect } from "@playwright/test";

test("Go to home page", async ({ page }) => {
  await page.goto("http://apigateway/");

  const logoImage = page.locator('img[alt="Wildrent Logo"]');
  await expect(logoImage).toBeVisible();
});
