import { mount } from "@vue/test-utils";
import FormField from "@/components/FormField.vue";
import { test, expect } from "vitest";

test("renders input with correct attributes", () => {
  const wrapper = mount(FormField, {
    props: {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
  });
  const input = wrapper.find("input");
  expect(input.attributes("type")).toBe("email");
  expect(input.attributes("placeholder")).toBe("Enter your email");
  expect(input.attributes("data-testid")).toBe("form-field-email");
});

test("renders label when provided", () => {
  const wrapper = mount(FormField, {
    props: {
      name: "username",
      label: "Username",
    },
  });
  expect(wrapper.text()).toContain("Username");
});

test("does not render label when not provided", () => {
  const wrapper = mount(FormField, {
    props: {
      name: "username",
    },
  });
  expect(wrapper.find("label").exists()).toBe(false);
});

test("input accepts user input", async () => {
  const wrapper = mount(FormField, {
    props: {
      name: "username",
      label: "Username",
    },
  });
  const input = wrapper.find("input");

  await input.setValue("testuser");

  expect((input.element as HTMLInputElement).value).toBe("testuser");
});
