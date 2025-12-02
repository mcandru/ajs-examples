import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import TodoItem from "@/components/TodoItem.vue";

// EXERCISE 4: Testing Props and Events
// Learn how to pass props to components and test emitted events.

test("should render todo text from props", () => {
  const todo = {
    id: 1,
    text: "Learn Vue Testing",
    completed: false,
  };

  // TODO: Mount TodoItem with the todo prop
  // Hint: const wrapper = mount(TodoItem, { props: { todo } });

  // TODO: Assert that the component displays the todo text "Learn Vue Testing"
  expect(true).toBe(false);
});

test("should apply completed class when todo is completed", () => {
  const todo = {
    id: 1,
    text: "Completed task",
    completed: true,
  };

  // TODO: Mount TodoItem with a completed todo

  // TODO: Find the li element with data-testid="todo-item"
  // Hint: Use wrapper.find('[data-testid="todo-item"]')

  // TODO: Assert that it has the 'completed' class
  // Hint: Use .classes() to get an array of class names
  // Example: expect(element.classes()).toContain('completed')
  expect(true).toBe(false);
});

test("should emit toggle event when todo text is clicked", async () => {
  const todo = {
    id: 1,
    text: "Test todo",
    completed: false,
  };

  // TODO: Mount TodoItem with the todo prop

  // TODO: Find and click the todo text element
  // Hint: data-testid="todo-text-1"

  // TODO: Check that the 'toggle' event was emitted
  // Hint: Use wrapper.emitted() to get all emitted events
  // Example: expect(wrapper.emitted()).toHaveProperty('toggle')

  // TODO: Verify the event payload contains the todo id
  // Hint: wrapper.emitted('toggle')?.[0] gives you the first emission
  // The payload should be [1] (the todo id)
  expect(true).toBe(false);
});

test("should emit delete event when delete button is clicked", async () => {
  const todo = {
    id: 2,
    text: "Delete me",
    completed: false,
  };

  // TODO: Mount TodoItem
  // TODO: Find and click the delete button (data-testid="delete-button-2")
  // TODO: Verify the 'delete' event was emitted with the todo id
  expect(true).toBe(false);
});
