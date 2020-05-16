import { UserDocument } from '../models/User'
import { IResponse } from '../interfaces'

import Log from '../middlewares/Log'

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

const Turtle = {

	settings: (res, user: UserDocument): SettingsResponse => {
		return res.status(200).send({ user: this.buildSettings(user) })
	},

	deny: (res: IResponse, status: number = 403, msg: string = ''): IResponse => {

		return res.status(status).send({ msg, user: this.killUser() })
	},

	approve: (res: IResponse, status: number, user: UserDocument, msg: string = ''): IResponse => {

		return res.status(status).send({ msg, user: this.buildUser(user) })

	},

	success: (res: IResponse, status: number, content: any = {}, msg: string = ''): IResponse => {

		return res.status(status).send({ msg, content })

	},

	failure: (res: IResponse, status: number, content: any = {}, msg: string = ''): IResponse => {

		return res.status(status).send({ msg, content })

	},

	killUser: (): AuthResponse => {
		return {
			email: null,
			id: null,
			authed: false,
			subdom: null,
			role: null,
			tier: null
		}
	},

	buildUser: (user: UserDocument): AuthResponse => {
		return {
			email: user.email,
			id: user._id,
			authed: true,
			subdom: user.subdom,
			role: user.role,
			tier: user.accountTier
		}
	},

	buildSettings: (user: UserDocument): SettingsResponse => {
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

	apiError: (funcname: string, e: Error, res: IResponse): IResponse => {
		Log.error(`Function Name: ${ funcname } :: ${String(e)}`, [Log.TAG_API_ERROR])
		return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e })
	},

	authError: (funcname: string, e: any, res: IResponse, intercept: boolean): IResponse => {
		Log.error(`Function Name: ${ funcname } :: ${String(e)} :: User Auth Failure`, [Log.TAG_AUTH])
		return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: this.killUser(), intercept })
	}

}

export default Turtle
