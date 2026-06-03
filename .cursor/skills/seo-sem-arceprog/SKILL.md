---
name: seo-sem-arceprog
description: >-
  SEO y SEM para arceprog.dev (curriculum_web): Google Search Console, indexación,
  palabras clave de marca, plan de contenido RHCSA/IELTS, hreflang, sitemap y
  coordinación con astro-seo. Usar al auditar GSC, mejorar visibilidad orgánica
  o documentar acciones en docs/seo/.
---

# SEO y SEM — arceprog.dev (curriculum_web)

Skill **del proyecto** `curriculum_web`. Complementa [astro-seo](../astro-seo/SKILL.md) (checklist técnico Astro). Aquí: **métricas GSC**, **expectativas realistas**, **SEM ligero** y **rutas del repo**.

## Cuándo usar

- El usuario confunde **visitas propias** con **clics en GSC**.
- Pide auditar `arceprog.dev`, indexación (5 vs 34 páginas), o plan SEO/SEM.
- Hay que actualizar meta, `i18n.ts`, `Layout.astro`, sitemap o documentar en `docs/seo/`.

## Regla de oro (GSC)

| Métrica GSC | Cuenta | No cuenta |
|-------------|--------|-----------|
| **Clics** | Clic en resultado **orgánico de Google** | URL directa, favoritos, WhatsApp, LinkedIn, localhost, preview Vercel |
| **Impresiones** | URL mostrada en SERP (aunque no cliques) | Navegación interna sin búsqueda |
| **Estadísticas** (resumen) | A veces vacío en ventanas cortas | No sustituye **Rendimiento** con filtro 3 meses |

Si el usuario dice “entré muchas veces”: explicar que **no suma clics** salvo que busque en Google y pulse el resultado. Los ~9 clics en 3 meses pueden ser reales (p. ej. consulta `felipe arce`).

## Arquitectura del sitio (SEO)

| Ruta | Rol | Prioridad indexación |
|------|-----|----------------------|
| `/`, `/en/` | CV / marca personal | **Alta** |
| `/rhcsa-ex200/`, `/en/rhcsa-ex200/` | Hub estudio RHCSA | Media |
| `/rhcsa-ex200/NN-slug/` | Notas de laboratorio (muchas URLs) | Media-baja (contenido estudio) |
| `/ielts-practice/` | Borradores IELTS | Baja hasta completar |

- **Build:** `output: 'static'`, `site: https://arceprog.dev`, `@astrojs/sitemap` con i18n `es-AR` / `en-US`.
- **Meta central:** `src/lib/i18n.ts` + props en `src/layouts/Layout.astro`.
- **Artículos:** `title` / `description` por entrada en páginas `[slug].astro` + JSON-LD `BlogPosting`.
- **hreflang en HTML:** debe coincidir con sitemap → `ogLocale` con guión (`es-AR`, `en-US`) en `Layout.astro`.

## Checklist rápido (antes de deploy)

1. `npm run build` sin errores.
2. Verificar `dist/sitemap-index.xml` y que en producción respondan **200** (`curl -sI https://arceprog.dev/sitemap-index.xml`).
3. En [Search Console](https://search.google.com/search-console): **Sitemaps** → enviar `https://arceprog.dev/sitemap-index.xml`.
4. **Inspección de URL** en home ES y EN → “Solicitar indexación” tras cambios grandes.
5. Títulos alineados: `cv.json` / `cv_english.json` + `i18n.ts` (`jobTitle`, `pageTitle`, keywords).

## SEM (este proyecto)

No hay campañas pagas en el repo. Acciones SEM **orgánicas / gratuitas**:

1. **Marca:** optimizar para `felipe arce`, `arceprog`, `Felipe Arce desarrollador` (title, H1, Person schema).
2. **Long-tail técnico (opcional):** RHCSA, Linux admin — solo si el contenido del módulo es público y útil (no solo apuntes mínimos).
3. **Perfiles:** LinkedIn/GitHub con misma URL canónica `https://arceprog.dev`.
4. **Ads:** si más adelante hay presupuesto, documentar en `docs/seo/` aparte; no implementar sin pedido explícito.

## Indexación: por qué “34 no indexadas”

Causas típicas en este sitio:

- Muchas URLs nuevas (módulos RHCSA 05–10) aún sin rastreo profundo.
- Pares **es/en** duplican superficie (Google elige una variante).
- Páginas **finas** (IELTS borrador, listados cortos).
- Sitemap roto o deploy viejo (verificar 200 en producción).

Acciones: sitemap en GSC, enlaces internos desde home (`#practicas-actuales`), mejorar `description`/`excerpt` por módulo, considerar `draft: true` o `noIndex` en IELTS hasta tener contenido.

## Archivos clave

| Archivo | Uso SEO |
|---------|---------|
| `astro.config.mjs` | `site`, sitemap i18n |
| `public/robots.txt` | Allow + Sitemap URL |
| `src/layouts/Layout.astro` | canonical, hreflang, OG, Person/WebSite |
| `src/lib/i18n.ts` | meta por idioma |
| `src/pages/**/[slug].astro` | meta + BlogPosting por post |
| `docs/seo/*.md` | Auditorías y planes |

## Flujo de auditoría en Cursor

1. Leer `docs/seo/README.md` y la auditoría más reciente.
2. Aplicar checklist **astro-seo** en código.
3. `npm run build` + revisar sitemap local.
4. Opcional: `curl` a producción (home, sitemap, una URL RHCSA).
5. Actualizar `docs/seo/` con fecha y hallazgos; priorizar **crítico → alto → medio**.

## Documentación viva

Mantener en `docs/seo/`:

- `gsc-clics-vs-visitas.md` — educación GSC.
- `auditoria-arceprog-dev-YYYY-MM.md` — snapshot técnico + GSC.
- `plan-accion.md` — backlog priorizado.

## Coordinación con astro-seo

Para cambios de código (canonical, LCP, schema, sitemap config), seguir **astro-seo** primero; esta skill añade **contexto de negocio** (portafolio + notas de certificación) y **GSC/SEM**.
