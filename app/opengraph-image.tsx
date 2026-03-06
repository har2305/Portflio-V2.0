import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "68px",
        background: "#0c111f",
        color: "#f2f5ff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 24, letterSpacing: 6, color: "#4be8af" }}>HAR SHA // SOFTWARE ENGINEER</div>
      <div style={{ marginTop: 24, fontSize: 70, lineHeight: 1.1, maxWidth: 900 }}>
        Building clean web products with real impact.
      </div>
    </div>,
    {
      ...size,
    },
  );
}
