"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const qauth_1 = __importDefault(require("./qauth"));
exports.QApiError = (funcname, e, res) => {
    logger_1.default.log(`[ERROR] ${new Date()}`);
    logger_1.default.log(`[ERROR] Function Name: ${funcname}`, JSON.stringify(e, null, 2));
    logger_1.default.log('[ERROR END ------------------------------------------------------------------------- ]');
    return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e });
};
exports.QAuthError = (funcname, e, res) => {
    logger_1.default.log(`[AUTH ERROR] ${new Date()}`);
    logger_1.default.log(`[AUTH ERROR] Function Name: ${funcname}`, JSON.stringify(e, null, 2));
    logger_1.default.log('[AUTH ERROR END ------------------------------------------------------------------------- ]');
    return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: qauth_1.default.deny() });
};
//# sourceMappingURL=errors.js.map