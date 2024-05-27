import axios from 'axios'

const api = axios.create({
    baseURL: "https://backend-cactus-soft.onrender.com/"
})

export default api