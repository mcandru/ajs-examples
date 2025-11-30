import { describe, test, expect } from "vitest";
import { loginSchema, registerSchema } from "@/schemas/auth";
import { ZodError } from "zod";

describe("Auth Schemas", () => {
  describe("loginSchema", () => {
    describe("valid inputs", () => {
      test("accepts valid email and password", () => {
        const validInput = {
          email: "test@example.com",
          password: "password123",
        };

        const result = loginSchema.safeParse(validInput);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual(validInput);
        }
      });

      test("accepts minimal password (1 character)", () => {
        const validInput = {
          email: "user@test.com",
          password: "a",
        };

        const result = loginSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      test("accepts various valid email formats", () => {
        const emails = [
          "simple@example.com",
          "user.name@example.com",
          "user+tag@example.co.uk",
          "123@test.org",
        ];

        emails.forEach((email) => {
          const result = loginSchema.safeParse({
            email,
            password: "test",
          });
          expect(result.success).toBe(true);
        });
      });
    });

    describe("invalid inputs", () => {
      test("rejects invalid email format", () => {
        const invalidInput = {
          email: "not-an-email",
          password: "password123",
        };

        const result = loginSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual(["email"]);
        }
      });

      test("rejects empty password", () => {
        const invalidInput = {
          email: "test@example.com",
          password: "",
        };

        const result = loginSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual(["password"]);
          expect(result.error.issues[0].message).toBe("Password is required");
        }
      });

      test("rejects missing email field", () => {
        const invalidInput = {
          password: "password123",
        };

        const result = loginSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      test("rejects missing password field", () => {
        const invalidInput = {
          email: "test@example.com",
        };

        const result = loginSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("registerSchema", () => {
    describe("valid inputs", () => {
      test("accepts valid registration with matching passwords", () => {
        const validInput = {
          email: "newuser@example.com",
          password: "Password123",
          confirmPassword: "Password123",
        };

        const result = registerSchema.safeParse(validInput);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual(validInput);
        }
      });

      test("accepts password with all required character types", () => {
        const validInput = {
          email: "user@test.com",
          password: "Abc12345",
          confirmPassword: "Abc12345",
        };

        const result = registerSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      test("accepts password with extra special characters", () => {
        const validInput = {
          email: "user@test.com",
          password: "Password123!@#",
          confirmPassword: "Password123!@#",
        };

        const result = registerSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });
    });

    describe("password length validation", () => {
      test("rejects password shorter than 8 characters", () => {
        const invalidInput = {
          email: "test@example.com",
          password: "Pass1",
          confirmPassword: "Pass1",
        };

        const result = registerSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Password must be at least 8 characters"
          );
        }
      });

      test("accepts password with exactly 8 characters", () => {
        const validInput = {
          email: "test@example.com",
          password: "Password1",
          confirmPassword: "Password1",
        };

        const result = registerSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });
    });

    describe("password uppercase validation", () => {
      test("rejects password without uppercase letter", () => {
        const invalidInput = {
          email: "test@example.com",
          password: "password123",
          confirmPassword: "password123",
        };

        const result = registerSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          const uppercaseError = result.error.issues.find((issue) =>
            issue.message.includes("uppercase")
          );
          expect(uppercaseError).toBeDefined();
          expect(uppercaseError?.message).toBe(
            "Password must contain at least one uppercase letter"
          );
        }
      });

      test("accepts password with uppercase letter", () => {
        const validInput = {
          email: "test@example.com",
          password: "Password123",
          confirmPassword: "Password123",
        };

        const result = registerSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });
    });

    describe("password lowercase validation", () => {
      test("rejects password without lowercase letter", () => {
        const invalidInput = {
          email: "test@example.com",
          password: "PASSWORD123",
          confirmPassword: "PASSWORD123",
        };

        const result = registerSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          const lowercaseError = result.error.issues.find((issue) =>
            issue.message.includes("lowercase")
          );
          expect(lowercaseError).toBeDefined();
          expect(lowercaseError?.message).toBe(
            "Password must contain at least one lowercase letter"
          );
        }
      });

      test("accepts password with lowercase letter", () => {
        const validInput = {
          email: "test@example.com",
          password: "Password123",
          confirmPassword: "Password123",
        };

        const result = registerSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });
    });

    describe("password number validation", () => {
      test("rejects password without number", () => {
        const invalidInput = {
          email: "test@example.com",
          password: "PasswordABC",
          confirmPassword: "PasswordABC",
        };

        const result = registerSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          const numberError = result.error.issues.find((issue) =>
            issue.message.includes("number")
          );
          expect(numberError).toBeDefined();
          expect(numberError?.message).toBe(
            "Password must contain at least one number"
          );
        }
      });

      test("accepts password with number", () => {
        const validInput = {
          email: "test@example.com",
          password: "Password123",
          confirmPassword: "Password123",
        };

        const result = registerSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });
    });

    describe("password confirmation validation", () => {
      test("rejects non-matching passwords", () => {
        const invalidInput = {
          email: "test@example.com",
          password: "Password123",
          confirmPassword: "DifferentPass123",
        };

        const result = registerSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Passwords don't match");
          expect(result.error.issues[0].path).toEqual(["confirmPassword"]);
        }
      });

      test("rejects empty confirmPassword", () => {
        const invalidInput = {
          email: "test@example.com",
          password: "Password123",
          confirmPassword: "",
        };

        const result = registerSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          const confirmError = result.error.issues.find(
            (issue) => issue.path[0] === "confirmPassword"
          );
          expect(confirmError).toBeDefined();
        }
      });

      test("accepts matching passwords", () => {
        const validInput = {
          email: "test@example.com",
          password: "Password123",
          confirmPassword: "Password123",
        };

        const result = registerSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });
    });

    describe("email validation", () => {
      test("rejects invalid email in registration", () => {
        const invalidInput = {
          email: "invalid-email",
          password: "Password123",
          confirmPassword: "Password123",
        };

        const result = registerSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          const emailError = result.error.issues.find(
            (issue) => issue.path[0] === "email"
          );
          expect(emailError).toBeDefined();
        }
      });
    });

    describe("multiple validation errors", () => {
      test("returns all validation errors for completely invalid input", () => {
        const invalidInput = {
          email: "not-an-email",
          password: "weak",
          confirmPassword: "different",
        };

        const result = registerSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
        if (!result.success) {
          // Should have multiple errors (email, password length, uppercase, number, etc.)
          expect(result.error.issues.length).toBeGreaterThan(1);
        }
      });
    });
  });
});
