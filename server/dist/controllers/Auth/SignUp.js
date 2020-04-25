"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
const Log_1 = require("../../middlewares/Log");
const { assert, sanitize, validationResult } = require('express-validator');
class SignUp {
    static perform(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Log_1.default.info('Bad signup details', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
            return res.status(400).send({
                errors: errors.array(),
                userContent: 'signup deets bad',
                user: { email: null, _id: null, authed: false }
            });
        }
        const user = new User_1.User({
            email: req.body.email,
            password: req.body.password
        });
        User_1.User.findOne({ email: req.body.email }, (err, existingUser) => {
            if (err) {
                Log_1.default.info('Signup database fail (1)', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                return next(err);
            }
            if (existingUser) {
                Log_1.default.info('Signup success', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                let { email, _id } = existingUser;
                return res.status(200).send({ userContent: 'account already exists!', user: { email, id: _id, authed: true } });
            }
            user.save((err) => {
                if (err) {
                    Log_1.default.info('Signup database failure (2)', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                    return next(err);
                }
                let { email, _id } = user;
                req.logIn(user, (err) => {
                    if (err) {
                        Log_1.default.info('Signup database failure (3)', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                        return next(err);
                    }
                    Log_1.default.info('Signup success', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                    return res.status(200).send({ userContent: 'Hi dude man', user: { email, id: _id, authed: true } });
                });
            });
        });
    }
}
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map