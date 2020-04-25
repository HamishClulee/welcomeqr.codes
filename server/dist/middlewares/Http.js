"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const compress = require("compression");
const connect = require("connect-mongo");
const bodyParser = require("body-parser");
const session = require("express-session");
const Log_1 = require("./Log");
const Locals_1 = require("../providers/Locals");
const Passport_1 = require("../providers/Passport");
const MongoStore = connect(session);
class Http {
    static mount(_express) {
        Log_1.default.info('Booting the \'HTTP\' middleware...');
        // Enables the request body parser
        _express.use(bodyParser.json({
            limit: Locals_1.default.config().maxUploadLimit
        }));
        _express.use(bodyParser.urlencoded({
            limit: Locals_1.default.config().maxUploadLimit,
            parameterLimit: Locals_1.default.config().maxParameterLimit,
            extended: false
        }));
        _express.disable('x-powered-by');
        const options = {
            cookie: {
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 24,
                secure: false
            },
            saveUninitialized: false,
            resave: false,
            secret: Locals_1.default.config().appSecret,
            store: new MongoStore({
                url: process.env.MONGOOSE_URL,
                autoReconnect: true,
                ttl: 1000 * 60 * 60 * 24,
                autoRemove: 'native'
            })
        };
        _express.use(session(options));
        _express.use(cors({
            origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'https://welcomeqr.codes',
            credentials: true
        }));
        _express.use(compress());
        _express = Passport_1.default.mountPackage(_express);
        return _express;
    }
}
exports.default = Http;
//# sourceMappingURL=Http.js.map