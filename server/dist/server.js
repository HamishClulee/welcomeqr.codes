"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger"));
console.log('build started');
const server = app_1.default.listen(app_1.default.get('port'), () => {
    console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
    console.log('  Press CTRL-C to stop\n');
    logger_1.default.log(`
============================================================================================\n
[${new Date()}] Restarted on http://localhost:${app_1.default.get('port')}\n
============================================================================================\n
`);
});
console.log('build running');
exports.default = server;
//# sourceMappingURL=server.js.map