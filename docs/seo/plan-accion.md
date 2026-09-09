# Plan de acción SEO / SEM — arceprog.dev

**Actualizado:** 8 de septiembre de 2026  
**Estado del sitio en GSC:** 1 URL indexada / 8 no indexadas (propiedad apex); serie desde 10 jun 2026.  
**Diagnóstico:** [auditoria-arceprog-dev-2026-09.md](./auditoria-arceprog-dev-2026-09.md) — redirect `www` 307 (temporal) + doble URL por barra final.

---

## Fase A — Hoy (canonicalización post-migración www → apex)

- [x] Código: `getLocalePath()` con barra final; `trailingSlash: 'always'`; `vercel.json` con `trailingSlash: true` y redirect `www` 308 de respaldo
- [ ] **Vercel → Settings → Domains → `www.arceprog.dev` → Edit → status `308`** (hoy es 307)
- [ ] Deploy y verificar:
  ```bash
  curl -sI https://www.arceprog.dev/ | head -n 3        # HTTP/1.1 308
  curl -sI https://arceprog.dev/en | head -n 3          # 308 -> /en/
  curl -s https://arceprog.dev/en/ | grep -o '<link rel="canonical"[^>]*>'   # .../en/
  curl -sI https://arceprog.dev/sitemap-index.xml | head -n 1               # 200
  ```
- [ ] GSC: listar propiedades existentes (`www` URL-prefix, apex URL-prefix, Dominio). Crear propiedad de **Dominio** `arceprog.dev` si falta.
- [ ] GSC → Páginas → "No indexadas": anotar el **motivo** de las 8 URLs (tabla de decisión en la auditoría)
- [ ] GSC → Sitemaps → reenviar `https://arceprog.dev/sitemap-index.xml`
- [ ] GSC → Inspección de URL → Solicitar indexación: `/`, `/en/`, `/rhcsa-ex200/`, `/en/rhcsa-ex200/`
- [ ] Si existe propiedad `https://www.arceprog.dev/`: Ajustes → **Cambio de dirección** → `https://arceprog.dev/`

---

## Fase B — 2 a 4 semanas (medir)

| Tarea | Señal esperada |
|-------|----------------|
| Revisar GSC → Páginas (Dominio + apex) | Indexadas 1 → 6–12; "Página con redirección" puede subir (normal) |
| `curl` post-deploy a `www`, `/en`, sitemap | 308 / 308 / 200 |
| Si sigue "Duplicada, Google eligió otra canónica" | Inspección de URL → Ver página rastreada → comparar canónica elegida vs HTML |
| Nueva captura GSC → `auditoria-arceprog-dev-2026-10.md` | Documentar |

---

## Fase C — 1 a 3 meses (contenido + marca)

| Prioridad | Tarea | Archivo / lugar |
|-----------|-------|-----------------|
| Media | Unificar título ES con EN y CV (quitar "SSR" si ya no aplica) | `src/lib/i18n.ts`, `cv.json` |
| Media | `description` + `excerpt` únicos por módulo RHCSA | `src/content/rhcsa/**/es.md`, `en.md` |
| Media | Enlace "siguiente módulo" al pie de cada artículo RHCSA | `src/pages/**/[slug].astro` |
| Media | LinkedIn / GitHub con `https://arceprog.dev/` (sin `www`) | Perfiles |
| Baja | `noIndex` / `draft: true` en IELTS hasta contenido real | `src/content/ielts/**`, páginas IELTS |
| Baja | 1 artículo RHCSA "público" (troubleshooting/FAQ) + post LinkedIn | `src/content/rhcsa/` |
| Baja | GA4 opcional para contrastar visitas vs clics | `Layout.astro` |

---

## Fase D — SEM pagado (solo si lo pedís)

- Precondición: ≥10 URLs indexadas y objetivo definido (empleo, freelance, marca).
- Landing: home EN o ES según público.
- No implementar píxeles/Ads en el repo sin requisito explícito.

---

## KPIs razonables (portfolio personal)

| Métrica | 4 semanas | 3 meses | 6 meses |
|---------|-----------|---------|---------|
| Páginas indexadas | 6–12 | 15–25 | 25–32 |
| Clics GSC / mes | 3–8 | 10–30 | 30–60 |
| Consultas de marca | `felipe arce` | + `arceprog` | Estables |
| Consultas genéricas | 0 | 1–3 (RHCSA) | 3–6 |

El tráfico de marca crece antes que el genérico. Sin indexación no hay nada que medir: por eso la Fase A va primero.

---

## Cómo usar esto en Cursor

1. Adjuntar skill **`seo-sem-arceprog`** o **`astro-seo`**.
2. Pedir: "aplica ítem X de `docs/seo/plan-accion.md`" o "auditá arceprog.dev con curl".
3. Tras cambios: `npm run build`, verificar `dist/**/index.html` (canonical/hreflang) y actualizar la auditoría con fecha nueva.
