<script lang="ts" setup>
import type { ChartAttrItem } from '@/constant/chartTypeAttr'

defineProps<{
  attrs: ChartAttrItem
}>()
</script>

<template>
  <div flex items-center my-8px h-36px bg-hex-f8f9fc rounded>
    <div
      flex items-center
      w-60px h-full pl-3px py-3px
    >
      <div
        :class="{ label: attrs.component }"
        flex items-center
        h-full rounded
        overflow-hidden
      >
        <div ml-4px>
          {{ attrs.label }}
        </div>
        <div
          v-if="attrs.component"
          ml-2px mr-4px
          color="#091E40/25"
          i-icon-park-outline-setting
        />
      </div>
    </div>
    <div class="field">
      <div color="#091E40/47" pl-5px>
        拖入<span v-if="!attrs.multiple">一个</span>字段
      </div>
    </div>
  </div>
</template>

<style scoped>
.label {
  cursor: pointer;
}
.label:hover {
  background: rgba(46, 98, 220, .05);
}
.label:active {
  background: rgba(44, 96, 219, .2);
}

.label:hover > *:last-child {
  color: #091e40;
}
</style>
