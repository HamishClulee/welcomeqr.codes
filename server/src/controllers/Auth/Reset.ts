
import * as validate from 'express-validator'
import * as async from 'async'
import * as nodemailer from 'nodemailer'

import sparkPostTransport from 'nodemailer-sparkpost-transport'
import Environment from '../../providers/Environment'

import { User, UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces'

class Reset {

	public static perform (req: IRequest, res: IResponse, next: INext): any {
		validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req)
		validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req)

		const errors = validate.validationResult(req)

		if (!errors.isEmpty()) {
			return res.redirect('back')
		}

		async.waterfall([
			function resetPassword(done: Function) {
				User
					.findOne({ passwordResetToken: req.params.token })
					.where('passwordResetExpires').gt(Date.now())
					.exec((err, user: any) => {
						if (err) { return next(err) }
						if (!user) {
							// --> 'Password reset token is invalid or has expired.'
							return res.redirect('back')
						}
						user.password = req.body.password
						user.passwordResetToken = undefined
						user.passwordResetExpires = undefined
						user.save((err: any) => {
							if (err) { return next(err) }
							req.logIn(user, (err) => {
								done(err, user)
							})
						})
					})
			},
			function sendResetPasswordEmail(user: UserDocument, done: Function) {
				const transporter = nodemailer.createTransport(sparkPostTransport({
					sparkPostApiKey: Environment.config().sparkSecret
				}))
				const mailOptions = {
					to: user.email,
					from: 'WelcomeQR Codes',
					subject: 'Your Password Reset Link',
					text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
				}
				transporter.sendMail(mailOptions, (err) => {
					// --> 'Success! Your password has been changed.'
					done(err)
				})
			}
		], (err) => {
		if (err) { return next(err) }
		res.redirect('/mailerror=true')
		})
	}
}

export default Reset
