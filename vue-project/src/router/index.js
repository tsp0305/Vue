import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Form from '../views/Form.vue'
import memForm from '../views/memForm.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import { useAuthStore } from '@/stores/authStore'
import recordList from '../views/recordList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'book',
          component: Form,

        },
        {
          path: 'mem',
          component: memForm,


        },
        {
          path: 'rec',
          component: recordList
        }
      ],

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },

  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (!auth.isAuthenticated && localStorage.getItem('token')) {
    await auth.initializeAuth()
  }

  const isLoggedIn = auth.isAuthenticated

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/signup') && isLoggedIn) {
    next('/')
  } else {
    next()
  }
})


export default router
