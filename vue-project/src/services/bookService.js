import api from '@/services/api'


const API = '/book'

export default {
    getAll: () => api.get(API),
    getById: (id) => api.get(`${API}/${id}`),
    add: (data) => api.post(`${API}`, data),
    update: (id, data) => api.patch(`${API}/${id}`, data),
    delete: (id) => api.delete(`${API}/${id}`),
}