<script setup lang="ts">
const [isTabShow, onTabToggle] = useToggle()
</script>

<template>
  <div class="left" flex border-r>
    <div class="tabs" border-r w-28px py-4>
      tab
    </div>
    <div class="tab-content" relative py-4>
      <div v-if="!isTabShow" hover:cursor-pointer hover:op-60 p-1 @click="() => onTabToggle()">
        <Icon icon="icon-park-outline:right" />
      </div>
      <div v-else w-200px>
        <div
          class="hide-icon"
          absolute right--12px
          rounded-full bg-white border
          hover="cursor-pointer op-60 border-dark"
          p-1
          w-8 h-8
          flex justify-center items-center
          @click="() => onTabToggle()"
        >
          <Icon icon="icon-park-outline:left" />
        </div>
        213
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-content .hide-icon {
  @apply hidden;
}
.tab-content:hover .hide-icon {
  @apply block;
}
</style>
