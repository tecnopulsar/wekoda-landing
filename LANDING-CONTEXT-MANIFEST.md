# Manifiesto de contexto — Landing WeKoda (2026)

**Para:** Composer 2.5 (u otro agente) que actualice el sitio público en este repo (`wekoda-landing/`).  
**Objetivo:** Reemplazar el relato viejo centrado en **IR Repeater** por la plataforma **multi-vertical** vigente, con **prioridad comercial y narrativa en CMS Signage (cartelería digital)**.  
**Idioma:** todo copy visible al visitante en **español (Argentina)**. Código, identificadores y `data-action` en **inglés**.

---

## 0. Monorepo canónico (obligatorio)

| Rol | Repo | Ruta local | GitHub |
|-----|------|------------|--------|
| **Producto / docs / panel** | `iot-over-ip` (full) | `D:\IoT-Fullstack\iot-over-ip` | `tecnopulsar/iot-over-ip` |
| **Marketing público** | `wekoda-landing` | `D:\IoT-Fullstack\wekoda-landing` | `tecnopulsar/wekoda-landing` |

**Descartado para esta landing y para el agente:** `wekoda-Ir_repeater` (Lite). No usarlo como fuente de Signage, copy de plataforma ni `NEXT_PUBLIC_APP_ORIGIN`. El IR de producto sigue documentado en `iot-over-ip/docs/verticals/IR-REPEATER.md` y la página `/soluciones/ir-repeater` de este repo.

**Cursor:** abrir el workspace en `wekoda-landing` (marketing) o `iot-over-ip` (producto), no en rutas Lite inexistentes.

**Dominios:**

| Variable | Uso | Valor vigente |
|----------|-----|----------------|
| `NEXT_PUBLIC_SITE_URL` | SEO / canonical de la landing | `https://www.wekoda.lat` (Vercel, marketing) |
| `NEXT_PUBLIC_APP_ORIGIN` | Login “Empezar ahora” → admin **full** | **No** usar `https://app.wekoda.lat` (subdominio sin registro DNS). Definir solo cuando exista el despliegue real del admin `iot-over-ip`. Mientras tanto `SHOW_APP_LOGIN = false` en `lib/constants.ts`. |

---

## 1. Diagnóstico del estado actual (qué está desactualizado)

| Área | Archivo(s) | Problema |
|------|------------|----------|
| Hero y SEO home | `app/page.tsx` | Título y `featureList` JSON-LD hablan de mandos IR y espacios; no mencionan cartelería ni campañas. |
| Showcase del panel | `lib/platform-content.ts` → `showcaseSections` | Seis pestañas: resumen, dispositivos, operaciones, espacios, **mando virtual**, auditoría. **Cero** pantallas de Signage CMS (media, canales, campañas, players, proof-of-play). |
| Minicapturas hero | `heroPreviewCards` | Solo resumen / operaciones / espacios. |
| Verticales | `verticalApps` | **IR Repeater primero**, con `href` dedicado; Digital Signage al final y descripción solo RPi. |
| “Caso completo” | `app/page.tsx` + `IrJourney` + `irJourneySteps` | Toda la sección es el viaje IR (4 pasos) + CTA **“Ver WeKoda IR Repeater”**. Es el ancla emocional de la home hoy. |
| Modalidades / precios | `deploymentPlans` | Plan destacado es **Gateway** (bien), pero el primer plan es **Kit IR Repeater** (mensaje de producto único). |
| FAQ | `faqItems` | Pregunta dedicada a IR; ninguna sobre cartelería, campañas, proof-of-play o rol Marketing vs IT. |
| Contacto | `contactInterests` | “Kit IR Repeater” primero; Signage segundo. |
| Página solución Signage | `app/soluciones/digital-signage/page.tsx` | Subtítulo “solo Raspberry Pi”; no Samsung Tizen SSSP, no campañas F16, no prioridad HDMI, no flujo Marketing/IT (F11). |
| DevBlog | `devblog/` | Índice con muchos posts IR; los posts de cartelería existen pero no lideran la home. |

**No borrar IR:** sigue siendo vertical real y diferenciador en edificios. Debe pasar a **segunda ola** en la home (módulo corto + enlace `/soluciones/ir-repeater`), no ser el hilo conductor.

---

## 2. Qué es WeKoda (verdad de producto, una página)

**WeKoda** es la plataforma **IoT-over-IP** del monorepo `iot-over-ip`: backend + panel admin + broker MQTT + dispositivos edge, con **Zero Trust** (el panel **nunca** se conecta al broker; solo REST + WebSocket).

