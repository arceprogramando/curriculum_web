# Plan de acción SEO / SEM — arceprog.dev

**Actualizado:** 3 de junio de 2026  
**Estado del sitio en GSC:** ~9 clics orgánicos / 3 meses; 5 URLs indexadas; 34 no indexadas.

---

## Fase 0 — Hoy (sin código o ya hecho)

- [x] Documentar GSC vs visitas → [gsc-clics-vs-visitas.md](./gsc-clics-vs-visitas.md)
- [x] Auditoría → [auditoria-arceprog-dev-2026-06.md](./auditoria-arceprog-dev-2026-06.md)
- [x] Skill Cursor `seo-sem-arceprog`
- [x] Corregir hreflang HTML (`es-AR` / `en-US`)
- [ ] **Deploy** a Vercel (títulos EN, PDFs CV, hreflang)
- [ ] GSC → **Sitemaps** → `https://arceprog.dev/sitemap-index.xml` (Enviar / volver a enviar)
- [ ] GSC → **Inspección de URL** → Solicitar indexación: `/`, `/en/`, `/rhcsa-ex200/`

---

## Fase 1 — Esta semana (repo)

| Prioridad | Tarea | Archivo / lugar |
|-----------|--------|-----------------|
| Alta | Publicar deploy con cambios pendientes | Vercel |
| Alta | Verificar sitemap 200 post-deploy | `curl -sI https://arceprog.dev/sitemap-index.xml` |
| Media | Unificar título ES (ej. quitar “SSR” si ya no aplica) | `cv.json`, `i18n.ts` |
| Media | `description` + `excerpt` únicos por módulo RHCSA | `src/content/rhcsa/**/es.md`, `en.md` |
| Media | Enlace “siguiente módulo” al pie de cada artículo RHCSA | páginas `[slug].astro` o markdown |
| Baja | `draft: true` en IELTS hasta contenido real | `src/content/ielts/**` |

---

## Fase 2 — 2–4 semanas (contenido + off-page)

| Tarea | Objetivo |
|-------|----------|
| 1 artículo RHCSA “público” (FAQ, troubleshooting común) | Long-tail técnico |
| LinkedIn: post con enlace a un módulo indexable | Backlink + rastreo |
| Revisar GSC → Páginas → “No indexadas” → motivo Google | Ajustar según razón |
| Opcional: GA4 | Medir visitas reales vs clics GSC |

---

## Fase 3 — SEM pagado (solo si lo pedís)

- Definir objetivo: contratación, freelance, marca personal.
- Landing: home EN o ES según público.
- No implementar píxeles/Ads en el repo sin requisito explícito.

---

## KPIs razonables (portfolio personal)

| Métrica | 3 meses | 6 meses |
|---------|---------|---------|
| Clics GSC | 15–30 | 40–80 |
| Páginas indexadas | 8–15 | 15–25 |
| Consultas de marca | Estables | + variantes “arceprog” |
| Consultas genéricas | 0–2 | 2–5 (si hay contenido) |

Los números son orientativos; el tráfico de marca crece antes que el genérico.

---

## Cómo usar esto en Cursor

1. Adjuntar skill **`seo-sem-arceprog`** o **`astro-seo`**.
2. Pedir: “aplica ítem X del plan en `docs/seo/plan-accion.md`”.
3. Tras cambios: `npm run build` y actualizar la auditoría con fecha nueva.
