# Auditoría SEO — Portafolio Astro (arceprog.dev)

**Fecha:** Marzo 2025  
**Alcance:** SEO técnico, performance, Astro, structured data, arquitectura, sitemap y recomendaciones 2025–2026.

---

## Resumen ejecutivo

El proyecto tiene una **base SEO sólida**: canonical, hreflang, meta tags, OpenGraph, Twitter Cards, Person/WebSite/BreadcrumbList y sitemap con i18n. Se aplicaron correcciones de **viewport**, **meta duplicado** y **prioridad LCP** en la imagen del Hero. Abajo: problemas detectados, impacto, cómo corregirlos y mejoras sugeridas.

---

## 1. SEO técnico

### 1.1 Meta tags (title, description)

| Aspecto | Estado | Notas |
|--------|--------|--------|
| **Title** | ✅ | Único por idioma, ~42–44 caracteres (dentro de 50–60). |
| **Description** | ✅ | ~120–130 caracteres por idioma (dentro de 150–160). |
| **keywords** | ✅ | Presente y coherente con el contenido. |

**Mejora sugerida (bajo impacto):** Si en el futuro añades más páginas, define `title` y `description` por ruta (layout o frontmatter) para evitar duplicados.

---

### 1.2 Canonical URLs

| Aspecto | Estado |
|--------|--------|
| **Canonical** | ✅ Una canonical por página (`canonicalUrl` en Layout). |
| **Formato** | ✅ URL absoluta `https://arceprog.dev` + path. |

Sin cambios necesarios.

---

### 1.3 robots.txt

| Aspecto | Estado |
|--------|--------|
| **Archivo** | ✅ `public/robots.txt` existe. |
| **Allow** | ✅ `User-agent: *` + `Allow: /`. |
| **Sitemap** | ✅ `Sitemap: https://arceprog.dev/sitemap-index.xml`. |

Sin cambios necesarios.

---

### 1.4 Sitemap (@astrojs/sitemap)

| Aspecto | Estado |
|--------|--------|
| **Integración** | ✅ `@astrojs/sitemap` en `astro.config.mjs`. |
| **site** | ✅ `site: 'https://arceprog.dev'`. |
| **i18n** | ✅ Locales `es` / `en` con códigos `es-AR` y `en-US`. |

El sitemap se genera en build; las URLs `/` y `/en/` quedan incluidas. Sin cambios necesarios.

---

### 1.5 Indexabilidad

| Aspecto | Estado |
|--------|--------|
| **Meta robots** | ✅ `index, follow` en Layout. |
| **Estructura** | ✅ Una página por idioma, sin rutas bloqueadas. |

Sin cambios necesarios.

---

### 1.6 Estructura HTML semántica

| Aspecto | Estado |
|--------|--------|
| **Página** | ✅ `<main>` en `index.astro` / `en/index.astro`. |
| **Secciones** | ✅ `<section>` en `Section.astro`. |
| **Contenido** | ✅ `<article>`, `<header>`, `<footer>`, `<time>` en Experience, Projects, Education. |

Sin cambios necesarios.

---

### 1.7 Jerarquía de headings (h1–h6)

| Nivel | Uso actual |
|-------|------------|
| **h1** | Una vez: nombre en Hero. ✅ |
| **h2** | Títulos de sección (About, Experience, Projects, Education, etc.) desde `Section.astro`. ✅ |
| **h3** | Empresas (Experience), instituciones (Education), proyectos (Projects). ✅ |
| **h4** | Cargos/posiciones en Experience. ✅ |

Jerarquía correcta (h1 → h2 → h3 → h4). Sin cambios necesarios.

---

### 1.8 Problemas corregidos en esta auditoría

| Problema | Impacto | Corrección aplicada |
|----------|---------|----------------------|
| **Viewport sin `initial-scale=1`** | Medio (móvil, CWV) | Añadido `initial-scale=1` en Layout. |
| **Meta `google-site-verification` duplicado** | Bajo | Eliminado el duplicado en Layout. |

