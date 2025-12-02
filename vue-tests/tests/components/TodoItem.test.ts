import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import TodoItem from "@/components/TodoItem.vue";

test("should render todo text from props", () => {
  const todo = {
    id: 1,
    text: "Learn Vue Testing",
    completed: false,
  };

  const wrapper = mount(TodoItem, { props: { todo } });

  // TODO: Assert that the component displays the todo text "Learn Vue Testing"
  expect(true).toBe(false);
});

test("should apply completed class when todo is completed", () => {
  const todo = {
    id: 1,
    text: "Completed task",
    completed: true,
  };

  const wrapper = mount(TodoItem, { props: { todo } });

  // TODO: Find the li element with data-testid="todo-item"
  // Hint: Use wrapper.find('[data-testid="todo-item"]')

  // TODO: Assert that it has the 'completed' class
  // Hint: Use .classes() to get an array of class names
  expect(true).toBe(false);
});

test("should emit toggle event when todo text is clicked", async () => {
  const todo = {
    id: 1,
    text: "Test todo",
    completed: false,
  };

  const wrapper = mount(TodoItem, { props: { todo } });

  // TODO: Find and click the todo text element
  // Hint: data-testid="todo-text-1"

  // TODO: Check that the 'toggle' event was emitted
  // Hint: Use wrapper.emitted() to get all emitted events

  expect(true).toBe(false);
});

test("should emit delete event when delete button is clicked", async () => {
  const todo = {
    id: 2,
    text: "Delete me",
    completed: false,
  };
  const wrapper = mount(TodoItem, { props: { todo } });

  // TODO: Mount TodoItem
  // TODO: Find and click the delete button (data-testid="delete-button-2")
  // TODO: Verify the 'delete' event was emitted with the todo id
  expect(true).toBe(false);
});
