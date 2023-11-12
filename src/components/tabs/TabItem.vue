<script lang="ts" setup>
import type { ITabItem } from './tabs.type'

withDefaults(defineProps<ITabItem>(), {
  active: false,
  icon: 'icon-park-outline:ad-product',
  editable: true,
})
</script>

<template>
  <div class="tab-item" flex flex-1 justify-start items-center max-w-218px min-w-120px>
    <div
      :class="{ active, editable }" flex flex-1 justify-center items-center px-8px py-4px rounded-b-6px
      hover:bg-light-300 cursor-pointer
    >
      <span>
        <slot name="icon">
          <Icon :icon="icon" />
        </slot>
        <span ml-2 font-bold>{{ title }}</span>
      </span>
      <slot v-if="editable" name="action">
        <div p-1 hover:bg-gray-100 rounded>
          <Icon icon="icon-park-outline:more-one" />
        </div>
      </slot>
    </div>
    <div class="divide" h-1.2rem ml--1px border="r gray-300" />
  </div>
</template>

<style scoped>
.active {
  @apply bg-white shadow;
}

.editable {
  @apply justify-between max-w-218px
}

/*已激活节点后面不显示分隔符*/
.tab-item .active+.divide,
/* 已激活节点前一个之后不显示分隔符 */
.tab-item:has(+.tab-item .active+.divide) .divide {
  display: none;
}
</style>
