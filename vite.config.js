import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base path ensures 100% compatibility across GitHub Pages, Render, Vercel, and Netlify
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true,
    host: '127.0.0.1'
  }
})
