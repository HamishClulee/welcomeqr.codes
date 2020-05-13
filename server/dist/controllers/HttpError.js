"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../middlewares/Log");
const QAuth_1 = require("./QAuth");
exports.QApiError = (funcname, e, res) => {
    Log_1.default.error(`Function Name: ${funcname} :: ${String(e)}`, [Log_1.default.TAG_API_ERROR]);
    return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e });
};
exports.QAuthError = (funcname, e, res, intercept) => {
    Log_1.default.error(`Function Name: ${funcname} :: ${String(e)} :: User Auth Failure`, [Log_1.default.TAG_AUTH]);
    return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: QAuth_1.default.deny(), intercept });
};
//# sourceMappingURL=HttpError.js.map