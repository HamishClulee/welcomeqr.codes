import axios from 'axios'

axios.defaults.withCredentials = true

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:1980' : 'https://welcomeqr.codes'

const SERVER = axios.create({
    baseURL,
    withCredentials: true,
})

export default SERVER
