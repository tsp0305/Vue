import { defineStore } from 'pinia'
import memService from '@/services/memService'

export const useMemStore = defineStore('members', {
    state: () => ({
        list: [],
        isLoading: false,
        error: null,
    }),

    actions: {
        async fetchMem() {
            this.isLoading = true
            this.error = null
            try {
                const response = await memService.getAll()
                this.list = Array.isArray(response.data?.data)
                    ? response.data.data.map(({ mem_id, name, email, phone, role }) => ({
                        id: mem_id,
                        Name: name,
                        Email: email,
                        Phone: phone,
                        Role: role,
                    }))
                    : []
            } catch (err) {
                this.error = err
                console.error('Error fetching members:', err)
            } finally {
                this.isLoading = false
            }
        },

        async addMem(data) {
            try {
                await memService.add({
                    name: data.Name,
                    email: data.Email,
                    phone: data.Phone,
                    role: data.Role,
                })
                await this.fetchMem()
            } catch (err) {
                console.error('Error adding member:', err)
            }
        },

        async updateMem(id, data) {
            try {
                await memService.update(id, {
                    name: data.Name,
                    email: data.Email,
                    phone: data.Phone,
                    role: data.Role,
                })
                await this.fetchMem()
            } catch (err) {
                console.error('Error updating member:', err)
            }
        },

        async deleteMem(id) {
            try {
                await memService.delete(id)
                await this.fetchMem()
            } catch (err) {
                console.error('Error deleting member:', err)
            }
        }
    }
})
