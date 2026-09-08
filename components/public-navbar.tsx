import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { getAppLoginUrl, SHOW_APP_LOGIN } from "@/lib/constants";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
          data-action="nav-home"
          data-entity="brand"
          aria-label="WeKoda — inicio"
        >
          <BrandLogo priority />
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            asChild
            className="hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex"
          >
            <Link href="/soluciones/ir-repeater" data-action="nav-ir-repeater" data-entity="ir-repeater">
              IR Repeater
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex"
          >
            <Link href="/soluciones/digital-signage" data-action="nav-digital-signage" data-entity="digital-signage">
              Digital Signage
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex"
          >
            <Link href="/devblog" data-action="nav-devblog" data-entity="devblog">
              DevBlog
            </Link>
          </Button>
          {SHOW_APP_LOGIN ? (
            <Button
              variant="ghost"
              asChild
              className="hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex"
            >
              <a href={getAppLoginUrl()} data-action="nav-login" data-entity="session">
                Iniciar sesión
              </a>
            </Button>
          ) : null}
          <Button
            asChild
            className="inline-flex rounded-full bg-primary px-6 text-white shadow-sm hover:bg-primary/90"
          >
            <Link href="/#contacto" data-action="nav-contact" data-entity="lead">
              Contacto
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
