"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
const QAuth_1 = require("../QAuth");
class VerifyEmail {
    static perform(req, res, next) {
        User_1.User.findOne({ emailVerifyToken: req.body.token }).exec((err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send({
                    userContent: 'Verify token is invalid or has expired.',
                    user: QAuth_1.default.deny()
                });
            }
            user.emailVerified = true;
            user.emailVerifyToken = undefined;
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).send({
                    userContent: 'Email verified',
                    user: QAuth_1.default.approve(user)
                });
            });
        });
    }
}
exports.default = VerifyEmail;
//# sourceMappingURL=VerifyEmail.js.map