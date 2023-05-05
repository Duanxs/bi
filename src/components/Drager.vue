<script lang="ts" setup>
const props = withDefaults(defineProps<{
  dragging: boolean
}>(), {
  dragging: false,
})

const emits = defineEmits(['update:dragging'])

const isDragging = useVModel(props, 'dragging', emits)

function onDragStart(_e: DragEvent) {
  isDragging.value = true
}
function onDragEnd(_e: DragEvent) {
  isDragging.value = false
}
</script>

<template>
  <div
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <slot />
  </div>
</template>

<style scoped>

</style>
