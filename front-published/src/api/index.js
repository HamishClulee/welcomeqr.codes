import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:1980' : 'https://welcomeqr.codes'

const SERVER = axios.create({
    baseURL,
})

export default SERVER
