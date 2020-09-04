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
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passportLocal = require("passport-local");
const lodash_1 = require("lodash");
const mongoose = require("mongoose");
const Environment_1 = require("../providers/Environment");
const jwt = require('jsonwebtoken');
const User_1 = require("../models/User");
const Log_1 = require("../middlewares/Log");
const Clean_1 = require("../middlewares/Clean");
const LocalStrategy = passportLocal.Strategy;
passport.serializeUser((user, done) => {
    Log_1.default.error(`Inside passport.serializeUser == VALUE OF 'user' ==== >>> ${JSON.stringify(user)}`);
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        User_1.User.findById(id, (err, user) => {
            done(err, user);
        });
    }
    else {
        const _user = new User_1.User();
        _user.save();
    }
});
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: 'Invalid email or password.' });
        });
    });
}));
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const url = process.env.NODE_ENV === 'production' ? 'https://welcomeqr.codes' : 'http://localhost:1980';
passport.use(new GoogleStrategy({
    clientID: Environment_1.default.get().googleClientId,
    clientSecret: Environment_1.default.get().googleSecret,
    callbackURL: `${url}/auth/google/callback`
}, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    Log_1.default.error(`Touched passport google authenticate`);
    if (req.user) {
        Log_1.default.error(`Inside if req user ====> VALUE of req.user ==== >>> ${JSON.stringify(req.user)}`);
        User_1.User.findOne({ google: profile.id }, (err, existingUser) => {
            if (err) {
                Log_1.default.error(`Inside user.FindOne - first err -> ${JSON.stringify(err)}`);
                return done(err);
            }
            if (existingUser) {
                // req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' })
                Log_1.default.error(`Inside user.FindOne - second err -> ${JSON.stringify(err)}`);
                return done(err, existingUser);
            }
            else {
                Log_1.default.error(`Inside user.FindOne - else block`);
                User_1.User.findById(req.user.id, (err, user) => {
                    if (err) {
                        Log_1.default.error(`Inside user.findById - err block -> ${JSON.stringify(err)}`);
                        return done(err);
                    }
                    user.google = profile.id;
                    user.tokens.push({ kind: 'google', accessToken });
                    Log_1.default.error(`Inside user.findById - tokens saved to user`);
                    user.save((err) => {
                        Log_1.default.error(`Inside user.findById - complete user => ${JSON.stringify(user)}`);
                        // req.flash('info', { msg: 'Google account has been linked.' })
                        return done(err, user);
                    });
                });
            }
        });
    }
    else {
        Log_1.default.error(`Inside new user, no email exists`);
        User_1.User.findOne({ google: profile.id }, (err, existingUser) => {
            if (err) {
                Log_1.default.error(`New email - first err -> ${JSON.stringify(err)}`);
                return done(err);
            }
            if (existingUser) {
                Log_1.default.error(`New email - second err -> ${JSON.stringify(existingUser)}`);
                return done(null, existingUser);
            }
            Log_1.default.error(`Value of profile ==> RETURNED FROM GOOGLE  ===> ${JSON.stringify(profile)}`);
            User_1.User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
                if (err) {
                    Log_1.default.error(`New email - THIS IS THE BAD JUJU -> ${JSON.stringify(err)}`);
                    return done(err);
                }
                if (existingEmailUser) {
                    Log_1.default.error(`New email - Value of existing user with existing email -> ${JSON.stringify(existingEmailUser) || '**empty**'}`);
                    return done(null, existingEmailUser);
                }
                else {
                    Log_1.default.error(`New email - creating new user -> ${JSON.stringify(err)}`);
                    const user = new User_1.User();
                    user.email = profile.emails[0].value;
                    user.google = profile.id;
                    user.tokens.push({ kind: 'google', accessToken });
                    user.save((err) => {
                        Log_1.default.error(`New email - ERROR SAVING EMAIL? -> ${JSON.stringify(err)}`);
                        return done(err, user);
                    });
                }
            });
        });
    }
})));
exports.isReqAllowed = (req, res, next) => {
    Log_1.default.error(`Touched isReqAllowed`);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null && req.isAuthenticated()) {
        // No token exists but a session does exist
        // => grant user a token
        Log_1.default.info(`Value of session === > ${JSON.stringify(req.session)}`);
        User_1.User.findOne({ _id: req.session.passport.user }, (err, user) => {
            if (!err) {
                const sess = {
                    userid: user._id,
                    email: user.email,
                    role: user.role,
                    subdom: user.subdom
                };
                Log_1.default.error(`Inside isReqAllowed == value of user =====> ${JSON.stringify(sess)}`);
                jwt.sign(sess, Environment_1.default.get().tokenSecret, { expiresIn: `2 days` });
                next();
            }
            else {
                Log_1.default.info(`Some thing strange happened in isReqAllowed, error thrown === > ${JSON.stringify(err) || '**empty**'}`);
                req.logout();
                Log_1.default.info(`Value of session (after req.logout) === > ${JSON.stringify(req.session)}`);
                return Clean_1.default.deny(res, 403, 'DB error of some sort.');
            }
        });
    }
    else if (token === null && !req.isAuthenticated()) {
        // No session, No Token
        // => deny/kill user
        return Clean_1.default.deny(res);
    }
    else if (token && req.isAuthenticated()) {
        Log_1.default.error(`Inside third if block`);
        // session and token exist
        // => verify token
        jwt.verify(token, Environment_1.default.get().tokenSecret, (err, user) => {
            if (err) {
                // Token exists but failed verification
                // This is a big red flag, I think
                Log_1.default.error(`Token modified by userid ===> ${JSON.stringify(req.session.user)}`, [
                    Log_1.default.TAG_FAILED_CHALLENGE,
                    Log_1.default.TAG_AUTH
                ]);
                return Clean_1.default.deny(res);
            }
            else {
                next();
            }
        });
    }
    else {
        return Clean_1.default.deny(res, 200);
    }
};
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];
    const user = req.session.user;
    if (lodash_1.default.find(user.tokens, { kind: provider })) {
        next();
    }
    else {
        res.redirect(`/auth/${provider}`);
    }
};
//# sourceMappingURL=passport.js.map