**Tesis de venta (2026):** no vendemos “un repetidor IR” ni “otro MagicInfo”. Vendemos **el programa del sitio**: pantallas, luces, sensores y actuadores en **un tenant**, **una flota**, **un criterio** cuando varios equipos compiten por el mismo HDMI.

**Regla de oro (Signage):** el dominio no conoce MQTT; el player no conoce el dominio. El televisor **reproduce archivos**; el servidor decide **qué gana**, **cuándo** y **con qué evidencia**.

**Despliegue:** on‑prem / LAN (Gateway, Docker, Edge Appliance). No posicionar como SaaS global tipo Yodeck.

---

## 3. Prioridad narrativa: CMS Signage por sobre el resto

En la **home** y en el **primer scroll**, el visitante debe entender:

1. **Cartelería digital operable** (campañas, canales, agendas, prioridad, entrega, proof-of-play).
2. **Por qué IT la elige** (misma plataforma que ya opera, seguridad, on‑prem, players commodity, OTA, diagnóstico).
3. **Por qué Marketing la adopta** (campañas sin inventario de TVs, calendario, roles: carga vs publicación).
4. **Plataforma IoT** como refuerzo (luces, sensores, IR, automatización) — **breve**, no competir con el foco Signage.

### Capacidades Signage que sí están en producto (pueden citarse)

Usar lenguaje de negocio; detalle técnico en docs del monorepo.

| Bloque | Mensaje corto | Doc canónico (`iot-over-ip`) |
|--------|---------------|------------------------------|
| Biblioteca + playlists | Contenido (video, imagen, URL), vigencia, biblioteca por org | `docs/verticals/SIGNAGE-PLAYER.md` |
| Canales + targeting | Un mensaje a grupo, etiqueta o lista de players — no “14 TVs a mano” | `SIGNAGE-CMS-F2-GROUPS.md` |
| Campañas (F16) | Planificador marketing: nombre, fechas, validación, publicar/pausar | `SIGNAGE-CMS-F16-CAMPAIGN-PLANNER.md` |
| Prioridad HDMI (F7) | Emergencia, IoT, canal manual, agenda — el panel explica el ganador | `SIGNAGE-CMS-ARCHITECTURE.md` §5 |
| Entrega (F6) | Estado persistido: no alcanza “clic en publicar” | `SIGNAGE-CMS-F6-DELIVERY.md` |
| Proof-of-play (F10) | Evidencia de reproducción para operación y marketing | `SIGNAGE-CMS-F10-PROOF-OF-PLAY.md` |
| Marketing vs IT (F11) | Marketing **edita**; IT **aprueba y publica**; `DRAFT` no llega al HDMI | `SIGNAGE-CMS-F11-APPROVAL.md` |
| Players | Raspberry Pi 4B + agente; **Samsung Tizen SSSP** (misma vertical CMS) | `SIGNAGE-PLAYER.md`, `TIZEN-SIGNAGE-PLAYER.md` |
| Offline | Cache local; el sitio sigue si cae internet (Gateway) | posts `devblog` signage + `EDGE-APPLIANCE.md` |

### Qué no prometer en la landing

| Evitar | Motivo |
|--------|--------|
| “Reemplazo 1:1 de MagicInfo” (editor espacial, widgets en TV) | Layouts/widgets: visión / parcial |
| YouTube / páginas web en el player | Bloqueado o no producto |
| Videowall / SyncPlay como hero genérico | Caso lab; mensaje secundario |
| “Solo Raspberry Pi” | Hay SKU Tizen en catálogo |
| Métricas inventadas (ej. “2.148 nodos”, “99,98%”) | La home del monorepo `admin/(public)` ya evitó esto; mantener capturas reales |

---

## 4. Dos perfiles — quién lee qué

### 4.1 Persona primaria: **Responsable de IT / Infra / Integrador**

- **Rol en la compra:** evalúa arquitectura, despliegue, seguridad, operación, integración con red existente.
- **Dolores:** otro silo SaaS de carteles, lock-in del SoC Samsung, brokers expuestos, flotas sin OTA, “marketing me pide un USB por sucursal”.
- **Qué debe ver en la landing:**
  - Zero Trust, multi-tenant, auditoría, on‑prem / Gateway.
  - Players **commodity** (Pi HDMI, Tizen donde aplique) — la TV puede ser cualquier marca con HDMI.
  - Misma consola para signage + resto del edificio.
  - OTA, diagnóstico por player, screenshot, entrega trazable.
- **CTA:** demo técnica, Gateway, licencia, contacto con interés “Integración / Gateway”.

