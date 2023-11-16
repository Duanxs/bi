import type { DefineComponent } from 'vue'
import Widget from '@/pages/plugins/widget/index'
import Report from '@/pages/plugins/report/index'
import Doc from '@/pages/plugins/doc/index'

export interface IPlugins {
  id: string
  title: string
  icon: string
  addIcon?: string
  align?: 'top' | 'left' | 'right' | 'bottom'
  api: Record<string, any>
  component: DefineComponent | null
}

const addons = {
  plugins: [Widget, Report, Doc],
}

export default addons
