"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
class SessionChallenge {
    static perform(req, res, next) {
        if (!req.session.passport) {
            return res.status(401).send({
                status: 401,
                message: 'No user logged in.',
                user: { email: null, _id: null, authed: false }
            });
        }
        else {
            User_1.User.findOne({ _id: req.session.passport.user }, (err, user) => {
                if (err) {
                    return res.status(401).send({
                        status: 401,
                        message: 'You are not authenticated.',
                        user: { email: null, _id: null, authed: false }
                    });
                }
                if (user) {
                    let { email, _id } = user;
                    return res.status(200).send({
                        msg: 'you are a premium user',
                        user: { email, id: _id, authed: true }
                    });
                }
                else {
                    return res.status(401).send({
                        status: 401,
                        message: 'You do not exist.',
                        user: { email: null, _id: null, authed: false }
                    });
                }
            });
        }
    }
}
exports.default = SessionChallenge;
//# sourceMappingURL=SessionChallenge.js.map