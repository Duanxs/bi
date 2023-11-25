<script lang="ts" setup>
import type { ITabItem } from './tabs.type'

const props = withDefaults(defineProps<ITabItem>(), {
  active: false,
  icon: 'icon-park-outline:ad-product',
  editable: true,
})

function onMenuClick() {
  // eslint-disable-next-line no-console
  console.log('menu', props.title)
}
</script>

<template>
  <div class="tab-item" :class="{ pin: !editable }" flex flex-1 justify-start items-center max-w-218px min-w-120px>
    <div
      :class="{ active, editable }" h-full flex flex-1 justify-center items-center px-8px py-4px rounded-b-6px
      hover:bg-light-300 cursor-pointer
    >
      <span>
        <slot name="icon">
          <Icon :icon="icon" />
        </slot>
        <span ml-2 font-bold>{{ title }}</span>
      </span>
      <slot name="action">
        <div v-show="editable" class="item-menu" p-1 hover:bg-gray-100 rounded @click.stop="onMenuClick">
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

.pin {
  max-width: 140px;
}

.editable {
  @apply justify-between max-w-218px
}

.tab-item .item-menu {
  opacity: 0;
}
.tab-item:hover .item-menu {
  opacity: 1;
}

/*已激活节点后面不显示分隔符*/
.tab-item .active+.divide,
/* 已激活节点前一个之后不显示分隔符 */
.tab-item:has(+.tab-item .active+.divide) .divide {
  display: none;
}
</style>
