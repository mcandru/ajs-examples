import { test, expect } from '@playwright/test';

test.describe('Todo List Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display default todos', async ({ page }) => {
    // TODO: Verify that "Learn Vue" and "Write tests" are visible
  });

  test('should add a new todo', async ({ page }) => {
    // TODO: Type "New Task" in the input and click Add button
    // Then verify the new todo appears in the list
  });

  test('should toggle todo completion', async ({ page }) => {
    // TODO: Click on a todo text to toggle it
    // Verify the todo gets the "completed" styling (line-through)
  });

  test('should delete a todo', async ({ page }) => {
    // TODO: Click the delete button for a todo
    // Verify it's removed from the list
  });

  test('should show empty message when all todos are deleted', async ({ page }) => {
    // TODO: Delete all todos and verify "No todos yet" message appears
  });
});
