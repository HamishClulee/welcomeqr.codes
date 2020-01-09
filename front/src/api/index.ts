import axios from 'axios'

axios.defaults.withCredentials = true

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:1980'
  : window.location.origin

const NODE = axios.create({
  baseURL,
  withCredentials: true,
})

export default NODE
