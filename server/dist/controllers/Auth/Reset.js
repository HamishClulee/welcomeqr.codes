"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = require("express-validator");
const User_1 = require("../../models/User");
const ResetEmail = require("../../resources/emails/resetconfirm");
const QAuth_1 = require("../QAuth");
const sgMail = require('@sendgrid/mail');
class Reset {
    static perform(req, res, next) {
        validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req);
        validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req);
        const errors = validate.validationResult(req);
        let _user;
        // Initiated at EOF
        const resetPassword = () => {
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
                user.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    req.logIn(user, () => {
                        sendResetPasswordEmail(user);
                    });
                });
            });
        };
        // Initiated at EOF
        const sendResetPasswordEmail = (user) => {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: user.email,
                from: 'noreply@welcomeqr.codes',
                subject: 'Password Changed Successfully',
                html: ResetEmail.build()
            };
            sgMail.send(msg);
            return res.status(200).send({
                errors: errors.array(),
                userContent: 'Password has been reset!',
                user: QAuth_1.default.approve(user)
            });
        };
        // Gogo berries! this is the init.
        if (!errors.isEmpty()) {
            return res.status(403).send({
                errors: errors.array(),
                userContent: 'Something went wrong, try again later!',
                user: QAuth_1.default.deny()
            });
        }
        else {
            resetPassword();
        }
    }
}
exports.default = Reset;
//# sourceMappingURL=Reset.js.map