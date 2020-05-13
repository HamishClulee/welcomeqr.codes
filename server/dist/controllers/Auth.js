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
const User_1 = require("../models/User");
const Environment_1 = require("../providers/Environment");
const Mister_1 = require("./Mister");
const sgMail = require('@sendgrid/mail');
exports.login = (req, res, next) => {
    validate.check('email', 'E-mail cannot be blank').notEmpty();
    validate.check('email', 'E-mail is not valid').isEmail();
    validate.check('password', 'Password cannot be blank').notEmpty();
    validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
    const errors = validate.validationResult(req);
    if (!errors.isEmpty()) {
        Mister_1.default.authError('login', `Validation error: ${String(errors)}`, res, req.body.intercept);
    }
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                Mister_1.default.authError('login::passport::err', err, res, req.body.intercept);
            }
            if (!user) {
                Mister_1.default.authError('login::passport::no-user', err, res, req.body.intercept);
            }
            req.logIn(user, (err) => {
                if (err) {
                    Mister_1.default.authError('login::passport::login-err', err, res, req.body.intercept);
                }
                Mister_1.default.approve(res, 200, user);
            });
        })(req, res);
    }
    catch (e) {
        Mister_1.default.authError('login', `caught error: ${e}`, res, req.body.intercept);
    }
};
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    validate.check('email', 'E-mail cannot be blank').notEmpty();
    validate.check('email', 'E-mail is not valid').isEmail();
    validate.check('password', 'Password cannot be blank').notEmpty();
    validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
    const errors = validate.validationResult(req);
    if (!errors.isEmpty()) {
        Mister_1.default.authError('login', `Validation error: ${errors.array()}`, res, req.body.intercept);
    }
    try {
        const token = yield require('crypto').randomBytes(48, (err, buffer) => {
            return buffer.toString('hex');
        });
        let existinguser = yield User_1.User.findOne({ email: req.body.email });
        if (existinguser) {
            Mister_1.default.approve(res, 200, existinguser);
        }
        else {
            const user = new User_1.User({
                email: req.body.email,
                password: req.body.password,
                emailVerifyToken: token
            });
            yield user.save();
            req.logIn(user, () => {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                sgMail.send({
                    to: user.email,
                    from: 'noreply@welcomeqr.codes',
                    subject: 'A warm welcome from Welcome QR Codes',
                    html: WelcomeEmail.build(`${Environment_1.default.config().baseUrl}/account?token=${token}`)
                });
                Mister_1.default.approve(res, 200, user);
            });
        }
    }
    catch (e) {
        Mister_1.default.authError('signup', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield req.logout();
        Mister_1.default.deny(res, 401);
    }
    catch (e) {
        Mister_1.default.authError('logout', `caught error: ${e}`, res, req.body.intercept);
    }
});
exports.sessionchallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.passport) {
            Mister_1.default.deny(res, 403);
        }
        const user = yield User_1.User.findOne({ _id: req.session.passport.user });
        if (user) {
            Mister_1.default.approve(res, 200, user);
        }
        Mister_1.default.deny(res, 401, 'You do not exist.');
    }
    catch (e) {
        Mister_1.default.authError('session challenge', `caught error: ${e}`, res, req.body.intercept);
    }
});
//# sourceMappingURL=Auth.js.map