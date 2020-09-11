import Vue from 'vue'

export const EventBus = new Vue()

export const LOADING = 'LOADING'
export const MESSAGES = 'MESSAGES'
export const SITEMODAL = 'SITEMODAL'
export const SERVER_AUTH_ERROR_MESSAGE = 'SERVER_AUTH_ERROR_MESSAGE'
export const EDITOR_ERROR = 'EDITOR_ERROR'

export const SAVE_SUCCESS_PL = {
    is: true,
    msg: 'Saved!',
    color: 'secondary',
    black: false,
}

export const PUBLISH_SUCCESS_PL = {
    is: true,
    msg: 'Published!',
    color: 'highlight',
    black: false,
}

export const LOGGED_OUT = {
    is: true,
    msg: 'You are now logged out!',
    color: 'secondary',
    black: false,
}

export const welcomeback = (email: string) => {
    return {
        is: true,
        msg: `Welcome back ${email}!`,
        color: 'secondary',
        black: false,
    }
}