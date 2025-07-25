import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true
})

api.interceptors.request.use(config => {

    const token = localStorage.getItem('token')
    console.log('inside axios')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`

    }
    return config
})

export default api