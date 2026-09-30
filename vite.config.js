import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
    includedRoutes(paths, routes) {
      return [
        '/',
        '/work/parleyStudio',
        '/work/verhalenvangers',
        '/work/sophia',
        '/work/futurenow',
        '/work/festivalRecommender',
        '/work/vrGame',
        '/work/lisboastories',
      ]
    }
  }
})