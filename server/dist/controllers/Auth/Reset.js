"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = require("express-validator");
const async = require("async");
const nodemailer = require("nodemailer");
const nodemailer_sparkpost_transport_1 = require("nodemailer-sparkpost-transport");
const Environment_1 = require("../../providers/Environment");
const User_1 = require("../../models/User");
class Reset {
    static perform(req, res, next) {
        validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req);
        validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req);
        const errors = validate.validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('back');
        }
        async.waterfall([
            function resetPassword(done) {
                User_1.User
                    .findOne({ passwordResetToken: req.params.token })
                    .where('passwordResetExpires').gt(Date.now())
                    .exec((err, user) => {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        // --> 'Password reset token is invalid or has expired.'
                        return res.redirect('back');
                    }
                    user.password = req.body.password;
                    user.passwordResetToken = undefined;
                    user.passwordResetExpires = undefined;
                    user.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        req.logIn(user, (err) => {
                            done(err, user);
                        });
                    });
                });
            },
            function sendResetPasswordEmail(user, done) {
                const transporter = nodemailer.createTransport(nodemailer_sparkpost_transport_1.default({
                    sparkPostApiKey: Environment_1.default.config().sparkSecret
                }));
                const mailOptions = {
                    to: user.email,
                    from: 'WelcomeQR Codes',
                    subject: 'Your Password Reset Link',
                    text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
                };
                transporter.sendMail(mailOptions, (err) => {
                    // --> 'Success! Your password has been changed.'
                    done(err);
                });
            }
        ], (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/mailerror=true');
        });
    }
}
exports.default = Reset;
//# sourceMappingURL=Reset.js.map