**Frase guía IT:** *“Una plataforma en tu LAN que IT opera y Marketing usa sin romper seguridad.”*

### 4.2 Persona secundaria: **CEO / Director de Marketing (beneficiario)**

- **Rol:** no elige el stack; **pide** campañas en fecha, evidencia y menos fricción con sucursales.
- **Dolores:** precios distintos en TVs gemelas, promo vencida en pantalla, nadie sabe si se publicó, dependencia de proveedor extranjero.
- **Qué debe ver en la landing (lenguaje no técnico):**
  - Campañas y calendario, no “inventario de pantallas”.
  - “Subo el material; IT aprueba y sale al aire.”
  - Proof-of-play y estado de entrega.
  - Prioridad clara (emergencia / mensaje crítico pisa promoción).
- **CTA:** “Ver cómo opera una campaña” → solución Signage o artículo devblog.

**Frase guía Marketing:** *“Tu campaña, en todas las sucursales correctas, con fecha de inicio y fin — y prueba de que se vio.”*

### Puente IT → Marketing (copy sugerido)

> IT implementa WeKoda una vez. Marketing trabaja en el mismo panel (con permisos acotados): arma campañas y sube piezas; IT aprueba, publica y mantiene la flota. Menos tickets, menos pendrives, más control.

---

## 5. Arquitectura de información recomendada (home)

Orden de secciones **objetivo** (reordenar `app/page.tsx`):

1. **Hero** — promesa Signage + plataforma; subtítulo dual IT/Marketing; CTAs: `#carteleria` o `/soluciones/digital-signage` + `#contacto` / login app.
2. **Prueba visual** — `heroPreviewCards` y/o showcase: **Campañas**, **Canales**, **Players/Live** (capturas bajo `public/images/platform/` — crear si faltan desde panel real).
3. **Puente IT / Marketing** — dos columnas o tabs con bullets por persona (§4).
4. **Showcase plataforma** — ampliar `showcaseSections` con Signage **antes** que mando virtual.
5. **Verticales** — **Digital Signage primero** (card destacada `featured`); IR y demás en grid normal.
6. **Caso de uso profundo Signage** — reemplazar o preceder a `IrJourney`: 4 pasos *Contenido → Canal/grupo → Campaña/agenda → Evidencia en pantalla*.
7. **Caso IR** — sección más corta o solo enlace a `/soluciones/ir-repeater`.
8. **Seguridad / arquitectura** — mantener; enlazar devblog Zero Trust.
9. **Modalidades** — reordenar planes: Gateway / Licencia primero; kit hardware como “starter” genérico o “kit signage + gateway”.
10. **FAQ** — mezclar IT + Marketing + Signage.
11. **Contacto** — intereses: “Cartelería / CMS”, “Gateway”, luego IR.

**Anclas sugeridas:** `#carteleria`, `#plataforma`, `#it-marketing`, `#modalidades`, `#contacto`.

---

## 6. Copy de referencia (editable)

### Hero (propuesta)

- **Eyebrow:** Plataforma IoT-over-IP · Cartelería del edificio
- **H1:** Publicá campañas en toda la red sin otro silo de software.
- **Sub:** WeKoda une cartelería digital, flota y automatización en tu LAN. Marketing arma campañas; IT aprueba, publica y audita. Zero Trust de punta a punta.
- **Chips:** CMS Signage · On‑prem · Proof-of-play · Multi-tenant

### Subhero Marketing (opcional)

- Campañas con calendario · Canales por grupo o etiqueta · Evidencia de reproducción

### Subhero IT (opcional)

- Raspberry Pi y Samsung Tizen · OTA y diagnóstico · El panel nunca toca MQTT

### Elevator para CEO Marketing (≤ 80 palabras)

WeKoda es el CMS de cartelería que tu equipo de IT ya puede operar en la red del local. Marketing sube videos y arma campañas con fecha de inicio y fin; IT controla qué sale al aire y en qué pantallas. Si hay una emergencia o un mensaje prioritario, el sistema define qué se ve — no el último USB que llegó. Además, podés pedir evidencia de que la pieza se reprodujo.

### Elevator para IT (≤ 80 palabras)

WeKoda es una plataforma IoT multi-tenant desplegable on‑prem: backend, MQTT y panel en tu LAN. La vertical Signage trata cada player como un dispositivo más (shadow, telemetría, OTA). Los players son HDMI commodity; el resolver de programa decide prioridades. Roles separan Marketing (edición) de operación (publicación). El admin no accede al broker. Misma stack para relés, sensores e IR cuando el sitio lo necesite.

