import { Globe, Link as LinkIcon, Mail } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PixelSkyline } from "@/components/layout/pixel-skyline";
import { contact, navLinks, personal, social } from "@/data/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <PixelSkyline />
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2">
          <p className="text-lg font-semibold text-foreground">{personal.displayName}</p>
          <p className="text-sm text-muted">{personal.title}</p>
          <p className="text-sm text-muted">{personal.location}</p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="text-muted transition-colors hover:text-accent"
            >
              <Mail aria-hidden="true" className="size-5" />
            </a>
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-muted transition-colors hover:text-accent"
            >
              <LinkIcon aria-hidden="true" className="size-5" />
            </a>
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-muted transition-colors hover:text-accent"
              >
                <Globe aria-hidden="true" className="size-5" />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {personal.displayName}. All rights reserved.
        </p>
        <p>Built with Next.js and TypeScript.</p>
      </Container>
    </footer>
  );
}
