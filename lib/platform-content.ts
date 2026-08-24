import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Building2,
  Cpu,
  Gauge,
  Gamepad2,
  Lightbulb,
  Monitor,
  Radio,
  Repeat2,
  ScrollText,
  ShieldCheck,
  Thermometer,
  ToggleLeft,
  Zap
} from "lucide-react";

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
  Icon: LucideIcon;
}

/** Verticales integradas hoy en la plataforma (pantalla Apps del panel). */
export const verticalApps: VerticalApp[] = [
  {
    id: "ir-repeater",
    name: "IR Repeater",
    hardware: "esp32-ir-repeater-v1 · ETH · 4TX",
    description:
      "Captura y emisión de señales infrarrojas sobre IP, con biblioteca de códigos y hasta cuatro zonas por equipo.",
    available: true,
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
  {
    id: "digital-signage",
    name: "Digital Signage",
    hardware: "rpi4b-signage-player-v1",
    description:
      "Reproductor de cartelería digital sobre Raspberry Pi, administrado desde la misma consola que el resto de la flota.",
    available: false,
    Icon: Monitor
  }
];

export interface JourneyStep {
  id: string;
  step: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

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
 * Modalidades comerciales. Único lugar donde se definen importes: reemplazar
 * `price` y `priceNote` cuando los valores estén cerrados.
 */
export const deploymentPlans: DeploymentPlan[] = [
  {
    id: "kit",
    name: "Kit IR Repeater",
    tagline: "Empezá con hardware listo para enchufar",
    price: "Consultar",
    priceNote: "precio por kit según cantidad",
    featured: false,
    interestValue: "Kit IR Repeater",
    features: [
      "Dispositivo IR Repeater con Ethernet cableado",
      "Emisor y receptor infrarrojo, y fuente de alimentación",
      "Alta en la plataforma y adopción asistida",
      "Mando virtual precargado desde el catálogo de equipos",
      "Acompañamiento en la puesta en marcha"
    ],
    Icon: Repeat2
  },
  {
    id: "gateway",
    name: "Gateway WeKoda",
    tagline: "La plataforma entera dentro de tu red",
    price: "Consultar",
    priceNote: "por gateway · incluye un año de soporte",
    featured: true,
    interestValue: "Gateway WeKoda (on-premise)",
    features: [
      "Appliance con backend, broker MQTT, base de datos y panel",
      "Opera en LAN, sin depender de conexión a internet",
      "Adopción y OTA de toda la flota del sitio",
      "Actualizaciones publicadas y procedimiento de respaldo",
      "Ideal para plantas, hoteles y edificios corporativos"
    ],
    Icon: Building2
  },
  {
    id: "license",
    name: "Licencia de instalación",
    tagline: "Instalá WeKoda en tu propia infraestructura",
    price: "Consultar",
    priceNote: "licencia anual · según el tamaño de la flota",
    featured: false,
    interestValue: "Licencia de instalación",
    features: [
      "Despliegue en tu nube privada o datacenter",
      "Multi-tenant completo con roles y auditoría",
      "Acceso al catálogo de firmware por modelo de hardware",
      "Acompañamiento de integración con tus sistemas",
      "Nivel de servicio acordado según el caso"
    ],
    Icon: ShieldCheck
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

/** Preguntas reales de preventa. También alimentan el structured data de FAQ. */
export const faqItems: FaqItem[] = [
  {
    question: "¿Qué es exactamente WeKoda IoT?",
    answer:
      "Es una plataforma de gestión de dispositivos conectados. Centraliza el inventario de la flota, la ejecución de comandos, la telemetría, la actualización remota de firmware y la automatización, todo bajo un modelo de seguridad Zero Trust donde el navegador nunca toca el broker MQTT."
  },
  {
    question: "¿Qué dispositivos puedo conectar?",
    answer:
      "Hoy operamos placas ESP32, ESP32-C3, ESP8266 y equipos Linux sobre Raspberry Pi. Cada modelo se registra en un catálogo de hardware con su firmware correspondiente. Si tu equipo habla MQTT y respeta el contrato de la plataforma, se integra sin desarrollo adicional."
  },
  {
    question: "¿Puedo controlar equipos que solo funcionan con control remoto infrarrojo?",
    answer:
      "Sí. La vertical IR Repeater captura las señales de cualquier control remoto y las reemite por IP desde el dispositivo instalado en la sala. Televisores, aires acondicionados, decodificadores y proyectores quedan disponibles como mandos virtuales en el navegador y se pueden programar por agenda."
  },
  {
    question: "¿Necesito conexión permanente a internet?",
    answer:
      "No. El Gateway WeKoda corre el backend, el broker MQTT, la base de datos y el panel dentro de tu propia red. La instalación sigue funcionando en LAN aunque se caiga el enlace a internet, algo indispensable en plantas industriales, hoteles y edificios corporativos."
  },
  {
    question: "¿Cómo se actualiza el firmware de una flota grande?",
    answer:
      "Con actualización OTA desde el panel. Cada modelo de hardware tiene su catálogo de versiones y la plataforma registra el historial de cada intento, con tasa de éxito, fallos y duración promedio. No hace falta ir hasta el sitio ni reflashear placa por placa."
  },
  {
    question: "¿Sirve para administrar varias empresas o sucursales?",
    answer:
      "Sí, el aislamiento multi-tenant es parte del modelo de datos, no un filtro agregado después. Cada organización tiene sus dispositivos, sus miembros y sus roles de propietario, administrador y operador, y toda acción sensible queda registrada en la auditoría."
  },
  {
    question: "¿Puedo instalar WeKoda en mi propia infraestructura?",
    answer:
      "Sí, mediante la licencia de instalación. Desplegás la plataforma completa en tu nube privada o datacenter, con acompañamiento de integración y acceso al catálogo de firmware por modelo de hardware."
  }
];

/** Opciones del campo de interés en el formulario de contacto. */
export const contactInterests = [
  "Kit IR Repeater",
  "Gateway WeKoda (on-premise)",
  "Licencia de instalación",
  "Integración a medida",
  "Solo quiero más información"
] as const;
