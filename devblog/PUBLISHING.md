# Publicar un post en el DevBlog

Guía para personal **no técnico** (marketing, editorial, dirección). Explica el
procedimiento actual, las plantillas y las opciones de automatización.

---

## 1. ¿Qué es un post del DevBlog?

Cada post es **un archivo de texto** con extensión `.md` (Markdown) dentro de:

```
devblog/posts/AAAA-MM-DD-slug-del-post.md
```

- **AAAA-MM-DD** es la fecha de publicación (ej. `2026-07-15`).
- **slug-del-post** es el título en minúsculas con guiones (ej.
  `mqtt-vs-http-para-iot`).

Ese archivo se compone de dos partes:

1. Un **encabezado** con metadatos (título, resumen, tags, etc.).
2. El **cuerpo** del post en formato Markdown.

Cuando el archivo se sube al repositorio, la landing se **reconstruye
automáticamente** en Vercel y el post aparece en <https://wetechlatam.com/devblog>.

---

## 2. Plantilla de un post nuevo

Copiá y pegá esta plantilla en un archivo nuevo:

```md
---
title: "Título atractivo y claro (máx. 70 caracteres)"
date: "AAAA-MM-DD"
summary: "Una frase que enganche al lector. 1-2 líneas, sin punto final es OK."
tags: ["tag1", "tag2", "tag3"]
canonical: "docs/RUTA-AL-DOC-INTERNO.md"
audience: "developers"
---

# Título principal (idéntico al del encabezado)

Primer párrafo que introduce el problema o la pregunta. Máx. 3 líneas.

## Subtítulo de sección

Texto normal. **Negrita** con dos asteriscos. *Cursiva* con uno.

- Ítem de lista
- Otro ítem
- Un tercer ítem

## Otra sección

Podés incluir bloques de código o pseudocódigo así:

```text
device on connect:
    publish reported (estado actual)
    subscribe desired
```

## Para profundizar

- Enlace externo: [Texto del enlace](https://ejemplo.com)
- Doc interno canónico: `docs/MI-DOC.md`
```

### Reglas de estilo

| Campo | Regla |
|-------|-------|
| `title` | Concreto, sin clickbait. Ej: *"Zero Trust: el panel nunca habla MQTT"*. |
| `summary` | Una frase potente. Se muestra en la card y en Google. |
| `tags` | 2 a 5 tags en minúsculas, sin espacios (`esp32`, `mqtt`, `iot`). |
| `canonical` | Ruta al documento **interno** del monorepo que sirve de fuente de verdad. Se muestra al pie del post. |
| `audience` | Casi siempre `"developers"`. |

### Longitud recomendada

- **400–900 palabras** (3–5 minutos de lectura).
- 2 a 5 secciones con `##`.
- 1 idea principal por post.

### Buenas prácticas

- No copiar código del monorepo. Usar **pseudocódigo** o diagramas.
- Terminar siempre con una sección **"Para profundizar"** con enlaces.
- Evitar prometer roadmap. Hablar en presente de lo que ya existe.

---

## 3. Procedimiento **actual** (manual, vía GitHub)

Requiere una cuenta de GitHub con acceso al repositorio.

### Paso a paso desde la web (sin instalar nada)

1. Ingresá a <https://github.com/TU-ORG/landigpage2026> (el navegador basta).
2. Entrá a la carpeta `devblog/posts/`.
3. Botón **Add file → Create new file**.
4. Nombre del archivo: `AAAA-MM-DD-mi-slug.md`.
5. Pegá el contenido del post (usá la plantilla de arriba).
6. Botón **Commit changes**:
   - Mensaje sugerido: `devblog: nuevo post — <título corto>`.
   - Seleccioná **Create a new branch** y ponele un nombre, ej.
     `post/mqtt-vs-http`.
7. Botón verde **Create pull request**.
8. Un revisor técnico aprueba y **Merge**.
9. Vercel detecta el merge → **despliega solo** en 1–2 minutos.
10. Verificá en <https://wetechlatam.com/devblog>.

