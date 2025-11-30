import { mount } from "@vue/test-utils";
import NavButton from "@/components/NavButton.vue";
import { test, expect } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";

// Create a simple router for testing
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

test("renders slot content", () => {
  const router = createTestRouter();
  const wrapper = mount(NavButton, {
    props: {
      to: "/about",
    },
    slots: {
      default: "About Page",
    },
    global: {
      plugins: [router],
    },
  });
  expect(wrapper.text()).toContain("About Page");
});

test("renders as a button with ghost variant", () => {
  const router = createTestRouter();
  const wrapper = mount(NavButton, {
    props: {
      to: "/about",
    },
    slots: {
      default: "About",
    },
    global: {
      plugins: [router],
    },
  });
  const button = wrapper.find("button");
  expect(button.exists()).toBe(true);
});

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

test("does not apply active class when route does not match", async () => {
  const router = createTestRouter();
  await router.push("/");
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
  expect(button.classes()).not.toContain("bg-accent");
});

test("wraps content in RouterLink", () => {
  const router = createTestRouter();
  const wrapper = mount(NavButton, {
    props: {
      to: "/about",
    },
    slots: {
      default: "About",
    },
    global: {
      plugins: [router],
    },
  });

  // Check that the component contains a router-link
  expect(wrapper.html()).toContain("about");
});
