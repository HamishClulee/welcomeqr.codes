"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
const QAuth_1 = require("../QAuth");
class SessionChallenge {
    static perform(req, res, next) {
        if (!req.session.passport) {
            return res.status(401).send({
                status: 401,
                message: 'No user logged in.',
                user: QAuth_1.default.deny()
            });
        }
        else {
            User_1.User.findOne({ _id: req.session.passport.user }, (err, user) => {
                if (err) {
                    return res.status(401).send({
                        message: 'You are not authenticated.',
                        user: QAuth_1.default.deny()
                    });
                }
                if (user) {
                    return res.status(200).send({
                        msg: 'you are a premium user',
                        user: QAuth_1.default.approve(user)
                    });
                }
                else {
                    return res.status(401).send({
                        message: 'You do not exist.',
                        user: QAuth_1.default.deny()
                    });
                }
            });
        }
    }
}
exports.default = SessionChallenge;
//# sourceMappingURL=SessionChallenge.js.map