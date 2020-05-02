import * as async from 'async'
import * as validate from 'express-validator'
import * as nodemailer from 'nodemailer'

import sparkPostTransport from 'nodemailer-sparkpost-transport'
import Environment from '../../providers/Environment'

import { User, UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces'

class Forgot {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		validate.check('email', 'Please enter a valid email address.').isEmail().run(req)
		validate.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

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
						// --> 'Account with that email address does not exist.'
						return res.redirect('/forgot')
					}
					user.passwordResetToken = token
					user.passwordResetExpires = Date.now() + 3600000 // 1 hour
					user.save((err: any) => {
						done(err, token, user)
					})
				})
			},
			function sendForgotPasswordEmail(token: string, user: UserDocument, done: Function) {
				const transporter = nodemailer.createTransport(sparkPostTransport({
					sparkPostApiKey: Environment.config().sparkSecret
				}))
				const mailOptions = {
					to: user.email,
					from: 'hackathon@starter.com',
					subject: 'Reset your password on Hackathon Starter',
					text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
							Please click on the following link, or paste this into your browser to complete the process:\n\n
							http://${req.headers.host}/reset/${token}\n\n
							If you did not request this, please ignore this email and your password will remain unchanged.\n`
				}
				transporter.sendMail(mailOptions, (err) => {
					// --> `An e-mail has been sent to ${user.email} with further instructions.`
					done(err)
				})
			}
		], (err) => {
			if (err) { return next(err) }
			res.redirect('/forgot')
		})

	}
}

export default Forgot
