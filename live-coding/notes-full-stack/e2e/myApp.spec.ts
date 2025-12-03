import { test, expect } from "@playwright/test";
const { describe, beforeEach } = test;

const BASE_URL = "http://localhost:5173";

const USER_EMAIL = "alice@example.com";
const USER_PASSWORD = "password123";

describe("Note App", () => {
  beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
  });

  test("front page can be opened", async ({ page }) => {
    await expect(page.getByText("Notes")).toBeVisible();
    await expect(page.getByText("Welcome back!")).toBeVisible();
  });

  test("user can register with a new account", async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);

    const newUserEmail = `testuser_${Date.now()}@example.com`;
    const newUserPassword = "Password123!";

    await page.getByTestId("form-field-email").fill(newUserEmail);
    await page.getByTestId("form-field-password").fill(newUserPassword);
    await page.getByTestId("form-field-confirmPassword").fill(newUserPassword);
    await page.getByTestId("submit-register").click();

    await expect(page.getByText("Your Notes")).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    // Fill in the login form
    await page.getByTestId("form-field-email").fill(USER_EMAIL);
    await page.getByTestId("form-field-password").fill(USER_PASSWORD);
    // Submit the form
    await page.getByTestId("login-submit").click();
    // Expect to be logged in and see "Your Notes"
    await expect(page.getByText("Your Notes")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("form-field-email").fill(USER_EMAIL);
      await page.getByTestId("form-field-password").fill(USER_PASSWORD);
      await page.getByTestId("login-submit").click();
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByTestId("note-content-input").fill("This is a new note");
      await page.getByTestId("create-note-button").click();
      await expect(page.getByText("This is a new note")).toBeVisible();
    });

    test("a note's details can be viewed", async ({ page }) => {
      await page.getByText("This is a new note").click();
      await expect(page.getByText("Note Details")).toBeVisible();
      await expect(page.getByText("This is a new note")).toBeVisible();
    });

    test("a note can be deleted", async ({ page }) => {
      const uniqueNoteContent = `Test note to delete ${Date.now()}`;
      await page.getByTestId("note-content-input").fill(uniqueNoteContent);
      await page.getByTestId("create-note-button").click();

      await expect(page.getByText(uniqueNoteContent)).toBeVisible();

      const noteItem = page.locator(`li:has-text("${uniqueNoteContent}")`);
      await noteItem.getByTestId("delete-note-button").click();

      await expect(page.getByText(uniqueNoteContent)).not.toBeVisible();
    });
  });
});
