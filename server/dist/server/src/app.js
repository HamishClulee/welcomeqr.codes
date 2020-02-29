"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const bluebird_1 = __importDefault(require("bluebird"));
const multer_1 = __importDefault(require("multer"));
const logger_1 = __importDefault(require("./logger"));
const secrets_1 = require("./util/secrets");
const MINS_15 = 90000;
const DAYS_5 = 1000 * 60 * 60 * 24 * 5;
const PORT = 1980;
const DEV_URL = 'http://localhost:8080';
const PROD_URL = 'https://welcomeqr.codes';
const history = require('connect-history-api-fallback');
const cors = require('cors');
const MongoStore = connect_mongo_1.default(express_session_1.default);
/** ---------------------------------------  PASSPORT + MONGO CONFIG  --------------------------------- */
const app = express_1.default();
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => { logger_1.default.log(`[${new Date()}] Mongo is now connected!`); }).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
});
/** ---------------------------------------  APP CONFIG  ---------------------------------------------- */
app.set('port', PORT);
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    cookie: {
        sameSite: true,
        maxAge: DAYS_5,
        secure: false,
    },
    saveUninitialized: false,
    resave: false,
    secret: secrets_1.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true,
        ttl: DAYS_5,
        autoRemove: 'native'
    })
}));
if (process.env.NODE_ENV === 'production')
    app.set('trust proxy', 1);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(cors({
    origin: process.env.NODE_ENV !== 'production' ? DEV_URL : PROD_URL,
    credentials: true
}));
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
/** ---------------------------------------  APP ROUTING  --------------------------------- */
/** Google Domain Verification */
app.get('/google4d9d74b6d7c786e5.html', function (req, res) {
    res.sendFile('google4d9d74b6d7c786e5.html');
});
/** Auth */
const user = __importStar(require("./controllers/user"));
app.post('/session_challenge', user.sessionChallenge);
app.post('/login', user.login);
app.post('/logout', user.logout);
app.post('/forgot', user.forgot);
app.post('/reset/:token', user.reset);
app.post('/signup', user.signup);
/** Editor */
const editor = __importStar(require("./controllers/editor"));
const passportConfig = __importStar(require("./config/passport"));
app.post('/api/submitnew', passportConfig.isAuthenticated, editor.submitNew);
app.post('/api/checksubdom', passportConfig.isAuthenticated, editor.checkSubdom);
app.post('/api/submitsubdom', passportConfig.isAuthenticated, editor.submitSubdom);
app.post('/api/gethtmlforuser', passportConfig.isAuthenticated, editor.getHTML);
editor.precaching();
/** ---------------------------------------  IMAGE STORAGE  --------------------------------- */
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer_1.default({ storage: storage }).single('img');
app.post('/api/photo', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end(JSON.stringify({ message: 'Upload success' }));
    });
});
/** -------------------------------  STATIC FILES AND SPA SERVER  --------------------------------- */
const _static = express_1.default.static(path_1.default.join(__dirname, 'front-end'), { maxAge: 31557600000 });
if (process.env.NODE_ENV === 'production') {
    app.use(_static);
}
app.use(history({
    verbose: true,
    disableDotRule: true
}));
app.get('*', _static);
exports.default = app;
//# sourceMappingURL=app.js.map