"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require("async");
const validate = require("express-validator");
const QAuth_1 = require("../QAuth");
const Environment_1 = require("../../providers/Environment");
const User_1 = require("../../models/User");
const sgMail = require('@sendgrid/mail');
class Forgot {
    static perform(req, res, next) {
        validate.check('email', 'Please enter a valid email address.').isEmail();
        // validate.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)
        const errors = validate.validationResult(req);
        async.waterfall([
            function createRandomToken(done) {
                require('crypto').randomBytes(48, function (err, buffer) {
                    const token = buffer.toString('hex');
                    done(err, token);
                });
            },
            function setRandomToken(token, done) {
                User_1.User.findOne({ email: req.body.email }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return res.status(401).send({
                            errors: errors.array(),
                            userContent: 'Account with that email address does not exist.',
                            user: QAuth_1.default.deny()
                        });
                    }
                    user.passwordResetToken = token;
                    user.save((err) => {
                        done(err, token, user);
                    });
                });
            },
            function sendForgotPasswordEmail(token, user, done) {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: user.email,
                    from: 'info@welcomeqr.codes',
                    subject: 'Reset your password on WelcomeQR Codes',
                    html: `<p>
							You are receiving this email because you have requested the reset of the password for your account.\n\n
							Please click on the following link, or paste this into your browser to complete the process:\n\n\n
							<a href="${Environment_1.default.config().baseUrl}/auth/reset?token=${token}">Click here.</a>\n\n\n
							If you did not request this, please ignore this email and your password will remain unchanged.\n
						</p>`
                };
                sgMail.send(msg);
                done(null);
                return res.status(200).send({
                    errors: errors.array(),
                    userContent: 'We have sent you an email with instructions on how to reset your password!',
                    user: QAuth_1.default.deny()
                });
            }
        ], (err) => {
            if (err) {
                return next(err);
            }
        });
    }
}
exports.default = Forgot;
//# sourceMappingURL=Forgot.js.map