import { ArrowRight } from "lucide-react";

export function WorkflowDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-3 rounded-lg border border-border bg-background-elevated p-6 sm:flex-row sm:flex-wrap sm:items-stretch">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-1 items-center gap-3">
          <div className="flex flex-1 items-start gap-3 rounded-md border border-border bg-background p-4">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-muted">{step}</p>
          </div>
          {index !== steps.length - 1 && (
            <ArrowRight
              aria-hidden="true"
              className="hidden size-5 shrink-0 text-muted sm:block"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
