import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Hex equivalents of the oklch "Arctic Reflection" tokens in globals.css
// (Satori does not support oklch): fog, ink-strong, accent.
const palette = {
  fog: "#e4f1f5",
  inkStrong: "#020f19",
  accent: "#477a8a",
};

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: palette.fog,
          border: `2px solid ${palette.accent}`,
          borderRadius: "50%",
          fontFamily: "system-ui, sans-serif",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: palette.inkStrong,
        }}
      >
        EW
      </div>
    ),
    size
  );
}
