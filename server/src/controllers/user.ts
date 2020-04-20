import async from 'async'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import passport from 'passport'
import { User, UserDocument, AuthToken } from '../models/User'
import { Request, Response, NextFunction } from 'express'
import { IVerifyOptions } from 'passport-local'
import { WriteError } from 'mongodb'
import { check, sanitize, validationResult } from 'express-validator'
import '../config/passport'

/**
 * POST /session_challenge
 * Check if the user is authed
 */
export const sessionChallenge = (req: Request, res: Response) => {

    if (!req.session.passport) {

        return res.status(401).send({
            'status': 401,
            'message': 'No user logged in.',
            user: { email: null, _id: null, authed: false },
        })

    } else {

        User.findOne({ _id: req.session.passport.user }, (err, user) => {

            if (err) {
                return res.status(401).send({
                    'status': 401,
                    'message': 'You are not authenticated.',
                    user: { email: null, _id: null, authed: false },
                })
            }

            if (user) {

                let { email, _id } = user
                return res.status(200).send({ msg: 'you are a premium user', user: { email, id: _id, authed: true } })

            } else {

                return res.status(401).send({
                    'status': 401,
                    'message': 'You do not exist.',
                    user: { email: null, _id: null, authed: false },
                })
                
            }
        })
    }
}
export const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout()
    return res.status(200).send({ userContent: 'see you later, aligator', user: { email: null, _id: null, authed: false } })
}
/**
 * POST /login
 * Sign in using email and password.
 */
export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    await check('email', 'Email is not valid').isEmail().run(req)
    await check('password', 'Password cannot be blank').isLength({min: 1}).run(req)
    await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array(), userContent: 'signup deets bad', user: { email: null, _id: null, authed: false } })
    }

    passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { return next(err) }
        if (!user) {
            return res.status(400).send({ userContent: 'no user exists', user: { email: null, _id: null, authed: false } })
        }
        let { email, _id } = user
        req.logIn(user, (err) => {
            if (err) { return next(err) }
            return res.status(200).send({ userContent: 'you sexy beast, welcome home', user: { email, id: _id, authed: true } })
        })
    })(req, res, next)
}
/**
 * POST /signup
 * Create a new local account.
 */
export const postSignup = async (req: Request, res: Response, next: NextFunction) => {

    await check('email', 'Email is not valid').isEmail().run(req)
    await check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req)
    await check('confirm', 'Passwords do not match').equals(req.body.password).run(req)
    await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array(), userContent: 'signup deets bad', user: { email: null, _id: null, authed: false }  })
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err) }
        if (existingUser) {
            let { email, _id } = existingUser
            return res.status(200).send({ userContent: 'account already exists!', user: { email, id: _id, authed: true }  })
        }
        user.save((err) => {
            if (err) { return next(err) }
            let { email, _id } = user
            req.logIn(user, (err) => {
                if (err) {
                    return next(err)
                }
                return res.status(200).send({ userContent: 'Hi dude man', user: { email, id: _id, authed: true }  })
            })
        })
    })
}

/**
 * GET /account
 * Profile page.
 */
export const getAccount = (req: Request, res: Response) => {
    res.render('account/profile', {
        title: 'Account Management'
    })
}

/**
 * POST /account/profile
 * Update profile information.
 */
export const postUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
    await check('email', 'Please enter a valid email address.').isEmail().run(req)
    // eslint-disable-next-line @typescript-eslint/camelcase
    await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.redirect('/account')
    }

    const user = req.user as UserDocument
    User.findById(user.id, (err, user: UserDocument) => {
        if (err) { return next(err) }
        user.email = req.body.email || ''
        user.profile.name = req.body.name || ''
        user.profile.gender = req.body.gender || ''
        user.profile.location = req.body.location || ''
        user.profile.website = req.body.website || ''
        user.save((err: WriteError) => {
            if (err) {
                if (err.code === 11000) {
                    return res.redirect('/account')
                }
                return next(err)
            }
            res.redirect('/account')
        })
    })
}

