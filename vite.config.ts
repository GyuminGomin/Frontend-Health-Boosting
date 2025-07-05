import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

// https://vite.dev/config/
export default defineConfig({
  root: './src', // vue 기준 디렉토리 설정
  base: './', // 루트 경로 설정
  server: {
    host: 'localhost',
    port: 5173,
  },
  plugins: [vue(), vueDevTools(), electron({ entry: './electron/electron-main.js' }), renderer()],
  build: {
    outDir: 'dist/renderer',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
