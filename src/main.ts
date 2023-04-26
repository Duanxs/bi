import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.css'
import App from './App.vue'
import { router } from './routers'

createApp(App)
  .use(router)
  .mount('#app')