---

## 2. Performance SEO (Core Web Vitals y recursos)

### 2.1 LCP (Largest Contentful Paint)

| Aspecto | Estado |
|--------|--------|
| **Imagen LCP** | Avatar en Hero (primer contenido destacado). |
| **Preload** | ✅ `preload` del avatar en Layout. |
| **Prioridad** | ✅ Añadido `fetchpriority="high"` en la imagen del Hero. |
| **Dimensiones** | ✅ `width`/`height` definidos (128×128), evita CLS. |

**Mejora sugerida (opcional):** Preload solo la imagen del Hero (LCP) y no la de OG en todas las páginas, para no competir por ancho de banda:

```astro
<!-- En Layout.astro: preload solo la imagen LCP (avatar), no portada-og en todas las páginas -->
<link rel="preload" as="image" href={image} fetchpriority="high" />
<!-- portada-og.png: los crawlers de redes la piden al compartir; no hace falta preload en head -->
```

Puedes dejar solo el preload del avatar y quitar el preload de `portada-og.png` si quieres priorizar aún más el LCP.

---

### 2.2 CLS (Cumulative Layout Shift)

- Imágenes con `width`/`height` en Hero.
- Uso de `astro:assets` con dimensiones.
- Contenedores con estilos que evitan saltos.

Sin problemas detectados.

---

### 2.3 INP (Interaction to Next Paint)

- `KeyboardManager.astro` usa un `<script>` sin `client:`. El JS se ejecuta en el cliente pero no hay hidratación de islas Astro; el coste es limitado.
- **Recomendación:** Mantener la lógica actual. Si más adelante añades más interactividad, usar `client:idle` o `client:visible` donde sea posible para seguir con poco JS en el primer paint.

---

### 2.4 Bundle y CSS

| Aspecto | Estado |
|--------|--------|
| **compressHTML** | ✅ `true` en config. |
| **inlineStylesheets** | ✅ `always` (reduce peticiones críticas). |
| **cssCodeSplit** | `false` en Vite: un solo CSS. Aceptable en un sitio pequeño. |

Para un portafolio de una sola página el tamaño es adecuado. Si el CSS crece, valorar `cssCodeSplit: true` y cargar estilos no críticos de forma diferida.

---

### 2.5 Fuentes

- Uso de fuentes del sistema (Menlo, system-ui, etc.) en Layout.
- No hay `@font-face` ni fuentes externas, por lo que no hay FOUT/FOIT que afecte a CWV.

Sin cambios necesarios.

---

### 2.6 Lazy loading

- Hero: `loading="eager"` y `fetchpriority="high"` (correcto para LCP).
- No hay muchas imágenes; si en el futuro añades más (por ejemplo en Projects), usar `loading="lazy"` para las que estén below the fold.

---

## 3. SEO específico para Astro

### 3.1 Layouts

- Un solo layout (`Layout.astro`) con meta, canonical, hreflang, OG, Twitter y structured data.
- Todas las páginas usan ese layout.

Correcto.

---

### 3.2 Generación estática (SSG)

- **Corrección aplicada:** Añadido `output: 'static'` en `astro.config.mjs` para dejar explícito el modo SSG (por defecto sin adapter, pero recomendado para SEO y claridad).

---

### 3.3 Rutas dinámicas

- No hay rutas dinámicas; solo `index.astro` (es) y `en/index.astro` (en).
- Sin riesgo de contenido duplicado ni canonicals incorrectos.

---

### 3.4 Calidad del HTML generado

- `compressHTML: true`.
- DOCTYPE, `lang` en `<html>`, estructura semántica correcta.

Sin cambios necesarios.

---

### 3.5 Islands / hidratación

- No se usa `client:load` / `client:idle` en componentes.
- El único JS significativo es el script inline de `KeyboardManager.astro` (hotkeypad).
- Contenido principal 100 % estático en el HTML, bueno para crawlability y LCP.

Sin cambios necesarios.

---

## 4. Structured data (schema.org)

