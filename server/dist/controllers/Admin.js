'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Clean_1 = require("../middlewares/Clean");
const fs = require('fs');
const path = require('path');
exports.getLogByDay = (req, res) => {
    try {
        let filePath = path.join(__dirname, '../../.logs/2020-09-13.log');
        let stat = fs.statSync(filePath);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            const raw = data.split(/\r?\n/);
            const cleaned = raw.filter(line => {
                return line != null && line !== '';
            });
            Clean_1.default.success(res, 200, cleaned, `Logs for given day`);
        });
    }
    catch (e) {
        return Clean_1.default.apiError('getLogByDay', e, res);
    }
};
//# sourceMappingURL=Admin.js.map