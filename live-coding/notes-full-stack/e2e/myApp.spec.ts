import { test, expect } from "@playwright/test";
const { describe } = test;

describe("Note App", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await expect(page.getByText("Notes")).toBeVisible();
    await expect(page.getByText("Welcome back!")).toBeVisible();
  });
});
