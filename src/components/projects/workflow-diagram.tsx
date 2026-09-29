import { ArrowRight } from "lucide-react";

// Matches the 2.4s cadence used by the data-packet/node-flash animations
// in the architecture diagrams, so a step's badge and the arrow after it
// light up on the same forward-moving rhythm as the rest of the site's
// diagrams — just as a color/scale pulse instead of a literal traveling
// dot, since these are icon glyphs rather than SVG paths.
const CYCLE_SECONDS = 2.4;

export function WorkflowDiagram({ steps }: { steps: string[] }) {
  const stepInterval = CYCLE_SECONDS / steps.length;

  return (
    <ol className="flex flex-col gap-3 rounded-lg border border-border bg-background-elevated p-6 sm:flex-row sm:flex-wrap sm:items-stretch">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-1 items-center gap-3">
          <div className="flex flex-1 items-start gap-3 rounded-md border border-border bg-background p-4">
            <span
              className="step-pulse flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground"
              style={{ animationDelay: `${-(index * stepInterval)}s` }}
            >
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-muted">{step}</p>
          </div>
          {index !== steps.length - 1 && (
            <ArrowRight
              aria-hidden="true"
              className="step-arrow-flow hidden size-5 shrink-0 sm:block"
              style={{ animationDelay: `${-(index * stepInterval + stepInterval / 2)}s` }}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
