export const useDragStore = defineStore('drag', () => {
  const isDragging = ref(false)

  return {
    isDragging,
  }
})
