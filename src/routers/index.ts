import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/widgets/detail.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
