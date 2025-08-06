/**
 * Satire Empire - Vite Configuration
 * Build configuration for the game client
 */

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Build configuration
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
    sourcemap: true,
    target: 'es2022',
    
    // Rollup options for optimization
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // Vendor chunk for third-party libraries
          vendor: ['maplibre-gl', 'partykit'],
          // Game engine chunk for core game logic
          engine: ['../shared/index.ts'],
        },
      },
    },
    
    // Bundle optimization
    minify: 'esbuild',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },

  // Development server
  server: {
    port: 5173,
    host: true,
    cors: true,
    open: false,
    hmr: {
      port: 5174,
    },
  },

  // Module resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@shared': resolve(__dirname, '../shared'),
      '@assets': resolve(__dirname, '../assets'),
      '@examples': resolve(__dirname, '../../examples'),
    },
  },

  // Environment variables
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __VERSION__: JSON.stringify(process.env.npm_package_version || '0.1.0'),
  },

  // CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },

  // Optimization
  optimizeDeps: {
    include: ['maplibre-gl', 'partykit'],
    exclude: ['@cloudflare/workers-types'],
  },

  // ESBuild options for TypeScript
  esbuild: {
    target: 'es2022',
    format: 'esm',
    splitting: true,
    treeShaking: true,
  },

  // Preview configuration
  preview: {
    port: 4173,
    host: true,
    cors: true,
  },
});