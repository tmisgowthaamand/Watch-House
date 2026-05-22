import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite plugin: Convert render-blocking CSS <link> to async non-blocking.
 * Since critical CSS is already inlined in index.html <style>, the bundled
 * CSS (scroll animations, below-fold styles) can load without blocking FCP.
 */
function asyncCssPlugin() {
  return {
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Make Vite's auto-injected CSS link non-render-blocking
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        '<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
      );
    },
  };
}

/**
 * Vite plugin: Remove non-critical modulepreload hints.
 * Only keep react and rolldown-runtime preloads. Icons and vendor
 * chunks are not needed for initial render and add to critical path.
 */
function pruneModulePreloadsPlugin() {
  return {
    name: 'prune-modulepreloads',
    enforce: 'post',
    transformIndexHtml(html) {
      // Remove modulepreload for icons and vendor (not critical path)
      return html.replace(
        /<link rel="modulepreload" crossorigin href="\/assets\/(icons|vendor)-[^"]+\.js">\n?/g,
        ''
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    asyncCssPlugin(),
    pruneModulePreloadsPlugin(),
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router-dom')) return 'router';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('react-dom') || id.includes('react/')) return 'react';
          return 'vendor';
        },
      },
    },
  },
})
