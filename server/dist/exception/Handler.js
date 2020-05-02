"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../middlewares/Log");
const Environment_1 = require("../providers/Environment");
class Handler {
    /**
     * Handles all the not found routes
     */
    static notFoundHandler(_express) {
        const apiPrefix = Environment_1.default.config().apiPrefix;
        _express.use('*', (req, res) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            Log_1.default.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
        });
        return _express;
    }
    /**
     * Handles your api/web routes errors/exception
     */
    static clientErrorHandler(err, req, res, next) {
        Log_1.default.error(err.stack);
        if (req.xhr) {
            return res.status(500).send({ error: 'Something went wrong!' });
        }
        else {
            return next(err);
        }
    }
    /**
     * Show undermaintenance page incase of errors
     */
    static errorHandler(err, req, res, next) {
        Log_1.default.error(err.stack);
        res.status(500);
    }
    /**
     * Register your error / exception monitoring
     * tools right here ie. before "next(err)"!
     */
    static logErrors(err, req, res, next) {
        Log_1.default.error(err.stack);
        return next(err);
    }
}
exports.default = Handler;
//# sourceMappingURL=Handler.js.map