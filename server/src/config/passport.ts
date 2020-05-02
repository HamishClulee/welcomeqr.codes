import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import _ from 'lodash'

import Environment from '../providers/Environment'
import Log from '../middlewares/Log'

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

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const url = process.env.NODE_ENV === 'production' ? 'https://welcomeqr.codes' : 'http://localhost:1980'

passport.use(new GoogleStrategy({
	clientID: Environment.config().googleClientId,
	clientSecret: Environment.config().googleSecret,
	callbackURL: `${url}/auth/google/callback`
	},
	function (accessToken: any, refreshToken: any, profile: any, done: any) {

		console.log('-------------------->>>>>>>>>>>>>>>>>>>>>>.. ehhhhhheeeeeeeeeee')
		Log.error('-------------------->>>>>>>>>>>>>>>>>>>>>>.. ehhhhhheeeeeeeeeee')
		done(accessToken, refreshToken, profile)
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
