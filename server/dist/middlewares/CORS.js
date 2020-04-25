"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const Log_1 = require("./Log");
// import Locals from '../providers/Locals'
class CORS {
    mount(_express) {
        Log_1.default.info('Booting the \'CORS\' middleware...');
        _express.use(cors({ origin: 'http://localhost:8080', credentials: true }));
        return _express;
    }
}
exports.default = new CORS;
//# sourceMappingURL=CORS.js.map