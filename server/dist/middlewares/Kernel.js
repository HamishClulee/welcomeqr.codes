"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http_1 = require("./Http");
class Kernel {
    static init(_express) {
        _express = Http_1.default.mount(_express);
        return _express;
    }
}
exports.default = Kernel;
//# sourceMappingURL=Kernel.js.map