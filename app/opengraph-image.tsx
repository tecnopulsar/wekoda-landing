import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND_LOGO_SRC, SITE_NAME } from "@/lib/seo";

/**
 * 1200×630. WhatsApp recorta a 1:1 desde el centro: el logo oficial ocupa
 * la zona segura central.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — platform for IoT-over-IP`;

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public", BRAND_LOGO_SRC.replace(/^\//, ""))
  );
  const mime = BRAND_LOGO_SRC.endsWith(".png") ? "image/png" : "image/jpeg";
  const logoSrc = `data:${mime};base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff"
        }}
      >
        <img
          src={logoSrc}
          width={1000}
          height={560}
          style={{
            width: 1000,
            height: 560,
            objectFit: "contain"
          }}
        />
      </div>
    ),
    size
  );
}
