import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

/**
 * 1200×630 (estándar OG). WhatsApp recorta a un cuadrado ~1:1, casi siempre
 * desde el centro. Todo lo importante vive en la zona central segura.
 */
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1220"
        }}
      >
        {/* Side fillers (fuera del crop cuadrado de WhatsApp) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.25), transparent 55%)"
          }}
        />

        {/* Safe square ~630×630 centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 630,
            height: 630,
            overflow: "hidden",
            borderRadius: 28,
            background: "#ffffff",
            boxShadow: "0 24px 80px rgba(0,0,0,0.45)"
          }}
        >
          {/* Brand band */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "28px 24px 20px",
              background: "linear-gradient(180deg, #ffffff 0%, #e0f2fe 100%)"
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1
              }}
            >
              <span style={{ color: "#ef4d63" }}>We</span>
              <span style={{ color: "#0284c7", marginLeft: 8 }}>Koda</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 10,
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

          {/* Product fills the rest of the square */}
          <div
            style={{
              display: "flex",
              position: "relative",
              flex: 1,
              width: "100%",
              overflow: "hidden",
              background: "#38bdf8"
            }}
          >
            <img
              src={kitSrc}
              width={630}
              height={430}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top"
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 16,
                right: 16,
                bottom: 16,
                display: "flex",
                justifyContent: "center",
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(15,23,42,0.82)",
                color: "#ffffff",
                fontSize: 18,
                fontWeight: 700
              }}
            >
              Plataforma IoT · IR Repeater
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
