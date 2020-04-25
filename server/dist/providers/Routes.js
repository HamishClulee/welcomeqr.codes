"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../middlewares/Log");
const Auth_1 = require("./../routes/Auth");
class Routes {
    mountAuth(_express) {
        Log_1.default.info('Routes :: Mounting API Routes...');
        return _express.use(`/auth`, Auth_1.default);
    }
}
exports.default = new Routes;
//# sourceMappingURL=Routes.js.map