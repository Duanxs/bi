import type { DefineComponent } from 'vue'
import Widget from '@/pages/plugins/widget/index'
import Report from '@/pages/plugins/report/index'
import Doc from '@/pages/plugins/doc/index'
import Table from '@/pages/plugins/table/index'

export interface IPlugins {
  id: string
  title: string
  icon: string
  addIcon?: string
  align?: 'top' | 'left' | 'right' | 'bottom'
  editable?: boolean
  api: Record<string, any>
  component: DefineComponent | null
}

const addons = {
  plugins: [Table, Widget, Report, Doc],
}

export default addons
