import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeExternalLinks } from './src/lib/rehype-external-links.mjs';

export default defineConfig({
  site: 'https://arceprog.dev',
  output: 'static',
  // Una sola URL por página (con barra final): coincide con sitemap, canonical y hreflang.
  // En Vercel, `trailingSlash: true` en vercel.json redirige (308) /en -> /en/.
  trailingSlash: 'always',
  compressHTML: true,
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
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
    }),
  ],
  image: {
    domains: ['avatars.githubusercontent.com'],
  },
  build: {
    inlineStylesheets: 'always',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    }
  }
});
