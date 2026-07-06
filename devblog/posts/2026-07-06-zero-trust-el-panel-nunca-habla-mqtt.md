---
title: "Zero Trust: el panel nunca habla MQTT"
date: "2026-07-06"
summary: "El dashboard no toca el broker. Nunca. Y esa restricción nos hizo la vida más fácil."
tags: ["seguridad", "mqtt", "arquitectura", "zero-trust"]
canonical: "docs/MQTT-CONTRACT-v2.md"
audience: "developers"
---

# Zero Trust: el panel nunca habla MQTT

Un atajo tentador en IoT: conectar el frontend directo al broker MQTT para
“tiempo real fácil”. Es una puerta trasera con luces de neón. Credenciales del
broker en el navegador = cualquiera con DevTools publica en `devices/+/cmd`.

Nuestra regla es rotunda: **el admin solo habla REST + WebSocket con el backend.
El backend es la única autoridad que toca el broker.**

## El flujo de un comando

```text
admin  ──HTTP POST /api/devices/:id/command──►  backend
backend:
    assert user_can(session, "command", device)   # RBAC + tenant
    req_id = uuid()
    publish("devices/<id>/cmd", { cmd, req_id, params })
    await event where type == "cmd_result" and req_id matches   # timeout 30s

device ──"devices/<id>/event" { type: cmd_result, req_id, status }──► backend
backend ──WebSocket──► admin   # actualización en vivo
```

El navegador jamás ve una credencial de dispositivo ni la topología MQTT.

## El broker pregunta, el backend responde

Mosquitto no tiene usuarios hardcodeados. Delega auth y ACL al backend por HTTP.

```text
mosquitto on CONNECT(user, pass):
    ask backend: POST /internal/auth  → allow?
mosquitto on PUBLISH/SUBSCRIBE(user, topic):
    ask backend: POST /internal/acl   → { read?, write? } para ese topic
```

Un dispositivo solo puede publicar/suscribirse en **sus** topics
(`devices/<suPropioId>/...`). El backend lo garantiza en la ACL.

## Por qué esta restricción nos ayudó

- **Superficie de ataque mínima:** una sola puerta (el backend) que auditar.
- **Un solo lugar para las reglas:** tenant, RBAC y rate-limit viven juntos.
- **Refactors seguros:** cambiar el broker no afecta al frontend.

## Para profundizar

- Contrato MQTT v2.1 (topics, payloads, ACL): [`docs/MQTT-CONTRACT-v2.md`](../../docs/MQTT-CONTRACT-v2.md)
- Principios curados: [`ToAnotherIA/CURATED-RULES.md`](../../ToAnotherIA/CURATED-RULES.md)
