import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Mark as visible
      entry.target.dataset.isIntersecting = 'true'
      entry.target.classList.add('animate')

      // [FIX] If the element is marked as oneway, stop observing it entirely.
      // This guarantees scrolling out of view will never accidentally hide it again.
      if (entry.target.dataset.oneway === 'true') {
        observer.unobserve(entry.target)
      }
    } else {
      entry.target.dataset.isIntersecting = 'false'

      // Only remove the animate class if it is explicitly NOT one-way
      if (entry.target.dataset.oneway !== 'true') {
        entry.target.classList.remove('animate')
      }
    }
  })
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -30% 0px'
})

app.directive('animate', {
  mounted(el, binding) {
    // Support multiple syntax formats (v-animate="'oneway'" OR v-animate.oneway)
    if (binding.value === 'oneway' || binding.modifiers?.oneway) {
      el.dataset.oneway = 'true'
    }

    setTimeout(() => {
      observer.observe(el)
    }, 50)
  },
  updated(el) {
    //[CRITICAL FIX]
    // Vue's reactivity sometimes overwrites manual DOM class additions when a component
    // re-renders (like when you hover over a project and "activeProject" changes).
    // If Vue strips the class while it's in view, this hook instantly restores it.
    if (el.dataset.isIntersecting === 'true') {
      el.classList.add('animate')
    }
  },
  unmounted(el) {
    observer.unobserve(el)
  }
})

app.use(router)
app.mount('#app')