import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import commonjs from 'vite-plugin-commonjs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  build: { 
    commonjsOptions: { 
      include: ['opencv.js'], 
      transformMixedEsModules: true,

    }, 
  },
})
