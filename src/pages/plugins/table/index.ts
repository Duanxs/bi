import type { IPlugins } from '@/config/addon'

export default {
  id: 'table',
  title: '数据',
  icon: 'tabler:database',
  addIcon: 'tabler:database',
  editable: false,
  component: () => import('./index.vue'),
  api: {},
} as unknown as IPlugins
