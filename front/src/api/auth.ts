import axios, { AxiosError, AxiosInstance, AxiosPromise } from 'axios'
import { QUser } from '@I/IUser'
import { EventBus, LOADING, SERVER_AUTH_ERROR_MESSAGE } from '../EventBus'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('QToken')}`

export const ErrStr = (error: AxiosError): string => {
    if (error.response && error.response.data.status) {
        return error.response.data.status
    }
    return 'Something went wrong - please try again.'
}

export class QAuth {

    private DEV_SERV = 'http://localhost:1980'
    private DEV_CLIENT = 'http://localhost:8080'
    private PROD_BASE = 'https://welcomeqr.codes'

    private BASE_URL = process.env.NODE_ENV === 'development' ? `${this.DEV_SERV}/auth` : `${this.PROD_BASE}/auth`
    private AUTH_URL = process.env.NODE_ENV === 'development' ? `${this.DEV_CLIENT}/?redirect=true` : `${this.PROD_BASE}/?redirect=true`

    ax: AxiosInstance;

    constructor() {

        this.ax = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: true,
        })

        this.ax.interceptors.response.use(res => res, (error: AxiosError ) => {
            if (error.response && error.response.data.userError) {
                EventBus.$emit(SERVER_AUTH_ERROR_MESSAGE, error.response.data.userError)
            }
            if (
                error.response
                && error.response.status > 400
                && error.response.data.intercept
            ) 
            {
                window.location.href = this.AUTH_URL
                EventBus.$emit(LOADING, false)
            }

            this.removetoken()
            return Promise.reject(error)
        })
    }

    settoken(token: string): void {
        localStorage.setItem('QToken', token)
    }

    removetoken(): void {
        localStorage.removeItem('QToken')
    }

    checktoken(): Boolean {
        return !!localStorage.getItem('QToken') && localStorage.getItem('QToken') !== ''
    }

    authenticate(intercept = true): AxiosPromise<QUser> {
        return this.ax.post('/session_challenge', { intercept })
    }

    usersettings(intercept = true): AxiosPromise<QUser> {
        return this.ax.post('/user_settings', { intercept })
    }

    togglesubscribe(subscribe: boolean): AxiosPromise<QUser> {
        return this.ax.post('/toggle_subscribe', { subscribe })
    }

    logout(): AxiosPromise<QUser> {
        return this.ax.post('/logout')
    }

    signup(email: string, password: string, confirm: string, intercept = false): AxiosPromise<QUser> {
        return this.ax.post('/signup', { email, password, confirm, intercept })
    }

    login(email: string, password: string, intercept = false): AxiosPromise<QUser> {
        return this.ax.post('/login', { email, password, intercept })
    }

    forgot(email: string): AxiosPromise<QUser> {
        return this.ax.post('/forgot', { email, intercept: false })
    }

    reset(token: string, password: string, confirm: string): AxiosPromise<QUser> {
        return this.ax.post('/reset', { token, password, confirm })
    }

    verifyemail(token: string): AxiosPromise<QUser> {
        return this.ax.post('/verify_email', { token })
    }

    contact(email: string, name: string, message: string, selectval: string): AxiosPromise<QUser> {
        return this.ax.post('/contact', { email, name, message, selectval })
    }
}
