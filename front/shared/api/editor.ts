import axios, { AxiosInstance, AxiosPromise, AxiosError } from 'axios'
import { APIResponse } from '../../../interfaces/IEditor'
import { QUser } from '../../../interfaces/IUser'
import { EventBus, LOADING, SERVER_AUTH_ERROR_MESSAGE } from '../../main-app/src/EventBus'

import { removetoken } from '../../main-app/src/api/token'

import Vue from 'vue'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('QToken')}`

interface TemplateConfig {
    preheader: string, // {{-preheader-}}
    logoHref: string, // {{-logoHref-}}
    logoSrc: string, // {{-logoSrc-}}
    heroHeadingText: string, // {{-heroHeadingText-}}
    emailBodyText: string, // {{-emailBodyText-}} -> OR HTML
    ctaButtonHref: string, // {{-ctaButtonHref-}}
    ctaButtonText: string, // {{-ctaButtonText-}}
    finalContentText: string, // {{-finalContentText-}} -> OR HTML
    afterBodyText: string, // {{-afterBodyText-}} -> OR HTML
    unsubHref: string, // {{-unsubHref-}}
}

export class QEdit {

    private BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:1980/api' : 'https://welcomeqr.codes/api'

    ax: AxiosInstance;

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

        this.ax.interceptors.response.use(res => res, (error: AxiosError ) => {

            if (error.response && error.response.status >= 400 && error.response.status < 500) {

                Vue.prototype.$router.push({ name: 'login' })
                EventBus.$emit(SERVER_AUTH_ERROR_MESSAGE, error.response.data.userError)
                EventBus.$emit(LOADING, false)
                removetoken()
                
            }

            return Promise.reject(error)
        })

    }

    buildEmailTemplate(config: TemplateConfig): AxiosPromise<APIResponse> {
        return this.ax.post('/build_email_template', { config })
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

    // tester
    getHtmlBySub(subdom: string): AxiosPromise<APIResponse> {
        return this.ax.post('/get_html_by_subdomain', { subdom })
    }
}
