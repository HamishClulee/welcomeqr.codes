import { UserDocument } from '../models/User'
import { userInfo } from 'os'

interface AuthResponse {
	email: string | null,
	id: string | null,
	authed: boolean,
	subdom: string | null,
	role: string | null,
	tier: string | null
}

interface SettingsResponse extends AuthResponse {
	allowsemails: boolean,
	isemailverified: boolean,
}

const QAuth = {

	settings: (user: UserDocument): SettingsResponse => {
		return {
			email: user.email,
			id: user._id,
			authed: true,
			subdom: user.subdom,
			role: user.role,
			tier: user.accountTier,
			allowsemails: user.allowEmails,
			isemailverified: user.emailVerified
		}
	},

	deny: (): AuthResponse => {
		return {
			email: null,
			id: null,
			authed: false,
			subdom: null,
			role: null,
			tier: null
		}
	},

	approve: (user: UserDocument): AuthResponse => {

		return {
			email: user.email,
			id: user._id,
			authed: true,
			subdom: user.subdom,
			role: user.role,
			tier: user.accountTier
		}
	}
}

export default QAuth
