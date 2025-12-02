import { test, expect } from "@playwright/test";
const { describe, beforeEach } = test;

const BASE_URL = "http://localhost:5173";

// Use the seeded test user from the database
const USER_EMAIL = "alice@example.com";
const USER_PASSWORD = "password123";

describe("Note App", () => {
  beforeEach(async ({ page }) => {
    // Fetch the app before each test
    await page.goto(`${BASE_URL}/`);
  });

  test("front page can be opened", async ({ page }) => {
    // Expect the front page to contain "Notes"
    await expect(page.getByText("Notes")).toBeVisible();
    // Expect the front page to be redirected to the login page
    // where "Welcome back!" is visible
    await expect(page.getByText("Welcome back!")).toBeVisible();
  });

  test("user can register with a new account", async ({ page }) => {
    // Go to the registration page
    await page.goto(`${BASE_URL}/register`);

    // Generate a unique email for this test
    const newUserEmail = `testuser_${Date.now()}@example.com`;
    const newUserPassword = "Password123!";

    // Fill in the registration form
    await page.getByTestId("form-field-email").fill(newUserEmail);
    await page.getByTestId("form-field-password").fill(newUserPassword);
    await page.getByTestId("form-field-confirmPassword").fill(newUserPassword);
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

  test("unauthenticated users are redirected from protected routes", async ({
    page,
  }) => {
    // Try navigating directly to /notes without being logged in
    await page.goto(`${BASE_URL}/profile`);

    // Verify that the user is redirected to the login page
    await expect(page.getByText("Welcome back!")).toBeVisible();

    // Also verify we can try with the profile page
    await page.goto(`${BASE_URL}/profile`);
    await expect(page.getByText("Welcome back!")).toBeVisible();
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

    test("a note's details can be viewed", async ({ page }) => {
      await page.getByText("This is a new note.").click();

      await expect(page.getByText("Note Details")).toBeVisible();
      await expect(page.getByText("This is a new note.")).toBeVisible();
    });

    test("a note can be deleted", async ({ page }) => {
      const uniqueNoteContent = `Test note to delete ${Date.now()}`;
      await page.getByTestId("note-content-input").fill(uniqueNoteContent);
      await page.getByTestId("create-note-button").click();

      // Wait for the note to appear
      await expect(page.getByText(uniqueNoteContent)).toBeVisible();

      // https://playwright.dev/docs/locators#locate-by-css-or-xpath
      const noteItem = page.locator(`li:has-text("${uniqueNoteContent}")`);
      await noteItem.getByTestId("delete-note-button").click();

      await expect(page.getByText(uniqueNoteContent)).not.toBeVisible();
    });

    test("navigate to profile page", async ({ page }) => {
      // Click the profile link
      await page.getByTestId("nav-profile-link").click();

      // Expect to be on the profile page
      await expect(
        page.getByText("Manage your account settings")
      ).toBeVisible();
    });

    test("the user can log out", async ({ page }) => {
      // Wait for the login redirect to complete
      await expect(page.getByText("Your Notes")).toBeVisible();

      await page.goto(`${BASE_URL}/profile`);
      // Click the logout button
      await page.getByTestId("logout-button").click();

      // Expect to be redirected to the login page
      await expect(page.getByText("Welcome back!")).toBeVisible();
    });
  });
});
