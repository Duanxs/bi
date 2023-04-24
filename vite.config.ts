import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Componets from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
      ],
      dirs: [
        'src/composables',
      ],
      vueTemplate: true,
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    Componets({
      extensions: ['vue'],
      dts: true,
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
  ],
})
