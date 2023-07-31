import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import {useUserStore} from '@/stores/UserStore'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {auth: true},
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isforLoggedInUsers = ():boolean => {
   return  to.name !== 'login' && to.name !== 'register'
  }
  if (isforLoggedInUsers() && !userStore.getIsAuthenticated) next({ name: 'login' })
  else next()
})

export default router
