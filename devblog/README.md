# DevBlog — WEKODA IoT

Contenido de **divulgación técnica** para la landing page y para la comunidad de
desarrolladores. Su doble propósito:

1. **Marketing para devs** — mostrar cómo está construida la plataforma y por qué
   las decisiones de arquitectura importan, para atraer integradores y talento.
2. **Documentación de apoyo** — cada post explica un pilar real del monorepo
   (arquitectura, contratos, firmware, infraestructura) de forma accesible.

> **Regla de estilo.** Los posts **no** incluyen código copiable del repo: usan
> **pseudocódigo** y diagramas. La fuente de verdad sigue siendo `docs/` y el
> código. Cada post enlaza al documento canónico correspondiente.

---

## Índice de posts

| Fecha | Post | Pilar | Doc canónico |
|-------|------|-------|--------------|
| 2026-07-06 | [¿Por qué otra plataforma IoT?](./posts/2026-07-06-por-que-otra-plataforma-iot.md) | Producto / visión | `docs/PLATFORM-VENDIBLE-2026.md` |
| 2026-07-06 | [Zero Trust: el panel nunca habla MQTT](./posts/2026-07-06-zero-trust-el-panel-nunca-habla-mqtt.md) | Seguridad / arquitectura | `docs/MQTT-CONTRACT-v2.md` |
| 2026-07-06 | [Device Shadow: `desired` vs `reported`](./posts/2026-07-06-device-shadow-desired-vs-reported.md) | Modelo de estado | `docs/MQTT-CONTRACT-v2.md` §5 |
| 2026-07-06 | [IR sobre Ethernet: RMT y multi-emisor](./posts/2026-07-06-ir-sobre-ethernet-rmt-y-multi-emisor.md) | Firmware / hardware | `docs/hardware/ESP32-ETH-IR-REPEATER-v1.md` |
| 2026-07-06 | [La demo entera en una Raspberry Pi 5](./posts/2026-07-06-edge-appliance-una-raspberry.md) | Infraestructura / edge | `docs/operations/EDGE-APPLIANCE.md` |
| 2026-07-22 | [Dos SKUs de relé WiFi, un solo runtime](./posts/2026-07-22-dos-skus-un-runtime-relay-wifi.md) | Firmware / hardware | `docs/verticals/ESP8266-IO-RELAY-NODE.md` |
| 2026-07-22 | [Mandos virtuales IR: la biblioteca que emite desde el navegador](./posts/2026-07-22-mandos-virtuales-ir-en-el-panel.md) | Admin / vertical IR | `docs/verticals/IR-REPEATER.md` |

---

## Cómo se conecta con la landing

Estos `.md` son la **fuente editorial**. La landing (Next.js en `admin/`) puede
renderizarlos como sección `/blog` o `/devblog`. El flujo pensado:

```text
devblog/posts/*.md   →  parseo markdown + frontmatter  →  ruta /devblog en la landing
        │
        └── cada post: título, resumen, tags, fecha, enlace a doc canónico
```

## Cómo escribir un post nuevo

1. Crear `posts/AAAA-MM-DD-slug.md` con el frontmatter de abajo.
2. Explicar **una** idea con pseudocódigo o diagrama; sin volcar código del repo.
3. Cerrar con “Para profundizar” → enlace al doc canónico en `docs/`.
4. Añadir la fila al índice de este README.

```yaml
---
title: "Título atractivo y claro"
date: "AAAA-MM-DD"
summary: "Una frase que enganche a un desarrollador."
tags: ["iot", "mqtt", "esp32"]
canonical: "docs/RUTA-AL-DOC.md"
audience: "developers"
---
```
