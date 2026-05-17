---
name: git-branches-commits
description: >-
  Guía nombres de rama y mensajes de commit (Conventional Commits) para el repo
  curriculum_web: Astro 6, sitio estático, colecciones Markdown RHCSA/IELTS en src/content,
  páginas y componentes en src/pages y src/components. Usar cuando pidan rama, mensaje de
  commit, convención git, o ayuda con push/PR en este proyecto.
---

# Ramas y commits — curriculum_web

Sitio estático con **Astro 6**, CV bilingüe, blog/guías en **`src/content/`** (colecciones `rhcsa`, `ielts` con carpetas `NN-slug/es.md` y `en.md`), rutas en **`src/pages/`**, UI en **`src/components/`**, **`src/layouts/`**, i18n en **`src/lib/i18n.ts`**, slugs URL en **`src/lib/content-entry.ts`**.

## Cuándo usar este skill

- Piden **nombre de rama** o **mensaje de commit**.
- Piden ayuda con push, PR o convenciones git **en este repo**.
- Hay cambios mezclados y conviene **separar commits** por tipo de cambio (ver abajo).

---

## Formato de salida (para copiar)

- **Rama:** siempre como comando listo:
  ```bash
  git checkout -b feat/descripcion-corta
  ```
- **Commits:** devolver **solo** comandos `git commit` (no `git add` salvo que lo pidan explícito).
- **Asunto:** máximo **50 caracteres**; detalle extra en **cuerpo** con segundo `-m` (o varios `-m` si hace falta).
- **Líneas del cuerpo:** mantener cada línea del cuerpo razonablemente corta (p. ej. ≤120 caracteres) para legibilidad en `git log` y revisión.

```bash
git commit -m "tipo: descripción corta" -m "Contexto o detalle adicional."
```

---

## Dos capas en este proyecto (sustituye backend/frontend)

No hay backend aparte: todo es SSG. Cuando en **un mismo cambio** tocan **contenido Markdown** en colecciones **y** código/layout del sitio, proponer **dos commits separados** y marcar bloques:

| Etiqueta    | Qué incluye |
|------------|-------------|
| **`#content`** | Solo `src/content/**` (p. ej. `rhcsa/04-rh134-declarative/es.md`). |
| **`#site`**    | `src/pages/**`, `src/components/**`, `src/layouts/**`, `src/lib/**`, `astro.config.*`, `src/content.config.ts`, estilos globales del proyecto. |

Ejemplo de salida:

```text
#content
```

```bash
git commit -m "docs(rhcsa): notas systemd y enlaces rol"
```

```text
#site
```

```bash
git commit -m "fix(layout): canonical en listado rhcsa-ex200"
```

Si el cambio es **solo** contenido o **solo** sitio, **un commit** basta (sin forzar dos).

---

## Nombres de rama

- **Prefijo:** **`feat`**, no `feature`.
- **Formato:** `tipo/descripcion-corta-en-minusculas`.
- Tipos: `feat`, `fix`, `docs`, `refactor`, `chore`.

**Ejemplos adaptados al proyecto:**

| Cambio | Rama sugerida |
|--------|----------------|
| Nueva sección o página Astro | `feat/ielts-practice-index` |
| Contenido nuevo solo en markdown | `docs/rhcsa-usuarios-permisos` |
| Corrección de bug en rutas o i18n | `fix/language-selector-path` |
| SEO / meta / Layout | `feat/seo-blogposting-schema` |
| chore deps Astro | `chore/astro-patch` |

---

## Mensajes de commit (Conventional Commits)

- **Formato:** `tipo: descripción en minúsculas`.
- **Sin scope entre paréntesis** en el asunto (evitar `feat(seo): ...`); si hace falta matizar, usar el cuerpo.
- Tipos: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`, `style`.

**Ejemplos (asunto ≤50 caracteres):**

| Contexto | Commit |
|----------|--------|
| Entrada nueva RHCSA en markdown | `docs: articulo rhcsa storage y enlaces lms` |
| Mejora UI listado módulos | `feat: contraste tarjetas rhcsa e ielts` |
| Fix selector idioma | `fix: conservar ruta al cambiar locale` |
| Solo `package.json` / lockfile | `chore: actualiza dependencias astro` |

**Evitar:** paréntesis en la descripción (`fix: algo (astro)`).

---

## Antes de abrir PR (opcional)

Conviene **`npm run build`** local si hubo cambios en páginas, colecciones o `content.config.ts`.

---

## Resumen rápido

| Qué | Regla |
|-----|--------|
| Rama | `tipo/descripcion`; prefijo `feat` no `feature`; comando `git checkout -b ...` |
| Commits sugeridos | Solo `git commit`; sin `git add` salvo pedido |
| Cambio mixto content + sitio | Dos commits etiquetados `#content` y `#site` |
| Asunto | ≤50 caracteres; más texto en `-m` adicional |
| Estilo | `tipo: mensaje` sin paréntesis tipo scope |
