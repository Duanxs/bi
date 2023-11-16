import type { IPlugins } from '@/config/addon'

export default {
  id: 'report',
  title: '仪表盘',
  icon: 'heroicons:squares-2x2',
  addIcon: 'heroicons:squares-plus',
  component: () => import('./index.vue'),
  api: {},
} as unknown as IPlugins
