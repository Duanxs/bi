<script lang="ts" setup>
import DesignHeader from './DesignHeader.vue'
import DesignToolbar from './DesignToolbar.vue'

// import DesignContent from './DesignContent.vue'
import DesignTabbar from './DesignTabbar.vue'
</script>

<template>
  <div h-full grid="~ rows-[min-content_min-content_1fr_min-content]">
    <DesignHeader />
    <DesignToolbar />
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <DesignTabbar />
  </div>
</template>

<style scoped>
</style>
