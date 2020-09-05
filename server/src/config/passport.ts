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

	done(null, user)
})

passport.deserializeUser<any, any>((user, done) => {
	if (mongoose.Types.ObjectId.isValid(user._id)) {
		User.findById(user._id, (err, user) => {
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

		/**
		 * => Get email from profile
		 * => Check if email exists in Users table
		 * => If user exists => log them in (grant token and session)
		 * => If no User exists => Save new User => log them in (grant token and session)
		 */

		User.findOne({ email: profile.emails[0].value }, (err, existingUser) => {

			if (!err && existingUser) {

				return done(false, existingUser)

			} else if (!err && !existingUser) {

				const newUser = new User()
				newUser.email = profile.emails[0].value

				newUser.save((err) => {

					if (!err) {
						return done(null, newUser)
					} else {
						return done(err, null)
					}

				})
			} else {

				return done(err, null)

			}
		})
	})
)

export const isReqAllowed = (req: IRequest, res: IResponse, next: INext) => {

	const authHeader = req.headers['authorization']

	const token = authHeader && authHeader.split(' ')[1]

	if (token == null && req.isAuthenticated()) {

		// No token exists but a session does exist
		// => grant user a token

		User.findOne({ _id: req.session.passport.user._id }, (err, user) => {

			if (!err) {

				next()

			} else {

				req.logout()

				return Clean.deny(res, 403, 'DB error of some sort.')

			}

		})

	} else if (token === null && !req.isAuthenticated()) {

		// No session, No Token
		// => deny/kill user

		return Clean.deny(res)

	} else if (token && req.isAuthenticated()) {

		// session and token exist
		// => verify token

		jwt.verify(token, Env.get().tokenSecret, (err: any, user: any) => {

			if (err) {

				// Token exists but failed verification
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
