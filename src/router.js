import Home from './views/Home.vue'
import Project from './views/Project.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/work/:id', component: Project },
]