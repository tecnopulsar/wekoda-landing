---
title: "Mandos virtuales IR: la biblioteca que emite desde el navegador"
date: "2026-07-22"
summary: "Capturá un control remoto una vez, armá un layout en el panel y emití por MQTT sin tocar el broker desde el admin."
tags: ["ir", "esp32", "mqtt", "admin", "automation"]
canonical: "docs/verticals/IR-REPEATER.md"
audience: "developers"
---

# Mandos virtuales IR: la biblioteca que emite desde el navegador

Un **mando virtual** no es un dispositivo nuevo: es una **colección de códigos IR**
organizada como si fuera un control remoto físico — botones, layout, macros — que el
operador usa desde el panel para **emitir** señales hacia un equipo real (TV, decodificador,
aire acondicionado) a través de un **dispositivo emisor** adoptado en la plataforma.

La magia está en separar tres capas:

```text
[ Mando virtual ]  →  códigos + layout + macros (JSON en admin/BD)
        ↓
[ Backend REST ]   →  valida sesión, emisor, pairing, transactionId
        ↓
[ Dispositivo TX ] →  MQTT cmd → RMT → LED IR → equipo objetivo
```

El admin **nunca** publica en MQTT. Zero Trust intacto.

## De la captura al botón

El flujo típico para armar un mando:

```text
1. Pairing receptor ↔ emisor (capture-box + emit-box, o repeater-box)
2. Sesión de captura en vivo → apuntar control físico al RX
3. Backend persiste raw[] + protocolo en biblioteca de códigos
4. Operador agrupa códigos en una "colección" con nombre y botones
5. Layout visual: posición de teclas, colores, etiquetas
6. (Opcional) Macros: una tecla dispara secuencia de varios códigos
7. Guardar como mando virtual → emitir desde /apps/ir-repeater/virtual-remote
```

Cada emisión lleva un **`transactionId`**: el backend puede correlacionar comando,
confirmación y errores sin adivinar en el broker.

## Qué contiene un paquete exportable

El formato **`iot-virtual-remote-bundle`** agrupa todo lo necesario para portar un mando
entre entornos:

```text
bundle:
    collection:     # códigos IR (nombre, payload raw, protocol, repeat)
    buttonLayout:   # posición y aspecto de teclas en la UI
    macros:         # secuencias multi-paso (ej. "Encender TV + HDMI2")
    metadata:       # slug, versión, notas de captura
```

También existe el formato más simple **`ir-repeater-code-collection`**: solo la lista de
códigos, sin layout ni macros.

## Catálogo de plantillas

No hace falta capturar desde cero para empezar. El repo incluye plantillas oficiales:

| Plantilla | Uso |
|-----------|-----|
| Samsung TV | Navegación, volumen, canales, colores |
| DirecTV LH02-A-303 | Guía, teclado numérico, volumen |
| Flow — teclas rápidas | Demo con timings de ejemplo (reemplazar por capturas reales) |

En admin: **Mando virtual → Catálogo** carga el JSON desde `/ir-catalogs/*.json`. Para
agregar una plantilla propia al proyecto, el flujo es exportar el paquete probado,
versionarlo en `catalogs/ir-repeater/virtual-remotes/` y registrarlo en el índice del
admin.

## El campo `repeat` importa

En payloads `raw`, **`repeat`** indica cuántas veces el firmware repite el burst completo
en **un solo** comando MQTT:

```text
emit(code, repeat = 1):   # recomendado — un pulso limpio
emit(code, repeat = 2):   # puede registrar doble pulsación (ej. canal "11" al pulsar "1")
```

No es un "mantener pulsado": es re-emisión del frame entero. Ajustarlo mal es la causa
clásica de "apreté 1 y saltó al canal 11".

## Macros: automatizar sin reglas en el dispositivo

Una macro encadena varios códigos con delays configurables:

```text
macro "Ver Netflix":
    emit(POWER_ON,   delay_after = 3000 ms)
    emit(INPUT_HDMI2, delay_after = 500 ms)
    emit(OK,         delay_after = 0)
```

Todo se ejecuta desde el backend hacia el emisor; el ESP32 no guarda lógica de negocio.
Si mañana cambiás el decodificador, editás la macro en el panel — no reflasheás firmware.

## Persistencia: navegador vs. Espacios

| Dónde | Cuándo usarlo |
|-------|---------------|
| **localStorage / accesos guardados** | Prueba rápida, operador individual |
| **Guardar en Espacios** | Mandos compartidos por organización, persistidos en BD |
| **Catálogo del repo** | Plantillas oficiales, reproducibles en cualquier despliegue |

Los mandos en Espacios sobreviven cambio de navegador y se pueden vincular a la
automatización del panel de control.

## Repeater over IP vs. mando local

No confundir **mando virtual** (emisión remota vía backend) con **repeater local**
(mismo chip RX→TX sin pasar por la nube):

```text
Repeater local (operatingMode: repeater):
    IR RX ──► mismo ESP32 ──► IR TX     # autónomo, sin backend

Repeater over IP (pairing):
    IR RX ──► backend ──► otro device ──► IR TX   # habitaciones distintas
```

El mando virtual siempre usa la ruta **over IP**: necesita emisor adoptado, backend activo
y permisos de operador.

## Widget en el panel de control

Los mandos guardados pueden aparecer como **widget IR** en `/control`: el operador de sala
ve solo los botones que necesita, sin entrar al gestor completo de códigos. Misma emisión
por debajo — REST + MQTT con `transactionId`.

## Para profundizar

- Vertical IR Repeater: [`docs/verticals/IR-REPEATER.md`](../../docs/verticals/IR-REPEATER.md)
- Catálogo de plantillas: [`catalogs/ir-repeater/virtual-remotes/README.md`](../../catalogs/ir-repeater/virtual-remotes/README.md)
- Agregar un mando al catálogo: [`catalogs/ir-repeater/virtual-remotes/AGREGAR-MANDO-VIRTUAL.md`](../../catalogs/ir-repeater/virtual-remotes/AGREGAR-MANDO-VIRTUAL.md)
- Spec firmware IR (RMT, tolerancias): [`firmware-v2/FIRMWARE-IR-DOC.md`](../../firmware-v2/FIRMWARE-IR-DOC.md)
- Topics IR en contrato MQTT §17: [`docs/MQTT-CONTRACT-v2.md`](../../docs/MQTT-CONTRACT-v2.md)
