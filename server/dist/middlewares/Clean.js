"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("./Log");
const Clean = {
    settings: function (res, user) {
        return res.status(200).send({ user: this.buildSettings(user) });
    },
    deny: function (res, status = 403, msg = '', intercept = false) {
        let _user = this.killUser();
        return res.status(status).send({ msg, user: _user, intercept });
    },
    approve: function (res, status, user, msg = '', intercept = false) {
        let _user = this.buildUser(user);
        return res.status(status).send({ msg, user: _user, intercept });
    },
    success: function (res, status, content = {}, msg = '') {
        return res.status(status).send({ msg, content });
    },
    failure: function (res, status, content = {}, msg = '') {
        return res.status(status).send({ msg, content });
    },
    killUser: function () {
        return {
            email: null,
            id: null,
            authed: false,
            subdom: null,
            role: null,
            tier: null
        };
    },
    buildUser: function (user) {
        return {
            email: user.email,
            id: user._id,
            authed: true,
            subdom: user.subdom,
            role: user.role,
            tier: user.accountTier
        };
    },
    buildSettings: function (user) {
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
    apiError: function (funcname, e, res) {
        Log_1.default.error(`Function Name: ${funcname} :: ${String(e)}`, [Log_1.default.TAG_API_ERROR]);
        return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e });
    },
    authError: function (funcname, e, res, intercept) {
        Log_1.default.error(`Function Name: ${funcname} :: ${String(e)} :: User Auth Failure`, [Log_1.default.TAG_AUTH]);
        return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: this.killUser(), intercept });
    }
};
exports.default = Clean;
//# sourceMappingURL=Clean.js.map