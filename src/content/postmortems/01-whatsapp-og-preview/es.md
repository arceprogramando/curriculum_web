---
title: "WhatsApp no mostraba la preview Open Graph"
description: "Postmortem: meses depurando OG en arceprog.dev (Meta Debugger, Astro, Vercel, imagen, head) cuando la causa era un ajuste de privacidad del celular."
excerpt: "El sitio cumplía Open Graph; WhatsApp no armaba la card. La causa era «Desactivar vistas previas de enlaces» en el teléfono."
date: 2026-11-10
locale: "es"
tags: ["whatsapp", "open-graph", "seo", "astro", "vercel", "postmortem"]
draft: false
severity: "high"
---

## Síntoma

Al pegar `https://arceprog.dev/` en WhatsApp:

- En el **celular**, la app se quedaba “esperando” la vista previa y **nunca** aparecía título, descripción ni imagen.
- En la **compu** (WhatsApp Desktop / Web vinculado) **ni siquiera** intentaba armar la card.
- En el **Sharing Debugger de Meta**, Microlink y revisores similares, los tags Open Graph **sí** se veían bien.

No era un caso de “imagen rota pero título sí”: era **cero preview**.

## Contexto

Portfolio estático en **Astro** desplegado en **Vercel** (`arceprog.dev`). Open Graph vive en el layout (`og:title`, `og:description`, `og:url`, `og:image`, etc.). El objetivo era compartir el sitio por WhatsApp con una card decente.

## Investigación (meses, varias herramientas e IA)

Se trató el problema como un fallo de metadata del sitio. Entre lo que se revisó y cambió:

1. **Meta Sharing Debugger** — warnings de scrape viejo (`www`), textos OG largos, falta de `fb:app_id`.
2. **Canonical / redirect** — `www` → apex con 308; `og:url` siempre en apex.
3. **Límites de texto** — `og:title` / `og:description` acortados para WA/FB/X.
4. **Imagen OG** — peso (~40 KB), 1200×630, JPEG y luego PNG con **nombre nuevo** (`og-wa.png`) para forzar crawl.
5. **Head hinchado** — ~53 KB de CSS *inline* en el `<head>`; se pasó a CSS externo (~6 KB de head).
6. **Vercel Firewall / Bot Protection** — Bot Protection **Inactive**; no bloqueaba crawlers.
7. **Astro vs Next** — se descartó el tip de Reddit de borrar `opengraph-image` / `generateMetadata` (eso es App Router de Next; Astro no tiene esa convención).
8. **Checklists** (p. ej. opengraphchecker.com) — tags absolutos HTTPS, imagen pública, HTML estático, TTFB bajo: todo OK en producción.

También se usaron asistentes de IA (varios modelos y enfoques) para hipótesis, diffs y re-scrapes. Cada pista “técnica del sitio” parecía plausible porque **Facebook y los checkers leían bien el HTML**.

## Qué sí estaba bien en el sitio

Antes de encontrar la causa real, el deploy ya cumplía lo esencial:

| Requisito | Estado |
|-----------|--------|
| `og:title`, `og:description`, `og:image`, `og:url`, `og:type` | Presentes |
| `og:site_name`, `og:image:alt` | Presentes |
| `og:image` absoluta HTTPS | `https://arceprog.dev/og-wa.png` |
| Imagen pública, PNG/JPEG liviano | ~43 KB, 200 OK |
| Metadata en HTML (no solo JS) | SSG Astro |
| Head liviano | ~6 KB tras sacar CSS inline |

Si un checker externo ve la card y WhatsApp no, el fallo suele estar **después** del HTML: caché de WA, cliente, o un setting del dispositivo.

## Causa raíz

En el celular, en la cuenta que **envía** el enlace:

**WhatsApp → Ajustes → Privacidad → Avanzada → “Desactivar vistas previas de enlaces”** estaba **activado**.

Con esa opción ON, WhatsApp **no genera** preview para los links que vos mandás (es una medida de privacidad ligada a no filtrar IP al crawlear la URL). No importa cuán perfectos estén los meta tags.

La compu (Web/Desktop vinculado) a menudo tampoco genera la card al componer; el test válido es el celular con previews habilitadas.

## Cómo verificar

1. Celular → Ajustes → Privacidad → Avanzada.
2. **Apagar** “Desactivar vistas previas de enlaces”.
3. Pegar `https://arceprog.dev/` (o `?wa=1` si querés forzar URL “nueva”).
4. Esperar ~10 s a que cargue la card **antes** de enviar.
5. Control: si `https://youtube.com` tampoco arma preview, el problema es la app/cuenta, no el sitio.

## Lecciones

1. **Empezar por el cliente**: un setting de privacidad puede anular meses de trabajo en OG.
2. **Separar capas**: HTML correcto (checker OK) ≠ WhatsApp muestra card (caché / setting / Desktop).
3. **La IA no ve el teléfono**: puede optimizar Astro, Vercel y Meta Debugger sin detectar un toggle en Privacidad → Avanzada.
4. **Documentar postmortems** evita repetir la misma cacería la próxima vez que “OG no funciona en WA”.

## Referencias útiles

- [Desactivar vistas previas — WhatsApp Help](https://faq.whatsapp.com/445453537819972/)
- [Link previews (docs Meta / WhatsApp)](https://developers.facebook.com/docs/whatsapp/link-previews/)
- Meta Sharing Debugger: `https://developers.facebook.com/tools/debug/`
