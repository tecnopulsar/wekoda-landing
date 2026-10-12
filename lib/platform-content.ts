import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Building2,
  CalendarRange,
  Cloud,
  Cpu,
  Gauge,
  Gamepad2,
  Layers,
  Lightbulb,
  Monitor,
  MonitorPlay,
  Radio,
  Repeat2,
  ScrollText,
  ShieldCheck,
  Thermometer,
  ToggleLeft,
  Zap
} from "lucide-react";

const signagePanelImage = "/images/platform/apps/digital-signage.png";

export interface ShowcaseSection {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  Icon: LucideIcon;
}

/** Capturas reales del panel, agrupadas por lo que demuestran al visitante. */
export const showcaseSections: ShowcaseSection[] = [
  {
    id: "overview",
    label: "Resumen",
    title: "Toda la flota en un vistazo",
    description:
      "La pantalla de inicio responde en tres segundos cuántos equipos hay, cuáles responden y cuáles necesitan atención.",
    image: "/images/platform/overview/resumen-2.png",
    imageAlt: "Panel de resumen con el estado de la flota y la organización activa",
    highlights: [
      "Ciclo de vida completo: aprovisionamiento, adoptado, mantenimiento y decomisionado",
      "Presencia en vivo calculada por heartbeat, no por suposición",
      "Cada bloque abre la flota ya filtrada por ese estado"
    ],
    Icon: Gauge
  },
  {
    id: "signage-campaigns",
    label: "Campañas",
    title: "Planificá promociones con calendario y publicación controlada",
    description:
      "Marketing arma campañas con fecha de inicio y fin; operación valida, publica o pausa sin tocar cada televisor a mano.",
    image: signagePanelImage,
    imageAlt: "Panel Digital Signage con campañas y biblioteca de contenido",
    highlights: [
      "Nombre, vigencia y estado visibles para todo el equipo",
      "Validación antes de salir al aire — nada en borrador llega al HDMI",
      "Misma organización y permisos que el resto de la plataforma"
    ],
    Icon: CalendarRange
  },
  {
    id: "signage-channels",
    label: "Canales",
    title: "Un mensaje para el grupo correcto, no catorce TVs una por una",
    description:
      "Canales y targeting por grupo, etiqueta o lista de players. Ideal para sucursales, lobbies y zonas del edificio.",
    image: signagePanelImage,
    imageAlt: "Gestión de canales y playlists de cartelería digital",
    highlights: [
      "Biblioteca de video, imagen y piezas aprobadas por organización",
      "Playlists ordenadas y vigencia por contenido",
      "Entrega trazable: sabés si el player recibió el programa"
    ],
    Icon: Layers
  },
  {
    id: "signage-players",
    label: "Players",
    title: "Raspberry Pi y Samsung Tizen en la misma flota",
    description:
      "Cada pantalla es un dispositivo más: shadow, telemetría, OTA y diagnóstico. La TV puede ser cualquier marca con HDMI.",
    image: signagePanelImage,
    imageAlt: "Players de cartelería administrados desde WeKoda",
    highlights: [
      "Player Raspberry Pi 4B con caché local si cae internet",
      "SKU Samsung Tizen SSSP en la misma vertical CMS",
      "Prioridad de programa: emergencia e IoT pueden pisar la promo vigente"
    ],
    Icon: MonitorPlay
  },
  {
    id: "devices",
    label: "Dispositivos",
    title: "Inventario con capacidades autodescubiertas",
    description:
      "Cada equipo declara al arrancar qué sabe hacer. La plataforma muestra los controles que corresponden sin que nadie los configure a mano.",
    image: "/images/platform/dashboard-devices/devices.png",
    imageAlt: "Inventario de dispositivos con IP, MAC, estado y capacidades",
    highlights: [
      "Filtros por firmware, capability, adopción, presencia y mantenimiento",
      "Capacidades reales: captura IR, emisión IR, salida a relé, telemetría",
      "Revocación de credenciales y acceso directo a operaciones"
    ],
    Icon: Cpu
  },
  {
    id: "operations",
    label: "Operaciones",
    title: "Operá cada equipo sin ir hasta el sitio",
    description:
      "Salud en vivo, actualización de firmware remota e historial de resultados. Esto es lo que separa una demo de una plataforma en producción.",
    image: "/images/platform/operaciones/operaciones-1.png",
    imageAlt: "Pantalla de operaciones con estado de salud, acciones remotas e historial OTA",
    highlights: [
      "Firmware, RSSI, uptime, heap libre y última conexión MQTT en tiempo real",
      "OTA con catálogo de versiones por modelo e historial de éxito y fallos",
      "Localizar por parpadeo de LED, factory reset remoto y modo mantenimiento"
    ],
    Icon: Activity
  },
  {
    id: "spaces",
    label: "Espacios",
    title: "Control por ambiente, no por dispositivo",
    description:
      "Las luces, relés y dimmers se agrupan por espacio real. El operador enciende la oficina entera, no busca una MAC en una lista.",
    image: "/images/platform/espacios/espacios-1.png",
    imageAlt: "Control de iluminación por espacio con interruptores, dimmer y escenas",
    highlights: [
      "Escenas que combinan luces, relés y comandos infrarrojos en un toque",
      "Agendas que ejecutan esas escenas por horario, sin intervención",
      "Los cambios viajan por shadow bajo el contrato MQTT v2.1"
    ],
    Icon: Lightbulb
  },
  {
    id: "remote",
    label: "Mando virtual",
    title: "El control remoto, dentro del navegador",
    description:
      "Un mando completo en pantalla que emite infrarrojo a través del dispositivo de la sala. Se comparte por enlace y se guarda en la organización.",
    image: "/images/platform/mando-virtual/mando_virtual_3.png",
    imageAlt: "Mando virtual de DirecTV con todas sus funciones y teclado numérico",
    highlights: [
      "Catálogo con plantillas listas: Samsung, DirecTV, FLOW y más",
      "Macros de hasta cinco pasos para secuencias completas",
      "Exportá el paquete o compartí el mando por enlace"
    ],
    Icon: Gamepad2
  },
  {
    id: "governance",
    label: "Auditoría",
    title: "Trazabilidad pensada para cumplimiento",
    description:
      "Cada acción sensible queda registrada con actor, entidad y detalle. Y cada organización está aislada de las demás por diseño.",
    image: "/images/platform/auditoria/auditoria-1.png",
    imageAlt: "Historial de auditoría con acciones sobre organización y dispositivos",
    highlights: [
      "Registro de OTA disparadas, factory resets, cambios de rol e invitaciones",
      "Roles por organización: propietario, administrador y operador",
      "Aislamiento estricto multi-tenant, no un filtro agregado tarde"
    ],
    Icon: ScrollText
  }
];

