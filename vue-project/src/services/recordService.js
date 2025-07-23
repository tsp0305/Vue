import api from '@/services/api'

const API = '/rec'

export default {
    borrow(bid, mid) {
        return api.post(`${API}/borrow/${bid}/${mid}`)
    },


    returnBook(bid, mid) {
        return api.patch(`${API}/return/${bid}/${mid}`)
    },

    getAllRecords() {
        return api.get(`${API}/record`)
    },

    getByMember(mid) {
        return api.get(`${API}/record/${mid}`)
    }
}