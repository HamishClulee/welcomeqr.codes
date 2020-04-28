"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QAuth_1 = require("../QAuth");
class LogOut {
    static perform(req, res) {
        req.logout();
        return res.status(200).send({
            userContent: 'see you later, aligator',
            user: QAuth_1.default.deny()
        });
    }
}
exports.default = LogOut;
//# sourceMappingURL=Logout.js.map