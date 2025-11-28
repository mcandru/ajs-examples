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

  test("user can log in", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Fill in the login form
    await page.getByRole("textbox").first().fill("alice@example.com");
    await page.getByRole("textbox").last().fill("password123");
    await page.getByTestId("login-submit").click();

    // Expect to be logged in and see the notes page
    await expect(page.getByText("Your Notes")).toBeVisible();
  });
});
