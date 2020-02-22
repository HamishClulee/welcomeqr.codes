"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger"));
if (process.env.NODE_ENV !== 'production')
    app_1.default.use(errorhandler_1.default());
const server = app_1.default.listen(app_1.default.get('port'), () => {
    console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
    console.log('  Press CTRL-C to stop\n');
    logger_1.default.log('Things have been set in motion that cannot be undone!');
});
exports.default = server;
//# sourceMappingURL=server.js.map