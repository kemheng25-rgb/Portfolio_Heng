import { z } from "zod";

/**
 * Server-only environment variables the contact form depends on.
 *
 * Parsed lazily (inside the server action, never at module load) so that
 * `next build` succeeds even when no `.env` file is present.
 */
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_FROM_EMAIL: z.string().email().optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid server environment configuration: ${parsed.error.issues
        .map((issue) => issue.path.join("."))
        .join(", ")}`,
    );
  }
  return parsed.data;
}
