import type { IGlobalConfig } from '@/config/bi.config'

export const useGlobalConfig = defineStore('globalConfig', () => {
  const globalConfig = ref<IGlobalConfig>()

  const getGlobalConfig = () => globalConfig.value
  const setGlobalConfig = (config: IGlobalConfig) => {
    globalConfig.value = config
  }

  return {
    getGlobalConfig,
    setGlobalConfig,
  }
})
