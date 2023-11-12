<script setup lang="ts">
// @ts-expect-error 导入中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div h-screen w-screen>
    <ElConfigProvider :locale="zhCn">
      <RouterView />
    </ElConfigProvider>
  </div>
</template>

<style scoped>
</style>
