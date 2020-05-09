"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const validate = require("express-validator");
const Log_1 = require("../../middlewares/Log");
const QAuth_1 = require("../QAuth");
class LogIn {
    static perform(req, res, next) {
        validate.check('email', 'E-mail cannot be blank').notEmpty();
        validate.check('email', 'E-mail is not valid').isEmail();
        validate.check('password', 'Password cannot be blank').notEmpty();
        validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
        const errors = validate.validationResult(req);
        if (!errors.isEmpty()) {
            Log_1.default.info('Bad login details', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
            return res.status(400).send({
                errors: errors.array(),
                userContent: 'signup deets bad',
                user: QAuth_1.default.deny()
            });
        }
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                Log_1.default.info('Passport login authenticate failure', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
                return next(err);
            }
            if (!user) {
                Log_1.default.info('Invalid email entered', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
                return res.status(400).send({
                    userContent: 'no user exists',
                    user: QAuth_1.default.deny()
                });
            }
            let { email, _id, subdom } = user;
            req.logIn(user, (err) => {
                if (err) {
                    Log_1.default.info('Login error - database', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
                    return next(err);
                }
                Log_1.default.info('Login succes', [Log_1.default.TAG_AUTH, Log_1.default.TAG_LOGIN]);
                return res.status(200).send({
                    userContent: 'you sexy beast, welcome home',
                    user: QAuth_1.default.approve(user)
                });
            });
        })(req, res, next);
    }
}
exports.default = LogIn;
//# sourceMappingURL=Login.js.map