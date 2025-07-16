import { defineStore } from "pinia";
import bookService from "@/services/bookService";

export const useBookStore = defineStore('books', {

    state: () => ({
        list: [],
        isLoading: false,
        error: null
    }),

    actions: {
        async fetchBook() {
            this.isLoading = true
            this.error = null
            try {
                const response = await bookService.getAll()
                this.list = Array.isArray(response.data?.data)
                    ? response.data.data.map(({ bid, title, author, copies_total, copies_available }) => ({
                        id: bid,
                        title,
                        author,
                        copies_total,
                        copies_available
                    }))
                    : []
            } catch (err) {
                this.error = err
                console.error('Error fetching books:', err)
            } finally {
                this.isLoading = false
            }
        },

        async addBook(book) {
            try {
                await bookService.add(book)
                await this.fetchBook()
            } catch (err) {
                console.error('Error adding book:', err)
            }
        },

        async updateBook(book) {
            try {
                const { bid, ...bookData } = book  // Extract ID from book data
                await bookService.update(bid, bookData)  // ✅ Pass ID separately
                await this.fetchBook()
            } catch (err) {
                console.error('Error updating book:', err)
            }
        },

        async deleteBook(id) {
            try {
                await bookService.delete(id)
                await this.fetchBook()
            } catch (err) {
                console.error('Error deleting book:', err)
            }
        }
    }
})
