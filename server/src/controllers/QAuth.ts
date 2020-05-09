import { UserDocument } from '../models/User'

interface AuthResponse {
	email: string | null,
	id: string | null,
	authed: boolean,
	subdom: string | null,
	role: string | null,
	tier: string | null
}

const QAuth = {
	
	deny: (): AuthResponse => {
		return { email: null, id: null, authed: false, subdom: null, role: null, tier: null }
	},

	approve: (user: UserDocument): AuthResponse => {

		let result: AuthResponse = {
			email: user.email,
			id: user._id,
			authed: true,
			subdom: user.subdom,
			role: user.role,
			tier: user.accountTier
		}

		return result
	}
}

export default QAuth