/**
 * POST /account/password
 * Update current password.
 */
export const postUpdatePassword = async (req: Request, res: Response, next: NextFunction) => {
    await check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req)
    await check('confirmPassword', 'Passwords do not match').equals(req.body.password).run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.redirect('/account')
    }

    const user = req.user as UserDocument
    User.findById(user.id, (err, user: UserDocument) => {
        if (err) { return next(err) }
        user.password = req.body.password
        user.save((err: WriteError) => {
            if (err) { return next(err) }
            res.redirect('/account')
        })
    })
}

/**
 * POST /account/delete
 * Delete user account.
 */
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument
    User.remove({ _id: user.id }, (err) => {
        if (err) { return next(err) }
        req.logout()
        res.redirect('/')
    })
}

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
export const getOauthUnlink = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.params.provider
    const user = req.user as UserDocument
    User.findById(user.id, (err, user: any) => {
        if (err) { return next(err) }
        user[provider] = undefined
        user.tokens = user.tokens.filter((token: AuthToken) => token.kind !== provider)
        user.save((err: WriteError) => {
            if (err) { return next(err) }
            res.redirect('/account')
        })
    })
}

/**
 * GET /reset/:token
 * Reset Password page.
 */
export const getReset = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec((err, user) => {
            if (err) { return next(err) }
            if (!user) {
                return res.redirect('/forgot')
            }
            res.render('account/reset', {
                title: 'Password Reset'
            })
        })
}

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export const postReset = async (req: Request, res: Response, next: NextFunction) => {
    await check('password', 'Password must be at least 4 characters long.').isLength({ min: 4 }).run(req)
    await check('confirm', 'Passwords must match.').equals(req.body.password).run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.redirect('back')
    }

    async.waterfall([
        function resetPassword(done: Function) {
            User
                .findOne({ passwordResetToken: req.params.token })
                .where('passwordResetExpires').gt(Date.now())
                .exec((err, user: any) => {
                    if (err) { return next(err) }
                    if (!user) {
                        return res.redirect('back')
                    }
                    user.password = req.body.password
                    user.passwordResetToken = undefined
                    user.passwordResetExpires = undefined
                    user.save((err: WriteError) => {
                        if (err) { return next(err) }
                        req.logIn(user, (err) => {
                            done(err, user)
                        })
                    })
                })
        },
        function sendResetPasswordEmail(user: UserDocument, done: Function) {
            const transporter = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
            const mailOptions = {
                to: user.email,
                from: 'express-ts@starter.com',
                subject: 'Your password has been changed',
                text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
            }
            transporter.sendMail(mailOptions, (err) => {
                done(err)
            })
        }
    ], (err) => {
        if (err) { return next(err) }
        res.redirect('/')
    })
}

/**
 * GET /forgot
 * Forgot Password page.
 */
export const getForgot = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    res.render('account/forgot', {
        title: 'Forgot Password'
    })
}

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export const postForgot = async (req: Request, res: Response, next: NextFunction) => {
    await check('email', 'Please enter a valid email address.').isEmail().run(req)
    // eslint-disable-next-line @typescript-eslint/camelcase
    await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.redirect('/forgot')
    }

    async.waterfall([
        function createRandomToken(done: Function) {
            crypto.randomBytes(16, (err, buf) => {
                const token = buf.toString('hex')
                done(err, token)
            })
        },
        function setRandomToken(token: AuthToken, done: Function) {
            User.findOne({ email: req.body.email }, (err, user: any) => {
                if (err) { return done(err) }
                if (!user) {
                    return res.redirect('/forgot')
                }
                user.passwordResetToken = token
                user.passwordResetExpires = Date.now() + 3600000 // 1 hour
                user.save((err: WriteError) => {
                    done(err, token, user)
                })
            })
        },
        function sendForgotPasswordEmail(token: AuthToken, user: UserDocument, done: Function) {
            const transporter = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
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
                done(err)
            })
        }
    ], (err) => {
        if (err) { return next(err) }
        res.redirect('/forgot')
    })
}
