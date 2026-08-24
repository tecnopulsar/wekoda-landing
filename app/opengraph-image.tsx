import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — Plataforma IoT para gestionar y automatizar dispositivos`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #04070f 0%, #0b1a2e 55%, #0d3450 100%)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              background: "rgba(14,165,233,0.15)",
              border: "2px solid rgba(14,165,233,0.5)",
              fontSize: 26,
              fontWeight: 900,
              color: "#0ea5e9"
            }}
          >
            WK
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 900, letterSpacing: -1 }}>
            <span style={{ color: "#ef4d63" }}>We</span>
            <span style={{ color: "#0ea5e9", marginLeft: 8 }}>Koda</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#38bdf8"
            }}
          >
            Plataforma IoT over IP
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: "#f8fafc",
              maxWidth: 940
            }}
          >
            Operá dispositivos como infraestructura, no como hardware.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Gestión de flota", "OTA remoto", "Zero Trust", "Automatización"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                fontSize: 22,
                color: "#cbd5e1"
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
