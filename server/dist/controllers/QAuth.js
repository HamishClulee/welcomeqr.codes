"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QAuth = {
    deny: () => {
        return { email: null, id: null, authed: false, subdom: null };
    },
    approve: (res) => {
        return res;
    }
};
exports.default = QAuth;
//# sourceMappingURL=QAuth.js.map