import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import Counter from "@/components/Counter.vue";

test("should render the initial count as 0", () => {
  const wrapper = mount(Counter);

  // TODO: Find the element with data-testid="count-display" and check its text
  // Hint: Use wrapper.find() to find an element
  // Hint: Use .text() to get the text content
  // The text should contain "Count: 0"
  expect(true).toBe(false);
});

test("should increment count when increment button is clicked", async () => {
  // TODO: Mount the Counter component
  const wrapper = mount(Counter);

  // TODO: Find the increment button using data-testid="increment-button"
  // TODO: Trigger a click event on the button
  // TODO: Assert that the count display now shows "Count: 1"
  expect(true).toBe(false);
});

test("should decrement count when decrement button is clicked", async () => {
  const wrapper = mount(Counter);
  // TODO: Similar to the increment test, but test the decrement button
  // The count should go from 0 to -1
  expect(true).toBe(false);
});

test("should reset count to 0 when reset button is clicked", async () => {
  const wrapper = mount(Counter);
  // TODO: Click increment a few times to increase the count
  // TODO: Click the reset button
  // TODO: Verify the count is back to 0
  expect(true).toBe(false);
});
