import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import WindiCSS from 'vite-plugin-windicss'
import tsNameof from 'vite-plugin-ts-nameof';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020',
    outDir: 'docs',
  },
  plugins: [VitePWA(), WindiCSS(), react(), tsNameof()]
})
