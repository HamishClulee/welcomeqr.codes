import axios, { AxiosError, AxiosResponse, AxiosInstance, AxiosPromise } from 'axios'
import { HTMLResponse } from '@I/IApi'

export class QSite {

    private BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:1980/site' : 'https://welcomeqr.codes/site'
    ax: AxiosInstance;

    constructor() {

        this.ax = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: true,
        })

        this.ax.interceptors.response.use(res => res, (error: AxiosError ) => {
            if (error.response && error.response.status > 400) {

            }
            return Promise.reject(error)
        })
    }

    terms(): AxiosPromise<HTMLResponse> {
        return this.ax.post('/terms-html')
    }
    privacy(): AxiosPromise<HTMLResponse> {
        return this.ax.post('/privacy-html')
    }
}
