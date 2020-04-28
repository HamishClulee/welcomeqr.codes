import * as passport from 'passport'
import * as validate from 'express-validator'

import { UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces'
import { IVerifyOptions } from 'passport-local'

import Log from '../../middlewares/Log'
import QAuth from '../QAuth'

class LogIn {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		validate.check('email', 'E-mail cannot be blank').notEmpty()
		validate.check('email', 'E-mail is not valid').isEmail()
		validate.check('password', 'Password cannot be blank').notEmpty()
		validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })
		validate.sanitize('email').normalizeEmail({ gmail_remove_dots: false })

		const errors = validate.validationResult(req)

		if (!errors.isEmpty()) {

			Log.info('Bad login details', [Log.TAG_AUTH, Log.TAG_LOGIN])

			return res.status(400).send({

				errors: errors.array(),
				userContent: 'signup deets bad',
				user: QAuth.deny()

			})
		}

		passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {

			if (err) {

				Log.info('Passport login authenticate failure', [Log.TAG_AUTH, Log.TAG_LOGIN])

				return next(err)

			}
			if (!user) {

				Log.info('Invalid email entered', [Log.TAG_AUTH, Log.TAG_LOGIN])

				return res.status(400).send({

					userContent: 'no user exists',
					user: QAuth.deny()

				})
			}
			let { email, _id, subdom } = user

			req.logIn(user, (err) => {

				if (err) {

					Log.info('Login error - database', [Log.TAG_AUTH, Log.TAG_LOGIN])

					return next(err)

				}

				Log.info('Login succes', [Log.TAG_AUTH, Log.TAG_LOGIN])

				return res.status(200).send({

					userContent: 'you sexy beast, welcome home',
					user: QAuth.approve({ email, id: _id, authed: true, subdom })

				})
			})
		})(req, res, next)
	}
}

export default LogIn
