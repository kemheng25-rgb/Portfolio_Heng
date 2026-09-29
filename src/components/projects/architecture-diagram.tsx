import type { ArchitectureDiagram, DiagramNodeType } from "@/types/portfolio";

const typeColor: Record<DiagramNodeType, string> = {
  client: "var(--accent)",
  api: "var(--accent-strong)",
  service: "var(--accent)",
  database: "var(--diagram-database)",
  external: "var(--diagram-external)",
};

const NODE_WIDTH = 168;
const NODE_HEIGHT = 56;
const H_GAP = 56;
const ROW_HEIGHT = 120;

export function ArchitectureDiagramView({ diagram }: { diagram: ArchitectureDiagram }) {
  const perRow = diagram.nodes.length > 4 ? Math.ceil(diagram.nodes.length / 2) : diagram.nodes.length;
  const positions = new Map<string, { x: number; y: number }>();

  diagram.nodes.forEach((node, index) => {
    const row = Math.floor(index / perRow);
    const col = index % perRow;
    positions.set(node.id, {
      x: col * (NODE_WIDTH + H_GAP) + NODE_WIDTH / 2 + 8,
      y: row * ROW_HEIGHT + NODE_HEIGHT / 2 + 8,
    });
  });

  const rows = Math.ceil(diagram.nodes.length / perRow);
  const width = perRow * (NODE_WIDTH + H_GAP) - H_GAP + 16;
  const height = rows * ROW_HEIGHT + 16;

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background-elevated p-6">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Simplified architecture diagram showing how this system's components connect"
        className="h-auto w-full"
        style={{ minWidth: Math.min(width, 640) }}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
          </marker>
        </defs>

        <g fill="none" stroke="var(--muted)" strokeWidth={1.5}>
          {diagram.edges.map((edge) => {
            const from = positions.get(edge.from);
            const to = positions.get(edge.to);
            if (!from || !to) return null;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 10;
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  markerEnd="url(#arrow)"
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    fill="var(--muted)"
                    stroke="none"
                    fontSize={11}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {diagram.edges.map((edge, index) => {
          const from = positions.get(edge.from);
          const to = positions.get(edge.to);
          if (!from || !to) return null;
          return (
            <circle
              key={`packet-${edge.from}-${edge.to}`}
              r={3.5}
              className="data-packet"
              fill="var(--accent-strong)"
            >
              <animateMotion
                path={`M${from.x},${from.y} L${to.x},${to.y}`}
                dur="2.4s"
                begin={`${-(index * 0.5)}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {diagram.nodes.map((node) => {
          const pos = positions.get(node.id)!;
          return (
            <g key={node.id} transform={`translate(${pos.x - NODE_WIDTH / 2}, ${pos.y - NODE_HEIGHT / 2})`}>
              <rect
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={10}
                fill="var(--background)"
                stroke={typeColor[node.type]}
                strokeWidth={1.5}
              />
              <text
                x={NODE_WIDTH / 2}
                y={NODE_HEIGHT / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--foreground)"
                fontSize={13}
                fontWeight={600}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {diagram.edges.map((edge, index) => {
          const to = positions.get(edge.to);
          if (!to) return null;
          return (
            <rect
              key={`flash-${edge.from}-${edge.to}`}
              x={to.x - NODE_WIDTH / 2 - 3}
              y={to.y - NODE_HEIGHT / 2 - 3}
              width={NODE_WIDTH + 6}
              height={NODE_HEIGHT + 6}
              rx={12}
              className="node-flash"
              style={{ animationDelay: `${-(index * 0.5)}s` }}
              fill="none"
              stroke="var(--accent-strong)"
              strokeWidth={2}
            />
          );
        })}
      </svg>
    </div>
  );
}
