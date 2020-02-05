import SERVER from './index'

const isAuthed = async (yup: Function, nup: Function) => {

    await SERVER.post('/session_challenge')
    .then(() => {

        yup()

    })
    .catch(() => {

        nup()

    })

}

export default isAuthed