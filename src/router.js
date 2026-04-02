import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Project from './views/Project.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/work/:id', component: Project },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})