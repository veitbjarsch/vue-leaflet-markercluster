import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const routes = [
  { path: '/', component: () => import('./views/BasicMarkerDemo.vue') },
  { path: '/props-marker', component: () => import('./views/MarkerPropsDemo.vue') },
  { path: '/event-marker', component: () => import('./views/MarkerEventDemo.vue') },
  { path: '/10000-marker', component: () => import('./views/MarkerDemo.10000.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
