import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — Plataforma IoT over IP`;

export default async function OpenGraphImage() {
  const kitPhoto = await readFile(
    join(process.cwd(), "public/images/verticals/ir-repeater/kit-connected.jpg")
  );
  const kitSrc = `data:image/jpeg;base64,${kitPhoto.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f1f5f9"
        }}
      >
        {/* Left: brand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "48%",
            padding: "56px 48px 56px 64px",
            background: "linear-gradient(160deg, #ffffff 0%, #e8f4fc 55%, #dbeafe 100%)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "#0ea5e9",
                fontSize: 24,
                fontWeight: 900,
                color: "#ffffff"
              }}
            >
              WK
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#0369a1"
              }}
            >
              IoT over IP
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 900,
                letterSpacing: -3,
                lineHeight: 0.95
              }}
            >
              <span style={{ color: "#ef4d63" }}>We</span>
              <span style={{ color: "#0284c7", marginLeft: 8 }}>Koda</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 1.3,
                color: "#0f172a",
                maxWidth: 420
              }}
            >
              Gestioná y automatizá dispositivos conectados.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {["Fleet", "OTA", "Zero Trust", "IR"].map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "#0ea5e9",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#ffffff"
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>

        {/* Right: real product photo */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "52%",
            height: "100%",
            background: "#38bdf8",
            overflow: "hidden"
          }}
        >
          <img
            src={kitSrc}
            width={624}
            height={630}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 48,
              display: "flex",
              background: "linear-gradient(90deg, #dbeafe, transparent)"
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 28,
              bottom: 28,
              display: "flex",
              padding: "12px 18px",
              borderRadius: 14,
              background: "rgba(15,23,42,0.82)",
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 700
            }}
          >
            WeKoda IR Repeater
          </div>
        </div>
      </div>
    ),
    size
  );
}
