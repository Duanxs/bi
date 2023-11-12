import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/editor/index.vue'),
    children: [
      {
        path: 'widget',
        name: 'widget',
        component: () => import('@/pages/plugins/widget/index.vue'),
      },
      {
        path: 'doc',
        name: 'doc',
        component: () => import('@/pages/plugins/doc/index.vue'),
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('@/pages/plugins/report/index.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
