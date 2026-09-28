"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { getServerEnv } from "@/lib/env";
import { hashIp } from "@/lib/hash";
import { getPrismaClient } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";
import { contactFormSchema, type ContactFormValues } from "@/schemas/contact";

export interface ContactActionResult {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
}

const GENERIC_ERROR_MESSAGE =
  "Something went wrong while sending your message. Please try again, or email me directly.";

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormValues | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { success: false, message: "Please fix the highlighted fields.", fieldErrors };
  }

  const { name, email, company, subject, message, companyWebsite } = parsed.data;

  // Honeypot: a real visitor never fills this hidden field. Report success
  // without doing any work so bots don't learn the submission was rejected.
  if (companyWebsite) {
    return { success: true, message: "Thanks — I will get back to you soon." };
  }

  let env: ReturnType<typeof getServerEnv>;
  try {
    env = getServerEnv();
  } catch (error) {
    console.error("[contact] server misconfigured:", error);
    return {
      success: false,
      message: "The contact form is temporarily unavailable. Please email me directly instead.",
    };
  }

  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
  const ipHash = hashIp(ip);

  const prisma = getPrismaClient();

  try {
    if (await isRateLimited(prisma, ipHash)) {
      return {
        success: false,
        message: "Too many messages sent recently. Please try again later.",
      };
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company ? company : null,
        subject,
        message,
        ipHash,
      },
    });
  } catch (error) {
    console.error("[contact] failed to persist submission:", error);
    return { success: false, message: GENERIC_ERROR_MESSAGE };
  }

  if (env.RESEND_API_KEY && env.CONTACT_FROM_EMAIL && env.CONTACT_TO_EMAIL) {
    try {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: env.CONTACT_FROM_EMAIL,
        to: env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `Portfolio contact: ${subject}`,
        text: `From: ${name} <${email}>\nCompany: ${company || "-"}\n\n${message}`,
      });
    } catch (error) {
      // The submission is already saved — a delivery failure shouldn't fail the request.
      console.error("[contact] failed to send notification email:", error);
    }
  }

  return { success: true, message: "Thanks — I will get back to you soon." };
}
