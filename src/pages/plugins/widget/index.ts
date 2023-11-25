import type { IPlugins } from '@/config/addon'

export default {
  id: 'widget',
  title: '组件',
  icon: 'tabler:cube',
  addIcon: 'tabler:cube-plus',
  editable: true,
  component: () => import('./index.vue'),
  api: {},
} as unknown as IPlugins
