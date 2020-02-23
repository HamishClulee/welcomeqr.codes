import axios, { AxiosError, AxiosResponse, AxiosInstance, AxiosPromise } from 'axios'
import { APIResponse } from '@I/IEditor'
import { QUser } from '@I/IUser'

export function ErrStr(error: AxiosError): string {
    if (error.response && error.response.data.status) {
        return error.response.data.status
    }
    return 'Something went wrong - please try again.'
}

export class QEdit {

    private BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:1980/api' : 'https://welcomeqr.codes/api'

    ax: AxiosInstance;

    constructor() {

        this.ax = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: true,
        })

        this.ax.interceptors.response.use(res => res, (error: AxiosError ) => {
            if (
                error.response
                && error.response.status > 400
                && error.response.status < 500
                && error.response.data.intercept
            ) 
            {
                // TODO implement error behaviour
            }
            return Promise.reject(error)
        })
    }


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
}
