import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.arceprog.dev',
  compressHTML: true,
  integrations: [sitemap()],
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
