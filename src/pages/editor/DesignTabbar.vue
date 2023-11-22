<script lang="ts" setup>
import type { ITabItem } from '@/components/tabs/tabs.type'
import type { IPlugins } from '@/config/addon'
import addons from '@/config/addon'

// const router = useRouter()

const tabs = ref< ITabItem[]>([
  {
    name: 'jfksjlfjsd',
    title: '组件',
    type: 'widget',
    icon: 'tabler:cube',
  },
  {
    name: 'ioudddrioewur',
    title: '组件3',
    type: 'report',
    icon: 'heroicons:squares-2x2',
  },
  {
    name: 'iouertttoewur',
    title: '组件4',
    type: 'doc',
    icon: 'majesticons:textbox-line',
  },
])
const addGroup = addons.plugins
const activeTab = useStorage('edit-active-tab', tabs.value[1])

const router = useRouter()
watchEffect(() => {
  router.push({ name: activeTab.value.type, query: { activeTab: activeTab.value.name } })
})

function onTabAdd(item: IPlugins) {
  tabs.value.push({
    name: genId(),
    title: item.title,
    type: item.id,
    icon: item.icon,
  })
  activeTab.value = tabs.value.at(-1)!
}
</script>

<template>
  <div bg-hex-eef1f6 pb-8px>
    <Tabs v-model="activeTab" :tabs="tabs" :add-group="addGroup" @add="onTabAdd" />
  </div>
</template>

<style scoped>
</style>
