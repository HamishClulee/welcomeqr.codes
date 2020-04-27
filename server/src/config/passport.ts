import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import _ from 'lodash'

import Environment from '../providers/Environment'

import { User, UserDocument } from '../models/User'
import { IRequest, IResponse, INext } from '../interfaces'

const LocalStrategy = passportLocal.Strategy

passport.serializeUser<any, any>((user, done) => {
	done(undefined, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
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

let GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({

	clientID: Environment.config().googleClientId,

	clientSecret: Environment.config().googleSecret,

	callbackURL: `${
		process.env.NODE_ENV === 'production'
			? Environment.config().prodUrl
			: Environment.config().devUrl }/auth/google/callback`
	}, async (access: any, refresh: any, profile: any, done: any) => {
		console.log(access, refresh, profile, done)
	}
))

export const isAuthenticated = (req: IRequest, res: IResponse, next: INext) => {
	if (req.isAuthenticated()) { return next() } else { res.redirect('/?authRedirect=true') }
}

export const isAuthorized = (req: IRequest, res: IResponse, next: INext) => {
	const provider = req.path.split('/').slice(-1)[0]
	const user = req.session.user as UserDocument
	if (_.find(user.tokens, { kind: provider })) { next() } else { res.redirect(`/auth/${provider}`) }
}
