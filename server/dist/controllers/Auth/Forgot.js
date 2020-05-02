"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require("async");
const validate = require("express-validator");
const nodemailer = require("nodemailer");
const nodemailer_sparkpost_transport_1 = require("nodemailer-sparkpost-transport");
const Environment_1 = require("../../providers/Environment");
const User_1 = require("../../models/User");
class Forgot {
    static perform(req, res, next) {
        validate.check('email', 'Please enter a valid email address.').isEmail().run(req);
        validate.sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
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
                        // --> 'Account with that email address does not exist.'
                        return res.redirect('/forgot');
                    }
                    user.passwordResetToken = token;
                    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                    user.save((err) => {
                        done(err, token, user);
                    });
                });
            },
            function sendForgotPasswordEmail(token, user, done) {
                const transporter = nodemailer.createTransport(nodemailer_sparkpost_transport_1.default({
                    sparkPostApiKey: Environment_1.default.config().sparkSecret
                }));
                const mailOptions = {
                    to: user.email,
                    from: 'hackathon@starter.com',
                    subject: 'Reset your password on Hackathon Starter',
                    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
							Please click on the following link, or paste this into your browser to complete the process:\n\n
							http://${req.headers.host}/reset/${token}\n\n
							If you did not request this, please ignore this email and your password will remain unchanged.\n`
                };
                transporter.sendMail(mailOptions, (err) => {
                    // --> `An e-mail has been sent to ${user.email} with further instructions.`
                    done(err);
                });
            }
        ], (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/forgot');
        });
    }
}
exports.default = Forgot;
//# sourceMappingURL=Forgot.js.map