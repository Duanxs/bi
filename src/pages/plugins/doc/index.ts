import type { IPlugins } from '@/config/addon'

export default {
  id: 'doc',
  title: '分析文档',
  icon: 'majesticons:textbox-line',
  addIcon: 'majesticons:textbox-plus-line',
  component: () => import('./index.vue'),
  api: {},
} as unknown as IPlugins
