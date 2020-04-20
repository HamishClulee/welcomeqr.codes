"use strict";
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
const qauth_1 = __importDefault(require("./qauth"));
const errors_1 = require("./errors");
exports.sessionChallenge = async (req, res) => {
    try {
        const user = await User_1.User.findOne({ _id: req.session.passport.user });
        let { email, _id, subdom } = user;
        return res.status(200).send({ user: qauth_1.default.approve({ email, id: _id, authed: true, subdom }) });
    }
    catch (e) {
        errors_1.QAuthError('sessionChallenge', e, res, req.body.intercept);
    }
};
exports.logout = async (req, res, next) => {
    req.logout();
    return res.status(200).send({ userContent: 'see you later, aligator', user: qauth_1.default.deny() });
};
exports.login = async (req, res, next) => {
    await express_validator_1.check('email', 'Email is not valid').isEmail().run(req);
    await express_validator_1.check('password', 'Password must be at least 8 characters').isLength({ min: 8 }).run(req);
    await express_validator_1.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
    const errors = express_validator_1.validationResult(req);
    const status = req.body.intercept ? 403 : 200;
    if (!errors.isEmpty()) {
        return res.status(status).send({
            errors: errors.array(),
            userError: 'Something is wrong with those login details, try again.',
            user: qauth_1.default.deny()
        });
    }
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(status).send({
                userError: 'Email and password do not match.',
                user: qauth_1.default.deny()
            });
        }
        let { email, _id, subdom } = user;
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send({
                user: qauth_1.default.approve({ email, id: _id, authed: true, subdom })
            });
        });
    })(req, res, next);
};
exports.signup = async (req, res, next) => {
    await express_validator_1.check('email', 'Email is not valid').isEmail().run(req);
    await express_validator_1.check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).run(req);
    await express_validator_1.check('confirm', 'Passwords do not match').equals(req.body.password).run(req);
    await express_validator_1.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
    const errors = express_validator_1.validationResult(req);
    const status = req.body.intercept ? 403 : 200;
    if (!errors.isEmpty()) {
        return res.status(403).send({
            errors: errors.array(),
            userError: 'Something is wrong with those login details, try again.',
            user: qauth_1.default.deny()
        });
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
            return res.status(403).send({
                user: qauth_1.default.deny(),
                userError: 'That email already exists, did you forget your password?'
            });
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            let { email, _id, subdom } = user;
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).send({
                    user: qauth_1.default.approve({ email, id: _id, authed: true, subdom })
                });
            });
        });
    });
};
exports.updateProfile = async (req, res, next) => {
    await express_validator_1.check('email', 'Please enter a valid email address.').isEmail().run(req);
    // eslint-disable-next-line @typescript-eslint/camelcase
    await express_validator_1.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
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
            // req.flash('success', { msg: 'Profile information has been updated.' })auth
            res.redirect('/account');
        });
    });
};
exports.updatePassword = async (req, res, next) => {
    await express_validator_1.check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req);
    await express_validator_1.check('confirmPassword', 'Passwords do not match').equals(req.body.password).run(req);
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
};
exports.deleteAccount = (req, res, next) => {
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
exports.oAuthUnlink = (req, res, next) => {
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
exports._reset = (req, res, next) => {
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
exports.reset = async (req, res, next) => {
    await express_validator_1.check('password', 'Password must be at least 4 characters long.').isLength({ min: 4 }).run(req);
    await express_validator_1.check('confirm', 'Passwords must match.').equals(req.body.password).run(req);
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
        // res.redirect('/')
    });
};
exports._forgot = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('account/forgot', {
        title: 'Forgot Password'
    });
};
exports.forgot = async (req, res, next) => {
    await express_validator_1.check('email', 'Please enter a valid email address.').isEmail().run(req);
    // eslint-disable-next-line @typescript-eslint/camelcase
    await express_validator_1.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
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
                text: `
You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
Please click on the following link, or paste this into your browser to complete the process:\n\n
http://${req.headers.host}/reset/${token}\n\n
If you did not request this, please ignore this email and your password will remain unchanged.\n
`
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
};
