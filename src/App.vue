<script setup lang="ts">
import zh from 'element-plus/lib/locale/lang/zh-cn'

// const option = ref({
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   },
//   yAxis: {
//     type: 'value',
//   },
//   series: [
//     {
//       data: [120, 200, 150, 80, 70, 110, 130],
//       type: 'bar',
//       showBackground: true,
//       backgroundStyle: {
//         color: 'rgba(180, 180, 180, 0.2)',
//       },
//     },
//   ],
// }) as Ref<EChartsOption>
</script>

<template>
  <div h-screen w-screen>
    <ElConfigProvider :locale="zh">
      <RouterView />
    </ElConfigProvider>
  </div>
</template>

<style scoped>
</style>
