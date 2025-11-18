import { z } from "zod";

export const noteSchema = z.object({
  content: z
    .string()
    .min(1, "Note content is required")
    .max(500, "Note content must be less than 500 characters"),
});

export type NoteInput = z.infer<typeof noteSchema>;
