# Bing Webmaster — alertas Topic Portfolio (nov 2026)

Respuesta a las alertas de Bing para `arceprog.dev` tras revisar AI Performance y SEO clásico.

## Qué se arregló en el repo

| Alerta | Acción |
|--------|--------|
| **IndexNow no configurado** | Clave en `public/RosTqGG9WFFJNd-9mi4YzPJwClJqYFqt.txt`. Tras el build, `postbuild` llama a `scripts/submit-indexnow.mjs` solo si `VERCEL_ENV=production` (o `INDEXNOW_SUBMIT=1` / `npm run indexnow -- --force`). |
| **Meta descriptions demasiado cortas** | Home, índices RHCSA/IELTS e i18n, y frontmatter de módulos RHCSA 01–10 + IELTS, ajustados a **150–160** caracteres. |
| **Páginas con noindex** | **Intencional.** `/cv/` y `/crear-cv/` usan `noindex, nofollow` (`CvPrintShell`) y están fuera del sitemap (`astro.config.mjs` filter). No indexar borradores ni vistas de impresión. |
| **Backlinks / citas AI** | Fuera del código: outreach, perfiles LinkedIn/GitHub y contenido citado. No hay cambio de repo. |

## Verificación post-deploy

```bash
curl -s https://arceprog.dev/RosTqGG9WFFJNd-9mi4YzPJwClJqYFqt.txt
# debe devolver exactamente la clave

# Forzar envío (útil la primera vez o tras un lote grande de URLs nuevas)
npm run build && npm run indexnow
```

En Bing Webmaster → IndexNow / URL Submission, confirmar recepción tras el primer deploy de producción.

## AI Performance (contexto)

Las citas de Bing Copilot / AI no se “fuerzan” con IndexNow. IndexNow acelera el **rastreo** de URLs nuevas o actualizadas. Las citas dependen de contenido útil (labs RHCSA EN, UTN, PDF CV) ya visibles en el informe de AI Performance.
