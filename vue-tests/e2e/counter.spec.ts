import { test, expect } from '@playwright/test';

test.describe('Counter Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display initial count of 0', async ({ page }) => {
    // TODO: Find the count display element and verify it shows "Count: 0"
  });

  test('should increment count when + button is clicked', async ({ page }) => {
    // TODO: Click the increment button and verify count increases to 1
  });

  test('should decrement count when - button is clicked', async ({ page }) => {
    // TODO: Increment once, then decrement, and verify count returns to 0
  });

  test('should reset count to 0', async ({ page }) => {
    // TODO: Increment multiple times, click reset, and verify count is 0
  });
});
