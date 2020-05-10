"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = require("express-validator");
const WelcomeEmail = require("../../resources/emails/welcome");
const User_1 = require("../../models/User");
const Environment_1 = require("../../providers/Environment");
const Log_1 = require("../../middlewares/Log");
const QAuth_1 = require("../QAuth");
const sgMail = require('@sendgrid/mail');
class SignUp {
    static perform(req, res, next) {
        validate.check('email', 'E-mail cannot be blank').notEmpty();
        validate.check('email', 'E-mail is not valid').isEmail();
        validate.check('password', 'Password cannot be blank').notEmpty();
        validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
        const errors = validate.validationResult(req);
        let token;
        // Initiated at EOF
        const initSignUpWithTokenGen = () => {
            require('crypto').randomBytes(48, (err, buffer) => {
                token = buffer.toString('hex');
                buildUser();
            });
        };
        const buildUser = () => {
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
                    return res.status(200).send({
                        userContent: 'account already exists!',
                        user: QAuth_1.default.approve(existingUser)
                    });
                }
                user.emailVerifyToken = token;
                user.save((err) => {
                    if (err) {
                        Log_1.default.info('Signup database failure (2)', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                        return next(err);
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            Log_1.default.info('Signup database failure (3)', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                            return next(err);
                        }
                        Log_1.default.info('Signup success', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                        const msg = {
                            to: user.email,
                            from: 'noreply@welcomeqr.codes',
                            subject: 'A warm welcome from Welcome QR Codes',
                            html: WelcomeEmail.build(`${Environment_1.default.config().baseUrl}/account?token=${token}`)
                        };
                        sgMail.send(msg);
                        return res.status(200).send({
                            userContent: 'Hi dude man',
                            user: QAuth_1.default.approve(user)
                        });
                    });
                });
            });
        };
        // Validation errors exist
        if (!errors.isEmpty()) {
            Log_1.default.info('Bad signup details', [Log_1.default.TAG_AUTH, Log_1.default.TAG_SIGNUP]);
            return res.status(400).send({
                errors: errors.array(),
                userContent: 'signup deets bad',
                user: QAuth_1.default.deny()
            });
            // Good to go!
        }
        else {
            initSignUpWithTokenGen();
        }
    }
}
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map