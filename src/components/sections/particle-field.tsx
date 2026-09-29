// Fixed, hand-picked values (not Math.random()) so server and client markup
// match exactly — randomizing at render time would cause a hydration
// mismatch. Left/duration/delay/size are just varied enough to read as
// natural rather than mechanical.
const particles = [
  { left: "3%", size: 5, duration: 19, delay: 0, color: "accent", variant: "normal" },
  { left: "9%", size: 7, duration: 24, delay: 4, color: "strong", variant: "alt" },
  { left: "16%", size: 4, duration: 16, delay: 9, color: "accent", variant: "normal" },
  { left: "24%", size: 6, duration: 22, delay: 2, color: "accent", variant: "alt" },
  { left: "32%", size: 5, duration: 18, delay: 12, color: "strong", variant: "normal" },
  { left: "41%", size: 7, duration: 26, delay: 6, color: "accent", variant: "alt" },
  { left: "49%", size: 4, duration: 15, delay: 0, color: "strong", variant: "normal" },
  { left: "57%", size: 6, duration: 21, delay: 15, color: "accent", variant: "alt" },
  { left: "65%", size: 5, duration: 20, delay: 8, color: "strong", variant: "normal" },
  { left: "73%", size: 7, duration: 25, delay: 3, color: "accent", variant: "alt" },
  { left: "80%", size: 4, duration: 17, delay: 11, color: "accent", variant: "normal" },
  { left: "88%", size: 6, duration: 23, delay: 5, color: "strong", variant: "alt" },
  { left: "94%", size: 5, duration: 19, delay: 14, color: "accent", variant: "normal" },
  { left: "12%", size: 5, duration: 27, delay: 17, color: "strong", variant: "alt" },
  { left: "62%", size: 4, duration: 16, delay: 20, color: "accent", variant: "normal" },
] as const;

/**
 * Small drifting "pixels" over the hero background — a falling-leaf style
 * ambient effect. Pure CSS (see .particle / @keyframes particle-fall in
 * globals.css), so it costs nothing on the JS bundle and automatically
 * freezes under prefers-reduced-motion via the site-wide reset.
 */
export function ParticleField() {
  return (
    <div aria-hidden="true" className="particle-field pointer-events-none">
      {particles.map((particle, index) => (
        <span
          key={index}
          className={particle.variant === "alt" ? "particle particle-alt" : "particle"}
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color === "strong" ? "var(--accent-strong)" : "var(--accent)",
            animationDuration: `${particle.duration}s`,
            animationDelay: `${-particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
