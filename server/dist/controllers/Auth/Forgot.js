"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = require("express-validator");
const html = require("../../resources/emails/forgot");
const QAuth_1 = require("../QAuth");
const Environment_1 = require("../../providers/Environment");
const User_1 = require("../../models/User");
const sgMail = require('@sendgrid/mail');
class Forgot {
    static perform(req, res, next) {
        validate.check('email', 'Please enter a valid email address.').isEmail();
        const errors = validate.validationResult(req);
        let token;
        // Initiated at EOF
        const initTokenEmail = () => {
            require('crypto').randomBytes(48, (err, buffer) => {
                token = buffer.toString('hex');
                addTokenToUser();
            });
        };
        // Initiated at EOF
        const addTokenToUser = () => {
            User_1.User.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    return res.status(403).send({
                        errors: errors.array(),
                        userContent: 'Something went wrong, try again later!',
                        user: QAuth_1.default.deny()
                    });
                }
                if (!user) {
                    return res.status(403).send({
                        errors: errors.array(),
                        userContent: 'Account with that email address does not exist.',
                        user: QAuth_1.default.deny()
                    });
                }
                user.passwordResetToken = token;
                user.save((err) => {
                    if (err) {
                        return res.status(403).send({
                            errors: errors.array(),
                            userContent: 'Something went wrong, try again later!',
                            user: QAuth_1.default.deny()
                        });
                    }
                    else {
                        sendResetEmail(user);
                    }
                });
            });
        };
        // Initiated at EOF
        function sendResetEmail(user) {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            // console.log(html.build(`${Environment.config().baseUrl}/auth/reset?token=${token}`))
            const msg = {
                to: user.email,
                from: 'info@welcomeqr.codes',
                subject: 'Reset your password on WelcomeQR Codes',
                html: html.build(`${Environment_1.default.config().baseUrl}/auth/reset?token=${token}`)
            };
            sgMail.send(msg);
            return res.status(200).send({
                errors: errors.array(),
                userContent: 'We have sent you an email with instructions on how to reset your password!',
                user: QAuth_1.default.deny()
            });
        }
        // Gogo berries! this is the init.
        if (!errors.isEmpty()) {
            return res.status(403).send({
                errors: errors.array(),
                userContent: 'Something went wrong, try again later!',
                user: QAuth_1.default.deny()
            });
        }
        else {
            initTokenEmail();
        }
    }
}
exports.default = Forgot;
//# sourceMappingURL=Forgot.js.map