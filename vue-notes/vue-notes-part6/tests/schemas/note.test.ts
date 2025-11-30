import { describe, test, expect } from "vitest";
import { noteSchema } from "@/schemas/note";

describe("Note Schema", () => {
  describe("valid inputs", () => {
    test("accepts valid note content", () => {
      const validInput = {
        content: "This is a valid note with enough characters",
      };

      const result = noteSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validInput);
      }
    });

    test("accepts note with exactly 5 characters (minimum)", () => {
      const validInput = {
        content: "Hello",
      };

      const result = noteSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    test("accepts note with exactly 500 characters (maximum)", () => {
      const validInput = {
        content: "a".repeat(500),
      };

      const result = noteSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    test("accepts note with special characters and emojis", () => {
      const validInput = {
        content: "Note with special chars: !@#$% and emoji 🎉",
      };

      const result = noteSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    test("accepts note with newlines and whitespace", () => {
      const validInput = {
        content: "Line 1\nLine 2\n  Indented line",
      };

      const result = noteSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    test("accepts note with numbers and mixed content", () => {
      const validInput = {
        content: "Meeting at 3pm - bring items 1, 2, and 3",
      };

      const result = noteSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });
  });

  describe("invalid inputs - too short", () => {
    test("rejects note with 4 characters", () => {
      const invalidInput = {
        content: "Test",
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Note content must be at least 5 characters"
        );
        expect(result.error.issues[0].path).toEqual(["content"]);
      }
    });

    test("rejects empty note", () => {
      const invalidInput = {
        content: "",
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Note content must be at least 5 characters"
        );
      }
    });

    test("rejects note with only 1 character", () => {
      const invalidInput = {
        content: "a",
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects note with 3 characters", () => {
      const invalidInput = {
        content: "abc",
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe("invalid inputs - too long", () => {
    test("rejects note with 501 characters", () => {
      const invalidInput = {
        content: "a".repeat(501),
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Note content must be less than 500 characters"
        );
        expect(result.error.issues[0].path).toEqual(["content"]);
      }
    });

    test("rejects note with 1000 characters", () => {
      const invalidInput = {
        content: "a".repeat(1000),
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects very long note", () => {
      const invalidInput = {
        content: "This is a very long note. ".repeat(100),
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Note content must be less than 500 characters"
        );
      }
    });
  });

  describe("boundary conditions", () => {
    test("boundary: 4 chars fails, 5 chars passes", () => {
      const fourChars = noteSchema.safeParse({ content: "1234" });
      const fiveChars = noteSchema.safeParse({ content: "12345" });

      expect(fourChars.success).toBe(false);
      expect(fiveChars.success).toBe(true);
    });

    test("boundary: 500 chars passes, 501 chars fails", () => {
      const fiveHundred = noteSchema.safeParse({ content: "a".repeat(500) });
      const fiveHundredOne = noteSchema.safeParse({
        content: "a".repeat(501),
      });

      expect(fiveHundred.success).toBe(true);
      expect(fiveHundredOne.success).toBe(false);
    });
  });

  describe("missing or invalid fields", () => {
    test("rejects missing content field", () => {
      const invalidInput = {};

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects null content", () => {
      const invalidInput = {
        content: null,
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    test("rejects number instead of string", () => {
      const invalidInput = {
        content: 12345,
      };

      const result = noteSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});
