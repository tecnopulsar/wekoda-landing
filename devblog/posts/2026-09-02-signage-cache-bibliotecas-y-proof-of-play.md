---
title: "Signage: cache local, dos bibliotecas y proof-of-play"
date: "2026-09-02"
summary: "Tras el MVP MQTT de agosto: precarga en disco, catálogo global vs player, transcode en nube y auditoría de reproducción — sin que el admin toque el broker."
tags: ["signage", "raspberry-pi", "mqtt", "shadow", "cms", "proof-of-play"]
canonical: "docs/verticals/SIGNAGE-PLAYER.md"
audience: "developers"
---

# Signage: cache local, dos bibliotecas y proof-of-play

El [post del MVP](./2026-08-17-signage-player-rpi4-mqtt.md) dejó la Pi reproduciendo
playlists por shadow. En septiembre 2026 cerramos lo que hace falta para operar en
LAN real: **saber qué hay en disco**, **quién posee cada clip** y **demostrar qué
se emitió**.

| Capa | Qué cambió |
|------|------------|
| Agente | 1.0.3 → **1.0.17** (cache, idle, canal al boot) |
| Backend | Scope org/device, transcode al upload, playback logs |
| Admin | `/apps/signage/content`, `/proof-of-play`, chips de disco |

## Cache local sin bloquear el primer frame

La regla de oro del agente: **VLC nunca espera la descarga** para arrancar.
Bloquear el primer frame dejó HDMI negro (1.0.4) — no se repite.

```text
Admin elige "Cache local" (deliveryMode=local):

  miss en disco:
    Admin → desired.pendingContent + signage.content_sync
    Pi descarga + transcodifica H.264 1920×1080 (ffmpeg local)
    evento signage.content_synced + shadow.cachedContentIds
    Admin cierra barra de progreso → Play con file://

  hit en disco:
    Play inmediato con file://

Admin elige "Streaming":
    signage.play con URL HTTP — sin precarga implícita
```

El chip **En el disco de la Pi** no es decoración: el banner verde del POST
solo encoló MQTT. La fuente de verdad es `reported.cachedContentIds` en el
shadow. `cacheProgress` informa descarga/transcode en curso; el backend serializa
shadow por device para evitar carreras.

Transcode **en el backend al guardar** (una vez por archivo): el upload ya sale
en perfil 1080p. Publicar canal o preload no re-encoda si el perfil ya cumple.

## Dos bibliotecas, una flota

No copiamos el modelo legado Folder/Group/PlaylistDevice. El player es el
`Device` de la plataforma (`rpi4b-signage-player-v1`).

| | Global (`scope=org`) | Player (`scope=device`) |
|---|---|---|
| Contenido | Biblioteca de la org | Solo esa Pi — invisible en Global y en otras Pis |
| Playlist | Solo ítems globales | Globales **o** de ese player |
| Fondo Stop | `SignageOrgSettings` | `SignageDeviceSettings`; default hereda org |

```text
CRUD biblioteca:
  ?scope=org              → catálogo global
  ?scope=device&deviceId= → catálogo de una Pi

Control en vivo / agendas:
  ?forPlayer=<deviceId>   → unión org + ese player

Play / preload / agenda:
  rechaza content o playlist device de OTRO player
```

**Global vs Player** = quién **posee** el asset en admin.
**Cache local vs stream** = cómo VLC lo abre en HDMI. Son ejes distintos.

Carpetas (`SignageFolder`) son taxonomía solo en biblioteca global; no mueven
disco (`signage-content/<orgId>/…`). La biblioteca del player es lista plana.

## Publicar, Stop y canal

- **Publicar** a un canal: `desired.pendingContent` + reconcile, o
  `signage.playlist_apply` directo.
- **Stop** persistente: `desired.playlist=null`; el fondo HDMI viene de
  `idleBackground` (org o device). No borra `reported.playlist` si desired
  aún lo tiene — evita `reconcileError` eterno.
- Tras reboot, `mqtt_connected` reinyecta la playlist del **SignageChannel**
  (no el último delta retain del shadow). El agente ≥ 1.0.18 espera VLC HTTP
  antes de MQTT.

Agendas: cada `SignageSchedule` crea una Automation `DEVICE_ACTION`
`signage.playlist_apply`. Ya no hay `signageScheduleRunner` aparte.

## Proof-of-play (S4)

Eventos MQTT en `devices/<id>/event`:

```text
signage.playback_started   → clip + timestamp + playlistId
signage.playback_ended     → fin normal
signage.playback_error     → fallo VLC
```

Backend: `signageSubscriber` → `SignagePlaybackLog`.
UI: `/apps/signage/proof-of-play` con filtros por player y rango de fechas.

Mismo Zero Trust: el panel consulta REST; el player publica eventos; el broker
no entra en el navegador.

## Qué sigue

Cerrado en sustancia: S4 proof-of-play, S6 cache/sync/purge/play-one.
Abierto: OTA del paquete Node (`ota: false` en capabilities), `SpaceElement`
SIGNAGE en `/control`, CMS con Layout/Widget (rama de arquitectura; UI aún plana).

## Para profundizar

- Vertical Signage: [`docs/verticals/SIGNAGE-PLAYER.md`](../../docs/verticals/SIGNAGE-PLAYER.md)
- Contrato MQTT §17.9: [`docs/MQTT-CONTRACT-v2.md`](../../docs/MQTT-CONTRACT-v2.md)
- MVP signage: [post RPi4 MQTT](./2026-08-17-signage-player-rpi4-mqtt.md)
- Agente: `apps/signage-agent/`
