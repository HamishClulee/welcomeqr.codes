"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const { assert, sanitize, validationResult } = require('express-validator');
const Log_1 = require("../../middlewares/Log");
class Login {
    static perform(req, res, next) {
        // assert('email', 'E-mail cannot be blank').notEmpty()
        // assert('email', 'E-mail is not valid').isEmail()
        // assert('password', 'Password cannot be blank').notEmpty()
        // assert('password', 'Password length must be atleast 8 characters').isLength({ min: 8 })
        // sanitize('email').normalizeEmail({ gmail_remove_dots: false })
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        // 	Log.info('Bad login details', [Log.TAG_AUTH, Log.TAG_LOGIN])
        // 	return res.status(400).send({
        // 		errors: errors.array(),
        // 		userContent: 'signup deets bad',
        // 		user: { email: null, _id: null, authed: false }
        // 	})
        // }
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                Log_1.default.info('Passport login authenticate failure', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
                return next(err);
            }
            if (!user) {
                Log_1.default.info('Invalid email entered', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
                return res.status(400).send({
                    userContent: 'no user exists',
                    user: { email: null, _id: null, authed: false }
                });
            }
            let { email, _id } = user;
            req.logIn(user, (err) => {
                if (err) {
                    Log_1.default.info('Login error - database', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
                    return next(err);
                }
                Log_1.default.info('Login succes', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
                return res.status(200).send({
                    userContent: 'you sexy beast, welcome home',
                    user: { email, id: _id, authed: true }
                });
            });
        })(req, res, next);
    }
}
exports.default = Login;
//# sourceMappingURL=Login.js.map