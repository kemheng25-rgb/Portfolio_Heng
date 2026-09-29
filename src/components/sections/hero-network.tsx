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
 * database and SAP. Pure SVG so it never blocks or delays LCP. The dashed
 * lines and node pulse are CSS animations, covered by the global
 * prefers-reduced-motion reset; the traveling "data packet" dots use SVG's
 * native <animateMotion> (SMIL), which that reset can't touch, so
 * .data-packet is hidden outright under reduced motion instead (see
 * globals.css). Each destination node has a matching .node-flash ring
 * using the same animation-delay as its packet's SMIL `begin`, so it
 * lights up exactly when the packet arrives.
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
      {edges.map(([fromId, toId], index) => {
        const from = nodeById(fromId);
        const to = nodeById(toId);
        return (
          <circle key={`packet-${fromId}-${toId}`} r={3.5} className="data-packet" fill="var(--accent-strong)">
            <animateMotion
              path={`M${from.x},${from.y} L${to.x},${to.y}`}
              dur="2.4s"
              begin={`${-(index * 0.5)}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
      {nodes.map((node, index) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          <circle
            r={30}
            className="node-pulse"
            style={{ animationDelay: `${(index % 3) * 0.5}s` }}
            fill="var(--background-elevated)"
            stroke="var(--accent)"
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
      {edges.map(([fromId, toId], index) => {
        const to = nodeById(toId);
        return (
          <circle
            key={`flash-${fromId}-${toId}`}
            cx={to.x}
            cy={to.y}
            r={34}
            className="node-flash"
            style={{ animationDelay: `${-(index * 0.5)}s` }}
            fill="none"
            stroke="var(--accent-strong)"
            strokeWidth={2}
          />
        );
      })}
    </svg>
  );
}
