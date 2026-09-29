// Fixed heights/window counts (not random) so server and client markup
// match exactly. Equal-width blocks of varying height read as a skyline on
// their own — no need to vary width too.
const fullSkyline = [
  { height: 56, windows: 4 },
  { height: 84, windows: 6 },
  { height: 44, windows: 3 },
  { height: 100, windows: 8 },
  { height: 64, windows: 4 },
  { height: 76, windows: 6 },
  { height: 48, windows: 3 },
  { height: 92, windows: 6 },
  { height: 60, windows: 4 },
  { height: 80, windows: 6 },
  { height: 52, windows: 3 },
  { height: 72, windows: 4 },
] as const;

// Shorter and sparser — for the hero, which already carries the network
// diagram and shouldn't compete with it for attention.
const compactSkyline = [
  { height: 36, windows: 3 },
  { height: 56, windows: 4 },
  { height: 30, windows: 3 },
  { height: 64, windows: 4 },
  { height: 40, windows: 3 },
  { height: 52, windows: 4 },
  { height: 34, windows: 3 },
] as const;

interface PixelSkylineProps {
  compact?: boolean;
}

/**
 * A blocky, hard-edged skyline — the "pixel art" counterpart to the site's
 * softer ambient background (aurora blobs, particles). Windows blink on a
 * hard step timing (see .pixel-window / @keyframes pixel-window-blink in
 * globals.css) rather than fading, to read as 8-bit rather than another
 * glow effect. Used full-size on the footer and, compact, at the base of
 * the hero, so the page opens and closes on the same motif.
 */
export function PixelSkyline({ compact = false }: PixelSkylineProps) {
  const buildings = compact ? compactSkyline : fullSkyline;

  return (
    <div aria-hidden="true" className="pixel-skyline">
      {buildings.map((building, index) => (
        <div key={index} className="pixel-building" style={{ height: building.height }}>
          {Array.from({ length: building.windows }).map((_, windowIndex) => (
            <span key={windowIndex} className="pixel-window" />
          ))}
        </div>
      ))}
    </div>
  );
}
