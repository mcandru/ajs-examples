import { test, expect } from "@playwright/test";
const { describe, beforeEach } = test;
import crypto from "crypto";

const USER_EMAIL = `${crypto.randomBytes(8).toString("hex")}@example.com`;
const USER_PASSWORD = "Password123!";

describe("Note App", () => {
  beforeEach(async ({ page }) => {
    // Reset the database before each test
    await page.goto("http://localhost:5173/");
  });

  test("front page can be opened", async ({ page }) => {
    // Expect the front page to contain "Notes"
    await expect(page.getByText("Notes")).toBeVisible();
    // Expect the front page to be redirected to the login page
    // where "Welcome back!" is visible
    await expect(page.getByText("Welcome back!")).toBeVisible();
  });

  test("user can register", async ({ page }) => {
    // Go to the registration page
    await page.goto("http://localhost:5173/register");

    // Fill in the registration form
    await page.getByTestId("form-field-email").fill(USER_EMAIL);
    await page.getByTestId("form-field-password").fill(USER_PASSWORD);
    await page.getByTestId("form-field-confirmPassword").fill(USER_PASSWORD);
    await page.getByTestId("register-submit").click();

    // Expect to be redirected to the notes page
    await expect(page.getByText("Your Notes")).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    // Fill in the login form
    await page.getByTestId("form-field-email").fill(USER_EMAIL);
    await page.getByTestId("form-field-password").fill(USER_PASSWORD);
    await page.getByTestId("login-submit").click();

    // Expect to be logged in and see the notes page
    await expect(page.getByText("Your Notes")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      // Log in before each test in this describe block
      await page.getByTestId("form-field-email").fill(USER_EMAIL);
      await page.getByTestId("form-field-password").fill(USER_PASSWORD);
      await page.getByTestId("login-submit").click();
    });

    test("a new note can be created", async ({ page }) => {
      // Fill in the note content
      await page.getByTestId("note-content-input").fill("This is a new note.");

      // Click the button to create a new note
      await page.getByTestId("create-note-button").click();

      // Expect the new note to be visible in the notes list
      await expect(page.getByText("This is a new note.")).toBeVisible();
    });
  });
});
