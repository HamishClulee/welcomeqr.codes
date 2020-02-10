import SERVER from './index'
import { SignUpPayload, LoginPayload } from '@I/IUser'

const isAuthed = (yup: Function, nup: Function, ctx: Vue) => {

    SERVER.post('/session_challenge').then(res => {

        ctx.$store.commit('IS_AUTHED', res.data.user)
        yup(res)

    }).catch((err) => {

        ctx.$store.commit('IS_AUTHED', err.response.data.user)
        nup(err)

    })
}
const login = (yup: Function, nup: Function, ctx: Vue, payload: LoginPayload) => {

    SERVER.post('/login', payload).then(res => {

        ctx.$store.commit('IS_AUTHED', res.data.user)
        yup(res)

    }).catch(err => {

        ctx.$store.commit('IS_AUTHED', err.response.data.user)
        nup(err)

    })
}
const signup = (yup: Function, nup: Function, ctx: Vue, payload: SignUpPayload) => {

    SERVER.post('/signup', payload).then(res => {

        ctx.$store.commit('IS_AUTHED', res.data.user)
        yup(res)

    }).catch(err => {

        ctx.$store.commit('IS_AUTHED', err.response.data.user)
        nup(err)

    })
}
const logout = async (yup: Function, nup: Function, ctx: Vue) => {

    SERVER.post('/logout').then(res => {

        ctx.$store.commit('IS_AUTHED', res.data.user)
        yup(res)

    }).catch(err => {

        ctx.$store.commit('IS_AUTHED', err.response.data.user)
        nup(err)
        
    })
}

export default isAuthed