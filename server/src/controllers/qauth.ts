import { AuthResponse } from '@I/IApi'
const QAuth = {
    deny: (): AuthResponse => {
        return { email: null, id: null, authed: false, subdom: null }
    },
    approve: (res: AuthResponse): AuthResponse => {
        return res
    }
}

export default QAuth