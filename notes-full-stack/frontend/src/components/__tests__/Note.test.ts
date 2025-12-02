import { mount } from "@vue/test-utils";
import Note from "@/components/Note.vue";
import { test, expect } from "vitest";

test("renders note content", () => {
  const note = {
    id: "1",
    content: "This is a test note",
    important: false,
  };
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
  await wrapper.find("[data-testid='delete-note-button']").trigger("click");
  expect(wrapper.emitted()).toHaveProperty("delete");
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
  expect(wrapper.emitted("toggle-important")).toEqual([[]]);
});
