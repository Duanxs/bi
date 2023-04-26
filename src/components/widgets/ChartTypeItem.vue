<script lang="ts" setup>
const props = withDefaults(defineProps<{
  checked?: boolean
  icon?: string
}>(), {
  checked: false,
  icon: '分组表.png',
})

const emits = defineEmits(['update:checked'])
const isSelected = useVModel(props, 'checked', emits)

const icon = computed(() => new URL(`/src/assets/charts/${props.icon}`, import.meta.url))
const style = computed(() => ({
  'backgroundImage': `url(${icon.value})`,
  'background-size': 'contain',
  'display': 'block',
}))
</script>

<template>
  <div
    :class="{ active: isSelected }"
    h-32px w-32px
    flex justify-center items-center
    cursor-pointer
    hover:b hover:b-hex-2c60db
    @click="isSelected = !isSelected"
  >
    <div :style="style" w-24px h-24px />
  </div>
</template>

<style scoped>
.active {
  border: 2px solid #2c60db;
  box-shadow: 0 4px 12px 1px rgb(9 30 64 / 8%)
}
</style>
