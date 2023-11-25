<script lang="ts" setup>
import type { ITabItem } from '@/components/tabs/tabs.type'
import type { IPlugins } from '@/config/addon'
import addons from '@/config/addon'
import Table from '@/pages/plugins/table/index'

const tabs = useStorage<ITabItem[]>('edit-tabs', [
  {
    name: genId(),
    title: Table.title,
    type: Table.id,
    icon: Table.icon,
    editable: Table.editable,
  },
])

const addGroup = addons.plugins.filter(v => v.editable)
const activeTab = useStorage('edit-active-tab', tabs.value[0])

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
