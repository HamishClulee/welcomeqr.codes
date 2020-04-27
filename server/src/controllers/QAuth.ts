interface AuthResponse {
	email: string | null,
	id: string | null,
	authed: boolean,
	subdom: string | null
}

const QAuth = {
	deny: (): AuthResponse => {
		return { email: null, id: null, authed: false, subdom: null }
	},
	approve: (res: AuthResponse): AuthResponse => {
		return res
	}
}

export default QAuth
