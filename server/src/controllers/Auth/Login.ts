import * as passport from 'passport'
import { UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces/vendors'
import { IVerifyOptions } from 'passport-local'
const { assert, sanitize, validationResult } = require('express-validator')

import Log from '../../middlewares/Log'

class Login {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		// assert('email', 'E-mail cannot be blank').notEmpty()
		// assert('email', 'E-mail is not valid').isEmail()
		// assert('password', 'Password cannot be blank').notEmpty()
		// assert('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })
		// sanitize('email').normalizeEmail({ gmail_remove_dots: false })

		// const errors = validationResult(req)

		// if (!errors.isEmpty()) {
		// 	Log.info('Bad login details', [Log.TAG_AUTH, Log.TAG_LOGIN])
		// 	return res.status(400).send({
		// 		errors: errors.array(),
		// 		userContent: 'signup deets bad',
		// 		user: { email: null, _id: null, authed: false }
		// 	})
		// }

		passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {
			if (err) {
				Log.info('Passport login authenticate failure', [Log.TAG_AUTH, Log.TAG_LOGIN])
				return next(err)
			}
			if (!user) {
				Log.info('Invalid email entered', [Log.TAG_AUTH, Log.TAG_LOGIN])
				return res.status(400).send({
					userContent: 'no user exists',
					user: { email: null, _id: null, authed: false }
				})
			}
			let { email, _id } = user
			req.logIn(user, (err) => {
				if (err) {
					Log.info('Login error - database', [Log.TAG_AUTH, Log.TAG_LOGIN])
					return next(err)
				}
				Log.info('Login succes', [Log.TAG_AUTH, Log.TAG_LOGIN])
				return res.status(200).send({
					userContent: 'you sexy beast, welcome home',
					user: { email, id: _id, authed: true }
				})
			})
		})(req, res, next)
	}
}

export default Login
