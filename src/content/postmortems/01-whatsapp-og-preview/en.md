---
title: "WhatsApp would not show the Open Graph preview"
description: "Postmortem: months debugging OG on arceprog.dev (Meta Debugger, Astro, Vercel, image, head) when the root cause was a phone privacy setting."
excerpt: "The site had valid Open Graph tags; WhatsApp never built the card. The cause was “Disable link previews” on the phone."
date: 2026-11-10
locale: "en"
tags: ["whatsapp", "open-graph", "seo", "astro", "vercel", "postmortem"]
draft: false
severity: "high"
---

## Symptom

When pasting `https://arceprog.dev/` into WhatsApp:

- On **mobile**, the app kept “waiting” for a link preview and **never** showed title, description, or image.
- On **desktop** (linked WhatsApp Desktop / Web) it often **did not even try** to build a card.
- In **Meta Sharing Debugger**, Microlink, and similar tools, Open Graph tags looked **fine**.

This was not “broken image but title works”: it was **no preview at all**.

## Context

Static **Astro** portfolio on **Vercel** (`arceprog.dev`). Open Graph lives in the layout (`og:title`, `og:description`, `og:url`, `og:image`, and related tags). The goal was a decent WhatsApp share card.

## Investigation (months, tools, and AI)

The issue was treated as a site-metadata bug. What was reviewed and changed included:

1. **Meta Sharing Debugger** — stale scrape (`www`), long OG copy, missing `fb:app_id`.
2. **Canonical / redirect** — `www` → apex with 308; `og:url` always on apex.
3. **Copy length** — shorter `og:title` / `og:description` for WA/FB/X truncation.
4. **OG image** — size (~40 KB), 1200×630, JPEG then PNG with a **new filename** (`og-wa.png`) to force a fresh crawl.
5. **Bloated head** — ~53 KB of *inline* CSS in `<head>`; moved CSS external (~6 KB head).
6. **Vercel Firewall / Bot Protection** — Bot Protection **Inactive**; not blocking crawlers.
7. **Astro vs Next** — discarded the Reddit tip to remove `opengraph-image` / `generateMetadata` (Next App Router only; Astro has no such convention).
8. **Checklists** (e.g. opengraphchecker.com) — absolute HTTPS tags, public image, static HTML, low TTFB: all OK in production.

Multiple AI assistants were used for hypotheses, diffs, and re-scrapes. Every “site-side” lead looked plausible because **Facebook and checkers already read the HTML correctly**.

## What was already correct on the site

Before the real root cause, production already met the essentials:

| Requirement | Status |
|-------------|--------|
| `og:title`, `og:description`, `og:image`, `og:url`, `og:type` | Present |
| `og:site_name`, `og:image:alt` | Present |
| Absolute HTTPS `og:image` | `https://arceprog.dev/og-wa.png` |
| Public lightweight PNG/JPEG | ~43 KB, 200 OK |
| Metadata in HTML (not JS-only) | Astro SSG |
| Lean head | ~6 KB after removing inline CSS |

If an external checker shows the card and WhatsApp does not, the failure is usually **after** HTML: WA cache, client behavior, or a device setting.

## Root cause

On the phone, for the account that **sends** the link:

**WhatsApp → Settings → Privacy → Advanced → “Disable link previews”** was **turned on**.

With that option ON, WhatsApp **does not generate** previews for links you send (a privacy measure related to not leaking IP while crawling the URL). Perfect meta tags do not matter.

Desktop/Web often does not compose previews the same way; the valid test is mobile with previews enabled.

## How to verify

1. Phone → Settings → Privacy → Advanced.
2. **Turn off** “Disable link previews”.
3. Paste `https://arceprog.dev/` (or `?wa=1` for a “new” URL).
4. Wait ~10 s for the card **before** sending.
5. Control: if `https://youtube.com` also never previews, it is the app/account, not the site.

## Lessons

1. **Start with the client**: one privacy toggle can erase months of OG work.
2. **Separate layers**: correct HTML (checker OK) ≠ WhatsApp shows a card (cache / setting / Desktop).
3. **AI cannot see the phone**: it can tune Astro, Vercel, and Meta Debugger without noticing Privacy → Advanced.
4. **Write postmortems** so the next “OG broken on WA” chase starts with the client checklist.

## Useful references

- [Disable link previews — WhatsApp Help](https://faq.whatsapp.com/445453537819972/)
- [Link previews (Meta / WhatsApp docs)](https://developers.facebook.com/docs/whatsapp/link-previews/)
- Meta Sharing Debugger: `https://developers.facebook.com/tools/debug/`
