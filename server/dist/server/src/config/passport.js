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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const lodash_1 = __importDefault(require("lodash"));
const User_1 = require("../models/User");
const app_1 = require("../app");
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(undefined, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    User_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport_1.default.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
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
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: `${process.env.NODE_ENV === 'production' ? app_1.PROD_URL : app_1.DEV_URL}/auth/google/callback`
}, (access, refresh, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(access, refresh, profile, done);
})));
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/?authRedirect=true');
};
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];
    const user = req.user;
    if (lodash_1.default.find(user.tokens, { kind: provider }))
        next();
    else
        res.redirect(`/auth/${provider}`);
};
//# sourceMappingURL=passport.js.map