import { test, expect } from "@playwright/test";
const { describe } = test;

describe("Note App", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Expect the front page to contain "Notes"
    await expect(page.getByText("Notes")).toBeVisible();
    // Expect the front page to be redirected to the login page
    // where "Welcome back!" is visible
    await expect(page.getByText("Welcome back!")).toBeVisible();
  });
});
