"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QAuth = {
    settings: (user) => {
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
    deny: () => {
        return {
            email: null,
            id: null,
            authed: false,
            subdom: null,
            role: null,
            tier: null
        };
    },
    approve: (user) => {
        return {
            email: user.email,
            id: user._id,
            authed: true,
            subdom: user.subdom,
            role: user.role,
            tier: user.accountTier
        };
    }
};
exports.default = QAuth;
//# sourceMappingURL=QAuth.js.map