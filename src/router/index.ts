import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../views/Home.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('../views/Resume.vue'),
      meta: { title: '简历' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue'),
      meta: { title: '开源项目' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// 根据路由 meta 切换页面标题，未匹配时使用默认标题
const DEFAULT_TITLE = '濮永航 | 高级前端工程师'

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | 濮永航` : DEFAULT_TITLE
})

export default router
