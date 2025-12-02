import { mount } from "@vue/test-utils";
import Note from "@/components/Note.vue";
import { test, expect } from "vitest";

test("renders note component", () => {
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

  // Trigger a button click on the delete button
  wrapper.find("[data-testid='delete-note-button']").trigger("click");
  // Check if the event was emitted
  expect(wrapper.emitted()).toHaveProperty("delete");
});
