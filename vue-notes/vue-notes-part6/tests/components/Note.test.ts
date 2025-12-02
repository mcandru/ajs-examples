import { mount } from "@vue/test-utils";
import Note from "@/components/Note.vue";
import { test, expect } from "vitest";

test("renders note content", () => {
  const note = {
    id: "1",
    content: "This is a test note",
    important: false,
  };

  // Will use jsdom to mount the component in a virtual DOM
  // and allow us to inspect the rendered output
  const wrapper = mount(Note, {
    props: { note },
    global: {
      stubs: {
        // This is to stub out the RouterLink component used in Note.vue
        // In a real app, you'd have Vue Router set up
        RouterLink: {
          template: "<a><slot /></a>",
        },
      },
    },
  });

  // The .text() method returns all the text content of the component
  // We check that it contains the note content we passed in
  expect(wrapper.text()).toContain("This is a test note");
});

test("emits delete event on button click", async () => {
  const note = {
    id: "1",
    content: "This is a test note",
    important: false,
  };
  const wrapper = mount(Note, {
    props: { note },
    global: {
      stubs: {
        RouterLink: {
          template: "<a><slot /></a>",
        },
      },
    },
  });

  // Find the delete button using the data-testid attribute and trigger a click
  await wrapper.find("[data-testid='delete-note-button']").trigger("click");
  expect(wrapper.emitted()).toHaveProperty("delete");

  // The ! operator tells TypeScript we are sure this value is not undefined
  expect(wrapper.emitted("delete")![0]).toEqual([note]);
});

test("emits toggle-important event on button click", async () => {
  const note = {
    id: "1",
    content: "This is a test note",
    important: false,
  };
  const wrapper = mount(Note, {
    props: { note },
    global: {
      stubs: {
        RouterLink: {
          template: "<a><slot /></a>",
        },
      },
    },
  });
  await wrapper
    .find("[data-testid='toggle-important-button']")
    .trigger("click");
  expect(wrapper.emitted()).toHaveProperty("toggle-important");
  // toggle-important doesn't emit any payload, so we expect an empty array
  expect(wrapper.emitted("toggle-important")).toEqual([[]]);
});
