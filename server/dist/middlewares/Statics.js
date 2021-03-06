"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("./Log");
class Statics {
    static mount(_express) {
        Log_1.default.info('Booting the \'Statics\' middleware...');
        // // Loads Options
        // const options = { maxAge: 31557600000 }
        // // Load Statics
        // _express.use('/', express.static(path.join(__dirname, '../../dist/front-end'), options))
        // // Load NPM Statics
        // _express.use('/vendor', express.static(path.join(__dirname, '../../node_modules'), options))
        return _express;
    }
}
exports.default = Statics;
//# sourceMappingURL=Statics.js.map