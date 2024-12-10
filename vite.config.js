// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import commonjs from 'vite-plugin-commonjs';


// export default defineConfig({
//   plugins: [react({
//     jsxRuntime: 'automatic', 
//   }), commonjs()],
//   esbuild: {
//     jsx: 'react-jsx', 
//   },
//   build: { 
//     commonjsOptions: { 
//       include: ['opencv.js'], 
//       transformMixedEsModules: true,
//     }, 
//     rollupOptions: {
//       external: ['react', 'react-dom'],
//     },
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})