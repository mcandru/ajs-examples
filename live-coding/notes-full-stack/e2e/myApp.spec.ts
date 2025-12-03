import { test, expect } from "@playwright/test";
const { describe } = test;

describe("Note App", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await expect(page.getByText("Notes")).toBeVisible();
    await expect(page.getByText("Welcome back!")).toBeVisible();
  });

  test("user can register with a new account", async ({ page }) => {
    await page.goto("http://localhost:5173/register");

    const newUserEmail = `testuser_${Date.now()}@example.com`;
    const newUserPassword = "Password123!";

    await page.getByTestId("form-field-email").fill(newUserEmail);
    await page.getByTestId("form-field-password").fill(newUserPassword);
    await page.getByTestId("form-field-confirmPassword").fill(newUserPassword);
    await page.getByTestId("submit-register").click();

    await expect(page.getByText("Your Notes")).toBeVisible();
  });
});
