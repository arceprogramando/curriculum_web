# Auditoría SEO — arceprog.dev (septiembre 2026)

**Fecha:** 8 de septiembre de 2026  
**Contexto:** migración `https://www.arceprog.dev` → `https://arceprog.dev` hace meses; GSC muestra **1 página indexada / 8 no indexadas** (captura 8 sep 2026, serie desde 10 jun 2026).  
**Stack:** Astro 6 SSG, Vercel, i18n es/en  
**Referencias:** skill `seo-sem-arceprog`, skill `astro-seo`, auditoría anterior [2026-06](./auditoria-arceprog-dev-2026-06.md)

---

## Resumen ejecutivo

| Hallazgo | Estado | Impacto |
|----------|--------|---------|
| `www.arceprog.dev` → apex responde **307 Temporary Redirect** | **Crítico** — se corrige en Vercel (dashboard) | Google no consolida señales en `arceprog.dev`; la variante `www` sigue "viva" para el buscador |
| Canonical/hreflang **sin** barra final vs sitemap **con** barra final (`/en` vs `/en/`) y ambas versiones responden 200 | **Corregido en código** (pendiente deploy) | Cada página tenía 2 URLs válidas y señales contradictorias → "Duplicada, Google eligió otra canónica" |
| Datos GSC: la serie arranca el 10/6/26 con 5 → 1 indexadas y solo 9 URLs conocidas (en junio eran 39) | Verificar propiedad en GSC | Probable propiedad nueva (URL-prefix `https://arceprog.dev/`) sin historial; la propiedad `www` queda huérfana |
| Sitemap, robots, 200 en todas las rutas, hreflang `es-AR`/`en-US`, JSON-LD | OK | — |
| Tráfico orgánico | Muy bajo (marca `felipe arce`) | Esperable con 1 URL indexada; primero indexación, después contenido |

**Lectura de alto nivel:** el sitio no está roto ni penalizado. Tiene **dos problemas de canonicalización** (host `www` con redirect temporal + doble URL por barra final) que, combinados con una migración sin 301/308 y un cambio de propiedad en GSC, hicieron que Google indexara casi nada de `arceprog.dev`. Los dos se arreglan en menos de una hora; el efecto en GSC tarda **2–6 semanas**.

---

## Comprobaciones en vivo (8 sep 2026)

### Redirecciones de host

| URL | Respuesta | Esperado |
|-----|-----------|----------|
| `https://www.arceprog.dev/` | **307** → `https://arceprog.dev/` | **308** (permanente) |
| `https://www.arceprog.dev/en/` | **307** → `https://arceprog.dev/en/` | 308 |
| `https://www.arceprog.dev/sitemap-index.xml` | 307 → apex | 308 |
| `http://arceprog.dev/` | 308 → `https://arceprog.dev/` | OK |
| `http://www.arceprog.dev/` | 308 → `https://www.arceprog.dev/` → 307 → apex | OK tras cambiar a 308 |

DNS: `www` y apex resuelven a Vercel (`64.29.17.x` / `216.198.79.x`). El 307 es el **valor por defecto de Vercel** para "Redirect to another domain" en *Project → Settings → Domains*.

**Por qué importa:** un 307 le dice a Google "esto es temporal, seguí tratando `www` como la URL real". Después de meses, Google puede seguir considerando `www.arceprog.dev/…` como canónica de páginas que ya no existen ahí, y marcar las de `arceprog.dev` como duplicadas/alternativas.

### Barra final (trailing slash)

| URL | Antes | Ahora (tras deploy) |
|-----|-------|---------------------|
| `https://arceprog.dev/en` | 200 (duplicado de `/en/`) | 308 → `/en/` |
| `https://arceprog.dev/rhcsa-ex200/01-lab-setup` | 200 (duplicado) | 308 → `…/01-lab-setup/` |
| `<link rel="canonical">` en `/en/` | `https://arceprog.dev/en` | `https://arceprog.dev/en/` |
| hreflang `en-US` en home | `https://arceprog.dev/en` | `https://arceprog.dev/en/` |
| Sitemap | `https://arceprog.dev/en/` | sin cambios |

Antes, **sitemap decía `/en/`** y **la página decía "mi canónica es `/en`"**. Eso es exactamente lo que en GSC aparece como *"Duplicada: Google eligió una canónica diferente"* o *"Página alternativa con etiqueta canónica adecuada"*.

### Lo que está bien

- `robots.txt` 200, `Allow: /`, `Sitemap:` absoluto.
- `sitemap-index.xml` y `sitemap-0.xml` 200, **32 URLs** (16 rutas × es/en) con `xhtml:link` hreflang.
- Todas las rutas probadas responden 200 en apex.
- `meta robots: index, follow` en home y artículos.
- hreflang `es-AR` / `en-US` / `x-default` alineado con sitemap (corregido en junio).
- JSON-LD `Person`, `WebSite`, `BreadcrumbList`, `BlogPosting`.
- `google-site-verification` presente en `<head>` (sirve para propiedad URL-prefix).

---

## Cambios aplicados en el repo (esta auditoría)

| Archivo | Cambio | Efecto |
|---------|--------|--------|
| `src/lib/i18n.ts` → `getLocalePath()` | Devuelve siempre barra final (`/en/`, `/rhcsa-ex200/01-lab-setup/`) | Canonical, hreflang y enlaces internos coinciden con el sitemap |
| `astro.config.mjs` | `trailingSlash: 'always'` | Astro genera y valida una sola forma de URL |
| `vercel.json` | `"trailingSlash": true` | Vercel redirige 308 `/en` → `/en/` (una URL por página en producción) |
| `vercel.json` | `redirects` host `www.arceprog.dev` → apex con `permanent: true` (308) | Respaldo por si el redirect de dominio se quita del dashboard |

