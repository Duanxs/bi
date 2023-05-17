<!-- eslint-disable unused-imports/no-unused-imports -->
<script lang="ts" setup>
import { CaretBottom, CaretRight } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  name: string
  expand?: boolean
}>(), {
})
const emits = defineEmits<{
  (event: 'change', isExpand: boolean): void
}>()
const isShow = ref(props.expand ?? true)
function onClick() {
  isShow.value = !isShow.value
  emits('change', isShow.value)
}
</script>

<template>
  <div>
    <div
      flex items-center h-28px my-2px pl-4px
      text-12px font-bold cursor-pointer
      hover:bg-hex-eef1f6
      rounded-2px
      @click="onClick"
    >
      <ElIcon class="icon">
        <CaretBottom v-if="isShow" />
        <CaretRight v-else />
      </ElIcon>
      <div
        px-2px
        flex items-center
      >
        {{ name }}
      </div>
    </div>
    <div v-show="isShow">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
