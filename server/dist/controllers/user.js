"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = __importDefault(require("async"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
require("../config/passport");
const logger_1 = __importDefault(require("../logger"));
/**
 * POST /session_challenge
 * Check if the user is authed
 */
exports.sessionChallenge = (req, res) => {
    // console.log('sess: \n => ', JSON.stringify(req.body.intercept, null, 2))
    logger_1.default.log(`[${new Date()}] New session challenge from ${req.session ? req.session : '=> no session exists!'}`);
    if (!req.session.passport) {
        logger_1.default.log(`[${new Date()}] Failed session challenge from ${req.hostname}`);
        return res.status(401).send({
            status: 401,
            message: 'No user logged in.',
            intercept: req.body.intercept,
            user: { email: null, _id: null, authed: false },
        });
    }
    else {
        User_1.User.findOne({ _id: req.session.passport.user }, (err, user) => {
            if (err) {
                logger_1.default.log(`[${new Date()}] Mongo failed user look up with details ${req.session.passport.user}`);
                return res.status(401).send({
                    status: 401,
                    message: 'You are not authenticated.',
                    intercept: req.body.intercept,
                    user: { email: null, _id: null, authed: false },
                });
            }
            if (user) {
                logger_1.default.log(`[${new Date()}] New session challenge from ${user.email}`);
                let { email, _id } = user;
                return res.status(200).send({
                    msg: 'you are a premium user',
                    intercept: req.body.intercept,
                    user: { email, id: _id, authed: true }
                });
            }
            else {
                logger_1.default.log(`[${new Date()}] New session challenge from non-existent user`);
                return res.status(401).send({
                    status: 401,
                    message: 'You do not exist.',
                    intercept: req.body.intercept,
                    user: { email: null, _id: null, authed: false },
                });
            }
        });
    }
};
exports.postLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout();
    return res.status(200).send({ userContent: 'see you later, aligator', user: { email: null, _id: null, authed: false } });
});
/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Email is not valid').isEmail().run(req);
    yield express_validator_1.check('password', 'Password cannot be blank').isLength({ min: 1 }).run(req);
    yield express_validator_1.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array(), userContent: 'signup deets bad', user: { email: null, _id: null, authed: false } });
    }
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).send({ userContent: 'no user exists', user: { email: null, _id: null, authed: false } });
        }
        let { email, _id } = user;
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send({ userContent: 'you sexy beast, welcome home', user: { email, id: _id, authed: true } });
        });
    })(req, res, next);
});
/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Email is not valid').isEmail().run(req);
    yield express_validator_1.check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req);
    yield express_validator_1.check('confirm', 'Passwords do not match').equals(req.body.password).run(req);
    yield express_validator_1.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array(), userContent: 'signup deets bad', user: { email: null, _id: null, authed: false } });
    }
    const user = new User_1.User({
        email: req.body.email,
        password: req.body.password
    });
    User_1.User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            let { email, _id } = existingUser;
            return res.status(200).send({ userContent: 'account already exists!', user: { email, id: _id, authed: true } });
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            let { email, _id } = user;
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).send({ userContent: 'Hi dude man', user: { email, id: _id, authed: true } });
            });
        });
    });
});
/**
 * GET /account
 * Profile page.
 */
