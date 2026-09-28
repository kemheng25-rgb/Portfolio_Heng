import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const submitContactFormMock = vi.fn();

vi.mock("@/actions/contact", () => ({
  submitContactForm: (...args: unknown[]) => submitContactFormMock(...args),
}));

import { ContactForm } from "@/components/contact/contact-form";

describe("ContactForm", () => {
  it("shows validation errors instead of submitting when fields are missing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/enter your full name/i)).toBeInTheDocument();
    expect(submitContactFormMock).not.toHaveBeenCalled();
  });

  it("submits valid input and shows the success state", async () => {
    submitContactFormMock.mockResolvedValue({
      success: true,
      message: "Thanks — I will get back to you soon.",
    });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name$/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^subject$/i), "Project inquiry");
    await user.type(
      screen.getByLabelText(/^message$/i),
      "This message is definitely long enough to pass validation.",
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(submitContactFormMock).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/thanks — i will get back to you soon/i)).toBeInTheDocument();
  });

  it("shows a server-reported error message", async () => {
    submitContactFormMock.mockResolvedValue({
      success: false,
      message: "Too many messages sent recently. Please try again later.",
    });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name$/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^subject$/i), "Project inquiry");
    await user.type(
      screen.getByLabelText(/^message$/i),
      "This message is definitely long enough to pass validation.",
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/too many messages sent recently/i)).toBeInTheDocument();
  });
});
