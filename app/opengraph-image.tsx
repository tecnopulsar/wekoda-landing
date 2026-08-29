import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — Plataforma IoT over IP`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#050a14"
        }}
      >
        {/* Atmosphere */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 18% 20%, rgba(14,165,233,0.35), transparent 42%), radial-gradient(circle at 82% 70%, rgba(239,77,99,0.22), transparent 40%), radial-gradient(circle at 55% 40%, rgba(56,189,248,0.12), transparent 50%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.35,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "64px 72px",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {/* Brand column — survives square crop */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: 620
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "rgba(14,165,233,0.18)",
                  border: "2px solid rgba(14,165,233,0.55)",
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#38bdf8"
                }}
              >
                WK
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#7dd3fc"
                }}
              >
                IoT over IP
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 900,
                letterSpacing: -4,
                lineHeight: 0.95
              }}
            >
              <span style={{ color: "#ef4d63" }}>We</span>
              <span style={{ color: "#0ea5e9", marginLeft: 10 }}>Koda</span>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 34,
                fontWeight: 600,
                lineHeight: 1.25,
                color: "#e2e8f0",
                maxWidth: 560
              }}
            >
              Operá dispositivos como infraestructura.
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 36
              }}
            >
              {["Fleet", "OTA", "Zero Trust"].map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: "10px 18px",
                    borderRadius: 999,
                    border: "1px solid rgba(14,165,233,0.35)",
                    background: "rgba(14,165,233,0.12)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#bae6fd"
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* Network visual */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              width: 380
            }}
          >
            {/* Edge devices */}
            <div style={{ display: "flex", gap: 14 }}>
              {["IR", "LED", "I/O"].map((label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 96,
                    height: 72,
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(15,23,42,0.85)",
                    color: "#f8fafc",
                    fontSize: 22,
                    fontWeight: 700
                  }}
                >
                  {label}
                  <div
                    style={{
                      display: "flex",
                      marginTop: 6,
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: "#34d399",
                      boxShadow: "0 0 12px rgba(52,211,153,0.9)"
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Connector */}
            <div
              style={{
                display: "flex",
                width: 4,
                height: 36,
                borderRadius: 999,
                background: "linear-gradient(#0ea5e9, #34d399)"
              }}
            />

            {/* Gateway */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 220,
                height: 110,
                borderRadius: 24,
                border: "2px solid rgba(14,165,233,0.55)",
                background: "rgba(14,165,233,0.16)",
                boxShadow: "0 0 40px rgba(14,165,233,0.35)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#e0f2fe"
                }}
              >
                Gateway
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 6,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#7dd3fc"
                }}
              >
                Zero Trust · MQTT
              </div>
            </div>

            {/* Connector */}
            <div
              style={{
                display: "flex",
                width: 4,
                height: 36,
                borderRadius: 999,
                background: "linear-gradient(#34d399, #0ea5e9)"
              }}
            />

            {/* Panel */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 280,
                height: 64,
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(15,23,42,0.9)",
                fontSize: 22,
                fontWeight: 700,
                color: "#f8fafc"
              }}
            >
              Panel WeKoda
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