exports.getAccount = (req, res) => {
    res.render('account/profile', {
        title: 'Account Management'
    });
};
/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Please enter a valid email address.').isEmail().run(req);
    // eslint-disable-next-line @typescript-eslint/camelcase
    yield express_validator_1.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        // req.flash('errors', errors.array())
        return res.redirect('/account');
    }
    const user = req.user;
    User_1.User.findById(user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.email = req.body.email || '';
        user.profile.name = req.body.name || '';
        user.profile.gender = req.body.gender || '';
        user.profile.location = req.body.location || '';
        user.profile.website = req.body.website || '';
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    // req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' })
                    return res.redirect('/account');
                }
                return next(err);
            }
            // req.flash('success', { msg: 'Profile information has been updated.' })
            res.redirect('/account');
        });
    });
});
/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req);
    yield express_validator_1.check('confirmPassword', 'Passwords do not match').equals(req.body.password).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        // req.flash('errors', errors.array())
        return res.redirect('/account');
    }
    const user = req.user;
    User_1.User.findById(user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.password = req.body.password;
        user.save((err) => {
            if (err) {
                return next(err);
            }
            // req.flash('success', { msg: 'Password has been changed.' })
            res.redirect('/account');
        });
    });
});
/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
    const user = req.user;
    User_1.User.remove({ _id: user.id }, (err) => {
        if (err) {
            return next(err);
        }
        req.logout();
        // req.flash('info', { msg: 'Your account has been deleted.' })
        res.redirect('/');
    });
};
/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = (req, res, next) => {
    const provider = req.params.provider;
    const user = req.user;
    User_1.User.findById(user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user[provider] = undefined;
        user.tokens = user.tokens.filter((token) => token.kind !== provider);
        user.save((err) => {
            if (err) {
                return next(err);
            }
            // req.flash('info', { msg: `${provider} account has been unlinked.` })
            res.redirect('/account');
        });
    });
};
/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    User_1.User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec((err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // req.flash('errors', { msg: 'Password reset token is invalid or has expired.' })
            return res.redirect('/forgot');
        }
        res.render('account/reset', {
            title: 'Password Reset'
        });
    });
};
/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('password', 'Password must be at least 4 characters long.').isLength({ min: 4 }).run(req);
    yield express_validator_1.check('confirm', 'Passwords must match.').equals(req.body.password).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        // req.flash('errors', errors.array())
        return res.redirect('back');
    }
    async_1.default.waterfall([
        function resetPassword(done) {
            User_1.User
                .findOne({ passwordResetToken: req.params.token })
                .where('passwordResetExpires').gt(Date.now())
                .exec((err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    // req.flash('errors', { msg: 'Password reset token is invalid or has expired.' })
                    return res.redirect('back');
                }
                user.password = req.body.password;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                user.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    req.logIn(user, (err) => {
                        done(err, user);
                    });
                });
            });
        },
        function sendResetPasswordEmail(user, done) {
            const transporter = nodemailer_1.default.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
            const mailOptions = {
                to: user.email,
                from: 'express-ts@starter.com',
                subject: 'Your password has been changed',
                text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
            };
            transporter.sendMail(mailOptions, (err) => {
                // req.flash('success', { msg: 'Success! Your password has been changed.' })
                done(err);
            });
        }
    ], (err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('account/forgot', {
        title: 'Forgot Password'
    });
};
/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Please enter a valid email address.').isEmail().run(req);
    // eslint-disable-next-line @typescript-eslint/camelcase
    yield express_validator_1.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        // req.flash('errors', errors.array())
        return res.redirect('/forgot');
    }
    async_1.default.waterfall([
        function createRandomToken(done) {
            crypto_1.default.randomBytes(16, (err, buf) => {
                const token = buf.toString('hex');
                done(err, token);
            });
        },
        function setRandomToken(token, done) {
            User_1.User.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // req.flash('errors', { msg: 'Account with that email address does not exist.' })
                    return res.redirect('/forgot');
                }
                user.passwordResetToken = token;
                user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                user.save((err) => {
                    done(err, token, user);
                });
            });
        },
        function sendForgotPasswordEmail(token, user, done) {
            const transporter = nodemailer_1.default.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
            const mailOptions = {
                to: user.email,
                from: 'donotreply@welcomeqr.codes',
                subject: 'Reset your password on Hackathon Starter',
                text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
                        Please click on the following link, or paste this into your browser to complete the process:\n\n
                        http://${req.headers.host}/reset/${token}\n\n
                        If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
            transporter.sendMail(mailOptions, (err) => {
                // req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` })
                done(err);
            });
        }
    ], (err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/forgot');
    });
});
//# sourceMappingURL=user.js.map