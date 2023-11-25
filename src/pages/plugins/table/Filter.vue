<script lang="ts" setup>

const props = withDefaults(defineProps<{
  modelValue: boolean
  top?: number,
  left?: number,
  content?: string
}>(), {
  top: 120,
  left: 240,
  content: ''
})

const emits = defineEmits<{
  'update:modelValue': [show: boolean]
}>()

const t = computed(() => props.top + 'px')
const l = computed(() => {
  console.log(`l ~ window.innerWidth:`, props.left + 260, window.innerWidth)
  if ((props.left + 260) > window.innerWidth) {
    return (window.innerWidth - 260) + 'px'
  } else {
    return props.left + 'px'
  }
})

const filterRef = shallowRef(null)

let isFirst = ''

onClickOutside(filterRef, () => {
  if (isFirst === props.content) {
    emits('update:modelValue', false)
    isFirst = ''
  } else {
    isFirst = props.content
  }
})


</script>

<template>
  <Teleport to="body">
    <div class="table-filter" absolute z-11>
      <div v-if="modelValue" ref="filterRef" w-260px h-450px bg-red shadow-md rounded-2>
        123{{ content }} {{ left }} {{ l }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.table-filter {
  top: v-bind(t);
  left: v-bind(l)
}
</style>
