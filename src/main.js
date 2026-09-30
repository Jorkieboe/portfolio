import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import './style.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior() {
      return { top: 0 }
    }
  },
  ({ app }) => {
    const pinia = createPinia()
    app.use(pinia)
    app.use(MotionPlugin)
  }
)