"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QAuth_1 = require("../QAuth");
const User_1 = require("../../models/User");
class ToggleSubscribe {
    static perform(req, res) {
        if (!req.session.passport) {
            return res.status(401).send({
                status: 401,
                message: 'No user logged in.',
                user: QAuth_1.default.deny()
            });
        }
        else {
            console.log(req.body.subscribe);
            User_1.User.findOneAndUpdate({ _id: req.session.passport.user }, { allowEmails: req.body.subscribe }, { new: true }, (err, user) => {
                if (err) {
                    return res.status(403).send({
                        userContent: 'Something went wrong, try again later!',
                        user: QAuth_1.default.deny()
                    });
                }
                if (!user) {
                    return res.status(403).send({
                        userContent: 'Account with that email address does not exist.',
                        user: QAuth_1.default.deny()
                    });
                }
                else {
                    return res.status(200).send({
                        userContent: 'updates! updates! updates!',
                        user: QAuth_1.default.settings(user)
                    });
                }
            });
        }
    }
}
exports.default = ToggleSubscribe;
//# sourceMappingURL=ToggleSubscribe.js.map