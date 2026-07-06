---
title: "¿Por qué otra plataforma IoT?"
date: "2026-07-06"
summary: "La mayoría de los proyectos IoT mueren en el 'hola mundo'. Nosotros empezamos por el contrato."
tags: ["iot", "arquitectura", "producto"]
canonical: "docs/PLATFORM-VENDIBLE-2026.md"
audience: "developers"
---

# ¿Por qué otra plataforma IoT?

Cualquiera enciende un LED por WiFi en una tarde. El problema aparece después:
100 dispositivos, varias organizaciones, actualizaciones remotas, permisos, y un
soporte que necesita saber *qué está pasando* sin adivinar.

WEKODA IoT nace de una convicción simple: **una plataforma IoT es, sobre todo, un
contrato**. Si el mensaje entre dispositivo, broker y nube está bien definido,
todo lo demás (UI, reglas, escalado) se vuelve tratable.

## El dispositivo es tonto a propósito

El firmware no toma decisiones de negocio. Ejecuta comandos y reporta hechos.

```text
device:
    on message(cmd):
        result = execute(cmd)          # encender relé, emitir IR, ...
        publish(event, { type: "cmd_result", req_id, status })
    every T:
        publish(telemetry, metrics())  # heap, uptime, red
```

Toda la lógica —cuándo, por qué, para quién— vive en el backend. Así un bug de
reglas se corrige en la nube, no re-flasheando 100 placas.

## Multi-tenant desde el día uno

Cada entidad relevante pertenece a una organización. No es un `if` agregado
tarde: es parte del modelo.

```text
authorize(request):
    session   = resolve_session(request)
    org       = effective_org(session)
    entity    = load(request.id)
    assert entity.organizationId == org
    assert session.role can request.action
```

## Lo que ofrecemos hoy (no en el roadmap)

- Login humano + RBAC por capacidades y auditoría.
- Adopción/revocación de dispositivos por organización.
- OTA con catálogo de firmware por modelo de hardware.
- Verticales reales: IR Repeater, nodos de sensores, I/O + relé.

## Para profundizar

- Producto, tenant y RBAC: [`docs/PLATFORM-VENDIBLE-2026.md`](../../docs/PLATFORM-VENDIBLE-2026.md)
- Cimientos y jerarquía normativa: [`docs/PLATFORM-FOUNDATIONS.md`](../../docs/PLATFORM-FOUNDATIONS.md)
