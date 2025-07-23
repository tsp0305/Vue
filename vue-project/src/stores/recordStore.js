// src/stores/recordStore.js
import { defineStore } from 'pinia'
import recordService from '@/services/recordService'

export const useRecordStore = defineStore('records', {
    state: () => ({
        records: [],
        isLoading: false,
        error: null,
    }),

    actions: {
        async fetchRecords() {
            this.isLoading = true
            this.error = null
            try {
                const res = await recordService.getAllRecords()
                this.records = res.data.data
                // console.log(res)
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to load records'
            } finally {
                this.isLoading = false
            }
        },

        async borrowBook({ bid, mid }) {
            try {
                const res = await recordService.borrow(bid, mid)
                await this.fetchRecords() // Refresh records
                //console.log(res)
            } catch (err) {
                this.error = err.response?.data?.message || 'Borrowing failed'
            }
        },

        async returnBook({ bid, mid }) {
            try {
                await recordService.returnBook(bid, mid)
                await this.fetchRecords() // Refresh records
            } catch (err) {
                this.error = err.response?.data?.message || 'Return failed'
            }
        },

        async fetchRecordsByMember(mid) {
            this.isLoading = true
            this.error = null
            try {
                const res = await recordService.getByMember(mid)
                this.records = res.data.data
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to load member records'
            } finally {
                this.isLoading = false
            }
        }

    }
})
