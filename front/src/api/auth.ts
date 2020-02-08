import SERVER from './index'

const isAuthed = async (yup: Function, nup: Function, ctx: Vue) => {
    await SERVER.post('/session_challenge').then(res => {
        ctx.$store.commit('IS_AUTHED', true)
        yup(res)
    }).catch(err => {
        ctx.$store.commit('IS_AUTHED', false)
        nup(err)
    })
}
const login = async (yup: Function, nup: Function, ctx: Vue) => {
    await SERVER.post('/login').then(res => {
        ctx.$store.commit('IS_AUTHED', true)
        yup(res)
    }).catch(err => {
        ctx.$store.commit('IS_AUTHED', false)
        nup(err)
    })
}
const signup = async (yup: Function, nup: Function, ctx: Vue) => {
    await SERVER.post('/signup').then(res => {
        ctx.$store.commit('IS_AUTHED', true)
        yup(res)
    }).catch(err => {
        ctx.$store.commit('IS_AUTHED', false)
        nup(err)
    })
}
const logout = async (yup: Function, nup: Function, ctx: Vue) => {
    await SERVER.post('/logout').then(res => {
        ctx.$store.commit('IS_AUTHED', false)
        yup(res)
    }).catch(err => {
        ctx.$store.commit('IS_AUTHED', false)
        nup(err)
    })
}

export default isAuthed