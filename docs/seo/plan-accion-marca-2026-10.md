# Plan de acción — arceprog.dev (octubre 2026)

**Objetivos confirmados:** empleo + freelance + marca técnica.  
**Público:** mezcla ES/EN (reclutadores, empresas, peers).  
**IELTS:** sigue en futuro (no priorizar indexación).  
**Ads:** no hay presupuesto; solo escenario orgánico + Ads de marca si más adelante hay € mínimos.  
**Rama de trabajo:** `feat/cv-pdf-dinamico` (y siguientes features de marca en ramas aparte).

---

## Cómo revisar GSC y el redirect `www` (punto 4)

```bash
curl -sI https://www.arceprog.dev/ | head -n 3
# Esperado: HTTP/1.1 308  (si ves 307, en Vercel → Domains → www → Redirect 308)

curl -sI https://arceprog.dev/sitemap-index.xml | head -n 1
# Esperado: 200
```

En [Google Search Console](https://search.google.com/search-console):

1. Propiedad preferida: **Dominio** `arceprog.dev` (cubre www y apex).
2. Sitemaps → enviar `https://arceprog.dev/sitemap-index.xml`.
3. Páginas → anotar cuántas **indexadas** / **no indexadas** y el motivo top.
4. Inspección de URL → `/` y `/en/` → Solicitar indexación tras fixes.

---

## Roadmap priorizado

### Ahora (esta rama) — CV dinámico de 1 hoja

- [x] Página `/cv/` y `/en/cv/` generada desde el modelo de impresión (datos al día).
- [x] Layout tipo el PDF de junio 2026 (header, historial, formación, skills).
- [x] Contenido **actualizado** (America Virtual, CUI N7, Red Hat, UTN, UNLaM).
- [x] Botón CV + Ctrl+P abren esa vista e imprimen / “Guardar como PDF”.
- [x] Nombre de archivo con fecha vía `document.title`.
- [x] `/cv/` fuera del sitemap + `noindex`.
- [x] Variantes por rol: `/cv/frontend/`, `/cv/backend/`, `/cv/sysadmin/` (+ `/en/cv/...`).
- [x] Tipografía Source Sans 3 + fallbacks Calibri/Arial (recomendación IT/ATS 2026).

### Semana 1–2 — Canónica y medición

- [ ] Confirmar `www` → apex **308** en Vercel.
- [ ] Propiedad Dominio GSC + reenviar sitemap.
- [ ] (Opcional) Plausible o GA4 con eventos: `cv_print`, `mailto`, `linkedin`, `whatsapp`.

### Semana 2–4 — Marca y Open Graph

- [ ] Revisar `og:title` / `og:description` / `portada-og.png` (ES y EN).
- [ ] Unificar title “SSR” si ya no es la señal de marca.
- [ ] LinkedIn / GitHub con `https://arceprog.dev/` (sin www).

### 1–3 meses — Contenido orgánico

- [ ] IELTS: mantener `noindex` o fuera del sitemap hasta contenido real.
- [ ] 1–2 artículos RHCSA “públicos” (checklist / troubleshooting).
- [ ] Enlace “siguiente módulo” en labs.
- [ ] Índice sticky en el portfolio (navegación > animación).

### Ads (solo si más adelante hay presupuesto)

| Tipo | Cuándo | Landing |
|------|--------|---------|
| **Marca** (`felipe arce`, `arceprog`) | Si alguien puja por tu nombre o querés proteger marca | `/` o `/en/` |
| Genérico “desarrollador fullstack” | **No** al inicio: CPC alto, CV no convierte como landing de producto | — |

Orgánico primero. Ads de marca es el único SEM que suele tener sentido en un portfolio personal.

---

## KPIs realistas

| Métrica | 4 semanas | 3 meses |
|---------|-----------|---------|
| URLs indexadas | 6–12 | 15–25 |
| Clics GSC / mes | 3–10 | 10–30 |
| Consultas de marca | `felipe arce` | + `arceprog` |
| PDF / print | Misma info que la web | — |

---

## Fuera de alcance ahora

- Regenerar a mano el PDF estático de `public/` como fuente de verdad (queda de respaldo).
- Campañas genéricas Google Ads.
- Contenido IELTS indexable.
- Chatbots / features de moda sin medición.
