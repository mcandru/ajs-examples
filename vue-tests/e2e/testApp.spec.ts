import { test, expect } from "@playwright/test";
const { describe, beforeEach } = test;

test("page loads successfully", async ({ page }) => {
  // TODO: Verify the page title contains "Vue 3 App"
});

describe("Counter", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should increment count when + button is clicked", async ({ page }) => {
    // TODO: Click the increment button and verify count increases to 1
  });

  test("should reset count to 0", async ({ page }) => {
    // TODO: Increment multiple times, click reset, and verify count is 0
  });
});

describe("Todo List Component", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display default todos", async ({ page }) => {
    // TODO: Verify that "Learn Vue" and "Write tests" are visible
  });

  test("should add a new todo", async ({ page }) => {
    // TODO: Type "New Task" in the input and click Add button
    // Then verify the new todo appears in the list
  });

  test("should delete a todo", async ({ page }) => {
    // TODO: Click the delete button for a todo
    // Verify it's removed from the list
  });
});
