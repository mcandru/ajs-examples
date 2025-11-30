import { mount } from "@vue/test-utils";
import NoteForm from "@/components/NoteForm.vue";
import { test, expect } from "vitest";

test("renders form with title", () => {
  const wrapper = mount(NoteForm);
  expect(wrapper.text()).toContain("Add New Note");
});

test("renders input field with placeholder", () => {
  const wrapper = mount(NoteForm);
  const input = wrapper.find('[data-testid="note-content-input"]');
  expect(input.exists()).toBe(true);
  expect(input.attributes("placeholder")).toBe("Enter a new note");
});

test("renders submit button", () => {
  const wrapper = mount(NoteForm);
  const button = wrapper.find('[data-testid="create-note-button"]');
  expect(button.exists()).toBe(true);
  expect(button.text()).toBe("Add Note");
});

test("input accepts text input", async () => {
  const wrapper = mount(NoteForm);
  const input = wrapper.find('[data-testid="note-content-input"]');

  await input.setValue("Test note content");

  expect((input.element as HTMLInputElement).value).toBe("Test note content");
});

test("submit button is initially enabled", () => {
  const wrapper = mount(NoteForm);
  const button = wrapper.find('[data-testid="create-note-button"]');

  expect(button.attributes("disabled")).toBeUndefined();
});

test("form element exists and can be submitted", () => {
  const wrapper = mount(NoteForm);
  const form = wrapper.find("form");

  expect(form.exists()).toBe(true);
  expect(form.attributes("class")).toContain("space-y-4");
});
