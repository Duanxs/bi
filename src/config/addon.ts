import type { DefineComponent } from 'vue'

export interface IPlugins {
  id: string
  title: string
  icon: string
  align?: 'top' | 'left' | 'right' | 'bottom'
  api: Record<string, any>
  component: DefineComponent | null
}
