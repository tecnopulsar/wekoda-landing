import type { Metadata } from "next";
import { IrRepeaterHero } from "@/components/ui-public/ir-repeater/IrRepeaterHero";
import { IrProblemSolution } from "@/components/ui-public/ir-repeater/IrProblemSolution";
import { IrHardwareShowcase } from "@/components/ui-public/ir-repeater/IrHardwareShowcase";
import { IrConnectivityBento } from "@/components/ui-public/ir-repeater/IrConnectivityBento";
import { IrPlatformBrain } from "@/components/ui-public/ir-repeater/IrPlatformBrain";
import { IrTechSpecs } from "@/components/ui-public/ir-repeater/IrTechSpecs";
import { IR_REPEATER_PATH, irRepeaterImages } from "@/lib/ir-repeater";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

const title = "WeKoda IR Repeater — control infrarrojo sobre IP";
const description =
  "Convertí TVs, aires y proyectores con control remoto tradicional en activos digitales. Captura y emisión IR sobre IP, Ethernet industrial o WiFi, gobernados desde la plataforma WeKoda.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "repetidor infrarrojo por IP",
    "control remoto IR sobre IP",
    "IR Repeater",
    "automatización de salas",
    "control de aires acondicionados",
    "WT32-ETH01",
    "ESP32 IR"
  ],
  alternates: { canonical: IR_REPEATER_PATH },
  openGraph: {
    type: "website",
    url: absoluteUrl(IR_REPEATER_PATH),
    title,
    description,
    images: [
      {
        url: irRepeaterImages.hero,
        alt: "Kit WeKoda IR Repeater con emisor, receptor y alimentación USB"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [irRepeaterImages.hero]
  }
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "WeKoda IR Repeater",
  brand: { "@type": "Brand", name: SITE_NAME },
  description,
  image: absoluteUrl(irRepeaterImages.hero),
  url: absoluteUrl(IR_REPEATER_PATH),
  category: "IoT hardware",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: absoluteUrl(IR_REPEATER_PATH)
  }
};

export default function IrRepeaterPage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <IrRepeaterHero />
      <IrProblemSolution />
      <IrHardwareShowcase />
      <IrConnectivityBento />
      <IrPlatformBrain />
      <IrTechSpecs />
    </div>
  );
}
