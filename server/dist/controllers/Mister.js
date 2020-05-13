"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../middlewares/Log");
const Mister = {
    settings: (res, user) => {
        return res.status(200).send({ user: this.buildSettings(user) });
    },
    deny: (res, status = 403, msg = '') => {
        return res.status(status).send({ msg, user: this.killUser() });
    },
    approve: (res, status, user, msg = '') => {
        return res.status(status).send({ msg, user: this.buildUser(user) });
    },
    success: (res, status, content = {}, msg = '') => {
        return res.status(status).send({ msg, content });
    },
    failure: (res, status, content = {}, msg = '') => {
        return res.status(status).send({ msg, content });
    },
    killUser: () => {
        return {
            email: null,
            id: null,
            authed: false,
            subdom: null,
            role: null,
            tier: null
        };
    },
    buildUser: (user) => {
        return {
            email: user.email,
            id: user._id,
            authed: true,
            subdom: user.subdom,
            role: user.role,
            tier: user.accountTier
        };
    },
    buildSettings: (user) => {
        return {
            email: user.email,
            id: user._id,
            authed: true,
            subdom: user.subdom,
            role: user.role,
            tier: user.accountTier,
            allowsemails: user.allowEmails,
            isemailverified: user.emailVerified
        };
    },
    apiError: (funcname, e, res) => {
        Log_1.default.error(`Function Name: ${funcname} :: ${String(e)}`, [Log_1.default.TAG_API_ERROR]);
        return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e });
    },
    authError: (funcname, e, res, intercept) => {
        Log_1.default.error(`Function Name: ${funcname} :: ${String(e)} :: User Auth Failure`, [Log_1.default.TAG_AUTH]);
        return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: this.killUser(), intercept });
    }
};
exports.default = Mister;
//# sourceMappingURL=Mister.js.map