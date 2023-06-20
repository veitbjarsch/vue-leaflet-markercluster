import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/lib.ts', import.meta.url)),
      formats: ['es', 'cjs', 'umd'],
      name: 'vue-leaflet-markercluster',
      fileName: (fmt) => `vue-leaflet-markercluster.${fmt}.js`
    },
    rollupOptions: {
      external: ['vue', 'leaflet', /^leaflet\/.*/, /^@vue-leaflet\/.*/],
      output: {
        // Global variables for use in the UMD build
        globals: {
          vue: 'Vue',
          leaflet: 'L'
        }
      }
    }
  }
})
