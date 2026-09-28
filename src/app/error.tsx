"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-medium tracking-wide text-accent uppercase">Error</p>
      <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-base text-muted">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}
