import { describe, test, expect } from "vitest";
import { noteSchema } from "@/schemas/note";

describe("Note Schema", () => {
  test("accepts valid note content", () => {
    const validInput = {
      content: "This is a valid note",
    };

    const result = noteSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  test("rejects note that is too short", () => {
    const invalidInput = {
      content: "Hi",
    };

    const result = noteSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  test("rejects empty note", () => {
    const invalidInput = {
      content: "",
    };

    const result = noteSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  test("reject note that is too long", () => {
    const invalidInput = {
      content: "a".repeat(501),
    };

    const result = noteSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});
