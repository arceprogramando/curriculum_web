# Tipografía CV 2026 — arceprog.dev

## Qué recomiendan para IT / la mayoría de tus roles

| Fuente | Por qué | Cuándo |
|--------|---------|--------|
| **Calibri** | Estándar corporativo, densa, legible 10–11pt | Word / ATS clásico |
| **Aptos** | Default MS 365; tech / healthcare | Ecosistema Microsoft |
| **Arial / Helvetica** | Máxima compatibilidad ATS | Si priorizás “cero riesgo” |
| **Source Sans 3 / Inter / Roboto** | Sans modernas, buenas en pantalla y PDF web | Portfolios y “Save as PDF” del navegador |
| **Cambria / Garamond** | Serif formal | Academia / legal (menos típico en frontend) |

**Reglas compartidas (Microsoft, MIT CAPD, free-work, HubSpot):**

- Una sola familia (máx. dos).
- Cuerpo **10–12 pt**; nombre ~18–22 pt; títulos de sección ~12–14 pt.
- Una columna, sin tablas/gráficos para ATS.
- Evitar Comic Sans, scripts y mono para el cuerpo.

## Decisión en este sitio

Usamos **Source Sans 3** (Google Fonts, se incrusta al guardar PDF en Chrome) con fallback:

`Source Sans 3, Calibri, Arial, Helvetica, sans-serif`

Motivo: se ve moderna en web (como tus roles frontend/backend) y cae a Calibri/Arial si falla la fuente — las más citadas para ATS e IT en 2025–2026.

## Variantes de contenido

| Ruta | Enfoque |
|------|---------|
| `/cv/` | General FullStack |
| `/cv/frontend/` | React / RN / Next / UI |
| `/cv/backend/` | NestJS / Node / Postgres / APIs |
| `/cv/sysadmin/` | RHCSA / RHEL / bash / labs |

Mismas rutas bajo `/en/cv/...`.
