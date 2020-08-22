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
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../models/User");
const LocalStrategy = passportLocal.Strategy;
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        User_1.User.findById(id, (err, user) => {
            done(err, user);
        });
    }
    else {
        console.log('saved new user !');
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
    if (req.user) {
        User_1.User.findOne({ google: profile.id }, (err, existingUser) => {
            if (err) {
                return done(err);
            }
            if (existingUser) {
                // req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' })
                return done(err);
            }
            else {
                User_1.User.findById(req.user.id, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    user.google = profile.id;
                    user.tokens.push({ kind: 'google', accessToken });
                    user.save((err) => {
                        // req.flash('info', { msg: 'Google account has been linked.' })
                        return done(err, user);
                    });
                });
            }
        });
    }
    else {
        User_1.User.findOne({ google: profile.id }, (err, existingUser) => {
            if (err) {
                return done(err);
            }
            if (existingUser) {
                return done(null, existingUser);
            }
            User_1.User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
                if (err) {
                    return done(err);
                }
                if (existingEmailUser) {
                    // req.flash('errors', { msg: 'There is already an account using this email address. Sing in to that accoount and link it with Google manually from Account Settings.' })
                    return done(err);
                }
                else {
                    const user = new User_1.User();
                    user.email = profile.emails[0].value;
                    user.google = profile.id;
                    user.tokens.push({ kind: 'google', accessToken });
                    user.save((err) => {
                        return done(err, user);
                    });
                }
            });
        });
    }
})));
exports.isReqAllowed = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    } // if there isn't any token
    jsonwebtoken_1.default.verify(token, Environment_1.default.get().tokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect('/?authRedirect=true');
        }
    });
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