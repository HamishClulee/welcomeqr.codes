"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Locals_1 = require("../../providers/Locals");
class Home {
    static index(req, res, next) {
        return res.json({
            message: Locals_1.default.config().name
        });
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map