import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-medium tracking-wide text-accent uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-base text-muted">
        The page you&apos;re looking for may have been moved or never existed. Let&apos;s get you
        back to the homepage.
      </p>
      <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-8`}>
        <ArrowLeft aria-hidden="true" />
        Back to home
      </Link>
    </Container>
  );
}
