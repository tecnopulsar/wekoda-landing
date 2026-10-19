import Link from 'next/link';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/brand-logo';
import { getAppLoginUrl, SHOW_APP_LOGIN } from '@/lib/constants';

export async function PublicNavbar() {
  const loginUrl = getAppLoginUrl((await headers()).get('host'));
  return (
    <header className='sticky top-0 z-50 w-full overflow-visible border-b border-border/40 bg-background/80 backdrop-blur-md transition-all'>
      <div className='container mx-auto flex h-16 max-w-7xl items-center justify-between overflow-visible px-4 md:px-8'>
        <Link
          href='/'
          className='relative z-[60] mr-1 flex h-16 w-[9.5rem] shrink-0 items-center transition-opacity hover:opacity-90 sm:w-[11rem] md:mr-2 md:w-[14rem] lg:w-[16rem]'
          data-action='nav-home'
          data-entity='brand'
          aria-label='WeKoda — inicio'
        >
          <BrandLogo
            priority
            className='relative h-[5.75rem] w-auto max-w-none md:h-[7.25rem] lg:h-[8.5rem]'
          />
        </Link>
        <div className='flex items-center gap-2 md:gap-4'>
          <Button
            variant='ghost'
            asChild
            className='hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex'
          >
            <Link
              href='/soluciones/digital-signage'
              data-action='nav-cms-signage'
              data-entity='digital-signage'
            >
              CMS Signage
            </Link>
          </Button>
          <Button
            variant='ghost'
            asChild
            className='hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex'
          >
            <Link
              href='/#domotica-iot'
              data-action='nav-domotics-iot'
              data-entity='platform'
            >
              Domótica IoT
            </Link>
          </Button>
          <Button
            variant='ghost'
            asChild
            className='hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex'
          >
            <Link
              href='/devblog'
              data-action='nav-devblog'
              data-entity='devblog'
            >
              DevBlog
            </Link>
          </Button>
          {SHOW_APP_LOGIN ? (
            <Button
              variant='ghost'
              asChild
              className='hidden text-base font-medium text-muted-foreground hover:text-primary md:inline-flex'
            >
              <a
                href={loginUrl}
                data-action='nav-login'
                data-entity='session'
              >
                Iniciar sesión
              </a>
            </Button>
          ) : null}
          <Button
            asChild
            className='inline-flex rounded-full bg-primary px-6 text-white shadow-sm hover:bg-primary/90'
          >
            <Link
              href='/#contacto'
              data-action='nav-contact'
              data-entity='lead'
            >
              Contacto
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
