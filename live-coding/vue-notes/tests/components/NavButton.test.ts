import { mount } from "@vue/test-utils";
import NavButton from "@/components/NavButton.vue";
import { test, expect } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";

const createTestRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: { template: "<div>Home</div>" } },
      { path: "/about", component: { template: "<div>About</div>" } },
      { path: "/notes", component: { template: "<div>Notes</div>" } },
    ],
  });
};

test("applies active class when route matches", async () => {
  const router = createTestRouter();
  await router.push("/notes");
  await router.isReady();

  const wrapper = mount(NavButton, {
    props: {
      to: "/notes",
    },
    slots: {
      default: "Notes",
    },
    global: {
      plugins: [router],
    },
  });

  await wrapper.vm.$nextTick();
  const button = wrapper.find("button");
  expect(button.classes()).toContain("bg-accent");
});