### 4.1 Implementado

| Schema | Uso |
|--------|-----|
| **Person** | ✅ Nombre, jobTitle, url, image, description, knowsAbout, knowsLanguage, alumniOf, hasCredential, worksFor, sameAs, email, address. |
| **WebSite** | ✅ name, url, inLanguage, author, dateModified. |
| **BreadcrumbList** | ✅ Un ítem (Inicio/Home), coherente con sitio de una sola página. |

---

### 4.2 Mejora sugerida (opcional)

- **Person.image:** Ahora apunta a `portada-og.png` (banner). Para Person, schema.org suele esperar una foto de la persona. Puedes usar la misma imagen del avatar del Hero (por ejemplo la URL de GitHub que ya usas) en el schema Person y dejar `og:image` / Twitter con `portada-og.png` para redes.

Ejemplo en `Layout.astro`:

```astro
// En el schema Person, cambiar "image" a la foto de perfil (avatar):
"image": {
  "@type": "ImageObject",
  "url": image,  // variable que ya tienes (avatar)
  "width": 128,
  "height": 128
},
```

Impacto: bajo; mejora la coherencia del gráfico de conocimiento.

---

### 4.3 Article / Blog

- No hay blog; no aplica Article/BlogPosting por ahora. Si añades blog, usar `BlogPosting` por entrada y enlazar al Person como author.

---

## 5. Arquitectura del sitio

### 5.1 Enlazado interno

- Sitio de una página: enlaces internos relevantes son el selector de idioma (`/` ↔ `/en/`).
- Enlaces bien puestos y con `href` correctos.

Adecuado para el tamaño actual.

---

### 5.2 Profundidad de navegación

- Todo el contenido está a 1 clic (raíz o `/en/`).
- Profundidad mínima, buena para crawling.

---

### 5.3 Estructura de URLs y slugs

- `/` para español (locale por defecto).
- `/en/` para inglés.
- Coherente con `i18n.routing.prefixDefaultLocale: false`.

Sin cambios necesarios.

---

## 6. Sitemap y crawling

- **Sitemap:** Generado por `@astrojs/sitemap` con `site` e i18n.
- **robots.txt:** Apunta a `https://arceprog.dev/sitemap-index.xml`.
- Tras cada build, el sitemap incluye las URLs generadas.

Correcto.

---

## 7. Recomendaciones SEO 2025–2026

1. **Búsqueda semántica y entidades:** Mantener Person y WebSite bien rellenados y actualizar `worksFor` / `hasCredential` si cambias de trabajo o estudios.
2. **Experiencia en la página:** Core Web Vitals ya están bien cuidados; seguir con poco JS en el primer carga y imágenes con dimensiones.
3. **Datos estructurados:** Opcional: imagen de Person = avatar; considerar FAQPage si añades una sección de preguntas frecuentes.
4. **Móvil:** Viewport con `initial-scale=1` ya aplicado.
5. **Si añades más páginas (por ejemplo blog):**  
   - Canonical y meta por página.  
   - BreadcrumbList con más niveles.  
   - Article/BlogPosting por entrada.  
   - Internal links desde la home a las entradas.

---

## Resumen de cambios aplicados en código

| Archivo | Cambio |
|---------|--------|
| `src/layouts/Layout.astro` | Viewport con `initial-scale=1`; eliminado meta `google-site-verification` duplicado. |
| `src/components/sections/Hero.astro` | Añadido `fetchpriority="high"` a la imagen del Hero (LCP). |
| `astro.config.mjs` | Añadido `output: 'static'`. |

---

## Checklist post-auditoría

- [x] Viewport con `initial-scale=1`
- [x] Un solo meta google-site-verification
- [x] LCP: fetchpriority en imagen principal
- [x] output: 'static' explícito
- [ ] (Opcional) Preload solo avatar; quitar preload de portada-og
- [ ] (Opcional) Person.image = avatar en schema
- [ ] (Futuro) Si hay blog: Article, BreadcrumbList ampliado, canonicals por página
