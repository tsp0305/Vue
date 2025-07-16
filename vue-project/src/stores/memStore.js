import { defineStore } from "pinia";

export const useMemStore = defineStore('mem', {

    state: () => ({
        list: [
            {
                "Name": "Sundar Narayanan",
                "Email": "sundar.narayanan@admin.edu",
                "Phone": "9000001111",
                "Role": "Admin"
            },
            {
                "Name": "Nandhini Bose",
                "Email": "nandhini.bose@admin.edu",
                "Phone": "9333344444",
                "Role": "Admin"
            },
            {
                "Name": "Ravi Krishnan",
                "Email": "ravi.krishnan@institute.edu",
                "Phone": "9811122233",
                "Role": "Staff"
            },
            {
                "Name": "Lavanya Raj",
                "Email": "lavanya.raj@institute.edu",
                "Phone": "9977886655",
                "Role": "Staff"
            },
            {
                "Name": "Sneha Iyer",
                "Email": "sneha.iyer@student.edu",
                "Phone": "9867543210",
                "Role": "Student"
            },
            {
                "Name": "Vikram Rao",
                "Email": "vikram.rao@student.edu",
                "Phone": "9843216780",
                "Role": "Student"
            }

        ],
    }),

    actions: {
        addMem(mem) {
            this.list.push(mem)
        },
        updateMem(index, mem) {
            this.list[index] = mem
        },
        deleteMem(index) {
            this.list.splice(index, 1)
        },
    },
})

