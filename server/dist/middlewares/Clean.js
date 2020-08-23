"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = require("../providers/Environment");
const Log_1 = require("./Log");
const jwt = require('jsonwebtoken');
const generateAccessToken = (userid) => {
    return jwt.sign(userid, Environment_1.default.get().tokenSecret, { expiresIn: `2 days` });
};
const Clean = {
    settings: function (res, user) {
        return res.status(200).send({ user: this.buildSettings(user) });
    },
    deny: function (res, status = 403, msg = '') {
        let _user = this.killUser();
        return res.status(status).send({ msg, user: _user });
    },
    approve: function (res, status, user, msg = '') {
        let _user = this.buildUser(user);
        return res.status(status).send({ msg, user: _user });
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
            tier: null,
            token: null
        };
    },
    buildUser: function (user) {
        return {
            email: user.email,
            id: user._id,
            authed: true,
            subdom: user.subdom,
            role: user.role,
            tier: user.accountTier,
            token: generateAccessToken({
                userid: user._id,
                email: user.email,
                role: user.role,
                subdom: user.subdom
            })
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
            token: generateAccessToken({
                userid: user._id,
                email: user.email,
                role: user.role,
                subdom: user.subdom
            }),
            allowsemails: user.allowEmails,
            isemailverified: user.emailVerified
        };
    },
    apiError: function (funcname, e, res) {
        Log_1.default.error(`Function Name: ${funcname} :: ${String(e)}`, [Log_1.default.TAG_API_ERROR]);
        return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e });
    },
    authError: function (funcname, e, res) {
        Log_1.default.error(`Function Name: ${funcname} :: ${String(e)} :: User Auth Failure`, [Log_1.default.TAG_AUTH]);
        return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: this.killUser() });
    }
};
exports.default = Clean;
//# sourceMappingURL=Clean.js.map