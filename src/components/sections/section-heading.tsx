import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-sm font-medium tracking-wide text-accent uppercase">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-[2.5rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-7 text-pretty text-muted">{description}</p>
      )}
    </div>
  );
}
