"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QAuth = {
    deny: () => {
        return { email: null, id: null, authed: false, subdom: null, role: null, tier: null };
    },
    approve: (user) => {
        let result = {
            email: user.email,
            id: user._id,
            authed: true,
            subdom: user.subdom,
            role: user.role,
            tier: user.accountTier
        };
        return result;
    }
};
exports.default = QAuth;
//# sourceMappingURL=QAuth.js.map