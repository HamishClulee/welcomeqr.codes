import * as validate from 'express-validator'
import * as async from 'async'

import { User, UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces'

import QAuth from '../QAuth'

const sgMail = require('@sendgrid/mail')

class Reset {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req)
		validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req)

		const errors = validate.validationResult(req)

		let _user

		// Initiated at EOF
		const resetPassword = () => {

			User.findOne({ passwordResetToken: req.body.token })

				.exec((err, user: any) => {

					if (err) { return next(err) }

					if (!user) {

						return res.status(401).send({

							errors: errors.array(),
							userContent: 'Password reset token is invalid or has expired.',
							user: QAuth.deny()

						})
					}

					user.password = req.body.password
					user.passwordResetToken = undefined

					_user = user

					user.save((err: any) => {

						if (err) { return next(err) }

						req.logIn(user, () => {
							sendResetPasswordEmail()
						})

					})

				})
		}

		// Initiated at EOF
		const sendResetPasswordEmail = () => {

			sgMail.setApiKey(process.env.SENDGRID_API_KEY)

			const msg = {
				to: _user.email,
				from: 'info@welcomeqr.codes',
				subject: 'Your Password Reset Link',
				text: `Hello,\n\nThis is a confirmation that the password for your account ${_user.email} has just been changed.\n`,
				html: '<strong>and easy to do anywhere, even with Node.js</strong>'
			}

			sgMail.send(msg)

			return res.status(200).send({

				errors: errors.array(),
				userContent: 'Password has been reset!',
				user: QAuth.approve(_user)

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

			resetPassword()

		}
	}
}

export default Reset
