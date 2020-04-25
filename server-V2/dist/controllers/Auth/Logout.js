"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logout {
    static perform(req, res) {
        req.logout();
        return res.status(200).send({ userContent: 'see you later, aligator', user: { email: null, _id: null, authed: false } });
    }
}
exports.default = Logout;
//# sourceMappingURL=Logout.js.map