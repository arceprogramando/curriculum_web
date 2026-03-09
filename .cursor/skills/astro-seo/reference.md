# Astro SEO — Reference & Examples

## astro.config (sitemap + site)

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yoursite.com', // Required for canonical and sitemap URLs
  integrations: [sitemap()],
  output: 'static',
});
```

## robots.txt (public/)

```txt
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap-index.xml
```

## SEO Layout Component (meta + OG + Twitter)

```astro
---
// src/layouts/SeoHead.astro
interface Props {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
}

const { title, description, canonical, image, type = 'website' } = Astro.props;
const url = canonical ?? new URL(Astro.url.pathname, Astro.site).href;
const imageUrl = image ? new URL(image, Astro.site).href : new URL('/og-default.jpg', Astro.site).href;
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={url} />

<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={url} />
<meta property="og:type" content={type} />
<meta property="og:image" content={imageUrl} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={imageUrl} />
```

## Structured Data — Person (CV / About)

```astro
---
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Full Name',
  url: Astro.site?.href,
  jobTitle: 'Role',
  description: 'Short bio',
  sameAs: ['https://linkedin.com/...', 'https://github.com/...'],
};
---

<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />
```

## Structured Data — Article / BlogPosting

```astro
---
const { title, description, date, image, url } = Astro.props;
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  datePublished: date,
  url,
  image: image ?? undefined,
  author: { '@type': 'Person', name: 'Author Name' },
};
---

<script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
```

## Structured Data — BreadcrumbList

```astro
---
const items = [
  { name: 'Home', url: Astro.site?.href },
  { name: 'Blog', url: new URL('/blog', Astro.site).href },
  { name: 'Post Title', url: Astro.url.href },
];
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
};
---

<script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
```

## Structured Data — FAQPage

```astro
---
const faqs = [
  { q: 'Question 1?', a: 'Answer 1.' },
  { q: 'Question 2?', a: 'Answer 2.' },
];
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};
---

<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
```

## Image (LCP-friendly, no CLS)

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src={import('../assets/hero.jpg')}
  alt="Descriptive alt text"
  width={1200}
  height={630}
  loading="eager"
  fetchpriority="high"
/>
```

## Content collection frontmatter (SEO)

```yaml
# src/content/blog/post.md
title: Page title (for <title> and h1)
description: Meta description (150–160 chars)
pubDate: 2025-01-15
updatedDate: 2025-02-01
image: ./cover.jpg
```

Use in layout: `const { title, description, pubDate, image } = Astro.props` (from `getEntry` or collection query) and pass to SeoHead + Article schema.

## hreflang (multi-language)

In `<head>` for each locale:

```astro
<link rel="alternate" hreflang="es" href={urlEs} />
<link rel="alternate" hreflang="en" href={urlEn} />
<link rel="alternate" hreflang="x-default" href={urlDefault} />
```

Use absolute URLs; one set per page variant.
