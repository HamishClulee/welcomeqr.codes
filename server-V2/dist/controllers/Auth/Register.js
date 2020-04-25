"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
class Register {
    static perform(req, res, next) {
        req.assert('email', 'E-mail cannot be blank').notEmpty();
        req.assert('email', 'E-mail is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.assert('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
        req.assert('confirmPassword', 'Confirmation Password cannot be blank').notEmpty();
        req.assert('confirmPassword', 'Password & Confirmation password does not match').equals(req.body.password);
        req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
        const errors = req.validationErrors();
        if (errors) {
            return res.redirect('/signup');
        }
        const user = new User_1.User({
            email: req.body.email,
            password: req.body.password
        });
        User_1.User.findOne({ email: req.body.email }, (err, existingUser) => {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                return res.redirect('/signup');
            }
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                });
            });
        });
    }
}
exports.default = Register;
//# sourceMappingURL=Register.js.map