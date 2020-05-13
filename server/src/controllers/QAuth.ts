'use strict'
import * as validate from 'express-validator'
import * as passport from 'passport'
import * as WelcomeEmail from '../resources/emails/welcome'
import * as ResetEmail from '../resources/emails/resetconfirm'
import * as ForgotPassword from '../resources/emails/forgot'

import { UserDocument, User } from '../models/User'
import { IRequest, IResponse, INext } from '../interfaces'
import { IVerifyOptions } from 'passport-local'

import Environment from '../providers/Environment'
import Mister from './Mister'

const sgMail = require('@sendgrid/mail')

export const login = (req: IRequest, res: IResponse, next: INext): any => {

	validate.check('email', 'E-mail cannot be blank').notEmpty()
	validate.check('email', 'E-mail is not valid').isEmail()
	validate.check('password', 'Password cannot be blank').notEmpty()
	validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { Mister.authError('login', `Validation error: ${String(errors)}`, res, req.body.intercept) }

	try {

		passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {

			if (err) { Mister.authError('login::passport::err', err, res, req.body.intercept) }

			if (!user) { Mister.authError('login::passport::no-user', err, res, req.body.intercept) }

			req.logIn(user, (err) => {

				if (err) { Mister.authError('login::passport::login-err', err, res, req.body.intercept) }

				Mister.approve(res, 200, user)

			})
		})(req, res)

	} catch (e) {
		Mister.authError('login', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const signup = async (req: IRequest, res: IResponse) => {

	validate.check('email', 'E-mail cannot be blank').notEmpty()
	validate.check('email', 'E-mail is not valid').isEmail()
	validate.check('password', 'Password cannot be blank').notEmpty()
	validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { Mister.authError('login', `Validation error: ${errors.array()}`, res, req.body.intercept) }

	try {

		const token = await require('crypto').randomBytes(48, (err, buffer) => {
			return buffer.toString('hex')
		})

		let existinguser = await User.findOne({ email: req.body.email })

		if (existinguser) { Mister.approve(res, 200, existinguser) }

		const user: UserDocument = new User({
			email: req.body.email,
			password: req.body.password,
			emailVerifyToken: token
		})

		await user.save()

		req.logIn(user, () => {

			sgMail.setApiKey(process.env.SENDGRID_API_KEY)

			sgMail.send({
				to: user.email,
				from: 'noreply@welcomeqr.codes',
				subject: 'A warm welcome from Welcome QR Codes',
				html: WelcomeEmail.build(`${Environment.config().baseUrl}/account?token=${token}`)
			})

			Mister.approve(res, 200, user)

		})

	} catch (e) {
		Mister.authError('signup', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const logout = async (req: IRequest, res: IResponse) => {

	try {

		await req.logout()

		Mister.deny(res, 401)

	} catch (e) {
		Mister.authError('logout', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const sessionchallenge = async (req: IRequest, res: IResponse) => {

	try {

		if (!req.session.passport) { Mister.deny(res, 403) }

		const user = await User.findOne({ _id: req.session.passport.user })

		if (user) { Mister.approve(res, 200, user) }

		Mister.deny(res, 401, 'You do not exist.')

	} catch (e) {
		Mister.authError('session challenge', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const togglesubscribe = async (req: IRequest, res: IResponse) => {

	try {

		if (!req.session.passport) { Mister.deny(res, 401, 'No user logged in') }

		const user = await User.findOneAndUpdate({ _id: req.session.passport.user }, { allowEmails: req.body.subscribe }, { new: true })

		if (!user) { Mister.deny(res, 403, 'Account with that email address does not exist.') }

		Mister.approve(res, 200, user)

	} catch (e) {
		Mister.authError('toggle subscribe', `caught error: ${e}`, res, req.body.intercept)
	}
}

export const verifyemail = async (req: IRequest, res, IResponse) => {

	try {

		const user = await User.findOne({ emailVerifyToken: req.body.token })

		if (!user) { Mister.deny(res, 401, 'Verify token is invalid or has expired.') }

		user.emailVerified = true
		user.emailVerifyToken = undefined

		await user.save()

		Mister.approve(res, 200, user)

	} catch (e) {
		Mister.authError('verify email', `caught error: ${e}`, res, req.body.intercept)
	}
}

export const resetpassword = async (req: IRequest, res, IResponse) => {

	validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req)
	validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req)

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { Mister.deny(res, 403, 'Validation error') }

	try {

		const user = await User.findOne({ passwordResetToken: req.body.token })

		if (!user) { Mister.deny(res, 401, 'No user.') }

		user.password = req.body.password
		user.passwordResetToken = undefined

		await user.save()

		req.logIn(user, () => {

			sgMail.setApiKey(process.env.SENDGRID_API_KEY)

			sgMail.send({
				to: user.email,
				from: 'noreply@welcomeqr.codes',
				subject: 'Password Changed Successfully',
				html: ResetEmail.build()
			})
		})

	} catch (e) {
		Mister.authError('reset password', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const forgotpassword = async (req: IRequest, res: IResponse) => {

	try {

		const token = require('crypto').randomBytes(48, (err, buffer) => {

			return buffer.toString('hex')

		})

		const user = await User.findOne({ email: req.body.email })

		if (!user) { Mister.deny(res, 403, 'No user.') }

		user.passwordResetToken = token

		await user.save()

		sgMail.setApiKey(process.env.SENDGRID_API_KEY)

		sgMail.send({
			to: user.email,
			from: 'noreply@welcomeqr.codes',
			subject: 'Reset your password on WelcomeQR Codes',
			html: ForgotPassword.build(`${Environment.config().baseUrl}/auth/reset?token=${token}`)
		})

		Mister.approve(res, 200, user)

	} catch (e) {
		Mister.authError('forgot password', `caught error: ${e}`, res, req.body.intercept)
	}
}

export const usersettings = async (req: IRequest, res: IResponse) => {
	try {
		if (!req.session.passport) { Mister.deny(res, 403, 'No user logged in.') }

		const user = await User.findOne({ _id: req.session.passport.user })

		if (!user) { Mister.deny(res, 403, 'No user exists.') }

		Mister.settings(res, user)

	} catch (e) {
		Mister.authError('user settings', `caught error: ${e}`, res, req.body.intercept)
	}
}
