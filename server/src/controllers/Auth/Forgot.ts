import * as async from 'async'
import * as validate from 'express-validator'

import QAuth from '../QAuth'
import Environment from '../../providers/Environment'

import { User, UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces'

const sgMail = require('@sendgrid/mail')

class Forgot {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		validate.check('email', 'Please enter a valid email address.').isEmail()

		const errors = validate.validationResult(req)

		let token

		// Initiated at EOF
		const initTokenEmail = () => {

			require('crypto').randomBytes(48, (err, buffer) => {

				token = buffer.toString('hex')

				addTokenToUser()

			})
		}

		// Initiated at EOF
		const addTokenToUser = () => {

			User.findOne({ email: req.body.email }, (err, user: any) => {

				if (err) {

					return res.status(403).send({

						errors: errors.array(),
						userContent: 'Something went wrong, try again later!',
						user: QAuth.deny()

					})

				}

				if (!user) {

					return res.status(403).send({

						errors: errors.array(),
						userContent: 'Account with that email address does not exist.',
						user: QAuth.deny()

					})
				}

				user.passwordResetToken = token

				user.save((err: any) => {

					if (err) {

						return res.status(403).send({

							errors: errors.array(),
							userContent: 'Something went wrong, try again later!',
							user: QAuth.deny()

						})

					} else {

						sendResetEmail(user)

					}

				})
			})
		}

		// Initiated at EOF
		function sendResetEmail(user: UserDocument) {

			sgMail.setApiKey(process.env.SENDGRID_API_KEY)

			const msg = {
				to: user.email,
				from: 'info@welcomeqr.codes',
				subject: 'Reset your password on WelcomeQR Codes',
				html: `<p>
						You are receiving this email because you have requested the reset of the password for your account.\n\n
						Please click on the following link, or paste this into your browser to complete the process:\n\n\n
						<a href="${Environment.config().baseUrl}/auth/reset?token=${token}">Click here.</a>\n\n\n
						If you did not request this, please ignore this email and your password will remain unchanged.\n
					</p>`
			}

			sgMail.send(msg)

			return res.status(200).send({

				errors: errors.array(),
				userContent: 'We have sent you an email with instructions on how to reset your password!',
				user: QAuth.deny()

			})

		}

		// Gogo berries! this is the init.

		if (!errors.isEmpty()) {

			return res.status(403).send({

				errors: errors.array(),
				userContent: 'Something went wrong, try again later!',
				user: QAuth.deny()

			})

		} else {

			initTokenEmail()

		}

	}
}

export default Forgot
