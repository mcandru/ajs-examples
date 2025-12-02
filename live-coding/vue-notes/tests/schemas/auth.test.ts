import { describe, test, expect } from "vitest";
import { loginSchema, registerSchema } from "@/schemas/auth";

describe("Auth Schemas", () => {
  describe("loginSchema", () => {
    test("accepts valid email and password", () => {
      const validinput = {
        email: "test@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(validinput);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validinput);
    });

    test("rejects invalid email format", () => {
      const invalidInput = {
        email: "some-email",
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects empty password", () => {
      const invalidInput = {
        email: "some-email",
        password: "",
      };

      const result = loginSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects empty password", () => {
      const invalidInput = {
        email: "",
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe("registerSchema", () => {
    test("accepts valid registration with matching passwords", () => {
      const validInput = {
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      const result = registerSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validInput);
    });

    test("rejects password that doesn't match", () => {
      const invalidInput = {
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password234",
      };

      const result = registerSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});
