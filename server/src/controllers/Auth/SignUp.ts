import * as validate from 'express-validator'
import * as WelcomeEmail from '../../resources/emails/welcome'

import { User, UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces'

import Environment from '../../providers/Environment'
import Log from '../../middlewares/Log'
import QAuth from '../QAuth'

const sgMail = require('@sendgrid/mail')

class SignUp {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		validate.check('email', 'E-mail cannot be blank').notEmpty()
		validate.check('email', 'E-mail is not valid').isEmail()
		validate.check('password', 'Password cannot be blank').notEmpty()
		validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })

		const errors = validate.validationResult(req)

		let token

		// Initiated at EOF
		const initSignUpWithTokenGen = () => {

			require('crypto').randomBytes(48, (err, buffer) => {

				token = buffer.toString('hex')

				buildUser()

			})
		}

		const buildUser = () => {
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

					return res.status(200).send({

						userContent: 'account already exists!',
						user: QAuth.approve(existingUser)

					})

				}

				user.emailVerifyToken = token

				user.save((err) => {

					if (err) {

						Log.info('Signup database failure (2)', [Log.TAG_AUTH, Log.TAG_SIGNUP])

						return next(err)

					}

					req.logIn(user, (err) => {

						if (err) {

							Log.info('Signup database failure (3)', [Log.TAG_AUTH, Log.TAG_SIGNUP])

							return next(err)

						}

						Log.info('Signup success', [Log.TAG_AUTH, Log.TAG_SIGNUP])

						sgMail.setApiKey(process.env.SENDGRID_API_KEY)

						const msg = {
							to: user.email,
							from: 'noreply@welcomeqr.codes',
							subject: 'A warm welcome from Welcome QR Codes',
							html: WelcomeEmail.build(`${Environment.config().baseUrl}/account?token=${token}`)
						}

						sgMail.send(msg)

						return res.status(200).send({

							userContent: 'Hi dude man',
							user: QAuth.approve(user)

						})
					})
				})
			})
		}

		// Validation errors exist
		if (!errors.isEmpty()) {

			Log.info('Bad signup details', [Log.TAG_AUTH, Log.TAG_SIGNUP])

			return res.status(400).send({

				errors: errors.array(),
				userContent: 'signup deets bad',
				user: QAuth.deny()

			})

		// Good to go!
		} else {

			initSignUpWithTokenGen()

		}
	}
}

export default SignUp
