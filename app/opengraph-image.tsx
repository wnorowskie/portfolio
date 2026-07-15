import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/site";

export const alt = "Eric Wnorowski — Full-Stack / Backend / Search";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Hex equivalents of the oklch "Arctic Reflection" tokens in globals.css
// (Satori does not support oklch): canvas, fog, ink, ink-strong, accent.
const palette = {
  canvas: "#f2fafd",
  fog: "#e4f1f5",
  ink: "#0d1c27",
  inkStrong: "#020f19",
  accent: "#477a8a",
};

export default function Image() {
  const site = getSiteConfig();

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
          backgroundColor: palette.canvas,
          backgroundImage: `radial-gradient(circle at 85% 15%, ${palette.fog}, ${palette.canvas} 60%)`,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: palette.accent,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 84,
            fontWeight: 700,
            color: palette.inkStrong,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 38,
            color: palette.ink,
            opacity: 0.8,
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 48,
          }}
        >
          {site.keywords.slice(0, 6).map((keyword) => (
            <div
              key={keyword}
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: 9999,
                border: `2px solid ${palette.accent}`,
                backgroundColor: palette.fog,
                fontSize: 26,
                fontWeight: 600,
                color: palette.ink,
              }}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
