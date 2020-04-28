"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = require("express-validator");
const User_1 = require("../../models/User");
const Log_1 = require("../../middlewares/Log");
const QAuth_1 = require("../QAuth");
class SignUp {
    static perform(req, res, next) {
        const errors = validate.validationResult(req);
        if (!errors.isEmpty()) {
            Log_1.default.info('Bad signup details', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
            return res.status(400).send({
                errors: errors.array(),
                userContent: 'signup deets bad',
                user: QAuth_1.default.deny()
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
                let { email, _id, subdom } = existingUser;
                return res.status(200).send({
                    userContent: 'account already exists!',
                    user: QAuth_1.default.approve({ email, id: _id, authed: true, subdom })
                });
            }
            user.save((err) => {
                if (err) {
                    Log_1.default.info('Signup database failure (2)', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                    return next(err);
                }
                let { email, _id, subdom } = user;
                req.logIn(user, (err) => {
                    if (err) {
                        Log_1.default.info('Signup database failure (3)', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                        return next(err);
                    }
                    Log_1.default.info('Signup success', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                    return res.status(200).send({
                        userContent: 'Hi dude man',
                        user: QAuth_1.default.approve({ email, id: _id, authed: true, subdom })
                    });
                });
            });
        });
    }
}
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map