"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { submitContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormValues } from "@/schemas/contact";

type FormStatus = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      companyWebsite: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    setStatus("idle");
    setStatusMessage(null);

    startTransition(async () => {
      const result = await submitContactForm(values);

      if (result.success) {
        setStatus("success");
        setStatusMessage(result.message);
        reset();
        return;
      }

      setStatus("error");
      setStatusMessage(result.message);
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (message) {
            setError(field as keyof ContactFormValues, { message });
          }
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            className="mt-1.5"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-1.5"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="company">
          Company <span className="text-muted">(optional)</span>
        </Label>
        <Input
          id="company"
          autoComplete="organization"
          className="mt-1.5"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
          {...register("company")}
        />
        {errors.company && (
          <p id="company-error" role="alert" className="mt-1.5 text-sm text-red-400">
            {errors.company.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          className="mt-1.5"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          {...register("subject")}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1.5 text-sm text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          className="mt-1.5"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from sighted and screen-reader users, never focusable. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="companyWebsite">Leave this field empty</label>
        <input
          id="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 aria-hidden="true" className="animate-spin" />}
          {isPending ? "Sending…" : "Send Message"}
        </Button>

        <div role="status" aria-live="polite" className="text-sm">
          {status === "success" && (
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 aria-hidden="true" className="size-4" />
              {statusMessage}
            </span>
          )}
          {status === "error" && (
            <span className={cn("inline-flex items-center gap-1.5 text-red-400")}>
              <XCircle aria-hidden="true" className="size-4" />
              {statusMessage}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
