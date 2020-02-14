import axios, { AxiosError, AxiosResponse, AxiosInstance, AxiosPromise } from 'axios'

import { SignUpPayload, LoginPayload, QUser } from '@I/IUser'

export function ErrStr(error: AxiosError): string {
    if (error.response && error.response.data.status) {
        return error.response.data.status
    }
    return 'Something went wrong - please try again.'
}

export class QAuth {

    private BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:1980' : 'https://welcomeqr.codes'
    private AUTH_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/auth?redirect=true' : 'https://welcomeqr.codes/auth?redirect=true'

    ax: AxiosInstance;

    constructor() {

        this.ax = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: true,
        })

        this.ax.interceptors.response.use(res => res, (error: AxiosError ) => {
            if (error.response && error.response.status === 401) window.location.href = this.AUTH_URL
            return Promise.reject(error)
        })
    }

    authenticate(): AxiosPromise<QUser> {
        return this.ax.post('/session_challenge')
    }
    confirm(email: string, token: string): AxiosPromise<QUser> {
        return this.ax.post('/confirm', { email, token })
    }
    logout(): AxiosPromise<QUser> {
        return this.ax.post('/logout')
    }
    info(): AxiosPromise<QUser> {
        return this.ax.post('/info')
    }
    signup(email: string, password: string, confirm: string): AxiosPromise<QUser> {
        return this.ax.post('/signup', { email, password, confirm })
    }
    reconfirm(email: string): AxiosPromise<QUser> {
        return this.ax.post('/reconfirm', { email })
    }
    startrecovery(email: string): AxiosPromise<QUser> {
        return this.ax.post('/startrecovery', { email })
    }
    recover(email: string, token: string, password: string): AxiosPromise<QUser> {
        return this.ax.post('/recover', { email, token, password })
    }
}
