import { describe, expect, it } from "vitest";

import { contactFormSchema } from "@/schemas/contact";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  company: "Acme Inc.",
  subject: "Let's work together",
  message: "This message is definitely long enough to pass validation.",
  companyWebsite: "",
};

describe("contactFormSchema", () => {
  it("accepts a fully valid payload", () => {
    const result = contactFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("accepts an empty optional company field", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, company: "" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects a name that is too short", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, name: "J" });
    expect(result.success).toBe(false);
  });

  it("still parses successfully when the honeypot field is filled", () => {
    // Schema validation intentionally allows this through; @/actions/contact
    // is what silently drops honeypot-triggered submissions (see its tests).
    const result = contactFormSchema.safeParse({
      ...validPayload,
      companyWebsite: "https://spam.example",
    });
    expect(result.success).toBe(true);
  });
});
