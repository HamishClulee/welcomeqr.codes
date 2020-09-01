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
	done(null, user.id)
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

		if (req.user) {
			User.findOne({ google: profile.id }, (err, existingUser) => {
				if (err) {
					return done(err)
				}

				if (existingUser) {
					// req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' })
					return done(err)

				} else {

					User.findById(req.user.id, (err, user) => {
						if (err) {
							return done(err)
						}

						user.google = profile.id
						user.tokens.push({ kind: 'google', accessToken })
						user.save((err) => {
							// req.flash('info', { msg: 'Google account has been linked.' })
							return done(err, user)
						})
					})
				}
			})
		} else {

			User.findOne({ google: profile.id }, (err, existingUser) => {
				if (err) {
					return done(err)
				}

				if (existingUser) {
					return done(null, existingUser)
				}

				User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
					if (err) {
						return done(err)
					}

					if (existingEmailUser) {
						// req.flash('errors', { msg: 'There is already an account using this email address. Sing in to that accoount and link it with Google manually from Account Settings.' })
						return done(err)
					} else {
						const user = new User()

						user.email = profile.emails[0].value
						user.google = profile.id
						user.tokens.push({ kind: 'google', accessToken })

						user.save((err) => {
							return done(err, user)
						})
					}
				})
			})
		}
	})
)

export const isReqAllowed = (req: IRequest, res: IResponse, next: INext) => {

	const authHeader = req.headers['authorization']

	const token = authHeader && authHeader.split(' ')[1]

	if (token == null && req.isAuthenticated()) {

		// No token exists but a session does exist
		// => grant user a token

		User.findOne({ _id: req.session.passport.user }, (user, err) => {

			Log.error(`Inside User.findOne`)

			if (err) { return Clean.deny(res, 403, 'DB error of some sort.') }

			const sess = {
				userid: user._id,
				email: user.email,
				role: user.role,
				subdom: user.subdom
			}

			jwt.sign(sess, Env.get().tokenSecret, { expiresIn: `2 days` })

			next()
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
