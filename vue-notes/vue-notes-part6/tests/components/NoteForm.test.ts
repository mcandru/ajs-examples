import { mount, flushPromises } from "@vue/test-utils";
import NoteForm from "@/components/NoteForm.vue";
import { test, expect, vi } from "vitest";

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

test("emits submit event with note content", async () => {
  const wrapper = mount(NoteForm);
  const input = wrapper.find('[data-testid="note-content-input"]');
  const form = wrapper.find("form");

  await input.setValue("New note from test");
  await form.trigger("submit.prevent");

  await flushPromises(); // This waits for all pending promises
  await flushPromises(); // This waits for all pending promises

  await vi.waitFor(() => {
    expect(wrapper.emitted("submit")).toBeTruthy();
  });

  const submitEvents = wrapper.emitted("submit");
  expect(submitEvents![0]).toEqual(["New note from test"]);
});
