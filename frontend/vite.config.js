import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',  // Ensure 'global' is polyfilled
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Enable polyfill for Buffer if needed
          process: true, // Enable polyfill for process if needed
        }),
        NodeModulesPolyfillPlugin(), // Polyfill for Node.js modules like events and util
      ],
    },
  },
  resolve: {
    alias: {
      // Polyfill specific Node.js modules used by simple-peer
      events: 'events',
      util: 'util',
    },
  },
});
