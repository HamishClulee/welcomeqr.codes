"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = require("express-validator");
const User_1 = require("../../models/User");
const QAuth_1 = require("../QAuth");
const sgMail = require('@sendgrid/mail');
class Reset {
    static perform(req, res, next) {
        validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req);
        validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req);
        const errors = validate.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).send({
                errors: errors.array(),
                userContent: 'Error validating those details...',
                user: QAuth_1.default.deny()
            });
        }
        let _user;
        function resetPassword() {
            User_1.User.findOne({ passwordResetToken: req.body.token })
                .exec((err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).send({
                        errors: errors.array(),
                        userContent: 'Password reset token is invalid or has expired.',
                        user: QAuth_1.default.deny()
                    });
                }
                user.password = req.body.password;
                user.passwordResetToken = undefined;
                _user = user;
                user.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    req.logIn(user, null);
                    sendResetPasswordEmail();
                });
            });
        }
        function sendResetPasswordEmail() {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: _user.email,
                from: 'info@welcomeqr.codes',
                subject: 'Your Password Reset Link',
                text: `Hello,\n\nThis is a confirmation that the password for your account ${_user.email} has just been changed.\n`,
                html: '<strong>and easy to do anywhere, even with Node.js</strong>'
            };
            sgMail.send(msg);
            return res.status(200).send({
                errors: errors.array(),
                userContent: 'Password has been reset!',
                user: QAuth_1.default.deny()
            });
        }
    }
}
exports.default = Reset;
//# sourceMappingURL=Reset.js.map