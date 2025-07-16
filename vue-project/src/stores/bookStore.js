import { defineStore } from "pinia";
import bookService from "@/services/bookService";

export const useBookStore = defineStore('books', {

    state: () => ({
        list: [],
        isloading: false,
        error: null
    }),

    actions: {
        async fetchBook() {
            this.isloading = true
            this.error = null
            try {
                const response = await bookService.getAll()
                this.list = response.data
            } catch (err) {
                this.error = err
                console.log('error fetching book', err)
            } finally {
                this.loading = false
            }
        },
        async addBook(book) {
            try {
                await bookService.add(book)
                this.fetchBook()
            } catch (err) {
                console.error('Error adding book:', err)
            }
        },

        async updateBook(id, book) {
            try {
                await bookService.update(id, book)
                this.fetchBook()
            } catch (err) {
                console.error('Error updating book:', err)
            }
        },

        async deleteBook(id) {
            try {
                await bookService.delete(id)
                this.fetchBook()
            } catch (err) {
                console.error('Error deleting book:', err)
            }
        }

    },
})

