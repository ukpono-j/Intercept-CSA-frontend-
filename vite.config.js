import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true, // Open browser on start
    cors: {
      origin: ['http://localhost:3000'], // Backend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
    fs: {
      allow: ['.'] // Allow access to project root
    }
  },
  publicDir: 'public', // Serve static assets from public/
  base: '/', // Default base path
})