### Checklist antes de mergear

- [ ] Nombre del archivo `AAAA-MM-DD-slug.md`.
- [ ] Encabezado con `title`, `date`, `summary`, `tags`.
- [ ] Fecha en formato ISO (`2026-07-15`, **no** `15/07/2026`).
- [ ] Tags en minúsculas, sin acentos.
- [ ] Enlaces probados.
- [ ] Sin código copiado del monorepo (usar pseudocódigo).
- [ ] Preview OK en Vercel (cada PR genera una URL de previsualización).

---

## 4. Validación automática

Antes de publicar, corré:

```bash
pnpm devblog:check
```

Este comando:

- Verifica que cada post tenga los campos obligatorios (`title`, `date`,
  `summary`, `tags`).
- Verifica que la fecha esté en formato ISO.
- Verifica que el nombre del archivo empiece por la misma fecha.
- Verifica que haya al menos un tag.
- Falla el build si algo está roto.

**En CI/CD**: este mismo comando se ejecuta antes de cada deploy en Vercel
(agregarlo al script `build` para bloquear despliegues con posts inválidos).

---

## 5. Opciones de automatización (recomendaciones)

Elegir **una** según el perfil del equipo editorial:

### Opción A — GitHub web + PR previews *(hoy, cero costo)*

**Ideal si**: el equipo editorial puede aprender GitHub básico (10 min).

- Editor Markdown en la web de GitHub.
- Preview automático en cada PR (Vercel).
- Merge = deploy.
- **Costo**: cero.

### Opción B — Decap CMS *(recomendado para no-técnicos)*

**Ideal si**: quien escribe no quiere ver YAML ni ramas.

- Se instala en `/admin` (misma web, ruta protegida).
- Editor visual con campos, dropdowns y drag-and-drop de imágenes.
- Los cambios se commitean vía API a `devblog/posts/*.md`.
- Login con GitHub (o email/password).
- **Costo**: cero.
- **Contra**: hay que mantener la configuración del CMS.

### Opción C — Keystatic *(recomendado si buscamos algo moderno)*

- Similar a Decap pero nativo de Next.js y con mejor DX.
- Integración directa en `app/keystatic/[[...params]]/page.tsx`.
- UI más pulida, tipado TypeScript de las colecciones.
- **Costo**: cero (self-hosted).

### Opción D — Notion → publicación *(máxima comodidad)*

- El equipo escribe en Notion.
- Un script (GitHub Action + API de Notion) exporta a `.md` y hace commit.
- **Costo**: API de Notion gratuita hasta cierto límite; sí requiere setup.

**Recomendación por defecto**: **Opción A hoy + Opción B/C** cuando el volumen
supere los 2 posts al mes.

---

## 6. Ciclo completo (resumen visual)

```text
Redactar en editor
        │
        ▼
devblog/posts/AAAA-MM-DD-slug.md
        │
        ▼
pnpm devblog:check   ← validación local
        │
        ▼
Commit + Pull Request en GitHub
        │
        ▼
Vercel preview  ← revisar en la URL única del PR
        │
        ▼
Merge en main
        │
        ▼
Vercel deploy  ← wetechlatam.com/devblog (1–2 min)
```

---

## 7. Preguntas frecuentes

**¿Puedo agregar imágenes?**
Sí. Poné el archivo en `public/images/devblog/mi-imagen.webp` y referencialo
en el post con `![Descripción](/images/devblog/mi-imagen.webp)`.

**¿Cómo edito o borro un post publicado?**
Editá o eliminá el `.md` correspondiente en `devblog/posts/` y abrí un nuevo
PR.

**¿Qué pasa si me olvido la fecha en el nombre del archivo?**
El validador (`pnpm devblog:check`) falla el build. Corregí el nombre y
volvé a intentar.

**¿Puedo programar la publicación a futuro?**
Sí: si la fecha del encabezado (`date`) es futura, el post se puede filtrar
para que aparezca sólo desde esa fecha (feature opcional, hoy no está
activada).
