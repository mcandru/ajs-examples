import { describe, test, expect } from "vitest";
import { loginSchema, registerSchema } from "@/schemas/auth";

describe("Auth Schemas", () => {
  describe("loginSchema", () => {
    test("accepts valid email and password", () => {
      const validInput = {
        email: "test@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validInput);
    });

    test("rejects invalid email format", () => {
      const invalidInput = {
        email: "not-an-email@",
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects empty password", () => {
      const invalidInput = {
        email: "test@example.com",
        password: "",
      };

      const result = loginSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects empty email", () => {
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
        password: "Password123",
        confirmPassword: "Password123",
      };

      const result = registerSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validInput);
    });

    test("reject passwords that don't match", () => {
      const invalidInput = {
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password234",
      };

      const result = registerSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("reject password without all required character types", () => {
      // Password should require uppercase, lowercase letters and a number
      const invalidInput = {
        email: "test@example.com",
        password: "password",
        confirmPassword: "password",
      };

      const result = registerSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("reject empty password", () => {
      const invalidInput = {
        email: "test@example.com",
        password: "",
        confirmPassword: "",
      };

      const result = registerSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects password shorter than 8 characters", () => {
      const invalidInput = {
        email: "test@example.com",
        password: "Pass1",
        confirmPassword: "Pass1",
      };

      const result = registerSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});
