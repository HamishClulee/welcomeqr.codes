"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const lodash_1 = __importDefault(require("lodash"));
const passport_google_id_token_1 = __importDefault(require("passport-google-id-token"));
const User_1 = require("../models/User");
const app_1 = require("../app");
const secrets_1 = require("../util/secrets");
passport_1.default.use(new passport_google_id_token_1.default({ clientID: secrets_1.GOOGLE_OAUTH_ID, }, (_parsedToken, googleId, done) => {
    console.log(User_1.User);
    // User.findOrCreate({ googleId: googleId }, function (err: any, user: any) {
    //     return done(err, user);
    // });
}));
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
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: `${process.env.NODE_ENV === 'production' ? app_1.PROD_URL : app_1.DEV_URL}/auth/google/callback`
}, async (access, refresh, profile, done) => {
    console.log(access, refresh, profile, done);
}));
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
