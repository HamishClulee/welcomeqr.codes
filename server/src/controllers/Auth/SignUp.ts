import * as passport from 'passport'
import { User, UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces/vendors'
import Log from '../../middlewares/Log'
const { assert, sanitize, validationResult } = require('express-validator')

class SignUp {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			Log.info('Bad signup details', [Log.TAG_AUTH, Log.TAG_SIGNUP])
			return res.status(400).send({
				errors: errors.array(),
				userContent: 'signup deets bad',
				user: { email: null, _id: null, authed: false }
			})
		}

		const user: UserDocument = new User({
			email: req.body.email,
			password: req.body.password
		})

		User.findOne({ email: req.body.email }, (err, existingUser) => {
			if (err) {
				Log.info('Signup database fail (1)', [Log.TAG_AUTH, Log.TAG_SIGNUP])
				return next(err)
			}
			if (existingUser) {
				Log.info('Signup success', [Log.TAG_AUTH, Log.TAG_SIGNUP])
				let { email, _id } = existingUser
				return res.status(200).send({ userContent: 'account already exists!', user: { email, id: _id, authed: true }  })
			}
			user.save((err) => {
				if (err) {
					Log.info('Signup database failure (2)', [Log.TAG_AUTH, Log.TAG_SIGNUP])
					return next(err)
				}
				let { email, _id } = user
				req.logIn(user, (err) => {
					if (err) {
						Log.info('Signup database failure (3)', [Log.TAG_AUTH, Log.TAG_SIGNUP])
						return next(err)
					}
					Log.info('Signup success', [Log.TAG_AUTH, Log.TAG_SIGNUP])
					return res.status(200).send({ userContent: 'Hi dude man', user: { email, id: _id, authed: true }  })
				})
			})
		})
	}
}

export default SignUp
