import axios from 'axios'

const API = import.meta.env.VITE_API + '/mem'

export default {
    getAll: () => axios.get(API),

    getById: (id) => axios.get(`${API}/${id}`),

    add: (data) => axios.post(API, data),

    update: (id, data) => axios.patch(`${API}/${id}`, data),

    delete: (id) => axios.delete(`${API}/${id}`),
}

