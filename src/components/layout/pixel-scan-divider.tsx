const DOT_COUNT = 28;
const dots = Array.from({ length: DOT_COUNT }, (_, index) => index);

/**
 * A row of pixels that light up one after another, like an old activity
 * light bar / Cylon scanner — a second, distinct pixel-art motif (see
 * PixelSkyline for the first) so the page doesn't just repeat the same
 * skyline everywhere. Sits between two sections as a divider in place of
 * a plain border.
 */
export function PixelScanDivider() {
  return (
    <div aria-hidden="true" className="pixel-scan-divider">
      {dots.map((index) => (
        <span
          key={index}
          className="pixel-scan-dot"
          style={{ animationDelay: `${-(index * 0.09)}s` }}
        />
      ))}
    </div>
  );
}
