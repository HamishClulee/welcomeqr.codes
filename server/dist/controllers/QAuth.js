'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate = require("express-validator");
const passport = require("passport");
const WelcomeEmail = require("../resources/emails/welcome");
const ResetEmail = require("../resources/emails/resetconfirm");
const ForgotPassword = require("../resources/emails/forgot");
const User_1 = require("../models/User");
const Environment_1 = require("../providers/Environment");
const Clean_1 = require("./Clean");
const SendGrid = require('@sendgrid/mail');
exports.login = (req, res, next) => {
    validate.check('email', 'E-mail cannot be blank').notEmpty();
    validate.check('email', 'E-mail is not valid').isEmail();
    validate.check('password', 'Password cannot be blank').notEmpty();
    validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
    const errors = validate.validationResult(req);
    if (!errors.isEmpty()) {
        return Clean_1.default.authError('login', `Validation error: ${String(errors)}`, res, req.body.intercept);
    }
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return Clean_1.default.authError('login::passport::err', err, res, req.body.intercept);
            }
            if (!user) {
                return Clean_1.default.authError('login::passport::no-user', err, res, req.body.intercept);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return Clean_1.default.authError('login::passport::login-err', err, res, req.body.intercept);
                }
                return Clean_1.default.approve(res, 200, user);
            });
        })(req, res);
    }
    catch (e) {
        return Clean_1.default.authError('login', `caught error: ${e}`, res, req.body.intercept);
    }
};
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    validate.check('email', 'E-mail cannot be blank').notEmpty();
    validate.check('email', 'E-mail is not valid').isEmail();
    validate.check('password', 'Password cannot be blank').notEmpty();
    validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
    const errors = validate.validationResult(req);
    if (!errors.isEmpty()) {
        return Clean_1.default.authError('login', `Validation error: ${errors.array()}`, res, req.body.intercept);
    }
    try {
        const token = yield require('crypto').randomBytes(48, (err, buffer) => {
            return buffer.toString('hex');
        });
        let existinguser = yield User_1.User.findOne({ email: req.body.email });
        if (existinguser) {
            return Clean_1.default.approve(res, 200, existinguser);
        }
        const user = new User_1.User({
            email: req.body.email,
            password: req.body.password,
            emailVerifyToken: token
        });
        yield user.save();
        req.logIn(user, () => {
            SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
            SendGrid.send({
                to: user.email,
                from: 'noreply@welcomeqr.codes',
                subject: 'A warm welcome from Welcome QR Codes',
                html: WelcomeEmail.build(`${Environment_1.default.config().baseUrl}/account?token=${token}`)
            });
            return Clean_1.default.approve(res, 200, user);
        });
    }
    catch (e) {
        return Clean_1.default.authError('signup', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield req.logout();
        return Clean_1.default.deny(res, 401);
    }
    catch (e) {
        return Clean_1.default.authError('logout', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.sessionchallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.passport) {
            Clean_1.default.deny(res, 403);
        }
        const user = yield User_1.User.findOne({ _id: req.session.passport.user });
        if (user) {
            return Clean_1.default.approve(res, 200, user);
        }
        return Clean_1.default.deny(res, 401, 'You do not exist.');
    }
    catch (e) {
        return Clean_1.default.authError('session challenge', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.togglesubscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.passport) {
            return Clean_1.default.deny(res, 401, 'No user logged in');
        }
        const user = yield User_1.User.findOneAndUpdate({ _id: req.session.passport.user }, { allowEmails: req.body.subscribe }, { new: true });
        if (!user) {
            return Clean_1.default.deny(res, 403, 'Account with that email address does not exist.');
        }
        return Clean_1.default.approve(res, 200, user);
    }
    catch (e) {
        return Clean_1.default.authError('toggle subscribe', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.verifyemail = (req, res, IResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ emailVerifyToken: req.body.token });
        if (!user) {
            return Clean_1.default.deny(res, 401, 'Verify token is invalid or has expired.');
        }
        user.emailVerified = true;
        user.emailVerifyToken = undefined;
        yield user.save();
        return Clean_1.default.approve(res, 200, user);
    }
    catch (e) {
        return Clean_1.default.authError('verify email', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.resetpassword = (req, res, IResponse) => __awaiter(void 0, void 0, void 0, function* () {
    validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req);
    validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req);
    const errors = validate.validationResult(req);
    if (!errors.isEmpty()) {
        return Clean_1.default.deny(res, 403, 'Validation error');
    }
    try {
        const user = yield User_1.User.findOne({ passwordResetToken: req.body.token });
        if (!user) {
            return Clean_1.default.deny(res, 401, 'No user.');
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        yield user.save();
        req.logIn(user, () => {
            SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
            SendGrid.send({
                to: user.email,
                from: 'noreply@welcomeqr.codes',
                subject: 'Password Changed Successfully',
                html: ResetEmail.build()
            });
        });
    }
    catch (e) {
        return Clean_1.default.authError('reset password', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.forgotpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = require('crypto').randomBytes(48, (err, buffer) => {
            return buffer.toString('hex');
        });
        const user = yield User_1.User.findOne({ email: req.body.email });
        if (!user) {
            return Clean_1.default.deny(res, 403, 'No user.');
        }
        user.passwordResetToken = token;
        yield user.save();
        SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
        SendGrid.send({
            to: user.email,
            from: 'noreply@welcomeqr.codes',
            subject: 'Reset your password on WelcomeQR Codes',
            html: ForgotPassword.build(`${Environment_1.default.config().baseUrl}/auth/reset?token=${token}`)
        });
        return Clean_1.default.approve(res, 200, user);
    }
    catch (e) {
        return Clean_1.default.authError('forgot password', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.usersettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.passport) {
            return Clean_1.default.deny(res, 403, 'No user logged in.');
        }
        const user = yield User_1.User.findOne({ _id: req.session.passport.user });
        if (!user) {
            return Clean_1.default.deny(res, 403, 'No user exists.');
        }
        return Clean_1.default.settings(res, user);
    }
    catch (e) {
        return Clean_1.default.authError('user settings', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.contact = (req, res) => {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    SendGrid.send({
        to: Environment_1.default.config().internalEmail,
        from: 'contact@welcomeqr.codes',
        subject: 'New contact from Welcome QR',
        html: `
			<p><b>From:</b> ${req.body.name}</p>
			<p><b>Email:</b> ${req.body.email}</p>
			<p><b>Selected:</b> ${req.body.selectVal}</p>
			<p><b>Message:</b> ${req.body.message}</p>
		`
    });
    return Clean_1.default.success(res, 200);
};
//# sourceMappingURL=QAuth.js.map