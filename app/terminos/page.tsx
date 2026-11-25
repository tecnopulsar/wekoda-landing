import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '@/lib/seo';

const PATH = '/terminos';
const title = 'Términos del servicio de WeKoda Player';
const description =
  'Condiciones de uso de WeKoda Player y de la plataforma WeKoda. El cliente responde por el contenido, las playlists y la publicidad que exhibe en sus dispositivos.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'article',
    url: absoluteUrl(PATH),
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const UPDATED = '24 de noviembre de 2026';

export default function TermsPage() {
  return (
    <article className='bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 md:py-16'>
      <div className='mx-auto w-full max-w-3xl'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          WeKoda Player
        </p>
        <h1 className='mt-3 text-balance text-3xl font-extrabold tracking-tight md:text-4xl'>
          Términos del servicio
        </h1>
        <p className='mt-4 text-sm text-slate-400'>
          Vigentes desde el {UPDATED}. Esta página son los términos de la app y
          de la plataforma. La portada de wekoda.lat no lo es.
        </p>

        <div className='mt-10 space-y-10 text-base leading-relaxed text-slate-300'>
          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>A quién alcanzan</h2>
            <p>
              Estos términos los acepta la organización que instala WeKoda
              Player, vincula un dispositivo o carga material en la plataforma
              WeKoda. En el sistema la app se llama Wekoda Android Signage y su
              identificador es{' '}
              <span className='text-slate-100'>lat.wekoda.signage.androidtv</span>.
            </p>
            <p>
              WeTech, Olleros 3916, Ciudad Autónoma de Buenos Aires, Argentina,
              presta la app y, cuando el cliente lo contrata, el servidor de la
              plataforma. El contacto es{' '}
              <a
                href='mailto:ingenieria@wetechar.com'
                className='text-primary underline-offset-4 hover:underline'
                data-action='open-email'
                data-entity='contact'
              >
                ingenieria@wetechar.com
              </a>
              .
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Qué es el servicio</h2>
            <p>
              WeKoda Player reproduce en televisores y equipos Android las
              campañas que el cliente publica en WeKoda. La plataforma permite
              dar de alta esos equipos, armar playlists y enviarles lo que el
              cliente decidió mostrar. El servidor puede ser el de la red del
              cliente o el que WeTech opera para ese cliente.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>
              El contenido lo decide el cliente
            </h2>
            <p>
              El cliente elige, carga y programa el material: videos, imágenes,
              audio, textos, playlists, campañas, avisos publicitarios, marcas,
              streams y cualquier otra pieza que la app o la plataforma envíen
              a un dispositivo vinculado o controlado.
            </p>
            <p>
              El cliente declara que puede reproducir y exhibir ese material en
              esos equipos y en esos lugares. Eso incluye derechos de autor,
              marcas, imagen de personas, música, locaciones y las normas que
              apliquen a la publicidad o al sitio donde está la pantalla.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>
              Deslinde por el uso del contenido
            </h2>
            <p>
              WeTech y WeKoda no eligen el contenido, no lo revisan antes de
              emitirlo y no lo aprueban. No son el anunciante, el medio ni el
              titular de las playlists del cliente.
            </p>
            <p>
              WeTech no responde por el mal uso que hagan el cliente, sus
              usuarios o quien administre la cuenta. Queda fuera de
              responsabilidad de WeTech el material ilícito, el que se usa sin
              licencia, el engañoso, el ofensivo y el que lesiona derechos de
              terceros. También queda fuera la exhibición en un dispositivo, un
              horario o un lugar que el cliente no debía usar.
            </p>
            <p>
              WeTech no responde por lo que el público vea en esas pantallas,
              ni por reclamos de titulares de derechos, autoridades o terceros,
              ni por daños que nazcan de esa reproducción. El cliente mantiene
              indemne a WeTech frente a esos reclamos, incluidos los gastos de
              defensa razonables.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Dispositivos vinculados</h2>
            <p>
              Los televisores y reproductores los aporta y los opera el
              cliente. La app los vincula a su flota y reproduce lo que el
              servidor de esa organización les manda. Una playlist equivocada,
              un equipo mal asignado o un dispositivo controlado sin
              autorización del dueño del lugar son hechos del cliente.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Uso aceptable</h2>
            <p>
              El cliente usa la app y la plataforma para su propia cartelería.
              No las usa para tomar el control de equipos ajenos, para
              distribuir software dañino ni para interferir el servicio de
              otros clientes.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Disponibilidad</h2>
            <p>
              La reproducción depende de la red, del equipo, del servidor y del
              archivo que el cliente subió. WeTech no garantiza que una pieza
              se vea en un instante determinado ni que el servicio esté libre
              de interrupciones.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Privacidad</h2>
            <p>
              El tratamiento de datos del reproductor está en la{' '}
              <Link
                href='/privacidad'
                className='text-primary underline-offset-4 hover:underline'
                data-action='nav-privacy'
                data-entity='legal'
              >
                política de privacidad
              </Link>
              .
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Ley y cambios</h2>
            <p>
              Estos términos se rigen por la ley de la República Argentina. Los
              tribunales ordinarios de la Ciudad Autónoma de Buenos Aires son
              los competentes.
            </p>
            <p>
              Si el texto cambia, se actualiza esta página y la fecha de
              arriba. La dirección de estos términos es https://wekoda.lat/terminos.
              Seguir usando la app o la plataforma después de un cambio implica
              aceptar el texto vigente.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
