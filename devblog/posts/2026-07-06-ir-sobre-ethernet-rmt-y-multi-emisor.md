---
title: "IR sobre Ethernet: RMT y multi-emisor"
date: "2026-07-06"
summary: "Capturar y repetir un mando a distancia parece magia. Es timing de microsegundos con el periférico RMT del ESP32."
tags: ["esp32", "ir", "rmt", "firmware", "hardware"]
canonical: "docs/hardware/ESP32-ETH-IR-REPEATER-v1.md"
audience: "developers"
---

# IR sobre Ethernet: RMT y multi-emisor

Un mando de TV envía pulsos infrarrojos modulados a ~38 kHz. Repetirlos bien
exige respetar tiempos de **microsegundos**. Para eso el ESP32 tiene el
periférico **RMT**, que genera y lee secuencias de pulsos por hardware sin
saturar la CPU.

Nuestro SKU `esp32-eth-ir-repeater-v1` corre sobre una **WT32-ETH01** (ESP32 +
Ethernet cableado), ideal para instalaciones fijas donde el WiFi molesta.

## Capturar: el receptor como cronómetro

```text
rx_config:
    channel   = RMT_RX
    tick      = 1 µs
    tolerance = 35%          # clave para Samsung/NEC; el default falla
    carrier   = 38 kHz

on ir_signal:
    raw = read_pulse_durations()      # [9024, 4512, 564, 1692, ...]
    if is_repeat_frame(raw): ignore   # los mandos repiten al mantener pulsado
    if seen_recently(hash(raw)): ignore   # anti-rebote, ventana ~150 ms
    publish("ir/captured", { protocol, value, raw })
```

## Emitir: reconstruir el pulso

```text
tx_config:
    channel    = RMT_TX
    carrier    = 38 kHz, duty 50%
    idle_level = LOW

emit(raw):
    items = to_rmt_items(raw)         # omitir el gap inicial raw[0]
    split_if_longer_than(items, 32767 µs)   # límite de 15 bits del campo RMT
    send(items)
    blink(activity_led)               # feedback visible
```

## Multi-emisor: una fuente, varias zonas

La variante `esp32-eth-ir-repeater-4tx-v1` habilita hasta **4 canales TX**. El
comando IR acepta un `txChannel` opcional; si falta, va al canal por defecto.

```text
emit(raw, txChannel = 1):
    if txChannel not in [1..IR_TX_CHANNELS]:
        return error("invalid_tx_channel")
    send_on(channel[txChannel], raw)
```

Un solo dispositivo puede así comandar equipos en habitaciones distintas, cada
LED IR apuntando a su zona.

## Un detalle de hardware que cuesta una tarde

La WT32-ETH01 **no** tiene LED en GPIO2 (mito común). Los LEDs onboard útiles
son GPIO5 (RX) y GPIO17 (TX). Documentarlo evita perseguir un “LED que no
enciende” que en realidad nunca existió.

## Para profundizar

- Pinout, SKU y variantes: [`docs/hardware/ESP32-ETH-IR-REPEATER-v1.md`](../../docs/hardware/ESP32-ETH-IR-REPEATER-v1.md)
- Spec IR de referencia (RMT, tolerancias): [`firmware-v2/FIRMWARE-IR-DOC.md`](../../firmware-v2/FIRMWARE-IR-DOC.md)
- Contrato de topics IR: [`docs/MQTT-CONTRACT-v2.md`](../../docs/MQTT-CONTRACT-v2.md) (§17)
