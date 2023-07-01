import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const routes = [
  { path: '/', component: () => import('./views/BasicMarkerDemo.vue') },
  { path: '/10000-marker', component: () => import('./views/MarkerDemo.10000.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')
