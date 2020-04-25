"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import CORS from './CORS'
const Http_1 = require("./Http");
// import Statics from './Statics'
// import CsrfToken from './CsrfToken'
// import StatusMonitor from './StatusMonitor'
// import Locals from '../providers/Locals'
class Kernel {
    static init(_express) {
        // // Check if CORS is enabled
        // if (Locals.config().isCORSEnabled) {
        // 	// Mount CORS middleware
        // 	_express = CORS.mount(_express)
        // }
        // Mount basic express apis middleware
        _express = Http_1.default.mount(_express);
        // // Mount csrf token verification middleware
        // _express = CsrfToken.mount(_express)
        // // Mount statics middleware
        // _express = Statics.mount(_express)
        // // Mount status monitor middleware
        // _express = StatusMonitor.mount(_express)
        return _express;
    }
}
exports.default = Kernel;
//# sourceMappingURL=Kernel.js.map