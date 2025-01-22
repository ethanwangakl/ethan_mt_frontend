import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminSignInView from '@/views/AdminSignInView.vue'
import AdminUserMoodView from '@/views/AdminUserMoodView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin/signin',
      name: 'Sign In',
      component: AdminSignInView,
    },
    {
      path: '/admin/mood',
      name: 'All Mood',
      component: AdminUserMoodView,
    },
  ],
})

export default router
