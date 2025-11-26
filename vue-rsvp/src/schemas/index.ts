import { z } from "zod";

export const formSchema = z
  .object({
    email: z.string().email("Must be a valid email address"),
    emailConfirmation: z.string().email("Must be a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character"
      ),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be in format: 0863847219"),
    ticketType: z.enum(["general", "vip", "student"]),
    numberOfTickets: z
      .number()
      .min(1, "Must purchase at least 1 ticket")
      .max(10, "Maximum 10 tickets per order"),
    dietaryRestrictions: z.array(z.string()),
    promoCode: z.string().optional(),
  })
  .refine((data) => data.email === data.emailConfirmation, {
    message: "Emails must match",
    path: ["emailConfirmation"],
  });
