import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import addons from '@/config/addon'

function genPluginRoute(): RouteRecordRaw[] {
  return addons.plugins?.map<RouteRecordRaw>(plugin => ({
    path: plugin.id,
    name: plugin.id,
    component: plugin.component,
    children: [],
  })) || []
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/editor/index.vue'),
    children: genPluginRoute(),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
