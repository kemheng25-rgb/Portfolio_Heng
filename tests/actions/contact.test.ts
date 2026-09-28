import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn().mockResolvedValue({ data: { id: "email_1" }, error: null });
const countMock = vi.fn().mockResolvedValue(0);
const createMock = vi.fn().mockResolvedValue({ id: "submission_1" });

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => new Map([["x-forwarded-for", "203.0.113.5"]])),
}));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function MockResend() {
    return { emails: { send: sendMock } };
  }),
}));

vi.mock("@/lib/prisma", () => ({
  getPrismaClient: () => ({
    contactSubmission: {
      count: countMock,
      create: createMock,
    },
  }),
}));

vi.mock("@/lib/env", () => ({
  getServerEnv: vi.fn(() => ({
    DATABASE_URL: "postgresql://test",
    RESEND_API_KEY: "re_test",
    CONTACT_FROM_EMAIL: "noreply@example.com",
    CONTACT_TO_EMAIL: "owner@example.com",
  })),
}));

const validValues = {
  name: "Jane Doe",
  email: "jane@example.com",
  company: "",
  subject: "Project inquiry",
  message: "This message is definitely long enough to pass validation checks.",
  companyWebsite: "",
};

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    countMock.mockResolvedValue(0);
    createMock.mockResolvedValue({ id: "submission_1" });
    sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });
  });

  it("persists a valid submission and sends the notification email", async () => {
    const { submitContactForm } = await import("@/actions/contact");
    const result = await submitContactForm(validValues);

    expect(result.success).toBe(true);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("returns field errors for invalid input without touching the database", async () => {
    const { submitContactForm } = await import("@/actions/contact");
    const result = await submitContactForm({ ...validValues, email: "not-an-email" });

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.email).toBeTruthy();
    expect(createMock).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot-triggered submissions without persisting them", async () => {
    const { submitContactForm } = await import("@/actions/contact");
    const result = await submitContactForm({ ...validValues, companyWebsite: "https://bot.example" });

    expect(result.success).toBe(true);
    expect(createMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate-limits repeated submissions from the same sender", async () => {
    countMock.mockResolvedValue(10);
    const { submitContactForm } = await import("@/actions/contact");
    const result = await submitContactForm(validValues);

    expect(result.success).toBe(false);
    expect(createMock).not.toHaveBeenCalled();
  });

  it("still reports success when the submission is saved but the email fails", async () => {
    sendMock.mockRejectedValue(new Error("Resend is down"));
    const { submitContactForm } = await import("@/actions/contact");
    const result = await submitContactForm(validValues);

    expect(result.success).toBe(true);
    expect(createMock).toHaveBeenCalledTimes(1);
  });
});
