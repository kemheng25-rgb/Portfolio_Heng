import { ImageResponse } from "next/og";

import { brand, personal } from "@/data/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0b1120",
          color: "#eef1f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            fontWeight: 700,
            color: "#38bdf8",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 12,
              border: "2px solid #22304a",
            }}
          >
            {personal.initials}
          </div>
          {personal.displayName}
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 48, fontWeight: 600, maxWidth: 950 }}>
          {brand.headline}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#94a3b8" }}>
          {personal.title} &middot; {personal.specialization}
        </div>
      </div>
    ),
    { ...size },
  );
}
