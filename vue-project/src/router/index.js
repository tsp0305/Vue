import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Form from '../views/Form.vue'
import memForm from '../views/memForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: 'book',
          component: Form
        },
        {
          path: 'mem',
          component: memForm
        }
      ]
    }
  ]
})

export default router
