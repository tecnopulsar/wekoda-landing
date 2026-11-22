import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

const PATH = '/privacidad';
const title = 'Política de privacidad de WeKoda Player';
const description =
  'Qué datos trata WeKoda Player en el televisor, para qué los usa y a qué servidor de la organización se envían. No hay publicidad ni analítica de terceros en la app.';

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

const UPDATED = '22 de noviembre de 2026';

export default function PrivacyPage() {
  return (
    <article className='bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 md:py-16'>
      <div className='mx-auto w-full max-w-3xl'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          WeKoda Player
        </p>
        <h1 className='mt-3 text-balance text-3xl font-extrabold tracking-tight md:text-4xl'>
          Política de privacidad
        </h1>
        <p className='mt-4 text-sm text-slate-400'>
          Vigente desde el {UPDATED}. Esta página es la política de la app. La
          portada de wekoda.lat no lo es.
        </p>

        <div className='mt-10 space-y-10 text-base leading-relaxed text-slate-300'>
          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>De qué app se trata</h2>
            <p>
              WeKoda Player es el reproductor de cartelería digital de WeKoda
              para televisores y equipos Android. En el sistema se llama Wekoda
              Android Signage y su identificador es{' '}
              <span className='text-slate-100'>lat.wekoda.signage.androidtv</span>.
              La instala una organización en pantallas que ella opera. Muestra
              las campañas de esa organización y se conecta al servidor WeKoda
              que el operador escribe en el equipo.
            </p>
            <p>
              No es una app de consumo, no muestra publicidad y no está dirigida
              a menores. No pide una cuenta de Google para funcionar.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Quién es responsable</h2>
            <p>
              WeTech, Olleros 3916, Ciudad Autónoma de Buenos Aires, Argentina.
              Correo:{' '}
              <a
                href='mailto:ingenieria@wetechar.com'
                className='text-primary underline-offset-4 hover:underline'
                data-action='open-email'
                data-entity='contact'
              >
                ingenieria@wetechar.com
              </a>
              . Teléfono: +54 11 5823-0996.
            </p>
            <p>
              La organización que instala el televisor elige el servidor y las
              campañas. Si ese servidor lo hospeda WeTech, WeTech trata los
              datos del reproductor para prestar ese servicio. Si el servidor
              está en la red del cliente, los datos llegan a esa red.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Qué datos trata la app</h2>
            <p>La app no pide contactos, micrófono, cámara, ubicación GPS ni archivos personales.</p>
            <p>Sí trata lo siguiente, en el equipo y hacia el servidor de la organización:</p>
            <ul className='list-disc space-y-2 pl-5'>
              <li>
                Identidad del reproductor. Con el ANDROID_ID del sistema arma
                una dirección de red local y estable, que empieza en 02. No
                envía el ANDROID_ID en crudo. El servidor asigna un
                identificador de equipo y un secreto, que quedan en el
                almacenamiento privado de la app. El operador puede ingresar un
                código de alta o un PIN para vincular el televisor.
              </li>
              <li>
                Red del equipo. Dirección IPv4, si el enlace es ethernet o wifi
                y, cuando el sistema la informa, la puerta de enlace. Sirve
                para ver el reproductor en la flota. No se usa para ubicar
                personas ni para publicidad.
              </li>
              <li>
                Estado del reproductor. Versión de la app, modelo declarado por
                el agente, resolución, volumen, tiempo encendido, espacio libre,
                contenidos ya guardados, playlist en reproducción, posición y
                errores. También la dirección del servidor que escribió el
                operador.
              </li>
              <li>
                Captura de la pantalla. Solo si un operador la pide desde
                WeKoda. La app envía un JPEG de lo que se está mostrando al
                servidor de esa organización, para comprobar la campaña.
              </li>
              <li>
                Arranque. El permiso de inicio al encender el equipo vuelve a
                abrir el reproductor. No lee otras apps.
              </li>
            </ul>
            <p>
              La app no incluye SDK de anuncios ni de analítica de terceros. La
              copia de seguridad de Android está desactivada: el secreto del
              equipo no se copia a una cuenta de Google.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Para qué se usa</h2>
            <ul className='list-disc space-y-2 pl-5'>
              <li>Vincular el televisor a la flota de la organización.</li>
              <li>Bajar y reproducir la campaña que corresponde a esa pantalla.</li>
              <li>Mostrar en el panel si el equipo está en línea, qué reproduce y si hubo un error.</li>
              <li>Atender un pedido de captura o de reinicio que hace la organización.</li>
              <li>Dar soporte cuando el cliente lo pide.</li>
            </ul>
            <p>
              No se usa para perfilar personas, decidir crédito, mostrar
              publicidad ni entrenar modelos con lo que pasa por las pantallas.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Con quién se comparte</h2>
            <p>
              Con el servidor WeKoda que configuró la organización, en su red o
              en el servicio que WeTech opera para ese cliente. No se vende. No
              se cede a redes publicitarias ni a corredores de datos. WeTech
              accede a esos datos cuando hospeda el servidor o cuando el cliente
              pide soporte.
            </p>
            <p>
              Los videos e imágenes de las campañas los sube la organización. El
              televisor los descarga para mostrarlos.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Cuánto tiempo se conserva</h2>
            <p>
              En el televisor, el identificador, el secreto y la caché de medios
              quedan hasta que se desinstala la app, se restablece el equipo o
              la organización hace un reset desde WeKoda.
            </p>
            <p>
              En el servidor, la organización conserva el alta, la telemetría y
              las capturas según su operación. Para pedir la baja de un equipo
              hospedado por WeTech, se escribe a ingenieria@wetechar.com.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Derechos de acceso</h2>
            <p>
              Quien tenga un interés sobre esos datos puede pedir acceso,
              rectificación o supresión a ingenieria@wetechar.com. WeTech
              responde en el marco de la Ley 25.326 de Protección de Datos
              Personales de Argentina. El identificador del reproductor no es
              el nombre de una persona; si un pedido corresponde a la
              organización que opera la pantalla, se resuelve con esa
              organización.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Niños</h2>
            <p>
              WeKoda Player no está dirigida a menores de 13 años y no pide
              datos de niños a propósito.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Esta página web</h2>
            <p>
              Abrir wekoda.lat puede registrar una visita técnica del sitio
              para saber si la página cargó. Eso lo hace el sitio, no la app
              del televisor. La app no abre esta página ni usa esa medición.
            </p>
          </section>

          <section className='space-y-3'>
            <h2 className='text-xl font-semibold text-white'>Cambios</h2>
            <p>
              Si cambia el tratamiento, se actualiza esta página y la fecha de
              arriba. La dirección de esta política es https://wekoda.lat/privacidad.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
