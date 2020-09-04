import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import _ from 'lodash'

import * as mongoose from 'mongoose'

import Env from '../providers/Environment'
const jwt = require('jsonwebtoken')

import { User, UserDocument } from '../models/User'
import { IRequest, IResponse, INext } from '../interfaces'
import Log from '../middlewares/Log'
import Clean from '../middlewares/Clean'

const LocalStrategy = passportLocal.Strategy

passport.serializeUser<any, any>((user, done) => {

	Log.error(`Inside passport.serializeUser == VALUE OF 'user' ==== >>> ${JSON.stringify(user)}`)

	done(null, user._id)
})

passport.deserializeUser<any, any>((id, done) => {
	if (mongoose.Types.ObjectId.isValid(id)) {
		User.findById(id, (err, user) => {
			done(err, user)
		})
	} else {
		const _user = new User()
		_user.save()
	}
})

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

	User.findOne({ email: email.toLowerCase() }, (err, user: any) => {

		if (err) { return done(err) }

		if (!user) {

			return done(undefined, false, { message: `Email ${email} not found.` })
		}

		user.comparePassword(password, (err: Error, isMatch: boolean) => {

			if (err) { return done(err) }

			if (isMatch) {

				return done(undefined, user)
			}

			return done(undefined, false, { message: 'Invalid email or password.' })
		})

	})
}))

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const url = process.env.NODE_ENV === 'production' ? 'https://welcomeqr.codes' : 'http://localhost:1980'

passport.use(new GoogleStrategy(
	{
		clientID: Env.get().googleClientId,
		clientSecret: Env.get().googleSecret,
		callbackURL: `${url}/auth/google/callback`
	},
	async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {

		Log.error(`Touched passport google authenticate`)

		if (req.user) {

			Log.error(`Inside if req user ====> VALUE of req.user ==== >>> ${JSON.stringify(req.user)}`)

			User.findOne({ google: profile.id }, (err, existingUser) => {

				if (err) {
					Log.error(`Inside user.FindOne - first err -> ${JSON.stringify(err)}`)
					return done(err)
				}

				if (existingUser) {
					// req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' })
					Log.error(`Inside user.FindOne - second err -> ${JSON.stringify(err)}`)
					return done(err, existingUser)

				} else {

					Log.error(`Inside user.FindOne - else block`)

					User.findById(req.user.id, (err, user) => {
						if (err) {
							Log.error(`Inside user.findById - err block -> ${JSON.stringify(err)}`)
							return done(err)
						}

						user.google = profile.id
						user.tokens.push({ kind: 'google', accessToken })

						Log.error(`Inside user.findById - tokens saved to user`)

						user.save((err) => {

							Log.error(`Inside user.findById - complete user => ${JSON.stringify(user)}`)
							// req.flash('info', { msg: 'Google account has been linked.' })
							return done(err, user)
						})
					})
				}
			})
		} else {

			Log.error(`Inside new user, no email exists`)

			User.findOne({ google: profile.id }, (err, existingUser) => {
				if (err) {

					Log.error(`New email - first err -> ${JSON.stringify(err)}`)
					return done(err)
				}

				if (existingUser) {
					Log.error(`New email - second err -> ${JSON.stringify(existingUser)}`)
					return done(null, existingUser)
				}

				Log.error(`Value of profile ==> RETURNED FROM GOOGLE  ===> ${JSON.stringify(profile)}`)

				User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
					if (err) {
						Log.error(`New email - THIS IS THE BAD JUJU -> ${JSON.stringify(err)}`)
						return done(err)
					}

					if (existingEmailUser) {

						Log.error(`New email - Value of existing user with existing email -> ${JSON.stringify(existingEmailUser) || '**empty**'}`)

						return done(null, existingEmailUser)

					} else {

						Log.error(`New email - creating new user -> ${JSON.stringify(err)}`)
						const user = new User()

						user.email = profile.emails[0].value
						user.google = profile.id
						user.tokens.push({ kind: 'google', accessToken })

						user.save((err) => {

							Log.error(`New email - ERROR SAVING EMAIL? -> ${JSON.stringify(err)}`)
							return done(err, user)
						})
					}
				})
			})
		}
	})
)

export const isReqAllowed = (req: IRequest, res: IResponse, next: INext) => {

	Log.error(`Touched isReqAllowed`)

	const authHeader = req.headers['authorization']

	const token = authHeader && authHeader.split(' ')[1]

	if (token == null && req.isAuthenticated()) {

		// No token exists but a session does exist
		// => grant user a token

		Log.info(`Value of session === > ${JSON.stringify(req.session)}`)

		User.findOne({ _id: req.session.passport.user }, (err, user) => {

			if (!err) {

				const sess = {
					userid: user._id,
					email: user.email,
					role: user.role,
					subdom: user.subdom
				}

				Log.error(`Inside isReqAllowed == value of user =====> ${JSON.stringify(sess)}`)

				jwt.sign(sess, Env.get().tokenSecret, { expiresIn: `2 days` })

				next()

			} else {

				Log.info(`Some thing strange happened in isReqAllowed, error thrown === > ${JSON.stringify(err) || '**empty**'}`)

				req.logout()

				Log.info(`Value of session (after req.logout) === > ${JSON.stringify(req.session)}`)

				return Clean.deny(res, 403, 'DB error of some sort.')

			}

		})

	} else if (token === null && !req.isAuthenticated()) {

		// No session, No Token
		// => deny/kill user

		return Clean.deny(res)

	} else if (token && req.isAuthenticated()) {

		Log.error(`Inside third if block`)

		// session and token exist
		// => verify token

		jwt.verify(token, Env.get().tokenSecret, (err: any, user: any) => {

			if (err) {

				// Token exists but failed verification
				// This is a big red flag, I think
				Log.error(`Token modified by userid ===> ${JSON.stringify(req.session.user)}`, [
					Log.TAG_FAILED_CHALLENGE,
					Log.TAG_AUTH
				])

				return Clean.deny(res)

			} else {

				next()

			}

		})

	} else {

		return Clean.deny(res, 200)

	}
}

export const isAuthorized = (req: IRequest, res: IResponse, next: INext) => {

	const provider = req.path.split('/').slice(-1)[0]

	const user = req.session.user as UserDocument

	if (_.find(user.tokens, { kind: provider })) { next() } else { res.redirect(`/auth/${provider}`) }

}
