import SERVER from './index'

const isAuthed = async (yup: Function, nup: Function) => {

    await SERVER.post('/session_challenge')
    .then((res) => {

        yup(res)

    })
    .catch(() => {

        nup()

    })

}

export default isAuthed