# Meta Sharing Debugger — arceprog.dev

**Última revisión:** noviembre 2026 (captura con scrape del 12 feb 2025).

## Hallazgos del debugger

| Problema | Causa | Estado en código |
|----------|--------|------------------|
| Falta `fb:app_id` | Meta lo marca como obligatorio | Opcional vía `PUBLIC_FB_APP_ID` en Vercel (layouts) |
| Canonical / `og:url` con `www` | Scrape viejo (feb 2025) | Hoy: apex `https://arceprog.dev/` + redirect 308 `www` → apex |
| Título/descripción cortados en preview | `og:title` / `og:description` largos | Acortados en `src/lib/i18n.ts` (ES/EN) |
| `og:image:alt` mezclado con crear-cv | Caché del scraper | Alt unificado: `{ogTitle} \| arceprog.dev` |
| Response 206 | Range request del scraper de Meta | Normal en estáticos; no bloquea preview |

## WhatsApp sin preview (FB sí / WA no)

Causas frecuentes en foros y docs Meta:

- Caché de WhatsApp **sin** API de refresh (probar `https://arceprog.dev/?wa=1`).
- `og:image` con `?v=` o PNG problemático → usamos **`/og-card.jpg`** limpio (&lt;300 KB).
- Previews desactivadas en el cliente (Ajustes → Privacidad → Avanzado).
- Pegar y enviar antes de ~10 s (WA necesita crawlear antes del send).

## Qué hacer tras deploy

1. En Vercel → Environment Variables: `PUBLIC_FB_APP_ID` = ID de tu app en [developers.facebook.com](https://developers.facebook.com/) (crear app tipo “Negocios” / sitio web si no tenés una).
2. Redeploy para que Astro inyecte `<meta property="fb:app_id" …>`.
3. Abrir [Sharing Debugger](https://developers.facebook.com/tools/debug/) con **`https://arceprog.dev/`** (sin `www`).
4. Pulsar **Volver a extraer** hasta ver títulos cortos, `og:url` apex, `og:image` = `/og-card.jpg` y `fb:app_id` si está configurado.
5. En WhatsApp probar **`https://arceprog.dev/?wa=1`** (URL nueva fuerza crawl).

## Límites prácticos (WA / FB / X)

- `og:title`: ~40–60 caracteres visibles.
- `og:description`: ~70–100 en móvil (Facebook puede mostrar más en desktop).
- `meta description` (Google): ~150–160 — no mezclar con OG.
