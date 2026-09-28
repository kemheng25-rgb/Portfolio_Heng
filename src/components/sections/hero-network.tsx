const nodes = [
  { id: "erp", label: "ERP", x: 60, y: 60 },
  { id: "hr", label: "HR", x: 60, y: 220 },
  { id: "pos", label: "POS", x: 60, y: 380 },
  { id: "api", label: "API", x: 240, y: 220 },
  { id: "db", label: "DB", x: 400, y: 120 },
  { id: "sap", label: "SAP", x: 400, y: 320 },
] as const;

const edges: [string, string][] = [
  ["erp", "api"],
  ["hr", "api"],
  ["pos", "api"],
  ["api", "db"],
  ["api", "sap"],
];

function nodeById(id: string) {
  return nodes.find((node) => node.id === id)!;
}

/**
 * A static, CSS-animated system map for the hero section: independent
 * systems (ERP, HR, POS) flowing through a shared integration layer into a
 * database and SAP. Pure SVG + CSS so it never blocks or delays LCP, and it
 * fully respects prefers-reduced-motion via the global animation reset.
 */
export function HeroNetwork() {
  return (
    <svg
      viewBox="0 0 460 440"
      role="img"
      aria-label="Diagram showing ERP, HR, and POS systems connecting through a shared API layer to a database and SAP"
      className="h-full w-full"
    >
      <g stroke="var(--border)" strokeWidth={1.5} fill="none">
        {edges.map(([fromId, toId]) => {
          const from = nodeById(fromId);
          const to = nodeById(toId);
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className="data-flow-line"
              stroke="var(--accent)"
              strokeOpacity={0.6}
            />
          );
        })}
      </g>
      {nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          <circle
            r={30}
            fill="var(--background-elevated)"
            stroke="var(--border)"
            strokeWidth={1.5}
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--foreground)"
            fontSize={13}
            fontWeight={600}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
