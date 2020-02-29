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
    }

    terms(): AxiosPromise<HTMLResponse> {
        return this.ax.get('/terms')
    }
    privacy(): AxiosPromise<HTMLResponse> {
        return this.ax.get('/privacy')
    }
}