---

## 7. Inventario de archivos a tocar (checklist Composer)

| Prioridad | Archivo | Acción |
|-----------|---------|--------|
| P0 | `lib/platform-content.ts` | Reordenar `verticalApps`; ampliar `showcaseSections`, `heroPreviewCards`, `faqItems`, `contactInterests`, `deploymentPlans`; añadir `signageJourneySteps` (nuevo) o reemplazar uso de `irJourneySteps` en home. |
| P0 | `app/page.tsx` | Reordenar secciones; metadata/JSON-LD; hero; nueva sección Signage + puente IT/Marketing; bajar IR. |
| P0 | `app/soluciones/digital-signage/page.tsx` | Actualizar título (no “solo Pi”); Tizen; campañas; F11; comparativa breve vs MagicInfo/Yodeck (tono `SIGNAGE-CMS-SALES-BRIEF.md`). |
| P1 | `components/ui-public/PlatformShowcase.tsx` | Sin cambio de lógica si solo cambia data. |
| P1 | `components/ui-public/IrJourney.tsx` | Mover a home secundaria o solo página IR; crear `SignageJourney.tsx` paralelo. |
| P1 | `components/public-navbar.tsx` | Enlace “Cartelería” o “Soluciones → Signage”. |
| P2 | `app/devblog/page.tsx` | Destacar post `cms-carteleria-del-edificio` (sincronizar slug con `devblog/posts/`). |
| P2 | `public/images/platform/` | Capturas Signage: media, campaigns, channels, players (exportar del admin real). |

**Convención `data-action`:** `open-signage-solution`, `read-signage-article`, `select-persona-it`, `select-persona-marketing`, etc.

---

## 8. Fuentes de verdad en `iot-over-ip` (leer antes de inventar)

| Uso | Ruta |
|-----|------|
| Visión plataforma | `docs/PLATFORM-FOUNDATIONS.md`, `docs/PLATAFORMA-ESTADO-Y-ROADMAP.md` |
| PRD Signage | `docs/verticals/SIGNAGE-CMS-PRD.md` |
| Ventas Signage | `docs/verticals/SIGNAGE-CMS-SALES-BRIEF.md` |
| Player / deploy | `docs/verticals/SIGNAGE-PLAYER.md`, `TIZEN-SIGNAGE-PLAYER.md` |
| Editorial landing | `devblog/posts/2026-09-16-cms-carteleria-del-edificio.md` (+ índice `devblog/README.md`) |
| Landing embebida en admin (referencia de copy) | `iot-over-ip/admin/app/(public)/page.tsx` sección `#carteleria` |
| Marca YouTube / tagline | `iot-over-ip/assets/brand/build-youtube-banner.py` (“Todo tu IoT, en tu red”) |

Este repo `wekoda-landing` es **marketing estático**; el producto vive en `iot-over-ip`. No duplicar contratos MQTT en la landing.

---

## 9. Criterios de aceptación (QA de contenido)

- [ ] Un visitante **no técnico** (Marketing) entiende campañas, calendario y aprobación IT en **30 s** de scroll.
- [ ] Un visitante **técnico** ve on‑prem, Zero Trust, players Pi/Tizen y operación de flota sin pensar que el producto es solo IR.
- [ ] La primera vertical enlazada con página propia es **Digital Signage**, no IR.
- [ ] No hay métricas de flota falsas; sí capturas o diagramas honestos.
- [ ] FAQ y JSON-LD reflejan Signage + plataforma.
- [ ] Formulario de contacto lista **Cartelería / CMS** como primer interés.
- [ ] Página `/soluciones/ir-repeater` sigue existiendo y es correcta; solo deja de dominar la home.

---

## 10. Instrucción corta para el agente (pegar en Composer)

```text
Actualizá wekoda-landing según LANDING-CONTEXT-MANIFEST.md.
Foco: CMS Signage como historia principal; perfiles IT (comprador) y CEO Marketing (beneficiario).
Leé SIGNAGE-CMS-SALES-BRIEF.md y el post devblog cms-carteleria en iot-over-ip antes de escribir copy.
Reordená app/page.tsx y lib/platform-content.ts; actualizá soluciones/digital-signage.
Mantené IR como vertical secundaria con enlace a /soluciones/ir-repeater.
Español en UI; código en inglés; data-action en botones interactivos.
```

---

*Última revisión: 2026-10-12. Mantener este manifiesto cuando cambie el PRD Signage o la estructura de `lib/platform-content.ts`.*
