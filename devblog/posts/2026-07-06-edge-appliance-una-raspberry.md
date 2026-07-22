---
title: "La demo entera en una Raspberry Pi 5"
date: "2026-07-06"
summary: "Backend, broker, base de datos y dashboard en un aparato transportable que funciona sin internet."
tags: ["edge", "docker", "raspberry-pi", "infraestructura"]
canonical: "docs/EDGE-APPLIANCE.md"
audience: "developers"
---

# La demo entera en una Raspberry Pi 5

Enseñar una plataforma IoT en la nube es fácil… hasta que el WiFi del cliente
falla en plena reunión. Por eso empaquetamos toda la plataforma en un **Edge
Appliance**: una Raspberry Pi 5 que corre backend, broker MQTT, base de datos y
dashboard **en LAN, sin depender de internet**.

## Un perfil, cuatro servicios

```text
docker-compose.edge.yml  +  .env.edge   →   docker compose up -d

services:
    postgres    # estado persistente
    backend     # API REST + gateway MQTT + WebSocket
    mosquitto   # broker con auth/ACL vía backend
    admin       # dashboard Next.js
```

Todo en la misma red del appliance. Los dispositivos apuntan a la IP de la
Raspberry, no a un dominio remoto.

## Dónde queda cada cosa

```text
Admin dashboard →  http://<raspberry-ip>:3000
Backend API     →  http://<raspberry-ip>:8080/health
Broker MQTT     →  mqtt://<raspberry-ip>:1883
```

## Config por entorno, no por rama

Un solo archivo de entorno define puertos, credenciales y tuning. Clonás,
copiás `.env.edge` a tu versión local con secretos, y levantás.

```text
prepare:
    copy .env.edge → .env.edge.local
    set secrets (POSTGRES_PASSWORD, MQTT_PASS, ...)
run:
    docker compose -f docker-compose.edge.yml --env-file .env.edge.local up -d --build
```

## ARM64 sin dramas

Elegimos imágenes multi-arquitectura (`node`, `postgres`, el broker con go-auth)
para que el mismo compose corra en una Raspberry sin recompilar nada exótico. Sin
Kubernetes, sin agentes de auto-update: una demo debe **arrancar y funcionar**.

## Rutina de actualización

```text
update:
    git pull
    docker compose -f docker-compose.edge.yml --env-file .env.edge.local up -d --build
    check logs + healthchecks
```

## Para profundizar

- Runbook completo del appliance: [`docs/operations/EDGE-APPLIANCE.md`](../../docs/operations/EDGE-APPLIANCE.md)
- Docker en desarrollo: [`README-DOCKER.md`](../../README-DOCKER.md)
