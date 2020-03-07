import passport from 'passport'
import passportLocal from 'passport-local'
import _ from 'lodash'

import { User, UserDocument } from '../models/User'
import { Request, Response, NextFunction } from 'express'

import { DEV_URL, PROD_URL } from '../app'

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


/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: `${ process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL }/auth/google/callback`
  }, async (access: any, refresh: any, profile: any, done: any) => {
      console.log(access, refresh, profile, done)
  }
));

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/?authRedirect=true')
}

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split('/').slice(-1)[0]
    const user = req.user as UserDocument
    if (_.find(user.tokens, { kind: provider })) next()
    else res.redirect(`/auth/${provider}`)
}
