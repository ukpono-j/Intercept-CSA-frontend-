import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add .ts, .tsx for future-proofing
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true, // Open browser on start
    cors: {
      origin: [
        'http://localhost:3000', // Local backend
        'https://intercept-csa-backend.onrender.com', // Production backend for local testing
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
    fs: {
      allow: ['.'], // Allow access to project root
    },
  },
  publicDir: 'public', // Serve static assets from public/
  base: '/', // Default base path
  build: {
    outDir: 'dist', // Ensure output directory
    sourcemap: false, // Disable sourcemaps in production for smaller builds
    minify: 'esbuild', // Use esbuild for faster, smaller bundles
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'], // Split vendor code
        },
      },
    },
  },
});