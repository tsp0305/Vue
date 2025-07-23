import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')

