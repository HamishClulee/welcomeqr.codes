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
const express_flash_1 = __importDefault(require("express-flash"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const bluebird_1 = __importDefault(require("bluebird"));
const multer_1 = __importDefault(require("multer"));
const winston_1 = __importDefault(require("winston"));
const secrets_1 = require("./util/secrets");
const history = require('connect-history-api-fallback');
const cors = require('cors');
const MongoStore = connect_mongo_1.default(express_session_1.default);
/** ---------------------------------------  LOGGING  ------------------------------------------------- */
if (process.env.NODE_ENV === 'production') {
    winston_1.default.createLogger({
        level: 'info',
        format: winston_1.default.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston_1.default.transports.File({ filename: './logs/error.log', level: 'error' }),
            new winston_1.default.transports.File({ filename: './logs/combined.log' })
        ]
    });
}
/** ---------------------------------------  PASSPORT + MONGO CONFIG  --------------------------------- */
const userController = __importStar(require("./controllers/user"));
const app = express_1.default();
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => { }).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
});
/** ---------------------------------------  APP CONFIG  ---------------------------------------------- */
app.set('port', 1980);
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    cookie: {
        sameSite: process.env.NODE_ENV === 'production',
        maxAge: process.env.NODE_ENV === 'production' ? 86400000 : null,
        secure: process.env.NODE_ENV === 'production',
    },
    resave: true,
    saveUninitialized: true,
    secret: secrets_1.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
if (process.env.NODE_ENV === 'production')
    app.set('trust proxy', 1);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_flash_1.default());
app.use(cors({
    origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'https://welcomeqr.codes',
    credentials: true
}));
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
/** ---------------------------------------  APP ROUTING  --------------------------------- */
app.post('/session_challenge', userController.sessionChallenge);
app.post('/login', userController.postLogin);
app.post('/logout', userController.postLogout);
app.post('/forgot', userController.postForgot);
app.post('/reset/:token', userController.postReset);
app.post('/signup', userController.postSignup);
// app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile)
// app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword)
// app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount)
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
app.post('/tester', userController.postSignup);
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