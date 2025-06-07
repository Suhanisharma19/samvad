import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Set the base to your repo name for GitHub Pages deployment
// Example: base: '/samvad/'
export default defineConfig({
  plugins: [react()],
  base: '/samvad/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})