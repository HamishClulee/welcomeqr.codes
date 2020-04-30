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
const Environment_1 = require("../providers/Environment");
const User_1 = require("../models/User");
const LocalStrategy = passportLocal.Strategy;
passport.serializeUser((user, done) => {
    done(undefined, user.id);
});
passport.deserializeUser((id, done) => {
    User_1.User.findById(id, (err, user) => {
        done(err, user);
    });
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
let GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: Environment_1.default.config().googleClientId,
    clientSecret: Environment_1.default.config().googleSecret,
    callbackURL: `${process.env.NODE_ENV === 'production'
        ? Environment_1.default.config().prodUrl
        : Environment_1.default.config().devUrl}/auth/google/callback`
}, (access, refresh, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(access, refresh, profile, done);
})));
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/?authRedirect=true');
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