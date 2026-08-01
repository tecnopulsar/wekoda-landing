---
title: "Infraestructura: prod Docker, Tailscale y menos superficie expuesta"
date: "2026-07-31"
summary: "Un compose de producción con secretos locales, API interna fuera de la LAN, OTA por DNS de sitio y acceso remoto sin abrir el broker a internet."
tags: ["docker", "infraestructura", "produccion", "tailscale", "seguridad", "ota"]
canonical: "README-DOCKER.md"
audience: "developers"
---

# Infraestructura: prod Docker, Tailscale y menos superficie expuesta

Una plataforma multi-vertical no se vende solo por el firmware: hay que poder
**desplegarla en el sitio del cliente**, actualizar dispositivos por OTA y
operar el panel sin exponer Mosquitto al mundo. Estas son las piezas que
endurecieron ese camino.

## Dos mundos, un repo

```text
desarrollo:
    docker-compose.yml          → postgres + backend + mosquitto (+ Prisma Studio)
    admin en el host            → npm run dev (hot reload)

producción:
    docker-compose.prod.yml     → postgres + backend + mosquitto + admin
    --env-file .env.prod.local  → obligatorio en cada comando
    perfil opcional remote-access → sidecar Tailscale
```

Misma idea de servicios; distinto empaquetado. En prod el panel también es
imagen Docker. En dev el frontend vive fuera del compose para iterar rápido.

## Secretos y cookies en LAN

`.env.prod.local` no se versiona. Ahí viven claves de API, MQTT y el flag que
más duele olvidar en demos on-prem:

```text
SESSION_COOKIE_SECURE = 0   # LAN HTTP sin TLS
SESSION_COOKIE_SECURE = 1   # cuando hay HTTPS de verdad
```

Sin eso, el login “funciona en localhost y falla en la IP del servidor” — clásico
de cookie `Secure` sobre `http://`.

## Superficie interna fuera de la LAN

Auth/ACL de Mosquitto (`/api/internal/*`) y métricas no deben ser un buffet
abierto en `:3000`. En prod viven en un listener interno (**3100**) que **no**
se publica al host. Desde la red del sitio, esas rutas responden 404.

```text
:3000  → API de producto (proxy del admin, dispositivos vía contratos)
:3100  → internal + metrics   (solo red Docker / loopback)
:5432  → Postgres bound a 127.0.0.1
:1883  → MQTT en LAN del sitio (ACL vía backend; no Tailscale-expuesto a internet)
```

Postgres en loopback: backups con `docker exec … pg_dump`, no con un puerto
abierto “por comodidad”.

## OTA y DNS de sitio, no `localhost`

Los dispositivos descargan firmware desde URLs que **ellos** deben resolver.
`FIRMWARE_BASE_URL` apunta a un hostname LAN del sitio (`api.<cliente>.lan`),
no a `localhost` ni a una IP que cambia. El binario vive en volumen dedicado
(`FIRMWARE_DIR=/data/firmware`); namespaces por `hardwareModel` + versión
embebida — cada SKU (IR, ETH-IR, relé, dimmer C3…) con su carpeta.

```text
build OTA:
    version.txt  →  build perfil SKU  →  publicar bajo
    <hardwareModel>/<version>/firmware.bin
```

## Acceso remoto sin abrir el broker

El core (API, broker, BD) queda **en el sitio**. Operadores entran al panel por
**Tailscale** (perfil `remote-access` en Linux, o cliente en el host Windows):
mismo Zero Trust de siempre — el navegador habla REST/WebSocket al admin, nunca
MQTT directo.

```text
operador ──Tailnet──► admin:3001 ──proxy──► backend
dispositivos LAN ──────────────► mqtt:1883 + api OTA
internet público ──✗── broker / postgres / internal API
```

## Edge y prod: misma filosofía

En una Raspberry Pi 5 el compose edge empaqueta demo completa sin cloud. En un
servidor on-prem, prod añade endurecimiento (superficie interna, secretos,
remote-access). En ambos casos: **un archivo de entorno, healthchecks, sin
Kubernetes** para el día a día del integrador.

## Para profundizar

- Docker dev / prod: [`README-DOCKER.md`](../../README-DOCKER.md)
- Acceso remoto: [`docs/operations/REMOTE-ACCESS-TAILSCALE.md`](../../docs/operations/REMOTE-ACCESS-TAILSCALE.md)
- Edge Appliance: [`docs/operations/EDGE-APPLIANCE.md`](../../docs/operations/EDGE-APPLIANCE.md)
- Endpoints DNS de sitio: [`docs/operations/SITE-DNS-ENDPOINTS.md`](../../docs/operations/SITE-DNS-ENDPOINTS.md)
