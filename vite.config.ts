import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For Vercel deployment, REMOVE or COMMENT OUT the base option.
// For GitHub Pages deployment, set base: '/samvad/'.
export default defineConfig({
  plugins: [react()],
  // base: '/samvad/', // <-- Comment out or remove this line for Vercel!
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