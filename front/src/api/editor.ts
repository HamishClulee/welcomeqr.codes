import axios, { AxiosInstance, AxiosPromise, AxiosError } from 'axios'
import { APIResponse } from '@I/IEditor'
import { QUser } from '@I/IUser'
import { EventBus, LOADING, SERVER_AUTH_ERROR_MESSAGE } from '../EventBus'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('QToken')}`

export class QEdit {

    private BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:1980/api' : 'https://welcomeqr.codes/api'

    ax: AxiosInstance;

    constructor() {

        this.ax = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: true,
        })

        this.ax.interceptors.response.use(res => res, (error: AxiosError ) => {

            if (error.response && error.response.status >= 400 && error.response.status < 500) {

                // window.location.href = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://welcomeqr.codes'

                EventBus.$emit(SERVER_AUTH_ERROR_MESSAGE, error.response.data.userError)
                EventBus.$emit(LOADING, false)

                debugger
                
            }

            // this.removetoken()

            return Promise.reject(error)
        })

    }

    // All the editor routes are protected via session cookie and JWT token
    submitnew(html: string, user: QUser, name: string, intercept = true): AxiosPromise<APIResponse> {
        return this.ax.post('/submitnew', { intercept, html, user, name })
    }

    getall(userid: string): AxiosPromise<APIResponse> {
        return this.ax.post('/getallforuser', { userid })
    }

    checksubdom(subdom: string): AxiosPromise<APIResponse> {
        return this.ax.post('/checksubdom', { subdom, intercept: false })
    }

    submitsubdom(subdom: string, userid: string): AxiosPromise<APIResponse> {
        return this.ax.post('/submitsubdom', { subdom, userid })
    }

    getHTML(): AxiosPromise<APIResponse> {
        return this.ax.post('/gethtmlforuser')
    }

    generateRandomSubDom(): AxiosPromise<APIResponse> {
        return this.ax.post('/generatesubdom')
    }
}
