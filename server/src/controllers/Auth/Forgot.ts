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
		// validate.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

		const errors = validate.validationResult(req)

		async.waterfall([

			function createRandomToken(done: Function) {
				require('crypto').randomBytes(48, function(err, buffer) {
					const token = buffer.toString('hex')
					done(err, token)
				})
			},

			function setRandomToken(token: string, done: Function) {

				User.findOne({ email: req.body.email }, (err, user: any) => {

					if (err) { return done(err) }

					if (!user) {

						return res.status(401).send({

							errors: errors.array(),
							userContent: 'Account with that email address does not exist.',
							user: QAuth.deny()

						})
					}

					user.passwordResetToken = token

					user.save((err: any) => {
						done(err, token, user)
					})
				})
			},

			function sendForgotPasswordEmail(token: string, user: UserDocument, done: Function) {

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

				done(null)

				return res.status(200).send({

					errors: errors.array(),
					userContent: 'We have sent you an email with instructions on how to reset your password!',
					user: QAuth.deny()

				})

			}
		], (err) => {
			if (err) { return next(err) }
		})

	}
}

export default Forgot
