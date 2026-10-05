// lib/validations/recruitment.ts
import * as z from "zod";

export const applicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  institution: z.string().min(2, "Institution name is required"),
  year: z.string().min(1, "Please select your year of study"),
  track: z.enum(["frontend", "backend", "design", "fullstack"], {
    error: "Please select a domain track",
  }),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  whyJoin: z.string().min(50, "Please tell us a bit more (minimum 50 characters)"),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;