import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Car Events Near Me — Every UK car event, bookable in one place";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0f19 0%, #111827 60%, #1f2937 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700 }}>Car Events Near Me</div>
        <div style={{ fontSize: 34, color: "#9ca3af", marginTop: 20 }}>
          Every UK car event, bookable in one place
        </div>
        <div style={{ fontSize: 26, color: "#6b7280", marginTop: 28 }}>
          careventsnearme.uk
        </div>
      </div>
    ),
    { ...size }
  );
}
