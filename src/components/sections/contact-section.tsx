import { Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { contact, personal, social } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" aria-label="Contact" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about your next system"
            description="Email is the best way to reach me. The form below goes straight to my inbox."
          />

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-5 text-accent" />
              <a href={`mailto:${contact.email}`} className="text-foreground hover:text-accent">
                {contact.email}
              </a>
            </li>
            {contact.showPhone && (
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-5 text-accent" />
                <span className="text-foreground">{contact.phone}</span>
              </li>
            )}
            <li className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="size-5 text-accent" />
              <span className="text-foreground">{personal.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <LinkIcon aria-hidden="true" className="size-5 text-accent" />
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent"
              >
                {social.github.replace("https://", "")}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg border border-border bg-background-elevated p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
