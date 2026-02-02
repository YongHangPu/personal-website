import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/main.scss'

const app = createApp(App)

app.use(MotionPlugin)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.mount('#app')
