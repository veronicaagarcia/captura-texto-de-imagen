import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic', // Importante: Asegúrate de que esta opción esté habilitada
  }), commonjs()],
  esbuild: {
    jsx: 'react-jsx', // Configura JSX para React 18+
  },
  build: { 
    commonjsOptions: { 
      include: ['opencv.js'], 
      transformMixedEsModules: true,
    }, 
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
})
