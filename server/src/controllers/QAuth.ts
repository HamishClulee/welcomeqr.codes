'use strict'
import * as validate from 'express-validator'
import * as passport from 'passport'
import * as WelcomeEmail from '../resources/emails/welcome'
import * as ResetEmail from '../resources/emails/resetconfirm'
import * as ForgotPassword from '../resources/emails/forgot'

import { UserDocument, User } from '../models/User'
import { IRequest, IResponse, INext } from '../interfaces'
import { IVerifyOptions } from 'passport-local'

import Env from '../providers/Environment'
import Clean from '../middlewares/Clean'

const SendGrid = require('@sendgrid/mail')

export const login = (req: IRequest, res: IResponse, next: INext): any => {

	validate.check('email', 'E-mail cannot be blank').notEmpty()
	validate.check('email', 'E-mail is not valid').isEmail()
	validate.check('password', 'Password cannot be blank').notEmpty()
	validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { return Clean.authError('login', `Validation error: ${String(errors)}`, res) }

	try {

		passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {

			if (err) { return Clean.authError('login::passport::err', err, res) }

			if (!user) { return Clean.authError('login::passport::no-user', err, res) }

			req.logIn(user, (err) => {

				if (err) { return Clean.authError('login::passport::login-err', err, res) }

				return Clean.approve(res, 200, user)

			})
		})(req, res)

	} catch (e) {

		return Clean.authError('login', `caught error: ${e}`, res)

	}

}

export const signup = async (req: IRequest, res: IResponse) => {

	validate.check('email', 'E-mail cannot be blank').notEmpty()
	validate.check('email', 'E-mail is not valid').isEmail()
	validate.check('password', 'Password cannot be blank').notEmpty()
	validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { return Clean.authError('login', `Validation error: ${errors.array()}`, res) }

	try {

		const token = await require('crypto').randomBytes(48, (err, buffer) => {
			return buffer.toString('hex')
		})

		let existinguser = await User.findOne({ email: req.body.email })

		if (existinguser) { return Clean.approve(res, 200, existinguser) }

		const user: UserDocument = new User({
			email: req.body.email,
			password: req.body.password,
			emailVerifyToken: token
		})

		await user.save()

		req.logIn(user, () => {

			SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

			SendGrid.send({
				to: user.email,
				from: 'noreply@welcomeqr.codes',
				subject: 'A warm welcome from Welcome QR Codes',
				html: WelcomeEmail.build(`${Env.get().baseUrl}/account?token=${token}`)
			})

			return Clean.approve(res, 200, user)

		})

	} catch (e) {

		return Clean.authError('signup', `caught error: ${e}`, res)

	}
}

export const logout = async (req: IRequest, res: IResponse) => {

	try {

		await req.logout()

		return Clean.deny(res, 200)

	} catch (e) {

		return Clean.authError('logout', `caught error: ${e}`, res)

	}
}

export const authchallenge = async (req: IRequest, res: IResponse) => {

	try {

		if (!req.session.passport) { return Clean.deny(res, 403, 'No session') }

		const user = await User.findOne({ _id: req.session.passport.user })

		if (user) { return Clean.approve(res, 200, user, 'Auth success') }

		return Clean.deny(res, 401, 'You do not exist')

	} catch (e) {

		return Clean.authError('session challenge', `caught error: ${e}`, res)

	}
}

export const togglesubscribe = async (req: IRequest, res: IResponse) => {

	try {

		if (!req.session.passport) { return Clean.deny(res, 401, 'No user logged in') }

		const user = await User.findOneAndUpdate({ _id: req.session.passport.user }, { allowEmails: req.body.subscribe }, { new: true })

		if (!user) { return Clean.deny(res, 403, 'Account with that email address does not exist.') }

		return Clean.approve(res, 200, user)

	} catch (e) {

		return Clean.authError('toggle subscribe', `caught error: ${e}`, res)

	}
}

export const verifyemail = async (req: IRequest, res, IResponse) => {

	try {

		const user = await User.findOne({ emailVerifyToken: req.body.token })

		if (!user) { return Clean.deny(res, 401, 'Verify token is invalid or has expired.') }

		user.emailVerified = true
		user.emailVerifyToken = undefined

		await user.save()

		return Clean.approve(res, 200, user)

	} catch (e) {

		return Clean.authError('verify email', `caught error: ${e}`, res)

	}
}

export const resetpassword = async (req: IRequest, res, IResponse) => {

	validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req)
	validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req)

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { return Clean.deny(res, 403, 'Validation error') }

	try {

		const user = await User.findOne({ passwordResetToken: req.body.token })

		if (!user) { return Clean.deny(res, 401, 'No user.') }

		user.password = req.body.password
		user.passwordResetToken = undefined

		await user.save()

		req.logIn(user, () => {

			SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

			SendGrid.send({
				to: user.email,
				from: 'noreply@welcomeqr.codes',
				subject: 'Password Changed Successfully',
				html: ResetEmail.build()
			})
		})

	} catch (e) {

		return Clean.authError('reset password', `caught error: ${e}`, res)

	}
}

export const forgotpassword = async (req: IRequest, res: IResponse) => {

	try {

		const token = require('crypto').randomBytes(48, (err, buffer) => {

			return buffer.toString('hex')

		})

		const user = await User.findOne({ email: req.body.email })

		if (!user) { return Clean.deny(res, 403, 'No user.') }

		user.passwordResetToken = token

		await user.save()

		SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

		SendGrid.send({
			to: user.email,
			from: 'noreply@welcomeqr.codes',
			subject: 'Reset your password on WelcomeQR Codes',
			html: ForgotPassword.build(`${Env.get().baseUrl}/auth/reset?token=${token}`)
		})

		return Clean.approve(res, 200, user)

	} catch (e) {

		return Clean.authError('forgot password', `caught error: ${e}`, res)

	}
}

export const usersettings = async (req: IRequest, res: IResponse) => {

	try {

		if (!req.session.passport) { return Clean.deny(res, 403, 'No user logged in.') }

		const user = await User.findOne({ _id: req.session.passport.user })

		if (!user) { return Clean.deny(res, 403, 'No user exists.') }

		return Clean.settings(res, user)

	} catch (e) {

		return Clean.authError('user settings', `caught error: ${e}`, res)

	}
}

export const contact = (req: IRequest, res: IResponse) => {

	SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

	SendGrid.send({

		to: Env.get().internalEmail,
		from: 'contact@welcomeqr.codes',
		subject: 'New contact from Welcome QR',

		html: `
			<p><b>From:</b> ${req.body.name}</p>
			<p><b>Email:</b> ${req.body.email}</p>
			<p><b>Selected:</b> ${req.body.selectVal}</p>
			<p><b>Message:</b> ${req.body.message}</p>
		`

	})

	return Clean.success(res, 200)

}
