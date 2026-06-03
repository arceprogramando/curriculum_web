# Auditoría SEO — arceprog.dev

**Fecha:** 3 de junio de 2026  
**Propiedad GSC:** `arceprog.dev`  
**Stack:** Astro 6 SSG, Vercel, i18n es/en  
**Referencias:** skill `astro-seo`, skill `seo-sem-arceprog`

---

## Resumen ejecutivo

| Área | Estado | Prioridad |
|------|--------|-----------|
| SEO técnico base (canonical, OG, robots, schema) | Bueno | — |
| Sitemap en producción | OK (200) tras verificar con curl | Verificar tras cada deploy |
| hreflang HTML vs sitemap | **Corregido** (antes `es`/`en`, ahora `es-AR`/`en-US`) | Hecho en código |
| Tráfico orgánico (GSC) | Muy bajo (~9 clics / 3 meses) | Contenido + marca + tiempo |
| Indexación | 5 indexadas, 34 no indexadas | Medio-alto |
| Título en producción (jun 2026) | Aún “FullStack SSR” en ES (deploy pendiente) | Publicar cambios locales |

---

## Datos Google Search Console (capturas usuario)

### Rendimiento (últimos 3 meses)

- **Clics totales:** ~9 (picos de 1–2 en días aislados).
- **Impresiones:** máximo ~7 en un día (22 may 2026).
- **Consulta visible:** `felipe arce` — 2 impresiones, 0 clics en el periodo de la tabla.

### Indexación

- **5 páginas indexadas** (estable).
- **34 no indexadas** (subida fuerte ~mediados de mayo 2026): coherente con **nuevos módulos RHCSA** en sitemap (10 módulos × 2 idiomas + IELTS + índices).

### Estadísticas (vista resumen)

- Mensaje “No hay clics en este periodo”: **no contradice** los 9 clics de la vista general; son agregaciones/filtros distintos. Ver [gsc-clics-vs-visitas.md](./gsc-clics-vs-visitas.md).

---

## Comprobaciones en vivo (3 jun 2026)

| URL | HTTP | Notas |
|-----|------|-------|
| `https://arceprog.dev/` | 200 | Title en prod: “Desarrollador FullStack SSR” |
| `https://arceprog.dev/robots.txt` | 200 | Allow `/`, Sitemap declarado |
| `https://arceprog.dev/sitemap-index.xml` | 200 | Vercel, `application/xml` |
| `https://arceprog.dev/sitemap-0.xml` | 200 | **16 URLs** en urlset (8 rutas × pares hreflang) |

**Nota:** Una herramienta de fetch externa devolvió 500 en sitemap en el mismo día; `curl` desde el entorno de build devolvió **200**. Tras cada deploy, comprobar sitemap manualmente.

### Build local

- **32 páginas HTML** generadas.
- Sitemap incluye: `/`, `/en/`, hubs y slugs `rhcsa-ex200` e `ielts-practice` en ambos idiomas.

---

## Checklist astro-seo (código actual)

### Correcto

- `output: 'static'` en `astro.config.mjs`.
- `site: 'https://arceprog.dev'` + `@astrojs/sitemap` con i18n.
- `public/robots.txt` con `Sitemap:` absoluto.
- Canonical absoluta por página en `Layout.astro`.
- Meta title/description por idioma en `i18n.ts`; posts con title/description propios.
- Open Graph + Twitter Card + imagen OG 1200×630.
- JSON-LD: `Person`, `WebSite`, `BreadcrumbList`; `BlogPosting` en artículos.
- HTML semántico: `main`, `article`, `section`, un `h1` por página.
- Hero: `fetchpriority="high"` en imagen (auditoría 2025).

### Mejoras aplicadas en esta auditoría

- **hreflang** en `<head>` alineado con sitemap (`es-AR`, `en-US`) vía `ogLocale` en `Layout.astro`.

### Pendiente / recomendado

| # | Hallazgo | Impacto |
|---|----------|---------|
| 1 | Desplegar cambios de título EN (“Mid-Level Full Stack Developer”) y PDFs | Medio |
| 2 | Alinear título ES (sigue “SSR” en repo ES) si querés coherencia bilingüe | Medio |
| 3 | Enviar/re-enviar sitemap en GSC | Alto (indexación) |
| 4 | Páginas IELTS muy cortas (“borrador planificado”) indexables | Bajo–medio: marcar `draft: true` o `noIndex` hasta tener contenido |
| 5 | Reforzar `description`/`excerpt` únicos por módulo RHCSA (no solo título genérico) | Medio |
| 6 | Enlaces internos: desde home ya hay `#practicas-actuales`; añadir enlaces contextuales entre módulos RHCSA | Medio |
| 7 | Instalar Google Analytics 4 (opcional) para contrastar visitas vs clics GSC | Bajo (medición) |
| 8 | `Person` schema: `jobTitle` debe seguir `config.jobTitle` tras deploy | Bajo |
| 9 | Backlinks: LinkedIn/GitHub con URL canónica | Alto (off-page) |

---

## Por qué muchas URLs no están indexadas

1. **Volumen de URLs > autoridad del dominio** (portfolio personal, pocas señales externas).
2. **Contenido de estudio** (apuntes, comandos, glosarios): útil para vos, a veces clasificado como “no prioritario” para búsqueda genérica.
3. **Duplicación lingüística**: Google puede indexar solo una variante (es o en) por tema.
4. **Contenido fino** en IELTS (pocas secciones, estado “borrador” en excerpt).

No es necesariamente una penalización; es **crawl budget + calidad percibida**.

---

## SEM (orgánico / marca)

| Acción | Esfuerzo | Efecto esperado |
|--------|----------|-----------------|
| Optimizar snippets para `felipe arce` / `Felipe Arce` | Bajo | Más CTR en marca |
| Misma URL en LinkedIn, GitHub, email | Bajo | Señales de entidad |
| No invertir en Ads hasta tener objetivo (empleo vs tráfico) | — | — |
| Keywords genéricos “full stack argentina” | Alto competencia | Largo plazo; requiere contenido y enlaces |

---

## Archivos de referencia en el repo

```
astro.config.mjs          # site + sitemap
public/robots.txt
src/layouts/Layout.astro  # meta, hreflang, schema
src/lib/i18n.ts           # titles, keywords, jobTitle
src/pages/**              # rutas estáticas
docs/seo/                 # esta carpeta
.cursor/skills/seo-sem-arceprog/
.cursor/skills/astro-seo/
```

---

## Próxima revisión sugerida

- Tras **deploy** de hreflang + títulos + PDFs: solicitar indexación de `/` y `/en/`.
- En **2–4 semanas**: revisar en GSC si bajan las “no indexadas” y suben páginas RHCSA indexadas.
- Actualizar este archivo o crear `auditoria-arceprog-dev-YYYY-MM.md` con nueva captura de GSC.
