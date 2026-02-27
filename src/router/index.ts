import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import Projects from '../views/Projects.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 处理路由切换时的滚动行为
  // 如果有保存的位置（如浏览器后退），则恢复该位置；否则滚动到页面顶部
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/resume',
      name: 'resume',
      component: Resume
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    }
  ]
})

export default router
