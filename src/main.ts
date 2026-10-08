import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/main.scss'

const app = createApp(App)

app.use(MotionPlugin)
app.use(router)
app.mount('#app')