export interface VerticalApp {
  id: string;
  name: string;
  hardware: string;
  description: string;
  available: boolean;
  featured?: boolean;
  href?: string;
  Icon: LucideIcon;
}

/** Verticales integradas hoy en la plataforma (pantalla Apps del panel). */
export const verticalApps: VerticalApp[] = [
  {
    id: "digital-signage",
    name: "Digital Signage",
    hardware: "rpi4b-signage-player-v1 · Samsung Tizen SSSP",
    description:
      "CMS de cartelería en tu LAN: campañas, canales, entrega y proof-of-play. Marketing edita; IT aprueba y publica.",
    available: true,
    featured: true,
    href: "/soluciones/digital-signage",
    Icon: Monitor
  },
  {
    id: "ir-repeater",
    name: "IR Repeater",
    hardware: "esp32-ir-repeater-v1 · ETH · 4TX",
    description:
      "Captura y emisión de señales infrarrojas sobre IP, con biblioteca de códigos y hasta cuatro zonas por equipo.",
    available: true,
    href: "/soluciones/ir-repeater",
    Icon: Repeat2
  },
  {
    id: "led-dimmer",
    name: "Dimmer LED PWM",
    hardware: "esp32c3-led-dimmer-v1",
    description:
      "Regulación de brillo por PWM contra módulo MOSFET optoacoplado, con el nivel expresado en el shadow del dispositivo.",
    available: true,
    Icon: Lightbulb
  },
  {
    id: "ssr-light",
    name: "SSR luz AC",
    hardware: "esp32c3 Super Mini",
    description:
      "Conmutación de iluminación de red mediante relé de estado sólido, sin partes móviles ni desgaste mecánico.",
    available: true,
    Icon: Zap
  },
  {
    id: "io-relay",
    name: "I/O + relé",
    hardware: "esp32-io-relay-node-v1 · esp8266",
    description:
      "Entrada digital y salida a relé para integrar maquinaria, portones o cualquier actuador de contacto seco.",
    available: true,
    Icon: ToggleLeft
  },
  {
    id: "aht10-sensor",
    name: "Sensor AHT10 Temp+Hum",
    hardware: "esp32c3-aht10-sensor-v1",
    description:
      "Telemetría continua de temperatura y humedad para climatización, depósitos y salas técnicas.",
    available: false,
    Icon: Thermometer
  },
  {
    id: "sensor-node",
    name: "Nodo sensores ESP32",
    hardware: "esp32",
    description:
      "Nodo genérico para sensores digitales, analógicos y por eventos, con reglas de automatización asociadas.",
    available: false,
    Icon: Radio
  },
];

