import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunk for node_modules
          if (!id.includes('node_modules')) return undefined;

          // Separate chunks by library for better caching
          if (id.includes('react-router-dom')) return 'router';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('react-dom') || id.includes('react/')) return 'react';

          return 'vendor';
        },
      },
    },
  },
})
