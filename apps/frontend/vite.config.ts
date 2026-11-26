import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const ROUTER_VENDOR_PATTERN = /[\\/]node_modules[\\/]react-router(-dom)?[\\/]/;
const REACT_VENDOR_PATTERN = /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/;

function resolveManualChunk(moduleId: string): string | undefined {
  if (ROUTER_VENDOR_PATTERN.test(moduleId)) return 'router-vendor';
  if (REACT_VENDOR_PATTERN.test(moduleId)) return 'react-vendor';

  return undefined;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: resolveManualChunk
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
