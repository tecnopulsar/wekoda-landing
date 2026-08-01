---
title: "Dimmer LED C3: PWM de potencia gobernado por shadow"
date: "2026-07-31"
summary: "Un SKU ESP32-C3 Super Mini con LEDC a 1 kHz, MOSFET optoacoplado y brillo 0–100 % vía desired.light — sin mezclarlo con el relé on/off."
tags: ["esp32-c3", "light-dimmer", "pwm", "mqtt", "firmware", "hardware"]
canonical: "docs/verticals/LIGHT-DIMMER-NODE.md"
audience: "developers"
---

# Dimmer LED C3: PWM de potencia gobernado por shadow

Attenuating a power LED is not “a relay with more steps”. Duty cycle, optical
isolation, and WiFi sharing the same silicon change the design. That is why the
new SKU **`esp32c3-led-dimmer-v1`** is its own vertical (`light_dimmer`), not an
extension of `io_relay_node`.

| | **Relé I/O** | **Dimmer LED C3** |
|---|---|---|
| Salida | Discreta on/off | Continua PWM 0–100 % |
| Chip | ESP32 / ESP8266 según SKU | **ESP32-C3 Super Mini** |
| Capability | `relay.output` | `light.dimmer` |
| UI admin | Toggle | Slider + fade |
| Potencia | Bobina / contacto | MOSFET **LR7843** (módulo MW-532, opto EL817) |

## El micro no lleva la carga

El C3 entrega **PWM + GND** a la entrada de control del módulo. La fuente y la
tira LED viven en el lado de potencia; el opto aísla. Puentear GND de señal con
la alimentación de la carga es el camino corto al humo.

```text
ESP32-C3 Super Mini          MW-532 (EL817 + LR7843)         Carga
─────────────────            ───────────────────────         ─────
GPIO4 (LEDC)  ──PWM──►  opto ──► gate MOSFET
GND señal     ────────►  ref. control
                         bornes alta potencia  ◄── fuente + LED
```

## Por qué LEDC a 1 kHz (y no más)

PWM por software parpadea cuando WiFi/MQTT ocupan la CPU. Usamos el periférico
**LEDC** (hardware), frecuencia fija **1 kHz**, resolución **13 bits** (fallback
12). El EL817 tiene rise/fall en el orden de microsegundos: por encima de 1 kHz
la curva de atenuación deja de ser lineal.

En 0 % y 100 % el driver corta el PWM y fija nivel DC — sin ripple residual en
los extremos.

## Contrato: `light`, no `io`

Mismo MQTT Contract v2.1, objeto de dominio distinto:

```text
desired.light.dimmer1:
    enabled             # false → duty 0 (salida segura)
    brightnessPercent   # 0..100
    fadeMs              # opcional; 0 = salto

reported.light.dimmer1:
    … + resolutionBits, pwmFreqHz

event:
    type = light_config_applied   # tras aplicar desired válido

tele.light:
    dimmer1BrightnessPercent
```

No hay topics `ir/*` ni `io.relayN` en este perfil. En boot, capabilities
declaran `light_dimmer: true` y el resto de actuadores en falso — un
`hardwareModel`, un vertical.

## Un perfil Kconfig, una app

En **firmware-v2** el overlay `led-dimmer-c3` compila `light_dimmer_actor` +
driver LEDC; no entra IR, sensor ni relé. SoftAP de onboarding:
`DIM-Setup-<MAC12>`.

En admin, la flota con capability `light.dimmer` cae en
`/apps/light-dimmer-node`: dashboard, consola con slider y lectura del
`reported` en vivo. La nube escribe `desired`; el dispositivo converge y
reporta — el patrón shadow de siempre, con brillo continuo.

## Para profundizar

- Vertical dimmer: [`docs/verticals/LIGHT-DIMMER-NODE.md`](../../docs/verticals/LIGHT-DIMMER-NODE.md)
- Contrato MQTT §17.10: [`docs/MQTT-CONTRACT-v2.md`](../../docs/MQTT-CONTRACT-v2.md)
- Contraste con relé: [`docs/verticals/IO-RELAY-NODE.md`](../../docs/verticals/IO-RELAY-NODE.md)
- Perfiles de flash: [`firmware-v2/FLASH-PROFILES.md`](../../firmware-v2/FLASH-PROFILES.md)
