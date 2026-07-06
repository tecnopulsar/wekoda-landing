---
title: "Device Shadow: desired vs reported"
date: "2026-07-06"
summary: "Cómo mantenemos sincronizados dispositivos que se apagan, pierden red y vuelven horas después."
tags: ["mqtt", "shadow", "estado", "esp32"]
canonical: "docs/MQTT-CONTRACT-v2.md"
audience: "developers"
---

# Device Shadow: `desired` vs `reported`

Un dispositivo IoT vive offline la mitad del tiempo: se apaga, se le cae el WiFi,
lo desenchufan. Si tu modelo asume conexión permanente, se rompe el primer día.

La respuesta clásica (y la nuestra) es el **shadow**: dos vistas del estado.

- **`reported`** — lo que el dispositivo dice que *es* (device → nube).
- **`desired`** — lo que la nube quiere que *sea* (nube → device).

El sistema converge cuando `reported == desired`.

## Dos topics, dos direcciones

```text
device → "devices/<id>/shadow/reported"   { reported: { ir: { enabled: true } } }
cloud  → "devices/<id>/shadow/desired"    { desired:  { ir: { enabled: false } } }
```

Se publican con **retain**: cuando el dispositivo vuelve, recibe el último
`desired` sin que nadie tenga que reenviarlo.

## El lazo de reconciliación

```text
device on connect:
    publish reported (estado actual + capabilities)   # foto al arrancar
    subscribe desired

device on desired(d):
    apply(d)                     # p. ej. deshabilitar IR
    publish reported(new_state)  # confirmo el nuevo estado

cloud:
    if reported != desired: el objetivo sigue pendiente
    if reported == desired: convergió
```

## El detalle que importa: capabilities en el arranque

En el primer `reported` tras bootear, el dispositivo adjunta sus
**capabilities** (qué sabe hacer) en la raíz del mensaje. El backend las usa para
saber si mostrar controles de IR, sensores o relé — sin adivinar por el nombre.

```text
reported_boot = {
    reported: { ...estado },
    capabilities: { ir_capture, ir_emit, ota, telemetry, ... },
    capabilitiesSource: "boot"
}
```

## Para profundizar

- Modelo shadow y payloads: [`docs/MQTT-CONTRACT-v2.md`](../../docs/MQTT-CONTRACT-v2.md) (§5)
- Capabilities: [`docs/device-capability-spec.md`](../../docs/device-capability-spec.md)
