import { ParticleField } from "@/components/sections/particle-field";

/**
 * A single ambient backdrop for the whole page: fixed to the viewport (so it
 * doesn't scroll away between sections), painted behind everything else via
 * negative z-index. Sections themselves stay transparent so this shows
 * through the gaps between cards as you scroll, instead of the page going
 * flat after the hero.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-background bg-grid bg-grid-animated"
    >
      <div className="absolute inset-0">
        <div className="aurora-blob aurora-blob-a top-[-10%] left-[-10%] size-[28rem] bg-accent" />
        <div className="aurora-blob aurora-blob-b top-1/3 right-[-15%] size-[26rem] bg-accent-strong" />
        <div className="aurora-blob aurora-blob-c bottom-[-15%] left-1/4 size-[24rem] bg-accent" />
      </div>
      <ParticleField />
      <div className="crt-scanlines" />
      <div className="crt-scan-beam" />
    </div>
  );
}
