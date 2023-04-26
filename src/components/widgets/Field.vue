<!-- eslint-disable unused-imports/no-unused-imports -->
<script lang="ts" setup>
import { CaretBottom } from '@element-plus/icons-vue'

withDefaults(defineProps<{
  name: string
  type?: number
}>(), {
  type: 16,
})
</script>

<template>
  <div flex items-center h-20px my-2px text-12px>
    <div v-if="type" class="type-o">
      <div v-if="type === COLUMN.STRING" i-icon-park-outline-text text-hex-537bc6 />
      <div v-else-if="type === COLUMN.DATE" i-icon-park-outline-time text-hex-537bc6 />
      <div v-else-if="type === COLUMN.NUMBER" i-icon-park-outline-pound text-hex-3fb4ab />
    </div>
    <div
      px-8px leading-20px cursor-pointer flex-grow-1
      hover:bg-hex-def2f0
      rounded="hover:tl-6px hover:br-6px"
      flex items-center
      op="last-children:hover:100"
    >
      <div flex-1>
        {{ name }}
      </div>
      <ElIcon class="icon" op-0>
        <CaretBottom />
      </ElIcon>
    </div>
  </div>
</template>

<style scoped>

</style>
