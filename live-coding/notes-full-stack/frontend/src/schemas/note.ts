import { z } from "zod";

export const noteSchema = z.object({
  content: z
    .string()
    .min(5, "Note content must be at least 5 characters")
    .max(500, "Note content must be less than 500 characters"),
});
