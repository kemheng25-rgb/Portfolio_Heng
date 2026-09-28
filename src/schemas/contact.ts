import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address."),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(3, "Enter a subject.")
    .max(150, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(20, "Message should be at least 20 characters.")
    .max(4000, "Message is too long."),
  // Honeypot: real visitors never see or fill this field. Left unconstrained
  // at the schema level on purpose — a filled value must pass validation so
  // the server action can silently no-op instead of exposing a field error.
  companyWebsite: z.string().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
