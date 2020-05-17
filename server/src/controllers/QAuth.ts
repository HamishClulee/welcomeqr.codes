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
import Turtle from './Turtle'

import Log from '../middlewares/Log'

const SendGrid = require('@sendgrid/mail')

export const login = (req: IRequest, res: IResponse, next: INext): any => {

	validate.check('email', 'E-mail cannot be blank').notEmpty()
	validate.check('email', 'E-mail is not valid').isEmail()
	validate.check('password', 'Password cannot be blank').notEmpty()
	validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { Turtle.authError('login', `Validation error: ${String(errors)}`, res, req.body.intercept) }

	try {

		passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {

			if (err) { Turtle.authError('login::passport::err', err, res, req.body.intercept) }

			if (!user) { Turtle.authError('login::passport::no-user', err, res, req.body.intercept) }

			req.logIn(user, (err) => {

				if (err) { Turtle.authError('login::passport::login-err', err, res, req.body.intercept) }

				Turtle.approve(res, 200, user)

			})
		})(req, res)

	} catch (e) {
		Turtle.authError('login', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const signup = async (req: IRequest, res: IResponse) => {

	validate.check('email', 'E-mail cannot be blank').notEmpty()
	validate.check('email', 'E-mail is not valid').isEmail()
	validate.check('password', 'Password cannot be blank').notEmpty()
	validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { Turtle.authError('login', `Validation error: ${errors.array()}`, res, req.body.intercept) }

	try {

		const token = await require('crypto').randomBytes(48, (err, buffer) => {
			return buffer.toString('hex')
		})

		let existinguser = await User.findOne({ email: req.body.email })

		if (existinguser) { Turtle.approve(res, 200, existinguser) }

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
				html: WelcomeEmail.build(`${Environment.config().baseUrl}/account?token=${token}`)
			})

			Turtle.approve(res, 200, user)

		})

	} catch (e) {
		Turtle.authError('signup', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const logout = async (req: IRequest, res: IResponse) => {

	try {

		await req.logout()

		Turtle.deny(res, 401)

	} catch (e) {
		Turtle.authError('logout', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const sessionchallenge = async (req: IRequest, res: IResponse) => {

	try {

		if (!req.session.passport) { Turtle.deny(res, 403) }

		const user = await User.findOne({ _id: req.session.passport.user })

		if (user) { Turtle.approve(res, 200, user) }

		Turtle.deny(res, 401, 'You do not exist.')

	} catch (e) {
		Turtle.authError('session challenge', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const togglesubscribe = async (req: IRequest, res: IResponse) => {

	try {

		if (!req.session.passport) { Turtle.deny(res, 401, 'No user logged in') }

		const user = await User.findOneAndUpdate({ _id: req.session.passport.user }, { allowEmails: req.body.subscribe }, { new: true })

		if (!user) { Turtle.deny(res, 403, 'Account with that email address does not exist.') }

		Turtle.approve(res, 200, user)

	} catch (e) {
		Turtle.authError('toggle subscribe', `caught error: ${e}`, res, req.body.intercept)
	}
}

export const verifyemail = async (req: IRequest, res, IResponse) => {

	try {

		const user = await User.findOne({ emailVerifyToken: req.body.token })

		if (!user) { Turtle.deny(res, 401, 'Verify token is invalid or has expired.') }

		user.emailVerified = true
		user.emailVerifyToken = undefined

		await user.save()

		Turtle.approve(res, 200, user)

	} catch (e) {
		Turtle.authError('verify email', `caught error: ${e}`, res, req.body.intercept)
	}
}

export const resetpassword = async (req: IRequest, res, IResponse) => {

	validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req)
	validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req)

	const errors = validate.validationResult(req)

	if (!errors.isEmpty()) { Turtle.deny(res, 403, 'Validation error') }

	try {

		const user = await User.findOne({ passwordResetToken: req.body.token })

		if (!user) { Turtle.deny(res, 401, 'No user.') }

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
		Turtle.authError('reset password', `caught error: ${e}`, res, req.body.intercept)
	}

}

export const forgotpassword = async (req: IRequest, res: IResponse) => {

	try {

		const token = require('crypto').randomBytes(48, (err, buffer) => {

			return buffer.toString('hex')

		})

		const user = await User.findOne({ email: req.body.email })

		if (!user) { Turtle.deny(res, 403, 'No user.') }

		user.passwordResetToken = token

		await user.save()

		SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

		SendGrid.send({
			to: user.email,
			from: 'noreply@welcomeqr.codes',
			subject: 'Reset your password on WelcomeQR Codes',
			html: ForgotPassword.build(`${Environment.config().baseUrl}/auth/reset?token=${token}`)
		})

		Turtle.approve(res, 200, user)

	} catch (e) {
		Turtle.authError('forgot password', `caught error: ${e}`, res, req.body.intercept)
	}
}

export const usersettings = async (req: IRequest, res: IResponse) => {
	try {
		if (!req.session.passport) { Turtle.deny(res, 403, 'No user logged in.') }

		const user = await User.findOne({ _id: req.session.passport.user })

		if (!user) { Turtle.deny(res, 403, 'No user exists.') }

		Turtle.settings(res, user)

	} catch (e) {
		Turtle.authError('user settings', `caught error: ${e}`, res, req.body.intercept)
	}
}

export const contact = (req: IRequest, res: IResponse) => {
	Log.info(req.body)
	return res.status(200).send({ _: ':)' })
}
