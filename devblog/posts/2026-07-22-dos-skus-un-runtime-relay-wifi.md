---
title: "Dos SKUs de relé WiFi, un solo runtime"
date: "2026-07-22"
summary: "ESP-01S con un relé en GPIO0 y placa LC con cuatro relés por UART comparten MQTT y admin, pero no el mismo binario."
tags: ["esp8266", "io-relay", "mqtt", "firmware", "hardware"]
canonical: "docs/verticals/ESP8266-IO-RELAY-NODE.md"
audience: "developers"
---

# Dos SKUs de relé WiFi, un solo runtime

En la vertical **I/O Relay Node** tenemos dos productos distintos que comparten la misma
idea de plataforma — WiFi, adopción, shadow MQTT, OTA — pero **no** el mismo hardware ni
el mismo firmware compilado.

| | **1 canal GPIO** | **4 canales UART** |
|---|---|---|
| `hardwareModel` | `esp8266-io-relay-node-v1` | `lc-esp-relay-4ch-v1` |
| Placa típica | ESP-01S + módulo relé | LC Technology 4-relay + ESP-01 |
| Cómo acciona | `digitalWrite` en **GPIO0** | Tramas serial al MCU de la placa |
| Entorno PlatformIO | `esp8266_io_relay_r2` | `esp8266_lc_esp_relay_4ch` |
| Namespace OTA | `esp8266-io-relay-node-v1/X.Y.Z/` | `lc-esp-relay-4ch-v1/X.Y.Z/` |

Mismo repo (`firmware-esp8266/io-relay-node/`), dos `-e` distintos. Cambiar de placa
**no** es cambiar una línea de PowerShell: hay que **recompilar** con el entorno correcto.

## SKU 1: un relé, un GPIO

El caso más simple: el ESP8266 mueve directamente la bobina del relé.

```text
desired.io.relay1.coilOn = true
    → firmware lee shadow/desired
    → digitalWrite(GPIO0, nivel según activeHigh)
    → reported.io.relay1.coilOn converge
    → tele.io.relay1CoilOn refleja el estado real
```

**Detalle que duele en producción:** GPIO0 es pin de **strap** en el ESP8266. Si el relé
queda energizado durante el boot, el chip puede no arrancar bien. Por eso el firmware
aplica **`bootSafe: true`** por defecto: al encender, el relé parte desenergizado y solo
conmuta cuando el runtime terminó de inicializar.

Feedback operativo típico:

- LED de **locate** en GPIO2 (parpadeo remoto desde admin).
- Botón de reset en GPIO1 → ventanas de 5 s / 12 s para borrar WiFi o reprovisionar.

## SKU 2: cuatro relés, un UART

La placa LC Technology es otra historia: el ESP-01 **no** toca los relés con GPIO. Hay un
MCU intermedio que espera tramas de 4 bytes por serial.

```text
relay.set(relayId = "relay3", coilOn = true)
    → construir frame [0xA0, canal, estado, checksum]
    → Serial.write(frame)   // TX = GPIO1, 115200 baud
    → MCU LC conmuta relay3
    → reported.io.relay3.coilOn = true
```

El checksum es trivial pero obligatorio: `0xA0 + canal + estado`. Sin él, la placa ignora
el comando.

**Conflicto de pines real:** GPIO1 es TX del UART **y** LED azul en el ESP-01 original.
Por eso el botón de reset físico va en **GPIO2** (libre, con pull-up interno) y el LED de
feedback suspende UART solo durante el parpadeo (~100–400 ms), no durante todo el hold del
botón.

## Lo que comparten (y por qué importa)

Ambos SKUs hablan el **mismo contrato MQTT v2.1** de la familia I/O:

```text
topics base:
    devices/<id>/shadow/desired   → io.relay1..relayN
    devices/<id>/shadow/reported  → estado aplicado
    devices/<id>/cmd              → relay.set, device.locate, ...
    devices/<id>/event            → relay_changed, cmd_result, mqtt_connected
    devices/<id>/tele             → métricas + io.relayNCoilOn
```

En admin, los dos aparecen bajo la **misma app vertical** (`/apps/io-relay-node`). No hay
controles IR ni sensores mezclados: el catálogo los clasifica como `io_relay_node` con
`irCapable: false`.

Onboarding también es común: portal SoftAP `IO-Setup-<hex>`, DNS cautivo, guardado en
EEPROM y conexión STA **sin reiniciar el chip** (en ESP8266, `ESP.restart()` tras el AP
provocaba watchdog en campo).

## La trampa del binario equivocado

```text
# ❌ Peligro: default_envs apunta al SKU 1CH
pio run -t upload

# ✅ LC 4CH explícito
pio run -e esp8266_lc_esp_relay_4ch -t upload

# ✅ 1CH explícito
pio run -e esp8266_io_relay_r2 -t upload
```

Señales de que flasheaste mal:

- Monitor serie muestra `[boot] esp8266-io-relay-node-v1` en una placa LC (o al revés).
- Los relés no responden: el firmware habla GPIO y la placa espera UART.
- OTA desde admin no encuentra versiones: el `hardwareModel` no coincide con la carpeta
  en el servidor.

Si cambiás de SKU en el **mismo módulo ESP**, usá flash limpio (`-EraseFirst`): la EEPROM
guarda WiFi, `deviceId` y config I/O del perfil anterior.

## Reset de credenciales en campo

| Acción | Botón físico (LC 4CH, GPIO2) | MQTT remoto |
|--------|-------------------------------|-------------|
| Borrar solo WiFi | Mantener ≥ 5 s, soltar | `device.reset_network` |
| Re-adopción total | Mantener ≥ 12 s, soltar | `device.reset_reprovision` |
| Factory (soporte) | Solo remoto | `device.reset_factory` |

Feedback en LC 4CH: parpadeo del LED azul (GPIO1) + clicks audibles en relay1 al confirmar.

## Para profundizar

- Vertical ESP8266 1CH: [`docs/verticals/ESP8266-IO-RELAY-NODE.md`](../../docs/verticals/ESP8266-IO-RELAY-NODE.md)
- Vertical LC 4CH: [`docs/verticals/LC-ESP-RELAY-4CH.md`](../../docs/verticals/LC-ESP-RELAY-4CH.md)
- Guía de flasheo 1CH: [`firmware-esp8266/Get-Started-IO-Relay-R2.md`](../../firmware-esp8266/Get-Started-IO-Relay-R2.md)
- Guía de flasheo LC 4CH: [`firmware-esp8266/Get-Started-LC-ESP01-4Relay.md`](../../firmware-esp8266/Get-Started-LC-ESP01-4Relay.md)
- Contrato MQTT §17.5: [`docs/MQTT-CONTRACT-v2.md`](../../docs/MQTT-CONTRACT-v2.md)
