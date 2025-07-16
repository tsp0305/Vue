import axios from 'axios'

const API = import.meta.env.VITE_API

export default {
    getAll: () => axios.get(API),
    add: (data) => axios.post(API, data),
    update: (id, data) => axios.put(`${API}/${id}`, data),
    delete: (id) => axios.delete(`${API}/${id}`)
}