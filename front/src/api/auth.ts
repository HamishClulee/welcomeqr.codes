import SERVER from './index'
import { SignUpPayload, LoginPayload } from '@I/IUser'

const isAuthed = async (yup: Function, nup: Function, ctx: Vue) => {

    await SERVER.post('/session_challenge').then(res => {

        ctx.$store.commit('IS_AUTHED', res.data.user)
        yup(res)

    }).catch((err) => {

        ctx.$store.commit('IS_AUTHED', err.response.data.user)
        nup(err)

    })
}
const login = async (yup: Function, nup: Function, ctx: Vue, payload: LoginPayload) => {

    await SERVER.post('/login', payload).then(res => {

        ctx.$store.commit('IS_AUTHED', res.data.user)
        yup(res)

    }).catch(err => {

        ctx.$store.commit('IS_AUTHED', err.response.data.user)
        nup(err)

    })
}
const signup = async (yup: Function, nup: Function, ctx: Vue, payload: SignUpPayload) => {

    await SERVER.post('/signup', payload).then(res => {

        ctx.$store.commit('IS_AUTHED', res.data.user)
        yup(res)

    }).catch(err => {

        ctx.$store.commit('IS_AUTHED', err.response.data.user)
        nup(err)

    })
}
const logout = async (yup: Function, nup: Function, ctx: Vue) => {

    await SERVER.post('/logout').then(res => {

        ctx.$store.commit('IS_AUTHED', res.data.user)
        yup(res)

    }).catch(err => {

        ctx.$store.commit('IS_AUTHED', err.response.data.user)
        nup(err)
        
    })
}

export default isAuthed