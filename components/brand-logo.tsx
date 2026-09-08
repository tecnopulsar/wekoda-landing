import Image from "next/image";
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from "@/lib/seo";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  /** Altura visual del logo en el layout (el JPG trae mucho margen blanco). */
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt={BRAND_LOGO_ALT}
      width={640}
      height={360}
      priority={priority}
      className={cn("h-10 w-auto object-contain object-left md:h-12", className)}
    />
  );
}
