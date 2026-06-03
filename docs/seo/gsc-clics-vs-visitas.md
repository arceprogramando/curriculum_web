# Google Search Console: clics vs. “yo entré muchas veces”

**Sitio:** [arceprog.dev](https://arceprog.dev)  
**Fecha:** junio 2026

---

## Qué estás viendo en las capturas

1. **Estadísticas → “No hay clics en este periodo”**  
   Vista resumida; puede quedar vacía aunque en **Rendimiento** sí haya actividad dispersa.

2. **Descripción general → 9 clics (3 meses)**  
   Coincide con picos de 1–2 clics en días concretos (marzo–mayo 2026). Es tráfico **orgánico desde Google**, no visitas totales al sitio.

3. **Rendimiento → consulta `felipe arce`**  
   2 impresiones, 0 clics en el periodo filtrado: te mostraron el sitio en resultados, pero nadie (o casi nadie) hizo clic en ese intervalo.

4. **Indexación → 5 indexadas / 34 no indexadas**  
   Google conoce muchas URLs (sitemap + enlaces) pero **elige** indexar pocas; el resto puede ser “descubierta, no indexada”, duplicados es/en, o contenido considerado poco útil para búsqueda general.

---

## Por qué tus visitas no aparecen como clics

| Forma de entrar | ¿Suma en “Clics” de GSC? |
|-----------------|---------------------------|
| Escribir `arceprog.dev` en la barra | **No** |
| Favorito / historial | **No** |
| Enlace desde WhatsApp, Discord, CV en PDF | **No** |
| Preview de Vercel / localhost | **No** |
| Buscar en Google “felipe arce” y **pulsar** tu resultado | **Sí** |
| A veces: buscar en Google y abrir, pero GSC filtra tráfico del propietario | Puede **no** contarse |

Search Console **no es Google Analytics**. No mide sesiones ni usuarios; solo la relación **consulta → impresión → clic** en la búsqueda de Google.

---

## Qué hacer para interpretar bien

1. Usar **Rendimiento** (no solo Estadísticas), filtro **3 meses**, tipo **Web**.
2. Revisar **Consultas**, **Páginas** y **Países**.
3. Comparar con **Analytics** (si lo instalás) para visitas reales.
4. Tras publicar cambios: **Inspección de URL** → “Solicitar indexación” en `/` y `/en/`.

---

## Expectativa realista para este sitio

- Dominio relativamente **nuevo** y **de nicho** (portafolio + apuntes RHCSA).
- La consulta principal hoy es de **marca** (`felipe arce`), no volumen alto de “desarrollador full stack buenos aires”.
- **9 clics en 3 meses** no indica que el sitio esté “roto”; indica **poco tráfico orgánico**, coherente con un portfolio sin blog masivo ni backlinks.

Para crecer hace falta: indexar bien la home, reforzar marca, contenido útil enlazado desde la home y paciencia (semanas–meses), no solo entrar vos mismo al sitio.