Verificado con `npm run build` (32 páginas): canonical/hreflang de `/`, `/en/`, `/rhcsa-ex200/01-lab-setup/`, `/en/rhcsa-ex200/` con barra final; enlaces internos de la home con barra final.

> El redirect de dominio del dashboard de Vercel se evalúa **antes** que `vercel.json`, por eso el 307 hay que cambiarlo a mano (paso 1 del plan).

---

## Plan de alto nivel (qué hacer y en qué orden)

### Fase A — Hoy (30–60 min, sin esperar)

1. **Vercel → Project → Settings → Domains → `www.arceprog.dev` → Edit → Redirect to `arceprog.dev` → Status code: `308 Permanent Redirect` → Save.**  
   Verificar: `curl -sI https://www.arceprog.dev/` debe decir `HTTP/1.1 308`.
2. **Deploy** de este commit (barra final + vercel.json).  
   Verificar: `curl -sI https://arceprog.dev/en` → `308` con `Location: /en/`; `curl -s https://arceprog.dev/en/ | grep canonical` → `…/en/`.
3. **GSC → identificar propiedades.** En el selector de propiedades, anotar cuáles existen:
   - `https://www.arceprog.dev/` (URL-prefix vieja)
   - `https://arceprog.dev/` (URL-prefix nueva, probable origen de la captura)
   - `arceprog.dev` (propiedad de **Dominio**, incluye http/https/www/apex)  
   Si no existe la de **Dominio**, crearla (verificación DNS TXT en el registrador). Es la única vista que muestra el sitio completo durante una migración.
4. **GSC → Páginas → "No indexadas"** en la propiedad `https://arceprog.dev/`: anotar el **motivo exacto** de cada una de las 8 URLs. Según el motivo:

   | Motivo en GSC | Qué significa aquí | Acción |
   |---------------|-------------------|--------|
   | Duplicada, Google eligió otra canónica | Eligió `www` o la versión sin barra | Fases A1–A2 lo resuelven; solicitar indexación después |
   | Página alternativa con etiqueta canónica | Rastreó `/en` cuya canónica era `/en` pero sitemap decía `/en/` | Fase A2 |
   | Página con redirección | Rastreó `www` o `/en` (308 tras el fix) | Normal; desaparece con el tiempo |
   | Rastreada, actualmente sin indexar | Contenido fino / poca autoridad | Fase C (contenido) |
   | Descubierta, actualmente sin indexar | Aún no rastreó | Sitemap + enlaces internos + esperar |
   | Excluida por noindex / 404 / soft 404 | Bug real | Investigar la URL puntual |

5. **GSC → Sitemaps → volver a enviar** `https://arceprog.dev/sitemap-index.xml`.
6. **GSC → Inspección de URL → Solicitar indexación**: `/`, `/en/`, `/rhcsa-ex200/`, `/en/rhcsa-ex200/` (máx. ~10 por día).
7. Si existe propiedad `https://www.arceprog.dev/`: **Ajustes → Cambio de dirección** → destino `https://arceprog.dev/`. Requiere que el redirect sea permanente (paso 1). Aunque hayan pasado meses, sigue sirviendo: acelera la transferencia de señales.

### Fase B — 2 a 4 semanas (medir)

- Revisar en GSC (propiedad de Dominio y URL-prefix apex): páginas indexadas deberían pasar de 1 a **8–15**; "Página con redirección" puede subir (es bueno: Google está siguiendo los 308).
- Repetir `curl` a `www`, `/en`, sitemap tras cada deploy.
- Si a las 4 semanas sigue en 1–2 indexadas con motivo "Duplicada…": usar **Inspección de URL → Ver página rastreada** para ver qué canónica declara Google y comparar con la del HTML.

### Fase C — 1 a 3 meses (contenido y marca)

- Título ES sigue "Desarrollador FullStack SSR"; alinear con EN ("Mid-Level Full Stack Developer") y con CV (`i18n.ts`, `cv.json`).
- `description`/`excerpt` únicos por módulo RHCSA (evita que Google los vea como variantes del mismo hub).
- IELTS con contenido "borrador": `noIndex` o `draft` hasta tener texto real (3 × 2 idiomas = 6 URLs finas que compiten por crawl).
- Perfiles LinkedIn/GitHub con `https://arceprog.dev/` (sin `www`) como URL única.
- Publicar 1 artículo RHCSA "público" (troubleshooting/FAQ) y enlazarlo desde LinkedIn: primer backlink real + primera consulta no-marca.

### Lo que NO hace falta

- No hay señales de penalización manual ni de bloqueo por robots/noindex.
- No hace falta rehacer el sitio ni cambiar de hosting.
- No hace falta SEM pagado hasta tener ≥10 páginas indexadas y un objetivo claro (empleo vs tráfico).

---

## Expectativas realistas

| Métrica | Hoy | 4 semanas | 3 meses |
|---------|-----|-----------|---------|
| Páginas indexadas (GSC apex) | 1 | 6–12 | 15–25 |
| Clics/mes (orgánico) | ~0–3 | 3–8 (marca) | 10–30 |
| Consultas | `felipe arce` | + `arceprog` | + 1–3 long-tail RHCSA |

Un portfolio personal con 32 URLs y pocos enlaces externos no va a tener tráfico masivo; el objetivo es que **cuando alguien te busque por nombre aparezca `arceprog.dev` primero**, y que los módulos RHCSA existan en el índice.

---

## Próxima revisión

- Crear `auditoria-arceprog-dev-2026-10.md` con captura de GSC (Páginas + Rendimiento 28 días) después de la Fase A + 3–4 semanas.
- Actualizar [plan-accion.md](./plan-accion.md) marcando A1–A7.
