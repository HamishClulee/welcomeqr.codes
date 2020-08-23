import { UserDocument } from '../models/User'
import { IResponse } from '../interfaces'

import Env from '../providers/Environment'

import Log from './Log'

const jwt = require('jsonwebtoken')

interface AuthResponse {
	email: string | null,
	id: string | null,
	authed: boolean,
	subdom: string | null,
	role: string | null,
	tier: string | null,
	token: string | null,
}

interface SettingsResponse extends AuthResponse {
	allowsemails: boolean,
	isemailverified: boolean,
}

const generateAccessToken = (userid: any) => {

	console.log(userid)

	return jwt.sign(userid, Env.get().tokenSecret, { expiresIn: `2 days` })

}

const Clean = {

	settings: function(res, user: UserDocument): SettingsResponse {

		return res.status(200).send({ user: this.buildSettings(user) })

	},

	deny: function(res: IResponse, status: number = 403, msg: string = ''): IResponse {

		let _user = this.killUser()

		return res.status(status).send({ msg, user: _user })

	},

	approve: function(res: IResponse, status: number, user: UserDocument, msg: string = ''): IResponse {

		let _user = this.buildUser(user)

		return res.status(status).send({ msg, user: _user })

	},

	success: function(res: IResponse, status: number, content: any = {}, msg: string = ''): IResponse {

		return res.status(status).send({ msg, content })

	},

	failure: function(res: IResponse, status: number, content: any = {}, msg: string = ''): IResponse {

		return res.status(status).send({ msg, content })

	},

	killUser: function(): AuthResponse {

		return {
			email: null,
			id: null,
			authed: false,
			subdom: null,
			role: null,
			tier: null,
			token: null
		}

	},

	buildUser: function(user: UserDocument): AuthResponse {

		return {
			email: user.email,
			id: user._id,
			authed: true,
			subdom: user.subdom,
			role: user.role,
			tier: user.accountTier,
			token: generateAccessToken({
				userid: user._id,
				email: user.email,
				role: user.role,
				subdom: user.subdom
			})
		}

	},

	buildSettings: function(user: UserDocument): SettingsResponse {

		return {
			email: user.email,
			id: user._id,
			authed: true,
			subdom: user.subdom,
			role: user.role,
			tier: user.accountTier,
			token: generateAccessToken({
				userid: user._id,
				email: user.email,
				role: user.role,
				subdom: user.subdom
			}),
			allowsemails: user.allowEmails,
			isemailverified: user.emailVerified
		}

	},

	apiError: function(funcname: string, e: Error, res: IResponse): IResponse {

		Log.error(`Function Name: ${ funcname } :: ${String(e)}`, [Log.TAG_API_ERROR])

		return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e })

	},

	authError: function(funcname: string, e: any, res: IResponse): IResponse {

		Log.error(`Function Name: ${ funcname } :: ${String(e)} :: User Auth Failure`, [Log.TAG_AUTH])

		return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: this.killUser() })

	}

}

export default Clean