export interface JourneyStep {
  id: string;
  step: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/** Recorrido Signage: del contenido a la evidencia en pantalla. */
export const signageJourneySteps: JourneyStep[] = [
  {
    id: "content",
    step: "01",
    title: "Subís el contenido",
    description:
      "Marketing sube videos e imágenes a la biblioteca con vigencia; IT define permisos y organización sin mezclar roles.",
    image: signagePanelImage,
    imageAlt: "Biblioteca de contenido Digital Signage en WeKoda"
  },
  {
    id: "channel",
    step: "02",
    title: "Definís canal y audiencia",
    description:
      "Marketing propone audiencia y mensaje; IT arma playlists y asignación a grupos o players para toda la red.",
    image: signagePanelImage,
    imageAlt: "Canales y playlists de cartelería digital"
  },
  {
    id: "campaign",
    step: "03",
    title: "Planificás la campaña",
    description:
      "Marketing define nombre y fechas de la campaña; IT valida, publica o pausa. El borrador no llega al HDMI sin operación.",
    image: signagePanelImage,
    imageAlt: "Planificador de campañas de cartelería"
  },
  {
    id: "proof",
    step: "04",
    title: "Verificás qué se vio",
    description:
      "IT monitorea entrega; Marketing recibe evidencia (proof-of-play). Respuestas compartidas sin ir sucursal por sucursal.",
    image: "/images/platform/operaciones/operaciones-1.png",
    imageAlt: "Operaciones de flota con telemetría y entrega de contenido"
  }
];

/** Recorrido de una señal infrarroja: del control físico a la automatización. */
export const irJourneySteps: JourneyStep[] = [
  {
    id: "capture",
    step: "01",
    title: "Capturás la señal",
    description:
      "Apuntás el control físico al receptor y las capturas aparecen en vivo por WebSocket. Sin recargar la página ni disparar una petición por botón.",
    image: "/images/platform/live-ir-repeater/live_ir_repeater.png",
    imageAlt: "Captura de señales infrarrojas en vivo por WebSocket"
  },
  {
    id: "library",
    step: "02",
    title: "La guardás o la elegís del catálogo",
    description:
      "Los códigos quedan en una biblioteca central que se importa y exporta como JSON. Y si tu equipo ya está en el catálogo, saltás este paso.",
    image: "/images/platform/codigos-ir/codigos-ir-catalogos-equipos-a-controlar.png",
    imageAlt: "Catálogo de equipos a controlar con plantillas de marcas conocidas"
  },
  {
    id: "remote",
    step: "03",
    title: "Armás el mando virtual",
    description:
      "La colección se convierte en un control remoto en pantalla. Cada botón emite a través del dispositivo que elijas como emisor.",
    image: "/images/platform/mando-virtual/mando_virtual_1.png",
    imageAlt: "Mando virtual de un televisor Samsung con todas sus funciones"
  },
  {
    id: "automate",
    step: "04",
    title: "Lo automatizás",
    description:
      "Sumás el comando a un espacio junto a las luces y programás una agenda. A partir de ahí el motor lo ejecuta solo, todos los días.",
    image: "/images/platform/agenda/agendas-1.png",
    imageAlt: "Agendas que ejecutan escenas y dispositivos por horario"
  }
];

export interface DeploymentPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  featured: boolean;
  features: string[];
  interestValue: string;
  Icon: LucideIcon;
}

/**
 * Modalidades comerciales Cloud (USD). Único lugar donde se definen importes.
 */
