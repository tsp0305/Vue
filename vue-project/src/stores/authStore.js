import { defineStore } from 'pinia'
import authService from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        error: null,
        show: false
    }),

    actions: {
        async login(credentials) {
            try {
                this.error = null
                const response = await authService.login(credentials)
                const { token, member } = response.data.data
                console.log('Login response:', { token, member })
                localStorage.setItem('token', token)
                localStorage.setItem('user_id', member.id)
                this.isAuthenticated = true
                this.user = member
                await this.fetchUser()
                router.push('/')
            } catch (err) {
                console.error('Login error:', err)
                this.error = err.response?.data?.message || 'Login failed'
                this.isAuthenticated = false
                this.user = null
            }
        },

        async signup(data) {
            try {
                this.error = null
                await authService.signup(data)
                router.push('/login')
            } catch (err) {
                console.error('Signup error:', err)
                this.error = err.response?.data?.message || 'Signup failed'
            }
        },

        async fetchUser() {
            try {
                const response = await authService.me()
                const { data } = response
                this.user = data.user
                this.isAuthenticated = true
                if (this.user.role == 'Admin' || 'Staff') {
                    this.show = true
                }

            } catch (err) {
                console.error('Fetch user error:', err)
                this.logout()
            }
        },

        async logout() {
            try {
                await authService.logout()
            } catch (err) {
                console.error('Logout error:', err)
            }
            this.user = null
            this.isAuthenticated = false
            this.error = null
            localStorage.removeItem('token')
            router.push('/login')
        },
        async initializeAuth() {
            const token = localStorage.getItem('token')
            if (token) {
                await this.fetchUser()

            }
        }
    }
})