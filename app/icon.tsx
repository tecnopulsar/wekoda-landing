import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#0b1220",
          borderRadius: 14
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: -2,
            color: "#0ea5e9"
          }}
        >
          <span style={{ color: "#ef4d63" }}>W</span>
          <span>K</span>
        </div>
      </div>
    ),
    size
  );
}
