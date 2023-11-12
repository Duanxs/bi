import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './routers'
import globalConfig from './config/bi.config'

// 配置默认全局属性

const app = createApp(App)

app.use(router)
  .use(createPinia())

const { setGlobalConfig } = useGlobalConfig()
setGlobalConfig(globalConfig)

app.mount('#app')