export const deploymentPlans: DeploymentPlan[] = [
  {
    id: "cloud-free",
    name: "Free",
    tagline: "Empezá en la nube sin costo",
    price: "USD 0",
    priceNote: "Modalidad Cloud · uso free",
    featured: false,
    interestValue: "Cloud Signage · plan Free (2 TVs)",
    features: [
      "Hasta 2 dispositivos TV Samsung línea profesional o Business",
      "CMS Signage: campañas, canales y publicación con roles Marketing / IT",
      "Ideal para probar el flujo completo antes de escalar",
      "Misma plataforma WeKoda; sin tarjeta para el tier free",
      "Upgrade a planes de pago cuando crezca la flota"
    ],
    Icon: Cloud
  },
  {
    id: "cloud-growth",
    name: "Growth",
    tagline: "Cartelería Cloud para sucursales en crecimiento",
    price: "USD 100 / mes",
    priceNote: "o USD 1.000 pago único por 2 años",
    featured: false,
    interestValue: "Cloud Signage · plan 10 TVs (USD 100/mes)",
    features: [
      "Hasta 10 TVs Samsung profesional o Business",
      "Facturación mensual o un solo cobro por 24 meses (USD)",
      "Proof-of-play, entrega y operación de flota incluidos",
      "Soporte para que IT acompañe al equipo de Marketing",
      "Escalable al plan de 100 dispositivos"
    ],
    Icon: MonitorPlay
  },
  {
    id: "cloud-scale",
    name: "Scale",
    tagline: "Red de pantallas con operación centralizada",
    price: "USD 300 / mes",
    priceNote: "o USD 3.000 pago único por 2 años",
    featured: false,
    interestValue: "Cloud Signage · plan 100 TVs (USD 300/mes)",
    features: [
      "Hasta 100 dispositivos TV Samsung profesional o Business",
      "Mensual en USD o pago único por dos años con descuento",
      "Multi-sucursal, campañas y prioridad de programa",
      "Pensado para retail, cadenas y operación regional",
      "Onboarding y acompañamiento según el alcance del contrato"
    ],
    Icon: Building2
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

/** Minicapturas bajo el hero: evidencia visual en lugar de métricas abstractas. */
export interface HeroPreviewCard {
  id: string;
  label: string;
  caption: string;
  image: string;
  imageAlt: string;
}

export const heroPreviewCards: HeroPreviewCard[] = [
  {
    id: "signage-campaigns",
    label: "Campañas",
    caption: "Calendario, validación y publicación",
    image: signagePanelImage,
    imageAlt: "Campañas de cartelería digital en el panel WeKoda"
  },
  {
    id: "signage-channels",
    label: "Canales",
    caption: "Playlists por grupo o sucursal",
    image: signagePanelImage,
    imageAlt: "Canales y playlists de Digital Signage"
  },
  {
    id: "signage-players",
    label: "Players",
    caption: "Pi HDMI y Tizen en la misma flota",
    image: signagePanelImage,
    imageAlt: "Players de cartelería administrados desde WeKoda"
  }
];

/** Preguntas reales de preventa. También alimentan el structured data de FAQ. */
export const faqItems: FaqItem[] = [
  {
    question: "¿Qué es WeKoda y en qué se diferencia de un CMS de carteles en la nube?",
    answer:
      "WeKoda es una plataforma IoT-over-IP desplegable on‑prem en tu LAN: cartelería, flota y automatización en un solo tenant. No es un SaaS global tipo Yodeck; el Gateway corre backend, MQTT y panel en tu red, con Zero Trust (el navegador nunca accede al broker)."
  },
  {
    question: "¿Cómo trabajan Marketing e IT con las campañas?",
    answer:
      "Marketing arma campañas, sube piezas y define calendario en el panel con permisos acotados. IT u operación validan, publican o pausan. Un borrador no llega al HDMI; hay trazabilidad de entrega y proof-of-play para responder si la promo se vio."
  },
  {
    question: "¿Qué players soporta la cartelería?",
    answer:
      "Raspberry Pi 4B con agente propio y pantallas Samsung con Tizen SSSP en la misma vertical CMS. La TV puede ser cualquier marca con HDMI; el programa lo resuelve el servidor con prioridades (emergencia, IoT, agenda, canal manual)."
  },
  {
    question: "¿Necesito internet permanente en cada sucursal?",
    answer:
      "No para operar el sitio. El Gateway y los players con caché local siguen en LAN si cae el enlace externo. Ideal para retail, plantas y hoteles que no quieren depender de un proveedor extranjero para cada cambio de cartel."
  },
  {
    question: "¿Sigue existiendo IR Repeater en la plataforma?",
    answer:
      "Sí. Es una vertical real para salas con equipos que solo entienden infrarrojo: captura, biblioteca, mando virtual y automatización junto a luces y agendas. En edificios mixtos convive con Signage bajo la misma consola."
  },
  {
    question: "¿Cómo se actualiza firmware de players y dispositivos edge?",
    answer:
      "OTA desde el panel, con catálogo por modelo de hardware e historial de intentos. Players Pi, Tizen y placas ESP comparten el mismo criterio de flota que el resto del edificio."
  },
  {
    question: "¿Cuánto cuesta la cartelería Cloud?",
    answer:
      "Plan Free: hasta 2 TVs Samsung profesional o Business (USD 0). Growth: hasta 10 TVs por USD 100/mes o USD 1.000 por dos años. Scale: hasta 100 TVs por USD 300/mes o USD 3.000 por dos años. Todos los precios en dólares estadounidenses."
  },
  {
    question: "¿Puedo instalar WeKoda on‑prem en lugar de Cloud?",
    answer:
      "Sí. Los planes Cloud son para arrancar rápido; para Gateway en tu LAN o integraciones enterprise contactanos por el formulario."
  }
];

/** Opciones del campo de interés en el formulario de contacto. */
export const contactInterests = [
  "Cartelería / CMS",
  "Cloud Signage · plan Free (2 TVs)",
  "Cloud Signage · plan 10 TVs (USD 100/mes)",
  "Cloud Signage · plan 100 TVs (USD 300/mes)",
  "Gateway WeKoda (on-premise)",
  "Integración a medida",
  "Solo quiero más información"
] as const;
