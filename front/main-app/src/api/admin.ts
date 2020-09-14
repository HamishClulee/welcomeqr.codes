import axios, { AxiosResponse, AxiosInstance, AxiosPromise } from 'axios'
import { QUser } from '@I/IUser'

import { EventBus, MESSAGES, welcomeback } from '../EventBus'

import { settoken, removetoken } from './token'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('QToken')}`

export class QAdmin {

    private DEV_SERV = 'http://localhost:1980'
    private DEV_CLIENT = 'http://localhost:8080'
    private PROD_BASE = 'https://welcomeqr.codes'

    private BASE_URL = process.env.NODE_ENV === 'development' ? `${this.DEV_SERV}/admin` : `${this.PROD_BASE}/admin`

    ax: AxiosInstance;

    /** 
     * Store is passed to allow getuser to make commit 
     * Only called from main.ts on app spin up
     * */
    constructor() {

        this.ax = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: true,
            headers: {
                Authorization  : `Bearer ${localStorage.getItem('QToken')}`,
            },
        })

        axios.interceptors.request.use(config => {
            config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('QToken')}`
            return config
        }, (error) => {
            return Promise.reject(error)
        })

    }

    private ensureTwoDigits(term: number, offset = false): string {
        term = offset ? (term + 1) : term
        return ('0' + term).slice(-2)
    }

    getlogbyday(day: string = ''): AxiosPromise<QUser> {

        let _day, today = new Date()

        if (day === '') {
            _day = `${today.getFullYear()}-${this.ensureTwoDigits(today.getMonth(), true)}-${this.ensureTwoDigits(today.getDate())}`
        }

        return this.ax.post('get_log_by_day', { day })
    }

    getalllogfilenames(): AxiosPromise<QUser> {
        return this.ax.post('get_all_log_filenames')
    }
}
