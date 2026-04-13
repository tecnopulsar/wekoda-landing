import Link from "next/link";
import { Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAppLoginUrl } from "@/lib/constants";

export function PublicNavbar() {
  const loginUrl = getAppLoginUrl();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <Hexagon className="h-6 w-6 shrink-0 text-primary fill-primary/10" aria-hidden />
          <div className="text-2xl font-black tracking-tighter md:text-3xl">
            <span className="text-secondary">We</span>
            <span className="ml-1 text-primary">Koda</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            asChild
            className="hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex"
          >
            <a href={loginUrl} data-action="nav-login" data-entity="session">
              Iniciar sesión
            </a>
          </Button>
          <Button
            asChild
            className="inline-flex rounded-full bg-primary px-6 text-white shadow-sm hover:bg-primary/90"
          >
            <Link href="#contacto" data-action="nav-contact" data-entity="lead">
              Contacto
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
