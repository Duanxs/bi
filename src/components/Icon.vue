<script lang="ts" setup>
import { Icon as Iconify } from '@iconify/vue'

const props = withDefaults(defineProps<{
  icon: string
  width?: string | number
  height?: string | number
}>(), {
  width: '1.2rem',
  height: '1.2rem',
})
</script>

<template>
  <Iconify vertical-text-bottom v-bind="props" inline-block />
</template>

<style scoped>

</style>
