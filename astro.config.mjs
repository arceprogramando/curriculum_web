import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { rehypeExternalLinks } from './src/lib/rehype-external-links.mjs';

export default defineConfig({
  site: 'https://arceprog.dev',
  output: 'static',
  // Una sola URL por página (con barra final): coincide con sitemap, canonical y hreflang.
  // En Vercel, `trailingSlash: true` en vercel.json redirige (308) /en -> /en/.
  trailingSlash: 'always',
  compressHTML: true,
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeExternalLinks],
    }),
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-AR',
          en: 'en-US',
        },
      },
      // Indexar /crear-cv/; excluir vistas de impresión y CV por rol.
      filter: (page) => !page.includes('/cv/') && !page.includes('/crear-cv/vista'),
    }),
  ],
  image: {
    domains: ['avatars.githubusercontent.com'],
  },
  // 'auto' (no 'always'): head liviano para WhatsApp/Meta; CSS en /_astro/*.css
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    }
  }
});
