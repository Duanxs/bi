<script lang="ts" setup>
import type { ITabItem } from '@/components/tabs/tabs.type'
import type { IPlugins } from '@/config/addon'

// const router = useRouter()

const tabs: ITabItem[] = [
  {
    name: 'jfksjlfjsd',
    title: '组件',
    type: 'widget',
    icon: 'icon-park-outline-abnormal',
  },
  {
    name: 'iouerioewur',
    title: '组件2',
    type: 'widget',
    icon: 'icon-park-outline-abnormal',
  },
  {
    name: 'ioudddrioewur',
    title: '组件3',
    type: 'report',
    icon: 'icon-park-outline-abnormal',
  },
  {
    name: 'iouertttoewur',
    title: '组件4',
    type: 'doc',
    icon: 'icon-park-outline-abnormal',
  },
]
const addGroup: IPlugins[] = [
  {
    id: 'widget',
    title: '添加组件',
    icon: 'tabler:cube-plus',
    component: null,
    api: {},
  },
  {
    id: 'report',
    title: '添加仪表盘',
    icon: 'heroicons:squares-plus',
    component: null,
    api: {},
  },
  {
    id: 'doc',
    title: '添加分析文档',
    icon: 'majesticons:textbox-plus-line',
    component: null,
    api: {},
  },
]
const activeTab = ref<ITabItem>(tabs[1])

const router = useRouter()
watchEffect(() => {
  router.push({ name: activeTab.value.type, query: { activeTab: activeTab.value.name } })
})
</script>

<template>
  <div bg-hex-eef1f6 pb-8px>
    <Tabs v-model="activeTab" :tabs="tabs" :add-group="addGroup" />
  </div>
</template>

<style scoped>
</style>
