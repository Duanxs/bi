<script lang="ts" setup>
import { ElTooltip } from 'element-plus'
import type { ITabItem } from './tabs.type'
import type { IPlugins } from '@/config/addon'

defineProps<{
  modelValue: ITabItem
  tabs: ITabItem[]
  addGroup: IPlugins[]
}>()
const emits = defineEmits<{
  'update:modelValue': [tab: ITabItem]
}>()

function onTabClick(tab: ITabItem) {
  emits('update:modelValue', tab)
}
</script>

<template>
  <div flex>
    <slot>
      <TabItem v-for="item in tabs" :key="item.name" :name="item.name" :title="item.title" :editable="item.editable" :active="modelValue.name === item.name" @click="onTabClick(item)" />
    </slot>
    <div class="add-group" flex items-center px-8px>
      <template v-for="item in addGroup" :key="item.id">
        <ElTooltip :content="item.title" effect="dark" placement="top" :show-after="200" :hide-after="0">
          <div p-2 rounded hover:bg-light-100 cursor-pointer>
            <Icon :icon="item.icon" />
          </div>
        </ElTooltip>
      </template>
    </div>
  </div>
</template>

<style scoped>
.is-active {
  background: #fff;
}
</style>
