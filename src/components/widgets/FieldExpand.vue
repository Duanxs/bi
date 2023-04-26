<!-- eslint-disable unused-imports/no-unused-imports -->
<script lang="ts" setup>
import { CaretBottom, CaretRight } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  name: string
  expand: boolean
}>(), {
  expand: true,
})
const emits = defineEmits(['update:expand'])
const isShow = useVModel(props, 'expand', emits)
</script>

<template>
  <div>
    <div
      flex items-center h-28px my-2px pl-4px
      text-12px font-bold cursor-pointer
      hover:bg-hex-eef1f6
      rounded-2px
      @click="isShow = !isShow"
    >
      <ElIcon class="icon">
        <CaretBottom v-if="expand" />
        <CaretRight v-else />
      </ElIcon>
      <div
        px-2px
        flex items-center
      >
        {{ name }}
      </div>
    </div>
    <div v-show="expand">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
