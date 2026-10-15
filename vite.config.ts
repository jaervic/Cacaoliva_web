import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

/**
 * URL pública del sitio: única fuente de verdad.
 * Se puede sobrescribir con la variable de entorno VITE_SITE_URL
 * (en Vercel: Settings → Environment Variables).
 */
const SITE_URL = (process.env.VITE_SITE_URL || 'https://cacaoliva-project.vercel.app')
  .trim()
  .replace(/\/+$/, '');

/** Reemplaza %SITE_URL% en index.html por la URL pública. */
function htmlSiteUrl(): Plugin {
  return {
    name: 'html-site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', SITE_URL);
    },
  };
}

/** Genera robots.txt y sitemap.xml en el build con la URL correcta. */
function seoFiles(): Plugin {
  let outDir = path.join(root, 'dist');
  return {
    name: 'seo-files',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;

      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, 'robots.txt'), robots);
      writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
      console.log(`  · robots.txt y sitemap.xml generados para ${SITE_URL}`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), htmlSiteUrl(), seoFiles()],
  resolve: {
    alias: {
      '@': root,
    },
  },
  define: {
    // Garantiza que import.meta.env.VITE_SITE_URL siempre tenga valor
    'import.meta.env.VITE_SITE_URL': JSON.stringify(SITE_URL),
  },
  server: {
    // Permite desactivar el HMR (p. ej. en entornos de edición automatizada) con DISABLE_HMR=true
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
