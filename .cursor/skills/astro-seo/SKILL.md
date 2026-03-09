---
name: astro-seo
description: Audits and optimizes SEO for Astro sites. Covers technical SEO (robots.txt, sitemap, canonicals, meta, OpenGraph, hreflang), Core Web Vitals, structured data (schema.org), content structure, internal linking, and Astro-specific patterns (SSG, islands, hydration). Use when auditing SEO, improving Astro site visibility, implementing structured data, or optimizing for Google and AI search.
---

# Astro Technical SEO

Senior Technical SEO perspective for Astro (2024–2026). Prioritize: technical SEO, site architecture, performance, structured data, content structure, internal linking, indexability.

## When to Apply

- User asks for SEO audit, technical SEO, or search optimization
- Working on Astro meta tags, sitemap, robots, or structured data
- Improving Core Web Vitals or crawlability
- Planning content architecture or internal links

## Technical SEO Checklist

| Item | Action |
|------|--------|
| **robots.txt** | Allow crawlers; point to sitemap URL |
| **sitemap.xml** | Use `@astrojs/sitemap`; include all indexable URLs |
| **Canonical** | One canonical per page; absolute URL |
| **Meta** | Unique `title` (50–60 chars), `description` (150–160 chars) per page |
| **OpenGraph** | `og:title`, `og:description`, `og:image`, `og:url`, `og:type` |
| **Twitter** | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` |
| **hreflang** | If multi-language: alternate URLs per locale |

## Astro-Specific

- **Output**: Prefer `output: 'static'` for SSG when possible; better crawlability and performance.
- **Content collections**: Use for blog/docs; consistent frontmatter (title, description, date) for SEO.
- **Dynamic routes**: Ensure all variants generate canonical URLs and meta; avoid duplicate content.
- **Islands**: Hydrate only what’s needed; minimal JS improves LCP/INP and crawlability.
- **HTML**: Prefer semantic tags (`<article>`, `<section>`, `<nav>`, heading hierarchy).
- **SSR vs SSG**: SSG = faster, cacheable; use SSR only when content must be dynamic per request.

## Performance (SEO Impact)

- **LCP**: Optimize hero image (size, format, priority load); reduce render-blocking.
- **CLS**: Reserve space for images/ads; avoid layout shifts.
- **INP**: Minimize main-thread work; defer non-critical JS.
- **Bundle**: Code-split; lazy-load below-fold components.
- **Images**: Use `astro:assets` or responsive images; `width`/`height` to avoid CLS; consider `loading="lazy"` for below-fold.
- **Fonts**: Preload critical font; `font-display: swap` or optional.

## Structured Data (schema.org)

Use JSON-LD in `<script type="application/ld+json">`. Prefer one top-level type per page.

| Page type | Schema type |
|-----------|-------------|
| Person / CV / About | `Person` (and optionally `WebSite`) |
| Article / post | `Article` or `BlogPosting` |
| Org / company | `Organization` |
| Product page | `Product` |
| FAQ section | `FAQPage` |
| Navigation context | `BreadcrumbList` |

Keep payloads valid (test with Google Rich Results Test). For details and examples see [reference.md](reference.md).

## Content SEO

- **Headings**: Single `h1` per page; logical order `h1` → `h2` → `h3`.
- **Semantic HTML**: Use `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`.
- **Keywords**: Align title, description, and main headings with target queries; avoid stuffing.
- **Entities**: Use clear, consistent naming (person, org, topics) for entity-based and AI search.

## Internal Linking

- Link from high-authority pages (home, pillars) to important inner pages.
- Use descriptive anchor text (avoid “click here”).
- Keep crawl depth low (important pages within 2–3 clicks from home).
- Consider pillar pages + topic clusters for topical authority.

## Astro Tooling

- **Sitemap**: `@astrojs/sitemap` in `astro.config.mjs`; set `site` for correct absolute URLs.
- **robots.txt**: Either static `public/robots.txt` or generate via integration; include `Sitemap: https://yoursite.com/sitemap-index.xml`.
- **Meta/OG**: Centralize in a layout or `<head>` component; pass `title`, `description`, `image`, `canonical` as props.

## Output Expectations

When improving SEO in an Astro project, provide:

1. **Actionable list**: Prioritized changes (e.g. “Add canonical”, “Fix h1 hierarchy”).
2. **Astro code**: Components or config snippets (layout with meta, JSON-LD block, sitemap config).
3. **Config**: `astro.config` changes if needed (site, sitemap, integrations).
4. **Structure**: File/layout recommendations (e.g. single SEO layout, content collection frontmatter).
5. **Automation**: Ideas for reusing meta and structured data from frontmatter or CMS.

Priorities: fast load, crawlable structure, semantic HTML, clear information architecture.

## Additional Resources

- Extended structured data examples and Astro snippets: [reference.md](reference.md)
