---
title: "Signage en kiosco Pi: HDMI sin bash entre clips"
date: "2026-09-08"
summary: "En Pi OS Lite el framebuffer gana cuando VLC suelta el plano DRM. Mitigación solo-OS, logo Wekoda al boot y captura still sin tocar HDMI."
tags: ["signage", "raspberry-pi", "hdmi", "vlc", "kiosk", "linux"]
canonical: "docs/verticals/SIGNAGE-PLAYER.md"
audience: "developers"
---

# Signage en kiosco Pi: HDMI sin bash entre clips

Un player signage en **Raspberry Pi OS Lite** no tiene escritorio. HDMI muestra
`tty1`. VLC pinta con `--vout=drm_vout`. Entre clips el overlay DRM se suelta unos
milisegundos y la consola asoma — `login:`, cursor, bash. En lab `wsp-1`
(2026-09-08) lo cerramos **sin tocar la lógica de reproducción VLC**.

## La causa no es el agente Node

El proceso `cvlc` **no** muere entre ítems. El parpadeo es competencia de planos:

```text
Reproduciendo:
  VLC drm_vout  →  video en HDMI

Entre clips (EOF → siguiente MRL):
  VLC suelta overlay DRM
  HDMI vuelve al framebuffer de tty1  →  bash visible ~ms
  VLC toma el plano otra vez       →  siguiente clip
```

Intentos descartados en el lab:

| Intento | Resultado |
|---------|-----------|
| `--play-and-pause` + watchdog `pl_next` | `length=0` → **congela el primer clip** |
| Solo `dd` a `/dev/fb0` | vc4 KMS no pinta el plano visible al soltar overlay |
| `consoleblank=0` | Deja el TTY **visible** |
| `drm_kms_helper.fbdev_emulation=0` | Cuelga vc4 **antes** de la red — HDMI negro, sin SSH |

La solución vigente es **solo OS** (`os-mitigation.sh` **rev=3**).

## Mitigación OS (rev=3)

```text
systemctl mask getty@tty1 (+ autovt@tty1)
  → sin prompt de login en HDMI (SSH intacto)

signage-console.service → signage-hide-console.sh --loop
  → desbinda fbcon cada 250 ms
  → al soltar drm_vout el plano queda NEGRO

cmdline.txt:
  quiet logo.nologo vt.global_cursor_default=0
  console=tty1  ← se deja (arranque no ciego)

config.txt:
  disable_splash=1

force-hdmi-1080.sh:
  video=HDMI-…@30D
  elimina fbdev_emulation=0 si reaparece
```

Orden systemd crítico: `signage-console` **después** de `vlc-player`. Si corre
antes, borra el splash de boot.

**Prohibido** quitar `console=tty1`. **Prohibido** `fbdev_emulation=0` — probado:
Pi colgada, recuperación solo editando `cmdline.txt` desde la SD en otro PC.

## Logo Wekoda antes de VLC

Entre firmware apagado y el primer frame de playlist, HDMI puede ir negro
(quiet + sin rainbow). `signage-boot-logo.service` (oneshot) pinta el JPG de
marca en `/dev/fb0` con ffmpeg (1920×1080, pad blanco) **antes** de VLC.

```text
Boot:
  1. firmware — sin rainbow (disable_splash=1)
  2. kernel — quiet, logo.nologo, console=tty1
  3. signage-hdmi-1080 — modo 1080p@30
  4. signage-boot-logo — Wekoda en fb0
  5. vlc-player — overlay DRM
  6. signage-console — unbind fbcon (no borra logo si va After vlc)
```

No es logo de kernel custom. No es Plymouth. No toca `cvlc`.

## HDMI 1080p estable (no 4K fantasma)

Otro clásico del lab: EDID 4K y mp4 1080p.

- `--drm-vout-no-modeset`: al play VLC no reescribe HDMI al 4K del monitor.
- Nunca inferir modo activo desde `/sys/class/drm/.../modes` (lista EDID);
  suele empezar por 4K aunque el cable esté en 1080p.
- `force-hdmi-1080` en kernel + reboot para cmdline.

## Captura still sin romper HDMI (S5, agente 1.0.23)

El operador necesita ver qué hay en pantalla desde `/devices/:id`. Las primeras
versiones usaron `command=snapshot` de VLC o `kmsgrab` — ambos **afectan** el
plano DRM o dejaron HDMI negro tras reboot.

Solución vigente:

```text
Admin → POST /api/signage/player/:id/screenshot
  → MQTT signage.screenshot + req_id

Agente:
  ffmpeg del MRL actual (-hwaccel none) → JPEG
  POST multipart al backend (deviceSecret)
  → NO snapshot VLC, NO kmsgrab, NO tocar HDMI

Backend → WS signage.screenshot_ready
Admin → GET .../screenshot/image (sesión)
```

El JPEG no viaja por MQTT. Mutex HTTP en el agente (1.0.22+): desired, restore
de canal y cmd no intercalan `pl_empty` mientras HDMI sigue conectado.

## Checklist “player listo”

1. `os-mitigation.sh` imprime `rev=3` (CRLF strip si scp desde Windows).
2. Corte playlist video↔video = **negro**, no bash.
3. Reboot → logo Wekoda → playlist del canal (agente ≥ 1.0.18 + backend).
4. Tomar captura → JPEG en Admin sin parpadeo en la Pi.

## Para profundizar

- Vertical Signage (§ Corte a negro, § Logo, § S5): [`docs/verticals/SIGNAGE-PLAYER.md`](../../docs/verticals/SIGNAGE-PLAYER.md)
- Cache y bibliotecas: [post sept 2026](./2026-09-02-signage-cache-bibliotecas-y-proof-of-play.md)
- Scripts: `apps/signage-agent/os-mitigation.sh`, `signage-boot-logo.sh`
