import axios, { AxiosError, AxiosResponse, AxiosInstance, AxiosPromise } from 'axios'
import { SignUpPayload, LoginPayload, QUser } from '@I/IUser'
import { EventBus, LOADING, SERVER_AUTH_ERROR_MESSAGE } from '../EventBus'

export function ErrStr(error: AxiosError): string {
    if (error.response && error.response.data.status) {
        return error.response.data.status
    }
    return 'Something went wrong - please try again.'
}

interface GoogleDetails {
    code: String,
    redirect_uri: String,
}

export class QAuth {

    private BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:1980/auth' : 'https://welcomeqr.codes/auth'
    private AUTH_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/?redirect=true' : 'https://welcomeqr.codes/?redirect=true'

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

    removetoken():void {
        localStorage.removeItem('QToken')
    }

    checktoken(): Boolean {
        return !!localStorage.getItem('QToken') && localStorage.getItem('QToken') !== ''
    }

    authenticate(intercept = true): AxiosPromise<QUser> {
        // if intercept is set to false failed responses > 400 will not redirect the user to /auth
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
}
